# Financial Organizer Installer - PowerShell Script
# Version 1.0.0

param(
    [string]$InstallPath = "$env:LOCALAPPDATA\Financial Organizer"
)

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "      Financial Organizer v1.0.0 Installer" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host

# Check execution policy
$executionPolicy = Get-ExecutionPolicy
if ($executionPolicy -eq "Restricted") {
    Write-Host "[WARNING] PowerShell execution policy is Restricted" -ForegroundColor Yellow
    Write-Host "You may need to run: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser" -ForegroundColor Yellow
    Write-Host
}

# Create installation directory
Write-Host "[1/4] Creating installation directory..." -ForegroundColor Green
try {
    if (!(Test-Path $InstallPath)) {
        New-Item -ItemType Directory -Path $InstallPath -Force | Out-Null
    }
    Write-Host "[OK] Directory created: $InstallPath" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Could not create installation directory: $_" -ForegroundColor Red
    exit 1
}

# Copy application files
Write-Host "[2/4] Copying application files..." -ForegroundColor Green
try {
    $filesToCopy = @(
        "index.html",
        "main.js", 
        "styles.css",
        "script.js",
        "package.json",
        "README.md",
        "LICENSE"
    )
    
    foreach ($file in $filesToCopy) {
        if (Test-Path $file) {
            Copy-Item $file $InstallPath -Force
        }
    }
    
    # Copy assets folder if exists
    if (Test-Path "assets") {
        Copy-Item "assets" $InstallPath -Recurse -Force
    }
    
    Write-Host "[OK] Files copied successfully" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Could not copy files: $_" -ForegroundColor Red
    exit 1
}

# Create startup script
Write-Host "[3/4] Creating launch script..." -ForegroundColor Green
try {
    $startupScript = @"
@echo off
title Financial Organizer
cd /d "$InstallPath"

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed or not in PATH
    echo Please download and install Node.js from https://nodejs.org
    echo Press any key to open download page...
    pause >nul
    start https://nodejs.org/en/download/
    exit /b 1
)

:: Check if npm is available
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo npm is not available
    echo Please reinstall Node.js from https://nodejs.org
    pause
    exit /b 1
)

:: Install electron if not present
if not exist node_modules (
    echo Installing Electron... Please wait...
    npm install electron --save-dev --no-audit --no-fund
)

:: Run the application
npx electron .
"@
    
    $startupScript | Out-File -FilePath "$InstallPath\Financial Organizer.bat" -Encoding ASCII
    Write-Host "[OK] Launch script created" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Could not create launch script: $_" -ForegroundColor Red
    exit 1
}

# Create shortcuts
Write-Host "[4/4] Creating shortcuts..." -ForegroundColor Green
try {
    # Desktop shortcut
    $WshShell = New-Object -comObject WScript.Shell
    $DesktopShortcut = $WshShell.CreateShortcut("$env:USERPROFILE\Desktop\Financial Organizer.lnk")
    $DesktopShortcut.TargetPath = "$InstallPath\Financial Organizer.bat"
    $DesktopShortcut.WorkingDirectory = $InstallPath
    $DesktopShortcut.Description = "Personal Financial Management Application"
    $DesktopShortcut.Save()
    
    # Start Menu shortcut
    $StartMenuPath = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs"
    $StartMenuShortcut = $WshShell.CreateShortcut("$StartMenuPath\Financial Organizer.lnk")
    $StartMenuShortcut.TargetPath = "$InstallPath\Financial Organizer.bat"
    $StartMenuShortcut.WorkingDirectory = $InstallPath
    $StartMenuShortcut.Description = "Personal Financial Management Application"
    $StartMenuShortcut.Save()
    
    Write-Host "[OK] Shortcuts created successfully" -ForegroundColor Green
} catch {
    Write-Host "[WARNING] Could not create shortcuts: $_" -ForegroundColor Yellow
}

Write-Host
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "          Installation Complete!" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host
Write-Host "Financial Organizer has been installed to:" -ForegroundColor White
Write-Host $InstallPath -ForegroundColor Yellow
Write-Host
Write-Host "Created shortcuts:" -ForegroundColor White
Write-Host "- Desktop: Financial Organizer" -ForegroundColor Green
Write-Host "- Start Menu: Financial Organizer" -ForegroundColor Green
Write-Host
Write-Host "IMPORTANT: This application requires Node.js to run." -ForegroundColor Yellow
Write-Host "If you don't have Node.js installed, the application will" -ForegroundColor Yellow
Write-Host "automatically guide you to download it from https://nodejs.org" -ForegroundColor Yellow
Write-Host
Write-Host "To uninstall, simply delete the installation folder:" -ForegroundColor White
Write-Host $InstallPath -ForegroundColor Yellow
Write-Host
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")