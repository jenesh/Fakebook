console.log('Login page');

const getNode = (target) => document.querySelector(target);

const login = getNode('#login');
const signup = getNode('#signup');

const port = 8000;

signup.addEventListener('click', async () => {
    console.log('Signup');
    const username = getNode('#username').value;
    const password = getNode('#password').value;

    const data = await axios.post(`http://localhost:${port}/user/add`, {username, password});

    console.log(data);

    if (data.data.success) {
        const data = await axios.get(`http://localhost:${port}/user/username/${username}`);
        console.log(data.data);
    }
})

login.addEventListener('click', async () => {
    console.log('Login');
    const username = getNode('#username').value;
    const password = getNode('#password').value;

    const data = await axios.post(`http://localhost:${port}/user/authenticate`, {username, password});
    console.log(data);
    if (data.data.success) {
        console.log('here')
        const sessionUser = data.data.session;
        // console.log(sessionUser)
        // const sessionUser = '';
        window.location = `/homepage/${sessionUser}`;
        // window.location = `/homepage`;
    } else {
        const errDiv = getNode('#login-error');
        const errMsg = document.createElement('p');
        errMsg.innerText = 'Login failed! Try again!';
        errDiv.appendChild(errMsg);
    }
})