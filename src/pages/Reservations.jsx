import { useState, useEffect } from "react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, Users } from "lucide-react";
import { createReservation } from "@/services/reservation.service";

const Reservations = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [timeOptions, setTimeOptions] = useState([]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9()+\s-]{7,20}$/;

  // React to reservation result
  useEffect(() => {
    if (!response) {
      return;
    }

    if (response.success) {
      toast.success(response.message || "Reservation successful!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "2",
      });
    } else {
      toast.error(response.message || "Reservation failed.");
    }
  }, [response]);

  // Clear time options when date changes
  useEffect(() => {
    setTimeOptions([]);
    setFormData((prev) => ({ ...prev, time: "" })); // Resets form time selection
  }, [formData.date]);

  // Update time options dynamically
  const handleTimeDropdownClick = () => {
    if (!formData.date) {
      return;
    }

    const selectedDate = new Date(formData.date);
    //const now = new Date();
    const now = new Date("2025-10-30T22:59:00");

    const isToday =
      selectedDate.getDate() === now.getDate() &&
      selectedDate.getMonth() === now.getMonth() &&
      selectedDate.getFullYear() === now.getFullYear();

    const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 1 = Monday, ...
    const isSunday = dayOfWeek === 0;

    // Operating hours: Sunday 5PM–9PM, otherwise (Monday–Saturday) 5PM–11PM
    // But we're not offering reservations at the closing times
    // Instead, we're setting the last reservation time option to
    // Sunday 8PM, otherwise (Monday–Saturday) 10PM
    const baseHours = isSunday ? generateTimes(17, 20) : generateTimes(17, 22);

    let filteredHours = baseHours;
    if (isToday) {
      // Filter out any hour < current hour + 1 hour allowance
      const currentHour = now.getHours() + 1;
      filteredHours = baseHours.filter((h) => h > currentHour);
    }

    const formattedTimes = filteredHours.map((h) => formatTime(h));

    // If no times available, mark touched immediately so the message shows on first click
    if (isToday && formattedTimes.length === 0) {
      setTouched((prev) => ({ ...prev, time: true }));
      setErrors((prev) => ({ ...prev, time: "No available times today." }));
    } else {
      setErrors((prev) => ({ ...prev, time: "" }));
    }
    setTimeOptions(formattedTimes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasValidPhoneNumber = !formData.phone || phoneRegex.test(formData.phone);
    if (!formData.name || !formData.email || !formData.date || !formData.time || !hasValidPhoneNumber) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const result = await createReservation(formData);
      setResponse(result);
    } catch (error) {
      // Preserve the message coming from the api client
      setResponse({ success: false, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  // Helper to format 24-hour time into "5:00 PM" etc.
  const formatTime = (hour) => {
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:00 ${ampm}`;
  };

  const generateTimes = (startHour, endHour) => {
    const result = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      result.push(hour);
      /*result.push(`${hour}:00`);      
      if (hour !== endHour) {
        result.push(`${hour}:30`);
      }
      */
    }
    return result;
  };

  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          message = "Full name is required.";
        }
        break;

      case "email":
        if (!value.trim()) {
          message = "Email address is required.";
        } else if (!emailRegex.test(value)) {
          message = "Enter a valid email address.";
        }
        break;

      case "phone":
        // Optional — only validate if not empty
        if (value.trim() && !phoneRegex.test(value)) {
          message = "Enter a valid phone number.";
        }
        break;

      case "date":
        if (!value) {
          message = "Please select a date.";
        }
        break;

      case "time":
        if (!value) {
          message = "Please select a time.";
        }
        break;

      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-hedvig font-normal text-primary mb-4">Make a Reservation</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Reserve your table for an unforgettable dining experience. We look forward to serving you!
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-8 shadow-elegant">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <div className="flex flex-row justify-between items-center">
                    <Label htmlFor="name" className="text-base">
                      Full Name *
                    </Label>
                    {touched.name && errors.name && (
                      <p className="text-red-500 text-sm mt-1 text-right">{errors.name}</p>
                    )}
                  </div>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="John Doe"
                    required
                    className={`mt-2 ${touched.name && errors.name ? "border-red-500" : ""}`}
                  />
                </div>

                <div>
                  <div className="flex flex-row justify-between items-center">
                    <Label htmlFor="email" className="text-base">
                      Email Address *
                    </Label>
                    {touched.email && errors.email && (
                      <p className="text-red-500 text-sm mt-1 text-right">{errors.email}</p>
                    )}
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="john@example.com"
                    required
                    className={`mt-2 ${touched.email && errors.email ? "border-red-500" : ""}`}
                  />
                </div>

                <div>
                  <div className="flex flex-row justify-between items-center">
                    <Label htmlFor="phone" className="text-base">
                      Phone Number (Optional)
                    </Label>
                    {touched.phone && errors.phone && (
                      <p className="text-red-500 text-sm mt-1 text-right">{errors.phone}</p>
                    )}
                  </div>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="(202) 555-0123"
                    className={`mt-2 ${touched.phone && errors.phone ? "border-red-500" : ""}`}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex flex-row justify-between items-center">
                      <Label htmlFor="date" className="text-base flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Date *
                      </Label>
                      {touched.date && errors.date && (
                        <p className="text-red-500 text-sm mt-1 text-right">{errors.date}</p>
                      )}
                    </div>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={`mt-2 ${touched.date && errors.date ? "border-red-500" : ""}`}
                      style={{ display: "block" }}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div>
                    <div className="flex flex-row justify-between items-center">
                      <Label htmlFor="time" className="text-base flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Time *
                      </Label>
                      {touched.time && errors.time && (
                        <p className="text-red-500 text-sm mt-1 text-right">{errors.time}</p>
                      )}
                    </div>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onClick={handleTimeDropdownClick}
                      disabled={!formData.date}
                      required
                      className={`mt-2 w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background ${
                        touched.time && errors.time ? "border-red-500" : ""
                      } ${!formData.date ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <option value="">Select time</option>
                      {timeOptions.map((t) => (
                        <option key={t} value={t}>
                          {new Date(`${formData.date} ${t}`).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="guests" className="text-base flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Number of Guests *
                  </Label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="mt-2 w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background"
                    required
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Reservation Request"}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  * Required fields. Phone numbers may include 0–9, +, –, and parentheses ( ).
                </p>
              </form>
            </Card>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Reservation Policy</h3>
                <p className="text-sm text-muted-foreground">
                  Please arrive within 15 minutes of your reservation time. For parties larger than 8, please call us
                  directly.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Cancellation Policy</h3>
                <p className="text-sm text-muted-foreground">
                  Please notify us at least 24 hours in advance if you need to cancel or modify your reservation.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Reservations;
