import React, {Fragment} from 'react'
import './chat.css'

class ChatComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showChat: true,
            messages: [
                {
                    message: "Mensaje ",
                    nombre: "User "
                },
                {
                    message: "Mensaje ",
                    nombre: "User "
                },
                {
                    message: "Mensaje ",
                    nombre: "User "
                },
                {
                    message: "Mensaje ",
                    nombre: "User "
                },
                {
                    message: "Mensaje ",
                    nombre: "User "
                },
                {
                    message: "Mensaje ",
                    nombre: "User "
                },
                {
                    message: "Mensaje ",
                    nombre: "User "
                },
            ]
        }
    }

    componentDidMount() {
        this.updateScroll()
    }

    updateScroll = () => {
        if (this.messagesEnd) {
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        }
    }

    showHideChat = () => {
        this.setState({showChat: !this.state.showChat})
    }

    render() {
        return (
            <div className={`chat-container ${this.state.showChat ? '':'chat-hide'}`}>
                <div className={`chat-title ${this.state.showChat ? '':'chat-title-hide'}`} onClick={this.showHideChat}>
                    Chat
                </div>
                {
                    this.state.showChat ?
                    <Fragment>    
                        <div className="chat-messages" ref={(el) => { this.messagesEnd = el; }}>
                            {
                                this.state.messages.map((message, index) => {

                                    return (
                                        <div key={index} className="message-container">
                                            <div className="message-user">
                                                {message.nombre}{index}:
                                            </div>
                                            <div className="message-message">
                                                {message.message}
                                            </div>
                                            
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="chat-input">
                            <input className="message-input" placeholder="Ingresa tu mensaje..."></input>
                        </div>
                    </Fragment>
                    :
                    <div></div>
                }

            </div>
        )
    }
}

export default ChatComponent