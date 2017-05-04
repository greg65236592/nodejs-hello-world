var buf = new Buffer(256); 
var len = buf.write("Simply Easy Learning");

console.log("Octets written : "+  len);

console.log("Partial Content : "+  buf.toString('utf8',7,11)); // from index 7 to 11(excluded)

console.log("Content : "+  buf.toString()); // after index 20, will present init buffer data

console.log("To Json : "+ JSON.stringify(buf.toJSON()));

console.log("To Json data : "+ JSON.stringify(buf.toJSON().data));

var buffer1 = new Buffer('TutorialsPoint ');
var buffer2 = new Buffer('Simply Easy Learning');
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer concat content: " + buffer3.toString());


// Compare buffer
var buffer1 = new Buffer('AAAAA');
var buffer2 = new Buffer('ABCD');
var result = buffer1.compare(buffer2);

if(result < 0) {
   console.log(buffer1 +" comes before " + buffer2);
}else if(result == 0){
   console.log(buffer1 +" is same as " + buffer2);
}else {
   console.log(buffer1 +" comes after " + buffer2);
}

sourceBuffer = new Buffer(10);
targetBuffer = new Buffer(5); //shorter for purpuse

sourceBuffer.write('abcdefghijklmnop');
sourceBuffer.copy(targetBuffer);
console.log('Copied buffer content: ' + targetBuffer.toString());

console.log('Sliced buffer content: ' + targetBuffer.slice(1,3).toString());