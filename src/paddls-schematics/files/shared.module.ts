import {NgModule} from '@angular/core';

const COMPONENTS: any[] = [
    //insert your components here...
];
const MODULES: any[] = [
    //insert your modules here...
];
const PIPES: any[] = [
    //insert your pipes here...
];
const DIRECTIVES: any[] = [
    //insert your directives here...
];

@NgModule({
    declarations: [
        ...COMPONENTS,
        ...PIPES,
        ...DIRECTIVES
    ],
    imports: [
        ...MODULES
    ],
    exports: [
        ...COMPONENTS,
        ...MODULES,
        ...PIPES,
        ...DIRECTIVES
    ]
})
export class SharedModule {
}