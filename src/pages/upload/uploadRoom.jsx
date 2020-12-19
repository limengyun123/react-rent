import React,{Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Form,Button,Input, Select,AutoComplete,Upload,message} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import './uploadRoom.scss'
import BMap from 'BMap'
import debounce from 'lodash/debounce';
import { API } from '../../api/api';

const { TextArea } = Input;
let map;

class UploadRoom extends Component{
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
        };
        this.uploadRef = React.createRef();
        this.searchComplete = debounce(this.searchComplete, 500);
    }

    goBack=()=>{
        console.log(this.props.history)
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

        new BMap.Autocomplete(    //建立一个自动完成的对象
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

    /**
     * add restriction on the file
     * @param {single file(expected to be image) that user upload}} file 
     */
    beforeUpload=(file)=>{
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('只能上传 JPG/PNG 文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('图片大小必须小于 2MB!');
        }
        if(isJpgOrPng && isLt2M){
            this.setState({roomImage:this.state.roomImage.concat(file)});
            return true;
        }
        return false;
      }


    /**
     * after the form is validated by rules, recheck it in this function
     */
    submitUploadRoom=()=>{
        if(this.props.userInfo && this.props.userInfo.accountName){
            let newState={};
            newState.roomPrice = this.uploadRef.current.getFieldValue("price");
            newState.roomType = this.uploadRef.current.getFieldValue("type");
            newState.roomAddress = this.uploadRef.current.getFieldValue("address");
            newState.roomDescription = this.uploadRef.current.getFieldValue("description");
            this.setState(newState);
            this.uploadRoomInfo();
        }
        else{
            message.error('请先登录');
        }
        

    }

    /**
     * post infomation of the room to backstage
     */
    uploadRoomInfo=async()=>{
        let object = {
            roomID:this.state.roomID,
            roomImage:this.state.roomImage,
            roomPrice:this.state.roomPrice,
            roomType:this.state.roomType,
            roomAddress:this.state.roomAddress,
            roomDescription:this.state.roomDescription,
        }
        let result = await API.postRoomInfo(object);
        if(result){
            message.success("提交成功");
            this.props.history.push('/myUploads');
        }
        else{
            message.error('提交失败！');
        }
    }

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
                        <Button><Link to='/myUploads'>返回</Link></Button>
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
                                    pattern: new RegExp(/^\d*[\\.]?\d*$/, "g"),
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
                            />
                        </Form.Item>
                        <Form.Item label="描述" name="description">
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
                            {/* <input type="file"/> */}
                            <Upload
                                listType="picture-card"
                                beforeUpload={this.beforeUpload}
                            >
                                <PlusOutlined /><div style={{ marginTop: 8 }}>上传</div>
                            </Upload>
                            
                        </Form.Item> 
                        <Form.Item>
                            <Button type='primary' htmlType='submit'>提交</Button>
                            <Button onClick={()=>{window.location.reload()}}>重置</Button>
                            
                        </Form.Item>  
                    </Form>
                </div>
            </div>
        )
    }
}

UploadRoom.propTypes = {
    userInfo: PropTypes.object.isRequired
  }
  
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
}

  
export default connect(mapStateToProps,()=>({}))(UploadRoom);