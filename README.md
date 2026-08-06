# Bitburner all scripts are for version 3.0.1

I have taken the approch to run a single script that uses all RAM on Home and a starter script that prowles every server and runs hac, weaken and Grow on that server


## Start HWG
goOnline.js // Starts both script maxprofit and hacktheplanet.
```
run goOnline.js
```
## HWG servers from Home
maxprofit.js // Runs on the Home server with maximum allowed treads and finds the server with the best score. Score is found from calculating maxmoney * hackAnalyze * hackAnalyzeChance / getWeakenTime 

## HWG servers local
hacktheplanet.js //controller script
```
run hacktheplanet.js
```
- scan.js // scans the network
- root.js // presists root acccess on server
- deploy.js //deploys the script to hack, grow or weaken the server
- server-tool.js // runs the Hack, Weaken, Grow (HWG) on the target server

## Share RAM with factions
ram-share.js // runs the worker with maximum treads possible on Home server
```
run ram-share.js
```
ram-share-worker.js // keeps the ram share running 

## Stock trade
stock-master.js // automated stock trading. 

Requires:
- WSE Account    // cost $200m
- Trade Information eXchange (TIX) API access // cost $5b
- 4S Market Data TIX API Access // cost $25b
- 4S Market Data Access // cost $1b
