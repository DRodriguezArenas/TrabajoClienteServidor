<template>
  <div class="game">
    <h1>Juego de Cartas: Hogwarts</h1>
    <button v-show="!gameStarted" @click="startGame" class="start-button">Iniciar Juego</button> <!-- Nuevo botón para iniciar el juego -->    <div v-if="gameStarted" class="player-container">
      <div class="player">
        <h2>Jugador 1</h2>
        <div class="hand">
          <div 
            class="card" 
            v-for="card in player1Hand" 
            :key="card.id" 
            @click="selectCard(card, 'player1')"
            @mouseenter="showStats(card, 'player1')"
            @mouseleave="hideStats(card, 'player1')"
            :class="{ 'selected': selectedCardPlayer1 === card }">
            <div class="card-content">
              <div class="front">
                <img :src="card.imagen" :alt="card.personaje" class="icon">
                <h3>{{ card.personaje }}</h3>
              </div>
              <div class="back" v-show="selectedCardPlayer1 === card || (hoveredCardPlayer1 === card && !selectedCardPlayer1)">
                <div class="stats">
                  <p><strong>Ataque:</strong> {{ card.ataque }}</p>
                  <p><strong>Defensa:</strong> {{ card.defensa }}</p>
                  <p><strong>Vida:</strong> {{ card.vida }}</p>
                  <p><strong>Velocidad:</strong> {{ card.velocidad }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="player">
        <h2>Jugador 2</h2>
        <div class="hand">
          <div 
            class="card" 
            v-for="card in player2Hand" 
            :key="card.id" 
            @click="selectCard(card, 'player2')"
            @mouseenter="showStats(card, 'player2')"
            @mouseleave="hideStats(card, 'player2')"
            :class="{ 'selected': selectedCardPlayer2 === card }">
            <div class="card-content">
              <div class="front">
                <img :src="card.imagen" :alt="card.personaje" class="icon">
                <h3>{{ card.personaje }}</h3>
              </div>
              <div class="back" v-show="selectedCardPlayer2 === card || (hoveredCardPlayer2 === card && !selectedCardPlayer2)">
                <div class="stats">
                  <p><strong>Ataque:</strong> {{ card.ataque }}</p>
                  <p><strong>Defensa:</strong> {{ card.defensa }}</p>
                  <p><strong>Vida:</strong> {{ card.vida }}</p>
                  <p><strong>Velocidad:</strong> {{ card.velocidad }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <button v-if="gameStarted" @click="battle" class="battle-button">¡Luchar!</button> <!-- Botón para luchar -->    <div class="winner">
      <h2 v-if="winner !== null && winner !== 'Empate'">{{ winner }} gana la batalla.</h2>
      <h2 v-else-if="winner === 'Empate'">Empate</h2>
      <h2 v-else> </h2> <!-- No muestra nada si winner es null -->
    </div>
  </div>
</template>

<script>
import personajesData from '@/assets/personajes.json';

export default {
  name: 'GameView',
  data() {
    return {
      gameStarted: false,
      player1Hand: [],
      player2Hand: [],
      selectedCardPlayer1: null,
      selectedCardPlayer2: null,
      hoveredCardPlayer1: null,
      hoveredCardPlayer2: null,
      winner: null
    };
  },
  created() {
  },
  methods: {
    setupGame() {
      // Obtener una copia de las cartas para barajarlas
      const shuffledCards = [...personajesData];
      // Barajar las cartas
      for (let i = shuffledCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
      }
      
      // Dividir las cartas barajadas en dos mitades
      const midIndex = Math.floor(shuffledCards.length / 2);
      // Asignar la primera mitad al jugador 1 y la segunda al jugador 2
      this.player1Hand = shuffledCards.slice(0, midIndex);
      this.player2Hand = shuffledCards.slice(midIndex);
    },
    selectCard(card, player) {
      if (player === 'player1') {
        this.selectedCardPlayer1 = card;
      } else if (player === 'player2') {
        this.selectedCardPlayer2 = card;
      }
    },
    showStats(card, player) {
      if (player === 'player1') {
        this.hoveredCardPlayer1 = card;
      } else if (player === 'player2') {
        this.hoveredCardPlayer2 = card;
      }
    },
    hideStats(card, player) {
      if (player === 'player1') {
        this.hoveredCardPlayer1 = null;
      } else if (player === 'player2') {
        this.hoveredCardPlayer2 = null;
      }
    },
    calculatePower(card, opponentsHand) {
      const attack = card.ataque;
      const defense = card.defensa;
      const speed = card.velocidad;
      const life = card.vida;
      const power = attack - defense;
      return { power, card, life };
    },
    battle() {
      // Validar que ambas cartas estén seleccionadas
      if (!this.selectedCardPlayer1 || !this.selectedCardPlayer2) {
        console.error('Selecciona una carta para cada jugador antes de luchar.');
        return;
      }

      let player1Life = this.selectedCardPlayer1.vida;
      let player2Life = this.selectedCardPlayer2.vida;

      // Bucle while que se repite hasta que una de las cartas tenga 0 o menos vida
      while (player1Life > 0 && player2Life > 0) {
        // Obtener las estadísticas de las cartas seleccionadas
        const player1 = this.selectedCardPlayer1;
        const player2 = this.selectedCardPlayer2;
        const player1Attack = player1.ataque;
        const player1Defense = player1.defensa;
        const player1Speed = player1.velocidad;

        const player2Attack = player2.ataque;
        const player2Defense = player2.defensa;
        const player2Speed = player2.velocidad;

        // Calcular el poder de ataque de cada jugador
        const player1Power = player1Attack - player2Defense;
        const player2Power = player2Attack - player1Defense;

        // Determinar quién ataca primero basado en la velocidad
        let attacker, defender;
        if (player1Speed > player2Speed) {
          attacker = player1;
          defender = player2;
        } else if (player2Speed > player1Speed) {
          attacker = player2;
          defender = player1;
        } else {
          // Si las velocidades son iguales, seleccionar aleatoriamente un atacante
          const randomIndex = Math.random() < 0.5 ? 0 : 1;
          const players = [player1, player2];
          attacker = players[randomIndex];
          defender = players[1 - randomIndex];
        }

        // Realizar la batalla y actualizar la vida de las cartas
        if (player1Power > 0) {
          defender.vida = Math.max(0, defender.vida - player1Power);
        } else {
          defender.vida = Math.max(0, defender.vida - 20); // Incluso si la defensa es más alta que el ataque, el defensor recibe 20 de daño
        }

        if (player2Power > 0) {
          attacker.vida = Math.max(0, attacker.vida - player2Power);
        } else {
          attacker.vida = Math.max(0, attacker.vida - 20); // Incluso si la defensa es más alta que el ataque, el atacante recibe 20 de daño
        }

        // Actualizar las vidas de las cartas para el siguiente ciclo del bucle
        player1Life = this.selectedCardPlayer1.vida;
        player2Life = this.selectedCardPlayer2.vida;
      }

      // Determinar al ganador después de que el bucle while haya terminado
      if (player1Life <= 0) {
        this.winner = this.selectedCardPlayer2.personaje;
        const index = this.player1Hand.indexOf(this.selectedCardPlayer1);
        if (index !== -1) {
          this.player1Hand.splice(index, 1);
        }
      } else {
        this.winner = this.selectedCardPlayer1.personaje;
        const index = this.player2Hand.indexOf(this.selectedCardPlayer2);
        if (index !== -1) {
          this.player2Hand.splice(index, 1);
        }
      }

      if (this.player1Hand.length === 0) {
        this.winner = 'Jugador 2';
      } else if (this.player2Hand.length === 0) {
          this.winner = 'Jugador 1';
        }


      // Reiniciar las cartas seleccionadas después de la batalla
      this.selectedCardPlayer1 = null;
      this.selectedCardPlayer2 = null;
    },
    startGame() {
      this.setupGame(); // Llama a setupGame al hacer clic en el botón "Iniciar Juego"
      this.gameStarted = true;
    }
  }
};
</script>


<style scoped>

h1{
  text-align: center;
  margin-bottom: 20px;
}
.game {
  text-align: center;
}

.player-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.player {
  width: 45%;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
}

.hand {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.stats {
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  padding: 5px 10px;
  position: absolute;
  top: 50%; /* Centra verticalmente */
  left: 50%; /* Centra horizontalmente */
  transform: translate(-50%, -50%); /* Centra la caja de estadísticas */
  width: 80%; /* Ajusta el ancho según tus preferencias */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* Sombra suave */
}

.stats p {
  margin: 5px 0;
}

.card {
  cursor: pointer;
  width: 150px;
  height: 200px;
  margin: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  position: relative; /* Asegura que la posición relativa para las estadísticas funcione correctamente */
  transition: transform 0.3s ease;
  perspective: 1000px; /* Agregar perspectiva para la animación 3D */
}

.card:hover .front {
  display: none;
}

.card-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.front, .back {
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
  padding: 10px;
}

.icon {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}

.selected {
  border: 3px solid var(--main-color);
}

.battle-button {
  background-color: var(--second-bg-color);   
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 50px;
  margin-top: 50px;
}

.start-button {
  background-color: var(--second-bg-color);   
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 450px;
  margin-top: 50px;
}

.battle-button:hover, .start-button:hover {
  background-color: var(--second-bg-color);
}

.winner {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 40px;
}

.back:not(:hover) {
  display: none;
}

.card:hover .back {
  display: block;
}



</style>