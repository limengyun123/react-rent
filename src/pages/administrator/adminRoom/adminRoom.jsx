import React,{Component} from 'react'
import { Col, Row,PageHeader } from 'antd'
import {Link,withRouter} from 'react-router-dom'


const routes = [
    {
      path: 'index',
      breadcrumbName: '房源管理',
    },
    {
      path: 'first',
      breadcrumbName: '等待审核',
    },
];

class AdminRoom extends Component{
    render(){
        return (
            <div>
              
                <PageHeader
                    className="site-page-header"
                    breadcrumb={{ routes }}
                />
            </div>
        )
    }
}

export default AdminRoom