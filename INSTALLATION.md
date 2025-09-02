# 🚀 Financial Organizer - Installation Guide

## 📥 Quick Installation

### **Method 1: PowerShell Installer (Recommended)**

1. **Download** the project ZIP from GitHub
2. **Extract** all files to a folder
3. **Right-click** on `Install-FinancialOrganizer.ps1`
4. **Select** "Run with PowerShell"
5. **Follow** the installation prompts
6. **Launch** from Desktop shortcut or Start Menu

### **Method 2: Batch Installer**

1. **Download** and extract the project
2. **Double-click** `create-installer.bat`
3. **Follow** the installation steps
4. **Use** the created shortcuts to launch

### **Method 3: Manual Setup (Advanced)**

1. **Install Node.js** from https://nodejs.org (if not installed)
2. **Extract** the project files
3. **Open** command prompt in the project folder
4. **Run**: `npm install electron --save-dev`
5. **Run**: `npx electron .`

## 📋 Requirements

- **Windows 10/11** (64-bit recommended)
- **Node.js 16+** (automatically prompted during installation)
- **4GB RAM** minimum
- **100MB** free disk space

## 🛠️ Troubleshooting

### **"Execution Policy" Error (PowerShell)**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### **"Node.js not found" Error**
- The installer will automatically guide you to download Node.js
- Or manually download from: https://nodejs.org

### **Application won't start**
1. Make sure Node.js is installed
2. Try running: `npm install electron` in the installation folder
3. Check Windows Defender/Antivirus isn't blocking the app

## 📂 Installation Locations

- **PowerShell Installer**: `%LOCALAPPDATA%\Financial Organizer`
- **Batch Installer**: `%ProgramFiles%\Financial Organizer`
- **Shortcuts Created**:
  - Desktop: "Financial Organizer"
  - Start Menu: "Financial Organizer"

## 🗑️ Uninstallation

Simply delete the installation folder and shortcuts:
- Delete installation folder
- Delete desktop shortcut
- Delete Start Menu shortcut

## ✨ Features After Installation

- ✅ **Complete Financial Tracker**
- ✅ **Income & Expense Management**
- ✅ **11 Color-Coded Categories**
- ✅ **Schedule Next Month Expenses**
- ✅ **Emergency Reserve Tracking**
- ✅ **Interactive Charts**
- ✅ **Dark/Light Themes**
- ✅ **Data Export (JSON)**
- ✅ **Responsive Interface**

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Ensure Node.js is properly installed
3. Try running as administrator
4. Contact: [pablosotomaior@live.com](mailto:pablosotomaior@live.com)

---

*Made with ❤️ by Pablo Tadini*