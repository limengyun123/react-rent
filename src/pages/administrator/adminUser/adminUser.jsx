import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import { Col, Row ,PageHeader} from 'antd'

const routes = [
    {
      path: 'index',
      breadcrumbName: '用户管理',
    },
    {
      path: 'first',
      breadcrumbName: '查看用户',
    },
];

class AdminUser extends Component{
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

export default AdminUser
