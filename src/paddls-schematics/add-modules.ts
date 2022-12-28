import {Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {askConfirmation} from '@angular/cli/src/utilities/prompt';

export function folderModules(options: any): Rule {
    return async (tree: Tree, context: SchematicContext) => {

        const fs = require('fs')
        const modules: string[] = ['core', 'system', 'shared'];

        if (!options.createModules) {
            return;
        }
        
        const isWantedCreateCore: boolean = await askConfirmation('Would you want to create the @core folder in module ?', true);
        const isWantedCreateSystem: boolean = await askConfirmation('Would you want to create the @system folder in module ?', true);
        const isWantedCreateShared: boolean = await askConfirmation('Would you want to create the @shared folder in module ?', true);

        modules.forEach( (m: string) => {
            const isCreated: boolean = fs.existsSync(`./src/app/module/@${m}`);
            if (isCreated) {
                context.logger.error(`Your ${m} folder is already created`);
            }
             else if (m === 'core' && isWantedCreateCore) {
                tree.create(`./src/app/module/@${m}/service/.gitkeep`, '');
                tree.create(`./src/app/module/@${m}/query/.gitkeep`, '');
                tree.create(`./src/app/module/@${m}/model/.gitkeep`, '');
            } else if (m === 'shared' && isWantedCreateShared) {
                tree.create(`./src/app/module/@${m}/component/.gitkeep`, '');
                tree.create(`./src/app/module/@${m}/directive/.gitkeep`, '');
                tree.create(`./src/app/module/@${m}/pipe/.gitkeep`, '');
            } else if (m === 'system' && isWantedCreateSystem) {
                tree.create(`./src/app/module/@${m}/service/.gitkeep`, '');
            }
        });
    };
}