const addBtn = document.querySelector(".add");

const input = document.querySelector(".inp-group");

function removeInput(){
    this.parentElement.remove();
}

function addInput(){
    const nota = document.createElement("input");
    nota.type = "number";
    nota.placeholder = '"Exemplo: 7.8"';
    nota.className = "nota-gap";

    const peso = document.createElement("input");
    peso.type = "number";
    peso.placeholder = '"Exemplo: 2"';
    peso.className = "peso-gap";

    const btn = document.createElement("a");
    btn.className = "delete";
    btn.innerHTML = "&times";

    btn.addEventListener("click", removeInput);

    const flex = document.createElement("div");
    flex.className = "flex";

    input.appendChild(flex);
    flex.appendChild(nota);
    flex.appendChild(peso);
    flex.appendChild(btn);
}

(function(){
   addInput();
   addInput();
})();

addBtn.addEventListener("click", addInput);

function calculateValues() {
    let pesos = document.querySelectorAll('.peso-gap');
    let somaPesos = 0;

    for (let i = 0; i < pesos.length; i++) {
        let peso = parseFloat(pesos[i].value);

        if (!isNaN(peso)){
            somaPesos += peso;
        }
    }

    let total = [];
    let firstBar = document.querySelectorAll('.nota-gap');
    let secondBar = document.querySelectorAll('.peso-gap');

    for (let i = 0; i < firstBar.length; i++) {
        let nota = parseFloat(firstBar[i].value);
        let peso = parseFloat(secondBar[i].value);
        
        if (!isNaN(peso) && !isNaN(nota)) {
            total.push(nota * peso);
        }
    }
    return {total: total, somaPesos: somaPesos};
}

const buttonShow = document.querySelector('.btn-show');

buttonShow.addEventListener("click", function() {
    let pesos = document.querySelectorAll('.peso-gap');
    let notas = document.querySelectorAll('.nota-gap');

    let camposVazios = false;

    for (let i = 0; i < pesos.length; i++) {
        if ((pesos[i].value.trim() === '') || (notas[i].value.trim() === '')) {
            camposVazios = true;
            break;
        }
    }

    if (camposVazios) {
        alert("Verifique se há campos vazios ou com valores inválidos.");
        return;
    }

    let {total, somaPesos} = calculateValues();

    let arraySum = total.reduce((acc, curr) => acc + curr, 0);
    let resultadoFinal = arraySum / somaPesos;

    resultadoFinal = resultadoFinal.toFixed(2);

    let resultNumber = document.getElementById("result-number");
    resultNumber.innerHTML = resultadoFinal;
});