import React from 'react'
import PropTypes from 'prop-types'
import {Component} from 'react'
import {connect} from 'react-redux'
import { API } from '../../../api/adminApi';
import { Button,Form, Input,Radio,Modal,message } from 'antd'


class EditProfile extends Component{
	constructor(props){
		super(props);
		this.state = {
			id: "",
			actualName: "",
			password: "",
			email: "",
			sex: "",
			mobie: "",
			isPasswordModelVisible: false,
			isOldPasswordRight: "validating"
		}
		this.formRef = React.createRef();
		this.changePasswordRef = React.createRef();
	}
	

	goBack=()=>{
		this.props.history.goBack();
	}

	// initDate=()=>{
    //     let newState = {};
	// 	if(this.props.userInfo && this.props.userInfo.id){
	// 		newState.id = this.props.userInfo.id;
	// 		newState.actualName = this.props.userInfo.actualName;
	// 		newState.password = this.props.userInfo.password;
	// 		newState.email = this.props.userInfo.email;
	// 		newState.sex = this.props.userInfo.sex;
	// 		newState.mobie = this.props.userInfo.mobie;
	// 		this.setState(newState)
	// 	}
	// }

    /**
     * 获取管理员正登录的管理员信息
     * 部分功能为实现，假设admin已登录
     */
	getAdminInfo = async()=>{
        let adminInfo = await API.getAdmin("X200574927312");
        delete adminInfo.authorization;
        if(adminInfo instanceof Object){
            this.setState({...adminInfo});
            this.formRef.current.setFieldsValue({sex:this.state.sex});
        }
	}

	setAdminInfo= async(info)=>{
		// await API.setAdmin(info);
	}


	submitSuccess=()=>{
		this.setAdminInfo({
			id: this.state.id,
			actualName: this.state.actualName,
			password: this.state.password,
			email: this.state.email,
			sex: this.state.sex,
			mobie: this.state.mobie,
        });
        message.warning("抱歉，此功能未实现",1);
	}


	// functions to the form of editing information
	// ******************** start ********************

	handleActualNameChange(obj){
		let value = obj.target.value;
		this.setState({actualName:value})
	}

	handleSexChange(obj){
		let value = obj.target.value;
		this.setState({sex:value})
	}

	handleMobieChange(obj){
		let value = obj.target.value;
		this.setState({mobie:value})
	}


	handleEmailChange(obj){
		let value = obj.target.value;
		this.setState({email:value})
	}
	// ******************** end ********************
	// functions to the form of editing information
	


	// functions to the form of changing password
	// ******************** start ********************
	submitPassword=()=>{
        console.log("limengyun");
		if(this.changePasswordRef.current.getFieldValue("oldPassword")===this.state.password){
            this.setState({isOldPasswordRight:"success"});
            this.setState({password:this.changePasswordRef.current.getFieldValue("newPassword")});
		    this.hidePasswordModel();
			// this.changePasswordRef.current.submit();
		}
		else{

            this.setState({isOldPasswordRight:"error"});
            message.error("密码错误",1);
		}
	}


	showPasswordModel=()=>{
		this.setState({isPasswordModelVisible:true})
	}

	hidePasswordModel=()=>{
		this.setState({isPasswordModelVisible:false,isOldPasswordRight:"success"});
	}
	// ******************** end ********************
	// functions to the form of changing password


	componentDidMount(){
		// this.initDate();
        this.getAdminInfo();
		// this.formRef.current.setFieldValue({sex:this.state.sex});

	}
	
	render(){
		return(
            <div>
                <Form name="editUserInformation"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 6}}
                    onFinish={this.submitSuccess}
                    ref={this.formRef}
                >
                        
                    <Form.Item label="ID">
                        <span className="ant-form-text">{this.state.id}</span>
                    </Form.Item>
                    <Form.Item label="姓名">
                        <Input value={this.state.actualName} onChange={this.handleActualNameChange.bind(this)}/>
                    </Form.Item>
                    <Form.Item label="性别" name="sex">
                        {/* <Radio.Group defaultValue={this.state.sex==='男'?'男':'女'} onChange={this.handleSexChange.bind(this)}> */}
                        <Radio.Group onChange={this.handleSexChange.bind(this)}>
                            <Radio value="男">男</Radio>
                            <Radio value="女">女</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="电话号码">
                        <Input value={this.state.mobie} onChange={this.handleMobieChange.bind(this)}/>
                    </Form.Item>
                    <Form.Item label="邮箱"
                        rules={[
                            {
                                type: 'email',
                                message: '邮箱格式不符合!',
                            },
                        ]}
                    >
                        <Input value ={this.state.email} onChange={this.handleEmailChange.bind(this)}/>
                    </Form.Item>
                    <Form.Item label="密码">
                        <Input.Password readOnly value={this.state.password}/>
                        <span onClick={this.showPasswordModel}>修改密码</span>
                    </Form.Item>
                    
                    <Form.Item 
                        wrapperCol={{ offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">提交</Button>
                        <Button htmlType="button" onClick={()=>(window.location.reload())}>重置</Button>
                    </Form.Item>
                    
                </Form>
                {/* 修改密码模态框 */}
                <Modal
                    title="修改密码"
                    style={{ top: 20 }}
                    visible={this.state.isPasswordModelVisible}
                    closable={false}
                    destroyOnClose
                    footer={null}
                >
                    <Form name="editUserPassword"
                        labelCol={{span:6}}
                        wrapperCol={{span:14}}
                        onFinish={this.submitPassword}
                        ref={this.changePasswordRef}

                    >
                    
                        <Form.Item label="旧密码" name="oldPassword"
                            validateStatus={this.state.isOldPasswordRight}
                            rules={[
                                {
                                required: true,
                                message: '请输入旧密码！',
                                }
                            ]}
                            
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item label="新密码" name="newPassword" hasFeedback
                            rules={[
                                {
                                required: true,
                                message: '请输入新密码！',
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
                            <Input.Password />
                        </Form.Item>
                        <Form.Item label="确认密码" name="confirmPassword" hasFeedback
                            rules={[
                                {
                                required: true,
                                message: '请再次输入新密码！',
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
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item 
                        wrapperCol={{ offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">提交</Button>
                        <Button htmlType="button" onClick={this.hidePasswordModel}>关闭</Button>
                    </Form.Item>
                    </Form>
                
                </Modal>
                {/* </Skeleton> */}

            </div>
				
		)
	}
}

EditProfile.propTypes = {
  userInfo: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}


export default connect(mapStateToProps,()=>({}))(EditProfile)