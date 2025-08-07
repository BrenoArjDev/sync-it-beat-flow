import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface AddFavoriteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFavoriteAdded: () => void;
}

export const AddFavoriteModal = ({ open, onOpenChange, onFavoriteAdded }: AddFavoriteModalProps) => {
  const [artist, setArtist] = useState("");
  const [musicName, setMusicName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<'artist' | 'album'>('artist');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!artist.trim() || !musicName.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both artist and music/album name.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('user_favorites')
        .insert({
          user_id: user?.id || null,
          type,
          name: musicName.trim(),
          artist: artist.trim(),
          description: description.trim() || null,
          image_url: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=300&h=300&fit=crop`
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your favorite has been added!"
      });

      setArtist("");
      setMusicName("");
      setDescription("");
      onOpenChange(false);
      onFavoriteAdded();
    } catch (error) {
      console.error('Error adding favorite:', error);
      toast({
        title: "Error",
        description: "Failed to add favorite. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-2xl bg-music-dark border-music-gray">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Heart className="w-5 h-5 text-music-pink" />
            Add to Favorites
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={type === 'artist' ? 'default' : 'ghost'}
              onClick={() => setType('artist')}
              className={type === 'artist' ? 'bg-music-purple text-white' : 'text-muted-foreground'}
            >
              Artist
            </Button>
            <Button
              variant={type === 'album' ? 'default' : 'ghost'}
              onClick={() => setType('album')}
              className={type === 'album' ? 'bg-music-purple text-white' : 'text-muted-foreground'}
            >
              Album
            </Button>
          </div>
          
          <Input
            placeholder="Artist name"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="bg-music-gray border-music-gray text-white placeholder:text-muted-foreground"
          />
          
          <Input
            placeholder={type === 'artist' ? 'Song or representative track' : 'Album name'}
            value={musicName}
            onChange={(e) => setMusicName(e.target.value)}
            className="bg-music-gray border-music-gray text-white placeholder:text-muted-foreground"
          />
          
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-music-gray border-music-gray text-white placeholder:text-muted-foreground"
          />
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {user ? `Adding as ${user.email?.split('@')[0]}` : 'Adding anonymously'}
            </p>
            
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="text-muted-foreground hover:text-white"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !artist.trim() || !musicName.trim()}
                className="bg-music-pink hover:bg-music-pink/80 text-white"
              >
                <Heart className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Adding...' : 'Add Favorite'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};