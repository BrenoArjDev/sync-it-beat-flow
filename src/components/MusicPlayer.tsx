import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Heart, List } from "lucide-react";
import { useState } from "react";

const currentTrack = {
  title: "The Less I Know The Better",
  artist: "Tame Impala",
  album: "Currents",
  image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop",
  duration: 216, // seconds
  currentTime: 45
};

const upNext = [
  {
    title: "One More Time",
    artist: "Daft Punk",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop"
  },
  {
    title: "bad guy",
    artist: "Billie Eilish", 
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop"
  }
];

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [isExpanded, setIsExpanded] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Floating Player */}
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="p-4 gradient-card border-music-gray shadow-hover backdrop-blur-md max-w-sm">
          <div className="flex items-center gap-3">
            <img 
              src={currentTrack.image}
              alt={currentTrack.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-white truncate">{currentTrack.title}</h4>
              <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
            </div>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="w-8 h-8 text-white hover:text-music-pink">
                <Heart className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-8 h-8 text-white hover:bg-primary"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-8 h-8 text-white hover:text-music-blue"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <Slider
              value={[currentTrack.currentTime]}
              max={currentTrack.duration}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{formatTime(currentTrack.currentTime)}</span>
              <span>{formatTime(currentTrack.duration)}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Expanded Player Modal */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="w-full max-w-lg gradient-card border-music-gray shadow-glow">
            <div className="p-8">
              {/* Close Button */}
              <div className="flex justify-end mb-4">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsExpanded(false)}
                  className="text-muted-foreground hover:text-white"
                >
                  ✕
                </Button>
              </div>

              {/* Album Art */}
              <div className="text-center mb-6">
                <img 
                  src={currentTrack.image}
                  alt={currentTrack.album}
                  className="w-48 h-48 mx-auto rounded-2xl object-cover shadow-glow"
                />
              </div>

              {/* Track Info */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{currentTrack.title}</h3>
                <p className="text-lg text-music-pink mb-1">{currentTrack.artist}</p>
                <p className="text-sm text-muted-foreground">{currentTrack.album}</p>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <Slider
                  value={[currentTrack.currentTime]}
                  max={currentTrack.duration}
                  step={1}
                  className="w-full mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatTime(currentTrack.currentTime)}</span>
                  <span>{formatTime(currentTrack.duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <Button variant="ghost" size="icon" className="text-white hover:text-music-purple">
                  <Shuffle className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:text-white">
                  <SkipBack className="w-6 h-6" />
                </Button>
                <Button 
                  variant="hero"
                  size="icon"
                  className="w-14 h-14"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:text-white">
                  <SkipForward className="w-6 h-6" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:text-music-purple">
                  <Repeat className="w-5 h-5" />
                </Button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-3 mb-6">
                <Volume2 className="w-5 h-5 text-muted-foreground" />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>

              {/* Up Next */}
              <div>
                <h4 className="text-sm font-medium text-white mb-3">Up Next</h4>
                <div className="space-y-2">
                  {upNext.map((track, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-smooth cursor-pointer">
                      <img 
                        src={track.image}
                        alt={track.title}
                        className="w-8 h-8 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{track.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};