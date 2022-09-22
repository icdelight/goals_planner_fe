(this["webpackJsonpacorn-react"]=this["webpackJsonpacorn-react"]||[]).push([[9],{674:function(e,t,a){"use strict";var s=a(0),r=a(33),i=a(100),c=a(87),o=a(8),n={config:{attributes:!0,childList:!1,subtree:!1}},l=function(){var e=Object(r.b)(),t=Object(s.useCallback)((function(t){Array.isArray(t)&&t.map((function(t){"attributes"===t.type&&"style"===t.attributeName&&e(Object(c.h)(t.target.style.paddingRight.indexOf("px")>-1?parseInt(t.target.style.paddingRight.replace("px",""),10):""))}))}),[e]);return function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:n,r=Object(s.useState)(null),i=Object(o.a)(r,2),c=i[0],l=i[1];Object(s.useEffect)((function(){var e=new MutationObserver(t);l(e)}),[t,a,l]),Object(s.useEffect)((function(){if(c){var t=a.config;return c.observe(e,t),function(){c&&c.disconnect()}}}),[c,e,a])}(document.body,t),!0};t.a=function(){var e=Object(r.c)((function(e){return e.settings})),t=e.color,a=e.layout,c=e.radius,o=e.navColor,n=Object(r.b)(),d=Object(r.c)((function(e){return e.menu})),u=d.attrMenuAnimate,b=d.attrMobile,m=d.placementStatus,j=m.placementHtmlData,h=m.dimensionHtmlData,f=d.behaviourStatus.behaviourHtmlData;l();var p=document.documentElement;return Object(s.useEffect)((function(){return setTimeout((function(){n(Object(i.b)()),p.setAttribute("data-show","true")}),30),p.setAttribute("data-color",t),p.setAttribute("data-layout",a),p.setAttribute("data-radius",c),p.setAttribute("data-navcolor",o),p.setAttribute("data-placement",j),p.setAttribute("data-dimension",h),p.setAttribute("data-behaviour",f),function(){p.removeAttribute("data-color"),p.removeAttribute("data-layout"),p.removeAttribute("data-radius"),p.removeAttribute("data-navcolor"),p.removeAttribute("data-show"),p.removeAttribute("data-placement"),p.removeAttribute("data-behaviour"),p.removeAttribute("data-dimension")}}),[]),Object(s.useEffect)((function(){p.setAttribute("data-placement",j),p.setAttribute("data-dimension",h),p.setAttribute("data-behaviour",f),p.setAttribute("data-navcolor",o),p.setAttribute("data-radius",c),p.setAttribute("data-color",t),p.setAttribute("data-layout",a)}),[p,j,h,f,o,c,t,a]),Object(s.useEffect)((function(){u?p.setAttribute("data-menu-animate",u):p.removeAttribute("data-menu-animate")}),[p,u]),Object(s.useEffect)((function(){b?p.setAttribute("data-mobile",b):p.removeAttribute("data-mobile")}),[p,b]),!0}},675:function(e,t,a){"use strict";var s=a(0),r=a(674),i=a(1);t.a=function(e){var t=e.left,a=e.right;return Object(r.a)(),Object(s.useEffect)((function(){document.body.classList.add("h-100");var e=document.getElementById("root");return e&&e.classList.add("h-100"),function(){document.body.classList.remove("h-100"),e&&e.classList.remove("h-100")}}),[]),Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("div",{className:"fixed-background"}),Object(i.jsx)("div",{className:"container-fluid p-0 h-100 position-relative",children:Object(i.jsxs)("div",{className:"row g-0 h-100",children:[Object(i.jsx)("div",{className:"offset-0 col-12 d-none d-lg-flex offset-md-1 col-lg h-lg-100",children:t}),Object(i.jsx)("div",{className:"col-12 col-lg-auto h-100 pb-4 px-4 pt-0 p-lg-0",children:a})]})})]})}},687:function(e,t,a){"use strict";a.r(t);a(0);var s=a(64),r=a(659),i=a(671),c=a(34),o=a(51),n=a(675),l=a(42),d=a(47),u=a(1);t.default=function(){var e=c.b().shape({password:c.d().min(6,"Must be at least 6 chars!").required("Password is required"),passwordConfirm:c.d().required("Password Confirm is required").oneOf([c.c("password"),null],"Must be same with password!")}),t=Object(o.a)({initialValues:{password:"",passwordConfirm:""},validationSchema:e,onSubmit:function(e){return console.log("submit form",e)}}),a=t.handleSubmit,b=t.handleChange,m=t.values,j=t.touched,h=t.errors,f=Object(u.jsx)("div",{className:"min-h-100 d-flex align-items-center",children:Object(u.jsx)("div",{className:"w-100 w-lg-75 w-xxl-50",children:Object(u.jsxs)("div",{children:[Object(u.jsxs)("div",{className:"mb-5",children:[Object(u.jsx)("h1",{className:"display-3 text-white",children:"Multiple Niches"}),Object(u.jsx)("h1",{className:"display-3 text-white",children:"Ready for Your Project"})]}),Object(u.jsx)("p",{className:"h6 text-white lh-1-5 mb-5",children:"Dynamically target high-payoff intellectual capital for customized technologies. Objectively integrate emerging core competencies before process-centric communities..."}),Object(u.jsx)("div",{className:"mb-5",children:Object(u.jsx)(r.a,{size:"lg",variant:"outline-white",href:"/",children:"Learn More"})})]})})}),p=Object(u.jsx)("div",{className:"sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border",children:Object(u.jsxs)("div",{className:"sw-lg-50 px-5",children:[Object(u.jsx)("div",{className:"sh-11",children:Object(u.jsx)(s.c,{to:"/",children:Object(u.jsx)("div",{className:"logo-default"})})}),Object(u.jsxs)("div",{className:"mb-5",children:[Object(u.jsx)("h2",{className:"cta-1 mb-0 text-primary",children:"Password trouble?"}),Object(u.jsx)("h2",{className:"cta-1 text-primary",children:"Renew it here!"})]}),Object(u.jsxs)("div",{className:"mb-5",children:[Object(u.jsx)("p",{className:"h6",children:"Please use below form to reset your password."}),Object(u.jsxs)("p",{className:"h6",children:["If you are a member, please ",Object(u.jsx)(s.c,{to:"/login",children:"login"}),"."]})]}),Object(u.jsx)("div",{children:Object(u.jsxs)("form",{id:"resetForm",className:"tooltip-end-bottom",onSubmit:a,children:[Object(u.jsxs)("div",{className:"mb-3 filled",children:[Object(u.jsx)(l.a,{icon:"lock-off"}),Object(u.jsx)(i.a.Control,{type:"password",name:"password",onChange:b,value:m.password,placeholder:"Password"}),h.password&&j.password&&Object(u.jsx)("div",{className:"d-block invalid-tooltip",children:h.password})]}),Object(u.jsxs)("div",{className:"mb-3 filled",children:[Object(u.jsx)(l.a,{icon:"lock-on"}),Object(u.jsx)(i.a.Control,{type:"password",name:"passwordConfirm",onChange:b,value:m.passwordConfirm,placeholder:"Verify Password"}),h.passwordConfirm&&j.passwordConfirm&&Object(u.jsx)("div",{className:"d-block invalid-tooltip",children:h.passwordConfirm})]}),Object(u.jsx)(r.a,{size:"lg",type:"submit",children:"Reset Password"})]})})]})});return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(d.a,{title:"Reset Password",description:"Reset Password Page"}),Object(u.jsx)(n.a,{left:f,right:p})]})}}}]);
//# sourceMappingURL=9.2c70a369.chunk.js.map