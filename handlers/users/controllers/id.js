let ImgurImage = require('imgur').ImgurImage;


/* Partial update */
exports.patch = function* (next) {

    let user = this.params.user;
    let fields = this.request.body;

    'displayName realName birthday gender country town interests aboutMe profileName publicEmail'.split(' ').forEach((field)=>{
       if(field in fields){
           user[field] = fields[field];
       }
    });

    if(fields.photoId){
        let imgurImage = yield ImgurImage.findOne({imgurld: fields.photoId});
        if(!imgurImage){
            this.throw(404, "Нет такого изображения в базе");
        }
        user.photo = imgurImage.link;
    }



};