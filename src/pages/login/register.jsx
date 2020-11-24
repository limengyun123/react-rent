import React, { Component } from 'react'
import LoginHead from '../../component/headLogin.jsx'
import {Button, Form, Input, Radio} from 'antd'
import {Link} from 'react-router-dom'


class Register extends Component {
    render(){
        return (
            <div>
                <LoginHead destination='/login/register' name='注册'/>
                <div>
                    <Form>
                        <Form.Item>
                            <Input placeholder="请输入用户名"/>
                        </Form.Item>
                        <Form.Item label="邮箱"
                            rules={[
                                {
                                    type: 'email',
                                    message: '邮箱格式不符合!',
                                },
                            ]}
						>
                        </Form.Item>
                        <Form.Item label="性别" >
                            <Radio.Group defaultValue='男' >
                                <Radio value="男">男</Radio>
                                <Radio value="女">女</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item>
                            <Input.Password placeholder="请输入密码"/>
                        </Form.Item>
                        <Form.Item>
                            <Input.Password placeholder="请再次输入密码"/>
                        </Form.Item>
                        <Form.Item>
                            <Button><Link to='/login/loginIn'>登录</Link></Button>
                            <Button>注册</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
    
}


export default Register
