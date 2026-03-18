import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownTimer = ({ targetDate = "2026-04-07T00:00:00" }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = Object.keys(timeLeft).map((interval, i) => {
    return (
      <div key={interval} className="flex flex-col items-center mx-2 md:mx-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-dark-card border border-primary/20 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.15)] mb-2"
        >
          <span className="text-2xl md:text-3xl font-display font-bold text-primary">
            {timeLeft[interval].toString().padStart(2, '0')}
          </span>
        </motion.div>
        <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider font-semibold">
          {interval}
        </span>
      </div>
    );
  });

  return (
    <div className="flex justify-center items-center py-8">
      {timerComponents}
    </div>
  );
};

export default CountdownTimer;
