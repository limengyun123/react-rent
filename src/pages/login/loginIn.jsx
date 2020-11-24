import React, { Component } from 'react'
import LoginHead from '../../component/headLogin.jsx'
import {Button, Form, Input} from 'antd'
import {Link} from 'react-router-dom'


class LoginIn extends Component{
    render(){
        return (
            <div>
                <LoginHead destination='/login/loginIn' name='登录'/>
                <div>
                    <Form>
                        <Form.Item>
                            <Input placeholder="请输入用户名"/>
                        </Form.Item>
                        <Form.Item>
                            <Input.Password placeholder="请输入密码"/>
                            <Link to='/login/forgetPassword'>忘记密码？</Link>
                        </Form.Item>

                        <Form.Item>
                            <Button>登录</Button>
                            <Button><Link to='/login/register'>注册</Link></Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
    
}


export default LoginIn
