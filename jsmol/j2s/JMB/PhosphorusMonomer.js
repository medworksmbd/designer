Clazz.declarePackage ("JMB");
Clazz.load (["JMB.Monomer"], "JMB.PhosphorusMonomer", ["JU.Quat", "$.V3", "J.c.STR"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$isPurine = false;
this.$isPyrimidine = false;
Clazz.instantialize (this, arguments);
}, JMB, "PhosphorusMonomer", JMB.Monomer);
$_V(c$, "isNucleic", 
function () {
return true;
});
Clazz.overrideConstructor (c$, 
function () {
});
c$.validateAndAllocateP = $_M(c$, "validateAndAllocateP", 
function (chain, group3, seqcode, firstIndex, lastIndex, specialAtomIndexes) {
return (firstIndex != lastIndex || specialAtomIndexes[13] != firstIndex ? null :  new JMB.PhosphorusMonomer ().set3 (chain, group3, seqcode, firstIndex, lastIndex, JMB.PhosphorusMonomer.phosphorusOffsets));
}, "JM.Chain,~S,~N,~N,~N,~A");
$_M(c$, "set3", 
function (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets) {
this.set2 (chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets);
if (group3.indexOf ('T') >= 0) chain.isDna = true;
if (group3.indexOf ('U') + group3.indexOf ('I') > -2) chain.isRna = true;
this.$isPurine = (group3.indexOf ('A') + group3.indexOf ('G') + group3.indexOf ('I') > -3);
this.$isPyrimidine = (group3.indexOf ('T') + group3.indexOf ('C') + group3.indexOf ('U') > -3);
return this;
}, "JM.Chain,~S,~N,~N,~N,~A");
$_M(c$, "getP", 
function () {
return this.getAtomFromOffsetIndex (0);
});
$_M(c$, "isPhosphorusMonomer", 
function () {
return true;
});
$_V(c$, "isDna", 
function () {
return this.chain.isDna;
});
$_V(c$, "isRna", 
function () {
return this.chain.isRna;
});
$_V(c$, "isPurine", 
function () {
return this.$isPurine;
});
$_V(c$, "isPyrimidine", 
function () {
return this.$isPyrimidine;
});
$_V(c$, "getStructure", 
function () {
return this.chain;
});
$_V(c$, "getProteinStructureType", 
function () {
return J.c.STR.NONE;
});
$_V(c$, "isConnectedAfter", 
function (possiblyPreviousMonomer) {
return this.isCA2 (possiblyPreviousMonomer);
}, "JMB.Monomer");
$_M(c$, "isCA2", 
function (possiblyPreviousMonomer) {
if (possiblyPreviousMonomer == null) return true;
var distance = this.getLeadAtom ().distance (possiblyPreviousMonomer.getLeadAtom ());
return distance <= JMB.PhosphorusMonomer.MAX_ADJACENT_PHOSPHORUS_DISTANCE;
}, "JMB.Monomer");
$_V(c$, "getQuaternion", 
function (qType) {
return this.getQuaternionP ();
}, "~S");
$_M(c$, "getQuaternionP", 
function () {
var i = this.monomerIndex;
if (i == 0 || i >= this.bioPolymer.monomerCount - 1) return null;
var ptP = this.bioPolymer.monomers[i].getAtomFromOffsetIndex (0);
var ptA;
var ptB;
ptA = this.bioPolymer.monomers[i + 1].getAtomFromOffsetIndex (0);
ptB = this.bioPolymer.monomers[i - 1].getAtomFromOffsetIndex (0);
if (ptP == null || ptA == null || ptB == null) return null;
var vA =  new JU.V3 ();
var vB =  new JU.V3 ();
vA.sub2 (ptA, ptP);
vB.sub2 (ptB, ptP);
return JU.Quat.getQuaternionFrameV (vA, vB, null, false);
});
$_V(c$, "getQuaternionFrameCenter", 
function (qType) {
return this.getAtomFromOffsetIndex (0);
}, "~S");
$_V(c$, "getHelixData", 
function (tokType, qType, mStep) {
return this.getHelixData2 (tokType, qType, mStep);
}, "~N,~S,~N");
Clazz.defineStatics (c$,
"P", 0,
"phosphorusOffsets", [0],
"MAX_ADJACENT_PHOSPHORUS_DISTANCE", 8.0);
});