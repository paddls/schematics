import {chain, Rule, schematic, SchematicContext, Tree} from '@angular-devkit/schematics';
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
    return (_tree: Tree, context: SchematicContext) => {

        const dep: string[] = options.choiceLibraries;
        const ruleNgxRepo: Rule = schematic('add-ngx', options);
        const ruleNgxHttp: Rule = schematic('add-ngx-http', options);
        const ruleNgxFirestore: Rule = schematic('add-ngx-firestore', options);
        const ruleNgxCommon: Rule = schematic('add-ngx-common', options);
        const ruleNgxSerializer: Rule = schematic('add-ngx-serializer', options);
        const ruleRxjsCommon: Rule = schematic('add-rxjs-common', options);
        const ruleTsSerializer: Rule = schematic('add-ts-serializer', options);
        let rules: Rule[] = [];

        context.logger.info(`\n Installing the @paddls dependencies selected`)

        dep.forEach((dependency: string) => {
            context.logger.info(`${dependency}`);

                if (dependency === '@paddls/ngx-repository') {
                    rules.push(ruleNgxRepo);
                } else if (dependency === '@paddls/ngx-http-repository') {
                    rules.push(ruleNgxHttp);
                } else if (dependency === '@paddls/ngx-firestore-repository') {
                    rules.push(ruleNgxFirestore);
                }  else if (dependency === '@paddls/ngx-common') {
                    rules.push(ruleNgxCommon);
                } else if (dependency === '@paddls/ngx-serializer') {
                    rules.push(ruleNgxSerializer);
                } else if (dependency === '@paddls/rxjs-common') {
                    rules.push(ruleRxjsCommon);
                } else if (dependency === '@paddls/ts-serializer') {
                    rules.push(ruleTsSerializer);
                }

        });
        let rule: Rule = () => {
            return (tree: Tree, context: SchematicContext) => {
                context.addTask(new NodePackageInstallTask());
                return tree;
            }
        };
        rules.push(rule)
        return chain(
            rules
        );
    }
}

function addPaddls(dep: string, version: string) {
    let dependency: NodeDependency | undefined;
    dependency = createNodeDependence(dep, version, NodeDependencyType.Default);
    return dependency;
}

export function addNgxRepo(options: any): Rule {
    return (tree:Tree) => {
        const angularVersion: number | undefined = getAngularVersion(tree);
        let dep: NodeDependency;

        if (!angularVersion) {
            return tree;
        }

        if (options.versionPaddls) {
            dep = addPaddls('@paddls/ngx-repository', options.versionPaddls);
        } else if (angularVersion === 14) {
            dep = addPaddls('@paddls/ngx-repository', '4.0.1');
        } else if (angularVersion === 13) {
            dep = addPaddls('@paddls/ngx-repository', '3.1.0')
        } else if (angularVersion <= 12) {
            dep = addPaddls('@paddls/ngx-repository', '2.0.5')
        } else {
            const latest = getLatestversionPaddls('@paddls/ngx-repository');
            dep = addPaddls('@paddls/ngx-repository', latest);
        }
        addPackageJsonDependency(tree,dep);
    }
}

export function addNgxHttp(options: any): Rule {
    return (tree:Tree) => {
        const angularVersion: number | undefined = getAngularVersion(tree);
        let dep: NodeDependency;

        if (!angularVersion) {
            return tree;
        }

        if (options.versionPaddls) {
            dep = addPaddls('@paddls/ngx-http-repository', options.versionPaddls);
        } else if (angularVersion === 14) {
            dep = addPaddls('@paddls/ngx-http-repository', '4.0.1');
        } else if (angularVersion === 13) {
            dep = addPaddls('@paddls/ngx-http-repository', '3.1.0')
        } else if (angularVersion <= 12) {
            dep = addPaddls('@paddls/ngx-http-repository', '2.0.5')
        } else {
            const latest = getLatestversionPaddls('@paddls/ngx-http-repository');
            dep = addPaddls('@paddls/ngx-http-repository', latest);
        }
        addPackageJsonDependency(tree,dep);
    }
}

export function addNgxFirestore(options: any): Rule {
    return (tree:Tree) => {
        const angularVersion: number | undefined = getAngularVersion(tree);
        let dep: NodeDependency;

        if (!angularVersion) {
            return tree;
        }

        if (options.versionPaddls) {
            dep = addPaddls('@paddls/ngx-firestore-repository', options.versionPaddls);
        } else if (angularVersion === 14) {
            dep = addPaddls('@paddls/ngx-firestore-repository', '4.0.1');
        } else if (angularVersion === 13) {
            dep = addPaddls('@paddls/ngx-firestore-repository', '3.1.0')
        } else if (angularVersion <= 12) {
            dep = addPaddls('@paddls/ngx-firestore-repository', '2.0.5')
        } else {
            const latest = getLatestversionPaddls('@paddls/ngx-firestore-repository');
            dep = addPaddls('@paddls/ngx-firestore-repository', latest);
        }
        addPackageJsonDependency(tree,dep);
    }
}

export function addNgxCommon(options: any): Rule {
    return (tree:Tree) => {
        const angularVersion: number | undefined = getAngularVersion(tree);
        let dep: NodeDependency;

        if (!angularVersion) {
            return tree;
        }

        if (options.versionPaddls) {
            dep = addPaddls('@paddls/ngx-common', options.paddlsVersion);
        } else if (angularVersion === 14) {
            dep = addPaddls('@paddls/ngx-common', '5.1.0');
        } else if (angularVersion <= 13) {
            dep = addPaddls('@paddls/ngx-common', '4.0.0')
        } else if (angularVersion <= 12) {
            dep = addPaddls('@paddls/ngx-common', '3.0.1')
        } else {
            const latest = getLatestversionPaddls('@paddls/ngx-common');
            dep = addPaddls('@paddls/ngx-common', latest);
        }
        addPackageJsonDependency(tree,dep);
    }
}

export function addNgxSerializer(options: any): Rule {
    return (tree:Tree) => {
        const angularVersion: number | undefined = getAngularVersion(tree);
        let dep: NodeDependency;

        if (!angularVersion) {
            return tree;
        }

        if (options.versionPaddls) {
            dep = addPaddls('@paddls/ngx-serializer', options.paddlsVersion);
        } else if (angularVersion === 14) {
            dep = addPaddls('@paddls/ngx-serializer', '2.0.1');
        } else if (angularVersion <= 13) {
            dep = addPaddls('@paddls/ngx-serializer', '1.0.9');
        } else {
            const latest = getLatestversionPaddls('@paddls/ngx-serializer');
            dep = addPaddls('@paddls/ngx-serializer', latest);
        }
        addPackageJsonDependency(tree,dep);
    }
}

export function addRxjsCommon(options: any): Rule {
    return (tree:Tree) => {
        const rxjsVersion: number | undefined = getRxjsVersion(tree);
        let dep: NodeDependency;

        if (!rxjsVersion) {
            return tree;
        }

        if (options.versionPaddls) {
            dep = addPaddls('@paddls/rxjs-common', options.paddlsVersion);
        } else if (rxjsVersion < 7) {
            dep = addPaddls('@paddls/rxjs-common', '1.3.5');
        } else {
            const latest = getLatestversionPaddls('@paddls/rxjs-common');
            dep = addPaddls('@paddls/rxjs-common', latest);
        }
        addPackageJsonDependency(tree,dep);
    }
}

export function addTsSerializer(options: any): Rule {
    return (tree:Tree) => {
        let dep: NodeDependency;

        if (options.paddlsVersion) {
            dep = addPaddls('@paddls/ts-serializer', options.paddlsVersion);
        } else {
            const latest = getLatestversionPaddls('@paddls/ts-serializer');
            dep = addPaddls('@paddls/ts-serializer', latest);
        }
        addPackageJsonDependency(tree,dep);
    }

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

function getLatestversionPaddls(dep: string): string {
    const command: string = `npm show ${dep} versions`;
    let output: string = execSync(command, {
        encoding: 'utf8',
    });

    output = output.replace(/'/g, '"');
    output = JSON.parse(output);
    return output[output.length-1];
}
