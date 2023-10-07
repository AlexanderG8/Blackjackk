/**
 * 2C = Two of clubs
 * 2D = Two of Diaminds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const tipos = ['C','D', 'H', 'S'];
const especiales = ['A','J','Q','K'];

//Creamos la baraja
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
    console.log(deck);

    deck = _.shuffle(deck);
    console.log(deck);

}

crearDeck();
