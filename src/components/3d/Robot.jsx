import { memo, useRef, useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';

const Robot = memo(() => {
  const splineRef = useRef();
  const containerRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const onLoad = (spline) => {
    splineRef.current = spline;
    setIsLoading(false);
    if (spline._scene) {
      spline._scene.background = null;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      const canvas = containerRef.current?.querySelector('canvas');
      if (canvas) {
        canvas.style.background = 'transparent';
        canvas.style.backgroundColor = 'transparent';
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/assets/images/misc/grid.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-1/2 -translate-x-1/2 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse 40% 50% at 50% 30%, rgba(92, 51, 204, 0.3), transparent 70%)',
            filter: 'blur(40px)'
          }}
        />
      </div>

      {isLoading && isVisible && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-8 h-8 border-4 border-t-white/20 border-white/80 rounded-full animate-spin" />
        </div>
      )}

      {isVisible && (
        <Spline
          scene="/models/robot_follow_cursor_for_landing_page_mc.spline"
          onLoad={onLoad}
          style={{
            background: 'transparent',
            backgroundColor: 'transparent',
            position: 'relative',
            zIndex: 5
          }}
        />
      )}
    </div>
  );
});

Robot.displayName = 'Robot';

export default Robot;
