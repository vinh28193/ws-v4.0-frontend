import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {I18nComponent} from './i18n.component';
import {I18nRoutingComponent} from './i18n-routing.component';
import {SourceMessageComponent} from './source-message/source-message.component';

const routes: Routes = [
    {
        path: '',
        component: I18nRoutingComponent,
        children: [
            {
                path: '',
                component: I18nComponent
            },
            {
                path: 'language',
                component: I18nComponent
            },
            {
                path: 'language-frontend',
                component: SourceMessageComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class I18nRoutingModule {
}
