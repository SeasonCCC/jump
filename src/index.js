import Game from './game'

const game = new Game()
game.init()

const canvas = document.querySelector('#jump')
canvas.append(game.renderer.domElement)