import React,{Component} from 'react'
import { API } from '../../api/api';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Result,Button, Row, Col,Comment,List,Pagination} from 'antd'
import {SafetyCertificateOutlined,WarningOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom';
import './roomDetail.scss'
import {ROOM_IMAGE_PATH, AVATAR_PATH} from '../../../config/path.js'

class RoomDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            roomIDValid: false,
            roomInfo:{},
            ownerAvatar: "",
            ownerAccountName: "",
            ownerQualified: false,
            roomComments:[],
            currentPage: 1,
            pageSize: 20,
            totalItems:0
        }
    }

    goBack=()=>{
		this.props.history.goBack();
	}

    getRoom=async(roomID)=>{
        let result = await API.getRoomDetail(roomID);
        if(result instanceof Object){
            this.setState({
                roomIDValid:true,
                roomInfo: result
            });
            this.getUser(result.owner);
            this.getPartComments(this.state.currentPage);
        }
        
    }

    getUser=async(ac)=>{
        let result = await API.getUser(ac);
        if(result instanceof Object){
            this.setState({
                ownerAvatar: result.avatar,
                ownerAccountName: ac,
                ownerQualified: true,
            })
        }
    }

    getPartComments=async(currentPage)=>{
        let from = (currentPage-1)*this.state.pageSize;
        let to = currentPage*this.state.pageSize;
        let result = await API.getComments(from,to);
        this.setState({roomComments:result.comments,totalItems:result.lenComments});
    }

    pageChange=(pageNumber)=>{
        this.setState({currentPage:pageNumber});
        this.getPartComments(pageNumber);
    }


    componentDidMount(){
        let roomID = this.props.match.params.roomID;
        this.getRoom(parseInt(roomID));
    }

    render(){
        return (
            <div>
                {this.state.roomIDValid?
                <div>
                    <div className='room-detail-head'>
                        <Button onClick={this.goBack} >返回</Button>
                    </div>
                    <div className='room-detail-body'>         
                        <Row className="room-detail-info">
                            <Col span={8} className="info-image">
                                <p>{this.state.roomInfo.roomAddress}</p>
                                <img src={ROOM_IMAGE_PATH+this.state.roomInfo.roomImage} alt='暂无图片'></img>
                            </Col>
                            <Col span={10} className="info-description">
                                <h2>房屋价格：{this.state.roomInfo.roomPrice}元/月</h2>
                                <p>房屋类型：{this.state.roomInfo.roomType}</p>
                                <p>地址：{this.state.roomInfo.roomAddress}</p>
                                <p>详细描述：{this.state.roomInfo.roomDescription}</p>
                            </Col>
                            <Col span={4} className="info-owner">
                                <p>房东信息</p>
                                <img src={AVATAR_PATH+this.state.ownerAvatar} alt='暂无图片'></img>
                                <h3>{this.state.ownerAccountName}</h3>
                                <div>
                                    {this.state.ownerQualified?
                                    <div><SafetyCertificateOutlined style={{color:"#33CC33"}}/>&nbsp;已认证</div>
                                    :
                                    <div><WarningOutlined style={{color:"#FF9900"}}/>&nbsp;未认证</div>
                                }
                                </div>
                            </Col>
                        </Row>
                        <div className='comments'>
                            {/* <h1>评论</h1> */}
                            <List
                                className="comment-list"
                                header={`${this.state.totalItems} 条回复`}
                                itemLayout="horizontal"
                                dataSource={this.state.roomComments}
                                renderItem={item => (
                                <li>
                                    <Comment
                                    // actions={item.actions}
                                    author={item.cmtAuthor}
                                    avatar={AVATAR_PATH+item.cmtAvatar}
                                    content={item.cmtContent}
                                    datetime={item.cmtTime}
                                    />
                                </li>
                                )}
                            />
                            <Pagination defaultCurrent={1} className='comments-pagination' hideOnSinglePage
                                current={this.state.currentPage} 
                                total={this.state.totalItems} 
                                pageSize={this.state.pageSize}
                                showTotal={total => `总共 ${total} 条数据`}
                                onChange={this.pageChange}
                                />
                        </div>
                    </div>
                    
                </div>
                :
                <Result
                    status="500"
                    title="500"
                    subTitle="啊偶，未找到此房源信息"
                    extra={<Link to='/rooms'><Button type="primary">返回主页</Button></Link>}
                />
                }
            </div>
        )
    }
}


RoomDetail.propTypes = {
    userInfo: PropTypes.object.isRequired
  }
  
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps,()=>({}))(RoomDetail)