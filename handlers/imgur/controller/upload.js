const multiparty = require('multiparty');
const uploadStream = require('../lib/uploadStream');
const co = require('co');

exports.post = function*(){


let imgurImage;

try{
   imgurImage =  yield new Promise((resolve, reject) => {
        const form = new multiparty.Form();

        // multipart file must be the last
        form.on('part', function(part){
            this.log.debug("Part", part.name, part.filename);

            if(!part.filename){
                 reject(new Error("No filename for form part " + part.name));
                 return;
            }    

            co(function*(){
                // filename='blob' for FormData(photo, blob) where blob comes from canvas.toBlob
                return yield* uploadStream(part.filename, part.byteCount, part);
            }).then(function(result){
                resolve(result);
           }).catch(reject);
        });      

         form.on('error', reject);

         form.parse(this.req);
    });

}catch(e){
    throw e;
}

this.body = {
    link:    imgurImage.link,
    imgurId: imgurImage.imgurId
}

};