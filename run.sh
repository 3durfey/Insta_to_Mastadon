#!/bin/bash
cd "$(dirname "$0")"
NODE_BIN=${NODE_BIN:-/Users/peterdurfey/.nvm/versions/node/v20.17.0/bin/node}
"$NODE_BIN" --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("ts-node/esm", pathToFileURL("./"));' Pages.ts
