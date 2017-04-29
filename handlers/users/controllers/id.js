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

exports.get = function* (next) {

    console.log("dasdasdasdasdasdasdasdPARAMSSSSSSSSSSS"+ this.params);

   const fields = 'id created displayName realName birthday email gender country town interests aboutMe profileName publicEmail emailSignature'.split(' ');

   fields.forEach((field) =>{
        this.body[field] = this.params.user[field];
   }, this);

   this.body.photo = this.params.user.getPhotoUrl();

   this.body.hasPassword = Boolean(this.params.user.passwordHash);

   this.body.providers = this.params.user.providers.map(function (provider) {
        return{
            name: provider.name,
            photo: provider.profile.photos && provider.profile.photos[0] && provider.profile.photos[0].value,
            displayName: provider.profile.displayName
        }
   });

};