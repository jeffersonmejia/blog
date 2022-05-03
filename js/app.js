// Form valitations
const $formEl = {
	$form: document.getElementById("form"),
	$input: document.querySelectorAll("#form input"),
	$textarea: document.getElementById("#form textarea"),
	$submit: document.querySelector("#form #submit"),
};

const $alert = {
	$name: document.getElementById("alert-name"),
	$lastname: document.getElementById("alert-lastname"),
	$submit: document.querySelector("#form #alert-submit"),
};

const expression = {
	name: /^[a-zA-Z]{3,16}\s{1}[a-zA-Z]{3,16}$/,
	lastname: /^[a-zA-Z]{3,16}\s{1}[a-zA-Z]{3,16}$/,
	topic: /.{8,64}/,
};

const listAlert = {
	name: {
		blank: "Ingresa tu nombre, por favor",
		incorrect: "Ingresa un nombre válido",
	},
	lastname: {
		blank: "Ingresa tus apellidos, por favor",
		incorrect: "Ingresa un apellido válido",
	},
};

const colorAlert = {
	correct: "#00b515",
	incorrect: "#ff1100",
};

const validate = (input) => {
	switch (input.target.id) {
		case "name": {
			if (input.target.value === "") {
				$alert.$name.innerHTML = listAlert.name.blank;
				$alert.$name.style.color = colorAlert.incorrect;
			} else if (!expression.name.test(input.target.value)) {
				$alert.$name.innerHTML = listAlert.name.incorrect;
				$alert.$name.style.color = colorAlert.incorrect;
			} else {
				$alert.$name.innerHTML = "";
			}

			break;
		}

		case "lastname": {
			if (input.target.value === "") {
				$alert.$lastname.innerHTML = listAlert.lastname.blank;
				$alert.$lastname.style.color = colorAlert.incorrect;
			} else if (!expression.lastname.test(input.target.value)) {
				$alert.$lastname.innerHTML = listAlert.lastname.incorrect;
				$alert.$lastname.style.color = colorAlert.incorrect;
			} else {
				$alert.$lastname.innerHTML = "";
			}
			break;
		}
		case "topic": {
			console.log("topic");
			break;
		}
	}
};

$formEl.$input.forEach((el) => {
	el.addEventListener("keyup", validate, true);
});

$formEl.$form.addEventListener(
	"submit",
	(e) => {
		e.preventDefault();
	},
	false
);
