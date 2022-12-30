import {Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {NodePackageInstallTask} from '@angular-devkit/schematics/tasks';
import {execSync} from 'child_process';
import {
    addPackageJsonDependency,
    getPackageJsonDependency,
    NodeDependency,
    NodeDependencyType
} from '@schematics/angular/utility/dependencies';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function addDependencies(options: any): Rule {
    return (tree: Tree, context: SchematicContext) => {

        const dep: string[] = options.choiceLibraries;
        const angularVersion: number | undefined = getAngularVersion(tree);
        const rxjsVersion: number | undefined = getRxjsVersion(tree);
        let dependency: NodeDependency | undefined;

        context.logger.info(`\n Installing the @paddls dependencies selected`)
        dep.forEach((dependancy: string) => {
            context.logger.info(`${dependancy}`);

            const command: string = `npm show ${dependancy} versions`;
            let output: string = execSync(command, {
                encoding: 'utf8',
            });

            output = output.replace(/'/g, '"');
            output = JSON.parse(output);

            if (options.ngxRepositoryVersion && (dependancy === '@paddls/ngx-repository' || dependancy === '@paddls/ngx-http-repository' || dependancy === '@paddls/ngx-firestore-repository')) {
                dependency = createNodeDependence(dependancy, options.ngxRepositoryVersion, NodeDependencyType.Default);
            } else if (options.ngxCommonVersion && dependancy === '@paddls/ngx-common') {
                dependency = createNodeDependence(dependancy, options.ngxCommonVersion, NodeDependencyType.Default);
            } else if (options.ngxSerializerVersion && dependancy === '@paddls/ngx-serializer') {
                dependency = createNodeDependence(dependancy, options.ngxSerializerVersion, NodeDependencyType.Default);
            } else if (options.rxjsCommonVersion && dependancy === '@paddls/rxjs-common') {
                dependency = createNodeDependence(dependancy, options.rxjsCommonVersion, NodeDependencyType.Default);
            } else if (options.tsSerializerVersion && dependancy === '@paddls/ts-serializer') {
                dependency = createNodeDependence(dependancy, options.tsSerializerVersion, NodeDependencyType.Default);
            } else if (angularVersion === 14 && dependancy !== '@paddls/rxjs-common' && dependancy !== '@paddls/ts-serializer') {
                if (dependancy === '@paddls/ngx-repository' || dependancy === '@paddls/ngx-http-repository' || dependancy === '@paddls/ngx-firestore-repository') {
                    dependency = createNodeDependence(dependancy, '4.0.1', NodeDependencyType.Default);
                } else if (dependancy === '@paddls/ngx-common') {
                    dependency = createNodeDependence(dependancy, '5.1.0', NodeDependencyType.Default);
                } else if (dependancy === '@paddls/ngx-serializer') {
                    dependency = createNodeDependence(dependancy, '2.0.1', NodeDependencyType.Default);
                }
            } else if (angularVersion === 13 && dependancy !=='@paddls/rxjs-common' && dependancy !== '@paddls/ts-serializer') {
                if (dependancy === '@paddls/ngx-repository' || dependancy === '@paddls/ngx-http-repository' || dependancy === '@paddls/ngx-firestore-repository') {
                    dependency = createNodeDependence(dependancy, '3.1.0', NodeDependencyType.Default);
                } else if (dependancy === '@paddls/ngx-common') {
                    dependency = createNodeDependence(dependancy, '4.0.0', NodeDependencyType.Default);
                } else if (dependancy === '@paddls/ngx-serializer') {
                    dependency = createNodeDependence(dependancy, '1.0.9', NodeDependencyType.Default);
                }
            } else if (angularVersion === 12 && dependancy != '@paddls/rxjs-common' && dependancy != '@paddls/ts-serializer') {
                if (dependancy === '@paddls/ngx-repository' || dependancy === '@paddls/ngx-http-repository' || dependancy === '@paddls/ngx-firestore-repository') {
                    dependency = createNodeDependence(dependancy, '3.1.0', NodeDependencyType.Default);
                } else if (dependancy === '@paddls/ngx-common') {
                    dependency = createNodeDependence(dependancy, '3.0.1', NodeDependencyType.Default);
                } else if (dependancy === '@paddls/ngx-serializer') {
                    dependency = createNodeDependence(dependancy, '1.0.9', NodeDependencyType.Default);
                }
            } else if (angularVersion && angularVersion < 12 && dependancy != '@paddls/rxjs-common' && dependancy != '@paddls/ts-serializer') {
                if (dependancy === '@paddls/ngx-repository' || dependancy === '@paddls/ngx-http-repository' || dependancy === '@paddls/ngx-firestore-repository') {
                    dependency = createNodeDependence(dependancy, '3.1.0', NodeDependencyType.Default);
                } else if (dependancy === '@paddls/ngx-common') {
                    dependency = createNodeDependence(dependancy, '2.0.5', NodeDependencyType.Default);
                } else if (dependancy === '@paddls/ngx-serializer') {
                    dependency = createNodeDependence(dependancy, '1.0.9', NodeDependencyType.Default);
                }
            } else if (rxjsVersion && rxjsVersion < 7 && dependancy === '@paddls/rxjs-common') {
                dependency = createNodeDependence(dependancy, '1.3.5', NodeDependencyType.Default);
            }
            else {
                dependency = createNodeDependence(dependancy, output[output.length - 1], NodeDependencyType.Default);
            }
            if (dependency) {
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

function getAngularVersion(tree: Tree) {
    const angularCli: NodeDependency | null = getPackageJsonDependency(tree,'@angular/cli');
    let angularVersion: number;

    if (angularCli) {
        let version: string = angularCli?.version;

        if (isNaN(parseInt(version[0]))) {
            angularVersion = parseInt(version.slice(1));
        } else {
            angularVersion = parseInt(version);
        }
        return angularVersion;
    }
}

function getRxjsVersion(tree: Tree) {
    const rxjs: NodeDependency | null = getPackageJsonDependency(tree,'rxjs');
    let rxjsVersion: number;

    if (rxjs) {
        let version: string = rxjs?.version;

        if (isNaN(parseInt(version[0]))) {
            rxjsVersion = parseInt(version.slice(1));
        } else {
            rxjsVersion = parseInt(version);
        }
        return rxjsVersion;
    }
}
