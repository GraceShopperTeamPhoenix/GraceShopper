import React from 'react'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export default function Home() {
  return (
    <div>
      <div className="pageHeader">
        <img src="/home.png" className="pageHeader" />
      </div>

      <div className="flexbox-container">
        <div className="minor-Icon">
          <Link to={{pathname: '/products', filter: 'Cacti'}}>
            <img src="cacti2.png" className="Icon" />
          </Link>
        </div>
        <div className="minor-Icon">
          <Link to={{pathname: '/products', filter: 'Aloe'}}>
            <img src="aloeLink.jpg" className="Icon" />
          </Link>
        </div>

        <div className="minor-Icon">
          <Link to={{pathname: '/products', filter: 'Succulents'}}>
            <img src="succulentLink.png" className="Icon" />
          </Link>
        </div>
      </div>
    </div>
  )
}
