const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

function activate(context) {
    console.log('Your extension "electron-fiddle-vscode" is now active!');

    const disposable = vscode.commands.registerCommand('electron-fiddle-vscode.helloWorld', function () {
        const panel = vscode.window.createWebviewPanel(
            'reactApp', // Identifies the type of the webview. Used internally
            'React App', // Title of the panel displayed to the user
            vscode.ViewColumn.One, // Editor column to show the new webview panel in
            {
                enableScripts: true,
                localResourceRoots: [
                    vscode.Uri.file(path.join(context.extensionPath, 'client', 'build'))
                ]
            } // Webview options. More on these later.
        );

        const appPath = path.join(context.extensionPath, 'client', 'build');
        const indexPath = vscode.Uri.file(path.join(appPath, 'index.html'));

        const indexContent = fs.readFileSync(indexPath.fsPath, 'utf8');
        const fixedContent = indexContent
            .replace(/(href|src)="\//g, `$1="${panel.webview.asWebviewUri(vscode.Uri.file(appPath))}/`);

        panel.webview.html = fixedContent;
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
