const moment = require("moment");
moment.locale("ru");

module.exports = function (data) {

    if (this.type === "d") {

        const {src, options} = data;
        const srcDate = src[options].replace(/[\"\»\«]/g, "");

        const dateFormats = {
            "YYYY-MM-DD" : /\d{4}\-\d{2}\-\d{2}/,
            "YYYY.MM.DD" : /\d{4}\.\d{2}\.\d{2}/,
            "YYYY/MM/DD" : /\d{4}\/\d{2}\/\d{2}/,
            "DD-MM-YYYY" : /\d{2}\-\d{2}\-\d{4}/,
            "DD.MM.YYYY" : /\d{2}\.\d{2}\.\d{4}/,
            "DD/MM/YYYY" : /\d{2}\/\d{2}\/\d{4}/,
            "DD MMM YYYY" : /([1-9]|0[1-9]|[12][0-9]|3[01]) (янв\D{0,3}|фев\D{0,4}|мар\D{0,2}|апр\D{0,4}|ма[йя]|июн\D{0,1}|июл\D{0,1}|авг\D{0,4}|сен\D{0,5}|окт\D{0,4}|ноя\D{0,3}|дек\D{0,4}) \d{4}/,
        }

        const timeFormats = {
            "HH:mm:ss.SSS" : /(?<![\+\-])\d{2}\:\d{2}\:\d{2}\.\d{1,3}/,
            "HH:mm:ss" : /(?<![\+\-])\d{2}\:\d{2}\:\d{2}/,
            "HH:mm" : /(?<![\+\-])\d{2}\:\d{2}/,
        }

        const timezoneFormat = /[\+\-]\d{2}\:\d{2}/;

        let date = null;
        let time = null;
        let timezone = null;
        let dateFormat = "";


        for (const prop in dateFormats){
            if(dateFormats[prop].test(srcDate)) {
                date = srcDate.match(dateFormats[prop])[0];
                dateFormat = dateFormat + prop;
                break;
            }
        }

        for (const prop in timeFormats){
            if(timeFormats[prop].test(srcDate)) {
                time = srcDate.match(timeFormats[prop])[0];
                dateFormat = dateFormat + prop;
                break;
            }
        }

        if (timezoneFormat.test(srcDate)){
            timezone = srcDate.match(timezoneFormat)[0];
            dateFormat = dateFormat + "Z";
        }

        const dateString = `${date ? date : ""}${time ? "T" + time : ""}${timezone ? timezone : ""}`;

        if (timezone) {
            return moment(dateString, dateFormat).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
        }
        
        return moment.utc(dateString, dateFormat).toISOString();

    } else {
        throw new Error("Data is not date");
    }
          
}