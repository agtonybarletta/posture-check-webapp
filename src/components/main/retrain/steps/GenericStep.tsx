import {Stack} from "@mui/material";
import React from "react";

const GenericStep = (props: {children: any, alignItems?: string}) => {
  
  let alignItems = "center"
  if (props.alignItems != undefined) {
    alignItems = props.alignItems ;
  }
  return <React.Fragment>
    <Stack 
        direction="column"
        justifyContent="center"
        alignItems={alignItems}
        spacing={4}
        margin={12}
    >
    {props.children}
    </Stack>
  </React.Fragment>;
};
export default GenericStep;
