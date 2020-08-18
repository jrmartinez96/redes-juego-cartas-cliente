import React from 'react'
import './instrucciones.css'

export const InstruccionesComponent = (props) => {
    return(
        <div className="instrucciones-page">
            <div className="instrucciones-container">
                <div className="cerrar-btn" onClick={() => {props.onCerrar()}}>
                    Cerrar
                </div>
                Instrucciones
                <ul>
                    <li>El objetivo del juego es quedarse sin cartas.</li>
                    <li>Cada jugador empieza con 9 cartas cada uno y se reparten aleatoriamente.</li>
                    <li>En tu turno tienes que seleccionar 3 cartas, 2 de ellas deben de ser para bajar a la mesa y la tercera para pagar.</li>
                    <li>Las 2 cartas para bajar a la mesa deben de formar una escalera o un trio con la carta de basura</li>
                    <li>La tercera carta que se utiliza para pagar se ira sobre la pila de basura</li>
                    <li>Si no puedes formar ni una escalera o trio puedes pasar tu turno</li>
                    <li>Si todos los jugadores pasan turno en una vuelta se agarrará la carta que se encuentre hasta arriba del "deck" y se pondra en la pila de basura</li>
                    <li>Si el deck se llega a quedar sin cartas y ningun jugador se ha quedado sin cartas gana el que tenga menos cartas</li>
                </ul>
                <br/>
                <br/>
                Sobre el Chat
                <ul>
                    <li>Puedes hablar con los demás jugadores por medio del chat</li>
                    <li>Para enviar un mensaje solo escribe en el input y presina Enter</li>
                    <li>Puedes esconder el chat presionando la barra naranja</li>
                </ul>
            </div>
        </div>
    )
}