// FUNCIONES

//SetTimeout() y setInterval()

/*
let myTimeOut = setTimeout(funcion a llamar, milisegundos):
    Ejecutará la función a llamar transcurrido el tiempo

clearInteval(myTimeOut);
    para la ejecución de timeOut

let myInterval = setInterval(funcion a llamar, milisegundos);
    Ejecutará la función a llamar PERIODICAMENTE transcurrido el tiempo

clearInteval(myInterval);
    para la ejecución de setInterval
    
*/

//FALTAN COMENTARIOS!!!
  
//  Declaración/inicialización de variables

    let horas = 0;
    let minutos = 0;
    let segundos = 0;
    let centesimas = 0;
   
    let elCrono;
    let cronoData = new Date();  
    
    let countdownReset;
    let timerReset;

    let lap = false;
    let verHoras = document.getElementById('crono_horas');
    let verMinutos = document.getElementById('crono_minutos');
    let verSegundos = document.getElementById('crono_segundos');
    let verCentesimas = document.getElementById('crono_centesimas');

    let verMarcas = document.getElementById('marks_list');
    let contarMarcas = 0;
    let contarLaps = 0;
    
    //Ocultar panel de marcas(título)
    verMarcas.style.visibility = "hidden";

    //Datos de Cronómetro iniciales
    cronoData.setHours(0, 0, 0, 0);
    showTime();

    //Action buttons
    let btnStart = document.getElementById("start");
    let btnMark = document.getElementById("mark");
    let btnLap = document.getElementById("lap");
    let btnStop = document.getElementById("stop");
    let btnReset = document.getElementById("reset");

    //Event Listeners
    btnStart.addEventListener("click", startCrono, false);
    btnMark.addEventListener("click", getMark, false);
    btnLap.addEventListener("click", lapCrono, false);
    btnStop.addEventListener("click", stopCrono, false);
    btnReset.addEventListener("click", resetCronoDelay, false);

    

function startCrono(){

    elCrono = setInterval(goTime, 10);
    btnStart.value = "Continue";
    btnStart.disabled =true;
    btnMark.disabled = false;
    btnLap.disabled = false;
    btnStop.disabled = false;
    btnReset.disabled =true;
}

function goTime(){
    centesimas++;
    // console.log(centesimas);   
    
    if(centesimas == 100){
        centesimas = 0;
        segundos++;
    }
    if(segundos == 60){
        segundos = 0;
        minutos++;
    }
    if(minutos == 60){
        minutos = 0;
        horas++;
    }
    cronoData.setMilliseconds(centesimas);
    cronoData.setSeconds(segundos);
    cronoData.setMinutes(minutos);
    cronoData.setHours(horas);        
    if(!lap){
        showTime();
    }
}

function stopCrono(){
    clearInterval(elCrono);    
    btnStart.disabled = false;
    btnLap.disabled = true;
    btnStop.disabled = true;
    btnReset.disabled = false;
}

function lapCrono(){
    
    lap = !lap;
    // console.log(lap);
    if(lap){
        btnLap.value = "Release";                
        btnStop.disabled = true;
        getLap();
    }else{
        btnLap.value = "Lap";        
        btnStop.disabled = false;
    }
}
function resetCronoDelay(){

    btnReset.removeEventListener("click", resetCronoDelay, false);
    btnReset.addEventListener("click", resetCancelation, false); 

    btnStart.disabled = true;
    btnLap.disabled = true;
    btnStop.disabled = true;
    btnMark.disabled = true;
    btnReset.value = "Cancel (3)";
      
    countdownReset = setInterval(resetCountdown, 1000);    
    timerReset = setTimeout(resetCrono, 3000);
    
    // let isConfirmed = confirm("Reset Cronometer?");
    // if(isConfirmed){
    //     resetCrono();
    // }else{
    //     clearTimeout(timerReset);
    // }

}
function resetCountdown(){
  
    if(btnReset.value == "Cancel (3)"){        
        btnReset.value = "Cancel (2)";
        return;
    }
    if(btnReset.value == "Cancel (2)"){
        btnReset.value = "Cancel (1)";
        return;
    }
    if(btnReset.value == "Cancel (1)"){        
        btnReset.value = "Reset";
        clearInterval(countdownReset);//important! no sé perquè
        return;
    }
}
function resetCancelation(){

    btnReset.removeEventListener("click", resetCancelation, false);
    btnReset.addEventListener("click",  resetCronoDelay, false);

    clearInterval(countdownReset);
    clearTimeout(timerReset);

    btnReset.value = "Reset";    
    btnStart.disabled = false;
}

function resetCrono(){    
    //window.location.reload();
    btnReset.removeEventListener("click", resetCancelation, false);
    btnReset.addEventListener("click",  resetCronoDelay, false);

    btnStart.value = "Start";
    btnStart.disabled = false;
    btnMark.disabled = true;
    btnLap.disabled = true;
    btnStop.disabled = true;
    btnReset.disabled = true;
    cronoData.setHours(0, 0, 0, 0);
    horas = cronoData.getHours();
    minutos = cronoData.getMinutes();
    segundos = cronoData.getSeconds();
    centesimas = cronoData.getMilliseconds();  
    showTime();
      
}

function showTime(){     

    if(centesimas < 10){
        verCentesimas.innerHTML =  '.0' + centesimas;
    }else{
        verCentesimas.innerHTML = '.' + centesimas;
    }
    if(segundos < 10) { 
        verSegundos.innerHTML = '0' + segundos;
    }else{
        verSegundos.innerHTML = segundos;
    }
    if(minutos < 10){
        verMinutos.innerHTML ='0' + minutos + ' :'; 
    }else{
        verMinutos.innerHTML = minutos + ' :'; 
    }
    if(horas < 10){
        verHoras.innerHTML ='0' + horas + ' :'; 
    }else{
        verHoras.innerHTML = horas + ' :'; 
    }    
}

function getMark(){

    verMarcas.style.visibility='visible';
    contarMarcas ++;
    let centesimasMarca ="";
    let segundosMarca ="";
    let minutosMarca ="";
    let horasMarca ="";

    centesimasMarca = ' .' + centesimas;

    if(segundos < 10) { 
        segundosMarca = '0' + segundos;
    }else{
        segundosMarca = segundos;
    }
    if(minutos < 10){
        minutosMarca ='0' + minutos + ' : '; 
    }else{
        minutosMarca = minutos + ' : '; 
    }
    if(horas < 10){
        horasMarca ='0' + horas + ' : '; 
    }else{
        horasMarca = horas + ' : '; 
    }
    verMarcas.innerHTML +="<h2>MARK " + contarMarcas + " --->  "+ horasMarca + minutosMarca + segundosMarca + centesimasMarca + "</h2>";
}

function getLap(){
    contarLaps ++;
    
    verMarcas.style.visibility='visible';
    
    let centesimasMarca ="";
    let segundosMarca ="";
    let minutosMarca ="";
    let horasMarca ="";

    centesimasMarca = ' .' + centesimas;

    if(segundos < 10) { 
        segundosMarca = '0' + segundos;
    }else{
        segundosMarca = segundos;
    }
    if(minutos < 10){
        minutosMarca ='0' + minutos + ' : '; 
    }else{
        minutosMarca = minutos + ' : '; 
    }
    if(horas < 10){
        horasMarca ='0' + horas + ' : '; 
    }else{
        horasMarca = horas + ' : '; 
    }
    verMarcas.innerHTML +="<h2>LAP " + contarLaps + "  ----->  "+ horasMarca + minutosMarca + segundosMarca + centesimasMarca + "</h2>";
}