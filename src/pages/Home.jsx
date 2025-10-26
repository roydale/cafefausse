import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Award } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-image.jpg";
import logo from "@/assets/logo.png";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }} // ✅ fixed syntax
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <div className="flex flex-col justify-center items-center animate-fade-in text-shadow-md">
            <img src={logo} alt="Centered" className="py-4 w-48" />
            <h1 className="text-5xl md:text-7xl font-hedvig font-normal mb-6 text-customGold">Café Fausse</h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 font-light opacity-90">
            Where Traditional Italian Flavors Meet Modern Culinary Innovation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg shadow-elegant"
            >
              <Link to="/reservations">Reserve a Table</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 border-white text-white hover:bg-white hover:text-foreground px-8 py-6 text-lg backdrop-blur-sm"
            >
              <Link to="/menu">View Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-soft transition-smooth hover:shadow-elegant">
              <MapPin className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-sm text-muted-foreground">
                1234 Culinary Ave, Suite 100
                <br />
                Washington, DC 20002
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-soft transition-smooth hover:shadow-elegant">
              <Clock className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Hours</h3>
              <p className="text-sm text-muted-foreground">
                Mon–Sat: 11 AM – 10 PM
                <br />
                Sunday: 9 AM – 8 PM
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-soft transition-smooth hover:shadow-elegant">
              <Phone className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Reservations</h3>
              <p className="text-sm text-muted-foreground">
                Call us at
                <br />
                (202) 555-4567
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Award className="w-16 h-16 mx-auto mb-4 text-accent" />
            <h2 className="text-3xl md:text-4xl font-hedvig font-normal mb-4">Award-Winning Excellence</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Recognized for our commitment to culinary excellence and unforgettable dining experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Culinary Excellence Award</h3>
              <p className="text-sm opacity-80">2022</p>
            </div>
            <div className="text-center p-6 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Restaurant of the Year</h3>
              <p className="text-sm opacity-80">2023</p>
            </div>
            <div className="text-center p-6 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Best Fine Dining Experience</h3>
              <p className="text-sm opacity-80">Foodie Magazine, 2023</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

