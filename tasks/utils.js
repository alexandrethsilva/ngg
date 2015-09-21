import {join} from 'path';
import nodeGlob from 'glob';

export const rootDir = join(__dirname, '..');
export const srcDir = join(rootDir, 'app/scripts');
export const modulesDir = join(srcDir, 'modules');

function promisifyNode(cb) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      cb(...args, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };
}

export const glob = promisifyNode(nodeGlob);

export function underscore(string) {
  return [
    string[0]
      .toLowerCase(),

    string
      .slice(1)
      .replace(/[A-Z]/g, c => `_${c.toLowerCase()}`),
  ].join('');
}

export function dashify(string) {
  return [
    string[0]
      .toLowerCase(),

    string
      .slice(1)
      .replace(/[A-Z]/g, c => `-${c.toLowerCase()}`),
  ].join('');
}

export async function main(program) {
  try {
    await program();
    process.exit(0);
  } catch (err) {
    console.log(err.stack); // eslint-disable-line no-console
    process.exit(1);
  }
}
