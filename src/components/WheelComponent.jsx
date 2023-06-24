import React, { useEffect, useState } from 'react'

const WheelComponent = ({
  segments,
  segColors,
  winningSegment,
  onFinished,
  primaryColor = 'black',
  contrastColor = 'white',
  buttonText = 'Spin',
  isOnlyOnce = true,
  size = 290,
  upDuration = 100,
  downDuration = 1000,
  fontFamily = 'proxima-nova'
}) => {
  let currentSegment = ''
  let isStarted = false
  const [isFinished, setFinished] = useState(false)
  let timerHandle = 0
  const timerDelay = segments && segments.length // Check if segments is defined
  let angleCurrent = 0
  let angleDelta = 0
  let canvasContext = null
  let maxSpeed = Math.PI / (segments && segments.length) // Check if segments is defined
  const upTime = (segments && segments.length) * upDuration // Check if segments is defined
  const downTime = (segments && segments.length) * downDuration // Check if segments is defined
  let spinStart = 0
  let frames = 0
  const centerX = 300
  const centerY = 300

  useEffect(() => {
    wheelInit()
    setTimeout(() => {
      window.scrollTo(0, 1)
    }, 0)
  }, [])

  const wheelInit = () => {
    initCanvas()
    wheelDraw()
  }

  const initCanvas = () => {
    let canvas = document.getElementById('canvas')
    if (navigator.userAgent.indexOf('MSIE') !== -1) {
      canvas = document.createElement('canvas')
      canvas.setAttribute('width', 1000)
      canvas.setAttribute('height', 600)
      canvas.setAttribute('id', 'canvas')
      document.getElementById('wheel').appendChild(canvas)
    }
    canvas.addEventListener('click', spin, false)
    canvasContext = canvas.getContext('2d')
  }

  const spin = () => {
    isStarted = true
    if (timerHandle === 0) {
      spinStart = new Date().getTime()
      maxSpeed = Math.PI / (segments && segments.length) // Check if segments is defined
      frames = 0
      timerHandle = setInterval(onTimerTick, timerDelay)
    }
  }

  const onTimerTick = () => {
    frames++
    draw()
    const duration = new Date().getTime() - spinStart
    let progress = 0
    let finished = false
    if (duration < upTime) {
      progress = duration / upTime
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2)
    } else {
      if (winningSegment) {
        if (currentSegment === winningSegment && frames > (segments && segments.length)) { // Check if segments is defined
          progress = duration / upTime
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2)
          progress = 1
        } else {
          progress = duration / downTime
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2)
        }
      } else {
        progress = duration / downTime
        angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2)
      }
      if (progress >= 1) finished = true
    }

    angleCurrent += angleDelta
    while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2
    if (finished) {
      setFinished(true)
      onFinished(currentSegment)
      clearInterval(timerHandle)
      timerHandle = 0
      angleDelta = 0
    }
  }

  const wheelDraw = () => {
    clear()
    drawWheel()
    drawNeedle()
  }

  const draw = () => {
    clear()
    drawWheel()
    drawNeedle()
  }

  const drawSegment = (key, lastAngle, angle) => {
    const ctx = canvasContext
    const value = segments && segments[key] // Check if segments is defined
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, size, lastAngle, angle, false)
    ctx.lineTo(centerX, centerY)
    ctx.closePath()
    ctx.fillStyle = segColors && segColors[key] // Check if segColors is defined
    ctx.fill()
    ctx.stroke()
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate((lastAngle + angle) / 2)
    ctx.fillStyle = contrastColor
    ctx.font = 'bold 1em ' + fontFamily
    ctx.fillText(value && value.substr(0, 21), size / 2 + 20, 0) // Check if value is defined
    ctx.restore()
  }

  const drawWheel = () => {
    const ctx = canvasContext
    let lastAngle = angleCurrent
    const len = segments && segments.length // Check if segments is defined
    const PI2 = Math.PI * 2
    ctx.lineWidth = 1
    ctx.strokeStyle = contrastColor
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.font = '1em ' + fontFamily
    for (let i = 1; i <= (len || 0); i++) { // Check if len is defined
      const angle = PI2 * (i / (len || 0)) + angleCurrent // Check if len is defined
      drawSegment(i - 1, lastAngle, angle)
      lastAngle = angle
    }

    // Draw a center circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, 30, 0, PI2, false)
    ctx.closePath()
    ctx.fillStyle = primaryColor
    ctx.lineWidth = 5
    ctx.strokeStyle = contrastColor
    ctx.fill()
    ctx.font = 'bold 1em ' + fontFamily
    ctx.fillStyle = contrastColor
    ctx.textAlign = 'center'
    ctx.fillText(buttonText, centerX, centerY + 3)
    ctx.stroke()

    // Draw outer circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, size, 0, PI2, false)
    ctx.closePath()

    ctx.lineWidth = 10
    ctx.strokeStyle = contrastColor
    ctx.stroke()
  }

  const drawNeedle = () => {
    const ctx = canvasContext
    ctx.lineWidth = 1
    ctx.strokeStyle = contrastColor
    ctx.fileStyle = contrastColor
    ctx.beginPath()
    ctx.moveTo(centerX + 20, centerY - 50)
    ctx.lineTo(centerX - 20, centerY - 50)
    ctx.lineTo(centerX, centerY - 70)
    ctx.closePath()
    ctx.fill()
    const change = angleCurrent + Math.PI / 2
    let i =
      (segments && segments.length) -
      Math.floor((change / (Math.PI * 2)) * (segments && segments.length || 0)) -
      1
    if (i < 0) i = i + (segments && segments.length || 0) // Check if segments is defined
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = primaryColor
    ctx.font = 'bold 1.5em ' + fontFamily
    currentSegment = segments && segments[i] // Check if segments is defined
    isStarted && ctx.fillText(currentSegment, centerX + 10, centerY + size + 50)
  }

  const clear = () => {
    const ctx = canvasContext
    ctx.clearRect(0, 0, 500, 800)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-9rem'}} id='wheel'>
      <canvas
        id='canvas'
        width='600'
        height='480'
        style={{
          pointerEvents: isFinished && isOnlyOnce ? 'none' : 'auto', 
          display: 'flex',
          justifyContent: 'center'
        }}
      />
    </div>
  )
}

export default WheelComponent
