Clazz.declarePackage ("J.minimize.forcefield");
Clazz.load (["J.minimize.forcefield.Calculation"], "J.minimize.forcefield.UFFDistanceCalc", ["J.minimize.forcefield.CalculationsUFF"], function () {
c$ = Clazz.decorateAsClass (function () {
this.r0 = 0;
this.kb = 0;
Clazz.instantialize (this, arguments);
}, J.minimize.forcefield, "UFFDistanceCalc", J.minimize.forcefield.Calculation);
$_V(c$, "setData", 
function (calc, ia, ib, bondOrder) {
this.calcs.parA = this.calcs.getParameter (this.calcs.minAtoms[ia].sType);
this.calcs.parB = this.calcs.getParameter (this.calcs.minAtoms[ib].sType);
this.r0 = J.minimize.forcefield.CalculationsUFF.calculateR0 (this.calcs.parA.dVal[0], this.calcs.parB.dVal[0], this.calcs.parA.dVal[8], this.calcs.parB.dVal[8], bondOrder);
this.kb = 1390.2842991599998 * this.calcs.parA.dVal[5] * this.calcs.parB.dVal[5] / (this.r0 * this.r0 * this.r0);
calc.addLast ([[ia, ib], [this.r0, this.kb, bondOrder]]);
}, "JU.List,~N,~N,~N");
$_V(c$, "compute", 
function (dataIn) {
this.getPointers (dataIn);
this.r0 = this.dData[0];
this.kb = this.dData[1];
this.calcs.setPairVariables (this);
this.delta = this.rab - this.r0;
this.energy = this.kb * this.delta * this.delta;
if (this.calcs.gradients) {
this.dE = 2.0 * this.kb * this.delta;
this.calcs.addForces (this, 2);
}if (this.calcs.logging) this.calcs.appendLogData (this.calcs.getDebugLine (0, this));
return this.energy;
}, "~A");
});