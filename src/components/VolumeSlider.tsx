import { useState, useEffect } from 'react';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import '../styles/VolumeSlider.css';

interface VolumeSliderProps {
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  audioRef?: React.RefObject<HTMLAudioElement | null>;
}

export default function VolumeSlider({ videoRef, audioRef }: VolumeSliderProps) {
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('profile-volume');
    return saved ? parseInt(saved, 10) : 50;
  });
  
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('profile-muted') === 'true';
  });
  
  const [isVisible, setIsVisible] = useState(false);

  // Sync media to localStorage
  useEffect(() => {
    const media = videoRef?.current || audioRef?.current;
    if (media) {
      media.volume = volume / 100;
      media.muted = isMuted;
    }
    
    localStorage.setItem('profile-volume', volume.toString());
    localStorage.setItem('profile-muted', isMuted.toString());
  }, [volume, isMuted, videoRef, audioRef]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div
      className="volume-control"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <button
        className="volume-icon-btn"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted || volume === 0 ? (
          <HiVolumeOff size={24} />
        ) : (
          <HiVolumeUp size={24} />
        )}
      </button>

      <div className={`volume-slider-container ${isVisible ? 'visible' : ''}`}>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
          aria-label="Volume"
          style={{
            background: `linear-gradient(to right, #ffffff ${volume}%, rgba(255, 255, 255, 0.3) ${volume}%)`
          }}
        />
      </div>
    </div>
  );
}
