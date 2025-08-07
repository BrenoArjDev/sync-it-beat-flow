import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface AddDiscussionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDiscussionAdded: () => void;
}

export const AddDiscussionModal = ({ open, onOpenChange, onDiscussionAdded }: AddDiscussionModalProps) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content for your discussion.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('discussions')
        .insert({
          content: content.trim(),
          user_id: user?.id || null,
          username: user?.email?.split('@')[0] || 'Anonymous'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your discussion has been posted!"
      });

      setContent("");
      onOpenChange(false);
      onDiscussionAdded();
    } catch (error) {
      console.error('Error posting discussion:', error);
      toast({
        title: "Error",
        description: "Failed to post discussion. Please try again.",
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
            <MessageSquare className="w-5 h-5 text-music-purple" />
            Join Discussion
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Textarea
            placeholder="Share your thoughts about music..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px] bg-music-gray border-music-gray text-white placeholder:text-muted-foreground resize-none"
          />
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {user ? `Posting as ${user.email?.split('@')[0]}` : 'Posting as Anonymous'}
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
                disabled={isSubmitting || !content.trim()}
                className="bg-music-purple hover:bg-music-purple/80 text-white"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Posting...' : 'Post'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};