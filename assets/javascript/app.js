var topics;

topics = ["friends", "new girl", "seinfeld", "one tree hill", "rick and morty", "breaking bad", "parks and recreation", "family guy", "south park", "the simpsons"];

function displayGifTable() {
    var tvShow = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=sijIZlRHCEAIYIwrlTJZVWbdlc495geu&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#gifTable").empty();
        for (var i = 0; i < 10; i++) {
            var gifImage = $("<img>");
            gifImage.attr("src", response.data[i].images.fixed_height.url);
            var rating = $("<p>").text("Rating: " + response.data[i].rating);
            var gifDiv = $("<div>").append(rating).append(gifImage);
            gifDiv.css("float", "left").css("margin", "4px");
            $("#gifTable").prepend(gifDiv);
        }

    });
}

function renderButtons() {
    $(".buttonRow").empty();
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>").text(topics[i]);
        button.addClass("tvShow-button btn btn-primary");
        button.attr("data-name", topics[i]);
        button.css("margin", "10px");
        $(".buttonRow").append(button);
    }
}

$("#add-tvShow").on("click", function (event) {
    event.preventDefault();
    var tvShow = $("#tvShow-input").val().trim();
    topics.push(tvShow);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

$(document).on("click", ".tvShow-button", displayGifTable);

renderButtons();