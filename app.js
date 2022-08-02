// (function(){
//     console.log("amjilt ireeduig buteetsgeey!!!")
// })();
// (function(){
//     console.log("amjilt ireeduig buteetsgeey!!!")
// })();


// Delgetstei ajillah controller;
var uiController = (function(){
    var x = 100;
    function add(y){
        return x + y;
    }
    return {
        publicAdd: function(a){
            a = add(a);
            console.log(" Bolowsruulsan utga = " + a)
        }
    }
})();

// Sanhuutrei holbogdoh contoroller
var financeController = (function(){})();

// programmin holbogch controller™™
var appController = (function(){
    document.querySelector(".add__btn").addEventListener("click", function(){
        // 1. Oruulah ugugdliig olj awna
        console.log("Delgetsees ugugdul awah heseg ");
        // 2.Olj awsan ugugdliig olj awna
        // 3. Olj awsan ugdluudee web deeree tohiroh hesegt gargana.
        // 4. Tuswiig tootsoolno
        // 5. Etssiin ukdegdel tootsoog delgetsendeer garganA. 
    });
    document.addEventListener("keypress", function(event){
        if( keycode === 13 || event.which === 13){
            console.log
        }
    })
})(uiController, financeController);