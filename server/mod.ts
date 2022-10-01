
import { ServerLib } from '../imports.ts'


const { Server } = ServerLib
type ServerRequest = ServerLib.ServerRequest

// import {loadConfig} from './tools/Config.ts'


import RouterEntry from './router/mod.ts'
import { defineRouter, publicFolder, serveFile } from './router/mod.ts'
import markdown from './router/markdown.ts'
// loadConfig()

const hostname = "0.0.0.0";
const port = 8080;

const server = new Server(Deno.listen({hostname, port}));

defineRouter({
  routes: [
    ...markdown(),
    publicFolder(".*"),
    serveFile('/', 'public/index.html'),
  ]
})

console.log(`Server running on: ${hostname}:${port}`)

for await (const conn: ServerRequest  of server) {
  RouterEntry(conn)
}