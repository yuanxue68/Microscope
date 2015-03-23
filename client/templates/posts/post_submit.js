Template.postSubmit.events({
	'submit form': function(event){
		event.preventDefault();

		var post={
			url: $(event.target).find('[name=url]').val(),
			title: $(event.target).find('[name=title]').val(),
			description: $(event.target).find('[name=description]').val()
		};

		var errors=validatePost(post);
		if(errors.title||errors.url||errors.description)
			return Session.set('postSubmitErrors',errors);

		Meteor.call('postInsert',post, function(error,result){
			if(error){
				return throwError(error.reason);
			}
			if(result.postExists)
				throwError('This link has already been posted');

			Router.go('postPage', {_id:result._id});
		});
	}
});

Template.postSubmit.created=function(){
	Session.set('postSubmitErrors',{});
}

Template.postSubmit.helpers({
	errorMessage:function(field){
		return Session.get('postSubmitErrors')[field];
	},
	errorClass: function (field) {
		return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
	}
});