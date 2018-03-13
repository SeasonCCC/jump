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
 * @param  {[type]} jumper [jumper obj]
 * @param  {[type]} cubes  [cubes obj]
 * @return {[type]}        [description]
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

  let distanceS, distanceL

  if (jumper.direction == 'left') {
    distanceS = Math.abs(jumperPoint.x - cubePoint0.x)
    distanceL = Math.abs(jumperPoint.x - cubePoint1.x)
  } else {
    distanceS = Math.abs(jumperPoint.z - cubePoint0.z)
    distanceL = Math.abs(jumperPoint.z - cubePoint1.z)
  }

  const allowDistance = 3 // cube width + jumper width

  if (distanceS < allowDistance) {
    return true
  } else if (distanceL < allowDistance) {
    return true
  } else {
    return false
  }
}
