# 💰 Financial Organizer

<div align="center">

**A modern desktop application for personal finance management**

![Version](https://img.shields.io/badge/Version-1.1.0-brightgreen)
![Platform](https://img.shields.io/badge/Platform-Windows%2010%2F11-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Electron](https://img.shields.io/badge/Electron-28.0.0-47848f)

[📥 Download Installer](#-download-options) •
[🚀 Quick Start](#-quick-start) •
[📖 Documentation](#-features) •
[🛠️ Development](#️-development)

</div>

---

## 🎯 Overview

Financial Organizer is a powerful desktop application built with Electron that helps you take complete control of your personal finances. With an intuitive interface and comprehensive features, you can track income, manage expenses, set financial goals, and visualize your financial data through interactive charts.

### ✨ Key Features

- 💰 **Income Tracking** - Monitor multiple income sources (salary, side income, interest, loans)
- 💳 **Expense Management** - Categorize expenses with 11 color-coded categories  
- 📅 **Expense Scheduling** - Schedule recurring expenses for future months
- 🏦 **Emergency Fund** - Set and track emergency fund goals with visual progress
- 📊 **Interactive Charts** - Real-time financial visualizations powered by Chart.js
- 🌙 **Dark/Light Theme** - Toggle between themes for comfortable viewing
- 📱 **Responsive Design** - Modern, clean interface that adapts to your needs
- 💾 **Secure Local Storage** - Your data stays private on your computer
- 📥 **Data Export/Import** - Complete JSON backup and restore functionality
- 🔒 **Administrator Support** - Runs with proper permissions on Windows

---

## 📥 Download Options

### For End Users (Recommended)

<div align="center">

### 🚀 [Download Installer (331MB)](../../releases/latest/download/Financial-Organizer-Installer.exe)

*One-click installer for Windows 10/11 with administrator privileges*

</div>

**What the installer includes:**
- ✅ Complete application installation
- ✅ Desktop shortcut creation  
- ✅ Start Menu integration
- ✅ Built-in uninstaller
- ✅ Automatic updates support
- ✅ Administrator privilege handling

### For Developers

<div align="center">

### 🛠️ [Download Source Code](../../archive/refs/heads/main.zip)

*Complete source code for development and customization*

</div>

---

## 🚀 Quick Start

### Installation (For Users)

1. **Download** the installer using the link above
2. **Right-click** on `Financial-Organizer-Installer.exe`
3. **Select** "Run as administrator"
4. **Follow** the installation wizard
5. **Launch** from desktop shortcut or Start Menu

> ⚠️ **Important**: Administrator privileges are required for proper installation and operation

### System Requirements

- **OS**: Windows 10 (64-bit) or Windows 11
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space
- **Permissions**: Administrator access for installation

---

## 📖 Features

### 💰 Income Management
- Track multiple income types: Salary, Side Income, Interest Received, Borrowed Money
- Add detailed descriptions for each income entry
- Monthly income summaries and totals
- Support for decimal amounts with comma notation (e.g., 1500,50)

### 💳 Expense Tracking
Comprehensive expense management with multiple categorization options:

**Expense Specifications:**
- Fixed, Variable, Investment, Emergency Reserve

**Payment Methods:**
- PIX, Debit Card, Credit Card, Investment

**11 Color-Coded Categories:**
- 🏋️ Gym (Red) - Fitness and health expenses
- 🍕 Food (Orange) - General food purchases  
- 🚗 Uber (Dark Blue) - Transportation services
- 🛒 Grocery (Green) - Supermarket purchases
- 💳 Installment (Purple) - Financing and installments
- ⚡ Bills (Blue) - Utilities (electricity, water, internet)
- 📱 Subscription (Dark Orange) - Netflix, Spotify, etc.
- 👕 Clothing (Violet) - Clothes and accessories
- 🍽️ Restaurant (Brown) - Dining out
- 🎮 Entertainment (Aqua) - Fun and leisure
- 🧾 Invoice (Dark Red) - Credit card bills

### 📅 Smart Scheduling
- Schedule expenses for future months
- One-click expense duplication
- Automatic date adjustment for recurring expenses

### 🏦 Emergency Fund Management
- Set custom emergency fund goals
- Visual progress tracking
- Dedicated fund contributions tracking
- Goal achievement notifications

### 📊 Data Visualization
Four types of interactive charts:
- **Expenses by Category** - Pie chart showing expense distribution
- **Income Types** - Donut chart displaying income sources
- **Essential vs Non-Essential** - Priority comparison
- **Payment Methods** - Spending method analysis

### 🎨 User Experience
- **Theme Toggle** - Switch between light and dark modes
- **Responsive Layout** - Adapts to different screen sizes
- **Intuitive Navigation** - Easy-to-use tabbed interface
- **Real-time Updates** - Instant calculation and chart updates

---

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm 8+
- Git
- Windows 10/11 (for Windows builds)

### Development Setup

```bash
# Clone the repository
git clone https://github.com/Pasblinn/Financial-Organizer.git
cd Financial-Organizer

# Install dependencies
npm install

# Run in development mode
npm run dev
```

### Available Scripts

```bash
# Development
npm start              # Start the application
npm run dev           # Development mode with DevTools

# Building
npm run build         # Build for current platform
npm run build-win     # Build for Windows
npm run build-windows # Build with custom script

# Cleaning
npm run clean         # Clean build cache and dist folder
```

### Project Structure

```
Financial-Organizer/
├── assets/              # Application icons and images
│   ├── icon.ico        # Windows icon
│   ├── icon.png        # Application icon
│   └── icon.svg        # Vector icon
├── build/              # Build configuration
│   ├── icon.ico        # Build icon
│   └── icon.png        # Build image
├── dist/               # Built application (generated)
├── node_modules/       # Dependencies
├── index.html          # Main application UI
├── main.js             # Electron main process
├── script.js           # Application logic
├── styles.css          # Application styles
├── package.json        # Project configuration
├── installer.nsi       # NSIS installer script
├── build-portable.js   # Portable build script
└── README.md           # This file
```

### Technologies Used

- **Electron 28.0.0** - Cross-platform desktop framework
- **Chart.js 4.4.0** - Interactive charts and visualizations
- **HTML5 + CSS3** - Modern web standards
- **JavaScript ES6+** - Application logic
- **NSIS** - Windows installer creation
- **LocalStorage API** - Client-side data persistence

---

## 🔧 Building from Source

### Creating Windows Installer

```bash
# Install NSIS (required for installer creation)
# Download from: https://nsis.sourceforge.io/

# Build the application
npm run build-win

# Create installer (Linux/WSL with NSIS)
makensis installer.nsi
```

### Custom Build Configuration

Edit `package.json` build section to customize:
- Application metadata
- Icon paths
- Installation directory
- File associations
- Installer behavior

### Large File Handling

For repositories with large files (like the installer), use Git LFS:

```bash
# Install Git LFS
git lfs install

# Track large files
git lfs track "*.exe"
git lfs track "dist/"

# Commit and push
git add .gitattributes
git commit -m "Add Git LFS support"
git push
```

---

## 📱 Screenshots

### Main Dashboard
The central hub showing your financial overview with income, expenses, and balance.

### Expense Management
Detailed expense tracking with categories, payment methods, and scheduling options.

### Interactive Charts
Visual representation of your financial data with multiple chart types.

### Emergency Fund Tracker
Goal-oriented savings tracking with visual progress indicators.

---

## 🤝 Contributing

We welcome code contributions from developers! Here's how you can help improve the project:

### Ways to Contribute (Code & Ideas)
- 🐛 Report bugs and issues
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit code improvements
- 🎨 Enhance UI/UX design

> **Note**: This is an open-source project. "Contributing" means helping with code, documentation, or ideas - not financial contributions.

### Development Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly on Windows
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Guidelines
- Follow existing code style and conventions
- Test all changes on Windows 10/11
- Update documentation for new features
- Ensure proper error handling
- Maintain backward compatibility

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for complete details.

### MIT License Summary
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ❗ License and copyright notice required

---

## 🐛 Support & Issues

### Getting Help
- 📖 **Documentation**: Check this README and code comments
- 🐛 **Bug Reports**: [Create an issue](../../issues/new?template=bug_report.md)
- 💡 **Feature Requests**: [Request a feature](../../issues/new?template=feature_request.md)
- 💬 **Questions**: [Start a discussion](../../discussions)

### Common Issues
- **Installation fails**: Ensure you're running as administrator
- **App won't start**: Check Windows compatibility (10/11 required)
- **Data not saving**: Verify folder permissions
- **Charts not displaying**: Ensure JavaScript is enabled

---

## 🏆 Acknowledgments

Special thanks to:
- **Electron Team** - For the amazing desktop framework
- **Chart.js Contributors** - For powerful charting capabilities
- **NSIS Community** - For installer creation tools
- **Open Source Community** - For inspiration and resources

---

## 📊 Project Stats

- **Development Time**: 6+ months
- **Lines of Code**: 2000+
- **File Size**: 331MB (installer)
- **Supported Languages**: English interface
- **Platforms**: Windows 10/11 (64-bit)

---

<div align="center">

### 🌟 Star this repository if you find it useful!

**[📥 Download Latest Version](../../releases/latest)** • **[🐛 Report Issues](../../issues)** • **[💬 Discussions](../../discussions)**

---

*Financial Organizer - Take control of your finances today!*

</div>