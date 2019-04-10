import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ScopeService {
    /*
                case 'cms':
                case 'warehouse':
                case 'operation':
                case 'sale':
                case 'master_sale':
                case 'master_operation':
                case 'superAdmin' :
    */
    public checkSuperAdmin() {
        if (localStorage.getItem('scope') === ('superAdmin')) {
            return true;
        }
    }
}
