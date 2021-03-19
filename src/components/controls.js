import React, { useContext, memo } from "react"

import { card, controls, range, number, label, control } from "./layout.module.scss"
import { OscillatorContext } from "./index"

const Control = ({ txt, val, setVal, max = 1, min = 0, step = 0.01 }) => (
  <div className={control}>
    <span className={label}>{txt}</span>
    <input type="range" className={range} value={val} onChange={(event) => { setVal(event.target.value) }} min={min} max={max} step={step} />
    <input type="number" className={number} value={val} onChange={(event) => { setVal(event.target.value) }} />
  </div>
)

const Controls = () => {
  const { vars: { gamma, omega0, f0, omega, y0, v0 }, setVars } = useContext(OscillatorContext)
  return (
    <div className={`${card} ${controls}`}>
      <Control txt={["y", <sub>0</sub>]} min={-500} max={500} step={1} val={y0} setVal={(x) => setVars({ y0: x, v0: v0, gamma: gamma, omega0: omega0, f0: f0, omega: omega })} />
      <Control txt={["v", <sub>0</sub>]} min={-100} max={100} step={1} val={v0} setVal={(x) => setVars({ gamma: gamma, omega0: omega0, f0: f0, omega: omega, y0: y0, v0: x })} />
      <Control txt={"γ"} val={gamma} setVal={(x) => setVars({ gamma: x, omega0: omega0, f0: f0, omega: omega, y0: y0, v0: v0 })} />
      <Control txt={["ω", <sub>0</sub>]} val={omega0} setVal={(x) => setVars({ gamma: gamma, omega0: x, f0: f0, omega: omega, y0: y0, v0: v0 })} />
      <Control txt={["F", <sub>0</sub>]} max={10} val={f0} setVal={(x) => setVars({ gamma: gamma, omega0: omega0, f0: x, omega: omega, y0: y0, v0: v0 })} />
      <Control txt={"ω"} val={omega} setVal={(x) => setVars({ gamma: gamma, omega0: omega0, f0: f0, omega: x, y0: y0, v0: v0 })} />
    </div >
  )
}

export default memo(Controls)