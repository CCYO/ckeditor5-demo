const stream = require('stream')

const { v4: uuidv4 } = require('uuid')

const admin = require('../config/firebase-admin')

const bucket = admin.storage().bucket()

const uploadImg = (title, imgs) => {
    // imgs: [{name, ext, mime, base64str}, ...]
    let promise_arr = imgs.map( ({name, ext, mime, base64str}) => {
        let dataBuffer = Buffer.from(base64str, 'base64')
        const bufferStream = new stream.PassThrough()
        bufferStream.end(dataBuffer)
        return uploadFile(bufferStream, title, name, mime, ext)
    })
    
    return Promise.all(promise_arr)
        // @urls: [url, url, ...]
        .then(urls => urls)
}

const uploadFile = (bufferStream, title, name, mime,  ext) => {
    //const fileName = `/_0528/dog.${req.body[1].ext}`
    const fileName = `${title}/${name}.${ext}`
    const file = bucket.file(fileName)
    const uuid = uuidv4()
    const writeStream = file.createWriteStream({
        metadata: {
            contentType: mime,
            metadata: {
                firebaseStorageDownloadTokens: uuid
            }
        }
    })
    const result = new Promise((resolve, reject) => {
        writeStream.on('error', (error) => {
            reject(error)
        })
        writeStream.on('finish', (error) => {
            file.getSignedUrl({
                action: 'read',
                expires: '03-01-2500'
            }).then(url => {
                // @url: [url]
                resolve(url[0])
            })
        })
    })
    bufferStream.pipe(writeStream)
    return result
}

module.exports = {
    uploadImg
}
