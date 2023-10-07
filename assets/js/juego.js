/**
 * 2C = Two of clubs
 * 2D = Two of Diaminds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const tipos = ['C','D', 'H', 'S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0;
let puntosComputadora = 0;
const puntosHTML = document.querySelectorAll('small');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
//Se creo función que permite crear bajara
const crearDeck = () =>{

    for( let i = 2; i <= 10; i++){
        for(let tipo of tipos){
            deck.push(i + tipo)
        }
    }

    for(tipo of tipos){
        for(let esp of especiales){
            deck.push( esp + tipo)
        }
    }

    deck = _.shuffle(deck);
    return deck;

}

crearDeck();

//Se creo función que permite tomar una carta
const pedirCarta = () => {

    if(deck.length === 0){
        throw 'No hay cartas en la bajara';
    }

    const carta = deck.pop();
    return carta;
}

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    
    return (isNaN(valor)) ? 
    (valor === 'A') ? 11 : 10 : valor * 1;
    
}

//Eventos


const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');

        divCartasComputadora.append(imgCarta);

        if(puntosMinimos > 21){
            break;
        }

    } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {
        if(puntosComputadora === puntosMinimos){
            //alert('Nadie gana :(');
            swal("Nadie gana!", "Nadie gano jeje");
        } else if(puntosMinimos > 21){
            //alert('Computadora Gana')
            swal("Computadora Gana!", "Que mal por tí");
        } else if( puntosComputadora > 21){
            //alert('Jugador Gana');
            swal("Jugador Gana!", "Genial, ha buena hora ganaste");
        } else {
            //alert('Computadora Gana');
            swal("Computadora Gana!", "Que mal por tí");
        }
    }, 100);
}


btnPedir.addEventListener('click', function(){
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');

    divCartasJugador.append(imgCarta);

    if(puntosJugador > 21){
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if(puntosJugador === 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }

});


btnDetener.addEventListener('click', function(){
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
})

btnNuevo.addEventListener('click', function(){

    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;
    
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
})