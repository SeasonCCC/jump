import * as THREE from 'three'

class Game {
  constructor () {

  }

  init () {
    this.size = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    this.scene = new THREE.Scene()
    this._setCamera()
    this._setRender()
    this._addLight()
    this._createCube()
    this._createJumper()
    this._axesHelper()
    this.renderer.render(this.scene, this.camera)
  }

  _setCamera () {
    this.camera = new THREE.OrthographicCamera(this.size.width / -80, this.size.width / 80, this.size.height / 80, this.size.height / -80, 0, 20)
    this.camera.position.set(10, 10, 10)
    this.camera.lookAt(this.scene.position)
    this.scene.add(this.camera)
  }

  _setRender () {
    this.renderer = new THREE.WebGLRenderer({antialias: true})
    this.renderer.setSize(this.size.width, this.size.height)
    this.renderer.setClearColor(new THREE.Color(0x292728))
  }

  _addLight () {
    let light = new THREE.SpotLight(0xffffff)
    light.position.set(20, 30, 20)
    this.scene.add(light)
  }

  _createCube () {
    let geometry = new THREE.BoxGeometry(5, 3, 5)
    let matarial = new THREE.MeshLambertMaterial({color: 'red'})
    let cube = new THREE.Mesh(geometry, matarial)
    cube.position.set(0, 0, 10)
    this.scene.add(cube)
  }

  _createJumper () {
    let geometry = new THREE.BoxGeometry(1, 2, 1)
    let matarial = new THREE.MeshLambertMaterial({color: 'green'})
    let jumper = new THREE.Mesh(geometry, matarial)
    jumper.position.set(0, 2, 10)
    this.scene.add(jumper)
  }

  _axesHelper () {
    const axes = new THREE.AxesHelper(150)
    this.scene.add(axes)
  }
}

export default Game
