import React, { Component } from 'react'
import LoginHead from '../../component/headLogin.jsx'
import {Button, Form, Input} from 'antd'


class ForgetPassword extends Component{
    render(){
        return (
            <div>
                <LoginHead destination='/login/forgetPassword' name='忘记密码'/>
                <div>
                    <Form>
                        <Form.Item>
                            <Input placeholder="请输入用户名"/>
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="请输入邮箱"/>
                        </Form.Item>
                        <Form.Item>
                            <Input.Password placeholder="请输入密码"/>
                        </Form.Item>
                        <Form.Item>
                            <Input.Password placeholder="请再次输入密码"/>
                        </Form.Item>
                        <Form.Item>
                            <Button>忘记密码</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
    
}


export default ForgetPassword
