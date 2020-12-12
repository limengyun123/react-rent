import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Switch, Route, Redirect,Link, NavLink,withRouter} from 'react-router-dom'
import asyncComponent from '../../utils/asyncComponent.jsx'
import {Menu,Breadcrumb,Layout,} from 'antd'
import {UserOutlined,EyeOutlined,LineChartOutlined,HomeOutlined,SettingOutlined,UploadOutlined,
    UserAddOutlined,UndoOutlined,WarningOutlined,MehOutlined,FrownOutlined,ToolOutlined,
    TeamOutlined,MessageOutlined,MenuUnfoldOutlined,MenuFoldOutlined} from '@ant-design/icons'
import './admin.scss'

const adminUserCheck = asyncComponent(()=>import("./adminUser/adminUserCheck.jsx"));
const adminUserAnalyse = asyncComponent(()=>import("./adminUser/adminUserAnalyse.jsx"));
const adminRoomWaiting = asyncComponent(()=>import("./adminRoom/adminRoomWaiting.jsx"));

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Admin extends Component{
    constructor(props){
        super(props);
        this.state={
            openMenu: '',
            selectedMenu: '',
            collapsed: false,
            firstDir:"",
            secondDir:"",
            isAdminValid:true
        }
    }

    toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    }

    onOpenChange=(keys )=>{
        console.log(keys);
    }


    checkAdminValid(){
        // if(Object.getOwnPropertyNames(this.props.userInfo).length !== 0){
        //     this.setState({
        //         hasLogined:true,
        //     });
        // }
    }

    setMenuState(props){
        let path = props.location.pathname;
        console.log(path);
        switch(path){
            case '/admin/adminUserAnalyse':
                this.setState({
                    openMenu: 'zero',
                    selectedMenu: '01',
                    firstDir: "用户管理",
                    secondDir: "数据统计"
                });
                break;
            case '/admin/adminRoomWaiting':
                this.setState({
                    openMenu: 'one',
                    selectedMenu: '10',
                    firstDir: "房源管理",
                    secondDir: "等待审核"
                });
                break;
            default:
                this.setState({
                    openMenu: 'zero',
                    selectedMenu: '00',
                    firstDir: "用户管理",
                    secondDir: "查看用户"
                });
            
        }
    }
    componentWillMount(){
        this.setMenuState(this.props);
    }

    componentDidMount(){
        this.checkAdminValid();
        this.setMenuState(this.props);
    }


    componentWillReceiveProps(nextProps) {
        this.setMenuState(nextProps);

    }

    render(){
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" >长租公寓平台</div>
                    <Menu mode="inline" theme="dark" 
                        inlineCollapsed={this.state.collapsed}
                        defaultOpenKeys={[this.state.openMenu]} 
                        defaultSelectedKeys={[this.state.selectedMenu]}
                 
                    >
                        <SubMenu key="zero" title="用户管理" icon={<UserOutlined />}>
                            <Menu.Item key="00" icon={<EyeOutlined />}><NavLink to='/admin/adminUserCheck'>查看用户</NavLink></Menu.Item>
                            <Menu.Item key="01" icon={<LineChartOutlined />}><NavLink to='/admin/adminUserAnalyse'>数据统计</NavLink></Menu.Item>
                        </SubMenu>
                        <SubMenu key="one" title="房源管理" icon={<HomeOutlined />}>
                            <Menu.Item key="10" icon={<UndoOutlined />}><NavLink to='/admin/adminRoomWaiting'>等待审核</NavLink></Menu.Item>
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
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        <span onClick={this.toggleCollapsed} className="toggle-span">
                            {this.state.collapsed ? <MenuUnfoldOutlined / > :< MenuFoldOutlined/>}
                        </span>
                        <div className="user-info">
                        {this.state.hasLogined ? 
                            <div>
                                <Link to='/login'>您好！{this.props.userInfo.accountName+(this.props.userInfo.sex==='男'?'先生':'女士')}</Link>
                            </div>
                            :
                            <div>
                                <span><Link to='/login/loginIn'>登录</Link>&nbsp;/&nbsp;<Link to='/login/register'>注册</Link></span>
                            </div>
                        }
                    </div>
                    </Header>
                    <Breadcrumb separator=">" className="breadcrumb-nav">
                        <Breadcrumb.Item>{this.state.firstDir}</Breadcrumb.Item>
                        <Breadcrumb.Item>{this.state.secondDir}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 400,
                        }}
                    >
                        <Switch key='o3'>
                            <Route path={`${this.props.match.path}/adminUserCheck`} exact component={adminUserCheck}/>
                            <Route path={`${this.props.match.path}/adminUserAnalyse`} exact component={adminUserAnalyse}/>
                            <Route path={`${this.props.match.path}/adminRoomWaiting`} exact component={adminRoomWaiting}/>
                            <Redirect exact from='/' to='/adminUserCheck'/>
                            <Route component= {adminUserCheck}/>
                        </Switch>
                    </Content>
                </Layout>
        </Layout>

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