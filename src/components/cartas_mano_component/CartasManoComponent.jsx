import React from 'react'
import './cartas_mano.css'
import diamante from '../../assets/images/diamante.png'
import corazon from '../../assets/images/heart.png'
import trebol from '../../assets/images/trebol.png'
import espada from '../../assets/images/spade.png'

class CartasManoComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cartas: [
                {
                    nombre: "2d",
                    selected: false
                },
                {
                    nombre: "2t",
                    selected: false
                },
                {
                    nombre: "2e",
                    selected: false
                },
                {
                    nombre: "2c",
                    selected: false
                },
                {
                    nombre: "1d",
                    selected: false
                },
                {
                    nombre: "1t",
                    selected: false
                },
                {
                    nombre: "1e",
                    selected: false
                },
                {
                    nombre: "1c",
                    selected: false
                },
            ]
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

        if (cardsSelected < 2 || cartasCopy[index].selected) {
            cartasCopy[index].selected = !cartasCopy[index].selected
    
            this.setState({cartas: cartasCopy})
        }


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
                                className={`carta-container${carta.selected ? ' selected': ''}`}
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

            </div>
        )
    }
}

export default CartasManoComponent