//Mantra
//1. fetch data
//2. select dom elements
//3. create new elements if needed
//4. attach event listeners as needed
//5. append new elements to DOM

//delieverables:
//*need to fetch 
// 1. add movies to nav , id"movie-list"
// 2. details of the first movie at div, id"movie-detail"
// 3. use eventlistener to bring up movie clicked to movie-detail
//show everything in the moviedetail for image clicked
//4. be able to toggle between watch and unwatched, value to remain the same when switching movies ???
//5. should be able to add blood in form with id"blood-form"
//DONE BITCHHHHH


//:::::::::let's section::::::

//global attributes
const movieURL = "http://localhost:3000/movies";
let selectedMovie;



//selectors
const movieList = el("movie-list")

const movieDetails = el("movie-info")
const detailImage = el("detail-image")
const title = el("title")
const yearReleased = el("year-released")
const description = el("description")
const amount = el("amount")
const watched = el("watched")
const bloodForm = el("blood-form")
//fetch
function getMovies(url){
    return fetch(url)
    .then(resp => resp.json())
    .then(moviesArr => renderAllMovies(moviesArr))
}



//render functions
function renderAllMovies(moviesArr){
    moviesArr.forEach(movieObj => {
        renderNav(movieObj)
        renderDetail(moviesArr[0])

    })
}

function renderNav(movieObj){
    const img = document.createElement('img')
    img.src = movieObj.image
    img.addEventListener('click', ()=> renderDetail(movieObj))
    movieList.append(img)
}
function renderDetail(movieObj){
    selectedMovie = movieObj
    detailImage.src = movieObj.image
    title.textContent = movieObj.title
    yearReleased.textContent = movieObj["release_year"]
    description.textContent = movieObj.description
    let watchVal = movieObj.watched ? "Watched" : "Unwatched"
    watched.textContent = watchVal
    //watched.textContent = movieObj.watched //watch out boolean here.. this wrong
    amount.textContent =movieObj["blood_amount"]

}


//event listeners and handlers
watched.addEventListener('click', ()=> toggleWatched())

function toggleWatched(){
    selectedMovie.watched = !selectedMovie.watched 
    if (selectedMovie.watched){
        watched.textContent = "watched"
    } else {
        watched.textContent = "Unwatched"
    }
    }

bloodForm.addEventListener('submit', (e)=> handleBloodSubmit(e))

function handleBloodSubmit(e){
    e.preventDefault() //usually only with forms this is needed
    const newBlood = parseInt(e.target["blood-amount"].value)
    selectedMovie.blood_amount += newBlood
    renderDetail(selectedMovie)
   
}


//initializers

getMovies(movieURL)



//function to get elements by id
function el(id){
    return document.getElementById(id)
}





