import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const menuItems = {
  starters: [
    {
      name: "Bruschetta",
      description: "Fresh tomatoes, basil, olive oil, and toasted baguette slices",
      price: "$8.50",
    },
    {
      name: "Caesar Salad",
      description: "Crisp romaine with homemade Caesar dressing",
      price: "$9.00",
    },
  ],
  mainCourses: [
    {
      name: "Grilled Salmon",
      description: "Served with lemon butter sauce and seasonal vegetables",
      price: "$22.00",
    },
    {
      name: "Ribeye Steak",
      description: "12 oz prime cut with garlic mashed potatoes",
      price: "$28.00",
    },
    {
      name: "Vegetable Risotto",
      description: "Creamy Arborio rice with wild mushrooms",
      price: "$18.00",
    },
  ],
  desserts: [
    {
      name: "Tiramisu",
      description: "Classic Italian dessert with mascarpone",
      price: "$7.50",
    },
    {
      name: "Cheesecake",
      description: "Creamy cheesecake with berry compote",
      price: "$7.00",
    },
  ],
  beverages: [
    {
      name: "Red Wine (Glass)",
      description: "A selection of Italian reds",
      price: "$10.00",
    },
    {
      name: "White Wine (Glass)",
      description: "Crisp and refreshing",
      price: "$9.00",
    },
  ],
};

const Menu = () => {
  // Fixed incorrect parameter usage and added "items" argument
  const renderMenuSection = (title, items) => (
    <div className="mb-12">
      <h2 className="text-3xl font-hedvig font-normal text-primary mb-6 border-b-2 border-accent pb-2">{title}</h2>
      <div className="grid gap-4">
        {items.map((item, index) => (
          <Card key={index} className="p-6 shadow-soft hover-elegant transition-smooth">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
              <span className="text-xl font-bold text-accent">{item.price}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-hedvig font-normal text-primary mb-4">Our Menu</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the finest Italian cuisine with locally sourced ingredients and traditional recipes passed down
              through generations.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {renderMenuSection("Starters", menuItems.starters)}
            {renderMenuSection("Main Courses", menuItems.mainCourses)}
            {renderMenuSection("Desserts", menuItems.desserts)}
            {renderMenuSection("Beverages", menuItems.beverages)}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Menu;
