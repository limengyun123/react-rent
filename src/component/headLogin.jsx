import React, {Component} from 'react'
import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


class HeadLogin extends Component{
    constructor(props){
        super();
        this.state={
            linkDes: props.destination,
            nameDes:  props.name,
        }
    }

    render(){
        return (
            <div>
              <Breadcrumb>
                <Breadcrumb.Item >
                    <Link to='/rooms'>
                        <HomeOutlined />主页
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to={this.state.linkDes}>
                        <UserOutlined />{this.state.nameDes}
                    </Link>
                </Breadcrumb.Item>
            </Breadcrumb>  
            </div>
        )
    }
}

export default HeadLogin
