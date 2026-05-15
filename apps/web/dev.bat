@echo off
setlocal
set PATH=C:\tool\node-v24.15.0-win-x64;%PATH%
echo Starting Next.js dev server on http://localhost:3000
echo.
C:\tool\node-v24.15.0-win-x64\npm.cmd run dev
pause
