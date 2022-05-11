<template>
  <div class="main">
    <div class="six">
      <div class="position">
        <div class="pos-line">
          <div class="pos-seats">
            <div id="CO" class="seat left-top" @click="seatClick('CO')">CO</div>
            <div id="BTN" class="seat right-top" @click="seatClick('BTN')">
              BTN
              <div class="dealer">D</div>
            </div>
            <div id="SB" class="seat right" @click="seatClick('SB')">SB</div>
            <div id="BB" class="seatBB right-bottom" @click="seatClick('BB')">
              BB
            </div>
            <div id="UTG" class="seat left-bottom" @click="seatClick('UTG')">
              UTG
            </div>
            <div id="HJ" class="seat left" @click="seatClick('HJ')">HJ</div>
          </div>
        </div>
      </div>
      <div class="table">
        <img :src="imgSrc" width="100%" alt="error" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "startTable",
  components: {},
  data() {
    return {
      imgSrc: "",
    };
  },
  mounted() {
    document.documentElement.style = "background-color: #212122";
    this.seatClick("UTG");
  },
  methods: {
    seatClick(posName) {
      if(posName === 'BB') return;
      let collSeats = document.getElementsByClassName("seat");
      for (let i = 0, len = collSeats.length; i < len; i++) {
        collSeats[i].style.color = "white";
        collSeats[i].style.border = "2px solid white";
      }
      document.getElementById(posName).style.color = "#06d1ab";
      document.getElementById(posName).style.border = "3px solid #06d1ab";
      this.imgSrc = `${require("../assets/poker/" + posName + ".jpeg")}`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .table {
  background-image: url("../assets/poker/UTG.jpeg");
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
} */
.position {
  background-color: #212122;
  width: 100%;
  height: 14rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.pos-line {
  width: 76%;
  height: 8rem;
  border: 1px solid white;
  border-radius: 999px;
}
.pos-seats {
  width: 100%;
  height: 100%;
  --player-circle-size: 4em;
  position: relative;
}
.seat {
  border-radius: 50%;
  background-color: #212122;
  height: var(--player-circle-size);
  width: var(--player-circle-size);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  padding: 0 0.25rem;
  font-size: 0.8rem;
  color: white;
  font-weight: bold;
  line-height: 1.1;
}
.seatBB {
  border-radius: 50%;
  background-color: #212122;
  height: var(--player-circle-size);
  width: var(--player-circle-size);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid gray;
  padding: 0 0.25rem;
  font-size: 0.8rem;
  color: gray;
  font-weight: bold;
  line-height: 1.1;
}
.dealer {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  background-color: white;
  left: -16px;
  bottom: -4px;
  border-radius: 50%;
  color: black;
  font-weight: 700;
  line-height: 1.1;
}
.left-top {
  top: calc(var(--player-circle-size) / 2 * -1);
  bottom: calc(100% - var(--player-circle-size) / 2);
  right: calc(70% - var(--player-circle-size) / 2);
}
.right-top {
  top: calc(var(--player-circle-size) / 2 * -1);
  bottom: calc(100% - var(--player-circle-size) / 2);
  right: calc(30% - var(--player-circle-size) / 2);
}
.right-bottom {
  top: calc(100% - var(--player-circle-size) / 2);
  bottom: calc(100% - var(--player-circle-size) / 2);
  right: calc(30% - var(--player-circle-size) / 2);
}
.left-bottom {
  top: calc(100% - var(--player-circle-size) / 2);
  bottom: calc(var(--player-circle-size) / 2 * -1);
  right: calc(70% - var(--player-circle-size) / 2);
}
.left {
  top: calc(50% - var(--player-circle-size) / 2);
  bottom: calc(50% - var(--player-circle-size) / 2);
  right: calc(100% - var(--player-circle-size) / 2);
  left: calc(var(--player-circle-size) / 2 * -1);
}
.right {
  top: calc(50% - var(--player-circle-size) / 2);
  bottom: calc(50% - var(--player-circle-size) / 2);
  left: calc(100% - var(--player-circle-size) / 2);
  right: calc(var(--player-circle-size) / 2 * -1);
}

h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
