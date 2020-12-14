import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {saveUserInfo} from '../../redux/actions/action.js'
import './profile.scss'
import { Button,Col,Result, Row,Menu,Descriptions } from 'antd'
import { Link } from 'react-router-dom'
import {AVATAR_PATH} from '../../../config/path.js'

class CheckProfile extends Component{
	constructor(props){
		super(props);
		this.state = {
			accountName: "",
			actualName: "",
			password: "*********",
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
			// newState.password = this.props.userInfo.password;
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


	componentDidMount(){
		if(this.props.userInfo && this.props.userInfo.accountName){
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
							<Descriptions title="您的个人信息" bordered>
								<Descriptions.Item label="账户名">{this.state.accountName}</Descriptions.Item>
								<Descriptions.Item label="密码">{this.state.password}</Descriptions.Item>
								<Descriptions.Item label="头像"><img src={AVATAR_PATH+this.state.avatar} alt="暂无图片"></img></Descriptions.Item>
								<Descriptions.Item label="姓名">{this.state.actualName}</Descriptions.Item>
								<Descriptions.Item label="性别">{this.state.sex}</Descriptions.Item>
								<Descriptions.Item label="年龄">20</Descriptions.Item>
								<Descriptions.Item label="电话号码">{this.state.mobie}</Descriptions.Item>
								<Descriptions.Item label="邮箱">{this.state.email}</Descriptions.Item>
								<Descriptions.Item label="身份证">{this.state.IDNumber}</Descriptions.Item>
								<Descriptions.Item label="拥有房数">2</Descriptions.Item>
								<Descriptions.Item label="房屋详情" span={2}><Link to='/myUploads'>请查看发布界面</Link></Descriptions.Item>
							</Descriptions>
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
								<Button type="primary">
									<Link to='/login/loginIn'>去登录</Link>
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