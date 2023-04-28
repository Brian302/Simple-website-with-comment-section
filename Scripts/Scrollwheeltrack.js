const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
let offSet = parseInt(params.scroll);
// console.log(offSet);

function scrolltrack(){
    var navbar = document.getElementById("navscroll");
    var a = navbar.scrollLeft;
    var dropmenu = document.getElementsByClassName("dropdown-menu");
    
    for (let i = 0; i < dropmenu.length; i++){
        dropmenu[i].style.transform = `translateX(-${a}px)`;
        if (window.innerWidth < 1345){
            dropmenu[i].style.transform = `translate(-${a}px, -17px)`;
        }
    }
}

function offset(){
    setTimeout(function () {
            window.scrollBy(0, -80);
    }, 0); 
}

if (offSet == 1){
    offset();
}