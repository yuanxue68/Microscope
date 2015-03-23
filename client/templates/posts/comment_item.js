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
		if(Session.get(this._id)===true)
			return true;
		else
			return false;
	}
});

Template.commentItem.events({
	'click .edit': function(){
	    Session.set(this._id,true);
	},

	'submit form': function(event){
		event.preventDefault();
		Session.set(this._id,false);
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
