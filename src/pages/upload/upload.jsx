import React,{Component} from 'react'
import { connect } from 'react-redux'
import {Form,Button,Input, Select,AutoComplete} from 'antd'
import './upload.scss'
import BMap from 'BMap'
import debounce from 'lodash/debounce';

const { TextArea } = Input;
let map;

class Upload extends Component{
    constructor(props){
        super(props);
        this.state={
            roomID:5,
            roomImage:"",
            roomPrice:"",
            roomType:"",
            roomAddress:"",
            roomDescription:"",
            addressOptions:[],
            hasAlert: false,
            alertText:""
        };
        this.uploadRef = React.createRef();
        this.searchComplete = debounce(this.searchComplete, 500);
    }

    goBack=()=>{
        console.log(this.props.history)
    }

    submitUploadRoom=()=>{

    }

    /**
     * initialize the map of locating, including keyword tips, map zoomIning, map clicked then locating
     * to be improved
     */
    initialMap(){
        map = new BMap.Map("l-map");
        map.centerAndZoom("武汉",12);                   // 初始化地图,设置城市和地图级别。
        map.enableScrollWheelZoom(true);

        map.addEventListener('click', this.mapClick);

        let ac = new BMap.Autocomplete(    //建立一个自动完成的对象
            {
                "input" : "suggestId",
                "location" : map,
                onSearchComplete: this.searchComplete
            },
        );
    }

    /**
     * handle events of clicking the map, get longitude and latitude,
     * fill in the input with transfered location, then zoom in the place
     * @param {*} e 
     */
    mapClick=(e)=> {
        var pt = e.point;
        var geoc = new BMap.Geocoder();
        var addComp;
        geoc.getLocation(pt, (rs)=>{
            addComp = rs.address;
            this.uploadRef.current.setFieldsValue({address: addComp});
            map.clearOverlays();
            map.centerAndZoom(pt,18);
            map.addOverlay(new BMap.Marker(pt));
        });  
        
        
    }

    /**
     * a high frequency function, need to optimize it with throttle or debounce
     * @param {*} e 
     */
    searchComplete=(e)=> {
        // console.log(e);
        let searchResult=[];
        for(let i=0;i<e.Hr.length;i++){
            let _value=e.Hr[i];
            let a=_value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            searchResult.push({value:a});
        }
        this.setState({addressOptions:searchResult});
    }
    
    onSelect = (data) => {
        map.clearOverlays();
        map.centerAndZoom(data,18);
    };


    componentDidMount(){
        this.initialMap();
    }

    componentWillUnmount(){
        // 注销监听事件
        map.removeEventListener('click', this.mapClick);
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
                        labelCol={{ span: 4 }}
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
                            help={<div id='l-map' className='map'>点我</div>}
                            rules={[
                                {
                                    required:true,
                                    message:"请输入房屋地址"
                                }
                            ]}
                        >
							{/* <Input /> */}
                            <AutoComplete id="suggestId"
                                options={this.state.addressOptions}
                                onSelect={this.onSelect}
                                onSearch={this.onSearch}
                            />
						</Form.Item>
                        <Form.Item label="描述">
							<TextArea placeholder="请描述一下房屋，让大家对你的房屋留下一个好印象吧！"/>
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
                        <Form.Item label="测试">
							<Button >点我</Button>
						</Form.Item>  
                    </Form>
                </div>
            </div>
        )
    }
}

export default connect()(Upload);