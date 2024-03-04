
<template>
  <div class="home">
    <h2 class="title">Welcome to Ravenclaw</h2>

    <div class="personajes-container">
      <PersonajeCard casa="Ravenclaw" v-for="personaje in ravenclaw" :key="personaje.id" class="personaje-card" :personaje= "personaje" :fav= "favoritos">
      </PersonajeCard>
    </div>
  </div>
</template>

<script>
import personajesData from '@/assets/personajes.json';
import PersonajeCard from '@/components/PersonajeCard.vue';


export default {
  name: 'Ravenclaw',
  components: {
    PersonajeCard
  },
  data() {
    return {
      ravenclaw: [],
      favoritos: [] 
    };
  },
  mounted() {
    this.getGryffindor();
    this.getFavoritos();
  },
  methods: {
    async getFavoritos() {
      try {
        const userId = sessionStorage.getItem('userId');

        const response = await fetch(`http://localhost:3000/api/users/favoritos/${userId}`);
        const data = await response.json();
        console.log(data);
        this.favoritos = data; // Asigna los personajes favoritos a la propiedad favoritos del componente
      } catch (error) {
        console.error('Error al obtener los personajes favoritos:', error);
      }
    },
    getGryffindor() {
      this.ravenclaw = personajesData.filter(personaje => personaje.casa === 'Ravenclaw').map(personaje => {
        return {
          ...personaje,
          showDescription: false
        };
      });
    },
    toggleDescription(personaje) {
      personaje.showDescription = !personaje.showDescription;
    },
    toggleFavorito(personaje) {
      const userId = sessionStorage.getItem('userId');
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      try {
        const index = this.favoritos.findIndex(fav => fav.id === personaje.id);
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
    },
    esFavorito(personaje) {
      let fav = this.favoritos.find(fav => fav === personaje.id); // Comprueba si el personaje está en la lista de favoritos
      console.log(fav, "hola");
      return fav;
    }
  }
};
</script>

<style scoped>
/* Estilos generales */
.home {
  text-align: center;
  padding: 20px;
}

.title {
  font-size: 48px;
  color: var(--r-color);
  text-align: center;
  margin-bottom: 20px;
  text-transform: uppercase;
  font-family: 'Old Standard TT', serif;
}

.personajes-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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

.favorito-button {
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  color: var(--g-color);
  font-size: 24px;
}

.favorito {
  color: gold; 
}
</style>
