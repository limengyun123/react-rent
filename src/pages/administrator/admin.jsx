import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Switch, Route, Redirect,Link, NavLink,withRouter} from 'react-router-dom'
import asyncComponent from '../../utils/asyncComponent.jsx'
import {Row,Col,Menu,Button} from 'antd'
import {UserOutlined,EyeOutlined,LineChartOutlined,HomeOutlined,SettingOutlined,UploadOutlined,
    UserAddOutlined,UndoOutlined,WarningOutlined,MehOutlined,FrownOutlined,ToolOutlined,
    TeamOutlined,MessageOutlined,MenuUnfoldOutlined,MenuFoldOutlined} from '@ant-design/icons'
import './admin.scss'

const adminUser = asyncComponent(()=>import("./adminUser/adminUser.jsx"));
const adminRoom = asyncComponent(()=>import("./adminRoom/adminRoom.jsx"));

const { SubMenu } = Menu;

class Admin extends Component{
    constructor(props){
        super(props);
        this.state={
            openMenu: 'zero',
            selectedMenu: '00',
            collapsed: false,
            isAdminValid:true
        }
    }

    toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    }

    componentDidMount(){
        console.log(this.props.match.path);
        this.checkAdminValid();
        // if(Object.getOwnPropertyNames(this.props.userInfo).length !== 0){
        //     this.setState({
        //         hasLogined:true,
        //     });
        // }
    }

    componentDidUpdate(){
        console.log(this.props.match.path);
        this.checkAdminValid();
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        console.log(nextProps.location.pathname);
    }

    checkAdminValid(){
        // console.log(this);
    }


    render(){
        return (
            <div>
                <Row className="admin-head">
                    <Col span={4} className='head-title'>
                        <p >长租公寓平台</p>
                    </Col>
                    <Col span={1}>
                        <Button type="primary" className="toggle-button" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }} >
                            {this.state.collapsed ? <MenuUnfoldOutlined / > :< MenuFoldOutlined/>}
                        </Button>

                    </Col>
                    <Col span={3} offset={16}  className="user-info">
                        {this.state.hasLogined ? 
                        <div>
                            <Link to='/login'>您好！{this.props.userInfo.accountName+(this.props.userInfo.sex==='男'?'先生':'女士')}</Link>
                        </div>
                        :
                        <div>
                            <span><Link to='/login/loginIn'>登录</Link>&nbsp;/&nbsp;<Link to='/login/register'>注册</Link></span>
                        </div>
                        }
                    </Col>
                </Row>
                <Row className="admin-body">
                    {/* <Col span={4} className="admin-menu"> */}
                    <div className="admin-menu">
                        <Menu mode="inline" theme="dark" 
                        defaultOpenKeys={[this.state.openMenu]} 
                        defaultSelectedKeys={[this.state.selectedMenu]}
                        inlineCollapsed={this.state.collapsed}
                        >
                            <SubMenu key="zero" title="用户管理&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;" icon={<UserOutlined />}>
                                <Menu.Item key="00" icon={<EyeOutlined />}><NavLink to='/admin/adminUser'>查看用户</NavLink></Menu.Item>
                                <Menu.Item key="01" icon={<LineChartOutlined />}>数据统计</Menu.Item>
                            </SubMenu>
                            <SubMenu key="one" title="房源管理" icon={<HomeOutlined />}>
                                <Menu.Item key="10" icon={<UndoOutlined />}><NavLink to='/admin/adminRoom'>等待审核</NavLink></Menu.Item>
                                <Menu.Item key="11" icon={<UploadOutlined />}>已上传</Menu.Item>
                            </SubMenu>
                            <SubMenu key="two" title="评论管理" icon={<MessageOutlined />}>
                                <Menu.Item key="20" icon={<WarningOutlined />}>评论举报</Menu.Item>
                            </SubMenu>
                            <SubMenu key="tree" title="投诉管理" icon={<MehOutlined />}>
                                <Menu.Item key="31" icon={<MehOutlined />}>投诉租客</Menu.Item>
                                <Menu.Item key="30" icon={<FrownOutlined />}>投诉房东</Menu.Item>
                            </SubMenu>
                            <SubMenu key="four" title="管理员管理" icon={<TeamOutlined />}>
                                <Menu.Item key="40" icon={<EyeOutlined />}>查看管理员</Menu.Item>
                                <Menu.Item key="41" icon={<ToolOutlined />}>权限管理</Menu.Item>
                                <Menu.Item key="42" icon={<UserAddOutlined />}>添加管理员</Menu.Item>
                                <Menu.Item key="43" icon={<SettingOutlined />}>个人设置</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </div>
                
            
                    {/* <Col span={20}> */}
                    <div className="admin-main-content">
                        {this.state.isAdminValid?
                            <Switch key='o3'>
                                <Route path={`${this.props.match.path}/adminUser`} exact component={adminUser}/>
                                <Route path={`${this.props.match.path}/adminRoom`} exact component={adminRoom}/>
                                <Redirect exact from='/' to='/adminUser'/>
                                <Route component= {adminUser}/>
                            </Switch>
                            :
                            <div>
                                抱歉，您不能查看
                            </div>
                        }
                        
                    </div>
                </Row>
            </div>
        )
    }
}

Admin.propTypes = {
    userInfo: PropTypes.object.isRequired
}


const mapStateToProps = (state) => {
    return {
      userInfo: state.userInfo
    }
  }


export default withRouter(connect(mapStateToProps,()=>({}))(Admin))