const text = document.getElementById("text");
const lazy = "**Daniel got lazy or forgot to do this part. Please let him know. Thanks.**"
function game() {main_screen()}
function main_screen() {
  remove_button()//removing the existing button
  text.innerHTML = "Welcome to the text based role playing game." +  "<br/>" + "Click the 'Start' button to begin.";
  text.innerHTML += "<br/><br/><br/>" + bold("Warning: This game will crash");
  create_button(["Start"])
  document.getElementById("Start").addEventListener("click", function () {
    tutorial(1)//moving on to the next function
  })
}
//Need a better way to cycle through this tutorial section
function tutorial(part) {
  remove_button()//removing the existing button
  text.innerHTML = bold("Tutorial Part " + part) + "<br/><br/>"
  if ([1, "info"].includes(part)) {
    text.innerHTML += "INFO" + "<br/>" + "This game is a turn-base RPG."
    create_button(["Continue"])
    document.getElementById("Continue").addEventListener("click",function () {tutorial(2)})
  }
  if ([2, "how to play"].includes(part)) {
    text.innerHTML += "HOW TO PLAY" + "<br/>" + "Click some buttons"
    create_button(["Back", "Continue"])
    document.addEventListener("click", function () {
      if (event.target.id == "Back") tutorial(1)
      if (event.target.id == "Continue") menu()
    })
  }
}
function menu() {
  remove_button()
  text.innerHTML = bold("MENU") + "<br/><br/>" + "Click the button below to complete a action."

  create_button(["Venture", "Tutorial"])
  document.addEventListener("click", function () {
    if (event.target.id == "Venture") venture()
    if (event.target.id == "Tutorial") tutorial(1)
  })
}
function venture() {
  remove_button();
  var crosspath = {
    "You found a forkpath": {"right": [1, 0, -1], "left": [1, 0, -1]},
    "You found a crosspath": {"right": [1, 0, -1], "center": [1, 0, -1], "left": [1, 0, -1]}
  }
  text.innerHTML = bold("Venture") + "<br/><br/>"
  var i = randomInt(2)
  text.innerHTML += Object.keys(crosspath)[i];
  for (i in crosspath[Object.keys(crosspath)[i]]) {
    create_button([i])
    document.addEventListener("click", function () {
      if (event.target.id == "continue") venture()
      if (event.target.id == "right") venture()
      if (event.target.id == "center") venture()
      if (event.target.id == "left") venture()
      if (event.target.id == "menu") menu()
    })
  }

}
function randomInt(max) {return Math.floor(Math.random() * max);}
//bolding a word --- Dunno why but this seems helpful
function bold(words) {return "<b>" + words + "</b>" }
//ERROR sign
function ERROR() {
  remove_button()
  text.innerHTML = bold(" ERROR ")
  create_button(["Menu"])
  document.getElementById("Menu").addEventListener("click",function () {menu()})
}
//some button function below here
function create_button(btn_name) {
  for (var i = 0; i < btn_name.length; i++) {
    let btn = document.createElement('button');
    btn.id = btn_name[i]
    btn.innerHTML = btn_name[i]
    document.getElementById('option-buttons').appendChild(btn);
  }
}
function remove_button() {
  var element = document.getElementsByTagName("button"), index;
  for (index = element.length - 1; index >= 0; index--) {
    element[index].parentNode.removeChild(element[index]);
  }
}
//calling the start of the game function
game()