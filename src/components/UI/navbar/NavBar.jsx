import React, { useContext } from 'react'
import {Link} from "react-router-dom"
import { AuthContext } from '../../../context/context'
import MyButton from '../button/mybutton'


const NavBar = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext)
  const logout = () => {
    setIsAuth(false)
    localStorage.removeItem('auth')
  }
  return (
    <div className='navbar'>
        <MyButton onClick={logout}>Exit</MyButton>
        <div>
            <Link className='navbar__links' to='/about'>About Us</Link>
            <Link className='navbar__links' to='/posts'>Posts</Link>
        </div>
  </div>
  )
}

export default NavBar