import React from 'react'
import PropTypes from 'prop-types'
import {Component} from 'react'
import {connect} from 'react-redux'
import {API} from '../../api/api'
import {saveUserInfo} from '../../redux/actions/action.js'
import './profile.scss'
import { Button,Col,Result, Row,Menu,Form, Input,Radio,Modal } from 'antd'
import { Link } from 'react-router-dom'
import {AVATAR_PATH} from '../../../config/path.js'


class EditProfile extends Component{
	constructor(props){
		super(props);
		this.state = {
			accountName: "",
			actualName: "",
			password: "",
			IDNumber: "",
			email: "",
			sex: "",
			mobie: "",
			avatar: "",
			hasLogined: false,
			isPasswordModelVisible: false,
			isOldPasswordRight: "validating"
		}
		this.changePasswordRef = React.createRef();
		this.uploadAvatarRef = React.createRef();
	}
	

	goBack=()=>{
		this.props.history.goBack();
	}

	initDate=()=>{
		let newState = {};
		if(this.props.userInfo && this.props.userInfo.accountName){
			newState.accountName = this.props.userInfo.accountName;
			newState.actualName = this.props.userInfo.actualName;
			newState.password = this.props.userInfo.password;
			newState.IDNumber = this.props.userInfo.IDNumber;
			newState.email = this.props.userInfo.email;
			newState.sex = this.props.userInfo.sex;
			newState.mobie = this.props.userInfo.mobie;
			newState.avatar = this.props.userInfo.avatar;
			newState.hasLogined = true;
			this.setState(newState)
		}
	}

	getUserInfo = async()=>{
		let userInfo = await API.getUser();
		this.props.saveUserInfo(userInfo);
		this.initDate();
	}

	setUserInfo= async(info)=>{
		await API.setUser(info);
	}


	submitSuccess=()=>{
		this.setUserInfo({
			accountName: this.state.accountName,
			actualName: this.state.actualName,
			password: this.state.password,
			IDNumber: this.state.IDNumber,
			email: this.state.email,
			sex: this.state.sex,
			mobie: this.state.mobie,
			avatar: this.state.avatar,
		});
	}


	// functions to the form of editing information
	// ******************** start ********************
	resetForm(){
		window.location.reload();
	}


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

	handleIDNumberChange(obj){
		let value = obj.target.value;
		this.setState({IDNumber:value})
	}

	handleEmailChange(obj){
		let value = obj.target.value;
		this.setState({email:value})
	}
	// ******************** end ********************
	// functions to the form of editing information
	


	// functions to the form of changing avatar
	// ******************** start ********************
	clickUploadAvatar(){
		this.uploadAvatarRef.current.click();
	}

	showImg(obj){
		var file = obj.target.files[0];
		var re = new FileReader();
		
		re.onloadend = ()=>{
			this.setState({avatar: re.result});
		}
		re.readAsDataURL(file);
	}
	// ******************** end ********************
	// functions to the form of changing avatar


	
	// functions to the form of changing password
	// ******************** start ********************
	submitPassword(){
		if(this.changePasswordRef.current.getFieldValue("oldPassword")===this.state.password){
			this.setState({isOldPasswordRight:"success"});
			this.changePasswordRef.current.submit();
		}
		else{
			this.setState({isOldPasswordRight:"error"});
		}
	}

	editPasswordOK=()=>{
		this.setState({password:this.changePasswordRef.current.getFieldValue("newPassword")});
		this.hidePasswordModel();
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
		if(!this.props.userInfo.accountName){
			this.getUserInfo();
		}
		else{
			this.initDate();
		}
	}
	
	render(){
		return(
			
			<div>
				{this.state.hasLogined ?
				<div>
					{/* <div className='page-title'>基本信息</div> */}
					<Row>
						<Col span={3}>
							<Menu mode="inline" defaultSelectedKeys='2'>
								<Menu.Item key="1"><Link to='/profile/checkProfile' replace key='l1'>个人信息</Link></Menu.Item>
								<Menu.Item key="2">修改信息</Menu.Item>
							</Menu>
							
						</Col>
						<Col span={21} className='profile-container'>
						{/* <Skeleton active> */}
						<Form name="editUserInformation"
							// scrollToFirstError={true}
							labelCol={{ span: 8 }}
        					wrapperCol={{ span: 6}}
							onFinish={this.submitSuccess()}
						>
							<Form.Item label="头像">
								<input hidden type="file" onChange={this.showImg.bind(this)} ref={this.uploadAvatarRef}/>
								<img src={AVATAR_PATH+(this.state.avatar==="default.jpg"?"default.jpg":this.state.avatar)} alt="暂无图片"></img>
								<Button className="default" onClick={()=>this.clickUploadAvatar()}>上传头像</Button>
							</Form.Item>	
							<Form.Item label="账号">
								<span className="ant-form-text">{this.state.accountName}</span>
							</Form.Item>
							<Form.Item label="姓名">
								<Input value={this.state.actualName} onChange={this.handleActualNameChange.bind(this)}/>
								{/* <Input value={this.state.actualName} onChange={(e)=>this.handleActualNameChange(e)}/> */}
							</Form.Item>
							<Form.Item label="性别" >
								<Radio.Group defaultValue={this.state.sex==='男'?'男':'女'} onChange={this.handleSexChange.bind(this)}>
									<Radio value="男">男</Radio>
									<Radio value="女">女</Radio>
								</Radio.Group>
							</Form.Item>
							<Form.Item label="电话号码" name="mobie" initialValue={this.state.mobie}>
								<Input onChange={this.handleMobieChange.bind(this)}/>
							</Form.Item>
							<Form.Item label="身份证" name="IDNumber"
								initialValue = {this.state.IDNumber}
								rules={[
									{
										validator: (_, value) =>{
											if(value.length===0 || value.length===18){
												return Promise.resolve();
											}
											return Promise.reject("身份证格式不符合");
										}
									},
								]}
							>
								<Input onChange={this.handleIDNumberChange.bind(this)}/>
							</Form.Item>
							<Form.Item label="邮箱" name="email"
								initialValue = {this.state.email}
								rules={[
									{
										type: 'email',
										message: '邮箱格式不符合!',
									},
								]}
							>
								<Input onChange={this.handleEmailChange.bind(this)}/>
							</Form.Item>
							<Form.Item label="密码">
								<Input.Password readOnly value={this.state.password}/>
								<span onClick={this.showPasswordModel}>修改密码</span>
							</Form.Item>
							
							<Form.Item 
        						wrapperCol={{ offset: 8, span: 16}}>
								<Button type="primary" htmlType="submit">提交</Button>
								<Button htmlType="button" onClick={()=>{this.resetForm()}}>重置</Button>
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
								onFinish={this.editPasswordOK}
								ref={this.changePasswordRef}

							>
							
								<Form.Item label="旧密码" name="oldPassword"
									// hasFeedback
									validateStatus={this.state.isOldPasswordRight}
									// help="密码输入错误"
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
									// validateTrigger="onBlur"
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
								<Button type="primary" onClick={()=>{this.submitPassword()}}>提交</Button>
								<Button htmlType="button" onClick={this.hidePasswordModel}>关闭</Button>
							</Form.Item>
							</Form>
						
						</Modal>
						{/* </Skeleton> */}
						</Col>
					</Row>
				</div>
				:
				<div>
					<Result
						status="warning"
						title="您未登录，请先登录."
						extra={
							<div>
								<Button type="primary" >
									<Link to='/login/LoginIn'>去登录</Link>
								</Button>
								<Button type="defalut" >
									返回
								</Button>
							</div>
						}
					/>
				</div>}
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

const mapDispatchToProps = (dispatch) => {
  return {
	  saveUserInfo: (userInfo)=>dispatch(saveUserInfo(userInfo))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditProfile)