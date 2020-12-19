import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const HeadLogin=({destination,name})=> {
    return (
        <div>
            <Breadcrumb>
            <Breadcrumb.Item >
                <Link to='/rooms'>
                    <HomeOutlined />主页
                </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link to={destination}>
                    <UserOutlined />{name}
                </Link>
            </Breadcrumb.Item>
        </Breadcrumb>  
        </div>
    )
}

// function HeadLogin(props) {
//     return (
//         <div>
//           <Breadcrumb>
//             <Breadcrumb.Item >
//                 <Link to='/rooms'>
//                     <HomeOutlined />主页
//                 </Link>
//             </Breadcrumb.Item>
//             <Breadcrumb.Item>
//                 <Link to={props.destination}>
//                     <UserOutlined />{props.name}
//                 </Link>
//             </Breadcrumb.Item>
//         </Breadcrumb>  
//         </div>
//     )

// }

HeadLogin.protoTypes={
    destination:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired
}

export default HeadLogin
