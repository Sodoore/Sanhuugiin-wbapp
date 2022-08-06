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
        addBtn: ".add__btn",
        incomeList: ".income__list",
        expenseList: ".expenses__list",
        tusuv: ".budget__value",
        Orlogo: ".budget__income--value",
        Zarlaga: ".budget__expenses--value",
        huwi: ".budget__expenses--percentage"
    };
    return {
        getValues: function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseInt(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        getDOMstrings: function(){
            return DOMstrings;
        },

        addListEm: function(item, type){
            // Orlogo zarlagiig aguulsan HTML iig beltgene
            var html, list;
            if(type === "inc"){
                list = DOMstrings.incomeList
                html ='<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete">            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>        </div></div>';
            }else{
                list = DOMstrings.expenseList
               html = ' <div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div> '
            }
            // Ter HTML dotroo REPLACE ashiglan orlogo zarlagiin utguudiig uurchlunu
            html = html.replace("%id%", item.id)
            html = html.replace("$$DESCRIPTION$$", item.description)
            html = html.replace("$$VALUE$$", item.value)

            //  BEltgesen html ee dom ruu hiij ugnu
            document.querySelector(list).insertAdjacentHTML("beforeend", html);
        },
        clearFields: function(){

           var fields =  document.querySelectorAll(DOMstrings.inputDescription + ", " + DOMstrings.inputValue);
           var fieldsArr = Array.prototype.slice.call(fields);
           fieldsArr.forEach(function(el, index, array) {
             el.value = "";
           });
           fieldsArr[0].focus();
           
        },
        TusviigUzuuleh: function(tusuv){
            document.querySelector(DOMstrings.tusuv).textContent = tusuv.tusuv;
            document.querySelector(DOMstrings.Orlogo).textContent = tusuv.niitOrlogo;
            document.querySelector(DOMstrings.Zarlaga).textContent = tusuv.niitZarlaga;
            document.querySelector(DOMstrings.huwi).textContent = tusuv.huvi + "%";

        }
    };
})();

// Sanhuutrei holbogdoh contoroller
var financeController = (function(){
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
      };
    
      var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
      };
    var calculate = (type) => {
        var sum = 0;
        data.items[type].forEach(function (el) {
            sum = sum + el.value;
        });

        data.totals[type] = sum;
    }
      var data = {
        items: {
          inc: [],
          exp: []
        },
    
        totals: {
          inc: 0,
          exp: 0
        },
        tusuv: 0,
        huvi: 0
      };
      return{
        tusviigTootsooloh(){
            calculate("inc");
            calculate("exp");

            data.tusuv = data.totals.inc - data.totals.exp

            data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);

        },

        tusuvAvah(){
            return{
               tusuv: data.tusuv,
               huvi: data.huvi,
               niitOrlogo: data.totals.inc,
               niitZarlaga: data.totals.exp
            }
        },
        addItem: function(type, desc, val){

            var item, id;

            // orlogo zarlaguudad hargalzah id-g onoono
            if (data.items[type].length === 0) id = 1;
        else {
          id = data.items[type][data.items[type].length - 1].id + 1;
        }

            // sanhuugiin moduliin itemsiin orlogo zarlagiig hadgalah massived hiih object oo uusgej baina
            if(type === "inc"){
                item = new Income(id, desc, val);
            }else{
                item = new Expense(id, desc, val);
            }

            data.items[type].push(item);
            return item;
        },
      }
})();

// programmin holbogch controller™™
var appController = (function(uiController, financeController){
    
        function ctrlAddItem() {
        // 1. Oruulah ugugdliig olj awna
        var input = uiController.getValues();
        
        if(input.description !== "" && input.value !== "" ){
        // 2.Olj awsan ugugdliig olj awna
        var item = financeController.addItem(input.type, input.description, input.value);

        // 3. Olj awsan ugdluudee web deeree tohiroh hesegt gargana.
        uiController.addListEm(item, input.type);
        uiController.clearFields();

        // 4. Tuswiig tootsoolno
        financeController.tusviigTootsooloh();

        // 5. Etssiin ukdegdel tootsoolno
        var tusuv = financeController.tusuvAvah();

        // 6. delgetsendeer garganA. 
        uiController.TusviigUzuuleh(tusuv);
        }
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
            setupEventListener();
            uiController.TusviigUzuuleh({
                tusuv: 0,
                huvi: 0,
                niitOrlogo: 0,
                niitZarlaga: 0
            })
        }
    }
})(uiController, financeController);

appController.init();