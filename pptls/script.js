        //JS UD02 act 5
        //Joc P-P-T-L-S amb botons
        //Autor: Dani Arguimbau
        /*Dubtes:
        És millor no emprar variables globals a les funcions per facilitar el reaprofitament?
        Passarles com arguments o crear variables locals i
        retornar el valor per a la variable global?
        O adaptar les funcions després a la biblioteca?
        Límit d'events per un element? 
        */

        //Variables
        // var gameWords = ['papel', 'piedra', 'tijeras', 'lagarto', 'spock'];
        var playerName;
        var playerText;
        var playerOption;
        var machineOption;
        
        var playerPoints = document.getElementById("player_points");
        var machinePoints = document.getElementById("machine_points");
        var playerPointsValue = 0;  
        var machinePointsValue = 0;
        // var points;

        var message = document.getElementById("message");
        var choicesImg = document.getElementById("choices_img");


        //Habilitar tecla enter per accionar el botó de play
        var input = document.getElementById("playerText");
        input.addEventListener("keypress", function(event) {
          if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("play").click();
          }
        });

        //Listener per iniciar un nou joc 
        document.getElementById("start").addEventListener("click", newGame, false);
        
        //Ocultar els panells de joc
        document.querySelector(".score").style.visibility = "hidden";
        document.getElementById("game").style.visibility = "hidden";  
        
        //Crear nova partida
        function newGame(){
            //ocultar el botó de nou joc
            document.getElementById("start").style.display = "none";
            //demanar per pantalla el nom de jugador i asignar un per defecte
            playerName = prompt("Introduce nombre de jugador");
            if(playerName == "" || playerName == null){
                playerName = "Jugador";
            }           
            console.log(playerName);

            //Col·locar el nom al texte del input opció
            document.getElementById("name").innerHTML = playerName;
            //Mostrar panells de joc
            document.querySelector(".score").style.visibility = "visible";
            document.getElementById("game").style.visibility = "visible";

            //Asignar els punts inicials
            playerPoints.innerHTML = playerPointsValue;
            machinePoints.innerHTML = machinePointsValue;

            //Autofocus a l'input de text
            document.getElementById("playerText").focus();

            //Listener per llegir el text introduït pel jugador: funció playGame
            document.getElementById("play").addEventListener("click", playGame, false);
            
            //Listener per sortir del joc: funció exitGame
            document.getElementById("exit").addEventListener("click", exitGame, false);   
        }

        //Gestió de opció introduida i mecànica del joc
        function playGame(){            
            //Captura del text
            playerText = document.getElementById("playerText").value.toLowerCase();
            //Fer net l'input 
            document.getElementById("playerText").value="";
            console.log(playerText);

            //Funció per cercar l'index de les paraules i mostrar-ho per consola
            searchWords(playerText);
            
            //Funció que retorna la paraula amb l'index més baix i la guardam a la variable global
            playerOption = searchGameWords(playerText);              
            
            //Si la funció no troba cap paraula de joc, a la espera de un text nou    
            if(playerOption == "repeat"){                
                document.getElementById("playerText").value = "";
                return;
            }     
           
            //Funció per generar una opció de la màquina aleatoria i la guardam a la variable global
            machineOption = randomWord();
            console.log("Machine Option = " + machineOption);

            //MECÀNICA DEL JOC
            //empat
            if(playerOption == machineOption){
                message.innerHTML = "Bazinga<br>¡Empate!";                
                choicesImg.innerHTML ='<img src="'+playerOption+'.png"/><img style="transform: scaleX(-1);" src="'+machineOption+'.png"/>'

            }
            //Cada opció guanya a dues i perd contra dues
            if(playerOption == "piedra"){

                if(machineOption == "lagarto"){
                    //Mostram missatge del joc i anunciam victòria o derrota
                    message.innerHTML = "Piedra aplasta Lagarto<br>¡Victoria!";                    
                    //Mostram imatges de les opcions amb estils css 
                    choicesImg.innerHTML ='<img src="'+playerOption+'.png"/><img style="transform: scaleX(-1);opacity:.5" src="'+machineOption+'.png"/>'
                    //Augmentam puntuació del guanyador
                    playerPointsValue ++;
                    //Actualitzam a html
                    playerPoints.innerHTML = playerPointsValue;                    
                }
                if(machineOption == "tijeras"){
                    message.innerHTML = "Piedra aplasta Tijeras<br>¡Victoria!";                
                    choicesImg.innerHTML ='<img src="'+playerOption+'.png"/><img style="transform: scaleX(-1);opacity:.5" src="'+machineOption+'.png"/>'
                    playerPointsValue ++;
                    playerPoints.innerHTML = playerPointsValue;
                }
                if(machineOption == "spock"){
                    message.innerHTML = "Spock vaporiza Piedra<br>¡Derrota!";                   
                    choicesImg.innerHTML ='<img style="opacity:.5" src="'+playerOption+'.png"/><img style="transform: scaleX(-1);" src="'+machineOption+'.png"/>'
                    machinePointsValue ++;
                    machinePoints.innerHTML = machinePointsValue;
                }
                if(machineOption == "papel"){
                    message.innerHTML = "Papel tapa Piedra<br>¡Derrota!";                    
                    choicesImg.innerHTML ='<img style="opacity:.5" src="'+playerOption+'.png"/><img style="transform: scaleX(-1);" src="'+machineOption+'.png"/>'
                    machinePointsValue ++;
                    machinePoints.innerHTML = machinePointsValue;
                }
            }

            if(playerOption == "papel"){

                if(machineOption == "piedra"){
                    //Mostram missatge del joc i anunciam victòria o derrota
                    message.innerHTML = "Papel tapa a Piedra<br>¡Victoria!";                    
                    //Mostram imatges de les opcions amb estils css 
                    choicesImg.innerHTML ='<img src="'+playerOption+'.png"/><img style="transform: scaleX(-1);opacity:.5" src="'+machineOption+'.png"/>'
                    //Augmentam puntuació del guanyador
                    playerPointsValue ++;
                    //Actualitzam a html
                    playerPoints.innerHTML = playerPointsValue;                    
                }
                if(machineOption == "spock"){
                    message.innerHTML = "Papel desautoriza a Spock<br>¡Victoria!";                
                    choicesImg.innerHTML ='<img src="'+playerOption+'.png"/><img style="transform: scaleX(-1);opacity:.5" src="'+machineOption+'.png"/>'
                    playerPointsValue ++;
                    playerPoints.innerHTML = playerPointsValue;
                }
                if(machineOption == "tijeras"){
                    message.innerHTML = "Tijeras cortan Papel<br>¡Derrota!";                   
                    choicesImg.innerHTML ='<img style="opacity:.5" src="'+playerOption+'.png"/><img style="transform: scaleX(-1);" src="'+machineOption+'.png"/>'
                    machinePointsValue ++;
                    machinePoints.innerHTML = machinePointsValue;
                }
                if(machineOption == "lagarto"){
                    message.innerHTML = "Lagarto devora Papel<br>¡Derrota!";                    
                    choicesImg.innerHTML ='<img style="opacity:.5" src="'+playerOption+'.png"/><img style="transform: scaleX(-1);" src="'+machineOption+'.png"/>'
                    machinePointsValue ++;
                    machinePoints.innerHTML = machinePointsValue;
                }
            }
            if(playerOption == "tijeras"){

                if(machineOption == "lagarto"){
                    //Mostram missatge del joc i anunciam victòria o derrota
                    message.innerHTML = "Tijeras decapitan Lagarto<br>¡Victoria!";                    
                    //Mostram imatges de les opcions amb estils css 
                    choicesImg.innerHTML ='<img src="'+playerOption+'.png"/><img style="transform: scaleX(-1);opacity:.5" src="'+machineOption+'.png"/>'
                    //Augmentam puntuació del guanyador
                    playerPointsValue ++;
                    //Actualitzam a html
                    playerPoints.innerHTML = playerPointsValue;                    
                }
                if(machineOption == "papel"){
                    message.innerHTML = "Tijeras cortan Papel<br>¡Victoria!";                
                    choicesImg.innerHTML ='<img src="'+playerOption+'.png"/><img style="transform: scaleX(-1);opacity:.5" src="'+machineOption+'.png"/>'
                    playerPointsValue ++;
                    playerPoints.innerHTML = playerPointsValue;
                }
                if(machineOption == "piedra"){
                    message.innerHTML = "Piedra aplasta Tijeras<br>¡Derrota!";                   
                    choicesImg.innerHTML ='<img style="opacity:.5" src="'+playerOption+'.png"/><img style="transform: scaleX(-1);" src="'+machineOption+'.png"/>'
                    machinePointsValue ++;
                    machinePoints.innerHTML = machinePointsValue;
                }
                if(machineOption == "spock"){
                    message.innerHTML = "Spock rompe Tijeras<br>¡Derrota!";                    
                    choicesImg.innerHTML ='<img style="opacity:.5" src="'+playerOption+'.png"/><img style="transform: scaleX(-1);" src="'+machineOption+'.png"/>'
                    machinePointsValue ++;
                    machinePoints.innerHTML = machinePointsValue;
                }
            }
            if(playerOption == "lagarto"){

                if(machineOption == "papel"){
                    //Mostram missatge del joc i anunciam victòria o derrota
                    message.innerHTML = "Lagarto devora Papel<br>¡Victoria!";                    
                    //Mostram imatges de les opcions amb estils css 
                    choicesImg.innerHTML ='<img src="'+playerOption+'.png"/><img style="transform: scaleX(-1);opacity:.5" src="'+machineOption+'.png"/>'
                    //Augmentam puntuació del guanyador
                    playerPointsValue ++;
                    //Actualitzam a html
                    playerPoints.innerHTML = playerPointsValue;                    
                }
                if(machineOption == "spock"){
                    message.innerHTML = "Lagarto envenena a Spock<br>¡Victoria!";                
                    choicesImg.innerHTML ='<img src="'+playerOption+'.png"/><img style="transform: scaleX(-1);opacity:.5" src="'+machineOption+'.png"/>'
                    playerPointsValue ++;
                    playerPoints.innerHTML = playerPointsValue;
                }
                if(machineOption == "piedra"){
                    message.innerHTML = "Piedra aplasta Lagarto<br>¡Derrota!";                   
                    choicesImg.innerHTML ='<img style="opacity:.5" src="'+playerOption+'.png"/><img style="transform: scaleX(-1);" src="'+machineOption+'.png"/>'
                    machinePointsValue ++;
                    machinePoints.innerHTML = machinePointsValue;
                }
                if(machineOption == "tijeras"){
                    message.innerHTML = "Tijeras decapitan Lagarto<br>¡Derrota!";                    
                    choicesImg.innerHTML ='<img style="opacity:.5" src="'+playerOption+'.png"/><img style="transform: scaleX(-1);" src="'+machineOption+'.png"/>'
                    machinePointsValue ++;
                    machinePoints.innerHTML = machinePointsValue;
                }
            }
            if(playerOption == "spock"){

                if(machineOption == "piedra"){
                    //Mostram missatge del joc i anunciam victòria o derrota
                    message.innerHTML = "Spock vaporiza Piedra<br>¡Victoria!";                    
                    //Mostram imatges de les opcions amb estils css 
                    choicesImg.innerHTML ='<img src="'+playerOption+'.png"/><img style="transform: scaleX(-1);opacity:.5" src="'+machineOption+'.png"/>'
                    //Augmentam puntuació del guanyador
                    playerPointsValue ++;
                    //Actualitzam a html
                    playerPoints.innerHTML = playerPointsValue;                    
                }
                if(machineOption == "tijeras"){
                    message.innerHTML = "Spock rompe Tijeras<br>¡Victoria!";                
                    choicesImg.innerHTML ='<img src="'+playerOption+'.png"/><img style="transform: scaleX(-1);opacity:.5" src="'+machineOption+'.png"/>'
                    playerPointsValue ++;
                    playerPoints.innerHTML = playerPointsValue;
                }
                if(machineOption == "papel"){
                    message.innerHTML = "Papel desautoriza a Spock<br>¡Derrota!";                   
                    choicesImg.innerHTML ='<img style="opacity:.5" src="'+playerOption+'.png"/><img style="transform: scaleX(-1);" src="'+machineOption+'.png"/>'
                    machinePointsValue ++;
                    machinePoints.innerHTML = machinePointsValue;
                }
                if(machineOption == "lagarto"){
                    message.innerHTML = "Lagarto envenena a Spock<br>¡Derrota!";                    
                    choicesImg.innerHTML ='<img style="opacity:.5" src="'+playerOption+'.png"/><img style="transform: scaleX(-1);" src="'+machineOption+'.png"/>'
                    machinePointsValue ++;
                    machinePoints.innerHTML = machinePointsValue;
                }
            }

        }

        function searchWords(text){
            let index = -1;
            var gameWords = ['papel', 'piedra', 'tijeras', 'lagarto', 'spock'];
            
            //bucle de les paraules del joc que seràn cercades al text del jugador
            console.log("Búsqueda de índices");
            for(let i = 0; i < gameWords.length; i++){
                
                index = text.indexOf(gameWords[i]);
                //si trobam paraula la mostram amb el seu index
                if(index != -1){
                    console.log(gameWords[i] + " = " + index);                    
                }                
            }
        }
        function searchGameWords(text){

            let index = -1;            
            //variable amb la longitud del text per capturar index inferiors al for           
            let indexMin = text.length;
            let gameWords = ['papel', 'piedra', 'tijeras', 'lagarto', 'spock'];
            //valor de retorn en cas de no trobar paraula de joc
            let answer = "repeat";                      
           
            //bucle de les paraules del joc que seràn cercades al text del jugador
            console.log("Guardar la palabra con el índice más bajo");
            for(let i = 0; i < gameWords.length; i++){

                index = playerText.indexOf(gameWords[i]);
                //Aquí comprobam si l'index és més petit que l'anterior i guardam la paraula
                //Acabarem amb la primera paraula que introdueix el jugador
                if(index != -1 && index < indexMin){
                    indexMin = index;
                    answer = gameWords[i];                    
                }                                    
            }
            //condicional ternari per missatge i tornam valor 
            answer != "repeat" ? console.log("Player Option = " + answer) : alert("No se ha encontrado una opción válida");
            return answer;
                        
        }
        //Retorna la opció de la màquina
        function randomWord(){
            let gameWords = ['papel', 'piedra', 'tijeras', 'lagarto', 'spock'];
            return gameWords[Math.floor(Math.random()*gameWords.length)]; 

        }
        //Sortir amb confirmació
        function exitGame(){
           if(window.confirm("¿Es un adiós?")){
                location.reload(true);
           }
            
        }


     
            


        
      