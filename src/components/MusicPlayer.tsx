import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Repeat,
  Shuffle,
  Heart,
  List,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Track = {
  id: string;
  name: string;
  artist_name: string;
  audio: string;
  album_image: string;
  album_name: string;
  duration: number;
};

export const MusicPlayer = () => {
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekValue, setSeekValue] = useState(0);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const clientId = "34419d7c";

  useEffect(() => {
    fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=10`
    )
      .then((res) => res.json())
      .then((data) => {
        setTracks(data.results);
      });
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        playNext();
      }
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isRepeat, currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
      setIsSeeking(false);
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    setIsSeeking(false);
    setCurrentTime(0);
  }, [currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume[0] / 100;
    }
  }, [volume]);

  useEffect(() => {
    let animationFrameId: number;

    const updateCurrentTime = () => {
      if (!isSeeking && audioRef.current && !audioRef.current.paused) {
        setCurrentTime(audioRef.current.currentTime);
      }
      animationFrameId = requestAnimationFrame(updateCurrentTime);
    };

    animationFrameId = requestAnimationFrame(updateCurrentTime);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isSeeking, isPlaying]);

  const currentTrack = tracks[currentIndex];

  const playNext = () => {
    if (tracks.length === 0) return;

    if (isShuffle) {
      let nextIndex = Math.floor(Math.random() * tracks.length);
      while (nextIndex === currentIndex && tracks.length > 1) {
        nextIndex = Math.floor(Math.random() * tracks.length);
      }
      setCurrentIndex(nextIndex);
    } else {
      setCurrentIndex((prev) => (prev + 1) % tracks.length);
    }
  };

  const playPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const formatTime = (seconds: number) => {
    const floored = Math.floor(seconds);
    const mins = Math.floor(floored / 60);
    const secs = floored % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {/* Floating Player */}
      <div className="fixed bottom-4 right-4 z-50 cursor-pointer">
        <Card className="p-4 gradient-card border-music-gray shadow-hover backdrop-blur-md max-w-sm">
          <div className="flex items-center gap-3">
            <img
              src={currentTrack?.album_image}
              alt={currentTrack?.name}
              className="w-12 h-12 rounded-lg object-cover"
            />

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-white truncate">
                {currentTrack?.name}
              </h4>
              <p className="text-xs text-muted-foreground truncate">
                {currentTrack?.artist_name}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-white hover:bg-primary"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
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
              value={[isSeeking ? seekValue : currentTime]}
              max={currentTrack?.duration}
              step={1}
              onValueChange={(value) => {
                setIsSeeking(true);
                setSeekValue(value[0]);
              }}
              onValueCommit={(value) => {
                const audio = audioRef.current;
                if (audio) {
                  audio.currentTime = value[0];
                }
                setCurrentTime(value[0]);
                setIsSeeking(false);
              }}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(currentTrack?.duration ?? 0)}</span>
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
                  src={currentTrack?.album_image}
                  alt={currentTrack?.album_name}
                  className="w-48 h-48 mx-auto rounded-2xl object-cover shadow-glow"
                />
              </div>

              {/* Track Info */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {currentTrack?.name}
                </h3>
                <p className="text-lg text-music-pink mb-1">
                  {currentTrack?.artist_name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {currentTrack?.album_name}
                </p>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <Slider
                  value={[isSeeking ? seekValue : currentTime]}
                  max={currentTrack?.duration}
                  step={1}
                  onValueChange={(value) => {
                    setIsSeeking(true);
                    setSeekValue(value[0]);
                  }}
                  onValueCommit={(value) => {
                    const audio = audioRef.current;
                    if (audio) {
                      audio.currentTime = value[0];
                    }
                    setCurrentTime(value[0]);
                    setIsSeeking(false);
                  }}
                  className="w-full mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(currentTrack?.duration ?? 0)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`text-white ${
                    isShuffle ? "text-music-blue" : "text-white"
                  }`}
                  onClick={() => setIsShuffle(!isShuffle)}
                >
                  <Shuffle className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white"
                  onClick={playPrev}
                >
                  <SkipBack className="w-6 h-6" />
                </Button>
                <Button
                  variant="hero"
                  size="icon"
                  className="w-14 h-14"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white"
                  onClick={playNext}
                >
                  <SkipForward className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`text-white ${
                    isRepeat ? "text-music-blue" : "text-white"
                  }`}
                  onClick={() => setIsRepeat(!isRepeat)}
                >
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
                <h4 className="text-sm font-medium text-white mb-3">Tracks</h4>
                <div className="space-y-2">
                  {tracks.map((track, index) => (
                    <div
                      key={track.id}
                      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-smooth
      ${index === currentIndex ? "bg-white/10" : "hover:bg-white/5"}`}
                      onClick={() => setCurrentIndex(index)}
                    >
                      <img
                        src={track.album_image}
                        alt={track.name}
                        className="w-8 h-8 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0 flex items-center">
                        {index === currentIndex && (
                          <Play className="w-3 h-3 text-music-pink inline mr-1" />
                        )}
                        <p className="text-sm text-white truncate">
                          {track.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
      {currentTrack?.audio && <audio ref={audioRef} src={currentTrack.audio} />}
    </>
  );
};
