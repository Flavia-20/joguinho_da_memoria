//pegando as teags do HTML
const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');

// const validarInput = (evento) => {
//   validar se foi digitado uma palavra com pelomenos 3 caracteres
//   console.log(evento.target.value); o target tras o que esta sendo digitado
//aqui esta pegando o evento e dele pegando o target mas dá pra fazer iso direto no parâmetro da função
// }

//Assim fica penagando o valor do input direto no parâmetro, se chama destructure, eu tenho um enento e dele o target
const validarInput = ({target})=>{
//   validar se foi digitado uma palavra com pelomenos 3 caracteres
    if(target.value.length > 2){
      button.removeAttribute('disabled');
      return;
    }
    button.setAttribute('disabled','');
    
}

const handleSubmit = (event) =>{
  event.preventDefault();

  localStorage.setItem('Player',input.value);//primeiro parametro é a chave do valor a ser salvo e o segundo vai ser o valor em si
  window.location = 'pages/game.html';
}

//adicionando evento na tag input, toda vez que o input for preenchido uma função vai ser executada
input.addEventListener('input', validarInput);
input.addEventListener('form', handleSubmit);




