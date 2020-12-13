import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Button,Result,Descriptions,Badge } from 'antd'
import { Link } from 'react-router-dom'
import { API } from '../../../api/adminApi';
import {AVATAR_PATH} from '../../../../config/path.js'
import './adminUserDetail.scss'

class AdminUserDetail extends Component{
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
			hasLogined: true,
		}
	}
	

	goBack=()=>{
		this.props.history.goBack();
	}

	getUser=async(ac)=>{
        let result = await API.getUserDetail(ac);
        if(result instanceof Object){
            this.setState({
                ...result
            });
        }
        
    }

	componentDidMount(){
        // if(this.props.userInfo && this.props.userInfo.accountName){
            // this.setState({hasLogined:true});
            let accountName = this.props.match.params.accountName;
            console.log(accountName);
            this.getUser(accountName);
		// }
		
	}
	
	render(){
		return(
			
			<div>
				{this.state.hasLogined ?
				<div className="detail-container">
                    <Descriptions title="用户信息" bordered>
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
                        <Descriptions.Item label="房屋详情" span={2}>
                            Data disk type: MongoDB
                            <br />
                            Database version: 3.4
                            <br />
                            Package: dds.mongo.mid
                            <br />
                            Storage space: 10 GB
                            <br />
                            Replication factor: 3
                            <br />
                            Region: East China 1<br />
                        </Descriptions.Item>
						<Descriptions.Item label="状态">
                            <Badge status="processing" text="在线" />
                        </Descriptions.Item>
						<Descriptions.Item label="登录次数">203</Descriptions.Item>
                        <Descriptions.Item label="月活跃度">4.8888</Descriptions.Item>
                        <Descriptions.Item label="注册时间">2020-01-22</Descriptions.Item>
						<Descriptions.Item label="认证时间">2020-01-22</Descriptions.Item>
                    </Descriptions>
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
                                <Link to='/rooms'>主页</Link>
								</Button>
							</div>
						}
					/>
				</div>}
			</div>
		)
	}
}

AdminUserDetail.propTypes = {
  userInfo: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}


export default connect(mapStateToProps,()=>({}))(AdminUserDetail)