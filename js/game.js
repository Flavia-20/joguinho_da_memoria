const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');


//para melhorar a ciração das tags foi feita a função creatEelement
// const creatCard = () =>{

//     const card = document.createElement('div');
//     const front = document.createElement('div');
//     const back = document.createElement('div');

//     card.className = 'card';
//     front.className = 'face front';
//     back.className = 'face back';

//     card.appendChild(front);
//     card.appendChild(back);

//     grid.appendChild(card);
// }

//vamos criar uma lista com os nomes das imagens para represntar cada carta que temos 
const personagens =[
    "meme",
    "demonSlayer",
    "gatinho",
    "florkworks",
    "jolyrogersOnePiece",
    "divReconhecimento",
    "DragonBall",
    "vingadoresLogo",
    "pokebola",
    "simboloNaruto"
]

function sweetAlert2(){
    Swal.fire({
        title: `Vamos jogar de novo ${spanPlayer.innerHTML}?`,
        tex: "#ff0000",
        width: 800,
        padding: "1em",
        color: "#00FF00",
        confirmButtonText: "Vamos!!",
        confirmButtonColor: "#00FF00",
        backdrop: `
            rgba(0,0,123,0.4)
            url("../images/cat-nyan-cat.gif")
            left top
            no-repeat
            200
        `
    }).then(() =>{
        grid.innerHTML = "";
        timer.innerHTML = "";
        startTimer();
        loadGame();
    });  
};

function sweetAlertGanhou(){
    Swal.fire({
        title: `Parabéns, ${spanPlayer.innerHTML}!\n Seu tempo foi de: ${timer.innerHTML}`,
        tex: "#ff0000",
        width: 800,
        padding: "1em",
        color: "#00FF00",
        confirmButtonText: "ebaa!!",
        confirmButtonColor: "#00FF00",
        backdrop: `
            rgba(0,0,123,0.4)
            url("../images/cat-nyan-cat.gif")
            left top
            no-repeat
            
        `   
    }).then(() => {
        sweetAlert2();
    });
}

const creatEelement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if(disabledCards.length === 20){
        clearInterval(this.loop);
        sweetAlertGanhou();
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if(firstCharacter === secondCharacter){

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else{
        setTimeout(() => {

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 500); 
    }
}


const revealCard = ({target}) => {
//para garantir que uma carta virada não seja desvirada. Se a carta sá tem o className reveal-cards, então ela já foi desvirada
    if(target.parentNode.className.includes('reveal-card')){
        return;
    }
    if(firstCard === ''){
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === ''){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
}

//função que cria a carta
const creatCard = (personagem) =>{
    const card = creatEelement('div','card');
    const front = creatEelement('div','face front');
    const back = creatEelement('div','face back');

    front.style.backgroundImage =`url(../images/${personagem}.jpg)`; //assim as imagens dos personagens vão ser colocadas dinamicamente

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', personagem);/*coloca o nome do personagem como atributo para quando as carte=as forem reveladas usar isso para comparar se elas são as mesmas */

    return card;
}

//função para carregar o jogo
const loadGame =() => {
    //peguei os elementos de um Array e espalhei dentro de outro Array e passei...personagens para que elas viessem duplicadas
    const personagensDuplicados = [...personagens, ...personagens]; 
    // assim eu passo personagensDuplicadosno for eacth para que crie as cartas para todos os personagens
    
    const shuffledArray = personagensDuplicados.sort( () => Math.random()-0.5 ) //para embaralhar o array
    
    shuffledArray.forEach(personagem => {
        const card = creatCard(personagem);
        grid.appendChild(card);

    });
}

const startTimer = () => {

    this.loop = setInterval(() => {
      const currentTime = +timer.innerHTML;
      timer.innerHTML = currentTime + 1;
    }, 1000);
  
  };
  
  window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
    sweetAlertGanhou()
    
    }
