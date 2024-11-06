// var baseUrl = "http://localhost:3000/";
var baseUrl = "https://becon-backend.edciitd.com/";

const registerForEvent = (eventName) => {
    if (localStorage.userData === undefined) {
        alert(`Please login to register for this event`);
    } else {
        const confirmMessage = `Click OK to register for this event`;
        if (confirm(confirmMessage)) {
            const eventRegisterLoader = document.getElementById(eventName);
            eventRegisterLoader.style.visibility = "visible";
            const userData = JSON.parse(localStorage.getItem('userData'));
            const userEmail = userData.email;
            const userName = userData.name;
            const formData = {
                eventName: eventName,
                userEmail: userEmail,
                userName: userName,
            };
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            };
            const url = `${baseUrl}api/event/register`;
            try {
                fetch(url, requestOptions)
                    .then((response) => response.json())
                    .then((data) => {
                        localStorage.setItem('userData', JSON.stringify(data.userDetails));
                        eventRegisterLoader.style.visibility = "hidden";
                        alert(data.message);
                        checkEventIsRegistered(eventName);
                    });
            } catch (error) {
                eventRegisterLoader.style.visibility = "hidden";
                console.log(error);
                alert("Some Error occured");
            }
        }
    }
};

const openLink = (url) => {
    if (localStorage.userData === undefined) {
        alert(`Please login to register for this event`);
    } else {
        window.open(url, "_blank").focus();
    }
}

const checkEventIsRegistered = (eventName) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const eventRegistered = userData.eventsRegistered;
    const eventRegisterButton = document.getElementById(eventName + "RegisterButton");

    if (eventRegistered.some(event => event.eventName === eventName)) {
        eventRegisterButton.disabled = true;
        eventRegisterButton.innerText = "Registered";
    }
}


(function () {
    "use strict";
    if(localStorage.userData!==undefined){
        checkEventIsRegistered("Inaugration");
        checkEventIsRegistered("OldSchoolNewRules");
        checkEventIsRegistered("TheIitdEffect");
        checkEventIsRegistered("FireChatWithAmitAggarwal");
        checkEventIsRegistered("TalkWithKiranBedi");
        checkEventIsRegistered("SheMeansBusiness");
        checkEventIsRegistered("MoneyMoves");
        checkEventIsRegistered("RaghuramRajan");
        checkEventIsRegistered("KrishnanSandeep");
        checkEventIsRegistered("AnuragSachin");
        checkEventIsRegistered("VijayShekharShrama");
        checkEventIsRegistered("SanjeevBikhchandani");

    }
})();


