import React, {Fragment} from 'react'
import './chat.css'

class ChatComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showChat: true,
            mensaje: ""
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

    onInputChange = (ev) => {
        if (ev.keyCode === 13) {
            setTimeout(() => {
                const { mensaje } = this.state
                const { playerId, connection, gameId } = this.props

                connection.send(JSON.stringify(
                    {
                        opcion: 2,
                        playerId: playerId,
                        mensaje: mensaje,
                        gameId: gameId
                    }
                ))

                this.setState({mensaje: ""})

            }, 10)
        }
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
                                this.props.chat.map((message, index) => {

                                    return (
                                        <div key={index} className="message-container">
                                            <div className="message-user">
                                                {message.nombre}:
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
                            <input
                                className="message-input" 
                                placeholder="Ingresa tu mensaje..."
                                onChange={(ev) => {
                                    this.setState({mensaje: ev.target.value})
                                }}
                                value={this.state.mensaje}
                                onKeyDown={(ev) => this.onInputChange(ev)}
                            ></input>
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