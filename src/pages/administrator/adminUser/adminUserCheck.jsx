import React,{Component} from 'react';
import {Pagination,Table, Space }from 'antd';
import { API } from '../../../api/adminApi';
import './adminUserCheck.scss'

const { Column } = Table;

class AdminUserCheck extends Component{
    constructor(props){
        super(props);
        this.state={
            users:[],
            currentPage: 1,
            pageSize: 8,
            totalItems:0
        }
    }

    getUsers=async(currentPage)=>{
        let from = (currentPage-1)*this.state.pageSize;
        let to = currentPage*this.state.pageSize;
        let result = await API.getUser(from,to);
        this.setState({users:result.users,totalItems:result.lenUsers});
    }

    componentDidMount(){
        this.getUsers(this.state.currentPage);
    }

    pageChange=(pageNumber)=>{
        this.setState({currentPage:pageNumber});
        this.getUsers(pageNumber);
    }


    render(){
        return (
            <div>
                
                <div>
                <Table dataSource={this.state.users} pagination={false}>
                   
                    <Column title="账号" dataIndex="accountName" key="accountName" />
                    <Column title="姓名" dataIndex="actualName" key="actualName" />
                    <Column title="性别" dataIndex="sex" key="sex" />
                    <Column title="邮箱" dataIndex="email" key="email" />
                    <Column title="身份证" dataIndex="IDNumber" key="IDNumber" />
                    <Column title="电话号码" dataIndex="mobie" key="mobie" />
                    <Column title="密码" dataIndex="password" key="password" />
                    <Column
                        title="操作"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                            <a>详情{record.lastName}</a>
                            <a>删除</a>
                            </Space>
                        )}
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

export default AdminUserCheck
