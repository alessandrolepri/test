const width = 5
let $grid
let $squares
const roomba = [24] // starting from bottom left corner (x: 0, y:0)
let direction

// const point = ['N', 'S', 'E', 'W'] // drive instruction input
//
// let road = [] // empty array to be populated by 'point' on input



function getNextIndex() {
  switch(direction) {
    case 'right': return roomba[0] + 1
    case 'left': return roomba[0] -1
    case 'up': return roomba[0] - width
    case 'down': return roomba[0] + width
  }
}


// generate dirt patch

function generateDirt() {
  $squares.eq(Math.floor(Math.random() * $squares.length)).addClass('dirt')
}

// create a move function to let roomba stay within the border roomb

function move() {
  const nextIndex = getNextIndex()
  if(roomba[0] % width === width-1 && direction === 'right' ||
    roomba[0] % width === 0 && direction === 'left' ||
    roomba[0] - width < 0 && direction === 'up' ||
    roomba[0] + width >= width*width && direction === 'down' ||
    roomba.includes(nextIndex)
  ) return

  roomba.unshift(nextIndex)
  $squares.eq(roomba[0]).addClass('roomba')

  if($squares.eq(roomba[0]).hasClass('dirt')) {
    generateDirt()
  } else {
    $squares.eq(roomba.pop()).removeClass('roomba')
  }


  // *** get starting coordinated and save in the 'path' array ***



  for(let i = 1; i < 0; i++) {
    let road = prompt('Enter hoover direction (N,S,E,W) please')
    break
  }
  move()
}



// *** Assign direction command and covert into a number
// parseInt from string to number --> convert to (x y)



// *** function to dd a command to the hoover road of drive ***



//  Declare direction by handleKeyDown and keyCode for 'direction'

function handleKeyDown(e) {
  switch(e.keyCode) {
    case 87: direction = 'left' // keyCode for W
      break
    case 78: direction = 'up'  // keyCode for N
      break
    case 69: direction = 'right'  // keyCode for E
      break
    case 83: direction = 'down'   // keyCode for S
      break
  }
}


// Create a command on submit hoover start moving and generate the dirt

function start() {
  move()
  generateDirt()
}
(start)


// creating a room dimension 5X5

function init() {
  $grid = $('.grid')

  for(let i = 0; i<width*width; i++) {
    $grid.append($('<div />'))
  }
  $squares = $grid.find('div')

  $(document).on('keydown', handleKeyDown)

}
(init)

// *** on submit retutrn final hoover position and patches cleaned

// *** count cleaned dirt and return sum of them in the output



// *** SOLUTION FOUND WHILE SEARCHING on GOOGLE ***


//These are the only allowed directions the robot can travel in
// const cardinals = ["N", "S", "E", "W"];
// //This stores the sequence of directions the robot is told to travel in
// let commandSequence = [];
//
// //Object that initially stored the command
// const command = {
// 	 direction: "N",
// 	 steps: 1
//  };
//
//  //This function makes sure the robot is not told to travel out of bounds
//  const inBounds = function(position){
// 	 if(position > 100000){
// 		 position = 100000;
// 	 }
// 	 else if(position < -100000) {
// 		 position = -100000;
// 	 }
//
// 	 return position;
//  }
//
//  //this function determines if the robot has already cleaned a certain tile. returns 1 if true, -1 if false
//  const isCovered = function(arr, point) {
// 	arr = JSON.stringify(arr);
// 	point = JSON.stringify(point);
// 	return arr.indexOf(point);
//  }
//
//  //this function adds a command to the sequence of instructions a robot is fed
//  const addCommand = function(comms) {
// 	  const newCommand = Object.create(command);
//
// 	  newCommand.direction = comms[0];
// 	  newCommand.steps = parseInt(comms[1]);
// 	  //makes sure the direction entered and the number of steps taken are valid inputs
// 	  if(cardinals.includes(newCommand.direction) && Number.isInteger(newCommand.steps)) {
// 		commandSequence.push(newCommand);
// 	  }
//  }
//
//  //this function asks the user to input commands
//  const getCommands = function() {
// 	 //this determines how many commands the function will accept
// 	 const limit = document.getElementById("commandLimit").value;
// 	 let more = false;
// 	 let comm;
//
// 	 //if the limit on the number of commands is less than 1, there is no point in asking for the user's input
// 	 if (limit < 1) {
// 		 cleanRoom();
// 	 }
//
// 	 //the loop will continue asking for commands until it reaches the limit
// 	 for(let i = 1; i <= limit; i++) {
// 		comm = prompt("What direction (N,S,E,W) and how many steps?", "");
// 		//splits user input into direction and number of steps
// 		comms = comm.split(" ");
// 		addCommand(comms);
// 		if(i < limit) {
// 			more = confirm("Add another command?");
// 		}
// 		//if the user declines to enter more commands, exits loop
// 		if(more == false) {
// 			break;
// 		}
// 	 }
//
// 	//calls main function
// 	cleanRoom();
//  }
//
//  const cleanRoom = function() {
// 	//gets starting coordinates
// 	 const xStart = parseInt(document.getElementById("x_input").value);
// 	 const yStart = parseInt(document.getElementById("y_input").value);
// 	 let currX = xStart;
// 	 let currY = yStart;
// 	 let command;
// 	 //this array saves all the coordinates the robot has visited
// 	 let coords = [];
//
// 	 //adds starting coordinates to array
// 	 coords.push([currX, currY]);
//
// 	 //continue looping until no instructions left
// 	while(commandSequence.length != 0){
// 		//get next instructions from the queue
// 		command = commandSequence.shift();
// 		let posY = currY;
// 		let posX = currX;
//
// 		//next coordinates are dependent on what direction robot is told to go
// 		switch(command.direction) {
// 			case "N":
// 				//get the destination coordinates
// 				currY = currY + command.steps;
// 				//make sure the destination is not out of bounds
// 				currY = inBounds(currY);
// 				for(let i = posY; i <= currY; i++) {
// 					//determine if robot has already covered a space
// 					let found = isCovered(coords, [posX, i]);
// 					if(found != -1) {
// 						continue;
// 					};
// 					//if it hasnt, push coordinates to array of visited spaces
// 					coords.push([posX, i]);
// 				}
// 				break;
// 			case "S":
// 				currY = currY - command.steps;
// 				currY = inBounds(currY);
// 				for(let i = posY; i >= currY; i--) {
// 					let found = isCovered(coords, [posX, i]);
// 					if(found != -1) {
// 						continue;
// 					};
// 					coords.push([posX, i]);
// 				}
// 				break;
// 			case "E":
// 				currX = currX + command.steps;
// 				currX = inBounds(currX);
// 				for(let i = posX; i <= currX; i++) {
// 					let found = isCovered(coords, [i, posY]);
// 					if(found != -1) {
// 						continue;
// 					};
// 					coords.push([i, posY]);
// 				}
// 				break;
// 			case "W":
// 				currX = currX - command.steps;
// 				currX = inBounds(currX);
// 				for(let i = posX; i >= currX; i--) {
// 					let found = isCovered(coords, [i, posY]);
// 					if(found != -1) {
// 						continue;
// 					};
// 					coords.push([i, posY]);
// 				}
// 				break;
// 		}
// 	 }
//
// 	 //output number of unique spaces visited
// 	 document.querySelector(".result").innerHTML = "=> Cleaned: " + coords.length;
//  } 
