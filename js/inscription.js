import { startLoader } from "./loader.js";
startLoader();
const $nav = {
	$menu: document.querySelector("#menu"),
	$bar: document.querySelector("#bar"),
};

//!Active nav
$nav.$menu.addEventListener("click", () => {
	$nav.$bar.classList.toggle("bar-on");
});
