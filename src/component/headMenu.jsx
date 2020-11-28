import React,{Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Menu, Row,Col} from 'antd'
import {Link, NavLink} from 'react-router-dom'
import './headMenu.scss'
import {AVATAR_PATH} from '../../config/path.js'

class HeadMenu extends Component{
    constructor(props){
        super();
        this.state = {
            selectedMenu: props.selected,
            hasLogined: false
        }
    }

    componentDidMount(){
        if(Object.getOwnPropertyNames(this.props.userInfo).length !== 0){
            this.setState({
                hasLogined:true,
            });
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
                                <NavLink to='/myUploads'>发布</NavLink>
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
                        {this.state.hasLogined ? 
                        <div className="user-info">
                            <Link to='/login'><img src={AVATAR_PATH+this.props.userInfo.avatar} alt='暂无图片'></img></Link>
                        </div>
                        :
                        <div>
                            <span><Link to='/login/loginIn'>登录</Link>&nbsp;/&nbsp;<Link to='/login/register'>注册</Link></span>
                        </div>
                        }
                    </Col>
                </Row>
            </section>
        )
    }
}


HeadMenu.propTypes = {
    userInfo: PropTypes.object.isRequired
}


const mapStateToProps = (state) => {
    return {
      userInfo: state.userInfo
    }
  }


export default connect(mapStateToProps,()=>({}))(HeadMenu)