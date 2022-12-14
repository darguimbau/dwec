// JS COUNTDOWN GAME
// 31 Oct 2022
// Autor:Dani Arguimbau

/*
Juego de cuenta atrás: detener el tiempo cerca de 0 segundos y 0 centésimas

REQUISITOS :

- Cuenta atrás con centésimas. Al llegar a 0, la cuenta se irán incrementando con un signo negativo.

- Usar Ojeto Date.

- Poder jugar n partidas en cada sesión.

- Modo difícil ocultado las centésimas.

- Usar cookies de sesión para guardar el nombre del jugador y el número de intentos
y mostrarlos por pantalla.

- Usar cookies almacenables para guardar records y nombre (para cada modo de juego)
y mostrarlo por pantalla.

- Poder resetear los records.

- Poder Salir de la partida y volver a empezar evitando el refresco de página

- Mostrar datos de cada partida

- Aplicar los delays del cronometro al salir y hacer reset de records si no se alarga el código

DUDAS:
    Me parece que hay redundancia entre las funciones showTime y las cuentas atrás al pasar de (ej):

    cronoData.setSeconds(segundos);
    y luego
    segundos = cronoData.getSeconds();

    Pero al eliminarlo showTime no funciona en todas las llamadas.    
*/
  
//  Declaración/inicialización de variables
    //Para objeto Date 
    let horas = 0;
    let minutos = 0;
    let segundos = 0;
    let centesimas = 0;    
    let elCrono;
    let cronoData = new Date();

    //contador de partidas
    let countGames;

    //para controlar el formato 00:00:00.00 y mostrarlo en html
    let centesimasMarca;
    let segundosMarca;
    let minutosMarca;
    let horasMarca;

    let playerName;

    //checkbox tipo switch para ocultar las centésimas
    let hardGame = document.getElementById('hard_mode');    

    //control de contenedores html para mostrar/ocultar bloques de información
    let panelCrono = document.getElementById('crono');
    let panelNew = document.getElementById('new_game');
    let panelRecord = document.getElementById('record_info');
    let panelMarks = document.getElementById('marks');
    let panelWelcome = document.getElementById('welcome');
    let panelGames = document.getElementById('total_games');

    //control elementos para manipular información
    let verRecord = document.getElementById('record');
    let verSigno = document.getElementById('crono_signo');
    let verHoras = document.getElementById('crono_horas');
    let verMinutos = document.getElementById('crono_minutos');
    let verSegundos = document.getElementById('crono_segundos');
    let verCentesimas = document.getElementById('crono_centesimas');
    let verMarcas = document.getElementById('marks_list');
    
    //action buttons
    let btnPlay = document.getElementById("play");
    let btnStart = document.getElementById("start");   
    let btnStop = document.getElementById("stop");
    let btnReset = document.getElementById("reset");
    let btnExit = document.getElementById("exit");

    //Event Listeners
    btnPlay.addEventListener("click", newGame, false);
    btnStart.addEventListener("click", startCrono, false);    
    btnStop.addEventListener("click", stopCrono, false);
    btnReset.addEventListener("click", resetCookies, false);
    btnExit.addEventListener("click", exitGame, false);
    // hardGame.addEventListener("click", checkMode, false);//Cambiar el modo de juego en cualquier momento
 
    preGame();

//Estado inicial del juego para poder salir del juego y volver a empezar
function preGame(){
    //Contador de partidas a 0
    countGames = 0;

    //Ocultamos los paneles del juego
    panelCrono.style.display="none";
    panelRecord.style.display="none";
    panelMarks.style.display="none";
    panelWelcome.style.display="none";
    panelGames.style.display="none";

    //aseguramos que el signo - esta oculto    
    verSigno.style.visibility = "hidden";

    //reseteamos la cuenta atrás y la mostramos
    cronoData.setHours(0, 0, 5, 0);
    showTime();
    
    //limpiamos la cookie con el número de partidas
    document.cookie = "Total Games=" + countGames;
}

//Si se activa el Hard Mode no se verán las centésimas
function checkMode(){
    if(hardGame.checked) {
        verCentesimas.style.visibility="hidden";
      } else {
        verCentesimas.style.visibility="visible";
      }
}

//Al pulsar play empieza un nuevo juego
function newGame(){
    //comprobamos si se ha activado el modo difícil
    checkMode();

    //bloqueamos el switch
    hardGame.disabled = "true";

    //pedimos el nombre del jugador y tenemos uno por defecto
    playerName = prompt("Enter Player Name");
        if(playerName == "" || playerName == null){
            playerName = "PlayerOne";
        }           
    console.log(playerName);
    
    //Cookie de sesión para el nombre de jugador
    document.cookie = "Player Name=" + encodeURIComponent(playerName);
    
    //Posibilidad de comprobar el nombre en la cookie (descartado)
    //checkCookieName();

    //Mostramos bienvenida en la página
    panelWelcome.innerHTML ="Welcome " + getCookie("Player Name");
    
    //Comprobamos si hay records en las cookies
    checkRecord();    

    //Mostramos los paneles de juego y ocultamos el de inicio
    panelWelcome.style.display="revert";
    panelCrono.style.display="revert";
    panelRecord.style.display="revert";
    panelMarks.style.display="flex";
    panelNew.style.display="none";

}
    
// Al pulsar start comienza la cuenta atrás    
function startCrono(){

    //aseguramos que no haya signo negativo
    verSigno.style.visibility="hidden";
    
    //reseteamos la cuenta atrás y la mostramos
    cronoData.setHours(0, 0, 5, 0);
    showTime();
    
    //controlamos si venimos de una partida previa "stop"
    // y así no empezamos abruptamente
    if(btnStart.value == "New"){
        btnStart.value = "Start";
        return;
    }

    //empezamos la cuenta atrás   
    elCrono = setInterval(countDown, 10);
    
    //deshabilitamos el start durante la cuenta atrás
    btnStart.disabled =true;
    
    //habilitamos el stop para detener la cuenta
    btnStop.disabled = false;
    
}
// Al pulsar stop 
function stopCrono(){

    //detenemos el intervalo de ejecución
    clearInterval(elCrono);

    //Cambiamos el valor de start para ganar un tiempo
    btnStart.value = "New";
    //habilitamos el boton new
    btnStart.disabled = false;
    //deshabilitamos stop    
    btnStop.disabled = true;

    //capturamos el resultado y lo mostramos   
    getMark();
    //comprobamos si es nuevo record
    checkRecord();    
}

//Tras pulsar start comienza la cuenta atrás restando centésimas
function countDown(){
    //Si el tiempo llega a cero
    if (segundos == 0 && centesimas == 0){
        //detener intervalo
        clearInterval(elCrono);
        //iniciar cuenta negativa
        elCrono = setInterval(countUp, 10);
        //salir de esta función
        return;
    }
    //vamos restando centésimas 
    centesimas--;     
    
    //Controlamos los saltos en unidades
    if(centesimas == -1){
        centesimas = 99;
        segundos--;
    }
    if(segundos == -1){
        segundos = 59;
        minutos--;
    }
    if(minutos == -1){
        minutos = 59;
        horas--;
    }
    
    //Actualizamos el objeto date
    cronoData.setMilliseconds(centesimas);
    cronoData.setSeconds(segundos);
    cronoData.setMinutes(minutos);
    cronoData.setHours(horas);        
   
    //Lo mostramos en la página
    showTime();
    
}
//Cuenta negativa, se activa al llegar a 00:00.00
function countUp(){ 
    //mostramos el signo negativo
    //-- Lo haremos visible más adelante para no facilitar el pulsado !!
    if(centesimas == 10){
        verSigno.style.visibility="visible";
    }
    //y pasamos a sumar tiempo
    centesimas++;
      
    //controlamos el salto entre unidades
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
    //Actualizamos el objeto date (se podría pasar a función)
    cronoData.setMilliseconds(centesimas);
    cronoData.setSeconds(segundos);
    cronoData.setMinutes(minutos);
    cronoData.setHours(horas);

    //Lo mostramos en la página
    showTime();
    
}

//Función que da formato a las variables de tiempo
function arrangeMarks(){

    //pasamos las variables de cálculo a las de resultado(xMarca)
    //Añadimos 0 y puntuación     
    if(centesimas < 10){
        centesimasMarca =  ' .0' + centesimas;
    }else{
        centesimasMarca = ' .' + centesimas;
    }
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
    // if(horas < 10){
    //     horasMarca ='0' + horas + ' : '; 
    // }else{
    //     horasMarca = horas + ' : '; 
    // }
}

// Mostrar la cuenta atrás por pantalla 
function showTime(){ 

    //Quizás redundante pero capturamos en variables los valores del objeto date 
    horas = cronoData.getHours();
    minutos = cronoData.getMinutes();
    segundos = cronoData.getSeconds();
    centesimas = cronoData.getMilliseconds();    

    //Damos formato y cambiamos a variables con puntuación
    arrangeMarks();

    //Mostramos en pantalla la cuenta atrás
    verCentesimas.innerHTML = centesimasMarca;
    verSegundos.innerHTML = segundosMarca;
    verMinutos.innerHTML = minutosMarca;
    //verHoras.innerHTML = horasMarca;      
}

// A cada partida mostramos en pantalla el resultado en orden descendente
function getMark(){
    //Incrementamos el número de partida
    countGames ++;

    //sobreescribimos la cookie y la mostramos en pantalla
    document.cookie = "Total Games=" + countGames;    
    panelGames.innerHTML = "Games: " + getCookie("Total Games");
    
    //Si era la primera partida el panel estaba oculto 
    if(countGames == 1){ 
        panelGames.style.display="revert";
    }

    //Mensaje de la partida, solo etiqueta de cierre (orden descendente)
    if (segundos == 0 && centesimas == 0 ){
        verMarcas.innerHTML =" - Perfect!</h3>" + verMarcas.innerHTML;
        
    }
    if (segundos == 0 && centesimas <= 5 ){
        verMarcas.innerHTML =" - You Win!</h3>" + verMarcas.innerHTML;
       
    }
    if(segundos == 0 && centesimas > 5 && centesimas < 25){
        verMarcas.innerHTML =" - You've been close!</h1>" + verMarcas.innerHTML;
       
    }
    
    if(segundos == 0 && centesimas > 25){
        verMarcas.innerHTML =" - You can get better</h3>" + verMarcas.innerHTML;
      
    }
    if(segundos >= 1){
        verMarcas.innerHTML =" - Big Miss! Please focus</h3>" + verMarcas.innerHTML;       

    }
    
    //formato a los datos
    arrangeMarks();

    //mostramos resultado, solo etiqueta de apertura
    //controlamos si era un resultado positivo o negativo
    if(verSigno.style.visibility == "visible"){
        verMarcas.innerHTML ="<h3>"+ + countGames + " &rarr; - "+  segundosMarca + centesimasMarca + verMarcas.innerHTML;

    }else{ 
    verMarcas.innerHTML ="<h3>"+ + countGames + " &rarr;  "+  segundosMarca + centesimasMarca + verMarcas.innerHTML;
    }    
   
}

//Comprobamos si hay algun record guardado en cookies y si la partida lo ha superado
function checkRecord(){
 
    //Controlamos la modalidad de juego
    if(hardGame.checked) {

        //Si las cookies existen
        if(detectCookie("hname") && detectCookie("hsegundos") && detectCookie("hcentesimas")){

            //Comprobamos si se ha superado el record de las cookies
            if(segundos < getCookie("hsegundos") || (segundos == getCookie("hsegundos") && centesimas < getCookie("hcentesimas"))){
                //actualizamos las cookies
                setCookie("hname", playerName, 365);
                setCookie("hsegundos", segundos, 365);
                setCookie("hcentesimas", centesimas, 365);

                //Damos formato
                arrangeMarks();
                //Actualizamos panel de record 
                verRecord.innerHTML = getCookie("hname") +" &rarr; "+ segundosMarca + centesimasMarca ;
                //Mensaje en panel de puntuaciones
                verMarcas.innerHTML ="<h3>New Record &darr;</h3>" + verMarcas.innerHTML;

            //Si no se ha superado mostramos las que están guardadas
            //Se usa también al iniciar el juego
            }else{
                //recogemos valores para darle formato
                segundos = getCookie("hsegundos");
                centesimas = getCookie("hcentesimas");
                arrangeMarks();

                verRecord.innerHTML = getCookie("hname") +" &rarr; "+ segundosMarca + centesimasMarca ;
            }

        //Si no hay cookies y se ha jugado una partida, ésta será el record    
        }else if(countGames > 0){
            //creamos las cookies
            setCookie("hname", playerName, 365);
            setCookie("hsegundos", segundos, 365);
            setCookie("hcentesimas", centesimas, 365);
            
            arrangeMarks(); 
            verRecord.innerHTML = getCookie("hname") +" &rarr; "+ segundosMarca + centesimasMarca ;
            verMarcas.innerHTML ="<h3>New Record &darr;</h3>" + verMarcas.innerHTML;                
        }
    }else{

        //Si no es modo difícil comprobamos las otras cookies
        if(detectCookie("csegundos") && detectCookie("ccentesimas")){
           
            //Comprobamos si se ha superado el record de las cookies
            if(segundos < getCookie("csegundos") || (segundos == getCookie("csegundos") && centesimas < getCookie("ccentesimas"))){
                
                setCookie("cname", playerName, 365);
                setCookie("csegundos", segundos, 365);
                setCookie("ccentesimas", centesimas, 365);

                arrangeMarks(); 
                verRecord.innerHTML = getCookie("cname") +" &rarr; "+ segundosMarca + centesimasMarca ;
                verMarcas.innerHTML ="<h5>New Record &darr;</h5>" + verMarcas.innerHTML;
            
            //Si no se ha superado mostramos las que están guardadas
            //Se usa también al iniciar el juego
            }else{
                //recogemos valores para darle formato
                segundos = getCookie("csegundos");
                centesimas = getCookie("ccentesimas");

                arrangeMarks(); 
                verRecord.innerHTML = getCookie("cname") +" &rarr; "+ segundosMarca + centesimasMarca ;
            }

        //Si no hay cookies y se ha jugado una partida, ésta será el record    
        }else if(countGames > 0){
            //creamos las cookies
            setCookie("cname", playerName, 365);
            setCookie("csegundos", segundos, 365);
            setCookie("ccentesimas", centesimas, 365);

            arrangeMarks();            
            verRecord.innerHTML = getCookie("cname") +" &rarr; "+ segundosMarca + centesimasMarca ;
            verMarcas.innerHTML ="<h5>New Record &darr;</h5>" + verMarcas.innerHTML;
                  
        }
    }        
    
}
//Al pulsar reset eliminamos las cookies de record
function resetCookies(){
    // controlamos el modo de juego
    if(hardGame.checked){
        deleteCookie("hname");
        deleteCookie("hsegundos");
        deleteCookie("hcentesimas");
    }else{
        deleteCookie("cname");
        deleteCookie("csegundos");
        deleteCookie("ccentesimas");
    }
    verRecord.innerHTML = "None";
}

//Al pulsar Leave, volvemos al panel inicial y ejecutamos preGame
function exitGame(){
    
    // window.location.reload();

    //renombramos el boton start
    btnStart.value = "Start";

    //Habilitamos el switch de modo de juego
    hardGame.removeAttribute("disabled");

    //Limpiamos las puntuaciones
    verMarcas.innerHTML =""; 

    //Mostramos el panel inicial   
    panelNew.style.display="revert";

    preGame();   
}


// FUNCIONES GENERALES PARA LAS COOKIES

//Crear un cookie dada la clave, el valor y la duración (path desactivado)
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();

    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
 
//Dada la clave devuelve el valor
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
 
//Buscar si el nombre del jugador está guardado NO USADA para cambiar de nombre a voluntad
function checkCookieName() {
    
    let player = getCookie("Player Name");

    if (player != "") {
      alert("Welcome again " + player);
    } else {  

        playerName = prompt("Enter Player Name");

        if(playerName == "" && playerName == null){
            playerName = "PlayerOne";
        }           
    console.log(playerName);
    //Session Cookie with player name    
    document.cookie = "Player Name=" + encodeURIComponent(playerName);
    // setCookie("Player Name", playerName, 365);
      
    }
}

// función que dado el nombre de una cookie (cname)
// devuelve true si existe y tiene contenido
// y false si no existe o existe pero no contiene contenido.
function detectCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0 && (name.length != c.length))  {
            return true;
        }
    }
    return false;
}

//Elimina una cookie dando un tiempo negativo
function deleteCookie(cname){
    setCookie(cname,"",-1);
}
