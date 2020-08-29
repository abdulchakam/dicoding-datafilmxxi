import "./component/app-bar.js";
import "./component/movie-list.js";
import "./component/modal-item.js";
import "./component/movie-description.js";
import DataSource from "./data/data-source.js";

const main = () => {
    const appBarElement = document.querySelector("app-bar");
    const movieListElement = document.querySelector("movie-list");
    const modalItemElement = document.querySelector("modal-item");
    const movieDescelement = document.querySelector("movie-desc");

    const onButtonSearchClicked = () => {
        movieDescelement.hide();
        if (appBarElement.value == "") {
            modalItemElement.message = "Harap isi kolom pencarian dengan nama film terlebih dahulu";
        }
        else {
            DataSource.searchClub(appBarElement.value)
                .then(renderResult)
                .catch(fallbackResult)
        }
    };

    const renderResult = results => {
        movieListElement.movies = results;
    };

    const fallbackResult = message => {
        movieListElement.renderError(message);
    };

    DataSource.discover()
        .then(renderResult)
        .catch(fallbackResult);

    appBarElement.clickEvent = onButtonSearchClicked;
    modalItemElement.clickEvent = () => {
        modalItemElement.render("none");
    }


};

export default main;