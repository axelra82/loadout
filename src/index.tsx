import { render } from "solid-js/web";
import { CssBaseline, ThemeProvider, createTheme } from "@suid/material";
import App from "./app";
import "./index.css";

const theme = createTheme({
	palette: {
		mode: "dark", // or "light"
	},
});

render(
	() => (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	),
	document.getElementById("root") as HTMLElement
);
