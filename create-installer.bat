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
echo npx electron . >> "%INSTALL_DIR%\Financial Organizer.bat"

:: Create desktop shortcut
echo [4/4] Creating shortcuts...
echo Set WshShell = WScript.CreateObject("WScript.Shell") > "%TEMP%\shortcut.vbs"
echo Set Shortcut = WshShell.CreateShortcut("%DESKTOP%\Financial Organizer.lnk") >> "%TEMP%\shortcut.vbs"
echo Shortcut.TargetPath = "%INSTALL_DIR%\Financial Organizer.bat" >> "%TEMP%\shortcut.vbs"
echo Shortcut.WorkingDirectory = "%INSTALL_DIR%" >> "%TEMP%\shortcut.vbs"
echo Shortcut.Description = "Personal Financial Organizer" >> "%TEMP%\shortcut.vbs"
echo Shortcut.Save >> "%TEMP%\shortcut.vbs"
cscript "%TEMP%\shortcut.vbs" >nul
del "%TEMP%\shortcut.vbs"

:: Create start menu shortcut  
if not exist "%START_MENU%" mkdir "%START_MENU%"
echo Set WshShell = WScript.CreateObject("WScript.Shell") > "%TEMP%\startmenu.vbs"
echo Set Shortcut = WshShell.CreateShortcut("%START_MENU%\Financial Organizer.lnk") >> "%TEMP%\startmenu.vbs"
echo Shortcut.TargetPath = "%INSTALL_DIR%\Financial Organizer.bat" >> "%TEMP%\startmenu.vbs"
echo Shortcut.WorkingDirectory = "%INSTALL_DIR%" >> "%TEMP%\startmenu.vbs"
echo Shortcut.Description = "Personal Financial Organizer" >> "%TEMP%\startmenu.vbs"
echo Shortcut.Save >> "%TEMP%\startmenu.vbs"
cscript "%TEMP%\startmenu.vbs" >nul
del "%TEMP%\startmenu.vbs"

echo [OK] Shortcuts created
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