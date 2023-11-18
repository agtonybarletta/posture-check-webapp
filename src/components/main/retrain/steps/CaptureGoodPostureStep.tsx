import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import GenericStep from "./GenericStep";

const CaptureGoodPostureStep = () => {
  const [progress, setProgress] = React.useState(1);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 1
      );
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <React.Fragment>
      <GenericStep>
        <Typography>CaptureGoodPostureStep</Typography>
        <CircularProgress variant="determinate" value={progress} />
      </GenericStep>
    </React.Fragment>
  );
};
export default CaptureGoodPostureStep;
