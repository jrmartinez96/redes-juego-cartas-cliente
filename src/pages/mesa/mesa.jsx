import React, { Fragment } from 'react'
import './mesa.css'
import ChatComponent from '../../components/chat_component/ChatComponent'
import CartasManoComponent from '../../components/cartas_mano_component/CartasManoComponent'
import MesaComponent from '../../components/mesa_component/MesaComponent'
import { InstruccionesComponent } from '../../components/instrucciones_component/InstruccionesComponent'

class MesaPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            connection: props.connection,
            nombreTurno: "",
            cambioTurno: false,
            instrucciones: true
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
                <div className="ayuda-btn" onClick={()=> this.setState({instrucciones: true})}>
                    Ayuda
                </div>
                <MesaComponent gameId={this.props.gameId} playerId={this.props.playerId} juego={this.props.juego}/>
                <ChatComponent gameId={this.props.gameId} playerId={this.props.playerId} chat={this.props.chat} connection={this.state.connection}/>
                <CartasManoComponent gameId={this.props.gameId} playerId={this.props.playerId} juego={this.props.juego} connection={this.state.connection}/>
                {
                    this.state.instrucciones ?
                    <InstruccionesComponent onCerrar={() => this.setState({instrucciones: false})}/>
                    :
                    <Fragment/>
                }
            </div>
        )
    }
}

export default MesaPage;