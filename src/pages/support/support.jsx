import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Col, Row,Input, Button } from 'antd'
import HeadMenu from '../../component/headMenu.jsx'
import './support.scss'

const {TextArea} = Input;

class Support extends Component{
    constructor(props){
        super(props);
        this.state={
            chatHistory:[{
                from:1,
                content:"有什么问题都可以问我哟~"
            }
        ],
        inputChoice:["信息问题","身份认证","我的发布","我要吐槽"]
        }
        this.textAreaRef = React.createRef();
    }

    sendMessage(){
        let msg = this.textAreaRef.current.state.value;
        if(msg){
            this.setState({
                chatHistory:this.state.chatHistory.concat({from:0,content:msg})
            });
        }
        this.cleanInput();
    }

    cleanInput(){
        console.log(this.textAreaRef.current);
        this.textAreaRef.current.handleReset();
    }

    toMessageEnd(){
        if (this.messagesEnd) {
            const scrollHeight = this.messagesEnd.scrollHeight;
            const height = this.messagesEnd.clientHeight;  
            const maxScrollTop = scrollHeight - height; 
            this.messagesEnd.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
        }
    }

    handleChoiceClick(e){
        this.setState({
            chatHistory:this.state.chatHistory.concat({from:0,content:e.target.innerText})
        });
    }
    componentDidUpdate(){
        console.log("limengyun");
        this.toMessageEnd();
    }
    componentDidMount(){
        this.toMessageEnd();
    }

    render(){
        return (
            <div>
                <HeadMenu selected='4' />
                <Row className='support-body'>
                    <Col span={6}>
                    </Col>
                    <Col span={12} className='chat-window'>
                        <div className="record-frame" ref={(el) => { this.messagesEnd = el}}>
                            {
                                this.state.chatHistory.map((item,key)=>{
                                    return (
                                        item.from?
                                        <div key={key} className="content others-content">
                                            <p>{item.content}</p>
                                        </div>
                                        :
                                        <div key={key} className="content my-content">
                                            <p>{item.content}</p>
                                        </div>
                                    )
                                })
                            }                    
                        </div>
                        <div className="input-frame">
                            <div className="input-choice">
                                {
                                    this.state.inputChoice.map((item,key)=>{
                                        return (
                                            <span key={key} onClick={(e)=>this.handleChoiceClick(e)}>{item}</span>
                                        )
                                    })
                                }
                            </div>
                            <TextArea ref={this.textAreaRef} placeholder="请在此输入"/>
                            <Button className="support-button" type='primary' onClick={()=>{this.sendMessage()}}>发送</Button>
                            <Button className="support-button" onClick={()=>this.cleanInput()}>清除</Button>
                        </div>
                    </Col>
                    <Col span={6}>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default connect()(Support);

