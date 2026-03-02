import { ShieldCheck, Heart, Leaf } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Dermatologist Tested",
    description: "Clinically proven safe and effective for all skin types.",
  },
  {
    icon: Heart,
    title: "Cruelty Free",
    description: "Never tested on animals. Beauty without compromise.",
  },
  {
    icon: Leaf,
    title: "Clean Ingredients",
    description: "Free from harmful chemicals. Only the purest formulas.",
  },
];

const Benefits = () => {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title}
              className="text-center p-8 bg-card rounded-2xl shadow-soft hover:shadow-card transition-all duration-500 animate-fade-up opacity-0"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
                <benefit.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
