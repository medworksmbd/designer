Clazz.declarePackage ("J.adapter.readers.more");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.more.GromacsReader", ["java.lang.Float", "JU.P3", "J.adapter.smarter.Atom", "J.api.JmolAdapter", "JW.Logger"], function () {
c$ = Clazz.declareType (J.adapter.readers.more, "GromacsReader", J.adapter.smarter.AtomSetCollectionReader);
$_V(c$, "initializeReader", 
function () {
this.asc.newAtomSet ();
this.setIsPDB ();
});
$_V(c$, "checkLine", 
function () {
this.checkCurrentLineForScript ();
this.asc.setAtomSetName (this.line.trim ());
this.readAtoms ();
this.readUnitCell ();
this.continuing = false;
return false;
});
$_M(c$, "readAtoms", 
($fz = function () {
var modelAtomCount = this.parseIntStr (this.rd ());
for (var i = 0; i < modelAtomCount; ++i) {
this.rd ();
var len = this.line.length;
if (len != 44 && len != 68) {
JW.Logger.warn ("line cannot be read for GROMACS atom data: " + this.line);
continue;
}var atom =  new J.adapter.smarter.Atom ();
atom.sequenceNumber = this.parseIntRange (this.line, 0, 5);
this.setAtomName (atom, this.parseTokenRange (this.line, 5, 9).trim (), this.line.substring (11, 15).trim ());
atom.atomSerial = this.parseIntRange (this.line, 15, 20);
atom.x = this.parseFloatRange (this.line, 20, 28) * 10;
atom.y = this.parseFloatRange (this.line, 28, 36) * 10;
atom.z = this.parseFloatRange (this.line, 36, 44) * 10;
if (Float.isNaN (atom.x) || Float.isNaN (atom.y) || Float.isNaN (atom.z)) {
JW.Logger.warn ("line cannot be read for GROMACS atom data: " + this.line);
atom.set (0, 0, 0);
}this.setAtomCoord (atom);
atom.elementSymbol = this.deduceElementSymbol (atom.group3, atom.atomName);
if (!this.filterAtom (atom, i)) continue;
atom.isHetero = false;
this.asc.addAtom (atom);
if (len < 69) continue;
var vx = this.parseFloatRange (this.line, 44, 52) * 10;
var vy = this.parseFloatRange (this.line, 52, 60) * 10;
var vz = this.parseFloatRange (this.line, 60, 68) * 10;
if (Float.isNaN (vx) || Float.isNaN (vy) || Float.isNaN (vz)) continue;
this.asc.addVibrationVector (atom.index, vx, vy, vz);
}
}, $fz.isPrivate = true, $fz));
$_M(c$, "setAtomName", 
($fz = function (atom, gname, aname) {
atom.atomName = aname;
if (gname.equals ("SOL") && aname.length == 3 && "OW1;HW2;HW3".indexOf (aname) >= 0) gname = "WAT";
atom.group3 = gname;
}, $fz.isPrivate = true, $fz), "J.adapter.smarter.Atom,~S,~S");
$_M(c$, "deduceElementSymbol", 
function (group3, atomName) {
if (atomName.length <= 2 && group3.equals (atomName)) return atomName;
var ch1 = (atomName.length == 4 ? atomName.charAt (0) : '\0');
var ch2 = atomName.charAt (atomName.length == 4 ? 1 : 0);
var isHetero = J.api.JmolAdapter.isHetero (group3);
if (J.adapter.smarter.Atom.isValidElementSymbolNoCaseSecondChar2 (ch1, ch2)) return (isHetero || ch1 != 'H' ? "" + ch1 + ch2 : "H");
if (J.adapter.smarter.Atom.isValidElementSymbol (ch2)) return "" + ch2;
if (J.adapter.smarter.Atom.isValidElementSymbol (ch1)) return "" + ch1;
return "Xx";
}, "~S,~S");
$_M(c$, "readUnitCell", 
($fz = function () {
if (this.rd () == null) return;
var tokens = J.adapter.smarter.AtomSetCollectionReader.getTokensStr (this.line);
if (tokens.length < 3 || !this.doApplySymmetry) return;
var a = 10 * this.parseFloatStr (tokens[0]);
var b = 10 * this.parseFloatStr (tokens[1]);
var c = 10 * this.parseFloatStr (tokens[2]);
this.setUnitCell (a, b, c, 90, 90, 90);
this.setSpaceGroupName ("P1");
var atoms = this.asc.atoms;
var pt = JU.P3.new3 (0.5, 0.5, 0.5);
for (var i = this.asc.ac; --i >= 0; ) {
this.setAtomCoord (atoms[i]);
atoms[i].add (pt);
}
}, $fz.isPrivate = true, $fz));
});
