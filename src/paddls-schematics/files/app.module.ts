import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './module/@core/core.module';
import {SystemModule} from './module/@system/system.module';
import {NgxRepositoryModule} from '@paddls/ngx-repository';<% if (importHttp) {%>
import {NgxHttpRepositoryModule} from '@paddls/ngx-http-repository';<% }%><% if (importFirebase) {%>
import {FIRESTORE_APP, NgxFirestoreRepositoryModule} from '@paddls/ngx-firestore-repository';
import {FirebaseApp, initializeApp} from 'firebase/app';
import {Firestore, getFirestore} from 'firebase/firestore';
import {FIREBASE_APP} from './app.module.di';
import {environment} from '../environments/environment';<% }%>

<% if (importFirebase) {%>
export function createFirebaseApp(): FirebaseApp {
    return initializeApp(environment.firebase);
}

export function initializeFirestore(app: FirebaseApp): Firestore {
    return getFirestore(app);
}<% }%>

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        SystemModule,
        NgxRepositoryModule.forRoot({
            normalizerConfiguration: {
                normalizeNull: true
            }
        }),<% if (importHttp) {%>
        NgxHttpRepositoryModule.forRoot(),<% }%><% if (importFirebase) {%>
        NgxFirestoreRepositoryModule.forRoot()
        <% }%>],
    providers: [<% if (importFirebase) {%>
        {
            provide: FIREBASE_APP,
            useFactory: createFirebaseApp,
        },
        {
            provide: FIRESTORE_APP,
            useFactory: initializeFirestore,
            deps: [FIREBASE_APP]
        }
        <% }%>],
    bootstrap: [AppComponent]
})
export class AppModule {
}
