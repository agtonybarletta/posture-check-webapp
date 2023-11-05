import { Box, Button, Stack, Switch } from "@mui/material";
import {  useEffect, useState } from "react";

const Panel = (props: any) => {

  let [text, setText] = useState("");

  useEffect(() => {
    let viewPred = props.pred.map((i: any) => {
      return i.toFixed(3);
    });
    setText(JSON.stringify(viewPred, null, 4).replaceAll(",", ",\n"));
  });

  const onToggleLoop = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      props.setLoopState(true);
    } else {
      props.setLoopState(false);
    }
  };


  return (
    <Box
      className="View"
      sx={{
        flexDirection: "column",
        justifyContent: "center",
        alignProperty: "center",
      }}
    >
      <Box
        sx={{
          padding: 3,
          zIndex: "modal",
          maxHeight: "400px",
          maxWidth: "400px",
          overflow: "visible",
        }}
      >
        <Stack direction="column" spacing={6}>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={props.onCapture}>
              Capure
            </Button>
            <Switch onChange={onToggleLoop} checked={props.loopState} />
          </Stack>
          <pre>{text}</pre>
        </Stack>
      </Box>
    </Box>
  );
};

export default Panel;
