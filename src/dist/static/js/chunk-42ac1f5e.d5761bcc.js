(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-42ac1f5e"],{"1c18":function(e,t,i){},"333d":function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[i("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},n=[];i("a9e3");Math.easeInOutQuad=function(e,t,i,a){return e/=a/2,e<1?i/2*e*e+t:(e--,-i/2*(e*(e-2)-1)+t)};var r=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function o(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function s(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function l(e,t,i){var a=s(),n=e-a,l=20,u=0;t="undefined"===typeof t?500:t;var c=function e(){u+=l;var s=Math.easeInOutQuad(u,a,n,t);o(s),u<t?r(e):i&&"function"===typeof i&&i()};c()}var u={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&l(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&l(0,800)}}},c=u,d=(i("e498"),i("2877")),p=Object(d["a"])(c,a,n,!1,null,"6af373ef",null);t["a"]=p.exports},"33c6":function(e,t,i){},3902:function(e,t,i){},"3c4a":function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"container-header"},[i("h3",[e._v(e._s(e.title))])])},n=[],r={name:"ContainerHeader",props:{title:{type:String,default:""}},data:function(){return{}},created:function(){},methods:{}},o=r,s=(i("e9e6"),i("2877")),l=Object(s["a"])(o,a,n,!1,null,"155e36a6",null);t["a"]=l.exports},"52e9":function(e,t,i){"use strict";i("3902")},"65ba":function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{class:{"container-footer":!0},style:e.style},[i("div",{staticClass:"container-footer-place"}),i("div",{attrs:{id:"container-footer-content"}},[e._t("default")],2)])},n=[],r=i("1da1"),o=(i("96cf"),{name:"ContainerFooter",props:{fixed:{type:Boolean,default:!0}},data:function(){return{style:{height:"100px"}}},created:function(){},methods:{},mounted:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var i,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$nextTick();case 2:i=e.$el.querySelector("#container-footer-content").getBoundingClientRect(),i.width,a=i.height,e.style={height:"".concat(a,"px")};case 4:case"end":return t.stop()}}),t)})))()}}),s=o,l=(i("52e9"),i("2877")),u=Object(l["a"])(s,a,n,!1,null,"105c03b0",null);t["a"]=u.exports},6724:function(e,t,i){"use strict";i("8d41");var a="@@wavesContext";function n(e,t){function i(i){var a=Object.assign({},t.value),n=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},a),r=n.ele;if(r){r.style.position="relative",r.style.overflow="hidden";var o=r.getBoundingClientRect(),s=r.querySelector(".waves-ripple");switch(s?s.className="waves-ripple":(s=document.createElement("span"),s.className="waves-ripple",s.style.height=s.style.width=Math.max(o.width,o.height)+"px",r.appendChild(s)),n.type){case"center":s.style.top=o.height/2-s.offsetHeight/2+"px",s.style.left=o.width/2-s.offsetWidth/2+"px";break;default:s.style.top=(i.pageY-o.top-s.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",s.style.left=(i.pageX-o.left-s.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return s.style.backgroundColor=n.color,s.className="waves-ripple z-active",!1}}return e[a]?e[a].removeHandle=i:e[a]={removeHandle:i},i}var r={bind:function(e,t){e.addEventListener("click",n(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[a].removeHandle,!1),e.addEventListener("click",n(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[a].removeHandle,!1),e[a]=null,delete e[a]}},o=function(e){e.directive("waves",r)};window.Vue&&(window.waves=r,Vue.use(o)),r.install=o;t["a"]=r},"7f6b":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container"},[i("ContainerHeader",{attrs:{title:e.$route.meta.title}}),i("div",{staticClass:"filter-container"},[i("el-form",{attrs:{inline:!0}},[i("el-form-item",{attrs:{label:"关键字搜索"}},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"账户名称"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.title,callback:function(t){e.$set(e.listQuery,"title",t)},expression:"listQuery.title"}})],1),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(" 搜索 ")])],1)],1),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"row-click":e.handleRowClick}},e._l(e.TableColumus,(function(t){return i("el-table-column",{key:t.id,attrs:{label:t.label,width:t.width||"auto",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){var n=a.row;return[i("span",[e._v(e._s(n[t.key]))])]}}],null,!0)})})),1),i("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total > 0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.pageSize},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"pageSize",t)},pagination:e.getList}}),i("el-dialog",{attrs:{title:"edit"===e.dialogType?"编辑用户":"添加用户",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[i("el-form",{ref:"dataForm",attrs:{model:e.userData,"label-position":"right","label-width":"80px"}},[i("el-form-item",{attrs:{label:"用户名",prop:"loginName",rules:[{required:"add"==e.dialogType,message:"请填写用户名"}]}},[i("el-input",{attrs:{disabled:"edit"==e.dialogType,placeholder:"请填写用户名"},model:{value:e.userData.loginName,callback:function(t){e.$set(e.userData,"loginName",t)},expression:"userData.loginName"}})],1),i("el-form-item",{attrs:{label:"密码",prop:"password",rules:[{required:"add"==e.dialogType,message:"请填写密码"}]}},[i("el-input",{attrs:{disabled:"edit"==e.dialogType,type:"password",placeholder:"请填写修改密码"},model:{value:e.userData.password,callback:function(t){e.$set(e.userData,"password",t)},expression:"userData.password"}})],1),(e.userData.permission||"").trim().split(",").includes("admin")?e._e():i("div",[i("el-divider",{staticClass:"title"},[e._v("用户权限")]),i("el-tree",{ref:"tree",staticClass:"permission-tree",attrs:{"check-strictly":e.checkStrictly,data:e.permissionTree,props:e.defaultProps,"show-checkbox":"","node-key":"permission"}})],1)],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v(" 取消 ")]),i("el-button",{attrs:{type:"primary",loading:e.submitLoading},on:{click:e.handleSave}},[e._v(" 保存 ")])],1)],1)],1)},n=[],r=i("1da1"),o=i("5530"),s=(i("96cf"),i("7db0"),i("d81d"),i("4e82"),i("a15b"),i("b775"));function l(e){return Object(s["a"])({url:"/openplatform/list",method:"get",params:e})}var u=i("6724"),c=i("ed08"),d=i("333d"),p=i("3c4a"),f=i("65ba"),g=i("f71e"),m=(i("a18c"),i("2f62")),y=[{key:0,display_name:"审核中",tagtype:"warn"},{key:1,display_name:"审核通过",tagtype:"success"},{key:2,display_name:"审核失败",tagtype:"danger"}],h=[{label:"id",key:"id",type:"string",show:!1,value:"",width:"80px"},{label:"用户地址",key:"eth_address",type:"string",show:!1,value:""},{label:"钱包id",key:"wallet_id",type:"string",show:!1,value:"",filter:"parseTime"},{label:"钱包平台",key:"wallet_platform",type:"string",show:!1,value:"",filter:"parseTime"},{label:"主链",key:"chain",type:"string",show:!1,value:"",filter:"parseTime"},{label:"最后一次登录时间",key:"last_login_time",type:"string",show:!1,value:"",filter:"parseTime"}],v={id:"",loginName:"",password:"",permission:""},b={name:"userList",computed:Object(o["a"])({},Object(m["b"])(["permission_routes","permissionTree","permission"])),components:{Pagination:d["a"],ContainerHeader:p["a"],ContainerFooter:f["a"]},directives:{waves:u["a"]},filters:{statusFilter:function(e){var t={published:"success",draft:"info",deleted:"danger"};return t[e]},appovalFilter:function(e){var t=y.find((function(t){return t.key==e}))||{display_name:""},i=t.display_name;return i},appovalFilterColor:function(e){var t=y.find((function(t){return t.key==e}))||{tagtype:"info"},i=t.tagtype;return i}},data:function(){return{TableColumus:h,submitLoading:!1,tableKey:0,list:[],total:0,listLoading:!0,listQuery:{pageNum:1,pageSize:20,importance:void 0,title:void 0,type:void 0,sort:"+id"},calendarTypeOptions:y,sortOptions:[{label:"ID Ascending",key:"+id"},{label:"ID Descending",key:"-id"}],dialogFormVisible:!1,dialogType:"edit",checkStrictly:!1,defaultProps:{children:"children",label:"title"},userData:JSON.parse(JSON.stringify(v)),rules:{type:[{required:!0,message:"type is required",trigger:"change"}],timestamp:[{type:"date",required:!0,message:"timestamp is required",trigger:"change"}],title:[{required:!0,message:"title is required",trigger:"blur"}]},downloadLoading:!1}},created:function(){this.getList()},methods:{getList:function(e){var t=this;e||(this.listLoading=!0),l(this.listQuery).then((function(e){t.list=e.data.list.map((function(e){return e.update_time=Object(c["c"])(e.update_time),e})),t.total=e.data.total,setTimeout((function(){t.listLoading=!1}),1500)}))},handleFilter:function(){this.listQuery.pageNum=1,this.getList()},handleCopy:function(e,t){Object(g["a"])(e,t)},handleRowClick:function(e){e.id},sortChange:function(e){var t=e.prop,i=e.order;"id"===t&&this.sortByID(i)},sortByID:function(e){this.listQuery.sort="ascending"===e?"+id":"-id",this.handleFilter()},handleSave:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$refs["dataForm"].validate((function(t){if(t){e.submitLoading=!0;var i=e.userData,a=i.loginName,n=i.password,r=i.id,o=e.$refs.tree.getCheckedKeys(),s="edit"==e.dialogType?(void 0)({id:r,loginName:a,password:n,permission:o.join(",")}):(void 0)({loginName:a,password:n,permission:o.join(",")});s.then((function(t){e.getList(),e.$notify({title:"提示",message:"提交成功",type:"success",duration:2e3}),e.submitLoading=!1,e.dialogFormVisible=!1})).catch((function(t){e.submitLoading=!1,e.getList()}))}}));case 1:case"end":return t.stop()}}),t)})))()},getSortClass:function(e){var t=this.listQuery.sort;return t==="+".concat(e)?"ascending":"descending"}}},w=b,k=i("2877"),C=Object(k["a"])(w,a,n,!1,null,null,null);t["default"]=C.exports},"8d41":function(e,t,i){},a15b:function(e,t,i){"use strict";var a=i("23e7"),n=i("44ad"),r=i("fc6a"),o=i("a640"),s=[].join,l=n!=Object,u=o("join",",");a({target:"Array",proto:!0,forced:l||!u},{join:function(e){return s.call(r(this),void 0===e?",":e)}})},e498:function(e,t,i){"use strict";i("1c18")},e9e6:function(e,t,i){"use strict";i("33c6")},f71e:function(e,t,i){"use strict";i.d(t,"a",(function(){return l}));var a=i("2b0e"),n=i("b311"),r=i.n(n);function o(e){a["default"].prototype.$message({message:e||"Copy successfully",type:"success",duration:1500})}function s(){a["default"].prototype.$message({message:"Copy failed",type:"error"})}function l(e,t){var i=new r.a(t.target,{text:function(){return e}});i.on("success",(function(){o(e),i.destroy()})),i.on("error",(function(){s(),i.destroy()})),i.onClick(t)}}}]);