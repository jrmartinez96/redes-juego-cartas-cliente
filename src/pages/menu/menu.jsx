import React from 'react'
import './menu.css'
import { useHistory } from "react-router-dom";

class MenuPage extends React.Component {

    constructor(props) {
        super(props)
    }

    goMesa = () => {
        // let history = useHistory()
        // history.push('/mesa')
        console.log("hola")
        this.props.history.push('/mesa')
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
                            <input placeholder="Ingresa tu nombre..." className="name-input">
                            </input>
                        </div>
                        <div className="button-play-container">
                            <button 
                                className="button-play"
                                onClick={this.goMesa}
                            >Jugar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MenuPage;