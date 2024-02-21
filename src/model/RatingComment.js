export default class RatingComment {
    rating;
    comment;
    commentLang;
    timestamp;
    country;
    city;
    region;
    ispName;

    constructor(rating, comment, timestamp, country, city, region, ispName, commentLang) {
        this.rating = rating;
        this.comment = comment;
        this.timestamp = timestamp;
        this.country = country;
        this.city = city;
        this.region = region;
        this.ispName = ispName;
        this.commentLang = commentLang;
    }

    getRating() {
        return Number(this.rating) || 0;
    }

    getComment() {
        return this.comment || "";
    }

    getCommentLang() {
        return this.commentLang || "";
    }

    getTimestamp() {
        return this.timestamp || 0;
    }

    getCountry() {
        return this.country || "";
    }

    getCity() {
        return this.city || "";
    }

    getRegion() {
        return this.region || "";
    }

    getIspName() {
        return this.ispName || "";
    }

    toRequestBody() {
        return JSON.stringify(this.toRequestJson());
    }

    toRequestJson() {
        let res = this.getRatingInfo();
        const isp = this.getAggregateIspInfo();

        if (isp && Object.keys(isp).length > 0) {
            res.isp = isp;
        }

        return res;
    }

    getRatingInfo() {
        let res = {};

        extractIn(res, "rating", this.getRating());
        extractIn(res, "comment", this.getComment());
        extractIn(res, "comment_lang", this.getCommentLang());
        
        return res;
    }

    getAggregateIspInfo() {
        let res = {};

        extractIn(res, "name", this.getIspName());
        extractIn(res, "countryCode", this.getCountry());
        extractIn(res, "countryRegion", this.getRegion());
        extractIn(res, "countryCity", this.getCity());
        
        return res;
    }
}

function extractIn(dst, key, value) {
    if (value) {
        dst[key] = value;
    }
}