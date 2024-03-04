<template>
    <div class="personaje-card" :class="casaClass">
    <div class="front-back-container">
          <div class="front">
            <div class="personaje-image-container">
              <img :src="personaje.imagen" :alt="personaje.personaje" class="personaje-imagen">
            </div>
            <h2 class="personaje-name">{{ personaje.personaje }}</h2>
            <button class="ver-mas-button" @click="toggleDescription(personaje)">
              Ver más
            </button>
            <button class="favorito-button" @click="toggleFavorito(personaje)">
              <i :class="['fas', 'fa-star', { 'favorito': esFavorito }]"></i>
            </button>
            <p v-if="personaje.showDescription" class="personaje-description">{{ personaje.descripcion }}</p>
          </div>
        </div>
    </div>
</template>

<script>
import personajesData from '@/assets/personajes.json';

export default {
  name: 'Slytherin',
  props: ['personaje', 'favoritos', 'casa'],
  setup(props) {
    // setup() receives props as the first argument.
    console.log(props.personaje)
    console.log(props.favoritos, "hola")

  },
  computed: {
    casaClass() {
      return this.casa.toLowerCase();
    }
  },
  data() {
    return {
      slytherin: [],
      favoritos: [],
      esFavorito: true
    };
  },
  mounted() {
    console.log(this.personaje);
    this.getGryffindor();
    this.getFavoritos();
    this.esFavorito = false;
    
  },
  methods: {
    async getFavoritos() {
      try {
        const userId = sessionStorage.getItem('userId');

        const response = await fetch(`http://localhost:3000/api/users/favoritos/${userId}`);
        const data = await response.json();
        console.log("favs", data);
        console.log(data);
        this.favoritos = data; // Asigna los personajes favoritos a la propiedad favoritos del componente
      } catch (error) {
        console.error('Error al obtener los personajes favoritos:', error);
      }

      this.initFav(this.personaje);
    },
    getGryffindor() {
      this.gryffindor = personajesData.filter(personaje => personaje.casa === 'Slytherin').map(personaje => {
        return {
          ...personaje,
          showDescription: false
        };
      });
    },
    toggleDescription(personaje) {
      personaje.showDescription = !personaje.showDescription;
    },
    async toggleFavorito(personaje) {
      const userId = sessionStorage.getItem('userId');
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      try {
        await this.getFavoritos();
        const index = this.favoritos.findIndex(fav => fav == personaje.id);

        console.log("Indice",index);
        console.log("Personaje", personaje.id);
        if (index !== -1) {
          this.favoritos.splice(index, 1); // Elimina el personaje de la lista de favoritos

         
          var raw = JSON.stringify({
                "userId": userId,
                "personajeId": personaje.id
            });

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`http://localhost:3000/api/users/favoritos/${personaje.id}`, requestOptions)
                .then(response => response.text())
                .then(result => {
                  console.log(result);
                })
                .catch(error => console.error('error', error));
        } else {
          this.favoritos.push(personaje); // Agrega el personaje a la lista de favoritos
          var raw = JSON.stringify({
                "userId": userId,
                "personajeId": personaje.id
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:3000/api/users/favoritos/agregar", requestOptions)
                .then(response => response.text())
                .then(result => {
                  console.log(result);
                })
                .catch(error => console.error('error', error));
        }
      } catch (error) {
        console.error('Error al cambiar el estado de favorito:', error);
      }
      this.updateFav();
    },
    updateFav() {
        this.esFavorito = !this.esFavorito;
    },
    initFav(personaje) {
      this.esFavorito = true;
          this.esFavorito = this.favoritos.find(fav => {
            console.log(fav, "---", personaje.id)
        return fav === personaje.id
    }); 

    }
  }
};
</script>

<style scoped>
/* Estilos generales */
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

.slytherin .ver-mas-button {
  background-color: var(--s-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.gryffindor .ver-mas-button {
  background-color: var(--g-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.ravenclaw .ver-mas-button {
  background-color: var(--r-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.hufflepuff .ver-mas-button {
  background-color: var(--h-color);
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

.slytherin .favorito-button {
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  color: var(--s-color);
  font-size: 24px;
}

.gryffindor .favorito-button {
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  color: var(--g-color);
  font-size: 24px;
}

.ravenclaw .favorito-button {
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  color: var(--r-color);
  font-size: 24px;
}

.hufflepuff .favorito-button {
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  color: var(--h-color);
  font-size: 24px;
}

.favorito {
  color: gold; 
}
</style>
