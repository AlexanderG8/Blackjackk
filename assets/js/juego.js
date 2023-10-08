/**
 * 2C = Two of clubs
 * 2D = Two of Diaminds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

const miModulo = (() => {
    "use strict";

    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://unpkg.com/sweetalert/dist/sweetalert.min.js';
    head.appendChild(script);
    

    let deck = [],
        puntosJugadores = [];

    const tipos = ["C", "D", "H", "S"],
        especiales = ["A", "J", "Q", "K"],
        divCartasJugadores = document.querySelectorAll(".divCartas"),
        btnPedir = document.querySelector("#btnPedir"),
        btnDetener = document.querySelector("#btnDetener"),
        btnNuevo = document.querySelector("#btnNuevo"),
        puntosHTML = document.querySelectorAll("small");

    //Esta función inicializa el juego
    const inicializaJuego = (numJugadores = 2) => {
        deck = crearDeck();

        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        //Pone en cero los puntos en html
        puntosHTML.forEach( elem => elem.innerText = 0);
        divCartasJugadores.forEach( elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    };

    //Se creo función que permite crear bajara
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }
        return _.shuffle(deck);
    };

    //Se creo función que permite tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw "No hay cartas en la bajara";
        }
        return deck.pop();
    };

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
    };

    //turno: 0 = Primer jugador y el último será la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    };

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement("img");
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta)
    };

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                //alert("Nadie gana :(");
                swal("Nadie gana!", "Nadie gano jeje");
            } else if (puntosMinimos > 21) {
                //alert("Computadora Gana");
                swal("Computadora Gana!", "Que mal por tí");
            } else if (puntosComputadora > 21) {
                //alert("Jugador Gana");
                swal("Jugador Gana!", "Genial, ha buena hora ganaste");
            } else {
                //alert("Computadora Gana");
                swal("Computadora Gana!", "Que mal por tí");
            }
        }, 100);
    };

    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

        determinarGanador();
    };

    btnPedir.addEventListener("click", () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener("click", () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    btnNuevo.addEventListener("click", () => {
        inicializaJuego();
    });

    //Aquí retornamos el unico valor que quiero que sea publico.
    return {
        nuevoJuego : inicializaJuego
    };

})();
