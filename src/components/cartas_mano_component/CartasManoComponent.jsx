import React from 'react'
import './cartas_mano.css'
import diamante from '../../assets/images/diamante.png'
import corazon from '../../assets/images/heart.png'
import trebol from '../../assets/images/trebol.png'
import espada from '../../assets/images/spade.png'
import { store } from 'react-notifications-component';

class CartasManoComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cartas: []
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.juego.cartasJugador.stack !== this.props.juego.cartasJugador.stack) {
            this.setState({
                cartas: this.props.juego.cartasJugador.stack.map(id => {
                    return {
                        nombre: id,
                        selected: false,
                        basura: false
                    }
                })
            })
        }
    }

    onSelectCard = (index) => {
        let cardsSelected = 0;

        this.state.cartas.forEach(carta => {
            if (carta.selected) {
                cardsSelected++
            }
        })

        let cartasCopy = [...this.state.cartas]

        if (cardsSelected === 3 && cartasCopy[index].selected) { // Si hay tres seleccionadas y se deselecciona una, todas las seleccionados se vuelven no basura
            cartasCopy[index].selected = !cartasCopy[index].selected
            
            this.state.cartas.forEach((carta, ic) => {
                if (cartasCopy[ic].basura) {
                    cartasCopy[ic].basura = false
                }
            })

            this.setState({cartas: cartasCopy})

        } else if (cardsSelected < 3 || cartasCopy[index].selected) { // Si se selecciona un carta y hay menos de 3 seleccionadas, si es la tercera que se selecciona es la basura

            if (cardsSelected === 2 && !cartasCopy[index].selected) {
                cartasCopy[index].basura = true
            }

            cartasCopy[index].selected = !cartasCopy[index].selected
    
            this.setState({cartas: cartasCopy})
        }


    }

    onEnviarMano = () => {
        let cartasMano = []
        let cartaBasura = this.props.juego.cartaBasura.cartaId
        let cartaPagar = ""

        this.state.cartas.forEach(carta => {
            if (carta.selected && !carta.basura) {
                cartasMano.push({cartaId: carta.nombre})
            } else if (carta.basura) {
                cartaPagar = carta.nombre
            }
        })

        if (cartasMano.length === 2 && cartaPagar !== "" && cartaBasura !== "") {
            const { connection } = this.props
            connection.send(JSON.stringify({
                opcion: 1,
                playerId: this.props.playerId,
                gameId: this.props.gameId,
                pasar: false,
                cartaBasuraId: cartaBasura,
                cartasMano: cartasMano,
                cartaPagarId: cartaPagar
            }))
        } else {
            store.addNotification({
                title: "Error",
                message: "Jugada no válida, selecciona dos cartas para complementar y una para pagar.",
                type: "danger",
                insert: "top",
                container: "top-left",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
              });
        }
    }

    onPasarJugada = () => {
        const { connection } = this.props
        connection.send(JSON.stringify({
            opcion: 1,
            playerId: this.props.playerId,
            gameId: this.props.gameId,
            pasar: true
        }))
    }

    render() {
        return (
            <div className="cartas-mano-container">
                {
                    this.state.cartas.map((carta, index) => {
                        const { nombre } = carta;
                        const numero = nombre.substring(0, nombre.length - 1)
                        const tipo = nombre.substring(nombre.length - 1, nombre.length)
                        let color = ""
                        let tipoImage = undefined;

                        if (tipo === "d" || tipo === "c") {
                            color = "rojo"
                        } else {
                            color = "negro"
                        }

                        switch (tipo) {
                            case 'd':
                                tipoImage = diamante
                                break;
                            
                            case 'c':
                                tipoImage = corazon
                                break;
                            
                            case 't':
                                tipoImage = trebol
                                break;

                            case 'e':
                                tipoImage = espada
                                break;
                        
                            default:
                                break;
                        }

                        return (
                            <div
                                key={index}
                                className={`carta-container${carta.selected ? ' selected': ''}${carta.basura ? ' selected-basura': ''}`}
                                onClick={() => this.onSelectCard(index)}
                            >
                                <div className={`carta-nombre tipo-${color}`}>
                                    {numero}
                                </div>
                                <div>
                                    <img className="tipo-image" src={tipoImage} alt="palo"/>
                                </div>
                            </div>
                        )
                    })
                }

                <button 
                    className="enviar-jugada" 
                    onClick={this.onEnviarMano}
                    disabled={this.props.juego.turnoId !== this.props.playerId}
                >Enviar jugada</button>
                <button 
                    className="pasar-jugada" 
                    onClick={this.onPasarJugada}
                    disabled={this.props.juego.turnoId !== this.props.playerId}
                >Pasar jugada</button>

            </div>
        )
    }
}

export default CartasManoComponent