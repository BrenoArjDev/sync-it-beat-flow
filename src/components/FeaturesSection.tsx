import { Card } from "@/components/ui/card";
import { Globe, Users, Music, MessageSquare, Zap, Heart } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Global Music News",
    description: "Stay updated with the latest music news from over 50 countries, curated and filtered by your preferences.",
    color: "text-music-blue"
  },
  {
    icon: Heart,
    title: "Personal Favorites",
    description: "Add your favorite artists, albums, and tracks to create your unique music profile and discover similar tastes.",
    color: "text-music-pink"
  },
  {
    icon: MessageSquare,
    title: "Music Discussions", 
    description: "Join vibrant discussions about your favorite music, share opinions, and connect with fellow music enthusiasts.",
    color: "text-music-purple"
  },
  {
    icon: Music,
    title: "Integrated Player",
    description: "Listen to your favorites with our built-in player, powered by Spotify, Deezer, and other music APIs.",
    color: "text-music-pink"
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Discover trending artists, top discussions, and connect with a global community of music lovers.",
    color: "text-music-blue"
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Get instant notifications about new releases, trending topics, and discussions from your favorite artists.",
    color: "text-music-purple"
  }
];

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "Browse global music news and trending topics from your favorite countries and genres."
  },
  {
    number: "02", 
    title: "Add Favorites",
    description: "Build your personal music library by adding favorite artists, albums, and tracks."
  },
  {
    number: "03",
    title: "Discuss",
    description: "Join conversations, share opinions, and connect with other music enthusiasts worldwide."
  },
  {
    number: "04",
    title: "Listen",
    description: "Enjoy your favorite music with our integrated player, seamlessly connected to your library."
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Features Grid */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
            Everything You Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover, share, discuss, and listen - all in one seamless music platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 gradient-card border-music-gray hover:shadow-hover transition-smooth group cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center group-hover:shadow-glow transition-smooth">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-smooth">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* How It Works */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your journey from discovery to discussion in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-music-purple to-music-pink opacity-30 transform translate-x-1/2"></div>
              )}
              
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-primary flex items-center justify-center text-2xl font-bold text-white shadow-glow">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};