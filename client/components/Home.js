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
          <img src="cacti2.png" className="Icon" />
        </div>
        <div className="minor-Icon">
          <img src="aloeLink.jpg" className="Icon" />
        </div>
        <div className="minor-Icon">
          <img src="succulentLink.png" className="Icon" />
        </div>
      </div>
    </div>
  )
}
