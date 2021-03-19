import React, { useRef, useEffect, memo, useContext } from "react"

import { OscillatorContext } from "./index"
import { card, oscillator } from "./layout.module.scss"

const w = 1000
const h = 1000
let start

const rk4 = f => (u, v, t, dt) => {
  const k1 = f(t, u, v)
  const k2 = f(t + dt / 2, u + dt * k1 / 2, v + dt * k1 / 2)
  const k3 = f(t + dt / 2, u + dt * k2 / 2, v + dt * k2 / 2)
  const k4 = f(t + dt, u + dt * k3, v + dt * k3)

  return u + 1 / 6 * dt * (k1 + 2 * k2 + 2 * k3 + k4)
}

const draw = (ctx, t, vars, state, trail) => {
  let gamma, omega0, f0, omega
  [gamma, omega0, f0, omega] = vars

  if (start === undefined) {
    start = t
    ctx.fillRect(0, w / 2, 10, 10)
  }

  ctx.clearRect(0, 0, w, h)

  ctx.strokeStyle = "gray"
  ctx.lineWidth = "1"

  ctx.beginPath()
  ctx.moveTo(0, 500)
  ctx.lineTo(1000, 500)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(800, 0)
  ctx.lineTo(800, 1000)
  ctx.stroke()

  let y, v, t_
  [t_, y, v] = state
  const x = w * 0.8
  const dt = 0.1

  v = rk4((t_, v_, y_) => f0 * Math.sin(omega * t_) - 2 * gamma * v_ - omega0 ** 2 * (y_ - h / 2))(v, y, t - start, dt)
  y = rk4((t_, y_, v_) => v_)(y, v, t - start, dt)

  ctx.fillRect(x - 6, y - 6, 12, 12)

  trail.push([x, y])

  ctx.strokeStyle = "blue"
  ctx.lineWidth = "3"

  ctx.beginPath()

  for (let i = 0; i < trail.length - 4; i += 3) {
    trail[i][0] -= 1
    ctx.moveTo(trail[i][0], trail[i][1])
    ctx.lineTo(trail[i + 3][0], trail[i + 3][1])
  }

  ctx.stroke()

  if (trail.length > 800) {
    trail.shift()
    trail.shift()
    trail.shift()
  }

  t += dt
  window.requestAnimationFrame(_ => draw(ctx, t + dt, vars, [t, y, v], trail))
}

const Oscillator = (t) => {
  const el = useRef(null)
  const { vars: { gamma, omega0, f0, omega, y0, v0 } } = useContext(OscillatorContext)

  useEffect(() => {
    const ctx = el.current.getContext("2d")
    ctx.fillStyle = "black"

    const y0num = parseFloat(y0)
    const v0num = parseFloat(v0)
    window.requestAnimationFrame(_ => draw(ctx, 0, [gamma, omega0, f0, omega], [0, y0num + 500, v0num], []))
  })

  return (
    <div className={`${card} ${oscillator}`}>
      <canvas ref={el} id={"oscillator"} width={w} height={h} />
    </div>
  )
}

export default memo(Oscillator)
