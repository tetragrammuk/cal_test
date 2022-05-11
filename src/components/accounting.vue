<template>
  <div class="main">
    <div class="form-box">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group label="賽事類型" v-slot="{ ariaDescribedby }">
          <b-form-radio-group
            v-model="form.radio"
            :options="gameTypeOptions"
            :aria-describedby="ariaDescribedby"
            name="radio-inline"
          ></b-form-radio-group>
        </b-form-group>
        <div class="cash" v-if="form.radio === 'A'">
          <b-form-group
            id="input-group-cash"
            label="買入"
            label-for="input-cash"
            required
          >
            <b-form-input
              id="input-cash"
              v-model="form.cashin"
              placeholder=""
              required
              type="number"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="cashout" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.cashout"
              placeholder=""
              required
              type="number"
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="MTT" v-else>
          <b-form-group
            id="input-group-unit"
            label="單組買入金額"
            label-for="input-unit"
            required
          >
            <b-form-input
              id="input-unit"
              v-model="form.buyin"
              placeholder=""
              required
              type="number"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-count"
            label="買入組數"
            label-for="input-count"
            required
          >
            <b-form-input
              id="input-count"
              v-model="form.buyinCount"
              :state="buyinCountState"
              placeholder=""
              required
              type="number"
              aria-describedby="input-live-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="input-live-feedback">
              組數需大於等於1
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="input-group-2" label="獲得獎金" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.prize"
              placeholder=""
              required
              type="number"
            ></b-form-input>
          </b-form-group>
        </div>
        <label for="example-datepicker">Choose a date</label>
        <b-form-datepicker
          id="example-datepicker"
          v-model="form.date"
          class="mb-2"
        ></b-form-datepicker>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "accounting",
  components: {},
  data() {
    return {
      gameTypeOptions: [
        { text: "現金桌", value: "A" },
        { text: "錦標賽", value: "B" },
      ],
      form: {
        radio: "A",
        cashin: 0,
        buyin: 0,
        buyinCount: 1,
        cashout: 0,
        prize: 0,
        date: "",
      },
    };
  },
  computed: {
    buyinCountState() {
      return this.form.buyinCount >= 1 ? true : false;
    },
  },
  mounted() {
    document.documentElement.style = "background-color: #212122";
    let date = new Date();
    this.form.date = date.toISOString().split("T")[0];
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(event) {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  background-color: azure;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-box {
  width: 90%;
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
