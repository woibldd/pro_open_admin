(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7589bdde"],{"33c6":function(a,e,t){},"3c4a":function(a,e,t){"use strict";var n=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"container-header"},[t("h3",[a._v(a._s(a.title))])])},i=[],r={name:"ContainerHeader",props:{title:{type:String,default:""}},data:function(){return{}},created:function(){},methods:{}},o=r,l=(t("e9e6"),t("2877")),s=Object(l["a"])(o,n,i,!1,null,"155e36a6",null);e["a"]=s.exports},"7db0":function(a,e,t){"use strict";var n=t("23e7"),i=t("b727").find,r=t("44d2"),o=t("ae40"),l="find",s=!0,c=o(l);l in[]&&Array(1)[l]((function(){s=!1})),n({target:"Array",proto:!0,forced:s||!c},{find:function(a){return i(this,a,arguments.length>1?arguments[1]:void 0)}}),r(l)},"90e5":function(a,e,t){"use strict";t("933a")},"933a":function(a,e,t){},a66e:function(a,e,t){"use strict";t("e0a8")},bb57:function(a,e,t){"use strict";t.r(e);var n=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"app-container tokenDetails"},[t("div",{staticClass:"header"},[t("div",{staticClass:"icon-info"},[t("el-avatar",{staticClass:"icon",attrs:{shape:"circle",size:50,fit:"fit",src:a.dataInfo.icon,alt:"alt"}}),t("h1",{staticClass:"symbol"},[a._v(a._s(a.dataInfo.coin))]),t("div",{staticClass:"name"},[a._v(a._s(a.dataInfo.name))]),t("el-select",{staticClass:"lang",attrs:{placeholder:"语言展示"},on:{change:a.langChange},model:{value:a.lang,callback:function(e){a.lang=e},expression:"lang"}},a._l(a.languageTypeOptions,(function(a){return t("el-option",{key:a.lang,attrs:{label:a.lang,value:a.lang}})})),1)],1),t("div",[t("el-tag",{attrs:{type:a._f("appovalFilterColor")(a.dataInfo.status)}},[a._v(a._s(a._f("appovalFilter")(a.dataInfo.status)))]),t("el-tag",{staticStyle:{"margin-left":"5px"},attrs:{type:a._f("appovalFilterColor")(1==a.dataInfo.is_online?1:2)}},[a._v(a._s(1==a.dataInfo.is_online?"已上线":"未上线"))])],1)]),2==a.dataInfo.status&&a.dataInfo.remark?t("div",{staticStyle:{"margin-top":"30px"}},[t("el-alert",{attrs:{type:"error"}},[a._v(" 拒绝原因： "+a._s(a.dataInfo.remark)+" ")])],1):a._e(),t("el-form",{staticClass:"body"},[t("div",{staticClass:"info"},[t("el-divider",{staticClass:"title"},[a._v("基本信息")]),t("el-row",{staticClass:"content",attrs:{gutter:10}},a._l(a.IconColumus,(function(e){return t("el-col",{key:e.key,attrs:{xs:e.xs||24,sm:e.sm||8}},["href"==e.type?t("el-form-item",{attrs:{label:e.label||e.key}},[t("el-link",{attrs:{href:a.dataInfo[e.key]||e.value,target:"_blank"}},[a._v(a._s(e.filter?e.filter(a.dataInfo[e.key]||e.value):a.dataInfo[e.key]||e.value))])],1):"image"==e.type?t("el-form-item",{attrs:{label:e.label||e.key}},[t("el-avatar",{attrs:{shape:"circle",size:30,fit:"fit",src:a.dataInfo[e.key]||e.value,alt:"alt"}})],1):t("el-form-item",{attrs:{label:e.label||e.key}},[a._v(" "+a._s(e.filter?e.filter(a.dataInfo[e.key]||e.value):a.dataInfo[e.key])+" ")])],1)})),1),t("el-divider",{staticClass:"title"},[a._v("其他信息")]),t("el-row",{staticClass:"content",attrs:{gutter:10}},a._l(a.Other1Columus,(function(e){return t("el-col",{key:e.key,staticClass:"my-col",attrs:{xs:e.xs||24,sm:e.sm||8}},["href"==e.type?t("el-form-item",{attrs:{label:e.label||e.key}},[a.dataInfo[e.key]?t("el-link",{attrs:{href:e.value,target:"_blank"}},[a._v(a._s(e.filter?e.filter(a.dataInfo[e.key]):a.dataInfo[e.key]))]):t("span",[a._v("--")])],1):t("el-form-item",{attrs:{label:e.label||e.key}},[a._v(" "+a._s(a.dataInfo[e.key]||e.value||"--")+" ")])],1)})),1),t("el-divider",{staticClass:"title"},[a._v("多语言")]),t("el-row",{staticClass:"content",attrs:{gutter:10}},a._l(a.langDataColumus,(function(e){return t("el-col",{key:e.key,staticClass:"my-col",attrs:{xs:e.xs||24,sm:e.sm||8}},["href"==e.type?t("el-form-item",{attrs:{label:e.label||e.key}},[a.langData[e.key]?t("el-link",{attrs:{href:a.langData[e.key],target:"_blank"}},[a._v(a._s(e.filter?e.filter(a.langData[e.key]):a.langData[e.key]))]):t("span",[a._v("--")])],1):t("el-form-item",{attrs:{label:e.label||e.key}},[a._v(" "+a._s(a.langData[e.key]||e.value||"--")+" ")])],1)})),1)],1)]),t("div",{staticClass:"footer"},[0==a.dataInfo.status?t("el-button",{attrs:{type:"danger",loading:a.submitLoading},on:{click:a.refuse}},[a._v(" 拒绝审核 ")]):a._e(),0==a.dataInfo.status?t("el-button",{attrs:{type:"primary",loading:a.submitLoading},on:{click:function(e){return a.submitApproval(1)}}},[a._v(" 审核通过 ")]):a._e()],1),t("el-dialog",{attrs:{title:"拒绝原因",visible:a.dialogFormVisible},on:{"update:visible":function(e){a.dialogFormVisible=e}}},[t("el-form",{ref:"dataForm",attrs:{model:a.formData,"label-position":"right","label-width":"80px"}},[t("el-form-item",{staticStyle:{"max-width":"100%"},attrs:{label:"拒绝原因",prop:"remark",rules:[{required:!0,message:"请填写拒绝原因"}]}},[t("el-input",{staticStyle:{"max-width":"100%"},attrs:{autosize:{minRows:2,maxRows:4},type:"textarea",placeholder:"请填写拒绝原因"},model:{value:a.formData.remark,callback:function(e){a.$set(a.formData,"remark",e)},expression:"formData.remark"}})],1)],1),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(e){a.dialogFormVisible=!1}}},[a._v(" 取消 ")]),t("el-button",{attrs:{type:"danger",loading:a.submitLoading},on:{click:function(e){return a.submitApproval(2)}}},[a._v(" 审核不通过 ")])],1)],1)],1)},i=[],r=t("1da1"),o=(t("96cf"),t("7db0"),t("b680"),t("d81d"),t("3c4a")),l=t("cb95"),s=(t("ed08"),t("901e")),c=t("cba0"),u=[],m=[{label:"DApp 名称:",key:"name",type:"string",show:!1,value:""},{label:"主链:",key:"chain",type:"string",show:!1,value:"",filter:c["b"]},{label:"主链标签:",key:"chains",type:"string",show:!1,value:"",filter:c["a"]},{label:"Tags",key:"tags",type:"string",show:!1,value:""},{label:"URL",key:"url",type:"string",show:!1,value:""},{label:"简介",key:"introduction",type:"string",show:!1,value:""}],f=[],h=[{label:"白皮书:",key:"whitepaper",type:"href",show:!1,value:""},{label:"Twitter:",key:"twitter",type:"href",show:!1,value:""},{label:"Discord:",key:"discord",type:"href",show:!1,value:""},{label:"GitHub:",key:"github",type:"href",show:!1,value:""},{label:"Telegram:",key:"telegram",type:"href",show:!1,value:""},{label:"Facebook:",key:"facebook",type:"href",show:!1,value:""},{label:"邮箱:",key:"email",type:"string",show:!1,value:""},{label:"社区信息:",key:"community_info",type:"string",show:!1,value:""},{label:"recommender:",key:"recommender",type:"string",show:!1,value:""}],d=[{label:"名称:",key:"name",type:"string",show:!1,value:""},{label:"URL:",key:"url",type:"href",show:!1,value:""},{label:"介绍:",key:"intro",type:"string",show:!1,value:""},{label:"描述:",key:"description",type:"string",show:!1,value:""},{label:"相关教程标题:",key:"relationDocTitle",type:"string",show:!1,value:""},{label:"相关教程URL:",key:"relationDocURL",type:"href",show:!1,value:""}],p=[{key:0,display_name:"审核中",tagtype:"warn"},{key:1,display_name:"审核通过",tagtype:"success"},{key:2,display_name:"审核拒绝",tagtype:"danger"}],g={name:"approval_token_detail",components:{ContainerHeader:o["a"]},data:function(){return{languageTypeOptions:u,price_from_list:[],lang:"en",langData:{},oDataInfo:{},dataInfo:{multiLanguageList:[],contract:"",price_from:"auto"},formData:{remark:""},submitLoading:!1,dialogFormVisible:!1,IconColumus:m,OtherColumus:f,Other1Columus:h,langDataColumus:d,Tools:[]}},computed:{icon_price:function(){var a=this,e=this.price_from_list.find((function(e){return e.key==a.dataInfo.price_from}))||{value:0},t=e.value;return Object(s["BigNumber"])(t||0).toFixed()}},filters:{appovalFilter:function(a){var e=p.find((function(e){return e.key==a}))||{display_name:""},t=e.display_name;return t},appovalFilterColor:function(a){var e=p.find((function(e){return e.key==a}))||{tagtype:"info"},t=e.tagtype;return t},UpperCase:function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return a.toUpperCase()}},created:function(){this.init()},methods:{init:function(){var a=this;Object(l["a"])({id:this.$route.params.id}).then((function(e){if(e.data){var t=e.data;a.oDataInfo=t,a.dataInfo=Object.assign(a.dataInfo,t),a.Other1Columus=a.Other1Columus.map((function(a){return t[a.key]&&(a.show=!0,a.value=t[a.key]),a}))}})).catch((function(a){return console.error(a)})),Object(l["c"])({id:this.$route.params.id}).then((function(e){e.data&&(a.languageTypeOptions=e.data,a.dataInfo.multiLanguageList=e.data,a.langChange("en"))}))},langChange:function(a){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=e.languageTypeOptions.find((function(e){return e.lang==a})),e.langData=n.data,console.log("langChange",e.langData,a);case 3:case"end":return t.stop()}}),t)})))()},price_from_change:function(a){return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log({val:a});case 1:case"end":return e.stop()}}),e)})))()},submitApproval:function(a){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(1!=a){t.next=8;break}return t.next=3,e.$confirm("确认通过后将在页面中显示改DApp，确认审核通过？");case 3:if(n=t.sent,"confirm"===n){t.next=6;break}return t.abrupt("return");case 6:t.next=10;break;case 8:return t.next=10,e.$refs["dataForm"].validate();case 10:if(1!=a||e.oDataInfo.price_from==e.dataInfo.price_from){t.next=13;break}return t.next=13,Object(l["e"])({id:e.dataInfo.id,price_from:e.dataInfo.price_from}).catch((function(a){e.$message.error(a)}));case 13:e.submitLoading=!0,Object(l["f"])({id:e.dataInfo.id,status:a,remark:e.formData.remark}).then((function(a){e.init(),e.$notify({title:"提示",message:"提交成功",type:"success",duration:2e3}),e.submitLoading=!1,e.dialogFormVisible=!1})).catch((function(a){e.init(),e.submitLoading=!1}));case 15:case"end":return t.stop()}}),t)})))()},refuse:function(){var a=this;this.$nextTick((function(){a.formData.remark="",setTimeout((function(){return a.$refs["dataForm"].clearValidate()}))})),this.dialogFormVisible=!0}},beforeDestroy:function(){clearInterval(this.timer)}},v=g,b=(t("90e5"),t("a66e"),t("2877")),y=Object(b["a"])(v,n,i,!1,null,"c2932536",null);e["default"]=y.exports},cb95:function(a,e,t){"use strict";t.d(e,"b",(function(){return i})),t.d(e,"a",(function(){return r})),t.d(e,"e",(function(){return o})),t.d(e,"f",(function(){return l})),t.d(e,"c",(function(){return s}));var n=t("b775");function i(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{pageNum:1,pageSize:10};return Object(n["a"])({url:"/dapp/list",method:"get",params:a})}function r(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{id:0};return Object(n["a"])({url:"/dapp/detail",method:"get",params:a})}function o(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(n["a"])({url:"/dapp/update",method:"post",data:a})}function l(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(n["a"])({url:"/dapp/verify",method:"post",data:a})}function s(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(n["a"])({url:"/dapp/getMultiLanguageList",method:"get",params:a})}},cba0:function(a,e,t){"use strict";t.d(e,"b",(function(){return i})),t.d(e,"a",(function(){return r}));t("7db0"),t("b0c0"),t("ac1f"),t("1276"),t("d81d");var n=[{chain:"ada",name:"Cardano"},{chain:"ar",name:"Arweave"},{chain:"arbitrum",name:"Arbitrum"},{chain:"asm",name:"ASM"},{chain:"atom",name:"Cosmos"},{chain:"aurora",name:"Aurora"},{chain:"avax_c",name:"AVAX-C"},{chain:"avax_x",name:"AVAX-X"},{chain:"bch",name:"smartBCH"},{chain:"bgh",name:"BGH"},{chain:"bhp",name:"bhp"},{chain:"bnb",name:"BSC"},{chain:"boba",name:"Boba Network"},{chain:"btc",name:"Bitcoin"},{chain:"btt",name:"BitTorrent"},{chain:"celo",name:"Celo"},{chain:"ckb",name:"Nervos CKB"},{chain:"ckbl2",name:"Nervos CKB EVM"},{chain:"clo",name:"Callisto Mainent"},{chain:"cmp",name:"Caduceus"},{chain:"cro",name:"Crypto.com"},{chain:"crol2",name:"Cronos"},{chain:"cspr",name:"Casper"},{chain:"cube",name:"CUBE"},{chain:"czz",name:"ClassZZ"},{chain:"dash",name:"Dash"},{chain:"doge",name:"DOGE"},{chain:"dot",name:"Polkadot"},{chain:"dscc",name:"New Dimension"},{chain:"dscc1",name:"Dimension"},{chain:"egld",name:"Elrond"},{chain:"eos",name:"EOS"},{chain:"etc",name:"Ethereum Classic"},{chain:"eth",name:"Ethereum"},{chain:"evm",name:"evm"},{chain:"fil",name:"Filecoin"},{chain:"fio",name:"FIO"},{chain:"fra",name:"fra"},{chain:"ftm",name:"Fantom"},{chain:"fuse",name:"Fuse"},{chain:"gt",name:"GateChain"},{chain:"hbc",name:"HBC"},{chain:"ho",name:"HALO"},{chain:"ht",name:"Heco"},{chain:"htdf",name:"htdf"},{chain:"icp",name:"Internet Computer"},{chain:"inj",name:"Injective Protocol"},{chain:"iost",name:"IOST"},{chain:"iotx",name:"IoTeX"},{chain:"kai",name:"KAI"},{chain:"kcs",name:"KCC"},{chain:"khc",name:"KHC"},{chain:"klay",name:"KLAY"},{chain:"lat",name:"PlatON"},{chain:"lgcy",name:"LGCY Network"},{chain:"lucky",name:"Lucky Chain"},{chain:"luna",name:"Terra Classic"},{chain:"lunav2",name:"Terra"},{chain:"matic",name:"Polygon"},{chain:"mtr",name:"Meter Mainnet"},{chain:"near",name:"Near"},{chain:"neo",name:"neo"},{chain:"nuls",name:"nuls"},{chain:"okt",name:"OEC"},{chain:"one",name:"Harmony"},{chain:"ont",name:"ont"},{chain:"optimism",name:"Optimism"},{chain:"plugcn",name:"Plug Chain"},{chain:"qtum",name:"Qtum"},{chain:"scdo",name:"SCDO"},{chain:"sgb",name:"SGB"},{chain:"sol",name:"Solana"},{chain:"sys",name:"sys"},{chain:"tomo",name:"TomoChain"},{chain:"true",name:"TRUE"},{chain:"trx",name:"Tron"},{chain:"ulam",name:"ulam"},{chain:"usdt",name:"usdt"},{chain:"vlx",name:"Velas"},{chain:"vs",name:"vs"},{chain:"wax",name:"WAX"},{chain:"wicc",name:"wicc"},{chain:"xdai",name:"xDai"},{chain:"yta",name:"Yotta"},{chain:"zks",name:"zkSync"},{chain:"ztb",name:"ZSC"}];function i(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=n.find((function(e){return e.chain==a}));return null===e||void 0===e?void 0:e.name}function r(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e="",t=a.split(",");return t.length>0&&t.map((function(a){e&&(e+=","),e+=i(a)})),e}},e0a8:function(a,e,t){},e9e6:function(a,e,t){"use strict";t("33c6")}}]);