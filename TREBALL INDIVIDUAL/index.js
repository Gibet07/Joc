const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d")

canvas.height = 512;
canvas.width = 448;

//VARIABLES PILOTA
let radiPilota = 4;
let x = canvas.width / 2
let y = canvas.height - 30

//Velocitat PILOTA
let dx = 2
let dy = -2

//Variables Pala
let amplePala = 50;
const alturaPala = 10;

let sensibilitat = 8;
let dreta = false;
let esquerra = false;

let palaX = (canvas.width- amplePala) / 2
let palaY = canvas.height - alturaPala - 10


function pintarPilota(){
    ctx.beginPath();
    ctx.arc(x, y, radiPilota, 0, Math.PI*2);
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();
}
function pintarPala(){
    ctx.fillStyle = "#FFF"
    ctx.fillRect(palaX,palaY,amplePala,alturaPala)
}
function pintarMurs(){

}
function deteccioColisio(){

}
function movimentPilota(){
    //REBOT EIX X
    if(x + dx >= canvas.width || x + dx <= 0){
        dx=-dx
    }
    //REBOT EIX Y
    if(y + dy <= 0){
        dy=-dy
    }
    //GAME OVER
    if(y + dy > canvas.height ){
        console.log("GAME OVER")
        document.location.reload();
    }
    //Moviment
    x += dx
    y += dy
}
function movimentPala(){
    if(dreta && palaX < canvas.width - amplePala){
        palaX += sensibilitat
    }else if(esquerra && palaX > 0 ){
        palaX -= sensibilitat
    }
}

function borrarPantalla(){
    
    canvas.height = 512;
    canvas.width = 448;
}

function inicialitzadorEvents(){
    document.addEventListener('keydown', pulsar);
    document.addEventListener('keyup', soltar)

    function pulsar(event){
        if(event.key == 'ArrowRight' || event.key == 'd'){
            dreta = true;
        }
        if(event.key == 'ArrowLeft' || event.key == 'a'){
            esquerra = true;
        }
        if(event.key == '+'){
            amplePala = amplePala*2
        }
        if(event.key == '-'){
            amplePala = amplePala / 2
        }
        if(event.key == 'w'){
            radiPilota = radiPilota * 2}
        if(event.key == 's'){
            radiPilota = radiPilota / 2}
        if(event.key == 'd'){
            sensibilitat = sensibilitat + 1}
        if(event.key == 'a'){
            sensibilitat = sensibilitat / 2}
        if(event.key == 'p'){
            dx = dx * 2; dy = dy * 2
        }
        if(event.key == 'o'){
            dx = dx / 2; dy = dy / 2
        }
    
    }

    function soltar(event){
        if(event.key == 'ArrowRight' || event.key == 'd'){
            dreta = false;
        }
        if(event.key == 'ArrowLeft' || event.key == 'a'){
            esquerra = false;
        }
    }
}

function pintarCanvas(){
    console.log("Hola");

    borrarPantalla();

    pintarPilota();
    pintarPala();
    pintarMurs();

    deteccioColisio();
    movimentPilota();
    movimentPala();

    window.requestAnimationFrame(pintarCanvas);
}

pintarCanvas();
inicialitzadorEvents();