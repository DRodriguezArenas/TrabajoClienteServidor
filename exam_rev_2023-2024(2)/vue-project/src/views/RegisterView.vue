<template>
    <div class="registration-container">
        <h2>Registro de Usuario</h2>
        <form @submit.prevent="registerUser">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="userData.username" required>
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="userData.email" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="userData.password" required>
            </div>
            <div>
                <button type="submit">Registrar</button>
                <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
                <button @click="goToLogin" type="submit" v-if="errorMessage" id="iniciarSesion">Iniciar Sesión</button>
            </div>
        </form>
    </div>
</template>
 

<script>

import router from '@/router/index.js';

export default {
    data() {
        return {
            userData: {
                username: '',
                email: '',
                password: ''
            },
            errorMessage: ''
        }
    },
    methods: {
        registerUser() {
            var username = this.userData.username;
            var email = this.userData.email;
            var password = this.userData.password;

            console.log("Usuario:", username);
            console.log("Correo electrónico:", email);
            console.log("Contraseña:", password);

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "name": username,
                "email": email,
                "password": password,
                "isAdmin": false,
                "personajes": []
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:3000/api/users/register", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    if (result.message) {
                        this.errorMessage = 'El usuario ya existe, inicia sesión.';
                    } else {
                        this.errorMessage = '';
                        router.push('/login');
                    }
                })
                .catch(error => {
                console.error('error', error);
                this.errorMessage = 'El usuario ya existe, inicia sesión.';
                });
        },
        goToLogin() {
            router.push({ name: 'login' });
        }
    }
}

</script>

<style scoped>
   body:has(.registration-container) {
    margin: 0;
    padding: 0;
    height: 100vh;
    background-image: url(https://images.pexels.com/photos/32237/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260);
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Estilos para el contenedor del formulario */
.registration-container {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.9); /* Fondo semi-transparente */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Sombra */
    margin: 200px auto; /*Centra el contenedor horizontalmente*/
}

/* Estilos para el título del formulario */
.registration-container h2 {
    text-align: center;
    font-weight: bold;
    margin-bottom: 20px; /* Espacio adicional debajo del título */
}

/* Estilos para los campos del formulario */
.registration-container label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
}

.registration-container input[type="text"],
.registration-container input[type="email"],
.registration-container input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
}

/* Estilos para el botón de enviar */
.registration-container button[type="submit"] {
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

.registration-container button[type="submit"]:hover {
    background-color: var(--bg-color);
}

.error-message {
    color: red; /* Color del texto rojo */
    font-size: 14px; /* Tamaño de fuente */
    margin-top: 20px; /* Espacio superior */
    text-align: center; /* Alineación centrada */
    font-weight: bold; /* Texto en negrita */
}

</style>