(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{399:function(e,t,o){var content=o(432);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(19).default)("7694e05e",content,!0,{sourceMap:!1})},431:function(e,t,o){"use strict";o(399)},432:function(e,t,o){var c=o(18)(!1);c.push([e.i,"form[data-v-10e8f1ec]{width:400px;margin:3rem auto auto}button[data-v-10e8f1ec]{width:100%}",""]),e.exports=c},456:function(e,t,o){"use strict";o.r(t);o(57),o(30),o(11);var c=o(9),r=(o(48),{layout:"dashboard",asyncData:function(e){return Object(c.a)(regeneratorRuntime.mark((function t(){var o,c,r,l,n,d;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return o=e.$axios,c=e.store,r=c.getters.token,l=c.state.user.collectId,t.next=5,o.$get("/collectivites/types");case 5:return n=t.sent,t.next=8,o.$get("/collectivites/".concat(l));case 8:return d=t.sent,t.abrupt("return",{collectId:l,collectName:d.collectName,collectTypeId:d.collectTypeId,collectTypes:n,token:r});case 10:case"end":return t.stop()}}),t)})))()},head:function(){return{title:"Gérer collectivité — Dashboard eCollectivités"}},methods:{updateInfo:function(){var e=this;return Object(c.a)(regeneratorRuntime.mark((function t(){var o,data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,o={Authorization:"Bearer ".concat(e.token)},data={collectName:e.collectName,collectTypeId:e.collectTypeId},t.next=5,e.$axios.$post("/collectivites/".concat(e.collectId,"/update"),data,{headers:o});case 5:e.$toast.success("Les informations ont été mises à jour avec succès !"),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),e.$toast.error("Une erreur est survenue. Veuillez réessayer plus tard.");case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))()}}}),l=(o(431),o(8)),component=Object(l.a)(r,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"manage-collectivite--wrapper"},[t("h1",[e._v("Gérer les informations de la collectivité")]),e._v(" "),t("form",{on:{submit:function(t){return t.preventDefault(),e.updateInfo()}}},[t("div",{staticClass:"form-group"},[t("label",{attrs:{for:"collect-id"}},[e._v("Id :")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.collectId,expression:"collectId"}],attrs:{id:"collect-id",type:"text",disabled:""},domProps:{value:e.collectId},on:{input:function(t){t.target.composing||(e.collectId=t.target.value)}}})]),e._v(" "),t("div",{staticClass:"form-group"},[t("label",{attrs:{for:"collect-name"}},[e._v("Nom :")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.collectName,expression:"collectName"}],attrs:{id:"collect-name",type:"text",required:""},domProps:{value:e.collectName},on:{input:function(t){t.target.composing||(e.collectName=t.target.value)}}})]),e._v(" "),t("div",{staticClass:"form-group"},[t("label",{attrs:{for:"collect-type"}},[e._v("Type de collectivité")]),e._v(" "),t("select",{directives:[{name:"model",rawName:"v-model",value:e.collectTypeId,expression:"collectTypeId"}],staticClass:"form-control",attrs:{id:"collect-type",required:""},on:{change:function(t){var o=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.collectTypeId=t.target.multiple?o:o[0]}}},e._l(e.collectTypes,(function(o){return t("option",{key:o.collectTypeId,domProps:{value:o.collectTypeId}},[e._v("\n          "+e._s(o.collectTypeLabel)+"\n        ")])})),0)]),e._v(" "),t("button",{attrs:{type:"submit"}},[e._v("Mettre à jour")])])])}),[],!1,null,"10e8f1ec",null);t.default=component.exports}}]);