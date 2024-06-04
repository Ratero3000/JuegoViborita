let tamanoBloque = 25;
let totalFilas = 21; 
let totalColumnas = 40; 
let tablero;
let contexto;

let serpienteX = tamanoBloque * 5;
let serpienteY = tamanoBloque * 5;

let velocidadX = 0; 
let velocidadY = 0; 

let cuerpoSerpiente = [];

let comidaX;
let comidaY;

let juegoTerminado = false;

window.onload = function () {
    tablero = document.getElementById("board");
    tablero.height = totalFilas * tamanoBloque;
    tablero.width = totalColumnas * tamanoBloque;
    contexto = tablero.getContext("2d");

    colocarComida();
    document.addEventListener("keyup", cambiarDireccion); 
    setInterval(actualizar, 1000 / 10);
}

function actualizar() {
    if (juegoTerminado) {
        reiniciarJuego();
        return;
    }

    contexto.fillStyle = "gray";
    contexto.fillRect(0, 0, tablero.width, tablero.height);

    contexto.fillStyle = "blue";
    contexto.fillRect(comidaX, comidaY, tamanoBloque, tamanoBloque);

    if (serpienteX == comidaX && serpienteY == comidaY) {
        cuerpoSerpiente.push([comidaX, comidaY]);
        colocarComida();
    }

    for (let i = cuerpoSerpiente.length - 1; i > 0; i--) {
        cuerpoSerpiente[i] = cuerpoSerpiente[i - 1];
    }
    if (cuerpoSerpiente.length) {
        cuerpoSerpiente[0] = [serpienteX, serpienteY];
    }

    contexto.fillStyle = "red";
    serpienteX += velocidadX * tamanoBloque; 
    serpienteY += velocidadY * tamanoBloque; 
    contexto.fillRect(serpienteX, serpienteY, tamanoBloque, tamanoBloque);
    for (let i = 0; i < cuerpoSerpiente.length; i++) {
        contexto.fillRect(cuerpoSerpiente[i][0], cuerpoSerpiente[i][1], tamanoBloque, tamanoBloque);
    }

    if (serpienteX < 0 
        || serpienteX > totalColumnas * tamanoBloque 
        || serpienteY < 0 
        || serpienteY > totalFilas * tamanoBloque) { 
        
        juegoTerminado = true;
    }

    for (let i = 0; i < cuerpoSerpiente.length; i++) {
        if (serpienteX == cuerpoSerpiente[i][0] && serpienteY == cuerpoSerpiente[i][1]) { 
            juegoTerminado = true;
        }
    }
}

function cambiarDireccion(e) {
    if (e.code == "ArrowUp" && velocidadY != 1) { 
        velocidadX = 0;
        velocidadY = -1;
    }
    else if (e.code == "ArrowDown" && velocidadY != -1) {
        velocidadX = 0;
        velocidadY = 1;
    }
    else if (e.code == "ArrowLeft" && velocidadX != 1) {
        velocidadX = -1;
        velocidadY = 0;
    }
    else if (e.code == "ArrowRight" && velocidadX != -1) { 
        velocidadX = 1;
        velocidadY = 0;
    }
}

function colocarComida() {
    comidaX = Math.floor(Math.random() * totalColumnas) * tamanoBloque; 
    comidaY = Math.floor(Math.random() * totalFilas) * tamanoBloque; 
}

function reiniciarJuego() {
    serpienteX = tamanoBloque * 5;
    serpienteY = tamanoBloque * 5;
    velocidadX = 0;
    velocidadY = 0;
    cuerpoSerpiente = [];
    juegoTerminado = false;
    colocarComida();
}
