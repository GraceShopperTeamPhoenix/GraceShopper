import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div className="container">
      <Navbar />
      <Routes />
      <img src="bottom4.png" className="footer" />
    </div>
  )
}

export default App
