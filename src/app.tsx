import { timestampToLocaleDate } from "@/utilities";
import "./styles/index.css";

const App = () => {
	const copyToClipboard = async (text: string) => {
		await navigator.clipboard.writeText(text);
	};

	const BuildInfo = () => {
		const environment = import.meta.env;
		const buildTime = environment.VITE_APP_BUILD_TIME;
		const buildHash = environment.VITE_APP_BUILD;
		const buildVersion = environment.VITE_APP_VERSION;
		const repo = environment.VITE_APP_REPO;

		return (
			<section>
				<strong>Date:</strong> {timestampToLocaleDate(buildTime)}
				<br />
				<strong>Repo:</strong> <a href={repo}>GitHub</a>
				<br />
				<strong>Hash:</strong> <button
					onClick={() => copyToClipboard(buildHash)}
				>
					{buildHash}
				</button>
				<br />
				<strong>Version:</strong> {buildVersion}
			</section>
		);
	}

	return (
		<main>
			Contents
			<BuildInfo />
		</main>
	)
};

export default App;
