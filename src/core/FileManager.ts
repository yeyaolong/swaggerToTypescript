class FileManager {
    constructor() {}

    createFiles(name: string, data: any) {
        console.log('createFiles', data, name)
        let urlObject = window.URL || window.webkitURL || window;
        var export_blob = new Blob([data]);
        var save_link = document.createElement("a");
        save_link.href = urlObject.createObjectURL(export_blob);
        save_link.download = name;
        save_link.click();
        save_link.remove();
        window.URL.revokeObjectURL(save_link.href);
    }
}

const fileManager = new FileManager();

export default fileManager;