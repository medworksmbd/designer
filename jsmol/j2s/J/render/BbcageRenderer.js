Clazz.declarePackage ("J.render");
Clazz.load (["J.render.CageRenderer"], "J.render.BbcageRenderer", ["JW.BoxInfo"], function () {
c$ = Clazz.declareType (J.render, "BbcageRenderer", J.render.CageRenderer);
$_V(c$, "initRenderer", 
function () {
this.tickEdges = JW.BoxInfo.bbcageTickEdges;
});
$_V(c$, "render", 
function () {
var bbox = this.shape;
if (bbox.isVisible && (this.isExport || this.g3d.checkTranslucent (false)) && !this.vwr.isJmolDataFrame ()) {
this.colix = this.vwr.getObjectColix (4);
this.renderCage (bbox.mad, this.ms.getBboxVertices (), null, 0, 0xFF, 0xFF, 1);
}return false;
});
});
