import React from 'react'
import './mesa.css'
import ChatComponent from '../../components/chat_component/ChatComponent'
import CartasManoComponent from '../../components/cartas_mano_component/CartasManoComponent'

class MesaPage extends React.Component {

    render() {
        return (
            <div className="mesa-page">
                <div className="mesa">

                </div>
                <ChatComponent/>
                <CartasManoComponent/>
            </div>
        )
    }
}

export default MesaPage;