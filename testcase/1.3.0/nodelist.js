var NodeList = KISSY.NodeList;

//console.log('NodeList.all', NodeList.all);
var parent = NodeList.all('.dom-father');
console.log('parent', parent);
console.log('parent.text()', parent.text());
console.log('parent.lengthx', parent.lengthx);
var children = parent.all('div');
console.log('children', children);
console.log('children.text()', children.text());
console.log('children.lengthx', children.lengthx);

// var parent = NodeList('<div>html</div>');
// console.log('ctor', parent);
// var child = parent.all('div');
// console.log('child', child);
