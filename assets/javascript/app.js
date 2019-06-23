var topics;

topics = ["friends", "new girl", "seinfeld", "one tree hill", "rick and morty", "how I met your mother", "parks and recreation", "family guy", "south park", "the simpsons"];

for (var i = 0; i < topics.length; i++) {
    var button = $("<button>").text(topics[i]);
    button.addClass("btn btn-primary");
    button.attr("data-name", topics[i]);
    button.css("margin", "10px");
    $(".buttonRow").append(button);
}

function displayGifTable() {

}