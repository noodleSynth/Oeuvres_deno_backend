import { MarkdownLib } from "../../imports.ts"
import { Route } from "./mod.ts";

export default () : Route[] => {
  return [
    { 
      path: "/markdown/(?<name>.*)",
      method: "OPTIONS",
      handler: (req, params) => {
        if (!params || params.length < 2) req.respond({ status: 404 })
        req.respond({
          headers: new Headers({
            ContentType: "text/plain",
            "Access-Control-Allow-Headers": "Access-Control-Allow-Origin, Access-Control-Allow-Headers",
            "Access-Control-Allow-Origin": "*"

          })
        })
      }
    },
    {
      path: "/markdown/(?<name>.*)",
      handler: async (req, params) => {
        if (!params || params.length < 2) req.respond({status: 404})
        const [path, doc] = params
        
        try {
          const src = await fetch(`https://raw.githubusercontent.com/${doc}`)  
          const markup = MarkdownLib.Marked.parse(await src.text())
          req.respond({
            body: markup.content,
            headers: new Headers({
              ContentType: "text/plain",
              "Access-Control-Allow-Headers": "Access-Control-Allow-Origin, Access-Control-Allow-Headers",
              "Access-Control-Allow-Origin": "*"

            })
          })
        } catch {
          req.respond({status: 404})
        }
      },
      method: "GET"
    }
  ]
}