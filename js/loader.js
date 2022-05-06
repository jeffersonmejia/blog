import { appConfig } from "./config.js";
export function startLoader() {
	// Set 1 to enable, 0 to disable
	const $loader = document.querySelector("main .loader");
	// Start loader when page load
	window.addEventListener("load", () => {
		if (appConfig.loader === 1) {
			$loader.classList.toggle("loader-on");
			setTimeout(() => {
				$loader.classList.remove("loader-on");
			}, 3000);
		}
	});
}
