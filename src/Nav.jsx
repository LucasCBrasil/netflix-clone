import React, { useState, useEffect } from 'react'
import './Nav.css'
import { useNavigate } from 'react-router-dom'

function Nav() {
const [show, handleShow] = useState(false)
const navigate = useNavigate()

const transitionNavBar = () => {
    if(window.scrollY > 100) {
        handleShow(true)
    } else {
        handleShow(false)
    }
}

useEffect(() => {
    window.addEventListener("scroll", transitionNavBar)
    return () => window.removeEventListener("scroll", transitionNavBar)
}, [])

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <div className="nav__contents">
                <img 
                    onClick={() => navigate("/")}
                    className="nav__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
                    alt='Netflix Logo'
                />
                <img 
                    onClick={() => navigate("/profile")}
                    className='nav__avatar'
                    src='https://upload.wikimedia.org/wikipedia/commons/3/37/Netflix_smiley_face_avatar.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original'
                    alt='Netflix Avatar'
                />
            </div>
        </div>
    )
}

export default Nav