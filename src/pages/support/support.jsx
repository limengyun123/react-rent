import React,{Component} from 'react'
import { connect } from 'react-redux'
import HeadMenu from '../../component/headMenu.jsx'
import './support.scss'

class Support extends Component{
    render(){
        return (
            <div>
                <HeadMenu selected='4' />
                <div className='support-body'>
                    <div className='chat-window'>

                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(Support);

