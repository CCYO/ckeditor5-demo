const { join } = require('path')
const stream = require('stream')

const express = require('express')
const admin = require('firebase-admin')
const { v4: uuidv4 } = require('uuid')

const serviceAccount = require("./serviceAccountKey.json")

const app = express()

app.set('view engine', 'ejs')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://fir-0423.appspot.com"
})

// 來源：https://stackoverflow.com/questions/50988891/payloadtoolargeerror-with-limit-set
app.use(express.urlencoded({limit: '200mb', extended: true}));
app.use(express.json({limit: '200mb'}));

app.get( "/", (req, res) => {
    res.render('index')
})

app.post('/blog', (req, res) => {
    let { title, html, insertImgs, insertImgRef } = req.body
    let urls = insertImgs.map(({name, ext, mime, base64str}) => {
        let dataBuffer = Buffer.from(base64str, 'base64')
        const bufferStream = new stream.PassThrough()
        bufferStream.end(dataBuffer)
        return uploadFile(bufferStream, title, name, ext, mime)
    })
    Promise.all(urls).then( urls => {
        let reg = new RegExp( insertImgRef )
        urls.forEach( url => {
            if(reg.exec(html)){
                html = html.replace(reg, url)
            }
        })
        res.json({
            href: '/review',
            blog: { title, html }
        })
    })

    function uploadFile(bufferStream, title, name, ext, mime){
        const fileName = `${title}/${name}.${ext}`
        const bucket = admin.storage().bucket()
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
                    return resolve(url[0])
                })
            })
        })
        bufferStream.pipe(writeStream)
        return result
    }
})

app.use(express.static( join(__dirname , "public")))

app.listen( '80', () => {
    console.log('listening...')
})