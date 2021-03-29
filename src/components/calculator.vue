<template>
  <div class="fillcontain" id="fillcontain">
    <b-card no-body>
      <h1 style="margin-top:1rem" id="welcome"></h1>
      <h1 style="margin-bottom:2.5rem;">請設定清單條件</h1>
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
                class="incomePage_5 blue_box_in"
                placeholder="請輸入清單名稱"
                v-model="form2.listName"
                @change="clear()"
              ></b-form-input>
            </b-col>
          </b-form-group>
          <b-form-group
            label-size="lg"
            label-class="font-weight-bold"
            :label="this.$route.params.id == 'online'? '選擇APP':'選擇協會'"
            label-for="incomePage_10"
          >
            <b-col>
              <multiselect
                class="incomePage_10 blue_box"
                v-model="form2.list"
                :options="options"
                :multiple="true"
                :searchable="false"
                :selectLabel="''"
                :selectGroupLabel="''"
                :deselectLabel="''"
                :deselectGroupLabel="''"
                group-values="libs"
                group-label="location"
                :group-select="true"
                :closeOnSelect="false"
                track-by="brand_key"
                label="brand_key"
              >
                <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
              </multiselect>
              <!-- <pre class="language-json"><code>{{ form2.list  }}</code></pre> -->
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
                :searchable="false"
                :selectLabel="''"
                :selectGroupLabel="''"
                :deselectLabel="''"
                :deselectGroupLabel="''"
                :options="optionsDate"
                :multiple="true"
                :closeOnSelect="false"
              ></multiselect>

              <!-- <pre class="language-json"><code>{{ form2.date  }}</code></pre> -->
            </b-col>
          </b-form-group>
          <b-form-group
            v-if="this.$route.params.id == 'online'"
            label-size="lg"
            label-class="font-weight-bold"
            label="報名費用"
            label-for="incomePage_10"
          >
            <b-col>
              <multiselect
                class="incomePage_10 blue_box"
                v-model="form2.cost"
                label="name"
                track-by="code"
                :searchable="false"
                :selectLabel="''"
                :selectGroupLabel="''"
                :deselectLabel="''"
                :deselectGroupLabel="''"
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
            <b-button type="button" variant="outline-primary" @click="update">確定</b-button>
          </div>
          <span v-if="checkSelect" style="color:red">請輸入欄位</span>
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
      checkSelect: false,
      options: [],
      value: [],
      optionsDate: [
        { name: "一", code: 0 },
        { name: "二", code: 1 },
        { name: "三", code: 2 },
        { name: "四", code: 3 },
        { name: "五", code: 4 },
        { name: "六", code: 5 },
        { name: "日", code: 6 }
      ],
      valueDate: [],
      APIbaseURL: "https://hey300dollars.com/api/poker",
      form2: {
        listName: "",
        list: [],
        date: [],
        cost: []
      }
    };
  },
  mounted() {
    //document.getElementById("title").innerHTML = "會員綁定";
    if (this.$route.query.name)
      document.getElementById("welcome").innerHTML =
        "Hi! " + this.$route.query.name;
    if (this.$route.query.os == "web")
      document.getElementById("fillcontain").innerHTML =
        "<p class='content'>請至智慧型手機使用相關功能！</p>";
  },
  created() {
    if (this.$route.params.id == "online") {
      // axios({
      //   method: "post",
      //   baseURL: this.APIbaseURL,
      //   url: "/brand_list/get"
      // }).then(res => {
      //   this.options = res.data.data;
      // });
    } else {
      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/brand_list/get"
      }).then(res => {
        this.options = res.data.data;
      });
    }
  },
  methods: {
    reset() {
      this.clear();
    },
    clear() {},
    update() {
      if (this.$route.params.id == "online") {
        if (
          this.form2.list.length == 0 ||
          this.form2.cost.length == 0 ||
          this.form2.date.length == 0 ||
          this.form2.listName == ""
        ) {
          this.checkSelect = true;
          return;
        }
      } else {
        if (
          this.form2.list.length == 0 ||
          this.form2.date.length == 0 ||
          this.form2.listName == ""
        ) {
          this.checkSelect = true;
          return;
        }
      }
      this.checkSelect = false;
      let brand_list = [];
      let week_list = [];
      for (let i = 0; i < this.form2.list.length; i++) {
        brand_list.push(this.form2.list[i].brand_id);
      }
      for (let i = 0; i < this.form2.date.length; i++) {
        week_list.push(this.form2.date[i].code);
      }
      let jsonData = {
        track_name: this.form2.listName,
        user_id: this.$route.query.uid,
        brand_list: brand_list,
        week_list: week_list
      };
      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/track_list/update",
        data: jsonData,
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {});
    }
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
  width: 15rem;
}
.blue_box_in {
  width: 15.5rem;
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
