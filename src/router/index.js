import React from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import asyncComponent from '../utils/asyncComponent.jsx'

const login = asyncComponent(()=>import("../pages/login/login.jsx"));
const rooms = asyncComponent(()=>import("../pages/rooms/rooms.jsx"));
const favorite = asyncComponent(()=>import("../pages/favorite/favorite.jsx"));
const uploadRoom = asyncComponent(()=>import("../pages/upload/uploadRoom.jsx"));
const myUploads = asyncComponent(()=>import("../pages/upload/myUploads.jsx"));
const profile = asyncComponent(()=>import("../pages/profile/profile.jsx"));
const support = asyncComponent(()=>import("../pages/support/support.jsx"));
const roomDetail = asyncComponent(()=>import("../pages/roomDetail/roomDetail.jsx"));
const admin = asyncComponent(()=>import("../pages/administrator/admin.jsx"));
const adminUserDetail = asyncComponent(()=>import("../pages/administrator/adminUser/adminUserDetail.jsx"));

const RouteConfig =()=>(
	
	<HashRouter>
		<Switch>
			<Route path="/login" component={login} />
			<Route path="/rooms" component={rooms} />
			<Route path="/roomDetail/:roomID" component={roomDetail} />
			<Route path="/favorite" component= {favorite}/>
			<Route path="/uploadRoom" component= {uploadRoom}/>
			<Route path="/myUploads" component= {myUploads}/>
			<Route path="/profile" component= {profile}/>
			<Route path="/support" component= {support}/>
			<Route path="/admin" component= {admin}/>
			<Route path="/adminUserDetail/:accountName" component= {adminUserDetail}/>
			<Redirect exact from='/' to='/admin'/>
			<Route component= {admin}/>
		</Switch>
	</HashRouter>	
)

export default RouteConfig

