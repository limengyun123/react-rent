import React from 'react'
import {Component} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import asyncComponent from '../utils/asyncComponent.jsx'

const profile = asyncComponent(()=>import("../pages/profile/profile.jsx"));

export default class RouteConfig extends Component {
	render(){
		return(
			<HashRouter>
				<Switch>
					<Route path="/profile" component= {profile}/>
					<Redirect exact from='/' to='/profile'/>
					<Route component= {profile}/>
				</Switch>
			</HashRouter>
		)
	}
	
}

