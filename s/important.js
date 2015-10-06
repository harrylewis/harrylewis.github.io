
	/*  App Messages
	------------------------------------ */
	
	var ux = {
		home : {
			messages : {
				isFollowingPeople 		: [ 'End of feed' ],
				isNotFollowingPeople 	: [ 'Welcome to Scorbit.' , 'To get started you can search for people to follow using the search feature in the top bar, or start creating games for others to follow.' ],
				noConnectionOrTimeout	: [ 'We can\'t find a connection' , 'Please check that you are connected to the internet, or try refreshing the page.' ]
			}
		}
	}
	
	
	/*  App Coordination
	------------------------------------ */
	
	var coordinate = {
		home : {
			isFollowingPeople 		: 0,
			isNotFollowingPeople	: 1,
			noConnectionOrTimeout	: 2
		}
	}



	/*
		
		// prevent native document scrolling
		$(document).on('touchmove', function(e) { e.preventDefault(); });
		
		// variables
		var touchCount, finishScrolling = true, count = 1, touchmoveContainerPos, touchendContainerPos, changeFeedBackground, checkForFinishedScroll;
		
		// handle touchstart on scrollable container
		$('.container').on('touchstart', function(e) {
			
			// get current number of touch points
			touchCount = e.originalEvent.touches.length;
			
			// if user at top of scrollable container and only one finger on the screen
			if ( $('.container').scrollTop() == 0 && touchCount == 1 ) {
				// remove last filler				
				//$('.top-filler').remove();
				// prepend filler
				//$('.container').prepend('<div class="top-filler"></div>');
				// scroll to pixel 1 in the y axis, preventing document scroll
				$('.container').scrollTop(1);
			// if user at bottom of scrollable container and only one finger on the screen
			} else if ( ( ( $('.container').scrollTop() + $('.container').height() ) >= $('.constraint-container').height() ) && touchCount == 1 ) {
				// remove last filler
				//$('.bottom-filler').remove();
				// append filler
				//$('.container').append('<div class="bottom-filler"></div>');
				// scroll to container's current scroll top position minus one pixel, preventing document scroll
				$('.container').scrollTop( $('.container').scrollTop() - 1 );
			}
			
			// clear current check for scrolling
			clearInterval(checkForFinishedScroll);
			
			if ( $(e.target).closest('.continuous-container').length == 1 ) {
				// if scroll has not finished
				if ( !finishScrolling ) {
					// one click to stop scroll
					if ( count == 0 )
						// increment counter
						count++
					// second click to handle touch target
					else if ( count > 0 && ( Math.abs( $('.container').scrollTop() - touchendContainerPos ) < 3 ) ) {
						// reset counter to 1
						count = 1;
						// scrolling finished
						finishScrolling = true;
						// apply background change to chosen feed after 50ms
						changeFeedBackground = window.setTimeout(function() {
							$(e.target).closest('article.scorbit-feed').addClass('touching-feed');
						}, 50);
					}
				// if scroll has finished	
				} else {
					// apply background change to chosen feed after 50ms
					changeFeedBackground = window.setTimeout(function() {
						$(e.target).closest('article.scorbit-feed').addClass('touching-feed');
					}, 50);
				}
			}
		
		});
		
		// handle touchmove on scrollable container
		$('.container').on('touchmove', function(e) {
			
			// clear timeout to change chosen feed background
			clearTimeout(changeFeedBackground);
			// remove any changed feed backgrounds
			$('article.scorbit-feed').removeClass('touching-feed');
			// clear current check for scrolling
			clearInterval(checkForFinishedScroll);
			// scrolling started
			finishScrolling = false;
			// one click needed to stop scrolling
			count = 0;
			// get touchmove container position
			touchmoveContainerPos = $('.container').scrollTop();
			// prevent event bubbling
			e.stopPropagation();
			
		});

		// handle touchend on scrollable container
		$('.container').on('touchend', function(e) {
		
			// if overscroll on scrollable container past -60 and only one finger
			if ( $('.container').scrollTop() <= -60 && touchCount == 1 ) {
				
				// handle pull to refresh to load more feeds
				
			// if more than one finger
			} else if ( touchCount > 1 )
				// decrement touch count
				touchCount--;
			else if ( touchCount == 1 && finishScrolling && count == 1 && $(e.target).closest('.continuous-container').length == 1 )
				// redirect to game
				window.location.href = '#/game/' + $(e.target).closest('article.scorbit-feed').attr('data-game');
			
			// current container position after touchend
			touchendContainerPos = $('.container').scrollTop();
			
			// if absolute difference between touchmove and touchend container position is less than 3
			if ( Math.abs( touchmoveContainerPos - touchendContainerPos ) < 3 ) {
				// no scroll, one click needed to target feed
				count = 1;
				console.log(true);
			// if absolute difference between touchmove and touchend container position is greater than 3
			} else {
				// check for change in scroll position, which indicates stopped scrolling
				checkForFinishedScroll = window.setInterval(function() {
					// if current scroll position and original touchend scroll position of container not equal
					if ( !( $('.container').scrollTop() == touchendContainerPos ) ) {
						// scrolling finished
						finishScrolling = true;
						// clear current check for scrolling
						clearInterval(checkForFinishedScroll);
					}
					
				}, 50);
				
			}
		
		});


		
		// prevent a tag from event bubbling in feed
		$('.container').on('touchstart', 'a.posted-by', function(e) {
		
			// stop propagation
			e.stopPropagation();
			
			// prevent default
			e.preventDefault();
			
			// touching
			$(e.target).addClass('touching-posted-by');
			
		}).on('touchmove', 'a.posted-by', function(e) {
			
			// moving
			$(e.target).removeClass('touching-posted-by');
			
		}).on('touchend', 'a.posted-by', function(e) {
			
			// not touching
			$(e.target).removeClass('touching-posted-by');
			
		});
		
		// prevent a tag from event bubbling in feed
		$('.container').on('touchstart', 'a.user-avatar', function(e) {
		
			// stop propagation
			e.stopPropagation();
			
			// prevent default
			e.preventDefault();
			
			// touching
			$(e.target).addClass('touching-avatar');
			
			$(this).trigger('click');
			
		}).on('touchmove', 'a.user-avatar', function(e) {
		
			// moving
			$(e.target).removeClass('touching-avatar');
			
		}).on('touchend', 'a.user-avatar', function(e) {
		
			// not touching
			$(e.target).removeClass('touching-avatar');
			
		});
*/	


// called to display feeds on tablet game feed
	function getAndDisplayFeedsOnTabletGame( statisticId , collaborator , event , game , isOfficial , team , user , userRelation , opposingTeam , period , minutes , seconds , other , opposingUser , opposingUserRelation , league ) {
	
		// verify feed
		if ( !(	( collaborator == undefined || collaborator == null ) ||
			 	( event == undefined || event == null ) ||
			 	( game == undefined || game == null ) ||
			 	( isOfficial == undefined || isOfficial == null ) ||
			 	( team == undefined || team == null ) ||
			 	( userRelation == undefined || userRelation == null ) ||
			 	( !( user == undefined || user == null ) && ( userRelation == undefined || userRelation == null ) ) ||
			 	( opposingTeam == undefined || opposingTeam == null ) ||
			 	( period == undefined || period == null ) ||
			 	( minutes == undefined || minutes == null ) ||
			 	( seconds == undefined || seconds == null ) ||
			 	( other == undefined || other == null ) ||
			 	( !( opposingUser == undefined || opposingUser == null ) && ( opposingUserRelation == undefined || opposingUserRelation == null ) ) )
		   ) {
		   
		       // initialize variables
		       var displayPicture;
		       var userName;
		       var userNumber = userRelation.attributes['number'];
			   var teamName = team.attributes['name'];
		       var periodSuffix;
		       var discoverLink;
		       
		       // determine period suffix
		       switch ( period ) {
			       case '1':
			           periodSuffix = 'st';			
					   break;
			       case '2':
			           periodSuffix = 'nd';	
					   break;
			       case '3':
			           periodSuffix = 'rd';
					   break;
			       default:
			       	   break;
		       }
		       
		       // checking for ghost data
		       if ( user == undefined ) {
			       
			       // initialize variables
			       displayPicture = ( team.attributes['profilePicture'] == undefined || team.attributes['profilePicture'] == null ) ? 'images/player_default.png' : team.attributes['profilePicture'].url();
			       userName = userRelation.attributes['ghostObject'].name;
			       discoverLink = '#/team/' + team.id;
			       
		       } else {
			       
			       // initialize variables
			       displayPicture = ( user.attributes['profilePicture'] == undefined || user.attributes['profilePicture'] == null ) ? 'images/player_default.png' : user.attributes['profilePicture'].url();
			       userName = user.attributes['name'];
			       discoverLink = '#/' + user.attributes['username'];
			       
		       }
		       
		       // feed
			   var feed = '<article class="scorbit-feed" data-game="' + game + '"><header class="cf"><div class="user"><a href="' + discoverLink + '" class="user-avatar"><img src="' + displayPicture + '" /></a><div class="user-identification"><h4 class="user-name">' + userName + '</h4><p class="user-role">23 ' + teamName + '</p></div></div><div class="event"><h4 class="main-event">' + event + '</h4><p class="extraneous-event-information">' + minutes + ':' + seconds + ' ' + period + '<sup>' + periodSuffix + '</sup></p></div></header><div class="mobile-extraneous-information"></div><footer class="cf"><div class="feed-links cf"><p class="outside-opponent"></p></div><div class="feed-association cf"><a href="#/' + collaborator + '" class="posted-by">@' + collaborator + '</a></div></footer></article>';	
		   	
			   // append feed
			   $('div.continuous-container span.feed-loader').before(feed);
		   	
		   }

		
	}


	// called to display feeds on tablet feed
	function getAndDisplayFeedsOnTablet( statisticId , collaborator , event , game , isOfficial , team , user , userRelation , opposingTeam , period , minutes , seconds , other , opposingUser , opposingUserRelation , league ) {
	
		// verify feed
		if ( !(	( collaborator == undefined || collaborator == null ) ||
			 	( event == undefined || event == null ) ||
			 	( game == undefined || game == null ) ||
			 	( isOfficial == undefined || isOfficial == null ) ||
			 	( team == undefined || team == null ) ||
			 	( userRelation == undefined || userRelation == null ) ||
			 	( !( user == undefined || user == null ) && ( userRelation == undefined || userRelation == null ) ) ||
			 	( opposingTeam == undefined || opposingTeam == null ) ||
			 	( period == undefined || period == null ) ||
			 	( minutes == undefined || minutes == null ) ||
			 	( seconds == undefined || seconds == null ) ||
			 	( other == undefined || other == null ) ||
			 	( !( opposingUser == undefined || opposingUser == null ) && ( opposingUserRelation == undefined || opposingUserRelation == null ) ) )
		   ) {
		   
		       // initialize variables
		       var displayPicture;
		       var userName;
		       var userNumber = userRelation.attributes['number'];
			   var teamName = team.attributes['name'];
		       var periodSuffix;
		       var discoverLink;
		       
		       // determine period suffix
		       switch ( period ) {
			       case '1':
			           periodSuffix = 'st';			
					   break;
			       case '2':
			           periodSuffix = 'nd';	
					   break;
			       case '3':
			           periodSuffix = 'rd';
					   break;
			       default:
			       	   break;
		       }
		       
		       // checking for ghost data
		       if ( user == undefined ) {
			       
			       // initialize variables
			       displayPicture = ( team.attributes['profilePicture'] == undefined || team.attributes['profilePicture'] == null ) ? 'images/player_default.png' : team.attributes['profilePicture'].url();
			       userName = userRelation.attributes['ghostObject'].name;
			       discoverLink = '#/team/' + team.id;
			       
		       } else {
			       
			       // initialize variables
			       displayPicture = ( user.attributes['profilePicture'] == undefined || user.attributes['profilePicture'] == null ) ? 'images/player_default.png' : user.attributes['profilePicture'].url();
			       userName = user.attributes['name'];
			       discoverLink = '#/' + user.attributes['username'];
			       
		       }
		       
		       // feed
			   var feed = '<article class="scorbit-feed" data-game="' + game + '"><header class="cf"><div class="user"><a href="#/' + discoverLink + '" class="user-avatar"><img src="' + displayPicture + '" /></a><div class="user-identification"><h4 class="user-name">' + userName + '</h4><p class="user-role">23 ' + teamName + '</p></div></div><div class="event"><h4 class="main-event">' + event + '</h4><p class="extraneous-event-information">' + minutes + ':' + seconds + ' ' + period + '<sup>' + periodSuffix + '</sup></p></div></header><div class="mobile-extraneous-information"></div><footer class="cf"><div class="feed-links cf"><p class="outside-opponent">vs ' + opposingTeam.attributes['name'] + '</p></div><div class="feed-association cf"><a href="#/' + collaborator + '" class="posted-by">@' + collaborator + '</a></div></footer></article>';	
		   	
			   // append feed
			   $('div.continuous-container span.feed-loader').before(feed);
		   	
		   }

		
	}



			
			// set up user
			/*
			// no user association or user relation
			if ( ( user == undefined || user == null ) && ( userRelation == undefined || userRelation == null ) ) {
				// link
				$(userLink)
					.addClass('user-avatar')
					.attr( 'href' , '#/team/' + team.id );
				// image
				$(userAvatar)
					.attr( 'src' , ( ( team.attributes['profilePicture'] == undefined || team.attributes['profilePicture'] == null ) ? 'images/player_default.png' : team.attributes['profilePicture'].url ) );
				// user name
				$(userName)
					.addClass('user-name')
					.text(team.attributes['name']);
				// user role
				$(userRole)
					.addClass('user-role');
			// no user association	
			} else if ( user == undefined || user == null ) {
				// link
				$(userLink)
					.addClass('user-avatar')
					.attr( 'href' , '#/team/' + team.id );
				// image
				$(userAvatar)
					.attr( 'src' , ( ( team.attributes['profilePicture'] == undefined || team.attributes['profilePicture'] == null ) ? 'images/player_default.png' : team.attributes['profilePicture'].url ) );
				// user name
				$(userName)
					.addClass('user-name')
					.text(userRelation.attributes['ghostObject'].name);
				// user role
				$(userRole)
					.addClass('user-role')
					.text( userRelation.attributes['number'] + ' ' + team.attributes['name'] );
			// user association and user relation
			} else {
				// link
				$(userLink)
					.addClass('user-avatar')
					.attr( 'href' , '#/' + user.attributes['username'] );
				// image
				$(userAvatar)
					.attr( 'src' , ( ( user.attributes['profilePicture'] == undefined || user.attributes['profilePicture'] == null ) ? 'images/player_default.png' : user.attributes['profilePicture'].url ) );
				// user name
				$(userName)
					.addClass('user-name')
					.text(user.attributes['name']);
				// user role
				$(userRole)
					.addClass('user-role')
					.text( userRelation.attributes['number'] + ' ' + team.attributes['name'] );
			}
			/* user link
			$(userLink)
				.html(userAvatar);
			// user identification
			$(userIdentification)
				.addClass('user-identification')
				.append(userName)
				.append(userRole);
			// user
			$(userContainer)
				.addClass('user')
				.append(userLink)
				.append(userIdentification);
				
			// set up event
			
			$(mainEvent)
				.addClass('main-event')
				.text(feed.attributes['event']);
			// event
			switch ( feed.attributes['event'] ) {
				// shot
				case 'Shot':
				
					// time
					$(time)
						.addClass('extraneous-event-information')
						.html( feed.attributes['minutes'] + ':' + feed.attributes['seconds'] + ' ' + feed.attributes['period'] + '<sup>' + periodSuffix(feed.attributes['period']) + '</sup>' );
					// if shot type
					if ( feed.attributes['other'].type != undefined ) {
						// new component
						var shotType = document.createElement('p');
						$(shotType)
							.addClass('extraneous-event-information')
							.text(feed.attributes['other'].type);
					}
							
					// event
					$(event)
						.addClass('event')
						.append(mainEvent)
						.append(time)
						.append(shotType);
				
				break;
				// hit
				case 'Hit':
				
					// time
					$(time)
						.addClass('extraneous-event-information')
						.html( feed.attributes['minutes'] + ':' + feed.attributes['seconds'] + ' ' + feed.attributes['period'] + '<sup>' + periodSuffix(feed.attributes['period']) + '</sup>' );
							
					// event
					$(event)
						.addClass('event')
						.append(mainEvent)
						.append(time);
				
				break;
				// goal
				case 'Goal':
				
					// time
					$(time)
						.addClass('extraneous-event-information')
						.html( feed.attributes['minutes'] + ':' + feed.attributes['seconds'] + ' ' + feed.attributes['period'] + '<sup>' + periodSuffix(feed.attributes['period']) + '</sup>' );
					// if goal type
					if ( feed.attributes['other'].type != undefined ) {
						// new component
						var goalType = document.createElement('p');
						$(goalType)
							.addClass('extraneous-event-information')
							.text(feed.attributes['other'].type);
					}
					// if assists
							
					// event
					$(event)
						.addClass('event')
						.append(mainEvent)
						.append(time)
						.append(goalType);
				
				break;
				// turnover
				case 'Turnover':
				
					// time
					$(time)
						.addClass('extraneous-event-information')
						.html( feed.attributes['minutes'] + ':' + feed.attributes['seconds'] + ' ' + feed.attributes['period'] + '<sup>' + periodSuffix(feed.attributes['period']) + '</sup>' );
							
					// event
					$(event)
						.addClass('event')
						.append(mainEvent)
						.append(time);
				
				break;
				// penalty
				case 'Penalty':
				
					// time
					$(time)
						.addClass('extraneous-event-information')
						.html( feed.attributes['minutes'] + ':' + feed.attributes['seconds'] + ' ' + feed.attributes['period'] + '<sup>' + periodSuffix(feed.attributes['period']) + '</sup>' );
					// if penalty duration
					if ( feed.attributes['other'].duration != undefined ) {
						// new component
						var penaltyDuration = document.createElement('p');
						$(penaltyDuration)
							.addClass('extraneous-event-information')
							.text(feed.attributes['other'].duration);
					}
					// if penalty type
					if ( feed.attributes['other'].type != undefined ) {
						// new component
						var penaltyType = document.createElement('p');
						$(penaltyType)
							.addClass('extraneous-event-information')
							.text(feed.attributes['other'].type);
					}
					// if penalty category
					if ( feed.attributes['other'].category != undefined ) {
						// new component
						var penaltyCategory = document.createElement('p');
						$(penaltyCategory)
							.addClass('extraneous-event-information')
							.text(feed.attributes['other'].category);
					}
							
					// event
					$(event)
						.addClass('event')
						.append(mainEvent)
						.append(time)
						.append(penaltyDuration)
						.append(penaltyType)
						.append(penaltyCategory);
				
				break;
				// faceoff
				case 'Faceoff':
				
					// time
					$(time)
						.addClass('extraneous-event-information')
						.html( feed.attributes['minutes'] + ':' + feed.attributes['seconds'] + ' ' + feed.attributes['period'] + '<sup>' + periodSuffix(feed.attributes['period']) + '</sup>' );
							
					// event
					$(event)
						.addClass('event')
						.append(mainEvent)
						.append(time);
				
				break;
			}
			
			// set up header
			$(header)
				.addClass('cf')
				.append(userContainer)
				.append(event);
			
			// opponent
			$(opponent)
				.addClass('opponent')
				.text('vs ' + opposingTeam.attributes['name']);
				
			// feed links
			$(feedLinks)
				.addClass('feed-links cf');
			$(toGame)
				.addClass('feed-game-link')
				.attr( 'href' , '#/game/' + game.id )
				.html('<span>&#xf111;</span> Game');
			// publish
			// if official
			if ( feed.attributes['isOfficial'] )
				$(feedLinks)
					.append('<p class="feed-filler"></p>');
			$(feedLinks)
				.append(toGame);
			// collaborator
			$(collaboratorContainer)
				.addClass('feed-association cf');
			// collaborator link
			$(collaboratorLink)
				.addClass('posted-by')
				.attr( 'href' , '#/' + collaborator.attributes['username'] )
				.text('@' + collaborator.attributes['username'] );
			$(collaboratorContainer)
				.append(collaboratorLink);
			// if official
			if ( feed.attributes['isOfficial'] )
				$(collaboratorContainer)
					.append('<a href="#" class="is-feed-official"><span>&#xf00c;</span> Scorbit Official</a>');
			// set up footer
			$(footer)
				.addClass('cf')
				.append(feedLinks)
				.append(collaboratorContainer);
				
			// set up feed
			$(feedContainer)
				.addClass('scorbit-feed')
				.attr( 'data-game' , game.id )
				.append(header)
				.append(opponent)
				.append(footer);



				// called to display client feeds on game .continuous-content
	function displayClientStatisticsOnGameFeed( statisticId , collaborator , event , game , isOfficial , team , user , userRelation , opposingTeam , period , minutes , seconds , other , opposingUser , opposingUserRelation , league ) {
		
		// verify feed
		if ( !(	( collaborator == undefined || collaborator == null ) ||
			 	( event == undefined || event == null ) ||
			 	( game == undefined || game == null ) ||
			 	( isOfficial == undefined || isOfficial == null ) ||
			 	( team == undefined || team == null ) ||
			 	( userRelation == undefined || userRelation == null ) ||
			 	( !( user == undefined || user == null ) && ( userRelation == undefined || userRelation == null ) ) ||
			 	( opposingTeam == undefined || opposingTeam == null ) ||
			 	( period == undefined || period == null ) ||
			 	( minutes == undefined || minutes == null ) ||
			 	( seconds == undefined || seconds == null ) ||
			 	( other == undefined || other == null ) ||
			 	( !( opposingUser == undefined || opposingUser == null ) && ( opposingUserRelation == undefined || opposingUserRelation == null ) ) )
		   ) {
		   	
		       // initialize variables
		       var displayPicture;
		       var userName;
		       var userNumber = userRelation.attributes['number'];
			   var teamName = team.attributes['name'];
		       var game = game.id;
		       var periodSuffix;
		       var discoverLink;
		       
		       // determine period suffix
		       switch ( period ) {
			       case '1':
			           periodSuffix = 'st';			
					   break;
			       case '2':
			           periodSuffix = 'nd';	
					   break;
			       case '3':
			           periodSuffix = 'rd';
					   break;
			       default:
			       	   break;
		       }
		       
		       // checking for ghost data
		       if ( user == undefined ) {
			       
			       // initialize variables
			       displayPicture = ( team.attributes['profilePicture'] == undefined || team.attributes['profilePicture'] == null ) ? 'images/player_default.png' : team.attributes['profilePicture'].url();
			       userName = userRelation.attributes['ghostObject'].name;
			       discoverLink = '#/team/' + team.id;
			       
		       } else {
			       
			       // initialize variables
			       displayPicture = ( user.attributes['profilePicture'] == undefined || user.attributes['profilePicture'] == null ) ? 'images/player_default.png' : user.attributes['profilePicture'].url();
			       userName = user.attributes['name'];
			       discoverLink = '#/' + user.attributes['username'];
			       
		       }
		       
		       // feed
			   var feed = '<article class="latest-feed" data-statistic-id="' + statisticID + '" data-game-id="' + game + '"><div class="feed-content cf"><div class="feed-user cf"><span class="feed-avatar"><a href="' + discoverLink + '"><img src="' + displayPicture + '"/></a></span><div class="feed-user-information"><p class="feed-user-name">' + userName + '</p><p class="feed-user-team">' + userNumber + ' ' + teamName + '</p></div></div><div class="feed-statistic"><p class="feed-event">' + event + '</p><p class="feed-event-other">' + period + '<sub>' + periodSuffix + '</sub> ' + minutes + ':' + seconds + '</p><p class="feed-event-other"></p><p class="feed-event-other"></p><p class="feed-event-other"></p><p class="feed-event-other"></p></div></div><footer class="cf"><!--<button class="go-to-game" data-game-id="' + game + '">&#xe607; Game</button>--><button class="publish-feed">&#xe622; Publish</button><a href="#/' + collaboratorUsername + '" class="feed-collaborator">@' + collaboratorUsername + '</a></footer></article>';	
		   	
			   // append feed
			   $('.constraint-a').prepend(feed);
		   	
		   }
		
	}


	*/
	// run clock
	function controlClock(minute, second, status, game) {
	
		// run
		if ( status ) {
			// if clock reads 00:00
			if ( minute.val() == '00' && second.val() == '00' ) {
				clearTimeout(clockTimer);
				return false;
			// if second reads 00
			} else if ( second.val() == '00' ) {
				// start seconds at 59
				second.val(59);
				// if minute reads 1
				if ( parseInt(minute.val()) == 1 )
					minute.val('00');
				else
					minute.val(parseInt(minute.val()) - 1);
				// adjust game
				game.time.currentMinutes = minute.val();
				game.time.currentSeconds = second.val();
				// recurse
				clockTimer = window.setTimeout(function() { controlClock(minute, second, status, game) }, 1000);
			// if second reads <= 10
			} else if ( parseInt(second.val()) <= 10 ) {
				// decrement and pad second
				second.val( '0' + ( parseInt(second.val()) - 1 ).toString() );
				// adjust game
				game.time.currentMinutes = minute.val();
				game.time.currentSeconds = second.val();
				// recurse
				clockTimer = window.setTimeout(function() { controlClock(minute, second, status, game) }, 1000);
			// if second reads between 59 and 11 inclusive
			} else {
				// decrement and pad second
				second.val(parseInt(second.val()) - 1);
				// adjust game
				game.time.currentMinutes = minute.val();
				game.time.currentSeconds = second.val();
				// recurse
				clockTimer = window.setTimeout(function() { controlClock(minute, second, status, game) }, 1000);
			}
		// stop
		} else {
			// pause
			clearTimeout(clockTimer);
		}
		
	}


	// fill in form
			function setCollaborationAttributes(phase, event) {
				
				self.displayNextField();
				
				// phase
				switch ( phase ) {
					// pick event
					case 0:
					
						// update collaborator object
						collaboratorObject.event = data;
						// append two li
						for ( var i = 0; i < 2; i++ ) {
							// new li
							var li = document.createElement('li');
							// new li attributes
							$(li)
								.addClass('slide-option-in')
								.addClass('next-field one-half')
								.css( 'line-height' , ( $('div#collaborative').outerHeight() - ( $('div#collaborative header').outerHeight() + 60 ) ) + 'px' )
								.text(teamName[i])
								.attr({ 'data-value' : teamID[i] , 'data-home-team' : teamAdvantage[i] });
							// append new li
							list.append(li);
						}
								
						// increment phase
						collaboratorPhase++;
					
					break;
					// pick player
					case 1:
					
						// update collaborator object
						collaboratorObject.participant.team = data;
						collaboratorObject.oParticipant.team = oData;
						collaboratorObject.advantage = $(e.currentTarget).attr('data-home-team');
						// get correct roster
						var roster = ( collaboratorObject.advantage == 'true' ) ? gameDataObject.home.fullRoster : gameDataObject.away.fullRoster;
						var activeRoster = ( collaboratorObject.advantage == 'true' ) ? gameDataObject.home.activeRoster : gameDataObject.away.activeRoster;
						// new li
						var li = document.createElement('li');
						// to be determined li properties
						$(li)
							.addClass('slide-option-in')
							.addClass('next-field one-fifth')
							.attr('data-value' , 'TBD')
							.text('To Be Determined');
						// append to list
						list.append(li);
						// loop through roster
						for ( var i = 0; i < roster.length; i++ ) {
							// if on active roster
							if ( $.inArray(roster[i].id, activeRoster) != -1 ) {
								// new li
								var li = document.createElement('li');
								// if player
								if ( $.inArray( roster[i].attributes['role'].position , player ) != -1 ) {
									// new li properties
									$(li)
										.addClass('slide-option-in')
										.addClass('next-field one-fifth')
										.attr('data-value' , roster[i].id)
										.text(roster[i].attributes['number']);
									// append new li
									list.append(li);
								}
							}
						}
						
						// increment phase
						collaboratorPhase++;
					
					break;
					// type, time, type, opposing, duration, opposing
					case 2:
					
						// update collaborator object
						if ( data == 'TBD' ) collaboratorObject.participant.identification = undefined;
						else collaboratorObject.participant.identification = data;
						// record
						var rosterRecords = ( collaboratorObject.advantage == 'true' ) ? gameDataObject.home.rosterRecords : gameDataObject.away.rosterRecords;
						if ( data == 'TBD' ) {
							collaboratorObject.participant.sri = undefined;
						} else {
							// loop through roster
							for ( var i = 0; i < rosterRecords.length; i++ ) {
								// if found
								if ( data === rosterRecords[i].attributes['rosterMember'].id )
									// update
									collaboratorObject.participant.sri = rosterRecords[i].id;
							}
						}
						// event type
						switch ( event ) {
							// shot
							case 'Shot':
							
								// set oParticipant
								collaboratorObject.oParticipant.identification = ( ( collaboratorObject.advantage == 'true' ) ? getGoalie(gameDataObject.away.fullRoster, gameDataObject.away.activeRoster) : getGoalie(gameDataObject.home.fullRoster, gameDataObject.home.activeRoster) );
								// record
								var rosterRecords = ( collaboratorObject.advantage == 'true' ) ? gameDataObject.away.rosterRecords : gameDataObject.home.rosterRecords;
								if ( collaboratorObject.oParticipant.identification == undefined ) {
									collaboratorObject.oParticipant.sri = undefined;
								} else {
									// loop through roster
									for ( var i = 0; i < rosterRecords.length; i++ ) {
										// if found
										if ( collaboratorObject.oParticipant.identification === rosterRecords[i].attributes['rosterMember'].id )
											// update
											collaboratorObject.oParticipant.sri = rosterRecords[i].id;
									}
								}
								// new li
								var li = document.createElement('li');
								// to be determined li properties
								$(li)
									.addClass('slide-option-in')
									.addClass('next-field one-fifth')
									.attr('data-value' , 'TBD')
									.text('To Be Determined');
								// append to list
								list.append(li);
								// loop through shot types
								for ( var i = 0; i < shotType.length; i++ ) {
									// new li
									var li = document.createElement('li');
									// new li properties
									$(li)
										.addClass('slide-option-in')
										.addClass('next-field one-fifth')
										.attr('data-value' , shotType[i])
										.text(shotType[i]);
									// append new li
									list.append(li);
								}
								
								// increment phase
								collaboratorPhase++;
							
							break;
							// goal
							case 'Goal':
							
								// set oParticipant
								collaboratorObject.oParticipant.identification = ( ( collaboratorObject.advantage == 'true' ) ? getGoalie(gameDataObject.away.fullRoster, gameDataObject.away.activeRoster) : getGoalie(gameDataObject.home.fullRoster, gameDataObject.home.activeRoster) );
								// record
								var rosterRecords = ( collaboratorObject.advantage == 'true' ) ? gameDataObject.away.rosterRecords : gameDataObject.home.rosterRecords;
								if ( collaboratorObject.oParticipant.identification == undefined ) {
									collaboratorObject.oParticipant.sri = undefined;
								} else {
									// loop through roster
									for ( var i = 0; i < rosterRecords.length; i++ ) {
										// if found
										if ( collaboratorObject.oParticipant.identification === rosterRecords[i].attributes['rosterMember'].id )
											// update
											collaboratorObject.oParticipant.sri = rosterRecords[i].id;
									}
								}
								// new li
								var li = document.createElement('li');
								// to be determined li properties
								$(li)
									.addClass('slide-option-in')
									.addClass('next-field one-fifth')
									.attr('data-value' , 'TBD')
									.text('To Be Determined');
								// append to list
								list.append(li);
								// loop through goal types
								for ( var i = 0; i < goalType.length; i++ ) {
									// new li
									var li = document.createElement('li');
									// new li properties
									$(li)
										.addClass('slide-option-in')
										.addClass('next-field one-fifth')
										.attr( 'data-value' , goalType[i] )
										.text(goalType[i]);
									// append new li
									list.append(li);
								}
								
								// increment phase
								collaboratorPhase++;
							
							break;
							// hit
							case 'Hit':
								
								// get correct roster
								var roster = ( collaboratorObject.advantage == 'true' ) ? gameDataObject.away.fullRoster : gameDataObject.home.fullRoster;
								var activeRoster = ( collaboratorObject.advantage == 'true' ) ? gameDataObject.away.activeRoster : gameDataObject.home.activeRoster;
								// new li
								var li = document.createElement('li');
								// to be determined li properties
								$(li)
									.addClass('slide-option-in')
									.addClass('next-field one-fifth')
									.attr('data-value' , 'TBD')
									.text('To Be Determined');
								// append to list
								list.append(li);
								// loop through roster
								for ( var i = 0; i < roster.length; i++ ) {
									// if on active roster
									if ( $.inArray(roster[i].id, activeRoster) != -1 ) {
										// new li
										var li = document.createElement('li');
										// if player
										if ( $.inArray( roster[i].attributes['role'].position , player ) != -1 ) {
											// new li properties
											$(li)
												.addClass('slide-option-in')
												.addClass('next-field one-fifth')
												.attr('data-value' , roster[i].id)
												.text(roster[i].attributes['number']);
											// append new li
											list.append(li);
										}
									}
								}
								
								// increment phase
								collaboratorPhase++;
							
							break;
							// takeaway
							case 'Takeaway':
							
								// get correct roster
								var roster = ( collaboratorObject.advantage == 'true' ) ? gameDataObject.away.fullRoster : gameDataObject.home.fullRoster;
								var activeRoster = ( collaboratorObject.advantage == 'true' ) ? gameDataObject.away.activeRoster : gameDataObject.home.activeRoster;
								// new li
								var li = document.createElement('li');
								// to be determined li properties
								$(li)
									.addClass('slide-option-in')
									.addClass('next-field one-fifth')
									.attr('data-value' , 'TBD')
									.text('To Be Determined');
								// append to list
								list.append(li);
								// loop through roster
								for ( var i = 0; i < roster.length; i++ ) {
									// if on active roster
									if ( $.inArray(roster[i].id, activeRoster) != -1 ) {
										// new li
										var li = document.createElement('li');
										// if player
										if ( $.inArray( roster[i].attributes['role'].position , player ) != -1 ) {
											// new li properties
											$(li)
												.addClass('slide-option-in')
												.addClass('next-field one-fifth')
												.attr('data-value' , roster[i].id)
												.text(roster[i].attributes['number']);
											// append new li
											list.append(li);
										}
									}
								}
								
								// increment phase
								collaboratorPhase++;
								
							break;
							// penalty
							case 'Penalty':
							
								// new li
								var li = document.createElement('li');
								// to be determined li properties
								$(li)
									.addClass('slide-option-in')
									.addClass('next-field one-fifth')
									.attr('data-value' , 'TBD')
									.text('To Be Determined');
								// append to list
								list.append(li);
								// loop through shot types
								for ( var i = 0; i < penaltyDuration.length; i++ ) {
									// new li
									var li = document.createElement('li');
									// new li properties
									$(li)
										.addClass('slide-option-in')
										.addClass('next-field one-fifth')
										.attr('data-value' , penaltyDuration[i])
										.text(penaltyDuration[i]);
									// append new li
									list.append(li);
								}
								
								// increment phase
								collaboratorPhase++;
							
							break;
							// faceoff
							case 'Faceoff':
							
								// get correct roster
								var roster = ( collaboratorObject.advantage == 'true' ) ? gameDataObject.away.fullRoster : gameDataObject.home.fullRoster;
								var activeRoster = ( collaboratorObject.advantage == 'true' ) ? gameDataObject.away.activeRoster : gameDataObject.home.activeRoster;
								// new li
								var li = document.createElement('li');
								// to be determined li properties
								$(li)
									.addClass('slide-option-in')
									.addClass('next-field one-fifth')
									.attr('data-value' , 'TBD')
									.text('To Be Determined');
								// append to list
								list.append(li);
								// loop through roster
								for ( var i = 0; i < roster.length; i++ ) {
									// if on active roster
									if ( $.inArray(roster[i].id, activeRoster) != -1 ) {
										// new li
										var li = document.createElement('li');
										// if player
										if ( $.inArray( roster[i].attributes['role'].position , player ) != -1 ) {
											// new li properties
											$(li)
												.addClass('slide-option-in')
												.addClass('next-field one-fifth')
												.attr('data-value' , roster[i].id)
												.text(roster[i].attributes['number']);
											// append new li
											list.append(li);
										}
									}
								}
								
								// increment phase
								collaboratorPhase++;
							
							break;
						}
					
					break;
					// time, done, 1st assist, time, type, time
					case 3:
					
						// event type
						switch ( event ) {
							// shot
							case 'Shot':
							
								// set type
								collaboratorObject.other.type = ( ( data == 'TBD' ) ? null : data );
								// append two li
								for ( var i = 0; i < 1; i++ ) {
									// new li
									var li = document.createElement('li');
									// append new li
									list.append(li);
								}
								// adjust first li			
								list
									.children('li:first-child')
										.addClass('slide-option-in time')
										.attr( 'data-value' , '' )
										.addClass('cf')
										.html('<input type="text" class="time" maxlength="2" value="' + collaboratorObject.minutes + '" data-validation="required" /><input type="text" class="time" maxlength="2" value="' + collaboratorObject.seconds + '" data-validation="required" /><p>Save Feed</p>');
							
								// verify time
								collaboratorPhase = -1;
							
							break;
							// hit
							case 'Hit':
							
								// set oParticipant
								collaboratorObject.oParticipant.identification = ( ( data == 'TBD' ) ? undefined : data );
								// record
								var rosterRecords = ( collaboratorObject.advantage == 'true' ) ? gameDataObject.away.rosterRecords : gameDataObject.home.rosterRecords;
								if ( data == 'TBD' ) {
									collaboratorObject.oParticipant.sri = undefined;
								} else {
									// loop through roster
									for ( var i = 0; i < rosterRecords.length; i++ ) {
										// if found
										if ( data === rosterRecords[i].attributes['rosterMember'].id )
											// update
											collaboratorObject.oParticipant.sri = rosterRecords[i].id;
									}
								}
								// append two li
								for ( var i = 0; i < 1; i++ ) {
									// new li
									var li = document.createElement('li');
									// append new li
									list.append(li);
								}
								// adjust first li			
								list
									.children('li:first-child')
										.addClass('slide-option-in time')
										.attr( 'data-value' , '' )
										.addClass('cf')
										.html('<input type="text" class="time" maxlength="2" value="' + collaboratorObject.minutes + '" data-validation="required" /><input type="text" class="time" maxlength="2" value="' + collaboratorObject.seconds + '" data-validation="required" /><p>Save Feed</p>');
							
								// verify time
								collaboratorPhase = -1;
							
							break;
							// goal
							case 'Goal':
							
								// update collaborator object
								collaboratorObject.other.type = ( data == 'TBD' ) ? null : data;
								// if penalty shot
								if ( data == 'Penalty Shot' ) {
								
									// append two li
									for ( var i = 0; i < 1; i++ ) {
										// new li
										var li = document.createElement('li');
										// append new li
										list.append(li);
									}
									// adjust first li			
									list
										.children('li:first-child')
											.addClass('slide-option-in time')
											.attr( 'data-value' , '' )
											.addClass('cf')
											.html('<input type="text" class="time" maxlength="2" value="' + collaboratorObject.minutes + '" data-validation="required" /><input type="text" class="time" maxlength="2" value="' + collaboratorObject.seconds + '" data-validation="required" /><p>Save Feed</p>');
								
									// verify time
									collaboratorPhase = -1;
								
								// if not penalty shot	
								} else {
									// get correct roster
									var roster = ( collaboratorObject.advantage == 'true' ) ? gameDataObject.home.fullRoster : gameDataObject.away.fullRoster;
									var activeRoster = ( collaboratorObject.advantage == 'true' ) ? gameDataObject.home.activeRoster : gameDataObject.away.activeRoster;
									// new li
									var li = document.createElement('li');
									// to be determined li properties
									$(li)
										.addClass('slide-option-in')
										.addClass('next-field one-fifth')
										.attr('data-value' , 'TBD')
										.text('To Be Determined');
									// append to list
									list.append(li);
									// new li
									var li = document.createElement('li');
									// none li properties
									$(li)
										.addClass('slide-option-in')
										.addClass('next-field one-fifth')
										.attr('data-value' , 'N')
										.text('None');
									// append to list
									list.append(li);
									// loop through roster
									for ( var i = 0; i < roster.length; i++ ) {
										// if on active roster
										if ( $.inArray(roster[i].id, activeRoster) != -1 ) {
											// new li
											var li = document.createElement('li');
											// if player
											if ( $.inArray( roster[i].attributes['role'].position , player ) != -1 ) {
												// if not used already
												if ( !( roster[i].id === collaboratorObject.participant.identification ) ) {
													// new li properties
													$(li)
														.addClass('slide-option-in')
														.addClass('next-field one-fifth')
														.attr('data-value' , roster[i].id)
														.text(roster[i].attributes['number']);
													// append new li
													list.append(li);
												}
											}
										}
									}
									
									// increment phase
									collaboratorPhase++;
								}
							
							break;
							// takeaway
							case 'Takeaway':
							
								// set oParticipant
								collaboratorObject.oParticipant.identification = ( ( data == 'TBD' ) ? undefined : data );
								// record
								var rosterRecords = ( collaboratorObject.advantage == 'true' ) ? gameDataObject.away.rosterRecords : gameDataObject.home.rosterRecords;
								if ( data == 'TBD' ) {
									collaboratorObject.oParticipant.sri = undefined;
								} else {
									// loop through roster
									for ( var i = 0; i < rosterRecords.length; i++ ) {
										// if found
										if ( data === rosterRecords[i].attributes['rosterMember'].id )
											// update
											collaboratorObject.oParticipant.sri = rosterRecords[i].id;
									}
								}
								// append two li
								for ( var i = 0; i < 1; i++ ) {
									// new li
									var li = document.createElement('li');
									// append new li
									list.append(li);
								}
								// adjust first li			
								list
									.children('li:first-child')
										.addClass('slide-option-in time')
										.attr( 'data-value' , '' )
										.addClass('cf')
										.html('<input type="text" class="time" maxlength="2" value="' + collaboratorObject.minutes + '" data-validation="required" /><input type="text" class="time" maxlength="2" value="' + collaboratorObject.seconds + '" data-validation="required" /><p>Save Feed</p>');
							
								// verify time
								collaboratorPhase = -1;
							
							break;
							// penalty
							case 'Penalty':
							
								// update collaborator object
								collaboratorObject.other.duration = ( ( data == 'TBD' ) ? null : data );
								// new li
								var li = document.createElement('li');
								// to be determined li properties
								$(li)
									.addClass('slide-option-in')
									.addClass('next-field one-fifth')
									.attr('data-value' , 'TBD')
									.text('To Be Determined');
								// append to list
								list.append(li);
								// loop through shot types
								for ( var i = 0; i < penaltyType.length; i++ ) {
									// new li
									var li = document.createElement('li');
									// new li properties
									$(li)
										.addClass('slide-option-in')
										.addClass('next-field one-fifth')
										.attr('data-value' , penaltyType[i])
										.text(penaltyType[i]);
									// append new li
									list.append(li);
								}
								
								// increment phase
								collaboratorPhase++;
							
							break;
							// faceoff
							case 'Faceoff':
							
								// set oParticipant
								collaboratorObject.oParticipant.identification = ( ( data == 'TBD' ) ? undefined : data );
								// record
								var rosterRecords = ( collaboratorObject.advantage == 'true' ) ? gameDataObject.away.rosterRecords : gameDataObject.home.rosterRecords;
								if ( data == 'TBD' ) {
									collaboratorObject.oParticipant.sri = undefined;
								} else {
									// loop through roster
									for ( var i = 0; i < rosterRecords.length; i++ ) {
										// if found
										if ( data === rosterRecords[i].attributes['rosterMember'].id )
											// update
											collaboratorObject.oParticipant.sri = rosterRecords[i].id;
									}
								}
								// append two li
								for ( var i = 0; i < 1; i++ ) {
									// new li
									var li = document.createElement('li');
									// append new li
									list.append(li);
								}
								// adjust first li			
								list
									.children('li:first-child')
										.addClass('slide-option-in time')
										.attr( 'data-value' , '' )
										.addClass('cf')
										.html('<input type="text" class="time" maxlength="2" value="' + collaboratorObject.minutes + '" data-validation="required" /><input type="text" class="time" maxlength="2" value="' + collaboratorObject.seconds + '" data-validation="required" /><p>Save Feed</p>');
							
								// verify time
								collaboratorPhase = -1;
							
							break;
							
						}
					
					break;
					// done, undefined, 2nd assist, done, category, done
					case 4:
					
						// event type
						switch ( event ) {
							// goal
							case 'Goal':
							
								// update collaborator object
								collaboratorObject.firstParticipant = ( ( data == 'TBD' || data == 'N' ) ? undefined : data );
								// record
								var rosterRecords = ( collaboratorObject.advantage == 'true' ) ? gameDataObject.home.rosterRecords : gameDataObject.away.rosterRecords;
								if ( data == 'TBD' || data == 'N' ) {
									collaboratorObject.fpsri = undefined;
								} else {
									// loop through roster
									for ( var i = 0; i < rosterRecords.length; i++ ) {
										// if found
										if ( data === rosterRecords[i].attributes['rosterMember'].id )
											// update
											collaboratorObject.fpsri = rosterRecords[i].id;
									}
								}
								// if no assists
								if ( data == 'N' ) {
									// append two li
									for ( var i = 0; i < 1; i++ ) {
										// new li
										var li = document.createElement('li');
										// append new li
										list.append(li);
									}
									// adjust first li			
									list
										.children('li:first-child')
											.addClass('slide-option-in time')
											.attr( 'data-value' , '' )
											.addClass('cf')
											.html('<input type="text" class="time" maxlength="2" value="' + collaboratorObject.minutes + '" data-validation="required" /><input type="text" class="time" maxlength="2" value="' + collaboratorObject.seconds + '" data-validation="required" /><p>Save Feed</p>');
								
									// verify time
									collaboratorPhase = -1;
									
								// if assist	
								} else {
									// get correct roster
									var roster = ( collaboratorObject.advantage == 'true' ) ? gameDataObject.home.fullRoster : gameDataObject.away.fullRoster;
									var activeRoster = ( collaboratorObject.advantage == 'true' ) ? gameDataObject.home.activeRoster : gameDataObject.away.activeRoster;
									// new li
									var li = document.createElement('li');
									// to be determined li properties
									$(li)
										.addClass('slide-option-in')
										.addClass('next-field one-fifth')
										.attr('data-value' , 'TBD')
										.text('To Be Determined');
									// append to list
									list.append(li);
									// new li
									var li = document.createElement('li');
									// none li properties
									$(li)
										.addClass('slide-option-in')
										.addClass('next-field one-fifth')
										.attr('data-value' , 'N')
										.text('None');
									// append to list
									list.append(li);
									// loop through roster
									for ( var i = 0; i < roster.length; i++ ) {
										// if on active roster
										if ( $.inArray(roster[i].id, activeRoster) != -1 ) {
											// new li
											var li = document.createElement('li');
											// if player
											if ( $.inArray( roster[i].attributes['role'].position , player ) != -1 ) {
												// if not used already
												if ( !( roster[i].id === collaboratorObject.participant.identification ) && !( roster[i].id === collaboratorObject.firstParticipant ) ) {
													// new li properties
													$(li)
														.addClass('slide-option-in')
														.addClass('next-field one-fifth')
														.attr('data-value' , roster[i].id)
														.text(roster[i].attributes['number']);
													// append new li
													list.append(li);
												}
											}
										}
									}
									
									// increment phase
									collaboratorPhase++;	
								}
							
							break;
							// penalty
							case 'Penalty':
							
								// update collaborator object
								collaboratorObject.other.type = ( ( data == 'TBD' ) ? null : data );
								// new li
								var li = document.createElement('li');
								// to be determined li properties
								$(li)
									.addClass('slide-option-in')
									.addClass('next-field one-fifth')
									.attr('data-value' , 'TBD')
									.text('To Be Determined');
								// append to list
								list.append(li);
								// new li
								var li = document.createElement('li');
								// to be determined li properties
								$(li)
									.addClass('slide-option-in')
									.addClass('next-field one-fifth')
									.attr('data-value' , 'N')
									.text('None');
								// append to list
								list.append(li);
								// loop through shot types
								for ( var i = 0; i < penaltyCategory.length; i++ ) {
									// new li
									var li = document.createElement('li');
									// new li properties
									$(li)
										.addClass('slide-option-in')
										.addClass('next-field one-fifth')
										.attr('data-value' , penaltyCategory[i])
										.text(penaltyCategory[i]);
									// append new li
									list.append(li);
								}
								
								// increment phase
								collaboratorPhase++;
							
							break;
						}
					
					break;
					// undefined, undefined, time, undefined, time, undefined
					case 5:
					
						// event type
						switch ( event ) {
							// goal
							case 'Goal':
							
								// update collaborator object
								collaboratorObject.secondParticipant = ( ( data == 'TBD' || data == 'N' ) ? undefined : data );
								// record
								var rosterRecords = ( collaboratorObject.advantage == 'true' ) ? gameDataObject.home.rosterRecords : gameDataObject.away.rosterRecords;
								if ( data == 'TBD' || data == 'N' ) {
									collaboratorObject.spsri = undefined;
								} else {
									// loop through roster
									for ( var i = 0; i < rosterRecords.length; i++ ) {
										// if found
										if ( data === rosterRecords[i].attributes['rosterMember'].id )
											// update
											collaboratorObject.spsri = rosterRecords[i].id;
									}
								}
								// append two li
								for ( var i = 0; i < 1; i++ ) {
									// new li
									var li = document.createElement('li');
									// append new li
									list.append(li);
								}
								// adjust first li			
								list
									.children('li:first-child')
										.addClass('slide-option-in time')
										.attr( 'data-value' , '' )
										.addClass('cf')
										.html('<input type="text" class="time" maxlength="2" value="' + collaboratorObject.minutes + '" data-validation="required" /><input type="text" class="time" maxlength="2" value="' + collaboratorObject.seconds + '" data-validation="required" /><p>Save Feed</p>');
							
								// verify time
								collaboratorPhase = -1;
							
							break;
							// penalty
							case 'Penalty':
							
								// update collaborator object
								collaboratorObject.other.category = ( ( data == 'TBD' || data =='N' ) ? null : data );
								// append two li
								for ( var i = 0; i < 1; i++ ) {
									// new li
									var li = document.createElement('li');
									// append new li
									list.append(li);
								}
								// adjust first li			
								list
									.children('li:first-child')
										.addClass('slide-option-in time')
										.attr( 'data-value' , '' )
										.addClass('cf')
										.html('<input type="text" class="time" maxlength="2" value="' + collaboratorObject.minutes + '" data-validation="required" /><input type="text" class="time" maxlength="2" value="' + collaboratorObject.seconds + '" data-validation="required" /><p>Save Feed</p>');
							
								// verify time
								collaboratorPhase = -1;
							
							break;
						}
					
					break;
					case -1:
					
						// verify time
						collaboratorObject.minutes = $(e.currentTarget).children('input.time:nth-of-type(1)').val();
						collaboratorObject.seconds = $(e.currentTarget).children('input.time:nth-of-type(2)').val();
					
						// if penalty
						if ( event == 'Penalty' ) {
							// disable back button
							$('#collaboration-back').attr('disabled' , true);
							// save collaboration
							saveCollaboration(collaboratorObject);
							// events
							var continuingEvents = [ 'Penalty' , 'Faceoff' ];
							// display collaborate options options
							for ( var i = 0; i < 2; i++ ) {
								// new li
								var li = document.createElement('li');
								// new li properties
								$(li)
									.addClass('slide-option-in')
									.addClass('next-field one-half')
									.css( 'line-height' , ( $('div#collaborative').outerHeight() - ( $('div#collaborative header').outerHeight() + 60 ) ) + 'px' )
									.attr('data-value' , continuingEvents[i])
									.text(continuingEvents[i]);
								// append new li
								list.append(li);
							}
							collaboratorPhase = 0;
						// if not a penalty	
						} else {
							// save collaboration
							saveCollaboration(collaboratorObject);
							// reset
							resetCollaboratorFrame();
						}
					
					break;
					
				}
				
			}
			
			// if collaborator phase is 0
			if ( !collaboratorPhase ) $('#collaboration-back').removeAttr('disabled');
			// set header
			setHeading(collaboratorPhase, collaboratorObject.event);
			// set collaboration attributes
			setCollaborationAttributes(collaboratorPhase, collaboratorObject.event);




		// restrict minutes to numbers only
		restrictAMinuteClock: function(e) {
			
			// grab key value
			var key = e.keyCode;
			// restrict any key other than numbers
			if ( !( key >= 48 && key <= 57 ) )
				return false;
			// if more than 2
			if ( $(e.currentTarget).val().length > 1 )
				return false;
			
		},
		
		// change focus to seconds
		changeAFocusToSecondsClock: function(e) {
			
			// grab key value
			var key = e.keyCode;
			// grab current minute value
			var minuteClock = $(e.currentTarget);
			// if within key range
			if ( key >= 48 && key <= 57 )
				if ( minuteClock.val().length == 2 )
					$('.adjust-seconds').select();
			
		},
		
		// adjust minute clock
		adjustAMinuteClockOnBlur: function(e) {
			
			// grab current minute value
			var minuteClock = $(e.currentTarget);
			// if nothing in clock
			if ( minuteClock.val() == false || minuteClock.val() == '0' || minuteClock.val() == '' || minuteClock.val().length == 0 )
				// 00
				minuteClock.val('00');
			// if one value in clock
			else if ( minuteClock.val().length == 1 )
				// 0X
				minuteClock.val( '0' + minuteClock.val() );
			
			// if greater than range
			if ( gameDataObject.time.currentPeriod == 1 ) {
				if ( parseInt(minuteClock.val()) > gameDataObject.time.defaultFirstPeriodMinutes )
					// default
					minuteClock.val(gameDataObject.time.defaultFirstPeriodMinutes);
			} else if ( gameDataObject.time.currentPeriod == 2 ) {
				if ( parseInt(minuteClock.val()) > gameDataObject.time.defaultSecondPeriodMinutes )
					// default
					minuteClock.val(gameDataObject.time.defaultFirstPeriodMinutes);
			} else if ( gameDataObject.time.currentPeriod == 3 ) {
				if ( parseInt(minuteClock.val()) > gameDataObject.time.defaultThirdPeriodMinutes )
					// default
					minuteClock.val(gameDataObject.time.defaultFirstPeriodMinutes);
			}
			
		},
		
		// restrict minutes to numbers only
		restrictASecondClock: function(e) {
		
			// grab key value
			var key = e.keyCode;
			// grab current second value
			var secondClock = $(e.currentTarget);
			// restrict any key other than numbers
			if ( !( key >= 48 && key <= 57 ) )
				return false;
			// restrict any value past 59
			if ( ( secondClock.val() == '' ) && !( key >= 48 && key < 54 ) )
				return false;
			// if more than 2
			if ( $(e.currentTarget).val().length > 1 )
				return false;
				
		},
		
		// adjust second clock
		adjustASecondClockOnBlur: function(e) {
			
			// grab current minute valye
			var secondClock = $(e.currentTarget);
			var minuteClock = $('input.adjust-minutes');
			// if minute clock is max
			if ( gameDataObject.time.currentPeriod == 1 ) {
				if ( minuteClock.val() == gameDataObject.time.defaultFirstPeriodMinutes )
					// 00
					secondClock.val('00');
			} else if ( gameDataObject.time.currentPeriod == 2 ) {
				if ( minuteClock.val() == gameDataObject.time.defaultSecondPeriodMinutes )
					// 00
					secondClock.val('00');
			} else if ( gameDataObject.time.currentPeriod == 3 ) {
				if ( minuteClock.val() == gameDataObject.time.defaultThirdPeriodMinutes )
					// 00
					secondClock.val('00');
			}
			// if minute clock is 00
			if ( minuteClock.val() == '00' )
				// 01
				secondClock.val('01');
			// if nothing in clock
			if ( secondClock.val() == false || secondClock.val() == '0' || secondClock.val() == '' || secondClock.val().length == 0 )
				// 00
				secondClock.val('00');
			// if one value in clock
			else if ( secondClock.val().length == 1 )
				// 0X
				secondClock.val( '0' + secondClock.val() );
			// if value > 59	
			else if ( secondClock.val() > 59 )
				// 00
				secondClock.val('00');
			
		},
		
		// save time adjustment
		saveTimeAdjustment: function(e) {
		
			// only if user is game creator
			if ( Parse.User.current().id === gameDataObject.creator.id ) {
			
				// if game is active
				if ( gameDataObject.isActive && !(gameDataObject.isFinal) ) {
				
					$('.match--overlay').addClass('hidden');
							
					// current period
					gameDataObject.time.currentMinutes = $('.adjust-minutes').val();
					gameDataObject.time.currentSeconds = $('.adjust-seconds').val();
							
					// adjust button
					$('button#match--play-pause').html('&#xe0bc;');
					
					// stop the clock
					clearTimeout(clockTimer);
					// clock is stopped
					clock = false;
					
					// adjust clock
					$('.match--time-one').val(gameDataObject.time.currentMinutes);
					$('.match--time-two').val(gameDataObject.time.currentSeconds);
					
					// publish
					pubnub.publish({
						channel: gameDataObject.ID + '_time',
						message: {
							cTime			: new Date(),
							rTime 			: {
								minutes 	: gameDataObject.time.currentMinutes,
								seconds 	: gameDataObject.time.currentSeconds,
								period		: gameDataObject.time.currentPeriod
							},
							activity 		: gameDataObject.status,
							cActivity		: false 
						}
					});
					
				}
				
			}
			
		},
		
		// see full roster
		fullRoster: function(e) {
			
			e.preventDefault();
			
			// welcoming
			if ( $(e.currentTarget).attr('data-roster') == 0 ) {
				// if already has class
				if ( $('ul.match--roster-welcoming').hasClass('full-roster') ) {
					$('ul[class^="match--roster"]').removeClass('full-roster hide-roster');
				} else {
					// add class to ul
					$('ul.match--roster-welcoming')
						.removeClass('hide-roster')
						.addClass('full-roster');
					$('ul.match--roster-visiting')
						.removeClass('full-roster')
						.addClass('hide-roster');
				}
			} else if ( $(e.currentTarget).attr('data-roster') == 1 ) {
				// if already has class
				if ( $('ul.match--roster-visiting').hasClass('full-roster') ) {
					$('ul[class^="match--roster"]').removeClass('full-roster hide-roster');
				} else {
					// add class to ul
					$('ul.match--roster-visiting')
						.removeClass('hide-roster')
						.addClass('full-roster');
					$('ul.match--roster-welcoming')
						.removeClass('full-roster')
						.addClass('hide-roster');
				}
			}
			
		}


		
		// verify minutes settings
		verifyTimeMinutesSetting: function(e) {
		
			// grab key value
			var key = e.keyCode;
			// restrict any key other than numbers
			if ( !( key >= 48 && key <= 57 ) && key != 13 )
				return false;
			// restrict length to 2
			if ( $(e.currentTarget).val().length > 1 )
				return false;
			
		},
		
		// restrict minutes settings to above 0
		restrictMinutesToAboveZero: function(e) {
			
			// restrict to above 0
			if ( $(e.currentTarget).val() == '00' || $(e.currentTarget).val() == 0 || $(e.currentTarget).val() == '' || $(e.currentTarget).val() == false ) {
				// show error
				$(e.currentTarget)
					.siblings('.profile--message')
						.removeClass('error')
						.addClass('display-message error')
						.text('Time must be greater than 0');
				// disable update button		
				$('#match--save-settings input[type="submit"]').attr('disabled' , true);
				// 1st
				if ( parseInt($(e.currentTarget).attr('data-period')) == 1 ) fpmReady = false;
				// 2nd
				else if ( parseInt($(e.currentTarget).attr('data-period')) == 2 ) spmReady = false;
				// 3rd
				else if ( parseInt($(e.currentTarget).attr('data-period')) == 3 ) tpmReady = false;
			// name not empty	
			} else {
				// hide error
				$(e.currentTarget)
					.siblings('.profile--message')
						.removeClass('display-message');
				// 1st
				if ( parseInt($(e.currentTarget).attr('data-period')) == 1 ) fpmReady = true;
				// 2nd
				else if ( parseInt($(e.currentTarget).attr('data-period')) == 2 ) spmReady = true;
				// 3rd
				else if ( parseInt($(e.currentTarget).attr('data-period')) == 3 ) tpmReady = true;
				// if ready
				if ( fpmReady && spmReady && tpmReady )
					// re-enable update button		
					$('#match--save-settings input[type="submit"]').removeAttr('disabled')
			}
			
		},




		
		// restrict minutes to numbers only
		restrictMinuteClock: function(e) {
			
			// grab key value
			var key = e.keyCode;
			// restrict any key other than numbers
			if ( !( key >= 48 && key <= 57 ) )
				return false;
			
		},
		
		// change focus to seconds
		changeFocusToSecondsClock: function(e) {
			
			// grab key value
			var key = e.keyCode;
			// grab current minute value
			var minuteClock = $(e.currentTarget);
			// if within key range
			if ( key >= 48 && key <= 57 )
				if ( minuteClock.val().length == 2 )
					minuteClock
						.siblings('input.time')
							.select()
			
		},
		
		// adjust minute clock
		adjustMinuteClockOnBlur: function(e) {
			
			// grab current minute value
			var minuteClock = $(e.currentTarget);
			// if nothing in clock
			if ( minuteClock.val() == false || minuteClock.val() == '0' || minuteClock.val() == '' || minuteClock.val().length == 0 )
				// 00
				minuteClock.val('00');
			// if one value in clock
			else if ( minuteClock.val().length == 1 )
				// 0X
				minuteClock.val( '0' + minuteClock.val() );
			// if greater than range
			else if ( parseInt(minuteClock.val()) > gameDataObject.time.defaultMinutes )
				// default
				minuteClock.val(gameDataObject.time.defaultMinutes);
			
		},
		
		// restrict minutes to numbers only
		restrictSecondClock: function(e) {
		
			// grab key value
			var key = e.keyCode;
			// grab current second value
			var secondClock = $(e.currentTarget);
			// restrict any key other than numbers
			if ( !( key >= 48 && key <= 57 ) )
				return false;
			// restrict any value past 59
			if ( ( secondClock.val() == '' ) && !( key >= 48 && key < 54 ) )
				return false;
				
		},
		
		// adjust second clock
		adjustSecondClockOnBlur: function(e) {
			
			// grab current minute valye
			var secondClock = $(e.currentTarget);
			var minuteClock = $(e.currentTarget).siblings('input.time');
			// if minute clock is max
			if ( minuteClock.val() == gameDataObject.time.defaultMinutes )
				// 00
				secondClock.val('00');
			// if minute clock is 00
			else if ( minuteClock.val() == '00' )
				// 01
				secondClock.val('01');
			// if nothing in clock
			if ( secondClock.val() == false || secondClock.val() == '0' || secondClock.val() == '' || secondClock.val().length == 0 )
				// 00
				secondClock.val('00');
			// if one value in clock
			else if ( secondClock.val().length == 1 )
				// 0X
				secondClock.val( '0' + secondClock.val() );
			// if value > 59	
			else if ( secondClock.val() > 59 )
				// 00
				secondClock.val('00');
			
		},



// toggle period and publish
		switchPeriod: function(e) {
			
			// Light up all previous periods only. Adjust
			// play/pause button so that it is set to start
			// playing, and reset the clock. Publish.
			
			// only if user is game creator
			if ( Parse.User.current().id === gameDataObject.creator.id ) {
			
				// if game is active
				if ( gameDataObject.isActive && !(gameDataObject.isFinal) ) {
			
					$(e.currentTarget)
						.removeClass('match--inactive-period')
						.siblings('.match--period')
							.addClass('match--inactive-period')
								.end()
						.prevAll()
							.removeClass('match--inactive-period');
							
					// current period
					gameDataObject.time.currentPeriod = $(e.currentTarget).attr('data-period');
					
					// second to 00
					gameDataObject.time.currentSeconds = '00';
					
					// current minutes
					if ( gameDataObject.time.currentPeriod == 1 ) gameDataObject.time.currentMinutes = gameDataObject.time.defaultFirstPeriodMinutes;
					else if ( gameDataObject.time.currentPeriod == 2 ) gameDataObject.time.currentMinutes = gameDataObject.time.defaultSecondPeriodMinutes;
					else if ( gameDataObject.time.currentPeriod == 3 ) gameDataObject.time.currentMinutes = gameDataObject.time.defaultThirdPeriodMinutes;
							
					// adjust button
					$('button#match--play-pause').html('&#xe0bc;');
					
					// stop the clock
					clearTimeout(clockTimer);
					// clock is stopped
					clock = false;
					
					// adjust clock
					$('.match--time-one').val(gameDataObject.time.currentMinutes);
					$('.match--time-two').val(gameDataObject.time.currentSeconds);
					
					// publish
					pubnub.publish({
						channel: gameDataObject.ID + '_time',
						message: {
							cTime			: new Date(),
							rTime 			: {
								minutes 	: gameDataObject.time.currentMinutes,
								seconds 	: gameDataObject.time.currentSeconds,
								period		: gameDataObject.time.currentPeriod
							},
							activity 		: gameDataObject.status,
							cActivity		: false 
						}
					});
					
				}
				
			}
			
		},



		// real-time
		polling: function(e) {
		
			// Polling mechanism used to do continuous
			// polling until game's ID has been retrieved,
			// at which point user subscribes to pubnub
			
			setTimeout(function() {
				
				statisticPollingInterval = window.setInterval(function() {
					// when game ID is defined
					if ( gameDataObject.ID != undefined ) {
						
						// Subscribe to game status changes
						pubnub.subscribe({
							channel: gameDataObject.ID + '_time',
							message: function(status) {
							
								// status object
								var so = status;
								
								// if not current user
								if ( Parse.User.current().id !== gameDataObject.creator.id ) {
									
									// if game is active
									if ( so.activity == thisGame.isActive ) {
									
										// status
										gameDataObject.status = thisGame.isActive;
										gameDataObject.isActive = true;
										gameDataObject.isFinal = false;
										
										// inactive
										$('.match--time')
											.removeClass('inactive final')
											.find('input')
												.show()
													.end()
											.find('.match--status')
												.removeClass('inactive')
												.text('')
												.hide()
													.end()
											.find('#match--play-pause')
												.removeAttr('disabled');
									
										// toggle setting
										switch ( gameDataObject.toggle ) {
											// score
											case statistics.score:
											
												// display score
												$('.match--welcoming-score').text(gameDataObject.home.score + gameDataObject.home.rtScore);
												$('.match--visiting-score').text(gameDataObject.away.score + gameDataObject.away.rtScore);
												
											break;
											// hits
											case statistics.hits:
											
												// display score
												$('.match--welcoming-score').text(gameDataObject.home.hits + gameDataObject.home.rtHits);
												$('.match--visiting-score').text(gameDataObject.away.hits + gameDataObject.away.rtHits);
												
											break;
											// shots
											case statistics.shots:
											
												// display score
												$('.match--welcoming-score').text(gameDataObject.home.shots + gameDataObject.home.rtShots);
												$('.match--visiting-score').text(gameDataObject.away.shots + gameDataObject.away.rtShots);
												
											break;
											// penaltiesim
											case statistics.penaltiesim:
											
												// display score
												$('.match--welcoming-score').text(gameDataObject.home.penaltiesim + gameDataObject.home.rtPenaltiesim);
												$('.match--visiting-score').text(gameDataObject.away.penaltiesim + gameDataObject.away.rtPenaltiesim);
												
											break;
											// turnovers
											case statistics.turnovers:
											
												// display score
												$('.match--welcoming-score').text(gameDataObject.home.turnovers + gameDataObject.home.rtTurnovers);
												$('.match--visiting-score').text(gameDataObject.away.turnovers + gameDataObject.away.rtTurnovers);
												
											break;
											// faceoffs
											case statistics.faceoffs:
											
												// display score
												$('.match--welcoming-score').text(gameDataObject.home.faceoffs + gameDataObject.home.rtFaceoffs);
												$('.match--visiting-score').text(gameDataObject.away.faceoffs + gameDataObject.away.rtFaceoffs);
											
											break;
				
										}
									
										// if clock running
										if ( so.cActivity && !clock ) {
										
											// get time difference in absolute second
											var currentDate = new Date();
											var lastRegisteredDate = Date.parse(so.cTime);
											var absoluteSeconds = Math.floor(( currentDate - lastRegisteredDate ) / 1000);
											var relativeSeconds = Math.floor( ( parseInt(so.rTime.minutes) * 60 ) + parseInt(so.rTime.seconds) );
											var relativeTime = relativeSeconds - absoluteSeconds;
											
											// if difference is negative - period finished
											if ( relativeTime < 0 ) {
												
												// set time
												$('.match--time-one').val('00');
												$('.match--time-two').val('00');
												
												// current time
												gameDataObject.time.currentMinutes = '00';
												gameDataObject.time.currentSeconds = '00';
												
												// reset periods
												$('.match--period').addClass('match--inactive-period');
												
												// set period
												if ( parseInt(so.rTime.period) == 1 ) $('.match--period[data-period="1"]').removeClass('match--inactive-period');
												if ( parseInt(so.rTime.period) == 2 ) $('.match--period:not(.match--period[data-period="3"])').removeClass('match--inactive-period');
												if ( parseInt(so.rTime.period) == 3 ) $('.match--period').removeClass('match--inactive-period');
												
												// current period
												gameDataObject.time.currentPeriod = so.rTime.period;
												
												// clock is not running
												clock = false;
												
												// clear timeout
												clearTimeout(clockInterval);
												
											// if difference is positive - period not finished	
											} else {
											
												// set seconds and minutes
												var relativeMinutes = Math.floor(parseInt(relativeTime/60));
												var relativeSeconds = Math.floor(parseInt(relativeTime%60));
												
												// set time
												$('.match--time-one').val(( ( relativeMinutes == 0 ) ? '00' : relativeMinutes ));
												$('.match--time-two').val(( ( relativeSeconds == 0 ) ? '00' : relativeSeconds ));
												
												// current time
												gameDataObject.time.currentMinutes = ( ( relativeMinutes == 0 ) ? '00' : relativeMinutes );
												gameDataObject.time.currentSeconds = relativeSeconds;
												
												// reset period
												$('.match--period').addClass('match--inactive-period');
												
												// set period
												if ( parseInt(so.rTime.period) == 1 ) $('.match--period[data-period="1"]').removeClass('match--inactive-period');
												if ( parseInt(so.rTime.period) == 2 ) $('.match--period:not(.match--period[data-period="3"])').removeClass('match--inactive-period');
												if ( parseInt(so.rTime.period) == 3 ) $('.match--period').removeClass('match--inactive-period');
												
												// current period
												gameDataObject.time.currentPeriod = so.rTime.period;
												
												// clock is now running
												clock = true;
												
												// run clock
												controlClock($('.match--time-one'), $('.match--time-two'), clock, gameDataObject);
												
											}
											
										// if clock is not running	
										} else if ( !so.cActivity ) {
											
											// set time
											$('.match--time-one').val(( ( so.rTime.minutes == 0 ) ? '00' : so.rTime.minutes ));
											$('.match--time-two').val(so.rTime.seconds);
											
											// current time
											gameDataObject.time.currentMinutes = ( ( so.rTime.minutes == 0 ) ? '00' : so.rTime.minutes );
											gameDataObject.time.currentSeconds = so.rTime.seconds;
											
											// reset period
											$('.match--period').addClass('match--inactive-period');
											
											// set period
											if ( parseInt(so.rTime.period) == 1 ) $('.match--period[data-period="1"]').removeClass('match--inactive-period');
											if ( parseInt(so.rTime.period) == 2 ) $('.match--period:not(.match--period[data-period="3"])').removeClass('match--inactive-period');
											if ( parseInt(so.rTime.period) == 3 ) $('.match--period').removeClass('match--inactive-period');
											
											// current period
											gameDataObject.time.currentPeriod = so.rTime.period;
											
											// clock is now stopped
											clock = false;
											
											// clear clock
											clearTimeout(clockTimer);
											
										}
									// game is inactive	
									} else if ( so.activity == thisGame.isInactive ) {
										
										// status
										gameDataObject.status = thisGame.isInactive;
										gameDataObject.isActive = false;
										gameDataObject.isFinal = false;
										
										// set period
										gameDataObject.time.currentPeriod = so.rTime.period;
										
										// set time
										gameDataObject.time.currentMinutes = so.rTime.minutes;
										gameDataObject.time.currentSeconds = so.rTime.seconds;
										
										// inactive
										$('.match--time')
											.addClass('inactive')
											.removeClass('final')
											.find('input')
												.hide()
													.end()
											.find('.match--status')
												.addClass('inactive')
												.text('V')
												.show()
													.end();
													
										// display score
										$('.match--welcoming-score').text('-');
										$('.match--visiting-score').text('-');
										
										// hide periods
										$('.match--period').addClass('match--inactive-period');
										
										// clock stopped
										clock = false;
										
										// clear clock
										clearInterval(clockTimer);
										
										
									// game is final	
									} else if ( so.activity == thisGame.isFinal ) {
										
										// status
										gameDataObject.status = thisGame.isFinal;
										gameDataObject.isActive = false;
										gameDataObject.isFinal = true;
										
										// set period
										gameDataObject.time.currentPeriod = so.rTime.period;
										
										// set time
										gameDataObject.time.currentMinutes = so.rTime.minutes;
										gameDataObject.time.currentSeconds = so.rTime.seconds;
										
										// final
										$('.match--time')
											.removeClass('inactive')
											.addClass('final')
											.find('input')
												.hide()
													.end()
											.find('.match--status')
												.removeClass('inactive')
												.text('FINAL')
												.show()
													.end()
											.find('#match--play-pause')
												.attr('disabled', true);
												
										// hide periods
										$('.match--period').addClass('match--inactive-period');
										
										// toggle setting
										switch ( gameDataObject.toggle ) {
											// score
											case statistics.score:
											
												// display score
												$('.match--welcoming-score').text(gameDataObject.home.score + gameDataObject.home.rtScore);
												$('.match--visiting-score').text(gameDataObject.away.score + gameDataObject.away.rtScore);
												
											break;
											// hits
											case statistics.hits:
											
												// display score
												$('.match--welcoming-score').text(gameDataObject.home.hits + gameDataObject.home.rtHits);
												$('.match--visiting-score').text(gameDataObject.away.hits + gameDataObject.away.rtHits);
												
											break;
											// shots
											case statistics.shots:
											
												// display score
												$('.match--welcoming-score').text(gameDataObject.home.shots + gameDataObject.home.rtShots);
												$('.match--visiting-score').text(gameDataObject.away.shots + gameDataObject.away.rtShots);
												
											break;
											// penaltiesim
											case statistics.penaltiesim:
											
												// display score
												$('.match--welcoming-score').text(gameDataObject.home.penaltiesim + gameDataObject.home.rtPenaltiesim);
												$('.match--visiting-score').text(gameDataObject.away.penaltiesim + gameDataObject.away.rtPenaltiesim);
												
											break;
											// turnovers
											case statistics.turnovers:
											
												// display score
												$('.match--welcoming-score').text(gameDataObject.home.turnovers + gameDataObject.home.rtTurnovers);
												$('.match--visiting-score').text(gameDataObject.away.turnovers + gameDataObject.away.rtTurnovers);
												
											break;
											// faceoffs
											case statistics.faceoffs:
											
												// display score
												$('.match--welcoming-score').text(gameDataObject.home.faceoffs + gameDataObject.home.rtFaceoffs);
												$('.match--visiting-score').text(gameDataObject.away.faceoffs + gameDataObject.away.rtFaceoffs);
											
											break;
				
										}
										
										// clock stopped
										clock = false;
										
										// clear clock
										clearInterval(clockTimer);
										
									}
								}
							}
						});
						
						// Get history from 'game status changes'
						pubnub.history({
							channel: gameDataObject.ID + '_time',
							count: 1,
							callback: function(status) {
							
								// status object
								var so = status[0][0];
								
								// if game is active
								if ( so.activity == thisGame.isActive ) {
								
									// if clock running
									if ( so.cActivity ) {
									
										// if current user is game creator
										if ( Parse.User.current().id === gameDataObject.creator.id )
											$('#match--play-pause').html('&#xe0bd;');
											
										// get time difference in absolute seconds
										var currentDate = new Date();
										var lastRegisteredDate = Date.parse(so.cTime);
										var absoluteSeconds = Math.floor(( currentDate - lastRegisteredDate ) / 1000);
										var relativeSeconds = Math.floor( ( parseInt(so.rTime.minutes) * 60 ) + parseInt(so.rTime.seconds) );
										var relativeTime = relativeSeconds - absoluteSeconds;
										
										// if difference is negative - period finished
										if ( relativeTime < 0 ) {
											
											// set time
											$('.match--time-one').val('00');
											$('.match--time-two').val('00');
											
											// current time
											gameDataObject.time.currentMinutes = '00';
											gameDataObject.time.currentSeconds = '00';
											
											// reset periods
											$('.match--period').addClass('match--inactive-period');
											
											// set period
											if ( parseInt(so.rTime.period) == 1 ) $('.match--period[data-period="1"]').removeClass('match--inactive-period');
											if ( parseInt(so.rTime.period) == 2 ) $('.match--period:not(.match--period[data-period="3"])').removeClass('match--inactive-period');
											if ( parseInt(so.rTime.period) == 3 ) $('.match--period').removeClass('match--inactive-period');
											
											// current period
											gameDataObject.time.currentPeriod = so.rTime.period;
											
											// clock is not running
											clock = false;
											
										// if difference is positive - period not finished	
										} else {
										
											// get minute and seconds
											var relativeMinutes = Math.floor(parseInt(relativeTime/60));
											var relativeSeconds = Math.floor(parseInt(relativeTime%60));
											
											// set time
											$('.match--time-one').val(( ( relativeMinutes == 0 ) ? '00' : relativeMinutes ));
											$('.match--time-two').val(relativeSeconds);
											
											// current time
											gameDataObject.time.currentMinutes = ( ( relativeMinutes == 0 ) ? '00' : relativeMinutes );
											gameDataObject.time.currentSeconds = relativeSeconds;
											
											// reset period
											$('.match--period').addClass('match--inactive-period');
											
											// set period
											if ( parseInt(so.rTime.period) == 1 ) $('.match--period[data-period="1"]').removeClass('match--inactive-period');
											if ( parseInt(so.rTime.period) == 2 ) $('.match--period:not(.match--period[data-period="3"])').removeClass('match--inactive-period');
											if ( parseInt(so.rTime.period) == 3 ) $('.match--period').removeClass('match--inactive-period');
											
											// current period
											gameDataObject.time.currentPeriod = so.rTime.period;
											
											// clock is now running
											clock = true;
											
											// run clock
											controlClock($('.match--time-one'), $('.match--time-two'), clock, gameDataObject);
											
										}
									
									// if clock is not running	
									} else if ( !so.cActivity ) {
									
										// if current user is game creator
										if ( Parse.User.current().id === gameDataObject.creator.id )
											$('#match--play-pause').html('&#xe0bc;');
											
										// set time
										$('.match--time-one').val(( ( so.rTime.minutes == 0 ) ? '00' : so.rTime.minutes ));
										$('.match--time-two').val(so.rTime.seconds);
										
										// current time
										gameDataObject.time.currentMinutes = ( ( so.rTime.minutes == 0 ) ? '00' : so.rTime.minutes );
										gameDataObject.time.currentSeconds = so.rTime.seconds;
										
										// reset period
										$('.match--period').addClass('match--inactive-period');
										
										// set period
										if ( parseInt(so.rTime.period) == 1 ) $('.match--period[data-period="1"]').removeClass('match--inactive-period');
										if ( parseInt(so.rTime.period) == 2 ) $('.match--period:not(.match--period[data-period="3"])').removeClass('match--inactive-period');
										if ( parseInt(so.rTime.period) == 3 ) $('.match--period').removeClass('match--inactive-period');
										
										// current period
										gameDataObject.time.currentPeriod = so.rTime.period;
										
										// clock is now stopped
										clock = false;
										
									}
								
								// game is inactive
								} else if ( gameDataObject.status == thisGame.isInactive ) {
									
									// if current user is game creator
									if ( Parse.User.current().id === gameDataObject.creator.id )
										$('#match--play-pause').html('&#xe0bc;');
									
									// current time
									gameDataObject.time.currentMinutes = ( ( so.rTime.minutes == 0 ) ? '00' : so.rTime.minutes );
									gameDataObject.time.currentSeconds = so.rTime.seconds;
									
									// current period
									gameDataObject.time.currentPeriod = so.rTime.period;
									
									// clock is now stopped
									clock = false;
									
								// game is final	
								} else if ( gameDataObject.status == thisGame.isFinal ) {
									
									// if current user is game creator
									if ( Parse.User.current().id === gameDataObject.creator.id )
										$('#match--play-pause').html('&#xe0bc;');
									
									// current time
									gameDataObject.time.currentMinutes = ( ( so.rTime.minutes == 0 ) ? '00' : so.rTime.minutes );
									gameDataObject.time.currentSeconds = so.rTime.seconds;
									
									// current period
									gameDataObject.time.currentPeriod = so.rTime.period;
									
									// clock is now stopped
									clock = false;
									
								}
							}
						});
						
						// Subscribe to official statistics
						pubnub.subscribe({
							channel: gameDataObject.ID + '_official',
							message: function(officialStat) {
							
								// stat
								var offStat = officialStat;
								// adjust welcoming
								function animateWelcomingChange() {
									$('.match--welcoming-score')
										.text( parseInt($('.match--welcoming-score').text()) + 1 )
										.addClass('plus-one')
										.on('webkitAnimationEnd', function() { $('.match--welcoming-score').removeClass('plus-one'); });
								}
								// animate visiting
								function animateVisitingChange() {
									$('.match--visiting-score')
										.text( parseInt($('.match--visiting-score').text()) + 1 )
										.addClass('plus-one')
										.on('webkitAnimationEnd', function() { $('.match--visiting-score').removeClass('plus-one'); });
								}
								
								// if not made by current user
								if ( !( offStat.collaborator.objectId === Parse.User.current().id ) ) {
								
									// event
									switch ( offStat.event ) {
										// goal
										case 'Goal':
										
											// display
											displayStatisticsOnSurface( offStat.ID , offStat.event , offStat.advantage , offStat.x , offStat.y );
											// update game object
											if ( offStat.advantage ) {
												gameDataObject.home.rtScore++;
												gameDataObject.home.rtShots++;
												// if toggled to score
												if ( gameDataObject.toggle == statistics.score || gameDataObject.toggle == statistics.shots )
													animateWelcomingChange();
											} else {
												gameDataObject.away.rtScore++;
												gameDataObject.away.rtShots++;
												// if toggled to score
												if ( gameDataObject.toggle == statistics.score || gameDataObject.toggle == statistics.shots )
													animateVisitingChange();
											}
										
										break;
										// hits
										case 'Hit':
										
											// display
											displayStatisticsOnSurface( offStat.ID , offStat.event , offStat.advantage , offStat.x , offStat.y );
											// update game object
											if ( offStat.advantage ) {
												gameDataObject.home.rtHits++;
												// if toggled to score
												if ( gameDataObject.toggle == statistics.hits )
													animateWelcomingChange();
											} else {
												gameDataObject.away.rtHits++;
												// if toggled to score
												if ( gameDataObject.toggle == statistics.hits )
													animateVisitingChange();
											}
												
										break;
										// shots
										case 'Shot':
										
											// display
											displayStatisticsOnSurface( offStat.ID , offStat.event , offStat.advantage , offStat.x , offStat.y );
											// if saved or saved penalty shot
											if ( $.inArray(offStat.other.type, [ 'Saved' , 'Saved Penalty Shot' ]) != -1 ) {
												// update game object
												if ( offStat.advantage ) {
													gameDataObject.home.rtShots++;
													// if toggled to score
													if ( gameDataObject.toggle == statistics.shots )
														animateWelcomingChange();
												} else {
													gameDataObject.away.rtShots++;
													// if toggled to score
													if ( gameDataObject.toggle == statistics.shots )
														animateVisitingChange();
												}
											}
												
										break;
										// penalties
										case 'Penalty':
											
											// update game object
											if ( offStat.advantage ) {
												gameDataObject.home.rtPenaltiesim++;
												// if toggled to score
												if ( gameDataObject.toggle == statistics.penaltiesim )
													animateWelcomingChange();
											} else {
												gameDataObject.away.rtPenaltiesim++;
												// if toggled to score
												if ( gameDataObject.toggle == statistics.penaltiesim )
													animateVisitingChange();
											}
										
										break;
										// takeaway
										case 'Takeaway':
										
											// display
											displayStatisticsOnSurface( offStat.ID , offStat.event , offStat.advantage , offStat.x , offStat.y );
											// update game object
											if ( offStat.advantage ) {
												gameDataObject.away.rtTurnovers++;
												// if toggled to score
												if ( gameDataObject.toggle == statistics.turnovers )
													animateVisitingChange();
											} else {
												gameDataObject.home.rtTurnovers++;
												// if toggled to score
												if ( gameDataObject.toggle == statistics.turnovers )
													animateWelcomingChange();
											}
											
										break;
										// faceoff
										case 'Faceoff':
										
											// update game object
											if ( offStat.advantage ) {
												gameDataObject.home.rtFaceoffs++;
												// if toggled to score
												if ( gameDataObject.toggle == statistics.faceoffs )
													animateWelcomingChange();
											} else {
												gameDataObject.away.rtFaceoffs++;
												// if toggled to score
												if ( gameDataObject.toggle == statistics.faceoffs )
													animateVisitingChange();
											}
										
										break;
									}
									
								}
							}
						});
						
						// Subscribe to all statistics
						pubnub.subscribe({
							channel: gameDataObject.ID,
							message: function(stat) {
								// if not from current user
								if ( !( stat.collaborator.objectId === Parse.User.current().id ) ) {
									// adjust visual
									$('button.match--tab[data-tab="match--feeds"]').text( ( parseInt($('button.match--tab[data-tab="match--feeds"]').text().split(' ')[0]) + 1 ) + ' FEEDS');
									gameDataObject.statisticsPendingDisplay.push(stat);
									// if feeds in view
									if ( $('#match--feeds').hasClass('tab-in-view') ) {
										$('.paginate-up')
											.removeAttr('disabled')
											.removeClass('hidden')
											.text('Load ' + ( parseInt($('.paginate-up').text().split(' ')[1]) + 1 ) + ' More Feeds');
									}
								}
							}
						});
						
						// clear
						clearInterval(statisticPollingInterval);
						
					}
				// 10 ms			
				}, 10);
			// 10 ms	
			}, 10);
			
			return false;
			
		},

		// called to display feeds on .continuous-content
	function displayStatisticsOnFeed( statisticId , collaborator , event , game , isOfficial , team , user , userRelation , opposingTeam , period , minutes , seconds , other , opposingUser , opposingUserRelation , league ) {
		
		// verify feed
		if ( !(	( collaborator == undefined || collaborator == null ) ||
			 	( event == undefined || event == null ) ||
			 	( game == undefined || game == null ) ||
			 	( isOfficial == undefined || isOfficial == null ) ||
			 	( team == undefined || team == null ) ||
			 	( userRelation == undefined || userRelation == null ) ||
			 	( !( user == undefined || user == null ) && ( userRelation == undefined || userRelation == null ) ) ||
			 	( opposingTeam == undefined || opposingTeam == null ) ||
			 	( period == undefined || period == null ) ||
			 	( minutes == undefined || minutes == null ) ||
			 	( seconds == undefined || seconds == null ) ||
			 	( other == undefined || other == null ) ||
			 	( !( opposingUser == undefined || opposingUser == null ) && ( opposingUserRelation == undefined || opposingUserRelation == null ) ) )
		   ) {
		   	
		       // initialize variables
		       var displayPicture;
		       var userName;
		       var userNumber = userRelation.attributes['number'];
			   var teamName = team.attributes['name'];
		       var collaboratorUsername = collaborator.attributes['username'];
		       var game = game.id;
		       var periodSuffix;
		       var discoverLink;
		       
		       // determine period suffix
		       switch ( period ) {
			       case '1':
			           periodSuffix = 'st';			
					   break;
			       case '2':
			           periodSuffix = 'nd';	
					   break;
			       case '3':
			           periodSuffix = 'rd';
					   break;
			       default:
			       	   break;
		       }
		       
		       // checking for ghost data
		       if ( user == undefined ) {
			       
			       // initialize variables
			       displayPicture = ( team.attributes['profilePicture'] == undefined || team.attributes['profilePicture'] == null ) ? 'images/player_default.png' : team.attributes['profilePicture'].url();
			       userName = userRelation.attributes['ghostObject'].name;
			       discoverLink = '#/team/' + team.id;
			       
		       } else {
			       
			       // initialize variables
			       displayPicture = ( user.attributes['profilePicture'] == undefined || user.attributes['profilePicture'] == null ) ? 'images/player_default.png' : user.attributes['profilePicture'].url();
			       userName = user.attributes['name'];
			       discoverLink = '#/' + user.attributes['username'];
			       
		       }
		       
		       // feed
			   var feed = '<article class="latest-feed" data-statistic-id="' + statisticId + '" data-game-id="' + game + '"><div class="feed-content cf"><div class="feed-user cf"><span class="feed-avatar"><a href="' + discoverLink + '"><img src="' + displayPicture + '"/></a></span><div class="feed-user-information"><p class="feed-user-name">' + userName + '</p><p class="feed-user-team">' + userNumber + ' ' + teamName + '</p></div></div><div class="feed-statistic"><p class="feed-event">' + event + '</p><p class="feed-event-other">' + period + '<sub>' + periodSuffix + '</sub> ' + minutes + ':' + seconds + '</p><p class="feed-event-other"></p><p class="feed-event-other"></p><p class="feed-event-other"></p><p class="feed-event-other"></p></div></div><footer class="cf"><div class="vs">vs. Toronto Marlboros</div><button class="go-to-game" data-game-id="' + game + '">&#xe607; Game</button><button class="publish-feed">&#xe622; Publish</button><a href="#/' + collaboratorUsername + '" class="feed-collaborator">@' + collaboratorUsername + '</a></footer></article>';	
		   	
			   // append feed
			   $('.constraint-a').append(feed);
		   	
		   }
		
	}



	getFeeds: function(user, limit, skip, alreadyInitialized) {
			var self = this;
			// feeds
			var usableFeeds = [];
			var getFeeds = new Parse.Query(Parse.Object.extend('Statistics'));
			getFeeds.equalTo('collaborator', user);	
			getFeeds.descending('createdAt');
			getFeeds.include('collaborator');
			getFeeds.include('game');
			getFeeds.include('participant');
			getFeeds.include('participant.user');
			getFeeds.include('participantTeam');
			getFeeds.include('firstParticipant');
			getFeeds.include('firstParticipant.user');
			getFeeds.include('secondParticipant');
			getFeeds.include('secondParticipant.user');
			getFeeds.include('oParticipant');
			getFeeds.include('oParticipant.user');
			getFeeds.include('oParticipantTeam');
			getFeeds.skip(skip)
			getFeeds.limit(limit);
			getFeeds.find({
				success: function(feeds) {
					for ( var i = 0; i < feeds.length; i++ ) {
						if (verifyFeedValidity(feeds[i])) usableFeeds.push(feeds[i]);
					}
					// display
					self.displayFeeds(usableFeeds, alreadyInitialized);
				},
				error: function(err) {}
			});
		},

		displayFeeds: function(feeds, alreadyInitialized) {
			this.paginate.skip += feeds.length;
			$('[data-loader-feeds]').addClass('loader--is-hidden');
			$('[data-paginate]').text('Load More Feeds').removeAttr('disabled');
			if (alreadyInitialized) {
				if ( feeds.length > 0 ) {
					for ( var s = 0; s < feeds.length; s++ ) {
						var f = feeds[s];
						// display feeds
						displayFeed(f, f.attributes['collaborator'], f.attributes['game'], f.attributes['participant'], f.attributes['participantTeam'], f.attributes['oParticipantTeam'], 'person--feeds', 1);
					}
					// if less than feed interval
					if ( feeds.length < this.paginate.interval ) {
						$('[data-results]').removeClass('hidden');
						$('[data-paginate]').addClass('hidden');
					}
				// if there are no feeds		
				} else {
					$('[data-results]').removeClass('hidden');
					$('[data-paginate]').addClass('hidden');
				}
			} else {
				if ( feeds.length > 0 ) {
					for ( var s = 0; s < feeds.length; s++ ) {
						var f = feeds[s];
						displayFeed(f, f.attributes['collaborator'], f.attributes['game'], f.attributes['participant'], f.attributes['participantTeam'], f.attributes['oParticipantTeam'], 'person--feeds', 1);
					}
					// if less than feed interval
					if ( feeds.length < this.paginate.interval ) {
						$('[data-results]').removeClass('hidden');
					// if greater than feed interval	
					} else {
						$('[data-paginate]').removeClass('hidden');
					}
				// if there are no feeds		
				} else {
					$('[data-directive-feed]').removeClass('hidden');
				}
			}
		},

		getRelation: function(user) {
			var self = this;
			var relation = new Parse.Query(Parse.Object.extend('Followers'));
			relation.equalTo('type', 'person');
			relation.equalTo('followingId', user);
			relation.equalTo('followerId', Parse.User.current());
			relation.first({
				success: function(existence) {
					if (existence) {
						self.relation.following = true;
						self.relation.id = existence.id;
						self.displayRelation(true);
					} else {
						self.relation.following = false;
						self.displayRelation(false);
					}
				},
				error: function(err) { $('[data-relation]').remove(); }
			});		
		},

		displayRelation: function(related) {
			$('[data-relation]')
				.removeAttr('disabled')
				.addClass(( (related) ? 'entity__options__button--is-active' : '' ))
				.html('<span class=" [ entity__options__button__icon ] ">&#xe26a;</span>' + ((related) ? 'FOLLOWING' : 'FOLLOW' ));
		},

		updateRelation: function(e) {
			var self = this;
			// not currently updating
			if (!this.relation.updating) {
				// updating
				this.relation.updating = true;
				// loading
				$(e.currentTarget)
					.attr('disabled', true)
					.removeClass('entity__options__button--is-active')
					.html('<span class=" [ entity__options__button__icon ] ">&#xf021;</span> CONNECTING');
				// following
				if (this.relation.following) {
					// destroy relation
					var relation = new FollowerClass();
					relation.id = this.relation.id;
					relation.destroy({
						success: function(destroyed) {
							$(e.currentTarget)
								.removeAttr('disabled')
								.html('<span class=" [ entity__options__button__icon ] ">&#xe26a;</span> FOLLOW');
							self.relation.following = false;
							self.relation.id = undefined;
							self.relation.updating = false;
						},
						error: function(err) {
							$(e.currentTarget)
								.removeAttr('disabled')
								.addClass('entity__options__button--is-active')
								.html('<span class=" [ entity__options__button__icon ] ">&#xe26a;</span> FOLLOWING');
							self.relation.updating = false;
						}
					});
				// not following
				} else {
					// create relation
					var relation = new FollowerClass();
					var ACL = new Parse.ACL();
					// access
					ACL.setWriteAccess(Parse.User.current(), true);
					ACL.setPublicWriteAccess(false);
					ACL.setPublicReadAccess(true);
					// attributes
					relation.set('followerId', Parse.User.current());
					relation.set('followingId', this.user.o);
					relation.set('gameId', null);
					relation.set('type', 'person');
					relation.setACL(ACL);
					relation.save(null, {
						success: function(newRelation) {
							$(e.currentTarget)
								.removeAttr('disabled')
								.addClass('entity__options__button--is-active')
								.html('<span class=" [ entity__options__button__icon ] ">&#xe26a;</span> FOLLOWING');							// update relation
							self.relation.following = true;
							self.relation.id = newRelation.id;
							self.relation.updating = false;
						},
						error: function(err) {
							$(e.currentTarget)
								.removeAttr('disabled')
								.html('<span class=" [ entity__options__button__icon ] ">&#xe26a;</span> FOLLOW');
							self.relation.updating = false;
						}
					});
				}
			}
		},

		// get data
		getLeagueData: function() {
			var self = this;
			// get league data
			var getLeagueData = new Parse.Query(Parse.Object.extend('League'));
			getLeagueData.equalTo('objectId' , document.URL.split('/').pop());
			getLeagueData.include('createdBy');
			getLeagueData.find({
				// success
				success: function(league) {
					if (!league.length) {
						new NotFoundView();
						return false;
					}
					// only one league should be found
					var cl = league[0];
					// store data
					self.league.o = cl;
					self.league.id = cl.id;
					self.league.name = cl.get('name');
					self.league.creator = cl.get('createdBy');
					self.league.ageLevel = cl.get('competitiveCategory');
					self.league.year = cl.get('year');
					self.league.hometown = cl.get('hometown');
					self.league.picture = (( cl.get('profilePicture') == undefined ) ? defaultPic : cl.get('profilePicture').url() );
					self.league.updatedAt = cl.updatedAt;


					// store all necessary game data
					leagueObject = {
						league			: cl,
						id				: cl.id,
						name 			: cl.get('name'),
						creator 		: cl.get('createdBy'),
						ageLevel 		: cl.get('competitiveCategory'),
						year 			: cl.get('year'),
						hometown 		: ( cl.get('hometown') == undefined || cl.get('hometown') == null ) ? '' : '<span>&#xe1e3;</span>' + cl.get('hometown'),
						sHometown		: cl.get('hometown'),
						profilePicture 	: ( cl.get('profilePicture') == undefined || cl.get('profilePicture') == null ) ? 'images/default.png' : cl.get('profilePicture').url(),
						teams 			: [],
						teamID	 		: [],
						games			: [],
						gamesCount		: 0,
						updatedAt		: cl.updatedAt
					}
					
					// update variables
					updateLeague.season = self.league.year;
					
				},
				// error
				error: function(error) {}
			});
			
			return false;
			
		},

		// get data
		getTeamData: function() {
			var self = this;
			// get team data
			var getTeamData = new Parse.Query(Parse.Object.extend('Team'));
			getTeamData.equalTo('objectId' , document.URL.split('/').pop());
			getTeamData.include('createdBy');
			getTeamData.find({
				// success
				success: function(team) {
					var ct = team[0];
					// store all necessary game data
					teamObject = {
						team			: ct,		
						id 				: ct.id,
						name 			: ct.get('name'),
						creator 		: ct.get('createdBy'),
						ageLevel 		: ct.get('competitiveCategory'),
						year 			: ct.get('year'),
						hometown 		: ( ct.get('hometown') == undefined || ct.get('hometown') == null ) ? '' : '<span>&#xe24d;</span>' + ct.get('hometown'),
						sHometown		: ct.get('hometown'),
						profilePicture 	: ( ct.get('profilePicture') == undefined || ct.get('profilePicture') == null ) ? 'images/default.png' : ct.get('profilePicture').url(),
						roster 			: [],
						rosterNumbers 	: [],
						rosterIDs 		: [],
						games			: [],
						gamesCount		: 0,
						updatedAt		: ct.updatedAt
					}
					
					// update variables
					updateTeam.season = teamObject.year;
					
				},
				// error
				error: function(error) {}
			});
		},



	
	function displayGames( gameId , activity , isFinal , location , awayTeam , homeTeam , createdBy , isOfficial , period , minutes , seconds ) {
		
		// verify feed
		if ( !(	( gameId == undefined || gameId == null ) ||
			 	( activity == undefined || activity == null ) ||
			 	( isFinal == undefined || isFinal == null ) ||
			 	( awayTeam == undefined || awayTeam == null ) ||
			 	( homeTeam == undefined || homeTeam == null ) ||
			 	( createdBy == undefined || createdBy == null ) ||
			 	( isOfficial == undefined || isOfficial == null ) ||
			 	( period == undefined || period == null ) ||
			 	( minutes == undefined || minutes == null ) ||
			 	( seconds == undefined || seconds == null ) )
		   ) {
		   
		       // initialize variables
		       var homeTeamPicture = ( homeTeam.get('profilePicture') == undefined || homeTeam.get('profilePicture') == null ) ? 'images/player_default.png' : homeTeam.get('profilePicture').url();
		       var awayTeamPicture = ( awayTeam.get('profilePicture') == undefined || awayTeam.get('profilePicture') == null ) ? 'images/player_default.png' : awayTeam.get('profilePicture').url();
		       var searchLocation = location;
		       var location = ( location == undefined || location == null ) ? '' : '<span>&#xe1e3;</span>' + location;
		       
		       // determine period suffix
		       switch ( period ) {
			       case '1':
			           periodSuffix = 'st';			
					   break;
			       case '2':
			           periodSuffix = 'nd';	
					   break;
			       case '3':
			           periodSuffix = 'rd';
					   break;
			       default:
			       	   break;
		       }
		       
		       // feed
			   var game = '<article class="scorbit-feed"><header class="cf"><div class="home cf"><a href="#/team/' + homeTeam.id + '" class="user-avatar"><img src="' + homeTeamPicture + '" /></a><div class="user-identification"><h4 class="user-name">' + homeTeam.get('name') + '</h4><p class="user-role">' + homeTeam.get('createdBy').attributes['name'] + '</p></div></div><div class="game-activity cf"><p class="home-score">4</p><span class="activity"><p>1st</p><p>12:35</p></span><p class="away-score">5</p></div><div class="away"><a href="#/team/' + awayTeam.id + '" class="user-avatar"><img src="' + awayTeamPicture + '" /></a><div class="user-identification"><h4 class="user-name">' + awayTeam.get('name') + '</h4><p class="user-role">' + awayTeam.get('createdBy').attributes['name'] + '</p></div></div></header><footer class="cf"><div class="feed-links cf"><a href="#/game/' + gameId + '" class="feed-game-link"><span>&#xf111;</span> Game</a><!--<a href="#" class="publish-link"><span>&#xf0e7;</span> Publish</a>--><a href="http://maps.google.com/maps?q=' + searchLocation + '" target="_blank" class="location-link">' + location + '</a></div><div class="feed-association cf"><a href="#/' + createdBy.get('username') + '" class="posted-by">@' + createdBy.get('username') + '</a></div><textarea></textarea></footer></article>';
		   	
			   // append feed
			   $('div.continuous-container span.feed-loader').before(game);
		   	
		   }
		
	}
	
	// display feed ( statistic , collaborator , game , participant , participantTeam , oParticipantTeam , targetID , targetType )
	function displayFeed( s , c , g , p , pt , opt , tid , tt , num ) {
	
		// dirty data?
		if (
			!(
		   	  	( c == undefined || c == null ) ||
		   	  	( s.attributes['event'] == undefined || s.attributes['event'] == null ) ||
		   	  	( g == undefined || g == null ) ||
		   	  	( pt == undefined || pt == null ) ||
		   	  	( opt == undefined || opt == null ) ||
		   	  	( s.attributes['period'] == undefined || s.attributes['period'] == null ) ||
		   	  	( s.attributes['minutes'] == undefined || s.attributes['minutes'] == null ) ||
		   	  	( s.attributes['seconds'] == undefined || s.attributes['seconds'] == null )
		   	 )
		) {
		   
		   	// feed attributes
		   	var feedContainer;
		   	
		   	// get current date, updated date, and subtract
			var lastUpdated;
			var currentDate = new Date();
			var updatedDate = s.updatedAt;
			var dateDiffinS	= Math.floor(( currentDate - updatedDate ) / 1000);
				
			// updated just now
			if ( dateDiffinS == 0 )
				lastUpdated = 'Just now';
			// seconds ago (60 seconds in a minute)
			else if ( ( dateDiffinS / 60 ) < 1 )
				lastUpdated = dateDiffinS + 's ago';
			// minutes ago (60 minutes in an hour) - 60
			else if ( ( dateDiffinS / 60 ) >= 1 && ( dateDiffinS / 60 ) < 60 )
				lastUpdated = Math.floor( dateDiffinS / 60 ) + 'min ago';
			// hours ago (24 hours in a day) - 3600
			else if ( ( dateDiffinS / 60 ) >= 60 && ( dateDiffinS / 60 ) < 1440 )
				lastUpdated = Math.floor( dateDiffinS / 3600 ) + 'h ago';
			// days ago (7 days in a week) - 86400
			else if ( ( dateDiffinS / 60 ) >= 1440 && ( dateDiffinS / 60 ) < 10080 )
				lastUpdated = Math.floor( dateDiffinS / 86400 ) + 'd ago';
			// weeks ago (4 weeks in a month) - 604800
			else if ( ( dateDiffinS / 60 ) >= 10080 && ( dateDiffinS / 60 ) < 40320 )
				lastUpdated = Math.floor( dateDiffinS / 604800 ) + 'w ago';
			// months ago (12 months in a year) - 2419200
			else if ( ( dateDiffinS / 60 ) >= 40320 && ( dateDiffinS / 60 ) < 483840 )
				lastUpdated = Math.floor( dateDiffinS / 2419200 ) + 'mon ago';
			// years ago - 29030400
			else if ( ( dateDiffinS / 60 ) >= 483840 )
				lastUpdated = Math.floor( dateDiffinS / 29030400 ) + 'y ago';
				
			// user
		   	var participant;
		   	var participantPhoto;
		   	
		   	// if no user or user relation
		   	if ( ( p == undefined || p == null ) ) {
			   	
			   	participant = s.attributes['participantTeam'].attributes['name'];
			   	participantPhoto = ( ( s.attributes['participantTeam'].attributes['profilePicture'] == undefined || s.attributes['participantTeam'].attributes['profilePicture'] == null ) ? 'images/default.png' : s.attributes['participantTeam'].attributes['profilePicture'].url() );
			   	
			// no user   	
		   	} else if ( p.attributes['ghostData'] ) {
		   	
		   		participant = p.attributes['ghostObject'].name;
			   	participantPhoto = ( ( s.attributes['participantTeam'].attributes['profilePicture'] == undefined || s.attributes['participantTeam'].attributes['profilePicture'] == null ) ? 'images/default.png' : s.attributes['participantTeam'].attributes['profilePicture'].url() );
			   	
			// user and user relation  	
		   	} else {
		   	
			   	participant = p.attributes['user'].attributes['name'];
			   	participantPhoto = ( ( p.attributes['user'].attributes['profilePicture'] == undefined || p.attributes['user'].attributes['profilePicture'] == null ) ? 'images/default.png' : p.attributes['user'].attributes['profilePicture'].url() );
			   	
		   	}
		   	
		   	// event
		   	var event;
		   	
		   	// event description
		   	switch ( s.attributes['event'] ) {
			   	// shot
			   	case 'Shot':
			   	
			   		event = 'took a Shot';
			   	
			   	break;
			   	// hit
			   	case 'Hit':
			   	
			   		event = 'made a Hit';
			   	
			   	break;
			   	// goal
			   	case 'Goal':
			   	
			   		event = 'scored a Goal';
			   	
			   	break;
			   	// turnover
			   	case 'Takeaway':
			   	
			   		event = 'took the Puck Away';
			   	
			   	break;
			   	// penalty
			   	case 'Penalty':
			   	
			   		event = 'took a Penalty';
			   	
			   	break;
			   	// faceoff
			   	case 'Faceoff':
			   	
			   		event = 'won a Faceoff';
			   	
			   	break;
		   	}
		   	
		   	// target type
		   	switch ( tt ) {
			   	// game feed
			   	case display.game:
			   	
			   		// feed
				   	feedContainer = '<article class="feed"><a class="cf"><header class="cf"><span class="feed--validity ' + ( ( s.attributes['isOfficial'] == true ) ? '' : 'feed-not-official' ) + '">&#xe26a;</span><span class="feed--collaborator">posted ' + lastUpdated + ' by @' + c.attributes['username'] + '</span></header><div class="cf"><span class="feed--user-avatar"><img src="' + participantPhoto + '" /></span><span class="feed--user-identification"><h5>' + participant + ' ' + event + '</h5>us">V</p><span class="feed--relative-team-color ' + ( ( s.attributes['advantage'] ) ? 'v' : 'w' ) + '"></span><p>' + opt.attributes['name'] + '</p></span></span><span class="feed--relative-time"><p>' + s.attributes['minutes'] + ':' + s.attributes['seconds'] + '</p>' + ( ( parseInt(s.attributes['period']) == 1 ) ? '<i></i>' : ( ( parseInt(s.attributes['period']) == 2 ) ? '<i></i><i></i>' : '<i></i><i></i><i></i>' ) ) + '</span></div><!--<footer class="cf"><button>&#xe05a; <span>Delete</span></button><button>&#xe12b; <span>More</span></button></footer>--></a></article>';
			   	
			   	break;
			   	// feed
			   	case display.feed:
			   	
			   		// feed
				   	feedContainer = '<article class="feed"><a href="#/game/' + g.id + '" class="cf"><header class="cf"><span class="feed--validity ' + ( ( s.attributes['isOfficial'] == true ) ? '' : 'feed-not-official' ) + '">&#xe26a;</span><span class="feed--collaborator">posted ' + lastUpdated + ' by @' + c.attributes['username'] + '</span></header><div class="cf"><span class="feed--user-avatar"><img src="' + participantPhoto + '" /></span><span class="feed--user-identification"><h5>' + participant + ' ' + event + '</h5></span><span class="feed--relative-time"><p>' + s.attributes['minutes'] + ':' + s.attributes['seconds'] + '</p>' + ( ( parseInt(s.attributes['period']) == 1 ) ? '<i></i>' : ( ( parseInt(s.attributes['period']) == 2 ) ? '<i></i><i></i>' : '<i></i><i></i><i></i>' ) ) + '</span></div><!--<footer class="cf"><button>&#xe05a; <span>Delete</span></button><button>&#xe12b; <span>More</span></button></footer>--></a></article>';
			   	
			   	break;
		   	}
		   	
		   	if ( num == 0 ) {
			   	return feedContainer;
		   	} else {	   	
		   		// display
		   		$('#' + tid + ' .loader').before(feedContainer);
		   	}
		   	
		}	 
			
	}

	
	
	// display game ( game , creator , welcomingTeam , visitingTeam , league )
	function displayGame( g , c , wt , vt , l ) {
	
		// dirty data?
		if (
			!(
		   	  	( c == undefined || c == null ) ||
		   	  	( wt == undefined || wt == null ) ||
		   	  	( vt == undefined || vt == null )
		   	 )
		) {
	
			var gameFeed ='<article class="feed"><a href="#/game/' + g.id + '" class="cf"><header class="cf"><span class="feed--validity game">' + ( ( g.attributes['isOfficial'] ) ? '&#xe26a;' : '' ) + '</span><span class="feed--collaborator">' + ( ( l == undefined || l == null ) ? '' : l.attributes['name'] ) + '</span></header><div class="cf"><div class="welcoming-side cf"><span class="feed--user-avatar"><img src="' + ( ( wt.attributes['profilePicture'] == undefined || wt.attributes['profilePicture'] == null ) ? 'images/default.png' : wt.attributes['profilePicture'].url() ) + '" /></span><span class="feed--user-identification"><h5>' + wt.attributes['name'] + '</h5></span></div><div class="score cf"><h3>' + g.attributes['score'].attributes['WG'] + '</h3>' + ( ( g.attributes['active'] ) ? '<p class="live">&#xf111;</p>' : ( ( g.attributes['gameFinal'] ) ? '<p>F</p>' : '<p>V</p>' ) ) + '<h3>' + g.attributes['score'].attributes['VG'] + '</h3></div><div class="visiting-side cf"><span class="feed--user-avatar"><img src="' + ( ( vt.attributes['profilePicture'] == undefined || vt.attributes['profilePicture'] == null ) ? 'images/default.png' : vt.attributes['profilePicture'].url() ) + '" /></span><span class="feed--user-identification"><h5>' + vt.attributes['name'] + '</h5></span></div></div></a></article>';
						
			return gameFeed;
			
		}
						
	}

	message: function(m, s, o) {
			// check if form is ready to submit
			this.isFormReady(s);
			// message
			$('[data-message]')
				.text(m)
				.removeClass('actions__message--error actions__message--success')
				.addClass(( s === null ) ? '' : ( s == true ) ? 'actions__message--success' : 'actions__message--error' );
			// flag
			$('[data-field="' + o + '"]').siblings('i')
				.removeClass('actions__flag--error actions__flag--success')
				.addClass(( s === null ) ? '' : ( s == true ) ? 'actions__flag--success' : 'actions__flag--error');
		},

		checkNameOnKeyup: function(e) {
			var message;
			// if key pressed
			if ( e.keyCode != undefined ) {
				if ( e.currentTarget.value.length == 0 ) {
					this.signup.name = false;
					message = this.m.signup.name.error;
				} else {
					this.signup.name = true;
					message = this.m.signup.name.success;
				}
			}
			// message
			this.message(message, this.signup.name, $(e.currentTarget).attr('data-field'));
		},

		checkNameOnFocus: function(e) {
			var message;
			// if not yet initiated
			if ( this.signup.name === null ) {
				message = this.m.signup.name.directive;
			// started to fill in
			} else if ( e.currentTarget.value.length == 0 ) {
				this.signup.name = false;
				message = this.m.signup.name.error;
			} else if ( e.currentTarget.value.length > 0 ) {
				this.signup.name = true;
				message = this.m.signup.name.success;
			}
			// message
			this.message(message, this.signup.name, $(e.currentTarget).attr('data-field'));
		},

		checkUsernameOnFocus: function(e) {
			var message;
			var self = this;
			// if not yet initiated
			if ( this.signup.username === null ) {
				message = this.m.signup.username.directive;
				// message
				this.message(message, this.signup.username, $(e.currentTarget).attr('data-field'));
			// started to fill in
			} else if ( e.currentTarget.value.length == 0 ) {
				// clear previous check
				clearTimeout(usernameCheck);
				this.signup.username = false;
				message = this.m.signup.username.error.empty;
				// message
				this.message(message, this.signup.username, $(e.currentTarget).attr('data-field'));
			} else {
				// check for spaces
				if ( e.currentTarget.value.indexOf(' ') >= 0 ) {
					// clear previous check
					clearTimeout(usernameCheck);
					this.signup.username = false;
					message = this.m.signup.username.error.invalid;
					// message
					this.message(message, this.signup.username, $(e.currentTarget).attr('data-field'));
				} else {
					this.message(this.m.signup.username.pending, null, $(e.currentTarget).attr('data-field'));
					// check for username availability
					usernameCheck = setTimeout(function() {
						// checking for username
						var checkIfExistsUsername = new Parse.Query(Parse.User);
						checkIfExistsUsername.equalTo('username', e.currentTarget.value);
						checkIfExistsUsername.count({
							// success
							success: function(existence) {
								// unique username
								if ( existence == 0 ) {
									self.signup.username = true;
									message = self.m.signup.username.success;
									self.message(message, self.signup.username, $(e.currentTarget).attr('data-field'));
								// username already exists	
								} else {
									self.signup.username = false;
									message = self.m.signup.username.error.taken;
									self.message(message, self.signup.username, $(e.currentTarget).attr('data-field'));
								}
							},
							// error
							error: function(error) {
								self.signup.username = false;
								message = self.m.signup.username.error.retry;
								self.message(message, self.signup.username, $(e.currentTarget).attr('data-field'));
							}
						});
					}, 250); // delay 1/4 of a second
				}
			}
		},

		checkUsernameOnKeyUp: function(e) {
			var message;
			var self = this;
			// clear previous check
			clearTimeout(usernameCheck);
			// if key pressed
			if ( e.keyCode != undefined ) {
				if ( e.currentTarget.value.length == 0 ) {
					// clear previous check
					clearTimeout(usernameCheck);
					this.signup.username = false;
					message = this.m.signup.username.error.empty;
					// message
					this.message(message, this.signup.username, $(e.currentTarget).attr('data-field'));
				} else {
					// check for spaces
					if ( e.currentTarget.value.indexOf(' ') >= 0 ) {
						// clear previous check
						clearTimeout(usernameCheck);
						this.signup.username = false;
						message = this.m.signup.username.error.invalid;
						// message
						this.message(message, this.signup.username, $(e.currentTarget).attr('data-field'));
					} else {
						this.message(this.m.signup.username.pending, null, $(e.currentTarget).attr('data-field'));
						// check for username availability
						usernameCheck = setTimeout(function() {
							// checking for username
							var checkIfExistsUsername = new Parse.Query(Parse.User);
							checkIfExistsUsername.equalTo('username', e.currentTarget.value);
							checkIfExistsUsername.count({
								// success
								success: function(existence) {
									// unique username
									if ( existence == 0 ) {
										self.signup.username = true;
										message = self.m.signup.username.success;
										self.message(message, self.signup.username, $(e.currentTarget).attr('data-field'));
									// username already exists	
									} else {
										self.signup.username = false;
										message = self.m.signup.username.error.taken;
										self.message(message, self.signup.username, $(e.currentTarget).attr('data-field'));
									}
								},
								// error
								error: function(error) {
									self.signup.username = false;
									message = self.m.signup.username.error.retry;
									self.message(message, self.signup.username, $(e.currentTarget).attr('data-field'));
								}
							});
						}, 250); // delay 1/4 of a second
					}
				}
			}
		},

		checkEmailOnKeyUp: function(e) {
			var message;
			// if no key pressed
			if ( e.keyCode != undefined ) {
				if ( e.currentTarget.value.length == 0 ) {
					this.signup.email = false;
					message = this.m.signup.email.error;
				} else {
					this.signup.email = true;
					message = this.m.signup.email.success;
				}
			}
			// message
			this.message(message, this.signup.email, $(e.currentTarget).attr('data-field'));
		},

		checkEmailOnFocus: function(e) {
			var message;
			// if not yet initiated
			if ( this.signup.email === null ) {
				message = this.m.signup.email.directive;
			// started to fill in
			} else if ( e.currentTarget.value.length == 0 ) {
				this.signup.email = false;
				message = this.m.signup.email.error;
			} else if ( e.currentTarget.value.length > 0 ) {
				this.signup.email = true;
				message = this.m.signup.email.success;
			}
			// message
			this.message(message, this.signup.email, $(e.currentTarget).attr('data-field'));
		},

		checkPasswordOnKeyUp: function(e) {
			var message;
			// if no key pressed
			if ( e.keyCode != undefined ) {
				if ( e.currentTarget.value.length < 8 ) {
					this.signup.password = false;
					message = this.m.signup.password.error;
				} else {
					this.signup.password = true;
					message = this.m.signup.password.success;
				}
			}
			// message
			this.message(message, this.signup.password, $(e.currentTarget).attr('data-field'));
		},

		checkPasswordOnFocus: function(e) {
			var message;
			// if not yet initiated
			if ( this.signup.password === null ) {
				message = this.m.signup.password.directive;
			// started to fill in
			} else if ( e.currentTarget.value.length < 8 ) {
				this.signup.password = false;
				message = this.m.signup.password.error;
			} else if ( e.currentTarget.value.length >= 8 ) {
				this.signup.password = true;
				message = this.m.signup.password.success;
			}
			// message
			this.message(message, this.signup.password, $(e.currentTarget).attr('data-field'));
		},

		checkForUsername: function(e) {
			if ( e.currentTarget.value.length == 0 ) this.signin.username = false;
			else this.signin.username = true;
			// message
			this.message(this.m.signin.username.directive, null);
		},

		checkForPassword: function(e) {
			if ( e.currentTarget.value.length < 8 ) this.signin.password = false;
			else this.signin.password = true;
			// message
			this.message(this.m.signin.password.directive, null);
		},

		// messages
			this.m = {
				signup: {
					name: {
						directive: 	'Please enter your full name.',
						error: 		'Your full name is required.',
						success: 	'Name looks good.'
					},
					username: {
						directive: 	'Choose a username.',
						pending: 	'Validating username ...',
						error: {
							taken: 		'This username is already taken.',
							empty: 		'You must create a username.',
							invalid: 	'Your username can only contain alphanumerics',
							retry: 		'There was an error, please retry.'
						},
						success: 	'Username looks good.'
					},
					email: {
						directive: 	'Please enter your email address.',
						error: 		'Please enter a valid email address.',
						success: 	'Email looks good.', 
					},
					password: {
						directive: 	'Please enter a secure password.',
						error: 		'Your password must be at least 8 characters.',
						success: 	'Password looks good.'
					}
				},
				signin: {
					username: {
						directive: 	'Please enter your username.'
					},
					password: {
						directive: 	'Please enter your password.'
					}
				}
			}

			// function to loop through feeds and organize them
	function organizeFeeds(feeds, feedsArray) {
		// map
		var events = {
			shot: {
				playerSpecified: {
					type: true,
					action: 'Took a shot ',
					variation: undefined,
					subjectPredicateConnector: ' on ',
					player: undefined,
					playerTeamConnector: ' of the ',
					team: undefined
				},
				playerNotSpecified: {
					type: false,
					action: 'Took a shot ',
					variation: undefined,
					subjectPredicateConnector: ' against the ',
					team: undefined
				}
			},
			hit: {
				playerSpecified: {
					type: true,
					action: 'Hit ',
					player: undefined,
					playerTeamConnector: ' of the ',
					team: undefined
				},
				playerNotSpecified: {
					type: false,
					action: 'Hit a player ',
					subjectPredicateConnector: ' on the ',
					team: undefined
				}
			},
			goal: {
				playerSpecified: {
					type: true,
					action: 'Scored a goal ',
					variation: undefined,
					subjectPredicateConnector: ' on ',
					player: undefined,
					playerTeamConnector: ' of the ',
					team: undefined,
					detail: undefined
				},
				playerNotSpecified: {
					type: false,
					action: 'Scored a goal ',
					variation: undefined,
					subjectPredicateConnector: ' against the ',
					team: undefined,
					detail: undefined
				}
			},
			takeaway: {
				playerSpecified: {
					type: true,
					action: 'Took the puck away ',
					subjectPredicateConnector: 'from ',
					player: undefined,
					playerTeamConnector: ' of the ',
					team: undefined
				},
				playerNotSpecified: {
					type: false,
					action: 'Took the puck away ',
					subjectPredicateConnector: 'from a player on the ',
					team: undefined
				}
			},
			penalty: {
				action: 'Received a penalty ',
				variation: undefined,
				subjectPredicateConnector: ' against the ',
				team: undefined
			},
			faceoff: {
				playerSpecified: {
					type: true,
					action: 'Won a faceoff ',
					subjectPredicateConnector: 'against ',
					player: undefined,
					playerTeamConnector: ' of the ',
					team: undefined
				},
				playerNotSpecified: {
					type: false,
					action: 'Won a faceoff ',
					subjectPredicateConnector: 'against a player on the ',
					team: undefined
				}
			}
		}
		// usable feeds
		var usableFeeds = [];
		// looping
		for ( var i = 0; i < feeds.length; i++ ) {
			var f = feeds[i];
			// dirty data?
			if (verifyFeedValidity(f)) {
				var stat = {
					collaborator: f.attributes['collaborator'].attributes['username'],
					time: getTimeDifference(f.createdAt),
					user: {
						picture: (function() {
							if ( f.attributes['participant'] == undefined || f.attributes['participant'].attributes['ghostData'] ) {
								return ( ( f.attributes['participantTeam'].attributes['profilePicture'] == undefined ) ? 'images/default.png' : f.attributes['participantTeam'].attributes['profilePicture'].url() );
							} else {
								return ( ( f.attributes['participant'].attributes['user'].attributes['profilePicture'] == undefined ) ? 'images/default.png' : f.attributes['participant'].attributes['user'].attributes['profilePicture'].url() );
							}
						})(),
						primary: (function() {
							if ( f.attributes['participant'] == undefined ) {
								return f.attributes['participantTeam'].attributes['name'];
							} else {
								if (f.attributes['participant'].attributes['ghostData']) {
									return f.attributes['participant'].attributes['ghostObject'].name;
								} else {
									return f.attributes['participant'].attributes['user'].attributes['name'];
								}
							}
						})(),
						secondary: (function() {
							if ( f.attributes['participant'] == undefined ) {
								return undefined;
							} else {
								if (f.attributes['participant'].attributes['ghostData']) {
									return f.attributes['participant'].attributes['number'] + ' ' + f.attributes['participantTeam'].attributes['name'];
								} else {
									return f.attributes['participant'].attributes['user'].attributes['username'];
								}
							}
						})(),
						link: (function() {
							if ( f.attributes['participant'] == undefined || f.attributes['participant'].attributes['ghostData'] ) {
								return '#/team/' + f.attributes['participantTeam'].id;
							} else {
								return '#/' + f.attributes['participant'].attributes['user'].attributes['username'];
							}
						})()
					},
					event: {
						e: f.attributes['event'].charAt(0).toUpperCase(),
						minutes: f.attributes['minutes'],
						seconds: f.attributes['seconds'],
						period: f.attributes['period']
					},
					official: f.attributes['isOfficial'],
					description: (function() {
						switch (f.attributes['event']) {
							case 'Shot': if ( f.attributes['oParticipant'] == undefined ) return events.shot.playerNotSpecified; else return events.shot.playerSpecified; break;
							case 'Hit': if ( f.attributes['oParticipant'] == undefined ) return events.hit.playerNotSpecified; else return events.hit.playerSpecified; break;
							case 'Goal': if ( f.attributes['oParticipant'] == undefined ) return events.goal.playerNotSpecified; else return events.goal.playerSpecified; break;
							case 'Takeaway': if ( f.attributes['oParticipant'] == undefined ) return events.takeaway.playerNotSpecified; else return events.takeaway.playerSpecified; break;
							case 'Penalty': return events.penalty; break;
							case 'Faceoff': if ( f.attributes['oParticipant'] == undefined ) return events.faceoff.playerNotSpecified; else return events.faceoff.playerSpecified; break;
						}
					})(),
				}
				// update event description
				switch (stat.event.e) {
					// S
					case 'S':
						stat.description.variation = f.attributes['other'].type;
						stat.description.team = {
							name: f.attributes['oParticipantTeam'].attributes['name'],
							link: f.attributes['oParticipantTeam'].id
						}
						if ( f.attributes['oParticipant'] != undefined ) {
							stat.description.player = {
								name: ( (f.attributes['oParticipant'].attributes['ghostData']) ? f.attributes['oParticipant'].attributes['ghostObject'].name : f.attributes['oParticipant'].attributes['user'].attributes['name'] ),
								link: ( (f.attributes['oParticipant'].attributes['ghostData']) ? undefined : f.attributes['oParticipant'].attributes['user'].attributes['username'] )
							}
						}
					break;
					// H
					case 'H':
						stat.description.team = {
							name: f.attributes['oParticipantTeam'].attributes['name'],
							link: f.attributes['oParticipantTeam'].id
						}
						if ( f.attributes['oParticipant'] != undefined ) {
							stat.description.player = {
								name: ( (f.attributes['oParticipant'].attributes['ghostData']) ? f.attributes['oParticipant'].attributes['ghostObject'].name : f.attributes['oParticipant'].attributes['user'].attributes['name'] ),
								link: ( (f.attributes['oParticipant'].attributes['ghostData']) ? undefined : f.attributes['oParticipant'].attributes['user'].attributes['username'] )
							}
						}
					break;
					// G
					case 'G':
						stat.description.variation = f.attributes['other'].type;
						stat.description.team = {
							name: f.attributes['oParticipantTeam'].attributes['name'],
							link: f.attributes['oParticipantTeam'].id
						}
						if ( f.attributes['oParticipant'] != undefined ) {
							stat.description.player = {
								name: ( (f.attributes['oParticipant'].attributes['ghostData']) ? f.attributes['oParticipant'].attributes['ghostObject'].name : f.attributes['oParticipant'].attributes['user'].attributes['name'] ),
								link: ( (f.attributes['oParticipant'].attributes['ghostData']) ? undefined : f.attributes['oParticipant'].attributes['user'].attributes['username'] )
							}
						}
						if ( f.attributes['firstParticipant'] != undefined ) {
							stat.description.detail = {
								f: (function() {
									if ( f.attributes['firstParticipant'] != undefined ) {
										return {
											name: ( (f.attributes['firstParticipant'].attributes['ghostData']) ? f.attributes['firstParticipant'].attributes['ghostObject'].name : f.attributes['firstParticipant'].attributes['user'].attributes['name'] ),
											link: ( (f.attributes['firstParticipant'].attributes['ghostData']) ? undefined : f.attributes['firstParticipant'].attributes['user'].attributes['username'] )
										}
									} else {
										return undefined;
									}
								})(),
								s: (function() {
									if ( f.attributes['firstParticipant'] != undefined && f.attributes['secondParticipant'] != undefined ) {
										return {
											name: ( (f.attributes['secondParticipant'].attributes['ghostData']) ? f.attributes['secondParticipant'].attributes['ghostObject'].name : f.attributes['secondParticipant'].attributes['user'].attributes['name'] ),
											link: ( (f.attributes['secondParticipant'].attributes['ghostData']) ? undefined : f.attributes['secondParticipant'].attributes['user'].attributes['username'] )
										}
									} else {
										return undefined;
									}
								})()
							}
						}
					break;
					// T
					case 'T':
						stat.description.team = {
							name: f.attributes['oParticipantTeam'].attributes['name'],
							link: f.attributes['oParticipantTeam'].id
						}
						if ( f.attributes['oParticipant'] != undefined ) {
							stat.description.player = {
								name: ( (f.attributes['oParticipant'].attributes['ghostData']) ? f.attributes['oParticipant'].attributes['ghostObject'].name : f.attributes['oParticipant'].attributes['user'].attributes['name'] ),
								link: ( (f.attributes['oParticipant'].attributes['ghostData']) ? undefined : f.attributes['oParticipant'].attributes['user'].attributes['username'] )
							}
						}
					break;
					// P
					case 'P':
						stat.description.variation = f.attributes['other'].type;
						stat.description.team = {
							name: f.attributes['oParticipantTeam'].attributes['name'],
							link: f.attributes['oParticipantTeam'].id
						}
					break;
					// F
					case 'F':
						stat.description.team = {
							name: f.attributes['oParticipantTeam'].attributes['name'],
							link: f.attributes['oParticipantTeam'].id
						}
						if ( f.attributes['oParticipant'] != undefined ) {
							stat.description.player = {
								name: ( (f.attributes['oParticipant'].attributes['ghostData']) ? f.attributes['oParticipant'].attributes['ghostObject'].name : f.attributes['oParticipant'].attributes['user'].attributes['name'] ),
								link: ( (f.attributes['oParticipant'].attributes['ghostData']) ? undefined : f.attributes['oParticipant'].attributes['user'].attributes['username'] )
							}
						}
					break;
				}
				// push
				usableFeeds.push(stat);
			}
		}
		return usableFeeds;
	}

	
		// paginate
		paginating: function(e) {
			var self = this;
		
			// loading
			$(e.currentTarget).text('Loading ...');
		
			// increment skip by interval
			this.paginate.skip += self.paginate.interval;
					
			// get statistics of followers
			var getFeedsOfFollowers = new Parse.Query(Parse.Object.extend('Statistics'));
			getFeedsOfFollowers.containedIn('collaborator', this.following.users);
			// get statistics of following games	
			var getFeedsOfFollowingGames = new Parse.Query(Parse.Object.extend('Statistics'));
			getFeedsOfFollowingGames.containedIn('game', this.following.games);
			getFeedsOfFollowingGames.notEqualTo('collaborator', Parse.User.current());
			// get statistics			
			var getFeeds = Parse.Query.or(getFeedsOfFollowers, getFeedsOfFollowingGames);
			getFeeds.descending('createdAt');
			getFeeds.include('collaborator');
			getFeeds.include('game');
			getFeeds.include('participant');
			getFeeds.include('participant.user');
			getFeeds.include('participantTeam');
			getFeeds.include('firstParticipant');
			getFeeds.include('firstParticipant.user');
			getFeeds.include('secondParticipant');
			getFeeds.include('secondParticipant.user');
			getFeeds.include('oParticipant');
			getFeeds.include('oParticipant.user');
			getFeeds.include('oParticipantTeam');
			getFeeds.skip(this.paginate.skip);
			getFeeds.limit(this.paginate.interval);
			getFeeds.find({
				// success
				success: function(feeds) {
					// if there are more than 0 feeds
					if ( feeds.length > 0 ) {
						// loop through feeds
						for ( var s = 0; s < feeds.length; s++ ) {
							// current feed
							var feed = feeds[s];
							// push this feed to currentHomeFeeds
							currentHomeFeeds.push(feed);
							// get feed values
							var stat 				= feed;
							var collaborator		= feed.get('collaborator');
							var game				= feed.get('game');
							var participant			= feed.get('participant');
							var participantTeam		= feed.get('participantTeam');
							var oParticipantTeam	= feed.get('oParticipantTeam');
							// display feeds
							displayFeed( stat , collaborator , game , participant , participantTeam , oParticipantTeam , 'home--feed' , 1 );
						}
						// if less than feed interval
						if ( feeds.length < self.paginate.interval ) {
							$('#home--feed .number-of-results').removeClass('hidden');
							$(e.currentTarget)
								.text('Load More Feeds')
								.addClass('hidden');
						// if greater than feed interval	
						} else {
							$(e.currentTarget)
								.text('Load More Feeds')
								.removeClass('hidden');
						}
					// if there are no feeds		
					} else {
						$('#home--feed .number-of-results').removeClass('hidden');
						$(e.currentTarget)
							.text('Load More Feeds')
							.addClass('hidden');
						return false;
					}
				},
				// error
				error: function(err) {}
			});
	
		},
		
		// changing views
		changeView: function(e) {
			var self = this;
			// show active status
			$(e.currentTarget)
				.addClass('home__button--is-active')
				.siblings('button')
					.removeClass('home__button--is-active');
			// show view
			$('[data-tab]').each(function() {
				if ( $(e.currentTarget).attr('data-target-tab') == $(this).attr('data-tab') ) $(this).addClass('home__tab--is-active');
				else $(this).removeClass('home__tab--is-active');
			});
			
			// if my teams
			if ( $(e.currentTarget).attr('data-target-tab') == 'home-teams' ) {
				// if already searched for
				if (!this.current.teams.length) {
					// get my teams
					var getMyTeams = new Parse.Query(Parse.Object.extend('Team'));
					getMyTeams.equalTo('createdBy', Parse.User.current());
					getMyTeams.include('createdBy');
					getMyTeams.descending('createdAt');
					getMyTeams.find({
						// success
						success: function(teams) {
							// if there are more than 0 teams
							if ( teams.length > 0 ) {
								// loop through teams
								for ( var t = 0; t < teams.length; t++ ) {
									// current team
									var ct = teams[t];
									// push
									self.current.teams.push(ct);
									// display
									$('#home--teams .loader').before(displayTeam(ct));
								}
								// loaded
								$('#home--teams .number-of-results').removeClass('hidden');
								$('#home--teams .loader').addClass('hidden');
							// no teams
							} else {
								$('#home--teams .directive-message').removeClass('hidden');
								$('#home--teams .loader').addClass('hidden');
								return false;
							}
						},
						// error
						error: function(err) {}
					});
				}
			// if my leagues	
			} else if ( $(e.currentTarget).attr('data-target-tab') == 'home-leagues' ) {
				// if already searched for
				if (!this.current.leagues.length) {
			////////// get my leagues
					var getMyLeagues = new Parse.Query(Parse.Object.extend('League'));
					getMyLeagues.equalTo('createdBy', Parse.User.current());
					getMyLeagues.include('createdBy');
					getMyLeagues.descending('createdAt');
					getMyLeagues.find({
						// success
						success: function(leagues) {
							// if there are more than 0 teams
							if ( leagues.length > 0 ) {
								// loop through teams
								for ( var l = 0; l < leagues.length; l++ ) {
									// current team
									var cl = leagues[l];
									// push
									self.current.leagues.push(cl);
									// display
									$('#home--leagues .loader').before(displayLeague(cl))
								}
								// loaded
								$('#home--leagues .number-of-results').removeClass('hidden');
								$('#home--leagues .loader').addClass('hidden');
							// no leagues
							} else {
								$('#home--leagues .directive-message').removeClass('hidden');
								$('#home--leagues .loader').addClass('hidden');
								return false;
							}
						},
						// error
						error: function(err) {}
					});
				}
			}
			
		}