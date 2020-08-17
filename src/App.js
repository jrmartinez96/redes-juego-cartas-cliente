import React from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import MenuPage from './pages/menu/menu'
import MesaPage from './pages/mesa/mesa';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isMesaPage: false,
      chat: [],
      juego: {

      }
    }
  }

  onJoin = () => {
    const client = new W3CWebSocket('ws://localhost:8000');
    client.onopen = () => {
        console.log("open")
        client.send(JSON.stringify({prueba: "hola"}))
        this.setState({isMesaPage: true})
    }

    client.onmessage = (message) => {
      const data = JSON.parse(message.data)
      console.log(data)
    }

    client.onclose = (event) => {
      console.log("Cerrando conexión")
      this.setState({isMesaPage: false})
    }
  }

  render() {
    return (
      <div>
        {
          this.state.isMesaPage ?
          <MesaPage chat={this.state.chat} juego={this.state.juego}/>
          :
          <MenuPage onJoin={this.onJoin}/>
        }
      </div>
    );
  }
}

export default App;
