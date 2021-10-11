import React from 'react';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom"
const Main : React.FC = () => {
    return (
        <>
        {
            window.location.pathname === "/" && 
        <ul className="nav justify-content-center mb-4 navigation">
                <li className="nav-item">
                    <Link className="nav-link" to="/participant">
                        Participant
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/host">
                        Host
                    </Link>
                </li>
            </ul>
            }
            </>
    )
}


export default Main