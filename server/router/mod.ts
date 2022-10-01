import { ServerLib, MediaTypesLib, PathLib } from '../../imports.ts';
import { config } from '../tools/Config.ts'
type ServerRequest = ServerLib.ServerRequest;

const router = {
  routes: [] as Route[],
}


export default async (req: ServerRequest) => {
  const { method, url } = req
  
  console.log({ method, url })

  const candidates = router.routes.filter((route) => route.method === method).filter((route) => {
    const rex = new RegExp(route.path)
    const match = rex.exec(url)

    if (!match) return false
    // console.log(match, route.path)
    return true
  })


  if (candidates.length === 0) {
    console.log(`Path not found: '${url}'`)
    req.respond({
      status: 404
    })
    return;
  }
  for (const key in candidates) {
    const r = candidates[key]
    try {
      const matchedValues = new RegExp(r.path).exec(url)
      await r.handler(req, matchedValues)
      break
    } catch(e) {
      console.log(`'${req.url}' resulted in an exception: ${e}`)
    }
  }
}

export type RouteHandler = {
  (req: ServerRequest, params?: Object) : void
}

export interface Route{
  path: string,
  method: string,
  handler: RouteHandler,
}

export interface RouterOptions{
  routes: Route[],
}

export const defineRouter = (opts: RouterOptions) => {
  router.routes = opts.routes
}


export const serveFile = (routePath: string, file: string): Route => ({
  path: routePath,
  method: "GET",
  handler:async req => {
    if (req.url !== routePath) return req.respond({ status: 404 })

    const { contentType } = MediaTypesLib
    const { extname } = PathLib
    
    try {
      const data = await Deno.readFile(file)
      req.respond({
        headers: new Headers(
          {
          "content-type": contentType(extname(file))
        } as HeadersInit),
        body: data
      })
    } catch {
      throw "File does not exist"
    }
  }
})

export const publicFolder = (routePath = 'public/.*') : Route => ({
  path: routePath,
  method: "GET",
  handler: async (req) => {
    const path = config.public_path +  req.url.replaceAll('./', '').replaceAll('/public', '')

    const { contentType } = MediaTypesLib
    const { extname } = PathLib
    
    try {
      const data = await Deno.readFile(path)
      req.respond({
        headers: new Headers(
          {
          "content-type": contentType(extname(path))
        } as HeadersInit),
        body: data
      })
    } catch {
      throw `${path}: does not exist`
    }
  }
})