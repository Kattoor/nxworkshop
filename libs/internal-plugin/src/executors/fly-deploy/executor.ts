import { FlyDeployExecutorSchema } from './schema';
import { execSync } from 'child_process';

export default async function runExecutor(options: FlyDeployExecutorSchema) {
  const cwd = options.distLocation;
  const results = execSync(`fly apps list`);
  if (results.toString().includes(options.flyAppName)) {
    execSync(`fly deploy`, { cwd });
  } else {
    execSync(`fly launch --now --name=${options.flyAppName} --region=ams`, {
      cwd,
    });
  }
  return {
    success: true,
  };
}
