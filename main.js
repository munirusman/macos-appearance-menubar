const { app, Tray, Menu, nativeTheme } = require('electron');
const { setAppearanceMode, getCurrentAppearanceMode, updateTrayIcon: updateTrayIconUtil } = require('./utils');

let tray = null;

// Function to update tray icon based on mode
function updateTrayIcon(mode) {
  updateTrayIconUtil(tray, mode);
}

// Function to create tray menu
async function createTrayMenu() {
  const currentMode = await getCurrentAppearanceMode();
  updateTrayIcon(currentMode);
  
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Appearance Mode',
      enabled: false
    },
    { type: 'separator' },
    {
      label: 'Dark Mode',
      type: 'radio',
      checked: currentMode === 'dark',
      click: () => setAppearanceMode('true')
    },
    {
      label: 'Light Mode',
      type: 'radio',
      checked: currentMode === 'light',
      click: () => setAppearanceMode('false')
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => app.quit()
    }
  ]);

  // Remove setContextMenu; instead, handle right-click event
  tray.removeAllListeners('right-click');
  tray.removeAllListeners('click');
  tray.on('right-click', () => {
    tray.popUpContextMenu(contextMenu);
  });
  tray.on('click', async () => {
    // On left click, toggle between dark and light mode only
    const currentMode = await getCurrentAppearanceMode();
    if (currentMode === 'light') {
      setAppearanceMode('true'); // Switch to dark
      updateTrayIcon('dark');
    } else if (currentMode === 'dark') {
      setAppearanceMode('false'); // Switch to light
      updateTrayIcon('light');
    }
    // Do nothing otherwise
  });
}

// App event handlers
app.whenReady().then(() => {
  // Always use light.png for the initial tray icon
  const path = require('path');
  tray = new Tray(path.join(__dirname, 'assets', 'light.png'));
  tray.setToolTip('macOS Appearance Switcher');
  
  // Create initial menu
  createTrayMenu();
  
  // Update menu when appearance changes
  nativeTheme.on('updated', () => {
    createTrayMenu();
  });
});

// Prevent app from closing when all windows are closed
app.on('window-all-closed', (event) => {
  event.preventDefault();
});

// Clean up tray when app is about to quit
app.on('before-quit', () => {
  if (tray) {
    tray.destroy();
  }
}); 