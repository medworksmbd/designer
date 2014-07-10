Clazz.declarePackage ("J.render");
Clazz.load (["J.api.JmolRepaintManager", "JU.BS"], "J.render.RepaintManager", ["J.api.Interface", "JW.Logger", "JV.JC"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.shapeManager = null;
this.renderers = null;
this.bsTranslucent = null;
this.holdRepaint = 0;
this.repaintPending = false;
Clazz.instantialize (this, arguments);
}, J.render, "RepaintManager", null, J.api.JmolRepaintManager);
Clazz.prepareFields (c$, function () {
this.bsTranslucent = JU.BS.newN (36);
});
Clazz.makeConstructor (c$, 
function () {
});
$_V(c$, "set", 
function (vwr, shapeManager) {
this.vwr = vwr;
this.shapeManager = shapeManager;
}, "JV.Viewer,JV.ShapeManager");
$_V(c$, "isRepaintPending", 
function () {
return this.repaintPending;
});
$_V(c$, "pushHoldRepaint", 
function (why) {
++this.holdRepaint;
}, "~S");
$_V(c$, "popHoldRepaint", 
function (andRepaint, why) {
--this.holdRepaint;
if (this.holdRepaint <= 0) {
this.holdRepaint = 0;
if (andRepaint) {
this.repaintPending = true;
this.repaintNow (why);
}}}, "~B,~S");
$_V(c$, "requestRepaintAndWait", 
function (why) {
{
if (typeof Jmol != "undefined" && Jmol._repaint)
Jmol._repaint(this.vwr.applet, false);
this.repaintDone();
}}, "~S");
$_V(c$, "repaintIfReady", 
function (why) {
if (this.repaintPending) return false;
this.repaintPending = true;
if (this.holdRepaint == 0) this.repaintNow (why);
return true;
}, "~S");
$_M(c$, "repaintNow", 
($fz = function (why) {
if (!this.vwr.haveDisplay) return;
{
if (typeof Jmol != "undefined" && Jmol._repaint)
Jmol._repaint(this.vwr.applet,true);
}}, $fz.isPrivate = true, $fz), "~S");
$_V(c$, "repaintDone", 
function () {
this.repaintPending = false;
{
}});
$_V(c$, "clear", 
function (iShape) {
if (this.renderers == null) return;
if (iShape >= 0) this.renderers[iShape] = null;
 else for (var i = 0; i < 36; ++i) this.renderers[i] = null;

}, "~N");
$_M(c$, "getRenderer", 
($fz = function (shapeID) {
if (this.renderers[shapeID] != null) return this.renderers[shapeID];
var className = JV.JC.getShapeClassName (shapeID, true) + "Renderer";
var renderer;
if ((renderer = J.api.Interface.getInterface (className)) == null) return null;
renderer.setViewerG3dShapeID (this.vwr, shapeID);
return this.renderers[shapeID] = renderer;
}, $fz.isPrivate = true, $fz), "~N");
$_V(c$, "render", 
function (gdata, modelSet, isFirstPass, minMax) {
var logTime = this.vwr.getBoolean (603979934);
try {
var g3d = gdata;
g3d.renderBackground (null);
if (isFirstPass) {
this.bsTranslucent.clearAll ();
if (minMax != null) g3d.renderCrossHairs (minMax, this.vwr.getScreenWidth (), this.vwr.getScreenHeight (), this.vwr.getNavigationOffset (), this.vwr.getNavigationDepthPercent ());
var band = this.vwr.getRubberBandSelection ();
if (band != null && g3d.setColix (this.vwr.getColixRubberband ())) g3d.drawRect (band.x, band.y, 0, 0, band.width, band.height);
}if (this.renderers == null) this.renderers =  new Array (36);
var msg = null;
for (var i = 0; i < 36 && g3d.currentlyRendering (); ++i) {
var shape = this.shapeManager.getShape (i);
if (shape == null) continue;
if (logTime) {
msg = "rendering " + JV.JC.getShapeClassName (i, false);
JW.Logger.startTimer (msg);
}if ((isFirstPass || this.bsTranslucent.get (i)) && this.getRenderer (i).renderShape (g3d, modelSet, shape)) this.bsTranslucent.set (i);
if (logTime) JW.Logger.checkTimer (msg, false);
}
g3d.renderAllStrings (null);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
if (!this.vwr.isJS) e.printStackTrace ();
JW.Logger.error ("rendering error? " + e);
} else {
throw e;
}
}
}, "JW.GData,JM.ModelSet,~B,~A");
$_V(c$, "renderExport", 
function (gdata, modelSet, params) {
var isOK;
var logTime = this.vwr.getBoolean (603979934);
this.vwr.finalizeTransformParameters ();
this.shapeManager.finalizeAtoms (null, null);
var exporter3D = this.vwr.initializeExporter (params);
isOK = (exporter3D != null);
if (!isOK) {
JW.Logger.error ("Cannot export " + params.get ("type"));
return null;
}exporter3D.renderBackground (exporter3D);
if (this.renderers == null) this.renderers =  new Array (36);
var msg = null;
for (var i = 0; i < 36; ++i) {
var shape = this.shapeManager.getShape (i);
if (shape == null) continue;
if (logTime) {
msg = "rendering " + JV.JC.getShapeClassName (i, false);
JW.Logger.startTimer (msg);
}this.getRenderer (i).renderShape (exporter3D, modelSet, shape);
if (logTime) JW.Logger.checkTimer (msg, false);
}
exporter3D.renderAllStrings (exporter3D);
return exporter3D.finalizeOutput ();
}, "JW.GData,JM.ModelSet,java.util.Map");
});
