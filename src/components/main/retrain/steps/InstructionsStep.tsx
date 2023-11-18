import { Card, Stack, Typography } from "@mui/material";
import exp from "constants";
import React from "react";
import GenericStep from "./GenericStep";

const InstructionsStep = () => {
  return (
    <React.Fragment>
      <GenericStep alignItems="flex-left">
        <Typography variant="h2">Instructions</Typography>
        <Typography>
          You are going to calibrate the AI. As a first step you must assume a
          good posture for a couple of seconds. This will tell the AI what good
          posture looks like. Imagine that a string attached to the back of your
          neck is pulling you to the sealing.
        </Typography>
        <Typography>
          Then you will pretend to have a bad posture. This time the AI will
          learn about what poor posture looks like. Arched back and forward
          head.{" "}
        </Typography>
        <Typography>
          Finally the AI will learn and calibrate itself based on the captures
        </Typography>
      </GenericStep>
    </React.Fragment>
  );
};

export default InstructionsStep;
