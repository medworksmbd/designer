Clazz.declarePackage ("JW");
Clazz.load (["JU.V3"], "JW.Vibration", null, function () {
c$ = Clazz.declareType (JW, "Vibration", JU.V3);
$_M(c$, "setTempPoint", 
function (pt, t456, scale, modulationScale) {
pt.scaleAdd2 ((Math.cos (t456.x * 6.283185307179586) * scale), this, pt);
}, "JU.T3,JU.T3,~N,~N");
$_M(c$, "getInfo", 
function (info) {
info.put ("vibVector", JU.V3.newV (this));
}, "java.util.Map");
$_M(c$, "getUnitCell", 
function () {
return null;
});
Clazz.defineStatics (c$,
"twoPI", 6.283185307179586);
});
