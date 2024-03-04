<template>
  
  <div class="home">

    <h1 class="custom-title" :style="{ color: currentColor }">Welcome to Hogwarts</h1>

    <div class="houses">

      <div class="house1">
        <img src="@/assets/gryffindor.png" alt="Gryffindor">
        
        <div>
          <a href="Gryffindor">
            <button class="botonG">Gryffindor</button>
          </a>
        </div>
      </div>

      <div class="house2">
        <img src="@/assets/hufflepuff.png" alt="Hufflepuff">
        <div>
          <a href="Hufflepuff">
            <button class="botonH">Hufflepuff</button>
          </a>
        </div>
      </div>

      <div class="house3">
        <img src="@/assets/ravenclaw.png" alt="Ravenclaw">
        <div>
          <a href="Ravenclaw">
            <button class="botonR">Ravenclaw</button>
          </a>
        </div>
      </div>

      
      <div class="house4">
        <img src="@/assets/slytherin.png" alt="Slytherin">
        <div>
          <a href="Slytherin">
            <button class="botonS">Slytherin</button>
          </a>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
export default {
  data() {
    return {
      colors: ['#e1bc17', '#1749e1', '#0f951c', '#800e0e'],
      currentColorIndex: 0,
      currentColor: '#800000'
    };
  },
  mounted() {
    setInterval(this.changeColor, 3000);
  },
  methods: {
    changeColor() {
      this.currentColor = this.colors[this.currentColorIndex];
      this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
    }
  }
};
</script>


<style scoped>

.custom-title {
  font-size: 3rem;
  margin-bottom: 100px;
  font-family: 'Old Standard TT', serif;
  text-transform: uppercase;
  transition: color 2s; 
}
@media (max-width: 768px) {
  .custom-title {
    font-size: 2rem; 
   }
}
.home {
  text-align: center;
  padding: 20px;
}

.houses {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-bottom: 100px;
}

.house1,
.house2,
.house3,
.house4 {
  width: 50%;
  margin-bottom: 20px;
}

.house1:hover {
  filter: drop-shadow(0 0 15px var(--g-color))
}

.house2:hover {
  filter: drop-shadow(0 0 15px var(--h-color))
}

.house3:hover {
  filter: drop-shadow(0 0 15px var(--r-color))
}

.house4:hover {
  filter: drop-shadow(0 0 15px var(--s-color))
}

.house img {
  width: 100%;
  border-radius: 8px;
  aspect-ratio: 3/2;
  object-fit: contain;
}

.house p {
  margin-top: 5px;
  font-weight: bold;
}

.botonG {
  padding: 10px 20px;
  background-color: #800e0e;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 40px;
}

.botonH {
  padding: 10px 20px;
  background-color: #e1bc17;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 50px;

}

.botonR {
  padding: 10px 20px;
  background-color: #1749e1;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 30px;

}

.botonS {
  padding: 10px 20px;
  background-color: #0f951c;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 30px;

}

</style>

