import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

import {
  TrendingUp,
  Star,
  Users,
  MessageSquare,
  Crown,
  Music2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const trendingArtists = [
  {
    name: "The Weeknd",
    genre: "R&B/Pop",
    followers: "12.3M",
    growth: "+15%",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=100&h=100&fit=crop",
  },
  {
    name: "Taylor Swift",
    genre: "Pop/Country",
    followers: "8.7M",
    growth: "+22%",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop",
  },
  {
    name: "Bad Bunny",
    genre: "Reggaeton",
    followers: "6.1M",
    growth: "+31%",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
  },
];

const topDiscussions = [
  {
    title: "Best albums of 2024 so far?",
    replies: 234,
    likes: 567,
    category: "General",
    author: "MusicCritic_2024",
    time: "2h ago",
  },
  {
    title: "Underrated indie artists you should know",
    replies: 156,
    likes: 423,
    category: "Indie",
    author: "IndieExplorer",
    time: "4h ago",
  },
  {
    title: "The evolution of hip-hop production",
    replies: 189,
    likes: 678,
    category: "Hip-Hop",
    author: "BeatMaker_Pro",
    time: "6h ago",
  },
];

const featuredUsers = [
  {
    name: "Sarah Chen",
    username: "@sarahmusic",
    followers: "45.2K",
    favoriteGenre: "K-Pop",
    badge: "Trending Curator",
    avatar: "SC",
  },
  {
    name: "Marcus Rivera",
    username: "@marcusbeats",
    followers: "32.8K",
    favoriteGenre: "Electronic",
    badge: "Discussion Leader",
    avatar: "MR",
  },
  {
    name: "Emma Thompson",
    username: "@emmavinyl",
    followers: "28.1K",
    favoriteGenre: "Classic Rock",
    badge: "Music Historian",
    avatar: "ET",
  },
];

export const CommunitySection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section id="community" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[0.5rem] rounded-lg font-bold mb-4 gradient-primary bg-clip-text text-transparent">
            Join Our Community
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with music lovers worldwide, discover trending artists, and
            engage in passionate discussions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Trending Artists */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-music-pink" />
              <h3 className="text-2xl font-semibold text-white">
                Trending Artists
              </h3>
            </div>

            <div className="space-y-4">
              {trendingArtists.map((artist, index) => (
                <Card
                  key={index}
                  className="p-4 gradient-card border-music-gray hover:shadow-hover transition-smooth group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="w-16 h-16 rounded-full object-cover group-hover:scale-105 transition-smooth"
                      />
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-music-pink rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold text-white group-hover:text-primary transition-smooth">
                        {artist.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {artist.genre}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-white">
                          {artist.followers}
                        </span>
                        <Badge
                          variant="secondary"
                          className="bg-green-500/20 text-green-400"
                        >
                          {artist.growth}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Top Discussions */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-6 h-6 text-music-blue" />
              <h3 className="text-2xl font-semibold text-white">
                Hot Discussions
              </h3>
            </div>

            <div className="space-y-4">
              {topDiscussions.map((discussion, index) => (
                <Card
                  key={index}
                  className="p-4 gradient-card border-music-gray hover:shadow-hover transition-smooth group cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-music-pink rounded-full mt-2 pulse-glow"></div>

                    <div className="flex-1">
                      <h4 className="font-medium text-white group-hover:text-primary transition-smooth mb-2">
                        {discussion.title}
                      </h4>

                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {discussion.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          by {discussion.author}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <span>{discussion.replies} replies</span>
                          <span>{discussion.likes} likes</span>
                        </div>
                        <span>{discussion.time}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Featured Users */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-6 h-6 text-music-purple" />
              <h3 className="text-2xl font-semibold text-white">
                Featured Members
              </h3>
            </div>

            <div className="space-y-4">
              {featuredUsers.map((user, index) => (
                <Card
                  key={index}
                  className="p-4 gradient-card border-music-gray hover:shadow-hover transition-smooth group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                        {user.avatar}
                      </div>
                      <div className="absolute -top-1 -right-1">
                        <Crown className="w-4 h-4 text-yellow-400" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold text-white group-hover:text-primary transition-smooth">
                        {user.name}
                      </h4>
                      <p className="text-sm text-music-pink">{user.username}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.favoriteGenre} • {user.followers} followers
                      </p>
                      <Badge
                        variant="secondary"
                        className="mt-1 text-xs bg-music-purple/20 text-music-purple"
                      >
                        {user.badge}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Community Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">156K+</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">2.3M+</div>
            <div className="text-sm text-muted-foreground">Discussions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">45K+</div>
            <div className="text-sm text-muted-foreground">Artists Shared</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">12M+</div>
            <div className="text-sm text-muted-foreground">Songs Played</div>
          </div>
        </div>
        {!user && (
          <div className="text-center mt-12">
            <Button
              variant="hero"
              size="lg"
              className="text-lg px-8 py-4"
              onClick={() => navigate("/auth")}
            >
              <Users className="w-5 h-5 mr-2" />
              Join the Community
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
