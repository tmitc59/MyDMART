// variable for the points and streak
let points = 0;
let streak = 0;

// variable to hold which button is active (to be pressed next)
let activeButton = 0;

// variable to hold the gamepads unique identifiers
const gamepads = {};

// function that generates a new random button
function generateNewRandomActive() {
  // generate a new number between 0 and 3 (both included)
  activeButton = Math.floor(Math.random() * 4);
}

// function to be called when a button is pressed
function buttonPressed(id) {
   // if the pressed button is the same as the active one
  if (activeButton === id) {
    // add points
    streak++;
    points++;
    // generate a new random button to press
    generateNewRandomActive();
  }else {
    streak = 0;
  }

}

// function to be called continuously to read the gamepad values
function readGamepadValues() {
  // read the indexes of the connected gamepads
  const indexes = Object.keys(gamepads);
  
  // read the gamepads connected to the browser
  const connectedGamepads = navigator.getGamepads();
  
  // traverse the list of gamepads reading the ones connected to this browser
  for (let x = 0; x < indexes.length; x++) {
    // read the gamepad buttons
    const buttons = connectedGamepads[indexes[x]].buttons;
  }

  // if there are gamepads connected, keep reading their values
  if (indexes.length > 0) {
    window.requestAnimationFrame(readGamepadValues);
  }
}

for (let x = 0; x < indexes.length; x++) {
    const buttons = connectedGamepads[indexes[x]].buttons;

    // traverse the list of buttons
    for (let y = 0; y < buttons.length; y++) {
      // call the new function when a button is pressed
      if (buttons[y].pressed) {
        // ...and its previous state was not pressed
        if (!stateButtons[y]) {
          // we mark it as pressed
          stateButtons[y] = true;
          // and call the buttonPressed function
          buttonPressed(y);
        }
      // if the button is NOT pressed
      } else {
        // delete the pressed state
        delete stateButtons[y];
      }
    }
}

// function to be called when a gamepad is connected
window.addEventListener("gamepadconnected", function(e) {
  console.info("Gamepad connected!");
  gamepads[e.gamepad.index] = true;
  generateNewRandomActive();
  readValues();
});

// listener to be called when a gamepad is disconnected
window.addEventListener("gamepaddisconnected", function(e) {
  console.info("Gamepad disconnected");
  delete gamepads[e.gamepad.index];
});
