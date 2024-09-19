function openSignUp(){
    let signInSection = document.getElementById('signinSection');
    let signUpSection = document.getElementById('signupSection');

    signInSection.classList.add('hidden')
    signUpSection.classList.remove('hidden')
}

function openSignIn(){
    let signInSection = document.getElementById('signinSection');
    let signUpSection = document.getElementById('signupSection');

    signInSection.classList.remove('hidden')
    signUpSection.classList.add('hidden')
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signupForm').addEventListener('submit',function(event) {
        event.preventDefault();
    
        const Emailregex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const email = document.getElementById('email').value;
        if (!Emailregex.test(email)) {
            alert('Invalid Email.');
           return;
        }
    
        const Usernameregex = /^[A-Za-z0-9]+$/;
        const username = document.getElementById('newusername').value;
        if (!Usernameregex.test(username)) {
            alert('Invalid username.');
            return;
        }
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        let StoredData  = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')): [];
        let duplicateEmail = StoredData.filter(x=> x.email === data.email)
        if(duplicateEmail.length > 0){
            document.getElementById('emailerror').innerHTML="Email already Exists"  
            return        
        }else{
            document.getElementById('emailerror').innerHTML=""  
        }

        let duplicateUsername = StoredData.filter(x=> x.newusername.toString().toLowerCase() === data.newusername.toString().toLowerCase())
        if(duplicateUsername.length > 0){
            document.getElementById('usererror').innerHTML="UserName already Exists"  
            return
        }else{
            document.getElementById('usererror').innerHTML=""  
        }

        StoredData.push(data);
        localStorage.setItem('userData',JSON.stringify(StoredData));
        document.getElementById('signupForm').reset();
        openSignIn();
    });
});




