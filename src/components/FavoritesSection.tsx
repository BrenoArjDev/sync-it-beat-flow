import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare, Plus, Play, Users, Flame } from "lucide-react";

const favorites = [
  {
    id: 1,
    type: "artist",
    name: "Tame Impala",
    description: "Australian psychedelic music project by Kevin Parker",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop",
    discussions: 45,
    followers: 1200,
    trending: true
  },
  {
    id: 2,
    type: "album",
    name: "Random Access Memories",
    artist: "Daft Punk",
    description: "Electronic masterpiece blending disco and house",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    discussions: 78,
    followers: 890,
    trending: false
  },
  {
    id: 3,
    type: "artist", 
    name: "Billie Eilish",
    description: "Grammy-winning alternative pop sensation",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
    discussions: 156,
    followers: 2100,
    trending: true
  }
];

const discussions = [
  {
    id: 1,
    user: "MusicLover92",
    content: "Tame Impala's new track has such amazing production! The reverb on the drums is incredible.",
    likes: 24,
    replies: 8,
    time: "2h ago"
  },
  {
    id: 2,
    user: "VinylCollector",
    content: "Just got the limited edition pressing of Random Access Memories. The sound quality is phenomenal!",
    likes: 31,
    replies: 12,
    time: "4h ago"
  },
  {
    id: 3,
    user: "ElectroFan",
    content: "Billie's vocal range in the latest live performance was absolutely stunning. She keeps evolving as an artist.",
    likes: 67,
    replies: 23,
    time: "6h ago"
  }
];

export const FavoritesSection = () => {
  return (
    <section id="favorites" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[0.5rem] rounded-lg font-bold mb-4 gradient-primary bg-clip-text text-transparent">
            Share Your Favorites
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Add your favorite artists and albums, then join discussions with fellow music lovers
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Favorites Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white">Trending Favorites</h3>
              <Button variant="music" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Favorite
              </Button>
            </div>

            <div className="space-y-4">
              {favorites.map((item) => (
                <Card key={item.id} className="p-4 gradient-card border-music-gray hover:shadow-hover transition-smooth group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img 
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover group-hover:scale-105 transition-smooth"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-smooth"
                      >
                        <Play className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-white">{item.name}</h4>
                        {item.trending && (
                          <Badge variant="secondary" className="bg-music-pink text-white">
                            <Flame className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      {item.artist && (
                        <p className="text-sm text-music-pink mb-1">{item.artist}</p>
                      )}
                      <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {item.discussions} discussions
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {item.followers} followers
                        </div>
                      </div>
                    </div>

                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-music-pink">
                      <Heart className="w-5 h-5" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Discussions */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white">Recent Discussions</h3>
              <Button variant="glass" size="sm">
                Join Discussion
              </Button>
            </div>

            <div className="space-y-4">
              {discussions.map((discussion) => (
                <Card key={discussion.id} className="p-4 gradient-card border-music-gray hover:shadow-hover transition-smooth">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {discussion.user[0]}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white">{discussion.user}</span>
                        <span className="text-xs text-muted-foreground">{discussion.time}</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                        {discussion.content}
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="text-xs p-0 h-auto text-muted-foreground hover:text-music-pink">
                          <Heart className="w-3 h-3 mr-1" />
                          {discussion.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs p-0 h-auto text-muted-foreground hover:text-music-blue">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          {discussion.replies}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};