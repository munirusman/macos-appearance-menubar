const { exec } = require('child_process');
const path = require('path');
const { setAppearanceMode, getCurrentAppearanceMode, updateTrayIcon } = require('../utils');

describe('Utility Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('setAppearanceMode', () => {
    it('should execute the correct command for dark mode', () => {
      exec.mockImplementation((command, callback) => {
        expect(command).toContain('set dark mode to true');
        callback(null, 'success', '');
      });

      setAppearanceMode('true');
      expect(exec).toHaveBeenCalledWith(
        expect.stringContaining('set dark mode to true'),
        expect.any(Function)
      );
    });

    it('should execute the correct command for light mode', () => {
      exec.mockImplementation((command, callback) => {
        expect(command).toContain('set dark mode to false');
        callback(null, 'success', '');
      });

      setAppearanceMode('false');
      expect(exec).toHaveBeenCalledWith(
        expect.stringContaining('set dark mode to false'),
        expect.any(Function)
      );
    });

    it('should handle execution errors', () => {
      const mockError = new Error('Permission denied');
      exec.mockImplementation((command, callback) => {
        callback(mockError, '', 'Permission denied');
      });

      setAppearanceMode('true');
      expect(exec).toHaveBeenCalledWith(
        expect.stringContaining('set dark mode to true'),
        expect.any(Function)
      );
    });
  });

  describe('getCurrentAppearanceMode', () => {
    it('should return "dark" when system returns true', async () => {
      exec.mockImplementation((command, callback) => {
        expect(command).toContain('get dark mode');
        callback(null, 'true', '');
      });

      const result = await getCurrentAppearanceMode();
      expect(result).toBe('dark');
    });

    it('should return "light" when system returns false', async () => {
      exec.mockImplementation((command, callback) => {
        expect(command).toContain('get dark mode');
        callback(null, 'false', '');
      });

      const result = await getCurrentAppearanceMode();
      expect(result).toBe('light');
    });

    it('should return "auto" when system returns unexpected value', async () => {
      exec.mockImplementation((command, callback) => {
        expect(command).toContain('get dark mode');
        callback(null, 'unknown', '');
      });

      const result = await getCurrentAppearanceMode();
      expect(result).toBe('auto');
    });

    it('should return "auto" when execution fails', async () => {
      exec.mockImplementation((command, callback) => {
        expect(command).toContain('get dark mode');
        callback(new Error('Failed'), '', '');
      });

      const result = await getCurrentAppearanceMode();
      expect(result).toBe('auto');
    });
  });

  describe('updateTrayIcon', () => {
    it('should set dark icon for dark mode', () => {
      const mockTray = {
        setImage: jest.fn()
      };

      updateTrayIcon(mockTray, 'dark');
      expect(mockTray.setImage).toHaveBeenCalledWith(
        expect.stringContaining('assets/dark.png')
      );
    });

    it('should set light icon for light mode', () => {
      const mockTray = {
        setImage: jest.fn()
      };

      updateTrayIcon(mockTray, 'light');
      expect(mockTray.setImage).toHaveBeenCalledWith(
        expect.stringContaining('assets/light.png')
      );
    });

    it('should set light icon for auto mode', () => {
      const mockTray = {
        setImage: jest.fn()
      };

      updateTrayIcon(mockTray, 'auto');
      expect(mockTray.setImage).toHaveBeenCalledWith(
        expect.stringContaining('assets/light.png')
      );
    });
  });

  describe('path joining', () => {
    it('should join paths correctly for icon files', () => {
      const result = path.join('assets', 'dark.png');
      expect(result).toBe('assets/dark.png');
    });
  });
}); 