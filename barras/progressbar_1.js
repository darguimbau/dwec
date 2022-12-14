// js:  boton que pinte una barra de progreso cada xsegundos disparar funciones pasado un tiempo

/* VARIABLES */


const bar_block = document.querySelector('.bar_block');
const unit_block = document.querySelectorAll('.unit_block');

const buttonStart = document.querySelector('.start_block');
const buttonReset = document.querySelector('.reset_block');

const blockInfo = document.querySelector('.block_info');
const timeRemaining = document.querySelector('.time_remaining');

let elCrono;

unitsBlockBar = Array.prototype.slice.call(unit_block,0);
// console.log(unitsBlockBar);

let timeCounter = unitsBlockBar.length;
let unitCounter = 0;


//EVENTOS

buttonStart.addEventListener('click', startBlockBar);
buttonReset.addEventListener('click', resetBlockBar);
blockInfo.style.visibility="hidden";
buttonReset.disabled = true;  


//FUNCTIONS

function startBlockBar(){

//empezamos la cuenta atrás   
elCrono = setInterval(fillBlockBar, 1000);
buttonStart.disabled =true;
blockInfo.style.visibility="visible";
timeRemaining.innerHTML = timeCounter; 
}

function fillBlockBar(){
    console.log(unitCounter);    
    if(unitCounter >= unitsBlockBar.length){
        clearInterval(elCrono);
        blockInfo.style.visibility="hidden";
        buttonReset.disabled =false;       
    }else{        
        unitsBlockBar[unitCounter].className+= " active";
        unitCounter++;
        timeCounter --;
        timeRemaining.innerHTML = timeCounter; 
    }
}
function resetBlockBar(){
      
      unitsBlockBar .forEach(function(unit){ 
        
       unit.classList.remove('active');  

  });

    timeCounter = unitsBlockBar.length;
    unitCounter = 0;
    buttonStart.disabled = false;
    buttonReset.disabled = true;  

}