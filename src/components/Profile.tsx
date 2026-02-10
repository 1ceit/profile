import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { RiMapPin2Fill } from "react-icons/ri";
import Typewriter from './Typewriter';
import SocialLinks from './SocialLinks';
import VolumeSlider from './VolumeSlider';
import '../styles/Profile.css';

const springConfig = { stiffness: 250, damping: 15 };

// =========================================
// EDIT THIS SECTION TO CHANGE PROFILE DATA
// =========================================
const CONFIG = {
  username: 'iceit',
  bio: 'Computers have lots of memory but no imagination.',
  location: 'Virginia, US',
  discord: {
    avatar: '/a_c0e473a3218d0fa4548a26621901f99d.gif',
    avatarDecoration: '/a_3d1e6078b2e4c8865e0ad0f429d651b1.png',
  },
  effects: {
    pageEnterText: 'iceit...'
  },
  background: {
    type: 'video',
    url: '/background.mp4',
    poster: '/background.webp',
    blur: 0,
    opacity: 1
  }
};
// =========================================

export default function Profile() {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * -7;
    const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * 7;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  function handleEnter() {
    setHasEntered(true);
    if (isMobile && audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
    }
  }

  return (
    <div className="profile-wrapper">
      {/* Click to Enter Overlay */}
      {!hasEntered && (
        <motion.div
          className="enter-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleEnter}
          onKeyDown={(event: React.KeyboardEvent) => {
            if (event.key === ' ' || event.key === 'Enter') {
              handleEnter();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Click to enter"
        >
          <div className="enter-content">
            <h1 className="enter-title">{CONFIG.effects.pageEnterText}</h1>
            <p className="enter-subtitle">click to enter</p>
          </div>
        </motion.div>
      )}

      {/* Background Video or Image+Audio */}
      <div className="profile-background">
        {isMobile ? (
          <>
            {/* Mobile*/}
            <img
              src={CONFIG.background.poster}
              alt="Background"
              className="background-video"
              style={{
                filter: `blur(${CONFIG.background.blur}px)`,
                opacity: CONFIG.background.opacity
              }}
            />
            <audio
              ref={audioRef}
              loop
              muted
              playsInline
            >
              <source src={CONFIG.background.url} type="video/mp4" />
            </audio>
          </>
        ) : (
          /* Desktop*/
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            className="background-video"
            style={{
              filter: `blur(${CONFIG.background.blur}px)`,
              opacity: CONFIG.background.opacity
            }}
          >
            <source src={CONFIG.background.url} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Profile Card*/}
      <motion.div
        ref={cardRef}
        className={`profile-card ${hasEntered ? 'unfolded' : ''}`}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="profile-content">
          {/* Profile Header */}
          <div className="profile-header">
            <div className="avatar-container">
              <img
                src={CONFIG.discord.avatar}
                alt={`${CONFIG.username} avatar`}
                className="profile-avatar"
              />
              <img
                src={CONFIG.discord.avatarDecoration}
                alt="Avatar decoration"
                className="avatar-decoration"
              />
            </div>

            <h1 className="profile-username rainbow-gradient">
              {CONFIG.username}
            </h1>
          </div>

          {/* Bio*/}
          <div className="profile-bio">
            <Typewriter />
          </div>

          {/* Location */}
          <div className="profile-footer">
            <span className="location location-icon">
              <RiMapPin2Fill size={25} className="location-icon"/>
              {CONFIG.location}
            </span>
          </div>

          {/* Social Links */}
          <SocialLinks />
        </div>
      </motion.div>

      {/* Volume Slider*/}
      {hasEntered && (
        <VolumeSlider
          videoRef={isMobile ? undefined : videoRef}
          audioRef={isMobile ? audioRef : undefined}
        />
      )}
    </div>
  );
}
