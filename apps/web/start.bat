@echo off
cd /d C:\personal\Git\whatsnewinai\apps\web
set PATH=C:\tool\node-v24.15.0-win-x64;%PATH%

REM All output redirected to log file
(
  echo ================================================
  echo AI Pulse Next.js - Setup and Start
  echo ================================================
  echo.
  echo [1/4] Killing existing Node processes...
  taskkill /F /IM node.exe 2>nul
  taskkill /F /IM npm.cmd 2>nul
  echo Done
  echo.

  echo [2/4] Configuring npm (disable SSL check)...
  C:\tool\node-v24.15.0-win-x64\npm.cmd config set strict-ssl false
  echo Done
  echo.

  echo [3/4] Installing dependencies...
  C:\tool\node-v24.15.0-win-x64\npm.cmd install --legacy-peer-deps
  echo Installation complete
  echo.

  echo [4/4] Starting dev server...
  echo Server: http://localhost:3000
  echo ================================================
  C:\tool\node-v24.15.0-win-x64\npm.cmd run dev
) > setup.log 2>&1

echo.
echo Setup complete. Check setup.log for details.
pause
