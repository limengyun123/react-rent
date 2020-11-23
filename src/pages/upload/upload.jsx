import React,{Component} from 'react'
import { connect } from 'react-redux'
import HeadMenu from '../../component/headMenu.jsx'
import './upload.scss'

class Upload extends Component{
    render(){
        return (
            <div>
                <HeadMenu selected='2' />
                <div className='upload-body'>
                    上传
                </div>
            </div>
        )
    }
}

export default connect()(Upload);

