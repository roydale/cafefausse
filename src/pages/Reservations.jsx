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

  // React to reservation result
  useEffect(() => {
    if (!response) return;

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.date || !formData.time) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const result = await createReservation(formData);
      setResponse(result);
    } catch (error) {
      // Preserve the message coming from api-client.js
      setResponse({ success: false, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-base">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-base">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-base">
                    Phone Number (Optional)
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(202) 555-0123"
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="date" className="text-base flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date *
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="mt-2"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div>
                    <Label htmlFor="time" className="text-base flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Time *
                    </Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="guests" className="text-base flex items-center gap-2">
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

                <p className="text-sm text-muted-foreground text-center">* Required fields.</p>
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
