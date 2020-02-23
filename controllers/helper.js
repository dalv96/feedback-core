
module.exports = {

    dateToStr(value) {
        const year = value.getFullYear();
        let month = value.getMonth() + 1;
        if (month < 10) {
            month = `0${month}`;
        }
        let day = value.getDate();
        if (day < 10) {
            day = `0${day}`;
        }
        return `${day}.${month}.${year}`;
    },

    dateToExtStr(value = new Date()) {
        let hour = value.getHours();
        if (hour < 10) {
            hour = `0${hour}`;
        }
        let min = value.getMinutes();
        if (min < 10) {
            min = `0${min}`;
        }
        let sec = value.getSeconds();
        if (sec < 10) {
            sec = `0${sec}`;
        }
        return `${this.dateToStr(value)} ${hour}:${min}:${sec}`;
    },
};
