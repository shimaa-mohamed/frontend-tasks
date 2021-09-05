const hamburgerMenu=document.querySelector(".hamburger-menu");
const navSmallViewport=document.querySelector(".nav-small-viewport")
hamburgerMenu.addEventListener("click",()=>{
    console.log("listned");
    navSmallViewport.classList.toggle('active')
})