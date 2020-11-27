import React from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import asyncComponent from '../utils/asyncComponent.jsx'

const login = asyncComponent(()=>import("../pages/login/login.jsx"));
const rooms = asyncComponent(()=>import("../pages/rooms/rooms.jsx"));
const favorite = asyncComponent(()=>import("../pages/favorite/favorite.jsx"));
const upload = asyncComponent(()=>import("../pages/upload/upload.jsx"));
const profile = asyncComponent(()=>import("../pages/profile/profile.jsx"));
const support = asyncComponent(()=>import("../pages/support/support.jsx"));
const roomDetail = asyncComponent(()=>import("../pages/roomDetail/roomDetail.jsx"));

const RouteConfig =()=>(
	
	<HashRouter>
		<Switch>
			<Route path="/login" component={login} />
			<Route path="/rooms" component={rooms} />
			<Route path="/roomDetail/:roomID" component={roomDetail} />
			<Route path="/favorite" component= {favorite}/>
			<Route path="/upload" component= {upload}/>
			<Route path="/profile" component= {profile}/>
			<Route path="/support" component= {support}/>
			<Redirect exact from='/' to='/rooms'/>
			<Route component= {rooms}/>
		</Switch>
	</HashRouter>	
)

export default RouteConfig

