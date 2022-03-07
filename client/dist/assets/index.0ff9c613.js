import{l as k,r as $,o as a,c,a as o,b as w,F as u,d as C,e as _,t as h,w as g,f as p,v as f,g as T,h as A,i as S,j,k as N}from"./vendor.75495810.js";const O=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function s(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(r){if(r.ep)return;r.ep=!0;const i=s(r);fetch(r.href,i)}};O();var d=(e,t)=>{const s=e.__vccOpts||e;for(const[l,r]of t)s[l]=r;return s};const V={name:"App",components:{},data:()=>({socket:k().connect()}),created(){const{commit:e}=this.$store,{push:t}=this.$router;fetch("/api/users/me").then(s=>s.json()).then(({authenticated:s})=>{e("setAuthenticated",s),t(s===!0?"/timeslots":"/booking")}).catch(console.error)},methods:{redirect(e){this.$router.push(e)}}},L={class:"navbar navbar-expand-md navbar-dark bg-dark"},P=o("button",{class:"navbar-toggler mx-2 mb-2",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNav"},[o("span",{class:"navbar-toggler-icon"})],-1),B={id:"navbarNav",class:"collapse navbar-collapse mx-2"},W={class:"navbar-nav"},R={class:"nav-item"},U={class:"nav-item"},q={class:"container-fluid py-4"};function D(e,t,s,l,r,i){const n=$("router-view");return a(),c(u,null,[o("nav",L,[P,o("div",B,[o("ul",W,[o("li",R,[o("a",{class:"nav-link",href:"#",onClick:t[0]||(t[0]=m=>i.redirect("/booking"))},"Booking")]),o("li",U,[o("a",{class:"nav-link",href:"#",onClick:t[1]||(t[1]=m=>i.redirect("/admin"))},"Admin")])])])]),o("section",q,[w(n)])],64)}var J=d(V,[["render",D]]),b=C({state:{authenticated:!1},getters:{isAuthenticated(e){return e.authenticated}},mutations:{setAuthenticated(e,t){e.authenticated=t}},actions:{},modules:{}});const E={name:"RoomsView",components:{},data:()=>({rooms:[]}),created(){fetch("/api/rooms").then(e=>e.json()).then(({rooms:e})=>{this.rooms=e}).catch(console.error)},methods:{redirect(e){this.$router.push(`/rooms/${e}`)}}},F={class:"row"},x=o("div",{class:"col"},null,-1),M={class:"col list-group"},I=["onClick"],H=o("div",{class:"col"},null,-1);function K(e,t,s,l,r,i){return a(),c("div",F,[x,o("div",M,[(a(!0),c(u,null,_(e.rooms,n=>(a(),c("button",{key:n.name,type:"button",class:"list-group-item list-group-item-action my-2 py-2",onClick:m=>i.redirect(n.name)},h(n.name),9,I))),128))]),H])}var z=d(E,[["render",K]]);const G={name:"RoomView",components:{},data(){return{name:this.$route.params.name,messages:[],message:""}},async created(){const e=await fetch(`/api/rooms/${this.name}/messages`),{messages:t}=await e.json();this.messages=t;const{socket:s}=this.$root;s.on("msg",l=>{this.messages=[...this.messages,l]})},methods:{send(){fetch(`/api/rooms/${this.name}/messages`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:this.message})}).catch(console.error),this.message=""}}},Q={class:"row"},X=o("div",{class:"col-3"},null,-1),Y={class:"col-6 list-group"},Z=o("button",{type:"submit",class:"btn btn-dark mt-4 float-end"},"SEND",-1),ee=o("div",{class:"col-3"},null,-1);function te(e,t,s,l,r,i){return a(),c("div",Q,[X,o("ul",Y,[(a(!0),c(u,null,_(r.messages,(n,m)=>(a(),c("li",{key:m,type:"button",class:"list-group-item py-1"},h(n),1))),128)),o("form",{onSubmit:t[1]||(t[1]=g(n=>i.send(),["prevent"]))},[p(o("input",{id:"message","onUpdate:modelValue":t[0]||(t[0]=n=>r.message=n),type:"text",class:"form-control form-control-sm",placeholder:"message...",required:"",autofocus:""},null,512),[[f,r.message]]),Z],32)]),ee])}var oe=d(G,[["render",te]]);const se={name:"confirmBookingView",components:{},props:{time:String},data:()=>({username:"",open:!1}),methods:{book(){this.$emit("close")},authenticate(){const{commit:e}=this.$store,{push:t}=this.$router;fetch("/api/booking",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username})}).then(s=>s.json()).then(({authenticated:s})=>{e("setAuthenticated",s),t(s===!0?"/admin":"/booking")}).catch(console.error)}}},ne={class:"row"},ie=o("div",{class:"col"},null,-1),re=o("label",{for:"username",class:"form-label h4"},"Fill in name and confirm:",-1),ae=o("button",{type:"submit",class:"btn btn-dark mt-4 float-end"},"Confirm",-1),ce=o("div",{class:"col"},null,-1);function le(e,t,s,l,r,i){return a(),c("div",ne,[ie,o("form",{class:"col",onSubmit:t[2]||(t[2]=g(n=>i.book(),["prevent"]))},[re,o("p",null,"Time: "+h(s.time),1),p(o("input",{id:"username","onUpdate:modelValue":t[0]||(t[0]=n=>e.username=n),type:"text",class:"form-control",placeholder:"Name",required:"",autofocus:""},null,512),[[f,e.username]]),ae,o("button",{class:"btn btn-dark mt-4 float-center",onClick:t[1]||(t[1]=n=>e.$emit("close"))},"Cancel ")],32),ce])}var v=d(se,[["render",le]]);const me={name:"BookingView",components:{Confirm:v},data:()=>({username:"",timeslots:[],showConfirmWindow:!1,curTimePressed:""}),created(){fetch("/api/timeslots").then(e=>e.json()).then(({timeslots:e})=>{this.timeslots=e}).catch(console.error)},methods:{bookTime(e){console.log("time pressed"),this.curTimePressed=e,this.showConfirmWindow=!0},closeConfirmWindow(){this.showConfirmWindow=!1},authenticate(){const{commit:e}=this.$store,{push:t}=this.$router;fetch("/api/booking",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username})}).then(s=>s.json()).then(({authenticated:s})=>{e("setAuthenticated",s),t(s===!0?"/timeslots":"/booking")}).catch(console.error)}}},de={class:"row"},ue=o("div",{class:"col"},null,-1),he={class:"col list-group"},pe=o("label",{for:"timetable",class:"form-label h4"},"Available times:",-1),fe=["onClick"],_e=o("div",{class:"col"},null,-1),ge={class:"row"},$e=o("div",{class:"col"},null,-1),be=o("div",{class:"col"},null,-1);function ve(e,t,s,l,r,i){const n=$("Confirm");return a(),c("div",de,[ue,o("div",he,[pe,(a(!0),c(u,null,_(e.timeslots,m=>(a(),c("button",{key:m.time,type:"button",class:"list-group-item list-group-item-action my-2 py-2",onClick:Je=>i.bookTime(m.time)},h(m.time),9,fe))),128))]),_e,o("div",ge,[$e,e.showConfirmWindow?(a(),T(n,{key:0,time:e.curTimePressed,onClose:t[0]||(t[0]=()=>i.closeConfirmWindow())},null,8,["time"])):A("",!0)]),be])}var ye=d(me,[["render",ve]]);const ke={name:"adminLoginView",components:{},data:()=>({username:""}),methods:{authenticate(){const{commit:e}=this.$store,{push:t}=this.$router;fetch("/api/booking",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username})}).then(s=>s.json()).then(({authenticated:s})=>{e("setAuthenticated",s),t(s===!0?"/admin":"/booking")}).catch(console.error)}}},we={class:"row"},Ce=o("div",{class:"col"},null,-1),Te=o("label",{for:"admin",class:"form-label h4"},"Admin login:",-1),Ae=o("button",{type:"submit",class:"btn btn-dark mt-4 float-end"},"Login",-1),Se=o("div",{class:"col"},null,-1);function je(e,t,s,l,r,i){return a(),c("div",we,[Ce,o("form",{class:"col",onSubmit:t[2]||(t[2]=g(n=>i.authenticate(),["prevent"]))},[Te,p(o("input",{id:"username","onUpdate:modelValue":t[0]||(t[0]=n=>e.username=n),type:"text",class:"form-control",placeholder:"Username",required:"",autofocus:""},null,512),[[f,e.username]]),p(o("input",{id:"password","onUpdate:modelValue":t[1]||(t[1]=n=>e.password=n),type:"text",class:"form-control",placeholder:"Password",required:"",autofocus:""},null,512),[[f,e.password]]),Ae],32),Se])}var Ne=d(ke,[["render",je]]);const Oe={name:"AdminView",components:{},data:()=>({username:"",timeslots:[]}),created(){fetch("/api/timeslots").then(e=>e.json()).then(({timeslots:e})=>{this.timeslots=e}).catch(console.error)},methods:{bookTime(e){alert("TID VALD: "+e)},logout(){alert("Tried to logout!")},authenticate(){const{commit:e}=this.$store,{push:t}=this.$router;fetch("/api/booking",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username})}).then(s=>s.json()).then(({authenticated:s})=>{e("setAuthenticated",s),t(s===!0?"/timeslots":"/booking")}).catch(console.error)}}},Ve={class:"row"},Le=o("div",{class:"col"},null,-1),Pe={class:"col list-group"},Be=o("label",{for:"timetable",class:"form-label h4"},"This is the admin page!",-1),We=["onClick"],Re=o("div",{class:"col"},null,-1);function Ue(e,t,s,l,r,i){return a(),c("div",Ve,[Le,o("div",Pe,[Be,(a(!0),c(u,null,_(e.timeslots,n=>(a(),c("button",{key:n.time,type:"button",class:"list-group-item list-group-item-action my-2 py-2",onClick:m=>i.bookTime(n.time)},h(n.time),9,We))),128)),o("button",{type:"button",class:"btn btn-dark mt-4 float-end",onClick:t[0]||(t[0]=n=>i.logout())}," Logout ")]),Re])}var qe=d(Oe,[["render",Ue]]);const De=[{path:"/",redirect:"/rooms"},{path:"/rooms",component:z},{path:"/rooms/:name",component:oe},{path:"/booking",component:ye},{path:"/adminlogin",component:Ne},{path:"/admin",component:qe},{path:"/confirm",component:v}],y=S({history:j("/"),routes:De});y.beforeEach((e,t,s)=>{b.state.authenticated||e.path==="/booking"||e.path==="/adminlogin"||e.path==="/confirm"?s():e.path==="/admin"?s("/adminlogin"):(console.info("Unauthenticated user. Redirecting to booking page."),s("/booking"))});N(J).use(b).use(y).mount("#app");
