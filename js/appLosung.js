
'use strict';
$(function () {
    var imprint = $('#imprint');
    $("#btn-iconbar").click(function (event) {
        event.preventDefault();
        imprint.show();
    });
    $("#close").click(function (event) {
        event.preventDefault();
        imprint.hide();
    });
});

$(document).ready(function () {
    var imprint = $("#imprint");
    var bibleServer = "https://www.bibleserver.com/text/Ne%C3%9C%0A/";
    var Losvers = "";
    var Lehrtextvers = "";

    imprint.hide();
    $('#clock').simpleClock();
    // YYYY-MM-DD
    var dateObj = $().getDateString();
    var LosungsFile = "./data/LosungenFree" + dateObj.fullYear + ".xml";
    $('#imprintFullYear').html(dateObj.fullYear);

    $.ajax({
        type: "GET",
        url: LosungsFile,
        dataType: "xml",
        success: function (xml) {
            // dateObj.dateString: YYYY-MM-DD
            // find the DOM node of today. first fetch node <Datum>, the parent is the current <Losungen>
            var losungHeute = $(xml).find("Datum:contains(" + dateObj.dateString + ")").parent();
            var losText = losungHeute.children("Losungstext").text();
            losText = losText.replace(/\/(.+?)\//, '<i>$1</i><br />'); // replace / to italic. Caution! replace this first
            losText = losText.replace(/#(.+?)#/g, '<b>$1</b>'); 	// replace # to bold
            Losvers = losungHeute.children("Losungsvers").text();

            $('#los-text').html(losText);
            $('#los-vers').html( '<a href="' + encodeURI(bibleServer + Losvers) + '" target="_blank">' + Losvers + "</a>");

            var lehrText = losungHeute.children("Lehrtext").text();
            lehrText = lehrText.replace(/\/(.+?)\//, '<i>$1</i><br />'); // replace /
            lehrText = lehrText.replace(/#(.+?)#/g, '<b>$1</b>'); 	// replace #
            Lehrtextvers = losungHeute.children("Lehrtextvers").text();

            $('#los-lehrtext').html(lehrText);
            $('#los-lehrvers').html('<a href="' + encodeURI(bibleServer + Lehrtextvers) + '" target="_blank">' + Lehrtextvers + "</a>");
        },
        error: function () {
            alert("couldn't load XML file");
        }
    });
});
