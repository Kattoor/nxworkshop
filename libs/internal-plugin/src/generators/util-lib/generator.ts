import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout, installPackagesTask,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';
import { UtilLibGeneratorSchema } from './schema';
import { libraryGenerator } from '@nrwl/workspace/generators';

interface NormalizedSchema extends UtilLibGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

export default async function (tree: Tree, options: UtilLibGeneratorSchema) {
  await libraryGenerator(tree, {
    ...options,
    name: `util-${options.name}`,
    tags: `type:util, scope:${options.directory}`
  });
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
