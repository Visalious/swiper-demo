"use client"
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import EventCard from './Card/Card';
import { Events } from '@/DB/DummyData'; // Assuming this is your dummy data file

const TinderCards = () => {
  const tinderContainerRef = useRef(null);
  const [swipeDirection, setSwipeDirection] = useState(null);

  useEffect(() => {
    // Dynamic import Hammer.js to ensure it's loaded only on the client-side
    import('hammerjs').then(Hammer => {
      const tinderContainer = tinderContainerRef.current;
      const allCards = tinderContainer.querySelectorAll('.tinder--card');
      let isPanning = false;

      function initCards() {
        const newCards = tinderContainer.querySelectorAll('.tinder--card:not(.removed)');
        newCards.forEach((card, index) => {
          card.style.zIndex = allCards.length - index;
          card.style.transformOrigin = 'center bottom';

          if (index === 0) {
            card.style.opacity = '1';
            card.style.transform = `scale(1) translate(0, 0) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
          } else if (index === 1) {
            card.style.opacity = '0.7';
            card.style.transform = `scale(0.95) translateY(15px) translateZ(-5px) rotateX(0deg) rotateY(0deg)`;
          } else if (index === 2) {
            card.style.opacity = '0.4';
            card.style.transform = `scale(0.9) translateY(30px) translateZ(-10px) rotateX(0deg) rotateY(0deg)`;
          } else {
            card.style.opacity = '0';
            card.style.transform = `scale(0.85) translateY(45px) translateZ(-15px) rotateX(0deg) rotateY(0deg)`;
          }

          card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          card.style.boxShadow = index < 3 ? '0 4px 8px rgba(0, 0, 0, 0.3)' : 'none';
        });
        tinderContainer.classList.add('loaded');
      }

      initCards();

      allCards.forEach((el) => {
        const hammertime = new Hammer.default(el); // Initialize Hammer.js

        hammertime.on('pan', (event) => {
          isPanning = true;
          el.classList.add('moving');
          if (event.deltaX === 0) return;

          const rotate = event.deltaX * 0.05;
          el.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
        });

        hammertime.on('panend', (event) => {
          if (!isPanning) return;

          el.classList.remove('moving');
          const moveOutWidth = window.innerWidth;
          const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

          el.classList.toggle('removed', !keep);

          if (keep) {
            el.style.transform = '';
          } else {
            const endX = event.deltaX > 0 ? moveOutWidth : -moveOutWidth;
            const rotate = event.deltaX > 0 ? 45 : -45;

            setSwipeDirection(event.deltaX > 0 ? 'right' : 'left');

            el.style.transform = `translate(${endX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
            el.style.transition = 'transform 0.5s ease-in-out';

            setTimeout(() => {
              el.style.display = 'none';
              initCards();
            }, 500);
          }

          isPanning = false;
        });

        hammertime.on('tap', () => {
          isPanning = false;
        });
      });
    });
  }, []);

  const listStyles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',
      marginTop: '20px',
      perspective: '1500px',
    }
  };
  useEffect(() => {
    const handleTouchMove = (e) => {
      e.preventDefault();
    };

    const attachTouchMoveListener = () => {
      const allCards = document.querySelectorAll('.tinder--card');
      allCards.forEach((card) => {
        card.addEventListener('touchmove', handleTouchMove, { passive: false });
      });
    };

    const detachTouchMoveListener = () => {
      const allCards = document.querySelectorAll('.tinder--card');
      allCards.forEach((card) => {
        card.removeEventListener('touchmove', handleTouchMove);
      });
    };

    // Attach the listener to all cards initially
    attachTouchMoveListener();

    return () => {
      // Clean up the listener on component unmount
      detachTouchMoveListener();
    };
  }, []);


  return (
    <div className="tinder" ref={tinderContainerRef}>
      <div style={listStyles.container} className='tinder--cards'>
        {Events.map((event, index) => (
          <div key={index} className='tinder--card' id='tinder-card'>
            <EventCard
              image={event.image}
              heading={event.heading}
              text={event.text}
              swipeDirection={swipeDirection}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TinderCards;

