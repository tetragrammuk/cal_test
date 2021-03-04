<template>
  <div class="fillcontain">
    <b-container>
      <b-tabs content-class="mt-3" pills>
        <b-tab
          title="扣繳計算機"
          :active="this.$route.params.id == 'cal_rent' || this.$route.params.id == 'cal_income'"
        >
          <b-card no-body>
            <b-tabs content-class="mt-3" pills card justified>
              <b-tab title="租金" class="rentPage_tab" :active="this.$route.params.id == 'cal_rent'">
                <h1 style="margin-bottom:2.5rem;margin-top:1rem">租金扣繳計算機</h1>
                <div class="rentPage">
                  <!-- <h5>租金扣繳計算機</h5> -->
                  <b-form class="form">
                    <b-form-group
                      label-size="lg"
                      label-class="font-weight-bold"
                      label="房東　"
                      label-for="choise"
                    >
                      <b-col style="display: flex;flex-wrap: wrap;flex-direction: row;align-items: flex-end;">
                        <!-- <b-tabs pills id="choise">
                          <b-tab title="個人" @click="choiseTabs('個人')" active></b-tab>
                          <b-tab title="公司" @click="choiseTabs('公司')"></b-tab>
                        </b-tabs>-->
                        <b-form-select
                          class="blue_box choise"
                          v-model="choise"
                          :options="choiseOptions"
                          @change="clear()"
                        ></b-form-select>
                        <b-button
                          v-if="choise == '個人'"
                          type="button"
                          v-b-toggle="'collapse-2'"
                          class="ml-2 mt-2 addLandlordBtn"
                        >進階設定</b-button>
                      </b-col>
                    </b-form-group>
                    <b-collapse v-if="choise == '個人'" id="collapse-2" class="mb-5">
                      <b-card align="center">
                        <div
                          v-for="(item, index) in aLandlord"
                          :key="index"
                          class="divInSetting mb-3"
                        >
                          <hr v-if="index" />
                          <b-row class="justify-content-md-center align-items-baseline row-item">
                            <b-col class="landlord" md="auto">房東{{index + 1}}</b-col>
                            <b-col>
                              <b-row>
                                <b-col md="auto">
                                  <b-form-group
                                    class="form-group-in-box"
                                    label-size="lg"
                                    label-class="font-weight-bold"
                                    label="身分 "
                                    label-for="rentPage_1"
                                  >
                                    <b-form-select
                                      class="blue_box_in rentPage_1"
                                      size="lg"
                                      v-model="aLandlord[index].fIdentity"
                                      :options="identityOptions"
                                      @change="changeIdentity(index)"
                                    ></b-form-select>
                                  </b-form-group>
                                </b-col>
                                <b-col md="auto">
                                  <b-form-group
                                    class="form-group-in-box"
                                    label-size="lg"
                                    label-class="font-weight-bold"
                                    label="持有比例(%) "
                                    label-for="rentPage_2"
                                  >
                                    <b-input-group size="lg" append="%" class="blue_box_in">
                                      <b-form-input
                                        class="rentPage_2 text-center"
                                        v-model="aLandlord[index].iHoldRatio"
                                        type="number"
                                        min="0"
                                        max="100"
                                        step="1"
                                        @change="clear()"
                                      ></b-form-input>
                                    </b-input-group>
                                  </b-form-group>
                                </b-col>
                              </b-row>
                              <div class="XX">
                                <b-button
                                  class="XXbtn"
                                  v-if="index"
                                  type="reset"
                                  variant="danger"
                                  @click="cancelLandlord(index)"
                                >X</b-button>
                              </div>
                              <b-row class="ml-1" v-if="aLandlord[index].fIdentity == '外國人'">
                                <b-form-checkbox
                                  v-model="aLandlord[index].isOver183"
                                  :value="true"
                                  :unchecked-value="false"
                                  @change="clear()"
                                >有待滿183天</b-form-checkbox>
                                <b-form-checkbox
                                  class="ml-3"
                                  v-model="aLandlord[index].isInsurance"
                                  :value="true"
                                  :unchecked-value="false"
                                  @change="clear()"
                                >有投保健保</b-form-checkbox>
                              </b-row>
                            </b-col>
                          </b-row>
                        </div>
                        <b-button class="addLandlordBtn" round @click="addLandlord">新增房東</b-button>
                      </b-card>
                    </b-collapse>
                    <b-form-group
                      label="每期租金"
                      label-size="lg"
                      label-class="font-weight-bold"
                      label-for="input-iMoneyPerPeriod"
                    >
                      <b-col class="align-items-center" style="display: flex;flex-flow: wrap;">
                        <b-form-input
                          class="blue_box"
                          id="input-iMoneyPerPeriod"
                          v-model="form.iMoneyPerPeriod"
                          type="number"
                          min="0"
                          step="1"
                          @change="clear()"
                          @input="clear()"
                        ></b-form-input>
                        <b-form-checkbox
                          class="ml-2 mt-2"
                          v-if="choise == '個人'"
                          v-model="form.fIncludeTax"
                          :value="true"
                          :unchecked-value="false"
                          @change="clear()"
                        >租金已含稅</b-form-checkbox>
                      </b-col>
                    </b-form-group>
                  </b-form>
                  <!-- <b-button type="primary" round @click="calculate">計算</b-button> -->
                  <b-button type="button" variant="primary" @click="calculate">計算</b-button>
                  <b-button type="reset" variant="danger" @click="reset">清空</b-button>
                  <hr />
                  <div v-if="res.length && choise=='個人'" class="result">
                    <div v-for="(item, index) in res" :key="index" class="resultUnit">
                      <div>房東{{index + 1}}</div>
                      <div class="resultNumbers">
                        <div class="resultNumberUnit">
                          <span>＊ 每期租金（含稅）</span>
                          <span>${{res[index].total_rental}}</span>
                        </div>
                        <div class="resultNumberUnit">
                          <span>＊ 扣繳 {{Math.round(res[index].fee_tax / res[index].total_rental * 100)}}%</span>
                          <span>${{res[index].fee_tax}}</span>
                        </div>
                        <div class="resultNumberUnit" v-if="aLandlord[index].isInsurance">
                          <span>＊ 二代健保 2.11%</span>
                          <span>${{res[index].fee_insurance}}</span>
                        </div>
                        <div class="resultNumberUnit" v-if="aLandlord[index].isInsurance">
                          <span>＊ 租扣二代總金額</span>
                          <span>${{res[index].total_fee}}</span>
                        </div>
                        <div class="resultNumberUnit">
                          <span>＊ 實際支付租金（未稅）</span>
                          <span>${{res[index].real_rental}}</span>
                        </div>
                        <div class="resultNumberUnit" v-if="aLandlord[index].fIdentity=='本國人'">
                          <span style="color:red">＊ 本國人應於次月 10 日前繳納繳款書</span>
                        </div>
                        <div
                          class="resultNumberUnit"
                          v-if="aLandlord[index].fIdentity=='外國人' && !aLandlord[index].isOver183"
                        >
                          <span style="color:red">＊ 外國人未待滿 183 天，應於給付 10 日內繳納繳款書</span>
                        </div>
                        <div
                          class="resultNumberUnit"
                          v-if="aLandlord[index].fIdentity=='外國人' && aLandlord[index].isOver183"
                        >
                          <span style="color:red">＊ 外國人有待滿 183 天，應於次月 10 日前繳納繳款書</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="resCom != null && choise=='公司'" class="result">
                    <div style="display:flex;flex-direction: column;">
                      <span
                        style="color:#2196f3;text-align: justify;overflow-wrap: break-word;font-weight: bold;"
                      >
                        若房東為公司，僅需跟房東索取租金發票，發票金額為
                        <span
                          style="color:red;font-size: larger;"
                        >${{resCom.total}}</span>
                      </span>
                      <div style="display: flex;flex-direction: column;width:80%">
                        <div class="resultNumberUnit">
                          <span>銷售額</span>
                          <span>${{resCom.sale}}</span>
                        </div>
                        <div class="resultNumberUnit">
                          <span>稅金</span>
                          <span>${{resCom.tax}}</span>
                        </div>
                        <div class="resultNumberUnit">
                          <span>總金額</span>
                          <span>${{resCom.total}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </b-tab>
              <b-tab
                title="執行業務所得"
                class="incomePage_tab"
                :active="this.$route.params.id == 'cal_income'"
              >
                <h1 style="margin-bottom:2.5rem;margin-top:1rem">執行業務所得 - 所得扣繳計算機</h1>
                <h5>如果您透過「勞務報酬單」領取業務收入，則須注意單次金額款項，如果達到政府所規定門檻，會有扣繳所得稅與二代健保補充保費的相關問題，實際費用的計算方式，請您於下方選擇符合您條件的選項，我們會為您計算所得稅扣繳與二代健保的預估金額。</h5>
                <div class="incomePage">
                  <b-form class="form2" ref="form2" :model="form2">
                    <b-form-group
                      label-size="lg"
                      label-class="font-weight-bold"
                      label="身分"
                      label-for="incomePage_1"
                    >
                      <b-col class="align-items-center" style="display: flex;flex-flow: wrap;">
                        <b-form-select
                          class="blue_box incomePage_1"
                          v-model="form2.identity"
                          :options="form2IdentityOptions"
                          @change="clear()"
                        ></b-form-select>
                      </b-col>
                    </b-form-group>
                    <b-form-group
                      label="申報類別"
                      label-size="lg"
                      label-class="font-weight-bold"
                      label-for="incomePage_2"
                    >
                      <b-col class="align-items-center" style="display: flex;flex-flow: wrap;">
                        <b-form-select
                          class="blue_box incomePage_2"
                          v-model="form2.incomeType"
                          :options="form2IncomeTypeOptions"
                          @change="incomeChange()"
                        ></b-form-select>
                      </b-col>
                    </b-form-group>
                    <b-form-group
                      v-if="form2JobTypeOptions.length"
                      label="執行業務類別"
                      label-size="lg"
                      label-class="font-weight-bold"
                      label-for="incomePage_3"
                    >
                      <b-col class="align-items-center" style="display: flex;flex-flow: wrap;">
                        <b-form-select
                          class="blue_box incomePage_3"
                          v-model="form2.jobType"
                          :options="form2JobTypeOptions"
                          @change="clear()"
                        ></b-form-select>
                      </b-col>
                    </b-form-group>
                    <b-form-group
                      label="健保身分"
                      label-size="lg"
                      label-class="font-weight-bold"
                      label-for="incomePage_4"
                    >
                      <b-col class="align-items-center" style="display: flex;flex-flow: wrap;">
                        <b-form-select
                          class="blue_box incomePage_4"
                          v-model="form2.insuranceType"
                          :options="form2InsuranceTypeOptions"
                          @change="clear()"
                        ></b-form-select>
                      </b-col>
                    </b-form-group>
                    <b-form-group
                      label="金額"
                      label-size="lg"
                      label-class="font-weight-bold"
                      label-for="incomePage_5"
                    >
                      <b-col class="align-items-center" style="display: flex;flex-flow: wrap;">
                        <b-form-input
                          style="width:11rem"
                          class="incomePage_5"
                          v-model="form2.income"
                          type="number"
                          min="0"
                          step="1"
                          @change="clear()"
                        ></b-form-input>
                        <b-form-checkbox
                          class="mt-2 ml-2"
                          v-model="form2.fRealIncome"
                          :value="true"
                          :unchecked-value="false"
                          @change="clear()"
                        >實領金額</b-form-checkbox>
                      </b-col>
                    </b-form-group>
                  </b-form>
                  <div style="display:flex;flex-direction: column">
                    <div>
                      <b-button type="button" variant="primary" @click="calculate2">計算</b-button>
                      <b-button type="reset" variant="danger" @click="reset">清空</b-button>
                    </div>
                    <span v-if="checkSelect" style="color:red">請選擇類別</span>
                  </div>
                  <hr />
                  <div v-if="res2 != null" class="result">
                    <div class="resultNumbers2">
                      <div class="resultNumberUnit">
                        <span>公司應預扣及發放的金額：</span>
                      </div>
                      <div class="resultNumberUnit">
                        <span>＊ 所得金額</span>
                        <span>${{res2.info_preTax.income}}</span>
                      </div>
                      <div class="resultNumberUnit">
                        <span>＊ 代扣所得稅</span>
                        <span>${{res2.info_preTax.fee_tax}}</span>
                      </div>
                      <div class="resultNumberUnit">
                        <span>＊ 代扣二代健保</span>
                        <span>${{res2.info_preTax.fee_insurance}}</span>
                      </div>
                      <div class="resultNumberUnit">
                        <span>＊ 實際支付金額</span>
                        <span>${{res2.info_preTax.real_income}}</span>
                      </div>
                    </div>
                    <div
                      class="resultNumbers2"
                      style="background-color: rgb(241, 248, 235); border-radius: 1rem;"
                    >
                      <div class="resultNumberUnit">
                        <span>補充：對所得人個人所得的影響</span>
                      </div>
                      <div class="resultNumberUnit">
                        <span>＊ 所得金額</span>
                        <span>${{res2.info_incomeTax.income}}</span>
                      </div>
                      <div class="resultNumberUnit">
                        <span>＊ 費用率</span>
                        <span>{{res2.info_incomeTax.rate_exp}}</span>
                      </div>
                      <div class="resultNumberUnit">
                        <span>＊ 計入所得淨額</span>
                        <span>${{res2.info_incomeTax.net_income}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-tab>
        <b-tab
          title="發票模擬器"
          :active="this.$route.params.id == 'ticket2' || this.$route.params.id == 'ticket3'"
        >
          <ticket></ticket>
        </b-tab>
      </b-tabs>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import ticket from "./ticket";
export default {
  name: "calculator",
  components: {
    ticket
  },
  props: {},
  data() {
    var inputCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("請輸入每期租金"));
      } else {
        return callback();
      }
    };

    return {
      setting: false,
      choise: "個人",
      APIbaseURL: "https://theflowchat.com:5001",
      res: [],
      resCom: null,
      res2: null,
      aLandlord: [
        {
          fIdentity: "本國人",
          iHoldRatio: 100,
          isOver183: true,
          isInsurance: true
        }
      ],
      choiseOptions: [
        {
          value: "個人",
          text: "個人"
        },
        {
          value: "公司",
          text: "公司"
        }
      ],
      identityOptions: [
        {
          value: "本國人",
          text: "本國人"
        },
        {
          value: "外國人",
          text: "外國人"
        }
      ],
      form2IdentityOptions: [
        {
          value: "local",
          text: "本國人"
        },
        {
          value: "mid",
          text: "外國人待滿183天（居住者）"
        },
        {
          value: "foreign",
          text: "外國人未滿183天（非居住者）"
        }
      ],
      form2IncomeTypeOptions: [
        {
          value: null,
          text: "請選擇"
        },
        {
          value: "9A",
          text: "9A 執行業務所得"
        },
        {
          value: "9B",
          text: "9B 稿費、顧問費、演講費、出席費"
        }
      ],
      form2JobTypeOptions: [],
      form2InsuranceTypeOptions: [
        {
          value: "normal",
          text: "一般身分(需要扣二代健保)"
        },
        {
          value: "special",
          text: "特殊身分、事務所(免扣二代健保)"
        }
      ],
      form: {
        iMoneyPerPeriod: 0,
        fIncludeTax: true
      },
      form2: {
        identity: "local",
        incomeType: null,
        jobType: null,
        insuranceType: "normal",
        income: 0,
        fRealIncome: false
      },
      ratio: 0.04761905,
      checkSelect: false,
      rules: {
        iMoneyPerPeriod: [{ validator: inputCheck, trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    choiseTabs(item) {
      this.choise = item;
    },
    test() {
      console.log(this.form2.jobType);
    },
    reset() {
      this.clear();
      this.form2JobTypeOptions = [];
      this.form = {
        iMoneyPerPeriod: 0,
        fIncludeTax: true
      };
      this.form2 = {
        identity: "local",
        incomeType: null,
        jobType: null,
        insuranceType: "normal",
        income: 0,
        fRealIncome: false
      };
      this.aLandlord = [
        {
          fIdentity: "本國人",
          iHoldRatio: 100,
          isOver183: true,
          isInsurance: true
        }
      ];
    },
    clear() {
      this.res = [];
      this.resCom = null;
      this.res2 = null;
      this.checkSelect = false;
    },
    calculate() {
      if (this.choise == "公司") {
        let total = this.form.iMoneyPerPeriod;
        let tax = Math.round(total * this.ratio);
        let sale = total - tax;
        this.resCom = {
          sale: sale,
          tax: tax,
          total: total
        };
        return;
      }
      let jsonData;
      let l = [];
      let i;
      for (i = 0; i < this.aLandlord.length; i++) {
        l.push(
          this.aLandlord[i].fIdentity == "本國人"
            ? {
                proportion: parseInt(this.aLandlord[i].iHoldRatio),
                isLocal: 1,
                isOver183: 1,
                isInsurance: 1
              }
            : {
                proportion: parseInt(this.aLandlord[i].iHoldRatio),
                isLocal: 0,
                isOver183: this.aLandlord[i].isOver183 ? 1 : 0,
                isInsurance: this.aLandlord[i].isInsurance ? 1 : 0
              }
        );
      }
      jsonData = {
        rental: parseInt(this.form.iMoneyPerPeriod),
        includeTax: this.form.fIncludeTax ? 1 : 0,
        landlord: l
      };
      // console.log(jsonData);
      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/calculator/pretax/rent",
        data: jsonData,
        headers: {
          "Content-Type": "application/json"
          //   "x-access-token": token
        }
      }).then(response => {
        if (response.status == 200) {
          // console.log(response);
          this.res = response.data.data;
        } else {
          this.$message.error("error！");
        }
      });
    },
    calculate2() {
      if (this.form2.jobType == null || this.form2.incomeType == null) {
        this.checkSelect = true;
        return;
      }
      let jsonData;
      // form2
      //   identity: "local",
      //   incomeType: "",
      //   jobType: "",
      //   insuranceType: "normal",
      //   income: 0,
      //   fRealIncome: false

      jsonData = {
        identity: this.form2.identity,
        income_type: this.form2.incomeType,
        job_type: this.form2.jobType,
        insurance_type: this.form2.insuranceType,
        D_real_income: this.form2.fRealIncome ? 1 : 0,
        income: parseInt(this.form2.income)
      };
      console.log(jsonData);
      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/calculator/pretax/income",
        data: jsonData,
        headers: {
          "Content-Type": "application/json"
          //   "x-access-token": token
        }
      }).then(response => {
        if (response.status == 200) {
          console.log(response);
          this.res2 = response.data.data;
        } else {
          this.$message.error("error！");
        }
      });
    },
    incomeChange() {
      this.clear();
      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/calculator/option/" + this.form2.incomeType,
        // data: jsonData,
        headers: {
          "Content-Type": "application/json"
          //   "x-access-token": token
        }
      }).then(response => {
        if (response.status == 200) {
          console.log(response);
          this.form2.jobType = null;
          this.form2JobTypeOptions = [
            {
              value: null,
              text: "請選擇業務類別"
            }
          ];
          let i;
          for (i = 0; i < response.data.length; i++) {
            this.form2JobTypeOptions.push({
              value: response.data[i].key,
              text: "[" + response.data[i].key + "] " + response.data[i].value
            });
          }
        } else {
          this.$message.error("error！");
        }
      });
    },
    addLandlord() {
      this.clear();
      this.aLandlord.push({
        fIdentity: "本國人",
        iHoldRatio: 0,
        isOver183: true,
        isInsurance: true
      });
    },
    cancelLandlord(index) {
      this.clear();
      this.aLandlord.splice(index, 1);
    },
    changeIdentity(index) {
      this.clear();
      console.log("change" + index);
      if (this.aLandlord[index].fIdentity == "外國人") {
        this.aLandlord[index].isOver183 = false;
        this.aLandlord[index].isInsurance = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.fillcontain {
  padding-top: 20px;
}
.tabs {
  .card {
    border-radius: 1rem;
  }
  .tabs {
    border-radius: 1rem;
  }
}

.selector-for-some-widget {
  box-sizing: content-box;
}
.rentPage {
  // max-width: 40rem;
}
.rentPage_tab {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.incomePage {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.incomePage_tab {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
// .divInSetting {
//   display: flex;
//   flex-direction: column;
// }
.resultUnit {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0.5rem;
  margin-bottom: 1rem;
  background-color: rgb(241, 248, 235);
  border-radius: 1rem;
}
.result {
  display: flex;
  flex-direction: column;
}
.resultNumbers {
  display: flex;
  flex-direction: column;
}
.resultNumbers2 {
  padding: 1rem;
  display: flex;
  flex-direction: column;
}
.resultNumberUnit {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.form-control {
  border: 4px solid #2196f3;
  border-radius: 0.6rem;
}
.custom-select {
  border: 4px solid #2196f3;
  border-radius: 0.6rem;
}
.blue_box {
  width: 17rem;
}
.blue_box_in {
  width: 15rem;
}
.form {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
}
.form2 {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
.XX {
  position: absolute;
  top: 0.4rem;
  right: 0.8rem;
}
.XXbtn {
  border-radius: 0.5rem;
  height: 1.8rem;
  width: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.rentPage {
  .card {
    border: 3px solid rgb(84, 165, 13);
    border-radius: 0.75rem;
    background-color: rgb(241, 248, 235);
    hr {
      width: 100%;
      border-top: 3px solid rgb(84, 165, 13);
    }
  }
}
hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 5px dashed #2196f3;
  width: 80%;
}
.landlord {
  font-weight: bold;
  font-size: 1.5rem;
  color: rgb(60, 119, 8);
}
.addLandlordBtn {
  color: rgb(255, 255, 255);
  background-color: rgb(84, 165, 13);
  font-weight: bold;
}
h5 {
  font-weight: 400;
  margin-bottom: 2.5rem;
  line-height: 1.5;
  text-align: justify;
}
</style>
