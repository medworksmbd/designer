Clazz.declarePackage ("J.io");
Clazz.load (null, "J.io.JmolBinary", ["java.io.BufferedInputStream", "java.util.Hashtable", "JU.PT", "$.Rdr", "J.api.Interface", "JW.Logger", "JV.FileManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fm = null;
this.pngjCache = null;
this.spardirCache = null;
Clazz.instantialize (this, arguments);
}, J.io, "JmolBinary");
Clazz.makeConstructor (c$, 
function (fm) {
this.fm = fm;
}, "JV.FileManager");
c$.determineSurfaceTypeIs = $_M(c$, "determineSurfaceTypeIs", 
function (is) {
var br;
try {
br = JU.Rdr.getBufferedReader ( new java.io.BufferedInputStream (is), "ISO-8859-1");
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
return null;
} else {
throw e;
}
}
return J.io.JmolBinary.determineSurfaceFileType (br);
}, "java.io.InputStream");
c$.getEmbeddedScript = $_M(c$, "getEmbeddedScript", 
function (script) {
if (script == null) return script;
var pt = script.indexOf ("**** Jmol Embedded Script ****");
if (pt < 0) return script;
var pt1 = script.lastIndexOf ("/*", pt);
var pt2 = script.indexOf ((script.charAt (pt1 + 2) == '*' ? "*" : "") + "*/", pt);
if (pt1 >= 0 && pt2 >= pt) script = script.substring (pt + "**** Jmol Embedded Script ****".length, pt2) + "\n";
while ((pt1 = script.indexOf (" #Jmol...\u0000")) >= 0) script = script.substring (0, pt1) + script.substring (pt1 + " #Jmol...\u0000".length + 4);

if (JW.Logger.debugging) JW.Logger.debug (script);
return script;
}, "~S");
c$.getJzu = $_M(c$, "getJzu", 
function () {
return (J.io.JmolBinary.jzu == null ? J.io.JmolBinary.jzu = J.api.Interface.getOption ("io.JmolUtil") : J.io.JmolBinary.jzu);
});
$_M(c$, "getCachedPngjBytes", 
function (pathName) {
return (pathName.indexOf (".png") < 0 ? null : J.io.JmolBinary.getJzu ().getCachedPngjBytes (this, pathName));
}, "~S");
$_M(c$, "clearAndCachePngjFile", 
function (data) {
this.pngjCache =  new java.util.Hashtable ();
if (data == null) return false;
data[1] = null;
if (data[0] == null) return false;
return J.io.JmolBinary.getJzu ().cachePngjFile (this, data);
}, "~A");
$_M(c$, "spardirPut", 
function (name, bytes) {
if (this.spardirCache == null) this.spardirCache =  new java.util.Hashtable ();
this.spardirCache.put (name, bytes);
}, "~S,~A");
$_M(c$, "clearPngjCache", 
function (fileName) {
if (fileName != null && (this.pngjCache == null || !this.pngjCache.containsKey (fileName))) return;
this.pngjCache = null;
JW.Logger.info ("PNGJ cache cleared");
}, "~S");
c$.getAtomSetCollectionOrBufferedReaderFromZip = $_M(c$, "getAtomSetCollectionOrBufferedReaderFromZip", 
function (adapter, is, fileName, zipDirectory, htParams, asBufferedReader) {
return J.io.JmolBinary.getJzu ().getAtomSetCollectionOrBufferedReaderFromZip (JU.Rdr.getJzt (), adapter, is, fileName, zipDirectory, htParams, 1, asBufferedReader);
}, "J.api.JmolAdapter,java.io.InputStream,~S,~A,java.util.Map,~B");
c$.spartanFileList = $_M(c$, "spartanFileList", 
function (name, zipDirectory) {
return J.io.JmolBinary.getJzu ().spartanFileList (JU.Rdr.getJzt (), name, zipDirectory);
}, "~S,~S");
c$.determineSurfaceFileType = $_M(c$, "determineSurfaceFileType", 
function (br) {
return J.io.JmolBinary.getJzu ().determineSurfaceFileType (br);
}, "java.io.BufferedReader");
c$.getFileReferences = $_M(c$, "getFileReferences", 
function (script, fileList) {
for (var ipt = 0; ipt < JV.FileManager.scriptFilePrefixes.length; ipt++) {
var tag = JV.FileManager.scriptFilePrefixes[ipt];
var i = -1;
while ((i = script.indexOf (tag, i + 1)) >= 0) {
var s = JU.PT.getQuotedStringAt (script, i);
if (s.indexOf ("::") >= 0) s = JU.PT.split (s, "::")[1];
fileList.addLast (s);
}
}
}, "~S,JU.List");
c$.getManifestScriptPath = $_M(c$, "getManifestScriptPath", 
function (manifest) {
if (manifest.indexOf ("$SCRIPT_PATH$") >= 0) return "";
var ch = (manifest.indexOf ('\n') >= 0 ? "\n" : "\r");
if (manifest.indexOf (".spt") >= 0) {
var s = JU.PT.split (manifest, ch);
for (var i = s.length; --i >= 0; ) if (s[i].indexOf (".spt") >= 0) return "|" + JU.PT.trim (s[i], "\r\n \t");

}return null;
}, "~S");
c$.getBufferedReaderForResource = $_M(c$, "getBufferedReaderForResource", 
function (vwr, resourceClass, classPath, resourceName) {
{
resourceName = vwr.vwrOptions.get("codePath") +
classPath + resourceName;
}return vwr.getBufferedReaderOrErrorMessageFromName (resourceName, [null, null], false);
}, "JV.Viewer,~O,~S,~S");
Clazz.defineStatics (c$,
"JPEG_CONTINUE_STRING", " #Jmol...\0",
"PMESH_BINARY_MAGIC_NUMBER", "PM\1\0",
"jzu", null);
});