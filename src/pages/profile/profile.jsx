import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Switch, Route, Redirect} from 'react-router-dom'
import CheckProfile from './checkProfile.jsx'
import EditProfile from './editProfile.jsx'

class Profile extends Component{

    componentDidMount(){
        console.log(this.props.match.path);
    }

    render(){
        return (
            <Switch key='o2'>
                <Route path={`${this.props.match.path}/checkProfile`} exact component={CheckProfile}/>
                <Route path={`${this.props.match.path}/editProfile`} component={EditProfile}/>
                <Redirect exact from='/' to='/profile'/>
                <Route component= {CheckProfile}/>
            </Switch>
        )
    }
}

export default connect()(Profile)