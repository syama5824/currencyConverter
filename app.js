const BASE_URL="https://v6.exchangerate-api.com/v6/2c2a7752fedfd15dcb94418b/latest";

const dropdown =document.querySelectorAll(".dropdown select");
const btn= document.querySelector("form button");
const msg=document.querySelector(".msg");

// for (code in countryList){
//     console.log(code,countryList[code]);
// };

for(let select of dropdown){
    for(currCode in countryList){
        let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if ((select.name === "from" && currCode === "USD")||(select.name === "to" && currCode === "INR")) {
        newOption.selected = "selected";
    }
    select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};
const updateMsg=(amtVal,fromCurr,finalAmt,toCurr)=>{
    msg.innerText=`${amtVal} ${fromCurr} = ${finalAmt} ${toCurr}`;
};

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate(); 
});

const updateExchangeRate= async ()=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal===" "||amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    const fromCurr=document.querySelector(".from select").value;
    const toCurr=document.querySelector(".to select").value;   
    console.log(fromCurr,toCurr);
    console.log(amtVal);
    const URL =`${BASE_URL}/${fromCurr}`;
    //console.log(URL);

    fetch(URL)
        .then(response=>{
            if(!response.ok){
                throw new Error('network response was not ok');
            }
            return response.json();
        })
        .then(data=>{
            console.log(data);
            const exchangerate=data.conversion_rates[toCurr];
            console.log(`exchange rate for ${toCurr} is ${exchangerate}`);
            let finalAmt=amtVal*exchangerate;
            updateMsg(amtVal,fromCurr,finalAmt,toCurr);
        })
        .catch(error=>{
            console.error('there was aproblem with fetch operation',error);
        })
}