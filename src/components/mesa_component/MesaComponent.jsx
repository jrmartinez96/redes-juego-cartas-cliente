import React from 'react'
import './mesa_c.css'
import backcard from '../../assets/images/backcard.png'
import diamante from '../../assets/images/diamante.png'
import corazon from '../../assets/images/heart.png'
import trebol from '../../assets/images/trebol.png'
import espada from '../../assets/images/spade.png'

class MesaComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            cantidadCartasBaraja: 0,
            cantidadCartasP1: 8,
            cantidadCartasP2: 8,
            nombreP1: "",
            nombreP2: "",
            cartaBasura: {
                nombre: "jd"
            },
            cartasMesa: [
                [
                    {
                        nombre: "2d",
                    },
                    {
                        nombre: "2t",
                    },
                    {
                        nombre: "2e",
                    },
                ],
                [
                    {
                        nombre: "2d",
                    },
                    {
                        nombre: "2t",
                    },
                    {
                        nombre: "2e",
                    },
                ],
                [
                    {
                        nombre: "2d",
                    },
                    {
                        nombre: "2t",
                    },
                    {
                        nombre: "2e",
                    },
                ],
            ]
        }
    }

    render() {
        // Cartas de P1 y P2
        let cantidadCartasP1 = 8
        let cantidadCartasP2 = 8
        let nombreP1 = ""
        let nombreP2 = ""
        let players = [...this.props.juego.players]
        let myPlayerPos = -1

        players.forEach((player, index) => {
            if (player.playerId === this.props.playerId) {
                myPlayerPos = index
            }
        })

        if (myPlayerPos !== -1) {
            players.splice(myPlayerPos, 1)

            cantidadCartasP1 = this.props.juego.cantidadCartas[players[0].playerId]
            cantidadCartasP2 = this.props.juego.cantidadCartas[players[1].playerId]
            nombreP1 = players[0].playerName
            nombreP2 = players[1].playerName
        }
        const cartasP1 = []
        const cartasP2 = []

        for (let index = 0; index < cantidadCartasP1; index++) {
            cartasP1.push(<img key={index} src={backcard} alt="carta" className="backcard"/>)
        }

        for (let index = 0; index < cantidadCartasP2; index++) {
            cartasP2.push(<img key={index}  src={backcard} alt="carta" className="backcard"/>)
        }


        // Cartas de Mesa
        let cartasMesa = this.props.juego.mesa.map((trio) => {
            return trio.map(carta => {
                return {
                    nombre: carta.cartaId
                }
            })
        })
        const rows = []
        let row = []

        for (let i = 0; i < cartasMesa.length; i++) {
            const trio = cartasMesa[i];
            
            row.push(
                <div key={i} className="cartas-container">
                    {trio.map((carta, index) => {
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

                        return(
                            <div
                                key={index}
                                className="carta"
                            >
                                <div className={`carta-nombre-mesa tipo-${color}`}>
                                    {numero}
                                </div>
                                <div>
                                    <img className="tipo-image-mesa" src={tipoImage} alt="palo"/>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
            if (i % 2 === 1 || i === cartasMesa.length-1) {
                rows.push(
                    <div key={i} className="cartas-row">
                        {row}
                    </div>
                )
                row = []
            }

        }

        // Carta Basura
        const nombreBasura = this.props.juego.cartaBasura.cartaId;
        const numeroBasura = nombreBasura.substring(0, nombreBasura.length - 1)
        const tipoBasura = nombreBasura.substring(nombreBasura.length - 1, nombreBasura.length)
        let colorBasura = ""
        let tipoImageBasura = undefined;

        if (tipoBasura === "d" || tipoBasura === "c") {
            colorBasura = "rojo"
        } else {
            colorBasura = "negro"
        }

        switch (tipoBasura) {
            case 'd':
                tipoImageBasura = diamante
                break;
            
            case 'c':
                tipoImageBasura = corazon
                break;
            
            case 't':
                tipoImageBasura = trebol
                break;

            case 'e':
                tipoImageBasura = espada
                break;
        
            default:
                break;
        }

        return (
            <div className="mesa">
                <div className="carta-basura-deck">
                    <div>
                        <div
                            className="carta"
                        >
                            <div className={`carta-nombre-mesa tipo-${colorBasura}`}>
                                {numeroBasura.toUpperCase()}
                            </div>
                            <div>
                                <img className="tipo-image-mesa" src={tipoImageBasura} alt="palo"/>
                            </div>
                        </div>
                        Basura
                    </div>
                    <div style={{"textAlign": "center", "marginLeft": "10px"}}>
                        <img src={backcard} alt="carta" className="deck"/>
                        <br/>
                        Deck ({this.props.juego.cantidadCartasBaraja})
                    </div>
                </div>
                <div className="jugador1-nombre">
                    {nombreP1}
                </div>
                <div className="jugador1">
                    {cartasP1}
                </div>
                <div className="jugador2-nombre">
                    {nombreP2}
                </div>
                <div className="jugador2">
                    {cartasP2}
                </div>
                <div className="cartas-mesa">
                    {rows}
                </div>
            </div>
        )
    }
}

export default MesaComponent