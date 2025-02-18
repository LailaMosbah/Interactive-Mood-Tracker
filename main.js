let btns = document.querySelectorAll(".color")
let show = document.querySelector(".show")
//localStorage.clear()

if(localStorage.getItem("color"))
{
    show.style.backgroundColor = localStorage.getItem("color")
    document.querySelector(`[data-color = ${localStorage.getItem("color")}]`).classList.add('active')
}

btns.forEach(btn => {
    btn.addEventListener("click",function(e){
        btns.forEach(element => {
            element.classList.remove("active")
        });
        e.target.classList.add("active")
        localStorage.setItem("color",e.target.dataset.color)
        console.log(localStorage.getItem("color"))
        show.style.backgroundColor = e.target.dataset.color
    })
}); 