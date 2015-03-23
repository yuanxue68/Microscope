if(Posts.find().count()===0){
	var now =new Date().getTime();

	var yuanId=Meteor.users.insert({
		profile:{name:'Yuan Xue'}
	});
	var yuan = Meteor.users.findOne(yuanId);

	var patrickID=Meteor.users.insert({
		profile: {name:'Patrick Fang'}
	});
	var patrick = Meteor.users.findOne(patrickID);

	var googleId=Posts.insert({
		title: 'Google Search',
		userId: yuan._id,
		author: yuan.profile.name,
		url: 'http://google.com',
		description: "Google's search engine ",
    	submitted: new Date(now - 7 * 3600 * 1000),
   		commentsCount: 2
	});

	Comments.insert({
		postId: googleId,
		userId: patrick._id,
		author: patrick.profile.name,
		submitted: new Date (now -5*3600*1000),
		body: 'interesting site!'
	});

	Comments.insert({
	    postId: googleId,
	    userId: yuan._id,
	    author: yuan.profile.name,
	    submitted: new Date(now - 3 * 3600 * 1000),
	    body: 'Thx!'
	});

	Posts.insert({
	    title: 'Bing Search',
	    userId: patrick._id,
	    author: patrick.profile.name,
	    url: 'http://bing.com',
	    description: "microsoft's search engine",
	    submitted: new Date(now - 10 * 3600 * 1000),
	    commentsCount: 0
	});

	Posts.insert({
	    title: 'My site',
	    userId: yuan._id,
	    author: yuan.profile.name,
	    url: 'http://yuanxue68.github.io',
	    description: "Yuan's personal site",
	    submitted: new Date(now - 12 * 3600 * 1000),
	    commentsCount: 0
	});

	for (var i = 0; i < 10; i++) {
	    Posts.insert({
	      	title: 'Test post #' + i,
	      	author: yuan.profile.name,
	      	userId: yuan._id,
	      	url: 'http://google.com/?q=test-' + i,
	      	description: "description for " + i,
	      	submitted: new Date(now - i * 3600 * 1000),
	      	commentsCount: 0
	    });
  	}
}