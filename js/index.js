const d = document;

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

const expression = {
	names: {
		first: /^[a-zA-Z]{3,16}/,
		second: /\s[a-zA-Z]{3,16}/,
		space: /\s/,
	},
	topic: /^.{32,64}$/,
};

const alerts = {
	name: {
		first: "Ingresa tu nombre, por favor",
		space: "Ahora ingresa tu segundo nombre",
		second: "Ingresa tu segundo nombre, por favor",
	},
	lastname: {
		first: "Ingresa tu nombre, por favor",
		second: "Ahora ingresa tu apellido",
	},
	topic: "El asunto debe contener mínimo 32 palabras",
};

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
						}
					}
				}
				break;
			}
			case "lastname": {
				console.log("it works");
				break;
			}
			case "topic": {
				console.log("it works");
				break;
			}
		}
	},
	true
);
