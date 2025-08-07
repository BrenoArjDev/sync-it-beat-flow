import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare, Plus, Play, Users, Flame } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { AddDiscussionModal } from "./AddDiscussionModal";
import { AddFavoriteModal } from "./AddFavoriteModal";
import { toast } from "@/hooks/use-toast";

interface Favorite {
  id: string;
  type: 'artist' | 'album';
  name: string;
  artist?: string;
  description?: string;
  image_url?: string;
  created_at: string;
}

interface Discussion {
  id: string;
  content: string;
  username: string;
  created_at: string;
  likes_count: number;
  replies_count: number;
}


export const FavoritesSection = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [showDiscussionModal, setShowDiscussionModal] = useState(false);
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setFavorites(data || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const fetchDiscussions = async () => {
    try {
      const { data, error } = await supabase
        .from('discussions')
        .select(`
          *,
          likes_count:discussion_likes(count),
          replies_count:discussion_replies(count)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      
      const formattedDiscussions = (data || []).map(discussion => ({
        id: discussion.id,
        content: discussion.content,
        username: discussion.username,
        created_at: discussion.created_at,
        likes_count: discussion.likes_count?.[0]?.count || 0,
        replies_count: discussion.replies_count?.[0]?.count || 0
      }));
      
      setDiscussions(formattedDiscussions);
    } catch (error) {
      console.error('Error fetching discussions:', error);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchFavorites(), fetchDiscussions()]);
      setLoading(false);
    };
    
    loadData();
  }, []);

  const handleDiscussionAdded = () => {
    fetchDiscussions();
  };

  const handleFavoriteAdded = () => {
    fetchFavorites();
  };
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
              <Button 
                variant="music" 
                size="sm"
                onClick={() => setShowFavoriteModal(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Favorite
              </Button>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="text-center text-muted-foreground py-8">Loading favorites...</div>
              ) : favorites.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  No favorites yet. Add your first favorite!
                </div>
              ) : (
                favorites.map((item) => (
                  <Card key={item.id} className="p-4 gradient-card border-music-gray hover:shadow-hover transition-smooth group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img 
                          // src={item.image_url || `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop`}
                          src={`https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop`}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover group-hover:scale-105 transition-smooth"
                        />
                        {/* <Button 
                          variant="ghost" 
                          size="icon"
                          className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-smooth"
                        >
                          <Play className="w-5 h-5" />
                        </Button> */}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-white">{item.name}</h4>
                          <Badge variant="secondary" className="bg-music-purple text-white text-xs">
                            {item.type}
                          </Badge>
                        </div>
                        {item.artist && (
                          <p className="text-sm text-music-pink mb-1">{item.artist}</p>
                        )}
                        {item.description && (
                          <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                        )}
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{formatTimeAgo(item.created_at)}</span>
                        </div>
                      </div>

                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-music-pink">
                        <Heart className="w-5 h-5" />
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Discussions */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white">Recent Discussions</h3>
              <Button 
                variant="glass" 
                size="sm"
                onClick={() => setShowDiscussionModal(true)}
              >
                Join Discussion
              </Button>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="text-center text-muted-foreground py-8">Loading discussions...</div>
              ) : discussions.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  No discussions yet. Start the conversation!
                </div>
              ) : (
                discussions.map((discussion) => (
                  <Card key={discussion.id} className="p-4 gradient-card border-music-gray hover:shadow-hover transition-smooth">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {discussion.username[0].toUpperCase()}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-white">{discussion.username}</span>
                          <span className="text-xs text-muted-foreground">{formatTimeAgo(discussion.created_at)}</span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                          {discussion.content}
                        </p>
                        
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="text-xs p-0 h-auto text-muted-foreground hover:text-music-pink">
                            <Heart className="w-3 h-3 mr-1" />
                            {discussion.likes_count}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs p-0 h-auto text-muted-foreground hover:text-music-blue">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            {discussion.replies_count}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      
      <AddDiscussionModal 
        open={showDiscussionModal}
        onOpenChange={setShowDiscussionModal}
        onDiscussionAdded={handleDiscussionAdded}
      />
      
      <AddFavoriteModal 
        open={showFavoriteModal}
        onOpenChange={setShowFavoriteModal}
        onFavoriteAdded={handleFavoriteAdded}
      />
    </section>
  );
};