import React, { useState } from "react"

import Layout from "../components/layout"
import Oscillator from "../components/oscillator"
import Controls from "../components/controls"


const Index = () => {
  const [t, setT] = useState(0)

  return (
    <Layout>
      <Oscillator t={t} />
      <Controls t={t} setT={setT} />
    </Layout>
  )
}

export default Index
