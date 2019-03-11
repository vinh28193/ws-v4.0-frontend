import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PackingListComponent} from './packing-list/packing-list.component';
import {PackingComponent} from './packing.component';
import {PackingDetailComponent} from './packing-detail/packing-detail.component';

const routes: Routes = [
    {
        path: '',
        component: PackingComponent,
        children: [
            {
                path: '',
                component: PackingListComponent,
                children: [
                    {
                        path: ':id',
                        component: PackingDetailComponent,
                    },
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PackingRoutingModule {
}
