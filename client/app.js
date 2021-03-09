import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <link rel="shortcut icon" href="icon-1.ico" />
      <div className="header">
        <img
          id="logo-main"
          src="/header3.png"
          width="200"
          alt="Logo Thing main logo"
        />
      </div>
      <Navbar />
      <Routes />
      <img src="bottom4.png" className="footer" />
    </div>
  )
}

export default App
