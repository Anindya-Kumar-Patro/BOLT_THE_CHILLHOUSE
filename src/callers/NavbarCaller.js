import React,{useState} from 'react'
import Navbar from '../components/Navbar/Navbar'
import {GiHamburgerMenu} from 'react-icons/gi'



const NavbarCaller = () => {
    const [showNav, setShowNav] = useState(true)
    return (
        <>
        <header className="App-header">
            <GiHamburgerMenu onClick={()=>setShowNav(!showNav)}/>
        </header>

        <Navbar show={showNav}/>
        </>
    )
}

export default NavbarCaller
