Clazz.declarePackage ("J.shape");
Clazz.load (["J.shape.AtomShape"], "J.shape.Halos", ["JW.BSUtil", "$.C"], function () {
c$ = Clazz.decorateAsClass (function () {
this.colixSelection = 2;
this.bsHighlight = null;
this.colixHighlight = 10;
Clazz.instantialize (this, arguments);
}, J.shape, "Halos", J.shape.AtomShape);
$_M(c$, "initState", 
function () {
this.translucentAllowed = false;
});
$_V(c$, "setProperty", 
function (propertyName, value, bs) {
if ("translucency" === propertyName) return;
if ("argbSelection" === propertyName) {
this.colixSelection = JW.C.getColix ((value).intValue ());
return;
}if ("argbHighlight" === propertyName) {
this.colixHighlight = JW.C.getColix ((value).intValue ());
return;
}if ("highlight" === propertyName) {
this.bsHighlight = value;
return;
}if (propertyName === "deleteModelAtoms") {
JW.BSUtil.deleteBits (this.bsHighlight, bs);
}this.setPropAS (propertyName, value, bs);
}, "~S,~O,JU.BS");
$_V(c$, "setVisibilityFlags", 
function (bs) {
var bsSelected = (this.vwr.getSelectionHaloEnabled (false) ? this.vwr.getSelectedAtoms () : null);
for (var i = this.ac; --i >= 0; ) {
var isVisible = bsSelected != null && bsSelected.get (i) || (this.mads != null && this.mads[i] != 0);
this.setShapeVisibility (this.atoms[i], isVisible);
}
}, "JU.BS");
$_V(c$, "getShapeState", 
function () {
return this.vwr.getShapeState (this);
});
});