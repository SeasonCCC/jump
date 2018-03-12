import * as THREE from 'three'
import {adjustCamera} from './utils'

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

    this.jumperData = {
      direction: null,
      flag: false,
      speed: 0,
      speedY: 0
    }
  }

  init () {
    this.scene = new THREE.Scene()
    this._setCamera()
    this._setRender()
    this._addLight()

    // this._createPlane()

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
    // this.renderer.shadowMapEnabled = true
  }

  _addLight () {
    const light = new THREE.SpotLight(0xffffff)
    light.position.set(20, 20, 20)
    // light.castShadow = true
    this.scene.add(light)
  }

  _createPlane () {
    let geometry = new THREE.PlaneGeometry(60, 60)
    let matarial = new THREE.MeshLambertMaterial({color: 0xffffff})
    let plane = new THREE.Mesh(geometry, matarial)
    // plane.receiveShadow = true
    plane.rotation.x = -Math.PI / 2
    plane.position.set(0, -3, 0)
    this.scene.add(plane)
  }

  // create jumper
  _createJumper () {
    let geometry = new THREE.BoxGeometry(1, 3, 1)
    geometry.translate(0, 1.5, 0)
    let matarial = new THREE.MeshLambertMaterial({color: 'green'})
    this.jumper = new THREE.Mesh(geometry, matarial)
    // this.jumper.translate(0, 1, 0)
    this.jumper.position.set(0, 1.5, 5)
    this.scene.add(this.jumper)
    console.log(this.jumper)
  }

  _handelMouseDown () {
    if (!this.jumperData.flag) {
      this.jumperData.speed += 0.004
      this.jumperData.speedY += 0.008
      this.jumper.scale.y -= 0.01
      this._selfRender()
      requestAnimationFrame(() => {
        this._handelMouseDown()
      })
    }
  }

  _handelMouseUp () {
    this.jumperData.flag = true
    if (this.jumper.direction === 'left') {
      this.jumper.position.x -= this.jumperData.speed
    } else {
      this.jumper.position.z -= this.jumperData.speed
    }

    this.jumper.position.y += this.jumperData.speedY
    if (this.jumper.scale.y < 1) {
      this.jumper.scale.y += 0.02
    }
    this.jumperData.speedY -= 0.01
    this._selfRender()
    requestAnimationFrame(() => {
      this._handelMouseUp()
    })
  }

  // randomly create cube
  _createCube () {
    let geometry = new THREE.BoxGeometry(5, 3, 5)
    let matarial = new THREE.MeshLambertMaterial({color: 'red'})
    let cube = new THREE.Mesh(geometry, matarial)
    // cube.castShadow = true

    if (this.cubes.length > 0) {
      let random = Math.random()
      let direction = (random > 0.5) ? 'left' : 'right'
      this.jumper.direction = direction

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
      adjustCamera({direction: direction, adjustVal: adjustVal, that: this})
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

  _selfRender () {
    this.renderer.render(this.scene, this.camera)
  }
}

export default Game
