const path = require("path");
const {
  app,
  Menu,
  BrowserWindow,
  Notification,
  Tray,
  nativeImage,
  ipcMain,
  nativeTheme,
} = require("electron");
const isDev = require("electron-is-dev");
const fs = require("fs");
const https = require("https");

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");

  const iconName = path.join(__dirname, "iconForDragAndDrop.png");
  const icon = fs.createWriteStream(iconName);

  fs.writeFileSync(
    path.join(__dirname, "drag-and-drop-1.md"),
    "# First file to test drag and drop"
  );
  fs.writeFileSync(
    path.join(__dirname, "drag-and-drop-2.md"),
    "# Second file to test drag and drop"
  );

  https.get("https://img.icons8.com/ios/452/drag-and-drop.png", (response) => {
    response.pipe(icon);
  });

  ipcMain.handle("dark-mode:toggle", () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = "light";
    } else {
      nativeTheme.themeSource = "dark";
    }
    return nativeTheme.shouldUseDarkColors;
  });

  ipcMain.handle("dark-mode:system", () => {
    nativeTheme.themeSource = "system";
  });

  ipcMain.on("ondragstart", (event, filePath) => {
    event.sender.startDrag({
      file: path.join(__dirname, filePath),
      icon: iconName,
    });
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

const dockMenu = Menu.buildFromTemplate([
  {
    label: "New Window",
    click() {
      console.log("New Window");
    },
  },
  {
    label: "New Window with Settings",
    submenu: [{ label: "Basic" }, { label: "Pro" }],
  },
  { label: "New Command..." },
]);

const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

const showNotification = () => {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

let tray 

app
  .whenReady()
  .then(() => {
    if (process.platform === "darwin") {
      app.dock.setMenu(dockMenu);
    }
  })
  .then(() => {
    createWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  })
  .then(showNotification)
  .then(() => {
    const icon = nativeImage.createFromPath('path/to/asset.png')
    tray = new Tray(icon)
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Item1', type: 'radio' },
      { label: 'Item2', type: 'radio' },
      { label: 'Item3', type: 'radio', checked: true },
      { label: 'Item4', type: 'radio' }
    ])
    
    tray.setContextMenu(contextMenu)
    tray.setToolTip('This is my application')
    tray.setTitle('This is my title')
  });



app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
