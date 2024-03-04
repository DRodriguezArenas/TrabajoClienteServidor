    <style scoped>
    
body:has(.login-container) {
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
.login-container {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.9); /* Fondo semi-transparente */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Sombra */
    margin: 250px auto; /* Centra el contenedor horizontalmente */
}

/* Estilos para el título del formulario */
.login-container h2 {
    text-align: center;
    font-weight: bold;
    margin-bottom: 20px; /* Espacio adicional debajo del título */
}

/* Estilos para los campos del formulario */
.login-container label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
}

.login-container input[type="email"],
.login-container input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
}

/* Estilos para el botón de enviar */
.login-container button[type="submit"] {
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

.login-container button[type="submit"]:hover {
    background-color: var(--bg-color);
}

.error-message {
    color: red; /* Color del texto rojo */
    font-size: 14px; /* Tamaño de fuente */
    margin-bottom: 20px; /* Espacio superior */
    text-align: center; /* Alineación centrada */
    font-weight: bold; /* Texto en negrita */
}

    </style>

<template>
    <div class="login-container">
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <h2>Iniciar sesión</h2>
        <form @submit.prevent="loginUser">
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="userData.email" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="userData.password" required>
            </div>
            <div>
                <button type="submit">Iniciar sesión</button>
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
                email: '',
                password: ''
            },
            errorMessage: ''
        }
    },
    methods: {
            loginUser() {
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;

            console.log("Email:", email);
            console.log("Contraseña:", password);

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "email": email,
                "password": password
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:3000/api/users/login", requestOptions)
                .then(response => response.json())
                .then(result => {
                console.log('Resultado de la solicitud:', result); 
                console.log('UserId:', result.user._id)
                if (result && result.token) {
                    sessionStorage.setItem('token', result.token);
                    sessionStorage.setItem('userId', result.user._id);
                    sessionStorage.setItem('username', result.user.name);
                    console.log('Token guardado en sessionStorage:', result.token);
                    router.push({ name: 'home' });
                } else {
                    console.log('No se pudo obtener el token.');
                }
            })
            .catch(error => {
                console.error('error', error);
                this.errorMessage = 'Email o contraseña incorrectos';
                });
            }
    }
}
</script>
