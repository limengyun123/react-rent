import React,{Component} from 'react'
import { API } from '../../api/api';
import {Result,Button, Row, Col,PageHeader,Comment,List,Pagination} from 'antd'
import { Link } from 'react-router-dom';
import './roomDetail.scss'
// import moment from 'moment';

class RoomDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            roomIDValid: false,
            roomInfo:{},
            roomComments:[],
            currentPage: 1,
            pageSize: 2,
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
            })
        }
        
    }

    getPartComments=async(currentPage)=>{
        let from = (currentPage-1)*this.state.pageSize;
        let to = currentPage*this.state.pageSize;
        let result = await API.getComments(from,to);
        console.log(result);
        this.setState({roomComments:result.comments,totalItems:result.lenComments});
    }

    pageChange=(pageNumber)=>{
        this.setState({currentPage:pageNumber});
        this.getPartComments(pageNumber);
    }


    componentDidMount(){
        let roomID = this.props.match.params.roomID;
        this.getRoom(parseInt(roomID));
        this.getPartComments(this.state.currentPage);
    }

    render(){
        return (
            <div>
                {this.state.roomIDValid?
                <div>
                    <div className='room-detail-head'>
                        <PageHeader
                            className="site-page-header"
                            onBack={this.goBack}
                            title="返回主页"
                        />
                    </div>
                    <div className='room-detail-body'>         
                        <Row className="room-detail-info">
                            <Col span={8}>
                                <p>{this.state.roomInfo.roomAddress}</p>
                                <img src={'/public/img/'+this.state.roomInfo.roomImage} alt='暂无图片'></img>
                            </Col>
                            <Col span={10}>
                                <h2>房屋价格：{this.state.roomInfo.roomPrice}元/月</h2>
                                <p>房屋类型：{this.state.roomInfo.roomType}</p>
                                <p>地址：{this.state.roomInfo.roomAddress}</p>
                                <p>详细描述：{this.state.roomInfo.roomDescription}</p>
                            </Col>
                            <Col span={4}>
                                房东信息
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
                                    avatar={'/public/img/'+item.cmtAvatar}
                                    content={item.cmtContent}
                                    datetime={item.cmtTime}
                                    />
                                </li>
                                )}
                            />
                            <Pagination defaultCurrent={1} className='comments-pagination'
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

export default RoomDetail