$(function(){
	// $.ajax({
	// 	url: '/',
	// 	method: 'GET',
	// 	async: true,
	// 	cache: false,
	// 	success: function(e){
			
	// 	}
	// })
	$("#send").on('click', function(){

		$.ajax({
			url: $("form").attr("action"),
			method: $("form").attr("method"),
			async: true,
			cache: false,
			data: $("form").serialize(),
			success: function(e){
				$(".groups").prepend(e);
			},
			error: function(e){
				console.log(e.responseText);
			}
		})		

	})
})