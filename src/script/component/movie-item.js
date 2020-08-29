import img from '../../img/Placeholder-300x450.png';
const movieDescElement = document.querySelector("movie-desc");
class MovieItem extends HTMLElement {

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: "open" });
    }

    set movie(movie) {
        this._movie = movie;
        this.render();
    }

    render() {
        let imgPath = "";
        if (this._movie.poster_path == null) {
            imgPath = img;
        } else {
            imgPath = `https://image.tmdb.org/t/p/w300/${this._movie.poster_path}`;
        }
        this.shadowDOM.innerHTML = `
        <style>
            *{
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }

            :host {
                position: relative;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                border-radius: 10px;
                overflow: hidden;
                background-color: rgba(25, 36, 46, 0.9);
                max-width: 200px;
                user-select: none;
            }
            
            .poster {
                background-size: cover;
                width: 100%;
                height: 100%;


            }

            /* .info:before {
                content: "";
                position: absolute;
                width: 100%;
                height: 40%;
                background-image: linear-gradient(-180deg, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.8) 100%);
            } */

            .info {
                width: 100%;
                position: absolute;
                bottom: 0px;
                background-image: linear-gradient(-180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 30%, rgba(0, 0, 0, 0.8) 100%);
                z-index: 1;
                color: white;
                border: 2px red;
                padding: 10px;
                padding-top: 30px;
                box-sizing: border-box;
            }

            .info>h4 {
                padding: 0;
                margin: 0;
            }

            .text{
                display: flex;
                font-size:10px;
                margin-top; 5dp;
                justify-content: space-between;
            }

            .desc{
                display: none;
                font-size:10px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3; /* number of lines to show */
            }


            :host(:hover) {
                transform: scale(0.99)
            }

        </style>
        <img class="poster" src="${imgPath}">
        <div class="info">
            <h4>${this._movie.title}</h4>
            <div class="text">
                <span class="text-group">
                    <strong>${this._movie.original_language}</strong>
                </span>
                <span class="text-group">
                    <img height="10px" src="https://www.svgrepo.com/show/13695/star.svg"></img>&nbsp;${this._movie.vote_average}
                </span>
            </div>
        </div>
        `;

        this.shadowDOM.addEventListener("click", () => {

            movieDescElement.movieId = this._movie.id;

        });
    }
}

customElements.define("movie-item", MovieItem);