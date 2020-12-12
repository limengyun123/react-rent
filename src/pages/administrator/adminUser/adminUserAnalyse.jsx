import React,{Component} from 'react';
import {Row,Col,Card,Anchor  }from 'antd';
import ReactEcharts from 'echarts-for-react';
import { API } from '../../../api/adminApi';
import './adminUserAnalyse.scss'

const { Link } = Anchor;

class AdminUserAnalyse extends Component{
    constructor(props){
        super(props);
        this.state={
            numFemale:0,
            numMale:0
        };
        this.heightRef = React.createRef();
    }

    getUsersSexPercentage=async()=>{
        let result = await API.getSexPercentage();
        this.setState(result);
    }

    
    getOption1 = () => {
        return {
            title: {
                text: '堆叠区域图'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['邮件营销','联盟广告','视频广告']
            },
            toolbox: {
                feature: {
                    //saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                type : 'category',
                boundaryGap : false,
                data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                type : 'value'
                }
            ],
            series : [
                {
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'联盟广告',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'视频广告',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[150, 232, 201, 154, 190, 330, 410]
                }
            ]
        };
      };

      getOption2 = () =>{
        return {
            title : {
                text: '某站点已注册用户男女比例',
                subtext: '真实数据',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['男','女']
            },
            series : [
                {
                    name: '男女比例',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:this.state.numMale, name:'男'},
                        {value:this.state.numFemale, name:'女'},
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]

        };
    }

    handleClick = (e, link) => {
        e.preventDefault();
        document.body.scrollTop = document.getElementById(link.href).offsetTop;
      };
    
    componentDidMount(){
        this.getUsersSexPercentage();
    }

    render(){
        return (
            <Row>
                <Col span={20} ref={this.heightRef}>
                    <section id="session-referrer" className="chart-section">
                        <h1>访问来源</h1>
                        <Card>
                            <ReactEcharts option={this.getOption1()} />
                        </Card>
                    </section>
                    <section id="male-female-percentage" className="chart-section">
                        <h1>男女比例</h1>
                        <Card>
                            <ReactEcharts option={this.getOption2()} />
                        </Card>
                    </section>
                </Col>
                <Col span={4}>
                    <Anchor onClick={this.handleClick} className='anchor'>
                        <Link href="session-referrer" title="访问来源" />
                        <Link href="male-female-percentage" title="男女比例" />
                    </Anchor>
                </Col>
            </Row>

        )
    }
}

export default AdminUserAnalyse
