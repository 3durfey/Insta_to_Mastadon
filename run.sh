#!/bin/bash
cd "$(dirname "$0")"
#xvfb-run DISPLAY=:0 

/usr/bin/node --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("ts-node/esm", pathToFileURL(process.cwd() + "/"));' Pages.ts