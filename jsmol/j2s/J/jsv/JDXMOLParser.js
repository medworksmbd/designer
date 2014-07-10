Clazz.declarePackage ("J.jsv");
Clazz.load (["J.adapter.smarter.JmolJDXMOLParser"], "J.jsv.JDXMOLParser", ["java.util.Hashtable", "JU.BS", "$.List", "$.PT", "$.SB", "JW.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.line = null;
this.lastModel = "";
this.thisModelID = null;
this.baseModel = null;
this.vibScale = 0;
this.piUnitsX = null;
this.piUnitsY = null;
this.loader = null;
this.modelIdList = "";
this.peakIndex = null;
this.peakFilePath = null;
Clazz.instantialize (this, arguments);
}, J.jsv, "JDXMOLParser", null, J.adapter.smarter.JmolJDXMOLParser);
Clazz.makeConstructor (c$, 
function () {
});
$_V(c$, "set", 
function (loader, filePath, htParams) {
this.loader = loader;
this.peakFilePath = filePath;
this.peakIndex =  Clazz.newIntArray (1, 0);
if (htParams != null) {
htParams.remove ("modelNumber");
if (htParams.containsKey ("zipSet")) {
this.peakIndex = htParams.get ("peakIndex");
if (this.peakIndex == null) {
this.peakIndex =  Clazz.newIntArray (1, 0);
htParams.put ("peakIndex", this.peakIndex);
}if (!htParams.containsKey ("subFileName")) this.peakFilePath = JU.PT.split (filePath, "|")[0];
}}return this;
}, "J.adapter.smarter.JmolJDXMOLReader,~S,java.util.Map");
$_V(c$, "getAttribute", 
function (line, tag) {
var attr = JU.PT.getQuotedAttribute (line, tag);
return (attr == null ? "" : attr);
}, "~S,~S");
$_V(c$, "getRecord", 
function (key) {
if (this.line == null || this.line.indexOf (key) < 0) return null;
var s = this.line;
while (s.indexOf (">") < 0) s += " " + this.readLine ();

return this.line = s;
}, "~S");
$_V(c$, "readModels", 
function () {
if (!this.findRecord ("Models")) return false;
this.line = "";
this.thisModelID = "";
var isFirst = true;
while (true) {
this.line = this.loader.discardLinesUntilNonBlank ();
if (this.getRecord ("<ModelData") == null) break;
this.getModelData (isFirst);
isFirst = false;
}
return true;
});
$_V(c$, "readACDMolFile", 
function () {
var sb =  new JU.SB ();
sb.append (this.line.substring (this.line.indexOf ("=") + 1)).appendC ('\n');
while (this.readLine () != null && !this.line.contains ("$$$$")) sb.append (this.line).appendC ('\n');

return JU.PT.rep (sb.toString (), "  $$ Empty String", "");
});
$_V(c$, "readACDAssignments", 
function (nPoints) {
var list =  new JU.List ();
this.readLine ();
if (nPoints < 0) nPoints = 2147483647;
for (var i = 0; i < nPoints; i++) {
this.line = JU.PT.replaceAllCharacters (this.readLine (), "()<>", " ").trim ();
if (this.line.length == 0 || this.line.indexOf ("#") >= 0 || this.line.indexOf ("$") >= 0) break;
var pt = this.line.indexOf ("'");
if (pt >= 0) {
var pt2 = this.line.indexOf ("'", pt + 1);
this.line = this.line.substring (0, pt) + JU.PT.rep (this.line.substring (pt + 1, pt2), ",", ";") + this.line.substring (pt2 + 1);
}JW.Logger.info ("Peak Assignment: " + this.line);
var tokens = JU.PT.split (this.line, ",");
list.addLast (tokens);
}
return list;
}, "~N");
$_V(c$, "setACDAssignments", 
function (model, mytype, peakCount, acdlist, molFile) {
try {
if (peakCount >= 0) this.peakIndex = [peakCount];
var isMS = (mytype.indexOf ("MASS") == 0);
var file = " file=" + JU.PT.esc (this.peakFilePath.$replace ('\\', '/'));
model = " model=" + JU.PT.esc (model + " (assigned)");
this.piUnitsX = "";
this.piUnitsY = "";
var dx = this.getACDPeakWidth (mytype) / 2;
var htSets =  new java.util.Hashtable ();
var list =  new JU.List ();
var zzcMap = null;
var ptx;
var pta;
var nAtoms = 0;
if (isMS) {
zzcMap =  new java.util.Hashtable ();
var tokens = JU.PT.split (molFile, "M  ZZC");
for (var i = tokens.length; --i >= 1; ) {
var ab = JU.PT.getTokens (tokens[i]);
nAtoms = Math.max (nAtoms, JU.PT.parseInt (ab[0]));
zzcMap.put (ab[1], ab[0]);
}
ptx = 4;
pta = 0;
} else if (mytype.indexOf ("NMR") >= 0) {
ptx = 0;
pta = 3;
} else {
ptx = 0;
pta = 2;
}var nPeaks = acdlist.size ();
for (var i = 0; i < nPeaks; i++) {
var data = acdlist.get (i);
var x = JU.PT.parseFloat (data[ptx]);
var a = data[pta];
if (isMS) a = this.fixACDAtomList (a, zzcMap, nAtoms);
 else a = a.$replace (';', ',');
var title = (isMS ? "m/z=" + Math.round (x) + ": " + data[2] + " (" + data[1] + ")" : pta == 2 ? "" + (Math.round (x * 10) / 10) : null);
this.getStringInfo (file, title, mytype, model, a, htSets, "" + x, list, " atoms=\"%ATOMS%\" xMin=\"" + (x - dx) + "\" xMax=\"" + (x + dx) + "\">");
}
return this.setPeakData (list, 0);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return 0;
} else {
throw e;
}
}
}, "~S,~S,~N,JU.List,~S");
$_M(c$, "fixACDAtomList", 
($fz = function (atoms, zzcMap, nAtoms) {
atoms = atoms.trim ();
var tokens = JU.PT.getTokens (atoms.$replace (';', ' '));
var bs =  new JU.BS ();
var isM = false;
for (var i = 0; i < tokens.length; i++) {
var a = tokens[i];
isM = (a.indexOf ("M") >= 0);
if (isM) a = "1-" + nAtoms;
var pt = a.indexOf ('-');
if (pt >= 0) {
var i1 = JU.PT.parseInt (a.substring (0, pt));
var i2 = JU.PT.parseInt (a.substring (pt + 1)) + 1;
for (var k = i1; k < i2; k++) bs.set (isM ? k : JU.PT.parseInt (zzcMap.get ("" + k)));

} else {
bs.set (JU.PT.parseInt (zzcMap.get (a)));
}}
var s = bs.toJSON ();
return s.substring (1, s.length - 1);
}, $fz.isPrivate = true, $fz), "~S,java.util.Map,~N");
$_M(c$, "getACDPeakWidth", 
($fz = function (type) {
return (type.indexOf ("HNMR") >= 0 ? 0.05 : type.indexOf ("CNMR") >= 0 ? 1 : type.indexOf ("MASS") >= 0 ? 1 : 10);
}, $fz.isPrivate = true, $fz), "~S");
$_V(c$, "readPeaks", 
function (isSignals, peakCount) {
try {
if (peakCount >= 0) this.peakIndex = [peakCount];
var offset = (isSignals ? 1 : 0);
var tag1 = (isSignals ? "Signals" : "Peaks");
var tag2 = (isSignals ? "<Signal" : "<PeakData");
if (!this.findRecord (tag1)) return 0;
var file = " file=" + JU.PT.esc (this.peakFilePath.$replace ('\\', '/'));
var model = JU.PT.getQuotedAttribute (this.line, "model");
model = " model=" + JU.PT.esc (model == null ? this.thisModelID : model);
var mytype = JU.PT.getQuotedAttribute (this.line, "type");
this.piUnitsX = JU.PT.getQuotedAttribute (this.line, "xLabel");
this.piUnitsY = JU.PT.getQuotedAttribute (this.line, "yLabel");
var htSets =  new java.util.Hashtable ();
var list =  new JU.List ();
while (this.readLine () != null && !(this.line = this.line.trim ()).startsWith ("</" + tag1)) {
if (this.line.startsWith (tag2)) {
this.getRecord (tag2);
JW.Logger.info (this.line);
var title = JU.PT.getQuotedAttribute (this.line, "title");
if (mytype == null) mytype = JU.PT.getQuotedAttribute (this.line, "type");
var atoms = JU.PT.getQuotedAttribute (this.line, "atoms");
var key = (Clazz.floatToInt (JU.PT.parseFloat (JU.PT.getQuotedAttribute (this.line, "xMin")) * 100)) + "_" + (Clazz.floatToInt (JU.PT.parseFloat (JU.PT.getQuotedAttribute (this.line, "xMax")) * 100));
this.getStringInfo (file, title, mytype, (JU.PT.getQuotedAttribute (this.line, "model") == null ? model : ""), atoms, htSets, key, list, this.line.substring (tag2.length).trim ());
}}
return this.setPeakData (list, offset);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return 0;
} else {
throw e;
}
}
}, "~B,~N");
$_M(c$, "setPeakData", 
($fz = function (list, offset) {
var nH = 0;
var n = list.size ();
for (var i = 0; i < n; i++) {
var o = list.get (i);
var info = JU.PT.rep (o[0], "%INDEX%", "" + (++this.peakIndex[0]));
var bs = o[1];
if (bs != null) {
var s = "";
for (var j = bs.nextSetBit (0); j >= 0; j = bs.nextSetBit (j + 1)) s += "," + (j + offset);

var na = bs.cardinality ();
nH += na;
info = JU.PT.rep (info, "%ATOMS%", s.substring (1));
info = JU.PT.rep (info, "%S%", (na == 1 ? "" : "s"));
info = JU.PT.rep (info, "%NATOMS%", "" + na);
}JW.Logger.info ("adding PeakData " + info);
this.loader.addPeakData (info);
}
this.loader.setSpectrumPeaks (nH, this.piUnitsX, this.piUnitsY);
return n;
}, $fz.isPrivate = true, $fz), "JU.List,~N");
$_M(c$, "getStringInfo", 
($fz = function (file, title, mytype, model, atoms, htSets, key, list, more) {
if ("HNMR".equals (mytype)) mytype = "1HNMR";
 else if ("CNMR".equals (mytype)) mytype = "13CNMR";
var type = (mytype == null ? "" : " type=" + JU.PT.esc (mytype));
if (title == null) title = ("1HNMR".equals (mytype) ? "atom%S%: %ATOMS%; integration: %NATOMS%" : "");
title = " title=" + JU.PT.esc (title);
var stringInfo = "<PeakData " + file + " index=\"%INDEX%\"" + title + type + model + " " + more;
if (atoms != null) stringInfo = JU.PT.rep (stringInfo, "atoms=\"" + atoms + "\"", "atoms=\"%ATOMS%\"");
var o = htSets.get (key);
if (o == null) {
o = [stringInfo, (atoms == null ? null :  new JU.BS ())];
htSets.put (key, o);
list.addLast (o);
}if (atoms != null) {
var bs = o[1];
atoms = atoms.$replace (',', ' ');
bs.or (JU.BS.unescape ("({" + atoms + "})"));
}}, $fz.isPrivate = true, $fz), "~S,~S,~S,~S,~S,java.util.Map,~S,JU.List,~S");
$_M(c$, "getModelData", 
($fz = function (isFirst) {
this.lastModel = this.thisModelID;
this.thisModelID = this.getAttribute (this.line, "id");
var key = ";" + this.thisModelID + ";";
if (this.modelIdList.indexOf (key) >= 0) {
this.line = this.loader.discardLinesUntilContains ("</ModelData>");
return;
}this.modelIdList += key;
this.baseModel = this.getAttribute (this.line, "baseModel");
while (this.line.indexOf (">") < 0 && this.line.indexOf ("type") < 0) this.readLine ();

var modelType = this.getAttribute (this.line, "type").toLowerCase ();
this.vibScale = JU.PT.parseFloat (this.getAttribute (this.line, "vibrationScale"));
if (modelType.equals ("xyzvib")) modelType = "xyz";
 else if (modelType.length == 0) modelType = null;
var sb =  new JU.SB ();
while (this.readLine () != null && !this.line.contains ("</ModelData>")) sb.append (this.line).appendC ('\n');

this.loader.processModelData (sb.toString (), this.thisModelID, modelType, this.baseModel, this.lastModel, NaN, this.vibScale, isFirst);
}, $fz.isPrivate = true, $fz), "~B");
$_M(c$, "findRecord", 
($fz = function (tag) {
if (this.line == null) this.readLine ();
if (this.line.indexOf ("<" + tag) < 0) this.line = this.loader.discardLinesUntilContains2 ("<" + tag, "##");
return (this.line.indexOf ("<" + tag) >= 0);
}, $fz.isPrivate = true, $fz), "~S");
$_M(c$, "readLine", 
($fz = function () {
return this.line = this.loader.rd ();
}, $fz.isPrivate = true, $fz));
$_V(c$, "setLine", 
function (s) {
this.line = s;
}, "~S");
});
