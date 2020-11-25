import React, { Component } from 'react'
import LoginHead from '../../component/headLogin.jsx'
import {Button, Form, Input} from 'antd'
import {Link} from 'react-router-dom'

class ForgetPassword extends Component{
    render(){
        return (
            <div>
                <LoginHead destination='/login/forgetPassword' name='忘记密码'/>
                <div className='login-body'>
                    <Form
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 19}}>
                        <Form.Item label="账号" name="accountName"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入账号！',
                                }
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="邮箱" name="accountName"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入邮箱！',
                                },
                                {
                                    type: "email",
                                    message: '邮箱格式不正确！',
                                }
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="新密码" name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码！',
                                },
                                ()=>({
                                    validator(rule,value){
                                        if (!value || (value.length>=4 & value.length<=20)){
                                            return Promise.resolve();
                                        }
                                        return Promise.reject("请输入4-20个字符");
                                    },
                                }),
                            ]}
                        >
                            <Input.Password  />
                        </Form.Item>

                        <Form.Item label="确认密码" name="ensurePassword"
                            rules={[
                                {
                                    required: true,
                                    message: '请再次输入密码！',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject("两次密码输入不一致");
                                    },
                                }),
                            ]}
                        >
                            <Input.Password  />
                        </Form.Item>
                        <Form.Item>
                            <Button>忘记密码</Button>
                            <Button><Link to='/login/loginIn'>登录</Link></Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
    
}


export default ForgetPassword
