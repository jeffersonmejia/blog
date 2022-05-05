const d = document;

const $formEl = {
	$form: d.querySelector("form"),
	$input: d.querySelectorAll(".input"),
	$submit: d.querySelector("form .submit-off"),
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
	submit: "Solicitud enviada correctamente",
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

$formEl.$input.forEach((el) => {
	el.addEventListener("blur", () => {
		//MEJORAR ESTOS CONDICIONALES, PENDIENTE
		if (fill.name === true && fill.lastname === true && fill.topic === true) {
			$formEl.$submit.classList.toggle("submit-on");
		}
	});
});

$formEl.$form.addEventListener("submit", (e) => {
	e.preventDefault();
	if (fill.name === true && fill.lastname === true && fill.topic === true) {
		$formEl.$alert.$submit.classList.toggle("submit-send");
		$formEl.$alert.$submit.innerHTML = alerts.submit;
		setTimeout(() => {
			$formEl.$alert.$submit.innerHTML = "";
			$formEl.$alert.$submit.classList.remove("submit-send");
			$formEl.$form.reset();
		}, 3000);
	}
});
