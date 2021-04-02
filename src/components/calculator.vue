<template>
  <div class="fillcontain" id="fillcontain">
    <div class="incomePage">
      <b-form class="form2" ref="form2" :model="form2">
        <b-form-group
          label="清單名稱"
          label-size="lg"
          label-class="font-weight-bold"
          label-for="incomePage_5"
        >
          <b-form-input
            class="incomePage_5 blue_box"
            placeholder="請輸入清單名稱"
            v-model="form2.listName"
            @change="clear()"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label-size="lg"
          label-class="font-weight-bold"
          :label="this.$route.params.id == 'online'? '選擇APP':'選擇協會'"
          label-for="incomePage_10"
        >
          <el-select
            class="incomePage_10 blue_box"
            v-model="form2.list"
            multiple
            placeholder="請選擇協會"
          >
            <el-option-group v-for="group in options" :key="group.location" :label="group.location">
              <el-option
                v-for="item in group.libs"
                :key="item.brand_id"
                :label="item.brand_key"
                :value="item.brand_id"
              ></el-option>
            </el-option-group>
          </el-select>
        </b-form-group>
        <b-form-group
          label-size="lg"
          label-class="font-weight-bold"
          label="每個禮拜"
          label-for="incomePage_11"
        >
          <el-select
            class="incomePage_11 blue_box"
            v-model="form2.date"
            multiple
            placeholder="請選擇星期"
          >
            <el-option
              v-for="item in optionsDate"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </b-form-group>
        <b-form-group
          v-if="this.$route.params.id == 'online'"
          label-size="lg"
          label-class="font-weight-bold"
          label="報名費用"
          label-for="incomePage_12"
        >
          <el-select
            class="incomePage_12 blue_box"
            v-model="form2.date"
            multiple
            placeholder="請選擇星期"
          >
            <el-option
              v-for="item in optionsDate"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </b-form-group>
        <span v-if="checkSelect" class="updateBtn" style="color:red">請輸入欄位</span>
        <b-button class="updateBtn2" type="button" variant="primary" @click="update">確定</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import liff from "@line/liff";
export default {
  name: "calculator",
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
      },
      LiffId: "1655804827-Qjn65NyB",
      userId: ""
    };
  },
  mounted() {
    liff
      .init({
        liffId: this.LiffId
      })
      .then(() => {
        var os = liff.getOS();
        // console.log("OS : " + os);
        if (os == "web") {
          document.getElementById("fillcontain").innerHTML =
            "<p class='content'>請至智慧型手機使用相關功能！</p>";
          return;
        } else {
          liff
            .getProfile()
            .then(profile => {
              this.userId = profile.userId;
            //   console.log("userId ", this.userId);
            //   console.log("userName ", this.userName);
            })
            .catch(error => {
              console.log("getProfile", error);
            });
        }
      })
      .catch(error => {
        console.log("LiffInit", error);
      });
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
        console.debug(res);
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
      let jsonData = {
        track_name: this.form2.listName,
        user_id: this.userId,
        brand_list: this.form2.list,
        week_list: this.form2.date
      };
      //   console.debug(jsonData);
      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/track_list/update",
        data: jsonData,
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        console.debug(res);
        if (res.data == "error") {
          liff.sendMessages([
            {
              type: "text",
              text: "設定錯誤，且洽客服"
            }
          ]);
        } else {
          liff.sendMessages([
            {
              type: "text",
              text: "追蹤清單"
            }
          ]);
		}
		liff.closeWindow();
      });
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="less" scoped>
.fillcontain {
  padding-top: 20px;
}
.updateBtn {
  margin-bottom: 1rem;
  width: 100%;
  font-weight: bold;
  border-radius: 0.6rem;
  margin-top: 1rem;
}
.updateBtn2 {
  margin-bottom: 1rem;
  width: 100%;
  font-weight: bold;
  border-radius: 0.6rem;
  margin-top: 1rem;
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
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
  //   border: 4px solid #2196f3;
  //   border-radius: 0.6rem;
}
.custom-select {
  //   border: 4px solid #2196f3;
  //   border-radius: 0.6rem;
}
.el-select /deep/ .el-input__inner {
  border: 1px solid #ced4da;
  min-height: 38px;
  //   border-radius: 0.6rem;
}
.el-tag/deep/.el-tag--info /deep/.el-tag__close {
  color: #6c757d;
}
.el-select /deep/.el-select__tags {
  .el-tag {
    background-color: #67c23a;
    border-color: #67c23a;
    color: #ffffff;
    .el-icon-close {
      background-color: #67c23a;
      right: -7px;
      top: 0;
      color: #6c757d;
    }
  }
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
  flex-direction: column;
  align-items: baseline;
  margin-bottom: 0.3rem;
}
/deep/ .col-form-label-lg {
  margin-bottom: 0px;
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
