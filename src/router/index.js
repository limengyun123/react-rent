import React from 'react'
import {Component} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import asyncComponent from '../utils/asyncComponent.jsx'

const login = asyncComponent(()=>import("../pages/login/login.jsx"));
const rooms = asyncComponent(()=>import("../pages/rooms/rooms.jsx"));
const favorite = asyncComponent(()=>import("../pages/favorite/favorite.jsx"));
const upload = asyncComponent(()=>import("../pages/upload/upload.jsx"));
const profile = asyncComponent(()=>import("../pages/profile/profile.jsx"));
const support = asyncComponent(()=>import("../pages/support/support.jsx"));

const RouteConfig =()=>(
	
	<HashRouter>
		<Switch>
			<Route path="/login" component={login} />
			<Route path="/rooms" component={rooms} />
			<Route path="/favorite" component= {favorite}/>
			<Route path="/upload" component= {upload}/>
			<Route path="/profile" component= {profile}/>
			<Route path="/support" component= {support}/>
			<Redirect exact from='/' to='/login'/>
			<Route component= {login}/>
		</Switch>
	</HashRouter>	
)

export default RouteConfig

