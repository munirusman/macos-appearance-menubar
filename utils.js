const { exec } = require('child_process');
const path = require('path');

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

// Function to update tray icon based on mode
function updateTrayIcon(tray, mode) {
  let iconFile = 'light.png';
  if (mode === 'dark') {
    iconFile = 'dark.png';
  }
  tray.setImage(path.join(__dirname, 'assets', iconFile));
}

module.exports = {
  setAppearanceMode,
  getCurrentAppearanceMode,
  updateTrayIcon
}; 