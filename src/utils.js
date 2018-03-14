/**
 * [adjust the position of camera ]
 * @param  {[type]} options [{direction: direction, adjustVal: adjustVal, that: this}]
 */
export const adjustCamera = (options) => {
  if (options.that.cameraData.adjustData <= options.adjustVal) {
    if (options.direction === 'left') {
      options.that.cameraData.cameraPos = [options.that.cameraData.cameraPos[0] - options.that.cameraData.adjustPer, options.that.cameraData.cameraPos[1], options.that.cameraData.cameraPos[2]]
      options.that.cameraData.cameraLookAt.set(options.that.cameraData.cameraLookAt.x - options.that.cameraData.adjustPer, 0, options.that.cameraData.cameraLookAt.z)
    } else {
      options.that.cameraData.cameraPos = [options.that.cameraData.cameraPos[0], options.that.cameraData.cameraPos[1], options.that.cameraData.cameraPos[2] - options.that.cameraData.adjustPer]
      options.that.cameraData.cameraLookAt.set(options.that.cameraData.cameraLookAt.x, 0, options.that.cameraData.cameraLookAt.z - options.that.cameraData.adjustPer)
    }

    options.that.camera.position.set(...options.that.cameraData.cameraPos)
    options.that.camera.lookAt(options.that.cameraData.cameraLookAt)
    options.that._selfRender()

    options.that.cameraData.adjustData += options.that.cameraData.adjustPer
    requestAnimationFrame(() => {
      adjustCamera({direction: options.direction, adjustVal: options.adjustVal, that: options.that})
    })
  } else {
    options.that.cameraData.adjustData = 0
  }
}

/**
 * [check whether the jumper can stand in the cube or not]
 * @param  {[obj]} jumper [jumper obj]
 * @param  {[obj]} cubes  [cubes obj]
 * @return {[obj]}        [{fallingFlag: false,fallingDirection: ''}]
 */
export const checkCube = (jumper, cubes) => {
  // console.log(jumper, cubes)
  const jumperPoint = {
    x: jumper.position.x,
    z: jumper.position.z
  }

  const cubePoint0 = {
    x: cubes[0].position.x,
    z: cubes[0].position.z
  }

  const cubePoint1 = {
    x: cubes[1].position.x,
    z: cubes[1].position.z
  }

  let distanceS, distanceL, disatnceC

  if (jumper.direction == 'left') {
    distanceS = Math.abs(jumperPoint.x - cubePoint0.x)
    distanceL = Math.abs(jumperPoint.x - cubePoint1.x)
    disatnceC = Math.abs(cubePoint0.x - cubePoint1.x)
  } else {
    distanceS = Math.abs(jumperPoint.z - cubePoint0.z)
    distanceL = Math.abs(jumperPoint.z - cubePoint1.z)
    disatnceC = Math.abs(cubePoint0.z - cubePoint1.z)
  }

  const allowDistance = 3 // cube width + jumper width
  let returnDefault = {
    fallingFlag: false,
    fallingDirection: ''
  }
  if (distanceS < allowDistance) {
    if (distanceS > 2.5 && distanceS < 3) {
      return Object.assign(returnDefault, {fallingFlag: true, fallingDirection: `top`})
    } else {
      return Object.assign(returnDefault, {fallingFlag: false, fallingDirection: '', createCube: false})
    }
  } else if (distanceL < allowDistance) {
    if (distanceL > 2.5 && distanceL < 3) {
      if (distanceS > disatnceC) {
        return Object.assign(returnDefault, {fallingFlag: true, fallingDirection: `top`})
      } else {
        return Object.assign(returnDefault, {fallingFlag: true, fallingDirection: `bottom`})
      }
    } else {
      return Object.assign(returnDefault, {fallingFlag: false, fallingDirection: '', createCube: true})
    }
  } else {
    return Object.assign(returnDefault, {fallingFlag: true, fallingDirection: ''})
  }
}

/**
 * [jumper falling animation]
 * @param  {[string]} direction [falling direction]
 * @return {[type]}           [description]
 */
export const jumperFalling = (jumper, direction, fallRate) => {
  if (jumper.direction == 'left') {
    (direction == 'top') ? jumper.rotateZ(-Math.PI / 2) : jumper.rotateZ(Math.PI / 2)
  } else {
    (direction == 'top') ? jumper.rotateX(-Math.PI / 2) : jumper.rotateX(Math.PI / 2)
  }
}
