import {Injectable} from 'angular2/core'
import {Http, Response, Headers} from 'angular2/http'
import {Observable} from 'rxjs/Observable'

@Injectable()
export class RestService {

    constructor(private http: Http) { }

    private _restUrl = 'http://localhost:8180/rest'

    public getBase() {
        return this.get(this._restUrl)
    }

    public get(url) {
        return this.http.get(url, {
            headers: RestService.getHeaders()
        })
            .do(data => console.log(data)) // eyeball results in the console
            .catch(RestService.handleError)
    }

    public static getHeaders() {
        var headers = new Headers()
        if (sessionStorage.getItem('token')) {
            headers.append('Authorization', 'Basic ' + sessionStorage.getItem('token'))
        }
        return headers
    }

    private static handleError(error: Response) {
        console.error(error)
        return Observable.throw(error.json().error || 'Server error')
    }
}
