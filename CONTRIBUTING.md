'# Contributing to Financial Organizer

Thank you for considering contributing to Financial Organizer! This document outlines the process for contributing code, documentation, and ideas to this project.

> **Important**: This is an open-source project. "Contributing" refers to helping with development, not financial contributions. We welcome code improvements, bug reports, feature suggestions, and documentation enhancements!

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 8+
- Git
- Windows 10/11 (for testing Windows builds)

### Development Setup
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Financial-Organizer.git
   cd Financial-Organizer
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run in development mode:
   ```bash
   npm run dev
   ```

## 📝 How to Contribute

### Reporting Bugs
- Use the [GitHub Issues](../../issues) page
- Include detailed steps to reproduce the bug
- Mention your operating system and version
- Include screenshots if applicable

### Suggesting Features
- Open a feature request issue
- Describe the feature and its benefits
- Include mockups or examples if possible

### Code Contributions
1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Test thoroughly on Windows
4. Commit with clear messages:
   ```bash
   git commit -m "Add: new expense category feature"
   ```
5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. Open a Pull Request

## 📋 Code Guidelines

### JavaScript Style
- Use ES6+ features
- Follow existing code formatting
- Use meaningful variable names
- Add comments for complex logic

### Commit Messages
- Use clear, descriptive commit messages
- Start with action words: Add, Fix, Update, Remove
- Keep the first line under 50 characters
- Add body text for complex changes

### Testing
- Test all changes on Windows 10/11
- Verify the installer works correctly
- Check both light and dark themes
- Test data export/import functionality

## 🔧 Building and Testing

### Development Commands
```bash
npm run dev          # Development mode with DevTools
npm start            # Standard run
npm run build-win    # Build for Windows
```

### Creating Installer
```bash
# Build the app first
npm run build-win

# Create installer (requires NSIS)
makensis installer.nsi
```

## 📚 Project Structure

```
Financial-Organizer/
├── assets/          # Icons and images
├── build/           # Build configuration
├── main.js          # Electron main process
├── index.html       # Main UI
├── script.js        # Application logic
├── styles.css       # Styles
├── installer.nsi    # NSIS installer script
└── package.json     # Project configuration
```

## 🎯 Areas for Contribution

### High Priority
- Performance optimizations
- Additional chart types
- Multi-language support
- Data backup/sync features
- Accessibility improvements

### Medium Priority
- Additional expense categories
- Custom category creation
- Monthly/yearly reports
- Data filtering options
- Export to different formats

### Low Priority
- UI animations
- Sound notifications
- Plugin system
- Mobile companion app

## 📄 License

By contributing to Financial Organizer, you agree that your contributions will be licensed under the MIT License.

## 🤝 Code of Conduct

### Our Standards
- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Maintain a positive environment

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or insulting comments
- Publishing private information
- Any form of inappropriate conduct

## 📞 Questions?

If you have questions about contributing:
- Open a [Discussion](../../discussions)
- Create an [Issue](../../issues) with the "question" label
- Review existing documentation

Thank you for contributing to Financial Organizer! 🎉