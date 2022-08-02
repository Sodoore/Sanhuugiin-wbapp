// (function(){
//     console.log("amjilt ireeduig buteetsgeey!!!")
// })();
// (function(){
//     console.log("amjilt ireeduig buteetsgeey!!!")
// })();


// Delgetstei ajillah controller;
var uiController = (function(){
    var DOMstrings =  {
        inputType : ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn"
    };
    return {
        getValues: function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                Value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: function(){
            return DOMstrings;
        }
    };
})();

// Sanhuutrei holbogdoh contoroller
var financeController = (function(){})();

// programmin holbogch controller™™
var appController = (function(uiController, financeController){
    
    function ctrlAddItem() {
        // 1. Oruulah ugugdliig olj awna
        console.log(uiController.getValues());
        // 2.Olj awsan ugugdliig olj awna
        // 3. Olj awsan ugdluudee web deeree tohiroh hesegt gargana.
        // 4. Tuswiig tootsoolno
        // 5. Etssiin ukdegdel tootsoog delgetsendeer garganA. 
    }
    var setupEventListener = function(){

        var ds = uiController.getDOMstrings();

        document.querySelector( ds.addBtn ).addEventListener("click", function(){
            ctrlAddItem();
        });
        document.addEventListener("keypress", function(event){
            if( event.keycode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
    }
    return{
        init: function(){
            setupEventListener()
        }
    }
})(uiController, financeController);

appController.init();