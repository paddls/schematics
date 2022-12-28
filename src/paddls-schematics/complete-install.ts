import {chain, Rule, schematic, SchematicContext, Tree} from '@angular-devkit/schematics';

export function completeInstall(options: any): Rule {
    return (tree: Tree, context: SchematicContext) => {
        return chain([
            schematic('ng-add', options),
            schematic('ng-modules', options),
            schematic('ng-modules-files', options),
            schematic('ng-replace-environment', options),
            schematic('ng-replace-app-module-file', options)
        ])(tree, context);
    };
}