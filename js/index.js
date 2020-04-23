import { isSelectDisabled } from "./validation.js";

const inputRectangles = document.querySelectorAll(".input-rectangle");
const customSelectWrapper = document.querySelector(".custom-select-wrapper");
const inputs = document.querySelectorAll(".form-input");
const selectOptions = document.querySelectorAll(".custom-option");

const customSelectRectangle = inputRectangles[0];


setEventListeners();

function setEventListeners() {
    setCustomSelectWrapperEvents();
    setSelectOptionsEvents();
    setFormInputsEvents();
    setWindowEvents();
}

function setCustomSelectWrapperEvents() {
    customSelectWrapper.addEventListener("click", function (e) {
        if (isSelectDisabled) return true;
        const customSelect = this.querySelector(".custom-select");
        customSelect.classList.toggle("open");
        const event = new Event("focus");
        if (!e.target.classList.contains("selected"))
            customSelect.dispatchEvent(event);
    });
}

function setSelectOptionsEvents() {
    selectOptions.forEach(option => {
        option.addEventListener("click", function (e) {
            customSelectRectangle.style.display = "none";
            if (!this.classList.contains("selected")) {
                this.parentNode.querySelector(".custom-option.selected").classList.remove("selected");
                this.classList.add("selected");
                this.closest(".custom-select").querySelector(".triggered-custom-select span").textContent = this.textContent;
            }
        })
    })
}

function setFormInputsEvents() {
    inputRectangles.forEach((rectangle, index) => {
        inputs[index].addEventListener("focus", () => {
            rectangle.style.display = "block";
        });
        inputs[index].addEventListener("blur", () => {
            rectangle.style.display = "none";
        });
    })
}

function setWindowEvents() {
    window.addEventListener("click", function (e) {
        const select = document.querySelector('.custom-select')
        if (!select.contains(e.target)) {
            customSelectRectangle.style.display = "none";
            select.classList.remove("open");
        }
    });
}
