import React, { Component } from 'react'
import {connect} from 'react-redux'
import LoginHead from '../../component/headLogin.jsx'
import {Button, Form, Input,Alert} from 'antd'
import {Link} from 'react-router-dom'
import './login.scss'
import { API } from '../../api/api.js'
import { saveUserInfo } from '../../redux/actions/action.js'


class LoginIn extends Component{
    constructor(props){
        super(props);
        this.state={
            accountName: "",
            password: "",
            hasErrorState: false
        };
        this.formRef = React.createRef();
    }

    validateUser = async(an,psw)=>{
        let result = await API.validateUserInfo(an,psw);
        return result;
    }

    check(){
        let an = this.formRef.current.getFieldValue("accountName");
        let psw = this.formRef.current.getFieldValue("password");
        this.validateUser(an,psw).then((result)=>{
            if(result){
                this.extractAndSaveUser(an);
                this.props.history.push('/rooms');
            }
            else{
                this.setState({hasErrorState:true});
            }
        });
    }

    extractAndSaveUser=async(an)=>{
        let result = await API.getUser(an);
        this.props.saveUserInfo(result);
    }


    hideAlert(){
        this.setState({hasErrorState:false})
    }

    render(){
        return (
            <div>
                <LoginHead destination='/login/loginIn' name='登录'/>
                <div className='login-body'>
                {this.state.hasErrorState && <Alert
                    message="账号或密码错误"
                    type="error"
                    showIcon
                    closable
                />}
                    <Form name="formLoginIn"  onClick={()=>{this.hideAlert()}}
                        ref={this.formRef}
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 19}}
                    >
                        <Form.Item label="账号" name="accountName"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入账号！',
                                }
                            ]}
                        >
                            <Input placeholder="请输入账号"/>
                        </Form.Item>
                        <Form.Item label="密码" name="password"
                            help={<Link to='/login/forgetPassword'>忘记密码？</Link>}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码！',
                                }
                            ]}
                        >
                            <Input.Password placeholder="请输入密码" />
                        </Form.Item>

                        <Form.Item>
                            <Button htmlType="submit" onClick={()=>{this.check()}}>登录</Button>
                            {/* <Button htmlType="submit" onSubmit={this.check()}>登录</Button> */}
                            <Button><Link to='/login/register'>注册</Link></Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {}
  }

const mapDispatchToProps=(dispatch)=>{
    return {
        saveUserInfo: (userInfo)=>dispatch(saveUserInfo(userInfo))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginIn)
