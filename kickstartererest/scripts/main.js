(function($) {
    $.getFeedAsJson = function (url, num) {
        return $.ajax({
            url: document.location.protocol + "//rss-to-jsonp.apphb.com/atom/?url=" + encodeURIComponent(url),
            dataType: "jsonp",
        });
    };
}(jQuery));

$(function () {
    var $results = $("#results");
        projectTemplate = $.template("projectTemplate", $("#projectTemplate"));
    $.getFeedAsJson("http://www.kickstarter.com/projects/feed.atom", 50).done(function (data) {
        var entries = data.entries,
            resultHtml = "";
        $.each(entries, function (i, entry) {
            entry.projectId = entry.id.match(/[^/]+\/([0-9]+)$/)[1];
            resultHtml += $.render(entry, projectTemplate);
        });
        $results.append(resultHtml);
        $results.masonry({
            itemSelector : '.entry',
            columnWidth : 230
        });
    });
});​