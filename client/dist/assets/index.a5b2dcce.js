import{l as I,r as _,o as r,c as l,a as s,b as N,F as y,d as D,w as g,t as p,e as h,v as f,p as w,f as k,n as T,g as v,h as C,i as b,j as P,k as U,m as V}from"./vendor.685ce123.js";const B=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))d(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&d(i)}).observe(document,{childList:!0,subtree:!0});function o(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerpolicy&&(n.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?n.credentials="include":a.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(a){if(a.ep)return;a.ep=!0;const n=o(a);fetch(a.href,n)}};B();var m=(e,t)=>{const o=e.__vccOpts||e;for(const[d,a]of t)o[d]=a;return o};const L={name:"App",components:{},data:()=>({socket:I().connect()}),created(){const{commit:e}=this.$store,{push:t}=this.$router;fetch("/api/users/me").then(o=>o.json()).then(({authenticated:o})=>{e("setAuthenticated",o),t(o===!0?"/timeslots":"/booking")}).catch(console.error)},methods:{redirect(e){this.$router.push(e)}}},J={class:"navbar navbar-expand-md navbar-dark bg-dark"},q=s("button",{class:"navbar-toggler mx-2 mb-2",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNav"},[s("span",{class:"navbar-toggler-icon"})],-1),F={id:"navbarNav",class:"collapse navbar-collapse mx-2"},M={class:"navbar-nav"},E={class:"nav-item"},R={class:"nav-item"},z={class:"container-fluid py-4"};function H(e,t,o,d,a,n){const i=_("router-view");return r(),l(y,null,[s("nav",J,[q,s("div",F,[s("ul",M,[s("li",E,[s("a",{class:"nav-link",href:"#",onClick:t[0]||(t[0]=c=>n.redirect("/booking"))},"Booking")]),s("li",R,[s("a",{class:"nav-link",href:"#",onClick:t[1]||(t[1]=c=>n.redirect("/admin"))},"Admin")])])])]),s("section",z,[N(i)])],64)}var K=m(L,[["render",H]]),$=D({state:{authenticated:!1,adminUser:""},getters:{isAuthenticated(e){return e.authenticated},getAdminUser(e){return e.adminUser}},mutations:{setAuthenticated(e,t){e.authenticated=t},setAdminUser(e,t){e.adminUser=t}},actions:{},modules:{}});const G={name:"ConfirmBookingView",components:{},props:{timeslotID:{type:String,default:""}},emits:["close"],data:()=>({username:"",open:!1,duration:20*1e3,elapsed:0,windowOpen:!0}),created(){this.elapsed=0,console.log("created and elapsed reset!");let e=performance.now();const t=()=>{const o=performance.now();this.elapsed+=Math.min(o-e,this.duration-this.elapsed),e=o,this.duration!==this.elapsed&&this.windowOpen?this.handle=requestAnimationFrame(t):this.closeWindow()};t()},methods:{closeWindow(){this.windowOpen=!1,this.$emit("close")},book(e){console.log("tsID: ",e),fetch("/api/booking",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username,timeslotID:e})}).then(t=>t.json()).then(()=>{this.$emit("close")}).catch(console.error)}}},S=e=>(w("data-v-3daf0db3"),e=e(),k(),e),Q={class:"popup"},X={class:"popup-inner"},Y={class:"row"},Z=S(()=>s("label",{for:"username",class:"form-label h4"},"Fill in name and confirm:",-1)),x=S(()=>s("button",{type:"submit",class:"btn btn-dark mt-4 float-end"}," Confirm ",-1));function ee(e,t,o,d,a,n){return r(),l("div",Q,[s("div",X,[s("div",Y,[s("form",{class:"col",onSubmit:t[2]||(t[2]=g(i=>n.book(o.timeslotID),["prevent"]))},[Z,s("p",null,"Time: "+p(o.timeslotID),1),s("div",null," Time left to confirm: "+p(((e.duration-e.elapsed)/1e3).toFixed(0))+" seconds ",1),h(s("input",{id:"username","onUpdate:modelValue":t[0]||(t[0]=i=>e.username=i),type:"text",class:"form-control",placeholder:"Name",required:"",autofocus:""},null,512),[[f,e.username]]),x,s("button",{class:"btn btn-dark mt-4 float-start",onClick:t[1]||(t[1]=i=>n.closeWindow())}," Cancel ")],32)])])])}var A=m(G,[["render",ee],["__scopeId","data-v-3daf0db3"]]);const te={name:"BookingView",components:{Confirm:A},data:()=>({username:"",timeslots:[],showConfirmWindow:!1,timeslotID:"",notAvailable:!1}),created(){fetch("/api/timeslots").then(t=>t.json()).then(({timeslots:t})=>{console.log(t),this.timeslots=t}).catch(console.error);const{socket:e}=this.$root;e.on("reserve",()=>{this.updateTimeslots()}),e.on("unreserve",()=>{this.updateTimeslots()}),e.on("book",()=>{this.updateTimeslots()}),e.on("add",()=>{console.log("addTimeslotSocket"),this.updateTimeslots()}),e.on("remove",()=>{console.log("removeTimeslotSocket"),this.updateTimeslots()})},methods:{bookTime(e){const t=e.status;console.log(t),t==="available"?(this.notAvailable=!1,this.timeslotID=e.id,fetch("/api/reserve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({timeslotID:this.timeslotID})}),this.showConfirmWindow=!0):this.notAvailable=!0},closeConfirmWindow(){fetch("/api/unreserve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({timeslotID:this.timeslotID})}),this.showConfirmWindow=!1,console.log("unreserved",this.timeslotID)},updateTimeslots(){console.log("update"),fetch("/api/timeslots").then(e=>e.json()).then(({timeslots:e})=>{console.log(e),this.timeslots=e}).catch(console.error)},authenticate(){const{commit:e}=this.$store,{push:t}=this.$router;fetch("/api/booking",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username})}).then(o=>o.json()).then(({authenticated:o})=>{e("setAuthenticated",o),t(o===!0?"/timeslots":"/booking")}).catch(console.error)}}},se={class:"row"},oe=s("div",{class:"col"},null,-1),ne={class:"col list-group"},ie=s("label",{for:"timetable",class:"form-label h4"},"Time Slots:",-1),ae=["onClick"],re=s("div",{class:"row"},null,-1),le=s("div",{class:"col"},null,-1),de={class:"row"},ce=s("div",{class:"col"},null,-1),me=s("div",{class:"col"},null,-1);function ue(e,t,o,d,a,n){const i=_("Confirm");return r(),l("div",se,[oe,s("div",ne,[ie,e.notAvailable?(r(),l("div",{key:0,class:T([e.errorMessage,"alert alert-danger alert-dismissable"])}," Tiden kan inte bokas! ",2)):v("",!0),(r(!0),l(y,null,C(e.timeslots,c=>(r(),l("button",{key:c.time,class:T([c.status,"list-group-item list-group-item-action my-2 py-2"]),type:"button",onClick:u=>n.bookTime(c)},p(c.time),11,ae))),128)),re]),le,s("div",de,[ce,e.showConfirmWindow?(r(),b(i,{key:0,"timeslot-i-d":e.timeslotID,onClose:t[0]||(t[0]=()=>n.closeConfirmWindow())},null,8,["timeslot-i-d"])):v("",!0)]),me])}var pe=m(te,[["render",ue]]);const he={name:"AdminLoginView",components:{},data:()=>({username:"",password:""}),methods:{authenticate(){const{commit:e}=this.$store,{push:t}=this.$router;fetch("/api/checkLogin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username,password:this.password})}).then(o=>{o.ok?(e("setAuthenticated",!0),e("setAdminUser",this.username),t({path:`/admin${this.username}`})):(this.$store.commit("setAuthenticated",!1),this.username="",this.password="")}).catch(o=>{this.loginFail=!0,console.info("Could not log in.",o)})}}},fe={class:"row"},_e=s("div",{class:"col"},null,-1),ve=s("label",{for:"admin",class:"form-label h4"},"Admin login:",-1),ge=s("button",{type:"submit",class:"btn btn-dark mt-4 float-end"},"Login",-1),be=s("div",{class:"col"},null,-1);function $e(e,t,o,d,a,n){return r(),l("div",fe,[_e,s("form",{class:"col",onSubmit:t[2]||(t[2]=g(i=>n.authenticate(),["prevent"]))},[ve,h(s("input",{id:"username","onUpdate:modelValue":t[0]||(t[0]=i=>e.username=i),type:"text",class:"form-control",placeholder:"Username",required:"",autofocus:""},null,512),[[f,e.username]]),h(s("input",{id:"password","onUpdate:modelValue":t[1]||(t[1]=i=>e.password=i),type:"password",class:"form-control",placeholder:"Password",required:"",autofocus:""},null,512),[[f,e.password]]),ge],32),be])}var ye=m(he,[["render",$e]]);const we={name:"ConfigTimeslotView",components:{},props:{time:{type:String,default:""},id:{type:String,default:""},assistant:{type:String,default:""}},emits:["close"],data:()=>({username:"",open:!1}),methods:{removeTimeslot(){fetch("/api/removeTimeslot",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:this.id,assistant:this.assistant})}),this.$emit("close")},authenticate(){const{commit:e}=this.$store,{push:t}=this.$router;fetch("/api/booking",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username})}).then(o=>o.json()).then(({authenticated:o})=>{e("setAuthenticated",o),t(o===!0?"/admin":"/booking")}).catch(console.error)}}},O=e=>(w("data-v-1ea13ef4"),e=e(),k(),e),ke={class:"popup"},Te={class:"popup-inner"},Ce={class:"row"},Se=O(()=>s("label",{for:"username",class:"form-label h4"},"Configure Time Slot",-1)),Ae=O(()=>s("button",{type:"submit",class:"btn btn-dark mt-4 float-end"}," Remove ",-1));function Oe(e,t,o,d,a,n){return r(),l("div",ke,[s("div",Te,[s("div",Ce,[s("form",{class:"col",onSubmit:t[1]||(t[1]=g(i=>n.removeTimeslot(),["prevent"]))},[Se,s("p",null,"Time: "+p(o.time),1),Ae,s("button",{class:"btn btn-dark mt-4 float-start",onClick:t[0]||(t[0]=i=>e.$emit("close"))}," Cancel ")],32)])])])}var We=m(we,[["render",Oe],["__scopeId","data-v-1ea13ef4"]]);const je={name:"ConfigTimeslotView",components:{},props:{assistant:{type:String,default:""}},emits:["close"],data:()=>({username:"",open:!1}),methods:{addTimeslot(e,t){console.log(`${this.assistant+e} ${t}`),fetch("/api/addTimeslot",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({assistant:this.assistant,date:e,time:t})}),this.$emit("close")},authenticate(){const{commit:e}=this.$store,{push:t}=this.$router;fetch("/api/booking",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username})}).then(o=>o.json()).then(({authenticated:o})=>{e("setAuthenticated",o),t(o===!0?"/admin":"/booking")}).catch(console.error)}}},W=e=>(w("data-v-577855d2"),e=e(),k(),e),Ie={class:"popup"},Ne={class:"popup-inner"},De={class:"row"},Pe=W(()=>s("label",{for:"username",class:"form-label h4"},"Add Time Slot",-1)),Ue=W(()=>s("button",{type:"submit",class:"btn btn-dark mt-4 float-end"},"Add",-1));function Ve(e,t,o,d,a,n){return r(),l("div",Ie,[s("div",Ne,[s("div",De,[s("form",{class:"col",onSubmit:t[3]||(t[3]=g(i=>n.addTimeslot(e.datepicked,e.timepicked),["prevent"]))},[Pe,h(s("input",{id:"datepicked","onUpdate:modelValue":t[0]||(t[0]=i=>e.datepicked=i),type:"date",class:"form-control",placeholder:"Date",required:"",autofocus:""},null,512),[[f,e.datepicked]]),h(s("input",{id:"timepicked","onUpdate:modelValue":t[1]||(t[1]=i=>e.timepicked=i),type:"time",class:"form-control",placeholder:"Time",required:"",autofocus:""},null,512),[[f,e.timepicked]]),Ue,s("button",{class:"btn btn-dark mt-4 float-start",onClick:t[2]||(t[2]=i=>e.$emit("close"))}," Cancel ")],32)])])])}var Be=m(je,[["render",Ve],["__scopeId","data-v-577855d2"]]);const Le={name:"AdminView",components:{Configure:We,Add:Be},data:()=>({assistant:"",timeslots:[],showConfigWindow:!1,showAddWindow:!1,curTimePressed:""}),created(){this.assistant=this.$route.params.name,fetch("/api/timeslots").then(t=>t.json()).then(({timeslots:t})=>{this.timeslots=t}).catch(console.error);const{socket:e}=this.$root;e.on("add",()=>{console.log("addTimeslotSocket"),this.updateTimeslots()}),e.on("remove",()=>{console.log("removeTimeslotSocket"),this.updateTimeslots()})},methods:{assistantTimeslots(){const e=[];return Object.keys(this.timeslots).forEach(t=>{this.timeslots[t].assistantID===this.assistant&&e.push(this.timeslots[t])}),e},logout(){const{commit:e}=this.$store,{push:t}=this.$router;e("setAuthenticated",!1),t({path:"adminlogin"}).catch(console.error),fetch("/api/logout",{method:"POST",headers:{"Content-Type":"application/json"}})},configTimeslot(e){console.log("time pressed"),this.closeAddWindow(),this.curTimePressed=e.time,this.id=e.id,this.curAssistant=e.assistantID,this.showConfigWindow=!0},updateTimeslots(){console.log("update"),fetch("/api/timeslots").then(e=>e.json()).then(({timeslots:e})=>{console.log(e),this.timeslots=e}).catch(console.error)},closeConfigWindow(){console.log("close configure window"),this.showConfigWindow=!1},addTimeslot(){console.log("add time slot"),this.closeConfigWindow(),this.showAddWindow=!0},closeAddWindow(){console.log("close add window"),this.showAddWindow=!1},authenticate(){const{commit:e}=this.$store,{push:t}=this.$router;fetch("/api/booking",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username})}).then(o=>o.json()).then(({authenticated:o})=>{e("setAuthenticated",o),t(o===!0?"/timeslots":"/booking")}).catch(console.error)}}},Je={class:"row"},qe=s("div",{class:"col"},null,-1),Fe={class:"col list-group"},Me={for:"timetable",class:"form-label h4"},Ee=s("p",null,"Dina tider:",-1),Re=["onClick"],ze=s("div",{class:"row"},null,-1),He=s("div",{class:"col"},null,-1),Ke={class:"row"},Ge=s("div",{class:"col"},null,-1),Qe=s("div",{class:"col"},null,-1);function Xe(e,t,o,d,a,n){const i=_("Configure"),c=_("Add");return r(),l("div",Je,[qe,s("div",Fe,[s("label",Me,"Welcome "+p(e.assistant)+"!",1),Ee,(r(!0),l(y,null,C(n.assistantTimeslots(),u=>(r(),l("button",{key:u.time,type:"button",class:"list-group-item list-group-item-action my-2 py-2",onClick:xe=>n.configTimeslot(u)},p(u.time),9,Re))),128)),s("button",{type:"button",class:"btn btn-dark mt-4 float-end",onClick:t[0]||(t[0]=u=>n.addTimeslot())}," Add Time Slot "),s("button",{type:"button",class:"btn btn-dark mt-4 float-end",onClick:t[1]||(t[1]=u=>n.logout())}," Logout "),ze]),He,s("div",Ke,[Ge,e.showConfigWindow?(r(),b(i,{key:0,id:e.id,time:e.curTimePressed,assistant:e.curAssistant,onClose:t[2]||(t[2]=()=>n.closeConfigWindow())},null,8,["id","time","assistant"])):v("",!0),e.showAddWindow?(r(),b(c,{key:1,assistant:e.assistant,onClose:t[3]||(t[3]=()=>n.closeAddWindow())},null,8,["assistant"])):v("",!0)]),Qe])}var Ye=m(Le,[["render",Xe]]);const Ze=[{path:"/booking",component:pe},{path:"/adminlogin",component:ye},{path:"/admin:name",component:Ye},{path:"/confirm",component:A}],j=P({history:U("/"),routes:Ze});j.beforeEach((e,t,o)=>{$.state.authenticated||e.path==="/booking"||e.path==="/adminlogin"||e.path==="/confirm"?e.path==="/admin"?o(`/admin${$.state.adminUser}`):o():e.path==="/admin"?o("/adminlogin"):(console.info("Unauthenticated user. Redirecting to booking page."),o("/booking"))});V(K).use($).use(j).mount("#app");
