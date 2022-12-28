import {Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {NodePackageInstallTask} from '@angular-devkit/schematics/tasks';
import {execSync} from 'child_process';
import {addPackageJsonDependency, NodeDependency, NodeDependencyType} from '@schematics/angular/utility/dependencies';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
const dep: string[] = [
    '@paddls/ngx-repository',
    '@paddls/ngx-http-repository',
    '@paddls/ngx-firestore-repository',
    '@paddls/ngx-common',
    '@paddls/ngx-serializer',
    '@paddls/rxjs-common',
    '@paddls/ts-serializer'
];

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function addDependencies(options: any): Rule {
    return (tree: Tree, context: SchematicContext) => {

        if (!options.installPaddls) {
            return tree;
        }

        context.logger.info(`\n Installing all @paddls dependencies :`)
        dep.forEach((dependancy: string) => {
            context.logger.info(`${dependancy}`);
            const command: string = `npm show ${dependancy} versions`;
            let output: string = execSync(command, {
                encoding: 'utf8',
            });
            output = output.replace(/'/g, '"');
            output = JSON.parse(output);
            let dependency: NodeDependency;
            if (options.ngxRepositoryVersion && dependancy === '@paddls/ngx-repository') {
                dependency = createNodeDependence(dependancy, options.ngxRepositoryVersion, NodeDependencyType.Default);
                addPackageJsonDependency(tree, dependency);
            } else if (options.ngxHttpRepositoryVersion && dependancy === '@paddls/ngx-http-repository') {
                dependency = createNodeDependence(dependancy, options.ngxHttpRepositoryVersion, NodeDependencyType.Default);
                addPackageJsonDependency(tree, dependency);
            } else if (options.ngxFirestoreRepositoryVersion && dependancy === '@paddls/ngx-firestore-repository') {
                dependency = createNodeDependence(dependancy, options.ngxFirestoreRepositoryVersion, NodeDependencyType.Default);
                addPackageJsonDependency(tree, dependency);
            } else if (options.ngxCommonVersion && dependancy === '@paddls/ngx-common') {
                dependency = createNodeDependence(dependancy, options.ngxCommonVersion, NodeDependencyType.Default);
                addPackageJsonDependency(tree, dependency);
            } else if (options.ngxSerializerVersion && dependancy === '@paddls/ngx-serializer') {
                dependency = createNodeDependence(dependancy, options.ngxSerializerVersion, NodeDependencyType.Default);
                addPackageJsonDependency(tree, dependency);
            } else if (options.rxjsCommonVersion && dependancy === '@paddls/rxjs-common') {
                dependency = createNodeDependence(dependancy, options.rxjsCommonVersion, NodeDependencyType.Default);
                addPackageJsonDependency(tree, dependency);
            } else if (options.tsSerializerVersion && dependancy === '@paddls/ts-serializer') {
                dependency = createNodeDependence(dependancy, options.tsSerializerVersion, NodeDependencyType.Default);
                addPackageJsonDependency(tree, dependency);
            } else if (dependancy === '@paddls/ngx-serializer') {
                dependency = createNodeDependence(dependancy, output[output.length - 2], NodeDependencyType.Default);
                addPackageJsonDependency(tree, dependency);
            } else if (dependancy === '@paddls/ngx-common') {
                dependency = createNodeDependence(dependancy, output[output.length - 2], NodeDependencyType.Default);
                addPackageJsonDependency(tree, dependency);
            }
            else {
                dependency = createNodeDependence(dependancy, output[output.length - 1], NodeDependencyType.Default);
                addPackageJsonDependency(tree, dependency);
            }
        });
        context.addTask(new NodePackageInstallTask());

        return tree;
    };
}

function createNodeDependence(name: string, version: string, type: NodeDependencyType): NodeDependency {
    return {
        type,
        name,
        version,
        overwrite: true
    };
}
