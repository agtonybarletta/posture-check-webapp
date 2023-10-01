import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typograpy from "@mui/material/Typography";

function Header(props: any) {
	return (
		<Box sx={{ p: 1 }}>
			<Typograpy variant="h2">
				Posture Check
			</Typograpy>
		</Box>
	);
}

export default Header;
