import { Button } from "@/components/ui/button";
import { Play, Music, Users, Globe } from "lucide-react";
import heroImage from "@/assets/hero-music.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 gradient-hero opacity-80"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 float">
          <Music className="w-8 h-8 text-music-pink opacity-60" />
        </div>
        <div className="absolute top-40 right-16 float" style={{ animationDelay: '1s' }}>
          <Users className="w-6 h-6 text-music-blue opacity-60" />
        </div>
        <div className="absolute bottom-32 left-20 float" style={{ animationDelay: '2s' }}>
          <Globe className="w-7 h-7 text-music-purple opacity-60" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto slide-up">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-primary bg-clip-text text-transparent">
          Stay in Sync with the Global Beat
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Follow music news from around the world, share what you love, and listen as you go.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button variant="hero" size="lg" className="text-lg px-8 py-4">
            <Play className="w-5 h-5 mr-2" />
            Get Started Free
          </Button>
          <Button variant="glass" size="lg" className="text-lg px-8 py-4">
            <Music className="w-5 h-5 mr-2" />
            Watch Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">50+</div>
            <div className="text-sm text-white/70">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">1M+</div>
            <div className="text-sm text-white/70">Songs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">100K+</div>
            <div className="text-sm text-white/70">Users</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};