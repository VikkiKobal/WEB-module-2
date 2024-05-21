class MovieCollectionWithDom extends MovieCollection { 
    constructor() { 
        super();   
    } 
    
    initializeWithData(movie){
        this.addMovie(movie);
    }

    auctionTableToHTML() { 
        let rows = ""; 
        for (let item of this.items) { 
            rows += this.itemToHTML(item); 
        } 
        return ` 
            <h1>Movies List</h1>
            <table> 
                <tr> 
                    <th>Id</th> 
                    <th>Title</th> 
                    <th>Director</th> 
                    <th>Trailer Url</th> 
                    <th>Release Year</th> 
                    <th>Box Office</th> 
                    <th>Actions</th>
                </tr> 
                ${rows} 
            </table> 
            <button type="button" onclick="ShowAddItem()">Add item</button>
        `; 
    } 
 
    itemToHTML(item) { 
        return ` 
            <tr> 
                <td>${item._id}</td> 
                <td>${item.title}</td> 
                <td>${item.director}</td> 
                <td><a href="${item.trailerUrl}">Trailer Link</a></td> 
                <td>${item.releaseYear}</td> 
                <td>${item.boxOffice}</td> 
                <td>
                    <button class="change-boxOffice" onClick="IncreaseOfficeBox('${item._id}')">Increase box office</button>
                </td>
            </tr> 
        `; 
    } 

    addFormToHTML() {
        return `
            <div id="add" style="display: none;">
                <form id='addForm' name="addForm" method="post" action="#">
                    <h3>Add Item</h3>
                    <input name="title" placeholder="Movie title">
                    <input name="director" placeholder="Director">
                    <input name="trailerUrl" placeholder="Trailer Url">
                    <input name="releaseYear" placeholder="Release Year">
                    <input name="boxOffice" placeholder="Box Office">
                    <button type="button" onclick="AddNewItem()">Save</button>
                </form>
            </div>
        `;
    }

    toHTML() { 
        return this.auctionTableToHTML() + this.addFormToHTML(); 
    } 

    mount(parent) {
        this._parent = parent;
        this.render();
        this.addEventListeners();
    }

    render() {
        this._parent.innerHTML = this.toHTML();
    }

    addEventListeners() {
        document.addEventListener("addItem", event => {
            super.addMovie(
                new Movie(
                    event.detail.title,
                    event.detail.director,
                    event.detail.trailerUrl,
                    event.detail.releaseYear,
                    event.detail.boxOffice
                )
            );
            this.render(); 
        });

        document.addEventListener("increaseOfficeBox", event => {
            super.increaseBoxOfficeById(event.detail.id, event.detail.amount);
            this.render();
        })
    }
}

function AddNewItem() {
    const title = document.getElementsByName("title")[0].value;
    const director = document.getElementsByName("director")[0].value;
    const trailerUrl = document.getElementsByName("trailerUrl")[0].value;
    const releaseYear = document.getElementsByName("releaseYear")[0].value;
    const boxOffice = document.getElementsByName("boxOffice")[0].value;
    let addItemEvent = new CustomEvent("addItem", {
        detail: {
            title,
            director,
            trailerUrl,
            releaseYear,
            boxOffice
        }
    });
    document.dispatchEvent(addItemEvent);
}

function IncreaseOfficeBox(id) {
    const amountInput = document.createElement("input");
    amountInput.type = "number";
    amountInput.placeholder = "Enter the amount to increase box office";
    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirm";
    confirmButton.onclick = function() {
        const amount = parseFloat(amountInput.value);
        if (!isNaN(amount)) {
            let increaseOfficeBoxEvent = new CustomEvent("increaseOfficeBox", {
                detail: {
                    id: Number(id),
                    amount
                }
            });
            document.dispatchEvent(increaseOfficeBoxEvent);
            popup.remove();
        } else {
            alert("Invalid amount!");
        }
    };
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.appendChild(amountInput);
    popup.appendChild(confirmButton);
    document.body.appendChild(popup);
}

function ShowAddItem() {
    document.getElementById("add").style.display = "block";
}
