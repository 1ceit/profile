import { useState, useEffect } from 'react';
import '../styles/Typewriter.css';

const MESSAGES = [
  'Computers have lots of memory but no imagination.',
  'It is far better to be alone, than to be in bad company. - George Washington',
  'A man who is a master of patience is master of everything else. - George Savile'
];

const SPEED = 10;
const DELETE_SPEED = 5;

export default function Typewriter() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentMessage = MESSAGES[currentMessageIndex];
    const typingSpeed = isDeleting ? DELETE_SPEED * 10 : SPEED * 10;

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000); // Pause for 2 seconds before deleting

      return () => clearTimeout(pauseTimer);
    }

    if (!isDeleting && currentText === currentMessage) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentMessageIndex((prev) => (prev + 1) % MESSAGES.length);
      return;
    }

    const timer = setTimeout(() => {
      if (isDeleting) {
        setCurrentText(currentMessage.substring(0, currentText.length - 1));
      } else {
        setCurrentText(currentMessage.substring(0, currentText.length + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, isPaused, currentMessageIndex]);

  return (
    <div className="typewriter-container">
      <span className="typewriter-text" style={{ color: '#ffffff' }}>
        {currentText}
        <span className="typewriter-cursor">|</span>
      </span>
    </div>
  );
}
