// Constants
const SIMULATION_WIDTH = 1000; 
const SIMULATION_HEIGHT = 1000;

const simulationarea = document.getElementById('simulationwindow');
const lightswitch = document.getElementById('light');                     
const filterswitch = document.getElementById('filter');                   
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const timeDisplay = document.getElementById('time-display');

// Variables
let time = 0;
let timeincrease = 100;
let circles = [];

//Anfangsbedingungen
let isPaused = false;
let isOn = false;

// Let time fly
const interval = setInterval(()=> {
    time += timeincrease;
    timeDisplay.innerHTML = time;
    document.documentElement.style.setProperty("--t", time/100 + 'px');

}, timeincrease);

//Creating Lightcircles
function createCircle(colorClass){       
    //console.log('Creating Circle with class:', colorClass);            
    const circle = document.createElement('div');
    circle.className ='circle ' + colorClass;
    circle.style.width = 'var(--t)';
    circle.style.height = 'var(--t)';
    circle.style.minWidth = '30px';
    circle.style.minHeight = '30px';
   
    simulationarea.appendChild(circle);

    // Let circles expand with time
    let radius = 30;
    /*const interval = setInterval(() => {
        if(!isPaused){
            radius += time;
            circle.style.width = radius + 'px';
            circle.style.height = radius + 'px';
        }
    }, 1000);*/

    circles.push({
        element: circle,
        interval: interval,
        radius:0
    });
}


// Light-switch
const checkbox = lightswitch.querySelector('input[type="checkbox"]');
checkbox.addEventListener('change', () =>{
    //console.log('Checked');
    //alert('Licht switch toggled');
    isOn= checkbox.checked;
    if (isOn){
        //console.log('Creating white circle...');
        createCircle('circle-lighton');
    } else {
        createCircle('circle-lightoff');
        //console.log('Creating black circle...');
    }  
});

function turnOn(){
    isOn = true;
};
function turnOff(){
    isOn = false;
};

//Stopp and Resume Simulation via Button

pauseBtn.addEventListener('click', function () {
    if (isPaused){
        resumeSimulation();
    } else{
        pauseSimulation();
    }
});
function pauseSimulation(){
    isPaused=true;
    document.getElementById('pauseBtn').textContent='Weiter';
};
function resumeSimulation(){
    isPaused =true;
    document.getElementById('pauseBtn').textContent='Stopp';
}















    
