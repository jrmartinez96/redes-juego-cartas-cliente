import React from 'react'
import './mesa.css'
import ChatComponent from '../../components/chat_component/ChatComponent'
import CartasManoComponent from '../../components/cartas_mano_component/CartasManoComponent'
import MesaComponent from '../../components/mesa_component/MesaComponent'

class MesaPage extends React.Component {
    constructor(props) {
        super(props)

        console.log(props)
    }

    render() {
        return (
            <div className="mesa-page">
                <div className="turno">
                    Turno de: J1
                </div>
                <MesaComponent/>
                <ChatComponent/>
                <CartasManoComponent/>
            </div>
        )
    }
}

export default MesaPage;