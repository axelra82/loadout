import { render } from "solid-js/web";
import { CssBaseline, ThemeProvider, createTheme } from "@suid/material";
import App from "./app";

const theme = createTheme({
	palette: {
		mode: "dark",
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
