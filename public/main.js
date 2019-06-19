const apiURL = `http://127.0.0.1:7979/`;


//The site will gather some user analytics for the events that a session consist of.
let failedLogin = 0;
let userAnalytics = {};
userAnalytics.helpModalWasOpened = false;


$('.big-input').click(() => {
    $('#serverResponse').html("");
})

//This is a simple login form.
$('.login-form').submit(() => {
    $('#serverResponse').html("");
    $('.action-row').html("Loading....")
    let responseTime = new Date().getTime()
    $.post(`${apiURL}api/login`, {
            username: $('#loginInput').val(),
            password: $('#passwordInput').val()
        })
        .done((result) => {
            $('.action-row').html('<button class="primary-btn" id="loginBtn">Log In</button>');
            userAnalytics.secondsTookToLogin = Math.floor((new Date().getTime() - responseTime / 1000) % 60)
            $('#serverResponse').html("Success!");
            $.post(`${apiURL}api/login-help`, {
                    username: $('#loginInput').val(),
                    userData: JSON.stringify(userAnalytics)

                })
                .done((res) => {
                    console.log(res, userAnalytics)
                })
            location.href = 'index.html'
        })
        .fail(result => {
            failedLogin += 1;
            userAnalytics.numFailedLoginAttempts = failedLogin;
            responseError = JSON.parse(result.responseText)
            $('#serverResponse').html(responseError.error);
        });
});


// $(document).on({
//     ajaxStart: function() { $('.action-row').html("Loading...."); },
//     ajaxStop: function() { $('.action-row').html('<button class="primary-btn" id="loginBtn">Log In</button>'); }
// });



function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
};




//Modal code to toggle the modal's visibility & content
//Above are all the html element targeting the modal.
//The modal will tracks some analytics for the page.
const modal = document.getElementById('myModal');
const modalBtn = document.getElementById('modalBtn');
const span = document.getElementsByClassName('close')[0];
const modalText = document.getElementById('modalText');

modalBtn.addEventListener('click', () => {
    let N = randomInt(1, 4)
    userAnalytics.helpModalWasOpened = true;
    userAnalytics.helpContentNum = N;

    $.get(`${apiURL}/md/login-help-${N}.md`)
        .then(result => {
            console.log(N)
            modalText.innerHTML = marked(`${result}`)
        })
        .then(modal.style.display = "block")
});
span.addEventListener('click', () => {
    modal.style.display = "none"
});
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none"
    }
};