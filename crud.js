class Movie { 
    constructor(title, director, trailerUrl, releaseYear, boxOffice) { 
        this._id = Math.floor(Math.random() * 100);  
        this.title = title; 
        this.director = director; 
        this.trailerUrl = trailerUrl; 
        this.releaseYear = releaseYear; 
        this.boxOffice = boxOffice; 
        this.isBoxOfficeChanged = false;
    } 
 
    get id() { 
        return this._id; 
    } 
 
    toString() { 
        return `Title: ${this.title}`; 
    } 
} 
 
class DetailedMovie extends Movie { 
    constructor(title, director, trailerUrl, releaseYear, boxOffice) { 
        super(title, director, trailerUrl, releaseYear, boxOffice); 
    } 
 
    toString() { 
        return `${super.toString()}, Trailer URL: ${this.trailerUrl}, Release Year: ${this.releaseYear}, Box Office: ${this.boxOffice}`; 
    } 
} 
 
class MovieCollection { 
    constructor() { 
        this.items = []; 
    } 
 
    addMovie(movie) { 
        if (!(movie instanceof Movie)) 
            throw `${movie} is not an instance of Movie class`; 
        if (this.items.some(item => item.id === movie.id)) { 
            throw `An item with id ${movie.id} already exists`; 
        } 
        this.items.push(movie); 
    } 
 
    increaseBoxOfficeById(movieId, amount) { 
        let movie = this.items.find(item => item.id === movieId); 
        if (!movie) { 
            throw `Movie with ID ${movieId} not found.`; 
        } 
        movie.boxOffice += amount; 
        movie.isBoxOfficeChanged = true;
        return movie.boxOffice; 
    } 
}

let inceptionMovie = new Movie("Inception", "Christopher Nolan", "https://www.youtube.com/watch?v=8hP9D6kZseM", 2010, 100);  
this.addMovie(inceptionMovie);  
this.increaseBoxOfficeById(inceptionMovie.id, 1000000);  
 
let detailedMovie = new DetailedMovie("Interstellar", "Christopher Nolan", "https://www.youtube.com/watch?v=0vxOhd4qlYQ", 2014, 200);  
this.addMovie(detailedMovie); 