"use strict";

const elForm = document.querySelector(".form");
const elUsernameInput = document.querySelector(".form__user-input");
const elPasswordInput = document.querySelector(".form__password-input");
const elResult = document.querySelector(".result")

elForm.addEventListener("submit", function(e){
    e.preventDefault();

    const userInputValue = elUsernameInput.value
    const passwordInputValue = elPasswordInput.value

    elPasswordInput.value = null
    elUsernameInput.value = null

    fetch("https://reqres.in/api/login", {
        method: "POST",
        headers:{
            "Content-type" : "application/json",
        },
        body: JSON.stringify({
            email: userInputValue,
            password: passwordInputValue
        })
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.token){
            window.localStorage.setItem("token", data.token);

            window.location.replace("ui.html")
        } else{
            elResult.textContent = "Email yoki parolingiz noto'g'ri!"
        }
    });
})