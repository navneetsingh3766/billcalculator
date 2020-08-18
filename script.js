var submitButton = document.getElementById("submit");
var addItemInput = document.getElementById("inputPrice");
var ul = document.getElementById("ul")
// new get elements
var realPriceE = document.getElementById("realPrice")
var rawPriceE = document.getElementById("rawPrice")
var gstE = document.getElementById("gst")
var finalPriceE = document.getElementById("finalPrice")
// list of models
var sel = document.getElementById("list");
// check bos
var checkBox = document.getElementById("checkBox");
// number of picec
var piece = document.getElementById("piece");
// price without gst section
var pricePera = document.getElementById("pricePera");

//make enter price in round figure
const roundedPrice = (priceStr)=>parseFloat(priceStr).toFixed(2);

// get the pieces of models
const getPiece = ()=> Number(piece.options[piece.selectedIndex].value);


// function for adding 18% GST when price is without GST
function calAddingGST18(enterRate) {
    let answer2 = roundedPrice(enterRate);
    return ((answer2 / 100 )*18).toFixed(2);
}

// when price with gst
function priceWithoutGST(price){
    let ans = ((price/118)*100);
    return ans;
}
// function that change prices
function priceChange(enterRate) {
    let raw = rawPriceE.innerHTML = roundedPrice(enterRate*getPiece());
    let gst = gstE.innerHTML = calAddingGST18(enterRate*getPiece());
    finalPriceE.innerHTML = Number(raw)+Number(gst);
}

// creating loss element
function lossElement(basePrice, comparePrice){
    let li = ul.appendChild(document.createElement('li'));
    li.setAttribute("id", "loss");
    li.appendChild(document.createTextNode("Loss:- "+ (basePrice-Number(comparePrice).toFixed(2))));

}

// condition checking for model
function checkingSelectedModel(priceForCompare){
    if(sel.options[sel.selectedIndex].value==="1Lblack"){
        if(Number(priceForCompare) < 2000){
            lossElement(2000, priceForCompare)
        }
    }if(sel.options[sel.selectedIndex].value==="1Lss"){
        if(Number(priceForCompare) < 2650){
            lossElement(2650, priceForCompare)
        }
    }if(sel.options[sel.selectedIndex].value==="2L"){
        if(Number(priceForCompare) < 3000){
            lossElement(3000, priceForCompare)
        }
    }if(sel.options[sel.selectedIndex].value==="5L"){
        if(Number(priceForCompare) < 5300){
            lossElement(5300, priceForCompare)
        }
    }
}

// for main adding item input
addItemInput.addEventListener("keypress", function(event){
    if(addItemInput.value > 0 && event.keyCode==13){
        if(checkBox.checked){
            priceChange(priceWithoutGST(roundedPrice(addItemInput.value)));
            if(document.getElementById("loss")){
                document.getElementById("loss").remove();
            }
            addMachineDetails();
            checkingSelectedModel(priceWithoutGST(roundedPrice(addItemInput.value)));
            addItemInput.value = "";
            console.log("checked" )
        } else if(!checkBox.checked){
            addMachineDetails();
            priceChange(addItemInput.value)
        if(document.getElementById("loss")){
            document.getElementById("loss").remove();
        }
        checkingSelectedModel(addItemInput.value);
        addItemInput.value = "";
        }
    }
})

// for main submit button
submitButton.addEventListener("click", function(){
    if(addItemInput.value.length > 0){
        if(checkBox.checked){
            priceChange(priceWithoutGST(roundedPrice(addItemInput.value)));
            if(document.getElementById("loss")){
                document.getElementById("loss").remove();
            }
            addMachineDetails();
            checkingSelectedModel(priceWithoutGST(roundedPrice(addItemInput.value)));
            addItemInput.value = "";
            console.log("checked" )
        } else if(!checkBox.checked){
            addMachineDetails();
            priceChange(addItemInput.value)
        if(document.getElementById("loss")){
            document.getElementById("loss").remove();
        }
        checkingSelectedModel(addItemInput.value);
        addItemInput.value = "";
        }
    }
})


// making an element for machine details

function addMachineDetails(){
    let li = document.createElement('li');
    let p = document.createElement('p');
    p.setAttribute("id", "machineName");
    p.setAttribute("class", "leftside");
    p.appendChild(document.createTextNode(sel.options[sel.selectedIndex].text + " * ("+ getPiece()+") :-"));
    li.appendChild(p);
    let p2 = document.createElement('p');
    p2.setAttribute("class", "rightside");
    p2.setAttribute("id", "oneMachinePrice");
    if(checkBox.checked){
        p2.appendChild(document.createTextNode(roundedPrice(priceWithoutGST(addItemInput.value))));   
    } else {
        p2.appendChild(document.createTextNode(roundedPrice(addItemInput.value)));
    }
    li.appendChild(p2);
    ul.insertAdjacentElement("beforeBegin",li);

}