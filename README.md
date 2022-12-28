# Getting Started With Schematics

This repository is a basic Schematic implementation that serves as a starting point to create and publish Schematics to
NPM.

### Testing

To test locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool. That tool
acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with

```bash
schematics --help
```

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Publishing

To publish, simply do:

```bash
npm run build
npm publish
```

That's it!







# @paddls/schematics

This schematics will be used to initialize an Angular project by installing the '@paddls' dependencies from npm. It will also create the '@core', '@shared' and '@system' folders 
in their parent folder 'module'.

After the folders created, it will also create the module.ts file for each one, thanks to templates (core.module.ts for @core, shared.module.ts for shared, system.module.ts for system).

If you want to import firebase in your project, the configuration of firebase will be in your environment.ts file and you will have to fill your values instead of the TODO strings.

Finally, you could choose to insert in your app.module.ts file the NgxHttpRepositoryModule and NgxFirestoreRepositoryModule depending of if you need firebase or HTTP or both.

You can choose to run independently each task or can run all in once.

# How to Install

All you have to do is to install the schematics in your project

```
npm install @paddls/schematics
```

# Installing the @paddls libraries

To install the @paddls libraries in your project you have to run 
```
ng generate paddls-schematics:ng-add
```

It will ask you which version of the library you want to install, or it will install the latest version available on npm.
