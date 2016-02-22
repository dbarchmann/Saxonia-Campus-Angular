import {Injectable} from 'angular2/core'
import {Response} from 'angular2/http'
import {Observable} from 'rxjs/Observable'
import {RestService} from './rest.service'
import {Slot} from '../model/slot'

@Injectable()
export class SlotService {
    constructor(private restService: RestService) { }

    getSlots() {
        /*
         * This is the correct solution, but right now it doesn't work
         * because of incorrect type definitions in rxjs/Observable.d.ts
         * for the flatMap operator. See https://git.io/v2mOn
         */
        // return this.restService.getBase()
        //     .map(res => res.json()._links.slots.href)
        //     .flatMap(slotUrl => this.restService.get(slotUrl))
        //     .map(res => <Slot[]>res.json()._embedded.slots)
        //     .catch(SlotService.handleError);

        // workaround
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
