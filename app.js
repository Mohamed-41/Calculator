const operations = document.querySelectorAll(".operation");
const numbers = document.querySelectorAll(".number");
const topN = document.querySelector(".topN");
const bottomN = document.querySelector(".bottomN");
const lastNum = document.querySelector(".lastNum");
const calc = document.querySelector(".calc");
const del = document.querySelector(".del");
const c = document.querySelector(".c");
const ac = document.querySelector(".ac");
const equal = document.querySelector(".equal");
const dot = document.querySelector(".dot");
const btn = document.querySelectorAll(".btn");
const mode = document.querySelector(".mode");

let lastAnswer;
let action;
let answer;

ac.addEventListener("click", () => {
    topN.innerText = "";
    bottomN.innerText = "";
    lastNum.innerText = "";
});

c.addEventListener("click", () => {
    bottomN.innerText = "";
});

del.addEventListener("click", () => {
    bottomN.innerText = bottomN.innerText.slice(0, -1);
});

numbers.forEach((num) => {
    num.addEventListener("click", () => {
        if (num.innerText == "0" && !bottomN.innerText) return;
        else if (!isNaN(topN.innerText.slice(-1)) && lastNum.innerText) ac.click();
        lastNum.innerText = "";
        bottomN.innerText += num.innerText;
    });
});

dot.addEventListener("click", () => {
    if (!isNaN(topN.innerText.slice(-1)) && lastNum.innerText) ac.click();

    if (bottomN.innerText && !bottomN.innerText.includes(".")) bottomN.innerText += ".";
    else if (!bottomN.innerText) {
        bottomN.innerText += "0.";
        lastNum.innerText = "";
    }
});

operations.forEach((operation) => {
    operation.addEventListener("click", () => {
        action = (isNaN(topN.innerText.slice(-1)))? topN.innerText.slice(-1) :operation.innerText;
        // make the operation
        if (topN.innerText && bottomN.innerText) {

            lastAnswer = window.eval(lastAnswer + action + bottomN.innerText);
            topN.innerText += " " + bottomN.innerText + " " + operation.innerText;
            lastNum.innerText = lastAnswer;
            bottomN.innerText = "";

            action = operation.innerText;
        }
        // change operation
        else if (topN.innerText && !bottomN.innerText) {
            if (isNaN(topN.innerText.slice(-1))) topN.innerText = topN.innerText.slice(0, -1) + operation.innerText;
            else topN.innerText += " " + operation.innerText;
        }
        //
        else if (bottomN.innerText) {
            topN.innerText += " " + bottomN.innerText + " " + operation.innerText;
            lastAnswer = bottomN.innerText;
            bottomN.innerText = "";
            action = topN.innerText.slice(-1);
        }

        if (topN.innerText.length >= 25) less();
    });
});


equal.addEventListener("click", () => {
    if (!topN.innerText) {
        return;
    } else if (!isNaN(topN.innerText.slice(-1))) {

        topN.innerText += " " + action + " " + answer;
        lastAnswer = window.eval(lastAnswer + action + answer);
        lastNum.innerText = lastAnswer;
        bottomN.innerText = "";
    } else {

        action = topN.innerText.slice(-1);

        answer = bottomN.innerText;

        lastAnswer = window.eval(lastAnswer + action + bottomN.innerText);
        topN.innerText += " " + bottomN.innerText;
        lastNum.innerText = lastAnswer;
        bottomN.innerText = "";
    }

    if (topN.innerText.length >= 25) less();
});


const less = () => {
    if (isNaN(topN.innerText.slice(-1))) {
        topN.innerText = lastAnswer + " " + action;
    } else {
        topN.innerText = lastAnswer;
    }
};

btn.forEach((b) => {
    b.addEventListener("mouseover", () => {
        b.style.filter = "brightness(.7)";
    });
    b.addEventListener("mouseleave", () => {
        b.style.filter = "brightness(1)";
    });
});

mode.addEventListener("click", () => {
    mode.classList.toggle("active");
    if (mode.classList.contains("active")) {
        document.documentElement.style.setProperty('--color-text', '#ecf4f3');
        document.documentElement.style.setProperty('--color-btns', '#1e5f74');
        document.documentElement.style.setProperty('--color-calc', '#133b5c');
        document.documentElement.style.setProperty('--color-bg', '#1d2d50');
    } else {
        document.documentElement.style.setProperty('--color-text', '#152415');
        document.documentElement.style.setProperty('--color-btns', '#fff');
        document.documentElement.style.setProperty('--color-calc', '#f1f1f1');
        document.documentElement.style.setProperty('--color-bg', '#ecf4f3');
    }
    
})

// Key DOWN
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "1":
        case "2":
        case "3":
            numbers[Number(e.key) + 5].click();
            numbers[Number(e.key) + 5].style.filter = "brightness(.7)";
            break;
        case "4":
        case "5":
        case "6":
            numbers[Number(e.key) - 1].click();
            numbers[Number(e.key) - 1].style.filter = "brightness(.7)";
            break;
        case "7":
        case "8":
        case "9":
            numbers[Number(e.key) - 7].click();
            numbers[Number(e.key) - 7].style.filter = "brightness(.7)";
            break;
        case "0":
            numbers[9].click();
            numbers[9].style.filter = "brightness(.7)";
            break;
        case "Backspace":
            del.click();
            del.style.filter = "brightness(.7)";
            break;
        case "Delete":
            ac.click();
            ac.style.filter = "brightness(.7)";
            break;
        case "/":
            operations[0].click();
            operations[0].style.filter = "brightness(.7)";
            break;
        case "*":
            operations[1].click();
            operations[1].style.filter = "brightness(.7)";
            break;
        case "-":
            operations[2].click();
            operations[2].style.filter = "brightness(.7)";
            break;
        case "+":
            operations[3].click();
            operations[3].style.filter = "brightness(.7)";
            break;
        case "=":
        case "Enter":
            equal.click();
            equal.style.filter = "brightness(.7)";
            break;
        case ".":
            dot.click();
            dot.style.filter = "brightness(.7)";
            break;
    }
});

// Key UP 
document.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "1":
        case "2":
        case "3":
            numbers[Number(e.key) + 5].style.filter = "brightness(1)";
            break;
        case "4":
        case "5":
        case "6":
            numbers[Number(e.key) - 1].style.filter = "brightness(1)";
            break;
        case "7":
        case "8":
        case "9":
            numbers[Number(e.key) - 7].style.filter = "brightness(1)";
            break;
        case "0":
            numbers[9].style.filter = "brightness(1)";
            break;
        case "Backspace":
            del.style.filter = "brightness(1)";
            break;
        case "Delete":
            ac.style.filter = "brightness(1)";
            break;
        case "/":
            operations[0].style.filter = "brightness(1)";
            break;
        case "*":
            operations[1].style.filter = "brightness(1)";
            break;
        case "-":
            operations[2].style.filter = "brightness(1)";
            break;
        case "+":
            operations[3].style.filter = "brightness(1)";
            break;
        case "=":
        case "Enter":
            equal.style.filter = "brightness(1)";
            break;
        case ".":
            dot.style.filter = "brightness(1)";
            break;
    }
});