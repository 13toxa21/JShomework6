var display = document.getElementById('display');

var num = document.querySelectorAll('.number');
var operations = document.querySelectorAll('.operation');
var pointBtn = document.getElementById('point');
var cleanBtn = document.getElementById('clean');
var facorialBtn = document.getElementById('factorial');
var resultBtn = document.getElementById('result');

var sinBtn = document.getElementById('sinus');
var cosBtn = document.getElementById('cosinus');
var tgBtn = document.getElementById('tangens');
var ctgBtn = document.getElementById('catangens');
var powerBtn = document.getElementById('power');

var memoryCurrentNumber = '0'; //текущее значение введенное в табло
var memoryNewNumber = false; //отделение 1 и 2 чисел
var memoryPendingOperation = ''; //последняя сохраненная операция

for(var i = 0; i < num.length; i++){
    var number = num[i];
    number.addEventListener('click', function(e){
    getnumber(e.target.innerText); 
})
};

for(var i = 0; i < operations.length; i++){
    var operation = operations[i];
    operation.addEventListener('click', function(e){
        getoperation(e.target.innerText);
    })
};


//обработчики событий
cleanBtn.addEventListener('click', getclear);
pointBtn.addEventListener('click', getpoint);
facorialBtn.addEventListener('click', getfacorial);
sinBtn.addEventListener('click', getsinus);
cosBtn.addEventListener('click', getcosinus);
tgBtn.addEventListener('click', gettangens);
ctgBtn.addEventListener('click', getcatangens);
powerBtn.addEventListener('click', getpower);

function getnumber(number){
    if(memoryNewNumber){
        display.value = number;
        memoryNewNumber = false;
    } else{
        if(display.value === '0'){
        display.value = number;
    }
    else{
        display.value += number; 
        };
    };
};

function getoperation(op){
var localOperationMemory = display.value;

    if(memoryNewNumber && memoryPendingOperation !== '='){
        display.value = memoryCurrentNumber;
    } else{
        memoryNewNumber = true;
        if(memoryPendingOperation === '/'){
            if(localOperationMemory == 0){
                alert('на ноль делить нельзя!!!')
            }else{
                memoryCurrentNumber /= parseFloat(localOperationMemory); 
            }
        } else if(memoryPendingOperation === '-'){
            memoryCurrentNumber -= parseFloat(localOperationMemory);
        }
        else if(memoryPendingOperation === '*'){
            memoryCurrentNumber *= parseFloat(localOperationMemory);
        }
        else if(memoryPendingOperation === '+'){
            if(memoryCurrentNumber === 0.1 || 0.2 && localOperationMemory === 0.1 || 0.2){
                memoryCurrentNumber = memoryCurrentNumber + parseFloat(localOperationMemory);
                memoryCurrentNumber = memoryCurrentNumber.toFixed(1);
            }else{
                memoryCurrentNumber = memoryCurrentNumber + parseFloat(localOperationMemory);
                memoryCurrentNumber = display.value;
            }
        } 
        else if(memoryPendingOperation === '%'){
            memoryCurrentNumber %= parseFloat(localOperationMemory);
        }else{
            memoryCurrentNumber = parseFloat(localOperationMemory);
        }
        display.value = memoryCurrentNumber;
        memoryPendingOperation = op;
    };
};

//добавление точки
function getpoint(){
    var pointMemory = display.value;

    if(memoryNewNumber){
        pointMemory = '0.';
        memoryNewNumber = false;
    }else{
        if(pointMemory.indexOf('.') === -1){
            pointMemory += '.'; 
        }
    }
    display.value = pointMemory;
};


//очищение всего поля
function getclear(){
    display.value = '0';
};

function getfacorial() {
    var fackt = display.value;
    var x = 1;
    while (fackt > 1){
        x *= fackt;
        fackt -= 1;   
    }
    display.value = x;
};

function getsinus() {    
    display.value = Math.sin(display.value);
};

function getcosinus() {    
    display.value = Math.cos(display.value);
;}

function gettangens() {    
    display.value = Math.tan(display.value);
};

function getcatangens() {  
    x =  display.value;
    var tg = Math.tan(x);
    var ctg = 1 / tg;
    display.value = ctg;
};

function getpower() {    
    display.value = Math.pow(display.value, 2);
};
