import {NgModule, Optional, Provider, SkipSelf} from '@angular/core';

const GUARDS: Provider[] = [
    //insert your globals guards here...
];
const REPOSITORIES: Provider[] = [
    //insert your repositories here...
];
const SERVICES: Provider[] = [
    //insert your services here...
];

@NgModule({
    imports: [],
    exports: [],
    providers: [
        ...GUARDS,
        ...REPOSITORIES,
        ...SERVICES,
    ]
})
export class SystemModule {

    public constructor(@Optional() @SkipSelf() parentModule: SystemModule) {
        if (parentModule) {
            throw new Error(
                'SystemModule is already loaded. Import it in the AppModule only');
        }

    }
}