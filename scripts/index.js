const API_KEY = '708e988e4737e8fe67269760cd88c30b'
const API_LANGUAGE = 'pt-br'
const BUTTON_PLAY = ''

const LIST_MOVIES = ['354912', '177572', '1022796', '901362', '976573', '508947', '150540', '568124', '10681', '482321', '718789', '431693', '46195', '62214', '12', '49013', '420818', '260513', '82690', '62177']
const VIDEO_MOVIES = ['354912', '177572', '1022796', '901362', '976573', '508947', '150540', '568124', '10681', '482321', '718789', '431693', '46195', '62214', '12', '49013', '420818', '260513', '82690', '62177']

function getUrlMovie(movieId) {
    return `https://api.themoviedb.org/3/movie/${movieId}?language=${API_LANGUAGE}&api_key=${API_KEY}`
}

const moviesList = document.getElementById('movies__li')

function setMainMovie(movieId) {
    fetch(getUrlMovie(movieId)).then(response => response.json()).then(data => {
        // const app = document.getElementById('app')
        const bgI = document.getElementById('bgI')
        const title = document.querySelector('.movie h1')
        const description = document.querySelector('.movie p')
        const info = document.querySelector('.movie span')
        const rating = document.querySelector('.rating strong')
    
        const yearRelease = data.release_date.split('-')[0]
                
        title.innerHTML = data.title
        description.innerHTML = data.overview
        rating.innerHTML = data.vote_average
        info.innerHTML = yearRelease + ' - ' + data.genres[0].name + ' - Filme'
            
        const image = `https://image.tmdb.org/t/p/original${data.backdrop_path}`
        bgI.setAttribute('src', `${image}`)
        
    })
}

function creteButtonMovie(movieId) {
    const button = document.createElement('button')
    button.setAttribute('onclick', `setMainMovie('${movieId}')`)
    button.innerHTML = '<img id="movie1" src="./assets/icon-play-button.png" alt="Botão de Play" />'
    return button
}

function createMovie(movieId) {
    console.log('id', movieId)
    fetch(getUrlMovie(movieId)).then(response => response.json()).then(data => {
        const movie = document.createElement('li')
        const genre = `<span>${data.genres[0].name}</span>`
        const title = `<strong>${data.title}</strong>`
        const image = `https://image.tmdb.org/t/p/original${data.backdrop_path}`

        movie.innerHTML = genre + title
        movie.appendChild(creteButtonMovie(movieId))
        movie.style.backgroundImage = `linear-gradient(180deg, rgba(14, 23, 47, 0.0001) 11.72%, #0E172F 100%), url(${image})`
        moviesList.appendChild(movie)
    })
}

function loadListMovies() {
    LIST_MOVIES.map(createMovie)
}

loadListMovies()

const menu = document.getElementById('menu')
const navigation = document.getElementById('navigation')

function changeMenu() {
    menu.classList.toggle('active')
    navigation.classList.toggle('active')
}

// FILME INICIAL
setMainMovie(LIST_MOVIES[0])