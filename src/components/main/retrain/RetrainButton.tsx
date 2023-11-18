import Button from "@mui/material/Button";
import React, {useCallback, useContext, useLayoutEffect} from "react";
import RetrainDialog from "./RetrainDialog";

const RetrainButton = ({})=> {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  },[]);
  const close = useCallback(() => {
    setIsOpen(false);
  },[]);
  
  return (
    <React.Fragment>
      <Button variant="contained" onClick={open}>
        Calibrate
      </Button>
      <RetrainDialog close={close} isOpen={isOpen}></RetrainDialog>
    </React.Fragment>
  );
};

export default RetrainButton;
