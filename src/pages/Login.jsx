import React, { useContext } from 'react'
import MyButton from '../components/UI/button/mybutton'
import MyInput from '../components/UI/input/MyInput'
import { AuthContext } from '../context/context'

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const login = event => {
        event.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h1 style={{marginTop: 15, marginBottom: 15}}>Login Page</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Введите логин"></MyInput>
                <MyInput type="password" placeholder="Введите пароль"></MyInput>
                <MyButton>Log in</MyButton>
            </form>
        </div>
    )
}

export default Login