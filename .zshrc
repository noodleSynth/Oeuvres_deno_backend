source ~/.zshrc
ZSH_ENV_NAME="Deno"

alias serve="deno run --allow-net --watch --allow-read mod.ts"
alias build='f() {rm -rf dist;mkdir -p dist/script; deno bundle $1.ts dist/script/$1.js};f'