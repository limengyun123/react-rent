import React,{Component} from 'react'
import { connect } from 'react-redux'
import { API } from '../../api/api.js';
import HeadMenu from '../../component/headMenu.jsx'
import './rooms.scss'

class rooms extends Component{
    constructor(props){
        super(props);
        this.state={
            rooms:[]
        }
        
    }

    getRooms=async()=>{
        let result = await API.getRoomsInfo();
        this.setState({rooms:result});
    }

    componentDidMount(){
        this.getRooms();
    }


    render(){
        return(
            <div>
                <HeadMenu selected='0' />
                <div className='rooms-body'>
                    {
                        this.state.rooms.map(
                            room=>{ return (
                                <div key={room.roomID}>
                                    <img src={'/public/img/'+room.roomImage} alt='暂无图片'/>
                                    <p>{room.roomAddress}</p>
                                    <span>{room.roomType}</span>
                                    <span>{room.roomPrice}</span>
                                    <p>{room.roomType}</p>
                                </div>)
                            }
                        )
                    }
                    
                </div>
            </div>
        )
    }
}

export default connect()(rooms)