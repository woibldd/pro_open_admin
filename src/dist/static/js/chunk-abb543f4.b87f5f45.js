(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-abb543f4"],{1773:function(e,t,a){"use strict";a("ae02")},"33c6":function(e,t,a){},"37e1d":function(e,t,a){"use strict";a.d(t,"d",(function(){return r})),a.d(t,"b",(function(){return i})),a.d(t,"a",(function(){return o})),a.d(t,"e",(function(){return l})),a.d(t,"f",(function(){return s})),a.d(t,"c",(function(){return c}));var n=a("b775");function r(e){return Object(n["a"])({url:"/token/getPrice",method:"get",params:e})}function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{pageNum:1,pageSize:10};return Object(n["a"])({url:"/token/list",method:"get",params:e})}function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{id:0};return Object(n["a"])({url:"/token/detail",method:"get",params:e})}function l(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(n["a"])({url:"/token/update",method:"post",data:e})}function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(n["a"])({url:"/token/verify",method:"post",data:e})}function c(e){return Object(n["a"])({url:"/token/getMultiLanguageList",method:"get",params:e})}},3835:function(e,t,a){"use strict";function n(e){if(Array.isArray(e))return e}a.d(t,"a",(function(){return l}));a("a4d3"),a("e01a"),a("d3b7"),a("d28b"),a("3ca3"),a("ddb0");function r(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var n,r,i=[],o=!0,l=!1;try{for(a=a.call(e);!(o=(n=a.next()).done);o=!0)if(i.push(n.value),t&&i.length===t)break}catch(s){l=!0,r=s}finally{try{o||null==a["return"]||a["return"]()}finally{if(l)throw r}}return i}}var i=a("06c5");function o(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(e,t){return n(e)||r(e,t)||Object(i["a"])(e,t)||o()}},"3c4a":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container-header"},[a("h3",[e._v(e._s(e.title))])])},r=[],i={name:"ContainerHeader",props:{title:{type:String,default:""}},data:function(){return{}},created:function(){},methods:{}},o=i,l=(a("e9e6"),a("2877")),s=Object(l["a"])(o,n,r,!1,null,"155e36a6",null);t["a"]=s.exports},"4fad":function(e,t,a){var n=a("23e7"),r=a("6f53").entries;n({target:"Object",stat:!0},{entries:function(e){return r(e)}})},"6f53":function(e,t,a){var n=a("83ab"),r=a("df75"),i=a("fc6a"),o=a("d1e7").f,l=function(e){return function(t){var a,l=i(t),s=r(l),c=s.length,u=0,m=[];while(c>u)a=s[u++],n&&!o.call(l,a)||m.push(e?[a,l[a]]:l[a]);return m}};e.exports={entries:l(!0),values:l(!1)}},"7db0":function(e,t,a){"use strict";var n=a("23e7"),r=a("b727").find,i=a("44d2"),o=a("ae40"),l="find",s=!0,c=o(l);l in[]&&Array(1)[l]((function(){s=!1})),n({target:"Array",proto:!0,forced:s||!c},{find:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}}),i(l)},ae02:function(e,t,a){},b9ea:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container tokenDetails"},[a("div",{staticClass:"header"},[a("div",{staticClass:"icon-info"},[a("el-avatar",{staticClass:"icon",attrs:{shape:"circle",size:50,fit:"fit",src:e.dataInfo.icon,alt:"alt"}}),a("h1",{staticClass:"symbol"},[e._v(e._s(e.dataInfo.coin))]),a("div",{staticClass:"name"},[e._v(e._s(e.dataInfo.name))]),a("el-tag",{staticClass:"chain",staticStyle:{"margin-right":"5px"},attrs:{size:"small",type:"info"}},[e._v(e._s(e._f("UpperCase")(e.dataInfo.chain))+"链")]),e.dataInfo.contract||2==e.dataInfo.contract.length?a("el-tag",{attrs:{size:"small",type:"info"}},[e._v("代币")]):e._e(),a("el-select",{staticClass:"lang",attrs:{placeholder:"语言展示"},on:{change:e.langChange},model:{value:e.lang,callback:function(t){e.lang=t},expression:"lang"}},e._l(e.languageTypeOptions,(function(e){return a("el-option",{key:e.lang,attrs:{label:e.lang,value:e.lang}})})),1)],1),a("div",[a("el-tag",{attrs:{type:e._f("appovalFilterColor")(e.dataInfo.status)}},[e._v(e._s(e._f("appovalFilter")(e.dataInfo.status)))]),a("el-tag",{staticStyle:{"margin-left":"5px"},attrs:{type:e._f("appovalFilterColor")(1==e.dataInfo.is_online?1:2)}},[e._v(e._s(1==e.dataInfo.is_online?"已上线":"未上线"))])],1)]),2==e.dataInfo.status&&e.dataInfo.remark?a("div",{staticStyle:{"margin-top":"30px"}},[a("el-alert",{attrs:{type:"error"}},[e._v(" 拒绝原因： "+e._s(e.dataInfo.remark)+" ")])],1):e._e(),a("el-form",{staticClass:"body"},[a("div",{staticClass:"info"},[a("el-divider",{staticClass:"title"},[e._v("基本信息")]),a("el-row",{staticClass:"content",attrs:{gutter:10}},e._l(e.IconColumus,(function(t){return a("el-col",{key:t.key,attrs:{xs:t.xs||24,sm:t.sm||6}},["href"==t.type?a("el-form-item",{attrs:{label:t.label||t.key}},[a("el-link",{attrs:{href:e.dataInfo[t.key]||t.value,target:"_blank"}},[e._v(e._s(t.filter?t.filter(e.dataInfo[t.key]||t.value):e.dataInfo[t.key]||t.value))])],1):"image"==t.type?a("el-form-item",{attrs:{label:t.label||t.key}},[a("el-avatar",{attrs:{shape:"circle",size:30,fit:"fit",src:e.dataInfo[t.key]||t.value,alt:"alt"}})],1):a("el-form-item",{attrs:{label:t.label||t.key}},[e._v(" "+e._s(t.filter?t.filter(e.dataInfo[t.key]||t.value):e.dataInfo[t.key])+" ")])],1)})),1),a("el-divider",{staticClass:"title"},[e._v("token介绍")]),a("el-row",{staticClass:"content",attrs:{gutter:10}},e._l(e.OtherColumus,(function(t){return a("el-col",{key:t.key,style:t.style||{},attrs:{xs:t.xs||24,sm:t.sm||6,offset:t.offset||0}},["price_from"==t.key?a("el-form-item",{style:t.Contentstyle||{},attrs:{label:t.label||t.key}},[e._v(" "+e._s(e.dataInfo[t.key])+" "),a("span",{staticStyle:{"padding-left":"5px",color:"#8492a6","font-size":"20px"}},[e._v("$"+e._s(e.icon_price))])]):a("el-form-item",{style:t.Contentstyle||{},attrs:{label:t.label||t.key}},[e._v(" "+e._s(e.dataInfo[t.key]||t.value)+" ")])],1)})),1),e.Tools.length>0?a("el-divider",{staticClass:"title"},[e._v("tools工具")]):e._e(),e._l(e.Tools,(function(t){return a("el-row",{key:t.id,staticClass:"content",attrs:{gutter:10}},[a("el-col",{attrs:{xs:24,sm:8}},[a("el-form-item",{attrs:{label:"工具名称"}},[e._v(" "+e._s(t.title||"--")+" ")])],1),a("el-col",{attrs:{xs:24,sm:8}},[a("el-form-item",{attrs:{label:"图标链接"}},[a("a",{attrs:{href:t.icon}},[e._v(e._s(t.icon))])])],1),a("el-col",{attrs:{xs:24,sm:8}},[a("el-form-item",{attrs:{label:"URL"}},[t.url?a("el-link",{attrs:{href:t.url,target:"_blank"}},[e._v(" "+e._s(t.url))]):a("span",[e._v("--")])],1)],1)],1)})),a("el-divider",{staticClass:"title"},[e._v("其他信息")]),a("el-row",{staticClass:"content",attrs:{gutter:10}},e._l(e.Other1Columus,(function(t){return a("el-col",{key:t.key,attrs:{xs:t.xs||24,sm:t.sm||8}},["href"==t.type?a("el-form-item",{attrs:{label:t.label||t.key}},[e.dataInfo[t.key]?a("el-link",{attrs:{href:e.dataInfo[t.key],target:"_blank"}},[e._v(e._s(t.filter?t.filter(e.dataInfo[t.key]):e.dataInfo[t.key]))]):a("span",[e._v("--")])],1):a("el-form-item",{attrs:{label:t.label||t.key}},[e._v(" "+e._s(e.dataInfo[t.key]||t.value||"--")+" ")])],1)})),1),a("el-divider",{staticClass:"title"},[e._v("可修改信息")]),a("el-form-item",{attrs:{label:"币价来源："}},[a("el-select",{staticClass:"filter-item",attrs:{disabled:0!=e.dataInfo.status,placeholder:"价格来源（auto）"},on:{change:e.price_from_change},model:{value:e.dataInfo.price_from,callback:function(t){e.$set(e.dataInfo,"price_from",t)},expression:"dataInfo.price_from"}},e._l(e.price_from_list,(function(t){return a("el-option",{key:t.key,attrs:{value:t.key}},[a("span",{staticStyle:{float:"left"}},[e._v(e._s(t.key))]),a("span",{staticStyle:{float:"right",color:"#8492a6","font-size":"13px"}},[e._v("$"+e._s(t.value))])])})),1)],1)],2)]),a("div",{staticClass:"footer"},[0==e.dataInfo.status?a("el-button",{attrs:{type:"danger",loading:e.submitLoading},on:{click:e.refuse}},[e._v(" 拒绝审核 ")]):e._e(),0==e.dataInfo.status?a("el-button",{attrs:{type:"primary",loading:e.submitLoading},on:{click:function(t){return e.submitApproval(1)}}},[e._v(" 审核通过 ")]):e._e()],1),a("el-dialog",{attrs:{title:"拒绝原因",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"dataForm",attrs:{model:e.formData,"label-position":"right","label-width":"80px"}},[a("el-form-item",{staticStyle:{"max-width":"100%"},attrs:{label:"拒绝原因",prop:"remark",rules:[{required:!0,message:"请填写拒绝原因"}]}},[a("el-input",{staticStyle:{"max-width":"100%"},attrs:{autosize:{minRows:2,maxRows:4},type:"textarea",placeholder:"请填写拒绝原因"},model:{value:e.formData.remark,callback:function(t){e.$set(e.formData,"remark",t)},expression:"formData.remark"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v(" 取消 ")]),a("el-button",{attrs:{type:"danger",loading:e.submitLoading},on:{click:function(t){return e.submitApproval(2)}}},[e._v(" 审核不通过 ")])],1)],1)],1)},r=[],i=a("3835"),o=a("1da1"),l=(a("96cf"),a("7db0"),a("b680"),a("d81d"),a("4fad"),a("3c4a")),s=a("37e1d"),c=a("ed08"),u=a("cba0"),m=a("901e"),f=[{id:"en",lang:"en",tagtype:"warn"}],d=[{label:"Token 名称:",key:"name",type:"string",show:!1,value:""},{label:"币名(标识):",key:"coin",type:"string",show:!1,value:""},{label:"图标:",key:"icon",type:"image",show:!1,value:""},{label:"主链:",key:"chain",type:"string",show:!1,value:"",filter:u["b"]},{label:"发布日期:",key:"issue_date",type:"date",sm:6,show:!1,value:"",filter:function(e){return Object(c["c"])(e,"{y}-{m}-{d}")}},{label:"合约:",key:"contract",type:"string",sm:16,show:!1,value:""}],h=[{label:"总供应量:",key:"supply_total",type:"string",show:!1,value:"--"},{label:"精度:",key:"decimals",type:"string",show:!1,value:"--"},{label:"币价来源:",key:"price_from",type:"string",show:!1,value:"--"},{label:"货币介绍:",key:"about",sm:20,type:"string",show:!1,value:"--"}],p=[{label:"白皮书:",key:"whitepaper",type:"href",show:!1,value:""},{label:"Twitter:",key:"twitter",type:"href",show:!1,value:""},{label:"官网:",key:"website",type:"href",show:!1,value:""},{label:"GitHub:",key:"github",type:"href",show:!1,value:""},{label:"Telegram:",key:"telegram",type:"href",show:!1,value:""},{label:"Facebook:",key:"facebook",type:"href",show:!1,value:""},{label:"email:",key:"email",type:"string",show:!1,value:""},{label:"社区信息:",key:"community_info",type:"string",show:!1,value:""},{label:"推荐人:",key:"recommender",type:"string",show:!1,value:""}],v=[{key:0,display_name:"审核中",tagtype:"warn"},{key:1,display_name:"审核通过",tagtype:"success"},{key:2,display_name:"审核拒绝",tagtype:"danger"}],b={name:"approval_token_detail",components:{ContainerHeader:l["a"]},data:function(){return{languageTypeOptions:f,price_from_list:[],lang:"en",oDataInfo:{},dataInfo:{multiLanguageList:[],contract:"",price_from:"auto"},formData:{remark:""},submitLoading:!1,dialogFormVisible:!1,IconColumus:d,OtherColumus:h,Other1Columus:p,Tools:[],multiLanguageList:[]}},computed:{icon_price:function(){var e=this,t=this.price_from_list.find((function(t){return t.key==e.dataInfo.price_from}))||{value:0},a=t.value;return Object(m["BigNumber"])(a||0).toFixed()}},filters:{appovalFilter:function(e){var t=v.find((function(t){return t.key==e}))||{display_name:""},a=t.display_name;return a},appovalFilterColor:function(e){var t=v.find((function(t){return t.key==e}))||{tagtype:"info"},a=t.tagtype;return a},UpperCase:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return e.toUpperCase()}},created:function(){this.init()},methods:{init:function(){var e=this;Object(s["a"])({id:this.$route.params.id}).then((function(t){if(t.data){var a=t.data;e.oDataInfo=a,e.dataInfo=Object.assign(e.dataInfo,a),e.getPrice(),clearInterval(e.timer),e.timer=setInterval((function(){e.getPrice()}),5e3)}})).catch((function(e){return console.error(e)})),Object(s["c"])({id:this.$route.params.id}).then((function(t){if(t.data){e.languageTypeOptions=t.data;var a=e.languageTypeOptions[0].lang;e.langChange(a)}}))},langChange:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:n=t.languageTypeOptions.find((function(t){return t.lang==e})),Object.assign(t.dataInfo,{abort:"",name:"",whitepaper:"",tools:[]},n&&n.data||{}),t.Tools=t.dataInfo.tools||[];case 3:case"end":return a.stop()}}),a)})))()},price_from_change:function(e){return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:console.log({val:e});case 1:case"end":return t.stop()}}),t)})))()},getPrice:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(s["d"])({currency:"usdt",symbol:e.dataInfo.coin,chain:e.dataInfo.chain,contract:e.dataInfo.contract}).catch((function(e){return{status:5e3}}));case 2:a=t.sent,n=a.data,r=a.status,0==r&&(e.price_from_list=Object.entries(n).map((function(e){var t=Object(i["a"])(e,2),a=t[0],n=t[1];return{key:"all"==a?"auto":a,value:n}})));case 6:case"end":return t.stop()}}),t)})))()},submitApproval:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(1!=e){a.next=8;break}return a.next=3,t.$confirm("确认通过后将在页面中显示该币种，确认审核通过？");case 3:if(n=a.sent,"confirm"===n){a.next=6;break}return a.abrupt("return");case 6:a.next=10;break;case 8:return a.next=10,t.$refs["dataForm"].validate();case 10:if(1!=e||t.oDataInfo.price_from==t.dataInfo.price_from){a.next=13;break}return a.next=13,Object(s["e"])({id:t.dataInfo.id,price_from:t.dataInfo.price_from}).catch((function(e){t.$message.error(e)}));case 13:t.submitLoading=!0,Object(s["f"])({id:t.dataInfo.id,status:e,remark:t.formData.remark}).then((function(e){t.init(),t.$notify({title:"提示",message:"提交成功",type:"success",duration:2e3}),t.submitLoading=!1,t.dialogFormVisible=!1})).catch((function(e){t.init(),t.submitLoading=!1}));case 15:case"end":return a.stop()}}),a)})))()},refuse:function(){var e=this;this.$nextTick((function(){e.formData.remark="",setTimeout((function(){return e.$refs["dataForm"].clearValidate()}))})),this.dialogFormVisible=!0}},beforeDestroy:function(){clearInterval(this.timer)}},y=b,g=(a("1773"),a("2877")),k=Object(g["a"])(y,n,r,!1,null,"19a2215e",null);t["default"]=k.exports},cba0:function(e,t,a){"use strict";a.d(t,"b",(function(){return r})),a.d(t,"a",(function(){return i}));a("7db0"),a("b0c0"),a("ac1f"),a("1276"),a("d81d");var n=[{chain:"ada",name:"Cardano"},{chain:"ar",name:"Arweave"},{chain:"arbitrum",name:"Arbitrum"},{chain:"asm",name:"ASM"},{chain:"atom",name:"Cosmos"},{chain:"aurora",name:"Aurora"},{chain:"avax_c",name:"AVAX-C"},{chain:"avax_x",name:"AVAX-X"},{chain:"bch",name:"smartBCH"},{chain:"bgh",name:"BGH"},{chain:"bhp",name:"bhp"},{chain:"bnb",name:"BSC"},{chain:"boba",name:"Boba Network"},{chain:"btc",name:"Bitcoin"},{chain:"btt",name:"BitTorrent"},{chain:"celo",name:"Celo"},{chain:"ckb",name:"Nervos CKB"},{chain:"ckbl2",name:"Nervos CKB EVM"},{chain:"clo",name:"Callisto Mainent"},{chain:"cmp",name:"Caduceus"},{chain:"cro",name:"Crypto.com"},{chain:"crol2",name:"Cronos"},{chain:"cspr",name:"Casper"},{chain:"cube",name:"CUBE"},{chain:"czz",name:"ClassZZ"},{chain:"dash",name:"Dash"},{chain:"doge",name:"DOGE"},{chain:"dot",name:"Polkadot"},{chain:"dscc",name:"New Dimension"},{chain:"dscc1",name:"Dimension"},{chain:"egld",name:"Elrond"},{chain:"eos",name:"EOS"},{chain:"etc",name:"Ethereum Classic"},{chain:"eth",name:"Ethereum"},{chain:"evm",name:"evm"},{chain:"fil",name:"Filecoin"},{chain:"fio",name:"FIO"},{chain:"fra",name:"fra"},{chain:"ftm",name:"Fantom"},{chain:"fuse",name:"Fuse"},{chain:"gt",name:"GateChain"},{chain:"hbc",name:"HBC"},{chain:"ho",name:"HALO"},{chain:"ht",name:"Heco"},{chain:"htdf",name:"htdf"},{chain:"icp",name:"Internet Computer"},{chain:"inj",name:"Injective Protocol"},{chain:"iost",name:"IOST"},{chain:"iotx",name:"IoTeX"},{chain:"kai",name:"KAI"},{chain:"kcs",name:"KCC"},{chain:"khc",name:"KHC"},{chain:"klay",name:"KLAY"},{chain:"lat",name:"PlatON"},{chain:"lgcy",name:"LGCY Network"},{chain:"lucky",name:"Lucky Chain"},{chain:"luna",name:"Terra Classic"},{chain:"lunav2",name:"Terra"},{chain:"matic",name:"Polygon"},{chain:"mtr",name:"Meter Mainnet"},{chain:"near",name:"Near"},{chain:"neo",name:"neo"},{chain:"nuls",name:"nuls"},{chain:"okt",name:"OEC"},{chain:"one",name:"Harmony"},{chain:"ont",name:"ont"},{chain:"optimism",name:"Optimism"},{chain:"plugcn",name:"Plug Chain"},{chain:"qtum",name:"Qtum"},{chain:"scdo",name:"SCDO"},{chain:"sgb",name:"SGB"},{chain:"sol",name:"Solana"},{chain:"sys",name:"sys"},{chain:"tomo",name:"TomoChain"},{chain:"true",name:"TRUE"},{chain:"trx",name:"Tron"},{chain:"ulam",name:"ulam"},{chain:"usdt",name:"usdt"},{chain:"vlx",name:"Velas"},{chain:"vs",name:"vs"},{chain:"wax",name:"WAX"},{chain:"wicc",name:"wicc"},{chain:"xdai",name:"xDai"},{chain:"yta",name:"Yotta"},{chain:"zks",name:"zkSync"},{chain:"ztb",name:"ZSC"}];function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=n.find((function(t){return t.chain==e}));return null===t||void 0===t?void 0:t.name}function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t="",a=e.split(",");return a.length>0&&a.map((function(e){t&&(t+=","),t+=r(e)})),t}},e9e6:function(e,t,a){"use strict";a("33c6")}}]);