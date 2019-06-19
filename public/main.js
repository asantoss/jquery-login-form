
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

function randomInt(number) {

}

let modal = document.getElementById('myModal')
let modalBtn = document.getElementById('modalBtn');
let span = document.getElementsByClassName('close')[0]
moda4lBtn.addEventListener('click', () => {
    
    $.get(`${apiURL}/md/login-help-${N}.md`)
    modal.style.display = "block"
})
span.addEventListener('click', () =>{
    modal.style.display = "none"
})
window.onclick = (event) =>{
    if(event.target == modal) {
        modal.style.display = "none"
    }
}