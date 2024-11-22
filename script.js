const screen = document.querySelector('.screen-div p');
const numbers = document.querySelectorAll('.numbers-div p');
const symbols = document.querySelectorAll('.symbols-div p');
const clean = document.querySelector('.c-div');
const equal = document.querySelector('.equal-sign');

clean.addEventListener('click',()=>{
    screen.textContent = '0';
});
numbers.forEach(number => {
    number.addEventListener('click',()=>{
        const value = number.textContent;
        const screenContent = screen.textContent;
        if(screenContent != '0'){
            screen.textContent += `${value}`;
        }else{
            screen.textContent = `${value}`;
        }
        
    });
});
symbols.forEach(symbol =>{
    symbol.addEventListener('click',()=>{
        const value = symbol.textContent;
        const screenContent = screen.textContent;
        screen.textContent += `${value}`;
    });
});
equal.addEventListener('click',()=>{
    screen.textContent = evaluate(screen.textContent);
});
function evaluate(text){
    const array = text.match(/(\d+(\.\d+)?|\+|\-|\/|\*)/g);
    const operands = [];
    const operators = [];
    function precedence(operator){
        if(operator === '*' || operator === '/')return 2;
        if(operator === '+' || operator === '-')return 1;
        return 0;
    }
    function calculate(operator, a , b){
        switch(operator){
            case '+':return a+b;
            case '-':return a-b;
            case '*':return a*b;
            case '/':return a/b;
            default: throw new Error("Invalid operator");
        }
    }
    for(let element of array){
        if(!isNaN(element))operands.push(Number(element));
        else{
            while(operators.length && (precedence(operators[operators.length-1]) >= precedence(element))){
                let operator = operators.pop();
                let b = operands.pop();
                let a = operands.pop();
                operands.push(calculate(operator,a,b));
            }
            operators.push(element);
        }
    }
    while(operators.length){
        let operator = operators.pop();
        let b = operands.pop();
        let a = operands.pop();
        operands.push(calculate(operator,a,b));
    }
    let result = operands.pop();
    if(result % 1 !== 0){
        result = result.toFixed(5);
    }
    return result;
};
