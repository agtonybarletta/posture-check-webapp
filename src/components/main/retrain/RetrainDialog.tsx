import React, { ReactElement, useState } from "react";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import InstructionsStep from "./steps/InstructionsStep";
import CaptureGoodPostureStep from "./steps/CaptureGoodPostureStep";
import CapturePoorPostureStep from "./steps/CapturePoorPostureStep";
import TrainingStep from "./steps/TrainingStep";

interface RetrainStep {
  label: string;
  component: ReactElement;
  disableNext: boolean;
}

const RetrainDialog = (props: { close: () => void; isOpen: boolean }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [nextEnabled, setNextEnabled] = useState(true);

  const next = () => {
    if (activeStep == steps.length - 1) {
      close();
    } else {
      setActiveStep(activeStep + 1);
      if (steps[activeStep + 1].disableNext == true) {
        setNextEnabled(false);
      }
    }
  };

  const back = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const close = () => {
    setActiveStep(0);
    props.close();
  };

  const complete = () => {
    // enable next button
    setNextEnabled(true);
  };

  const steps: RetrainStep[] = [
    {
      label: "Instructions",
      component: <InstructionsStep></InstructionsStep>,
      disableNext: false,
    },
    {
      label: "Capture good posture",
      component: (
        <CaptureGoodPostureStep complete={complete}></CaptureGoodPostureStep>
      ),
      disableNext: true,
    },
    {
      label: "Capture poor posture",
      component: (
        <CapturePoorPostureStep complete={complete}></CapturePoorPostureStep>
      ),
      disableNext: true,
    },
    {
      label: "Training and calibration",
      component: <TrainingStep></TrainingStep>,
      disableNext: false,
    },
  ];

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        onClose={props.close}
        aria-labelledby="customized-dialog-title"
        open={props.isOpen}
        PaperProps={{
          sx: {
            minHeight: "80vh",
          },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Calibration
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={close}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Stepper activeStep={activeStep}>
            {steps.map((o, index) => {
              return (
                <Step key={index}>
                  <StepLabel>{o.label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {steps[activeStep].component}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            autoFocus
            onClick={back}
            disabled={activeStep == 0}
            sx={{ marginRight: "auto" }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            autoFocus
            onClick={next}
            disabled={!nextEnabled}
          >
            {activeStep == steps.length - 1 && "Close"}
            {activeStep < steps.length - 1 && "Next"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default RetrainDialog;
