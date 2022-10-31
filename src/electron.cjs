const windowStateManager = require('electron-window-state');
const { app, BrowserWindow, ipcMain } = require('electron');
const serve = require('electron-serve');
const path = require('path');

try {
	require('electron-reloader')(module);
} catch (e) {
	console.error(e);
}

const serveURL = serve({ directory: '.' });
const port = process.env.PORT || 5173;
const dev = !app.isPackaged;
let mainWindow;
function createWindow() {
	let windowState = windowStateManager({
		defaultWidth: 800,
		defaultHeight: 600,
	});

	let mainWindow = new BrowserWindow({
		title: 'Agaram',
		frame: false,
		alwaysOnTop: true,
		resizable: false,
		width: 400,
		height: 400,
		backgroundColor: '#fee2e2',
		webPreferences: {
			enableRemoteModule: true,
			contextIsolation: true,
			nodeIntegration: true,
			spellcheck: false,
			devTools: dev,
			backgroundThrottling: false,
			preload: path.join(__dirname, 'preload.cjs'),
		},
	});

	windowState.manage(mainWindow);
	mainWindow.webContents.openDevTools();
	app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
		mainWindow.focus();
	});

	mainWindow.once('close', (event) => {
		event.preventDefault();
		mainWindow.hide();
	});
	return mainWindow;
}

function loadVite(port) {
	mainWindow.loadURL(`http://localhost:${port}`).catch((e) => {
		console.log('Error loading URL, retrying', e);
		setTimeout(() => {
			loadVite(port);
		}, 200);
	});
}

function createMainWindow() {
	mainWindow = createWindow();
	if (dev) loadVite(port);
	else serveURL(mainWindow);
}

app.on('activate', () => {
	if (!mainWindow) {
		createMainWindow();
	}
});

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('to-main', (event, count) => {
	return mainWindow.webContents.send('from-main', `next count is ${count + 1}`);
});
