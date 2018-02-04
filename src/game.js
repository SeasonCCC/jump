import * as THREE from 'three'

class Game { 
  constructor(){
    
  }

  init(){
    this._setRender()
  }

  _setRender(){
    this.size = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    this.scene = new THREE.Scene()
    this.camera = new THREE.OrthographicCamera(this.size.width / -80, this.size.width / 80, this.size.height / 80, this.size.height / -80, 0, 5000)

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(this.size.width, this.size.height)
    this.renderer.setClearColor(new THREE.Color(0xEEEEEE))
    this.renderer.render(this.scene, this.camera)    
  }
}


export default Game