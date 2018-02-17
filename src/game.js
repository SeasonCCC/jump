import * as THREE from 'three'

class Game {
  constructor () {
    this.size = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    this.cubes = []

    this.cameraData = {
      cameraPos: [10, 10, 10],
      cameraLookAt: new THREE.Vector3(0, 0, 0),
      adjustPer: 0.1,
      adjustData: 0
    }
  }

  init () {
    this.scene = new THREE.Scene()
    this._setCamera()
    this._setRender()
    this._addLight()

    this._createPlane()

    this._createJumper()

    this._createCube()
    this._createCube()

    this._axesHelper()

    this._selfRender()
  }

  _setCamera () {
    this.camera = new THREE.OrthographicCamera(this.size.width / -80, this.size.width / 80, this.size.height / 80, this.size.height / -80, 0, 100)
    this.camera.position.set(...this.cameraData.cameraPos)
    this.camera.lookAt(this.cameraData.cameraLookAt)
    this.scene.add(this.camera)
  }

  _setRender () {
    this.renderer = new THREE.WebGLRenderer({antialias: true})
    this.renderer.setSize(this.size.width, this.size.height)
    this.renderer.setClearColor(new THREE.Color(0xffffff))
    this.renderer.shadowMapEnabled = true
  }

  _addLight () {
    const light = new THREE.SpotLight(0xffffff)
    light.position.set(20, 20, 20)
    light.castShadow = true
    this.scene.add(light)
  }

  _createPlane () {
    let geometry = new THREE.PlaneGeometry(100, 50, 32, 32)
    let matarial = new THREE.MeshLambertMaterial({color: 0x0000ff, side: THREE.DoubleSize})
    let plane = new THREE.Mesh(geometry, matarial)
    plane.receiveShadow = true
    this.scene.add(plane)
  }

  // create jumper
  _createJumper () {
    let geometry = new THREE.BoxGeometry(1, 3, 1)
    let matarial = new THREE.MeshLambertMaterial({color: 'green'})
    let jumper = new THREE.Mesh(geometry, matarial)
    jumper.position.set(0, 2, 10)
    this.scene.add(jumper)
  }

  // randomly create cube
  _createCube () {
    let geometry = new THREE.BoxGeometry(5, 3, 5)
    let matarial = new THREE.MeshLambertMaterial({color: 'red'})
    let cube = new THREE.Mesh(geometry, matarial)
    cube.castShadow = true

    if (this.cubes.length > 0) {
      let random = Math.random()
      let direction = (random > 0.5) ? 'left' : 'right'
      let prevCube = this.cubes[this.cubes.length - 1]
      let adjustVal = parseInt(random * 4 + 6)
      if (direction === 'left') {
        cube.position.set(prevCube.position.x - adjustVal, 0, prevCube.position.z)
      } else {
        cube.position.set(prevCube.position.x, 0, prevCube.position.z - adjustVal)
      }

      this.cubes.push(cube)

      if (this.cubes.length === 3) {
        this.scene.remove(this.cubes.shift())
        this._selfRender()
      }

      this.scene.add(cube)
      this._adjustCamera(direction, adjustVal)
    } else {
      cube.position.set(0, 0, 5)
      this.cubes.push(cube)
      this.scene.add(cube)
    }
  }

  _axesHelper () {
    const axes = new THREE.AxesHelper(150)
    this.scene.add(axes)
  }

  /* ----------- public function ----------- */
  _adjustCamera (direction, adjustVal) {
    if (this.cameraData.adjustData <= adjustVal) {
      if (direction === 'left') {
        this.cameraData.cameraPos = [this.cameraData.cameraPos[0] - this.cameraData.adjustPer, this.cameraData.cameraPos[1], this.cameraData.cameraPos[2]]
        this.cameraData.cameraLookAt.set(this.cameraData.cameraLookAt.x - this.cameraData.adjustPer, 0, this.cameraData.cameraLookAt.z)
      } else {
        this.cameraData.cameraPos = [this.cameraData.cameraPos[0], this.cameraData.cameraPos[1], this.cameraData.cameraPos[2] - this.cameraData.adjustPer]
        this.cameraData.cameraLookAt.set(this.cameraData.cameraLookAt.x, 0, this.cameraData.cameraLookAt.z - this.cameraData.adjustPer)
      }

      this.camera.position.set(...this.cameraData.cameraPos)
      this.camera.lookAt(this.cameraData.cameraLookAt)
      this._selfRender()

      this.cameraData.adjustData += this.cameraData.adjustPer
      requestAnimationFrame(() => {
        this._adjustCamera(direction, adjustVal)
      })
    } else {
      this.cameraData.adjustData = 0
    }
  }

  _selfRender () {
    this.renderer.render(this.scene, this.camera)
  }
}

export default Game
