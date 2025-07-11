document.addEventListener("DOMContentLoaded", function () {
	const forms = document.querySelectorAll(".reviewForm");

	forms.forEach(function (form) {
		form.addEventListener("submit", function (event) {
			event.preventDefault();

			const formInputs = form.querySelectorAll("input");

			let isValid = true;

			formInputs.forEach(function (input) {
				if (input.hasAttribute("required") && input.value.trim() === "") {
					isValid = false;
					alert("Please fill in all required fields.");
				}
			});

			if (isValid) {
				formInputs.forEach(function (input) {
					console.log(input.name + ": " + input.value);
				});
			}
		});
	});
});
