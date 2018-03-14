import Game from './game'

const game = new Game()
game.init()

const canvas = document.querySelector('#jump')
canvas.append(game.renderer.domElement)

canvas.addEventListener('mousedown', function(){
  game._handelMouseDown()
})

canvas.addEventListener('mouseup', function(){
  game._handelMouseUp()
})

// document.onkeyup = (event) => {
//   var e = event || window.event
//   var keyCode = e.keyCode || e.which
//   switch (keyCode) {
//     case 38:
//       game._createCube()
//   }
// }
