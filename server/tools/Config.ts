

// deno-lint-ignore ban-types
export const config: {[key: string]: Object} = {
  public_path: ""
}

export const loadConfig = async (path = 'server.json') => {
  const rawJson = await Deno.readTextFile(path)

  const obj = JSON.parse(rawJson)
  Object.keys(obj).forEach(k => config[k] = obj[k])

  console.log('Using server config: ', config)
}