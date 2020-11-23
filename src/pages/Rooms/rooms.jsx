import React,{Component} from 'react'
import { connect } from 'react-redux'
import HeadMenu from '../../component/headMenu.jsx'
import './rooms.scss'

class rooms extends Component{

    render(){
        return(
            <div>
                <HeadMenu selected='0' />
                <div className='rooms-body'>
                    <div>
                        <img src='/public/img/room1.jpg' alt='暂无图片'/>
                        <p>江景公园</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(rooms)