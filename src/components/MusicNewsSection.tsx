import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Clock, Heart, MessageSquare, Filter } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "Arctic Monkeys announce surprise album release",
    excerpt: "The Sheffield band reveals their seventh studio album will drop next month, featuring collaborations with various international artists.",
    country: "UK",
    category: "Rock",
    time: "2 hours ago",
    likes: 156,
    comments: 23,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop"
  },
  {
    id: 2,
    title: "K-Pop sensation BLACKPINK breaks streaming records",
    excerpt: "Latest single surpasses 100 million streams in just 48 hours, setting new milestone for Korean music globally.",
    country: "South Korea",
    category: "K-Pop",
    time: "4 hours ago",
    likes: 892,
    comments: 156,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=250&fit=crop"
  },
  {
    id: 3,
    title: "Brazilian funk artist Anitta wins Latin Grammy",
    excerpt: "Recognition for 'Best Contemporary Pop Vocal Album' brings international spotlight to Brazilian music scene.",
    country: "Brazil",
    category: "Latin",
    time: "6 hours ago",
    likes: 234,
    comments: 67,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop"
  }
];

const countries = ["All", "UK", "USA", "South Korea", "Brazil", "Japan", "Germany"];
const categories = ["All", "Rock", "Pop", "K-Pop", "Latin", "Electronic", "Hip-Hop"];

export const MusicNewsSection = () => {
  return (
    <section id="news" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
            Global Music News
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest music news from around the world, all in one place
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <div className="flex flex-wrap gap-2">
            <Button variant="glass" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            {countries.slice(0, 4).map((country) => (
              <Badge key={country} variant="secondary" className="cursor-pointer hover:bg-primary transition-smooth">
                <Globe className="w-3 h-3 mr-1" />
                {country}
              </Badge>
            ))}
            {categories.slice(0, 4).map((category) => (
              <Badge key={category} variant="outline" className="cursor-pointer hover:bg-primary hover:text-white transition-smooth">
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <Card key={item.id} className="overflow-hidden gradient-card border-music-gray hover:shadow-hover transition-smooth group cursor-pointer">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge variant="secondary" className="bg-black/60 text-white">
                    <Globe className="w-3 h-3 mr-1" />
                    {item.country}
                  </Badge>
                  <Badge variant="outline" className="bg-black/60 border-white/20 text-white">
                    {item.category}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Clock className="w-4 h-4" />
                  {item.time}
                </div>
                
                <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-primary transition-smooth">
                  {item.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {item.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1 hover:text-music-pink transition-smooth cursor-pointer">
                      <Heart className="w-4 h-4" />
                      {item.likes}
                    </div>
                    <div className="flex items-center gap-1 hover:text-music-blue transition-smooth cursor-pointer">
                      <MessageSquare className="w-4 h-4" />
                      {item.comments}
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="text-primary hover:text-white hover:bg-primary">
                    Read More
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="music" size="lg">
            Load More News
          </Button>
        </div>
      </div>
    </section>
  );
};