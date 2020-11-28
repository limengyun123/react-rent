import React,{Component} from 'react'
import { connect } from 'react-redux'
import {Form,Button,Input, Select} from 'antd'
import './upload.scss'
import BMap from 'BMap'

class Upload extends Component{
    constructor(props){
        super(props);
        this.state={
            "roomID":5,
            "roomImage":"",
            "roomPrice":"",
            "roomType":"",
            "roomAddress":"",
            "roomDescription":"",
            hasAlert: false,
            alertText:""
        };
        this.uploadRef = React.createRef();
    }

    goBack=()=>{
        console.log(this.props.history)
    }

    submitUploadRoom=()=>{

    }

    initialMap=()=>{
        var map = new BMap.Map("address"); // 创建Map实例
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
        // map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
        // map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
        // map.enableScrollWheelZoom();
    }

    componentDidMount(){
        this.initialMap();
    }
    
    render(){
        return (
            <div>
                <div className='upload-head'>
                    <div className='room-detail-head'>
                        <Button onClick={this.goBack} >返回</Button>
                    </div>
                </div>
                <div className='upload-body'>
                    <Form name="uploadRoomInfo"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16}}
                        ref={this.uploadRef}
                        onFinish={this.submitUploadRoom}
					>
                        <Form.Item label="房屋租金" name="price"
                            rules={[
                                {
                                    required:true,
                                    message:"请输入房屋月租"
                                },
                                {
                                    pattern:new RegExp('/^([1-9]+(\\.)?[0-9]*)||([0]\\.[0-9]*)$/','g'),
                                    message:"请输入正数"
                                }
                            ]}
                        
                        >
							<Input suffix="元/月"/>
						</Form.Item> 
                        <Form.Item label="房屋类型" name="type"
                            rules={[
                                {
                                    required:true,
                                    message:"请选择房屋类型"
                                }
                            ]}
                        >
							<Select>
                                <Select.Option value="一室一厅">一室一厅</Select.Option>
                                <Select.Option value="一室二厅">一室二厅</Select.Option>
                                <Select.Option value="二室一厅">二室一厅</Select.Option>
                                <Select.Option value="二室二厅">二室二厅</Select.Option>
                                <Select.Option value="三室一厅">三室一厅</Select.Option>
                                <Select.Option value="三室二厅">三室二厅</Select.Option>
                                <Select.Option value="其他">其他</Select.Option>
                            </Select>
						</Form.Item>
                        <Form.Item label="地址" name="address"
                            rules={[
                                {
                                    required:true,
                                    message:"请输入房屋地址"
                                }
                            ]}
                        >
							<Input />
						</Form.Item>
                        <Form.Item label="描述">
							<Input placeholder="请描述一下房屋，让大家对你的房屋留下一个好印象吧！"/>
						</Form.Item>  
                        <Form.Item label="图片" name="image"
                            rules={[
                                {
                                    required:true,
                                    message:"请上传房屋图片"
                                }
                            ]}
                        >
                            <input type="file"/>
							
						</Form.Item> 
                    </Form>
                </div>
            </div>
        )
    }
}

export default connect()(Upload);