(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0ef3b6ef"],{"33c6":function(e,a,t){},"37e1d":function(e,a,t){"use strict";t.d(a,"d",(function(){return r})),t.d(a,"b",(function(){return i})),t.d(a,"a",(function(){return o})),t.d(a,"e",(function(){return l})),t.d(a,"f",(function(){return s})),t.d(a,"c",(function(){return c}));var n=t("b775");function r(e){return Object(n["a"])({url:"/token/getPrice",method:"get",params:e})}function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{pageNum:1,pageSize:10};return Object(n["a"])({url:"/token/list",method:"get",params:e})}function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{id:0};return Object(n["a"])({url:"/token/detail",method:"get",params:e})}function l(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(n["a"])({url:"/token/update",method:"post",data:e})}function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(n["a"])({url:"/token/verify",method:"post",data:e})}function c(e){return Object(n["a"])({url:"/token/getMultiLanguageList",method:"get",params:e})}},3835:function(e,a,t){"use strict";function n(e){if(Array.isArray(e))return e}t.d(a,"a",(function(){return l}));t("a4d3"),t("e01a"),t("d3b7"),t("d28b"),t("3ca3"),t("ddb0");function r(e,a){var t=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,r,i=[],o=!0,l=!1;try{for(t=t.call(e);!(o=(n=t.next()).done);o=!0)if(i.push(n.value),a&&i.length===a)break}catch(s){l=!0,r=s}finally{try{o||null==t["return"]||t["return"]()}finally{if(l)throw r}}return i}}var i=t("06c5");function o(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(e,a){return n(e)||r(e,a)||Object(i["a"])(e,a)||o()}},"3c4a":function(e,a,t){"use strict";var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"container-header"},[t("h3",[e._v(e._s(e.title))])])},r=[],i={name:"ContainerHeader",props:{title:{type:String,default:""}},data:function(){return{}},created:function(){},methods:{}},o=i,l=(t("e9e6"),t("2877")),s=Object(l["a"])(o,n,r,!1,null,"155e36a6",null);a["a"]=s.exports},"4fad":function(e,a,t){var n=t("23e7"),r=t("6f53").entries;n({target:"Object",stat:!0},{entries:function(e){return r(e)}})},"6f53":function(e,a,t){var n=t("83ab"),r=t("df75"),i=t("fc6a"),o=t("d1e7").f,l=function(e){return function(a){var t,l=i(a),s=r(l),c=s.length,u=0,m=[];while(c>u)t=s[u++],n&&!o.call(l,t)||m.push(e?[t,l[t]]:l[t]);return m}};e.exports={entries:l(!0),values:l(!1)}},"7db0":function(e,a,t){"use strict";var n=t("23e7"),r=t("b727").find,i=t("44d2"),o=t("ae40"),l="find",s=!0,c=o(l);l in[]&&Array(1)[l]((function(){s=!1})),n({target:"Array",proto:!0,forced:s||!c},{find:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}}),i(l)},"98a4":function(e,a,t){},b9ea:function(e,a,t){"use strict";t.r(a);var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"app-container tokenDetails"},[t("div",{staticClass:"header"},[t("div",{staticClass:"icon-info"},[t("el-avatar",{staticClass:"icon",attrs:{shape:"circle",size:50,fit:"fit",src:e.dataInfo.icon,alt:"alt"}}),t("h1",{staticClass:"symbol"},[e._v(e._s(e.dataInfo.coin))]),t("div",{staticClass:"name"},[e._v(e._s(e.dataInfo.name))]),t("el-tag",{staticClass:"chain",staticStyle:{"margin-right":"5px"},attrs:{size:"small",type:"info"}},[e._v(e._s(e._f("UpperCase")(e.dataInfo.chain))+"链")]),e.dataInfo.contract||2==e.dataInfo.contract.length?t("el-tag",{attrs:{size:"small",type:"info"}},[e._v("代币")]):e._e(),t("el-select",{staticClass:"lang",attrs:{placeholder:"语言展示"},on:{change:e.langChange},model:{value:e.lang,callback:function(a){e.lang=a},expression:"lang"}},e._l(e.languageTypeOptions,(function(a){return t("el-option",{key:a.lang,attrs:{label:e.getLangTitle(a.lang),value:a.lang}})})),1)],1),t("div",[t("el-tag",{attrs:{type:e._f("appovalFilterColor")(e.dataInfo.status)}},[e._v(e._s(e._f("appovalFilter")(e.dataInfo.status)))]),t("el-tag",{staticStyle:{"margin-left":"5px"},attrs:{type:e._f("appovalFilterColor")(1==e.dataInfo.is_online?1:2)}},[e._v(e._s(1==e.dataInfo.is_online?"已上线":"未上线"))])],1)]),2==e.dataInfo.status&&e.dataInfo.remark?t("div",{staticStyle:{"margin-top":"30px"}},[t("el-alert",{attrs:{type:"error"}},[e._v(" 拒绝原因： "+e._s(e.dataInfo.remark)+" ")])],1):e._e(),t("el-form",{staticClass:"body"},[t("div",{staticClass:"info"},[t("el-divider",{staticClass:"title"},[e._v("基本信息")]),t("el-row",{staticClass:"content",attrs:{gutter:10}},e._l(e.IconColumus,(function(a){return t("el-col",{key:a.key,attrs:{xs:a.xs||24,sm:a.sm||6}},["href"==a.type?t("el-form-item",{attrs:{label:a.label||a.key}},[t("el-link",{attrs:{href:e.dataInfo[a.key]||a.value,target:"_blank"}},[e._v(e._s(a.filter?a.filter(e.dataInfo[a.key]||a.value):e.dataInfo[a.key]||a.value))])],1):"image"==a.type?t("el-form-item",{attrs:{label:a.label||a.key}},[t("el-avatar",{attrs:{shape:"circle",size:30,fit:"fit",src:e.dataInfo[a.key]||a.value,alt:"alt"}})],1):t("el-form-item",{attrs:{label:a.label||a.key}},[e._v(" "+e._s(a.filter?a.filter(e.dataInfo[a.key]||a.value):e.dataInfo[a.key])+" ")])],1)})),1),t("el-divider",{staticClass:"title"},[e._v("token介绍")]),t("el-row",{staticClass:"content",attrs:{gutter:10}},e._l(e.OtherColumus,(function(a){return t("el-col",{key:a.key,style:a.style||{},attrs:{xs:a.xs||24,sm:a.sm||6,offset:a.offset||0}},["price_from"==a.key?t("el-form-item",{style:a.Contentstyle||{},attrs:{label:a.label||a.key}},[e._v(" "+e._s(e.dataInfo[a.key])+" "),t("span",{staticStyle:{"padding-left":"5px",color:"#8492a6","font-size":"20px"}},[e._v("$"+e._s(e.icon_price))])]):t("el-form-item",{style:a.Contentstyle||{},attrs:{label:a.label||a.key}},[e._v(" "+e._s(e.dataInfo[a.key]||a.value)+" ")])],1)})),1),e.Tools.length>0?t("el-divider",{staticClass:"title"},[e._v("tools工具")]):e._e(),e._l(e.Tools,(function(a){return t("el-row",{key:a.id,staticClass:"content",attrs:{gutter:10}},[t("el-col",{attrs:{xs:24,sm:8}},[t("el-form-item",{attrs:{label:"工具名称"}},[e._v(" "+e._s(a.title||"--")+" ")])],1),t("el-col",{attrs:{xs:24,sm:8}},[t("el-form-item",{attrs:{label:"图标链接"}},[t("a",{attrs:{href:a.icon}},[e._v(e._s(a.icon))])])],1),t("el-col",{attrs:{xs:24,sm:8}},[t("el-form-item",{attrs:{label:"URL"}},[a.url?t("el-link",{attrs:{href:a.url,target:"_blank"}},[e._v(" "+e._s(a.url))]):t("span",[e._v("--")])],1)],1)],1)})),t("el-divider",{staticClass:"title"},[e._v("其他信息")]),t("el-row",{staticClass:"content",attrs:{gutter:10}},e._l(e.Other1Columus,(function(a){return t("el-col",{key:a.key,attrs:{xs:a.xs||24,sm:a.sm||8}},["href"==a.type?t("el-form-item",{attrs:{label:a.label||a.key}},[e.dataInfo[a.key]?t("el-link",{attrs:{href:e.dataInfo[a.key],target:"_blank"}},[e._v(e._s(a.filter?a.filter(e.dataInfo[a.key]):e.dataInfo[a.key]))]):t("span",[e._v("--")])],1):t("el-form-item",{attrs:{label:a.label||a.key}},[e._v(" "+e._s(e.dataInfo[a.key]||a.value||"--")+" ")])],1)})),1),t("el-divider",{staticClass:"title"},[e._v("可修改信息")]),t("el-form-item",{attrs:{label:"币价来源："}},[t("el-select",{staticClass:"filter-item",attrs:{disabled:0!=e.dataInfo.status,placeholder:"价格来源（auto）"},on:{change:e.price_from_change},model:{value:e.dataInfo.price_from,callback:function(a){e.$set(e.dataInfo,"price_from",a)},expression:"dataInfo.price_from"}},e._l(e.price_from_list,(function(a){return t("el-option",{key:a.key,attrs:{value:a.key}},[t("span",{staticStyle:{float:"left"}},[e._v(e._s(a.key))]),t("span",{staticStyle:{float:"right",color:"#8492a6","font-size":"13px"}},[e._v("$"+e._s(a.value))])])})),1)],1)],2)]),t("div",{staticClass:"footer"},[0==e.dataInfo.status?t("el-button",{attrs:{type:"danger",loading:e.submitLoading},on:{click:e.refuse}},[e._v(" 拒绝审核 ")]):e._e(),0==e.dataInfo.status?t("el-button",{attrs:{type:"primary",loading:e.submitLoading},on:{click:function(a){return e.submitApproval(1)}}},[e._v(" 审核通过 ")]):e._e()],1),t("el-dialog",{attrs:{title:"拒绝原因",visible:e.dialogFormVisible},on:{"update:visible":function(a){e.dialogFormVisible=a}}},[t("el-form",{ref:"dataForm",attrs:{model:e.formData,"label-position":"right","label-width":"80px"}},[t("el-form-item",{staticStyle:{"max-width":"100%"},attrs:{label:"拒绝原因",prop:"remark",rules:[{required:!0,message:"请填写拒绝原因"}]}},[t("el-input",{staticStyle:{"max-width":"100%"},attrs:{autosize:{minRows:2,maxRows:4},type:"textarea",placeholder:"请填写拒绝原因"},model:{value:e.formData.remark,callback:function(a){e.$set(e.formData,"remark",a)},expression:"formData.remark"}})],1)],1),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(a){e.dialogFormVisible=!1}}},[e._v(" 取消 ")]),t("el-button",{attrs:{type:"danger",loading:e.submitLoading},on:{click:function(a){return e.submitApproval(2)}}},[e._v(" 审核不通过 ")])],1)],1)],1)},r=[],i=t("3835"),o=t("1da1"),l=(t("96cf"),t("7db0"),t("b680"),t("b0c0"),t("d81d"),t("4fad"),t("3c4a")),s=t("37e1d"),c=t("ed08"),u=t("cba0"),m=t("901e"),f=[{id:"en",lang:"en",tagtype:"warn"}],d=[{label:"Token 名称:",key:"name",type:"string",show:!1,value:""},{label:"币名(标识):",key:"coin",type:"string",show:!1,value:""},{label:"图标:",key:"icon",type:"image",show:!1,value:""},{label:"主链:",key:"chain",type:"string",show:!1,value:"",filter:u["b"]},{label:"发布日期:",key:"issue_date",type:"date",sm:6,show:!1,value:"",filter:function(e){return Object(c["c"])(e,"{y}-{m}-{d}")}},{label:"合约:",key:"contract",type:"string",sm:16,show:!1,value:""}],h=[{label:"总供应量:",key:"supply_total",type:"string",show:!1,value:"--"},{label:"精度:",key:"decimals",type:"string",show:!1,value:"--"},{label:"币价来源:",key:"price_from",type:"string",show:!1,value:"--"},{label:"货币介绍:",key:"about",sm:20,type:"string",show:!1,value:"--"}],p=[{label:"白皮书:",key:"whitepaper",type:"href",show:!1,value:""},{label:"Twitter:",key:"twitter",type:"href",show:!1,value:""},{label:"官网:",key:"website",type:"href",show:!1,value:""},{label:"GitHub:",key:"github",type:"href",show:!1,value:""},{label:"Telegram:",key:"telegram",type:"href",show:!1,value:""},{label:"Facebook:",key:"facebook",type:"href",show:!1,value:""},{label:"email:",key:"email",type:"string",show:!1,value:""},{label:"社区信息:",key:"community_info",type:"string",show:!1,value:""},{label:"推荐人:",key:"recommender",type:"string",show:!1,value:""}],v=[{key:0,display_name:"审核中",tagtype:"warn"},{key:1,display_name:"审核通过",tagtype:"success"},{key:2,display_name:"审核拒绝",tagtype:"danger"}],b=[{value:"en",name:"英语"},{value:"zh",name:"简体中文"},{value:"zh_tw",name:"繁体中文"},{value:"ko",name:"韩语"},{value:"ja",name:"日本語"},{value:"vi",name:"越南语"},{value:"tr",name:"土耳其"},{value:"es_la",name:"拉丁美语"},{value:"id",name:"印度尼西亚"},{value:"hi",name:"印地语"},{value:"ar",name:"阿拉伯语"},{value:"pt",name:"葡萄牙语"}],y={name:"approval_token_detail",components:{ContainerHeader:l["a"]},data:function(){return{languageTypeOptions:f,price_from_list:[],lang:"en",oDataInfo:{},dataInfo:{multiLanguageList:[],contract:"",price_from:"auto"},formData:{remark:""},submitLoading:!1,dialogFormVisible:!1,IconColumus:d,OtherColumus:h,Other1Columus:p,Tools:[],multiLanguageList:[]}},computed:{icon_price:function(){var e=this,a=this.price_from_list.find((function(a){return a.key==e.dataInfo.price_from}))||{value:0},t=a.value;return Object(m["BigNumber"])(t||0).toFixed()}},filters:{appovalFilter:function(e){var a=v.find((function(a){return a.key==e}))||{display_name:""},t=a.display_name;return t},appovalFilterColor:function(e){var a=v.find((function(a){return a.key==e}))||{tagtype:"info"},t=a.tagtype;return t},UpperCase:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return e.toUpperCase()}},created:function(){this.init()},methods:{getLangTitle:function(e){return(b.find((function(a){return a.value==e}))||{}).name},init:function(){var e=this;Object(s["a"])({id:this.$route.params.id}).then((function(a){if(a.data){var t=a.data;e.oDataInfo=t,e.dataInfo=Object.assign(e.dataInfo,t),e.getPrice(),clearInterval(e.timer),e.timer=setInterval((function(){e.getPrice()}),5e3)}})).catch((function(e){return console.error(e)})),Object(s["c"])({id:this.$route.params.id}).then((function(a){if(a.data){e.languageTypeOptions=a.data;var t=e.languageTypeOptions[0].lang;e.langChange(t)}}))},langChange:function(e){var a=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=a.languageTypeOptions.find((function(a){return a.lang==e})),Object.assign(a.dataInfo,{abort:"",name:"",whitepaper:"",tools:[]},n&&n.data||{}),a.Tools=a.dataInfo.tools||[];case 3:case"end":return t.stop()}}),t)})))()},price_from_change:function(e){return Object(o["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:console.log({val:e});case 1:case"end":return a.stop()}}),a)})))()},getPrice:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var t,n,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(s["d"])({currency:"usdt",symbol:e.dataInfo.coin,chain:e.dataInfo.chain,contract:e.dataInfo.contract}).catch((function(e){return{status:5e3}}));case 2:t=a.sent,n=t.data,r=t.status,0==r&&(e.price_from_list=Object.entries(n).map((function(e){var a=Object(i["a"])(e,2),t=a[0],n=a[1];return{key:"all"==t?"auto":t,value:n}})));case 6:case"end":return a.stop()}}),a)})))()},submitApproval:function(e){var a=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(1!=e){t.next=8;break}return t.next=3,a.$confirm("确认通过后将在BitKeep后台中显示该币种，确认审核通过？");case 3:if(n=t.sent,"confirm"===n){t.next=6;break}return t.abrupt("return");case 6:t.next=10;break;case 8:return t.next=10,a.$refs["dataForm"].validate();case 10:if(1!=e||a.oDataInfo.price_from==a.dataInfo.price_from){t.next=13;break}return t.next=13,Object(s["e"])({id:a.dataInfo.id,price_from:a.dataInfo.price_from}).catch((function(e){a.$message.error(e)}));case 13:a.submitLoading=!0,Object(s["f"])({id:a.dataInfo.id,status:e,remark:a.formData.remark}).then((function(e){a.init(),a.$notify({title:"提示",message:"提交成功",type:"success",duration:2e3}),a.submitLoading=!1,a.dialogFormVisible=!1})).catch((function(e){a.init(),a.submitLoading=!1}));case 15:case"end":return t.stop()}}),t)})))()},refuse:function(){var e=this;this.$nextTick((function(){e.formData.remark="",setTimeout((function(){return e.$refs["dataForm"].clearValidate()}))})),this.dialogFormVisible=!0}},beforeDestroy:function(){clearInterval(this.timer)}},g=y,k=(t("d12d"),t("2877")),_=Object(k["a"])(g,n,r,!1,null,"334b6cd5",null);a["default"]=_.exports},cba0:function(e,a,t){"use strict";t.d(a,"b",(function(){return r})),t.d(a,"a",(function(){return i}));t("7db0"),t("b0c0"),t("ac1f"),t("1276"),t("d81d");var n=[{chain:"ada",name:"Cardano"},{chain:"ar",name:"Arweave"},{chain:"arbitrum",name:"Arbitrum"},{chain:"asm",name:"ASM"},{chain:"atom",name:"Cosmos"},{chain:"aurora",name:"Aurora"},{chain:"avax_c",name:"AVAX-C"},{chain:"avax_x",name:"AVAX-X"},{chain:"bch",name:"smartBCH"},{chain:"bgh",name:"BGH"},{chain:"bhp",name:"bhp"},{chain:"bnb",name:"BSC"},{chain:"boba",name:"Boba Network"},{chain:"btc",name:"Bitcoin"},{chain:"btt",name:"BitTorrent"},{chain:"celo",name:"Celo"},{chain:"ckb",name:"Nervos CKB"},{chain:"ckbl2",name:"Nervos CKB EVM"},{chain:"clo",name:"Callisto Mainent"},{chain:"cmp",name:"Caduceus"},{chain:"cro",name:"Crypto.com"},{chain:"crol2",name:"Cronos"},{chain:"cspr",name:"Casper"},{chain:"cube",name:"CUBE"},{chain:"czz",name:"ClassZZ"},{chain:"dash",name:"Dash"},{chain:"doge",name:"DOGE"},{chain:"dot",name:"Polkadot"},{chain:"dscc",name:"New Dimension"},{chain:"dscc1",name:"Dimension"},{chain:"egld",name:"Elrond"},{chain:"eos",name:"EOS"},{chain:"etc",name:"Ethereum Classic"},{chain:"eth",name:"Ethereum"},{chain:"evm",name:"evm"},{chain:"fil",name:"Filecoin"},{chain:"fio",name:"FIO"},{chain:"fra",name:"fra"},{chain:"ftm",name:"Fantom"},{chain:"fuse",name:"Fuse"},{chain:"gt",name:"GateChain"},{chain:"hbc",name:"HBC"},{chain:"ho",name:"HALO"},{chain:"ht",name:"Heco"},{chain:"htdf",name:"htdf"},{chain:"icp",name:"Internet Computer"},{chain:"inj",name:"Injective Protocol"},{chain:"iost",name:"IOST"},{chain:"iotx",name:"IoTeX"},{chain:"kai",name:"KAI"},{chain:"kcs",name:"KCC"},{chain:"khc",name:"KHC"},{chain:"klay",name:"KLAY"},{chain:"lat",name:"PlatON"},{chain:"lgcy",name:"LGCY Network"},{chain:"lucky",name:"Lucky Chain"},{chain:"luna",name:"Terra Classic"},{chain:"lunav2",name:"Terra"},{chain:"matic",name:"Polygon"},{chain:"mtr",name:"Meter Mainnet"},{chain:"near",name:"Near"},{chain:"neo",name:"neo"},{chain:"nuls",name:"nuls"},{chain:"okt",name:"OEC"},{chain:"one",name:"Harmony"},{chain:"ont",name:"ont"},{chain:"optimism",name:"Optimism"},{chain:"plugcn",name:"Plug Chain"},{chain:"qtum",name:"Qtum"},{chain:"scdo",name:"SCDO"},{chain:"sgb",name:"SGB"},{chain:"sol",name:"Solana"},{chain:"sys",name:"sys"},{chain:"tomo",name:"TomoChain"},{chain:"true",name:"TRUE"},{chain:"trx",name:"Tron"},{chain:"ulam",name:"ulam"},{chain:"usdt",name:"usdt"},{chain:"vlx",name:"Velas"},{chain:"vs",name:"vs"},{chain:"wax",name:"WAX"},{chain:"wicc",name:"wicc"},{chain:"xdai",name:"xDai"},{chain:"yta",name:"Yotta"},{chain:"zks",name:"zkSync"},{chain:"ztb",name:"ZSC"}];function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",a=n.find((function(a){return a.chain==e}));return null===a||void 0===a?void 0:a.name}function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",a="",t=e.split(",");return t.length>0&&t.map((function(e){a&&(a+=","),a+=r(e)})),a}},d12d:function(e,a,t){"use strict";t("98a4")},e9e6:function(e,a,t){"use strict";t("33c6")}}]);