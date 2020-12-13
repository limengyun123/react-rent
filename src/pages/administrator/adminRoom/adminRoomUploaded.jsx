import React,{Component} from 'react';
import {Pagination,Table }from 'antd';
import { API } from '../../../api/adminApi';
import '../admin.scss'


const { Column } = Table;

class AdminRoomUploaded extends Component{
    constructor(props){
        super(props);
        this.state={
            rooms:[],
            currentPage: 1,
            pageSize: 8,
            totalItems:0,
            chosenAccountName:""
        }
    }

    getUploadRooms=async(currentPage)=>{
        let from = (currentPage-1)*this.state.pageSize;
        let to = currentPage*this.state.pageSize;
        let result = await API.getUploadRoom(from,to);
        this.setState({rooms:result.rooms,totalItems:result.lenRooms});
    }

    
    pageChange=(pageNumber)=>{
        this.setState({currentPage:pageNumber});
        this.getUploadRooms(pageNumber);
    }


    handleDetail(key){
        // console.log(key);
        // window.open(`pathname/${param1}/${param2}/${param3}`)
        window.open(`http://localhost:8080/#/roomDetail/${key}`);
    }

    componentDidMount(){
        // console.log(this.props);
        this.getUploadRooms(this.state.currentPage);
    }


    render(){
        return (
            <div>
                
                <div>
                <Table dataSource={this.state.rooms} pagination={false} >
                    <Column title="ID" dataIndex="roomID" key="roomID" />
                    <Column title="户主" dataIndex="owner" key="owner" />
                    <Column title="类型" dataIndex="roomType" key="roomType" />
                    <Column title="价格" dataIndex="roomPrice" key="roomPrice" />
                    <Column title="地理位置" dataIndex="roomAddress" key="roomAddress" />
                    <Column title="上传时间" dataIndex="uploadTime" key="uploadTime" />
                    <Column title="审核时间" dataIndex="checkedTime" key="checkedTime" />
                    <Column title="审核人" dataIndex="checkedAdmin" key="checkedAdmin" />
                    <Column
                        title="操作"
                        dataIndex="action"
                        render={(text, record) =>
                            this.state.rooms.length >= 1 ? (
                                <span onClick={() => this.handleDetail(record.roomID)}>详情</span>
                            ) : null}
                        />
                    </Table>
                </div>
                
                <div className="pagination">
                    <Pagination defaultCurrent={1} hideOnSinglePage
                        current={this.state.currentPage} 
                        total={this.state.totalItems} 
                        pageSize={this.state.pageSize}
                        showTotal={total => `共 ${total} 条数据`}
                        onChange={this.pageChange}
                        />
                </div>    
            </div>
        )
    }
}

export default AdminRoomUploaded
