/**
 * Created by jumbot on 06.04.17.
 */
module.exports = function*(next) {
    if(this.isAuthenticated()){
        yield* next;
    }else {
        this.throw(401);
    }
};