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
        huwi: ".budget__expenses--percentage",
        containerDiv: ".container",
        expensePercentageLabel: ".item__percentage",
        dateLabel: ".budget__title--month"
    };
    var nodeListForeach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
          callback(list[i], i)
        };
      };

      var formatMoney = function(too, type){
        too = too + ""
        var x = too.split("").reverse().join("");
        var y = "";
        var count = 1;

        for(var i = 0; i < x.length; i++){
            y = y + x[i];
            if(count % 3 === 0 ) y = y + ",";
            count++;
        };

        var z = y.split("").reverse().join("");
        if(z[0] === ",") z = z.substr(1, z.length - 1);
        if( type === "inc"){ z = "+ " + z} else {z = "- " + z};
        
        return z;
      };
   
    return {
        displayDate: function (){
            var unuudur = new Date();
            document.querySelector(DOMstrings.dateLabel).textContent = unuudur.getFullYear()+ " оны " +unuudur.getMonth() + " сарын ";
        },
        getValues: function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseInt(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        displayPercentages: function(allPercentages) {
            var elements = document.querySelectorAll(
              DOMstrings.expensePercentageLabel
            );
      
            nodeListForeach(elements, function(el, index) {
              el.textContent = allPercentages[index] + "%";
            });
        },
        getDOMstrings: function(){
            return DOMstrings;
        },

        addListEm: function(item, type){
            // Orlogo zarlagiig aguulsan HTML iig beltgene
            var html, list;
            if(type === "inc"){
                list = DOMstrings.incomeList
                html ='<div class="item clearfix" id="inc-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete">            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>        </div></div>';
            }else{
                list = DOMstrings.expenseList
               html = ' <div class="item clearfix" id="exp-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div> '
            }
            // Ter HTML dotroo REPLACE ashiglan orlogo zarlagiin utguudiig uurchlunu
            html = html.replace("%id%", item.id);
            html = html.replace("$$DESCRIPTION$$", item.description);
            html = html.replace("$$VALUE$$", formatMoney(item.value, type));

            //  BEltgesen html ee dom ruu hiij ugnu
            document.querySelector(list).insertAdjacentHTML("beforeend", html);
        },
        deleteListItem: function(id){
            var el = document.getElementById(id);
            el.parentNode.removeChild(el);
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
            if( tusuv.tusuv > 0 ) type = "inc"
            else type = "exp"
            document.querySelector(DOMstrings.tusuv).textContent = formatMoney(tusuv.tusuv, type);
            document.querySelector(DOMstrings.Orlogo).textContent = formatMoney(tusuv.niitOrlogo, "inc");
            document.querySelector(DOMstrings.Zarlaga).textContent = formatMoney(tusuv.niitZarlaga, "exp");
            document.querySelector(DOMstrings.huwi).textContent = tusuv.huvi + "%";

        },

        changeType: function(){
          var filds =   document.querySelectorAll(DOMstrings.inputType + ", " + DOMstrings.inputDescription + " ," + DOMstrings.inputValue);
            nodeListForeach(filds, function(el){
                el.classList.toggle("red-focus");
                document.querySelector(DOMstrings.addBtn).classList.toggle("red");
            });
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
        this.perc = -1;
      };
      Expense.prototype.calcPercentage = function(niitZar){
        if(niitZar > 0)
        this.perc = Math.round((this.value / niitZar) * 100);
        else this.perc = 0;
      };
      Expense.prototype.getPercentage = function(){
        return this.perc;
    }
    var calculate = (type) => {
        var sum = 0;
        data.items[type].forEach(function (el) {
            sum = sum + el.value;
        });

        data.totals[type] = sum;
    };
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
        calculatePercentages: function(){
            data.items.exp.forEach(function(el){
                el.calcPercentage(data.totals.inc);
        });
        },
        getPercentages: function(){
            var allPercentages = data.items.exp.map(function(el){
                return el.getPercentage();
            })
            return allPercentages;
        },
        tusviigTootsooloh(){
            calculate("inc");
            calculate("exp");
            data.tusuv = data.totals.inc - data.totals.exp;

            if(data.totals.inc > 0){
                data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
            }else{
                data.huvi = 0;
            }
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
        deleteItem: function(type, id){
            var ids = data.items[type].map(function(el){
                return el.id;
            });
            var index = ids.indexOf(id);
            if(index !== -1)
            {
                data.items[type].splice(index, 1);
            };
        },

        seeData: function(){
            return data;
        }
      }
})();

// programmin holbogch controller™™
var appController = (function(uiController, financeController){
    


     var updateTusuv = function(){
    
        financeController.tusviigTootsooloh();
        
        var tusuv = financeController.tusuvAvah();
        
        uiController.TusviigUzuuleh(tusuv);

        financeController.calculatePercentages();

        var allPercentages = financeController.getPercentages();

        uiController.displayPercentages(allPercentages);
    };
    function ctrlAddItem() {
        // 1. Oruulah ugugdliig olj awna
        var input = uiController.getValues();
        
        if (input.description !== "" && input.value !== "") {
        var item = financeController.addItem(
          input.type,
          input.description,
          input.value
        );
  
        uiController.addListEm(item, input.type);
        uiController.clearFields();
  
        updateTusuv();
      }
    };
    
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

        document.querySelector(ds.containerDiv).addEventListener("click", function(event){
            var id = event.target.parentNode.parentNode.parentNode.parentNode.id
            if(id){
                var arr = id.split("-");
                var type = arr[0];
                var itemId = parseInt(arr[1]);
                // console.log(type + "=====>" + itemId );
                // 1. Sanhuugiin modulaas type bolon id g ashiglaj orlogo zarlagaiig ustagna
                financeController.deleteItem(type, itemId);
                // 2. orlogo zarlagaiig delgetsnees usstgana.
                uiController.deleteListItem(id);
                // 3. tusviin toosoog shinevhilene.
                updateTusuv();
            }
        });
        document.querySelector(ds.inputType).addEventListener("change", uiController.changeType)
    }
    return{
        init: function(){
            uiController.displayDate();
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