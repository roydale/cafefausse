import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Clock } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  // ✅ Fixed event type and logic
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-hedvig font-normal mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>
                  1234 Culinary Ave, Suite 100
                  <br />
                  Washington, DC 20002
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>(202) 555-4567</span>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <p>Monday–Saturday — 11 AM to 10 PM</p>
                  <p>Sunday — 9 AM to 8 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-xl font-hedvig font-normal mb-4">Stay Updated</h3>
            <p className="text-sm mb-4 opacity-90">Subscribe to our newsletter for exclusive offers and updates.</p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-primary-foreground text-foreground"
                required
              />
              <Button type="submit" variant="secondary">
                Subscribe
              </Button>
            </form>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xl font-hedvig font-normal mb-4">About Café Fausse</h3>
            <p className="text-sm opacity-90">
              Founded in 2010, Café Fausse blends traditional Italian flavors with modern culinary innovation to provide
              an unforgettable dining experience.
            </p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} Café Fausse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
