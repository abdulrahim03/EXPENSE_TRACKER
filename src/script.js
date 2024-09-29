function showCommonPopUp(){
    if(isMobileScreen()){
        document.getElementById('commonIframe').style.display='block';
        document.getElementById('dashboardcontentid').style.display='none';
        document.getElementById('dashboardimgid').style.display='none';
        document.getElementById('loginId').style.display='none';
    }else{
        document.getElementById('dashboardcontentid').style.display='block';
        document.getElementById('commonIframe').style.display='block';
        document.getElementById('dashboardimgid').style.display='block';
        document.getElementById('loginId').style.display='none';
    }
}

function logOut(){
    localStorage.setItem('loggedUser',"")
    document.getElementById('loginId').style.display='block';
    document.getElementById('logoutId').style.display='none';
}

function closeCommonPopUp(){
    document.getElementById('commonIframe').style.display='none';
    document.getElementById('dashboardcontentid').style.display='block';
    document.getElementById('dashboardimgid').style.display='block';
    document.getElementById('loginId').style.display='block';
}

function isMobileScreen(){
    return window.innerWidth<=768;
}

window.addEventListener('message', (event) => {
    if (event.data === 'loginSuccess') {
        let loggedUser  = localStorage.getItem('loggedUser') ? localStorage.getItem('loggedUser'): "";
        if(loggedUser != ""){
            closeCommonPopUp()
            document.getElementById('loginId').style.display='none';
            document.getElementById('logoutId').style.display='block';
            window.location.href="./src/Expense/add-expense.html"
            alert(`Welcome ${loggedUser}!`)
        }
    }
});