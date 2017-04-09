/**
 * FLASH MIDDLEWARE
 */
exports.init = function(app) {
    // koa-flash is broken
    // reading from one object, writing to another object
    // occasionally writing to default

    app.use(function *flash(next) {

        // this.flash is the previous flash
        this.flash = this.session.flash || {};

        // overwrite this.session.flash with a new object
        // thus deleting the old content
        // this.newFlash is an accessor to the new flash
        this.session.flash = {};

        Object.defineProperty(this, 'newFlash', {
            get: function() {
                return this.session.flash;
            },
            set: function(val) {
                this.session.flash = val;
            }
        });


        yield* next;

        // note that this.session can be null
        // (logout does that)
        // note that this.session.flash may not exist (if session just created)
        if (this.session && this.session.flash && Object.keys(this.session.flash).length === 0) {
            // don't write empty new flash
            delete this.session.flash;
        }

        if (this.status == 302 && this.session && !this.session.flash) {
            // pass on the flash over a redirect
            this.session.flash = this.flash;
        }

    });

    app.use(function* () {

        let notificationTypes = ["error", "warning", "info", "success"];

        // by default koa-flash uses same defaultValue object for all flashes,
        // this.flash.message writes to defaultValue!

        this.addFlashMessage = function (type, html) {
            // split this.flash from defaultValue (fix bug in koa-flash!)
            if (!this.newFlash.messages) {
                this.newFlash.messages = [];
            }

            if (!~notificationTypes.indexOf(type)) {
                throw new Error("Unknown flash type: " + type);
            }

            this.newFlash.messages.push({
                type: type,
                html: html
            });
        };

        yield* next;

    });

};