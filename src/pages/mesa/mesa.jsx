import React from 'react'
import './mesa.css'
import ChatComponent from '../../components/chat_component/ChatComponent'
import CartasManoComponent from '../../components/cartas_mano_component/CartasManoComponent'
import MesaComponent from '../../components/mesa_component/MesaComponent'

class MesaPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            connection: props.connection
        }
    }

    render() {
        return (
            <div className="mesa-page">
                <div className="turno">
                    Turno de: J1
                </div>
                <MesaComponent juego={this.props.juego}/>
                <ChatComponent gameId={this.props.gameId} playerId={this.props.playerId} chat={this.props.chat} connection={this.state.connection}/>
                <CartasManoComponent gameId={this.props.gameId} playerId={this.props.playerId} juego={this.props.juego} connection={this.state.connection}/>
            </div>
        )
    }
}

export default MesaPage;