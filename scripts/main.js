/*global jQuery, $, document*/
(function ($) {
    "use strict";
    $.getFeedAsJson = function (url) {
        return $.ajax({
            url: "https://rss-to-jsonp.azurewebsites.net/atom/?url=" + encodeURIComponent(url),
            dataType: "jsonp"
        });
    };
}(jQuery));

$(function () {
    "use strict";
    var $results = $("#results"),
        projectIdExtractRegex = new RegExp("[^/]+\/([0-9]+)$"),
        projectTemplate = $.template("projectTemplate", $("#projectTemplate"));
    $.getFeedAsJson("http://www.kickstarter.com/projects/feed.atom", 50).done(function (data) {
        var entries = data.entries,
            resultHtml = "";
        $.each(entries, function (i, entry) {
            entry.projectId = entry.id.match(projectIdExtractRegex)[1];
            resultHtml += $.render(entry, projectTemplate);
        });
        $results.append(resultHtml);
        $results.masonry({
            itemSelector: ".entry",
            columnWidth: 230
        });
    });
});