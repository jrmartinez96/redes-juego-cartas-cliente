import React from 'react'
import './mesa.css'
import ChatComponent from '../../components/chat_component/ChatComponent'

class MesaPage extends React.Component {

    render() {
        return (
            <div className="mesa-page">
                <div className="mesa">

                </div>
                <ChatComponent/>
            </div>
        )
    }
}

export default MesaPage;