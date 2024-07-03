// Pegando as tags do HTML
const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');

// Validar se foi digitado uma palavra com pelo menos 3 caracteres
const validarInput = ({ target }) => {
    if (target.value.length > 2) {
        button.removeAttribute('disabled');
        return;
    }
    button.setAttribute('disabled', '');
}

const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('player', input.value); // 'player' deve ser consistente
    window.location = '../pages/game.html';
}

// Adicionando evento na tag input, toda vez que o input for preenchido uma função vai ser executada
input.addEventListener('input', validarInput);
form.addEventListener('submit', handleSubmit); // Corrigir para adicionar o evento 'submit' ao formulário
