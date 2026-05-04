// Constants                                                                --> Deinition von Konstanten: const_Name von Konstante_=_Definition
const LIGHT_SPEED = 2.5;                                                      // Rate der Ausbreitung der Kreise (pixels per frame)
const SIMULATION_WIDTH = 600;                                               // Breite der Simulation
const SIMULATION_HEIGHT = 600;                                              // Höhe der Simulation 
                                                                            //--> wenn Höhe oder Breite geändert werden, muss anderes 
                                                                            // und Position der Kreise angepasst werden

// Get elements                                                             --> Konstanten werden über Elemente aus HTML definiert 
const simulationsFläche = document.getElementById('simulationsfläche');     // document.getElementById('Name ID') 
const lichtAnBtn = document.getElementById('licht-an');                     // = Definition von Konstanten über Element mit ID
const lichtAusBtn = document.getElementById('licht-aus');                   
const farbfilterBtn = document.getElementById('farbfilter');

// Store circles in an array                                                // Definition von Variable ohne festen Wert sondern aus einer leeren Liste [] 
let circles = [];                                                           // let = Anweisung Variable 

// Function to create a new circle
function createCircle(colorClass) {                                         // Erstellen von Kreis mit Parameter (bestimmte Farbe=colorClass)
    const circle = document.createElement('div');                           // Erstellen von HTML-Element <div>
    circle.className = 'circle ' + colorClass;                              // Kreis bekommt 2 Klassen circle und colorClass
    circle.style.width = '30px';                                            // Angangsgröße Kreis
    circle.style.height = '30px';                                           // Anfangsgröße Kreis 
   // circle.style.transition = 'all 0.2s ease';                            // Animation zur Ausbreitung; 'none' = schnell; so=sanfter

    simulationsFläche.appendChild(circle);                                  // Kreis in der Simulationsfläche einzeichnen 

    // Ausbreitung von Kreis = Expansionsschleife
    let radius = 30;                                                         // Anfangsradius
    const interval = setInterval(() => {     
        if (!isPaused) {
            radius += LIGHT_SPEED;                                              // Zeitliches Verhalten von Radius

            // Update von Kreisgröße                                     
            circle.style.width = radius + 'px';
            circle.style.height = radius + 'px';

            // Zentrieren des Kreises im Container
            // circle.style.left = '50%';
            // circle.style.top = '50%';
            // circle.style.transform = 'translate(-50%, -50%)';                   // ist das notwendig?
        }                            // Timer Funktion: jede x ms wird Expansionsschleife durchgefüht
    }, 100); // 100ms = 10px per 100ms                                      // definiert die Durchführungsrate der Schleife

    // Zwischenspeichern vom Kreis zum löschen oder Steuern --> braucht man für Zurücksetzen
    circles.push({
        element: circle,
        interval: interval,
        radius: 0
    });
}

// Funktion von Knöpfen definieren 
lichtAnBtn.addEventListener('click', () => {                                // Etwas passiert nach Trigger "Click" für Button Licht an 
    createCircle('circle-white');                                           // Aufrufen der Funktion 
});

lichtAusBtn.addEventListener('click', () => {
    createCircle('circle-black');
});

farbfilterBtn.addEventListener('click', () => {
    createCircle('circle-red');
});
const resetBtn = document.getElementById('resetBtn');                       // Finde ID-Reset Button; Speichern als Variable 
resetBtn.addEventListener('click', () => {                                  // Funktion von Button nach Trigger Klick
    // Clear all circles    
    circles.forEach(circle => {
        clearInterval(circle.interval);
        circle.element.remove();                                            // Remove from DOM
    });
    circles = [];                                                           // Zwischenspeicher löschen 

    // Reset state
    resumeSimulation();                                        // Variablen zurücksetzen 

});


//Pausebutton

let isPaused = false;                                                       // Variable, um zu wissen, ob die Simulation pausiert ist

// Event-Listener für den Button
document.getElementById('pauseBtn').addEventListener('click', function() {
    if (isPaused) {
        resumeSimulation();
    } else {
        pauseSimulation();
    }
});

function pauseSimulation() {
    isPaused = true;
    document.getElementById('pauseBtn').textContent = 'Fortsetzen';

}

function resumeSimulation() {
    isPaused = false;
    document.getElementById('pauseBtn').textContent = 'Pausieren';

    // Startet alle Intervalle neu — wenn du das möchtest
    //circles.forEach(circle => {
     //    circle.interval = setInterval(() => {
    //         // Deine Animation hier
    //    }, 100);
    // });
}
