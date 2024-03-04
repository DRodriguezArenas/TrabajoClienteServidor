<template>
  <div class="home">
    <h2 class="title">Personajes favoritos</h2>
    <div class="personajes-container" v-if="user">
      <p v-if="favoritos.length === 0" class="no-favoritos">No tienes personajes favoritos</p>
      <div v-else>
        <div v-for="personaje in favoritos" :key="personaje.id" class="personaje-card">
          <div class="front-back-container">
            <div class="front">
              <div class="personaje-image-container">
                <img :src="personaje.imagen" :alt="personaje.personaje" class="personaje-imagen">
              </div>
              <h2 class="personaje-name">{{ personaje.personaje }}</h2>
              <button class="ver-mas-button" @click="toggleDescription(personaje)">
                Ver más
              </button>
              <p v-if="personaje.showDescription" class="personaje-description">{{ personaje.descripcion }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="no-favoritos">Inicia sesión para acceder a favoritos</p>
  </div>
</template>

<script>
import personajesData from '@/assets/personajes.json';

export default {
  name: 'FavoritosView',
  data() {
    return {
      favoritos: [],
      user: null
    };
  },
  mounted() {
    this.user = sessionStorage.getItem('userId');
    if (this.user) {
      this.getFavoritos();
    }
  },
  methods: {
    async getFavoritos() {
      try {
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(`http://localhost:3000/api/users/favoritos/${userId}`);
        const data = await response.json();
        for (let i = 0; i < data.length; i++) {
          const personajeFavorito = personajesData.find(personaje => personaje.id === data[i]);
          if (personajeFavorito) {
            this.favoritos.push(personajeFavorito);
          }
        }
      } catch (error) {
        console.error('Error al obtener los personajes favoritos:', error);
      }
    },
    toggleDescription(personaje) {
      personaje.showDescription = !personaje.showDescription;
    }
  }
};
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
}

.title {
  font-size: 48px;
  color: var(--g-color);
  text-align: center;
  margin-bottom: 20px;
  text-transform: uppercase;
  font-family: 'Old Standard TT', serif;
}
.personajes-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 90px;
}

.personaje-card {
  width: 300px;
  height: 400px;
  perspective: 1000px;
  margin: 15px;
  position: relative;
}

.front-back-container {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 10px;
  background-color: #f2f2f2;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.front {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.personaje-image-container {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.personaje-imagen {
  max-width: 100%;
  max-height: 100%;
  border-radius: 5px;
}

.personaje-name {
  margin-top: 20px;
  font-size: 24px;
  font-family: 'Old Standard TT', serif;
}

.ver-mas-button {
  background-color: var(--g-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.personaje-description {
  text-align: center;
  margin-top: 10px;
  max-height: 100px;
  overflow-y: auto;
}

.no-favoritos {
  text-align: center;
  font-size: 30px;
  color: red;
  margin-bottom: 300px;
  margin-top: 200px;
}



</style>