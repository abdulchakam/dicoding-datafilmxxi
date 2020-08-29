import DataSource from "../data/data-source.js";
class MovieDescription extends HTMLElement {

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: "open" });
    }

    set movieId(movieId) {
        DataSource.detail(movieId)
            .then(detail => {
                this._detail = detail;
                this.render();
            })
            .catch(error => {
                console.log(error);
            });

    }

    hide() {
        this.shadowDOM.innerHTML = ""
    }

    render() {
        this.shadowDOM.innerHTML = `
        <style>
            * {
                margin: 0;
                padding: 0;
            }
    
            h2,
            h4,
            p,
            table {
                margin-bottom: 4px;
            }

            p{
                text-align:justify
            }
    
            body {
                background-color: #34495E;
            }
    
            :host {
                display: flex;
                width: 80%;
                margin: auto;
                max-width: 1366px;
                background-color: #9AA4AF;
                border-radius: 5px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                overflow: hidden;
            }
    
            .image {
                display: inline-block;
                width: 50%;
                padding: 16px;
                box-sizing:border-box;
            }
    
            .image > img{
                width:100%;
            }

            .text {
                display: inline-block;
                width: 50%;
                padding: 16px;
                box-sizing:border-box;
            }
    
            table {
                border-collapse: collapse;
                font-weight: bold;
                font-size: 12px;
            }
    
            table,
            th,
            td {
                padding-left: 8px;
                padding-top: 8px;
            }

            .genre{
                padding-top:8px;
            }

            .genre > span{
                margin-left: 8px;
                padding: 5px;
                background-color: #CEA935;
                color: #19242E;
                font-size:10px;
                font-weight: bold;
            }

            @media screen and (max-width: 576px){
                :host{
                    display:block;
                }

                .image, 
                .text{
                    width: 100%;
                }
            }
        </style>
        <div class="image">
            <img class="backdrop" src="https://image.tmdb.org/t/p/w300${this._detail.backdrop_path}">
        </div>
        <div class="text">
            <h2>${this._detail.original_title}&nbsp;<sup>(${this._detail.original_language})</sup> </h2>
            <h4>${this._detail.tagline}</h4>
            <p>${this._detail.overview}</p>

            <table>
                <tr>
                    <td>Status</td>
                    <td>${this._detail.status}</td>
                </tr>
                <tr>
                    <td>Release Date</td>
                    <td>${this._detail.release_date}</td>
                </tr>
                <tr>
                    <td>Popularity</td>
                    <td>${this._detail.popularity}</td>
                </tr>
                <tr>
                    <td>Vote Count</td>
                    <td>${this._detail.vote_count}</td>
                </tr>
                <tr>
                    <td>Vote Average</td>
                    <td>${this._detail.vote_average}</td>
                </tr>
            </table>
            <div class="genre"></div>
        </div>
        `;
        this._detail.genres.forEach(genres => {
            this.shadowDOM.querySelector(".genre").innerHTML += `<span>${genres.name}</span>`
        });
    }
}

customElements.define("movie-desc", MovieDescription);