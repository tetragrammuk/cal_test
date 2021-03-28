<template>
  <div class="fillcontain">
    <b-card no-body>
      <h1 style="margin-bottom:2.5rem;margin-top:1rem">設定清單條件</h1>
      <div class="incomePage">
        <b-form class="form2" ref="form2" :model="form2">
          <b-form-group
            label="清單名稱"
            label-size="lg"
            label-class="font-weight-bold"
            label-for="incomePage_5"
          >
            <b-col>
              <b-form-input
                class="incomePage_5 blue_box"
                :state="nameState"
                aria-describedby="input-live-feedback"
                v-model="form2.listName"
                @change="clear()"
              ></b-form-input>
              <b-form-invalid-feedback id="input-live-feedback">請輸入清單名稱</b-form-invalid-feedback>
            </b-col>
          </b-form-group>
          <b-form-group
            label-size="lg"
            label-class="font-weight-bold"
            label="選擇協會"
            label-for="incomePage_10"
          >
            <b-col>
              <multiselect
                class="incomePage_10 blue_box"
                v-model="form2.list"
                :options="options"
                :multiple="true"
                group-values="libs"
                group-label="language"
                :group-select="true"
                :closeOnSelect="false"
                placeholder="Type to search"
                track-by="name"
                label="name"
              >
                <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
              </multiselect>
              <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
            </b-col>
          </b-form-group>
          <b-form-group
            label-size="lg"
            label-class="font-weight-bold"
            label="每個禮拜"
            label-for="incomePage_10"
          >
            <b-col>
              <multiselect
                class="incomePage_10 blue_box"
                v-model="form2.date"
                label="name"
                track-by="code"
                :options="optionsDate"
                :multiple="true"
				:closeOnSelect="false"
              ></multiselect>

              <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
            </b-col>
          </b-form-group>
        </b-form>
        <div style="display:flex;flex-direction: column">
          <div>
            <b-button type="reset" variant="outline-success" @click="reset">取消</b-button>
            <b-button type="button" variant="outline-primary">確定</b-button>
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import ticket from "./ticket";
import Multiselect from "vue-multiselect";
export default {
  name: "calculator",
  components: {
    ticket,
    Multiselect
  },
  props: {},
  computed: {
    nameState() {
      return this.form2.listName.length > 0 ? true : false;
    }
  },
  data() {
    return {
      options: [
        {
          language: "Javascript",
          libs: [
            { name: "Vue.js", category: "Front-end" },
            { name: "Adonis", category: "Backend" }
          ]
        },
        {
          language: "Ruby",
          libs: [
            { name: "Rails", category: "Backend" },
            { name: "Sinatra", category: "Backend" }
          ]
        },
        {
          language: "Other",
          libs: [
            { name: "Laravel", category: "Backend" },
            { name: "Phoenix", category: "Backend" }
          ]
        }
      ],
      value: [],
      optionsDate: [
        { name: "全部", code: 0 },
        { name: "一", code: 1 },
        { name: "二", code: 2 },
        { name: "三", code: 3 },
        { name: "四", code: 4 },
        { name: "五", code: 5 },
        { name: "六", code: 6 },
        { name: "日", code: 7 }
      ],
      valueDate: [],
      APIbaseURL: "https://theflowchat.com:5001",
      form2: {
        listName: "",
        list: [],
        date: []
      }
    };
  },
  created() {},
  methods: {
    reset() {
      this.clear();
    },
    clear() {}
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="less" scoped>
.fillcontain {
  padding-top: 20px;
}

.selector-for-some-widget {
  box-sizing: content-box;
}
.incomePage {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-control {
  border: 4px solid #2196f3;
  border-radius: 0.6rem;
}
.custom-select {
  border: 4px solid #2196f3;
  border-radius: 0.6rem;
}
.multiselect {
  border: 4px solid #2196f3;
  border-radius: 0.6rem;
}
.blue_box {
  width: 14rem;
}
.blue_box_in {
  width: 15rem;
}
.form2 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-group {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  flex-flow: wrap;
}
.form-group-in-box {
  display: flex;
  flex-direction: column;
  align-items: baseline;
}
.input-group-text {
  color: #ffffff;
  background-color: #2196f3;
  border: 1px solid #2196f3;
}
.row-item {
  // border: 1px solid #2196f3;
  position: relative;
}
</style>
