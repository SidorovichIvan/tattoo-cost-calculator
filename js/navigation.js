const wrapperDetails = document.querySelector('.wrapper__details');
const detailsLink = document.querySelector("#details-link");

const pictureButton = document.querySelector("#picture-link");
const textButton = document.querySelector("#text-link");

const picture = document.querySelector("#picture");
const navigation = document.querySelector("#navigation");
const text = document.querySelector("#text");

const backButton = document.querySelectorAll(".back-button");

const navigationContainer = document.querySelector("#navigation-container");

const navigationContainerHeight = window.innerHeight + 'px';
navigationContainer.style.maxHeight = navigationContainerHeight

calculatingHeight(wrapperDetails.firstElementChild, wrapperDetails, detailsLink);

detailsLink.addEventListener('click', () => {
    detailsLink.firstElementChild.classList.toggle("fa-plus");
    detailsLink.firstElementChild.classList.toggle("rotation-plus");
})


backButton.forEach(button => {
    button.addEventListener('click', () => {
        navigationContainer.style.maxHeight = navigationContainerHeight;

        navigation.style.left = "-100%";
        text.style.left = "-100%";
        picture.style.left = "-100%";
    })
})


textButton.addEventListener('click', () => {
    navigationContainer.style.maxHeight = 'fit-content';

    navigation.style.left = "-200%";
    text.style.left = "-200%";
    picture.style.left = "-200%";
})

pictureButton.addEventListener('click', () => {
    navigationContainer.style.maxHeight = 'fit-content';

    navigation.style.left = "0%";
    text.style.left = "0%";
    picture.style.left = "0%";
})