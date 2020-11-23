import React,{Component} from 'react'
import { connect } from 'react-redux'
import HeadMenu from '../../component/headMenu.jsx'
import './favorite.scss'

class Favorite extends Component{
    render(){
        return (
            <div>
                <HeadMenu selected='1' />
                <div className='favorite-body'>
                    收藏
                </div>
            </div>
        )
    }
}

export default connect()(Favorite);

