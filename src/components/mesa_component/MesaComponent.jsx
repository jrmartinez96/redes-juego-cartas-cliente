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
            cantidadCartasP1: 8,
            cantidadCartasP2: 8,
            cartaBasura: {
                nombre: "jd"
            },
            cartasMesa: [
                [
                    {
                        nombre: "2d",
                        selected: false,
                        basura: false,
                    },
                    {
                        nombre: "2t",
                        selected: false,
                        basura: false,
                    },
                    {
                        nombre: "2e",
                        selected: false,
                        basura: false,
                    },
                ],
                [
                    {
                        nombre: "2d",
                        selected: false,
                        basura: false,
                    },
                    {
                        nombre: "2t",
                        selected: false,
                        basura: false,
                    },
                    {
                        nombre: "2e",
                        selected: false,
                        basura: false,
                    },
                ],
                [
                    {
                        nombre: "2d",
                        selected: false,
                        basura: false,
                    },
                    {
                        nombre: "2t",
                        selected: false,
                        basura: false,
                    },
                    {
                        nombre: "2e",
                        selected: false,
                        basura: false,
                    },
                ],
            ]
        }
    }

    render() {
        // Cartas de P1 y P2
        const cartasP1 = []
        const cartasP2 = []

        for (let index = 0; index < this.state.cantidadCartasP1; index++) {
            cartasP1.push(<img key={index} src={backcard} alt="carta" className="backcard"/>)
        }

        for (let index = 0; index < this.state.cantidadCartasP2; index++) {
            cartasP2.push(<img key={index}  src={backcard} alt="carta" className="backcard"/>)
        }


        // Cartas de Mesa
        const { cartasMesa } = this.state;
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
        const nombreBasura = this.state.cartaBasura.nombre;
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
                        Deck (5)
                    </div>
                </div>
                <div className="jugador1">
                    {cartasP1}
                </div>
                <div className="jugador2">
                    {cartasP1}
                </div>
                <div className="cartas-mesa">
                    {rows}
                </div>
            </div>
        )
    }
}

export default MesaComponent