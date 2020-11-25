import React,{Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import LoginIn from './loginIn.jsx'
import Register from './register.jsx'
import ForgetPassword from './forgetPassword.jsx'

class Login extends Component{
    render(){
        return (
            <div>
                <Switch key='o2'>
                    <Route path={`${this.props.match.path}/loginIn`} exact component={LoginIn}/>
                    <Route path={`${this.props.match.path}/register`} exact component={Register}/>
                    <Route path={`${this.props.match.path}/forgetPassword`} exact component={ForgetPassword}/>
                    <Redirect exact from='/' to='/LoginIn'/>
                    <Route component= {LoginIn}/>
                </Switch>
            </div>
        )
    }
}

export default Login