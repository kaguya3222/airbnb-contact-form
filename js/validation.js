const contactForm = document.querySelector(".contact-form");
const inputs = document.querySelectorAll(".form-input");
const formSubmitButton = contactForm.querySelector(".form-btn");
const textInputs = [];
const formErrors = document.querySelectorAll(".form-error");
const closeSubmitNotificationButton = document.querySelector(".close-submitted-block-btn");

inputs.forEach((input, index) => {
    if (inputs[index].closest(".form-item").querySelector(".form-error")) textInputs.push(input)
});

let isFormValid = true;
let isSelectDisabled = false;

const validations = [
    {
        node: inputs[1],
        pattern: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
        validate: function () {
            return this.pattern.test(this.node.value)
        },
        errorStatus: true
    },
    {
        node: inputs[2],
        pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
        validate: function () {
            return this.pattern.test(this.node.value)
        },
        errorStatus: true
    },
    {
        node: inputs[3],
        pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        validate: function () {
            return this.pattern.test(this.node.value)
        },
        errorStatus: true
    },
    {
        node: inputs[4],
        pattern: /\S+/,
        validate: function () {
            return this.pattern.test(this.node.value)
        },
        errorStatus: true
    }
]

setContactFormEvents();
setFormTextInputsEvents();
setCloseSubmitNotificationButtonEvents();

function setContactFormEvents() {
    contactForm.addEventListener("submit", e => {
        e.preventDefault();
        submitForm();
    })
}

function setFormTextInputsEvents() {
    textInputs.forEach((textInput, index) => {
        textInput.addEventListener("focus", () => {
            inputOnFocus(textInput);
            formErrors[index].style.visibility = "hidden";
        });

        textInput.addEventListener("blur", () => {
            !validations[index].validate() ? inputIsInvalid(textInput, index) : inputIsValid(textInput, index);
        });
    });
}

function setCloseSubmitNotificationButtonEvents() {
    closeSubmitNotificationButton.addEventListener("click", () => {
        location.reload();
    });
}

function submitForm() {
    formSubmitButton.disabled = true;
    formSubmitButton.innerHTML = `<div class="loader"></div>`;
    validateForm();
    if (isFormValid) {
        setDisabledStylesForInputs();
        formIsValid();
    }
}

function inputOnFocus(textInput) {
    textInput.closest(".input-block").classList.remove("invalid-input-block");
    textInput.closest(".input-block").classList.remove("valid-input-block");
}

function inputIsInvalid(textInput, index) {
    textInput.closest(".input-block").classList.add("invalid-input-block");
    formErrors[index].style.visibility = "visible";
}

function inputIsValid(textInput, index) {
    textInput.closest(".input-block").classList.add("valid-input-block");
    validations[index].errorStatus = false;
}

function validateForm() {
    textInputs.forEach((textInput, index) => {
        const blur = new Event("blur");
        textInput.dispatchEvent(blur);
        if (validations[index].errorStatus === true) isFormValid = false;
        formSubmitButton.innerHTML = "Submit";
    });
}

function setDisabledStylesForInputs() {
    const select = inputs[0];
    select.style.color = "#B6B6B6";
    inputs.forEach((input, index) => {
        if (index >= 1) input.disabled = true;
        const inputLabel = input.closest(".form-item").querySelector(".form-label");
        const inputBlock = input.closest(".input-block");
        inputBlock.style.borderColor = "#B6B6B6";
        inputLabel.style.color = "#B6B6B6";
    })
}

function formIsValid() {
    isSelectDisabled = true;
    formSubmitButton.innerHTML = `<div class="loader"></div>`
    setTimeout(() => {
        formSubmitButton.innerHTML = "Submit";
        document.querySelector(".contact-form-wrapper").style.display = "none";
        document.querySelector(".submitted-block").style.display = "block";
    }, 2000);
}

export {isSelectDisabled};