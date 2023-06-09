import { formatFiles, installPackagesTask, Tree } from '@nrwl/devkit';
import { UtilLibGeneratorSchema } from './schema';
import { libraryGenerator } from '@nrwl/workspace/generators';

export default async function (tree: Tree, options: UtilLibGeneratorSchema) {
  await libraryGenerator(tree, {
    ...options,
    name: `util-${options.name}`,
    tags: `type:util, scope:${options.directory}`
  });
  await formatFiles(tree);
  return () => installPackagesTask(tree);
}
