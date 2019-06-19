
const apiURL = `http://127.0.0.1:7979/`

$('.login-form').submit(()=>{
    $.post(`${apiURL}api/login`, 
            {
                username: $('#loginInput').val(), 
                password: $('#passwordInput').val()
            }
        )
        .done((successData) => {
            console.log(successData);
            $('#serverResponse').html("Success!");
            location.href='./index.html'
        })
        .fail(result => {
            if(result.status === 400){
                $('#serverResponse').html("Wrong credentials")
            }else{
                $('#serverResponse').html("Server Error!")
            }
        });
    }
);

$(document).on({
    ajaxStart: function(){$('.action-row').html("Loading....")},
    ajaxStop: function () {$('.action-row').html('<button class="primary-btn disabled" id="loginBtn">Log In</button>');}
})

function randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

let modal = document.getElementById('myModal')
let modalBtn = document.getElementById('modalBtn');
let span = document.getElementsByClassName('close')[0];
let modalText = document.getElementById('modalText')
modalBtn.addEventListener('click', () => {
     let N = randomInt(1, 4)
    $.get(`${apiURL}/md/login-help-${N}.md`)
    .then(result => {
        console.log(N)
        modalText.innerHTML = marked(`${result}`)
    })
    .then(modal.style.display = "block")
})
span.addEventListener('click', () =>{
    modal.style.display = "none"
})
window.onclick = (event) =>{
    if(event.target == modal) {
        modal.style.display = "none"
    }
}