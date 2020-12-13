import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Button,Result,Descriptions,Badge,Input,Radio } from 'antd'
import { Link } from 'react-router-dom'
import { API } from '../../../api/adminApi';
import {AVATAR_PATH} from '../../../../config/path.js'
import './adminRoomDetail.scss'

const { TextArea } = Input;

class AdminRoomDetail extends Component{
	constructor(props){
		super(props);
		this.state = {
			roomID:"",
            roomImage:"",
            owner: "",
            roomPrice:"",
            roomType:"",
            roomAddress:"",
            roomDescription:"",
            resultValue:false,
			hasLogined: true
		}
	}
	

	goBack=()=>{
		this.props.history.goBack();
	}

	getRoom=async(rID)=>{
        let result = await API.getRoomDetail(parseInt(rID));
        if(result instanceof Object){
            this.setState({
                ...result
            });
        }
        
    }

    onChange = e => {
        // console.log('radio checked', e.target.value);
        this.setState({resultValue:e.target.value});
    };

    handleSubmit(){
        return true;
    }


	componentDidMount(){
        // if(this.props.userInfo && this.props.userInfo.accountName){
            // this.setState({hasLogined:true});
            let roomID = this.props.match.params.roomID;
            this.getRoom(roomID);
		// }
		
	}
	
	render(){
		return(
			
			<div>
				{this.state.hasLogined ?
				<div className="detail-container">
                    <Descriptions title="审核房屋" bordered>
                        <Descriptions.Item label="房主">{this.state.owner}</Descriptions.Item>
                        <Descriptions.Item label="房屋类型">{this.state.roomType}</Descriptions.Item>
                        <Descriptions.Item label="价格">{this.state.roomType}</Descriptions.Item>
                        <Descriptions.Item label="房主姓名">张承恩</Descriptions.Item>
                        <Descriptions.Item label="身份证">220202200002022020</Descriptions.Item>
                        <Descriptions.Item label="是否认证">
                            <Badge status="processing" text="已认证" />
                        </Descriptions.Item>
                        <Descriptions.Item label="房产证编号">{this.state.roomType}</Descriptions.Item>
                        <Descriptions.Item label="房产证图片" span={2}><img src="" alt="暂无图片"></img></Descriptions.Item>
                        <Descriptions.Item label="地址" span={3}>{this.state.roomAddress}</Descriptions.Item>
                        <Descriptions.Item label="图片" span={3}><img src={AVATAR_PATH+this.state.roomImage} alt="暂无图片"></img></Descriptions.Item>
                        <Descriptions.Item label="描述" span={3}>{this.state.roomDescription}</Descriptions.Item>
                        <Descriptions.Item label="操作">
                        <Radio.Group onChange={this.onChange} value={this.state.resultValue}>
                            <Radio value={true}>通过</Radio>
                            <Radio value={false}>拒绝</Radio>
                        </Radio.Group>
                        </Descriptions.Item>
                        <Descriptions.Item label="理由" span={2}>
                            <TextArea placeholder="请在此输入理由"></TextArea>
                        </Descriptions.Item>
                    </Descriptions>
                    <div className="operate">
                        <Button type="primary" onClick={this.handleSubmit()} danger>提交</Button>
                    </div>
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

AdminRoomDetail.propTypes = {
  userInfo: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}


export default connect(mapStateToProps,()=>({}))(AdminRoomDetail)