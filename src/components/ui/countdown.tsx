import React, { useEffect, useState } from "react";

interface CountdownProps {
  initialSeconds: number;
  onComplete: () => void;
}

const Countdown: React.FC<CountdownProps> = ({
  initialSeconds,
  onComplete,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      onComplete();
    }
  }, [seconds, onComplete]);

  return <div>{seconds} seconds remaining</div>;
};

export default Countdown;
