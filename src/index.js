import Game from './game'

const game = new Game()

const canvas = document.querySelector('#jump')
canvas.append(game.renderer.domElement)