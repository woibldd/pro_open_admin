module.exports = class TokenStatus {

    constructor () {
        this.REVIEWING = 0;
        this.LISTED = 1;
        this.FAILED = 2;
    }

    getKey (value) {
        switch (value) {
            case this.REVIEWING:
                return 'Reviewing';
            case this.LISTED:
                return 'Listed';
            case this.FAILED:
                return 'Failed';
        }
    }

}