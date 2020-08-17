import React from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import MenuPage from './pages/menu/menu'
import MesaPage from './pages/mesa/mesa';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isMesaPage: false,
      connection: "",
      chat: [],
      juego: {
        gameId: "",
        turnoId: "",
        players:[],
        cartasJugador:{stack:[]},
        cartaBasura:{cartaId:"", nombreCarta: ""},
        cantidadCartas:[],
        cantidadCartasBaraja: 0,
        mesa: [],
      },
      gameId: "",
      playerId: "",
      ganadorId: "",
      turnoId: ""
    }
  }

  onJoin = (name) => {
    // const client = new W3CWebSocket('ws://localhost:8000');
    // const client = new W3CWebSocket('ws://redes-proyecto-1-conquian.herokuapp.com/');
    const client = new W3CWebSocket('wss://redes-proyecto-1-conquian.herokuapp.com/');
    
    client.onopen = () => {
        console.log("open")

        // Enviar nombre de usuario al crear conexión
        client.send(JSON.stringify({opcion: 0, nombre: name}))
        this.setState({connection: client})
    }

    client.onmessage = (message) => {
      const data = JSON.parse(message.data)
      const { opcion } = data

      console.log(data)

      if (opcion === 1) { // Si se recibe gameid y playerid asignado por el servidor
        this.setState({
          gameId: data.gameId,
          playerId: data.playerId,
          isMesaPage: true
        })
      } else if (opcion === 0) { // Si el estado del juego cambia
        this.setState({
          juego: {...data, opcion: undefined}
        })
      } else if (opcion === 2) { // Si el juego llega a terminar

        let nombre = ""

        this.state.juego.players.forEach(player => {
          if (player.playerId === data.ganadorId) {
            nombre = player.playerName
          }
        })

        store.addNotification({
          title: "El juego ha terminado",
          message: `El ganador ha sido ${nombre}`,
          type: "success",
          insert: "top",
          container: "top-left",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });

        this.setState({
          ganadorId: data.ganadorId
        })

      } else if (opcion === 3) { // si llega un mensaje del chat
        let nombre = ""

        this.state.juego.players.forEach(player => {
          if (player.playerId === data.playerId) {
            nombre = player.playerName
          }
        })

        this.setState({
          chat: [
            ...this.state.chat, 
            {
              message: data.mensaje,
              nombre: nombre
            }]
        })
      } else if (opcion === 4) { // Si llega un error del servidor
        console.log("Server error: ", data)
        store.addNotification({
          title: "Error",
          message: data.mensaje,
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

    client.onclose = (event) => {
      this.setState({isMesaPage: false, connection: ""})
      store.addNotification({
        title: "Advertencia",
        message: "Se cerró la conexión con el servidor",
        type: "warning",
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

  render() {
    return (
      <div>
        <ReactNotification />
        {
          this.state.isMesaPage ?
          <MesaPage gameId={this.state.gameId} playerId={this.state.playerId} chat={this.state.chat} juego={this.state.juego} connection={this.state.connection}/>
          :
          <MenuPage onJoin={this.onJoin} connection={this.state.connection}/>
        }
      </div>
    );
  }
}

export default App;
