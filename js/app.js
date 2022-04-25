const form = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");
const alertName = document.getElementById("alert-name");
const alertLast = document.getElementById("alert-lastname");
const alertTopic = document.getElementById("alert-topc");

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
				alertName.innerHTML = listAlert.name.blank;
				alertName.style.color = colorAlert.incorrect;
			} else if (!expression.name.test(input.target.value)) {
				alertName.innerHTML = listAlert.name.incorrect;
				alertName.style.color = colorAlert.incorrect;
			} else {
				alertName.innerHTML = "";
			}

			break;
		}

		case "lastname": {
			if (input.target.value === "") {
				alertLast.innerHTML = listAlert.lastname.blank;
				alertLast.style.color = colorAlert.incorrect;
			} else if (!expression.lastname.test(input.target.value)) {
				alertLast.innerHTML = listAlert.lastname.incorrect;
				alertLast.style.color = colorAlert.incorrect;
			} else {
				alertLast.innerHTML = "";
			}
			break;
		}
		case "topic": {
			console.log("topic");
			break;
		}
	}
};

inputs.forEach((el) => {
	el.addEventListener("keyup", validate, true);
	el.addEventListener("blur", validate, true);
});

form.addEventListener(
	"click",
	(e) => {
		e.preventDefault();
	},
	false
);
