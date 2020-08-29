class DataSource {

    static get API_KEY() {
        return "3640280d51db8e328b0042943374782d";
    }

    static searchClub(keyword) {
        return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&language=id&query=${keyword}&include_adult=false`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson.total_results > 0) {
                    return Promise.resolve(responseJson.results);
                } else {
                    return Promise.reject(`Film <strong>${keyword}</strong> tidak ditemukan`);
                }
            })

    }

    static discover() {
        return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${this.API_KEY}&language=id&region=id&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson.total_results > 0) {
                    return Promise.resolve(responseJson.results);
                } else {
                    return Promise.reject(`Film  tidak ditemukan`);
                }
            })

    }

    static detail(movie_id) {
        return fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${this.API_KEY}&language=id`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson.id == movie_id) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`Film dengan id ${movie_id} tidak ditemukan`);
                }
            })

    }
}

export default DataSource;