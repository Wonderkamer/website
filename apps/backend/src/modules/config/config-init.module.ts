import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { readdirSync, statSync } from 'fs';
import path, { join } from 'path';

const loadConfigFiles = (files: string[], denyList: string[] = []) => {
  return files
    .filter((file) => !denyList.includes(path.basename(file)))
    .map(
      (file) =>
        // Dynamically load each compiled *.config.js at runtime.
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require(file).default,
    );
};

const findConfigFilesRecursively = (dir: string, fileList: string[] = []): string[] => {
  // Read all items in the directory
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);

    // If the item is a directory, recursively scan it
    if (statSync(filePath).isDirectory()) {
      findConfigFilesRecursively(filePath, fileList);
    } else if (file.endsWith('.config.js')) {
      // If the item is a config file, add it to the list
      fileList.push(filePath);
    }
  });

  return fileList;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, `/../../../../../.env`),
      load: loadConfigFiles(findConfigFilesRecursively(join(process.cwd(), 'dist')), ['typeOrm.config.js']),
      isGlobal: true,
      expandVariables: true,
    }),
  ],
})
export default class ConfigInitModule {}
