import React from 'react'
import './menu.css'



class MenuPage extends React.Component {

    onConnectServer = () => {
        this.props.onJoin()
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