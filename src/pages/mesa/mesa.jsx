import React from 'react'
import './mesa.css'
import ChatComponent from '../../components/chat_component/ChatComponent'
import CartasManoComponent from '../../components/cartas_mano_component/CartasManoComponent'
import MesaComponent from '../../components/mesa_component/MesaComponent'

class MesaPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            connection: props.connection,
            nombreTurno: "",
            cambioTurno: false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.juego.turnoId !== this.props.juego.turnoId) {
            let nuevoNombre = ""

            this.props.juego.players.forEach(player => {
                if (player.playerId === this.props.juego.turnoId) {
                    nuevoNombre = player.playerName
                }
            });

            this.setState({
                nombreTurno: nuevoNombre,
                cambioTurno: true
            })

            setTimeout(() => {
                this.setState({cambioTurno: false})
            }, 3000);
        }
    }

    render() {
        return (
            <div className="mesa-page">
                <div className={`turno ${this.state.cambioTurno ? 'cambio-color':''}`}>
                    Turno de: {this.state.nombreTurno}
                </div>
                <MesaComponent gameId={this.props.gameId} playerId={this.props.playerId} juego={this.props.juego}/>
                <ChatComponent gameId={this.props.gameId} playerId={this.props.playerId} chat={this.props.chat} connection={this.state.connection}/>
                <CartasManoComponent gameId={this.props.gameId} playerId={this.props.playerId} juego={this.props.juego} connection={this.state.connection}/>
            </div>
        )
    }
}

export default MesaPage;