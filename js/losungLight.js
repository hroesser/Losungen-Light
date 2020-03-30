/******
 * (c) Hermann Rösser, 2016
 * license: MIT
 * a simple jQ lib
 */
'use strict';

jQuery.fn.extend({
    // call:  var dateObj =	$().getDateString() ;
    // fullYear: dateObj.fullYear, dateString: dateObj.dateString
    getDateString: function () {
        var date = new Date();
        return {
            // YYYY-MM-DD
            fullYear:date.getFullYear(),
            dateString: date.getFullYear() + '-' + this.appendZero(date.getMonth() + 1) + '-' + this.appendZero(date.getDate())
        };
    },
   
    appendZero: function (num) {
        if (num < 10) {
            return "0" + num;
        }
        return num;
    },

    getVersLink: function (vers) {
        // first split by ' '
        var arrVers = vers.split(' ');
        var book = arrVers[0];
        var kapVers = arrVers[1];
        // now split by ' '
        var arrKapVers = kapVers.split(',');
        var kap = arrKapVers[0];
        var kapVers = arrKapVers[1];
        //console.log( 'buch: ' + book+  ' kap: ' + kap  + ' vers: ' + vers );
        return {
            book: book,
            kap: kap,
            vers: kapVers
        }
    }
});
