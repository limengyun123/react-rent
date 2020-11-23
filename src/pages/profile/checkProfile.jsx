import React from 'react'
import PropTypes from 'prop-types'
import {Component} from 'react'
import {connect} from 'react-redux'
import {API} from '../../api/api'
import {saveUserInfo} from '../../redux/actions/action.js'
import './profile.scss'
import { Button,Col,Result, Row,Menu } from 'antd'
import { Link } from 'react-router-dom'

class CheckProfile extends Component{
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
			avatar: "default.jpg",
			hasLogined: false,
			alertText: "请输入正确格式"
		}
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
			newState.email = this.props.userInfo.email;
			newState.sex = this.props.userInfo.sex;
			newState.mobie = this.props.userInfo.mobie;
			newState.avatar = this.props.userInfo.avatar;
			newState.hasLogined = true;

			let IDNumber = this.props.userInfo.IDNumber.split('');
			let numLength = IDNumber.length;
			if(numLength>0){
				for(let i=6;i<numLength-4;i++){
					IDNumber[i]='*';
				}
			}
			newState.IDNumber = IDNumber.join('');
			this.setState(newState)
		}
	}

	getUserInfo = async()=>{
		let userInfo = await API.getUser();
		this.props.saveUserInfo(userInfo);
		this.initDate();
	}

	testToOtherPage(){
		alert("已跳转！")
	}

	testChangeLogState(){
		this.setState({hasLogined : !this.state.hasLogined})
	}
	
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
							<Menu mode="inline" defaultSelectedKeys='1'>
								<Menu.Item key="1">个人信息</Menu.Item>
								<Menu.Item key="2"><Link to='/profile/editProfile' replace key='l2'>修改信息</Link></Menu.Item>
							</Menu>
							
						</Col>
						<Col span={21} className='profile-container'>
							<div className='profile-information'>
								<img src="public/img/default.jpg" alt="暂无图片"></img>
								<div className='static-information'>
									<label>账号：</label>
									<span>{this.state.accountName}</span>
								</div>
								<div className='static-information'>
									<label>姓名：</label>
									<span>{this.state.actualName}</span>
								</div>
								<div>
									<label>性别：</label>
									<input value={this.state.sex} readOnly={true}/>
								</div>
								<div>
									<label>电话号码：</label>
									<input value={this.state.mobie} readOnly={true}/>
								</div>
								<div>
									<label>身份证：</label>
									<input value={this.state.IDNumber} readOnly={true}/>
								</div>
								<div>
									<label>邮箱：</label>
									<input value={this.state.email} readOnly={true}/>
								</div>
							</div>
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
								<Button type="primary" onClick={()=>this.testToOtherPage()}>
									去登录
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

CheckProfile.propTypes = {
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

export default connect(mapStateToProps,mapDispatchToProps)(CheckProfile)