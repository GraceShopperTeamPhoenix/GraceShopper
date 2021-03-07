import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>

      <main>
        <Routes />
      </main>

      <footer> Our Team is the best </footer>
    </div>
  )
}

export default App
