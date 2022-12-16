//CARGAR EQUIPOS DESDE UN JSON EN LA PÁGINA DE QUINIELAS
//V1 de pruebas 

//traemos el archivo json y lo convertimos en objeto
import equips from '../json/equips.json' assert { type: 'json' };

//OTRAS MANERAS
// const jsonData = require('/json/equips.json');//NODE.js
// const response = await fetch("/json/equips.json");
// const equips = await response.json();
// console.log(equips);


console.log(equips);
//Redundante: pero lo así lo veo
// let equipsJson = JSON.stringify(equips);
// console.log(equipsJson);
// let eqips = JSON.parse(equipsJson);

window.addEventListener('load', function() {
    // console.log(eqips.primeraMasc[0]);
    // Guardar las claves del objeto que serán las categorías
    console.log(Object.keys(equips));
    let categories = Object.keys(equips);
    //Guardar los valores que serán los equipos
    let teams = Object.values(equips);
    console.log(teams);
    //Recogemos el div la página de quinielas    
    let showTeams = this.document.getElementById("showTeams");

    //Generamos títulos en el div de pool.php
    for (let i=0; i < categories.length; i++){

        const category = document.createElement('h5');
        category.innerText = categories[i];
        showTeams.appendChild(category);
        //Generamos los equipos
        for(let j = 0; j < teams[i].length; j++){
            const team = document.createElement('span');
            if (j != 0){
                team.innerText = " - ";
            }
            team.innerText += teams[i][j];
           
            showTeams.appendChild(team);
        }

    }



});



