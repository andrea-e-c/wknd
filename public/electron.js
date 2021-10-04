const path = require("path");
const { app, Menu, BrowserWindow, Notification, Tray, nativeImage, ipcMain, nativeTheme,} = require("electron");
const isDev = require("electron-is-dev");
const fs = require("fs");
const https = require("https");

// FOR PROGRESS BAR
let progressInterval

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      // Integrate other nodes
      nodeIntegration: true,
      // Enable remote modules
      enableRemoteModule: true,
      // Allow javascript
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Load primary html file
  win.loadFile("index.html");

// ***** RUN PROGRESS BAR *****
  const INCREMENT = 0.03
  const INTERVAL_DELAY = 100

  let c = 0
  progressInterval = setInterval(() => {
    // update progress bar to next value
    // values between 0 and 1 will show progress, >1 will show indeterminate or stick at 100%
    win.setProgressBar(c)

    // increment or reset progress bar
    if (c < 2) {
      c += INCREMENT
    } else {
      c = (-INCREMENT * 5) // reset to a bit less than 0 to show reset state
    }
  }, INTERVAL_DELAY)


  // ******* CREATE DRAG & DROP ICON AND ITEMS *******
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

  // ******* DARK MODE FUNCTIONALITY *******
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

  // ******* DRAG AND DROP FUNCTIONALITY *******
  ipcMain.on("ondragstart", (event, filePath) => {
    event.sender.startDrag({
      file: path.join(__dirname, filePath),
      icon: iconName,
    });
  });

  // ******* DURING DEVELOPMENT, OPEN LOCALHOST 3000. OTHERWISE LOAD URL *******
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // ******* IF IN DEVELOPMENT MODE, OPEN DEV TOOLS UPON OPENING *******
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

// ******* CREATES MENU WHEN YOU RIGHT-CLICK ON THE DOC ICON *******
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

// ******* NOTIFICATIONS *******
const NOTIFICATION_TITLE = "Basic Notification";
const NOTIFICATION_BODY = "Notification from the Main process";

const showNotification = () => {
  new Notification({
    title: NOTIFICATION_TITLE,
    body: NOTIFICATION_BODY,
  }).show();
};

// ******* TRAY IS THE ICON IN THE TOP RIGHT CORNER WHEN YOUR APP IS RUNNNG *******
let tray;

// ******* WHEN THE APP LAUNCHES...
app
  .whenReady()
  .then(() => {
   // IF OPERATING SYSTEM IS LINUX...
   if (process.platform === "darwin") {
     // MAKE DOC MENU
     app.dock.setMenu(dockMenu);
   }
  })
  .then(() => {
    createWindow();
    // CREATE WINDOW
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  })
  // SHOW THE NOTIFICATION DEFINED ABOVE
  .then(showNotification)
  // SHOW AN ICON IN THE TOP RIGHT OF THE SCREEN
  .then(() => {
    const icon = nativeImage.createFromPath("path/to/asset.png");
    tray = new Tray(icon);
    const contextMenu = Menu.buildFromTemplate([
      { label: "Item1", type: "radio" },
      { label: "Item2", type: "radio" },
      { label: "Item3", type: "radio", checked: true },
      { label: "Item4", type: "radio" },
    ]);

    tray.setContextMenu(contextMenu);
    tray.setToolTip("This is my application");
    tray.setTitle("WKND");
  });

// before the app is terminated, clear both timers
app.on('before-quit', () => {
  clearInterval(progressInterval)
})

// ******* QUIT THE APP WHEN THE WINDOWS CLOSE *******
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
