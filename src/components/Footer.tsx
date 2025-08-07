import { Button } from "@/components/ui/button";
import { Music2, Globe, Twitter, Instagram, Youtube, Github } from "lucide-react";

const footerSections = [
  {
    title: "Platform",
    links: [
      { name: "News Feed", href: "#news" },
      { name: "Music Player", href: "#player" },
      { name: "Discussions", href: "#community" },
      { name: "Favorites", href: "#favorites" }
    ]
  },
  {
    title: "Community",
    links: [
      { name: "Trending Artists", href: "#trending" },
      { name: "Top Discussions", href: "#discussions" },
      { name: "Featured Members", href: "#members" },
      { name: "Guidelines", href: "#guidelines" }
    ]
  },
  {
    title: "Resources",
    links: [
      { name: "API Documentation", href: "#api" },
      { name: "Music Partners", href: "#partners" },
      { name: "Help Center", href: "#help" },
      { name: "Blog", href: "#blog" }
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Press", href: "#press" },
      { name: "Contact", href: "#contact" }
    ]
  }
];

const musicAPIs = [
  { name: "Jamendo", logo: "🎧" },
];

export const Footer = () => {
  return (
    <footer className="bg-music-dark border-t border-music-gray">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <Music2 className="w-8 h-8 text-primary mr-2" />
                <span className="text-2xl font-bold text-white">Sync IT</span>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                The global music community platform that connects music lovers worldwide. 
                Discover, share, discuss, and listen to music from every corner of the globe.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-music-pink">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-music-blue">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-music-purple">
                  <Youtube className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                  <Github className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Links Sections */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-white font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href}
                        className="text-muted-foreground hover:text-white transition-smooth"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Music API Credits */}
        <div className="py-8 border-t border-music-gray">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Powered by Music APIs:</h4>
              <div className="flex items-center gap-6">
                {musicAPIs.map((api) => (
                  <div key={api.name} className="flex items-center gap-2 text-muted-foreground hover:text-white transition-smooth cursor-pointer">
                    <span className="text-lg">{api.logo}</span>
                    <span className="text-sm">{api.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="w-4 h-4" />
              <span className="text-sm">Available in 50+ countries</span>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-music-gray">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 Sync IT. All rights reserved. Made with ♪ for music lovers worldwide.
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <a href="#privacy" className="text-muted-foreground hover:text-white transition-smooth">
                Privacy Policy
              </a>
              <a href="#terms" className="text-muted-foreground hover:text-white transition-smooth">
                Terms of Service
              </a>
              <a href="#cookies" className="text-muted-foreground hover:text-white transition-smooth">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};