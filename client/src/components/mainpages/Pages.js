import React from 'react'
import {Routes, Route} from "react-router-dom"
import Products from './products/Products'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import NotFound from './utils/not_found/NotFound'

function Pages() {
  return (  
   <Routes>
     <Route path='/' exact Component={Products}/>
     <Route path='/login' exact Component={Login}/>
     <Route path='/register' exact Component={Register}/>
     <Route path='/cart' exact Component={Cart}/>

     <Route path='*' exact Component={NotFound}/>
   </Routes>
  )
}

export default Pages