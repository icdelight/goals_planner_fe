(this["webpackJsonpacorn-react"]=this["webpackJsonpacorn-react"]||[]).push([[11],{833:function(e,t,n){"use strict";var a=n(0),c=n(28),i=n(100),s=n(85),r=n(15),o={config:{attributes:!0,childList:!1,subtree:!1}},l=function(){var e=Object(c.b)(),t=Object(a.useCallback)((function(t){Array.isArray(t)&&t.map((function(t){"attributes"===t.type&&"style"===t.attributeName&&e(Object(s.h)(t.target.style.paddingRight.indexOf("px")>-1?parseInt(t.target.style.paddingRight.replace("px",""),10):""))}))}),[e]);return function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:o,c=Object(a.useState)(null),i=Object(r.a)(c,2),s=i[0],l=i[1];Object(a.useEffect)((function(){var e=new MutationObserver(t);l(e)}),[t,n,l]),Object(a.useEffect)((function(){if(s){var t=n.config;return s.observe(e,t),function(){s&&s.disconnect()}}}),[s,e,n])}(document.body,t),!0};t.a=function(){var e=Object(c.c)((function(e){return e.settings})),t=e.color,n=e.layout,s=e.radius,r=e.navColor,o=Object(c.b)(),u=Object(c.c)((function(e){return e.menu})),b=u.attrMenuAnimate,m=u.attrMobile,d=u.placementStatus,j=d.placementHtmlData,O=d.dimensionHtmlData,f=u.behaviourStatus.behaviourHtmlData;l();var h=document.documentElement;return Object(a.useEffect)((function(){return setTimeout((function(){o(Object(i.b)()),h.setAttribute("data-show","true")}),30),h.setAttribute("data-color",t),h.setAttribute("data-layout",n),h.setAttribute("data-radius",s),h.setAttribute("data-navcolor",r),h.setAttribute("data-placement",j),h.setAttribute("data-dimension",O),h.setAttribute("data-behaviour",f),function(){h.removeAttribute("data-color"),h.removeAttribute("data-layout"),h.removeAttribute("data-radius"),h.removeAttribute("data-navcolor"),h.removeAttribute("data-show"),h.removeAttribute("data-placement"),h.removeAttribute("data-behaviour"),h.removeAttribute("data-dimension")}}),[]),Object(a.useEffect)((function(){h.setAttribute("data-placement",j),h.setAttribute("data-dimension",O),h.setAttribute("data-behaviour",f),h.setAttribute("data-navcolor",r),h.setAttribute("data-radius",s),h.setAttribute("data-color",t),h.setAttribute("data-layout",n)}),[h,j,O,f,r,s,t,n]),Object(a.useEffect)((function(){b?h.setAttribute("data-menu-animate",b):h.removeAttribute("data-menu-animate")}),[h,b]),Object(a.useEffect)((function(){m?h.setAttribute("data-mobile",m):h.removeAttribute("data-mobile")}),[h,m]),!0}},851:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),i=n(28),s=n(848),r=n(818),o=n(370),l=n(50),u=n(833),b=n(1),m=function(){return Object(a.useEffect)((function(){return document.documentElement.setAttribute("data-footer","true"),function(){document.documentElement.removeAttribute("data-footer")}}),[]),Object(b.jsx)("footer",{children:Object(b.jsx)("div",{className:"footer-content",children:Object(b.jsx)(s.a,{children:Object(b.jsxs)(r.a,{children:[Object(b.jsx)(o.a,{xs:"12",sm:"6",children:Object(b.jsx)("p",{className:"mb-0 text-muted text-medium",children:"Copyright @2022 CoconutsCode "})}),Object(b.jsx)(o.a,{sm:"6",className:"d-none d-sm-block"})]})})})})},d=c.a.memo(m),j=n(17),O=n.n(j),f=n(18),h=n(850),p=n(56),v=n(373),x=n(266),g=n(6),N=c.a.memo(c.a.forwardRef((function(e,t){var n=e.onClick,a=e.expanded,c=void 0!==a&&a,i=e.user,s=void 0===i?{}:i;return Object(b.jsxs)("a",{href:"#/!",ref:t,className:"d-flex user position-relative","data-toggle":"dropdown","aria-expanded":c,onClick:function(e){e.preventDefault(),e.stopPropagation(),n(e)},children:[Object(b.jsx)("img",{className:"profile",alt:s.name,src:s.thumb}),Object(b.jsx)("div",{className:"name",children:s.name})]})}))),w="NavUserMenu",H=g.a.APP.endsWith("/")?g.a.APP.slice(1,g.a.APP.length):g.a.APP,y=function(){var e=Object(i.b)(),t=Object(l.g)(),n=Object(i.c)((function(e){return e.auth})),s=n.isLogin,u=n.currentUser,m=Object(i.c)((function(e){return e.settings})).color,d=Object(i.c)((function(e){return e.layout})).showingNavMenu,j=function(){e(Object(x.b)(""));var n="".concat(H,"/login");t.push(n)},g=function(){return Object(b.jsxs)("div",{children:[Object(b.jsxs)(r.a,{className:"mb-3 ms-0 me-0",children:[Object(b.jsx)(o.a,{xs:"12",className:"ps-1 mb-2",children:Object(b.jsx)("div",{className:"text-extra-small text-primary",children:"ACCOUNT"})}),Object(b.jsx)(o.a,{xs:"6",className:"ps-1 pe-1",children:Object(b.jsx)("ul",{className:"list-unstyled",children:Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"#/!",children:"User Info"})})})})]}),Object(b.jsxs)(r.a,{className:"mb-1 ms-0 me-0",children:[Object(b.jsx)(o.a,{xs:"12",className:"p-1 mb-3 pt-3",children:Object(b.jsx)("div",{className:"separator-light"})}),Object(b.jsx)(o.a,{xs:"6",className:"ps-1 pe-1",children:Object(b.jsx)("ul",{className:"list-unstyled",children:Object(b.jsx)("li",{children:Object(b.jsxs)("a",{href:"#/!",children:[Object(b.jsx)(p.a,{icon:"gear",className:"me-2",size:"17"})," ",Object(b.jsx)("span",{className:"align-middle",children:"Settings"})]})})})}),Object(b.jsx)(o.a,{xs:"6",className:"pe-1 ps-1",children:Object(b.jsx)("ul",{className:"list-unstyled",children:Object(b.jsx)("li",{children:Object(b.jsxs)("a",{href:"#/!",onClick:j,children:[Object(b.jsx)(p.a,{icon:"logout",className:"me-2",size:"17"})," ",Object(b.jsx)("span",{className:"align-middle",children:"Logout"})]})})})})]})]})},y=c.a.memo(c.a.forwardRef((function(e,t){var n=e.style,a=e.className;return Object(b.jsx)("div",{ref:t,style:n,className:O()("dropdown-menu dropdown-menu-end user-menu wide",a),children:Object(b.jsx)(g,{})})})));y.displayName="NavUserMenuDropdownMenu";var D=Object(i.c)((function(e){return e.menu})),A=D.placementStatus.view,M=D.behaviourStatus.behaviourHtmlData,E=D.attrMobile,P=D.attrMenuAnimate;return Object(a.useEffect)((function(){e(Object(v.b)(""))}),[P,M,E,m]),s?Object(b.jsxs)(h.a,{as:"div",bsPrefix:"user-container d-flex",onToggle:function(t,n){n&&n.stopPropagation?n.stopPropagation():n&&n.originalEvent&&n.originalEvent.stopPropagation&&n.originalEvent.stopPropagation(),e(Object(v.b)(t?w:""))},show:d===w,drop:"down",children:[Object(b.jsx)(h.a.Toggle,{as:N,user:u}),Object(b.jsx)(h.a.Menu,{as:y,className:"dropdown-menu dropdown-menu-end user-menu wide",popperConfig:{modifiers:[{name:"offset",options:{offset:function(){return A===f.d.Horizontal?[0,7]:window.innerWidth<768?[-84,7]:[-78,7]}}}]}})]}):Object(b.jsx)(b.Fragment,{})},D=c.a.memo(y),A=n(836),M=n(374),E=n(483),P=n(15),k=n(377),C=n(66),I=n(75),S=n(849),U=n(852),T=n(85),z=Object(a.memo)(Object(a.forwardRef)((function(e,t){var n=e.children,a=e.onClick,c=e.href,i=void 0===c?"#":c,s=e.active,r=void 0!==s&&s;return Object(b.jsx)("a",{ref:t,className:O()("dropdown-toggle",{active:r}),"data-toggle":"dropdown",href:i,onClick:function(e){e.preventDefault(),a(e)},children:n})}))),L=Object(a.memo)((function(e){var t=e.item,n=e.id,c=e.isSubItem,s=void 0!==c&&c,r=e.menuPlacement,o=void 0===r?g.b.MENU_PLACEMENT:r,u=Object(i.b)(),m=Object(a.useRef)(),d=Object(i.c)((function(e){return e.menu})).collapseAll,j=Object(i.c)((function(e){return e.layout})).showingNavMenu,x=Object(l.h)().pathname,N=!t.path.startsWith("#")&&(x===t.path||x.indexOf("".concat(t.path,"/"))>-1),w=Object(S.a)().formatMessage,H=Object(a.useState)(N),y=Object(P.a)(H,2),D=y[0],A=y[1],M=Object(a.useState)(!1),E=Object(P.a)(M,2),k=E[0],L=E[1],V=function(e,t){return Object(b.jsxs)(b.Fragment,{children:[e&&Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(p.a,{icon:e,size:18,className:"cs-icon icon"})," "]}),Object(b.jsx)("span",{className:"label",children:g.j?w({id:t}):t})]})},F=function(e){L(e)};return Object(a.useEffect)((function(){""!==j&&k&&F(!1)}),[j,k]),t.subs&&o===f.d.Horizontal&&!t.megaParent?Object(b.jsxs)(h.a,{as:"li",onToggle:F,className:O()({mega:t.mega}),show:k,children:[Object(b.jsx)(h.a.Toggle,{as:z,onClick:function(){F(!k),u(Object(v.b)(""))},href:t.path,active:N,children:V(t.icon,t.label)}),Object(b.jsx)(h.a.Menu,{ref:m,renderOnMount:!0,as:"ul",align:"left",className:O()("opacityIn",Object(C.a)({"row align-items-start":t.mega},"row-cols-".concat(t.subs.length),t.mega)),popperConfig:{strategy:t.mega?"fixed":"absolute",modifiers:[{name:"computeStyles",options:{gpuAcceleration:!0,adaptive:!1,roundOffsets:function(e){var n=e.x,a=e.y;if(t.mega)try{return{x:Math.round((window.innerWidth-m.current.clientWidth)/2-8),y:a+7}}catch(c){console.warn("error:",c)}return s?{x:n,y:a-34}:{x:n,y:a+2}}}}]},children:Object(b.jsx)(R,{menuItems:t.subs,menuPlacement:o,isSubItem:!0})})]},n):t.subs&&o===f.d.Horizontal?Object(b.jsxs)("li",{className:"dropdown col d-flex flex-column",children:[Object(b.jsx)(I.c,{to:t.path,className:O()("dropdown-toggle",{active:N}),children:V(t.icon,t.label)}),Object(b.jsx)("ul",{children:Object(b.jsx)(R,{menuItems:t.subs,menuPlacement:o,isSubItem:!0})})]}):t.subs&&o===f.d.Vertical?Object(b.jsxs)("li",{children:[Object(b.jsx)("a",{href:t.path,"data-bs-toggle":"collapse",role:"button",className:O()({active:N}),"aria-expanded":D&&!d,onClick:function(e){e.preventDefault(),e.stopPropagation(),A(!D),u(Object(T.g)(!1))},children:V(t.icon,t.label)}),Object(b.jsx)(U.a,{in:D&&!d,children:Object(b.jsx)("ul",{children:Object(b.jsx)(R,{menuItems:t.subs,menuPlacement:o,isSubItem:!0})})})]}):t.isExternal?Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:t.path,target:"_blank",rel:"noopener noreferrer",children:V(t.icon,t.label)})},n):s&&o!==f.d.Vertical?o===f.d.Horizontal&&t.megaParent?Object(b.jsx)("li",{className:"col d-flex flex-column",children:Object(b.jsx)(I.c,{to:t.path,className:O()({active:N}),activeClassName:"",children:V(t.icon,t.label)})}):Object(b.jsx)(h.a.Item,{as:"li",children:Object(b.jsx)(I.c,{to:t.path,className:O()({active:N}),activeClassName:"",children:V(t.icon,t.label)})}):Object(b.jsx)("li",{children:Object(b.jsx)(I.c,{to:t.path,className:O()({active:N}),activeClassName:"",children:V(t.icon,t.label)})})}));L.displayName="MainMenuItem";var R=c.a.memo((function(e){var t=e.menuItems,n=void 0===t?[]:t,a=e.menuPlacement,c=void 0===a?g.b.MENU_PLACEMENT:a,i=e.isSubItem,s=void 0!==i&&i;return n.map((function(e,t){return Object(b.jsx)(L,{id:e.path,item:e,menuPlacement:c,isSubItem:s},"menu.".concat(e.path,".").concat(t))}))}));R.displayName="MainMenuItems";var V=c.a.memo(R),F=function(){var e=Object(i.b)(),t=Object(i.c)((function(e){return e.menu})),n=t.placement,c=t.behaviour,s=t.placementStatus,r=t.behaviourStatus,o=t.attrMobile,l=t.breakpoints,u=t.useSidebar,m=Object(i.c)((function(e){return e.auth})),d=m.isLogin,j=m.currentUser,h=function(){var e=Object(a.useState)(!1),t=Object(P.a)(e,2),n=t[0],c=t[1],i=!1,s=window.pageYOffset,r=function(){s=window.pageYOffset},o=function(){i=!0},l=function(){if(i){var e=window.pageYOffset;if(i=!1,Math.abs(s-e)<=80&&e>80)return void(s=e);s>e||e<=80?c(!1):s<=e&&e>80&&c(!0),s=e}};return Object(a.useEffect)((function(){var e=setInterval(l,200);return window.addEventListener("load",r),window.addEventListener("scroll",o),function(){clearInterval(e),window.removeEventListener("scroll",o),window.removeEventListener("load",r)}}),[]),n}(),p=Object(E.a)().width,x=Object(a.useMemo)((function(){return Object(M.b)({data:o&&u?k.a:k.a.mainMenuItems,isLogin:d,userRole:j.role})}),[d,j,o,u]);Object(a.useEffect)((function(){e(Object(T.b)("")),e(Object(v.b)("")),2!==s.status&&4!==s.status||(e(Object(T.i)({})),e(Object(T.c)(!1))),1===r.status?(e(Object(T.g)(!0)),e(Object(T.j)(!0))):2===r.status?(e(Object(T.g)(!0)),e(Object(T.j)(!1))):3===r.status?(e(Object(T.j)(!0)),e(Object(T.g)(!1))):4===r.status?(e(Object(T.j)(!1)),e(Object(T.g)(!0))):(5===r.status||6===r.status)&&(e(Object(T.g)(!1)),e(Object(T.j)(!0)))}),[r,s]),Object(a.useEffect)((function(){return s.placementHtmlData===f.d.Vertical&&r.behaviourHtmlData===f.c.Unpinned&&!0!==o&&(e(Object(T.g)(!0)),e(Object(T.b)("hidden"))),function(){}}),[o]),Object(a.useEffect)((function(){return s.placementHtmlData!==f.d.Horizontal||o||r.behaviourHtmlData!==f.c.Unpinned||(h?(e(Object(T.b)("hidden")),document.documentElement.click()):e(Object(T.b)(""))),function(){}}),[h]);var g=Object(a.useCallback)((function(t,n,a){if(t){var c=function(e){var t=e.placement,n=e.breakpoints,a=window.innerWidth;return t===f.d.Horizontal?n.horizontalMobile>a?{status:1,placementHtmlData:f.d.Horizontal,dimensionHtmlData:f.a.Mobile,view:f.d.Vertical}:{status:2,placementHtmlData:f.d.Horizontal,dimensionHtmlData:f.a.Desktop,view:f.d.Horizontal}:t===f.d.Vertical?n.verticalMobile>a?{status:3,placementHtmlData:f.d.Horizontal,dimensionHtmlData:f.a.Mobile,view:f.d.Vertical}:{status:4,placementHtmlData:f.d.Vertical,dimensionHtmlData:f.a.Desktop,view:f.d.Vertical}:{status:0,placementHtmlData:"",dimensionHtmlData:"",view:""}}({placement:n,breakpoints:t}),i=function(e){var t=e.placement,n=e.behaviour,a=e.breakpoints,c=window.innerWidth;return t===f.d.Vertical&&n===f.c.Unpinned?a.verticalMobile>c||a.verticalUnpinned<=c?{status:1,behaviourHtmlData:a.verticalUnpinned!==a.verticalMobile?f.c.Unpinned:f.c.Pinned}:{status:2,behaviourHtmlData:f.c.Unpinned}:t===f.d.Vertical&&n===f.c.Pinned?a.verticalMobile>c||a.verticalUnpinned<=c?{status:3,behaviourHtmlData:f.c.Pinned}:{status:4,behaviourHtmlData:f.c.Unpinned}:t===f.d.Horizontal&&n===f.c.Unpinned?{status:5,behaviourHtmlData:f.c.Unpinned}:t===f.d.Horizontal&&n===f.c.Pinned?{status:6,behaviourHtmlData:f.c.Pinned}:{status:0,behaviourHtmlData:""}}({placement:c.placementHtmlData,behaviour:a,breakpoints:t});l=s,((o=c).status!==l.status||o.placementHtmlData!==l.placementHtmlData||o.dimensionHtmlData!==l.dimensionHtmlData||o.view!==l.view)&&e(Object(T.l)(c)),function(e,t){return e.status!==t.status||e.behaviourHtmlData!==t.behaviourHtmlData}(i,r)&&e(Object(T.e)(i))}var o,l}),[r,s,l]);return Object(a.useEffect)((function(){p&&n&&c&&l&&g(l,n,c)}),[p,l,n,c]),x?s.view===f.d.Horizontal?Object(b.jsx)("div",{className:"menu-container flex-grow-1",children:Object(b.jsx)("ul",{id:"menu",className:O()("menu show"),children:Object(b.jsx)(V,{menuItems:x,menuPlacement:s.view})})}):Object(b.jsx)(A.a,{options:{scrollbars:{autoHide:"leave",autoHideDelay:600},overflowBehavior:{x:"hidden",y:"scroll"}},className:"menu-container flex-grow-1",children:Object(b.jsx)("ul",{id:"menu",className:O()("menu show"),children:Object(b.jsx)(V,{menuItems:x,menuPlacement:s.view})})}):Object(b.jsx)(b.Fragment,{})},W=c.a.memo(F),_=function(){return Object(b.jsx)("div",{className:"logo position-relative",children:Object(b.jsx)(I.b,{to:g.a.APP,children:Object(b.jsx)("div",{className:"img"})})})},B=c.a.memo(_),Y=n(3),J=c.a.memo((function(e){var t=e.items;return Object(b.jsx)("ul",{className:"nav flex-column",children:t.map((function(e,t){return Object(b.jsxs)("li",{children:[Object(b.jsxs)("a",{className:"nav-link",href:"#".concat(e.id),children:[Object(b.jsx)(p.a,{icon:"chevron-right"}),Object(b.jsx)("span",{className:"align-middle",children:e.text})]}),e.subs&&Object(b.jsx)("ul",{className:"nav flex-column",children:e.subs.map((function(e,t){return Object(b.jsx)("li",{children:Object(b.jsx)("a",{className:"nav-link",href:"#".concat(e.id),children:e.text})},t)}))})]},t)}))})}));J.displayName="ScrollspyContent";var q=J,G=c.a.forwardRef((function(e,t){var n=e.children,a=e.onClick;return Object(b.jsx)("a",{href:"#/!",ref:t,className:"spy-button text-white",onClick:function(e){e.preventDefault(),a(e)},children:n})}));G.displayName="ScrollspyToggle";var K=function(e){var t=e.items,n=void 0===t?[]:t;return null===n||n.length<=0?Object(b.jsx)(b.Fragment,{}):Object(b.jsx)(b.Fragment,{children:Object(b.jsxs)(h.a,{children:[Object(b.jsx)(h.a.Toggle,{as:G,children:Object(b.jsx)(p.a,{icon:"menu-dropdown"})}),Object(b.jsx)(h.a.Menu,{as:"ul",className:"dropdown-menu-end",popperConfig:{modifiers:[{name:"offset",options:{offset:[0,5]}}]},children:Object(b.jsx)(q,{items:n})})]})})},Q=c.a.memo(K),X=function(){var e=Object(i.b)(),t=Object(i.c)((function(e){return e.menu})).navClasses,n=Object(i.c)((function(e){return e.scrollspy})).items,c=function(){var n=Object(Y.a)(Object(Y.a)({},t),{},{"mobile-side-out":!0,"mobile-side-ready":!0,"mobile-side-in":!1});e(Object(T.i)(n)),setTimeout((function(){n=Object(Y.a)(Object(Y.a)({},n),{},{"mobile-side-ready":!1,"mobile-side-out":!1,"mobile-top-ready":!0}),e(Object(T.i)(n))}),200),setTimeout((function(){n=Object(Y.a)(Object(Y.a)({},n),{},{"mobile-top-in":!0,"mobile-top-ready":!0}),e(Object(T.i)(n)),e(Object(T.c)(!1))}),230)};return Object(a.useEffect)((function(){return t&&t["mobile-side-in"]&&window.addEventListener("click",c),function(){window.removeEventListener("click",c)}}),[t]),Object(b.jsxs)("div",{className:"mobile-buttons-container",children:[n&&n.length>0&&Object(b.jsx)(Q,{items:n}),Object(b.jsx)("a",{href:"#/",id:"mobileMenuButton",className:"menu-button",onClick:function(n){n.preventDefault(),e(Object(T.c)(!0));var a=Object(Y.a)(Object(Y.a)({},t),{},{"mobile-top-out":!0,"mobile-top-in":!1,"mobile-top-ready":!1});e(Object(T.i)(a)),setTimeout((function(){a=Object(Y.a)(Object(Y.a)({},a),{},{"mobile-top-out":!1,"mobile-side-ready":!0}),e(Object(T.i)(a))}),200),setTimeout((function(){a=Object(Y.a)(Object(Y.a)({},a),{},{"mobile-side-in":!0}),e(Object(T.i)(a))}),230)},children:Object(b.jsx)(p.a,{icon:"menu"})})]})},Z=c.a.memo(X),$=function(){var e=Object(i.b)(),t=Object(i.c)((function(e){return e.menu})),n=t.navClasses,c=t.placementStatus,s=t.behaviourStatus,r=t.attrMobile,o=t.menuPadding,l=Object(a.useRef)(null);return Object(b.jsxs)("div",{id:"nav",className:O()("nav-container d-flex",n),onMouseEnter:function(){l.current&&clearTimeout(l.current),l.current=setTimeout((function(){c.placementHtmlData===f.d.Vertical&&s.behaviourHtmlData===f.c.Unpinned&&!0!==r&&(e(Object(T.g)(!1)),e(Object(T.b)("show")))}),80)},onMouseLeave:function(){l.current&&clearTimeout(l.current),l.current=setTimeout((function(){c.placementHtmlData===f.d.Vertical&&s.behaviourHtmlData===f.c.Unpinned&&!0!==r&&(e(Object(T.g)(!0)),e(Object(T.b)("hidden")))}),80)},children:[Object(b.jsxs)("div",{className:"nav-content d-flex",style:c.placementHtmlData===f.d.Horizontal&&o?{paddingRight:o}:{},children:[Object(b.jsx)(B,{}),Object(b.jsx)(D,{}),Object(b.jsx)(W,{}),Object(b.jsx)(Z,{})]}),Object(b.jsx)("div",{className:"nav-shadow"})]})},ee=c.a.memo($),te=c.a.memo((function(e){var t=e.menuItems;return(void 0===t?[]:t).map((function(e,t){return Object(b.jsx)(ne,{id:e.path,item:e},"menu.".concat(e.path,".").concat(t))}))}));te.displayName="SidebarMenuItems";var ne=function(e){var t=e.item,n=e.id,a=Object(l.h)().pathname,c=Object(S.a)().formatMessage,i=!t.path.startsWith("#")&&(a===t.path||a.indexOf("".concat(t.path,"/"))>-1),s=function(e,t){return Object(b.jsxs)(b.Fragment,{children:[e&&Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(p.a,{icon:e,className:"cs-icon icon"})," "]}),Object(b.jsx)("span",{className:"label",children:g.j?c({id:t}):t})]})};return t.subs?Object(b.jsxs)("li",{children:[Object(b.jsx)(I.c,{to:t.path,className:O()({active:i}),"data-bs-target":t.path,children:s(t.icon,t.label)}),Object(b.jsx)("ul",{children:Object(b.jsx)(te,{menuItems:t.subs})})]}):t.isExternal?Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:t.path,target:"_blank",rel:"noopener noreferrer",children:s(t.icon,t.label)})},n):Object(b.jsx)("li",{children:Object(b.jsx)(I.c,{to:t.path,className:O()({active:i}),activeClassName:"",children:s(t.icon,t.label)})})},ae=te,ce=function(){var e=Object(i.c)((function(e){return e.auth})),t=e.isLogin,n=e.currentUser,c=Object(i.c)((function(e){return e.menu})).useSidebar,s=Object(a.useMemo)((function(){return Object(M.b)({data:k.a.sidebarItems,isLogin:t,userRole:n.role})}),[t,n]);return!0===!c?Object(b.jsx)(b.Fragment,{}):Object(b.jsx)(o.a,{xs:"auto",className:"side-menu-container",children:Object(b.jsx)("ul",{className:"sw-25 side-menu mb-0 primary",id:"menuSide",children:Object(b.jsx)(ae,{menuItems:s})})})},ie=function(e){var t=e.children;Object(u.a)();var n=Object(l.h)().pathname;return Object(a.useEffect)((function(){document.documentElement.click(),window.scrollTo(0,0)}),[n]),Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(ee,{}),Object(b.jsx)("main",{children:Object(b.jsx)(s.a,{children:Object(b.jsxs)(r.a,{className:"h-100",children:[Object(b.jsx)(ce,{}),Object(b.jsx)(o.a,{className:"h-100",id:"contentArea",children:t})]})})}),Object(b.jsx)(d,{})]})},se=c.a.memo(ie),re=n(487),oe=n(428),le=n(24);t.default=function(){var e=Object(i.c)((function(e){return e.auth})),t=e.currentUser,n=e.isLogin,c=Object(a.useMemo)((function(){return Object(M.c)({data:k.a,isLogin:n,userRole:t.role})}),[n,t]);return c?Object(b.jsxs)(se,{children:[Object(b.jsx)(le.b,{position:"top-right",autoClose:2e3,hideProgressBar:!1,newestOnTop:!0,closeOnClick:!0,rtl:!1,pauseOnHover:!0}),Object(b.jsx)(re.a,{routes:c,fallback:Object(b.jsx)(oe.a,{})})]}):Object(b.jsx)(b.Fragment,{})}}}]);
//# sourceMappingURL=11.7ea29d55.chunk.js.map