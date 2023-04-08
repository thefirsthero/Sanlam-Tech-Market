<<<<<<< HEAD
//make the <header> element stretch across the entire screen
var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}
ready(() => {
    document.querySelector(".header").style.height = window.innerHeight + "px";
})

setTimeout(function() {
	$('#demo-modal').modal();
}, 500);

//add EventHandlers for buttons on page
const loginButton = document.getElementById("login button");
loginButton.addEventListener("click", redirectToLogin);
const signUpButton = document.getElementById("signup button");
signUpButton.addEventListener("click", redirectToSignUp);

function redirectToLogin()
{
    window.location.href = "/login"
}
function redirectToSignUp()
{
    window.location.href = "/signup"
}
=======
//make the <header> element stretch across the entire screen
var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}
ready(() => {
    document.querySelector(".header").style.height = window.innerHeight + "px";
})

setTimeout(function() {
	$('#demo-modal').modal();
}, 500);
>>>>>>> 7278a45c54fbac20be00f5f09b9a4801f40f522a
