<template>
  <div class="WinningPercentage">
    <div class="board">
      <draggable
        class="dragArea list-group card-slot ml-1 mr-1"
        v-for="(item, index) in board"
        :key="index"
        :list="item"
        :group="{ name: 'people' }"
        @change="board_change($event, index)"
      >
        <div
          class="list-group-item card-unit-slot"
          v-for="unit in item"
          :key="unit.name"
          :style="
            'color:' +
            (unit.name[1] === 's' || unit.name[1] === 'c' ? 'black' : 'red')
          "
        >
          <div class="number">{{ unit.name[0] }}</div>
          <div class="color">
            {{
              unit.name[1]
                .replace("s", "♠️")
                .replace("c", "♣️")
                .replace("h", "♥️")
                .replace("d", "♦️")
            }}
          </div>
        </div>
      </draggable>
    </div>
    <div class="player-region">
      <div
        class="player"
        v-for="(player, player_index) in players"
        :key="player_index"
      >
        <div class="player-card">
          <draggable
            class="dragArea list-group card-slot"
            v-for="(item, index) in player"
            :key="index"
            :list="item"
            :group="{ name: 'people' }"
            @change="player_change($event, player_index, index)"
          >
            <div
              class="list-group-item card-unit-slot"
              v-for="unit in item"
              :key="unit.name"
              :style="
                'color:' +
                (unit.name[1] === 's' || unit.name[1] === 'c' ? 'black' : 'red')
              "
            >
              <div class="number">{{ unit.name[0] }}</div>
              <div class="color">
                {{
                  unit.name[1]
                    .replace("s", "♠️")
                    .replace("c", "♣️")
                    .replace("h", "♥️")
                    .replace("d", "♦️")
                }}
              </div>
            </div>
          </draggable>
        </div>
        <div class="result">
          <div class="win text">
            <span>win</span><span class="percentage">55.5</span>
          </div>
          <div class="tie text">
            <span>tie</span><span class="percentage">54.5</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card-region">
      <draggable
        class="dragArea list-group card-row"
        v-for="(color, indexCard) in cards"
        :key="indexCard"
        :list="color"
        :group="{ name: 'people', pull: 'clone', put: false }"
        @change="log"
        :clone="clone"
        :sort="false"
      >
        <div
          class="list-group-item card-unit"
          :style="'color:' + colors[indexCard]"
          v-for="unit in color"
          :key="unit.id"
        >
          <template v-if="unit.name.length !== 0">
            <div class="number">{{ unit.name[0] }}</div>
            <div class="color">
              {{
                unit.name[1]
                  .replace("s", "♠️")
                  .replace("c", "♣️")
                  .replace("h", "♥️")
                  .replace("d", "♦️")
              }}
            </div>
          </template>
        </div>
      </draggable>
    </div>

    <b-navbar type="light" variant="light" fixed="bottom">
      <div class="container-fluid">
        <b-navbar-nav align="center" :justified="justified">
          <b-nav-item @click="menu_click('reset')" active-class="active">
            <b-icon icon="arrow-clockwise" aria-hidden="true"></b-icon>
            <div class="font">重置</div>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav align="center" :justified="justified">
          <b-nav-item @click="menu_click('-')" active-class="active">
            <b-icon icon="person-dash" aria-hidden="true"></b-icon>
            <div class="font">玩家</div>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav align="center" :justified="justified">
          <b-nav-item @click="menu_click('+')" active-class="active">
            <b-icon icon="person-plus" aria-hidden="true"></b-icon>
            <div class="font">玩家</div>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav align="center" :justified="justified">
          <b-nav-item @click="menu_click('cal')" active-class="active">
            <b-icon icon="calculator" aria-hidden="true"></b-icon>
            <div class="font">計算</div>
          </b-nav-item>
        </b-navbar-nav>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import draggable from "vuedraggable";
let idGlobal = 100;
export default {
  name: "WinningPercentage",
  components: {
    draggable,
  },
  data() {
    return {
      justified: true,
      cards: [
        [
          { name: "2c", id: 2 },
          { name: "3c", id: 3 },
          { name: "4c", id: 4 },
          { name: "5c", id: 5 },
          { name: "6c", id: 6 },
          { name: "7c", id: 7 },
          { name: "8c", id: 8 },
          { name: "9c", id: 9 },
          { name: "Tc", id: 10 },
          { name: "Jc", id: 11 },
          { name: "Qc", id: 12 },
          { name: "Kc", id: 13 },
          { name: "Ac", id: 1 },
        ],
        [
          { name: "2s", id: 22 },
          { name: "3s", id: 23 },
          { name: "4s", id: 24 },
          { name: "5s", id: 25 },
          { name: "6s", id: 26 },
          { name: "7s", id: 27 },
          { name: "8s", id: 28 },
          { name: "9s", id: 29 },
          { name: "Ts", id: 210 },
          { name: "Js", id: 211 },
          { name: "Qs", id: 212 },
          { name: "Ks", id: 213 },
          { name: "As", id: 21 },
        ],
        [
          { name: "2d", id: 32 },
          { name: "3d", id: 33 },
          { name: "4d", id: 34 },
          { name: "5d", id: 35 },
          { name: "6d", id: 36 },
          { name: "7d", id: 37 },
          { name: "8d", id: 38 },
          { name: "9d", id: 39 },
          { name: "Td", id: 310 },
          { name: "Jd", id: 311 },
          { name: "Qd", id: 312 },
          { name: "Kd", id: 313 },
          { name: "Ad", id: 31 },
        ],
        [
          { name: "2h", id: 42 },
          { name: "3h", id: 43 },
          { name: "4h", id: 44 },
          { name: "5h", id: 45 },
          { name: "6h", id: 46 },
          { name: "7h", id: 47 },
          { name: "8h", id: 48 },
          { name: "9h", id: 49 },
          { name: "Th", id: 410 },
          { name: "Jh", id: 411 },
          { name: "Qh", id: 412 },
          { name: "Kh", id: 413 },
          { name: "Ah", id: 41 },
        ],
      ],
      cards_bak: [
        [
          { name: "2c", id: 2 },
          { name: "3c", id: 3 },
          { name: "4c", id: 4 },
          { name: "5c", id: 5 },
          { name: "6c", id: 6 },
          { name: "7c", id: 7 },
          { name: "8c", id: 8 },
          { name: "9c", id: 9 },
          { name: "Tc", id: 10 },
          { name: "Jc", id: 11 },
          { name: "Qc", id: 12 },
          { name: "Kc", id: 13 },
          { name: "Ac", id: 1 },
        ],
        [
          { name: "2s", id: 22 },
          { name: "3s", id: 23 },
          { name: "4s", id: 24 },
          { name: "5s", id: 25 },
          { name: "6s", id: 26 },
          { name: "7s", id: 27 },
          { name: "8s", id: 28 },
          { name: "9s", id: 29 },
          { name: "Ts", id: 210 },
          { name: "Js", id: 211 },
          { name: "Qs", id: 212 },
          { name: "Ks", id: 213 },
          { name: "As", id: 21 },
        ],
        [
          { name: "2d", id: 32 },
          { name: "3d", id: 33 },
          { name: "4d", id: 34 },
          { name: "5d", id: 35 },
          { name: "6d", id: 36 },
          { name: "7d", id: 37 },
          { name: "8d", id: 38 },
          { name: "9d", id: 39 },
          { name: "Td", id: 310 },
          { name: "Jd", id: 311 },
          { name: "Qd", id: 312 },
          { name: "Kd", id: 313 },
          { name: "Ad", id: 31 },
        ],
        [
          { name: "2h", id: 42 },
          { name: "3h", id: 43 },
          { name: "4h", id: 44 },
          { name: "5h", id: 45 },
          { name: "6h", id: 46 },
          { name: "7h", id: 47 },
          { name: "8h", id: 48 },
          { name: "9h", id: 49 },
          { name: "Th", id: 410 },
          { name: "Jh", id: 411 },
          { name: "Qh", id: 412 },
          { name: "Kh", id: 413 },
          { name: "Ah", id: 41 },
        ],
      ],
      colors: ["black", "black", "red", "red"],
      board: [[], [], [], [], []],
      board_bak: [{}, {}, {}, {}, {}],
      players: [[[], []]],
      players_bak: [[{}, {}]],
    };
  },
  methods: {
    clone({ name }) {
      return { name, id: idGlobal++ };
    },
    log: function (evt) {
      window.console.log(evt);
    },
    board_change(evt, index) {
      this.board[index].splice(0);
      this.board[index].splice(0, 1, evt.added.element);
      this.checkCard(evt.added.element.name, this.board_bak[index]);
      this.board_bak[index] = evt.added.element;
    },
    player_change(evt, player_index, index) {
      this.players[player_index][index].splice(0);
      this.players[player_index][index].splice(0, 1, evt.added.element);
      this.checkCard(
        evt.added.element.name,
        this.players_bak[player_index][index]
      );
      this.players_bak[player_index][index] = evt.added.element;
    },
    checkCard(name, bak) {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 13; j++) {
          if (JSON.stringify(bak) !== "{}") {
            if (this.cards_bak[i][j].name == bak.name) {
              this.cards[i][j] = this.cards_bak[i][j];
            }
          }
          if (this.cards[i][j].name === name) {
            this.cards[i][j].name = "";
          }
        }
      }
    },
    menu_click(button) {
      if (button === "+") {
        this.players.push([[], []]);
        this.players_bak.push([{}, {}]);
        return;
      }
      if (button === "-") {
        this.players.splice(this.players.length - 1, 1);
        this.players_bak.splice(this.players_bak.length - 1, 1);
        return;
      }
      if (button === "reset") {
        this.cards = JSON.parse(JSON.stringify(this.cards_bak));
        this.board = [[], [], [], [], []];
        this.board_bak = [{}, {}, {}, {}, {}];
        this.players = [[[], []]];
        this.players_bak = [[{}, {}]];
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.WinningPercentage {
  background-color: cadetblue;
}
.board {
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #00cc00;
  border-radius: 40px;
  border: 5px solid;
}
.player-region {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 320px;
}
.player {
  display: flex;
  flex-direction: row;
  width: 178px;
  margin: 0.2rem;
  border: solid lavenderblush;
  border-radius: 10px;
  overflow: hidden;
}
.player-card {
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #00cc00;
  width: 88px;
}
.result {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(65, 65, 65);
  width: 90px;
}
.text {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: blanchedalmond;
  font-weight: bold;
  margin: 0px 8px;
}
.tie {
  color: darkgray;
}
.percentage {
  font-size: 20px;
}
.card-region {
  display: flex;
  flex-direction: column;
  padding: 0.1rem;
  background-color: #403f3f;
}
.card-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.card-unit {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #dadae4;
  width: 7%;
  min-width: 1rem;
  height: 2rem;
  padding: 1.2rem 0.7rem;
  margin: 0.05rem 0.1rem;
  border-radius: 0.2rem;
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 1rem;
}
.card-unit-slot {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #dadae4;
  width: 100%;
  height: 100%;
  padding: 1.5rem 0.7rem;
  border-radius: 0.2rem;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 1.2rem;
}
.card-slot {
  background-color: lightsteelblue;
  border: solid #ffffff;
  width: 36px;
  height: 58px;
  margin: 0.2rem;
  border-radius: 0.4rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
}
.fixed-bottom {
  height: 6rem;
  padding: 0 2rem;
  box-shadow: 0px -8px 9px -10px #bdbdbd;
  -webkit-box-shadow: 0px -8px 9px -10px #bdbdbd;
  -moz-box-shadow: 0px -8px 9px -10px #bdbdbd;
  -o-box-shadow: 0px -8px 9px -10px #bdbdbd;
}
.navbar-expand .navbar-nav .nav-link {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.active {
  color: "black";
}
.font {
  margin-top: 0.5rem;
}
.btn .b-icon.bi,
.nav-link .b-icon.bi,
.dropdown-toggle .b-icon.bi,
.dropdown-item .b-icon.bi,
.input-group-text .b-icon.bi {
  font-size: 160%;
}
</style>
