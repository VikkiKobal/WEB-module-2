class MovieCollectionWithDom extends MovieCollection { 
    constructor() { 
        super(); 
        let inceptionMovie = new Movie("Inception", "Christopher Nolan", "https://www.youtube.com/watch?v=8hP9D6kZseM", 2010, 100);  
        this.addMovie(inceptionMovie);  
        this.increaseBoxOfficeById(inceptionMovie.id, 1000000);  
         
        let detailedMovie = new DetailedMovie("Interstellar", "Christopher Nolan", "https://www.youtube.com/watch?v=0vxOhd4qlYQ", 2014, 200);  
        this.addMovie(detailedMovie);  
    } 
 
    auctionTableToHTML() { 
        console.log('Inside', this) 
        let rows = ""; 
        const movies = this.items.filter(item => item.isBoxOfficeChanged === true);
        for (let item of movies) { 
            rows += this.itemToHTML(item); 
        } 
        return ` 
            <table> 
                <tr> 
                    <th>Id</th> 
                    <th>Title</th> 
                    <th>Director</th> 
                    <th>Trailer Url</th> 
                    <th>Release Year</th> 
                    <th>Box Office</th> 
                </tr> 
                ${rows} 
            </table> 
        `; 
    } 
 
    itemToHTML(item) { 
        return ` 
            <tr> 
                <td>${item._id}</td> 
                <td>${item.title}</td> 
                <td>${item.director}</td> 
                <td><a href="${item.trailerUrl}">${item.trailerUrl}</a></td> 
                <td>${item.releaseYear}</td> 
                <td>${item.boxOffice}</td> 
            </tr> 
        `; 
    } 
 
 
    toHTML() { 
        return this.auctionTableToHTML(); 
    } 
 
    mount(parent) { 
        this._parent = parent; 
        this.render(); 
        this.addEventListeners(); 
    } 
 
    render() { 
        this._parent.innerHTML = this.toHTML(); 
    } 
}