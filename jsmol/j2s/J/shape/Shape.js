Clazz.declarePackage ("J.shape");
Clazz.load (null, "J.shape.Shape", ["J.c.PAL", "JW.C", "$.Logger", "JV.JC"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.ms = null;
this.gdata = null;
this.shapeID = 0;
this.vf = 0;
this.translucentLevel = 0;
this.translucentAllowed = true;
this.isBioShape = false;
this.bsSizeSet = null;
this.bsColixSet = null;
Clazz.instantialize (this, arguments);
}, J.shape, "Shape");
$_M(c$, "getViewer", 
function () {
return this.vwr;
});
$_M(c$, "initializeShape", 
function (vwr, g3d, modelSet, shapeID) {
this.vwr = vwr;
this.gdata = g3d;
this.shapeID = shapeID;
this.vf = JV.JC.getShapeVisibilityFlag (shapeID);
this.setModelSet (modelSet);
this.initShape ();
}, "JV.Viewer,JW.GData,JM.ModelSet,~N");
$_M(c$, "setVisibilityFlags", 
function (bs) {
}, "JU.BS");
$_M(c$, "getSize", 
function (atomIndex) {
return 0;
}, "~N");
$_M(c$, "getSizeG", 
function (group) {
return 0;
}, "JM.Group");
$_M(c$, "setModelSet", 
function (modelSet) {
this.ms = modelSet;
this.initModelSet ();
}, "JM.ModelSet");
$_M(c$, "initModelSet", 
function () {
});
$_M(c$, "setShapeVisibility", 
function (atom, isVisible) {
atom.setShapeVisibility (this.vf, isVisible);
}, "JM.Atom,~B");
$_M(c$, "initShape", 
function () {
});
$_M(c$, "merge", 
function (shape) {
}, "J.shape.Shape");
$_M(c$, "setShapeSizeRD", 
function (size, rd, bsSelected) {
if (rd == null) this.setSize (size, bsSelected);
 else this.setSizeRD (rd, bsSelected);
}, "~N,J.atomdata.RadiusData,JU.BS");
$_M(c$, "setSize", 
function (size, bsSelected) {
}, "~N,JU.BS");
$_M(c$, "setSizeRD", 
function (rd, bsSelected) {
}, "J.atomdata.RadiusData,JU.BS");
$_M(c$, "getPropertyData", 
function (property, data) {
return false;
}, "~S,~A");
$_M(c$, "setPropS", 
function (propertyName, value, bsSelected) {
if (propertyName === "setProperties") {
if (bsSelected == null) bsSelected = this.vwr.getSelectedAtoms ();
var propertyList = value;
while (propertyList.size () > 0) {
var data = propertyList.remove (0);
this.setProperty ((data[0]).intern (), data[1], bsSelected);
}
return;
}if (propertyName === "translucentLevel") {
this.translucentLevel = (value).floatValue ();
return;
}if (propertyName === "refreshTrajectories") {
return;
}JW.Logger.warn ("unassigned " + JV.JC.shapeClassBases[this.shapeID] + " + shape setProperty:" + propertyName + ":" + value);
}, "~S,~O,JU.BS");
$_M(c$, "getProperty", 
function (property, index) {
return null;
}, "~S,~N");
$_M(c$, "getIndexFromName", 
function (thisID) {
return -1;
}, "~S");
$_M(c$, "wasClicked", 
function (x, y) {
return false;
}, "~N,~N");
$_M(c$, "findNearestAtomIndex", 
function (xMouse, yMouse, closest, bsNot) {
}, "~N,~N,~A,JU.BS");
$_M(c$, "checkBoundsMinMax", 
function (pointMin, pointMax) {
}, "JU.P3,JU.P3");
$_M(c$, "setModelClickability", 
function () {
});
$_M(c$, "checkObjectClicked", 
function (x, y, modifiers, bsVisible, drawPicking) {
return null;
}, "~N,~N,~N,JU.BS,~B");
$_M(c$, "checkObjectHovered", 
function (x, y, bsVisible) {
return false;
}, "~N,~N,JU.BS");
$_M(c$, "checkObjectDragged", 
function (prevX, prevY, x, y, dragAction, bsVisible) {
return false;
}, "~N,~N,~N,~N,~N,JU.BS");
$_M(c$, "coordinateInRange", 
function (x, y, vertex, dmin2, ptXY) {
this.vwr.transformPtScr (vertex, ptXY);
var d2 = (x - ptXY.x) * (x - ptXY.x) + (y - ptXY.y) * (y - ptXY.y);
return (d2 < dmin2 ? d2 : -1);
}, "~N,~N,JU.P3,~N,JU.P3i");
$_M(c$, "getColixI", 
function (colix, paletteID, atomIndex) {
return this.getColixA (colix, paletteID, this.ms.at[atomIndex]);
}, "~N,~N,~N");
$_M(c$, "getColixA", 
function (colix, paletteID, atom) {
return (colix == 2 ? this.vwr.getColixAtomPalette (atom, paletteID) : colix);
}, "~N,~N,JM.Atom");
$_M(c$, "getColixB", 
function (colix, pid, bond) {
return (colix == 2 ? this.vwr.getColixBondPalette (bond, pid) : colix);
}, "~N,~N,JM.Bond");
$_M(c$, "getShapeDetail", 
function () {
return null;
});
c$.getColix = $_M(c$, "getColix", 
function (colixes, i, atom) {
return JW.C.getColixInherited ((colixes == null || i >= colixes.length ? 0 : colixes[i]), atom.getColix ());
}, "~A,~N,JM.Atom");
c$.getFontCommand = $_M(c$, "getFontCommand", 
function (type, font) {
if (font == null) return "";
return "font " + type + " " + font.getInfo ();
}, "~S,javajs.awt.Font");
c$.getColorCommandUnk = $_M(c$, "getColorCommandUnk", 
function (type, colix, translucentAllowed) {
return J.shape.Shape.getColorCommand (type, J.c.PAL.UNKNOWN.id, colix, translucentAllowed);
}, "~S,~N,~B");
c$.getColorCommand = $_M(c$, "getColorCommand", 
function (type, pid, colix, translucentAllowed) {
if (pid == J.c.PAL.UNKNOWN.id && colix == 0) return "";
var s = (pid == J.c.PAL.UNKNOWN.id && colix == 0 ? "" : (translucentAllowed ? J.shape.Shape.getTranslucentLabel (colix) + " " : "") + (pid != J.c.PAL.UNKNOWN.id && !J.c.PAL.isPaletteVariable (pid) ? J.c.PAL.getPaletteName (pid) : J.shape.Shape.encodeColor (colix)));
return "color " + type + " " + s;
}, "~S,~N,~N,~B");
c$.encodeColor = $_M(c$, "encodeColor", 
function (colix) {
return (JW.C.isColixColorInherited (colix) ? "none" : JW.C.getHexCode (colix));
}, "~N");
c$.getTranslucentLabel = $_M(c$, "getTranslucentLabel", 
function (colix) {
return (JW.C.isColixTranslucent (colix) ? "translucent " + JW.C.getColixTranslucencyFractional (colix) : "opaque");
}, "~N");
c$.appendCmd = $_M(c$, "appendCmd", 
function (s, cmd) {
if (cmd.length == 0) return;
s.append ("  ").append (cmd).append (";\n");
}, "JU.SB,~S");
Clazz.defineStatics (c$,
"RADIUS_MAX", 4);
});