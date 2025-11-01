import React, { useState, useEffect } from 'react';

function SplashScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#A3B899] to-[#3A5A40] bg-gradient-animate">
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-[#F3F3F3] tracking-light text-5xl font-bold leading-tight text-center animate-fade-in-scale">
          Trackt.
        </h1>
      </div>

      <div className="w-full max-w-xs p-4 mb-16 opacity-0 animate-fade-in-scale-delayed">
        <div className="flex flex-col gap-3">
          <div className="rounded-full bg-white/20">
            <div
              className="h-2 rounded-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
