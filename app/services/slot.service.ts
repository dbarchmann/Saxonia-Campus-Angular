import {Injectable} from 'angular2/core'
import {Response} from 'angular2/http'
import {Observable} from 'rxjs/Observable'
import {RestService} from './rest.service'
import {Slot} from '../model/slot'

@Injectable()
export class SlotService {
    constructor(private restService: RestService) { }

    getSlots() {
        return Observable.create(observer => {
            // get link from base url
            this.restService.getBase()
                .map(res => res.json()._links.slots.href)
                .subscribe(slotUrl => {
                    // get slots
                    this.restService.get(slotUrl)
                        .map(res => <Slot[]>res.json()._embedded.slots)
                        .catch(SlotService.handleError)
                        .subscribe(slots => {
                            observer.next(slots)
                            observer.complete()
                        })
                })
        })
    }

    private static handleError(error: Response) {
        console.error(error)
        return Observable.throw(error.json().error || 'Server error')
    }
}
