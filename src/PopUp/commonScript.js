function openSignUp(){
    document.getElementById('signupForm').reset();
    let signInSection = document.getElementById('signinSection');
    let signUpSection = document.getElementById('signupSection');

    signInSection.classList.add('hidden')
    signUpSection.classList.remove('hidden')
}

function openSignIn(){
    document.getElementById('signinForm').reset();
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
        if(data.newpassword != ""){
            let hashvalue =[];
            for(let i=0;i<data.newpassword.length;i++){
                let asciivalue = data.newpassword.charAt(i).charCodeAt(0);
                let ascii = asciivalue * 9;
                hashvalue.push(String.fromCharCode(ascii)); 
            }
            data.newpassword = hashvalue.toString();
        }

        StoredData.push(data);
        localStorage.setItem('userData',JSON.stringify(StoredData));
        document.getElementById('signupForm').reset();
        openSignIn();
    });

    document.getElementById('signinForm').addEventListener('submit',function(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        let StoredData  = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')): [];
        
        if(StoredData.length <= 0){
            alert("Invalid Username or Password");
            return
        }else{
            let checkUser = StoredData.filter(x=> x.newusername === data.username)
            if(checkUser.length <= 0){
                alert("Invalid Username");
                return        
            }else{ 
                if(checkUser[0].newpassword != ""){
                    let hashvalue =[];
                    for(let i=0;i<checkUser[0].newpassword.length;i++){
                        let asciivalue = checkUser[0].newpassword.charAt(i).charCodeAt(0);
                        let ascii = asciivalue / 9;
                        hashvalue.push(String.fromCharCode(ascii)); 
                    }
                    checkUser[0].newpassword = hashvalue.toString();
                }
                                
                if(checkUser[0].newpassword.toString().toLowerCase()!=data.password.toString().toLowerCase()){
                    alert("Invalid Password");
                    return
                }
            }
        }
        localStorage.setItem('loggedUser',data.username);   
        document.getElementById('signinForm').reset();
        parent.postMessage('loginSuccess', '*');
    });
});




