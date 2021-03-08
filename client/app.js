import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <img src="bottom4.png" className="footer" />
    </div>
  )
}

export default App
