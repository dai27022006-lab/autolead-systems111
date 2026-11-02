@echo off
title AutoLead Systems - Cloudflare Live Tunnel
cd /d "%~dp0"
echo ===================================================
echo     KET NOI CLOUDFLARE TUNNEL (PUBLIC LIVE LINK)
echo ===================================================
echo Dang ket noi du an tai http://localhost:5173 ra Internet...
echo.
"C:\Program Files (x86)\cloudflared\cloudflared.exe" tunnel --protocol http2 --url http://localhost:5173
pause
