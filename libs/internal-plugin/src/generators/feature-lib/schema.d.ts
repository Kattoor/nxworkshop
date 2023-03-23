export interface FeatureLibGeneratorSchema {
  name: string;
  tags?: string;
  directory?: 'store' | 'api' | 'shared';
}
