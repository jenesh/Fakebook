console.log('Login page');

const getNode = (target) => document.querySelector(target);

const button = getNode('input[type="button"]');

console.log(button)

button.addEventListener('click', () => {
    window.alert('clicked')
})