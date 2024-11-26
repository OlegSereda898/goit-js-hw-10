import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.querySelector('.form').addEventListener('submit', (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const delayInput = form.elements.delay;
    const stateInput = form.elements.state;

    const delay = parseInt(delayInput.value, 10);
    const state = stateInput.value;

    if (isNaN(delay) || delay <= 0) {
    iziToast.error({
        title: "Error",
        message: "Please enter a valid delay in milliseconds.",
        position: "topRight",
        backgroundColor: "#ffa000",
        messageColor: "#ffff",
        titleColor: "#ffff"
    });
    return;
    }

    createPromise(delay, state)
    .then((ms) => {
        iziToast.success({
        title: "✅ Success",
        message: `Fulfilled promise in ${ms}ms`,
        position: "topRight",
        backgroundColor: "#59a10d",
        messageColor: "#ffff",
        titleColor: "#ffff"
        });
    })
    .catch((ms) => {
        iziToast.error({
        title: "❌ Error",
        message: `Rejected promise in ${ms}ms`,
        position: "topRight",
        backgroundColor: "#ef4040",
        messageColor: "#ffff",
        titleColor: "#ffff"
        });
    });
});

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        if (state === 'fulfilled') {
        resolve(delay);
        } else {
        reject(delay);
        }
    }, delay);
    });
}
