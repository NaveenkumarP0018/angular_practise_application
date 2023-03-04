import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
// import { ILoginDto, IUser } from './usermodel';


@Pipe({
    name: 'Userfilter'
})
export class UserFilterPipe implements PipeTransform {
    transform(value, data: any[], filter: string): any {
        if (filter) {
            return _.filter(data, row => row.lastname != null && row.lastname.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
                row.firstname.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
                row.login.toLowerCase().indexOf(filter.toLowerCase()) > -1)
        } else {
            return value;
        }
    }
}
