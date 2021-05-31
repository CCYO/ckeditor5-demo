class MyUploadAdapter {
    constructor( loader ) {
        // The file loader instance to use during the upload.
        this.loader = loader;
    }

    // Starts the upload process.
    upload() {
        return this.loader.file.then(
            file => 
                new Promise( ( resolve, reject ) => {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onerror = (err) => {
                        return reject(err)
                    }
                    reader.onloadend = () => {
                        /*  創建 editor 上一個新屬性 insertImgs，
                        **  用來存放自行插入的圖檔名稱，以便傳給後端使用 */
                        if(!window.editor.insertImgs){
                            window.editor.insertImgs = []
                        }
                        let n = window.editor.insertImgs.length
                        let [name, ext] = file.name.split(".")
                        let reg = /(image\/[\w\+]+);base64,([\d\w+/=]+)/g
                        let [undefined ,mime, base64str] = reg.exec(reader.result)
                        window.editor.insertImgs.push({ name, ext, mime, base64str })
                        
                        return resolve( { default: reader.result })
                    }
                })
        )
    }
}

function MyCustomBase64ImgUploadAdapter( editor ) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        // Configure the URL to the upload script in your back-end here!
        return new MyUploadAdapter( loader );
    };
}

export default MyCustomBase64ImgUploadAdapter