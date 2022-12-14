// js:  boton que pinte una barra de progreso cada xsegundos disparar funciones pasado un tiempo

/* VARIABLES */


const barProgress = document.querySelector('.progress');
const btnStart = document.querySelector('.start_progress');
const btnReset = document.querySelector('.reset_progress');
const progressInfo = document.querySelector('.progress_info');
const progressPercent = document.querySelector('.progress_percent');

let elCrono2;
let progressCounter = 0;

//EVENTOS

btnStart.addEventListener('click', startProgressBar);
btnReset.addEventListener('click', resetProgressBar);
progressInfo.style.visibility="hidden";
btnReset.disabled = true;  


//FUNCTIONS

function startProgressBar(){
  
    elCrono2 = setInterval(fillProgressBar, 1000);
    btnStart.disabled =true;
    progressInfo.style.visibility="visible";

}

function fillProgressBar(){
    if(progressCounter >= 100){

        clearInterval(elCrono2);
        progressInfo.style.visibility="hidden";
        btnReset.disabled =false;       
    }else{
        
        progressCounter += 12;
        if(progressCounter > 100){
            progressCounter = 100; 
        }   
        barProgress.style.width = progressCounter +"%";
        progressPercent.innerHTML = progressCounter; 
    }

}
function resetProgressBar(){
    progressCounter = 0;  
    barProgress.style.width = progressCounter +"%";
    progressPercent.innerHTML = progressCounter;     
    btnStart.disabled = false;
    btnReset.disabled = true;  

}