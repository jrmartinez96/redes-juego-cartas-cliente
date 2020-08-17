import React from 'react'
import './menu.css'



class MenuPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            nombre: "",
            disableButton: false
        }
    }

    onConnectServer = () => {
        this.props.onJoin(this.state.nombre)
        this.setState({disableButton: true})
    }

    render() {
        return (
            <div className="menu-page">
                <div className="header">
                    <div>
                        Conquian
                    </div>
                </div>
                <div className="menu-container">
                    <div>
                        <div className="input-name-container">
                            <input
                                placeholder="Ingresa tu nombre..." 
                                className="name-input"
                                onChange={(ev) => this.setState({nombre: ev.target.value})}
                                value={this.state.nombre}
                            >
                            </input>
                        </div>
                        <div className="button-play-container">
                            <button 
                                className="button-play"
                                onClick={this.onConnectServer}
                            >Jugar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MenuPage;