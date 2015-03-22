Template.postEdit.events({
	'submit form': function(event){
		console.log("editing");
		event.preventDefault();

		var currentPostId=this._id;

		var postProperties={
			url: $(event.target).find('[name=url]').val(),
			title: $(event.target).find('[name=title]').val()
		}
		console.log(postProperties.url);
		console.log(postProperties.title);
		Posts.update(currentPostId,{$set:postProperties},function(error){
			if(error){
				alert(error.reason);
			} else {
				Router.go('postPage',{_id:currentPostId});
			}
		});
	},

	'click .delete': function(event){
		event.preventDefault();

		if(confirm("Are you sure you want to delete this post?")){
			var currentPostId=this._id;
			Posts.remove(currentPostId);
			Router.go('postsList');
		}
	}
});