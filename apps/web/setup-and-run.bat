@echo off
setlocal
set PATH=C:\tool\node-v24.15.0-win-x64;%PATH%

echo ============================================
echo Setup and Run Next.js App
echo ============================================
echo.

echo [1/3] Configuring npm (disable SSL verification)...
C:\tool\node-v24.15.0-win-x64\npm.cmd config set strict-ssl false
if errorlevel 1 echo WARNING: Config failed, continuing anyway...
echo.

echo [2/3] Installing dependencies...
C:\tool\node-v24.15.0-win-x64\npm.cmd install --legacy-peer-deps
if errorlevel 1 (
    echo ERROR: npm install failed
    pause
    exit /b 1
)
echo.

echo [3/3] Starting dev server...
echo Server will run on http://localhost:3000
echo Press Ctrl+C to stop
echo.
C:\tool\node-v24.15.0-win-x64\npm.cmd run dev

pause
