# 💰 Financial Organizer

<div align="center">

![Badge](https://img.shields.io/badge/Status-Active-brightgreen)
![Badge](https://img.shields.io/badge/Version-1.0.0-blue)
![Badge](https://img.shields.io/badge/Electron-28.0.0-47848f)
![Badge](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![Badge](https://img.shields.io/badge/License-MIT-green)

**Complete desktop software for personal finance management**

[📥 Download](#-download) •
[🚀 Installation](#-installation) •
[📖 How to Use](#-how-to-use) •
[🛠️ Development](#️-development)

</div>

---

## 📋 **About the Project**

The **Financial Organizer** is a desktop application developed with **Electron** that allows complete control of your personal finances in a simple and intuitive way. With a modern interface and advanced features, you can monitor income, expenses, create emergency reserves and visualize data through interactive charts.

### ✨ **Key Features**

- 💰 **Income Control**: Salary, extra earnings, interest received and loans
- 💳 **Expense Management**: Detailed categorization with unique colors
- 📅 **Expense Scheduling**: Schedule expenses for the next month
- 🏦 **Emergency Reserve**: Personalized goal with visual progress
- 📊 **Interactive Charts**: Real-time visualizations of your data
- 🌙 **Dark/Light Theme**: Interface adaptable to your taste
- 📱 **Responsive Interface**: Modern and intuitive design
- 💾 **Local Storage**: Your data stays secure on your computer
- 📥 **Data Export**: Complete JSON backup

---

## 📥 **Download**

<div align="center">

### [📥 **Download Financial Organizer**](https://github.com/Pasblinn/Financial-Organizer/archive/refs/heads/main.zip)

*Complete source code and executable files included*

</div>

---

## 🚀 **Installation**

### **Method 1: PowerShell Installer (Recommended)**
1. **Download** the repository ZIP file using the link above
2. **Extract** all contents to a folder
3. **Right-click** on `Install-FinancialOrganizer.ps1`
4. **Select** "Run with PowerShell" 
5. **Follow** the installation prompts
6. **Launch** from Desktop or Start Menu shortcut

### **Method 2: Batch Installer** 
1. **Download** and extract the project
2. **Double-click** `create-installer.bat`
3. **Follow** the installation steps
4. **Use** created shortcuts to launch

### **Method 3: Manual Setup (Advanced)**
```bash
# Download Node.js from https://nodejs.org (if needed)
# Extract the ZIP file
# Open terminal in project folder

# Install Electron
npm install electron --save-dev

# Run the application  
npx electron .
```

### **Requirements**
- **Windows 10/11** (64-bit recommended)
- **Node.js 16+** (automatically prompted if missing)
- **4GB RAM** minimum
- **100MB** free disk space

> 📋 **Full installation guide**: See [INSTALLATION.md](INSTALLATION.md) for detailed instructions and troubleshooting

---

## 📖 **How to Use**

### 🏠 **Main Screen**
The main screen displays a **financial summary** of the current month with:
- 💰 **Total Income** for the month
- 💳 **Total Expenses** for the month
- 💵 **Final Balance** (Income - Expenses)
- 🏦 **Emergency Reserve** with goal progress

### 💰 **Managing Income**
1. Click on the **"💰 Income"** tab
2. Click **"+ Add Income"**
3. Fill in:
   - **Type**: Salary, Side Income, Interest Received, Borrowed
   - **Amount**: Use comma for decimals (e.g., 1500.50)
   - **Description**: Optional

### 💳 **Managing Expenses**
1. Click on the **"💳 Expenses"** tab
2. Click **"+ Add Expense"**
3. Fill in all fields:
   - **Specification**: Fixed, Variable, Investment, etc.
   - **Day**: Day of the month (1-31)
   - **Type**: Essential or Non-Essential
   - **Payment Method**: PIX, Debit, Credit, Investment
   - **Category**: Choose from 11 available categories
   - **Amount**: Use comma for decimals
   - **Status**: Check if already paid

### 📅 **Schedule Expense for Next Month**
1. In the expense list, find the desired item
2. Click the **"📅 Next Month"** button
3. Confirm the action
4. The expense will be automatically copied to the next month

### 🎨 **Categories and Colors**

Each category has a unique color for easy identification:

| Category | Color | Suggested Use |
|----------|-------|---------------|
| 🏋️ **Gym** | ![#e74c3c](https://via.placeholder.com/20/e74c3c/000000?text=+) Red | Monthly fees, personal trainer |
| 🍕 **Food** | ![#f39c12](https://via.placeholder.com/20/f39c12/000000?text=+) Orange | General food purchases |
| 🚗 **Uber** | ![#2c3e50](https://via.placeholder.com/20/2c3e50/000000?text=+) Dark Blue | App transportation |
| 🛒 **Grocery** | ![#27ae60](https://via.placeholder.com/20/27ae60/000000?text=+) Green | Supermarket, market |
| 💳 **Installment** | ![#8e44ad](https://via.placeholder.com/20/8e44ad/000000?text=+) Purple | Financing, installments |
| ⚡ **Bills** | ![#3498db](https://via.placeholder.com/20/3498db/000000?text=+) Blue | Electricity, water, internet, phone |
| 📱 **Subscription** | ![#e67e22](https://via.placeholder.com/20/e67e22/000000?text=+) Dark Orange | Netflix, Spotify, etc. |
| 👕 **Clothing** | ![#9b59b6](https://via.placeholder.com/20/9b59b6/000000?text=+) Violet | Clothes and accessories |
| 🍽️ **Restaurant** | ![#d35400](https://via.placeholder.com/20/d35400/000000?text=+) Brown | Meals outside home |
| 🎮 **Entertainment** | ![#1abc9c](https://via.placeholder.com/20/1abc9c/000000?text=+) Aqua | Entertainment, fun |
| 🧾 **Invoice** | ![#c0392b](https://via.placeholder.com/20/c0392b/000000?text=+) Dark Red | Credit card, bills |

### 🏦 **Emergency Reserve**
1. Access the **"🏦 Emergency Reserve"** tab
2. Set your **goal** in currency
3. Click **"Save Goal"**
4. Add expenses with **"Emergency Reserve"** specification
5. Track visual progress of your goal

### 📊 **Viewing Charts**
The **"📈 Charts"** tab offers 4 visualizations:
- **Expenses by Category**: Pie chart with expense distribution
- **Income Types**: Donut chart with income sources
- **Essential vs Non-Essential**: Priority comparison
- **Payment Methods**: How you spend most

### 🌙 **Theme Toggle**
- Click the **🌙/☀️** button in the top right corner
- Switch between **light** and **dark** theme
- Settings saved automatically

### 📥 **Exporting Data**
- Click the **📥** button in the header
- JSON file will be downloaded automatically
- Contains complete backup of all your data

---

## 🛠️ **Development**

### **Prerequisites**
- Node.js 16+
- npm 8+

### **Development Installation**
```bash
# Clone the repository
git clone https://github.com/Pasblinn/Financial-Organizer.git

# Enter directory
cd Financial-Organizer

# Install dependencies
npm install

# Run in development mode
npm run dev
```

### **Available Scripts**
```bash
# Development
npm start          # Start the application
npm run dev       # Development mode with DevTools

# Build
npm run build     # Build for all platforms
npm run build-win # Build for Windows only
npm run build-mac # Build for macOS only
npm run build-linux # Build for Linux only
```

### **Project Structure**
```
financial-organizer/
├── main.js           # Electron main process
├── index.html        # Main interface
├── styles.css        # Application styles
├── script.js         # Application logic
├── package.json      # Settings and dependencies
├── assets/           # Icons and images
├── dist/            # Build files
└── docs/            # Additional documentation
```

### **Technologies Used**
- **Electron 28.0.0** - Main framework
- **Chart.js 4.4.0** - Interactive charts
- **HTML5 + CSS3** - Modern interface
- **JavaScript ES6+** - Application logic
- **LocalStorage** - Data storage

---

## 🤝 **Contributing**

Contributions are very welcome! To contribute:

1. **Fork** this repository
2. Create a **branch** for your feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. Open a **Pull Request**

### **Code of Conduct**
- Respect all contributors
- Keep discussions constructive
- Follow project coding standards

---

## 📝 **Changelog**

### **v1.0.0** - 2025-09-01
#### ✨ **New Features**
- 🎉 First stable release
- 💰 Complete income and expense system
- 📅 Schedule expenses for next month functionality
- 🎨 11 categories with unique colors
- 🏦 Emergency reserve system with goals
- 📊 4 types of interactive charts
- 🌙 Dark/light theme
- 📥 JSON data export
- 📱 Responsive and modern interface

#### 🔧 **Technical Improvements**
- ⚡ Optimized performance
- 💾 Secure local storage
- 🎯 Intuitive interface
- 🔒 Private data (doesn't go to internet)

---

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 **Author**

**Pablo Tadini**
- 📧 Email: [pablosotomaior@live.com](mailto:pablosotomaior@live.com)
- 🐙 GitHub: [@Pasblinn](https://github.com/Pasblinn)
- 💼 LinkedIn: [Pablo Tadini](https://linkedin.com/in/pablintadini)

---

## 🙏 **Acknowledgments**

- **Chart.js** for the excellent charting library
- **Electron** for enabling desktop applications with web technologies
- **Open Source Community** for inspiration and resources

---

<div align="center">

### ⭐ **If this project helped you, leave a star!** ⭐

**[📥 Download Latest Version](https://github.com/Pasblinn/Financial-Organizer/archive/refs/heads/main.zip)**

---

*Made with ❤️ by Pablo Tadini*

</div>