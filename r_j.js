// var a = "123456789";

// var x = a.split("").reverse().join("")
// console.log(x);

// var y = "";
// var count = 1;
// for(var i = 0; i < x.length; i++){
//     y = y + x[i];
//     if(count % 3 === 0 ){ y = y + ","};
//     count ++;
// };

// console.log("dwd=="+ y);

// var z = y.split("").reverse().join("");
// if(z[0] === ",") z = z.substring(1, z.length-1);
// console.log(z);

    //  var a = "123456789"
    // var x = a.split("").reverse().join("")

    // var y = "";
    // var count = 1;
    // for(var i = 0; i < x.length; i++){
    //     y = y + x[i];
    //     if(count % 3 === 0 ){ y = y + ","};
    //     count ++;
    // };

    // var z = y.split("").reverse().join("");
    // if(z[0] === ",") z = z.substring(1, z.length-1);
    // // if( type === inc) z = "+ " + z 
    // // else z = "- " + z
    // // return z
    // console.log(z);

    var formatMoney = function(too, type) {
        too = "" + too;
        var x = too
          .split("")
          .reverse()
          .join("");
    
        var y = "";
        var count = 1;
    
        for (var i = 0; i < x.length; i++) {
          y = y + x[i];
    
          if (count % 3 === 0) y = y + ",";
          count++;
        }
    
        var z = y
          .split("")
          .reverse()
          .join("");
    
        if (z[0] === ",") z = z.substr(1, z.length - 1);
    
        if (type === "inc") z = "+ " + z;
        else z = "- " + z;
    
        return z;
      };