const email = document.querySelector('#email').value
const password = document.querySelector('#password').value
const userInfos = { email: email, password: password }
let loginConnexion = document.querySelector('#login-connexion')
const messageError = document.querySelector('#error')

function redirectionHomePage(){
    document.location.href="index.html";
}


async function sendFormConnexion(e) {
    e.preventDefault()
    let emailValue = document.querySelector('#email').value
    let passwordValue = document.querySelector('#password').value
    console.log(passwordValue)
    let user = {
        email: emailValue,
        password: passwordValue,
    }

    try {
        const response = await fetch(baseUrl + 'users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
            if (response.ok) {
                const data =  await response.json();
                const token = data.token;
                localStorage.setItem('token', token);
                
                window.location.href='index.html';
            } else {
                messageError.textContent = "Erreur dans l’identifiant ou le mot de passe";
                setTimeout(() => {
                    messageError.style.display = 'none';
                }, 5000);
            }
        }
    catch (error) {
        console.log("Echec de l'authentification", error);
    }
}

loginConnexion.addEventListener('submit',  sendFormConnexion)

