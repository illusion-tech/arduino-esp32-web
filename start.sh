#!/bin/bash
if [ ! -e '.bin/deno' ]; then
  echo 'Deno not found. Installing...'
  unzip .bin/deno-x86_64-unknown-linux-gnu.zip -d .bin
  echo 'Deno installed in .bin/deno'
fi

echo 'Starting Deno...'

'.bin/deno' task start