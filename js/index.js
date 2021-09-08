const clientHeight = window.innerHeight;
const background = document.querySelector(".background");

background.style.minHeight = `${clientHeight - Math.floor(clientHeight / 10)}px`;
background.style.maxHeight = `${clientHeight - Math.floor(clientHeight / 10)}px`;

function calculatingHeight(elem, parent, label) {

    let visible = true;
    const height = elem.clientHeight;

    const switcher = () => {
        visible ? parent.style.height = `${height}px` : parent.style.height = '0px';
        visible = !visible;
    }

    const isVisible = () => {
        return visible;
    }

    label.addEventListener('click', switcher);

    return {
        switcher,
        isVisible
    };
}