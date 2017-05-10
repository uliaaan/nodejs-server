/**
 * Created by jumbot on 11.04.17.
 */

let User = require('users').User;


// skips the request unless it's the owner
exports.get = function*(next) {

    if(!this.user){
        yield* next;
        return;
    }

    if(!this.params.profileName){
        this.status = 301;
        this.redirect(`/profile/${this.user.profileName}`);
        return;
    }

    let user = yield User.findOne({profileName: this.params.profileName});

    if(!user){
        this.throw(404);
    }

    // if the visitor is the profile owner
    if(String(this.user._id) == String(user._id)){

        this.body = this.render('index');
    }else{
        yield* next;
    }

};