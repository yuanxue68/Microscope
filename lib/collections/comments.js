Comments= new Mongo.Collection('comments');

Meteor.methods({
	commentInsert: function(commentAttributes){
		check(this.userId,String);
		check(commentAttributes,{
			postId: String,
			body: String
		});

		var user =Meteor.user();
		var post=Posts.findOne(commentAttributes.postId);
		if(!post)
			throw new Meteor.Error('invalid-comment', 'You must comment on a post');
		comment=_.extend(commentAttributes,{
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});

		console.log(comment.userId);

		Posts.update(comment.postId,{$inc:{commentsCount:1}});
		comment._id= Comments.insert(comment);
		createCommentNotification(comment);
		return comment._id;
	},

	commentUpdate: function(Id,commentAttributes){
		check(this.userId,String);
		check(commentAttributes,{
			body: String
		});

		if(!commentAttributes.body)
			throwError("Comments can not be empty");

		var user =Meteor.user();
		var comment=Comments.findOne(Id);
		if(comment.userId!==user._id)
			throw new Meteor.Error('invalid-comment', 'you do not own the comment');

		Comments.update(Id,{$set:commentAttributes});

	},

	commentRemove: function(Id){
		check(this.userId,String);
		var user =Meteor.user();
		var comment=Comments.findOne(Id);
		if(comment.userId!==user._id)
			throw new Meteor.Error('invalid-comment', 'you do not own the comment');
		Posts.update(comment.postId,{$inc:{commentsCount:-1}});
		Comments.remove(Id);
	}

});