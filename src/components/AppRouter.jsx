import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SwitchTransition } from 'react-transition-group';
import { AuthContext } from '../context/context';
import { privateRoutes, publicRoutes } from '../router/routes';
import Loader from './UI/Loader/Loader';

const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext)
  console.log(isAuth);

  if (isLoading) {
    return <Loader></Loader>
  }

  return (
    isAuth
      ?
      <SwitchTransition>
        <Routes>
          {privateRoutes.map(route => 
              <Route
                path={route.path}
                element={route.element} 
                exact={route.exact}
                key={route.path}
              />
          )}
          <Route path='*' element={<Navigate to={'/posts'}/>}/>
        </Routes>
      </SwitchTransition>
      :
      <SwitchTransition>
        <Routes>
          {publicRoutes.map(route => 
              <Route
                path={route.path}
                element={route.element}
                exact={route.exact}
                key={route.path}
              />
          )}
          <Route path='*' element={<Navigate to={'/login'}/>}/>
        </Routes>
      </SwitchTransition>
  )
}

export default AppRouter