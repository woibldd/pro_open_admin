(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-41b37f2e"],{"37e1d":function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"a",(function(){return s})),a.d(e,"c",(function(){return l}));var r=a("b775");function n(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{pageNum:1,pageSize:10};return Object(r["a"])({url:"/token/list",method:"get",params:t})}function s(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{id:0};return Object(r["a"])({url:"/token/detail",method:"get",params:t})}function l(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(r["a"])({url:"/token/verify",method:"post",data:t})}},"3c4a":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-header"},[a("h3",[t._v(t._s(t.title))])])},n=[],s={name:"containerheader",props:{title:{type:String,default:""}},data:function(){return{}},created:function(){},methods:{}},l=s,i=(a("3f81"),a("2877")),o=Object(i["a"])(l,r,n,!1,null,"3aae08ad",null);e["a"]=o.exports},"3f81":function(t,e,a){"use strict";a("6618")},"5fba":function(t,e,a){"use strict";a("c0c3")},6618:function(t,e,a){},b9ea:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container tokenDetails"},[a("div",{staticClass:"header"},[a("div",{staticClass:"icon-info"},[a("el-avatar",{staticClass:"icon",attrs:{shape:"circle",size:50,fit:"fit",src:"https://s2.coinmarketcap.com/static/img/coins/64x64/12909.png",alt:"alt"}}),a("h1",{staticClass:"name"},[t._v("Moby Dick")]),a("el-tag",{staticClass:"symbol",staticStyle:{"margin-right":"5px"},attrs:{size:"small",type:"info"}},[t._v("WOT")]),a("el-tag",{attrs:{size:"small",type:"info"}},[t._v("代币")]),a("el-select",{staticClass:"lang",attrs:{placeholder:"语言展示"},model:{value:t.dataInfo.lang,callback:function(e){t.$set(t.dataInfo,"lang",e)},expression:"dataInfo.lang"}},t._l(t.calendarTypeOptions,(function(t){return a("el-option",{key:t.key,attrs:{label:t.display_name+"("+t.key+")",value:t.key}})})),1)],1)]),a("el-form",{staticClass:"body",attrs:{inline:!0,"label-position":"right"}},[a("div",{staticClass:"info"},[a("el-divider",{staticClass:"title"},[t._v("基本信息")]),a("el-row",{staticClass:"content",attrs:{gutter:10}},t._l(t.IconColumus,(function(e){return a("el-col",{key:e.key,attrs:{xs:e.xs||24,sm:e.sm||8}},["href"==e.type?a("el-form-item",{attrs:{label:e.label||e.key}},[a("el-link",{attrs:{href:e.value,target:"_blank"}},[t._v(t._s(e.value))])],1):"array"==e.type?a("el-form-item",{attrs:{label:e.label||e.key}},[a("el-col",{attrs:{xs:e.xs||24,sm:e.sm||8}},t._l(e.value||[],(function(r){return a("el-form-item",{key:r.key,attrs:{label:r.label||r.key}},[t._v(" "+t._s(e.value)+" ")])})),1)],1):a("el-form-item",{attrs:{label:e.label||e.key}},[t._v(" "+t._s(e.value)+" ")])],1)})),1),a("el-divider",{staticClass:"title"},[t._v("token介绍")]),a("el-row",{staticClass:"content",attrs:{gutter:10}},t._l(t.OtherColumus,(function(e){return a("el-col",{key:e.key,attrs:{xs:e.xs||24,sm:e.sm||8,span:e.span||8}},[a("el-form-item",{attrs:{label:e.label||e.key}},[t._v(" "+t._s(e.value)+" ")])],1)})),1),a("el-divider",{staticClass:"title"},[t._v("其他信息")]),a("el-row",{staticClass:"content",attrs:{gutter:10}},t._l(t.Other1Columus,(function(e){return a("el-col",{key:e.key,attrs:{xs:e.xs||24,sm:e.sm||8}},[a("el-form-item",{attrs:{label:e.label||e.key}},[t._v(" "+t._s(e.value)+" ")])],1)})),1)],1)]),a("div",{staticClass:"footer"},[0==t.dataInfo.status?a("el-button",{attrs:{type:"danger",loading:t.submitLoading},on:{click:t.refuse}},[t._v(" 拒绝审核 ")]):t._e(),0==t.dataInfo.status?a("el-button",{attrs:{type:"primary",loading:t.submitLoading},on:{click:function(e){return t.submitApproval(1)}}},[t._v(" 审核通过 ")]):t._e()],1),a("el-dialog",{attrs:{title:"拒绝原因",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{ref:"dataForm",attrs:{model:t.formData,"label-position":"right","label-width":"80px"}},[a("el-form-item",{staticStyle:{"max-width":"100%"},attrs:{label:"拒绝原因",prop:"remark",rules:[{required:!0,message:"请填写拒绝原因"}]}},[a("el-input",{staticStyle:{"max-width":"100%"},attrs:{autosize:{minRows:2,maxRows:4},type:"textarea",placeholder:"请填写拒绝原因"},model:{value:t.formData.remark,callback:function(e){t.$set(t.formData,"remark",e)},expression:"formData.remark"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v(" 取消 ")]),a("el-button",{attrs:{type:"danger",loading:t.submitLoading},on:{click:function(e){return t.submitApproval(0)}}},[t._v(" 审核不通过 ")])],1)],1)],1)},n=[],s=a("1da1"),l=(a("96cf"),a("d81d"),a("3c4a")),i=a("37e1d"),o=(a("ed08"),[{key:"en",display_name:"英文",tagtype:"warn"}]),c=[{label:"货币:",key:"coin",type:"string",show:!1,value:""},{label:"主链:",key:"chain",type:"string",show:!1,value:""},{label:"合约:",key:"contract",type:"string",show:!1,value:""},{label:"全名:",key:"name",type:"string",show:!1,value:""},{label:"图标:",key:"icon",type:"image",show:!1,value:""}],u=[{label:"精度:",key:"decimals",type:"string",show:!1,value:""},{label:"币价:",key:"price",type:"string",show:!1,value:""},{label:"币价来源:",key:"price_from",type:"string",show:!1,value:""},{label:"货币介绍:",key:"abort",span:24,type:"string",show:!1,value:""}],m=[{label:"浏览器（TXID）:",key:"browserTx",type:"string",show:!1,value:""},{label:"货币介绍:",key:"abort",type:"string",show:!1,value:""},{label:"白皮书地址:",key:"whitepaper",type:"href",show:!1,value:""},{label:"工具栏:",key:"coin",type:"string",show:!1,value:""}],d={name:"approval_token_detail",components:{ContainerHeader:l["a"]},data:function(){return{calendarTypeOptions:o,dataInfo:{lang:"en"},formData:{remark:""},submitLoading:!1,dialogFormVisible:!1,IconColumus:c,OtherColumus:u,Other1Columus:m}},computed:{},filters:{},created:function(){this.init()},methods:{init:function(){var t=this;Object(i["a"])({id:this.$route.params.id}).then((function(e){if(e.data&&0!=e.data.length){var a=e.data[0];t.dataInfo=a,t.IconColumus=t.IconColumus.map((function(t){return a[t.key]&&(t.show=!0,t.value=a[t.key]),t})),t.OtherColumus=t.OtherColumus.map((function(t){return a[t.key]&&(t.show=!0,t.value=a[t.key]),t}))}})).catch((function(t){return console.error(t)}))},submitApproval:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(1!=t){a.next=8;break}return a.next=3,e.$confirm("确认通过后将在页面中显示改币种，确认审核通过？");case 3:if(r=a.sent,"confirm"===r){a.next=6;break}return a.abrupt("return");case 6:a.next=10;break;case 8:return a.next=10,e.$refs["dataForm"].validate();case 10:e.submitLoading=!0,Object(i["c"])({id:e.dataInfo.id,status:t,remark:e.formData.remark}).then((function(t){e.$notify({title:"提示",message:"提交成功",type:"success",duration:2e3}),e.submitLoading=!1,e.dialogFormVisible=!1})).catch((function(t){e.submitLoading=!1}));case 12:case"end":return a.stop()}}),a)})))()},refuse:function(){var t=this;this.$nextTick((function(){t.formData.remark="",t.$refs["dataForm"].clearValidate()})),this.dialogFormVisible=!0}}},f=d,p=(a("5fba"),a("2877")),b=Object(p["a"])(f,r,n,!1,null,"1d31a3bc",null);e["default"]=b.exports},c0c3:function(t,e,a){}}]);