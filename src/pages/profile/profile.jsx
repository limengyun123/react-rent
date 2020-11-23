import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Switch, Route, Redirect} from 'react-router-dom'
import CheckProfile from './checkProfile.jsx'
import EditProfile from './editProfile.jsx'
import HeadMenu from '../../component/headMenu.jsx'

class Profile extends Component{

    componentDidMount(){
        // console.log(this.props.match.path);
    }

    render(){
        return (
            <div>
                <HeadMenu selected="3"/>
            
                <Switch key='o2'>
                    <Route path={`${this.props.match.path}/checkProfile`} exact component={CheckProfile}/>
                    <Route path={`${this.props.match.path}/editProfile`} component={EditProfile}/>
                    <Redirect exact from='/' to='/profile'/>
                    <Route component= {CheckProfile}/>
                </Switch>
            </div>
        )
    }
}

export default connect()(Profile)