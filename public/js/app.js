// wait for the window to load
$(function() {
	var $newPhrase = $("#newPhrase");
	var $phraseCards = $("#phraseCards");
	var phrases = [];
	
	var $template = _.template($("#cardTemplate").html())
	
	// get and render template
	$.get("/catchphrase").done(function (phrases) {
			_(phrases).each(function (catchphrase){
				$catchphrase = $($template(catchphrase));
				$catchphrase.data("_id", catchphrase._id);
				console.log($catchphrase.data());
				$phraseCards.append($catchphrase);
			});
		});
	// wait for #newPhrase submit
	$newPhrase.on("submit", function (e) {
		e.preventDefault();

		// turn form data into a string
		var phraseData = $newPhrase.serialize();

		//POST form data
		$.post("/catchphrase", phraseData).done(function (data){
			console.log(data);
			//reset the form
			$newPhrase[0].reset();
			var $catchphrase = $($template(data));

			// add id to $catchphrase
			$catchphrase.data("_id", data._id);
			$phraseCards.append($catchphrase);
			phrases.push(data);
		});
	});

	$phraseCards.on("click", "#f1_container .remove", function (e) {
		var $catchphrase = $(this).closest("#f1_container")
		var _id = $catchphrase.data("_id");
		console.log("DELETE", _id);
		$.ajax({
			url: "/catchphrase/" +_id,
			type: "DELETE"
		}).done(function () {
			$catchphrase.remove();
		})
	})

})