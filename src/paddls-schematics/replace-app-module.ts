import {
    apply,
    chain,
    filter,
    MergeStrategy,
    mergeWith,
    move,
    Rule,
    SchematicContext,
    Source,
    strings,
    template,
    Tree,
    url
} from '@angular-devkit/schematics';
import {Path} from '@angular-devkit/core';

export function deleteAppModuleFile(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        if (tree.exists('./src/app/app.module.ts')) {
            tree.delete('./src/app/app.module.ts');
        }
        context.logger.info('\n -> Updating file app.module.ts...');
        return tree;
    };
}

export function addAppModuleFile(options: any): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const source = apply(url('./files'), [
            filter((path: Path) => path.includes('app.module.ts')),
            template({
                ...strings,
                ...options
            }),
            move(`./src/app/`)
        ]);
        const rule: Rule = mergeWith(source, MergeStrategy.Default);
        return rule(tree, context);
    };
}

export function addFirebaseApp(options: any): Rule {
    return (tree: Tree, context: SchematicContext) => {

        if (!options.importFirebase) {
            return tree;
        }

        if (tree.exists(`./src/app/app.module.di.ts`)) {
            context.logger.error('The app.module.di.ts is already created');
            return tree;
        }

        context.logger.info('\n -> Creating app.module.di.ts...\n')
        const source: Source = apply(url('./files'), [
            filter(path => path.includes('app.module.di.ts')),
            template({
                ...strings,
                ...options
            }),
            move(`./src/app/`)
        ]);
        const rule: Rule = mergeWith(source, MergeStrategy.Default);
        return rule(tree, context);
    };
}


export function replaceAppModuleFile(options: any): Rule {
    return (tree: Tree, context: SchematicContext) => {

        if (options.replaceAppModule){
            return chain([
                deleteAppModuleFile(),
                addAppModuleFile(options),
                addFirebaseApp(options),
            ])(tree, context);
        }
    };
}