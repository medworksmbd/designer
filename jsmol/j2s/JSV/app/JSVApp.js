Clazz.declarePackage ("JSV.app");
Clazz.load (["JSV.api.JSVAppInterface", "$.PanelListener"], "JSV.app.JSVApp", ["java.lang.Double", "JU.List", "$.PT", "JSV.common.Coordinate", "$.JSVFileManager", "$.JSViewer", "$.PeakPickEvent", "$.ScriptToken", "$.SubSpecChangeEvent", "$.ZoomEvent", "JW.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.appletFrame = null;
this.isNewWindow = false;
this.appletReadyCallbackFunctionName = null;
this.coordCallbackFunctionName = null;
this.loadFileCallbackFunctionName = null;
this.peakCallbackFunctionName = null;
this.syncCallbackFunctionName = null;
this.vwr = null;
this.prevPanel = null;
Clazz.instantialize (this, arguments);
}, JSV.app, "JSVApp", null, [JSV.api.PanelListener, JSV.api.JSVAppInterface]);
Clazz.makeConstructor (c$, 
function (appletFrame, isJS) {
this.appletFrame = appletFrame;
this.initViewer (isJS);
this.initParams (appletFrame.getParameter ("script"));
}, "JSV.api.AppletFrame,~B");
$_M(c$, "initViewer", 
($fz = function (isJS) {
this.vwr =  new JSV.common.JSViewer (this, true, isJS);
this.appletFrame.setDropTargetListener (this.isSigned (), this.vwr);
var path = this.appletFrame.getDocumentBase ();
JSV.common.JSVFileManager.setDocumentBase (this.vwr, path);
}, $fz.isPrivate = true, $fz), "~B");
$_V(c$, "isPro", 
function () {
return this.isSigned ();
});
$_V(c$, "isSigned", 
function () {
{
return true;
}});
$_M(c$, "getAppletFrame", 
function () {
return this.appletFrame;
});
$_M(c$, "dispose", 
function () {
try {
this.vwr.dispose ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
});
$_V(c$, "getPropertyAsJavaObject", 
function (key) {
return this.vwr.getPropertyAsJavaObject (key);
}, "~S");
$_V(c$, "getPropertyAsJSON", 
function (key) {
return JU.PT.toJSON (null, this.getPropertyAsJavaObject (key));
}, "~S");
$_V(c$, "getCoordinate", 
function () {
return this.vwr.getCoordinate ();
});
$_V(c$, "loadInline", 
function (data) {
this.siOpenDataOrFile (data, null, null, null, -1, -1, true, null, null);
this.appletFrame.validateContent (3);
}, "~S");
$_V(c$, "exportSpectrum", 
function (type, n) {
return this.vwr.$export (type, n);
}, "~S,~N");
$_V(c$, "setFilePath", 
function (tmpFilePath) {
this.runScript ("load " + JU.PT.esc (tmpFilePath));
}, "~S");
$_V(c$, "setSpectrumNumber", 
function (n) {
this.runScript (JSV.common.ScriptToken.SPECTRUMNUMBER + " " + n);
}, "~N");
$_V(c$, "reversePlot", 
function () {
this.toggle (JSV.common.ScriptToken.REVERSEPLOT);
});
$_V(c$, "toggleGrid", 
function () {
this.toggle (JSV.common.ScriptToken.GRIDON);
});
$_V(c$, "toggleCoordinate", 
function () {
this.toggle (JSV.common.ScriptToken.COORDINATESON);
});
$_V(c$, "toggleIntegration", 
function () {
this.toggle (JSV.common.ScriptToken.INTEGRATE);
});
$_M(c$, "toggle", 
($fz = function (st) {
var jsvp = this.vwr.selectedPanel;
if (jsvp != null) this.runScript (st + " TOGGLE");
}, $fz.isPrivate = true, $fz), "JSV.common.ScriptToken");
$_V(c$, "addHighlight", 
function (x1, x2, r, g, b, a) {
this.vwr.addHighLight (x1, x2, r, g, b, a);
}, "~N,~N,~N,~N,~N,~N");
$_V(c$, "removeAllHighlights", 
function () {
this.vwr.removeAllHighlights ();
});
$_V(c$, "removeHighlight", 
function (x1, x2) {
this.vwr.removeHighlight (x1, x2);
}, "~N,~N");
$_V(c$, "syncScript", 
function (peakScript) {
this.vwr.syncScript (peakScript);
}, "~S");
$_V(c$, "writeStatus", 
function (msg) {
JW.Logger.info (msg);
}, "~S");
$_M(c$, "initParams", 
function (params) {
this.vwr.parseInitScript (params);
this.newAppletPanel ();
this.vwr.setPopupMenu (this.vwr.allowMenu, this.vwr.parameters.getBoolean (JSV.common.ScriptToken.ENABLEZOOM));
if (this.vwr.allowMenu) {
this.vwr.closeSource (null);
}this.runScriptNow (params);
}, "~S");
$_M(c$, "newAppletPanel", 
($fz = function () {
JW.Logger.info ("newAppletPanel");
this.appletFrame.createMainPanel (this.vwr);
}, $fz.isPrivate = true, $fz));
$_V(c$, "repaint", 
function () {
var applet = (this.vwr == null ? null : this.vwr.applet);
{
applet && self.Jmol && Jmol._repaint &&(Jmol._repaint(applet,true));
}});
$_M(c$, "updateJS", 
function (width, height) {
}, "~N,~N");
$_V(c$, "runScriptNow", 
function (params) {
return this.vwr.runScriptNow (params);
}, "~S");
$_M(c$, "checkCallbacks", 
($fz = function () {
if (this.coordCallbackFunctionName == null && this.peakCallbackFunctionName == null) return;
var coord =  new JSV.common.Coordinate ();
var actualCoord = (this.peakCallbackFunctionName == null ? null :  new JSV.common.Coordinate ());
if (!this.vwr.pd ().getPickedCoordinates (coord, actualCoord)) return;
var iSpec = this.vwr.mainPanel.getCurrentPanelIndex ();
if (actualCoord == null) this.appletFrame.callToJavaScript (this.coordCallbackFunctionName, [Double.$valueOf (coord.getXVal ()), Double.$valueOf (coord.getYVal ()), Integer.$valueOf (iSpec + 1)]);
 else this.appletFrame.callToJavaScript (this.peakCallbackFunctionName, [Double.$valueOf (coord.getXVal ()), Double.$valueOf (coord.getYVal ()), Double.$valueOf (actualCoord.getXVal ()), Double.$valueOf (actualCoord.getYVal ()), Integer.$valueOf (iSpec + 1)]);
}, $fz.isPrivate = true, $fz));
$_M(c$, "doAdvanced", 
function (filePath) {
}, "~S");
$_V(c$, "panelEvent", 
function (eventObj) {
if (Clazz.instanceOf (eventObj, JSV.common.PeakPickEvent)) {
this.vwr.processPeakPickEvent (eventObj, false);
} else if (Clazz.instanceOf (eventObj, JSV.common.ZoomEvent)) {
} else if (Clazz.instanceOf (eventObj, JSV.common.SubSpecChangeEvent)) {
}}, "~O");
$_V(c$, "getSolnColour", 
function () {
return this.vwr.getSolutionColorStr (true);
});
$_M(c$, "updateJSView", 
($fz = function (msg) {
var applet = this.vwr.applet;
var panel = (applet == null ? null : this.vwr.selectedPanel);
{
applet && applet._viewSet != null && applet._updateView(panel, msg);
}}, $fz.isPrivate = true, $fz), "~S");
$_V(c$, "syncToJmol", 
function (msg) {
this.updateJSView (msg);
if (this.syncCallbackFunctionName == null) return;
JW.Logger.info ("JSVApp.syncToJmol JSV>Jmol " + msg);
this.appletFrame.callToJavaScript (this.syncCallbackFunctionName, [this.vwr.fullName, msg]);
}, "~S");
$_V(c$, "setVisible", 
function (b) {
this.appletFrame.setPanelVisible (b);
}, "~B");
$_V(c$, "setCursor", 
function (id) {
this.vwr.apiPlatform.setCursor (id, this.appletFrame);
}, "~N");
$_V(c$, "runScript", 
function (script) {
this.vwr.runScript (script);
}, "~S");
$_V(c$, "getScriptQueue", 
function () {
return this.vwr.scriptQueue;
});
$_V(c$, "siSetCurrentSource", 
function (source) {
this.vwr.currentSource = source;
}, "JSV.source.JDXSource");
$_V(c$, "siSendPanelChange", 
function () {
if (this.vwr.selectedPanel === this.prevPanel) return;
this.prevPanel = this.vwr.selectedPanel;
this.vwr.sendPanelChange ();
});
$_V(c$, "siNewWindow", 
function (isSelected, fromFrame) {
this.isNewWindow = isSelected;
if (fromFrame) {
if (this.vwr.jsvpPopupMenu != null) this.vwr.jsvpPopupMenu.setSelected ("Window", false);
} else {
this.appletFrame.newWindow (isSelected);
}}, "~B,~B");
$_V(c$, "siValidateAndRepaint", 
function (isAll) {
var pd;
if (this.vwr.selectedPanel != null && (pd = this.vwr.pd ()) != null) pd.taintedAll = true;
this.appletFrame.validate ();
this.repaint ();
}, "~B");
$_V(c$, "siSyncLoad", 
function (filePath) {
this.newAppletPanel ();
JW.Logger.info ("JSVP syncLoad reading " + filePath);
this.siOpenDataOrFile (null, null, null, filePath, -1, -1, false, null, null);
this.appletFrame.validateContent (3);
}, "~S");
$_V(c$, "siOpenDataOrFile", 
function (data, name, specs, url, firstSpec, lastSpec, isAppend, script, id) {
switch (this.vwr.openDataOrFile (data, name, specs, url, firstSpec, lastSpec, isAppend, id)) {
case 0:
if (script != null) this.runScript (script);
break;
case -1:
return;
default:
this.siSetSelectedPanel (null);
return;
}
if (this.vwr.jsvpPopupMenu != null) this.vwr.jsvpPopupMenu.setCompoundMenu (this.vwr.panelNodes, this.vwr.allowCompoundMenu);
JW.Logger.info (this.appletFrame.getAppletInfo () + " File " + this.vwr.currentSource.getFilePath () + " Loaded Successfully");
}, "~O,~S,JU.List,~S,~N,~N,~B,~S,~S");
$_V(c$, "siProcessCommand", 
function (scriptItem) {
this.vwr.runScriptNow (scriptItem);
}, "~S");
$_V(c$, "siSetSelectedPanel", 
function (jsvp) {
this.vwr.mainPanel.setSelectedPanel (this.vwr, jsvp, this.vwr.panelNodes);
this.vwr.selectedPanel = jsvp;
this.vwr.spectraTree.setSelectedPanel (this, jsvp);
if (jsvp == null) {
this.vwr.selectedPanel = jsvp = this.appletFrame.getJSVPanel (this.vwr, null);
this.vwr.mainPanel.setSelectedPanel (this.vwr, jsvp, null);
}this.appletFrame.validate ();
if (jsvp != null) {
jsvp.setEnabled (true);
jsvp.setFocusable (true);
}}, "JSV.api.JSVPanel");
$_V(c$, "siExecSetCallback", 
function (st, value) {
switch (st) {
case JSV.common.ScriptToken.APPLETREADYCALLBACKFUNCTIONNAME:
this.appletReadyCallbackFunctionName = value;
break;
case JSV.common.ScriptToken.LOADFILECALLBACKFUNCTIONNAME:
this.loadFileCallbackFunctionName = value;
break;
case JSV.common.ScriptToken.PEAKCALLBACKFUNCTIONNAME:
this.peakCallbackFunctionName = value;
break;
case JSV.common.ScriptToken.SYNCCALLBACKFUNCTIONNAME:
this.syncCallbackFunctionName = value;
break;
case JSV.common.ScriptToken.COORDCALLBACKFUNCTIONNAME:
this.coordCallbackFunctionName = value;
break;
}
}, "JSV.common.ScriptToken,~S");
$_V(c$, "siLoaded", 
function (value) {
if (this.loadFileCallbackFunctionName != null) this.appletFrame.callToJavaScript (this.loadFileCallbackFunctionName, [this.vwr.appletID, value]);
this.updateJSView (null);
return null;
}, "~S");
$_V(c$, "siExecHidden", 
function (b) {
}, "~B");
$_V(c$, "siExecScriptComplete", 
function (msg, isOK) {
this.vwr.showMessage (msg);
this.siValidateAndRepaint (false);
}, "~S,~B");
$_V(c$, "siUpdateBoolean", 
function (st, TF) {
}, "JSV.common.ScriptToken,~B");
$_V(c$, "siCheckCallbacks", 
function (title) {
this.checkCallbacks ();
}, "~S");
$_V(c$, "siNodeSet", 
function (panelNode) {
this.appletFrame.validateContent (2);
this.siValidateAndRepaint (false);
}, "JSV.common.PanelNode");
$_V(c$, "siSourceClosed", 
function (source) {
}, "JSV.source.JDXSource");
$_V(c$, "siGetNewJSVPanel", 
function (spec) {
if (spec == null) {
this.vwr.initialEndIndex = this.vwr.initialStartIndex = -1;
return null;
}var specs =  new JU.List ();
specs.addLast (spec);
var jsvp = this.appletFrame.getJSVPanel (this.vwr, specs);
jsvp.getPanelData ().addListener (this);
this.vwr.parameters.setFor (jsvp, null, true);
return jsvp;
}, "JSV.common.Spectrum");
$_V(c$, "siGetNewJSVPanel2", 
function (specs) {
if (specs == null) {
this.vwr.initialEndIndex = this.vwr.initialStartIndex = -1;
return this.appletFrame.getJSVPanel (this.vwr, null);
}var jsvp = this.appletFrame.getJSVPanel (this.vwr, specs);
this.vwr.initialEndIndex = this.vwr.initialStartIndex = -1;
jsvp.getPanelData ().addListener (this);
this.vwr.parameters.setFor (jsvp, null, true);
return jsvp;
}, "JU.List");
$_V(c$, "siSetPropertiesFromPreferences", 
function (jsvp, includeMeasures) {
this.vwr.checkAutoIntegrate ();
}, "JSV.api.JSVPanel,~B");
$_V(c$, "siSetLoaded", 
function (fileName, filePath) {
}, "~S,~S");
$_V(c$, "siSetMenuEnables", 
function (node, isSplit) {
}, "JSV.common.PanelNode,~B");
$_V(c$, "siUpdateRecentMenus", 
function (filePath) {
}, "~S");
$_V(c$, "siExecTest", 
function (value) {
var data = "";
this.loadInline (data);
}, "~S");
$_V(c$, "print", 
function (fileName) {
return this.vwr.print (fileName);
}, "~S");
});
