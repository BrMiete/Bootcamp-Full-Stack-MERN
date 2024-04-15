import axios from "axios";

class HTTPClient {
    constructor(){
        this.instance = axios.create({
            baseURL: "http://localhost:8000",
            withCredentials: true,
        })
    }

    //Para el Login y el Register
    login(email, password){
        return this.instance.post("/login", {
            email,
            password
        })
    }

    register(data){
        return this.instance.post("/register", data)
    }

    logout(data){
        return this.instance.delete("/logout", data)
    }

    //Para las películas y reviews
    getMovies(){
        return this.instance.get("/movies/")
    }

    getOneMovies(data){
        return this.instance.get("/movies/:id", data)
    }

    createMovie(data){
        return this.instance.post("/movies/new", data)
    }

    deleteMovie(data){
        return this.instance.delete("/movies/delete/:id", data)
    }

    updateAMovie(data){
        return this.instance.put("/movies/:id", data)
    }
}

export default HTTPClient;