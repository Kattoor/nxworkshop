import {
  formatFiles, getProjects,
  ProjectConfiguration,
  Tree,
  updateJson,
} from '@nrwl/devkit';
import { UpdateScopeSchemaGeneratorSchema } from './schema';

function getDistinctScopes(projectMap: Map<string, ProjectConfiguration>) {
  const projects = [...projectMap.values()];
  const allScopes = projects
    .filter(({tags}) => Array.isArray(tags))
    .map((project) =>
      project.tags
        .filter((tag: string) => tag.startsWith('scope:')))
    .reduce((acc, tags) => [...acc, ...tags], [])
    .map((scope: string) => scope.slice(6));
  return [...new Set(allScopes)];
}

function updateSchema(tree: Tree, scopes: string[]) {
  updateJson(tree, 'libs/internal-plugin/src/generators/util-lib/schema.json', (value: object) => (
    {
      ...value,
      properties: {
        ...value['properties'],
        directory: {
          ...value['properties']['directory'],
          'x-prompt': {
            ...value['properties']['directory']['x-prompt'],
            items: scopes.map((scope) => ({value: scope, label: scope}))
          }
        }
      }
    }));
}

function updateTypeDef(tree: Tree, scopes: string[]) {
  const filePath = 'libs/internal-plugin/src/generators/util-lib/schema.d.ts';
  const fileContent = tree.read(filePath).toString();
  const updatedContent = fileContent.replace(/directory\?:.+;/g, `directory?: '${scopes.join("' | '")}';`);
  tree.write(filePath, updatedContent);
}

export default async function (tree: Tree, options: UpdateScopeSchemaGeneratorSchema) {
  const scopes = getDistinctScopes(getProjects(tree));
  updateSchema(tree, scopes);
  updateTypeDef(tree, scopes);
  await formatFiles(tree);
}
