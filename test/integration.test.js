const fs = require('fs');
const path = require('path');

describe('App Integration', () => {
  describe('File Structure', () => {
    it('should have required files', () => {
      expect(fs.existsSync('main.js')).toBe(true);
      expect(fs.existsSync('package.json')).toBe(true);
      expect(fs.existsSync('utils.js')).toBe(true);
    });

    it('should have assets directory with icons', () => {
      expect(fs.existsSync('assets')).toBe(true);
      expect(fs.existsSync('assets/dark.png')).toBe(true);
      expect(fs.existsSync('assets/light.png')).toBe(true);
    });

    it('should have valid package.json', () => {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      expect(packageJson.name).toBe('macos-appearance-switcher');
      expect(packageJson.main).toBe('main.js');
      expect(packageJson.scripts).toHaveProperty('test');
      expect(packageJson.scripts).toHaveProperty('build');
    });
  });

  describe('Dependencies', () => {
    it('should have electron as dependency', () => {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      expect(packageJson.devDependencies).toHaveProperty('electron');
    });

    it('should have electron-builder as dependency', () => {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      expect(packageJson.devDependencies).toHaveProperty('electron-builder');
    });

    it('should have jest as dev dependency', () => {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      expect(packageJson.devDependencies).toHaveProperty('jest');
    });
  });

  describe('Build Configuration', () => {
    it('should have correct build configuration', () => {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      expect(packageJson.build).toBeDefined();
      expect(packageJson.build.appId).toBe('com.example.macos-appearance-switcher');
      expect(packageJson.build.productName).toBe('macOS Appearance Switcher');
      expect(packageJson.build.mac).toBeDefined();
      expect(packageJson.build.mac.extendInfo.LSUIElement).toBe(true);
    });
  });
}); 