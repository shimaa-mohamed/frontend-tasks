const percentages=document.querySelectorAll("input[name='percentage']");
const bill=document.getElementById("bill");
const reset=document.getElementById("reset");
const custom=document.getElementById("custom");
const numberOfPeople=document.getElementById("numberOfPeople");
const form=document.querySelector("form");
const tipPerPerson=document.getElementById("tip-per-person");
const billPerPerson=document.getElementById("bill-per-person");
const billwrapper=document.getElementById("bill-wrapper");
const numberPeopleWrapper=document.getElementById("num-people-wrapper");
const customWrapper=document.getElementById("custom-wrapper");


// initial values
let totalTip=0;
let tipPerson=0;
let billPerson=0;


function calculator(totalBill,percentage,numberOfPeople){
    totalTip=totalBill*(percentage/100);
    tipPerson=totalTip/numberOfPeople;
    billPerson=totalBill/numberOfPeople;
}

function getPercentageValue(){
    let per=0;
    for (let i = 0; i < percentages.length; i++) {
        if(percentages[i].checked){
            per=percentages[i].value;
            break;
        }
    }
    return per;
}

function clearCheckRadioBtns(){
    for (let i = 0; i < percentages.length; i++) {
        percentages[i].checked=false;
    }
}

function validate(node,nodeWrapper){
    if(!node.checkValidity()){
        nodeWrapper.classList.add("error");
    }
    else{
        nodeWrapper.classList.remove("error");
    }
}

custom.addEventListener("input",()=>{
    if(custom.value.length>0){
        clearCheckRadioBtns();
    }
})

reset.addEventListener("click",()=>{
    tipPerPerson.innerHTML="$0.00";
    billPerPerson.innerHTML="$0.00";
    bill.value="";
    numberOfPeople.value="";
    clearCheckRadioBtns();
    custom.value="";
})

form.addEventListener("input",()=>{
    validate(bill,billwrapper);
    validate(numberOfPeople,numberPeopleWrapper);
    validate(custom,customWrapper);
    const totalBill=bill.value;
    const per= (custom.value.length>0)?custom.value:getPercentageValue();
    const numOfPeople=numberOfPeople.value;
    
    if(totalBill.length>0 && per.length>0 && numOfPeople.length>0){
        // console.log("safe");
        calculator(totalBill,per,numOfPeople);
        // console.log(tipPerson,billPerson);
        tipPerPerson.innerHTML=tipPerson;
        billPerPerson.innerHTML=billPerson;
    }
})

