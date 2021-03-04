<template>
  <div class="bind" id="bindMain">
    <section id="contact" class="form" style="background-color:rgba(0,0,0,0)">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 align-self-center text-center text-md-left">
            <!-- Success Message -->
            <div id="bind-success-modal" class="row success message" v-if="show3">
              <div class="col-12 p-0">
                <i class="icon bigger icon-check"></i>
                <h3 style="font-family:'Microsoft JhengHei', sans-serif;">綁定成功</h3>
                <a id="finish" @click="closeLiff" class="btn mx-auto primary-button">
                  <i class="icon-check"></i>完成
                </a>
              </div>
            </div>

            <!-- Validation Code Error Message -->
            <div id="code-error-modal" class="row success message" v-if="showVerifyError">
              <div class="col-12 p-0">
                <i class="icon bigger icon-close"></i>
                <h3 style="font-family:'Microsoft JhengHei', sans-serif;">驗證碼錯誤</h3>
                <p>請重新輸入</p>
                <a id="code-error-ckeck" href class="btn mx-auto primary-button">
                  <i class="icon-check"></i>確定
                </a>
              </div>
            </div>

            <!-- Error Message -->
            <div id="bind-error-modal" class="row success message" v-if="showBindError">
              <div class="col-12 p-0">
                <i class="icon bigger icon-close"></i>
                <h3 style="font-family:'Microsoft JhengHei', sans-serif;">綁定錯誤</h3>
                <p>請重新綁定</p>
                <a id="bind-error-ckeck" href class="btn mx-auto primary-button">
                  <i class="icon-check"></i>確定
                </a>
              </div>
            </div>

            <!-- Error Message -->
            <div id="bind-error-modal" class="row success message" v-if="showSomethingError">
              <div class="col-12 p-0">
                <i class="icon bigger icon-close"></i>
                <h3 v-if="!errorMsg.length" style="font-family:'Microsoft JhengHei', sans-serif;">綁定異常</h3>
                <h3 v-else style="font-family:'Microsoft JhengHei', sans-serif;">{{errorMsg}}</h3>
                <p>請聯絡客服</p>
                <a id="bind-error-ckeck" href class="btn mx-auto primary-button">
                  <i class="icon-check"></i>確定
                </a>
              </div>
            </div>

            <!-- Steps Message -->
            <div class="row intro" v-if="!show3">
              <div class="col-12 p-0">
                <h2 class="featured alt" style="font-family:'Microsoft JhengHei', sans-serif;"></h2>
                <!-- Text 1 -->
                <div v-if="!(show3 || showBindError || showSomethingError || showVerifyError)">
                  <h2 id="welcome" class="featured alt"></h2>
                  <p id="text-1" v-if="show1">輸入手機號碼，系統會將驗證碼以簡訊傳送給您</p>
                  <p id="text-2" v-if="show2">請填入驗證碼</p>
                </div>
              </div>
            </div>

            <!-- Form -->
            <div class="row text-center">
              <div class="col-12 p-0">
                <b-form id="msform" style="height:400px;">
                  <ul
                    id="progressbar"
                    v-if="!(show3 || showBindError || showSomethingError || showVerifyError)"
                  >
                    <li id="li-1" class="active">取得驗證碼</li>
                    <li id="li-2">輸入資料</li>
                    <li id="li-3">綁定完成</li>
                  </ul>

                  <!-- Group 1 -->
                  <fieldset id="group-1" v-if="show1">
                    <div class="row">
                      <label for="name">手機號碼</label>
                    </div>
                    <div class="row">
                      <div class="col-12 input-group p-0">
                        <b-form-input
                          :state="validationPhone"
                          v-model="form.phone"
                          type="tel"
                          id="phone"
                          name="phone"
                          minlength="10"
                          maxlength="13"
                          class="form-control input-style"
                          placeholder="請輸入手機號碼"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12 input-group p-0" @click="firstNext">
                      <a id="next-1" class="next btn primary-button">
                        下一步
                        <i class="btn-icon icon-arrow-right-circle left"></i>
                      </a>
                    </div>
                  </fieldset>

                  <!-- Group 2 -->
                  <fieldset id="group-2" v-if="show2">
                    <div class="row">
                      <div class="col-12 input-group p-0">
                        <b-form-input
                          v-model="form.code"
                          :state="validationCode"
                          type="tel"
                          id="VerificationCode"
                          name="VerificationCode"
                          minlength="6"
                          maxlength="6"
                          class="form-control input-style"
                          placeholder="驗證碼"
                          required
                        />
                      </div>
                    </div>
                    <div class="row">
                      <label for="gender">性別</label>
                    </div>
                    <div class="row">
                      <div class="col-12 input-group p-0">
                        <i class="icon-arrow-down"></i>
                        <select
                          v-model="form.gender"
                          id="gender"
                          name="gender"
                          minlength="1"
                          class="form-control input-style"
                          required
                        >
                          <option value="n" selected disabled>請選擇性別</option>
                          <option value="m">男</option>
                          <option value="f">女</option>
                          <option value="s">秘密</option>
                        </select>
                      </div>
                    </div>

                    <div class="row">
                      <label for="year">生日</label>
                    </div>
                    <div class="row">
                      <div class="col-4 input-group p-0">
                        <b-form-input
                          @input="yearInput"
                          v-model="form.year"
                          :state="validationYear"
                          type="tel"
                          id="year"
                          name="year"
                          minlength="4"
                          maxlength="4"
                          class="form-control input-style"
                          placeholder="西元年"
                          required
                        />
                      </div>
                      <div class="col-1 input-group p-0"></div>
                      <div class="col-3 input-group p-0">
                        <b-form-input
                          @input="monthInput"
                          v-model="form.month"
                          :state="validationMonth"
                          type="tel"
                          id="month"
                          name="month"
                          minlength="1"
                          maxlength="2"
                          class="form-control input-style"
                          placeholder="月"
                          required
                        />
                      </div>
                      <div class="col-1 input-group p-0"></div>
                      <div class="col-3 input-group p-0">
                        <b-form-input
                          v-model="form.day"
                          :state="validationDay"
                          type="tel"
                          id="day"
                          name="day"
                          minlength="1"
                          maxlength="2"
                          class="form-control input-style"
                          placeholder="日"
                          required
                        />
                      </div>
                    </div>
                    <div
                      class="col-12 input-group p-0 d-flex justify-content-center justify-content-md-start"
                    >
                      <a id="prev-2" class="previous btn primary-button mr-4" @click="firstPre">
                        <i class="btn-icon icon-arrow-left-circle"></i>上一步
                      </a>
                      <a id="next-2" class="next btn primary-button" @click="secondNext">
                        下一步
                        <i class="btn-icon icon-arrow-right-circle left"></i>
                      </a>
                    </div>
                  </fieldset>
                </b-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import liff from "@line/liff";
export default {
  name: "bind",
  data() {
    return {
      // group_1: {
      //   'transform': 'scale(1)',
      //   'position': 'absolute',
      //   'opacity': '1'
      // },
      // group_1_before: {
      //   'transform': 'scale(1)',
      //   'position': 'absolute',
      //   'opacity': '1'
      // },
      // group_1_after: {
      //   'transform': 'scale(0.8)',
      //   'position': 'absolute',
      //   'opacity': '0',
      //   'display': 'none'
      // },
      APIbaseURL: "https://theflowchat.com:5001",
      form: {
        phone: "",
        code: "",
        gender: "n",
        year: "",
        month: "",
        day: ""
      },
      show1: true,
      show2: false,
      show3: false,
      showVerifyError: false,
      showSomethingError: false,
      showBindError: false,
      token: "",
      today: new Date(),
      LiffId: "",
      userId: "",
      userName: "",
      errorMsg:""
    };
  },
  created() {
    // console.log(this.$route.query.a);
    // console.log(this.$route.query.name);
    // console.log(this.$route.query.os);
  },
  mounted() {
    //document.getElementById("title").innerHTML = "會員綁定";
    if (this.$route.query.name)
      document.getElementById("welcome").innerHTML =
        "Hi! " + this.$route.query.name;
    if (this.$route.query.os == "web")
      document.getElementById("bindMain").innerHTML =
        "<p class='content'>請至智慧型手機使用相關功能！</p>";

    // console.log(this.$route.params.id);
    axios({
      method: "post",
      baseURL: this.APIbaseURL,
      url: "/flow/get_token",
      data: {
        id: "adbest",
        pw: "ricky95288888"
      },
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      // console.debug(res);
      this.token = "Bearer " + res.data.token;
      // console.log(this.token);
    });

    var start = async () => {
      await axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/flow/get_liff",
        data: {
          identity: this.$route.params.id,
          liff_type: "memberlink"
        },
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        // console.debug(res);
        if (res.status == 200) {
          this.LiffId = res.data.liffId;
        } else {
          console.debug("get liff error");
        }
      });
    };

    // start().then(() => {
    //   liff
    //     .init({
    //       liffId: this.LiffId
    //     })
    //     .then(() => {
    //       var os = liff.getOS();
    //       // LIFF一定要在手機進行才能取得userId，這邊你再改一下
    //       if (os == "web") {
    //         console.log("OS : " + os);
    //         document.getElementById("bindMain").innerHTML =
    //           "<p class='content'>請至智慧型手機使用相關功能！</p>";
    //         return;
    //       } else {
    //         liff
    //           .getProfile()
    //           .then(profile => {
    //             document.getElementById("welcome").innerHTML =
    //               "Hi! " + profile.displayName;
    //             this.userId = profile.userId;
    //             // varPicture = profile.pictureUrl;
    //             // varStatusMsg = profile.statusMessage;
    //             console.log("userId ", this.userId);
    //             console.log("userName ", this.userName);
    //           })
    //           .catch(error => {
    //             console.log("getProfile", error);
    //           });
    //       }
    //     })
    //     .catch(error => {
    //       console.log("LiffInit", error);
    //     });
    // });
  },
  computed: {
    validationPhone() {
      var reg = /^09[0-9]{8}$/;
      return reg.test(this.form.phone) && !this.form.phone == "";
    },
    validationCode() {
      var reg = /^([0-9]|[A-Z]|[a-z]){6}$/;
      return reg.test(this.form.code) && !this.form.code == "";
    },
    validationYear() {
      var reg = /^(19|20)[0-9]{2}$/;
      return (
        reg.test(this.form.year) &&
        !this.form.year == "" &&
        this.form.year <= this.today.getFullYear()
      );
    },
    validationMonth() {
      return (
        parseInt(this.form.month) > 0 &&
        parseInt(this.form.month) < 13 &&
        !this.form.month == ""
      );
    },
    validationDay() {
      return (
        parseInt(this.form.day) > 0 &&
        parseInt(this.form.day) < 32 &&
        !this.form.day == ""
      );
    }
  },
  methods: {
    closeLiff() {
      liff.closeWindow();
    },
    firstNext() {
      if (!this.validationPhone) return;
      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/flow/get_code",
        data: {
          phone: this.form.phone,
          identity: this.$route.params.id
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: this.token
        }
      }).then(res => {
        // console.debug(res);
        if (res.status == 200 && res.data.log == 1) {
          this.token = res.data.token;
          document.getElementById("li-2").classList.add("active");
          this.show1 = false;
          this.show2 = true;
        } else {
          this.errorMsg = res.data.message;
          this.show1 = false;
          this.showSomethingError = true;
        }
      });
    },
    firstPre() {
      document.getElementById("li-2").classList.remove("active");
      this.show1 = true;
      this.show2 = false;
    },
    secondNext() {
      if (!this.validationYear && !this.validationMonth && !this.validationDay)
        return;
      let jsonData = {
        token: this.token,
        code: this.form.code,
        identity: this.$route.params.id,
        user_id: this.$route.query.uid, //this.userId,
        birth: this.form.year + "-" + this.form.month + "-" + this.form.day,
        phone: this.form.phone,
        gender: this.form.gender == "n" ? "s" : this.form.gender
      };
      // console.log(jsonData);
      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/FL_verify",
        data: jsonData,
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        if (res.status == 200) {
          this.show2 = false;
          if (res.data.message == "DONE") {
            document.getElementById("li-3").classList.add("active");
            this.show3 = true;
          } else if (res.data.message == "verify code error") {
            this.showVerifyError = true;
          } else {
            this.showBindError = true;
          }
        } else {
          this.show2 = false;
          this.showSomethingError = true;
        }
      });
    },
    yearInput() {
      if (this.form.year.length == 4) document.getElementById("month").focus();
    },
    monthInput() {
      if (parseInt(this.form.month) > 1 || this.form.month.length == 2)
        document.getElementById("day").focus();
    }
  }
};
</script>

<style scoped lang="less">
@import "../assets/css/vendor/bootstrap.min.css";
@import "../assets/css/vendor/slider.min.css";
@import "../assets/css/main.css";
@import "../assets/css/vendor/icons.min.css";
@import "../assets/css/vendor/gallery.min.css";
@import "../assets/css/vendor/animation.min.css";
@import "../assets/css/default.css";
@import "../assets/css/theme-classic.css";
@import "../assets/css/theme-blue.css";

.group-1-before {
  transform: scale(1);
  position: absolute;
  opacity: 1;
}
.group-1-after {
  transform: scale(0.8);
  position: absolute;
  opacity: 0;
  display: none;
}
</style>
