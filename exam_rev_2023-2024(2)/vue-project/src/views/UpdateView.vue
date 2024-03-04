<template>
  <div class="update-user-container">
    <h2>Actualizar Usuario</h2>
    <form @submit.prevent="updateUser">
      <div>
        <label for="username">Nuevo Username:</label>
        <input type="text" id="username" v-model="newUserData.username" required>
      </div>
      <div>
        <label for="email">Nuevo Email:</label>
        <input type="email" id="email" v-model="newUserData.email" required>
      </div>
      <div>
        <label for="password">Nueva Password:</label>
        <input type="password" id="password" v-model="newUserData.password" required>
      </div>
      <div>
        <button type="submit">Actualizar</button>
      </div>
    </form>
    <!-- Mostrar el mensaje de actualización -->
    <div v-if="mensaje" class="mensaje-actualizacion">{{ mensaje }}</div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            newUserData: {
                username: '',
                email: '',
                password: ''
            },
            mensaje: '' // Variable para almacenar el mensaje de actualización
        }
    },
    methods: {
        updateUser() {
            var username = this.newUserData.username;
            var email = this.newUserData.email;
            var password = this.newUserData.password;

            var myHeaders = new Headers();

            var token = sessionStorage.getItem('token');
            var userId = sessionStorage.getItem('userId');

            myHeaders.append("Authorization", token);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "name": username,
                "email": email,
                "password": password,
                "isAdmin": false
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:3000/api/users/"+userId, requestOptions)
                .then(response => response.text())
                .then(result => {
                    this.mensaje = "Usuario actualizado correctamente.";
                    console.log(result);
                })
                .catch(error => console.log('error', error));
        }
    }
}
</script>

<style scoped>
   body:has(.update-user-container) {
    margin: 0;
    padding: 0;
    height: 100vh;
    background-color: var(--second-bg-color);
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Estilos para el contenedor del formulario */
.update-user-container {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.9); /* Fondo semi-transparente */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Sombra */
    margin: 200px auto; /* Centra el contenedor horizontalmente */
}

/* Estilos para el título del formulario */
.update-user-container h2 {
    text-align: center;
    font-weight: bold;
    margin-bottom: 20px; /* Espacio adicional debajo del título */
}

/* Estilos para los campos del formulario */
.update-user-container label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
}

.update-user-container input[type="text"],
.update-user-container input[type="email"],
.update-user-container input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
}

/* Estilos para el botón de enviar */
.update-user-container button[type="submit"] {
    background-color: var(--second-bg-color);
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
    display: block; /* Asegura que el botón se extienda a lo ancho del contenedor */
    margin-top: 15px; /* Espacio entre los campos y el botón */
}

.update-user-container button[type="submit"]:hover {
    background-color: var(--bg-color);
}

/* Estilos adicionales para el mensaje de actualización */
.mensaje-actualizacion {
    color: #4CAF50;
    text-align: center;
    padding: 10px;
    margin-top: 20px;
}
</style>
