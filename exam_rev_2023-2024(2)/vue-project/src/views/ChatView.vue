<template>
  <div v-if="user">
    <div class="chat-container">
      <h2 class="title">Chat</h2>    
      <div id="mensajes">
        <div v-for="(msg, index) in mensajes" :key="index">
          <strong>{{ msg.usuario }}:</strong> {{ msg.mensaje }}
        </div>
      </div>
      <div class="input-container">
        <input type="text" v-model="mensaje" placeholder="Escribe tu mensaje...">
        <button @click="enviarMensaje" class="send-button">Enviar</button>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="message">Inicia sesión para acceder a este contenido</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

let user;
let mensajes = ref([]);

if (sessionStorage.getItem('token')) {
  user = sessionStorage.getItem('username');
} else {
  user = null;
}
const ws = new WebSocket('ws://localhost:3000');

ws.onmessage = function (event) {
  const datos = JSON.parse(event.data);

  mensajes.value.push({
    usuario: datos.usuario,
    mensaje: datos.mensaje
  });
};

function enviarMensaje() {
    const mensajeTexto = document.querySelector('input').value;
    if(mensajeTexto !== ''){
        ws.send(JSON.stringify({
            usuario: user,
            mensaje: mensajeTexto
        }));

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "usuario": user,
        "mensaje": mensajeTexto
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/api/users/chat", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        document.querySelector('input').value = '';
    }
}

onMounted(async () => {
    try {
        const response = await fetch('http://localhost:3000/api/users/chat', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        mensajes.value = result;
    } catch (error) {
        console.error('Error al obtener los mensajes:', error);
    }
});

</script>

<style scoped>
#mensajes {
  border: 2px solid var(--g-color);
  padding: 20px;
  margin-bottom: 20px;
  height: 300px;
  overflow-y: scroll;
}

.message {
  text-align: center;
  font-size: 30px;
  color: red;
  margin-bottom: 400px;
  margin-top: 360px;
}

#mensajes div {
  margin-bottom: 15px;
  border: 1px solid var(--g-color);
  padding: 10px;
  border-radius: 8px;
  background-color: #f2f2f2;
}

#mensajes div strong {
  color: var(--g-color);
  font-weight: bold;
}

.input-container {
  display: flex; /* Utiliza flexbox para alinear elementos */
  justify-content: flex-end; /* Alinea los elementos al final del contenedor */
  align-items: center; /* Centra verticalmente los elementos */
  margin-bottom: 200px;
}

input[type="text"] {
  padding: 10px;
  margin-right: 10px;
  border: 1px solid var(--g-color);
  border-radius: 4px;
}

.send-button {
  background-color: var(--second-bg-color);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.send-button:hover {
  background-color: var(--g-color);
}

.title {
  font-size: 48px;
  color: var(--g-color);
  text-align: center;
  margin-bottom: 20px;
  text-transform: uppercase;
  font-family: 'Old Standard TT', serif;
}
</style>