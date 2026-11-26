#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
mkdir -p out
javac -encoding UTF-8 -d out src/model/*.java src/service/*.java src/repository/*.java src/utils/*.java src/main/*.java
java -cp out main.Main
