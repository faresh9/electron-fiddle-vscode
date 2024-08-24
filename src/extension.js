const path = require('path');
const { Uri } = require('vscode');
const vscode = require('vscode');

function activate(context) {
  let disposable = vscode.commands.registerCommand('extension.openWebview', function () {
    const panel = vscode.window.createWebviewPanel(
      'fiddleWebview',
      'Electron Fiddle',
      vscode.ViewColumn.One,
      {
        enableScripts: true
      }
    );

    const appPath = Uri.file(path.join(context.extensionPath, 'client', 'build'));
    const appUri = panel.webview.asWebviewUri(appPath);

    panel.webview.html = getWebviewContent(appUri);
  });

  context.subscriptions.push(disposable);
}

function getWebviewContent(appUri) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Electron Fiddle</title>
    </head>
    <body>
      <div id="root"></div>
      <script src="${appUri}/static/js/main.js"></script>
    </body>
    </html>
  `;
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
