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

function closeCommonPopUp(){
    document.getElementById('commonIframe').style.display='none';
    document.getElementById('dashboardcontentid').style.display='block';
    document.getElementById('dashboardimgid').style.display='block';
    document.getElementById('loginId').style.display='block';
}

function isMobileScreen(){
    return window.innerWidth<=768;
}