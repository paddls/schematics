import {InjectionToken} from '@angular/core';
import {FirebaseApp} from 'firebase/app';

export const FIREBASE_APP: InjectionToken<FirebaseApp> = new InjectionToken<FirebaseApp>('FIREBASE_APP');
