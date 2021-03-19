import React, { useState, createContext } from "react"

import Layout from "./_layout"
import Oscillator from "./_oscillator"
import Controls from "./_controls"

const OscillatorContext = createContext()

const Index = () => {
  const [vars, setVars] = useState({
    y0: -300, v0: 0, t: 0, gamma: 0.1, omega0: 0.1, f0: 0.1, omega: 0.1
  })

  return (
    <OscillatorContext.Provider value={{ vars, setVars }}>
      <Layout>
        <Oscillator />
        <Controls />
      </Layout>
    </OscillatorContext.Provider>
  )
}

export { OscillatorContext }
export default Index
