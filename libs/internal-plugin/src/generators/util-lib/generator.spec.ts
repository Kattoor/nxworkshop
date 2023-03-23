import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './generator';
import { UtilLibGeneratorSchema } from './schema';

describe('util-lib generator', () => {
  let appTree: Tree;
  const options: UtilLibGeneratorSchema = { name: 'test', directory: 'api' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace({layout: 'apps-libs'});
  });

  it('should prefix the name with util- and put it in the correct directory', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'api-util-test');
    expect(config.name).toEqual('api-util-test');
  });

  it('should set the tags', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'api-util-test');
    expect(config.tags).toEqual(['type:util', 'scope:api']);
  });
});
