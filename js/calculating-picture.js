const wrapperPicture = document.querySelectorAll('.wrapper__select-picture');

const colorValuePicture = document.querySelector("#color-value-picture");
const placeValuePicture = document.querySelector("#place-value-picture");

const widthRangePicture = document.querySelector("#width-picture");
const heightRangePicture = document.querySelector("#height-picture");

const resultHeightPicture = document.querySelector("#result-height-picture");
const resultWidthPicture = document.querySelector("#result-width-picture");

const finalyPricePicture = document.querySelector("#price-picture");

const parametersPicture = {
    height: 5,
    width: 5,
    color: undefined,
    place: undefined
}

let showMessagePicture = false;

function changingWidthPicture() {
    resultWidthPicture.textContent = widthRangePicture.value;
    parametersPicture.width = +widthRangePicture.value;

    priceCalculationPicture()
}

function changingHeightPicture() {
    resultHeightPicture.textContent = heightRangePicture.value;
    parametersPicture.height = +heightRangePicture.value;

    priceCalculationPicture()
}

function priceCalculationPicture() {
    if (!parametersPicture.color || !parametersPicture.place)
        return;

    if (!showMessagePicture) {
        document.querySelector("#result-message-picture").style.display = "block";
        showMessagePicture = true;
    }

    let square = parametersPicture.height * parametersPicture.width;
    let result = ((square <= 16 ? 0 : (square - 16) * parametersPicture.place) + 3000) * parametersPicture.color;

    finalyPricePicture.textContent = Math.ceil(result / 50) * 50;
}


widthRangePicture.addEventListener("pointerdown", function () {
    widthRangePicture.addEventListener("pointermove", changingWidthPicture);
});

heightRangePicture.addEventListener("pointerdown", function () {
    heightRangePicture.addEventListener("pointermove", changingHeightPicture);
});


widthRangePicture.addEventListener("pointerup", function () {
    widthRangePicture.removeEventListener("pointermove", changingWidthPicture);
});

heightRangePicture.addEventListener("pointerup", function () {
    heightRangePicture.removeEventListener("pointermove", changingHeightPicture);
});


widthRangePicture.addEventListener("click", changingWidthPicture);

heightRangePicture.addEventListener("click", changingHeightPicture);


wrapperPicture.forEach(wrapperEl => {

    let selectMenu = wrapperEl.firstElementChild;
    let label = wrapperEl.previousElementSibling;

    const select = calculatingHeight(selectMenu, wrapperEl, label);

    const rotationArrow = () => {
        label.lastElementChild.classList.toggle("rotation-arrow");
    }

    selectMenu.addEventListener('click', (event) => {

        if (selectMenu.id === 'color') {
            colorValuePicture.textContent = event.target.textContent;
            parametersPicture.color = +event.target.dataset.ratio;

        } else if (selectMenu.id === 'place') {
            placeValuePicture.textContent = event.target.textContent
            parametersPicture.place = +event.target.dataset.ratio
        };

        select.switcher();
        priceCalculationPicture();
        rotationArrow();
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