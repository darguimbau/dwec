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

const recordsArray = [];

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

weaponWords = ["hácha", "alábarda", "éstoque", "espadá", "mártillo", "dága", "estrella del álba", "lánza", "picà", "gàrrote", "sablé"];
spellWords = ["invisibilidad", "bola de fuego", "rayo de escarcha", "enredar", "proyectil magico", "tormenta de hielo", "rayo solar", "nube apestosa", "miedo", "inmovilizar", "flecha acida"];
actionWords = ["agarrar", "derribar", "desarmar", "huir", "correr", "defender", "usar pocion", "intimidar", "provocar", "apresar", "aturdir"];

// Joc
console.log("Elige una opción y dale a 'jugar'")
//Personatje
knight.innerHTML = '<img src="./img/001.png">';
//Espera per començar
buttonWord.addEventListener("click", play);


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
    addChar(char);
    // incloure a l'array per evitar repetició de lletres
    charUsed.push(char);

    //comprovam si hi ha encert amb l'array de la paraula secreta
    //empram la funció per llevar accents i join per passar de array a cadena
    if(sinAcentos(wordSecret.join()).includes(char)){
        //gestió d'encert
        charHit(char);
    }else{
        //gestió de fall
        charFail();
    }
}

//Incloure lletres noves a HTML
function addChar(char){
    const charElement = document.createElement("span");
    charElement.innerHTML = char;
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

    function checkRecord(word, minutes, seconds, fails){
        let key = word;
        let values = [minutes, seconds, fails];
        //console.log(values); 

        let localWord = JSON.parse(localStorage.getItem(word));
        //console.log(typeof localWord);
        //console.log(localWord);
        
        if (localWord !== null){
            
            if((localWord[0] < minutes) || (localWord[0] == minutes && localWord[1] < seconds )){
                console.log("record preexistente");
                return;

            }else{
                localStorage.setItem(key, JSON.stringify(values));
                console.log("record sobreescrito");
                return;
            }
           
        }else{
            localStorage.setItem(key, JSON.stringify(values));
            console.log("record creado");
            

        }
        
        

    }

//Quitar diacriticos menos ñ

function sinAcentos(text){

	return text
           .normalize('NFD')
           .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
           .normalize();

}
// Elimina los diacríticos de un texto (ES6)
//
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