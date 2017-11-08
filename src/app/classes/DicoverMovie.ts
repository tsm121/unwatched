
const POSTER_URL = 'https://image.tmdb.org/t/p/w1280/'

export class DiscoverMovie {
    public genres: number[]
    public overview: string
    public poster: string
    public releaseDate: string
    public title: string
    public score: number

    constructor({ genre_ids, overview, backdrop_path, release_date, title, vote_average }) {
        this.genres = genre_ids
        this.overview = overview
        this.poster = POSTER_URL + backdrop_path
        this.releaseDate = release_date
        this.title = title
        this.score = vote_average
    }
}
