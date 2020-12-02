import React,{Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { API } from '../../api/api.js';
import HeadMenu from '../../component/headMenu.jsx'
import {Col,Row,Pagination, Button,Result,Affix } from  'antd'
import {UploadOutlined } from '@ant-design/icons';
import './myUploads.scss'
import {ROOM_IMAGE_PATH} from '../../../config/path.js'

class MyUpload extends Component{
    constructor(props){
        super(props);
        this.state={
            rooms:[],
            currentPage: 1,
            pageSize: 10,
            totalItems:0,
            server505: true
        }
        
    }

    getRooms=async(currentPage)=>{
        let from = (currentPage-1)*this.state.pageSize;
        let to = currentPage*this.state.pageSize;
        let result = await API.getRoomsInfo(from,to);
        if(result instanceof Object){
            this.setState({rooms:result.rooms,totalItems:result.lenRooms,server505:false});
        }
        
    }

    componentDidMount(){
        this.getRooms(this.state.currentPage);
    }

    pageChange=(pageNumber)=>{
        this.setState({currentPage:pageNumber});
        this.getRooms(pageNumber);
    }

    render(){
        return (
            <div>
                <HeadMenu selected='2' />
                { !this.state.server505?
                <div className='myUpload-body'>
                    <div>
                    {
                        this.state.rooms.map(
                            (room, index)=>{ return (
                                <div key={index} className="room-item">
                                    <Row>
                                        <Col span={6}>
                                            <Link to={'/roomDetail/'+room.roomID}>
                                                <img src={ROOM_IMAGE_PATH+room.roomImage} alt='暂无图片'/>
                                            </Link>
                                        </Col>
                                        <Col span={12}>
                                            <p>房屋类型：{room.roomType}</p>
                                            <p>地址：{room.roomAddress}</p>
                                            <p>详细描述：{room.roomDescription}</p>
                                        </Col>
                                        <Col span={6}>
                                            <h2>{room.roomPrice}元/月</h2>
                                        </Col>
                                    </Row>
                                </div>)
                            }
                        )
                    }
                    </div>
                    <Affix offsetTop={120}  className='fixed-button'>
                        <Button><Link to='/uploadRoom'><UploadOutlined /></Link></Button>
                    </Affix>
                    <div className="pagination">
                        <Pagination defaultCurrent={1} hideOnSinglePage
                            current={this.state.currentPage} 
                            total={this.state.totalItems} 
                            pageSize={this.state.pageSize}
                            showTotal={total => `总共 ${total} 条数据`}
                            onChange={this.pageChange}
                            />
                    </div>
                </div>
                :
                <Result
                    status="500"
                    title="500"
                    subTitle="啊偶，服务器未找到此信息"
                    extra={<Link to='/rooms'><Button type="primary">返回主页</Button></Link>}
                />
                }
            </div>
        )
    }
}

export default connect()(MyUpload);

