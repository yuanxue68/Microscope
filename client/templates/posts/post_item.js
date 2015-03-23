Template.postItem.helpers({
	domain:function(){
		var a=document.createElement('a');
		a.href=this.url;
		return a.hostname;
	},

	ownPost:function(){
		return this.userId===Meteor.userId();
	},
	upvotedClass: function(){
		var userId= Meteor.userId();
		if(userId&&!_.include(this.upvoters, userId)){
			return 'btn-default upvotable';
		} else if (userId){
			return 'btn-success downvotable';
		} else{
			return "btn-default disabled"
		}
	},
});

Template.postItem.events({
	'click .upvotable': function(event){
		event.preventDefault();
		Meteor.call('upvote',this._id);
	},
	'click .downvotable': function(event){
		event.preventDefault();
		Meteor.call('cancelvote',this._id);
	}
});