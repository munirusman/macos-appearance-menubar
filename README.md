# macOS Appearance Switcher

A simple menu bar utility for macOS that allows you to quickly switch between Light and Dark appearance modes.

## Features

- **Menu Bar App**: Runs in the menu bar, no dock icon
- **Quick Toggle**: Left-click to switch between Light and Dark modes
- **Context Menu**: Right-click for detailed options
- **Universal Binary**: Works on both Apple Silicon and Intel Macs

## Installation

### Option 1: DMG Installer (Recommended)
1. Download the latest release from the [Releases page](https://github.com/YOUR_USERNAME/macos-appearance-switcher/releases)
2. Open the `.dmg` file
3. Drag the app to your Applications folder
4. Launch the app from Applications

### Option 2: Direct App File
1. Download the `.zip` file from the [Releases page](https://github.com/YOUR_USERNAME/macos-appearance-switcher/releases)
2. Extract the ZIP file
3. Run the `.app` file directly (no installation required)
4. Optionally drag to Applications folder for permanent installation

## Usage

- **Left-click** the menu bar icon to toggle between Light and Dark modes
- **Right-click** for a context menu with more options
- The icon changes to reflect the current appearance mode

## Permissions

The app requires accessibility permissions to control system appearance settings. You'll be prompted to grant permission in System Preferences > Security & Privacy > Privacy > Accessibility.

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for distribution
npm run build
```

## Requirements

- macOS 10.14 or later
- Works on both Apple Silicon and Intel Macs

## License

MIT License - see LICENSE file for details. 