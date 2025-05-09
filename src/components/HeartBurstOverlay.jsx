import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import '../styles/HeartBurstAnimation.css';

const HeartBurstOverlay = ({ trigger }) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    if (!trigger) return;
    const id = Date.now();
    setHearts((prev) => [...prev, id]);
    const timeout = setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h !== id));
    }, 2000);
    return () => clearTimeout(timeout);
  }, [trigger]);

  return (
    <div className="heart-float-container">
      {hearts.map((id) => (
        <FaHeart key={id} className="floating-heart" />
      ))}
    </div>
  );
};

export default HeartBurstOverlay;
