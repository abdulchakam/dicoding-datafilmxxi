class AppBar extends HTMLElement {

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    set clickEvent(event) {
        this._clickEvent = event;
        this.render();
    }

    get value() {
        return this.shadowDOM.querySelector("#searchElement").value;
    }

    render() {
        this.shadowDOM.innerHTML = `
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            :host {
                display: flex;
                width: 100%;
                background-color: #19242E;
                color: white;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            }
            h2{
                padding-top: 24px;
                padding-bottom: 24px;
                color: #9AA4AF;
                margin-left:20px;
            }
            span{
                display: inline-block;
                color: #CEA935;
                transform: scale(1.2);
            }

            .search-container {
                margin: auto 24px;
                display: flex;
                border: 2px solid #CEA935;
                border-radius:5px;
            }
            
            .search-container > input {
                width: 75%;
                padding: 5px;
                border: 0;
                font-weight: bold;
                background-color: #19242E;
                color: white;
            }
            
            .search-container > input:focus {
                outline: 0;
                border: 0;
            }
            
            .search-container > input:focus::placeholder {
                font-weight: bold;
            }
            
            .search-container >  input::placeholder {
                color: #9AA4AF;
                font-weight: normal;
            }

            .search-container > button {
                width: 23%;
                cursor: pointer;
                margin-left: auto;
                padding: 5px;
                background-color: #CEA935;
                color: #19242E;
                outline: none;
                border:0;
                font-weight: bold;
            }

            @media screen and (max-width: 550px){
                :host{
                    flex-direction: column;
                }

                .search-container{
                    transform: translateY(-16px);
                }
            }

        </style>
        <h2>Data Film <span>XXI</span></h2>
        <div id="search-container" class="search-container">
            <input placeholder="Cari Film" id="searchElement" type="search">
            <button id="searchButtonElement" type="submit">Cari</button>
        </div>
        `;

        this.shadowDOM.querySelector("#searchButtonElement").addEventListener("click", this._clickEvent);
    }
}

customElements.define("app-bar", AppBar);