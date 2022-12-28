import {NgModule, Optional, Provider, SkipSelf} from '@angular/core';

const SERVICES: Provider[] = [
    //insert your components here...
];
const REPOSITORIES: Provider[] = [
    //insert your repositories here...
];

@NgModule({
    imports: [],
    providers: [
        ...SERVICES,
        ...REPOSITORIES
    ]
})
export class CoreModule {

    public constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}