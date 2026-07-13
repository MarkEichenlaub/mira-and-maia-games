@echo off
rem =====================================================================
rem  Mira & Maia's Game Arcade -- local launcher
rem  Starts a tiny local web server (so every game works, including the
rem  ones that load map/photo data) and opens the arcade in your browser.
rem  Run it again any time -- it reuses the server if it's already up.
rem  Bound to CapsLock+A via autohotkey-scripts\default.ahk.
rem =====================================================================
setlocal
set "PORT=8777"
set "DIR=%~dp0"

rem -- Start the server only if nothing is already listening on the port.
powershell -NoProfile -Command "if (Get-NetTCPConnection -LocalPort %PORT% -State Listen -ErrorAction SilentlyContinue) { exit 0 } else { exit 1 }"
if not errorlevel 1 goto open

rem -- Pick python or the py launcher, whichever exists.
set "PY=python"
where python >nul 2>&1 || set "PY=py"

start "Mira & Maia Arcade server (close to stop)" /min cmd /k "cd /d "%DIR%" & %PY% -m http.server %PORT% --bind 127.0.0.1"
powershell -NoProfile -Command "Start-Sleep -Milliseconds 900"

:open
start "" "http://localhost:%PORT%/"
endlocal
