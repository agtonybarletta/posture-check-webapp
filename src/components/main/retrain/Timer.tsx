import { CircularProgress } from "@mui/material";
import React, { useState } from "react";

const Timer = (props: {
  seconds: number;
  countdown: boolean;
  color: "primary" | "success" | "error" | "warning";
  onTimeout?: () => void;
}) => {
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState(undefined as any);

  React.useEffect(() => {

    const updateRate = 100; // milliseconds
    // updateRate / tot_mills = increment / 100 => increment =  
    const increment =  updateRate * 100/ (props.seconds * 1000 );
    const timerHandler = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress >= 100 ? 100 : prevProgress + increment; 
        return nextProgress;
      });
      return () => {
        clearInterval(timer);
        if (props.onTimeout) props.onTimeout();
      };
    }, updateRate );
    setTimer(timerHandler);
  }, [setProgress, setTimer]);

  React.useEffect( () => {
        if (progress == 100) {
          clearInterval(timer);
          if (props.onTimeout) props.onTimeout();
        }

  },[timer, progress]);


  return (
    <React.Fragment>
      <CircularProgress
        variant="determinate"
        value={props.countdown ? 100 - progress : progress}
        color={props.color}
      />
    </React.Fragment>
  );
};

export default Timer;
