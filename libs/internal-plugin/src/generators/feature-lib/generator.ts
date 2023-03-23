import { formatFiles, installPackagesTask, Tree } from '@nrwl/devkit';
import { FeatureLibGeneratorSchema } from './schema';
import { libraryGenerator } from '@nrwl/workspace/generators';

export default async function (tree: Tree, options: FeatureLibGeneratorSchema) {
  await libraryGenerator(tree, {
    ...options,
    name: `feature-${options.name}`,
    tags: `type:feature, scope:${options.directory}`
  });
  await formatFiles(tree);
  return () => installPackagesTask(tree);
}
