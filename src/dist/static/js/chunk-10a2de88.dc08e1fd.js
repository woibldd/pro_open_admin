(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-10a2de88"],{"33c6":function(t,e,a){},3875:function(t,e,a){"use strict";a("d878")},"3c4a":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-header"},[a("h3",[t._v(t._s(t.title))])])},r=[],i={name:"ContainerHeader",props:{title:{type:String,default:""}},data:function(){return{}},created:function(){},methods:{}},l=i,s=(a("e9e6"),a("2877")),o=Object(s["a"])(l,n,r,!1,null,"155e36a6",null);e["a"]=o.exports},"7db0":function(t,e,a){"use strict";var n=a("23e7"),r=a("b727").find,i=a("44d2"),l=a("ae40"),s="find",o=!0,u=l(s);s in[]&&Array(1)[s]((function(){o=!1})),n({target:"Array",proto:!0,forced:o||!u},{find:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),i(s)},"7f33":function(t,e,a){"use strict";a.d(e,"b",(function(){return r})),a.d(e,"a",(function(){return i})),a.d(e,"c",(function(){return l}));var n=a("b775");function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{pageNum:1,pageSize:10};return Object(n["a"])({url:"/nft/list",method:"get",params:t})}function i(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{id:0};return Object(n["a"])({url:"/nft/detail",method:"get",params:t})}function l(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(n["a"])({url:"/nft/verify",method:"post",data:t})}},a88e:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container tokenDetails"},[a("div",{staticClass:"header"},[a("div",{staticClass:"icon-info"},[a("el-avatar",{staticClass:"icon",attrs:{shape:"circle",size:50,fit:"fit",src:t.dataInfo.image_url_cdn,alt:"alt"}}),a("h1",{staticClass:"symbol"},[t._v(t._s(t.dataInfo.coin))]),a("div",{staticClass:"name"},[t._v(t._s(t.dataInfo.name))]),a("el-tag",{staticClass:"chain",staticStyle:{"margin-right":"5px"},attrs:{size:"small",type:"info"}},[t._v(t._s(t._f("UpperCase")(t.dataInfo.chain))+"链")]),t.dataInfo.contract||2==t.dataInfo.contract.length?a("el-tag",{attrs:{size:"small",type:"info"}},[t._v("代币")]):t._e(),a("el-select",{staticClass:"lang",attrs:{placeholder:"语言展示"},on:{change:t.langChange},model:{value:t.lang,callback:function(e){t.lang=e},expression:"lang"}},t._l(t.languageTypeOptions,(function(t){return a("el-option",{key:t.lang,attrs:{label:t.lang,value:t.lang}})})),1)],1),a("div",[a("el-tag",{attrs:{type:t._f("appovalFilterColor")(t.dataInfo.status)}},[t._v(t._s(t._f("appovalFilter")(t.dataInfo.status)))])],1)]),2==t.dataInfo.status&&t.dataInfo.remark?a("div",{staticStyle:{"margin-top":"30px"}},[a("el-alert",{attrs:{type:"error"}},[t._v(" 拒绝原因： "+t._s(t.dataInfo.remark)+" ")])],1):t._e(),a("el-form",{staticClass:"body",attrs:{inline:!0,"label-position":"right"}},[a("div",{staticClass:"info"},[a("el-divider",{staticClass:"title"},[t._v("基本信息")]),a("el-row",{staticClass:"content",attrs:{gutter:10}},t._l(t.IconColumus,(function(e){return a("el-col",{key:e.key,attrs:{xs:e.xs||24,sm:e.sm||8}},["href"==e.type?a("el-form-item",{attrs:{label:e.label||e.key}},[a("el-link",{attrs:{href:e.value,target:"_blank"}},[t._v(t._s(e.filter?e.filter(e.value):e.value))])],1):"image"==e.type?a("el-form-item",{attrs:{label:e.label||e.key}},[a("el-avatar",{attrs:{shape:"circle",size:30,fit:"fit",src:e.value,alt:"alt"}})],1):"array"==e.type?a("el-form-item",{attrs:{label:e.label||e.key}},[a("el-col",{attrs:{xs:e.xs||24,sm:e.sm||8}},t._l(e.value||[],(function(n){return a("el-form-item",{key:n.key,attrs:{label:n.label||n.key}},[t._v(" "+t._s(e.value)+" ")])})),1)],1):a("el-form-item",{attrs:{label:e.label||e.key}},[t._v(" "+t._s(e.filter?e.filter(e.value):e.value)+" ")])],1)})),1),a("el-divider",{staticClass:"title"},[t._v("NFT介绍")]),a("el-row",{staticClass:"content",attrs:{gutter:10}},t._l(t.OtherColumus,(function(e){return a("el-col",{key:e.key,attrs:{xs:e.xs||24,sm:e.sm||8,span:e.span||8}},[a("el-form-item",{attrs:{label:e.label||e.key}},[t._v(" "+t._s(e.value)+" ")])],1)})),1),a("el-divider",{staticClass:"title"},[t._v("其他信息")]),a("el-row",{staticClass:"content",attrs:{gutter:10}},t._l(t.Other1Columus,(function(e){return a("el-col",{key:e.key,attrs:{xs:e.xs||24,sm:e.sm||8}},[a("el-form-item",{attrs:{label:e.label||e.key}},[t._v(" "+t._s(e.value)+" ")])],1)})),1)],1)]),a("div",{staticClass:"footer"},[0==t.dataInfo.status?a("el-button",{attrs:{type:"danger",loading:t.submitLoading},on:{click:t.refuse}},[t._v(" 拒绝审核 ")]):t._e(),0==t.dataInfo.status?a("el-button",{attrs:{type:"primary",loading:t.submitLoading},on:{click:function(e){return t.submitApproval(1)}}},[t._v(" 审核通过 ")]):t._e()],1),a("el-dialog",{attrs:{title:"拒绝原因",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{ref:"dataForm",attrs:{model:t.formData,"label-position":"right","label-width":"80px"}},[a("el-form-item",{staticStyle:{"max-width":"100%"},attrs:{label:"拒绝原因",prop:"remark",rules:[{required:!0,message:"请填写拒绝原因"}]}},[a("el-input",{staticStyle:{"max-width":"100%"},attrs:{autosize:{minRows:2,maxRows:4},type:"textarea",placeholder:"请填写拒绝原因"},model:{value:t.formData.remark,callback:function(e){t.$set(t.formData,"remark",e)},expression:"formData.remark"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v(" 取消 ")]),a("el-button",{attrs:{type:"danger",loading:t.submitLoading},on:{click:function(e){return t.submitApproval(2)}}},[t._v(" 审核不通过 ")])],1)],1)],1)},r=[],i=a("1da1"),l=(a("96cf"),a("7db0"),a("d81d"),a("3c4a")),s=a("7f33"),o=a("ed08"),u=[{id:"en",lang:"en",tagtype:"warn"}],c=[{label:"NFT名称:",key:"title",type:"string",show:!1,value:""},{label:"图标:",key:"image_url_cdn",type:"image",show:!1,value:""},{label:"主链:",key:"chain",type:"string",show:!1,value:"",filter:o["a"]},{label:"合约:",key:"contract",type:"string",show:!1,value:""},{label:"数量:",key:"items_number",type:"string",show:!1,value:""}],f=[{label:"NFT渠道:",key:"channel",type:"string",show:!1,value:""},{label:"NFT介绍:",key:"introduction",span:24,type:"string",show:!1,value:""},{label:"对应线上collectionId:",key:"collection_id",span:24,type:"string",show:!1,value:""}],d=[{label:"生日：",key:"birthday_time",type:"href",show:!1,value:""},{label:"排序：",key:"sort",type:"href",show:!1,value:""},{label:"是否上线：",key:"is_online",type:"href",show:!1,value:""},{label:"拒绝审核原因：",key:"remark",type:"href",show:!1,value:""}],m=[{key:0,display_name:"审核中",tagtype:"warn"},{key:1,display_name:"审核通过",tagtype:"success"},{key:2,display_name:"审核拒绝",tagtype:"danger"}],p={name:"approval_token_detail",components:{ContainerHeader:l["a"]},data:function(){return{languageTypeOptions:u,lang:"en",dataInfo:{multiLanguageList:[],contract:""},formData:{remark:""},submitLoading:!1,dialogFormVisible:!1,IconColumus:c,OtherColumus:f,Other1Columus:d}},computed:{},filters:{appovalFilter:function(t){var e=m.find((function(e){return e.key==t}))||{display_name:""},a=e.display_name;return a},appovalFilterColor:function(t){var e=m.find((function(e){return e.key==t}))||{tagtype:"info"},a=e.tagtype;return a},UpperCase:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return t.toUpperCase()}},created:function(){this.init()},methods:{init:function(){var t=this;Object(s["a"])({id:this.$route.params.id}).then((function(e){if(e.data){var a=e.data;t.dataInfo=Object.assign(t.dataInfo,a),t.languageTypeOptions=a.multiLanguageList&&a.multiLanguageList.length>0?a.multiLanguageList:[{id:"",lang:"en",data:a}],t.IconColumus=t.IconColumus.map((function(t){return a[t.key]&&(t.show=!0,t.value=a[t.key]),t})),t.OtherColumus=t.OtherColumus.map((function(t){return a[t.key]&&(t.show=!0,t.value=a[t.key]),t}))}})).catch((function(t){return console.error(t)}))},langChange:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:n=e.languageTypeOptions.find((function(e){return e.id==t})),n&&n.data&&Object.assign(e.dataInfo,n.data);case 2:case"end":return a.stop()}}),a)})))()},submitApproval:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(1!=t){a.next=8;break}return a.next=3,e.$confirm("确认通过后将在页面中显示改币种，确认审核通过？");case 3:if(n=a.sent,"confirm"===n){a.next=6;break}return a.abrupt("return");case 6:a.next=10;break;case 8:return a.next=10,e.$refs["dataForm"].validate();case 10:e.submitLoading=!0,Object(s["c"])({id:e.dataInfo.id,status:t,remark:e.formData.remark}).then((function(t){e.init(),e.$notify({title:"提示",message:"提交成功",type:"success",duration:2e3}),e.submitLoading=!1,e.dialogFormVisible=!1})).catch((function(t){e.init(),e.submitLoading=!1}));case 12:case"end":return a.stop()}}),a)})))()},refuse:function(){var t=this;this.$nextTick((function(){t.formData.remark="",t.$refs["dataForm"].clearValidate()})),this.dialogFormVisible=!0}}},g=p,v=(a("3875"),a("2877")),y=Object(v["a"])(g,n,r,!1,null,"1cc8de09",null);e["default"]=y.exports},d878:function(t,e,a){},e9e6:function(t,e,a){"use strict";a("33c6")}}]);