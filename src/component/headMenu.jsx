import React,{Component} from 'react'
import {Menu, Row,Col} from 'antd'
import {NavLink} from 'react-router-dom'
import './headMenu.scss'

class HeadMenu extends Component{
    constructor(props){
        super();
        this.state = {
            selectedMenu: props.selected,
        }
    }

    render(){
        return(
            <section className="head">
                <Row>
                    <Col span={8}>
                        <div className='head-title'>长租公寓平台</div>
                    </Col>
                    <Col span={13}>
                        <Menu defaultSelectedKeys={this.state.selectedMenu} mode="horizontal" className='head-menu'>
                            <Menu.Item key="0">
                                <NavLink to='/rooms'>主页</NavLink>
                            </Menu.Item>
                            <Menu.Item key="1">
                                <NavLink to='/favorite'>收藏</NavLink>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <NavLink to='/upload'>发布</NavLink>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <NavLink to='/profile'>账户</NavLink>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <NavLink  to='/support'>客服</NavLink>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={3}>
                        <div className="user-info">
                            <img src='public/img/default.jpg' alt='暂无图片'></img>
                        </div>
                        
                    </Col>
                </Row>
            </section>
        )
    }
}

export default HeadMenu;