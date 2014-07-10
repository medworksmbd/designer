Clazz.declarePackage ("JU");
Clazz.load (["JU.DataReader"], "JU.ArrayDataReader", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.data = null;
this.pt = 0;
this.len = 0;
Clazz.instantialize (this, arguments);
}, JU, "ArrayDataReader", JU.DataReader);
$_V(c$, "setData", 
function (data) {
this.data = data;
this.len = this.data.length;
return this;
}, "~O");
$_V(c$, "read", 
function (buf, off, len) {
return this.readBuf (buf, off, len);
}, "~A,~N,~N");
$_V(c$, "readLine", 
function () {
return (this.pt < this.len ? this.data[this.pt++] : null);
});
$_M(c$, "mark", 
function (ptr) {
this.ptMark = this.pt;
}, "~N");
$_V(c$, "reset", 
function () {
this.pt = this.ptMark;
});
});
