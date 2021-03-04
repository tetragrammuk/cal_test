<template>
  <div class="ticket">
    <b-card no-body>
      <b-tabs content-class="mt-3" pills card justified>
        <b-tab
          title="二聯式發票(開給個人)"
          @click="clear"
          class="tab"
          :active="this.$route.params.id == 'ticket2'"
        >
          <div class="two">
            <div style="display:flex;flex-direction:row;align-items:flex-end;flex-wrap:wrap">
              <h2>金額</h2>
              <h6 style="margin: 0.7rem;">輸入含稅或未稅價，皆可即時推算金額</h6>
            </div>

            <b-form class="form">
              <b-form-group label="收款金額 (含稅價)" label-size="lg" label-for="price">
                <b-form-input
                  id="price"
                  v-model="formPrice.price"
                  type="text"
                  inputmode="numeric"
                  maxlength="9"
                  class="shareWidth blue_box"
                  :state="nameState"
                  aria-describedby="input-live-feedback"
                  @input="priceIn"
                ></b-form-input>
                <b-form-invalid-feedback id="price-live-feedback">請輸入數字</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group label="內含營業稅額" label-size="lg" label-for="taxPrice">
                <b-form-input
                  readonly
                  id="taxPrice"
                  v-model="formPrice.tax"
                  class="shareWidth blue_box"
                ></b-form-input>
              </b-form-group>
            </b-form>
            <b-form class="form">
              <b-form-group label-size="lg" label="稅率" label-for="taxRatio">
                <b-form-select
                  id="taxRatio"
                  v-model="formPrice.taxRatioItem"
                  :options="taxOptions"
                  @change="taxRatioIn"
                  class="blue_box"
                ></b-form-select>
              </b-form-group>
              <b-form-group label="實際銷售額 (未稅價)" label-size="lg" label-for="salePrice">
                <b-form-input
                  id="salePrice"
                  v-model="formPrice.salePrice"
                  type="text"
                  maxlength="9"
                  max="952380000"
                  class="blue_box shareWidth"
                  :state="saleState"
                  aria-describedby="input-live-feedback"
                  @input="taxRatioIn"
                ></b-form-input>
                <b-form-invalid-feedback id="sale-live-feedback">請輸入數字</b-form-invalid-feedback>
              </b-form-group>
            </b-form>
            <hr />
            <h2>發票範例圖</h2>
            <h6 style="margin: 0.7rem;word-break:normal">
              注意：自己留存第一聯存根聯、交付「第二聯收執聯」給一般消費者。
              （若有買有副聯的發票本，副聯可自行留存）
            </h6>
          </div>
          <div class="test">
            <div class="bImg2">
              <div class="canvasCnt2">{{canvasCnt}}</div>
              <div class="canvasUnit2">{{canvasTotal}}</div>
              <div class="canvasPrice2">{{canvasTotal}}</div>
              <div class="canvasTotal2">{{canvasTotal}}</div>
              <div class="canvasTotalChinese2">{{canvasTotalChinese}}</div>
              <pre class="canvasDate2">{{canvasDate}}</pre>
              <pre class="canvasDateChinese2">{{canvasDateChinese}}</pre>
              <div class="vvv2" :style="vvvStyle2">{{vvv}}</div>
            </div>
          </div>
        </b-tab>
        <b-tab
          title="三聯式發票(開給公司)"
          @click="clear"
          class="tab"
          :active="this.$route.params.id == 'ticket3'"
        >
          <div class="three">
            <div style="display:flex;flex-direction:row;align-items:flex-end;flex-wrap:wrap">
              <h2>買受人</h2>
              <h6 style="margin: 0.7rem;">輸入統編可自動查詢公司名稱，輸入公司名稱兩字以上可自動查詢統編</h6>
            </div>
            <b-form class="form">
              <b-form-group label="統一編號" label-size="lg" label-for="uniform-numbers">
                <b-form-input
                  id="uniform-numbers"
                  v-model="formCom.uniform"
                  aria-describedby="input-live-help input-live-feedback"
                  maxlength="8"
                  @input="searchCom"
                  :state="uniformState"
                  class="blue_box"
                ></b-form-input>
                <b-form-invalid-feedback id="input-live-feedback">統一編號錯誤</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group label="公司名稱 (抬頭)" label-size="lg" label-for="comName">
                <div class="comNameInput">
                  <b-form-input
                    id="comName"
                    v-model="formCom.comName"
                    @change="searchUniform"
                    @input="inputCom"
                    class="blue_box"
                  ></b-form-input>
                  <b-form-select
                    class="select blue_box"
                    v-if="comOptions.length && isShow"
                    v-model="comSelected"
                    :options="comOptions"
                    :select-size="7"
                  ></b-form-select>
                </div>
              </b-form-group>
            </b-form>
            <hr />
            <div style="display:flex;flex-direction:row;align-items:flex-end;flex-wrap:wrap">
              <h2>金額</h2>
              <h6 style="margin: 0.7rem;">輸入含稅或未稅價，皆可即時推算金額</h6>
            </div>

            <b-form class="form">
              <b-form-group label="收款金額 (含稅價)" label-size="lg" label-for="price">
                <b-form-input
                  id="price"
                  v-model="formPrice.price"
                  type="text"
                  inputmode="numeric"
                  maxlength="9"
                  class="blue_box shareWidth"
                  :state="nameState"
                  aria-describedby="input-live-feedback"
                  @input="priceIn"
                ></b-form-input>
                <b-form-invalid-feedback id="price-live-feedback">請輸入數字</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group label="營業稅額" label-size="lg" label-for="taxPrice">
                <b-form-input
                  readonly
                  id="taxPrice"
                  v-model="formPrice.tax"
                  class="blue_box shareWidth"
                ></b-form-input>
              </b-form-group>
            </b-form>
            <b-form class="form">
              <b-form-group label-size="lg" label="稅率" label-for="taxRatio">
                <b-form-select
                  id="taxRatio"
                  v-model="formPrice.taxRatioItem"
                  :options="taxOptions"
                  @change="taxRatioIn"
                  class="blue_box"
                ></b-form-select>
              </b-form-group>
              <b-form-group label="銷售額 (未稅價)" label-size="lg" label-for="salePrice">
                <b-form-input
                  id="salePrice"
                  v-model="formPrice.salePrice"
                  type="text"
                  maxlength="9"
                  max="952380000"
                  class="blue_box shareWidth"
                  :state="saleState"
                  aria-describedby="input-live-feedback"
                  @input="taxRatioIn"
                ></b-form-input>
                <b-form-invalid-feedback id="sale-live-feedback">請輸入數字</b-form-invalid-feedback>
              </b-form-group>
            </b-form>
            <hr />
            <h2>發票範例圖</h2>
            <h6 style="margin: 0.7rem;word-break:normal">
              注意：自己留存第一聯存根聯、交付「第二聯扣抵聯」跟「第三聯收執聯」給客戶。
              （若有買有副聯的發票本，副聯可自行留存）
            </h6>
          </div>
          <div class="test">
            <div class="bImg3">
              <pre class="canvasCom">{{canvasCom}}</pre>
              <div class="canvasNumbers">{{canvasNumbers}}</div>
              <div class="canvasCnt">{{canvasCnt}}</div>
              <div class="canvasUnit">{{canvasUnit}}</div>
              <div class="canvasPrice">{{canvasPrice}}</div>
              <div class="canvasSale">{{canvasSale}}</div>
              <div class="canvasTax">{{canvasTax}}</div>
              <div class="canvasTotal">{{canvasTotal}}</div>
              <div class="canvasTotalChinese">{{canvasTotalChinese}}</div>
              <pre class="canvasDate">{{canvasDate}}</pre>
              <pre class="canvasDateChinese">{{canvasDateChinese}}</pre>
              <div class="vvv" :style="vvvStyle3">{{vvv}}</div>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ticket",
  data() {
    return {
      canvasCom: "必 填",
      canvasNumbers: "必填",
      canvasCnt: 1,
      canvasUnit: "",
      canvasPrice: "",
      canvasSale: "",
      canvasTax: "",
      canvasTotal: "",
      canvasTotalChinese: "",
      canvasDate: "",
      canvasDateChinese: "",
      vvv: "V",
      vvvStyle2: "left:16rem",
      vvvStyle3: "right:36.5rem",
      fOneTime: "",
      isShow: false,
      uniformState: null,
      comSelected: -1,
      comOptions: [],
      formCom: {
        uniform: "",
        comName: ""
      },
      taxOptions: [
        { value: 0, text: "應稅(5%)" },
        { value: 1, text: "零稅率(0%)" },
        { value: 2, text: "免稅" }
      ],
      formPrice: {
        price: 0,
        tax: 0,
        taxRatioItem: 0,
        salePrice: 0
      },
      res: {},
      resCom: {},
      ratio: 0.04761905,
      regex: /^[0-9\s]*$/,
      int2ChineseMap: [
        "零",
        "壹",
        "貳",
        "參",
        "肆",
        "伍",
        "陸",
        "柒",
        "捌",
        "玖"
      ],
      int2ChineseMap2: [
        "O",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九"
      ]
    };
  },
  created() {
    var today = new Date();
    let year = today.getFullYear() - 1911;
    let month = today.getMonth() + 1;
    let date = today.getDate();
    this.canvasDate = year + "   " + month + "    " + date;

    this.canvasDateChinese =
      this.int2ChineseMap2[year.toString()[0]] +
      this.int2ChineseMap2[year.toString()[1]] +
      this.int2ChineseMap2[year.toString()[2]] +
      "   ";

    let month2 =
      (Math.ceil(month / 2) * 2 - 1).toString() +
      (Math.ceil(month / 2) * 2).toString();
    if (month2.length == 2) {
      this.canvasDateChinese =
        this.canvasDateChinese +
        " " +
        this.int2ChineseMap2[parseInt(month2[0])] +
        "    " +
        this.int2ChineseMap2[parseInt(month2[1])];
    } else if (month2.length == 3) {
      this.canvasDateChinese =
        this.canvasDateChinese +
        " " +
        this.int2ChineseMap2[parseInt(month2[0])] +
        "    " +
        "十";
    } else {
      this.canvasDateChinese =
        this.canvasDateChinese +
        "十" +
        this.int2ChineseMap2[parseInt(month2[1])] +
        "  " +
        "十" +
        this.int2ChineseMap2[parseInt(month2[3])];
    }

    // for (let i = 0; i < month2.length / 2; i++) {
    //   this.canvasDateChinese =
    //     this.canvasDateChinese + this.int2ChineseMap2[month2[i]];
    // }
    // this.canvasDateChinese = this.canvasDateChinese + "   ";
    // for (let i = month2.length / 2; i < month2.length; i++) {
    //   this.canvasDateChinese =
    //     this.canvasDateChinese + this.int2ChineseMap2[month2[i]];
    // }
  },
  watch: {
    comSelected: "comSelectedChange"
  },
  computed: {
    nameState() {
      return this.regex.test(this.formPrice.price) ? null : false;
    },
    saleState() {
      return this.regex.test(this.formPrice.salePrice) ? null : false;
    }
  },
  methods: {
    canvasChange() {
      this.canvasUnit = this.formPrice.salePrice;
      this.canvasPrice = this.formPrice.salePrice;
      this.canvasSale = this.formPrice.salePrice;
      this.canvasTotal = this.formPrice.price;
      this.canvasTax = this.formPrice.tax;
      this.canvasTotalChinese = "";
      for (let i = 0; i < this.canvasTotal.toString().length; i++) {
        this.canvasTotalChinese =
          this.canvasTotalChinese +
          this.int2ChineseMap[parseInt(this.canvasTotal.toString()[i])];
      }
    },
    inputCom() {
      this.canvasCom = this.formCom.comName;
    },
    taxRatioIn() {
      switch (this.formPrice.taxRatioItem) {
        case 0:
          this.vvvStyle2 = "left:16rem";
          this.vvvStyle3 = "right:36.5rem";
          this.formPrice.price = Math.round(
            this.formPrice.salePrice / (1 - this.ratio)
          );
          this.formPrice.tax = this.formPrice.price - this.formPrice.salePrice;
          break;
        case 1:
          this.vvvStyle2 = "left:23rem";
          this.vvvStyle3 = "right:32.5rem";
          this.formPrice.tax = 0;
          this.formPrice.price = this.formPrice.salePrice;
          break;
        case 2:
          this.vvvStyle2 = "left:30rem";
          this.vvvStyle3 = "right:28.5rem";
          this.formPrice.tax = 0;
          this.formPrice.price = this.formPrice.salePrice;
          break;
        default:
          this.$message.error("Something Wrong!");
      }
      this.canvasChange();
    },
    priceIn() {
      switch (this.formPrice.taxRatioItem) {
        case 0:
          this.formPrice.tax = Math.round(this.formPrice.price * this.ratio);
          this.formPrice.salePrice = this.formPrice.price - this.formPrice.tax;
          break;
        case 1:
          this.formPrice.tax = 0;
          this.formPrice.salePrice = this.formPrice.price;
          break;
        case 2:
          this.formPrice.tax = 0;
          this.formPrice.salePrice = this.formPrice.price;
          break;
        default:
          this.$message.error("Something Wrong!");
      }
      this.canvasChange();
    },
    comSelectedChange() {
      this.formCom.comName = this.comOptions[this.comSelected].text;
      this.canvasCom = this.comOptions[this.comSelected].text;
      this.formCom.uniform = this.resCom[this.comSelected].統一編號;
      this.canvasNumbers = this.resCom[this.comSelected].統一編號;
      this.isShow = false;
    },
    searchUniform() {
      axios({
        method: "get",
        baseURL: "https://company.g0v.ronny.tw/api/search?q=",
        url: this.formCom.comName,
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        if (response.status == 200) {
          console.log(response);
          this.comOptions = [];
          this.resCom = response.data.data;
          let i;
          for (i = 0; i < response.data.data.length; i++) {
            let name;
            if (response.data.data[i].hasOwnProperty("商業名稱")) {
              name = response.data.data[i].商業名稱;
            }
            if (response.data.data[i].hasOwnProperty("公司名稱")) {
              name = response.data.data[i].公司名稱;
            }
            this.comOptions.push({
              value: i,
              text: name
            });
          }
          this.isShow = true;
        } else {
          this.$message.error("error！");
        }
      });
    },
    searchCom() {
      this.canvasNumbers = this.formCom.uniform;
      if (this.fOneTime == this.formCom.uniform) return;
      this.fOneTime = this.formCom.uniform;
      // console.log(this.formCom.uniform);
      if (this.formCom.uniform.length < 8) {
        this.uniformState = null;
        return;
      }
      // console.log("go");
      axios({
        method: "get",
        baseURL: "https://company.g0v.ronny.tw/api/show/",
        url: this.formCom.uniform,
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        if (response.status == 200) {
          console.log(response.data.data.財政部);
          this.res = response.data.data.財政部;
          if (JSON.stringify(response.data.data.財政部) == "{}") {
            this.uniformState = false;
          } else {
            this.uniformState = true;
            this.formCom.comName = response.data.data.財政部.營業人名稱;
            this.canvasCom = this.formCom.comName;
          }
        } else {
          this.$message.error("error！");
        }
      });
    },
    clear() {
      // console.log("123");
      this.canvasCom = "必 填";
      this.canvasNumbers = "必填";
      this.canvasCnt = 1;
      this.canvasUnit = "";
      this.canvasPrice = "";
      this.canvasSale = "";
      this.canvasTax = "";
      this.canvasTotal = "";
      this.canvasTotalChinese = "";
      // this.canvasDate = "";
      // this.canvasDateChinese = "";
      this.vvv = "V";
      this.vvvStyle3 = "right:36.5rem";
      this.fOneTime = "";
      this.isShow = false;
      this.uniformState = null;
      this.comSelected = -1;
      this.comOptions = [];

      this.formCom = {
        uniform: "",
        comName: ""
      };
      this.formPrice = {
        price: 0,
        tax: 0,
        taxRatioItem: 0,
        salePrice: 0
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  border-radius: 1rem;
}
.tabs {
  border-radius: 1rem;
}

h2 {
  font-weight: bold;
}
hr {
  width: 100%;
  border-top: 3px solid rgb(0 0 0 / 28%);
}
.form {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.form-group {
  display: flex;
  flex-direction: column;
  align-items: baseline;
}
.blue_box {
  width: 17rem;
}
.form-control {
  border: 4px solid #2196f3;
  border-radius: 0.6rem;
}
.custom-select {
  border: 4px solid #2196f3;
  border-radius: 0.6rem;
}
.comNameInput {
  position: relative;
}
.select {
  position: absolute;
  left: 0;
  top: 37px;
}
.three {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}
.tab {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.shareWidth {
  /* max-width: 160px; */
}
.taxWidth {
  min-width: 160px;
}
.bImg2 {
  position: relative;
  width: 51rem;
  height: 30rem;
  background: url(https://storage.googleapis.com/line_emoji/101/two.jpg);
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 100% auto;
  margin: 20px auto;
}
.bImg3 {
  position: relative;
  width: 51rem;
  height: 30rem;
  background: url(https://storage.googleapis.com/line_emoji/101/three.jpg);
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 100% auto;
  margin: 20px auto;
}
.test {
  /* max-width: 100%; */
  /* height: 375.92px; */
  /* background-color: brown; */
  /* overflow: scroll; */
  width: 100%;
  overflow-x: auto;
}
.canvasCom {
  position: absolute;
  color: cornflowerblue;
  left: 8rem;
  top: 3.7rem;
  font-weight: bold;
  font-size: 1.4rem;
}
.canvasNumbers {
  position: absolute;
  color: cornflowerblue;
  left: 8.5rem;
  top: 5.5rem;
  font-weight: bold;
  font-size: 1.5rem;
  letter-spacing: 0.85rem;
}
.canvasCnt {
  position: absolute;
  color: cornflowerblue;
  font-size: 1.5rem;
  font-weight: bold;
  left: 16.5rem;
  top: 10.5rem;
}
.canvasUnit {
  position: absolute;
  color: cornflowerblue;
  font-size: 1rem;
  font-weight: bold;
  right: 27.5rem;
  top: 11rem;
}
.canvasPrice {
  position: absolute;
  color: cornflowerblue;
  font-size: 1.5rem;
  font-weight: bold;
  right: 19.2rem;
  top: 10.5rem;
}
.canvasSale {
  position: absolute;
  color: cornflowerblue;
  font-size: 1.5rem;
  font-weight: bold;
  right: 19.2rem;
  top: 19.1rem;
}
.canvasTax {
  position: absolute;
  color: cornflowerblue;
  font-size: 1.5rem;
  font-weight: bold;
  right: 19.2rem;
  top: 21.2rem;
}
.canvasTotal {
  position: absolute;
  color: cornflowerblue;
  font-size: 1.5rem;
  font-weight: bold;
  right: 19.2rem;
  top: 22.9rem;
}
.canvasTotalChinese {
  position: absolute;
  color: cornflowerblue;
  font-size: 1.2rem;
  font-weight: bold;
  right: 18.7rem;
  top: 25rem;
  letter-spacing: 1.54rem;
}
.canvasDate {
  position: absolute;
  color: cornflowerblue;
  left: 27.5rem;
  top: 5.7rem;
  font-weight: bold;
  font-size: 1rem;
}
.canvasDateChinese {
  position: absolute;
  color: cornflowerblue;
  left: 19.5rem;
  top: 2.7rem;
  font-weight: bold;
  font-size: 1rem;
}
.vvv {
  position: absolute;
  color: cornflowerblue;
  font-size: 1.2rem;
  font-weight: bold;
  top: 21.7rem;
}

.canvasCnt2 {
  position: absolute;
  color: cornflowerblue;
  font-size: 1.5rem;
  font-weight: bold;
  left: 15.5rem;
  top: 9.7rem;
}
.canvasUnit2 {
  position: absolute;
  color: cornflowerblue;
  font-size: 1rem;
  font-weight: bold;
  right: 27.8rem;
  top: 10.2rem;
}
.canvasPrice2 {
  position: absolute;
  color: cornflowerblue;
  font-size: 1.5rem;
  font-weight: bold;
  right: 19.2rem;
  top: 9.7rem;
}
.canvasTotal2 {
  position: absolute;
  color: cornflowerblue;
  font-size: 1.5rem;
  font-weight: bold;
  right: 19.2rem;
  top: 20.9rem;
}
.canvasTotalChinese2 {
  position: absolute;
  color: cornflowerblue;
  font-size: 1.2rem;
  font-weight: bold;
  right: 18.9rem;
  top: 22.7rem;
  letter-spacing: 1.54rem;
}
.canvasDate2 {
  position: absolute;
  color: cornflowerblue;
  left: 25.5rem;
  top: 3.65rem;
  font-weight: bold;
  font-size: 1rem;
}
.canvasDateChinese2 {
  position: absolute;
  color: cornflowerblue;
  left: 21.2rem;
  top: 2.5rem;
  font-weight: bold;
  font-size: 1rem;
}
.vvv2 {
  position: absolute;
  color: cornflowerblue;
  font-size: 1.2rem;
  font-weight: bold;
  top: 24.15rem;
}
</style>
