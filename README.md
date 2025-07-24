# macOS Appearance Switcher

A simple Electron app that adds a menu bar item to quickly switch between macOS appearance modes (Dark, Light, and Auto).

## Features

- Menu bar integration
- Quick switching between Dark, Light, and Auto appearance modes
- Real-time menu updates when system appearance changes
- Refresh option to manually update the menu

## Installation

1. **Provide an icon:**
   - Place your own 16x16 PNG icon at `assets/icon.png` (required for the menu bar)

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the app:
   ```bash
   npm start
   ```

## Usage

Once the app is running, you'll see your icon in the macOS menu bar. Click on it to see the following options:

- **Dark Mode**: Switches to dark appearance
- **Light Mode**: Switches to light appearance  
- **Auto**: Follows system appearance settings
- **Refresh**: Manually refresh the menu
- **Quit**: Close the app

## Building

To build a distributable app:

```bash
npm run build
```

The built app will be available in the `dist` folder.

## Requirements

- macOS 10.14 or later
- Node.js 16 or later
- Electron 28 or later

## Permissions

The app requires accessibility permissions to change system appearance settings. You may be prompted to grant these permissions in System Preferences > Security & Privacy > Privacy > Accessibility.

## Development

To run in development mode:

```bash
npm run dev
```

## License

MIT 