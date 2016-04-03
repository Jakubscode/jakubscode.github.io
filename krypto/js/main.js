function MsgCoder() {
    var encodeSub = document.querySelector('#encode');
    var decodeSub = document.querySelector('#decode');
    var output = document.querySelector('#output');
    var msgToEnc = document.querySelector('#msgToEncode');
    var msgToDec = document.querySelector('#msgToDecode');
    var keyTag = document.querySelector('#key');
    
    var getBin = function(value) {
        console.log(value);
        var res = "";
        for (var i = 0; i < 4; i++) {
            res = value%2 + res;
            value= ~~(value / 2);
        }
        return res;
    }
    var getDec = function(value) {
        var res=0;
        var pow = 3;
        for (var i = 0; i < 4; i++){
            res+= value.charAt(i) * Math.pow(2,pow--);
        }
        return res;
    }
    var getBcd = function(value) {
        var res = "";
       // console.log('getBcd value', value);
        for (var i = 0; i < 3; i++) {
            res = getBin(value%10) + res;
            console.log(res);
            value= ~~(value/10);
        }
        //console.log('getBcd res', res);
        return res;
    }
    var getCharCode = function(value) {
        var res = "";
        for (var i = 0; i < 9; i+=4) {
            res += getDec(value.substr(i,4));
        }
        return res;
    }
    var XOR = function(value,key) {
        var res="";
        for (var i = 0; i < value.length; i++) 
            res+= value.charAt(i) ^ key.charAt(i % key.length)
        return res;
    }
    var encode = function() {
        var key = keyTag.value;
        var val = msgToEnc.value;
        var response = "";
        for (var i = 0; i < val.length; i++) {
            response += getBcd(val.charCodeAt(i));
        }
        console.log("response " + response);
        console.log("response after XOR "+ XOR(response,key));
        output.value = XOR(response,key);
    }
    var decode = function() {
        var key = keyTag.value;
        var val = msgToDec.value;
        var response = "";
        val = XOR(val,key);
        for (var i = 0; i < val.length; i+=12) {
            console.log("substr ",val.substr(i,12))
            console.log("charCodes " + getCharCode(val.substr(i,12)));
            response += String.fromCharCode(getCharCode(val.substr(i,12)));
        }
        output.value = response;
    }
    this.toDec = getDec;
    this.getCharCode = getCharCode;
    encodeSub.addEventListener('click',encode);
    decodeSub.addEventListener('click',decode);
    
}
var coder = new MsgCoder();