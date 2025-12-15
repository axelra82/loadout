import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

import { execSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { name, version } from "./package.json";

// Set the version and build information.
process.env.VITE_APP_BUILD = execSync("git rev-parse HEAD").toString().trimEnd();
process.env.VITE_APP_BUILD_TIME = Date.now();
process.env.VITE_APP_NAME = name;
process.env.VITE_APP_VERSION = version;

export default defineConfig({
	plugins: [
		solidPlugin(),
		tailwindcss(),
		VitePWA({
			registerType: "autoUpdate",
			workbox: {
				cleanupOutdatedCaches: true,
			},
			manifest: {
				background_color: "#1E1E1E",
				display: "fullscreen",
				icons: [
					{
						src: "/pwa-64x64.png",
						sizes: "64x64",
						type: "image/png",
					},
					{
						src: "/pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
					{
						src: "/maskable-icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
				name: "LOADOUT",
				short_name: "loadout",
				start_url: "https://loadout.lalaland.app",
				theme_color: "#1E1E1E",
			},
		})
	],
	server: {
		port: 9999,
		host: "localhost",
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src")
		}
	},
});
