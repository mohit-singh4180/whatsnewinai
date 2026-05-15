@echo off
setlocal enabledelayedexpansion

cd /d C:\personal\Git\whatsnewinai\apps\web
set PATH=C:\tool\node-v24.15.0-win-x64;%PATH%

echo Starting setup...
echo.

echo Killing Node processes...
taskkill /F /IM node.exe 2>nul
taskkill /F /IM npm.cmd 2>nul
timeout /t 2 /nobreak
echo.

echo Configuring npm...
C:\tool\node-v24.15.0-win-x64\npm.cmd config set strict-ssl false
echo.

echo Installing dependencies...
C:\tool\node-v24.15.0-win-x64\npm.cmd install --legacy-peer-deps
echo.

echo Starting dev server...
C:\tool\node-v24.15.0-win-x64\npm.cmd run dev
