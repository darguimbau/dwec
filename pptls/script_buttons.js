        //JS UD02 act 5
        //Joc P-P-T-L-S amb botons
        //Autor: Dani Arguimbau
        /*Dubtes:
        Passar parèmetres al executar eventListener?
        Evitant posar js als tags html
        */

        //VARIABLES

        // var gameWords = ['papel', 'piedra', 'tijeras', 'lagarto', 'spock'];       
        //Eleccions d'opció de joc
        var playerOption;
        var machineOption;
        //Puntuació
        var playerPoints = document.getElementById("player_points");
        var machinePoints = document.getElementById("machine_points");
        var playerPointsValue = 0;  
        var machinePointsValue = 0;
       
        //Resultats
        var message = document.getElementById("message");
        var choicesImg = document.getElementById("choices_img");        

        //Listener per iniciar un nou joc: funció newGame
        document.getElementById("start").addEventListener("click", newGame, false);
        //Listener per sortir del joc: funció exitGame
        document.getElementById("exit").addEventListener("click", exitGame, false);   
        
        //Ocultar els panells de joc
        document.querySelector(".score").style.visibility = "hidden";
        document.getElementById("game").style.visibility = "hidden";  
        
        //Crear nova partida
        function newGame(){
            //ocultar el botó de nou joc
            document.getElementById("start").style.display = "none";           
           
            //Mostrar panells de joc
            document.querySelector(".score").style.visibility = "visible";
            document.getElementById("game").style.visibility = "visible";

            //Asignar els punts inicials
            playerPoints.innerHTML = playerPointsValue;
            machinePoints.innerHTML = machinePointsValue;
           
            //Listener per els buttons d'opció: funció per captura playerOption i executar playGame
            //Aquí el dubte d'incloure parèmetres i simplificar el codi
            document.getElementById("b_piedra").addEventListener("click", piedraOption, false);
            document.getElementById("b_papel").addEventListener("click", papelOption, false);
            document.getElementById("b_tijeras").addEventListener("click", tijerasOption, false);
            document.getElementById("b_lagarto").addEventListener("click", lagartoOption, false);
            document.getElementById("b_spock").addEventListener("click", spockOption, false);

            // //Listener per sortir del joc: funció exitGame
            // document.getElementById("exit").addEventListener("click", exitGame, false);   
        }
        
        //Assigna la opcio del jugardor i ejecuta joc CHAPUSSA!!
        function piedraOption(){
            playerOption = "piedra";
            playGame();
        }
        function papelOption(){
            playerOption = "papel";
            playGame();
        }
        function tijerasOption(){
            playerOption = "tijeras";
            playGame();
        }
        function lagartoOption(){
            playerOption = "lagarto";
            playGame();
        }
        function spockOption(){
            playerOption = "spock";
            playGame();
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


        //Gestió d'opcions i mecànica del joc
        function playGame(){            
                        
            //Mostram per consolal'opció del jugador            
            console.log("Player Option = " + playerOption);

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
                    //Mostram imatges de les opcions, manipulades amb estils css 
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

        

     
            


        
      