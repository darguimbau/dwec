// UD02 Activitat 3 ex05
// Autor:Dani Arguimbau

/* Info:
Per millor funcionament emprar Firefox!!!,

He fet feina amb tutorial: https://www.youtube.com/watch?v=I3S6B2p-VHg
He tret moltes coses i les he adaptat. Hi havia molta interacció amb css i gràfic de js
He posat imatges i més arrays
*/

/*Dubtes:
Problemes amb buttons solucionats posant inputs type button
A Chrome els alerts surten antes de temps i no carrega imatges finals!!?==>Solucionat posant un Delay!
Funcionament de key events

!!preventDefault()!!
 */

//Declaració de const Interacció amb HTML
const buttonWord = document.querySelector("#submit_word");
const formStart = document.querySelector("#form_word");
const goblin = document.querySelector("#goblin");
const goblinDead = document.querySelector("#goblin_dead");
const panelWord = document.getElementById("progress_word");
const panelChar = document.getElementById("used_char");
const knight = document.getElementById("knight");

//Nuevas para el control de tiempo
const panelInfo = document.querySelector(".info");
const panelTime = document.querySelector(".times");
const totalTime = document.querySelector(".total_time");
const moveTime = document.querySelector(".move_time");

const timeMove = new Date();
const timeGame = new Date();

let cronoMove;
let secondsMove = 0;
let cronoGame;
let secondsGame = 0;
let minutesGame = 0;

//Gestión de Records
const panelRecords = document.querySelector("#printRecords");
const panelRecordInfo = document.querySelector(".recordInfo");
const tableRecords = document.querySelector(".tableRecords");
tableRecords.style.display="none";
const btnShowRecords = document.querySelector("#showRecords");
const btnHideRecords = document.querySelector("#hideRecords");
const btnClearRecords = document.querySelector("#clearRecords");
let countdownClear;    
let timerClear;

//Rendirse
const btnSurrender = document.querySelector("#surrender");

// Nombre de falls que corresponen amb imatges
const failsMax = 6;

// Declaració de variables
let weaponWords = new Array;
let spellWords = new Array;
let actionWords = new Array;

let charIn;       
let charUsed;//array de lletres emprades
let fails;//contador de falls
let hits;//contador d'encerts
let wordSecret;//paraula random
let guessedChar;//guions que canvien a lletres encertades


// Paraules del joc

weaponWords = ["hacha", "alabarda", "estoque", "espada", "martillo", "daga", "estrella del alba", "lanza", "pica", "garrote", "sable", "látigo", "bastón", "ballesta", "cimitarra", "mandoble", "tridente" ];
spellWords = ["invisibilidad", "bola de fuego", "rayo de escarcha", "enredar", "proyectil mágico", "tormenta de hielo", "rayo solar", "nube apestosa", "miedo", "inmovilizar", "flecha ácida", "dormir", "ceguera", "golpe de rayo", "llama sagrada", "polimorfar", "tentáculos negros", "toque vampírico"];
actionWords = ["agarrar", "derribar", "desarmar", "retirarse", "correr", "defender", "usar poción", "intimidar", "provocar", "apresar", "aturdir", "esquivar"];

// Joc
console.log("Elige una opción y dale a 'jugar'")
//Personatje
knight.innerHTML = '<img src="./img/001.png">';
//Cargar LocalStorage
retrieveLocalStorage();

//Events Listenners
buttonWord.addEventListener("click", play);
btnShowRecords.addEventListener("click", showRecords);
btnHideRecords.addEventListener("click", hideRecords);
btnClearRecords.addEventListener("click", delayClear);
btnSurrender.addEventListener("click", gameOver);



//FUNCIÓ PRINCIPAL
function play(){    
    console.log("Juego basado en el funcionamiento del ahorcado")
    console.log("Presiona teclas hasta acabar la partida");
    //inicialitzar-Buidar variables
    wordSecret = [];
    guessedChar = [];
    charUsed = [];
    hits = 0;
    fails = 0;
    
    panelWord.innerHTML = "";
    panelChar.innerHTML = "";
    formStart.style.display = "none";
    panelTime.classList.remove("hidden");
    panelInfo.classList.add("hidden");   

    //Guardam la paraula random a un array
    wordSecret = oneWord().split("");
    
    //Cream l'array de guions
    createGuessedChar();
    //La mostram al HTML
    showGuessedChar();
    //Esperam pulsaciond de tecla            
    document.addEventListener("keydown", charEvent);

    //Añadir funciones de tiempo
    cronoMove = setInterval(countDown, 1000);
    timeMove.setHours(0, 0, 10, 0);
    //evitar segundos = 0
    secondsMove = timeMove.getSeconds();
    
    cronoGame = setInterval(goTime, 1000);
    timeGame.setHours(0, 0, 0, 0);
    
}

//FUNCIONS DEL JOC

//genera una paraula aleatoria del array escollit i la retornam (String)
function oneWord(){
   
    let word;
    let categoryWord = document.getElementById("word_category").value;
    console.log(categoryWord);
    //comprovat que es generen desde el primer al darrer
    if (categoryWord == "word_category_weapons"){
        word = weaponWords[Math.floor(Math.random()*weaponWords.length)];                                           
    }
    if (categoryWord == "word_category_spells"){
        word = spellWords[Math.floor(Math.random()*spellWords.length)];
    }
    if (categoryWord == "word_category_actions"){
        word = actionWords[Math.floor(Math.random()*actionWords.length)];
    }
       
    console.log("Palabra secreta: " + word);
    return word;
}

//crear array amb guions_baixos seguint l'array original 
function createGuessedChar(){
    for(let i = 0; i<wordSecret.length; i++){
        //si hi ha espais en blanc a l'array original
        if(wordSecret[i] == " "){
            //no posar guió_baix
            guessedChar[i] = " &nbsp; ";
            //posar un encert automàtic
            hits++; 
        }else{
        //guio_baix a l'array    
        guessedChar[i]= "_ ";
        }
        
    }  
  
}

//Quan hi ha un pulsació 
function charEvent(e){

    let charNew = e.key.toLowerCase();

    //amagam el goblin per si estava visible
    goblin.style.display = "none";

    //comprovació que sigui lletra i no repetida 
    if(charNew.match(/^[a-zñ]$/i) && !charUsed.includes(charNew)){

        //si la tecla es valida gestionam la lletra nova
        charPress(charNew);
    }
    //NEW REINICIAM CONTA ENRERA
    timeMove.setHours(0, 0, 10, 0);
    secondsMove = timeMove.getSeconds();

}

//Gestió de llestres noves
function charPress(char){
    //s'envia per ser mostrada
    //addChar(char);// ARA DESPRÉS DE SABER SI ES UN ENCERT O NO
    // incloure a l'array per evitar repetició de lletres
    charUsed.push(char);

    //comprovam si hi ha encert amb l'array de la paraula secreta
    //empram la funció per llevar accents i join per passar de array a cadena
    if(sinAcentos(wordSecret.join()).includes(char)){
        //s'envia per ser mostrada
        addChar(char, true);
        //gestió d'encert
        charHit(char);
    }else{
        //s'envia per ser mostrada
        addChar(char, false);
        //gestió de fall        
        charFail();
    }
}

//Incloure lletres noves a HTML aplicant css si es correcte
function addChar(char, isCorrect){
    const charElement = document.createElement("span");
    charElement.innerHTML = char;
    if(isCorrect){
        charElement.classList.add('isCorrect');
    }    
    panelChar.appendChild(charElement);
}

//Gestió de falls
function charFail(){    
    fails++;
    //Canvi d'imatge
    knightDying();
    //Mostrar goblin atacant
    goblin.style.display = "block";
    
    //Si els falls arriban al màxim 
    if (fails == failsMax){
        //deixar de escoltar tecles
        document.removeEventListener("keydown", charEvent);
        gameOver();
    }
}

//Gestió d'encerts
function charHit(char){
    
    //substituim els guions_baixos corresponents per la lletra i sumam un encert
    for(let i = 0; i < wordSecret.length; i++){
        if(sinAcentos(wordSecret[i]) === char){
            guessedChar[i] = " " + wordSecret[i] +" ";
            hits++;
        }
    }
    //refrescam l'array de guions a HTML            
    showGuessedChar();
    //Si encertam totes les lletres
    if(hits == wordSecret.length){
        //deixar de escoltar tecles
        document.removeEventListener("keydown", charEvent);
        youWin();
    }

}

//Mostrar l'array de guions i encerts a HTML
function showGuessedChar(){
    //fer net
    panelWord.innerHTML ="";
    //recarregar
    for(let i = 0; i<guessedChar.length; i++){        
        panelWord.innerHTML+=guessedChar[i];
    }  
}
//Canvi d'imatge segons el número de falls
function knightDying(){
    switch(fails){
        case 1:
        knight.innerHTML = '<img src="./img/002.png">';break;
        case 2:
        knight.innerHTML = '<img src="./img/003.png">';break;
        case 3:
        knight.innerHTML = '<img src="./img/004.png">';break;
        case 4:
        knight.innerHTML = '<img src="./img/005.png">';break;
        case 5:
        knight.innerHTML = '<img src="./img/006.png">';break;
        case 6:
        knight.innerHTML = '<img src="./img/007.png">';break;
        default:                
        knight.innerHTML = '<img src="./img/001.png">';

    }
}

//Victoria, mostram una imatge del goblin mort, misstage i recarregam pàgina
function youWin(){
    goblinDead.style.display = "block";    
    //Delay per a que els alerts funcionin millor a chrome
    setTimeout(function(){
        alert("You Win! Goblin muerto");
        location.reload(true);
    }, 1000);
    
    // formStart.style.display = "block";

    //NEW time & localstorage

    clearInterval(cronoGame);

    let wordRecord= wordSecret.join("");
    // recogemos la palabra unida, los minutos, los segundos quitando el último incremento y los fallos
    checkRecord(wordRecord, minutesGame, secondsGame -1, fails);

}
//Derrota, missatge i recarregam pàgina
function gameOver(){
    //Delay per a que els alerts funcionin millor a chrome
    setTimeout(function(){
        alert("Game Over! el Goblin te ha vencido");
        location.reload(true);
    }, 1000);
    
    
    // formStart.style.display = "block";
}

// TIME FUNCTIONS

function goTime(){
   
    // console.log(secondsGame);
     
    if(secondsGame == 60){
        secondsGame = 0;
        minutesGame++;
    }
    
    timeGame.setSeconds(secondsGame);
    timeGame.setMinutes(minutesGame);
    showTime();
    secondsGame++;
}


function showTime(){
    if(secondsGame < 10 && minutesGame < 10) { 
        
        totalTime.innerHTML = '0'+ timeGame.getMinutes() + ' : 0' + timeGame.getSeconds();
    }else if(secondsGame >= 10 && minutesGame < 10){
        totalTime.innerHTML = '0'+ timeGame.getMinutes() + ' : ' + timeGame.getSeconds();
    }
    else if(secondsGame < 10 && minutesGame >= 10){
        totalTime.innerHTML = timeGame.getMinutes()  + ' : 0' + timeGame.getSeconds();
    }
    else{
        totalTime.innerHTML = timeGame.getMinutes()  + ' : ' + timeGame.getSeconds();
    }
   
}

function countDown(){
    //Si el tiempo llega a cero
    if (secondsMove == 0){
        //detener intervalo
        // clearInterval(cronoMove);
        //gestió de fall
        charFail();
        timeMove.setHours(0, 0, 10, 0);
        secondsMove = timeMove.getSeconds();
        moveTime.innerHTML = timeMove.getSeconds();
        //Y restamos el primer segundo!    
        secondsMove--;
        // countDown();
        //salir de esta función
        return;
    }
    //Actualizamos el objeto date   
    timeMove.setSeconds(secondsMove);   

    //Lo mostramos en la página
    moveTime.innerHTML = timeMove.getSeconds();
    
    //vamos restando segundos    
    secondsMove--;     
        
}

//Localstorage and check records

//Actualización: el record se actualiza si el tiempo es menor o si los errores son menores
    function checkRecord(word, minutes, seconds, fails){
        let key = word;
        let values = [minutes, seconds, fails];
        let isChanged = false;
        //console.log(values); 

        //Guardamos los valores de LocalStorage para poder modificarlos
        let localWord = JSON.parse(localStorage.getItem(word));
        //console.log(typeof localWord);
        console.log(localWord);
        
        if (localWord !== null){
            
            if((localWord[0] > minutes) || (localWord[0] == minutes && localWord[1] > seconds )){
                //El tiempo es menor, lo actualizamos
                localWord[0] = minutes;
                localWord[1] = seconds;
                localStorage.setItem(key, JSON.stringify(localWord));
                console.log(key + ": récord de tiempo sobreescrito");
                panelRecordInfo.innerHTML = key + ": récord de tiempo sobreescrito <br>";
                isChanged = true; 

            }
            if(localWord[2] > fails){
                localWord[2] = fails;               
                localStorage.setItem(key, JSON.stringify(localWord));
                console.log(key + ": récord de errores sobreescrito");
                panelRecordInfo.innerHTML +=  key + ": récord de errores sobreescrito";
                isChanged = true;
            }
            
            if(!isChanged){
                console.log("Récord preexistente para " + key);

                return;
                
            }
           
        }else{
            localStorage.setItem(key, JSON.stringify(values));
            console.log("Nuevo récord creado para " + key);
            panelRecordInfo.innerHTML = "Nuevo récord creado para " + key;

            

        }
        
        

    }

//Localstorge

//Recover data from local storage
function retrieveLocalStorage(){

    let key;
    let values=[];
    for (var i = 0; i < localStorage.length; i++){
        //Guardamos la palabra
        key = localStorage.key(i);
        //Y sus valores
        values = JSON.parse(localStorage.getItem(localStorage.key(i)));
        // console.log(values);
        // los cargamos en la tabla      
        loadRecords(key, values);
    }
    
}
//Carga los records uno a uno en la tabla html
function loadRecords(key, values){
    if(values[0] >= 1){
        panelRecords.innerHTML += '<tr class=""><td scope="row">' + key + '</td><td>'+ values[0]+ 'm ' + + values[1]+ 's' +'</td><td>' + values[2]+ '</td></tr>';


    }else{
        panelRecords.innerHTML += '<tr class=""><td scope="row">' + key + '</td><td>' + values[1]+ 's' + '</td><td>' + values[2]+ '</td></tr>';

    }
}
//Muestra la tabla
function showRecords(){
    tableRecords.style.display="block";
    btnShowRecords.style.display="none";
}
//Oculta la tabla
function hideRecords(){
    tableRecords.style.display="none";
    btnShowRecords.style.display="block";
}

//Delay para borrar localstorage
function delayClear(){
    btnClearRecords.removeEventListener("click", delayClear, false);
    btnClearRecords.addEventListener("click", cancelClear, false);
    
    btnClearRecords.value = "Cancel (3)";

    countdownClear = setInterval(clearCountdown, 1000);    
    timerClear = setTimeout(clearLocalStorage, 3000);


}
//Anula borrado de localStorage
function cancelClear(){
    btnClearRecords.removeEventListener("click", cancelClear, false);
    btnClearRecords.addEventListener("click", delayClear, false); 

    clearInterval(countdownClear);
    clearTimeout(timerClear);

    btnClearRecords.value = "Delete";    

}
//cuenta atras para borrar
function clearCountdown(){
  
    if(btnClearRecords.value == "Cancel (3)"){        
        btnClearRecords.value = "Cancel (2)";
        return;
    }
    if(btnClearRecords.value == "Cancel (2)"){
        btnClearRecords.value = "Cancel (1)";
        return;
    }
    if(btnClearRecords.value == "Cancel (1)"){        
        btnClearRecords.value = "Delete";
        clearInterval(countdownClear);//important! no sé perquè
        return;
    }
}


//Borra localstorage
function clearLocalStorage(){
    window.localStorage.clear();
    //Oculta tabla
    hideRecords();
    //Vaciar records
    panelRecords.innerHTML = "";

}

//Quitar diacriticos menos ñ en las comparaciones de carácteres

function sinAcentos(text){

	return text
           .normalize('NFD')
           .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
           .normalize();

}
// Elimina los diacríticos de un texto (ES6)

//SIN USO
function eliminarDiacriticos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
}

// Metodo largo
let sinDiacriticos = (function(){
    let de = 'ÁÃÀÄÂÉËÈÊÍÏÌÎÓÖÒÔÚÜÙÛÑÇáãàäâéëèêíïìîóöòôúüùûñç',
         a = 'AAAAAEEEEIIIIOOOOUUUUNCaaaaaeeeeiiiioooouuuunc',
        re = new RegExp('['+de+']' , 'ug');

    return texto =>
        texto.replace(
            re, 
            match => a.charAt(de.indexOf(match))
        );
})();