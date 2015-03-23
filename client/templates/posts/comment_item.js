Template.postSubmit.created=function(){
	Session.set('editing',false);
}

Template.commentItem.helpers({
	submittedText: function (){
		return this.submitted.toString();
	},

	ownComment:function(){
		return this.userId===Meteor.userId();
	},
	editingOrNot:function(){
		if(Session.get('editing')===true)
			return true;
		else
			return false;
	}
});

Template.commentItem.events({
	'click .edit': function(){
	    Session.set('editing',true);
	},

	'submit form': function(event){
		event.preventDefault();
		Session.set('editing',false);
		var commentProperties={
			body: $(".editBox").val(),
		}

		Meteor.call("commentUpdate",this._id,commentProperties);

	},

	'click .remove': function(){
	    if(confirm("Are you sure you want to remove your comment?")){
	    	Meteor.call('commentRemove',this._id);
	    }
	},

});
