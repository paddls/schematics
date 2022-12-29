import {chain, Rule, schematic, SchematicContext, Tree} from '@angular-devkit/schematics';

export function ngAdd(options: any): Rule {
    return (tree: Tree, context: SchematicContext) => {
        return chain([
            schematic('add-paddls', options),
            schematic('add-modules', options),
            schematic('add-modules-files', options),
            schematic('replace-environment', options),
            schematic('replace-app-module-file', options)
        ])(tree, context);
    };
}