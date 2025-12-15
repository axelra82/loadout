import "./styles/index.css";

const App = () => {
	const BuildInfo = () => {
		const environment = import.meta.env;

		return <section>
			{environment.viteEnv.VITE_APP_BUILD}
			<br />
			{environment.viteEnv.VITE_APP_VERSION}
			<br />
			{environment.viteEnv.VITE_APP_BUILD_TIME}</section>
	}

	return (
		<main>
			Contents
			<BuildInfo />
		</main>
	)
};

export default App;
