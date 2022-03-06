import{l as b,r as y,o as i,c,a as s,b as k,F as u,d as w,e as p,t as h,w as g,f as _,v as f,g as A,h as T,i as C}from"./vendor.d89baaf0.js";const S=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function o(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerpolicy&&(a.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?a.credentials="include":r.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(r){if(r.ep)return;r.ep=!0;const a=o(r);fetch(r.href,a)}};S();var m=(e,t)=>{const o=e.__vccOpts||e;for(const[l,r]of t)o[l]=r;return o};const O={name:"App",components:{},data:()=>({socket:b().connect()}),created(){const{commit:e}=this.$store,{push:t}=this.$router;fetch("/api/users/me").then(o=>o.json()).then(({authenticated:o})=>{e("setAuthenticated",o),t(o===!0?"/rooms":"/login")}).catch(console.error)},methods:{redirect(e){this.$router.push(e)}}},j={class:"navbar navbar-expand-md navbar-dark bg-dark"},L=s("button",{class:"navbar-toggler mx-2 mb-2",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNav"},[s("span",{class:"navbar-toggler-icon"})],-1),N={id:"navbarNav",class:"collapse navbar-collapse mx-2"},V={class:"navbar-nav"},D={class:"nav-item"},P={class:"nav-item"},x={class:"container-fluid py-4"};function B(e,t,o,l,r,a){const n=y("router-view");return i(),c(u,null,[s("nav",j,[L,s("div",N,[s("ul",V,[s("li",D,[s("a",{class:"nav-link",href:"#",onClick:t[0]||(t[0]=d=>a.redirect("/login"))},"Booking")]),s("li",P,[s("a",{class:"nav-link",href:"#",onClick:t[1]||(t[1]=d=>a.redirect("/admin"))},"Admin")])])])]),s("section",x,[k(n)])],64)}var R=m(O,[["render",B]]),$=w({state:{authenticated:!1},getters:{isAuthenticated(e){return e.authenticated}},mutations:{setAuthenticated(e,t){e.authenticated=t}},actions:{},modules:{}});const U={name:"RoomsView",components:{},data:()=>({rooms:[]}),created(){fetch("/api/rooms").then(e=>e.json()).then(({rooms:e})=>{this.rooms=e}).catch(console.error)},methods:{redirect(e){this.$router.push(`/rooms/${e}`)}}},q={class:"row"},E=s("div",{class:"col"},null,-1),J={class:"col list-group"},F=["onClick"],I=s("div",{class:"col"},null,-1);function M(e,t,o,l,r,a){return i(),c("div",q,[E,s("div",J,[(i(!0),c(u,null,p(e.rooms,n=>(i(),c("button",{key:n.name,type:"button",class:"list-group-item list-group-item-action my-2 py-2",onClick:d=>a.redirect(n.name)},h(n.name),9,F))),128))]),I])}var H=m(U,[["render",M]]);const K={name:"RoomView",components:{},data(){return{name:this.$route.params.name,messages:[],message:""}},async created(){const e=await fetch(`/api/rooms/${this.name}/messages`),{messages:t}=await e.json();this.messages=t;const{socket:o}=this.$root;o.on("msg",l=>{this.messages=[...this.messages,l]})},methods:{send(){fetch(`/api/rooms/${this.name}/messages`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:this.message})}).catch(console.error),this.message=""}}},W={class:"row"},z=s("div",{class:"col-3"},null,-1),G={class:"col-6 list-group"},Q=s("button",{type:"submit",class:"btn btn-dark mt-4 float-end"},"SEND",-1),X=s("div",{class:"col-3"},null,-1);function Y(e,t,o,l,r,a){return i(),c("div",W,[z,s("ul",G,[(i(!0),c(u,null,p(r.messages,(n,d)=>(i(),c("li",{key:d,type:"button",class:"list-group-item py-1"},h(n),1))),128)),s("form",{onSubmit:t[1]||(t[1]=g(n=>a.send(),["prevent"]))},[_(s("input",{id:"message","onUpdate:modelValue":t[0]||(t[0]=n=>r.message=n),type:"text",class:"form-control form-control-sm",placeholder:"message...",required:"",autofocus:""},null,512),[[f,r.message]]),Q],32)]),X])}var Z=m(K,[["render",Y]]);const ee={name:"BookingView",components:{},data:()=>({username:"",rooms:[]}),created(){fetch("/api/rooms").then(e=>e.json()).then(({rooms:e})=>{this.rooms=e}).catch(console.error)},methods:{bookTime(e){alert("TID VALD: "+e)},authenticate(){const{commit:e}=this.$store,{push:t}=this.$router;fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username})}).then(o=>o.json()).then(({authenticated:o})=>{e("setAuthenticated",o),t(o===!0?"/rooms":"/login")}).catch(console.error)}}},te={class:"row"},oe=s("div",{class:"col"},null,-1),se={class:"col list-group"},ne=s("label",{for:"timetable",class:"form-label h4"},"Available times:",-1),re=["onClick"],ae=s("div",{class:"col"},null,-1);function ie(e,t,o,l,r,a){return i(),c("div",te,[oe,s("div",se,[ne,(i(!0),c(u,null,p(e.rooms,n=>(i(),c("button",{key:n.time,type:"button",class:"list-group-item list-group-item-action my-2 py-2",onClick:d=>a.bookTime(n.time)},h(n.time),9,re))),128))]),ae])}var ce=m(ee,[["render",ie]]);const le={name:"adminLoginView",components:{},data:()=>({username:""}),methods:{authenticate(){const{commit:e}=this.$store,{push:t}=this.$router;fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username})}).then(o=>o.json()).then(({authenticated:o})=>{e("setAuthenticated",o),t(o===!0?"/admin":"/login")}).catch(console.error)}}},de={class:"row"},me=s("div",{class:"col"},null,-1),ue=s("label",{for:"admin",class:"form-label h4"},"Admin login:",-1),pe=s("button",{type:"submit",class:"btn btn-dark mt-4 float-end"},"Login",-1),he=s("div",{class:"col"},null,-1);function _e(e,t,o,l,r,a){return i(),c("div",de,[me,s("form",{class:"col",onSubmit:t[2]||(t[2]=g(n=>a.authenticate(),["prevent"]))},[ue,_(s("input",{id:"username","onUpdate:modelValue":t[0]||(t[0]=n=>e.username=n),type:"text",class:"form-control",placeholder:"Username",required:"",autofocus:""},null,512),[[f,e.username]]),_(s("input",{id:"password","onUpdate:modelValue":t[1]||(t[1]=n=>e.password=n),type:"text",class:"form-control",placeholder:"Password",required:"",autofocus:""},null,512),[[f,e.password]]),pe],32),he])}var fe=m(le,[["render",_e]]);const ge={name:"AdminView",components:{},data:()=>({username:"",rooms:[]}),created(){fetch("/api/rooms").then(e=>e.json()).then(({rooms:e})=>{this.rooms=e}).catch(console.error)},methods:{bookTime(e){alert("TID VALD: "+e)},logout(){alert("Tried to logout!")},authenticate(){const{commit:e}=this.$store,{push:t}=this.$router;fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username})}).then(o=>o.json()).then(({authenticated:o})=>{e("setAuthenticated",o),t(o===!0?"/rooms":"/login")}).catch(console.error)}}},$e={class:"row"},ve=s("div",{class:"col"},null,-1),be={class:"col list-group"},ye=s("label",{for:"timetable",class:"form-label h4"},"This is the admin page!",-1),ke=["onClick"],we=s("div",{class:"col"},null,-1);function Ae(e,t,o,l,r,a){return i(),c("div",$e,[ve,s("div",be,[ye,(i(!0),c(u,null,p(e.rooms,n=>(i(),c("button",{key:n.time,type:"button",class:"list-group-item list-group-item-action my-2 py-2",onClick:d=>a.bookTime(n.time)},h(n.time),9,ke))),128)),s("button",{type:"button",class:"btn btn-dark mt-4 float-end",onClick:t[0]||(t[0]=n=>a.logout())}," Logout ")]),we])}var Te=m(ge,[["render",Ae]]);const Ce=[{path:"/",redirect:"/rooms"},{path:"/rooms",component:H},{path:"/rooms/:name",component:Z},{path:"/login",component:ce},{path:"/adminlogin",component:fe},{path:"/admin",component:Te}],v=A({history:T("/"),routes:Ce});v.beforeEach((e,t,o)=>{$.state.authenticated||e.path==="/login"||e.path==="/adminlogin"?o():e.path==="/admin"?o("/adminlogin"):(console.info("Unauthenticated user. Redirecting to login page."),o("/login"))});C(R).use($).use(v).mount("#app");
