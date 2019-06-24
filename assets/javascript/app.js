var topics;
var alreadyShowedGifs = false;
var myThis;
var howManyGifsCounter = 10;
$("#error-message").hide();
topics = ["friends", "new girl", "seinfeld", "one tree hill", "rick and morty", "breaking bad", "parks and recreation", "family guy", "south park", "the simpsons"];

function displayGifTable() {
    $("#error-message").hide();
    alreadyShowedGifs = true;
    myThis = this;
    var tvShow = $(myThis).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#gifTable").empty();
        for (var i = 0; i < 10; i++) {
            var gifImage = $("<img>");
            var animatedURL = response.data[i].images.fixed_height.url;
            console.log(animatedURL);
            var stillURL = response.data[i].images.fixed_height_still.url;
            console.log(stillURL);
            gifImage.attr("src", stillURL);
            gifImage.addClass("gif");
            gifImage.attr("data-still", stillURL);
            gifImage.attr("data-animate", animatedURL);
            gifImage.attr("data-state", "still");
            var rating = $("<p>").text("Rating: " + response.data[i].rating);
            var gifDiv = $("<div>").append(rating).append(gifImage);
            gifDiv.css("float", "left").css("margin", "5px");
            $("#gifTable").prepend(gifDiv);
        }
    });
}

function displayMoreGifsTable() {
    if (alreadyShowedGifs) {
        howManyGifsCounter += 10;
        var tvShow = $(myThis).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=" + howManyGifsCounter;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (var i = (howManyGifsCounter - 10); i < howManyGifsCounter; i++) {
                var gifImage = $("<img>");
                var animatedURL = response.data[i].images.fixed_height.url;
                console.log(animatedURL);
                var stillURL = response.data[i].images.fixed_height_still.url;
                console.log(stillURL);
                gifImage.attr("src", stillURL);
                gifImage.addClass("gif");
                gifImage.attr("data-still", stillURL);
                gifImage.attr("data-animate", animatedURL);
                gifImage.attr("data-state", "still");
                var rating = $("<p>").text("Rating: " + response.data[i].rating);
                var gifDiv = $("<div>").append(rating).append(gifImage);
                gifDiv.css("float", "left").css("margin", "5px");
                $("#gifTable").prepend(gifDiv);
            }
        });
    }
    else {
        $("#error-message").show();
    }

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
    renderButtons();
});

$(document).on("click", ".gif", function () {
    console.log("clicked image!");
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$(document).on("click", "#more-gifs-button", displayMoreGifsTable);

$(document).on("click", ".tvShow-button", displayGifTable);

renderButtons();