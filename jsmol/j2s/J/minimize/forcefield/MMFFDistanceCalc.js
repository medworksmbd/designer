Clazz.declarePackage ("J.minimize.forcefield");
Clazz.load (["J.minimize.forcefield.Calculation"], "J.minimize.forcefield.MMFFDistanceCalc", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.r0 = 0;
this.kb = 0;
this.delta2 = 0;
Clazz.instantialize (this, arguments);
}, J.minimize.forcefield, "MMFFDistanceCalc", J.minimize.forcefield.Calculation);
$_M(c$, "setData", 
function (calc, bond) {
this.ia = bond.data[0];
this.ib = bond.data[1];
var data = this.calcs.getParameterObj (bond);
if (data == null) return;
calc.addLast ([[this.ia, this.ib], data]);
}, "JU.List,J.minimize.MinBond");
$_V(c$, "compute", 
function (dataIn) {
this.getPointers (dataIn);
this.kb = this.dData[0];
this.r0 = this.dData[1];
this.calcs.setPairVariables (this);
this.delta = this.rab - this.r0;
this.delta2 = this.delta * this.delta;
this.energy = 71.96625 * this.kb * this.delta2 * (1 + -2.0 * this.delta + 2.3333333333333335 * (this.delta2));
if (this.calcs.gradients) {
this.dE = 71.96625 * this.kb * this.delta * (2 + 3 * -2.0 * this.delta + 4 * 2.3333333333333335 * this.delta2);
this.calcs.addForces (this, 2);
}if (this.calcs.logging) this.calcs.appendLogData (this.calcs.getDebugLine (0, this));
return this.energy;
}, "~A");
Clazz.defineStatics (c$,
"FSTRETCH", 71.96625,
"CS", -2.0,
"CS2", (2.3333333333333335));
});