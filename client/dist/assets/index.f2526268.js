import{l as I,r as g,o as r,c as l,a as s,b as j,F as _,d as N,e as v,t as u,w as $,f as h,v as f,p as k,g as C,h as b,i as w,n as D,j as V,k as U,m as P}from"./vendor.205d2cbb.js";const B=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))d(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&d(i)}).observe(document,{childList:!0,subtree:!0});function o(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerpolicy&&(n.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?n.credentials="include":a.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(a){if(a.ep)return;a.ep=!0;const n=o(a);fetch(a.href,n)}};B();var m=(e,t)=>{const o=e.__vccOpts||e;for(const[d,a]of t)o[d]=a;return o};const L={name:"App",components:{},data:()=>({socket:I().connect()}),created(){const{commit:e}=this.$store,{push:t}=this.$router;fetch("/api/users/me").then(o=>o.json()).then(({authenticated:o})=>{e("setAuthenticated",o),t(o===!0?"/timeslots":"/booking")}).catch(console.error)},methods:{redirect(e){this.$router.push(e)}}},J={class:"navbar navbar-expand-md navbar-dark bg-dark"},q=s("button",{class:"navbar-toggler mx-2 mb-2",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNav"},[s("span",{class:"navbar-toggler-icon"})],-1),R={id:"navbarNav",class:"collapse navbar-collapse mx-2"},F={class:"navbar-nav"},E={class:"nav-item"},M={class:"nav-item"},z={class:"container-fluid py-4"};function H(e,t,o,d,a,n){const i=g("router-view");return r(),l(_,null,[s("nav",J,[q,s("div",R,[s("ul",F,[s("li",E,[s("a",{class:"nav-link",href:"#",onClick:t[0]||(t[0]=c=>n.redirect("/booking"))},"Booking")]),s("li",M,[s("a",{class:"nav-link",href:"#",onClick:t[1]||(t[1]=c=>n.redirect("/admin"))},"Admin")])])])]),s("section",z,[j(i)])],64)}var K=m(L,[["render",H]]),y=N({state:{authenticated:!1,adminUser:""},getters:{isAuthenticated(e){return e.authenticated},getAdminUser(e){return e.adminUser}},mutations:{setAuthenticated(e,t){e.authenticated=t},setAdminUser(e,t){e.adminUser=t}},actions:{},modules:{}});const G={name:"RoomsView",components:{},data:()=>({rooms:[]}),created(){fetch("/api/rooms").then(e=>e.json()).then(({rooms:e})=>{this.rooms=e}).catch(console.error)},methods:{redirect(e){this.$router.push(`/rooms/${e}`)}}},Q={class:"row"},X=s("div",{class:"col"},null,-1),Y={class:"col list-group"},Z=["onClick"],x=s("div",{class:"col"},null,-1);function ee(e,t,o,d,a,n){return r(),l("div",Q,[X,s("div",Y,[(r(!0),l(_,null,v(e.rooms,i=>(r(),l("button",{key:i.name,type:"button",class:"list-group-item list-group-item-action my-2 py-2",onClick:c=>n.redirect(i.name)},u(i.name),9,Z))),128))]),x])}var te=m(G,[["render",ee]]);const se={name:"RoomView",components:{},data(){return{name:this.$route.params.name,messages:[],message:""}},async created(){const e=await fetch(`/api/rooms/${this.name}/messages`),{messages:t}=await e.json();this.messages=t;const{socket:o}=this.$root;o.on("msg",d=>{this.messages=[...this.messages,d]})},methods:{send(){fetch(`/api/rooms/${this.name}/messages`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:this.message})}).catch(console.error),this.message=""}}},oe={class:"row"},ne=s("div",{class:"col-3"},null,-1),ie={class:"col-6 list-group"},ae=s("button",{type:"submit",class:"btn btn-dark mt-4 float-end"},"SEND",-1),re=s("div",{class:"col-3"},null,-1);function le(e,t,o,d,a,n){return r(),l("div",oe,[ne,s("ul",ie,[(r(!0),l(_,null,v(a.messages,(i,c)=>(r(),l("li",{key:c,type:"button",class:"list-group-item py-1"},u(i),1))),128)),s("form",{onSubmit:t[1]||(t[1]=$(i=>n.send(),["prevent"]))},[h(s("input",{id:"message","onUpdate:modelValue":t[0]||(t[0]=i=>a.message=i),type:"text",class:"form-control form-control-sm",placeholder:"message...",required:"",autofocus:""},null,512),[[f,a.message]]),ae],32)]),re])}var de=m(se,[["render",le]]);const ce={name:"confirmBookingView",components:{},props:{timeslotID:String},data:()=>({username:"",open:!1,duration:20*1e3,elapsed:0,windowOpen:!0}),created(){this.elapsed=0,console.log("created and elapsed reset!");let e=performance.now();const t=()=>{const o=performance.now();this.elapsed+=Math.min(o-e,this.duration-this.elapsed),e=o,this.duration!==this.elapsed&&this.windowOpen?this.handle=requestAnimationFrame(t):this.closeWindow()};t()},methods:{closeWindow(){this.windowOpen=!1,this.$emit("close")},authenticate(){this.$store,this.$router},book(e){console.log("tsID: ",e),fetch("/api/booking",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username,timeslotID:e})}).then(t=>t.json()).then(()=>{this.$emit("close")}).catch(console.error)}}},S=e=>(k("data-v-3daf0db3"),e=e(),C(),e),me={class:"popup"},ue={class:"popup-inner"},pe={class:"row"},he=S(()=>s("label",{for:"username",class:"form-label h4"},"Fill in name and confirm:",-1)),fe=S(()=>s("button",{type:"submit",class:"btn btn-dark mt-4 float-end"},"Confirm",-1));function _e(e,t,o,d,a,n){return r(),l("div",me,[s("div",ue,[s("div",pe,[s("form",{class:"col",onSubmit:t[2]||(t[2]=$(i=>n.book(o.timeslotID),["prevent"]))},[he,s("p",null,"Time: "+u(o.timeslotID),1),s("div",null," Time left to confirm: "+u(((e.duration-e.elapsed)/1e3).toFixed(0))+" seconds ",1),h(s("input",{id:"username","onUpdate:modelValue":t[0]||(t[0]=i=>e.username=i),type:"text",class:"form-control",placeholder:"Name",required:"",autofocus:""},null,512),[[f,e.username]]),fe,s("button",{class:"btn btn-dark mt-4 float-start",onClick:t[1]||(t[1]=i=>n.closeWindow())},"Cancel ")],32)])])])}var T=m(ce,[["render",_e],["__scopeId","data-v-3daf0db3"]]);const $e={name:"BookingView",components:{Confirm:T},data:()=>({username:"",timeslots:[],showConfirmWindow:!1,timeslotID:""}),created(){fetch("/api/timeslots").then(e=>e.json()).then(({timeslots:e})=>{console.log(e),this.timeslots=e}).catch(console.error);for(const e in this.timeslots)this.timeslots[e]},methods:{bookTime(e){console.log("time pressed"),this.timeslotID=e,fetch("/api/reserve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({timeslotID:e})}),this.showConfirmWindow=!0,this.timeslots.$forceUpdate()},closeConfirmWindow(){fetch("/api/unreserve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({timeslotID:this.timeslotID})}),this.showConfirmWindow=!1,console.log("unreserved",this.timeslotID)},authenticate(){const{commit:e}=this.$store,{push:t}=this.$router;fetch("/api/booking",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username})}).then(o=>o.json()).then(({authenticated:o})=>{e("setAuthenticated",o),t(o===!0?"/timeslots":"/booking")}).catch(console.error)}}},ge={class:"row"},ve=s("div",{class:"col"},null,-1),be={class:"col list-group"},we=s("label",{for:"timetable",class:"form-label h4"},"Time Slots:",-1),ye=["onClick"],ke=s("div",{class:"row"},null,-1),Ce=s("div",{class:"col"},null,-1),Se={class:"row"},Te=s("div",{class:"col"},null,-1),Ae=s("div",{class:"col"},null,-1);function Oe(e,t,o,d,a,n){const i=g("Confirm");return r(),l("div",ge,[ve,s("div",be,[we,(r(!0),l(_,null,v(e.timeslots,c=>(r(),l("button",{class:D([c.status,"list-group-item list-group-item-action my-2 py-2"]),key:c.time,type:"button",onClick:p=>n.bookTime(c.id)},u(c.time),11,ye))),128)),ke]),Ce,s("div",Se,[Te,e.showConfirmWindow?(r(),b(i,{key:0,timeslotID:e.timeslotID,onClose:t[0]||(t[0]=()=>n.closeConfirmWindow())},null,8,["timeslotID"])):w("",!0)]),Ae])}var We=m($e,[["render",Oe]]);const Ie={name:"adminLoginView",components:{},data:()=>({username:"",password:""}),methods:{authenticate(){this.$store,this.$router,fetch("/api/checkLogin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username,password:this.password})}).then(e=>{e.ok?(this.$store.commit("setAuthenticated",!0),this.$store.commit("setAdminUser",this.username),this.$router.push({path:"/admin"+this.username})):(this.$store.commit("setAuthenticated",!1),this.username="",this.password="")}).catch(e=>{this.loginFail=!0,console.info("Could not log in.",e)})}}},je={class:"row"},Ne=s("div",{class:"col"},null,-1),De=s("label",{for:"admin",class:"form-label h4"},"Admin login:",-1),Ve=s("button",{type:"submit",class:"btn btn-dark mt-4 float-end"},"Login",-1),Ue=s("div",{class:"col"},null,-1);function Pe(e,t,o,d,a,n){return r(),l("div",je,[Ne,s("form",{class:"col",onSubmit:t[2]||(t[2]=$(i=>n.authenticate(),["prevent"]))},[De,h(s("input",{id:"username","onUpdate:modelValue":t[0]||(t[0]=i=>e.username=i),type:"text",class:"form-control",placeholder:"Username",required:"",autofocus:""},null,512),[[f,e.username]]),h(s("input",{id:"password","onUpdate:modelValue":t[1]||(t[1]=i=>e.password=i),type:"password",class:"form-control",placeholder:"Password",required:"",autofocus:""},null,512),[[f,e.password]]),Ve],32),Ue])}var Be=m(Ie,[["render",Pe]]);const Le={name:"configTimeSlotView",components:{},props:{time:String},data:()=>({username:"",open:!1}),methods:{removeTimeSlot(){this.$emit("close")},authenticate(){const{commit:e}=this.$store,{push:t}=this.$router;fetch("/api/booking",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username})}).then(o=>o.json()).then(({authenticated:o})=>{e("setAuthenticated",o),t(o===!0?"/admin":"/booking")}).catch(console.error)}}},A=e=>(k("data-v-1ea13ef4"),e=e(),C(),e),Je={class:"popup"},qe={class:"popup-inner"},Re={class:"row"},Fe=A(()=>s("label",{for:"username",class:"form-label h4"},"Configure Time Slot",-1)),Ee=A(()=>s("button",{type:"submit",class:"btn btn-dark mt-4 float-end"},"Remove",-1));function Me(e,t,o,d,a,n){return r(),l("div",Je,[s("div",qe,[s("div",Re,[s("form",{class:"col",onSubmit:t[1]||(t[1]=$(i=>n.removeTimeSlot(),["prevent"]))},[Fe,s("p",null,"Time: "+u(o.time),1),Ee,s("button",{class:"btn btn-dark mt-4 float-start",onClick:t[0]||(t[0]=i=>e.$emit("close"))},"Cancel ")],32)])])])}var ze=m(Le,[["render",Me],["__scopeId","data-v-1ea13ef4"]]);const He={name:"configTimeSlotView",components:{},data:()=>({username:"",open:!1,datepicked:"",timepicked:""}),methods:{addTimeSlot(){timeslotID=datepicked+timepicked,this.$emit("close")},authenticate(){const{commit:e}=this.$store,{push:t}=this.$router;fetch("/api/booking",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username})}).then(o=>o.json()).then(({authenticated:o})=>{e("setAuthenticated",o),t(o===!0?"/admin":"/booking")}).catch(console.error)}}},O=e=>(k("data-v-577855d2"),e=e(),C(),e),Ke={class:"popup"},Ge={class:"popup-inner"},Qe={class:"row"},Xe=O(()=>s("label",{for:"username",class:"form-label h4"},"Add Time Slot",-1)),Ye=O(()=>s("button",{type:"submit",class:"btn btn-dark mt-4 float-end"},"Add",-1));function Ze(e,t,o,d,a,n){return r(),l("div",Ke,[s("div",Ge,[s("div",Qe,[s("form",{class:"col",onSubmit:t[3]||(t[3]=$(i=>n.addTimeSlot(),["prevent"]))},[Xe,h(s("input",{id:"datepicked","onUpdate:modelValue":t[0]||(t[0]=i=>e.datepicked=i),type:"date",class:"form-control",placeholder:"Date",required:"",autofocus:""},null,512),[[f,e.datepicked]]),h(s("input",{id:"timepicked","onUpdate:modelValue":t[1]||(t[1]=i=>e.timepicked=i),type:"time",class:"form-control",placeholder:"Time",required:"",autofocus:""},null,512),[[f,e.timepicked]]),Ye,s("button",{class:"btn btn-dark mt-4 float-start",onClick:t[2]||(t[2]=i=>e.$emit("close"))}," Cancel ")],32)])])])}var xe=m(He,[["render",Ze],["__scopeId","data-v-577855d2"]]);const et={name:"AdminView",components:{Configure:ze,Add:xe},data:()=>({assistant:"",timeslots:[],showConfigWindow:!1,showAddWindow:!1,curTimePressed:""}),created(){this.assistant=this.$route.params.name,fetch("/api/timeslots").then(e=>e.json()).then(({timeslots:e})=>{this.timeslots=e}).catch(console.error)},methods:{assistantTimeSlots(){const e=[];for(var t in this.timeslots)this.timeslots[t].assistantID===this.assistant&&e.push(this.timeslots[t]);return e},logout(){this.$store,this.$router,this.$store.commit("setAuthenticated",!1),this.$router.push({path:"adminlogin"}).catch(console.error)},configTimeSlot(e){console.log("time pressed"),this.closeAddWindow(),this.curTimePressed=e,this.showConfigWindow=!0},closeConfigWindow(){console.log("close configure window"),this.showConfigWindow=!1},addTimeSlot(){console.log("add time slot"),this.closeConfigWindow(),this.showAddWindow=!0},closeAddWindow(){console.log("close add window"),this.showAddWindow=!1},authenticate(){const{commit:e}=this.$store,{push:t}=this.$router;fetch("/api/booking",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username})}).then(o=>o.json()).then(({authenticated:o})=>{e("setAuthenticated",o),t(o===!0?"/timeslots":"/booking")}).catch(console.error)}}},tt={class:"row"},st=s("div",{class:"col"},null,-1),ot={class:"col list-group"},nt={for:"timetable",class:"form-label h4"},it=["onClick"],at=s("div",{class:"row"},null,-1),rt=s("div",{class:"col"},null,-1),lt={class:"row"},dt=s("div",{class:"col"},null,-1),ct=s("div",{class:"col"},null,-1);function mt(e,t,o,d,a,n){const i=g("Configure"),c=g("Add");return r(),l("div",tt,[st,s("div",ot,[s("label",nt,"Welcome "+u(e.assistant)+"!",1),(r(!0),l(_,null,v(n.assistantTimeSlots(),p=>(r(),l("button",{key:p.time,type:"button",class:"list-group-item list-group-item-action my-2 py-2",onClick:ht=>n.configTimeSlot(p.time)},u(p.time),9,it))),128)),s("button",{type:"button",class:"btn btn-dark mt-4 float-end",onClick:t[0]||(t[0]=p=>n.addTimeSlot())}," Add Time Slot "),s("button",{type:"button",class:"btn btn-dark mt-4 float-end",onClick:t[1]||(t[1]=p=>n.logout())}," Logout "),at]),rt,s("div",lt,[dt,e.showConfigWindow?(r(),b(i,{key:0,time:e.curTimePressed,onClose:t[2]||(t[2]=()=>n.closeConfigWindow())},null,8,["time"])):w("",!0),e.showAddWindow?(r(),b(c,{key:1,onClose:t[3]||(t[3]=()=>n.closeAddWindow())})):w("",!0)]),ct])}var ut=m(et,[["render",mt]]);const pt=[{path:"/",redirect:"/rooms"},{path:"/rooms",component:te},{path:"/rooms/:name",component:de},{path:"/booking",component:We},{path:"/adminlogin",component:Be},{path:"/admin:name",component:ut},{path:"/confirm",component:T}],W=V({history:U("/"),routes:pt});W.beforeEach((e,t,o)=>{y.state.authenticated||e.path==="/booking"||e.path==="/adminlogin"||e.path==="/confirm"?e.path==="/admin"?o("/admin"+y.state.adminUser):o():e.path==="/admin"?o("/adminlogin"):(console.info("Unauthenticated user. Redirecting to booking page."),o("/booking"))});P(K).use(y).use(W).mount("#app");
