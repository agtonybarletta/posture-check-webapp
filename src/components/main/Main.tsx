import React from "react";
import "./Main.css";
import View from "./view/View";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Panel from "./panel/Panel";
import DBGPanel from "./panel/DBGPanel";

function Main(props: any) {
  return (
    <Box maxWidth="xl" className="Main">
      <h1> Here I am showing main</h1>
      <Grid 
	  	container 
		justifyContent = "center" 
		spacing={2}
  		alignItems="center"
		sx={{ height: '80vh' }} 
		>
        <Grid item xs={6}>
      		<View></View>
        </Grid>
        <Grid item xs={6}>
      		<Panel></Panel>
        </Grid>
        <Grid item xs={12}>
      		<DBGPanel></DBGPanel>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Main;
