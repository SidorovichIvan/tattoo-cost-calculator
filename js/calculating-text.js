const inscription = document.querySelector("#inscription-text");

const radioButton = document.querySelectorAll(".forms-buttons__item-text");

const wrapperSelect = document.querySelectorAll(".wrapper__select-text");

const colorValue = document.querySelector("#color-value-text");

const widthRange = document.querySelector("#width-text");
const resultWidth = document.querySelector("#result-width-text");

const finalyPrice = document.querySelector("#price-text");

const parameters = {
    square: undefined,
    width: 5,
    color: undefined,
    quantity: undefined,
    printed: false
}

let showMessage = false;


function calculatingParameter() {
    if (parameters.width && parameters.quantity) {

        let widthOfOneLetter = +(parameters.width / parameters.quantity).toFixed(2),
            heightOfOneLetter = +(widthOfOneLetter / 0.7).toFixed(2);

        parameters.square = Math.ceil(heightOfOneLetter * widthOfOneLetter) * parameters.quantity;
    }
}

function priceCalculationText() {

    if (!parameters.color || parameters.quantity <= 0 || !parameters.square) {
        finalyPrice.textContent = "---";
        return;
    }

    if (!showMessage) {
        document.querySelector("#result-message-text").style.display = "block"
        showMessage = true;
    }

    let result = (((parameters.square <= 16 ? 0 : ((parameters.square - 16) * 30)) +
        3000) * parameters.color) * (parameters.printed ? 1.1 : 1);

    finalyPrice.textContent = Math.ceil(result / 50) * 50;
}

function textProcessing() {

    parameters.quantity = inscription.value.replace(/\s/g, '').length;

    if (parameters.quantity <= 0) {

        if (!inscription.classList.contains("inscription-text-danger")) {
            inscription.classList.add('inscription-text-danger');
        }
    } else {

        if (inscription.classList.contains("inscription-text-danger")) {
            inscription.classList.remove('inscription-text-danger');
        }

        calculatingParameter();
    }

    priceCalculationText();
}

function changeActiveButton() {
    parameters.printed = !parameters.printed

    radioButton.forEach(button => {
        button.classList.toggle('buttons__style-active');
    });

    priceCalculationText();
}

function changingWidthText() {
    resultWidth.textContent = widthRange.value;
    parameters.width = +widthRange.value;

    calculatingParameter()
    priceCalculationText();
}


inscription.addEventListener('input', textProcessing);


radioButton.forEach(radioButton => {
    radioButton.addEventListener('click', changeActiveButton);
});


widthRange.addEventListener("pointerdown", function () {
    widthRange.addEventListener("pointermove", changingWidthText);
});

widthRange.addEventListener("pointerup", function () {
    widthRange.removeEventListener("pointermove", changingWidthText);
});

widthRange.addEventListener("click", changingWidthText);


wrapperSelect.forEach(wrapperEl => {

    let selectMenu = wrapperEl.firstElementChild;
    let label = wrapperEl.previousElementSibling;

    const select = calculatingHeight(selectMenu, wrapperEl, label);

    const rotationArrow = () => {
        label.lastElementChild.classList.toggle("rotation-arrow");
    }

    selectMenu.addEventListener('click', (event) => {

        colorValue.textContent = event.target.textContent;
        parameters.color = +event.target.dataset.ratio;

        select.switcher();
        rotationArrow();
        priceCalculationText();
    })

    label.addEventListener("click", rotationArrow);

    backButton.forEach(button => {
        button.addEventListener('click', () => {
            if (!select.isVisible()) {
                select.switcher();
                rotationArrow();
            }
        })
    })
})