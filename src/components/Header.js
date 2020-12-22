import React from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

function Header() {
    return (
        <div>
            <nav className="indigo darken-4">
                <div className="container">
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo">App</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="sass.html">Profile</a></li>
                            <li><a href="badges.html">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
