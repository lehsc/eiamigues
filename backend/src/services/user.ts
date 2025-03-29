import { connectdb } from '../config/db.js'
import { Users } from '../models/users.js'

export const getUsers = async (): Promise<Users[]> => {
  const db = await connectdb()
  const users = await db.query("SELECT * FROM users order by id desc");
  return users.rows as Users[];
}

export const getUser = async (id: number): Promise<Users | null> => {
  const db = await connectdb()
  const user = await db.query("SELECT * FROM users where id = $1", [id])
  if (user) return user.rows[0] as Users;
  return null;
}

export const createUser = async (userData: Users): Promise<number> => {
  const db = await connectdb()
  const result = await db.query('INSERT INTO users (name, dob, gender, email, pwd, anonymous) VALUES ($1, $2, $3, $4, $5, $6) returning id',
    [userData.name, userData.dob, userData.gender, userData.email, userData.pwd, userData.anonymous ? 1 : 0])
  if (result.rows[0].id) return result.rows[0].id
  return 0;
}
export const updateUser = async (userData: Users): Promise<number> => {
  const db = await connectdb()
  const user = await getUser(userData.id)
  if (user) {
    const result = await db.query('UPDATE users SET name = $1, dob = $2, gender = $3, email = $4, pwd = $5, anonymous = $6 WHERE id = $7 returning id',
      [userData.name, userData.dob, userData.gender, userData.email, userData.pwd, userData.anonymous ? 1 : 0, userData.id])
    if (result.rows[0].id) return user.id
    return 0;
  }

  return 0;
}

export const deleteUser = async (id: number): Promise<boolean> => {
  const db = await connectdb()
  const isDeleted = await db.query('DELETE FROM users WHERE id = $1 returning 1 as result', [id])
  if (isDeleted) return true
  return false;
}
export const getUserPosts = async (id: number, pageId: number): Promise<Users[]> => {
  const db = await connectdb()
  if (pageId) {
    const data = await db.query('SELECT * FROM users u JOIN posts p ON u.id = p.user_id WHERE u.id = $1 AND p.id < $2 ORDER BY p.id DESC LIMIT 30', [id, pageId])
    return data.rows as Users[]
  }
  const data = await db.query("SELECT * FROM posts p JOIN users u WHERE u.id = $1 ORDER BY p.id DESC LIMIT 30", [id])
  return data.rows as Users[]

}

/*
    You have local changes in `/home/weverson/.local/share/nvim/lazy/vscode-js-debug`:
          * package-lock.json
        Please remove them to update.
        You can also press `x` to remove the plugin and then `I` to install it again.
        package-lock.json
        You have local changes in `/home/weverson/.local/share/nvim/lazy/vscode-js-debug`:
          * package-lock.json
        Please remove them to update.
        You can also press `x` to remove the plugin and then `I` to install it again.
        ...al/share/nvim/lazy/lazy.nvim/lua/lazy/manage/task/fs.lua:9: /home/weverson/.local/share/nvim/lazy/vscode-js-debug should be a directory!
        npm WARN skipping integrity check for git dependency ssh://git@github.com/connor4312/picomatch.git 
        npm WARN deprecated urix@0.1.0: Please see https://github.com/lydell/urix#deprecated
        npm WARN deprecated resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated
        npm WARN deprecated glob@8.1.0: Glob versions prior to v9 are no longer supported
        npm WARN deprecated source-map-url@0.4.0: See https://github.com/lydell/source-map-url#deprecated
        npm WARN deprecated gulp-util@3.0.8: gulp-util is deprecated - replace it, following the guidelines at https://medium.com/gulpjs/gulp-util-ca3b1f9f9ac5
        npm WARN deprecated chokidar@2.1.8: Chokidar 2 does not receive security updates since 2019. Upgrade to chokidar 3 with 15x fewer dependencies
        npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
        npm WARN deprecated source-map-resolve@0.5.2: See https://github.com/lydell/source-map-resolve#deprecated
        npm
Executable `js-debug-adapter` not found, fix the adapter definition for `pwa-node` (ENOENT: no such file or directory)

Debugger listening on ws://127.0.0.1:9229/ae7f57e0-74c2-4eed-8c8b-7ec7c51b7d98
For help, see: https://nodejs.org/en/docs/inspector
Starting inspector on 127.0.0.1:9229 failed: address already in use
(node:476554) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(Use `node --trace-warnings ...` to show where the warning was created)
/home/weverson/sources/eiamigues/backend/src/index.ts:2
import express from "express";
^^^^^^

SyntaxError: Cannot use import statement outside a module
    at internalCompileFunction (node:internal/vm:73:18)
    at wrapSafe (node:internal/modules/cjs/loader:1274:20)
    at Module._compile (node:internal/modules/cjs/loader:1320:27)
    at Module.m._compile (/home/weverson/sources/eiamigues/node_modules/ts-node/src/index.ts:1618:23)
    at Module._extensions..js (node:internal/modules/cjs/loader:1414:10)
    at Object.require.extensions.<computed> [as .ts] (/home/weverson/sources/eiamigues/node_modules/ts-node/src/index.ts:1621:12)
    at Module.load (node:internal/modules/cjs/loader:1197:32)
    at Function.Module._load (node:internal/modules/cjs/loader:1013:12)
    at Function.executeUserEntry
Error executing luv callback:
...weverson/.local/share/nvim/lazy/nvim-dap/lua/dap/rpc.lua:97: ...weverson/.local/share/nvim/lazy/nvim-dap/lua/dap/rpc.lua:30: Content-Length not found in headers: HTTP/1.0 400 Bad Request
Content-Type: text/html; charset=UTF-8

stack traceback:
  [C]: in function 'parse_chunk'
  ...weverson/.local/share/nvim/lazy/nvim-dap/lua/dap/rpc.lua:97: in function <...weverson/.local/share/nvim/lazy/nvim-dap/lua/dap/rpc.lua:85>

Error on launch: Cannot launch program '{path}'; setting the 'outFiles' attribute might help.

*/
