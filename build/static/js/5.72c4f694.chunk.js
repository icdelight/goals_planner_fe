(this["webpackJsonpacorn-react"]=this["webpackJsonpacorn-react"]||[]).push([[5],{674:function(e,t,s){"use strict";var a=s(0),r=s(31),n=s(97),o=s(84),c=s(8),i={config:{attributes:!0,childList:!1,subtree:!1}},l=function(){var e=Object(r.b)(),t=Object(a.useCallback)((function(t){Array.isArray(t)&&t.map((function(t){"attributes"===t.type&&"style"===t.attributeName&&e(Object(o.h)(t.target.style.paddingRight.indexOf("px")>-1?parseInt(t.target.style.paddingRight.replace("px",""),10):""))}))}),[e]);return function(e,t){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i,r=Object(a.useState)(null),n=Object(c.a)(r,2),o=n[0],l=n[1];Object(a.useEffect)((function(){var e=new MutationObserver(t);l(e)}),[t,s,l]),Object(a.useEffect)((function(){if(o){var t=s.config;return o.observe(e,t),function(){o&&o.disconnect()}}}),[o,e,s])}(document.body,t),!0};t.a=function(){var e=Object(r.c)((function(e){return e.settings})),t=e.color,s=e.layout,o=e.radius,c=e.navColor,i=Object(r.b)(),d=Object(r.c)((function(e){return e.menu})),u=d.attrMenuAnimate,b=d.attrMobile,m=d.placementStatus,p=m.placementHtmlData,j=m.dimensionHtmlData,h=d.behaviourStatus.behaviourHtmlData;l();var f=document.documentElement;return Object(a.useEffect)((function(){return setTimeout((function(){i(Object(n.b)()),f.setAttribute("data-show","true")}),30),f.setAttribute("data-color",t),f.setAttribute("data-layout",s),f.setAttribute("data-radius",o),f.setAttribute("data-navcolor",c),f.setAttribute("data-placement",p),f.setAttribute("data-dimension",j),f.setAttribute("data-behaviour",h),function(){f.removeAttribute("data-color"),f.removeAttribute("data-layout"),f.removeAttribute("data-radius"),f.removeAttribute("data-navcolor"),f.removeAttribute("data-show"),f.removeAttribute("data-placement"),f.removeAttribute("data-behaviour"),f.removeAttribute("data-dimension")}}),[]),Object(a.useEffect)((function(){f.setAttribute("data-placement",p),f.setAttribute("data-dimension",j),f.setAttribute("data-behaviour",h),f.setAttribute("data-navcolor",c),f.setAttribute("data-radius",o),f.setAttribute("data-color",t),f.setAttribute("data-layout",s)}),[f,p,j,h,c,o,t,s]),Object(a.useEffect)((function(){u?f.setAttribute("data-menu-animate",u):f.removeAttribute("data-menu-animate")}),[f,u]),Object(a.useEffect)((function(){b?f.setAttribute("data-mobile",b):f.removeAttribute("data-mobile")}),[f,b]),!0}},675:function(e,t,s){"use strict";var a=s(0),r=s(674),n=s(1);t.a=function(e){var t=e.left,s=e.right;return Object(r.a)(),Object(a.useEffect)((function(){document.body.classList.add("h-100");var e=document.getElementById("root");return e&&e.classList.add("h-100"),function(){document.body.classList.remove("h-100"),e&&e.classList.remove("h-100")}}),[]),Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("div",{className:"fixed-background"}),Object(n.jsx)("div",{className:"container-fluid p-0 h-100 position-relative",children:Object(n.jsxs)("div",{className:"row g-0 h-100",children:[Object(n.jsx)("div",{className:"offset-0 col-12 d-none d-lg-flex offset-md-1 col-lg h-lg-100",children:t}),Object(n.jsx)("div",{className:"col-12 col-lg-auto h-100 pb-4 px-4 pt-0 p-lg-0",children:s})]})})]})}},676:function(e,t,s){"use strict";s.d(t,"a",(function(){return d})),s.d(t,"b",(function(){return u}));var a=s(18),r=s(29),n=s(36),o=s.n(n),c=s(307),i=s(5),l={responseCode:999,responseDesc:"",responseData:null},d=function(){var e=Object(r.a)(Object(a.a)().mark((function e(t,s,r){var n;return Object(a.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.post("".concat(i.i,"auth/signin"),{user:t,pass:s}).then((function(e){if(e)if(e.data)if(e.data.userData)if(e.data.userData.id&&e.data.userData.fullname&&e.data.userData.role&&e.data.userData.name&&e.data.tokens.access_token){var t={id:e.data.userData.id,name:e.data.userData.fullname,thumb:"/img/profile/profile-12.gif",role:e.data.userData.role,email:e.data.userData.name,token:e.data.tokens.access_token,id_area:e.data.userData.id_area,id_sub_area:e.data.userData.id_sub_area,desc_area:e.data.userData.desc_area,desc_sub_area:e.data.userData.desc_sub_area};r(Object(c.b)(t)),l={responseCode:e.data.statusCode,responseDesc:e.data.message,responseData:t}}else l={responseCode:999,responseDesc:"Invalid response. 1",responseData:null};else l={responseCode:999,responseDesc:"Invalid response. 2",responseData:null};else l={responseCode:999,responseDesc:"Invalid response. 3",responseData:null};else l={responseCode:999,responseDesc:"Failled to parse response.",responseData:null};return l})).catch((function(e){return l=e.response?{responseCode:e.response.status,responseDesc:e.response.data.message,responseData:null}:e.request?{responseCode:999,responseDesc:e.request,responseData:null}:{responseCode:999,responseDesc:"Something went wrong, ".concat(e.message),responseData:null}}));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t,s,a){return e.apply(this,arguments)}}(),u=function(){var e=Object(r.a)(Object(a.a)().mark((function e(t,s,r,n){var c;return Object(a.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.post("".concat(i.i,"auth/signup"),{user:s,pass:r,firstname:t,role:"2"}).then((function(e){return l=e?e.data?e.data.statusCode?{responseCode:e.data.statusCode,responseDesc:e.data.message,responseData:null}:{responseCode:999,responseDesc:"Invalid response. 2",responseData:null}:{responseCode:999,responseDesc:"Invalid response. 3",responseData:null}:{responseCode:999,responseDesc:"Failled to parse response.",responseData:null}})).catch((function(e){return l=e.response?{responseCode:e.response.status,responseDesc:e.response.data.message,responseData:null}:e.request?{responseCode:999,responseDesc:e.request,responseData:null}:{responseCode:999,responseDesc:"Something went wrong, ".concat(e.message),responseData:null}}));case 2:return c=e.sent,e.abrupt("return",c);case 4:case"end":return e.stop()}}),e)})));return function(t,s,a,r){return e.apply(this,arguments)}}()},686:function(e,t,s){"use strict";s.r(t);s(0);var a=s(55),r=s(62),n=s(659),o=s(671),c=s(32),i=s(49),l=s(675),d=s(42),u=s(45),b=s(31),m=s(20),p=s(676),j=s(1);t.default=function(){var e=Object(a.g)(),t=Object(b.b)(),s=c.b().shape({name:c.d().required("Name is required"),email:c.d().required("Email is required"),password:c.d().min(3,"Must be at least 3 chars!").required("Password is required"),terms:c.a().required().oneOf([!0],"Terms must be accepted")}),h=Object(i.a)({initialValues:{name:"",email:"",password:"",terms:!1},validationSchema:s,onSubmit:function(s){Object(p.b)(s.name,s.email,s.password,t).then((function(t){if(t)if(200===t.responseCode){m.c.success(t.responseDesc,{position:"top-right",autoClose:1e3});e.push("login")}else m.c.error(t.responseDesc,{position:"top-right",autoClose:5e3})}))}}),f=h.handleSubmit,v=h.handleChange,O=h.values,g=h.touched,x=h.errors,D=Object(j.jsx)("div",{className:"min-h-100 d-flex align-items-center",children:Object(j.jsx)("div",{className:"w-100 w-lg-75 w-xxl-50",children:Object(j.jsxs)("div",{children:[Object(j.jsxs)("div",{className:"mb-5",children:[Object(j.jsx)("h1",{className:"display-3 text-white",children:"Multiple Niches"}),Object(j.jsx)("h1",{className:"display-3 text-white",children:"Ready for Your Project"})]}),Object(j.jsx)("p",{className:"h6 text-white lh-1-5 mb-5",children:"Dynamically target high-payoff intellectual capital for customized technologies. Objectively integrate emerging core competencies before process-centric communities..."}),Object(j.jsx)("div",{className:"mb-5",children:Object(j.jsx)(n.a,{size:"lg",variant:"outline-white",href:"/",children:"Learn More"})})]})})}),N=Object(j.jsx)("div",{className:"sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border",children:Object(j.jsxs)("div",{className:"sw-lg-50 px-5",children:[Object(j.jsx)("div",{className:"sh-11",children:Object(j.jsx)(r.c,{to:"/",children:Object(j.jsx)("div",{className:"logo-default"})})}),Object(j.jsxs)("div",{className:"mb-5",children:[Object(j.jsx)("h2",{className:"cta-1 mb-0 text-primary",children:"Welcome,"}),Object(j.jsx)("h2",{className:"cta-1 text-primary",children:"let's get the ball rolling!"})]}),Object(j.jsxs)("div",{className:"mb-5",children:[Object(j.jsx)("p",{className:"h6",children:"Please use the form to register."}),Object(j.jsxs)("p",{className:"h6",children:["If you are a member, please ",Object(j.jsx)(r.c,{to:"/login",children:"login"}),"."]})]}),Object(j.jsx)("div",{children:Object(j.jsxs)("form",{id:"registerForm",className:"tooltip-end-bottom",onSubmit:f,children:[Object(j.jsxs)("div",{className:"mb-3 filled form-group tooltip-end-top",children:[Object(j.jsx)(d.a,{icon:"input"}),Object(j.jsx)(o.a.Control,{type:"text",name:"name",placeholder:"Name",value:O.name,onChange:v}),x.name&&g.name&&Object(j.jsx)("div",{className:"d-block invalid-tooltip",children:x.name})]}),Object(j.jsxs)("div",{className:"mb-3 filled form-group tooltip-end-top",children:[Object(j.jsx)(d.a,{icon:"user"}),Object(j.jsx)(o.a.Control,{type:"text",name:"email",placeholder:"User",value:O.email,onChange:v}),x.email&&g.email&&Object(j.jsx)("div",{className:"d-block invalid-tooltip",children:x.email})]}),Object(j.jsxs)("div",{className:"mb-3 filled form-group tooltip-end-top",children:[Object(j.jsx)(d.a,{icon:"lock-off"}),Object(j.jsx)(o.a.Control,{type:"password",name:"password",onChange:v,value:O.password,placeholder:"Password"}),x.password&&g.password&&Object(j.jsx)("div",{className:"d-block invalid-tooltip",children:x.password})]}),Object(j.jsx)("div",{className:"mb-3 position-relative form-group",children:Object(j.jsxs)("div",{className:"form-check",children:[Object(j.jsx)("input",{type:"checkbox",className:"form-check-input",name:"terms",onChange:v,value:O.terms}),Object(j.jsxs)("label",{className:"form-check-label",children:["I have read and accept the"," ",Object(j.jsx)(r.c,{to:"/",target:"_blank",children:"terms and conditions."})]}),x.terms&&g.terms&&Object(j.jsx)("div",{className:"d-block invalid-tooltip",children:x.terms})]})}),Object(j.jsx)(n.a,{size:"lg",type:"submit",children:"Signup"})]})})]})});return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(u.a,{title:"Register",description:"Register Page"}),Object(j.jsx)(l.a,{left:D,right:N})]})}}}]);
//# sourceMappingURL=5.72c4f694.chunk.js.map