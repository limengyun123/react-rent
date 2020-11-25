import React, { Component } from 'react'
import LoginHead from '../../component/headLogin.jsx'
import {Button, Form, Input,Alert,Radio} from 'antd'
import {Link} from 'react-router-dom'
import './login.scss'
import { API } from '../../api/api.js'


class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            accountName:"",
            actualName: "",
            mobie:"",
            email:"",
            sex: "",
            password: "",
            hasAlert: false,
        };
        this.registerRef = React.createRef();
        
    }

    isExistedUser = async(an)=>{
        let result = await API.findUser(an);
        return result;
    }

    submitRegister(){
        let an = this.registerRef.current.getFieldValue("accountName");
        if(an){
            this.isExistedUser(an).then((result)=>{
                if(result){
                    this.setState({
                        accountName:an,
                        actualName: this.registerRef.current.getFieldValue("actualName"),
                        mobie:this.registerRef.current.getFieldValue("mobie"),
                        email:this.registerRef.current.getFieldValue("email"),
                        sex: this.registerRef.current.getFieldValue("sex"),
                        password: this.registerRef.current.getFieldValue("password"),
                    });
                    console.log(this.state);
                    this.props.history.push('/login/loginIn');
                }
                else{
                    this.setState({
                        hasAlert:true
                    })
                }
            });
        }
        
    }


    hideAlert(){
        this.setState({hasAlert:false});
    }

    componentDidMount(){
        this.registerRef.current.setFieldsValue({"sex":"男"});
    }

    render(){
        return (
            <div>
                <LoginHead destination='/login/register' name='注册'/>
                <div className='login-body'>
                {this.state.hasAlert && <Alert
                    message="该账号已被注册，请换一个"
                    type="error"
                    showIcon
                    closable
                />}
                    <Form name="formRegister"  onClick={()=>{this.hideAlert()}}
                        ref={this.registerRef}
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 19}}
                    >
                        <Form.Item label="账号" name="accountName"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入账号"
                                }
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="姓名" name="actualName">
                             <Input/>
                        </Form.Item>
                        <Form.Item label="电话号码" name="mobie"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入电话号码"
                                }
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="邮箱" name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: '邮箱格式不符合!',
                                },
                            ]}
						>
                            <Input />
                        </Form.Item>
                        <Form.Item label="性别" name="sex">
                            <Radio.Group>
                                <Radio value="男">男</Radio>
                                <Radio value="女">女</Radio>
                            </Radio.Group>
                        </Form.Item>
            
                        <Form.Item label="密码" name="password"
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
                            <Button htmlType="submit" onClick={()=>{this.submitRegister()}}>注册</Button>
                            {/* <Button htmlType="submit" onSubmit={this.check()}>登录</Button> */}
                            <Button><Link to='/login/loginIn'>登录</Link></Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
    
}


export default Register
