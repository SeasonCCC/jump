/**
 * [adjust the position of camera ]
 * @param  {[type]} options [{direction: direction, adjustVal: adjustVal, that: this}]
 */
export const adjustCamera =  (options) => {
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
