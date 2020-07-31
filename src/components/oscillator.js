import React, { useRef, Component, useEffect } from "react"

import { card, oscillator } from "../styles/layout.module.css"

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

const draw = (ctx, t, state, trail) => {
  const gamma = 0.01
  const omega0 = 0.7
  const F0 = 10
  const omega = 0.2

  if (start === undefined) {
    start = t
    ctx.fillRect(0, w / 2, 10, 10)
  }

  ctx.clearRect(0, 0, w, h)

  let y, v, a, t_
  [t_, y, v, a] = state
  const x = w * 0.8
  const dt = 0.1

  v = rk4((t_, v_, y_) => F0 * Math.sin(omega * t_) - 2 * gamma * v_ - omega0 ** 2 * (y_ - 500))(v, y, t - start, dt)
  y = rk4((t_, y_, v_) => v_)(y, v, t - start, dt)

  ctx.fillStyle = "black"
  ctx.fillRect(x, y, 12, 12)

  ctx.fillStyle = "blue"
  trail.forEach(p => {
    p[0] -= 1
    ctx.fillRect(...p, 5, 5)
  })

  if (trail.length > 1000) {
    trail.shift()
  }

  trail.push([x, y])

  t += dt
  window.requestAnimationFrame(_ => draw(ctx, t + dt, [t, y, v, a], trail))
}

const Oscillator = (t) => {
  const el = useRef(null)

  useEffect(() => {
    const ctx = el.current.getContext("2d")
    window.requestAnimationFrame(_ => draw(ctx, 0, [0, 800, 0, 0], []))
  })

  return (
    <div className={`${card} ${oscillator}`}>
      <canvas ref={el} id={"oscillator"} width={w} height={h} />
    </div>
  )
}

export default Oscillator