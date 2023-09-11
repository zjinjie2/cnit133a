$(document).ready(function () {
    var links = $("<ul>");
    $(".content h2").each(function (index, element) {
        var id = "cert" + index;
        $(this).attr("id", id);
        links.append($("<li><a href=#" + id + ">" + $(this).text() + "</a></li>"));
    });
    $(".content h1").after(links);
});