import {
    apply, chain,
    filter, MergeStrategy, mergeWith,
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

export function addCoreModuleFile(options: any): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const isCreated: boolean = tree.exists('./src/app/module/@system/system.module.ts');

        if (options.createCoreModule && isCreated) {
            context.logger.error('The core.module.ts is already created');
            return tree;
        }

        if (options.createCoreModule) {
            const source: Source = apply(url('./files'), [
                filter((path: Path) => path.includes('core')),
                template({
                    ...strings,
                    ...options
                }),
                move(`./src/app/module/@core/`)
            ]);
            const rule: Rule = mergeWith(source, MergeStrategy.Default);
            return rule(tree, context);
        }
    };
}

export function addSharedModuleFile(options: any): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const isCreated: boolean = tree.exists('./src/app/module/@system/system.module.ts');
        if (options.createSharedModule && isCreated) {
            context.logger.error('The shared.module.ts is already created');
            return tree;
        }

        if (options.createSharedModule) {
            const source = apply(url('./files'), [
                filter((path: Path) => path.includes('shared')),
                template({
                    ...strings,
                    ...options
                }),
                move(`./src/app/module/@shared/`)
            ]);
            const rule = mergeWith(source, MergeStrategy.Default);
            return rule(tree, context);
        }
    };
}

export function addSystemModuleFile(options: any): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const isCreated: boolean = tree.exists('./src/app/module/@system/system.module.ts');

        if (options.createSystemModule && isCreated) {
            context.logger.error('The system.module.ts is already created');
            return tree;
        }
        if (options.createSystemModule) {
            const source = apply(url('./files'), [
                filter((path: Path) => path.includes('system')),
                template({
                    ...strings,
                    ...options
                }),
                move(`./src/app/module/@system/`)
            ]);
            const rule = mergeWith(source, MergeStrategy.Default);
            return rule(tree, context);
        }
    };
}

export function addModulesFiles(options: any): Rule {
    return (tree: Tree, context: SchematicContext) => {
        return chain([
            addCoreModuleFile(options),
            addSharedModuleFile(options),
            addSystemModuleFile(options)
        ])(tree, context);
    };
}