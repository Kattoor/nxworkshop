export interface UtilLibGeneratorSchema {
  name: string;
  tags?: string;
  directory?: 'api' | 'internal' | 'store' | 'videos' | 'shared' | 'util';
}
