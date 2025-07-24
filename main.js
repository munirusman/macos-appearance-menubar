const { app, Tray, Menu, nativeTheme } = require('electron');
const path = require('path');
const { exec } = require('child_process');

let tray = null;

// Function to set macOS appearance mode
function setAppearanceMode(mode) {
  const command = `osascript -e 'tell application "System Events" to tell appearance preferences to set dark mode to ${mode}'`;
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error setting appearance mode: ${error}`);
      return;
    }
    console.log(`Appearance mode set to: ${mode}`);
  });
}

// Function to get current appearance mode
function getCurrentAppearanceMode() {
  return new Promise((resolve) => {
    exec('osascript -e \'tell application "System Events" to tell appearance preferences to get dark mode\'', (error, stdout) => {
      if (error) {
        console.error(`Error getting appearance mode: ${error}`);
        resolve('auto');
        return;
      }
      const result = stdout.trim();
      if (result === 'true') {
        resolve('dark');
      } else if (result === 'false') {
        resolve('light');
      } else {
        resolve('auto');
      }
    });
  });
}

// Function to create tray menu
async function createTrayMenu() {
  const currentMode = await getCurrentAppearanceMode();
  
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
    {
      label: 'Auto',
      type: 'radio',
      checked: currentMode === 'auto',
      click: () => {
        // For auto mode, we need to check if system is in dark mode
        exec('osascript -e \'tell application "System Events" to tell appearance preferences to get dark mode\'', (error, stdout) => {
          if (!error) {
            const isDark = stdout.trim() === 'true';
            setAppearanceMode(isDark ? 'true' : 'false');
          }
        });
      }
    },
    { type: 'separator' },
    {
      label: 'Refresh',
      click: () => createTrayMenu()
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => app.quit()
    }
  ]);

  tray.setContextMenu(contextMenu);
}

// App event handlers
app.whenReady().then(() => {
  // Always use icon.png for the tray icon
  tray = new Tray(path.join(__dirname, 'assets', 'icon.png'));
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