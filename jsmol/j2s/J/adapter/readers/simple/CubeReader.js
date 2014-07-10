Clazz.declarePackage ("J.adapter.readers.simple");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.simple.CubeReader", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.ac = 0;
this.isAngstroms = false;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.simple, "CubeReader", J.adapter.smarter.AtomSetCollectionReader);
$_V(c$, "initializeReader", 
function () {
this.asc.newAtomSet ();
this.readTitleLines ();
this.readAtomCountAndOrigin ();
this.readLines (3);
this.readAtoms ();
this.applySymmetryAndSetTrajectory ();
this.continuing = false;
});
$_M(c$, "readTitleLines", 
($fz = function () {
if (this.rd ().indexOf ("#JVXL") == 0) while (this.rd ().indexOf ("#") == 0) {
}
this.checkCurrentLineForScript ();
var name = this.line.trim ();
this.rd ();
this.checkCurrentLineForScript ();
this.asc.setAtomSetName (name + " - " + this.line.trim ());
}, $fz.isPrivate = true, $fz));
$_M(c$, "readAtomCountAndOrigin", 
($fz = function () {
this.rd ();
this.isAngstroms = (this.line.indexOf ("ANGSTROMS") >= 0);
var tokens = this.getTokens ();
if (tokens[0].charAt (0) == '+') tokens[0] = tokens[0].substring (1);
this.ac = Math.abs (this.parseIntStr (tokens[0]));
}, $fz.isPrivate = true, $fz));
$_M(c$, "readAtoms", 
($fz = function () {
var f = (this.isAngstroms ? 1 : 0.5291772);
for (var i = 0; i < this.ac; ++i) {
var tokens = J.adapter.smarter.AtomSetCollectionReader.getTokensStr (this.rd ());
this.setAtomCoordScaled (null, tokens, 2, f).elementNumber = this.parseIntStr (tokens[0]);
}
}, $fz.isPrivate = true, $fz));
});
