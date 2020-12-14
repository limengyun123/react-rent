import React, { Component } from 'react'
import {Button, Form, Input,Alert,Radio,message} from 'antd'
import { API } from '../../../api/adminApi';
import './administrator.scss'

class AdministratorAdd extends Component{
    constructor(props){
        super(props);
        this.state={
            id: "",
            actualName: "",
            password: ".",
            email: "",
            sex: "",
            mobie: "",
            authorization: false,
            hasAlert: false,
        };
        this.addAdminRef = React.createRef();
        
    }

    isExistedAdmin = async(id)=>{
        let result = await API.findAdmin(id);
        return result;
    }

    addAdmin=async()=>{
        // TO DO
    }

    submitRegister=()=>{
        let id = this.addAdminRef.current.getFieldValue("id");
        this.isExistedAdmin(id).then((result)=>{
            if(result){
                this.setState({
                    accountName:id,
                    actualName: this.addAdminRef.current.getFieldValue("actualName"),
                    mobie:this.addAdminRef.current.getFieldValue("mobie"),
                    email:this.addAdminRef.current.getFieldValue("email"),
                    sex: this.addAdminRef.current.getFieldValue("sex"),
                    password: this.addAdminRef.current.getFieldValue("password"),
                });
                console.log(this.state);
                this.addAdmin();
                message.success("添加成功",1).then(()=>{
                    window.location.reload();
                });
            }
            else{
                this.setState({
                    hasAlert:true
                });
            }
        });
        
    }


    hideAlert(){
        this.setState({hasAlert:false});
    }

    componentDidMount(){
        this.addAdminRef.current.setFieldsValue({"sex":"男"});
    }

    render(){
        return (
            <div>
                <div className='add-body'>
                {this.state.hasAlert && <Alert
                    message="该人员已注册为管理员"
                    type="error"
                    showIcon
                    closable
                />}
                    <Form name="formAdminAdd"  onClick={()=>{this.hideAlert()}}
                        ref={this.addAdminRef}
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 19}}
                        onFinish={this.submitRegister}
                    >
                        <Form.Item label="ID" name="id"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入账号"
                                }
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="姓名" name="actualName"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入姓名"
                                }
                            ]}
                        >
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
                                    required: true,
                                    message: "请输入邮箱"
                                },
                                {
                                    type: 'email',
                                    message: '邮箱格式不符合!',
                                }
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

                        <Form.Item className='add-foot'>
                            <Button htmlType="submit" >添加</Button>
                            <Button onClick={()=>(window.location.reload())}>重置</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
    
}


export default AdministratorAdd
