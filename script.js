const inputSlider = document.querySelector("[data-lengthSlider]")
const lengthDisplay = document.querySelector("[data-lengthNumber]")

const passwordDisplay = document.querySelector("[data-passwordDisplay]")
const copyBtn  = document.querySelector("[data-copy]")
const copyMsg = document.querySelector("[data-copyMsg]")
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
let symbols = "!@#$%^&*()_+/*-?><:;}]{[~`,.";

let  password = ""
let passwordLength = 10;
let checkCount = 0;

handleSlider();
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerHTML = passwordLength;
    const min = inputSlider.min
    const max = inputSlider.max
    inputSlider.style.backgroundSize = ((passwordLength-min)*100/(max-min)) + "% 100%"
}
setIndicator("#ccc")
function setIndicator(color){
    indicator.style.backgroundColor = color;
    // indicator.style.box-shadow 
    indicator.style.boxShadow=`0 0 12px 1px ${color}`
}

function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min)) + min;
}
function getUppercase(){
      return String.fromCharCode(getRndInteger(65,91));
}
function getLowercase(){
    return String.fromCharCode(getRndInteger(97,123));
}
function getNumbers(){
    return getRndInteger(0,9);
}
function getSymbol(){
     return symbols.charAt(getRndInteger(0,symbols.length));
}
function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNumber = true;
    if(symbolsCheck.checked) hasSymbol = true;

    if(hasUpper && hasLower &&(hasSymbol || hasNumber) && passwordLength >=8)
    setIndicator("#0f0");
    else if((hasUpper || hasLower) && (hasNumber || hasSymbol) && passwordLength>=6)
    setIndicator("#ff0");
    else
    setIndicator("#f00");
}

async function copy(){
    if(password.length>0){
    try{
    await navigator.clipboard.writeText(passwordDisplay.value)
    copyMsg.innerText = "copied"}
    catch(e){
        copyMsg.innerText = "failed"
    }}
    copyMsg.classList.add("active")
    setTimeout(()=>{
        copyMsg.classList.remove("active")
    },2000)
}

inputSlider.addEventListener("input",(e)=>{
    passwordLength=e.target.value;
    handleSlider();
})

function handlecheckboxes(){
    checkCount = 0;
    allCheckBox.forEach((element)=>{
        if(element.checked) checkCount+=1;
    })
}
allCheckBox.forEach((checkbox) =>{
    checkbox.addEventListener("change",handlecheckboxes)
})
function shufflePassword(array){
    for(let i = array.length-1;i>0;i--)
    {
            const j =Math.floor(Math.random()*(i+1));
            const temp = array[i];
            array[i] = array[j];
            array[j]=temp;
    }
    let str = "";
    array.forEach((el)=>(str+=el))
    return str;
}
copyBtn.addEventListener("click",copy);
generateBtn.addEventListener("click",()=>{
    if(checkCount<=0) return;

    if(checkCount>passwordLength)
    {
        passwordLength=checkCount;
        handleSlider();
    }
    console.log("start");
    password = "";
    let funcarr = [];

    if(uppercaseCheck.checked)
    funcarr.push(getUppercase)

    if(lowercaseCheck.checked)
    funcarr.push(getLowercase)

    if(symbolsCheck.checked)
    funcarr.push(getSymbol)
    if(numbersCheck.checked)
    funcarr.push(getNumbers)

    for(let i =0;i<funcarr.length;i++)
    {
        password+=funcarr[i]();
    }
    console.log("1st")
    for(let i =0;i<passwordLength-funcarr.length;i++)
    {
        let index = getRndInteger(0,funcarr.length);
        password+=funcarr[index]();
    }
    console.log("2nd")
    password  = shufflePassword(Array.from(password));
    console.log("3rd")
    passwordDisplay.value  = password;
    calcStrength();
})