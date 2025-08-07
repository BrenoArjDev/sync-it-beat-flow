-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create profiles policies
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create discussions table
CREATE TABLE public.discussions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  username TEXT NOT NULL DEFAULT 'Anonymous',
  likes_count INTEGER NOT NULL DEFAULT 0,
  replies_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on discussions
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;

-- Create discussions policies
CREATE POLICY "Discussions are viewable by everyone" 
ON public.discussions 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create discussions" 
ON public.discussions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own discussions" 
ON public.discussions 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own discussions" 
ON public.discussions 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create user_favorites table
CREATE TABLE public.user_favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('artist', 'album')),
  name TEXT NOT NULL,
  artist TEXT NOT NULL,
  description TEXT,
  image_url TEXT DEFAULT 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on user_favorites
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- Create user_favorites policies
CREATE POLICY "User favorites are viewable by everyone" 
ON public.user_favorites 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create favorites" 
ON public.user_favorites 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own favorites" 
ON public.user_favorites 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites" 
ON public.user_favorites 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create discussion_likes table for tracking likes
CREATE TABLE public.discussion_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  discussion_id UUID NOT NULL REFERENCES public.discussions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(discussion_id, user_id)
);

-- Enable RLS on discussion_likes
ALTER TABLE public.discussion_likes ENABLE ROW LEVEL SECURITY;

-- Create discussion_likes policies
CREATE POLICY "Discussion likes are viewable by everyone" 
ON public.discussion_likes 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can like discussions" 
ON public.discussion_likes 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can remove their own likes" 
ON public.discussion_likes 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create discussion_replies table for tracking replies
CREATE TABLE public.discussion_replies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  discussion_id UUID NOT NULL REFERENCES public.discussions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  username TEXT NOT NULL DEFAULT 'Anonymous',
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on discussion_replies
ALTER TABLE public.discussion_replies ENABLE ROW LEVEL SECURITY;

-- Create discussion_replies policies
CREATE POLICY "Discussion replies are viewable by everyone" 
ON public.discussion_replies 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create replies" 
ON public.discussion_replies 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own replies" 
ON public.discussion_replies 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own replies" 
ON public.discussion_replies 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_discussions_updated_at
  BEFORE UPDATE ON public.discussions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_favorites_updated_at
  BEFORE UPDATE ON public.user_favorites
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_discussion_replies_updated_at
  BEFORE UPDATE ON public.discussion_replies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert some initial discussions
INSERT INTO public.discussions (content, username, likes_count, replies_count) VALUES
('What are your thoughts on the latest Taylor Swift album? The production quality is incredible!', 'MusicLover2024', 15, 8),
('Just discovered this amazing indie band called Arctic Monkeys. Their guitar work is phenomenal!', 'IndieExplorer', 23, 12),
('Classical music hits different when you''re studying. Chopin''s nocturnes are perfect for concentration.', 'ClassicalFan', 9, 4),
('Live concerts are back! Just saw The Weeknd and the energy was unmatched. What shows are you excited for?', 'ConcertGoer', 31, 19),
('Vinyl collecting is becoming expensive but there''s something magical about the analog sound quality.', 'VinylCollector', 18, 7);

-- Insert some initial favorites
INSERT INTO public.user_favorites (type, name, artist, description) VALUES
('album', 'Midnights', 'Taylor Swift', 'A dreamy exploration of sleepless nights and late-night thoughts'),
('artist', 'The Beatles', 'The Beatles', 'Legendary British rock band that revolutionized popular music'),
('album', 'Dark Side of the Moon', 'Pink Floyd', 'Progressive rock masterpiece with iconic album artwork'),
('artist', 'Billie Eilish', 'Billie Eilish', 'Genre-defying pop artist with a unique ethereal sound'),
('album', 'Random Access Memories', 'Daft Punk', 'Electronic music meets disco in this Grammy-winning album');