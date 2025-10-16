const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,     // autorise require() et fetch
      contextIsolation: false    // permet d’accéder à document
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);















