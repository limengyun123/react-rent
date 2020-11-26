import React, { Component } from 'react'
import LoginHead from '../../component/headLogin.jsx'
import {Button, Form, Input,Alert,message} from 'antd'
import {Link} from 'react-router-dom'
import { API } from '../../api/api.js';

class ForgetPassword extends Component{
    constructor(props){
        super(props);
        this.state = {
            accountName:"",
            email: "",
            password:"",
            hasAlert:false
        };
        this.formRef = React.createRef();
    }

    validateByANandEmail=async(an,email)=>{
        let result = await API.checkAccountandEmail(an,email);
        return result;
    }

    changePassword=async(an,pswd)=>{
        // TO DO
    }
    
    submitForget=()=>{
        let an = this.formRef.current.getFieldValue("accountName");
        let email = this.formRef.current.getFieldValue("email");
        let pswd = this.formRef.current.getFieldValue("ensureNewPassword");
        
        this.validateByANandEmail(an,email).then((result)=>{
            if(result){
                console.log("success");
                this.changePassword(an,pswd);
                message.success("操作成功",1).then(()=>{
                    this.props.history.push('/login/loginIn');
                });
            }
            else{
                console.log("fail");
                this.setState({
                    hasAlert:true
                })
            }
        })
        
    }

    hideAlert(){
        this.setState({hasAlert:false});
    }

    render(){
        return (
            <div>
                <LoginHead destination='/login/forgetPassword' name='忘记密码'/>
                <div className='login-body'>
                    {this.state.hasAlert && <Alert
                        message="账号或邮箱错误"
                        type="error"
                        showIcon
                        closable
                    />}
                    <Form ref={this.formRef}  onClick={()=>{this.hideAlert()}}
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 19}}
                        onFinish={this.submitForget}
                    >
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
                        <Form.Item label="邮箱" name="email"
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
                        <Form.Item label="新密码" name="newPassword"
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

                        <Form.Item label="确认密码" name="ensureNewPassword"
                            rules={[
                                {
                                    required: true,
                                    message: '请再次输入密码！',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
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
                            <Button htmlType='submit' >忘记密码</Button>
                            {/* <Button htmlType='submit' onClick={()=>{this.submitForget()}} >忘记密码</Button> */}
                            <Button><Link to='/login/loginIn'>登录</Link></Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
    
}


export default ForgetPassword
