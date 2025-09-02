@echo off
title Financial Organizer Installer
color 0A

echo ================================================
echo      Financial Organizer v1.0.0 Installer
echo ================================================
echo.

:: Check if running as administrator
net session >nul 2>&1
if %errorLevel% == 0 (
    echo [OK] Running as Administrator
) else (
    echo [WARNING] Not running as Administrator
    echo Some features may not work properly
    echo.
)

:: Set installation directory
set "INSTALL_DIR=%ProgramFiles%\Financial Organizer"
set "DESKTOP=%USERPROFILE%\Desktop"
set "START_MENU=%ProgramData%\Microsoft\Windows\Start Menu\Programs"

echo Installation Directory: %INSTALL_DIR%
echo.

:: Create installation directory
echo [1/4] Creating installation directory...
if not exist "%INSTALL_DIR%" (
    mkdir "%INSTALL_DIR%"
    if errorlevel 1 (
        echo ERROR: Could not create installation directory
        echo Trying user directory instead...
        set "INSTALL_DIR=%LOCALAPPDATA%\Financial Organizer"
        mkdir "%INSTALL_DIR%"
    )
)
echo [OK] Directory created

:: Copy files
echo [2/4] Copying application files...
copy "index.html" "%INSTALL_DIR%\" >nul
copy "main.js" "%INSTALL_DIR%\" >nul  
copy "styles.css" "%INSTALL_DIR%\" >nul
copy "script.js" "%INSTALL_DIR%\" >nul
copy "package.json" "%INSTALL_DIR%\" >nul
if exist "assets" xcopy "assets" "%INSTALL_DIR%\assets\" /E /I /Y >nul
echo [OK] Files copied

:: Create run script
echo [3/4] Creating launch script...
echo @echo off > "%INSTALL_DIR%\Financial Organizer.bat"
echo cd /d "%INSTALL_DIR%" >> "%INSTALL_DIR%\Financial Organizer.bat"
echo start /b "" npx electron . >> "%INSTALL_DIR%\Financial Organizer.bat"
echo exit >> "%INSTALL_DIR%\Financial Organizer.bat"

:: Create silent launcher VBS script
echo Set WshShell = CreateObject("WScript.Shell") > "%INSTALL_DIR%\Financial Organizer Silent.vbs"
echo WshShell.Run chr(34) ^& "%INSTALL_DIR%\Financial Organizer.bat" ^& chr(34), 0 >> "%INSTALL_DIR%\Financial Organizer Silent.vbs"
echo Set WshShell = Nothing >> "%INSTALL_DIR%\Financial Organizer Silent.vbs"

:: Create desktop shortcut
echo [4/4] Creating shortcuts...
echo Creating desktop shortcut...
echo Set WshShell = WScript.CreateObject("WScript.Shell") > "%TEMP%\shortcut.vbs"
echo Set Shortcut = WshShell.CreateShortcut("%USERPROFILE%\Desktop\Financial Organizer.lnk") >> "%TEMP%\shortcut.vbs"
echo Shortcut.TargetPath = "%INSTALL_DIR%\Financial Organizer Silent.vbs" >> "%TEMP%\shortcut.vbs"
echo Shortcut.WorkingDirectory = "%INSTALL_DIR%" >> "%TEMP%\shortcut.vbs"
echo Shortcut.Description = "Personal Financial Organizer" >> "%TEMP%\shortcut.vbs"
if exist "%INSTALL_DIR%\assets\icon.png" echo Shortcut.IconLocation = "%INSTALL_DIR%\assets\icon.png,0" >> "%TEMP%\shortcut.vbs"
echo Shortcut.Save >> "%TEMP%\shortcut.vbs"

cscript //nologo "%TEMP%\shortcut.vbs" 2>nul
if %errorlevel% equ 0 (
    echo [OK] Desktop shortcut created
) else (
    echo [WARNING] Could not create desktop shortcut, creating fallback...
    :: Create simple VBS file on desktop as fallback
    echo Set WshShell = CreateObject("WScript.Shell") > "%USERPROFILE%\Desktop\Financial Organizer.vbs"
    echo WshShell.Run chr(34) ^& "%INSTALL_DIR%\Financial Organizer.bat" ^& chr(34), 0 >> "%USERPROFILE%\Desktop\Financial Organizer.vbs"
    echo Set WshShell = Nothing >> "%USERPROFILE%\Desktop\Financial Organizer.vbs"
    echo [OK] Fallback desktop launcher created
)
del "%TEMP%\shortcut.vbs" 2>nul

:: Create start menu shortcut  
echo Creating start menu shortcut...
set "START_MENU=%APPDATA%\Microsoft\Windows\Start Menu\Programs"
if not exist "%START_MENU%" mkdir "%START_MENU%" 2>nul

echo Set WshShell = WScript.CreateObject("WScript.Shell") > "%TEMP%\startmenu.vbs"
echo Set Shortcut = WshShell.CreateShortcut("%START_MENU%\Financial Organizer.lnk") >> "%TEMP%\startmenu.vbs"
echo Shortcut.TargetPath = "%INSTALL_DIR%\Financial Organizer Silent.vbs" >> "%TEMP%\startmenu.vbs"
echo Shortcut.WorkingDirectory = "%INSTALL_DIR%" >> "%TEMP%\startmenu.vbs"
echo Shortcut.Description = "Personal Financial Organizer" >> "%TEMP%\startmenu.vbs"
if exist "%INSTALL_DIR%\assets\icon.png" echo Shortcut.IconLocation = "%INSTALL_DIR%\assets\icon.png,0" >> "%TEMP%\startmenu.vbs"
echo Shortcut.Save >> "%TEMP%\startmenu.vbs"

cscript //nologo "%TEMP%\startmenu.vbs" 2>nul
if %errorlevel% equ 0 (
    echo [OK] Start Menu shortcut created
) else (
    echo [WARNING] Could not create Start Menu shortcut
)
del "%TEMP%\startmenu.vbs" 2>nul

echo [OK] Shortcut creation completed
echo.
echo ================================================
echo          Installation Complete!
echo ================================================
echo.
echo Financial Organizer has been installed to:
echo %INSTALL_DIR%
echo.
echo Desktop shortcut created: Financial Organizer
echo Start Menu shortcut created: Financial Organizer
echo.
echo Note: Node.js and npm are required to run the application.
echo If you don't have them, download from: https://nodejs.org
echo.
echo Press any key to exit...
pause >nul