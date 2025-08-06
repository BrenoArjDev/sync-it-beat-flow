import { Button } from "@/components/ui/button";
import { Music2, Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Music2 className="w-8 h-8 text-primary mr-2" />
            <span className="text-xl font-bold text-white">Sync IT</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#news" className="text-white/80 hover:text-white transition-smooth">
                News
              </a>
              <a href="#features" className="text-white/80 hover:text-white transition-smooth">
                Features
              </a>
              <a href="#community" className="text-white/80 hover:text-white transition-smooth">
                Community
              </a>
              <a href="#player" className="text-white/80 hover:text-white transition-smooth">
                Player
              </a>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
              Sign In
            </Button>
            <Button variant="music" size="sm">
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-white hover:bg-white/10"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/40 backdrop-blur-md rounded-lg mt-2">
              <a href="#news" className="text-white/80 hover:text-white block px-3 py-2 transition-smooth">
                News
              </a>
              <a href="#features" className="text-white/80 hover:text-white block px-3 py-2 transition-smooth">
                Features
              </a>
              <a href="#community" className="text-white/80 hover:text-white block px-3 py-2 transition-smooth">
                Community
              </a>
              <a href="#player" className="text-white/80 hover:text-white block px-3 py-2 transition-smooth">
                Player
              </a>
              <div className="pt-4 pb-3 border-t border-white/10">
                <div className="flex items-center px-3 space-x-3">
                  <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10 flex-1">
                    Sign In
                  </Button>
                  <Button variant="music" size="sm" className="flex-1">
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};