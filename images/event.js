// var baseUrl = "http://localhost:3000/";
var baseUrl = "https://becon-backend.edciitd.com/";
var registerForEvent = function registerForEvent(eventName) {
  if (localStorage.userData === undefined) {
    alert("Please login to register for this event");
  } else {
    var confirmMessage = "Click OK to register for this event";
    if (confirm(confirmMessage)) {
      var eventRegisterLoader = document.getElementById(eventName);
      eventRegisterLoader.style.visibility = "visible";
      var userData = JSON.parse(localStorage.getItem('userData'));
      var userEmail = userData.email;
      var userName = userData.name;
      var formData = {
        eventName: eventName,
        userEmail: userEmail,
        userName: userName
      };
      var requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      };
      var url = "".concat(baseUrl, "api/event/register");
      try {
        fetch(url, requestOptions).then(function (response) {
          return response.json();
        }).then(function (data) {
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
var openLink = function openLink(url) {
  if (localStorage.userData === undefined) {
    alert("Please login to register for this event");
  } else {
    window.open(url, "_blank").focus();
  }
};
var checkEventIsRegistered = function checkEventIsRegistered(eventName) {
  var userData = JSON.parse(localStorage.getItem('userData'));
  var eventRegistered = userData.eventsRegistered;
  var eventRegisterButton = document.getElementById(eventName + "RegisterButton");
  if (eventRegistered.some(function (event) {
    return event.eventName === eventName;
  })) {
    eventRegisterButton.disabled = true;
    eventRegisterButton.innerText = "Registered";
  }
};
(function () {
  "use strict";

  if (localStorage.userData !== undefined) {
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