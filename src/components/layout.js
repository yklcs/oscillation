import React from "react"

import { layout } from "../styles/layout.module.css"
import "../styles/styles.global.css"

const Layout = ({ children }) => {
  return (
    <div className={layout}>
      {children}
    </div>
  )
}

export default Layout
