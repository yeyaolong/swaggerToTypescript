declare namespace ChromeCustom {
    // export type request.menuInfo = {

    // }
    export namespace request {
        export type menuInfo = {
            editable: boolean;
            frameId: number;
            menuItemId: string;
            pageUrl: string;
            selectionText?: string;
        }
    }
}