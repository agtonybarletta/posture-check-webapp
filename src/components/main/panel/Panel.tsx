import { Box, Button, Stack, Switch } from "@mui/material";
import {  useCallback, useEffect, useState } from "react";
import { LineChart } from '@mui/x-charts/LineChart'


const Panel = (props: any) => {

  const MAX_VIEW_ELEMENT = 20;

  const slideArray = useCallback((array: any[]) => {
    return array.slice(Math.max(array.length - MAX_VIEW_ELEMENT, 0));
  },[]);
  let [text, setText] = useState("");
  let [correct, setCorrect] = useState([] as number[]);
  let [incorrect, setIncorrect] = useState([] as number[]);
  let [none, setNone] = useState([] as number[]);
  
  //TODO use "history object" that store all the classes story
  //TODO pass "history object" to "evaluator"

  useEffect(() => {
    let viewPred = props.pred.map((i: any) => {
      return i.toFixed(3);
    });
    setText(JSON.stringify(viewPred, null, 4).replaceAll(",", ",\n"));
    if ( props.pred.length == 3) {
      correct.push(props.pred[0]);
      incorrect.push(props.pred[1]);
      none.push(props.pred[2]);
      setCorrect([...slideArray(correct)]);
      setIncorrect([...slideArray(incorrect)]);
      setNone([...slideArray(none)]);
    }
  }, [text, props]);

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
          { correct.length > 0 &&
          <LineChart
            series={[
              {
                data: correct,
                color: 'green'
              },
              {
                data: incorrect,
                color: 'red'
              },
              {
                data: none,
                color: 'grey'
              },
            ]}
            width={400}
            height={200}
          /> }
          {/* <pre>{text}</pre> */}
        </Stack>
      </Box>
    </Box>
  );
};

export default Panel;
