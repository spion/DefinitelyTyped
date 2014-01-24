/// <reference path="bluebird.d.ts" />

import Promise = require('bluebird');

Promise.cast(8).then(x => console.log(x.toExponential()));

function delayer(time: number) {
    var d = Promise.defer<void>();
    setTimeout(_ => d.resolve, time);
    return d.promise;

}

delayer(100).then(function (val) { console.log('Hello, World!') });


Promise.delay(1000).then(_ => Promise.delay(1000));

Promise.delay(Promise.cast(8), 1000).then(x => x.toExponential());
Promise.delay(Promise.cast("asdf"), 1000).then(x => x.length);

var eventualAdd = Promise.method((a?: number, b?: number) => Promise.cast(a + b));

eventualAdd(1, 2).then(x => x.toExponential());

var eventualAdd2 = Promise.method((a?: number, b?: number) => a + b);

eventualAdd2(1, 2).then(x => x.toExponential());

var eventually = function (val:number) {
    //return Promise.cast(val);
    return Promise.delay<number>(1000).then(_ => val);
};

//var x:Promise<number[]> = Promise.all([1, 2, 3].map(eventually));
var x = Promise.all([1, 2, 3].map(eventually));

var y = x.then(a => a.map(x => x.toExponential()));

Promise.all([
    eventually(10),
    eventually(20)
]).spread(function (x, y) {
    console.log(x.toExponential(), y.toExponential());
    return 10;
}).then(function(val) {
    return val.toExponential()
}).done();


var promiseArray = [Promise.cast(1), Promise.cast(2), Promise.cast(3)]

var qPromiseArray = promiseArray.map(p => Promise.cast<number>(p));

var myNums: any[] = [2, 3, Promise.cast(4), 5, Promise.cast(6), Promise.cast(7)];

Promise.all(promiseArray).then(nums => nums.map(num => num.toPrecision(2)).join(','));

Promise.all<number>(myNums).then(nums => nums.map(Math.round));


declare function saveToDisk(): Promise<any>;
declare function saveToCloud(): Promise<any>;

Promise.settle([saveToDisk(), saveToCloud()])
    .spread(function (disk?, cloud?) {
        console.log(
            disk.isFulfilled(), 
            disk.isRejected(), 
            disk.isPending(), 
            disk.value(), 
            disk.error());
        return 10;
    }).then(function(a) {
        console.log(a.toExponential());
    }).done();


var xx = new Promise<number>((resolve, reject) => {
    resolve(5);
});
xx.inspect().value().toExponential();

