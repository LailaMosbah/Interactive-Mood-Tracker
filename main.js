let btns = document.querySelectorAll(".color")
let show = document.querySelector(".show")
let copy = document.querySelector("#copy")
let voice = document.querySelector("#voice")





show.textContent = "A Message For You"
show.style.color = 'black'
show.style.backgroundColor ='#f4f4f4'



/// display quote when btn is selected

btns.forEach(btn =>{
    btn.addEventListener('click',async function(e){
        //remove active class from all btns
        show.style.color = 'white'

        btns.forEach(btn => {
            btn.classList.remove('active')
        });

        e.target.classList.add('active')

        show.style.backgroundColor = e.target.dataset.color;
        //copy.style.hover.backgroundColor = e.target.datas

        let quotes = await getQuotes(`${e.target.dataset.emotion}.txt`)
        let randomQuote = quotes[Math.floor(Math.random() * quotes.length )]
        show.textContent = randomQuote;

    })
})



// Function to fetch quotes from a text file

async function getQuotes(file){
    try{
        let response = await fetch(file)
        let data = await response.text()
        console.log(data)
        data = data.split("\n").filter(quote => quote.trim() !== "");
        return data
    }
    catch(error){
        console.error("Error fetching quotes:", error);
        return ["No quotes available"];
    }
}

// Function to copy Quote
function copyQuote() {
    const quote = document.querySelector('.show').textContent;
    navigator.clipboard.writeText(quote).then(() => {
        Swal.fire({
            title: 'Copied!',
            text: 'The quote has been copied to clipboard successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
        });
    }).catch(() => {
        Swal.fire({
            title: 'Oops!',
            text: 'Failed to copy the quote.',
            icon: 'error',
            confirmButtonText: 'Try Again'
        });
    });
}



// Function to speak the quote
function speakQuote() {
    const quote = document.querySelector('.show').textContent;
    const voice = new SpeechSynthesisUtterance(quote);
    console.log(voice)
    window.speechSynthesis.speak(voice);
}


copy.addEventListener('click', copyQuote);
voice.addEventListener('click', speakQuote);


