webpackJsonp([2],{"1uuo":function(t,e){},"9M+g":function(t,e){},"CHb/":function(t,e){},DK2F:function(t,e){},HDKY:function(t,e){},Jmt5:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var r=a("VU/8")({name:"App"},i,!1,function(t){a("qf9G")},null,null).exports,o=a("/ocq"),n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hello"},[a("h1",[t._v(t._s(t.msg))]),t._v(" "),a("h2",[t._v("Essential Links")]),t._v(" "),t._m(0),t._v(" "),a("h2",[t._v("Ecosystem")]),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",[a("li",[a("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[t._v("\n        Core Docs\n      ")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[t._v("\n        Forum\n      ")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank"}},[t._v("\n        Community Chat\n      ")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[t._v("\n        Twitter\n      ")])]),t._v(" "),a("br"),t._v(" "),a("li",[a("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[t._v("\n        Docs for This Template\n      ")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[e("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[this._v("\n        vue-router\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[this._v("\n        vuex\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[this._v("\n        vue-loader\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[this._v("\n        awesome-vue\n      ")])])])}]};var l=a("VU/8")({name:"HelloWorld",data:function(){return{msg:"Welcome to Your Vue.js App"}}},n,!1,function(t){a("1uuo")},"data-v-d8ec41bc",null).exports,c=a("mtWM"),m=a.n(c),h=a("mvHQ"),v=a.n(h),d={name:"ticket",data:function(){return{canvasCom:"必 填",canvasNumbers:"必填",canvasCnt:1,canvasUnit:"",canvasPrice:"",canvasSale:"",canvasTax:"",canvasTotal:"",canvasTotalChinese:"",canvasDate:"",canvasDateChinese:"",vvv:"V",vvvStyle2:"left:16rem",vvvStyle3:"right:36.5rem",fOneTime:"",isShow:!1,uniformState:null,comSelected:-1,comOptions:[],formCom:{uniform:"",comName:""},taxOptions:[{value:0,text:"應稅(5%)"},{value:1,text:"零稅率(0%)"},{value:2,text:"免稅"}],formPrice:{price:0,tax:0,taxRatioItem:0,salePrice:0},res:{},resCom:{},ratio:.04761905,regex:/^[0-9\s]*$/,int2ChineseMap:["零","壹","貳","參","肆","伍","陸","柒","捌","玖"],int2ChineseMap2:["O","一","二","三","四","五","六","七","八","九"]}},created:function(){var t=new Date,e=t.getFullYear()-1911,a=t.getMonth()+1,s=t.getDate();this.canvasDate=e+"   "+a+"    "+s,this.canvasDateChinese=this.int2ChineseMap2[e.toString()[0]]+this.int2ChineseMap2[e.toString()[1]]+this.int2ChineseMap2[e.toString()[2]]+"   ";var i=(2*Math.ceil(a/2)-1).toString()+(2*Math.ceil(a/2)).toString();this.canvasDateChinese=2==i.length?this.canvasDateChinese+" "+this.int2ChineseMap2[parseInt(i[0])]+"    "+this.int2ChineseMap2[parseInt(i[1])]:3==i.length?this.canvasDateChinese+" "+this.int2ChineseMap2[parseInt(i[0])]+"    十":this.canvasDateChinese+"十"+this.int2ChineseMap2[parseInt(i[1])]+"  十"+this.int2ChineseMap2[parseInt(i[3])]},watch:{comSelected:"comSelectedChange"},computed:{nameState:function(){return!!this.regex.test(this.formPrice.price)&&null},saleState:function(){return!!this.regex.test(this.formPrice.salePrice)&&null}},methods:{canvasChange:function(){this.canvasUnit=this.formPrice.salePrice,this.canvasPrice=this.formPrice.salePrice,this.canvasSale=this.formPrice.salePrice,this.canvasTotal=this.formPrice.price,this.canvasTax=this.formPrice.tax,this.canvasTotalChinese="";for(var t=0;t<this.canvasTotal.toString().length;t++)this.canvasTotalChinese=this.canvasTotalChinese+this.int2ChineseMap[parseInt(this.canvasTotal.toString()[t])]},inputCom:function(){this.canvasCom=this.formCom.comName},taxRatioIn:function(){switch(this.formPrice.taxRatioItem){case 0:this.vvvStyle2="left:16rem",this.vvvStyle3="right:36.5rem",this.formPrice.price=Math.round(this.formPrice.salePrice/(1-this.ratio)),this.formPrice.tax=this.formPrice.price-this.formPrice.salePrice;break;case 1:this.vvvStyle2="left:23rem",this.vvvStyle3="right:32.5rem",this.formPrice.tax=0,this.formPrice.price=this.formPrice.salePrice;break;case 2:this.vvvStyle2="left:30rem",this.vvvStyle3="right:28.5rem",this.formPrice.tax=0,this.formPrice.price=this.formPrice.salePrice;break;default:this.$message.error("Something Wrong!")}this.canvasChange()},priceIn:function(){switch(this.formPrice.taxRatioItem){case 0:this.formPrice.tax=Math.round(this.formPrice.price*this.ratio),this.formPrice.salePrice=this.formPrice.price-this.formPrice.tax;break;case 1:case 2:this.formPrice.tax=0,this.formPrice.salePrice=this.formPrice.price;break;default:this.$message.error("Something Wrong!")}this.canvasChange()},comSelectedChange:function(){this.formCom.comName=this.comOptions[this.comSelected].text,this.canvasCom=this.comOptions[this.comSelected].text,this.formCom.uniform=this.resCom[this.comSelected].統一編號,this.canvasNumbers=this.resCom[this.comSelected].統一編號,this.isShow=!1},searchUniform:function(){var t=this;m()({method:"get",baseURL:"https://company.g0v.ronny.tw/api/search?q=",url:this.formCom.comName,headers:{"Content-Type":"application/json"}}).then(function(e){if(200==e.status){console.log(e),t.comOptions=[],t.resCom=e.data.data;var a=void 0;for(a=0;a<e.data.data.length;a++){var s=void 0;e.data.data[a].hasOwnProperty("商業名稱")&&(s=e.data.data[a].商業名稱),e.data.data[a].hasOwnProperty("公司名稱")&&(s=e.data.data[a].公司名稱),t.comOptions.push({value:a,text:s})}t.isShow=!0}else t.$message.error("error！")})},searchCom:function(){var t=this;this.canvasNumbers=this.formCom.uniform,this.fOneTime!=this.formCom.uniform&&(this.fOneTime=this.formCom.uniform,this.formCom.uniform.length<8?this.uniformState=null:m()({method:"get",baseURL:"https://company.g0v.ronny.tw/api/show/",url:this.formCom.uniform,headers:{"Content-Type":"application/json"}}).then(function(e){200==e.status?(console.log(e.data.data.財政部),t.res=e.data.data.財政部,"{}"==v()(e.data.data.財政部)?t.uniformState=!1:(t.uniformState=!0,t.formCom.comName=e.data.data.財政部.營業人名稱,t.canvasCom=t.formCom.comName)):t.$message.error("error！")}))},clear:function(){this.canvasCom="必 填",this.canvasNumbers="必填",this.canvasCnt=1,this.canvasUnit="",this.canvasPrice="",this.canvasSale="",this.canvasTax="",this.canvasTotal="",this.canvasTotalChinese="",this.vvv="V",this.vvvStyle3="right:36.5rem",this.fOneTime="",this.isShow=!1,this.uniformState=null,this.comSelected=-1,this.comOptions=[],this.formCom={uniform:"",comName:""},this.formPrice={price:0,tax:0,taxRatioItem:0,salePrice:0}}}},f={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ticket"},[a("b-card",{attrs:{"no-body":""}},[a("b-tabs",{attrs:{"content-class":"mt-3",pills:"",card:"",justified:""}},[a("b-tab",{staticClass:"tab",attrs:{title:"二聯式發票(開給個人)",active:"ticket2"==this.$route.params.id},on:{click:t.clear}},[a("div",{staticClass:"two"},[a("div",{staticStyle:{display:"flex","flex-direction":"row","align-items":"flex-end","flex-wrap":"wrap"}},[a("h2",[t._v("金額")]),t._v(" "),a("h6",{staticStyle:{margin:"0.7rem"}},[t._v("輸入含稅或未稅價，皆可即時推算金額")])]),t._v(" "),a("b-form",{staticClass:"form"},[a("b-form-group",{attrs:{label:"收款金額 (含稅價)","label-size":"lg","label-for":"price"}},[a("b-form-input",{staticClass:"shareWidth blue_box",attrs:{id:"price",type:"text",inputmode:"numeric",maxlength:"9",state:t.nameState,"aria-describedby":"input-live-feedback"},on:{input:t.priceIn},model:{value:t.formPrice.price,callback:function(e){t.$set(t.formPrice,"price",e)},expression:"formPrice.price"}}),t._v(" "),a("b-form-invalid-feedback",{attrs:{id:"price-live-feedback"}},[t._v("請輸入數字")])],1),t._v(" "),a("b-form-group",{attrs:{label:"內含營業稅額","label-size":"lg","label-for":"taxPrice"}},[a("b-form-input",{staticClass:"shareWidth blue_box",attrs:{readonly:"",id:"taxPrice"},model:{value:t.formPrice.tax,callback:function(e){t.$set(t.formPrice,"tax",e)},expression:"formPrice.tax"}})],1)],1),t._v(" "),a("b-form",{staticClass:"form"},[a("b-form-group",{attrs:{"label-size":"lg",label:"稅率","label-for":"taxRatio"}},[a("b-form-select",{staticClass:"blue_box",attrs:{id:"taxRatio",options:t.taxOptions},on:{change:t.taxRatioIn},model:{value:t.formPrice.taxRatioItem,callback:function(e){t.$set(t.formPrice,"taxRatioItem",e)},expression:"formPrice.taxRatioItem"}})],1),t._v(" "),a("b-form-group",{attrs:{label:"實際銷售額 (未稅價)","label-size":"lg","label-for":"salePrice"}},[a("b-form-input",{staticClass:"blue_box shareWidth",attrs:{id:"salePrice",type:"text",maxlength:"9",max:"952380000",state:t.saleState,"aria-describedby":"input-live-feedback"},on:{input:t.taxRatioIn},model:{value:t.formPrice.salePrice,callback:function(e){t.$set(t.formPrice,"salePrice",e)},expression:"formPrice.salePrice"}}),t._v(" "),a("b-form-invalid-feedback",{attrs:{id:"sale-live-feedback"}},[t._v("請輸入數字")])],1)],1),t._v(" "),a("hr"),t._v(" "),a("h2",[t._v("發票範例圖")]),t._v(" "),a("h6",{staticStyle:{margin:"0.7rem","word-break":"normal"}},[t._v("\n            注意：自己留存第一聯存根聯、交付「第二聯收執聯」給一般消費者。\n            （若有買有副聯的發票本，副聯可自行留存）\n          ")])],1),t._v(" "),a("div",{staticClass:"test"},[a("div",{staticClass:"bImg2"},[a("div",{staticClass:"canvasCnt2"},[t._v(t._s(t.canvasCnt))]),t._v(" "),a("div",{staticClass:"canvasUnit2"},[t._v(t._s(t.canvasTotal))]),t._v(" "),a("div",{staticClass:"canvasPrice2"},[t._v(t._s(t.canvasTotal))]),t._v(" "),a("div",{staticClass:"canvasTotal2"},[t._v(t._s(t.canvasTotal))]),t._v(" "),a("div",{staticClass:"canvasTotalChinese2"},[t._v(t._s(t.canvasTotalChinese))]),t._v(" "),a("pre",{staticClass:"canvasDate2"},[t._v(t._s(t.canvasDate))]),t._v(" "),a("pre",{staticClass:"canvasDateChinese2"},[t._v(t._s(t.canvasDateChinese))]),t._v(" "),a("div",{staticClass:"vvv2",style:t.vvvStyle2},[t._v(t._s(t.vvv))])])])]),t._v(" "),a("b-tab",{staticClass:"tab",attrs:{title:"三聯式發票(開給公司)",active:"ticket3"==this.$route.params.id},on:{click:t.clear}},[a("div",{staticClass:"three"},[a("div",{staticStyle:{display:"flex","flex-direction":"row","align-items":"flex-end","flex-wrap":"wrap"}},[a("h2",[t._v("買受人")]),t._v(" "),a("h6",{staticStyle:{margin:"0.7rem"}},[t._v("輸入統編可自動查詢公司名稱，輸入公司名稱兩字以上可自動查詢統編")])]),t._v(" "),a("b-form",{staticClass:"form"},[a("b-form-group",{attrs:{label:"統一編號","label-size":"lg","label-for":"uniform-numbers"}},[a("b-form-input",{staticClass:"blue_box",attrs:{id:"uniform-numbers","aria-describedby":"input-live-help input-live-feedback",maxlength:"8",state:t.uniformState},on:{input:t.searchCom},model:{value:t.formCom.uniform,callback:function(e){t.$set(t.formCom,"uniform",e)},expression:"formCom.uniform"}}),t._v(" "),a("b-form-invalid-feedback",{attrs:{id:"input-live-feedback"}},[t._v("統一編號錯誤")])],1),t._v(" "),a("b-form-group",{attrs:{label:"公司名稱 (抬頭)","label-size":"lg","label-for":"comName"}},[a("div",{staticClass:"comNameInput"},[a("b-form-input",{staticClass:"blue_box",attrs:{id:"comName"},on:{change:t.searchUniform,input:t.inputCom},model:{value:t.formCom.comName,callback:function(e){t.$set(t.formCom,"comName",e)},expression:"formCom.comName"}}),t._v(" "),t.comOptions.length&&t.isShow?a("b-form-select",{staticClass:"select blue_box",attrs:{options:t.comOptions,"select-size":7},model:{value:t.comSelected,callback:function(e){t.comSelected=e},expression:"comSelected"}}):t._e()],1)])],1),t._v(" "),a("hr"),t._v(" "),a("div",{staticStyle:{display:"flex","flex-direction":"row","align-items":"flex-end","flex-wrap":"wrap"}},[a("h2",[t._v("金額")]),t._v(" "),a("h6",{staticStyle:{margin:"0.7rem"}},[t._v("輸入含稅或未稅價，皆可即時推算金額")])]),t._v(" "),a("b-form",{staticClass:"form"},[a("b-form-group",{attrs:{label:"收款金額 (含稅價)","label-size":"lg","label-for":"price"}},[a("b-form-input",{staticClass:"blue_box shareWidth",attrs:{id:"price",type:"text",inputmode:"numeric",maxlength:"9",state:t.nameState,"aria-describedby":"input-live-feedback"},on:{input:t.priceIn},model:{value:t.formPrice.price,callback:function(e){t.$set(t.formPrice,"price",e)},expression:"formPrice.price"}}),t._v(" "),a("b-form-invalid-feedback",{attrs:{id:"price-live-feedback"}},[t._v("請輸入數字")])],1),t._v(" "),a("b-form-group",{attrs:{label:"營業稅額","label-size":"lg","label-for":"taxPrice"}},[a("b-form-input",{staticClass:"blue_box shareWidth",attrs:{readonly:"",id:"taxPrice"},model:{value:t.formPrice.tax,callback:function(e){t.$set(t.formPrice,"tax",e)},expression:"formPrice.tax"}})],1)],1),t._v(" "),a("b-form",{staticClass:"form"},[a("b-form-group",{attrs:{"label-size":"lg",label:"稅率","label-for":"taxRatio"}},[a("b-form-select",{staticClass:"blue_box",attrs:{id:"taxRatio",options:t.taxOptions},on:{change:t.taxRatioIn},model:{value:t.formPrice.taxRatioItem,callback:function(e){t.$set(t.formPrice,"taxRatioItem",e)},expression:"formPrice.taxRatioItem"}})],1),t._v(" "),a("b-form-group",{attrs:{label:"銷售額 (未稅價)","label-size":"lg","label-for":"salePrice"}},[a("b-form-input",{staticClass:"blue_box shareWidth",attrs:{id:"salePrice",type:"text",maxlength:"9",max:"952380000",state:t.saleState,"aria-describedby":"input-live-feedback"},on:{input:t.taxRatioIn},model:{value:t.formPrice.salePrice,callback:function(e){t.$set(t.formPrice,"salePrice",e)},expression:"formPrice.salePrice"}}),t._v(" "),a("b-form-invalid-feedback",{attrs:{id:"sale-live-feedback"}},[t._v("請輸入數字")])],1)],1),t._v(" "),a("hr"),t._v(" "),a("h2",[t._v("發票範例圖")]),t._v(" "),a("h6",{staticStyle:{margin:"0.7rem","word-break":"normal"}},[t._v("\n            注意：自己留存第一聯存根聯、交付「第二聯扣抵聯」跟「第三聯收執聯」給客戶。\n            （若有買有副聯的發票本，副聯可自行留存）\n          ")])],1),t._v(" "),a("div",{staticClass:"test"},[a("div",{staticClass:"bImg3"},[a("pre",{staticClass:"canvasCom"},[t._v(t._s(t.canvasCom))]),t._v(" "),a("div",{staticClass:"canvasNumbers"},[t._v(t._s(t.canvasNumbers))]),t._v(" "),a("div",{staticClass:"canvasCnt"},[t._v(t._s(t.canvasCnt))]),t._v(" "),a("div",{staticClass:"canvasUnit"},[t._v(t._s(t.canvasUnit))]),t._v(" "),a("div",{staticClass:"canvasPrice"},[t._v(t._s(t.canvasPrice))]),t._v(" "),a("div",{staticClass:"canvasSale"},[t._v(t._s(t.canvasSale))]),t._v(" "),a("div",{staticClass:"canvasTax"},[t._v(t._s(t.canvasTax))]),t._v(" "),a("div",{staticClass:"canvasTotal"},[t._v(t._s(t.canvasTotal))]),t._v(" "),a("div",{staticClass:"canvasTotalChinese"},[t._v(t._s(t.canvasTotalChinese))]),t._v(" "),a("pre",{staticClass:"canvasDate"},[t._v(t._s(t.canvasDate))]),t._v(" "),a("pre",{staticClass:"canvasDateChinese"},[t._v(t._s(t.canvasDateChinese))]),t._v(" "),a("div",{staticClass:"vvv",style:t.vvvStyle3},[t._v(t._s(t.vvv))])])])])],1)],1)],1)},staticRenderFns:[]};var u=a("VU/8")(d,f,!1,function(t){a("CHb/")},"data-v-393e0280",null).exports,p=a("RUzx"),b={name:"calculator",components:{ticket:u,Multiselect:a.n(p).a},props:{},computed:{nameState:function(){return this.form2.listName.length>0}},data:function(){return{checkSelect:!1,options:[],value:[],optionsDate:[{name:"一",code:0},{name:"二",code:1},{name:"三",code:2},{name:"四",code:3},{name:"五",code:4},{name:"六",code:5},{name:"日",code:6}],valueDate:[],APIbaseURL:"https://hey300dollars.com/api/poker",form2:{listName:"",list:[],date:[],cost:[]}}},mounted:function(){this.$route.query.name&&(document.getElementById("welcome").innerHTML="Hi! "+this.$route.query.name),"web"==this.$route.query.os&&(document.getElementById("fillcontain").innerHTML="<p class='content'>請至智慧型手機使用相關功能！</p>")},created:function(){var t=this;"online"==this.$route.params.id||m()({method:"post",baseURL:this.APIbaseURL,url:"/brand_list/get"}).then(function(e){t.options=e.data.data})},methods:{reset:function(){this.clear()},clear:function(){},update:function(){if("online"==this.$route.params.id){if(0==this.form2.list.length||0==this.form2.cost.length||0==this.form2.date.length||""==this.form2.listName)return void(this.checkSelect=!0)}else if(0==this.form2.list.length||0==this.form2.date.length||""==this.form2.listName)return void(this.checkSelect=!0);this.checkSelect=!1;var t={track_name:this.form2.listName,user_id:this.$route.query.uid,brand_list:this.form2.list,week_list:this.form2.date};m()({method:"post",baseURL:this.APIbaseURL,url:"/track_list/update",data:t,headers:{"Content-Type":"application/json"}}).then(function(t){})}}},_={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"fillcontain",attrs:{id:"fillcontain"}},[a("b-card",{attrs:{"no-body":""}},[a("div",{staticClass:"incomePage"},[a("b-form",{ref:"form2",staticClass:"form2",attrs:{model:t.form2}},[a("b-form-group",{attrs:{label:"清單名稱","label-size":"lg","label-class":"font-weight-bold","label-for":"incomePage_5"}},[a("b-col",[a("b-form-input",{staticClass:"incomePage_5 blue_box",attrs:{placeholder:"請輸入清單名稱"},on:{change:function(e){return t.clear()}},model:{value:t.form2.listName,callback:function(e){t.$set(t.form2,"listName",e)},expression:"form2.listName"}})],1)],1),t._v(" "),a("b-form-group",{attrs:{"label-size":"lg","label-class":"font-weight-bold",label:"online"==this.$route.params.id?"選擇APP":"選擇協會","label-for":"incomePage_10"}},[a("b-col",[a("el-select",{staticClass:"incomePage_10 blue_box",attrs:{multiple:"",placeholder:"請選擇協會"},model:{value:t.form2.list,callback:function(e){t.$set(t.form2,"list",e)},expression:"form2.list"}},t._l(t.options,function(e){return a("el-option-group",{key:e.location,attrs:{label:e.location}},t._l(e.libs,function(t){return a("el-option",{key:t.brand_id,attrs:{label:t.brand_key,value:t.brand_id}})}),1)}),1)],1)],1),t._v(" "),a("b-form-group",{attrs:{"label-size":"lg","label-class":"font-weight-bold",label:"每個禮拜","label-for":"incomePage_11"}},[a("b-col",[a("el-select",{staticClass:"incomePage_11 blue_box",attrs:{multiple:"",placeholder:"請選擇星期"},model:{value:t.form2.date,callback:function(e){t.$set(t.form2,"date",e)},expression:"form2.date"}},t._l(t.optionsDate,function(t){return a("el-option",{key:t.code,attrs:{label:t.name,value:t.code}})}),1)],1)],1),t._v(" "),"online"==this.$route.params.id?a("b-form-group",{attrs:{"label-size":"lg","label-class":"font-weight-bold",label:"報名費用","label-for":"incomePage_12"}},[a("b-col",[a("el-select",{staticClass:"incomePage_12 blue_box",attrs:{multiple:"",placeholder:"請選擇星期"},model:{value:t.form2.date,callback:function(e){t.$set(t.form2,"date",e)},expression:"form2.date"}},t._l(t.optionsDate,function(t){return a("el-option",{key:t.code,attrs:{label:t.name,value:t.code}})}),1)],1)],1):t._e(),t._v(" "),t.checkSelect?a("span",{staticClass:"updateBtn",staticStyle:{color:"red"}},[t._v("請輸入欄位")]):t._e(),t._v(" "),a("b-button",{staticClass:"updateBtn",attrs:{type:"button",variant:"primary"},on:{click:t.update}},[t._v("確定")])],1)],1)])],1)},staticRenderFns:[]};var g=a("VU/8")(b,_,!1,function(t){a("DK2F"),a("HDKY")},"data-v-4901c056",null).exports,C=a("Xxa5"),y=a.n(C),x=a("exGp"),P=a.n(x),w=a("/T34"),k=a.n(w),S={name:"bind",data:function(){return{APIbaseURL:"https://theflowchat.com:5001",form:{phone:"",code:"",gender:"n",year:"",month:"",day:""},show1:!0,show2:!1,show3:!1,showVerifyError:!1,showSomethingError:!1,showBindError:!1,token:"",today:new Date,LiffId:"",userId:"",userName:"",errorMsg:""}},created:function(){},mounted:function(){var t=this;this.$route.query.name&&(document.getElementById("welcome").innerHTML="Hi! "+this.$route.query.name),"web"==this.$route.query.os&&(document.getElementById("bindMain").innerHTML="<p class='content'>請至智慧型手機使用相關功能！</p>"),m()({method:"post",baseURL:this.APIbaseURL,url:"/flow/get_token",data:{id:"adbest",pw:"ricky95288888"},headers:{"Content-Type":"application/json"}}).then(function(e){t.token="Bearer "+e.data.token});var e;e=P()(y.a.mark(function e(){return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m()({method:"post",baseURL:t.APIbaseURL,url:"/flow/get_liff",data:{identity:t.$route.params.id,liff_type:"memberlink"},headers:{"Content-Type":"application/json"}}).then(function(e){200==e.status?t.LiffId=e.data.liffId:console.debug("get liff error")});case 2:case"end":return e.stop()}},e,t)}))},computed:{validationPhone:function(){return/^09[0-9]{8}$/.test(this.form.phone)&&""==!this.form.phone},validationCode:function(){return/^([0-9]|[A-Z]|[a-z]){6}$/.test(this.form.code)&&""==!this.form.code},validationYear:function(){return/^(19|20)[0-9]{2}$/.test(this.form.year)&&""==!this.form.year&&this.form.year<=this.today.getFullYear()},validationMonth:function(){return parseInt(this.form.month)>0&&parseInt(this.form.month)<13&&""==!this.form.month},validationDay:function(){return parseInt(this.form.day)>0&&parseInt(this.form.day)<32&&""==!this.form.day}},methods:{closeLiff:function(){k.a.closeWindow()},firstNext:function(){var t=this;this.validationPhone&&m()({method:"post",baseURL:this.APIbaseURL,url:"/flow/get_code",data:{phone:this.form.phone,identity:this.$route.params.id},headers:{"Content-Type":"application/json",Authorization:this.token}}).then(function(e){200==e.status&&1==e.data.log?(t.token=e.data.token,document.getElementById("li-2").classList.add("active"),t.show1=!1,t.show2=!0):(t.errorMsg=e.data.message,t.show1=!1,t.showSomethingError=!0)})},firstPre:function(){document.getElementById("li-2").classList.remove("active"),this.show1=!0,this.show2=!1},secondNext:function(){var t=this;if(this.validationYear||this.validationMonth||this.validationDay){var e={token:this.token,code:this.form.code,identity:this.$route.params.id,user_id:this.$route.query.uid,birth:this.form.year+"-"+this.form.month+"-"+this.form.day,phone:this.form.phone,gender:"n"==this.form.gender?"s":this.form.gender};m()({method:"post",baseURL:this.APIbaseURL,url:"/FL_verify",data:e,headers:{"Content-Type":"application/json"}}).then(function(e){200==e.status?(t.show2=!1,"DONE"==e.data.message?(document.getElementById("li-3").classList.add("active"),t.show3=!0):"verify code error"==e.data.message?t.showVerifyError=!0:t.showBindError=!0):(t.show2=!1,t.showSomethingError=!0)})}},yearInput:function(){4==this.form.year.length&&document.getElementById("month").focus()},monthInput:function(){(parseInt(this.form.month)>1||2==this.form.month.length)&&document.getElementById("day").focus()}}},I={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bind",attrs:{id:"bindMain"}},[a("section",{staticClass:"form",staticStyle:{"background-color":"rgba(0,0,0,0)"},attrs:{id:"contact"}},[a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 col-md-6 align-self-center text-center text-md-left"},[t.show3?a("div",{staticClass:"row success message",attrs:{id:"bind-success-modal"}},[a("div",{staticClass:"col-12 p-0"},[a("i",{staticClass:"icon bigger icon-check"}),t._v(" "),a("h3",{staticStyle:{"font-family":"'Microsoft JhengHei', sans-serif"}},[t._v("綁定成功")]),t._v(" "),a("a",{staticClass:"btn mx-auto primary-button",attrs:{id:"finish"},on:{click:t.closeLiff}},[a("i",{staticClass:"icon-check"}),t._v("完成\n              ")])])]):t._e(),t._v(" "),t.showVerifyError?a("div",{staticClass:"row success message",attrs:{id:"code-error-modal"}},[t._m(0)]):t._e(),t._v(" "),t.showBindError?a("div",{staticClass:"row success message",attrs:{id:"bind-error-modal"}},[t._m(1)]):t._e(),t._v(" "),t.showSomethingError?a("div",{staticClass:"row success message",attrs:{id:"bind-error-modal"}},[a("div",{staticClass:"col-12 p-0"},[a("i",{staticClass:"icon bigger icon-close"}),t._v(" "),t.errorMsg.length?a("h3",{staticStyle:{"font-family":"'Microsoft JhengHei', sans-serif"}},[t._v(t._s(t.errorMsg))]):a("h3",{staticStyle:{"font-family":"'Microsoft JhengHei', sans-serif"}},[t._v("綁定異常")]),t._v(" "),a("p",[t._v("請聯絡客服")]),t._v(" "),t._m(2)])]):t._e(),t._v(" "),t.show3?t._e():a("div",{staticClass:"row intro"},[a("div",{staticClass:"col-12 p-0"},[a("h2",{staticClass:"featured alt",staticStyle:{"font-family":"'Microsoft JhengHei', sans-serif"}}),t._v(" "),t.show3||t.showBindError||t.showSomethingError||t.showVerifyError?t._e():a("div",[a("h2",{staticClass:"featured alt",attrs:{id:"welcome"}}),t._v(" "),t.show1?a("p",{attrs:{id:"text-1"}},[t._v("輸入手機號碼，系統會將驗證碼以簡訊傳送給您")]):t._e(),t._v(" "),t.show2?a("p",{attrs:{id:"text-2"}},[t._v("請填入驗證碼")]):t._e()])])]),t._v(" "),a("div",{staticClass:"row text-center"},[a("div",{staticClass:"col-12 p-0"},[a("b-form",{staticStyle:{height:"400px"},attrs:{id:"msform"}},[t.show3||t.showBindError||t.showSomethingError||t.showVerifyError?t._e():a("ul",{attrs:{id:"progressbar"}},[a("li",{staticClass:"active",attrs:{id:"li-1"}},[t._v("取得驗證碼")]),t._v(" "),a("li",{attrs:{id:"li-2"}},[t._v("輸入資料")]),t._v(" "),a("li",{attrs:{id:"li-3"}},[t._v("綁定完成")])]),t._v(" "),t.show1?a("fieldset",{attrs:{id:"group-1"}},[a("div",{staticClass:"row"},[a("label",{attrs:{for:"name"}},[t._v("手機號碼")])]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 input-group p-0"},[a("b-form-input",{staticClass:"form-control input-style",attrs:{state:t.validationPhone,type:"tel",id:"phone",name:"phone",minlength:"10",maxlength:"13",placeholder:"請輸入手機號碼",required:""},model:{value:t.form.phone,callback:function(e){t.$set(t.form,"phone",e)},expression:"form.phone"}})],1)]),t._v(" "),a("div",{staticClass:"col-12 input-group p-0",on:{click:t.firstNext}},[a("a",{staticClass:"next btn primary-button",attrs:{id:"next-1"}},[t._v("\n                      下一步\n                      "),a("i",{staticClass:"btn-icon icon-arrow-right-circle left"})])])]):t._e(),t._v(" "),t.show2?a("fieldset",{attrs:{id:"group-2"}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 input-group p-0"},[a("b-form-input",{staticClass:"form-control input-style",attrs:{state:t.validationCode,type:"tel",id:"VerificationCode",name:"VerificationCode",minlength:"6",maxlength:"6",placeholder:"驗證碼",required:""},model:{value:t.form.code,callback:function(e){t.$set(t.form,"code",e)},expression:"form.code"}})],1)]),t._v(" "),a("div",{staticClass:"row"},[a("label",{attrs:{for:"gender"}},[t._v("性別")])]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 input-group p-0"},[a("i",{staticClass:"icon-arrow-down"}),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.form.gender,expression:"form.gender"}],staticClass:"form-control input-style",attrs:{id:"gender",name:"gender",minlength:"1",required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.form,"gender",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:"n",selected:"",disabled:""}},[t._v("請選擇性別")]),t._v(" "),a("option",{attrs:{value:"m"}},[t._v("男")]),t._v(" "),a("option",{attrs:{value:"f"}},[t._v("女")]),t._v(" "),a("option",{attrs:{value:"s"}},[t._v("秘密")])])])]),t._v(" "),a("div",{staticClass:"row"},[a("label",{attrs:{for:"year"}},[t._v("生日")])]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-4 input-group p-0"},[a("b-form-input",{staticClass:"form-control input-style",attrs:{state:t.validationYear,type:"tel",id:"year",name:"year",minlength:"4",maxlength:"4",placeholder:"西元年",required:""},on:{input:t.yearInput},model:{value:t.form.year,callback:function(e){t.$set(t.form,"year",e)},expression:"form.year"}})],1),t._v(" "),a("div",{staticClass:"col-1 input-group p-0"}),t._v(" "),a("div",{staticClass:"col-3 input-group p-0"},[a("b-form-input",{staticClass:"form-control input-style",attrs:{state:t.validationMonth,type:"tel",id:"month",name:"month",minlength:"1",maxlength:"2",placeholder:"月",required:""},on:{input:t.monthInput},model:{value:t.form.month,callback:function(e){t.$set(t.form,"month",e)},expression:"form.month"}})],1),t._v(" "),a("div",{staticClass:"col-1 input-group p-0"}),t._v(" "),a("div",{staticClass:"col-3 input-group p-0"},[a("b-form-input",{staticClass:"form-control input-style",attrs:{state:t.validationDay,type:"tel",id:"day",name:"day",minlength:"1",maxlength:"2",placeholder:"日",required:""},model:{value:t.form.day,callback:function(e){t.$set(t.form,"day",e)},expression:"form.day"}})],1)]),t._v(" "),a("div",{staticClass:"col-12 input-group p-0 d-flex justify-content-center justify-content-md-start"},[a("a",{staticClass:"previous btn primary-button mr-4",attrs:{id:"prev-2"},on:{click:t.firstPre}},[a("i",{staticClass:"btn-icon icon-arrow-left-circle"}),t._v("上一步\n                    ")]),t._v(" "),a("a",{staticClass:"next btn primary-button",attrs:{id:"next-2"},on:{click:t.secondNext}},[t._v("\n                      下一步\n                      "),a("i",{staticClass:"btn-icon icon-arrow-right-circle left"})])])]):t._e()])],1)])])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"col-12 p-0"},[e("i",{staticClass:"icon bigger icon-close"}),this._v(" "),e("h3",{staticStyle:{"font-family":"'Microsoft JhengHei', sans-serif"}},[this._v("驗證碼錯誤")]),this._v(" "),e("p",[this._v("請重新輸入")]),this._v(" "),e("a",{staticClass:"btn mx-auto primary-button",attrs:{id:"code-error-ckeck",href:""}},[e("i",{staticClass:"icon-check"}),this._v("確定\n              ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"col-12 p-0"},[e("i",{staticClass:"icon bigger icon-close"}),this._v(" "),e("h3",{staticStyle:{"font-family":"'Microsoft JhengHei', sans-serif"}},[this._v("綁定錯誤")]),this._v(" "),e("p",[this._v("請重新綁定")]),this._v(" "),e("a",{staticClass:"btn mx-auto primary-button",attrs:{id:"bind-error-ckeck",href:""}},[e("i",{staticClass:"icon-check"}),this._v("確定\n              ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"btn mx-auto primary-button",attrs:{id:"bind-error-ckeck",href:""}},[e("i",{staticClass:"icon-check"}),this._v("確定\n              ")])}]};var $=a("VU/8")(S,I,!1,function(t){a("zs2r")},"data-v-922b822e",null).exports;s.default.use(o.a);var T=new o.a({mode:"history",base:"/cal/",routes:[{path:"",redirect:"/HelloWorld"},{path:"/HelloWorld",name:"HelloWorld",component:l},{path:"/bind/:id",name:"bind",meta:{title:"會員綁定"},component:$},{path:"/tool/:id?",name:"calculator",meta:{title:"設定追蹤清單"},component:g}]});T.beforeEach(function(t,e,a){t.meta.title&&(document.title=t.meta.title),a()});var R=T,M=a("gwsl"),E=a.n(M),N=a("zL8q"),D=a.n(N),L=a("Tqaz");a("Jmt5"),a("9M+g");s.default.use(D.a,{size:"mini",locale:E.a}),s.default.use(L.a),s.default.use(L.b),a.e(0).then(a.bind(null,"tvR6")),s.default.config.productionTip=!1,new s.default({el:"#app",router:R,components:{App:r},template:"<App/>"})},qf9G:function(t,e){},zs2r:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.49728a8c9f68a663fe00.js.map