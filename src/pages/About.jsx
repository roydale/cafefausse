import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Award, Heart, Leaf } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md-6xl font-hedvig font-normal text-primary mb-4">About Café Fausse</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A journey of passion, tradition, and culinary excellence
            </p>
          </div>

          {/* Story Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="p-8 md-12 shadow-elegant">
              <h2 className="text-3xl font-hedvig font-normal text-primary mb-6">Our Story</h2>
              <p className="text-lg leading-relaxed mb-6">
                Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse blends traditional
                Italian flavors with modern culinary innovation. Our mission is to provide an unforgettable dining
                experience that reflects both quality and creativity.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Every dish at Café Fausse tells a story—a story of passion, dedication, and a deep respect for the
                culinary arts. We believe that great food brings people together, creating memories that last a
                lifetime.
              </p>
              <p className="text-lg leading-relaxed">
                From our carefully curated wine list to our seasonally inspired menu, every detail is crafted with care
                to ensure that your dining experience is nothing short of exceptional.
              </p>
            </Card>
          </div>

          {/* Founders Section */}
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-hedvig font-normal text-primary mb-8 text-center">Meet Our Founders</h2>
            <div className="grid grid-cols-1 md-cols-2 gap-8">
              <Card className="p-8 shadow-soft hover-elegant transition-smooth">
                <h3 className="text-2xl font-bold mb-2">Chef Antonio Rossi</h3>
                <p className="text-accent font-semibold mb-4">Executive Chef & Co-Founder</p>
                <p className="text-muted-foreground leading-relaxed">
                  With over 20 years of culinary experience in Italy and the United States, Chef Antonio brings
                  authentic Italian techniques combined with innovative modern approaches. His passion for locally
                  sourced ingredients and sustainable cooking practices defines our kitchen philosophy.
                </p>
              </Card>

              <Card className="p-8 shadow-soft hover-elegant transition-smooth">
                <h3 className="text-2xl font-bold mb-2">Maria Lopez</h3>
                <p className="text-accent font-semibold mb-4">Restaurateur & Co-Founder</p>
                <p className="text-muted-foreground leading-relaxed">
                  Maria's vision for exceptional hospitality and elegant dining experiences has shaped Café Fausse into
                  the acclaimed establishment it is today. Her attention to detail and commitment to guest satisfaction
                  ensures that every visit is memorable.
                </p>
              </Card>
            </div>
          </div>

          {/* Values Section */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-hedvig font-normal text-primary mb-8 text-center">Our Commitment</h2>
            <div className="grid grid-cols-1 md-cols-3 gap-6">
              <Card className="p-6 text-center shadow-soft hover-elegant transition-smooth">
                <Award className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Excellence</h3>
                <p className="text-muted-foreground text-sm">
                  We strive for perfection in every dish, every service, and every experience we create for our guests.
                </p>
              </Card>

              <Card className="p-6 text-center shadow-soft hover-elegant transition-smooth">
                <Leaf className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Local Ingredients</h3>
                <p className="text-muted-foreground text-sm">
                  We partner with local farmers and suppliers to bring you the freshest, highest-quality ingredients in
                  every dish.
                </p>
              </Card>

              <Card className="p-6 text-center shadow-soft hover-elegant transition-smooth">
                <Heart className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Passion</h3>
                <p className="text-muted-foreground text-sm">
                  Our love for Italian cuisine and hospitality drives everything we do, from kitchen to table.
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

export default About;
