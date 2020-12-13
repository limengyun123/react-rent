import React,{Component} from 'react';
import {Pagination,Table }from 'antd';
import { API } from '../../../api/adminApi';
import '../admin.scss'

const { Column } = Table;

class AdministratorCheck extends Component{
    constructor(props){
        super(props);
        this.state={
            admins:[],
            currentPage: 1,
            pageSize: 8,
            totalItems:0,
        }
    }

    getAdmins=async(currentPage)=>{
        let result = await API.getAdmin();
        console.log("limengyun",result);
        this.setState({admins:result.admins,totalItems:result.lenAdmins});
    }

    
    pageChange=(pageNumber)=>{
        this.setState({currentPage:pageNumber});
        // this.getUsers(pageNumber);
    }


    componentDidMount(){
        this.getAdmins();
    }


    render(){
        return (
            <div>
                
                <div>
                <Table dataSource={this.state.admins} pagination={false} >
                    <Column title="ID" dataIndex="id" key="id" />
                    <Column title="姓名" dataIndex="actualName" key="actualName" />
                    <Column title="性别" dataIndex="sex" key="sex" />
                    <Column title="邮箱" dataIndex="email" key="email" />
                    <Column title="电话号码" dataIndex="mobie" key="mobie" />
                    <Column
                        title="权限"
                        dataIndex="authorization"
                        key="authorization"
                        render={(text, record) =>
                            record.authorization ? "最高权限" : "普通权限"}
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

export default AdministratorCheck
