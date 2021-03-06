//! danger
//* important
//todo: warning
//?suggest
import { startLoader } from "./loader.js";
startLoader();

const d = document;
//! Header mobile
const $nav = {
	$menu: document.querySelector("#menu"),
	$bar: document.querySelector("#bar"),
};
console.log($nav);
// Validations on contact
const $formEl = {
	$form: d.querySelector("form"),
	$input: d.querySelectorAll(".input"),
	$alert: {
		$name: d.querySelector("form #alert-name"),
		$lastname: d.querySelector("form #alert-lastname"),
		$topic: d.querySelector("form #alert-topic"),
		$submit: d.querySelector("form #alert-submit"),
	},
};

let fill = {
	name: false,
	lastname: false,
	topic: false,
};

const expression = {
	names: {
		first: /^[a-zA-Z]{3,16}/,
		second: /\s[a-zA-Z]{3,16}/,
		space: /\s/,
	},
	topic: /^.{32,128}$/,
};

const alerts = {
	name: {
		first: "Ingresa tu nombre, por favor",
		space: "Ahora ingresa tu segundo nombre",
		second: "Ingresa tu segundo nombre, por favor",
	},
	lastname: {
		first: "Ingresa tu apellido, por favor",
		space: "Ahora ingresa tu segundo apellido",
		second: "Ahora ingresa tu segundo apellido",
	},
	topic: "El asunto debe contener mínimo 32 carácteres",
	submit: {
		accepted: "Solicitud enviada correctamente",
		denied: "Primero llena los campos, por favor",
	},
};
//!Active nav
$nav.$menu.addEventListener("click", () => {
	$nav.$bar.classList.toggle("bar-on");
});
//! Verify form before send to backend
$formEl.$form.addEventListener(
	"keyup",
	(e) => {
		switch (e.target.id) {
			case "name": {
				if (!expression.names.first.test(e.target.value)) {
					$formEl.$alert.$name.innerHTML = alerts.name.first;
				} else {
					if (expression.names.space.test(e.target.value)) {
						$formEl.$alert.$name.innerHTML = alerts.name.space;
						if (!expression.names.second.test(e.target.value)) {
							$formEl.$alert.$name.innerHTML = alerts.name.second;
						} else {
							$formEl.$alert.$name.innerHTML = "";
							fill.name = true;
						}
					}
				}
				break;
			}
			case "lastname": {
				if (!expression.names.first.test(e.target.value)) {
					$formEl.$alert.$lastname.innerHTML = alerts.lastname.first;
				} else {
					if (expression.names.space.test(e.target.value)) {
						$formEl.$alert.$lastname.innerHTML = alerts.lastname.space;
						if (!expression.names.second.test(e.target.value)) {
							$formEl.$alert.$lastname.innerHTML = alerts.lastname.second;
						} else {
							$formEl.$alert.$lastname.innerHTML = "";
							fill.lastname = true;
						}
					}
				}
				break;
			}
			case "topic": {
				if (!expression.topic.test(e.target.value)) {
					$formEl.$alert.$topic.innerHTML = alerts.topic;
				} else {
					$formEl.$alert.$topic.innerHTML = "";
					fill.topic = true;
				}
				break;
			}
		}
	},
	true
);
// *Check if form was sent
$formEl.$form.addEventListener("submit", (e) => {
	e.preventDefault();
	if (fill.name === true && fill.lastname === true && fill.topic === true) {
		$formEl.$alert.$submit.classList.toggle("submit-send");
		$formEl.$alert.$submit.innerHTML = alerts.submit.accepted;
		$formEl.$form.reset();
		fill.name = false;
		fill.lastname = false;
		fill.topic = false;
		setTimeout(() => {
			$formEl.$alert.$submit.innerHTML = "";
			$formEl.$alert.$submit.classList.remove("submit-send");
		}, 900);
	} else {
		$formEl.$alert.$submit.classList.remove("submit-send");
		$formEl.$alert.$submit.innerHTML = alerts.submit.denied;
	}
});
