import ClassicEditor from './ckeditor'


let editorEle = document.querySelector( '.editor' )

ClassicEditor
    .create( editorEle , {
        
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'outdent',
                'indent',
                '|',
                'imageInsert',
                'blockQuote',
                'insertTable',
                'mediaEmbed',
                'undo',
                'redo'
            ]
        },
        language: 'zh',
        image: {
            toolbar: [
                'imageTextAlternative',
                'imageStyle:full',
                'imageStyle:side',
                'linkImage'
            ]
        },
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells'
            ]
        },
        mediaEmbed: {
            previewsInData: true
        },
        licenseKey: '',

        imageRemoveEvent: {
            callback: (imagesSrc, nodeObjects) => {
                // note: imagesSrc is array of src & nodeObjects is array of nodeObject
                // node object api: https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_model_node-Node.html
                
                // window.editor.insertImgs 是在 ckeditor 的 自定義插件 MyCustomBase64ImgUploadAdapter 定義的
                window.editor.insertImgs = window.editor.insertImgs.filter( img => {
                    let reg = /image\/[\w\+]+;base64,([\d\w+/=]+)/
                    const [undefined, deleteImgbase64str] = reg.exec(imagesSrc[0])
                    return !( img.base64str === deleteImgbase64str )
                })
                
                console.log(window.editor.insertImgs)
            }
        },
        
    } )
    .then( editor => {
        window.editor = editor;
    } )
    .catch( error => {
        console.error( 'Oops, something went wrong!' );
        console.error( 'Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:' );
        console.warn( 'Build id: cr7ju2lqvhkt-ncbsu7b2050k' );
        console.error( error );
    } );