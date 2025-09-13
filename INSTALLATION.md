# Installation Guide

This guide provides detailed installation instructions for Financial Organizer on Windows systems.

## 📥 Download Options

### Option 1: Pre-built Installer (Recommended)
Download the latest installer from the [Releases page](../../releases/latest).

### Option 2: Source Code
Download the source code if you want to build from scratch or contribute to development.

## 🚀 Installation Methods

### Method 1: Using the Installer (Easiest)

1. **Download** the installer file:
   - `Financial-Organizer-Installer.exe` (331MB)

2. **Run as Administrator**:
   - Right-click on the installer
   - Select "Run as administrator"
   - Click "Yes" when prompted by Windows UAC

3. **Follow Installation Wizard**:
   - Choose installation directory (default: Program Files)
   - Select whether to create desktop shortcut
   - Click "Install" to begin installation

4. **Launch Application**:
   - The app will start automatically after installation
   - Or use the desktop shortcut
   - Or find it in Start Menu under "Financial Organizer"

### Method 2: Portable Version

If you prefer not to install the application:

1. **Download** the portable version from releases
2. **Extract** the ZIP file to your desired location
3. **Run** `Financial Organizer.exe` directly
4. **Create shortcuts** manually if needed

### Method 3: Build from Source

For developers or advanced users:

1. **Install Prerequisites**:
   ```bash
   # Install Node.js from https://nodejs.org/
   # Version 18 or higher required
   ```

2. **Clone Repository**:
   ```bash
   git clone https://github.com/Pasblinn/Financial-Organizer.git
   cd Financial-Organizer
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run Application**:
   ```bash
   npm run dev  # Development mode
   npm start    # Production mode
   ```

5. **Build Installer** (Optional):
   ```bash
   # Install NSIS first
   npm run build-win
   makensis installer.nsi
   ```

## 🖥️ System Requirements

### Minimum Requirements
- **Operating System**: Windows 10 (64-bit)
- **Processor**: Intel Core i3 or AMD equivalent
- **Memory**: 4GB RAM
- **Storage**: 500MB free space
- **Graphics**: DirectX 9 compatible

### Recommended Requirements
- **Operating System**: Windows 11 (64-bit)
- **Processor**: Intel Core i5 or AMD equivalent
- **Memory**: 8GB RAM
- **Storage**: 1GB free space
- **Graphics**: DirectX 11 compatible

## 🔧 Troubleshooting

### Installation Issues

**Problem**: "This app can't run on your PC"
- **Solution**: Ensure you're using Windows 10/11 64-bit
- **Alternative**: Try compatibility mode for Windows 10

**Problem**: "Windows protected your PC" warning
- **Solution**: Click "More info" then "Run anyway"
- **Reason**: Application is not digitally signed

**Problem**: Installation fails with permission error
- **Solution**: Run installer as administrator
- **Check**: Antivirus software isn't blocking installation

**Problem**: Installer won't start
- **Solution**: Download installer again (may be corrupted)
- **Check**: Available disk space (need 500MB minimum)

### Runtime Issues

**Problem**: Application won't start
- **Solution**: Try running as administrator
- **Check**: Windows version compatibility
- **Alternative**: Reinstall the application

**Problem**: Charts not displaying
- **Solution**: Enable hardware acceleration in Windows
- **Check**: Graphics drivers are up to date

**Problem**: Data not saving
- **Solution**: Run application as administrator
- **Check**: Folder permissions in installation directory

**Problem**: Performance issues
- **Solution**: Close other applications
- **Check**: Available RAM (4GB minimum)
- **Tip**: Restart the application periodically

## 🔒 Security Considerations

### Antivirus Software
Some antivirus programs may flag the installer as suspicious because:
- The application is not digitally signed
- It's a new/unknown executable
- It requests administrator privileges

**Solutions**:
- Add installer to antivirus whitelist
- Temporarily disable real-time protection during installation
- Download only from official GitHub releases

### Administrator Privileges
The application requires administrator privileges to:
- Install to Program Files directory
- Create system shortcuts
- Access protected folders for data storage
- Ensure proper file permissions

### Data Privacy
- All data is stored locally on your computer
- No data is sent to external servers
- Application works completely offline
- Your financial data remains private

## 🔄 Updating

### Automatic Updates
Currently, automatic updates are not implemented. To update:

1. **Download** the latest installer from releases
2. **Run** the new installer (it will replace the old version)
3. **Keep** your data (stored separately from application files)

### Manual Update
1. **Backup** your data using the export function
2. **Uninstall** the current version
3. **Install** the new version
4. **Import** your backed-up data if needed

## 🗑️ Uninstallation

### Using Windows Settings
1. Open **Settings** > **Apps**
2. Find **"Financial Organizer"**
3. Click **Uninstall**
4. Follow prompts to remove

### Using Control Panel
1. Open **Control Panel** > **Programs**
2. Find **"Financial Organizer"**
3. Click **Uninstall/Change**
4. Follow uninstall wizard

### Manual Removal
If automatic uninstall fails:
1. Delete application folder (usually in Program Files)
2. Remove desktop shortcut
3. Remove Start Menu entry
4. Clear registry entries (advanced users only)

## 📞 Getting Help

If you encounter issues not covered here:

- **Check**: [Common Issues](README.md#common-issues) in README
- **Search**: [GitHub Issues](../../issues) for similar problems
- **Create**: New issue with detailed error information
- **Include**: Your Windows version, error messages, and steps taken

## 📋 Quick Reference

### Default Installation Paths
- **Application**: `C:\Program Files\Financial Organizer\`
- **Data**: `%USERPROFILE%\AppData\Local\Financial Organizer\`
- **Shortcuts**: Desktop and Start Menu

### Important Files
- **Executable**: `Financial Organizer.exe`
- **Uninstaller**: `uninstall.exe`
- **Data**: Stored in browser localStorage

### Supported File Types
- **Export**: `.json` files
- **Import**: `.json` files (from same application)

---

For additional support, visit the [GitHub repository](../../) or create an issue.