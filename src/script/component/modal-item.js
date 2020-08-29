class ModalItem extends HTMLElement {

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render("none");
    }

    set message(message) {
        this._message = message;
        this.render("block");
    }

    set clickEvent(event) {
        this._clickEvent = event;
        this.render("none");
    }

    render(display = "none") {
        this.shadowDOM.innerHTML = `
        <style>
            .modal {
                display: ${display}; /* Hidden by default */
                position: fixed; /* Stay in place */
                z-index: 1; /* Sit on top */
                left: 0;
                top: 0;
                width: 100%; /* Full width */
                height: 100%; /* Full height */
                overflow: auto; /* Enable scroll if needed */
                background-color: rgb(0,0,0); /* Fallback color */
                background-color: rgba(0,0,0,0.8); /* Black w/ opacity */
            }

            .modal-content {
                margin: auto;
                padding: 20px;
                width: 40%;
                position:fixed;
                top:50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: white;
                background-color: #19242E;
            }

            .close {
                color: #aaaaaa;
                float: right;
                font-size: 28px;
                font-weight: bold;
            }
        </style>

        <!-- The Modal -->
        <div id="myModal" class="modal">

            <!-- Modal content -->
            <div class="modal-content">
                <span class="close">&times;</span>
                <p>${this._message}</p>
            </div>

        </div>
        `;
        this.shadowDOM.querySelector(".close").addEventListener("click", this._clickEvent)
    }
}

customElements.define("modal-item", ModalItem);