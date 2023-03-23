import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './generator';
import { FeatureLibGeneratorSchema } from './schema';

describe('feature-lib generator', () => {
  let appTree: Tree;
  const options: FeatureLibGeneratorSchema = { name: 'test', directory: 'api' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace({layout: 'apps-libs'});
  });

  it('should prefix the name with feature- and put it in the correct directory', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'api-feature-test');
    expect(config.name).toEqual('api-feature-test');
  });

  it('should set the tags', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'api-feature-test');
    expect(config.tags).toEqual(['type:feature', 'scope:api']);
  });
});
