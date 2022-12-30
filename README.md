# Schematics

---

## Informations

&nbsp;&nbsp;&nbsp;&nbsp;This schematics will be used to initialize an Angular project by installing the '@paddls' dependencies from npm. It will also create the '@core', '@shared' and '@system' folders
in their parent folder 'module'.  
&nbsp;&nbsp;&nbsp;&nbsp;After the folders created, it will also create the module.ts file for each one, thanks to templates (core.module.ts for @core, shared.module.ts for shared, system.module.ts for system).

&nbsp;&nbsp;&nbsp;&nbsp;If you want to import firebase in your project, the configuration of firebase will be in your environment.ts file, and you will have to fill your values instead of the TODO strings.  
&nbsp;&nbsp;&nbsp;&nbsp;Finally, you could choose to insert in your app.module.ts file the NgxHttpRepositoryModule and NgxFirestoreRepositoryModule depending on if you need firebase or HTTP or both.  

&nbsp;&nbsp;&nbsp;&nbsp;You can choose to run independently each task or can run all in once.

## Summary

---

* [How to install](#how-to-install)
* [Get Started](#get-started)
    * [Installing the @paddls libraries](#installing-the-paddls-libraries)
    * [Create module folders](#create-module-folders)
    * [Create module files](#create-module-files)
    * [Replace the environment.ts](#replace-the-environmentts)
    * [Replace the app.module.ts](#replace-the-appmodulets)
    * [ng add : Execute all schematics](#ng-add--execute-all-schematics)

## How to Install

---

All you have to do is to install the schematics in your project

```
npm install @paddls/schematics
```

## Get Started

---

### Installing the @paddls libraries

To install the @paddls libraries in your project you have to run
```
ng generate @paddls/schematics:add-paddls
```

It will ask you which version of the library you want to install, or it will install the latest version compatible depending on your Angular/RXJS version.

| @paddls libraries                                                                                                                                                                                                                                                                      | Description                                      |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| [@paddls/ngx-common](https://www.npmjs.com/package/@paddls/ngx-common)                                                                                                                                                                                                                 | Common functions to use in your Angular project  |
| [@paddls/ngx-firestore-repository](https://www.npmjs.com/package/@paddls/ngx-firestore-repository)  <br/>[@paddls/ngx-http-repository](https://www.npmjs.com/package/@paddls/ngx-http-repository)  <br/>[@paddls/ngx-repository](https://www.npmjs.com/package/@paddls/ngx-repository) | Easily create a strongly typed data access layer |
| [@paddls/rxjs-common](https://www.npmjs.com/package/@paddls/rxjs-common)                                                                                                                                                                                                               | Helpful operators to use with RXJS               |

Once installed, you could use the paddls libraries in your Angular project.
 

### Create modules folders

To create the @core, @shared and @system folders, you have to run
```
ng generate @paddls/schematics:add-modules
```

It will ask you which folders you want to create in your Angular project.

### Create modules files

To create the core.module.ts, shared.module.ts and system.module.ts files, you have to run
```
ng generate @paddls/schematics:add-modules-files
```

Once executed, you will choose which file you want to create, it will be created
in their respective folder. The files will be created thanks to templates included in this schematic.

### Replace the environment.ts

If you want to include your firebase configuration in your project, you have to run
```
ng generate @paddls/schematics:replace-environment
```
You will see this added in your environment.ts file 
```
firebase: {
        apiKey: 'TODO',
        authDomain: 'TODO',
        databaseURL: 'TODO',
        projectId: 'TODO',
        storageBucket: 'TODO',
        messagingSenderId: 'TODO',
        appId: 'TODO',
        measurementId: 'TODO'
    }
```

All you have to do is to replace the TODO fields by your values to connect to your firebase project

### Replace the app.module.ts

If you want to include the firebase, HTTP, and NgxRepository Modules in your app.module.ts and the providers to make firebase work, you have to run this schematic
```
ng generate @paddls/schematics:replace-app-module-file
```
It will ask you if you want to import the modules necessary for firebase and/or HTTP.

### ng add : Execute all schematics

To execute all the schematics in one command
```
ng add @paddls/schematics
```
