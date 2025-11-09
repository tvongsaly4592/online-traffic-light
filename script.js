That's great! You now have the structure (index.html) and the visual style (style.css) for your traffic lights committed to your repository.The final step is to create the script.js file to add the functional logic that makes the lights cycle automatically.⚙️ Next Step: Create and Commit script.jsFollow the same steps you used before: go to your repository, click "Add file" > "Create new file", and name it:$$\mathbf{script.js}$$Then, paste the following JavaScript code into the editor.💻 Functional Logic (script.js)This code implements the two-way intersection logic, ensuring that when one road is green, the intersecting road is red, and vice-versa, with proper timing delays for yellow lights.JavaScript// --- Configuration ---
const TIMING = {
    GREEN: 5000, // 5 seconds
    YELLOW: 2000, // 2 seconds
    RED: 7000     // Total duration of RED state (must be >= GREEN + YELLOW)
};

// --- DOM Element Selectors ---
// Get all the light elements by their unique IDs from index.html
const industrialLights = {
    red: document.getElementById('ind-red'),
    yellow: document.getElementById('ind-yellow'),
    green: document.getElementById('ind-green'),
};

const stonecrestLights = {
    red: document.getElementById('stone-red'),
    yellow: document.getElementById('stone-yellow'),
    green: document.getElementById('stone-green'),
};

// --- State Variables ---
let currentPhase = 'INDUSTRIAL_GREEN'; // Start with Industrial Blvd having the right-of-way

// --- Core Light Control Function ---

// Function to turn a single light ON or OFF
function setLightState(lightElement, isOn) {
    if (isOn) {
        // Add the 'on' class to illuminate the light
        lightElement.classList.add('on');
    } else {
        // Remove the 'on' class to turn the light off
        lightElement.classList.remove('on');
    }
}

// Function to set the entire state of a signal head
function setSignal(lights, red, yellow, green) {
    setLightState(lights.red, red);
    setLightState(lights.yellow, yellow);
    setLightState(lights.green, green);
}

// --- Traffic Cycle Logic ---

function runTrafficCycle() {
    switch (currentPhase) {

        // PHASE 1: Industrial Blvd is GREEN, Stonecrest Pkwy is RED
        case 'INDUSTRIAL_GREEN':
            console.log("Phase: Industrial GREEN");
            setSignal(industrialLights, false, false, true); // Ind: G
            setSignal(stonecrestLights, true, false, false); // Stone: R

            // Next phase is Industrial YELLOW after GREEN duration
            currentPhase = 'INDUSTRIAL_YELLOW';
            setTimeout(runTrafficCycle, TIMING.GREEN);
            break;

        // PHASE 2: Industrial Blvd is YELLOW, Stonecrest Pkwy is still RED
        case 'INDUSTRIAL_YELLOW':
            console.log("Phase: Industrial YELLOW");
            setSignal(industrialLights, false, true, false); // Ind: Y
            setSignal(stonecrestLights, true, false, false); // Stone: R

            // Next phase is Stonecrest GREEN after YELLOW duration
            currentPhase = 'STONECREST_GREEN';
            setTimeout(runTrafficCycle, TIMING.YELLOW);
            break;

        // PHASE 3: Stonecrest Pkwy is GREEN, Industrial Blvd is RED
        case 'STONECREST_GREEN':
            console.log("Phase: Stonecrest GREEN");
            setSignal(industrialLights, true, false, false); // Ind: R
            setSignal(stonecrestLights, false, false, true); // Stone: G

            // Next phase is Stonecrest YELLOW after GREEN duration
            currentPhase = 'STONECREST_YELLOW';
            setTimeout(runTrafficCycle, TIMING.GREEN);
            break;

        // PHASE 4: Stonecrest Pkwy is YELLOW, Industrial Blvd is still RED
        case 'STONECREST_YELLOW':
            console.log("Phase: Stonecrest YELLOW");
            setSignal(industrialLights, true, false, false); // Ind: R
            setSignal(stonecrestLights, false, true, false); // Stone: Y

            // Loop back to Industrial GREEN after YELLOW duration
            currentPhase = 'INDUSTRIAL_GREEN';
            setTimeout(runTrafficCycle, TIMING.YELLOW);
            break;
    }
}

// --- Start the Simulation ---
runTrafficCycle();
