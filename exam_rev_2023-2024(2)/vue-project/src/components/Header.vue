<template>
  <header class="header">
    <a href="#" class="logo">
      <img src="@/assets/logo.png" alt="Logo de mi web">
    </a>
    <nav class="navbar">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/game">Game</RouterLink>
      <RouterLink to="/favoritos">Favoritos</RouterLink>
      <RouterLink to="/chat">Chat</RouterLink>
      <div class="user-icon" @mouseenter="showDropdown" @mouseleave="hideDropdown">
        <i class="fas fa-user"></i>
        <ul class="dropdown" v-if="isDropdownOpen">
          <li v-show="!hasToken">
            <RouterLink to="/register">Register</RouterLink>
          </li>
          <li v-show="!hasToken">
            <RouterLink to="/login">Login</RouterLink>
          </li>
          <li>
            <RouterLink to="/update">Update</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'Header',
  components: {
    RouterLink,
  },
  data() {
    return {
      isDropdownOpen: false,
      hasToken: sessionStorage.getItem('token')
    }
  },
  methods: {
    showDropdown() {
      this.isDropdownOpen = true;
    },
    hideDropdown() {
      this.isDropdownOpen = false;
    }
  }
}
</script>

<style scoped>

.dropdown {
  display: none;
  position: absolute;
  background-color: var(--g-color);
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2); 
  z-index: 1;
  border-radius: 5px; 
}

.dropdown li {
  list-style: none;
  padding: 10px;
}

.dropdown li:hover {
  background-color: var(--second-bg-color);
}

.dropdown li a {
  font-size: 1.4rem;
  color: var(--text-color);
  text-decoration: none;
}

.dropdown li:not(:last-child) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2); 
}

.navbar {
  display: flex;
  align-items: center;
}
.navbar a:nth-child(4) {
  margin-right: 2rem; /* Agrega un margen derecho al elemento "Chat" */
}

.user-icon {
  position: relative;
  cursor: pointer;
  margin-left: auto; 
  margin-bottom: -5px; 
}

.user-icon:hover .dropdown {
  display: block;
}


.user-icon i {
  font-size: 1.3rem;
  color: var(--text-color);
  margin-right: 1rem;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem 9%; /* Ajusta el valor de padding */
  background-color: var(--second-bg-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  transition: padding 0.3s; /* Agrega una transición suave al cambio de padding */
}

.header.sticky {
  border-bottom: 0.1rem solid rgba(0, 0, 0, 0.2);
}

.logo {
  text-decoration: none;
  font-size: 2.5rem;
  color: var(--text-color);
  font-weight: 600;
  cursor: default;
}

.navbar a {
  text-decoration: none;
  font-size: 1.7rem;
  color: var(--text-color);
  margin-left: 2rem; 
  transition: 0.3s;
}

.navbar a:hover,
.navbar a.active {
  color: var(--main-color);
}

a img {
  width: 80px; /* Ajusta el tamaño de la imagen */
  height: 80px; /* Ajusta el tamaño de la imagen */
  border-radius: 50%;
  object-fit: cover;
  margin-right: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: white;
}
</style>
