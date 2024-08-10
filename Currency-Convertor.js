// const flagImageUrl = "https://flagsapi.com/US/flat/64.png"; // Replace country code to get flag of respective country
const BaseUrl = "https://open.er-api.com/v6/latest/";

const amountInp = document.querySelector("#amountInp");
const fromCurrency = document.querySelector("#from-select");
const toCurrency = document.querySelector("#to-select");
const dropdowns = document.querySelectorAll(".dropdown-container select");
const conversionMsg = document.querySelector("#msg-conversion");
const btn = document.querySelector("button");
const switchIcon = document.querySelector("i");

const updateFlag = (targetSelect) => {
    let currCode = targetSelect.value;
    let countryCode = countryList[currCode];
    let customFlagUrl = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let targetImage = targetSelect.parentElement.querySelector("img");
    targetImage.src = customFlagUrl;
}

function updateExchangeMsg(amountEntered, excAmount, fromCurrCode, toCurrCode){
    conversionMsg.innerText = `${amountEntered} ${fromCurrCode} = ${excAmount} ${toCurrCode}`;
}

const updateExchangeRate = async () => {
    let fromCurrCode = fromCurrency.value;
    let toCurrCode = toCurrency.value;
    let updatedBaseUrl = `${BaseUrl}${fromCurrCode}`;

    let response = await fetch(updatedBaseUrl);
    let data = await response.json();
    let rates = data["rates"];
    console.log(rates);
    let toRate = rates[toCurrCode];
    console.log(toRate);
    let amountEntered = amountInp.value;
    let excAmount = amountEntered * toRate;

    updateExchangeMsg(amountEntered, excAmount, fromCurrCode, toCurrCode);
}

for(let select of dropdowns){
    for(currCode in countryList){ // for(let key in value)
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "PKR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    })
}

btn.addEventListener("click", (event) => {
    event.preventDefault();
    updateExchangeRate();
});

switchIcon.addEventListener("click", () => {
    let temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    updateFlag(fromCurrency);
    updateFlag(toCurrency);
})

window.addEventListener("load", () => {
    updateExchangeRate();
})