import {Rule, SchematicContext, Tree} from '@angular-devkit/schematics';

export function replaceEnvironment(options: any): Rule {
    return (tree: Tree, context: SchematicContext) => {
        if (!options.replaceEnvironment) {
            return tree;
        }

        const isCreated: boolean = tree.exists('./src/environments/environment.ts');
        const content: Buffer | null = tree.read('./src/environments/environment.ts');

        if (content?.includes('firebase')) {
            context.logger.error('\n Firebase already imported in your environment.ts file');
            return tree;
        }
        context.logger.info('\n Importing firebase in your environment.ts ...');

        if (!isCreated) {
            context.logger.error('\n environment.ts not found');
            return tree
        }

        if (content) {
            const strContent: string = content.toString();
            const appendIndex: number = strContent.indexOf('{');
            const content2Append: string = '\n' +
                '   firebase: {\n' +
                '        apiKey: \'TODO\',\n' +
                '        authDomain: \'TODO\',\n' +
                '        databaseURL: \'TODO\',\n' +
                '        projectId: \'TODO\',\n' +
                '        storageBucket: \'TODO\',\n' +
                '        messagingSenderId: \'TODO\',\n' +
                '        appId: \'TODO\',\n' +
                '        measurementId: \'TODO\',\n' +
                '    },';
            const updatedContent: string = strContent.slice(0,appendIndex+1) + content2Append + strContent.slice(appendIndex+1);
            tree.overwrite('./src/environments/environment.ts', updatedContent);
            return tree;
        }

    }
}