#!/bin/bash
set -e
cd "/Users/univa/Documents/web_envases"
echo "=== Build started at $(date) ===" > build.log
npm run build 2>&1 | tee -a build.log
echo "=== Build finished at $(date) ===" >> build.log
