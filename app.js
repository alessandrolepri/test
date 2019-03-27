const width = 5
let $grid
let $squares
const roomba = [24] // starting from bottom left corner (x: 0, y:0)
let direction

const point = ['N', 'S', 'E', 'W'] // drive instruction input

let road = [] // empty array to be populated by 'point' on input



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


// creating a room dimension 5X5

function init() {
  $grid = $('.grid')

  for(let i = 0; i<width*width; i++) {
    $grid.append($('<div />'))
  }
  $squares = $grid.find('div')

  $(document).on('keydown', handleKeyDown)

}

$(init)
$(start)
