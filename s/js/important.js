
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



	// get followers
					var getUserFollowers = new Parse.Query(Parse.Object.extend('Followers'));
					getUserFollowers.equalTo('type', 'person');
					getUserFollowers.equalTo('followingId', self.user.o);
					getUserFollowers.include('followerId');
					getUserFollowers.descending('updatedAt');
					getUserFollowers.limit(self.paginate.fers.interval);
					getUserFollowers.find({
						// success
						success: function(followers) {
							// if there are more than 0 followers
							if ( followers.length > 0 ) {
								// loop through followers
								for ( var s = 0; s < followers.length; s++ ) {
									// current follow
									var cf = followers[s];
									// push this feed to currentHomeFeeds
									currentUserFollowers.push(cf);
									// display followers
									$('#person--followers .loader').before(displayFollowers(cf));
								}
								// if less than followers interval
								if ( followers.length < self.paginate.fers.interval ) {
									$('#person--followers .number-of-results').removeClass('hidden');
									$('#person--followers .loader').addClass('hidden');
								// if greater than followers interval	
								} else {
									$('#person--followers .paginate').removeClass('hidden');
									$('#person--followers .loader').addClass('hidden');
								}
							// if there are no feeds		
							} else {
								$('#person--followers .directive-message').removeClass('hidden');
								$('#person--followers .loader').addClass('hidden');
								return false;
							}
						},
						// error
						error: function(err) {}
					});


////////// get following
					var getUserFollowing = new Parse.Query(Parse.Object.extend('Followers'));
					getUserFollowing.equalTo('type', 'person');
					getUserFollowing.equalTo('followerId', self.user.o);
					getUserFollowing.include('followingId');
					getUserFollowing.descending('updatedAt');
					getUserFollowing.limit(self.paginate.fing.interval);
					getUserFollowing.find({
						// success
						success: function(following) {
							// if there are more than 0 followers
							if ( following.length > 0 ) {
								// loop through followers
								for ( var s = 0; s < following.length; s++ ) {
									// current follow
									var cf = following[s];
									// push this feed to currentHomeFeeds
									currentUserFollowing.push(cf);
									// display followers
									$('#person--following .loader').before(displayFollowing(cf));
								}
								// if less than followers interval
								if ( following.length < self.paginate.fing.interval ) {
									$('#person--following .number-of-results').removeClass('hidden');
									$('#person--following .loader').addClass('hidden');
								// if greater than followers interval	
								} else {
									$('#person--following .paginate').removeClass('hidden');
									$('#person--following .loader').addClass('hidden');
								}
							// if there are no feeds		
							} else {
								$('#person--following .directive-message').removeClass('hidden');
								$('#person--following .loader').addClass('hidden');
								return false;
							}
						},
						// error
						error: function(err) {}
					});


// Create View
	var CreateView = Parse.View.extend({
		
		el: $('.constraint-container'),
		
		initialize: function() {
		
			// unbind previous events
			$('.constraint-container').unbind();
			
			// clean up previous state
			cleanUpMemory(state);
			
			// update state
			state = 20;
			
			// binding this to functions that reference this
			_.bindAll(this, 'render');
			
			// render page
			this.render();

			bearing('CREATE');
			
		},
		
		render: function() {
		
			// grabbing template and inserting into el
			var template = _.template( $('#create-view').html() );
			this.$el.html( template );
			
		}
		
	});

	// load form
		loadForm: function() {
			switch (this.objectType) {
				case 'team':
					// instantiating the team
					this.team = {
						name: 		undefined,
						ageGroup: 	undefined,
						level: 		undefined,
						season: 	undefined
					}
					// remove loader
					$('.loader').addClass('loader--is-hidden');
					// header
					$('[data-header]').text('Create A Team');
					// description
					$('[data-description]').text('In order to create a team, you must fill out all of the following fields, unless they have been disabled.');
					// correct fields
					$('[data-object-type]').each(function() {
						if (!parseInt($(this).attr('data-object-type'))) $(this).removeClass('create__field--is-hidden')
					});
				break;
				case 'league':
					// instantiating the league
					this.league = {
						name: 		undefined,
						ageGroup: 	undefined,
						level: 		undefined,
						season: 	undefined
					}
					// remove loader
					$('.loader').addClass('loader--is-hidden');
					// header
					$('[data-header]').text('Create A Season');
					// description
					$('[data-description]').text('In order to create a season, you must fill out all of the following fields, unless they have been disabled.');
					// correct fields
					$('[data-object-type]').each(function() {
						if (!parseInt($(this).attr('data-object-type'))) $(this).removeClass('create__field--is-hidden')
					});
				break;
				case 'game':
					this.isGamePartOfLeague = undefined;
					// instantiating the game
					this.game = {
						season 	: undefined,
						home	: {
							team 	: undefined
						},
						away	: {
							team 	: undefined
						},
						collaborators: [ Parse.User.current() ],
						time 	: {
							month: 		undefined,
							day: 		undefined,
							year: 		undefined,
							hour: 		7,
							minute: 	30,
							timeOfDay: 	1
						},
						arena	: undefined
					}
					// header
					$('[data-header]').text('Create A Game');
					// description
					$('[data-description]').text('In order to create a game, you must specify two teams, a date and a time.');
					// correct fields
					// $('[data-object-type]').each(function() {
					// 	if (parseInt($(this).attr('data-object-type'))) $(this).removeClass('create__field--is-hidden')
					// });
					// search for usable leagues/teams
					this.getLeagues();
				break;
			}
		},



		ageGroup: function(e) {
			var self = this;
			var ageGroup = $(e.currentTarget).val();
			// if not null
			if ( ageGroup != null ) {
				// set value
				this.build(this.objectType, 'age-group', ageGroup);
				// update next field
				if ( $.inArray(ageGroup, this.defaults.ageGroup.littleLeague) != -1 ) {
					$('[name="level"]').removeAttr('disabled').val('House League')
						.children('[data-option]').each(function() {
							if ( $.inArray($(this).val(), self.defaults.level.beginner) != -1 ) $(this).removeAttr('disabled');
							else $(this).attr('disabled', true);
						});
						this.build(this.objectType, 'level', 'House League');
				} else if ( $.inArray(ageGroup, this.defaults.ageGroup.minorLeague) != -1 ) {
					$('[name="level"]').removeAttr('disabled')
						.children('[data-option]').removeAttr('disabled');
				} else if ( $.inArray(ageGroup, this.defaults.ageGroup.majorLeague) != -1 ) {
					$('[name="level"]').attr('disabled', true);
				}
			}
		},

		level: function(e) {
			var level = $(e.currentTarget).val();
			// if not null
			if ( level != null ) this.build(this.objectType, 'level', level);
		},

		season: function(e) {
			var season = $(e.currentTarget).val();
			// if not null
			if ( season != null ) this.build(this.objectType, 'season', season);
		},

		case 'team':
					// if everything ready
					if (this.checkStatus(this.objectType)) {
						// temporarily disable submit button
						$(e.currentTarget).find('[data-field="submit"]')
							.val('Creating ...')
							.attr( 'disabled' , true );
					// create new team
					var teamClass = Parse.Object.extend('Team');
					var team = new teamClass();
					var ACL = new Parse.ACL();
					ACL.setPublicReadAccess(true);
					ACL.setPublicWriteAccess(false);
					ACL.setWriteAccess(Parse.User.current(), true);
					// set permissions and preliminary profile information
					team.set('createdBy', Parse.User.current());
					team.set('name', this.team.name);
					team.set('ageGroup', this.team.ageGroup);
					team.set('level', this.team.level);
					team.set('competitiveCategory', this.team.ageGroup + ( ( this.team.level == undefined ) ? '' : ' ' + this.team.level ) );
					team.set('year', this.team.season);
					team.set('searchName', this.team.name.toLowerCase());
					team.set('searchCompetitiveCategory', this.team.ageGroup.toLowerCase() + ( ( this.team.level == undefined ) ? '' : ' ' + this.team.level.toLowerCase() ) );
					team.set('active', true);
					team.setACL(ACL);
					team.save({
						success: function(team) { window.location.href = '#/team/' + team.id; },
						error: function(error) {
							$(e.currentTarget).find('[data-field="submit"]')
								.val('Unsuccessful')
								.removeAttr('disabled');
							setTimeout(function() { $(e.currentTarget).find('[data-field="submit"]').val('Create') }, 1000);
						}
					});
					}
				break;
				case 'league':
					// temporarily disable submit button
					$(e.currentTarget).find('[data-field="submit"]')
							.val('Creating ...')
							.attr( 'disabled' , true );
					// create new league
					var LeagueClass = Parse.Object.extend('League');
					var league = new LeagueClass();
					var ACL = new Parse.ACL();
					ACL.setPublicReadAccess(true);
					ACL.setPublicWriteAccess(false);
					ACL.setWriteAccess(Parse.User.current(), true);
					// set permissions and preliminary profile information
					league.set('createdBy', Parse.User.current());
					league.set('name', this.league.name);
					league.set('ageGroup', this.league.ageGroup);
					league.set('level', this.league.level);
					league.set('competitiveCategory', this.league.ageGroup + ( ( this.league.level == undefined ) ? '' : ' ' + this.league.level ) );
					league.set('year', this.league.season);
					league.set('searchName', this.league.name.toLowerCase());
					league.set('searchCompetitiveCategory', this.league.ageGroup.toLowerCase() + ( ( this.league.level == undefined ) ? '' : ' ' + this.league.level.toLowerCase() ) );
					league.set('active', true);
					league.setACL(ACL);
					league.save({
						success: function(league) { window.location.href = '#/league/' + league.id; },
						error: function(error) {
							$(e.currentTarget).find('[data-field="submit"]')
								.val('Unsuccessful')
								.removeAttr('disabled');
							setTimeout(function() { $(e.currentTarget).find('[data-field="submit"]').val('Create') }, 1000);
						}
					});
				break;


				processData: function(data, phase) {
			switch (phase) {
				case 0:
					// enable back button
					this.backButtonCollaboration(true);
					// update event
					collaboratorObject.event = data;
					// show team
					this.displayNextField([ this.game.home.team.attributes['name'] , this.game.away.team.attributes['name'] ], [ this.game.home.team.id , this.game.away.team.id ], false, false, 'match__collaborate__option--half');
					// increment phase
					this.phase++;
				break;
				case 1:
					// update team, advantage
					collaboratorObject.participant.team = data;
					collaboratorObject.oParticipant.team = ( ( data === this.game.home.team.id ) ? this.game.away.team.id : this.game.home.team.id );
					collaboratorObject.advantage = ( ( data === this.game.home.team.id ) ? true : false );
					// organize data to display
					var roster = ((collaboratorObject.advantage) ? this.game.home.fullRoster : this.game.away.fullRoster );
					var activeRoster = ((collaboratorObject.advantage) ? this.game.home.activeRoster : this.game.away.activeRoster );
					var options = [];
					var attributes = [];
					// loop
					for ( var i = 0; i < roster.length; i++ ) {
						if ( $.inArray(roster[i].id, activeRoster) != -1 ) {
							options.push(roster[i].attributes['number']);
							attributes.push(roster[i].id);
						}
					}
					// show player
					this.displayNextField(options, attributes, true, false, 'match__collaborate__option--quarter');
					// increment phase
					this.phase++;
				break;
				case 2:
					// update participant
					if ( data == 'TBD' ) collaboratorObject.participant.identification = undefined;
					else collaboratorObject.participant.identification = data;
					// organize data
					var records = (collaboratorObject.advantage) ? this.game.home.rosterRecords : this.game.away.rosterRecords;
					if ( data == 'TBD' ) {
						collaboratorObject.participant.sri = undefined;
					} else {
						// loop through records
						for ( var i = 0; i < records.length; i++ ) {
							if ( data === records[i].attributes['rosterMember'].id )
								collaboratorObject.participant.sri = records[i].id;
						}
					}


					// possible need to check roster member if they are a player


					// event
					switch (collaboratorObject.event) {
						case 'Shot':
							// update oParticipant
							collaboratorObject.oParticipant.identification = ( (collaboratorObject.advantage) ? this.getGoalie(this.game.away.fullRoster, this.game.away.activeRoster) : this.getGoalie(this.game.home.fullRoster, this.game.home.activeRoster) );
							// update record
							var records = (collaboratorObject.advantage) ? this.game.away.rosterRecords : this.game.home.rosterRecords;
							if ( collaboratorObject.oParticipant.identification == undefined ) {
								collaboratorObject.oParticipant.sri = undefined;
							} else {
								// loop through records
								for ( var i = 0; i < records.length; i++ ) {
									if ( collaboratorObject.oParticipant.identification === records[i].attributes['rosterMember'].id )
										collaboratorObject.oParticipant.sri = records[i].id;
								}
							}
							// show shot type
							this.displayNextField(this.cOptions.shotType, this.cOptions.shotType, true, false, 'match__collaborate__option--quarter');
							// increment phase
							this.phase++;
						
						break;
						case 'Goal':
							// update oParticipant
							collaboratorObject.oParticipant.identification = ( (collaboratorObject.advantage) ? this.getGoalie(this.game.away.fullRoster, this.game.away.activeRoster) : this.getGoalie(this.game.home.fullRoster, this.game.home.activeRoster) );
							// update record
							var records = (collaboratorObject.advantage) ? this.game.away.rosterRecords : this.game.home.rosterRecords;
							if ( collaboratorObject.oParticipant.identification == undefined ) {
								collaboratorObject.oParticipant.sri = undefined;
							} else {
								// loop through records
								for ( var i = 0; i < records.length; i++ ) {
									if ( collaboratorObject.oParticipant.identification === records[i].attributes['rosterMember'].id )
										collaboratorObject.oParticipant.sri = records[i].id;
								}
							}
							// show goal type
							this.displayNextField(this.cOptions.goalType, this.cOptions.goalType, true, false, 'match__collaborate__option--quarter');
							// increment phase
							this.phase++;
						break;
						case 'Hit':
							// organize data to display
							var roster = ((collaboratorObject.advantage) ? this.game.away.fullRoster : this.game.home.fullRoster );
							var activeRoster = ((collaboratorObject.advantage) ? this.game.away.activeRoster : this.game.home.activeRoster );
							var options = [];
							var attributes = [];
							// loop
							for ( var i = 0; i < roster.length; i++ ) {
								if ( $.inArray(roster[i].id, activeRoster) != -1 ) {
									options.push(roster[i].attributes['number']);
									attributes.push(roster[i].id);
								}
							}
							// show player
							this.displayNextField(options, attributes, true, false, 'match__collaborate__option--quarter');
							// increment phase
							this.phase++;
						break;
						case 'Takeaway':
							// organize data to display
							var roster = ((collaboratorObject.advantage) ? this.game.away.fullRoster : this.game.home.fullRoster );
							var activeRoster = ((collaboratorObject.advantage) ? this.game.away.activeRoster : this.game.home.activeRoster );
							var options = [];
							var attributes = [];
							// loop
							for ( var i = 0; i < roster.length; i++ ) {
								if ( $.inArray(roster[i].id, activeRoster) != -1 ) {
									options.push(roster[i].attributes['number']);
									attributes.push(roster[i].id);
								}
							}
							// show player
							this.displayNextField(options, attributes, true, false, 'match__collaborate__option--quarter');
							// increment phase
							this.phase++;
						break;
						case 'Penalty':
							// show penalty
							this.displayNextField(this.cOptions.penaltyDur, this.cOptions.penaltyDur, true, false, 'match__collaborate__option--quarter');
							// increment phase
							this.phase++;
						break;
						case 'Faceoff':
							// organize data to display
							var roster = ((collaboratorObject.advantage) ? this.game.away.fullRoster : this.game.home.fullRoster );
							var activeRoster = ((collaboratorObject.advantage) ? this.game.away.activeRoster : this.game.home.activeRoster );
							var options = [];
							var attributes = [];
							// loop
							for ( var i = 0; i < roster.length; i++ ) {
								if ( $.inArray(roster[i].id, activeRoster) != -1 ) {
									options.push(roster[i].attributes['number']);
									attributes.push(roster[i].id);
								}
							}
							// show player
							this.displayNextField(options, attributes, true, false, 'match__collaborate__option--quarter');
							// increment phase
							this.phase++;
						break;
					}
				
				break;
				case 3:
				
					// event
					switch (collaboratorObject.event) {
						case 'Shot':
							// update type
							collaboratorObject.other.type = ( ( data == 'TBD' ) ? null : data );
							// finished
							this.finishCollaboration();
							// verify
							this.phase = -1;
						break;
						case 'Hit':
							// update oParticipant
							collaboratorObject.oParticipant.identification = ( ( data == 'TBD' ) ? undefined : data );
							// update record
							var records = (collaboratorObject.advantage) ? this.game.away.rosterRecords : this.game.home.rosterRecords;
							if ( data == 'TBD' ) {
								collaboratorObject.oParticipant.sri = undefined;
							} else {
								// loop through records
								for ( var i = 0; i < records.length; i++ ) {
									if ( data === records[i].attributes['rosterMember'].id )
										collaboratorObject.oParticipant.sri = records[i].id;
								}
							}
							// finished
							this.finishCollaboration();
							// verify
							this.phase = -1;
						break;
						case 'Goal':
							// update type
							collaboratorObject.other.type = ( data == 'TBD' ) ? null : data;
							// penalty shot
							if ( data == 'Penalty Shot' ) {
								// finished
								this.finishCollaboration();
								// verify
								this.phase = -1;
							} else {
								// organize data to display
								var roster = ((collaboratorObject.advantage) ? this.game.home.fullRoster : this.game.away.fullRoster );
								var activeRoster = ((collaboratorObject.advantage) ? this.game.home.activeRoster : this.game.away.activeRoster );
								var options = [];
								var attributes = [];
								// loop
								for ( var i = 0; i < roster.length; i++ ) {
									if ( $.inArray(roster[i].id, activeRoster) != -1 ) {
										if ( !( roster[i].id === collaboratorObject.participant.identification ) ) {
											options.push(roster[i].attributes['number']);
											attributes.push(roster[i].id);
										}
									}
								}
								// show players
								this.displayNextField(options, attributes, true, true, 'match__collaborate__option--quarter');
								// increment phase
								this.phase++;
							}
						
						break;
						case 'Takeaway':
							// update oParticipant
							collaboratorObject.oParticipant.identification = ( ( data == 'TBD' ) ? undefined : data );
							// update record
							var records = (collaboratorObject.advantage) ? this.game.away.rosterRecords : this.game.home.rosterRecords;
							if ( data == 'TBD' ) {
								collaboratorObject.oParticipant.sri = undefined;
							} else {
								// loop through records
								for ( var i = 0; i < records.length; i++ ) {
									if ( data === records[i].attributes['rosterMember'].id )
										collaboratorObject.oParticipant.sri = records[i].id;
								}
							}
							// finished
							this.finishCollaboration();
							// verify
							this.phase = -1;
						break;
						case 'Penalty':
							// update duration
							collaboratorObject.other.duration = ( ( data == 'TBD' ) ? null : data );
							// display type
							this.displayNextField(this.cOptions.penaltyType, this.cOptions.penaltyType, true, false, 'match__collaborate__option--quarter');
							// increment phase
							this.phase++;
						break;
						case 'Faceoff':
							// update oParticipant
							collaboratorObject.oParticipant.identification = ( ( data == 'TBD' ) ? undefined : data );
							// update record
							var records = (collaboratorObject.advantage) ? this.game.away.rosterRecords : this.game.home.rosterRecords;
							if ( data == 'TBD' ) {
								collaboratorObject.oParticipant.sri = undefined;
							} else {
								// loop through records
								for ( var i = 0; i < records.length; i++ ) {
									if ( data === records[i].attributes['rosterMember'].id )
										collaboratorObject.oParticipant.sri = records[i].id;
								}
							}
							// finished
							this.finishCollaboration();
							// verify
							this.phase = -1;
						break;
					}
				
				break;
				case 4:
				
					// event
					switch (collaboratorObject.event) {
						case 'Goal':
							// update first participant
							collaboratorObject.firstParticipant = ( ( data == 'TBD' || data == 'N' ) ? undefined : data );
							// update record
							var records = (collaboratorObject.advantage) ? this.game.home.rosterRecords : this.game.away.rosterRecords;
							if ( data == 'TBD' || data == 'N' ) {
								collaboratorObject.fpsri = undefined;
							} else {
								// loop through records
								for ( var i = 0; i < records.length; i++ ) {
									if ( data === records[i].attributes['rosterMember'].id )
										collaboratorObject.fpsri = records[i].id;
								}
							}

							// no assists
							if ( data == 'N' ) {
								// finish
								this.finishCollaboration();
								// verify
								this.phase = -1;
							// assist	
							} else {
								// organize data to display
								var roster = ((collaboratorObject.advantage) ? this.game.home.fullRoster : this.game.away.fullRoster );
								var activeRoster = ((collaboratorObject.advantage) ? this.game.home.activeRoster : this.game.away.activeRoster );
								var options = [];
								var attributes = [];
								// loop
								for ( var i = 0; i < roster.length; i++ ) {
									if ( $.inArray(roster[i].id, activeRoster) != -1 ) {
										if ( !( roster[i].id === collaboratorObject.participant.identification ) && !( roster[i].id === collaboratorObject.firstParticipant ) ) {
											options.push(roster[i].attributes['number']);
											attributes.push(roster[i].id);
										}
									}
								}
								// show players
								this.displayNextField(options, attributes, true, true, 'match__collaborate__option--quarter');
								// increment phase
								this.phase++;
							}
						break;
						case 'Penalty':
							// update type
							collaboratorObject.other.type = ( ( data == 'TBD' ) ? null : data );
							// display category
							this.displayNextField(this.cOptions.penaltyCat, this.cOptions.penaltyCat, true, true, 'match__collaborate__option--quarter');
							// increment phase
							this.phase++;
						break;
					}
				
				break;
				case 5:
				
					// event
					switch (collaboratorObject.event) {
						case 'Goal':
							// update second participant
							collaboratorObject.secondParticipant = ( ( data == 'TBD' || data == 'N' ) ? undefined : data );
							// update record
							var records = (collaboratorObject.advantage) ? this.game.home.rosterRecords : this.game.away.rosterRecords;
							if ( data == 'TBD' || data == 'N' ) {
								collaboratorObject.spsri = undefined;
							} else {
								// loop through records
								for ( var i = 0; i < records.length; i++ ) {
									if ( data === records[i].attributes['rosterMember'].id )
										collaboratorObject.spsri = records[i].id;
								}
							}
							// finish
							this.finishCollaboration();
							// verify
							this.phase = -1;
						break;
						case 'Penalty':
							// update category
							collaboratorObject.other.category = ( ( data == 'TBD' || data =='N' ) ? null : data );
							// finish
							this.finishCollaboration();
							// verify
							this.phase = -1;
						break;
					}
				
				break;
				case -1:
				
					// penalty
					if ( collaboratorObject.event == 'Penalty' ) {
						// disable back button
						this.backButtonCollaboration(false);
						// save collaboration
						this.saveCollaboration(collaboratorObject);
						// show options
						this.displayNextField([ 'Penalty' , 'Faceoff' ], [ 'Penalty' , 'Faceoff' ], false, false, 'match__collaborate__option--half');
						// reset phase
						this.phase = 0;
					// if not a penalty	
					} else {
						// save collaboration
						this.saveCollaboration(collaboratorObject);
						// reset
						this.doneCollaboration();
					}
				
				break;
				
			}
		},






		updateLocalScore: function(advantage, event, type) {
			// home
			if (advantage) {
				// event
				switch (event) {
					case 'Goal':
						this.game.home.score++;
						this.game.home.shots++;
						// if toggled to score
						if ( this.toggle == statistics.score || this.toggle == statistics.shots ) this.animateScore('[data-welcoming-score], [data-welcoming-score-tracker]', true);
					break;
					case 'Hit':
						this.game.home.hits++;
						if ( this.toggle == statistics.hits ) this.animateScore('[data-welcoming-score], [data-welcoming-score-tracker]', true);
					break;
					case 'Shot':
						// only if type is undefined, saved, or penalty shot saved
						if ( $.inArray(type, [ 'Saved' , 'Saved Penalty Shot' ]) != -1 ) {
							this.game.home.shots++;
							if ( this.toggle == statistics.shots ) this.animateScore('[data-welcoming-score], [data-welcoming-score-tracker]', true);
						}
					break;
					case 'Penalty':
						this.game.home.penaltiesim++;
						if ( this.toggle == statistics.penaltiesim ) this.animateScore('[data-welcoming-score], [data-welcoming-score-tracker]', true);
					break;
					case 'Takeaway':
						this.game.away.turnovers++;
						if ( this.toggle == statistics.turnovers ) this.animateScore('[data-welcoming-score], [data-welcoming-score-tracker]', true);
					break;
					case 'Faceoff':
						this.game.home.faceoffs++;
						if ( this.toggle == statistics.faceoffs ) this.animateScore('[data-welcoming-score], [data-welcoming-score-tracker]', true);
					break;
				}
			// away
			} else {
				// event
				switch (event) {
					case 'Goal':
						this.game.away.score++;
						this.game.away.shots++;
						// if toggled to score
						if ( this.toggle == statistics.score || this.toggle == statistics.shots ) this.animateScore('[data-visiting-score], [data-visiting-score-tracker]', false);
					break;
					case 'Hit':
						this.game.away.hits++;
						if ( this.toggle == statistics.hits ) this.animateScore('[data-visiting-score], [data-visiting-score-tracker]', false);
					break;
					case 'Shot':
						// only if type is undefined, saved, or penalty shot saved
						if ( $.inArray(type, [ 'Saved' , 'Saved Penalty Shot' ]) != -1 ) {
							this.game.away.shots++;
							if ( this.toggle == statistics.shots ) this.animateScore('[data-visiting-score], [data-visiting-score-tracker]', false);
						}
					break;
					case 'Penalty':
						this.game.away.penaltiesim++;
						if ( this.toggle == statistics.penaltiesim ) this.animateScore('[data-visiting-score], [data-visiting-score-tracker]', false);
					break;
					case 'Takeaway':
						this.game.home.turnovers++;
						if ( this.toggle == statistics.turnovers ) this.animateScore('[data-visiting-score], [data-visiting-score-tracker]', false);
					break;
					case 'Faceoff':
						this.game.away.faceoffs++;
						if ( this.toggle == statistics.faceoffs ) this.animateScore('[data-visiting-score], [data-visiting-score-tracker]', false);
					break;
				}
			}
		},



		

		reprocessData: function(phase) {
			switch (phase) {
				case 1:
					// disable back button
					this.backButtonCollaboration(false);
					// update
					collaboratorObject.event = undefined;
					// show
					this.displayNextField(this.cOptions.event, this.cOptions.event, false, false, 'match__collaborate__option--third');
					// decrement phase
					this.phase--;
				break;
				case 2:
					// update collaborator object
					collaboratorObject.participant.team = undefined;
					collaboratorObject.oParticipant.team = undefined;
					collaboratorObject.advantage = undefined;
					// show team
					this.displayNextField([ this.game.home.team.attributes['name'] , this.game.away.team.attributes['name'] ], [ this.game.home.team.id , this.game.away.team.id ], false, false, 'match__collaborate__option--half');
					// decrement phase
					this.phase--;
				break;
				case 3:
					// update
					collaboratorObject.participant.identification = undefined;
					collaboratorObject.participant.sri = undefined;

					// event
					switch (collaboratorObject.event) {
						case 'Shot':
							// update
							collaboratorObject.oParticipant.identification = undefined;
							collaboratorObject.oParticipant.sri = undefined;
							// organize data to display
							var roster = ((collaboratorObject.advantage) ? this.game.home.fullRoster : this.game.away.fullRoster );
							var activeRoster = ((collaboratorObject.advantage) ? this.game.home.activeRoster : this.game.away.activeRoster );
							var options = [];
							var attributes = [];
							// loop
							for ( var i = 0; i < roster.length; i++ ) {
								if ( $.inArray(roster[i].id, activeRoster) != -1 ) {
									options.push(roster[i].attributes['number']);
									attributes.push(roster[i].id);
								}
							}
							// show player
							this.displayNextField(options, attributes, true, false, 'match__collaborate__option--quarter');
							// decrement phase
							this.phase--;
						break;
						case 'Goal':
							// update
							collaboratorObject.oParticipant.identification = undefined;
							collaboratorObject.oParticipant.sri = undefined;
							// organize data to display
							var roster = ((collaboratorObject.advantage) ? this.game.home.fullRoster : this.game.away.fullRoster );
							var activeRoster = ((collaboratorObject.advantage) ? this.game.home.activeRoster : this.game.away.activeRoster );
							var options = [];
							var attributes = [];
							// loop
							for ( var i = 0; i < roster.length; i++ ) {
								if ( $.inArray(roster[i].id, activeRoster) != -1 ) {
									options.push(roster[i].attributes['number']);
									attributes.push(roster[i].id);
								}
							}
							// show player
							this.displayNextField(options, attributes, true, false, 'match__collaborate__option--quarter');
							// decrement phase
							this.phase--;
						
						break;
						case 'Hit':
							// organize data to display
							var roster = ((collaboratorObject.advantage) ? this.game.home.fullRoster : this.game.away.fullRoster );
							var activeRoster = ((collaboratorObject.advantage) ? this.game.home.activeRoster : this.game.away.activeRoster );
							var options = [];
							var attributes = [];
							// loop
							for ( var i = 0; i < roster.length; i++ ) {
								if ( $.inArray(roster[i].id, activeRoster) != -1 ) {
									options.push(roster[i].attributes['number']);
									attributes.push(roster[i].id);
								}
							}
							// show player
							this.displayNextField(options, attributes, true, false, 'match__collaborate__option--quarter');
							// decrement phase
							this.phase--;
						break;
						case 'Takeaway':
							// organize data to display
							var roster = ((collaboratorObject.advantage) ? this.game.home.fullRoster : this.game.away.fullRoster );
							var activeRoster = ((collaboratorObject.advantage) ? this.game.home.activeRoster : this.game.away.activeRoster );
							var options = [];
							var attributes = [];
							// loop
							for ( var i = 0; i < roster.length; i++ ) {
								if ( $.inArray(roster[i].id, activeRoster) != -1 ) {
									options.push(roster[i].attributes['number']);
									attributes.push(roster[i].id);
								}
							}
							// show player
							this.displayNextField(options, attributes, true, false, 'match__collaborate__option--quarter');
							// decrement phase
							this.phase--;
						break;
						case 'Penalty':
							// organize data to display
							var roster = ((collaboratorObject.advantage) ? this.game.home.fullRoster : this.game.away.fullRoster );
							var activeRoster = ((collaboratorObject.advantage) ? this.game.home.activeRoster : this.game.away.activeRoster );
							var options = [];
							var attributes = [];
							// loop
							for ( var i = 0; i < roster.length; i++ ) {
								if ( $.inArray(roster[i].id, activeRoster) != -1 ) {
									options.push(roster[i].attributes['number']);
									attributes.push(roster[i].id);
								}
							}
							// show player
							this.displayNextField(options, attributes, true, false, 'match__collaborate__option--quarter');
							// decrement phase
							this.phase--;
						break;
						case 'Faceoff':
							// organize data to display
							var roster = ((collaboratorObject.advantage) ? this.game.home.fullRoster : this.game.away.fullRoster );
							var activeRoster = ((collaboratorObject.advantage) ? this.game.home.activeRoster : this.game.away.activeRoster );
							var options = [];
							var attributes = [];
							// loop
							for ( var i = 0; i < roster.length; i++ ) {
								if ( $.inArray(roster[i].id, activeRoster) != -1 ) {
									options.push(roster[i].attributes['number']);
									attributes.push(roster[i].id);
								}
							}
							// show player
							this.displayNextField(options, attributes, true, false, 'match__collaborate__option--quarter');
							// decrement phase
							this.phase--;
						break;
					}
				
				break;
				case 4:
				
					// event
					switch (collaboratorObject.event) {
						case 'Goal':
							// update
							collaboratorObject.other.type = undefined;
							// show goal type
							this.displayNextField(this.cOptions.goalType, this.cOptions.goalType, true, false, 'match__collaborate__option--quarter');
							// increment phase
							this.phase--;
						break;
						case 'Penalty':
							// update
							collaboratorObject.other.duration = undefined;
							// show penalty
							this.displayNextField(this.cOptions.penaltyDur, this.cOptions.penaltyDur, true, false, 'match__collaborate__option--quarter');
							// increment phase
							this.phase--;
						break;
					}
				
				break;
				case 5:
				
					// event
					switch (collaboratorObject.event) {
						case 'Goal':
							// no assists
							if ( collaboratorObject.firstParticipant == undefined ) {
								// update collaborator object
								collaboratorObject.firstParticipant = undefined;
								collaboratorObject.fpsri = undefined;
								// organize data to display
								var roster = ((collaboratorObject.advantage) ? this.game.home.fullRoster : this.game.away.fullRoster );
								var activeRoster = ((collaboratorObject.advantage) ? this.game.home.activeRoster : this.game.away.activeRoster );
								var options = [];
								var attributes = [];
								// loop
								for ( var i = 0; i < roster.length; i++ ) {
									if ( $.inArray(roster[i].id, activeRoster) != -1 ) {
										if ( !( roster[i].id === collaboratorObject.participant.identification ) ) {
											options.push(roster[i].attributes['number']);
											attributes.push(roster[i].id);
										}
									}
								}
								// show players
								this.displayNextField(options, attributes, true, true, 'match__collaborate__option--quarter');
								// increment phase
								this.phase--;
							// if assist	
							} else {
								// update collaborator object
								collaboratorObject.firstParticipant = undefined;
								collaboratorObject.fpsri = undefined;
								// organize data to display
								var roster = ((collaboratorObject.advantage) ? this.game.home.fullRoster : this.game.away.fullRoster );
								var activeRoster = ((collaboratorObject.advantage) ? this.game.home.activeRoster : this.game.away.activeRoster );
								var options = [];
								var attributes = [];
								// loop
								for ( var i = 0; i < roster.length; i++ ) {
									if ( $.inArray(roster[i].id, activeRoster) != -1 ) {
										if ( !( roster[i].id === collaboratorObject.participant.identification ) ) {
											options.push(roster[i].attributes['number']);
											attributes.push(roster[i].id);
										}
									}
								}
								// show players
								this.displayNextField(options, attributes, true, true, 'match__collaborate__option--quarter');
								// increment phase
								this.phase--;
							}
						break;
						case 'Penalty':
							// update
							collaboratorObject.other.type = undefined;
							// display type
							this.displayNextField(this.cOptions.penaltyType, this.cOptions.penaltyType, true, false, 'match__collaborate__option--quarter');
							// increment phase
							this.phase--;
						break;
					}
				
				break;
				case -1:
				
					// event
					switch (collaboratorObject.event) {
						case 'Shot':
							// show shot type
							this.displayNextField(this.cOptions.shotType, this.cOptions.shotType, true, false, 'match__collaborate__option--quarter');
							// set collaborator phase
							this.phase = 3;						
						break;
						case 'Goal':
							// straight from penalty shot
							if ( collaboratorObject.other.type == 'Penalty Shot' ) {
								// update collaborator object
								collaboratorObject.other.type = undefined;
								// show goal type
								this.displayNextField(this.cOptions.goalType, this.cOptions.goalType, true, false, 'match__collaborate__option--quarter');
								// set collaborator phase
								this.phase = 3;
							// not from penalty shot
							} else {
								// first assist set
								if ( !( collaboratorObject.firstParticipant == undefined ) || !( collaboratorObject.secondParticipant == undefined ) ) {
									// update collaborator object
									collaboratorObject.secondParticipant = undefined;
									collaboratorObject.spsri = undefined;
									// organize data to display
									var roster = ((collaboratorObject.advantage) ? this.game.home.fullRoster : this.game.away.fullRoster );
									var activeRoster = ((collaboratorObject.advantage) ? this.game.home.activeRoster : this.game.away.activeRoster );
									var options = [];
									var attributes = [];
									// loop
									for ( var i = 0; i < roster.length; i++ ) {
										if ( $.inArray(roster[i].id, activeRoster) != -1 ) {
											if ( !( roster[i].id === collaboratorObject.participant.identification ) && !( roster[i].id === collaboratorObject.firstParticipant ) ) {
												options.push(roster[i].attributes['number']);
												attributes.push(roster[i].id);
											}
										}
									}
									// show players
									this.displayNextField(options, attributes, true, true, 'match__collaborate__option--quarter');
									// set collaborator phase
									this.phase = 5;
								// first assist is not set	
								} else {
									// update collaborator object
									collaboratorObject.firstParticipant = undefined;
									collaboratorObject.fpsri = undefined;
									collaboratorObject.secondParticipant = undefined;
									collaboratorObject.spsri = undefined;
									// organize data to display
									var roster = ((collaboratorObject.advantage) ? this.game.home.fullRoster : this.game.away.fullRoster );
									var activeRoster = ((collaboratorObject.advantage) ? this.game.home.activeRoster : this.game.away.activeRoster );
									var options = [];
									var attributes = [];
									// loop
									for ( var i = 0; i < roster.length; i++ ) {
										if ( $.inArray(roster[i].id, activeRoster) != -1 ) {
											if ( !( roster[i].id === collaboratorObject.participant.identification ) ) {
												options.push(roster[i].attributes['number']);
												attributes.push(roster[i].id);
											}
										}
									}
									// show players
									this.displayNextField(options, attributes, true, true, 'match__collaborate__option--quarter');
									// set collaborator phase
									this.phase = 4;
								}
							}
							
						break;
						case 'Hit':
							// update
							collaboratorObject.oParticipant.identification = undefined;
							collaboratorObject.oParticipant.sri = undefined;
							// organize data to display
							var roster = ((collaboratorObject.advantage) ? this.game.away.fullRoster : this.game.home.fullRoster );
							var activeRoster = ((collaboratorObject.advantage) ? this.game.away.activeRoster : this.game.home.activeRoster );
							var options = [];
							var attributes = [];
							// loop
							for ( var i = 0; i < roster.length; i++ ) {
								if ( $.inArray(roster[i].id, activeRoster) != -1 ) {
									options.push(roster[i].attributes['number']);
									attributes.push(roster[i].id);
								}
							}
							// show player
							this.displayNextField(options, attributes, true, false, 'match__collaborate__option--quarter');
							// set collaborator phase
							this.phase = 3;
						break;
						case 'Takeaway':
						
							collaboratorObject.oParticipant.identification = undefined;
							collaboratorObject.oParticipant.sri = undefined;
							// organize data to display
							var roster = ((collaboratorObject.advantage) ? this.game.away.fullRoster : this.game.home.fullRoster );
							var activeRoster = ((collaboratorObject.advantage) ? this.game.away.activeRoster : this.game.home.activeRoster );
							var options = [];
							var attributes = [];
							// loop
							for ( var i = 0; i < roster.length; i++ ) {
								if ( $.inArray(roster[i].id, activeRoster) != -1 ) {
									options.push(roster[i].attributes['number']);
									attributes.push(roster[i].id);
								}
							}
							// show player
							this.displayNextField(options, attributes, true, false, 'match__collaborate__option--quarter');
							// set collaborator phase
							this.phase = 3;
						break;
						case 'Penalty':
							// update collaborator object
							collaboratorObject.other.category = undefined;
							// display category
							this.displayNextField(this.cOptions.penaltyCat, this.cOptions.penaltyCat, true, true, 'match__collaborate__option--quarter');
							// set collaborator phase
							this.phase = 5;
						break;
						// faceoff
						case 'Faceoff':
							// update
							collaboratorObject.oParticipant.identification = undefined;
							collaboratorObject.oParticipant.sri = undefined;
							// organize data to display
							var roster = ((collaboratorObject.advantage) ? this.game.away.fullRoster : this.game.home.fullRoster );
							var activeRoster = ((collaboratorObject.advantage) ? this.game.away.activeRoster : this.game.home.activeRoster );
							var options = [];
							var attributes = [];
							// loop
							for ( var i = 0; i < roster.length; i++ ) {
								if ( $.inArray(roster[i].id, activeRoster) != -1 ) {
									options.push(roster[i].attributes['number']);
									attributes.push(roster[i].id);
								}
							}
							// show player
							this.displayNextField(options, attributes, true, false, 'match__collaborate__option--quarter');
							// set collaborator phase
							this.phase = 3;
						break;
					}
				
				break;
				
			}
		},

		// paginate
		paginating: function(e) {
			var self = this;
			$(e.currentTarget).text('Loading ...');
			// increment skip by interval
			this.paginate.feed.skip += this.paginate.feed.interval;
				
			// get games
			var getGames = new Parse.Query(Parse.Object.extend('Game'));
			getGames.equalTo('league', this.league.o);
			getGames.equalTo('initialized', true);
			getGames.include('homeTeam');
			getGames.include('awayTeam');
			getGames.include('createdBy');
			getGames.include('league');
			getGames.include('score');
			getGames.descending('createdAt');
			getGames.skip(this.paginate.feed.skip);
			getGames.limit(this.paginate.feed.interval);
			getGames.find({
				// success
				success: function(games) {
					// if there are more than 0 games
					if ( games.length > 0 ) {
						// loop through feeds
						for ( var s = 0; s < games.length; s++ ) {
							// current game
							var cg = games[s];
							// push this feed to currentHomeFeeds
							currentGames.push(cg);
							// get feed values
							var game 			= cg;
							var creator			= cg.get('createdBy');
							var welcomingTeam	= cg.get('homeTeam');
							var visitingTeam	= cg.get('awayTeam');
							var league			= cg.get('league');
							// display feeds
							$('#league--games .loader').before(displayGame(game, creator, welcomingTeam, visitingTeam, league));
						}
						// if less than feed interval
						if ( games.length < self.paginate.feed.interval ) {
							$('#league--games .number-of-results').removeClass('hidden');
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
						$('#league--games .number-of-results').removeClass('hidden');
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
		
		// verifying pending name update
		checkingLeagueName: function(e) {
		
			// get name value
			var lnv = $(e.currentTarget).val();
			// name empty
			if ( lnv == '' || lnv == false ) {
				// show error
				$(e.currentTarget)
					.siblings('.profile--message')
						.removeClass('error verifying')
						.addClass('display-message error')
						.text('League Name Invalid');
				// disable update button		
				$('input[type="submit"]').attr('disabled' , true);
				// name not ready	
				leagueNameSettingsReady = false;
			// name not empty	
			} else {
				// hide error
				$(e.currentTarget)
					.siblings('.profile--message')
						.removeClass('display-message');
				// re-enable update button		
				$('input[type="submit"]').removeAttr('disabled')
				// name ready
				leagueNameSettingsReady = true;
			}
			
		},
		
		// updating age
		updateAge: function(e) {
		
			e.preventDefault();
		
			// data
			var data = $(e.currentTarget).attr('data-value');
			// updates are undefined
			updateLeague.level = undefined;
			// level buttons active
			$('button.league-level')
				.removeClass('inactive')
				.removeAttr('disabled');
				
			// if novice
			if ( $.inArray( data , [ 'Novice' ] ) != -1 ) {
			
				// if already picked
				if ( updateLeague.age != undefined && $.inArray(updateLeague.age, [ 'Novice' ] ) != -1 ) {
					updateLeague.age = undefined;
					updateLeague.level = undefined;
					// make all active
					$(e.currentTarget)
						.removeClass('inactive')
							.siblings('button')
								.removeClass('inactive');
					// enable next category
					$('button.league-level')
						.removeClass('inactive')
						.removeAttr('disabled');
				// if not already picked		
				} else {
					updateLeague.age = data;
					// make inactive
					$(e.currentTarget)
						.removeClass('inactive')
						.siblings('button')
							.addClass('inactive');
					// disable next category
					$('button.league-level').each(function() {
						if ( !( $(this).attr('data-value') == 'House League' ) && !( $(this).attr('data-value') == 'Select' ) )
							$(this)
								.addClass('inactive')
								.attr('disabled' , true);
					});
				}
			
			// if minor league	
			} else if ( $.inArray( data , [ 'Minor Atom' , 'Atom' , 'Minor Peewee' , 'Peewee' , 'Minor Bantam' , 'Bantam' , 'Minor Midget' , 'Midget' , 'Juvenile' ] ) != -1 ) {
				
				if ( updateLeague.age != undefined && $.inArray(updateLeague.age, [ 'Minor Atom' , 'Atom' , 'Minor Peewee' , 'Peewee' , 'Minor Bantam' , 'Bantam' , 'Minor Midget' , 'Midget' , 'Juvenile' ]) != -1 && updateLeague.age == data ) {
					updateLeague.age = undefined;
					updateLeague.level = undefined;
					// make all active
					$(e.currentTarget)
						.removeClass('inactive')
						.siblings('button')
							.removeClass('inactive');
					// enable next category
					$('button.league-level')
						.removeClass('inactive')
						.removeAttr('disabled');
				// if not already picked		
				} else {
					updateLeague.cAgeLevel = data;
					updateLeague.age = data;
					// make inactive
					$(e.currentTarget)
						.removeClass('inactive')
						.siblings('button')
							.addClass('inactive');
					// enable next category
					$('button.league-level')
						.removeClass('inactive')
						.removeAttr('disabled');
				}
				
			// if major league	
			} else if ( $.inArray( data , [ 'Major Junior' , 'Professional' , 'Senior' ] ) != -1 ) {
			
				if ( updateLeague.age != undefined && $.inArray(updateLeague.age, [ 'Major Junior' , 'Professional' , 'Senior' ]) != -1 && updateLeague.age == data ) {
					updateLeague.age = undefined;
					updateLeague.level = undefined;
					// make all active
					$(e.currentTarget)
						.removeClass('inactive')
						.siblings('button')
							.removeClass('inactive');
					// enable next category
					$('button.league-level')
						.removeClass('inactive')
						.removeAttr('disabled');
				// if not already picked		
				} else {
					updateLeague.age = data;
					// make inactive
					$(e.currentTarget)
						.removeClass('inactive')
						.siblings('button')
							.addClass('inactive');
					// enable next category
					$('button.league-level')
						.addClass('inactive')
						.attr('disabled' , true);
				}
			
			}
			
		},
		
		// update skill level
		updateSkillLevel: function(e) {
		
			e.preventDefault();
		
			// data and type
			var data = $(e.currentTarget).attr('data-value');
			
			// if current already picked
			if ( updateLeague.level != undefined && $.inArray(updateLeague.level, [ 'House League' , 'Select' , 'A' , 'AA' , 'AAA' ] ) != -1 && updateLeague.level == data ) {
				updateLeague.level = undefined;
				// make all active
				$(e.currentTarget)
					.removeClass('inactive')
					.siblings('button.league-level:not(button[disabled])')
						.removeClass('inactive');
			// if not already picked			
			} else {
				updateLeague.level = data;
				// make inactive
				$(e.currentTarget)
					.removeClass('inactive')
					.siblings('button')
						.addClass('inactive');
			}
			
		},
		
		// update season
		updateSeason: function(e) {
		
			e.preventDefault();
		
			// data and type
			var data = $(e.currentTarget).attr('data-value');
			
			// if current already picked
			if ( updateLeague.season != undefined && updateLeague.season == data ) {
				updateLeague.season = undefined;
				// make all active
				$(e.currentTarget)
					.removeClass('inactive')
					.siblings('button.league-season')
						.removeClass('inactive');
			} else {
				updateLeague.season = data;
				// make inactive
				$(e.currentTarget)
					.removeClass('inactive')
					.siblings('button.league-season')
						.addClass('inactive');
			}
			
		},

		

		tab: function(e) {
			var self = this;
			// activate
			this.makeTabButtonActive(e);
			this.makeTabActive(e);
			// tab
			var tab = $(e.currentTarget).attr('data-target-tab');
			switch (tab) {
				case 'team-roster':
					// if not already showing
					if (!this.teamStatisticsShowing) {
						// shown
						this.teamStatisticsShowing = true;
						this.getTeamStatistics(this.team.o);
						this.getTeamPersonell(this.team.o);
					}
				break;
				case 'team-settings': this.settings(); break;
			}
		},

		makeTabButtonActive: function(e) {
			$(e.currentTarget)
				.addClass('entity__options__button--is-active')
				.siblings('[data-target-tab]')
					.removeClass('entity__options__button--is-active');
		},

		makeTabActive: function(e) {
			$('[data-tab]').each(function() {
				if ( $(this).attr('data-tab') == $(e.currentTarget).attr('data-target-tab') ) $(this).addClass('entity__data__tab--in-view');
				else $(this).removeClass('entity__data__tab--in-view');
			});
		},
		
		// paginate
		paginating: function(e) {
			var self = this;
			// loading
			$(e.currentTarget).text('Loading ...');
		
			// increment skip by interval
			this.paginate.feed.skip += this.paginate.feed.interval;
				
			// get games
			var getHomeGames = new Parse.Query(Parse.Object.extend('Game'));
			getHomeGames.equalTo('homeTeam', teamObject.team);
			var getAwayGames = new Parse.Query(Parse.Object.extend('Game'));
			getAwayGames.equalTo('awayTeam', teamObject.team);
			var getGames = new Parse.Query.or(getHomeGames, getAwayGames);
			getGames.equalTo('isOfficial', true);
			getGames.include('homeTeam');
			getGames.include('awayTeam');
			getGames.include('createdBy');
			getGames.include('league');
			getGames.include('score');
			getGames.descending('createdAt');
			getGames.skip(this.paginate.feed.skip);
			getGames.limit(this.paginate.feed.interval);
			getGames.find({
				// success
				success: function(games) {
					// if there are more than 0 games
					if ( games.length > 0 ) {
						// loop through feeds
						for ( var s = 0; s < games.length; s++ ) {
							// current game
							var cg = games[s];
							// push this feed to currentHomeFeeds
							currentGames.push(cg);
							// get feed values
							var game 			= cg;
							var creator			= cg.get('createdBy');
							var welcomingTeam	= cg.get('homeTeam');
							var visitingTeam	= cg.get('awayTeam');
							var league			= cg.get('league');
							// display feeds
							$('#team--games .loader').before(displayGame(game, creator, welcomingTeam, visitingTeam, league));
						}
						// if less than feed interval
						if ( games.length < self.paginate.feed.interval ) {
							$('#team--games .number-of-results').removeClass('hidden');
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
						$('#team--games .number-of-results').removeClass('hidden');
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

		

		tab: function(e) {
			var self = this;
			// activate
			this.makeTabButtonActive(e);
			this.makeTabActive(e);
			// tab
			var tab = $(e.currentTarget).attr('data-target-tab');
			switch (tab) {
				case 'team-roster':
					// if not already showing
					if (!this.teamStatisticsShowing) {
						// shown
						this.teamStatisticsShowing = true;
						this.getTeamStatistics(this.team.o);
						this.getTeamPersonell(this.team.o);
					}
				break;
				case 'team-settings': this.settings(); break;
			}
		},

		makeTabButtonActive: function(e) {
			$(e.currentTarget)
				.addClass('entity__options__button--is-active')
				.siblings('[data-target-tab]')
					.removeClass('entity__options__button--is-active');
		},

		makeTabActive: function(e) {
			$('[data-tab]').each(function() {
				if ( $(this).attr('data-tab') == $(e.currentTarget).attr('data-target-tab') ) $(this).addClass('entity__data__tab--in-view');
				else $(this).removeClass('entity__data__tab--in-view');
			});
		},
		
		// paginate
		paginating: function(e) {
			var self = this;
			// loading
			$(e.currentTarget).text('Loading ...');
		
			// increment skip by interval
			this.paginate.feed.skip += this.paginate.feed.interval;
				
			// get games
			var getHomeGames = new Parse.Query(Parse.Object.extend('Game'));
			getHomeGames.equalTo('homeTeam', teamObject.team);
			var getAwayGames = new Parse.Query(Parse.Object.extend('Game'));
			getAwayGames.equalTo('awayTeam', teamObject.team);
			var getGames = new Parse.Query.or(getHomeGames, getAwayGames);
			getGames.equalTo('isOfficial', true);
			getGames.include('homeTeam');
			getGames.include('awayTeam');
			getGames.include('createdBy');
			getGames.include('league');
			getGames.include('score');
			getGames.descending('createdAt');
			getGames.skip(this.paginate.feed.skip);
			getGames.limit(this.paginate.feed.interval);
			getGames.find({
				// success
				success: function(games) {
					// if there are more than 0 games
					if ( games.length > 0 ) {
						// loop through feeds
						for ( var s = 0; s < games.length; s++ ) {
							// current game
							var cg = games[s];
							// push this feed to currentHomeFeeds
							currentGames.push(cg);
							// get feed values
							var game 			= cg;
							var creator			= cg.get('createdBy');
							var welcomingTeam	= cg.get('homeTeam');
							var visitingTeam	= cg.get('awayTeam');
							var league			= cg.get('league');
							// display feeds
							$('#team--games .loader').before(displayGame(game, creator, welcomingTeam, visitingTeam, league));
						}
						// if less than feed interval
						if ( games.length < self.paginate.feed.interval ) {
							$('#team--games .number-of-results').removeClass('hidden');
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
						$('#team--games .number-of-results').removeClass('hidden');
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



		tab: function(e) {
			var self = this;
			// activate
			this.makeTabButtonActive(e);
			this.makeTabActive(e);
			// tab
			var tab = $(e.currentTarget).attr('data-target-tab');
			switch (tab) {
				case 'league-standings':
					// if not already shown
					if (!this.statisticsShowing) {
						// shown
						this.statisticsShowing = true;
						this.getTeamStandings(this.league.o);
						this.getScoringLeaders(this.league.o);
						this.getGoalieLeaders(this.league.o);
					}
				break;
				case 'league-settings': this.settings(); break;
			}
		},

		makeTabButtonActive: function(e) {
			$(e.currentTarget)
				.addClass('entity__options__button--is-active')
				.siblings('[data-target-tab]')
					.removeClass('entity__options__button--is-active');
		},

		makeTabActive: function(e) {
			$('[data-tab]').each(function() {
				if ( $(this).attr('data-tab') == $(e.currentTarget).attr('data-target-tab') ) $(this).addClass('entity__data__tab--in-view');
				else $(this).removeClass('entity__data__tab--in-view');
			});
		},

		settings: function(e) {
			var self = this;
			$('.entity__options__button').removeClass('entity__options__button--is-active');
			// show view
			$('[data-tab]').each(function() {
				if ( $(this).attr('data-tab') == 'league-settings' ) $(this).addClass('entity__data__tab--in-view');
				else $(this).removeClass('entity__data__tab--in-view');
			});

			// if there is a current user cached
			if ( Parse.User.current().id === this.league.creator.id ) {
				// display profile data in fields
				$('#league-name').val(this.league.name);
				$('#league-hometown').val(this.league.hometown);
				$('.profile--last-updated').text('Last updated ' + getTimeDifference(self.league.updatedAt));
				// show age group and level
				if ( !( this.league.ageLevel == undefined ) ) {
					// length
					switch ( this.league.ageLevel.split(' ').length ) {
						// 1
						case 1:
						
							// if age group
							if ( $.inArray(self.league.ageLevel , [ 'House League' , 'Select' , 'A' , 'AA' , 'AAA' ] ) == -1 ) {
								$('#league-age-group button').each(function() {
									if ( !( $(this).attr('data-value') == self.league.ageLevel ) ) $(this).addClass('inactive');
								});
								// if novice
								if ( $.inArray(self.league.ageLevel, [ 'Novice' ] ) != -1 ) {
									$('#league-level button').each(function() {
										if ( ( $(this).attr('data-value') != 'House League' ) && ( $(this).attr('data-value') != 'Select' ) )
											$(this)
												.addClass('inactive')
												.attr('disabled' , true);
									});
								// if major junior, professional, or senior
								} else if ( $.inArray(self.league.ageLevel, [ 'Major Junior' , 'Professional' , 'Senior' ] ) != -1 ) {
									$('#league-level button')
										.addClass('inactive')
										.attr('disabled' , true);
								}
								updateLeague.age = self.league.ageLevel;
							// if level
							} else {
								$('#league-level button').each(function() {
									if ( !( $(this).attr('data-value') == self.league.ageLevel ) ) $(this).addClass('inactive');
								});
								updateLeague.level = self.league.ageLevel
							}
						
						break;
						// 2
						case 2:
						
							// if contains 'minor' or 'major'
							if ( $.inArray(self.league.ageLevel.split(' ')[0], [ 'Minor' , 'Major' ] ) != -1 ) {
								$('#league-age-group button').each(function() {
									if ( !( $(this).attr('data-value') == self.league.ageLevel ) ) $(this).addClass('inactive');
								});
								// if major
								if ( $.inArray(self.league.ageLevel.split(' ')[0], [ 'Major' ] ) != -1 ) {
									$('#team-level button')
										.addClass('inactive')
										.attr('disabled' , true);
								}
								updateLeague.age = self.league.ageLevel;
							// contains both categories
							} else {
								$('#league-age-group button').each(function() {
									if ( !( $(this).attr('data-value') == self.league.ageLevel.split(' ')[0] ) ) $(this).addClass('inactive');
								});
								$('#league-level button').each(function() {
									if ( !( $(this).attr('data-value') == self.league.ageLevel.split(' ')[1] ) ) $(this).addClass('inactive');
								});
								// if novice
								if ( $.inArray(self.league.ageLevel.split(' ')[0], [ 'Novice' ] ) != -1 ) {
									$('#league-level button.inactive').each(function() {
										if ( ( $(this).attr('data-value') != 'House League' ) && ( $(this).attr('data-value') != 'Select' ) )
											$(this).attr('disabled' , true);
									});
								}
								updateLeague.age = self.league.ageLevel.split(' ')[0];
								updateLeague.level = self.league.ageLevel.split(' ')[1];
							}
						
						break;
						// 3
						case 3:
							
							// if contains 'minor' or 'major'
							if ( $.inArray(self.league.ageLevel.split(' ')[0], [ 'Minor' , 'Major' ] ) != -1 ) {
								$('#league-age-group button').each(function() {
									if ( !( $(this).attr('data-value') == ( self.league.ageLevel.split(' ')[0] + ' ' + self.league.ageLevel.split(' ')[1] ) ) ) $(this).addClass('inactive');
								});
								$('#league-level button').each(function() {
									if ( !( $(this).attr('data-value') == self.league.ageLevel.split(' ')[2] ) ) $(this).addClass('inactive');
								});
								updateLeague.age = self.league.ageLevel.split(' ')[0] + ' ' + self.league.ageLevel.split(' ')[1];
								updateLeague.level = self.league.ageLevel.split(' ')[2];
							// contains both categories
							} else {
								$('#league-age-group button').each(function() {
									if ( !( $(this).attr('data-value') == self.league.ageLevel.split(' ')[0] ) ) $(this).addClass('inactive');
								});
								$('#league-level button').each(function() {
									if ( !( $(this).attr('data-value') == ( self.league.ageLevel.split(' ')[1] + ' ' + self.league.ageLevel.split(' ')[2] ) ) ) $(this).addClass('inactive');
								});
								// if novice
								if ( $.inArray(self.league.ageLevel.split(' ')[0], [ 'Novice' ] ) != -1 ) {
									$('#league-level button.inactive').each(function() {
										if ( ( $(this).attr('data-value') != 'House League' ) && ( $(this).attr('data-value') != 'Select' ) )
											$(this).attr('disabled' , true);
									});
								}
								updateLeague.age = self.league.ageLevel.split(' ')[0];
								updateLeague.level = self.league.ageLevel.split(' ')[1] + ' ' + self.league.ageLevel.split(' ')[2];
							}
						
						break;
						// 4
						case 4:
						
							$('#league-age-group button').each(function() {
								if ( !( $(this).attr('data-value') == ( self.league.ageLevel.split(' ')[0] + ' ' + self.league.ageLevel.split(' ')[1] ) ) ) $(this).addClass('inactive');
							});
							$('#league-level button').each(function() {
								if ( !( $(this).attr('data-value') == ( self.league.ageLevel.split(' ')[2] + ' ' + self.league.ageLevel.split(' ')[3] ) ) ) $(this).addClass('inactive');
							});
							updateLeague.age = self.league.ageLevel.split(' ')[0] + ' ' + self.league.ageLevel.split(' ')[1];
							updateLeague.level = self.league.ageLevel.split(' ')[2] + ' ' + self.league.ageLevel.split(' ')[3];
						
						break;
					}
				}
				// show season
				if ( !( self.league.year == undefined ) )
					$('#league-season button').each(function() {
						if ( !( $(this).attr('data-value') == self.league.year ) ) $(this).addClass('inactive');
					});
			}
		},

		

		// save league settings
		saveLeagueSettings: function(e) {
			var self = this;
			// if all values are ready
			if ( leagueNameSettingsReady ) {
				// saving...
				$(e.currentTarget).find('input[type="submit"]')
					.val('Saving...')
					.attr('disabled' , true);
				// get form values
				var lns 	= $('#league-name').val();
				var lals	= ( ( updateLeague.age == undefined && updateLeague.level == undefined ) ? undefined : ( ( updateLeague.age == undefined ) ? updateLeague.level : ( ( updateLeague.level == undefined ) ) ? updateLeague.age : updateLeague.age + ' ' + updateLeague.level ) );
				var lys 	= updateLeague.season;
				var lhs		= $('#league-hometown').val();
				// get league id
				var identification = document.URL.split('/').pop();
				// current legue
				var LeagueClass = Parse.Object.extend('League');
				var league = new LeagueClass();
				league.id = identification;
				// hometown
				if ( lhs == '' || lhs == false ) {
					league.unset('hometown');
					league.unset('searchHometown');
				} else {
					league.set( 'hometown' , lhs );
					league.set( 'searchHometown' , lhs.toLowerCase() );
				}
				// competitive age group
				if ( lals == undefined ) {
					league.unset('competitiveCategory');
					league.unset('searchCompetitiveCategory');
				} else {
					league.set( 'competitiveCategory' , lals );
					league.set( 'searchCompetitiveCategory' , ( ( lals == undefined ) ? undefined : lals.toLowerCase() ) );
				}
				// year
				if ( lys == undefined ) league.unset('year');
				else league.set( 'year' , lys );
				// set changes
				league.set( 'name' , lns );
				league.set( 'searchName' , lns.toLowerCase() );
				// update league		
				league.save(null, {
					// success
					success: function(league) {		
						// get udpated team
						league.fetch({
							// success
							success: function(updatedLeague) {
								var ul = updatedLeague;
								// update teamObject
								self.league.name = ul.get('name');
								self.league.ageLevel = ul.get('competitiveCategory');
								self.league.year = ul.get('year');
								self.league.hometown = ul.get('hometown');
								// update fields
								$('#league-name').val(self.league.name);
								$('#league-hometown').val(self.league.sHometown);
								$(e.currentTarget)
									.find('button')
										.removeClass('inactive')
										.removeAttr('disabled');
								// show age group and level
								if ( !( self.league.ageLevel == undefined ) ) {
									// length
									switch ( self.league.ageLevel.split(' ').length ) {
										// 1
										case 1:
										
											// if age group
											if ( $.inArray(self.league.ageLevel , [ 'House League' , 'Select' , 'A' , 'AA' , 'AAA' ] ) == -1 ) {
												$('#league-age-group button').each(function() {
													if ( !( $(this).attr('data-value') == self.league.ageLevel ) ) $(this).addClass('inactive');
												});
												// if novice
												if ( $.inArray(self.league.ageLevel, [ 'Novice' ] ) != -1 ) {
													$('#league-level button').each(function() {
														if ( ( $(this).attr('data-value') != 'House League' ) && ( $(this).attr('data-value') != 'Select' ) )
															$(this)
																.addClass('inactive')
																.attr('disabled' , true);
													});
												// if major junior, professional, or senior
												} else if ( $.inArray(self.league.ageLevel, [ 'Major Junior' , 'Professional' , 'Senior' ] ) != -1 ) {
													$('#league-level button')
														.addClass('inactive')
														.attr('disabled' , true);
												}
												updateLeague.age = self.league.ageLevel;
											// if level
											} else {
												$('#league-level button').each(function() {
													if ( !( $(this).attr('data-value') == self.league.ageLevel ) ) $(this).addClass('inactive');
												});
												updateLeague.level = self.league.ageLevel
											}
										
										break;
										// 2
										case 2:
										
											// if contains 'minor' or 'major'
											if ( $.inArray(self.league.ageLevel.split(' ')[0], [ 'Minor' , 'Major' ] ) != -1 ) {
												$('#league-age-group button').each(function() {
													if ( !( $(this).attr('data-value') == self.league.ageLevel ) ) $(this).addClass('inactive');
												});
												// if major
												if ( $.inArray(self.league.ageLevel.split(' ')[0], [ 'Major' ] ) != -1 ) {
													$('#league-level button')
														.addClass('inactive')
														.attr('disabled' , true);
												}
												updateLeague.age = self.league.ageLevel;
											// contains both categories
											} else {
												$('#league-age-group button').each(function() {
													if ( !( $(this).attr('data-value') == self.league.ageLevel.split(' ')[0] ) ) $(this).addClass('inactive');
												});
												$('#league-level button').each(function() {
													if ( !( $(this).attr('data-value') == self.league.ageLevel.split(' ')[1] ) ) $(this).addClass('inactive');
												});
												// if novice
												if ( $.inArray(self.league.ageLevel.split(' ')[0], [ 'Novice' ] ) != -1 ) {
													$('#league-level button.inactive').each(function() {
														if ( ( $(this).attr('data-value') != 'House League' ) && ( $(this).attr('data-value') != 'Select' ) )
															$(this).attr('disabled' , true);
													});
												}
												updateLeague.age = self.league.ageLevel.split(' ')[0];
												updateLeague.level = self.league.ageLevel.split(' ')[1];
											}
										
										break;
										// 3
										case 3:
											
											// if contains 'minor' or 'major'
											if ( $.inArray(self.league.ageLevel.split(' ')[0], [ 'Minor' , 'Major' ] ) != -1 ) {
												$('#league-age-group button').each(function() {
													if ( !( $(this).attr('data-value') == ( self.league.ageLevel.split(' ')[0] + ' ' + self.league.ageLevel.split(' ')[1] ) ) ) $(this).addClass('inactive');
												});
												$('#league-level button').each(function() {
													if ( !( $(this).attr('data-value') == self.league.ageLevel.split(' ')[2] ) ) $(this).addClass('inactive');
												});
												updateLeague.age = self.league.ageLevel.split(' ')[0] + ' ' + self.league.ageLevel.split(' ')[1];
												updateLeague.level = self.league.ageLevel.split(' ')[2];
											// contains both categories
											} else {
												$('#league-age-group button').each(function() {
													if ( !( $(this).attr('data-value') == self.league.ageLevel.split(' ')[0] ) ) $(this).addClass('inactive');
												});
												$('#league-level button').each(function() {
													if ( !( $(this).attr('data-value') == ( self.league.ageLevel.split(' ')[1] + ' ' + self.league.ageLevel.split(' ')[2] ) ) ) $(this).addClass('inactive');
												});
												// if novice
												if ( $.inArray(self.league.ageLevel.split(' ')[0], [ 'Novice' ] ) != -1 ) {
													$('#league-level button.inactive').each(function() {
														if ( ( $(this).attr('data-value') != 'House League' ) && ( $(this).attr('data-value') != 'Select' ) )
															$(this).attr('disabled' , true);
													});
												}
												updateLeague.age = self.league.ageLevel.split(' ')[0];
												updateLeague.level = self.league.ageLevel.split(' ')[1] + ' ' + self.league.ageLevel.split(' ')[2];
											}
										
										break;
										// 4
										case 4:
										
											$('#league-age-group button').each(function() {
												if ( !( $(this).attr('data-value') == ( self.league.ageLevel.split(' ')[0] + ' ' + self.league.ageLevel.split(' ')[1] ) ) ) $(this).addClass('inactive');
											});
											$('#league-level button').each(function() {
												if ( !( $(this).attr('data-value') == ( self.league.ageLevel.split(' ')[2] + ' ' + self.league.ageLevel.split(' ')[3] ) ) ) $(this).addClass('inactive');
											});
											updateLeague.age = self.league.ageLevel.split(' ')[0] + ' ' + self.league.ageLevel.split(' ')[1];
											updateLeague.level = self.league.ageLevel.split(' ')[2] + ' ' + self.league.ageLevel.split(' ')[3];
										
										break;
									}
								}
								// show season
								if ( !( self.league.year == undefined ) )
									$('#league-season button').each(function() {
										if ( !( $(this).attr('data-value') == self.league.year ) ) $(this).addClass('inactive');
									});
								// display team data
								$('[data-text="league-name"]').text(self.league.name);
								$('[data-text="league-classification"]').text( ( ( self.league.ageLevel == undefined ) ? '' : self.league.ageLevel ) );
								$('[data-text="league-location"]').html((( self.league.hometown == undefined ) ? '' : '&#xe24d;' + self.league.hometown ));
								$('[data-text="league-annum"]').html((( self.league.year == undefined ) ? '' : '<span>&#xe259;</span> ' + self.league.year ));
								$('.profile--last-updated').text('Just now');
								// saved successfully
								$(e.currentTarget)
									.find('input[type="submit"]')
										.val('Save Settings')
										.removeAttr('disabled')
											.end()
									.find('input')
										.blur();
								// remove errors and validations
								$(e.currentTarget)
									.find('.profile--message')
										.removeClass('display-message error verifying')
										.text('');
							},
							// error
							error: function(err) {
								$(e.currentTarget)
									.find('input[type="submit"]')
										.val('Save Settings')
										.removeAttr('disabled')
											.end()
									.find('input')
										.blur();
							}
						});
									
					},
					// error
					error: function(err) {
						$(e.currentTarget)
							.find('input[type="submit"]')
								.val('Save Settings')
								.removeAttr('disabled')
									.end()
							.find('input')
								.blur();
					}
				});
				
			}
			
			return false;
			
		}


		// Not Found View
	var NotFoundView = Parse.View.extend({
		
		el: $('[data-app-main]'),
		
		initialize: function() {
		
			// unbind previous events
			$('[data-app-main]').unbind();
			
			// clean up previous state
			cleanUpMemory(state);
			
			// update state
			state = 9;
			
			// binding this to functions that reference this
			_.bindAll(this, 'render');
			
			// render page
			this.render();

			bearing('NOT FOUND', true);

			initInteractiveScorbit(false);
			
		},
		
		render: function() {
		
			// grabbing template and inserting into el
			var template = _.template( $('#notFound-view').html() );
			this.$el.html( template );
			
		}
		
	});
	
	// Access Denied View
	var AccessDeniedView = Parse.View.extend({
		
		el: $('[data-app-main]'),
		
		initialize: function() {
		
			// unbind previous events
			$('[data-app-main]').unbind();
			
			// clean up previous state
			cleanUpMemory(state);
			
			// update state
			state = 10;
			
			// binding this to functions that reference this
			_.bindAll(this, 'render');
			
			// render page
			this.render();

			bearing('DENIED', true);
			

			initInteractiveScorbit(false);
		},
		
		render: function() {
		
			// grabbing template and inserting into el
			var template = _.template( $('#accessDenied-view').html() );
			this.$el.html( template );
			
		}
		
	});


	tab: function(e) {
			// activate
			this.makeTabButtonActive(e);
			this.makeTabActive(e);
			// tab
			var tab = $(e.currentTarget).attr('data-target-tab');
			switch (tab) {
				case 'match-settings':
					this.settings([ this.game.isActive , this.game.isFinal ], this.game.time.dfpm, this.game.time.dspm, this.game.time.dtpm);
				break;
			}
		},

		makeTabButtonActive: function(e) {
			$(e.currentTarget)
				.addClass('match__options__button--is-active')
				.siblings('.match__options__button')
					.removeClass('match__options__button--is-active');
		},

		makeTabActive: function(e) {
			$('[data-tab]').each(function() {
				if ( $(this).attr('data-tab') == $(e.currentTarget).attr('data-target-tab') ) $(this).addClass('match__data__tab--in-view');
				else $(this).removeClass('match__data__tab--in-view');
			});
		},

		settings: function(activity, f, s, t) {
			// activity
			if ( activity[0] && !activity[1] ) $('[name="game-activity"]').val('Active');
			else if ( !activity[0] && !activity[1] ) $('[name="game-activity"]').val('Inactive');
			else $('[name="game-activity"]').val('Final');
			// first period minutes
			$('[name="game-dfpm"]').val(f);
			// second period minutes
			$('[name="game-dspm"]').val(s);
			// third period minutes
			$('[name="game-dtpm"]').val(t);
		},


		destroyCollaboration: function() { this.controlCollaboratorFrame(false); },

		controlHeaderForward: function(data) {
			// get header
			var header = $('[data-collaborator-header]');	
			var heading;

			switch (this.phase) {
				case 0: heading = 'Pick a Team'; break;
				case 1: heading = 'Pick a Player'; break;
				break;
				case 2:
					switch (this.eventObject.event) {
						case 'Shot': heading = 'Shot Type'; break;
						case 'Goal': heading = 'Goal Type'; break;
						case 'Hit': heading = 'Opposing Player'; break;
						case 'Takeaway': heading = 'Opposing Player'; break;
						case 'Penalty': heading = 'Penalty Duration'; break;
						case 'Faceoff': heading = 'Opposing Player'; break;
					}
				break;
				case 3:
					switch (this.eventObject.event) {
						case 'Goal':
							if ( data == 'Penalty Shot' ) heading = 'Confirm Time';
							else heading = 'First Assist';
						break;
						case 'Penalty': heading = 'Penalty Type'; break;
					}
				break;
				case 4:
					switch (this.eventObject.event) {
						case 'Goal':
							if ( data == 'N' ) heading = 'Confirm Time';
							else heading = 'Second Assist';
						break;
						case 'Penalty': heading = 'Penalty Category'; break;
					}
				break;
				case 5: heading = 'Confirm Time';
				break;
				case -1:
					if ( data == 'Change Time' ) heading = 'Change Time (Minutes)';
					else heading = 'Pick an Event';
				break;
				case -2: heading = 'Change Time (Seconds)'; break;
				case -3: heading = 'Pick an Event';	break;
				
			}

			// set header
			header.text(heading);
		},

		controlHeaderBackward: function() {
			// get header
			var header = $('[data-collaborator-header]');	
			var heading;
			switch (this.phase) {
				case 1: heading = 'Pick an Event'; break;
				case 2: heading = 'Pick a Team'; break;
				case 3: heading = 'Pick a Player'; break;
				case 4:
					switch (this.eventObject.event) {
						case 'Goal': heading = 'Goal Type';	break;
						case 'Penalty': heading = 'Penalty Duration'; break;
					}
				break;
				case 5:
					switch (this.eventObject.event) {
						case 'Goal': heading = 'First Assist'; break;
						case 'Penalty': heading = 'Penalty Type'; break;
					}
				break;
				case -1:
					switch (this.eventObject.event) {
						case 'Goal':
							// straight from penalty shot
							if ( this.eventObject.other.type == 'Penalty Shot' ) {
								heading = 'Goal Type';
							// not from penalty shot
							} else {
								if ( !( this.eventObject.firstParticipant == undefined ) || !( this.eventObject.secondParticipant == undefined ) ) {
									heading = 'Second Assist';
								// first assist is not set	
								} else {
									heading = 'First Assist';
								}
							}
						break;
						case 'Penalty': heading = 'Penalty Category'; break;
					}
				break;
				case -2: heading = 'Confirm Time'; break;
				case -3: heading = 'Change Time (Minutes)';	break;
			}
			// set header
			header.text(heading);
		},

		// createNewCollaboration: function() {
		// 	this.eventObject = {
		// 		event 					: undefined,
		// 		x 						: this.X,
		// 		y 						: this.Y,
		// 		game 					: this.game.o,
		// 		advantage	 			: undefined,
		// 		isGameOfficial 			: this.game.isOfficial,
		// 		isOfficial 				: this.game.isCUOfficial,
		// 		participant				: {
		// 			identification		: undefined,
		// 			sri					: undefined,
		// 			team				: undefined
		// 		},
		// 		firstParticipant		: undefined,
		// 		fpsri					: undefined,
		// 		secondParticipant		: undefined,
		// 		spsri					: undefined,
		// 		oParticipant			: {
		// 			identification		: undefined,
		// 			sri					: undefined,
		// 			team				: undefined
		// 		},
		// 		league 					: this.game.league,
		// 		period 					: ( ( this.game.time.currentPeriod == undefined ) ? 1 : this.game.time.currentPeriod ),
		// 		minutes 				: this.game.time.currentMinutes,
		// 		seconds 				: this.game.time.currentSeconds,
		// 		other 					: {},
		// 		gsri					: this.game.gsri,
		// 		tsri					: [ this.game.home.tsri , this.game.away.tsri ],
		// 	}
		// },


		
		// paginate
		paginate: function(e) {
		
			// loading
			$(e.currentTarget).text('Loading ...');
		
			// increment skip by interval
			feedIntervalSkip += interval;
			
			// get notifications
			var notifications = new Parse.Query(Parse.Object.extend('Request'));
			notifications.equalTo('responseReceived', false);
			notifications.equalTo('invitee', Parse.User.current());
			notifications.include('initiator');
			notifications.include('setUserTeamRelation');
			notifications.include('setUserTeamRelation.user');
			notifications.include('setUserTeamRelation.team');
			notifications.include('setUserTeamRelation.team.createdBy');
			notifications.include('setTeamLeagueRelation');
			notifications.include('setTeamLeagueRelation.team');
			notifications.include('setTeamLeagueRelation.team.createdBy');
			notifications.include('setTeamLeagueRelation.league');
			notifications.include('setTeamLeagueRelation.league.createdBy');
			notifications.include('setGameActiveRoster');
			notifications.include('setGameActiveRoster.game');
			notifications.limit(interval);
			notifications.skip(feedIntervalSkip);
			notifications.find({
				// success
				success: function(requests) {
					// if more than 0 request
					if ( requests.length > 0 ) {
						// loop through notifications
						for ( var r = 0; r < requests.length; r++ ) {
							// current notifications
							var cr = requests[r];
							// get data
							var request	  	  		= cr;
							var type  	  			= cr.get('type');
							var userTeamRelation	= cr.get('setUserTeamRelation');
							var teamLeagueRelation	= cr.get('setTeamLeagueRelation');
							var gameActiveRoster	= cr.get('setGameActiveRoster');
							var initiator			= cr.get('initiator');
							// dislay notifications
							$('#notifications--notifications .loader').before(showNotifications( request , type , userTeamRelation , teamLeagueRelation , gameActiveRoster , initiator ));
						}
						// if less than feed interval
						if ( requests.length < interval ) {
							$('#notifications--notifications .number-of-results').removeClass('hidden');
							$(e.currentTarget)
								.text('Load More Feeds')
								.addClass('hidden');
						// if greater than feed interval	
						} else {
							$(e.currentTarget)
								.text('Load More Feeds')
								.removeClass('hidden');
						}
					// if no requests		
					} else {
						$('#notifications--notifications .number-of-results').removeClass('hidden');
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




	
	var AddPlayersToTeamView = Parse.View.extend({
		
		el: $('[data-app-main]'),
		
		initialize: function() {
		
			// unbind previous events
			$('[data-app-main]').unbind();
			
			// clean up previous state
			cleanUpMemory(state);
			
			// update state
			state = 22;
			
			// binding this to functions that reference this
			_.bindAll(this, 'render');
			
			// render page
			this.render();
			
			// set feed skip rate
			interval = 30;
			feedIntervalSkip = 0;
			
			bearing('ADD PLAYERS', true);

			// roster
			rosterChecked = false;
			rosterID = [];
			rosterNum = [];
			
			// flags
			newPlayerName = false;
			newPlayerPosition = false;
			newPlayerNumber = false;
			
			// create object
			addToTeam = {
				ghost		: undefined,
				person 		: undefined,
				position 	: undefined,
				number 		: undefined
			}
			
			// team's leagues
			teamLeagues = [];


			initInteractiveScorbit(false);
			
			// loading
			setTimeout(function() { $('.loader').addClass('loading'); }, 100);
			
		},
		
		render: function() {
		
			// grabbing template and inserting into el
			var template = _.template( $('#add-players-to-team-view').html() );
			this.$el.html( template );
			
		},
		
		events: {
			
			// pick type
			'click .pick-player-type' : 'defineType',
			
			// searching
			'keyup input#search-for-users' : 'searchForUsers',
			
			// paginate
			'click .paginate' : 'paginate',
			
			// pick user
			'click .invite' : 'pickUser',
			
			// edit user
			'click .edit' : 'editUser',
			
			// checking for name input
			'keyup input.input-name' : 'checkingName',
			
			// pick attributes
			'click .pick-position' : 'pickPosition',
			'click .pick-num' : 'pickNumber',
			
			'submit #create-entity' : 'add'
			
		},
		
		// pick type
		defineType: function(e) {
			
			e.preventDefault();
			
			// hide submit button temporarily
			$('input[type="submit"]')
				.attr('disabled', true)
				.closest('li')
					.addClass('hidden');
			
			// get type
			var type = $(e.currentTarget).attr('data-type');
			// disable
			$(e.currentTarget)
				.attr('disabled', true)
				.removeClass('inactive')
				.siblings('button')
					.addClass('inactive')
					.attr('disabled', true);
					
			// team
			var TeamClass = Parse.Object.extend('Team');
			var team = new TeamClass();
			team.id = document.URL.split('/').splice(-2, 1)[0];
			
			addToTeam = {
				ghost		: undefined,
				person 		: undefined,
				position 	: undefined,
				number 		: undefined
			}
			
			// flags
			newPlayerName = false;
			newPlayerPosition = false;
			newPlayerNumber = false;
			
			// type
			switch ( parseInt(type) ) {
				// create
				case 0:
				
					// ghost
					addToTeam.ghost = true;
				
					// if roster not yet checked
					if ( !rosterChecked ) {
				
						// get pending players
						var pendingPersonell = new Parse.Query(Parse.Object.extend('userOnRoster'));
						pendingPersonell.equalTo('team', team);
						pendingPersonell.equalTo('status', undefined);
						// get verified players
						var verifiedPersonell = new Parse.Query(Parse.Object.extend('userOnRoster'));
						verifiedPersonell.equalTo('team', team);
						verifiedPersonell.equalTo('status', true);
				////////// get roster
						var getRoster = Parse.Query.or(pendingPersonell, verifiedPersonell);		
						getRoster.find({
							// success
							success: function(roster) {
								// enable
								$(e.currentTarget)
									.removeAttr('disabled')
									.siblings('button')
										.removeAttr('disabled');
								// roster checked
								rosterChecked = true;
								// loop
								for ( var r = 0; r < roster.length; r++ ) {
									// if not ghost player
									if ( !( roster[r].get('ghostData') ) )
										// push to roster IDs
										rosterID.push(roster[r].get('user').id);
									// if player
									if ( $.inArray(roster[r].get('role').position, [ 'Head Coach' , 'Assistant Coach' , 'Trainer' ]) == -1 )
										// push to roster numbers
										rosterNum.push(roster[r].get('number'));
								}
								
								// show correct form
								$('div[data-add="create"]').removeClass('hidden');
								$('div[data-add="invite"]').addClass('hidden');
								$('input[type="submit"]').closest('li').removeClass('hidden');
								
								// clear
								$('.num-filters').html('');
								
								// loop
								for ( var i = 0; i < 100; i++ ) {
									// if number already used
									if ( $.inArray(i, rosterNum) != -1 )
										$('.num-filters').append('<button class="pick-num inactive" disabled="disabled" data-num="' + i + '">' + i + '</button>');
									else
										$('.num-filters').append('<button class="pick-num" data-num="' + i + '">' + i + '</button>');
								}
								
							},
							// error
							error: function(err) {}
						});
					
					// if roster already checked
					} else {
					
						// enable
						$(e.currentTarget)
							.removeAttr('disabled')
							.siblings('button')
								.removeAttr('disabled');
						
						// show correct form
						$('div[data-add="create"]').removeClass('hidden');
						$('div[data-add="invite"]').addClass('hidden');
						$('input[type="submit"]').closest('li').removeClass('hidden');
						
						// clear name
						$('input.input-name').val('');
						
						// enable pick position
						$('button.pick-position').removeClass('inactive');
								
						// clear
						$('.num-filters').html('');
								
						// loop
						for ( var i = 0; i < 100; i++ ) {
							// if number already used
							if ( $.inArray(i, rosterNum) != -1 )
								$('.num-filters').append('<button class="pick-num inactive" disabled="disabled" data-num="' + i + '">' + i + '</button>');
							else
								$('.num-filters').append('<button class="pick-num" data-num="' + i + '">' + i + '</button>');
						}
					
					}
				
				break;
				// invite
				case 1:
				
					// not a ghost
					addToTeam.ghost = false;
					
					// if roster not yet checked
					if ( !rosterChecked ) {
				
						// get pending players
						var pendingPersonell = new Parse.Query(Parse.Object.extend('userOnRoster'));
						pendingPersonell.equalTo('team', team);
						pendingPersonell.equalTo('status', undefined);
						// get verified players
						var verifiedPersonell = new Parse.Query(Parse.Object.extend('userOnRoster'));
						verifiedPersonell.equalTo('team', team);
						verifiedPersonell.equalTo('status', true);
				////////// get roster
						var getRoster = Parse.Query.or(pendingPersonell, verifiedPersonell);		
						getRoster.find({
							// success
							success: function(roster) {
								// enable
								$(e.currentTarget)
									.removeAttr('disabled')
									.siblings('button')
										.removeAttr('disabled');
								// roster checked
								rosterChecked = true;
								// loop
								for ( var r = 0; r < roster.length; r++ ) {
									// if not ghost player
									if ( !( roster[r].get('ghostData') ) )
										// push to roster IDs
										rosterID.push(roster[r].get('user').id);
									// if player
									if ( $.inArray(roster[r].get('role').position, [ 'Head Coach' , 'Assistant Coach' , 'Trainer' ]) == -1 )
										// push to roster numbers
										rosterNum.push(parseInt(roster[r].get('number')));
								}
								
								$('input#search-for-users')
									.val('')
									.focus();
								
								// show correct form
								$('div[data-add="invite"]').removeClass('hidden');
								$('div[data-add="create"]').addClass('hidden');
								
							},
							// error
							error: function(err) {}
						});
					
					// if roster already checked
					} else {
					
						// enable
						$(e.currentTarget)
							.removeAttr('disabled')
							.siblings('button')
								.removeAttr('disabled');
						
						// show correct form
						$('div[data-add="invite"]').removeClass('hidden');
						$('div[data-add="create"]').addClass('hidden');
						
						$('input#search-for-users')
							.val('')
							.focus();
						
						// hide li
						$('div[data-add="invite"]')
							.children('li').each(function() {
								if ( $(this).hasClass('no-padding') ) $(this).removeClass('hidden');
								else $(this).addClass('hidden');
							});
							
						$('.user-search-results')
							.children('li')
								.remove()
									.end()
							.children()
								.addClass('hidden');
					
					}
				
				break;
			}
			
		},
		
		// searching users
		searchForUsers: function(e) {
			
			// clear list
			$('div.user-search-results li').remove();
			$('button.paginate').addClass('hidden');
			// search value
			var sv = $(e.currentTarget).val();
			// if no value
			if ( sv == '' || sv == false ) {
				// search for people
				$('div.user-search-results')
					.children()
						.addClass('hidden');
				// clear previous instance of the search	
				window.clearTimeout(userSearchTimeout);
				return false;
			// if value
			} else {
				// loading gif
				$('div.user-search-results .loader')
					.removeClass('hidden')
					.siblings('.number-of-results')
						.addClass('hidden');
			}
			// clear previous instance of the search	
			window.clearTimeout(userSearchTimeout);
			// if value		
			if ( !( sv == '' || sv == false ) ) {
				// start timeout for search	
				userSearchTimeout = window.setTimeout(function() {
					
					// set feed skip rate
					interval = 30;
					feedIntervalSkip = 0;
					
					// by name
					var searchForUserByName = new Parse.Query(Parse.Object.extend('User'));
					searchForUserByName.startsWith( 'name' , sv );
					
					// by case-insensitive name
					var searchForUserByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('User'));
					searchForUserByNameCaseInsensitive.startsWith( 'searchName' , sv );
					
					// by username
					var searchForUserByUsername = new Parse.Query(Parse.Object.extend('User'));
					searchForUserByUsername.startsWith( 'username' , sv );
					
					// by case-insensitive username
					var searchForUserByUsernameCaseInsensitive = new Parse.Query(Parse.Object.extend('User'));
					searchForUserByUsernameCaseInsensitive.startsWith( 'searchUsername' , sv );
					
					// by hometown
					var searchForUserByHometown = new Parse.Query(Parse.Object.extend('User'));
					searchForUserByHometown.startsWith( 'hometown' , sv );
					
					// by case-insensitive hometown
					var searchForUserByHometownCaseInsensitive = new Parse.Query(Parse.Object.extend('User'));
					searchForUserByHometownCaseInsensitive.startsWith( 'searchHometown' , sv );
					
					var searchForUsers = Parse.Query.or( searchForUserByName , searchForUserByNameCaseInsensitive , searchForUserByUsername , searchForUserByUsernameCaseInsensitive , searchForUserByHometown , searchForUserByHometownCaseInsensitive );
							
			////////// get users
					searchForUsers.limit(interval);
					searchForUsers.find({
						// success
						success: function(users) {
							// !(if no users)
							if ( users.length > 0 ) {
								for ( var u = 0; u < users.length; u++ ) {
									// if not already invited
									if ( $.inArray(users[u].id, rosterID) == -1 )
										$('div.user-search-results .loader').before('<li class="result cf" data-value="' + users[u].id + '"><span class="message"></span><a href="#/' + users[u].get('username') + '" class="cf"><span class="avatar"><img src="' + ( ( users[u].attributes['profilePicture'] == undefined || users[u].attributes['profilePicture'] == null ) ? 'images/default.png' : users[u].attributes['profilePicture'].url() ) + '" /></span><span class="result-identification"><h3>' + users[u].get('name') + '</h3><p>@' + users[u].get('username') + '</p></span><button class="invite">&#xf003;</button></a></li>');
								}
								// if less than feed interval
								if ( users.length < interval ) {
									$('div.user-search-results .number-of-results')
										.removeClass('hidden')
										.text('No More Results')
									$('div.user-search-results .loader').addClass('hidden');
								// if greater than feed interval	
								} else {
									$('div.user-search-results .paginate').removeClass('hidden');
									$('div.user-search-results .loader').addClass('hidden');
								}
							// if no teams
							} else {
								// no people
								$('div.user-search-results .number-of-results')
									.removeClass('hidden')
									.text('No results for "' + sv + '". Keep in mind that searches are case sensitive.');
								$('div.user-search-results .loader').addClass('hidden');
							}
						},
						// error
						error: function(error) {}
					});
						
				}, 500);	
					
			}
			
		},
		
		// paginate
		paginate: function(e) {
		
			e.preventDefault();
			
			// loading
			$(e.currentTarget).text('Loading ...');
			
			// get search value
			var sv = $('input#search-for-users').val();
		
			// increment skip by interval
			feedIntervalSkip += interval;
			
			// by name
			var searchForUserByName = new Parse.Query(Parse.Object.extend('User'));
			searchForUserByName.startsWith( 'name' , sv );
			
			// by case-insensitive name
			var searchForUserByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('User'));
			searchForUserByNameCaseInsensitive.startsWith( 'searchName' , sv );
			
			// by username
			var searchForUserByUsername = new Parse.Query(Parse.Object.extend('User'));
			searchForUserByUsername.startsWith( 'username' , sv );
			
			// by case-insensitive username
			var searchForUserByUsernameCaseInsensitive = new Parse.Query(Parse.Object.extend('User'));
			searchForUserByUsernameCaseInsensitive.startsWith( 'searchUsername' , sv );
			
			// by hometown
			var searchForUserByHometown = new Parse.Query(Parse.Object.extend('User'));
			searchForUserByHometown.startsWith( 'hometown' , sv );
			
			// by case-insensitive hometown
			var searchForUserByHometownCaseInsensitive = new Parse.Query(Parse.Object.extend('User'));
			searchForUserByHometownCaseInsensitive.startsWith( 'searchHometown' , sv );
			
			var searchForUsers = Parse.Query.or( searchForUserByName , searchForUserByNameCaseInsensitive , searchForUserByUsername , searchForUserByUsernameCaseInsensitive , searchForUserByHometown , searchForUserByHometownCaseInsensitive );
					
			// get users
			searchForUsers.limit(interval);
			searchForUsers.skip(feedIntervalSkip);
			searchForUsers.find({
				// success
				success: function(users) {
					// !(if no users)
					if ( users.length > 0 ) {
						for ( var u = 0; u < users.length; u++ ) {
							// if not already invited
							if ( $.inArray(users[u].id, rosterID) == -1 )
								$('div.user-search-results .loader').before('<li class="result cf" data-value="' + users[u].id + '"><span class="message"></span><a href="#/' + users[u].get('username') + '" class="cf"><span class="avatar"><img src="' + ( ( users[u].attributes['profilePicture'] == undefined || users[u].attributes['profilePicture'] == null ) ? 'images/default.png' : users[u].attributes['profilePicture'].url() ) + '" /></span><span class="result-identification"><h3>' + users[u].get('name') + '</h3><p>@' + users[u].get('username') + '</p></span><button class="invite">&#xf003;</button></a></li>');
						}
						// if less than feed interval
						if ( users.length < interval ) {
							$('div.user-search-results .number-of-results')
								.removeClass('hidden')
								.text('No More Users');
							$(e.currentTarget)
								.text('Load More Users')
								.addClass('hidden');
						// if greater than feed interval	
						} else {
							$(e.currentTarget)
								.text('Load More Feeds')
								.removeClass('hidden');
						}
					// if no teams
					} else {
						// no people
						$('div.user-search-results .number-of-results')
							.removeClass('hidden')
							.text('No More Users');
						$(e.currentTarget)
							.text('Load More Feeds')
							.addClass('hidden');
					}
				},
				// error
				error: function(error) {}
			});
			
		},
		
		// pick user
		pickUser: function(e) {
			
			e.preventDefault();
			
			// ready
			newPlayerName = true;
			
			// data
			addToTeam.person = $(e.currentTarget).closest('li').attr('data-value');
			
			// hide ui
			$(e.currentTarget)
				.addClass('edit')
				.html('&#xf040;')
				.closest('li')
					.siblings('li, .loader, .paginate, .number-of-results')
						.addClass('hidden')
							.end()
					.siblings('label')
						.removeClass('hidden');
						
			// hide search
			$(e.currentTarget)
				.closest('.user-search-results')
					.siblings('li.no-padding')
						.addClass('hidden')
							.end()
					.siblings('li:not(.no-padding)')
						.removeClass('hidden');
						
			// enable pick position
			$('button.pick-position').removeClass('inactive');			
						
			// clear
			$('.num-filters').html('');
								
			// loop
			for ( var i = 0; i < 100; i++ ) {
				// if number already used
				if ( $.inArray(i, rosterNum) != -1 )
					$('.num-filters').append('<button class="pick-num inactive" disabled="disabled" data-num="' + i + '">' + i + '</button>');
				else
					$('.num-filters').append('<button class="pick-num" data-num="' + i + '">' + i + '</button>');
			}
			
			// create button
			$('input[type="submit"]').closest('li').removeClass('hidden');
			
		},
		
		// edit user
		editUser: function(e) {
		
			e.preventDefault();
			
			// ready
			newPlayerName = false;
			// disable
			$('input[type="submit"]').attr('disabled', true);
			
			// data
			addToTeam.person = undefined;
			addToTeam.position = undefined;
			addToTeam.number = undefined;
			
			// hide ui
			$(e.currentTarget)
				.addClass('invite')
				.removeClass('edit')
				.html('&#xf003;')
				.closest('li')
					.siblings('li, .paginate')
						.removeClass('hidden')
							.end()
					.siblings('label')
						.addClass('hidden');
						
			// hide search
			$(e.currentTarget)
				.closest('.user-search-results')
					.siblings('li.no-padding')
						.removeClass('hidden')
							.end()
					.siblings('li:not(.no-padding)')
						.addClass('hidden');
			
			// create button
			$('input[type="submit"]').closest('li').addClass('hidden');
			
		},
		
		// checking name
		checkingName: function(e) {
			
			// current value
			var currentValue = $(e.currentTarget).val();
			
			addToTeam.person = currentValue;
			
			// if nothing
			if ( currentValue == '' || currentValue == false ) {
				// not ready
				newPlayerName = false;
				// disable
				$(e.currentTarget).closest('form')
					.find('input[type="submit"]')
						.attr('disabled', true);
			} else {
				// ready
				newPlayerName = true
				// if others ready
				if ( $.inArray(addToTeam.position, [ 'Head Coach' , 'Assistant Coach' , 'Trainer' ]) != -1 ) {
					if ( newPlayerPosition )
						// enable
						$(e.currentTarget).closest('form')
							.find('input[type="submit"]')
								.removeAttr('disabled');
				} else {
					if ( newPlayerPosition && newPlayerNumber )
						// enable
						$(e.currentTarget).closest('form')
							.find('input[type="submit"]')
								.removeAttr('disabled');
				}
			}
			
		},
		
		// pick position
		pickPosition: function(e) {
			
			e.preventDefault();
			
			// data
			var data = $(e.currentTarget).attr('data-position');
			
			// number undefined
			addToTeam.number = undefined;
			
			// if position already chosen
			if ( addToTeam.position != undefined && addToTeam.position == data ) {
				addToTeam.position = undefined;
				// make all active
				$(e.currentTarget)
					.removeClass('inactive')
					.siblings('button.pick-position')
						.removeClass('inactive');
				// make all valid numbers active
				$('button.pick-num').each(function() {
					if ( $.inArray(parseInt($(this).attr('data-num')), rosterNum) != -1 ) {
						$(this)
							.attr('disabled', true)
							.addClass('inactive');
					} else {
						$(this)
							.removeAttr('disabled')
							.removeClass('inactive');
					}
				});
				// not ready
				newPlayerPosition = false;
				// disable
				$(e.currentTarget).closest('form')
					.find('input[type="submit"]')
						.attr('disabled', true);
			// if position not already chosen	
			} else {
				addToTeam.position = data;
				// ready
				newPlayerPosition = true;
				$(e.currentTarget)
					.removeClass('inactive')
					.siblings('button.pick-position')
						.addClass('inactive');
				// if position picked is 'executive'
				if ( $.inArray(data, [ 'Head Coach' , 'Assistant Coach' , 'Trainer' ]) != -1 ) {
					// disable all number
					$('button.pick-num')
						.attr('disabled', true)
						.addClass('inactive');
					// if others ready
					if ( newPlayerName )
						// enable
						$(e.currentTarget).closest('form')
							.find('input[type="submit"]')
								.removeAttr('disabled');
				} else {
					// disable
					$(e.currentTarget).closest('form')
						.find('input[type="submit"]')
							.attr('disabled', true);
					// make all valid numbers active
					$('button.pick-num').each(function() {
						if ( $.inArray(parseInt($(this).attr('data-num')), rosterNum) != -1 ) {
							$(this)
								.attr('disabled', true)
								.addClass('inactive');
						} else {
							$(this)
								.removeAttr('disabled')
								.removeClass('inactive');
						}
					});
				}
			}
			
		},
		
		// pick number
		pickNumber: function(e) {
			
			e.preventDefault();
			
			// data
			var data = $(e.currentTarget).attr('data-num');
			
			// if current already picked
			if ( addToTeam.number != undefined && addToTeam.number == data ) {
				addToTeam.number = undefined;
				// make all active
				$(e.currentTarget)
					.removeAttr('disabled')
					.removeClass('inactive')
						.siblings('button.pick-num').each(function() {
							if ( $.inArray(parseInt($(this).attr('data-num')), rosterNum) != -1 ) {
								$(this)
									.attr('disabled', true)
									.addClass('inactive');
							} else {
								$(this)
									.removeAttr('disabled')
									.removeClass('inactive');
							}
						});
				// not ready
				newPlayerNumber = false;
				// disable
				$(e.currentTarget).closest('form')
					.find('input[type="submit"]')
						.attr('disabled', true);
			} else {
				addToTeam.number = data;
				// make inactive
				$(e.currentTarget)
					.removeClass('inactive')
					.siblings('button.pick-num')
						.addClass('inactive');
				// ready
				newPlayerNumber = true;
				// if others ready
				if ( newPlayerName && newPlayerPosition )
					// enable
					$(e.currentTarget).closest('form')
						.find('input[type="submit"]')
							.removeAttr('disabled');
			}
			
		},
		
		// add player
		add: function(e) {
			
			e.preventDefault();
			
			// if ghost
			if ( addToTeam.ghost ) {
			
				// if player
				if ( $.inArray(addToTeam.position, [ 'Head Coach' , 'Assistant Coach' , 'Trainer' ]) == -1 ) {
					
					// if everything ready
					if ( newPlayerName && newPlayerPosition && newPlayerNumber ) {
						
						// creating
						$(e.currentTarget)
							.find('input[type="submit"]')
							.attr('disabled', true)
							.val('Creating ...');
						
						// new roster member
						var userOnRosterClass = Parse.Object.extend('userOnRoster');
						var nrm = new userOnRosterClass();
						// new team object
						var TeamClass = Parse.Object.extend('Team');
						var team = new TeamClass();
						team.id = document.URL.split('/').splice(-2, 1)[0];
						// set ACL
						var ACL = new Parse.ACL();
						ACL.setPublicReadAccess(true);
						ACL.setPublicWriteAccess(false);
						ACL.setReadAccess( Parse.User.current() , true );
						ACL.setWriteAccess( Parse.User.current() , true );
						// set new roster member information
						nrm.set('number', parseInt(addToTeam.number));
						nrm.set('role', { 'position' : addToTeam.position });
						nrm.set('status', true);
						nrm.set('ghostData', true);
						nrm.set('ghostObject', { 'name' : addToTeam.person });
						nrm.set('team', team);
						nrm.set('user', null);
						nrm.set('responseReceived', null);
						nrm.setACL( ACL );
				////////// save new member
						nrm.save({
							// success
							success: function(newMember) {
								// push to roster numbers
								rosterNum.push(parseInt(newMember.get('number')));
								// search for leagues
								var getLeagues = new Parse.Query(Parse.Object.extend('teamInLeague'));
								getLeagues.equalTo('team', team);
								getLeagues.equalTo('status' , true);
								getLeagues.include('league');
								getLeagues.find({
									// success
									success: function(leagues) {
										// new records
										var playerRecords = [];
										// loop
										for ( var l = 0; l < leagues.length; l++ ) {
											// league
											var LeagueClass = Parse.Object.extend('League');
											var league = new LeagueClass();
											league.id = leagues[l].attributes['league'].id;
											// new record
											var UserStatisticRecordClass = Parse.Object.extend('userStatisticRecord');
											var nr = new UserStatisticRecordClass();
											// ACL
											var ACL = new Parse.ACL();
											ACL.setPublicReadAccess(true);
											ACL.setPublicWriteAccess(false);
											// set attributes
											nr.set('team', team);
											nr.set('league', league);
											nr.set('rosterMember', newMember);
											nr.set('GP', 0);
											nr.set('G', 0);
											nr.set('A', 0);
											nr.set('TP', 0);
											nr.set('PIM', 0);
											nr.set('H', 0);
											nr.set('S', 0);
											nr.set('TA', 0);
											nr.set('F', 0);
											nr.set('FW', 0);
											nr.set('MIN', 0);
											nr.set('GA', 0);
											nr.set('SA', 0);
											nr.set('SV', 0);
											nr.set('W', 0);
											nr.set('L', 0);
											nr.set('T', 0);
											nr.set('SO', 0);
											nr.set('user', null);
											nr.set('goalie', ( ( $.inArray(newMember.attributes['role'].position, [ 'Goalie' ]) != -1 ) ? true : false ));
											nr.setACL( ACL );
											// push
											playerRecords.push(nr);
										}
										// save
										Parse.Object.saveAll(playerRecords, {
											// success
											success: function(records) {
												// not ready
												newPlayerName = false;
												newPlayerPosition = false;
												newPlayerNumber = false;
												// create object
												addToTeam = {
													ghost		: undefined,
													person 		: undefined,
													position 	: undefined,
													number 		: undefined
												}
												// creating
												$(e.currentTarget)
													.find('input[type="submit"]')
													.attr('disabled', true)
													.val('Create')
													.closest('li')
														.addClass('hidden');
												// hide
												$('div[data-add="create"]').addClass('hidden');
												$('div[data-add="invite"]').addClass('hidden');
												// header
												$('header[role="create"]').text('Success! Add another player?');
												// pick player
												$('button.pick-player-type').removeClass('inactive');
											},
											// error
											error: function(err) {}
										});
									},
									// error
									error: function(err) {}
								});
							},
							// error
							error: function(err) {}
						});
							
					}
					
				// if 'executive'	
				} else {
					
					// if everything ready
					if ( newPlayerName && newPlayerPosition ) {
						
						// creating
						$(e.currentTarget)
							.find('input[type="submit"]')
							.attr('disabled', true)
							.val('Creating ...');
						
						// new roster member
						var userOnRosterClass = Parse.Object.extend('userOnRoster');
						var nrm = new userOnRosterClass();
						// new team object
						var TeamClass = Parse.Object.extend('Team');
						var team = new TeamClass();
						team.id = document.URL.split('/').splice(-2, 1)[0];
						// set ACL
						var ACL = new Parse.ACL();
						ACL.setPublicReadAccess(true);
						ACL.setPublicWriteAccess(false);
						ACL.setReadAccess( Parse.User.current() , true );
						ACL.setWriteAccess( Parse.User.current() , true );
						// set new roster member information
						nrm.set('number', null);
						nrm.set('role', { 'position' : addToTeam.position });
						nrm.set('status', true);
						nrm.set('ghostData', true);
						nrm.set('ghostObject', { 'name' : addToTeam.person });
						nrm.set('team', team);
						nrm.set('user', null);
						nrm.set('responseReceived', null);
						nrm.setACL( ACL );
				////////// save new member
						nrm.save({
							// success
							success: function(newMember) {
								// not ready
								newPlayerName = false;
								newPlayerPosition = false;
								newPlayerNumber = false;
								// create object
								addToTeam = {
									ghost		: undefined,
									person 		: undefined,
									position 	: undefined,
									number 		: undefined
								}
								// creating
								$(e.currentTarget)
									.find('input[type="submit"]')
									.attr('disabled', true)
									.val('Create')
									.closest('li')
										.addClass('hidden');
								// hide
								$('div[data-add="create"]').addClass('hidden');
								$('div[data-add="invite"]').addClass('hidden');
								// header
								$('header[role="create"]').text('Success! Add another player?');
								// pick player
								$('button.pick-player-type').removeClass('inactive');
							},
							// error
							error: function(err) {}
						});
						
					}
					
				}
			
			// if not ghost	
			} else {
				
				// if player
				if ( $.inArray(addToTeam.position, [ 'Head Coach' , 'Assistant Coach' , 'Trainer' ]) == -1 ) {
				
					// if everything ready
					if ( newPlayerName && newPlayerPosition && newPlayerNumber ) {
					
						// creating
						$(e.currentTarget)
							.find('input[type="submit"]')
							.attr('disabled', true)
							.val('Creating ...');
						
						// user
						var UserClass = Parse.User;
						var user = new UserClass();
						user.id = addToTeam.person;
						// new roster member
						var userOnRosterClass = Parse.Object.extend('userOnRoster');
						var nrm = new userOnRosterClass();
						// new team object
						var TeamClass = Parse.Object.extend('Team');
						var team = new TeamClass();
						team.id = document.URL.split('/').splice(-2, 1)[0];
						// set ACL
						var ACL = new Parse.ACL();
						ACL.setPublicReadAccess(true);
						ACL.setPublicWriteAccess(false);
						ACL.setReadAccess( Parse.User.current() , true );
						ACL.setWriteAccess( Parse.User.current() , true );
						ACL.setReadAccess( user , true );
						ACL.setWriteAccess( user , true );
						// set new roster member information
						nrm.set('number', parseInt(addToTeam.number));
						nrm.set('role', { 'position' : addToTeam.position });
						nrm.set('status', undefined);
						nrm.set('ghostData', false);
						nrm.set('ghostObject', null);
						nrm.set('team', team);
						nrm.set('user', user);
						nrm.set('responseReceived', false);
						nrm.setACL( ACL );
				////////// save new member
						nrm.save({
							// success
							success: function(newMember) {
								// push to roster ID
								rosterID.push(addToTeam.person);
								// push to roster numbers
								rosterNum.push(parseInt(newMember.get('number')));
								// new request object
								var request = Parse.Object.extend('Request');
								var newRequest = new request();
								// set new ACL
								var newACL = new Parse.ACL();
								newACL.setPublicReadAccess(false);
								newACL.setPublicWriteAccess(false);
								newACL.setReadAccess( Parse.User.current() , true );
								newACL.setReadAccess( user , true );
								newACL.setWriteAccess( user , true );
								// set request
								newRequest.set('initiator', Parse.User.current() );
								newRequest.set('invitee', user);
								newRequest.set('type', 0);
								newRequest.set('response', undefined);
								newRequest.set('responseReceived', false);
								newRequest.set('setUserTeamRelation', newMember);
								newRequest.set('setTeamLeagueRelation', null);
								newRequest.set('setGameActiveRoster', null );
								newRequest.setACL(newACL);
						////////// send request
								newRequest.save(null, {
									// success
									success: function(request) {
										// not ready
										newPlayerName = false;
										newPlayerPosition = false;
										newPlayerNumber = false;
										// create object
										addToTeam = {
											ghost		: undefined,
											person 		: undefined,
											position 	: undefined,
											number 		: undefined
										}
										// creating
										$(e.currentTarget)
											.find('input[type="submit"]')
											.attr('disabled', true)
											.val('Create')
											.closest('li')
												.addClass('hidden');
										// hide
										$('div[data-add="create"]').addClass('hidden');
										$('div[data-add="invite"]').addClass('hidden');
										// header
										$('header[role="create"]').text('Success! Add another player?');
										// pick player
										$('button.pick-player-type').removeClass('inactive');
									},
									// error
									error: function(error) {}
								});
							},
							// error
							error: function(err) {}
						});
							
					}
				
				// if 'executive'	
				} else {
				
					// if everything ready
					if ( newPlayerName && newPlayerPosition ) {
					
						// creating
						$(e.currentTarget)
							.find('input[type="submit"]')
							.attr('disabled', true)
							.val('Creating ...');
						
						// user
						var UserClass = Parse.User;
						var user = new UserClass();
						user.id = addToTeam.person;
						// new roster member
						var userOnRosterClass = Parse.Object.extend('userOnRoster');
						var nrm = new userOnRosterClass();
						// new team object
						var TeamClass = Parse.Object.extend('Team');
						var team = new TeamClass();
						team.id = document.URL.split('/').splice(-2, 1)[0];
						// set ACL
						var ACL = new Parse.ACL();
						ACL.setPublicReadAccess(true);
						ACL.setPublicWriteAccess(false);
						ACL.setReadAccess( Parse.User.current() , true );
						ACL.setWriteAccess( Parse.User.current() , true );
						ACL.setReadAccess( user , true );
						ACL.setWriteAccess( user , true );
						// set new roster member information
						nrm.set('number', null);
						nrm.set('role', { 'position' : addToTeam.position });
						nrm.set('status', undefined);
						nrm.set('ghostData', false);
						nrm.set('ghostObject', null);
						nrm.set('team', team);
						nrm.set('user', user);
						nrm.set('responseReceived', false);
						nrm.setACL( ACL );
				////////// save new member
						nrm.save({
							// success
							success: function(newMember) {
								// push to roster ID
								rosterID.push(addToTeam.person);
								// new request object
								var request = Parse.Object.extend('Request');
								var newRequest = new request();
								// set new ACL
								var newACL = new Parse.ACL();
								newACL.setPublicReadAccess(false);
								newACL.setPublicWriteAccess(false);
								newACL.setReadAccess( Parse.User.current() , true );
								newACL.setReadAccess( user , true );
								newACL.setWriteAccess( user , true );
								// set request
								newRequest.set('initiator', Parse.User.current() );
								newRequest.set('invitee', user);
								newRequest.set('type', 0);
								newRequest.set('response', undefined);
								newRequest.set('responseReceived', false);
								newRequest.set('setUserTeamRelation', newMember);
								newRequest.set('setTeamLeagueRelation', null);
								newRequest.set('setGameActiveRoster', null );
								newRequest.setACL(newACL);
						////////// send request
								newRequest.save(null, {
									// success
									success: function(request) {
										// not ready
										newPlayerName = false;
										newPlayerPosition = false;
										newPlayerNumber = false;
										// create object
										addToTeam = {
											ghost		: undefined,
											person 		: undefined,
											position 	: undefined,
											number 		: undefined
										}
										// creating
										$(e.currentTarget)
											.find('input[type="submit"]')
											.attr('disabled', true)
											.val('Create')
											.closest('li')
												.addClass('hidden');
										// hide
										$('div[data-add="create"]').addClass('hidden');
										$('div[data-add="invite"]').addClass('hidden');
										// header
										$('header[role="create"]').text('Success! Add another player?');
										// pick player
										$('button.pick-player-type').removeClass('inactive');
									},
									// error
									error: function(error) {}
								});
							},
							// error
							error: function(err) {}
						});
							
					}
				
				}
				
			}
			
		}
		
	});


	
	// Invite Team To League View
	var InviteTeamToLeagueView = Parse.View.extend({
		
		el: $('[data-app-main]'),
		
		initialize: function() {
		
			// unbind previous events
			$('[data-app-main]').unbind();
			
			// clean up previous state
			cleanUpMemory(state);
			
			// update state
			state = 22;
			
			// binding this to functions that reference this
			_.bindAll(this, 'render');
			
			// render page
			this.render();
			
			teamsInLeague = [];
			
			// set feed skip rate
			interval = 30;
			feedIntervalSkip = 0;
			
			// loading
			setTimeout(function() { $('.loader').addClass('loading'); }, 100);

			bearing('INVITE', true);

			initInteractiveScorbit(false);
			
		},
		
		render: function() {
		
			// grabbing template and inserting into el
			var template = _.template( $('#invite-team-to-league-view').html() );
			this.$el.html( template );
			
		},
		
		events: {
		
			// searching
			'keyup input#search-for-teams' : 'searchForTeams',
			
			// invite
			'click .invite' : 'inviteTeam',
			
			// paginate
			'click .paginate' : 'paginate'
			
		},
		
		// searching teams
		searchForTeams: function(e) {
			
			// clear list
			$('div.team-search-results li').remove();
			$('button.paginate').addClass('hidden');
			// search value
			var sv = $(e.currentTarget).val();
			// if no value
			if ( sv == '' || sv == false ) {
				// search for people
				$('div.team-search-results')
					.children()
						.addClass('hidden');
				// clear previous instance of the search	
				window.clearTimeout(teamSearchTimeout);
				return false;
			// if value
			} else {
				// loading gif
				$('div.team-search-results .loader')
					.removeClass('hidden')
					.siblings('.number-of-results')
						.addClass('hidden');
			}
			// clear previous instance of the search	
			window.clearTimeout(teamSearchTimeout);
			// if value		
			if ( !( sv == '' || sv == false ) ) {
				// start timeout for search	
				teamSearchTimeout = window.setTimeout(function() {
					
					// set feed skip rate
					interval = 30;
					feedIntervalSkip = 0;
					
					// by name
					var searchForTeamByName = new Parse.Query(Parse.Object.extend('Team'));
					searchForTeamByName.startsWith( 'name' , sv );
							
					// by case-insensitive name
					var searchForTeamByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
					searchForTeamByNameCaseInsensitive.startsWith( 'searchName' , sv );
							
					// by age group
					var searchForTeamByAgeGroup = new Parse.Query(Parse.Object.extend('Team'));
					searchForTeamByAgeGroup.startsWith( 'ageGroup' , sv );
							
					// by case-insensitive age group
					var searchForTeamByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
					searchForTeamByAgeGroupCaseInsensitive.startsWith( 'searchAgeGroup' , sv );
							
					// by level
					var searchForTeamByLevel = new Parse.Query(Parse.Object.extend('Team'));
					searchForTeamByLevel.startsWith( 'level' , sv );
							
					// by case-insensitive level
					var searchForTeamByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
					searchForTeamByLevelCaseInsensitive.startsWith( 'searchLevel' , sv );
							
					// by year
					var searchForTeamByYear = new Parse.Query(Parse.Object.extend('Team'));
					searchForTeamByYear.startsWith( 'year' , sv );
							
					// by hometown
					var searchForTeamByHometown = new Parse.Query(Parse.Object.extend('Team'));
					searchForTeamByHometown.startsWith( 'hometown' , sv );
							
					// by case-insensitive hometown
					var searchForTeamByHometownCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
					searchForTeamByHometownCaseInsensitive.startsWith( 'searchHometown' , sv );
							
					// by creator by name
					var teamCreatorByName = new Parse.Query(Parse.User);
					teamCreatorByName.startsWith( 'name' , sv );
					var searchForTeamByCreatorByName = new Parse.Query(Parse.Object.extend('Team'));
					searchForTeamByCreatorByName.matchesQuery( 'createdBy' , teamCreatorByName );
							
					// by creator by case-insensitive name - overlaps with proceeding queries
							
					// by creator by username
					var teamCreatorByUsername = new Parse.Query(Parse.User);
					teamCreatorByUsername.startsWith( 'username' , sv );
					var searchForTeamByCreatorByUsername = new Parse.Query(Parse.Object.extend('Team'));
					searchForTeamByCreatorByUsername.matchesQuery( 'createdBy' , teamCreatorByUsername );
							
					// by creator by case-insensitive username - overlaps
							
					var searchForTeams = Parse.Query.or( searchForTeamByName , searchForTeamByNameCaseInsensitive , searchForTeamByAgeGroup , searchForTeamByAgeGroupCaseInsensitive , searchForTeamByLevel , searchForTeamByLevelCaseInsensitive , searchForTeamByYear , searchForTeamByHometown , searchForTeamByHometownCaseInsensitive , searchForTeamByCreatorByName , searchForTeamByCreatorByUsername );
							
			////////// get teams
					searchForTeams.include('createdBy');
					searchForTeams.limit(interval);
					searchForTeams.find({
						// success
						success: function(teams) {
							// !(if no teams)
							if ( teams.length > 0 ) {
								for ( var u = 0; u < teams.length; u++ ) {
									// if not already invited
									if ( $.inArray(teams[u].id, teamsInLeague) == -1 )
										$('div.team-search-results .loader').before('<li class="result cf" data-value="' + teams[u].id + '" data-creator="' + teams[u].get('createdBy').id + '"><span class="message"></span><a href="#/team/' + teams[u].id + '" class="cf"><span class="avatar"><img src="' + ( ( teams[u].attributes['profilePicture'] == undefined || teams[u].attributes['profilePicture'] == null ) ? 'images/default.png' : teams[u].attributes['profilePicture'].url() ) + '" /></span><span class="result-identification"><h3>' + teams[u].get('name') + ' <span class="team-result-classification">' + ( ( teams[u].get('competitiveCategory') == undefined || teams[u].get('competitiveCategory') == null ) ? '' : teams[u].get('competitiveCategory') ) + '</span></h3><p>Created By @' + teams[u].get('createdBy').attributes['username'] + '</p></span><button class="invite">&#xf003;</button></a></li>');
								}
								// if less than feed interval
								if ( teams.length < interval ) {
									$('div.team-search-results .number-of-results')
										.removeClass('hidden')
										.text('No More Results')
									$('div.team-search-results .loader').addClass('hidden');
								// if greater than feed interval	
								} else {
									$('div.team-search-results .paginate').removeClass('hidden');
									$('div.team-search-results .loader').addClass('hidden');
								}
							// if no teams
							} else {
								// no people
								$('div.team-search-results .number-of-results')
									.removeClass('hidden')
									.text('No results for "' + sv + '". Keep in mind that searches are case sensitive.');
								$('div.team-search-results .loader').addClass('hidden');
							}
						},
						// error
						error: function(error) {}
					});
						
				}, 500);	
					
			}
			
		},
		
		// invite
		inviteTeam: function(e) {
		
			e.preventDefault();
			e.stopPropagation();
			// disabled
			$(e.currentTarget).attr('disabled', true);
			$('input#search-for-teams').attr('disabled', true);
			// loading
			$(e.currentTarget)
				.closest('li')
					.children('.message')
						.addClass('loading')
						.text('Sending Invitation ...');
			// team id
			var tid = $(e.currentTarget).closest('li').attr('data-value');
			var cid = $(e.currentTarget).closest('li').attr('data-creator');
			// if teams of league not already collected
			if ( teamsInLeague.length == 0 ) {
				// league
				var LeagueClass = Parse.Object.extend('League');
				var league = new LeagueClass();
				league.id = document.URL.split('/').splice(-2, 1)[0];
				// teams of league that are pending
				var pendingTeams = new Parse.Query(Parse.Object.extend('teamInLeague'));
				pendingTeams.equalTo('league', league);
				pendingTeams.equalTo('status', undefined);
				// teams of league that are not pending
				var verifiedTeams = new Parse.Query(Parse.Object.extend('teamInLeague'));
				verifiedTeams.equalTo('league', league);
				verifiedTeams.equalTo('status', true);
		////////// get teams of league
				var teamsOfLeague = Parse.Query.or(pendingTeams, verifiedTeams);
				teamsOfLeague.include('team');
				teamsOfLeague.find({
					// success
					success: function(teams) {
						// loop
						for ( var til = 0; til < teams.length; til++ ) {
							// push
							teamsInLeague.push(teams[til].get('team').id);
						}
						// if not already there
						if ( $.inArray(tid, teamsInLeague) == -1 ) {
							// new teamInLeague object
							var teamInLeagueClass = Parse.Object.extend('teamInLeague');
							var lm = new teamInLeagueClass();
							// new team object
							var TeamClass = Parse.Object.extend('Team');
							var team = new TeamClass();
							team.id = tid;
							// set ACL
							var ACL = new Parse.ACL();
							ACL.setPublicReadAccess(true);
							ACL.setPublicWriteAccess(false);
							ACL.setReadAccess( Parse.User.current() , true );
							ACL.setWriteAccess( Parse.User.current() , true );
							ACL.setReadAccess( cid , true );
							ACL.setWriteAccess( cid , true );
							// set new league member information
							lm.set('league', league);
							lm.set('status', undefined);
							lm.set('team', team);
							lm.set('responseReceived', false);
							lm.setACL( ACL );
					////////// save new member
							lm.save({
								// success
								success: function(teamInLeague) {
									// new request
									var RequestClass = Parse.Object.extend('Request');
									var r = new RequestClass();
									// ACL
									var rACL = new Parse.ACL();
									rACL.setPublicReadAccess(false);
									rACL.setPublicWriteAccess(false);
									rACL.setReadAccess( Parse.User.current() , true );
									rACL.setReadAccess( cid , true );
									rACL.setWriteAccess( cid , true );
									// set request
									r.set('initiator', Parse.User.current());
									r.set('invitee', {"__type":"Pointer","className":"User","objectId":""+ cid +""});
									r.set('type', request.league);
									r.set('response', undefined);
									r.set('responseReceived', false);
									r.set('setTeamLeagueRelation', teamInLeague);
									r.set('setUserTeamRelation', null);
									r.set('setGameActiveRoster', null);
									r.setACL( rACL );
							////////// send request
									r.save(null, {
										// success
										success: function(request) {
											// already invited
											$(e.currentTarget)
												.closest('li')
													.children('.message')
														.addClass('loaded')
														.text('Invitation Sent');
											// enable
											$('input#search-for-teams').removeAttr('disabled');
											// push
											teamsInLeague.push(tid);
										},
										// error
										error: function(err) {}
									});
								},
								// error
								error: function(err) {}
							});
						
						// if already there
						} else {
							// already invited
							$(e.currentTarget)
								.closest('li')
									.children('.message')
										.addClass('loaded')
										.text('This team has already been sent an invitation');
							// enable
							$('input#search-for-teams').removeAttr('disabled');
						}
					},
					// error
					error: function(err) {}
				});
			// if teams of league already collected
			} else {
				// if not already there
				if ( $.inArray(tid, teamsInLeague) == -1 ) {
					// new teamInLeague object
					var teamInLeagueClass = Parse.Object.extend('teamInLeague');
					var lm = new teamInLeagueClass();
					// league
					var LeagueClass = Parse.Object.extend('League');
					var league = new LeagueClass();
					league.id = document.URL.split('/').splice(-2, 1)[0];
					// new team object
					var TeamClass = Parse.Object.extend('Team');
					var team = new TeamClass();
					team.id = tid;
					// set ACL
					var ACL = new Parse.ACL();
					ACL.setPublicReadAccess(true);
					ACL.setPublicWriteAccess(false);
					ACL.setReadAccess( Parse.User.current() , true );
					ACL.setWriteAccess( Parse.User.current() , true );
					ACL.setReadAccess( cid , true );
					ACL.setWriteAccess( cid , true );
					// set new league member information
					lm.set('league', league);
					lm.set('status', undefined);
					lm.set('team', team);
					lm.set('responseReceived', false);
					lm.setACL( ACL );
			////////// save new member
					lm.save({
						// success
						success: function(teamInLeague) {
							// new request
							var RequestClass = Parse.Object.extend('Request');
							var r = new RequestClass();
							// ACL
							var rACL = new Parse.ACL();
							rACL.setPublicReadAccess(false);
							rACL.setPublicWriteAccess(false);
							rACL.setReadAccess( Parse.User.current() , true );
							rACL.setWriteAccess( Parse.User.current() , true );
							rACL.setReadAccess( cid , true );
							rACL.setWriteAccess( cid , true );
							// set request
							r.set('initiator', Parse.User.current());
							r.set('invitee', {"__type":"Pointer","className":"User","objectId":""+ cid +""});
							r.set('type', request.league);
							r.set('response', undefined);
							r.set('responseReceived', false);
							r.set('setTeamLeagueRelation', teamInLeague);
							r.set('setUserTeamRelation', null);
							r.set('setGameActiveRoster', null);
							r.setACL( rACL );
					////////// send request
							r.save(null, {
								// success
								success: function(request) {
									// already invited
									$(e.currentTarget)
										.closest('li')
											.children('.message')
												.addClass('loaded')
												.text('Invitation Sent');
									// enable
									$('input#search-for-teams').removeAttr('disabled');
									// push
									teamsInLeague.push(tid);
								},
								// error
								error: function(err) {}
							});
						},
						// error
						error: function(err) {}
					});
				// if already there
				} else {
					// already invited
					$(e.currentTarget)
						.closest('li')
							.children('.message')
								.addClass('loaded')
								.text('This team has already been sent an invitation');
					// enable
					$('input#search-for-teams').removeAttr('disabled');
				}
			}
				
		},	
			
		// paginate
		paginate: function(e) {
			
			e.preventDefault();
			
			// loading
			$(e.currentTarget).text('Loading ...');
			
			// get search value
			var sv = $('input#search-for-teams').val();
		
			// increment skip by interval
			feedIntervalSkip += interval;
			
			// by name
			var searchForTeamByName = new Parse.Query(Parse.Object.extend('Team'));
			searchForTeamByName.startsWith( 'name' , sv );
							
			// by case-insensitive name
			var searchForTeamByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
			searchForTeamByNameCaseInsensitive.startsWith( 'searchName' , sv );
							
			// by age group
			var searchForTeamByAgeGroup = new Parse.Query(Parse.Object.extend('Team'));
			searchForTeamByAgeGroup.startsWith( 'ageGroup' , sv );
							
			// by case-insensitive age group
			var searchForTeamByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
			searchForTeamByAgeGroupCaseInsensitive.startsWith( 'searchAgeGroup' , sv );
							
			// by level
			var searchForTeamByLevel = new Parse.Query(Parse.Object.extend('Team'));
			searchForTeamByLevel.startsWith( 'level' , sv );
							
			// by case-insensitive level
			var searchForTeamByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
			searchForTeamByLevelCaseInsensitive.startsWith( 'searchLevel' , sv );
							
			// by year
			var searchForTeamByYear = new Parse.Query(Parse.Object.extend('Team'));
			searchForTeamByYear.startsWith( 'year' , sv );
							
			// by hometown
			var searchForTeamByHometown = new Parse.Query(Parse.Object.extend('Team'));
			searchForTeamByHometown.startsWith( 'hometown' , sv );
							
			// by case-insensitive hometown
			var searchForTeamByHometownCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
			searchForTeamByHometownCaseInsensitive.startsWith( 'searchHometown' , sv );
							
			// by creator by name
			var teamCreatorByName = new Parse.Query(Parse.User);
			teamCreatorByName.startsWith( 'name' , sv );
			var searchForTeamByCreatorByName = new Parse.Query(Parse.Object.extend('Team'));
			searchForTeamByCreatorByName.matchesQuery( 'createdBy' , teamCreatorByName );
							
			// by creator by case-insensitive name - overlaps with proceeding queries
							
			// by creator by username
			var teamCreatorByUsername = new Parse.Query(Parse.User);
			teamCreatorByUsername.startsWith( 'username' , sv );
			var searchForTeamByCreatorByUsername = new Parse.Query(Parse.Object.extend('Team'));
			searchForTeamByCreatorByUsername.matchesQuery( 'createdBy' , teamCreatorByUsername );
							
			// by creator by case-insensitive username - overlaps
					
			var searchForTeams = Parse.Query.or( searchForTeamByName , searchForTeamByNameCaseInsensitive , searchForTeamByAgeGroup , searchForTeamByAgeGroupCaseInsensitive , searchForTeamByLevel , searchForTeamByLevelCaseInsensitive , searchForTeamByYear , searchForTeamByHometown , searchForTeamByHometownCaseInsensitive , searchForTeamByCreatorByName , searchForTeamByCreatorByUsername );
							
			// get teams
			searchForTeams.include('createdBy');
			searchForTeams.skip(feedIntervalSkip);
			searchForTeams.limit(interval);
			searchForTeams.find({
				// success
				success: function(teams) {
					// !(if no teams)
					if ( teams.length > 0 ) {
						for ( var u = 0; u < teams.length; u++ ) {
							// if not already invited
							if ( $.inArray(teams[u].id, teamsInLeague) == -1 )
								$('div.team-search-results .loader').before('<li class="result cf" data-value="' + teams[u].id + '" data-creator="' + teams[u].get('createdBy').id + '"><span class="message"></span><a href="#/team/' + teams[u].id + '" class="cf"><span class="avatar"><img src="' + ( ( teams[u].attributes['profilePicture'] == undefined || teams[u].attributes['profilePicture'] == null ) ? 'images/default.png' : teams[u].attributes['profilePicture'].url() ) + '" /></span><span class="result-identification"><h3>' + teams[u].get('name') + ' <span class="team-result-classification">' + ( ( teams[u].get('competitiveCategory') == undefined || teams[u].get('competitiveCategory') == null ) ? '' : teams[u].get('competitiveCategory') ) + '</span></h3><p>Created By @' + teams[u].get('createdBy').attributes['username'] + '</p></span><button class="invite">&#xf003;</button></a></li>');
						}
						// if less than feed interval
						if ( teams.length < interval ) {
							$('div.team-search-results .number-of-results')
								.removeClass('hidden')
								.text('No More Teams');
							$(e.currentTarget)
								.text('Load More Teams')
								.addClass('hidden');
						// if greater than feed interval	
						} else {
							$(e.currentTarget)
								.text('Load More Feeds')
								.removeClass('hidden');
						}
					// if no teams
					} else {
						// no people
						$('div.team-search-results .number-of-results')
							.removeClass('hidden')
							.text('No More Teams');
						$(e.currentTarget)
							.text('Load More Feeds')
							.addClass('hidden');
					}
				},
				// error
				error: function(error) {}
			});
			
		}
		
	});

function checkForNecessaryGameData() {
		//alert('')
	}

	function findLeaguesOwnedByCurrentUser(user) {
		// find leagues owned by current user
		var leaguesOwnedByUser = new Parse.Query(Parse.Object.extend('League'));
		leaguesOwnedByUser.equalTo('createdBy', user);
		leaguesOwnedByUser.find({
			success: function(leagues) { findTeamsInTheseLeagues(leagues, false); },
			error: function(err) { controlModal(false); }
		});
	}

	var possibleTeamsForMatch = [];
	var possibleLeaguesForMatch = [];

	function findTeamsInTheseLeagues(leagues, status) {
		// no leagues
		if (!leagues.length) {
			// find teams owned by user
			findTeamsOwnedByCurrentUser(Parse.User.current(), status);
		} else {
			// find teams of the leagues owned by the user
			var getTeamsOfLeagueOwnedByUser = new Parse.Query(Parse.Object.extend('teamInLeague'));
			getTeamsOfLeagueOwnedByUser.containedIn('league', leagues);
			getTeamsOfLeagueOwnedByUser.equalTo('status', true);
			getTeamsOfLeagueOwnedByUser.include('team');
			getTeamsOfLeagueOwnedByUser.include('team.createdBy');
			getTeamsOfLeagueOwnedByUser.include('league');
			getTeamsOfLeagueOwnedByUser.find({
				success: function(teams) {
					// if no teams
					if (!teams.length) {
						// find teams owned by user
						findTeamsInTheseLeagues([]);
					} else {
						// clear possible entities
						possibleTeamsForMatch = [];
						possibleLeaguesForMatch = [];
						// start count at 0
						var teamsPerCurrentLeague = 0;
						// loop through possible leagues
						for ( var t = 0; t < leagues.length; t++ ) {
							// reset count
							teamsPerCurrentLeague = 0;
							// loop through all teams
							for ( var i = 0; i < teams.length; i++ ) {
								// if league has an active team
								if ( leagues[t].id === teams[i].get('league').id ) teamsPerCurrentLeague++;
								// if last loop, push all teams to possible teams of leagues
								if ( t == ( leagues.length - 1 ) ) possibleTeamsForMatch.push(teams[i]);
							}
							// if more than two active teams
							if ( teamsPerCurrentLeague > 1 ) possibleLeaguesForMatch.push(leagues[t]);
							// if looping done, if at least one usable league
							if ( t == ( leagues.length - 1 ) ) {
								if ( possibleLeaguesForMatch.length > 0 ) {
									setUpParametersForGame(1);
								} else {
									findTeamsInTheseLeagues([], true);
									//self.isGamePartOfLeague = false;
								}
							}
						}
					}
				}
			});
		}
	}

	function setUpParametersForGame(type) {
		if ( type == 1 ) {
			// show leagues
			for ( var l = 0; l < possibleLeaguesForMatch.length; l++ ) $('[name="game-season"]').append('<option value="' + possibleLeaguesForMatch[l].id + '" data-option>' + possibleLeaguesForMatch[l].attributes['name'] + ' ' + possibleLeaguesForMatch[l].attributes['competitiveCategory'] + '</option>');
		} else if ( type == 2 ) {
			// disable game type
			$('[name="game-type"]').val('Exhibition Game');
			// show teams
			for ( var t = 0; t < possibleTeamsForMatch.length; t++ ) $('[name$="-team"]').append('<option value="' + possibleTeamsForMatch[t].attributes['team'].id + '" data-option>' + possibleTeamsForMatch[t].attributes['team'].attributes['name'] + '</option>');
			// for ( var t = 0; t < this.possible.teams.length; t++ ) {
			// 	$('[name$="-team"]')
			// 		.removeAttr('disabled')
			// 		.append('<option value="' + this.possible.teams[t].id + '" data-option>' + this.possible.teams[t].attributes['name'] + '</option>');
			// }
		} else if ( type == 0 ) {
			// disable game type
			$('[name="game-type"]')
				.val('Exhibition Game')
				//.find('');
			// correct fields
			$('[data-object-type]').each(function() {
				if (parseInt($(this).attr('data-object-type'))) $(this).removeClass('create__field--is-hidden');
				if (parseInt($(this).attr('data-object-type-dependent'))) $(this).addClass('create__field--is-hidden');
			});
			// show teams
			for ( var t = 0; t < this.possible.teams.length; t++ ) {
				$('[name$="-team"]')
					.removeAttr('disabled')
					.append('<option value="' + this.possible.teams[t].id + '" data-option>' + this.possible.teams[t].attributes['name'] + '</option>');
			}
		}
	}

	function findTeamsOwnedByCurrentUser(user, status) {
		var getTeamsOwnedByUser = new Parse.Query(Parse.Object.extend('Team'));
		getTeamsOwnedByUser.equalTo('createdBy', user);
		getTeamsOwnedByUser.find({
			success: function(teams) {
				// no teams
				if (!teams.length) { gameSetupUnsuccessful(0);
				} else {
					// make teams available
					for ( var i = 0; i < teams.length; i++ ) possibleTeamsForMatch.push(teams[i]);
					// if status
					if (status) setUpParametersForGame(0);
					else setUpParametersForGame(2);
				}
			}
		});
	}

	function gameSetupUnsuccessful(status) {
		if (!status) {
			alert('You need to own at least 2 teams or own a league that has two teams in it to create a game.');
		}
		// close modal
		controlModal(false);
	}


	// pick game type
	$('body').on('change', '[name="game-type"]', function(e) {
		// picked regular season
		if ( $(e.currentTarget).val() == 'Regular Season Game' ) {
			findTeamsInTheseLeagues([], false);
		} else {
			findLeaguesOwnedByCurrentUser(Parse.User.current());
		}
	});

	// pick season
	$('body').on('change', '[name="game-season"]', function(e) {
		for ( var t = 0; t < possibleTeamsForMatch.length; t++ ) {
			if ( possibleTeamsForMatch[t].attributes['league'].id === $(e.currentTarget).val() ) {
				$('[name$="-team"]').append('<option value="' + possibleTeamsForMatch[t].attributes['team'].id + '" data-option>' + possibleTeamsForMatch[t].attributes['team'].attributes['name'] + '</option>');
			}
		}
	});

	// pick home team
	$('body').on('change', '[name="game-home-team"]', function(e) {
		$('[name="game-away-team"]')
			.children('[data-option]').each(function() {
				if ( $(this).val() === $(e.currentTarget).val() ) $(this).attr('disabled', true);
				else $(this).removeAttr('disabled');
			});
	});

	// pick away team
	$('body').on('change', '[name="game-away-team"]', function(e) {
		$('[name="game-home-team"]')
			.children('[data-option]').each(function() {
				if ( $(this).val() === $(e.currentTarget).val() ) $(this).attr('disabled', true);
				else $(this).removeAttr('disabled');
			});
	});
	

	




	$('[data-app-modal]').on('touchstart', '[data-app-modal-button-left-action]', function(e) {
		touchstart = touchend = document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
	}).on('touchmove', '[data-app-modal-button-left-action]', function(e) {
		touchend = undefined;
	}).on('touchend', '[data-app-modal-button-left-action]', function(e) {
		if ( touchstart === touchend ) controlModal(false);
	});

	$('[data-app-modal]').on('click', '[data-app-modal-button-right-action]', function(e) {
		e.preventDefault();
	}).on('touchstart', '[data-app-modal-button-right-action]', function(e) {
		e.preventDefault();
		touchstart = touchend = document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
	}).on('touchmove', '[data-app-modal-button-right-action]', function(e) {
		touchend = undefined;
	}).on('touchend', '[data-app-modal-button-right-action]', function(e) {
		e.preventDefault();
		if ( touchstart === touchend ) {
			if ( $(this).attr('data-app-modal-button-right-action') == 'C0' ) createTeam(e);
			else if ( $(this).attr('data-app-modal-button-right-action') == 'C1' ) createLeague(e);
			else if ( $(this).attr('data-app-modal-button-right-action') == 'C2' ) createGame(e);
			else if ( $(this).attr('data-app-modal-button-right-action') == 'S0' && appView.view == 0 ) appView.saveSettings(e, $('[name="user-name"]').val(), $('[name="user-username"]').val(), $('[name="user-hometown"]').val(), $('[name="user-date-of-birth"]').val());
			else if ( $(this).attr('data-app-modal-button-right-action') == 'S1' && appView.view == 1 ) appView.saveSettings(e, $('[name="team-name"]').val(), $('[name="team-age-group"]').val(), $('[name="team-level"]').val(), $('[name="team-year"]').val(), $('[name="team-hometown"]').val());
			else if ( $(this).attr('data-app-modal-button-right-action') == 'S2' && appView.view == 6 ) appView.saveSettings(e, $('[name="league-name"]').val(), $('[name="league-age-group"]').val(), $('[name="league-level"]').val(), $('[name="league-year"]').val(), $('[name="league-hometown"]').val());
			else if ( $(this).attr('data-app-modal-button-right-action') == 'S4' && appView.view == 3 ) appView.saveSettings(e, $('[name="game-activity"]').val(), $('[name="game-first-period"]').val(), $('[name="game-second-period"]').val(), $('[name="game-third-period"]').val());
			else if ( $(this).attr('data-app-modal-button-right-action') == 'C20' && appView.view == 1 ) appView.createUnofficialGame(e);
			else if ( $(this).attr('data-app-modal-button-right-action') == 'C21' && appView.view == 6 ) appView.createOfficialGame(e);
		}
			//&& appView.view == 0 ) appView.saveSettings(e, $('#user-name').val(), $('#user-username').val(), $('#user-hometown').val(), $('#user-date-of-birth').val());
	});


	function isEmpty(value) { return (!value.length); }

	function wasOptionPicked(list) { return ( list != null ); }



		// controlDephasing: function(e) {
		// 	e.preventDefault();

		// 	this.controlHeaderBackward();

		// 	switch (this.phase) {
		// 		case 1:
		// 			this.controlCollaboratorButtons(false, true);
		// 			this.setEvent(undefined);
		// 			this.eventOptions();
		// 			this.updatePhase(2);
		// 		break;
		// 		case 2:
		// 			this.setParticipantsAndAdvantage(undefined, undefined, undefined);
		// 			this.teamOptions();
		// 			this.updatePhase(2);
		// 		break;
		// 		case 3:
		// 			this.setParticipant(undefined, []);
		// 			this.rosterOptions(this.eventObject.advantage);
		// 			this.updatePhase(2);
		// 		break;
		// 		case 4:
		// 			// event
		// 			switch (this.eventObject.event) {
		// 				case 'Goal':
		// 					this.setType(undefined);
		// 					this.goalTypeOptions();
		// 					this.updatePhase(2);
		// 				break;
		// 				case 'Penalty':
		// 					this.setPenaltyDuration(undefined);
		// 					this.penaltyDurationOptions();
		// 					this.updatePhase(2);
		// 				break;
		// 			}
		// 		break;
		// 		case 5:
		// 			// event
		// 			switch (this.eventObject.event) {
		// 				case 'Goal':
		// 					// no assists
		// 					if ( this.eventObject.firstParticipant == undefined ) {
		// 						this.setFirstParticipant(undefined, []);
		// 						this.rosterOptions(this.eventObject.advantage, true, [ this.eventObject.participant.identification ]);
		// 						this.updatePhase(2);
		// 					// if assist	
		// 					} else {
		// 						this.setFirstParticipant(undefined, []);
		// 						this.rosterOptions(this.eventObject.advantage, true, [ this.eventObject.participant.identification ]);
		// 						this.updatePhase(2);
		// 					}
		// 				break;
		// 				case 'Penalty':
		// 					this.setType(undefined);
		// 					this.penaltyTypeOptions();
		// 					this.updatePhase(2);
		// 				break;
		// 			}
		// 		break;
		// 		case -1:
		// 			// event
		// 			switch (this.eventObject.event) {
		// 				case 'Goal':
		// 					// straight from penalty shot
		// 					if ( this.eventObject.other.type == 'Penalty Shot' ) {
		// 						this.setType(undefined);
		// 						this.goalTypeOptions();
		// 						this.updatePhase(3);
		// 					// not from penalty shot
		// 					} else {
		// 						if ( !( this.eventObject.firstParticipant == undefined ) || !( this.eventObject.secondParticipant == undefined ) ) {
		// 							this.setSecondParticipant(undefined, []);
		// 							this.rosterOptions(this.eventObject.advantage, true, [ this.eventObject.participant.identification , this.eventObject.firstParticipant ]);
		// 							this.updatePhase(5);
		// 						// first assist is not set	
		// 						} else {
		// 							this.setFirstParticipant(undefined, []);
		// 							this.setSecondParticipant(undefined, []);
		// 							this.rosterOptions(this.eventObject.advantage, true, [ this.eventObject.participant.identification ]);
		// 							this.updatePhase(4);
		// 						}
		// 					}
		// 				break;
		// 				case 'Penalty':
		// 					this.setPenaltyCategory(undefined);
		// 					this.penaltyCategoryOptions();
		// 					this.updatePhase(5);
		// 				break;
		// 			}
		// 		break;
		// 		case -2:
		// 			this.timeOfGameOptions();
		// 			this.updatePhase(-1);
		// 		break;
		// 		case -3:
		// 			this.minuteOptions();
		// 			this.updatePhase(-2);
		// 		break;
				
		// 	}
		// },

		/// notifications
		// userTeamRelation
				case 0:
				
					// message
					$(e.currentTarget)
						.closest('article')
							.children('.message')
								.addClass('loading')
								.text('Confirming ...');
				
					// data
					var user = $(e.currentTarget).closest('article').attr('data-user');
					var team = $(e.currentTarget).closest('article').attr('data-team');
					var position = $(e.currentTarget).closest('article').attr('data-position');
					// get teamInLeague object
					var userOnRosterClass = Parse.Object.extend('userOnRoster');
					var uor = new userOnRosterClass();
					uor.id = relation;
					// set status
					uor.set('status', true);
					uor.set('responseReceived', true);
			////////// save relation
					uor.save(null, {
						// success
						success: function(relation) {
							// if player
							if ( $.inArray(position, [ 'Head Coach' , 'Assistant Coach' , 'Trainer' ]) == -1 ) {
								// team
								var TeamClass = Parse.Object.extend('Team');
								var t = new TeamClass();
								t.id = team;
								// search for leagues this team is a part of
								var getLeaguesOfTeam = new Parse.Query(Parse.Object.extend('teamInLeague'));
								getLeaguesOfTeam.equalTo('team', t);
								getLeaguesOfTeam.equalTo('status' , true);
								getLeaguesOfTeam.include('league');
								getLeaguesOfTeam.find({
									// success
									success: function(leagues) {
										// records
										var newPlayerRecords = [];
										// loop through teams
										for ( var tl = 0; tl < leagues.length; tl++ ) {
											// create statistic record
											var UserStatisticRecordClass = Parse.Object.extend('userStatisticRecord');
											var record = new UserStatisticRecordClass();
											// league
											var LeagueClass = Parse.Object.extend('League');
											var l = new LeagueClass();
											console.log(leagues[tl])
											l.id = leagues[tl].attributes['league'].id;
											// user
											var UserClass = Parse.User;
											var u = new UserClass();
											u.id = user;
											// ACL
											var ACL = new Parse.ACL();
											ACL.setPublicReadAccess(true);
											ACL.setPublicWriteAccess(false);
											// set attributes
											record.set('team', t);
											record.set('league', l);
											record.set('rosterMember', relation);
											record.set('GP', 0);
											record.set('G', 0);
											record.set('A', 0);
											record.set('TP', 0);
											record.set('PIM', 0);
											record.set('H', 0);
											record.set('S', 0);
											record.set('TA', 0);
											record.set('F', 0);
											record.set('FW', 0);
											record.set('MIN', 0);
											record.set('GA', 0);
											record.set('SA', 0);
											record.set('SV', 0);
											record.set('W', 0);
											record.set('L', 0);
											record.set('T', 0);
											record.set('SO', 0);
											record.set('user', u);
											record.set('goalie', ( ( $.inArray(position, [ 'Goalie' ]) != -1 ) ? true : false ));
											record.setACL( ACL );
											// push
											newPlayerRecords.push(record);
										}
										// save all
										Parse.Object.saveAll(newPlayerRecords, {
											// success
											success: function(newRecords) {
												// get notification object
												var RequestClass = Parse.Object.extend('Request');
												var cr = new RequestClass();
												cr.id = request;
												// mark as read
												cr.set('response', true);
												cr.set('responseReceived', true);
										////////// save request
												cr.save(null, {
													// success
													success: function(savedRequest) {
														// message
														$(e.currentTarget)
															.closest('article')
																.children('.message')
																	.addClass('loaded')
																	.text('Offer Accepted');
													},
													// error
													error: function(error) {}
												});
											},
											// error
											error: function(err) {}
										});
									},
									// error
									error: function(err) {}
								});
							// if 'executive'
							} else {
								// get notification object
								var RequestClass = Parse.Object.extend('Request');
								var cr = new RequestClass();
								cr.id = request;
								// mark as read
								cr.set('response', true);
								cr.set('responseReceived', true);
						////////// save request
								cr.save(null, {
									// success
									success: function(savedRequest) {
										// message
										$(e.currentTarget)
											.closest('article')
												.children('.message')
													.addClass('loaded')
													.text('Offer Accepted');
									},
									// error
									error: function(error) {}
								});
							}	
						},
						// error
						error: function(error) {}
					});
				
				break;

				// userTeamRelation
				case 0:
				
					// data
					var user = $(e.currentTarget).closest('article').attr('data-user');
					var team = $(e.currentTarget).closest('article').attr('data-team');
					var position = $(e.currentTarget).closest('article').attr('data-position');
					// get teamInLeague object
					var userOnRosterClass = Parse.Object.extend('userOnRoster');
					var uor = new userOnRosterClass();
					uor.id = relation;
					// set status
					uor.set('status', false);
					uor.set('responseReceived', true);
			////////// save relation
					uor.save(null, {
						// success
						success: function(relation) {
							// get notification object
							var RequestClass = Parse.Object.extend('Request');
							var cr = new RequestClass();
							cr.id = request;
							// mark as read
							cr.set('response', false);
							cr.set('responseReceived', true);
					////////// save request
							cr.save(null, {
								// success
								success: function(savedRequest) {
									// message
									$(e.currentTarget)
										.closest('article')
											.children('.message')
												.addClass('declined')
												.text('Offer Declined');
								},
								// error
								error: function(error) {}
							});
						},
						// error
						error: function(error) {}
					});
				
				break;




	
	// Create Page View
	var CreatePageView = Parse.View.extend({
		
		el: $('[data-app-main]'),
		
		initialize: function() {
		
			// unbind previous events
			$('[data-app-main]').unbind();
			
			// clean up previous state
			cleanUpMemory(state);
			
			// update state
			state = 20;
			
			// binding this to functions that reference this
			_.bindAll(this, 'render');
			
			// render page
			this.render();
			
			// creating
			isCreating = undefined;
			teamNameReady = false;
			leagueNameReady = false;
			gameTeamsReady = false;
			gameTypeReady = false;
			
			possibleExhibitionTeams = [];

			this.possible = {
				leagues: 		[],
				leagueTeams: 	[],
				teams: 			[]
			}
			
			this.objectType = document.URL.split('/').pop();
			this.defaults = {
				ageGroup: {
					all: [ 'Novice' , 'Minor Atom' , 'Atom' , 'Minor Peewee' , 'Peewee' , 'Minor Bantam' , 'Bantam' , 'Minor Midget' , 'Midget' , 'Juvenile' , 'Major Junior' , 'Professional' , 'Adult' ],
					littleLeague: [ 'Novice' ],
					minorLeague: [ 'Minor Atom' , 'Atom' , 'Minor Peewee' , 'Peewee' , 'Minor Bantam' , 'Bantam' , 'Minor Midget' , 'Midget' , 'Juvenile' ],
					majorLeague: [ 'Major Junior' , 'Professional' , 'Adult' ]
				},
				level: {
					all: [ 'House League' , 'Select' , 'A' , 'AA' , 'AAA' ],
					beginner: [ 'House League' , 'Select' ],
					intermediate: [ 'A' , 'AA' , 'AAA' ]
				},
				season: [ '2014-2015' , '2015' ],
				game: [ 'Season' , 'Exhibition' ]
			}

			this.isShowingCollaborators = false;
			this.isGamePartOfLeague = null;

			// categroies
			var categories = [ 'Novice' , 'Minor Atom' , 'Atom' , 'Minor Peewee' , 'Peewee' , 'Minor Bantam' , 'Bantam' , 'Minor Midget' , 'Midget' , 'Juvenile' , 'Major Junior' , 'Professional' , 'Senior' ];
			var level = [ 'House League' , 'Select' , 'A' , 'AA' , 'AAA' ];
			var categorySpecific = [ 'Novice' , 'Minor' , 'Minor' , 'Minor' , 'Minor' , 'Minor' , 'Minor' , 'Minor' , 'Minor' , 'Minor' , 'Major' , 'Major' , 'Major' , 'Llevel' , 'Llevel' , 'Hlevel' , 'Hlevel' , 'Hlevel' ];
			
			// season
			var season = [ '2014' , '2014-2015' , '2015' , '2015-2016' ];
			// game types
			var gameTypes = [ 'Season' , 'Exhibition' ];

			// load form
			this.on('load', this.loadForm());
			
			// loading
			setTimeout(function() { $('.loader').addClass('loading'); }, 100);

			bearing('CREATE');

			initInteractiveScorbit(false);
			
		},
		
		render: function() {
		
			// grabbing template and inserting into el
			var template = _.template( $('#create-page-view').html() );
			this.$el.html( template );
			
		},
		
		// load form
		loadForm: function() {
					this.getLeagues();
		},
		
		events: function() {
		
			// if iPhone
			return ( iphone || ipad ) ?
			
				{

					// create
					'submit [data-create]' : 'create',

					//'mousedown [name="age-group"]' : 'preventDropdown',
					'keyup [data-field="c-name"]' : 'name',
					'keyup [data-field="c-location"]' : 'location',
					'change [name="age-group"]' : 'ageGroup',
					'change [name="level"]' : 'level',
					'change [name="season"]' : 'season',
					'change [name="game-type"]' : 'gameType',
					'change [name="game-season"]' : 'gameLeague',
					'change [name="home-team"]' : 'gameHomeTeam',
					'change [name="away-team"]' : 'gameAwayTeam',
					'change [name="date-month"]' : 'gameMonth',
					'change [name="date-day"]' : 'gameDay',
					'change [name="date-year"]' : 'gameYear',
					'change [name="date-hour"]' : 'gameHour',
					'change [name="date-minute"]' : 'gameMinute',
					'change [name="date-time-of-day"]' : 'gameTimeOfDay'

				}
				:
				{

					// create
					'submit [data-create]' : 'create',

					//'mousedown [name="age-group"]' : 'preventDropdown',
					'keyup [data-field="c-name"]' : 'name',
					'keyup [data-field="c-location"]' : 'location',
					'click [name="age-group"]' : 'ageGroup',
					'click [name="level"]' : 'level',
					'click [name="season"]' : 'season',
					'click [name="game-type"]' : 'gameType',
					'click [name="game-season"]' : 'gameLeague',
					'click [name="home-team"]' : 'gameHomeTeam',
					'click [name="away-team"]' : 'gameAwayTeam',
					'click [name="date-month"]' : 'gameMonth',
					'click [name="date-day"]' : 'gameDay',
					'click [name="date-year"]' : 'gameYear',
					'click [name="date-hour"]' : 'gameHour',
					'click [name="date-minute"]' : 'gameMinute',
					'click [name="date-time-of-day"]' : 'gameTimeOfDay'

				}
			
		},

		name: function(e) {
			this.build(this.objectType, 'name', $(e.currentTarget).val());
		},

		location: function(e) {
			this.build(this.objectType, 'location', $(e.currentTarget).val());
		},

		gameType: function(e) {
			if ( $(e.currentTarget).val() == 'Season Game' ) {
				// build
				this.build(this.objectType, 'season', undefined);
				this.build(this.objectType, 'home-team', undefined);
				this.build(this.objectType, 'away-team', undefined);
				// hide dependent fields
				$('.create__field').addClass('create__field--is-hidden');
				$('.loader').removeClass('loader--is-hidden');
				$('[name$="-team"]').attr('disabled', true).children('[data-option]').remove();
				$('[name$="game-season"]').val('Select Season').children('[data-option]').remove();
				this.gameSetup(1);
				this.isGamePartOfLeague = true;
			} else {
				// build
				this.build(this.objectType, 'season', undefined);
				this.build(this.objectType, 'home-team', undefined);
				this.build(this.objectType, 'away-team', undefined);
				// show dependent fields
				$('.create__field').addClass('create__field--is-hidden');
				$('.loader').removeClass('loader--is-hidden');
				$('[name$="-team"]').removeAttr('disabled').children('[data-option]').remove();
				$('[name="home-team"]').val('Select Home Team');
				$('[name="away-team"]').val('Select Away Team');
				$('[name$="game-season"]').children('[data-option]').remove();
				if (this.possible.teams.length) this.gameSetup(2);
				else this.getTeams([], true);
				this.isGamePartOfLeague = false;
			}
		},

		gameLeague: function(e) {
			var season = $(e.currentTarget).val() || e;
			this.build(this.objectType, 'season', season);
			// remove previous teams
			$('[name$="-team"]')
				.attr('disabled', true)
				.children('[data-directive]')
					.attr('selected', true)
						.end()
				.children('[data-option]')
					.remove();
			// append new teams
			for ( var t = 0; t < this.possible.leagueTeams.length; t++ ) {
				if ( this.possible.leagueTeams[t].attributes['league'].id === season ) {
					$('[name$="-team"]')
						.removeAttr('disabled')
						.append('<option value="' + this.possible.leagueTeams[t].id + '" data-option>' + this.possible.leagueTeams[t].attributes['team'].attributes['name'] + '</option>');
				}
			}
		},

		gameHomeTeam: function(e) {
			var team = $(e.currentTarget).val();
			this.build(this.objectType, 'home-team', team);
			// disable away team
			$('[name="away-team"]')
				.children('[data-option]').each(function() {
					if ( $(this).val() === team ) $(this).attr('disabled', true);
					else $(this).removeAttr('disabled');
				});
		},

		gameAwayTeam: function(e) {
			var team = $(e.currentTarget).val();
			this.build(this.objectType, 'away-team', team);
			// disable away team
			$('[name="home-team"]')
				.children('[data-option]').each(function() {
					if ( $(this).val() === team ) $(this).attr('disabled', true);
					else $(this).removeAttr('disabled');
				});
		},

		gameMonth: function(e) {
			var month = $(e.currentTarget).val();
			// if not null
			if ( month != null ) this.build(this.objectType, 'month', parseInt(month));
		},

		gameDay: function(e) {
			var day = $(e.currentTarget).val();
			// if not null
			if ( day != null ) this.build(this.objectType, 'day', day);
		},

		gameYear: function(e) {
			var year = $(e.currentTarget).val();
			// if not null
			if ( year != null ) this.build(this.objectType, 'year', year);
		},

		gameHour: function(e) {
			var hour = $(e.currentTarget).val();
			// if not null
			if ( hour != null ) this.build(this.objectType, 'hour', hour);
		},

		gameMinute: function(e) {
			var minute = $(e.currentTarget).val();
			// if not null
			if ( minute != null ) this.build(this.objectType, 'minute', minute);
		},

		gameTimeOfDay: function(e) {
			var timeOfDay = $(e.currentTarget).val();
			// if not null
			if ( timeOfDay != null ) this.build(this.objectType, 'time-of-day', timeOfDay);
		},

		gameCollaborators: function(e) {
			// hide all sibling field
			$(e.currentTarget)
				.addClass('create__input--is-searching')
				.attr('placeholder', 'Find for users to add')
				.closest('.create__field')
					.siblings('.create__field')
						.addClass('create__field--is-hidden')
							.end()
				.closest('.create__field')
					.siblings('.create__search')
						.removeClass('create__search--is-hidden');
			if (!this.isShowingCollaborators) {
				this.isShowingCollaborators = true;
				$(e.currentTarget).siblings('.create__indicator').html('&#xe269;');
			}
		},

		showCollaborators: function(e) {
			if (!this.isShowingCollaborators) {
				this.isShowingCollaborators = true;
				// hide all sibling field
				$(e.currentTarget)
					.html('&#xe269;')
					.siblings('.create__input')
						.addClass('create__input--is-searching')
						.attr('placeholder', 'Find for users to add')
							.end()
					.closest('.create__field')
						.siblings('.create__field')
							.addClass('create__field--is-hidden')
								.end()
					.closest('.create__field')
						.siblings('.create__search')
							.removeClass('create__search--is-hidden');
			} else {
				this.isShowingCollaborators = false;
				$(e.currentTarget)
					.text(this.game.collaborators.length)
					.siblings('.create__input')
						.removeClass('create__input--is-searching')
						.attr('placeholder', '+ Add Official Collaborators')
							.end()
					.closest('.create__field')
						.siblings('.create__field').each(function() {
							if ( parseInt($(this).attr('data-object-type')) != 0 ) $(this).removeClass('create__field--is-hidden');
							else $(this).addClass('create__field--is-hidden');
						})
							.end()
					.closest('.create__field')
						.siblings('.create__search')
							.addClass('create__search--is-hidden');
			}
		},

		findCollaborators: function(e) {
			var search = $(e.currentTarget).val();
			// if no value
			//if (!search.length) alert('')
		},

		getTeams: function(leagues, status) {
			var self = this;
			// if no leagues
			if (!leagues.length) {
				// find teams owned by user
				var getTeamsOwnedByUser = new Parse.Query(Parse.Object.extend('Team'));
				getTeamsOwnedByUser.equalTo('createdBy', Parse.User.current());
				getTeamsOwnedByUser.find({
					success: function(teams) {
						// no teams
						if (!teams.length) {
							self.unableToCreateGame();
						} else {
							// make teams available
							for ( var i = 0; i < teams.length; i++ ) self.possible.teams.push(teams[i]);
							// if status
							if (status)self.gameSetup(2);
							else self.gameSetup(0);
							self.isGamePartOfLeague = false;
						}
					}
				});
			// leagues	
			} else {
				// find teams of the leagues owned by the user
				var getTeamsOfLeagueOwnedByUser = new Parse.Query(Parse.Object.extend('teamInLeague'));
				getTeamsOfLeagueOwnedByUser.containedIn('league', leagues);
				getTeamsOfLeagueOwnedByUser.equalTo('status', true);
				getTeamsOfLeagueOwnedByUser.include('team');
				getTeamsOfLeagueOwnedByUser.include('team.createdBy');
				getTeamsOfLeagueOwnedByUser.include('league');
				getTeamsOfLeagueOwnedByUser.find({
					success: function(teams) {
						// if no teams
						if (!teams.length) {
							// find teams owned by user
							self.getTeams([]);
						} else {
							// start count at 0
							var teamsPerCurrentLeague = 0;
							// loop through possible leagues
							for ( var t = 0; t < leagues.length; t++ ) {
								// reset count
								teamsPerCurrentLeague = 0;
								// loop through all teams
								for ( var i = 0; i < teams.length; i++ ) {
									// if league has an active team
									if ( leagues[t].id === teams[i].get('league').id ) teamsPerCurrentLeague++;
									// if last loop, push all teams to possible teams of leagues
									if ( t == ( leagues.length - 1 ) ) self.possible.leagueTeams.push(teams[i]);
								}
								// if more than two active teams
								if ( teamsPerCurrentLeague > 1 ) self.possible.leagues.push(leagues[t]);
								// if looping done, if at least one usable league
								if ( t == ( leagues.length - 1 ) ) {
									if ( self.possible.leagues.length > 0 ) {
										self.gameSetup(1);
										self.isGamePartOfLeague = true;
									} else {
										self.getTeams([]);
										self.isGamePartOfLeague = false;
									}
								}
							}
						}
					}
				});
			}
		},

		getLeagues: function() {
			var self = this;
			// find leagues owned by current user
			var leaguesOwnedByUser = new Parse.Query(Parse.Object.extend('League'));
			leaguesOwnedByUser.equalTo('createdBy', Parse.User.current());
			leaguesOwnedByUser.find({
				success: function(leagues) { self.getTeams(leagues); },
				error: function(err) {}
			});
		},

		unableToCreateGame: function() {
			// remove loader
			$('.loader').addClass('loader--is-hidden');
			// remove submit button
			$('[data-object-type="-1"]').addClass('create__field--is-hidden');
			// unable
			$('[data-header]').text('There Was An Error');
			$('[data-description]').text('Unfortunately you are unable to create a game. To create a game you must own a league that has at least two teams in it, or own at least two teams. We\'re sorry for the inconvenience.');
		},

		gameSetup: function(option) {
			// done loading
			$('.loader').addClass('loader--is-hidden');
			if (option == 1) {
				// correct fields
				$('[data-object-type]').each(function() {
					if (parseInt($(this).attr('data-object-type'))) $(this).removeClass('create__field--is-hidden')
				});
				// show leagues
				for ( var l = 0; l < this.possible.leagues.length; l++ ) $('[name="game-season"]').append('<option value="' + this.possible.leagues[l].id + '" data-option>' + this.possible.leagues[l].attributes['name'] + '</option>');
			} else if (option == 2) {
				// disable game type
				$('[name="game-type"]')
					.val('Exhibition Game');
				// correct fields
				$('[data-object-type]').each(function() {
					if (parseInt($(this).attr('data-object-type'))) $(this).removeClass('create__field--is-hidden');
					if (parseInt($(this).attr('data-object-type-dependent'))) $(this).addClass('create__field--is-hidden');
				});
				// show teams
				for ( var t = 0; t < this.possible.teams.length; t++ ) {
					$('[name$="-team"]')
						.removeAttr('disabled')
						.append('<option value="' + this.possible.teams[t].id + '" data-option>' + this.possible.teams[t].attributes['name'] + '</option>');
				}
			} else if (!option) {
				// disable game type
				$('[name="game-type"]')
					.val('Exhibition Game')
					.attr('disabled', true);
				// correct fields
				$('[data-object-type]').each(function() {
					if (parseInt($(this).attr('data-object-type'))) $(this).removeClass('create__field--is-hidden');
					if (parseInt($(this).attr('data-object-type-dependent'))) $(this).addClass('create__field--is-hidden');
				});
				// show teams
				for ( var t = 0; t < this.possible.teams.length; t++ ) {
					$('[name$="-team"]')
						.removeAttr('disabled')
						.append('<option value="' + this.possible.teams[t].id + '" data-option>' + this.possible.teams[t].attributes['name'] + '</option>');
				}
			}
		},

		build: function(type, field, value) {
			switch (type) {
				case 'team':
					switch (field) {
						case 'name':
							this.team.name = ( value.length == 0 ) ? undefined : value;
						break;
						case 'age-group':
							this.team.ageGroup = value;
						break;
						case 'level':
							this.team.level = value;
						break;
						case 'season':
							this.team.season = value;
						break;
					}
				break;
				case 'league':
					switch (field) {
						case 'name':
							this.league.name = ( value.length == 0 ) ? undefined : value;
						break;
						case 'age-group':
							this.league.ageGroup = value;
						break;
						case 'level':
							this.league.level = value;
						break;
						case 'season':
							this.league.season = value;
						break;
					}
				break;
				case 'game':
					switch (field) {
						case 'season':
							this.game.season = value;
						break;
						case 'home-team':
							this.game.home.team = value;
						break;
						case 'away-team':
							this.game.away.team = value;
						break;
						case 'month':
							this.game.time.month = value;
						break;
						case 'day':
							this.game.time.day = value;
						break;
						case 'year':
							this.game.time.year = value;
						break;
						case 'hour':
							this.game.time.hour = value;
						break;
						case 'minute':
							this.game.time.minute = value;
						break;
						case 'time-of-day':
							this.game.time.timeOfDay = value;
						break;
						case 'location':
							this.game.location = value;
						break;
					}
				break;
			}
			// check status
			this.readyToCreate(this.checkStatus(type));
		},

		// creating
		create: function(e) {
			e.preventDefault();
			var self = this;
			// type
			switch (this.objectType) {
				
				case 'game':
					
				break;
			}
			
		},

		checkStatus: function(type) {
			switch (type) {
				case 'team':
					if ( $.inArray(this.team.ageGroup, this.defaults.ageGroup.majorLeague) != -1 ) {
						if ( this.team.name != undefined && $.inArray(this.team.ageGroup, this.defaults.ageGroup.all) != -1 && $.inArray(this.team.season, this.defaults.season) != -1 )
							return true;
						else
							return false;
					} else {
						if ( this.team.name != undefined && $.inArray(this.team.ageGroup, this.defaults.ageGroup.all) != -1 && $.inArray(this.team.level, this.defaults.level.all) != -1 && $.inArray(this.team.season, this.defaults.season) != -1 )
							return true;
						else
							return false;
					}
				break;
				case 'league':
					if ( $.inArray(this.league.ageGroup, this.defaults.ageGroup.majorLeague) != -1 ) {
						if ( this.league.name != undefined && $.inArray(this.league.ageGroup, this.defaults.ageGroup.all) != -1 && $.inArray(this.league.season, this.defaults.season) != -1 )
							return true;
						else
							return false;
					} else {
						if ( this.league.name != undefined && $.inArray(this.league.ageGroup, this.defaults.ageGroup.all) != -1 && $.inArray(this.league.level, this.defaults.level.all) != -1 && $.inArray(this.league.season, this.defaults.season) != -1 )
							return true;
						else
							return false;
					}
				break;
				case 'game':
					if (this.isGamePartOfLeague) {
						if ( this.game.season != undefined && this.game.home.team != undefined && this.game.away.team != undefined && this.game.time.month != undefined && this.game.time.day != undefined && this.game.time.year != undefined && this.game.time.hour != undefined && this.game.time.minute != undefined && this.game.time.timeOfDay != undefined )
							return true;
						else
							return false;
					} else {
						if ( this.game.home.team != undefined && this.game.away.team != undefined && this.game.time.month != undefined && this.game.time.day != undefined && this.game.time.year != undefined && this.game.time.hour != undefined && this.game.time.minute != undefined && this.game.time.timeOfDay != undefined )
								return true;
							else
								return false;
					}
				break;
			}
		},

		readyToCreate: function(status) {
			if (status) $('[data-field="submit"]').removeAttr('disabled');
			else $('[data-field="submit"]').attr('disabled', true);
		},
		
	});

searchInput.on('keyup', function(e) {
		var currentSearchValue = $(e.currentTarget).val();
		// clear previous search
		clearTimeout(search);
		// no value
		if (!currentSearchValue.length) {
			searchPreview.html('').addClass('search-preview--is-hidden');
		// value
		} else {
			search = window.setTimeout(function() {
				// by name
				var searchForUserByName = new Parse.Query(Parse.Object.extend('User'));
				searchForUserByName.startsWith('name', currentSearchValue);
				// by case-insensitive name
				var searchForUserByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('User'));
				searchForUserByNameCaseInsensitive.startsWith('searchName', currentSearchValue);
				// by username
				var searchForUserByUsername = new Parse.Query(Parse.Object.extend('User'));
				searchForUserByUsername.startsWith('username', currentSearchValue);
				// by case-insensitive username
				var searchForUserByUsernameCaseInsensitive = new Parse.Query(Parse.Object.extend('User'));
				searchForUserByUsernameCaseInsensitive.startsWith('searchUsername', currentSearchValue);
				// search for users
				var searchForUsers = Parse.Query.or(searchForUserByName, searchForUserByNameCaseInsensitive, searchForUserByUsername, searchForUserByUsernameCaseInsensitive);
				searchForUsers.limit(16);
				searchForUsers.find({
					success: function(users) {
						var results = [];
						// organize
						for ( var i = 0; i < users.length; i++ ) {
							var result = {
								primary: users[i].get('name'),
								secondary: users[i].get('username'),
								link: users[i].get('username'),
								avatar: ( ( users[i].get('profilePicture') == undefined ) ? defaultPic : users[i].get('profilePicture').url() )
							}
							// push
							results.push(result);
						}
						// search more results
						results.push({ primary: "Search For More Results", link: "search/" + currentSearchValue, avatar: defaultPic });
						// display
						searchPreview.html(_.template($('#search-preview-template').html(), {results:results})).removeClass('search-preview--is-hidden');
					},
					error: function(err) {}
				});
			}, 0);
		}
	});

var searchInput = $('[data-search-input]');
	var searchPreview = $('[data-search-preview]');
	var searchForm = $('[data-search]');
	var search;

	searchForm.on('submit', function(e) {
		e.preventDefault();
		window.location.href = '#/search/' + searchInput.val();
		searchInput.blur();
		searchPreview.html('').addClass('search-preview--is-hidden');
	});

	searchPreview.on('click', '.sfeed--search', function() { searchPreview.html('').addClass('search-preview--is-hidden'); });
	
	var scrollering = $(window).scrollTop();

	// overlay
	var $overlay = $('[data-app-overlay]');
	var $modal = $('[data-app-modal]');

	$overlay.on('click', function(e) {
		if ( !( iphone || ipad ) ) {
			$overlay.addClass('overlay--is-hidden');
			$modal.addClass('modal--is-hidden');
		} else e.preventDefault();
	});
	
	// called in every view to clean up memory
	function cleanUpMemory(state) {


		rinkView = true;
		gameMode = false;
		clock = false;
		
	}

	// $('[data-app-modal]').on('click', '[data-cancel-team-settings]', function(e) {
	// 	if ( appView.view == 1 ) appView.closeSettings();
	// });

	$('[data-app-overlay]').on('click', function(e) {
		e.preventDefault();
		// on the line
		if (!( iphone || ipad )) controlModal(false);
	}).on('touchstart', function(e) {
		touchstart = touchend = document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
	}).on('touchmove', function(e) {
		touchend = undefined;
	}).on('touchend', function() {
		controlModal(false);
	});


	// footer links
	var $footerLink = $('[data-link]');

	$footerLink.on('touchstart', function(e) {
		$(this).addClass('wrapper__navigation__link--active');
	}).on('touchmove', function(e) {
		$(this).removeClass('wrapper__navigation__link--active');
	}).on('touchend', function() {
		$(this).removeClass('wrapper__navigation__link--active');
	});

	// create buttons
	var $mobileCreateBtn = $('[data-create-link]');
	var $webCreateBtn = $('a[href="#/create"]');
	var $createBtn = $('[data-create-button]');

	$createBtn.on('touchstart', function(e) {
		touchstart = touchend = document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
	}).on('touchmove', function(e) {
		touchend = undefined;
	}).on('touchend', function(e) {
		if ( touchstart === touchend ) {
			$('[data-create-prompt]').removeClass('create-prompt--is-visible');
			var template = ( ( parseInt($(this).attr('data-create-button')) == 0 ) ? $('#create-team-view').html() : ( ( parseInt($(this).attr('data-create-button')) == 1 ) ? $('#create-league-view').html() : $('#create-game-view').html() ) );
			var code = ( ( parseInt($(this).attr('data-create-button')) == 0 ) ? 'C0' : ( ( parseInt($(this).attr('data-create-button')) == 1 ) ? 'C1' : 'C2' ) );
			controlModal(true, template, { leftButton : { title : 'Cancel' , action : 0 }, rightButton : { title : 'Create' , action : code }, heading : 'Create A League' });
		}
	});

	var $gameType = $('[name="game-type"]');

	// web
	$webCreateBtn.click(function(e) {
		e.preventDefault();
		// on the line
		if (!( iphone || ipad )) controlModal(true, _.template($('#create-view').html()), { leftButton : { title : '' , action : 0 }, rightButton : { title : 'Create' , action : 1 }, heading : 'Pick an Option' });
	}).on('touchstart', function(e) {
		touchstart = touchend = document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
	}).on('touchmove', function(e) {
		touchend = undefined;
	}).on('touchend', function() {
		if ( touchstart === touchend ) {
			$('[data-create-prompt]').addClass('create-prompt--is-visible');
			$('[data-app-overlay]').addClass('overlay--is-visible');
		}
		//controlModal(true, 'asf', { leftButton : { title : 'Cancel' , action : 0 }, rightButton : { title : 'Create' , action : 1 }, heading : 'Pick An Option' });
	});

	$('body').on('click', '[data-search-field]', function(e) {
		e.preventDefault();
	}).on('touchstart', '[data-search-field]', function(e) {
		touchstart = touchend = document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
	}).on('touchmove', '[data-search-field]', function(e) {
		touchend = undefined;
	}).on('touchend', '[data-search-field]', function() {
		if ( touchstart === touchend ) setTimeout(function() { $('[data-app-complimentary-modal]').addClass('modal--is-visible--on-top'); }, 200);
		//controlModal(true, 'asf', { leftButton : { title : 'Cancel' , action : 0 }, rightButton : { title : 'Create' , action : 1 }, heading : 'Pick An Option' });
	});

	$('body').on('keyup', '[data-find-people]', function(e) {
		var query = $(e.currentTarget).val();
		// by name
		var searchForUserByName = new Parse.Query(Parse.Object.extend('User'));
		searchForUserByName.startsWith('name', query);
		// by case-insensitive name
		var searchForUserByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('User'));
		searchForUserByNameCaseInsensitive.startsWith('searchName', query);
		// by username
		var searchForUserByUsername = new Parse.Query(Parse.Object.extend('User'));
		searchForUserByUsername.startsWith('username', query);
		// by case-insensitive username
		var searchForUserByUsernameCaseInsensitive = new Parse.Query(Parse.Object.extend('User'));
		searchForUserByUsernameCaseInsensitive.startsWith('searchUsername', query);
		// search for users
		var searchForUsers = Parse.Query.or(searchForUserByName, searchForUserByNameCaseInsensitive, searchForUserByUsername, searchForUserByUsernameCaseInsensitive);
		searchForUsers.limit(200);
		searchForUsers.find({
			success: function(users) {
				var results = [];
				// organize
				for ( var i = 0; i < users.length; i++ ) {
					var result = {
						id: users[i].id,
						primary: users[i].get('name'),
						secondary: users[i].get('username'),
						link: 'add-to-game',
						avatar: ( ( users[i].get('profilePicture') == undefined ) ? defaultPic : users[i].get('profilePicture').url() )
					}
					// push
					results.push(result);
				}
				// no results
				if (!users.length) results.push({ primary: "No Results", secondary: "Try searching for something similar", link: "add-to-game", avatar: defaultPic });
				// display
				$('[data-app-complimentary-modal-container]').html(_.template($('#search-result-template').html(), {results:results}));
			},
			error: function(err) {}
		});
	});

	$('body').on('click', '[data-cancel-complimentary-modal]', function(e) {
		e.preventDefault();
	}).on('touchstart', '[data-cancel-complimentary-modal]', function(e) {
		touchstart = touchend = document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
	}).on('touchmove', '[data-cancel-complimentary-modal]', function(e) {
		touchend = undefined;
	}).on('touchend', '[data-cancel-complimentary-modal]', function() {
		if ( touchstart === touchend ) setTimeout(function() { $('[data-app-complimentary-modal]').removeClass('modal--is-visible--on-top'); }, 400);
		//controlModal(true, 'asf', { leftButton : { title : 'Cancel' , action : 0 }, rightButton : { title : 'Create' , action : 1 }, heading : 'Pick An Option' });
	});

	$('body').on('click', 'a[href="#/add-to-game"]', function(e) {
		e.preventDefault();
	}).on('touchstart', 'a[href="#/add-to-game"]', function(e) {
		touchstart = touchend = document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
	}).on('touchmove', 'a[href="#/add-to-game"]', function(e) {
		touchend = undefined;
	}).on('touchend', 'a[href="#/add-to-game"]', function(e) {
		$('[data-find-people]').blur();
		var cloneHtml = $(e.currentTarget).clone();
		$('[data-search-field]').after(cloneHtml);
		if ( touchstart === touchend ) setTimeout(function() { $('[data-app-complimentary-modal]').removeClass('modal--is-visible--on-top'); }, 400);
	});

	$('[data-refresh]').on('click', function(e) { e.preventDefault(); }).on('touchstart', function(e) {
		touchstart = touchend = document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
	}).on('touchmove', function(e) {
		touchend = undefined
	}).on('touchend', function(e) {
		if ( touchstart === touchend ) {
			switch (appView.view) {
				case 3:
					appView.render();
				break;
			}
		}
	});

	////////// get notifications
		var notifications = new Parse.Query(Parse.Object.extend('Request'));
		notifications.equalTo('responseReceived', false);
		notifications.equalTo('invitee', Parse.User.current());
		notifications.count({
			// success
			success: function(count) {
				// if more than 0
				if ( count > 0 ) {
					$('a[href="#/notifications"]').addClass('active');
					$('.n--alert')
						.removeClass('hidden')
						.text(count);
				}
			},
			// error
			error: function(err) {}
		});

		$('[data-link="current-user"]').attr('href', '#/' + Parse.User.current().get('username'));

			$('.wrapper__navigation--mobile, .wrapper__navigation--mobile__footer, .wrapper__buffer--bottom, .wrapper__buffer--top').addClass('logged-in');

		$('a[href="#/user"]')
			.attr('href', '#/' + Parse.User.current().get('username'))
			.find('img')
				.attr('src', ( ( Parse.User.current().get('profilePicture') == undefined || Parse.User.current().get('profilePicture') == null ) ? 'images/default.png' : Parse.User.current().get('profilePicture').url() ))
					.end()
			.find('h3')
				.text('@' + Parse.User.current().get('username'));
		
	} else {


			$('.wrapper__navigation--mobile, .wrapper__navigation--mobile__footer, .wrapper__buffer--bottom, .wrapper__buffer--top').removeClass('logged-in');

			//$('')



			// display notifications ( request , type , userTeamRelation , teamLeagueRelation , gameActiveRoster , initiator )
	function showNotifications( r , t , utr , tlr , gar , i ) {
		
		// request
		var requestContainer;
		
		switch ( t ) {
			// userTeamRelation
			case request.team:
			
				requestContainer = '<article class="feed" data-request="' + r.id + '" data-relation="' + utr.id + '" data-type="' + t + '" data-user="' + utr.attributes['user'].id + '" data-team="' + utr.attributes['team'].id + '" data-position="' + utr.attributes['role'].position + '"><span class="message"></span><p class="notification-description"><a href="#/' + i.attributes['username'] + '" class="initiator">@' + i.attributes['username'] + '</a> Join the ' + utr.attributes['team'].attributes['name'] + ' as a ' + utr.attributes['role'].position + ( ( $.inArray(utr.attributes['role'].position, [ 'Head Coach' , 'Assistant Coach' , 'Trainer' ]) == -1 ) ? ' (' + utr.attributes['number'] + ')' : '' ) + '?</p><div class="relation cf"><span class="notifications-invitee"><a href="#/' + utr.attributes['user'].attributes['username'] + '"><span class="notifications-avatar"><img src="' + ( ( utr.attributes['user'].attributes['profilePicture'] == undefined || utr.attributes['user'].attributes['profilePicture'] == null ) ? 'images/default.png' : utr.attributes['user'].attributes['profilePicture'].url() ) + '" /></span><h5>' + utr.attributes['user'].attributes['name'] + '</h5><p>@' + utr.attributes['user'].attributes['username'] + '</p></a></span><span class="notifications-initiator"><a href="#/team/' + utr.attributes['team'].id + '"><span class="notifications-avatar"><img src="' + ( ( utr.attributes['team'].attributes['profilePicture'] == undefined || utr.attributes['team'].attributes['profilePicture'] == null ) ? 'images/default.png' : utr.attributes['team'].attributes['profilePicture'] ) + '" /></span><h5>' + utr.attributes['team'].attributes['name'] + '</h5><p>Team created by @' + utr.attributes['team'].attributes['createdBy'].attributes['username'] + '</p></a></span><span class="notifications-icon">&#xf0c1;</span></div><div class="response cf"><span class="responses"><button class="notifications--accept" data-response="true">Accept</button></span><span class="responses"><button class="notifications--decline" data-response="false">Decline</button></span></div></article>';
			
			break;
			// teamLeagueRelation
			case request.league:
			
				requestContainer = '<article class="feed" data-request="' + r.id + '" data-relation="' + tlr.id + '" data-type="' + t + '" data-team="' + tlr.attributes['team'].id + '" data-league="' + tlr.attributes['league'].id + '"><span class="message"></span><p class="notification-description"><a href="#/' + i.attributes['username'] + '" class="initiator">@' + i.attributes['username'] + '</a> Join the ' + tlr.attributes['league'].attributes['name'] + '?</p><div class="relation cf"><span class="notifications-invitee"><a href="#/team/' + tlr.attributes['team'].id + '"><span class="notifications-avatar"><img src="' + ( ( tlr.attributes['team'].attributes['profilePicture'] == undefined || tlr.attributes['team'].attributes['profilePicture'] == null ) ? 'images/default.png' : tlr.attributes['team'].attributes['profilePicture'] ) + '" /></span><h5>' + tlr.attributes['team'].attributes['name'] + '</h5><p>Team created by @' + tlr.attributes['team'].attributes['createdBy'].attributes['username'] + '</p></a></span><span class="notifications-initiator"><a href="#/league/' + tlr.attributes['league'].id + '"><span class="notifications-avatar"><img src="' + ( ( tlr.attributes['league'].attributes['profilePicture'] == undefined || tlr.attributes['league'].attributes['profilePicture'] == null ) ? 'images/default.png' : tlr.attributes['league'].attributes['profilePicture'] ) + '" /></span><h5>' + tlr.attributes['league'].attributes['name'] + '</h5><p>League created by @' + tlr.attributes['league'].attributes['createdBy'].attributes['username'] + '</p></a></span><span class="notifications-icon">&#xf0c1;</span></div><div class="response cf"><span class="responses"><button class="notifications--accept" data-response="true">Accept</button></span><span class="responses"><button class="notifications--decline" data-response="false">Decline</button></span></div></article>';
			
			break;
			// gameActiveRoster
			case request.game:
			
				requestContainer = '<article class="feed" data-request="' + r.id + '" data-relation="' + gar.id + '" data-type="' + t + '" data-active="' + gar.attributes['players'] + '" data-team="' + ( ( gar.attributes['advantage'] ) ? gar.attributes['game'].attributes['homeTeam'].id : gar.attributes['game'].attributes['awayTeam'].id ) + '"><span class="message"></span><p class="notification-description"><a href="#/' + i.attributes['username'] + '" class="initiator">@' + i.attributes['username'] + '</a> Set the ' + ( ( gar.attributes['advantage'] ) ? 'Home' : 'Away' ) + ' active roster for this game?</p><div class="relation cf"><span class="notifications-invitee"><a href="#/team/' + gar.attributes['game'].attributes['homeTeam'].id + '"><span class="notifications-avatar"><img src="' + ( ( gar.attributes['game'].attributes['homeTeam'].attributes['profilePicture'] == undefined || gar.attributes['game'].attributes['homeTeam'].attributes['profilePicture'] == null ) ? 'images/default.png' : gar.attributes['game'].attributes['homeTeam'].attributes['profilePicture'].url() ) + '" /></span><h5>' + gar.attributes['game'].attributes['homeTeam'].attributes['name'] + '</h5></a></span><span class="notifications-initiator"><a href="#/team/' + gar.attributes['game'].attributes['awayTeam'].id + '"><span class="notifications-avatar"><img src="' + ( ( gar.attributes['game'].attributes['awayTeam'].attributes['profilePicture'] == undefined || gar.attributes['game'].attributes['awayTeam'].attributes['profilePicture'] == null ) ? 'images/default.png' : gar.attributes['game'].attributes['awayTeam'].attributes['profilePicture'].url() ) + '" /></span><h5>' + gar.attributes['game'].attributes['awayTeam'].attributes['name'] + '</h5></a></span><span class="notifications-icon">V</span></div><div class="response cf"><span class="responses-center"><button class="notifications--accept set-roster" data-response="true">Set Roster</button></span></div></article>';
			
			break;
		}
		
		return requestContainer;
		
	}



	function bearing(header, back, refresh) {
		$('[data-navigation-bearing]')
			.text(header)
			.hide()
			.fadeIn(400);
		// back button
		if (back) {
			app.back = true;
			$('[data-app-back]').removeAttr('disabled');
		} else {
			app.back = false;
			$('[data-app-back]').attr('disabled', true);
		}
	}


	$('[data-app-back]').click(function() { if (app.back) window.history.back(); });





	function directiveHeight(e) {
		// header height
		var hH = ( (iphone) ? 46 : 60 );
		$(e).css({
			'padding-top' 	: (($(window).height() - $(e).outerHeight())/2 - hH) + 'px',
			'padding-bottom': (($(window).height() - $(e).outerHeight())/2 - hH) + 'px'
		});
	}



	function controlModal(status, template, presets) {
		if (status) {
			// show modal if web
			//if (!iphone)
			$('[data-app-overlay]').addClass('overlay--is-visible');
			// template
			$('[data-app-modal-container]').html(template);
			$('[data-app-modal-button-left]')
				.text(presets.leftButton.title)
				.attr('data-app-modal-button-left-action', presets.leftButton.action);
			$('[data-app-modal-button-right]')
				.text(presets.rightButton.title)
				.attr('data-app-modal-button-right-action', presets.rightButton.action);
			$('[data-app-modal-heading]').text(presets.heading);
			// // 200ms delay
			window.setTimeout(function() { $('[data-app-modal]').addClass('modal--is-visible'); }, ( (iphone) ? 300 : 350 ));
		} else {
			$('[data-app-overlay]').removeClass('overlay--is-visible');
			$('[data-app-modal]').removeClass('modal--is-visible');
			$('[data-create-prompt]').removeClass('create-prompt--is-visible');
		}
	}

	var playerNumbers;
	var playersIDs;
	var gameDataObject;
	var currentStatistics;
	var currentCollaborators;
	var statisticPollingInterval;
	var clockInterval;
	var collaboratorObject;
	var collaboratorPhase;
	var eventType;
	var personObject;
	var startDisplaying;
	var currentFollowers;
	var currentFollowing;
	var profileDataStatus;
	var nameUpdateReady;
	var usernameUpdateReady;
	var emailUpdateReady;
	var profilePictureUpdateReady;
	var teamObject;
	var teamNameUpdateReady;
	var ageGroupUpdateReady;
	var levelUpdateReady;
	var yearUpdateReady;
	var teamPictureUpdateReady;
	var userSearchTimeout;
	var userWasPicked;
	var teamSearchTimeout;
	var teamWasPicked;
	var leagueObject;
	var ghostData;
	var loadDataInterval;
	var homeRoster;
	var searchTimeout;
	var tick = 0;
	var profileHeight;
	var sidebarWidth;
	var gameMode = false;
	var peopleSearchCount;
	var teamSearchCount;
	var leagueSearchCount;
	var statisticsSearchCount;
	var gameSearchCount;
	var cloneForReset;
	var createGameState;
	var checkPeriod;
	var runTime;
	var followingUsers;
	var loadingFeeds;
	var endOfFeeds;
	var displayTeamData;


	// for real time
	var currentStatistics = [];
	// current collaborators
	var currentCollaborators = [];
	var usernameCheck;
	var searchInterval;
	var surfaceTouched;
	var optionTouched;
	var feedInterval = 30;
	var self;
	var personDataReady;
	var personFeedsReady;
	var personRelationsReady;
	var displayFeedAndRelationData;
	var checkUsernameUpdate;
	var currentHomeFeeds = [];
	var homeFeedChecked = false;
	var waitingForFollow;
	var waitingForGameFollow;
	var followingGames;
	var teamGames;
	var newTeamMemberObject;
	var signUpName;
	var	signUpEmail;
	var	signUpUsername;
	var	signUpPassword;
	var	logInUsername;
	var	logInPassword;
	var searchScorbit;
	var currentSearchResults = [];
	var creating = false;
	var isCreating;
	var creatingGame = false;
	var creatingTeam = false;
	var creatingLeague = false;
	var createPhase = 0;
	var createByDefault = true;
	var possibleLeagues = [];
	var possibleTeams = [];
	var touchstartTargetElement;
	var touchendTargetElement;
	var touchX;
	var touchY;
	var intervalToShowInputs;
	var scroller = 0;
	var start = 0;
	var newGameObject;
	var newTeamObject;
	var newLeagueObject;
	var currentField;
	var set = {
		game	: {
			seasOrExhi	: 0.5,
			league		: 1,
			homeTeam	: 2,
			awayTeam	: 3,
			location	: 4
		},
		team	: {
			name		: 1,
			ageLevel	: 2,
			season		: 3
		},
		league	: {
			name		: 1,
			ageLevel	: 2,
			season		: 3
		}
	}
	var add = {
		set : {
			name		: 1,
			position	: 2,
			number		: 3
		}
	}
	var teamSearchTimeout;
	var realPossibleLeagues;
	var thisGame = {
		isInactive	: 0,
		isActive	: 1,
		isFinal		: 2
	}
	var verifyTime = -1;
	var hasLeague;
	var stoppageCollaboration;
	var userObject;
	var currentUserTeams;
	var teamNameReady;
	var	leagueNameReady;
	var statistics = {
		score		: 1,
		hits		: 2,
		shots		: 3,
		penaltiesim	: 4,
		turnovers	: 5,
		faceoffs	: 6
	}
	var display = {
		game: 0,
		feed: 1
	}
	var personNameSettingsReady;
	var	personUsernameSettingReady;
	var	personEmailSettingReady;
	var checkUsername;
	var teamNameSettingsReady;
	var updateTeam;
	var updateLeague;
	var leagueNameSettingsReady;
	var interval;
	var currentTeams = [];
	var currentLeagues = [];
	var personInterval = {
		feed : {
			num : 30,
			skip: 0
		},
		fers : {
			num : 30,
			skip: 0
		},
		fing : {
			num : 30,
			skip: 0
		}
	}
	var currentUserFollowers = [];
	var currentUserFollowing = [];
	var currentGames = [];
	var teamsInLeague = [];
	var request = {
		team	: 0,
		league	: 1,
		game	: 2
	}
	var rosterChecked;
	var rosterID;
	var rosterNum;
	var addToTeam = {
		ghost		: undefined,
		person 		: undefined,
		position 	: undefined,
		number 		: undefined
	}
	var newPlayerName;
	var newPlayerPosition;
	var newPlayerNumber;
	var teamLeagues;
	var userSearchTimeout;
	var searchInterval;
	var searchSkip;
	var searchScorbit;
	var gameTypeReady;
	var gameTeamsReady;
	var changedGame = {
		activity 	: undefined,
		fpm			: undefined,
		spm			: undefined,
		tpm			: undefined
	}
	var fpmReady;
	var	spmReady;
	var	tpmReady;



		organizeGames: function(games) {
			var usedDates = [], usedLeagues = [];
			var scheduleTemplate = $('#schedule').html();
			var groupingTemplate = $('#grouping').html();
			var gameTemplate = $('#game-widget').html();
			// loop through games
			for ( var i = 0; i < games.length; i++) {
				// date doesn't exists
				if ( $.inArray(Date.parse(games[i].attributes['dateTimeOfGame']), usedDates) == -1 ) {
					// display new date
					$('[data-home]').append(_.template(scheduleTemplate, { absoluteDate: Date.parse(games[i].attributes['dateTimeOfGame']), date: parseDateIntoEnglish(games[i].attributes['dateTimeOfGame'].getDay(), games[i].attributes['dateTimeOfGame'].getMonth(), games[i].attributes['dateTimeOfGame'].getDate(), games[i].attributes['dateTimeOfGame'].getFullYear()) }));
					// used
					usedDates.push(Date.parse(games[i].attributes['dateTimeOfGame']));
				}

				var league = ( ( games[i].attributes['league'] == undefined ) ? '' : games[i].attributes['league'].id );

				// league in date doesn't exist
				if ( $.inArray(( league + Date.parse(games[i].attributes['dateTimeOfGame']).toString() ), usedLeagues) == -1 ) {
					$('[data-date="' + Date.parse(games[i].attributes['dateTimeOfGame']).toString() + '"] [data-schedule]')
						.append(_.template(groupingTemplate, {
							id 			: league,
							grouping 	: league + Date.parse(games[i].attributes['dateTimeOfGame']).toString(),
							league 		: ( ( games[i].attributes['league'] == undefined ) ? undefined : true ),
							picture 	: ( ( games[i].attributes['league'] == undefined ) ? undefined : ( ( games[i].attributes['league'].attributes['profilePicture'] == undefined ) ? defaultPic : games[i].attributes['league'].attributes['profilePicture'].url() ) ),
							name 		: ( ( games[i].attributes['league'] == undefined ) ? undefined : games[i].attributes['league'].attributes['name'] ),
							ageLevel	: ( ( games[i].attributes['league'] == undefined ) ? undefined : games[i].attributes['league'].attributes['competitiveCategory'] ),
							year 		: ( ( games[i].attributes['league'] == undefined ) ? undefined : games[i].attributes['league'].attributes['year'] )
						}));
					usedLeagues.push(league + Date.parse(games[i].attributes['dateTimeOfGame']).toString());
				}

				if (!iphone) {
					$('[data-grouping="' + ( league + Date.parse(games[i].attributes['dateTimeOfGame']).toString() ) + '"]')
						.siblings('[data-games]')
							.append(_.template(gameTemplate, {
								leagueFlag 		: false,
								game 	: {
									id 			: games[i].id,
									isStarted 	: games[i].attributes['start'],
									isActive 	: games[i].attributes['active'],
									isFinal 	: games[i].attributes['gameFinal'],
									time 		: convertArmyTime(games[i].attributes['dateTimeOfGame'].getHours(), games[i].attributes['dateTimeOfGame'].getMinutes())
								},
								home 	: {
									picture 	: ( ( games[i].attributes['homeTeam'].attributes['profilePicture'] == undefined ) ? defaultPic : games[i].attributes['homeTeam'].attributes['profilePicture'].url() ),
									team 		: games[i].attributes['homeTeam'].attributes['name'],
									score 		: games[i].attributes['score'].attributes['WG']
								},
								away 	: {
									picture 	: ( ( games[i].attributes['awayTeam'].attributes['profilePicture'] == undefined ) ? defaultPic : games[i].attributes['awayTeam'].attributes['profilePicture'].url() ),
									team 		: games[i].attributes['awayTeam'].attributes['name'],
									score 		: games[i].attributes['score'].attributes['VG']
								}
							}));
				} else {
					$('[data-grouping="' + ( league + Date.parse(games[i].attributes['dateTimeOfGame']).toString() ) + '"]')
						.siblings('[data-games]')
							.append(_.template(mobileGameTemplate, {
								leagueFlag 		: false,
								game 	: {
									id 			: games[i].id,
									isStarted 	: games[i].attributes['start'],
									isActive 	: games[i].attributes['active'],
									isFinal 	: games[i].attributes['gameFinal'],
									time 		: convertArmyTime(games[i].attributes['dateTimeOfGame'].getHours(), games[i].attributes['dateTimeOfGame'].getMinutes())
								},
								home 	: {
									picture 	: ( ( games[i].attributes['homeTeam'].attributes['profilePicture'] == undefined ) ? defaultPic : games[i].attributes['homeTeam'].attributes['profilePicture'].url() ),
									team 		: games[i].attributes['homeTeam'].attributes['name'],
									score 		: games[i].attributes['score'].attributes['WG']
								},
								away 	: {
									picture 	: ( ( games[i].attributes['awayTeam'].attributes['profilePicture'] == undefined ) ? defaultPic : games[i].attributes['awayTeam'].attributes['profilePicture'].url() ),
									team 		: games[i].attributes['awayTeam'].attributes['name'],
									score 		: games[i].attributes['score'].attributes['VG']
								}
							}));
				}
			}
		},

		organizeGames: function(games) {
			var usedDates = [], usedLeagues = [];
			var scheduleTemplate = $('#schedule').html();
			var groupingTemplate = $('#grouping').html();
			var gameTemplate = $('#game-widget').html();
			var mobileGameTemplate = $('#mobile-game-widget').html();
			// loop through games
			for ( var i = 0; i < games.length; i++) {
				// date doesn't exists
				if ( $.inArray(Date.parse(games[i].attributes['dateTimeOfGame']), usedDates) == -1 ) {
					// display new date
					$('[data-home]').append(_.template(scheduleTemplate, { absoluteDate: Date.parse(games[i].attributes['dateTimeOfGame']), date: parseDateIntoEnglish(games[i].attributes['dateTimeOfGame'].getDay(), games[i].attributes['dateTimeOfGame'].getMonth(), games[i].attributes['dateTimeOfGame'].getDate(), games[i].attributes['dateTimeOfGame'].getFullYear()) }));
					// used
					usedDates.push(Date.parse(games[i].attributes['dateTimeOfGame']));
				}

				var league = ( ( games[i].attributes['league'] == undefined ) ? '' : games[i].attributes['league'].id );

				// league in date doesn't exist
				if ( $.inArray(( league + Date.parse(games[i].attributes['dateTimeOfGame']).toString() ), usedLeagues) == -1 ) {
					$('[data-date="' + Date.parse(games[i].attributes['dateTimeOfGame']).toString() + '"] [data-schedule]')
						.append(_.template(groupingTemplate, {
							id 			: league,
							grouping 	: league + Date.parse(games[i].attributes['dateTimeOfGame']).toString(),
							league 		: ( ( games[i].attributes['league'] == undefined ) ? undefined : true ),
							picture 	: ( ( games[i].attributes['league'] == undefined ) ? undefined : ( ( games[i].attributes['league'].attributes['profilePicture'] == undefined ) ? defaultPic : games[i].attributes['league'].attributes['profilePicture'].url() ) ),
							name 		: ( ( games[i].attributes['league'] == undefined ) ? undefined : games[i].attributes['league'].attributes['name'] ),
							ageLevel	: ( ( games[i].attributes['league'] == undefined ) ? undefined : games[i].attributes['league'].attributes['competitiveCategory'] ),
							year 		: ( ( games[i].attributes['league'] == undefined ) ? undefined : games[i].attributes['league'].attributes['year'] )
						}));
					usedLeagues.push(league + Date.parse(games[i].attributes['dateTimeOfGame']).toString());
				}

				if (!iphone) {
					$('[data-grouping="' + ( league + Date.parse(games[i].attributes['dateTimeOfGame']).toString() ) + '"]')
						.siblings('[data-games]')
							.append(_.template(gameTemplate, {
								leagueFlag 		: false,
								game 	: {
									id 			: games[i].id,
									isStarted 	: games[i].attributes['start'],
									isActive 	: games[i].attributes['active'],
									isFinal 	: games[i].attributes['gameFinal'],
									time 		: convertArmyTime(games[i].attributes['dateTimeOfGame'].getHours(), games[i].attributes['dateTimeOfGame'].getMinutes())
								},
								home 	: {
									picture 	: ( ( games[i].attributes['homeTeam'].attributes['profilePicture'] == undefined ) ? defaultPic : games[i].attributes['homeTeam'].attributes['profilePicture'].url() ),
									team 		: games[i].attributes['homeTeam'].attributes['name'],
									score 		: games[i].attributes['score'].attributes['WG']
								},
								away 	: {
									picture 	: ( ( games[i].attributes['awayTeam'].attributes['profilePicture'] == undefined ) ? defaultPic : games[i].attributes['awayTeam'].attributes['profilePicture'].url() ),
									team 		: games[i].attributes['awayTeam'].attributes['name'],
									score 		: games[i].attributes['score'].attributes['VG']
								}
							}));
				} else {
					$('[data-grouping="' + ( league + Date.parse(games[i].attributes['dateTimeOfGame']).toString() ) + '"]')
						.siblings('[data-games]')
							.append(_.template(mobileGameTemplate, {
								leagueFlag 		: false,
								game 	: {
									id 			: games[i].id,
									isStarted 	: games[i].attributes['start'],
									isActive 	: games[i].attributes['active'],
									isFinal 	: games[i].attributes['gameFinal'],
									time 		: convertArmyTime(games[i].attributes['dateTimeOfGame'].getHours(), games[i].attributes['dateTimeOfGame'].getMinutes())
								},
								home 	: {
									picture 	: ( ( games[i].attributes['homeTeam'].attributes['profilePicture'] == undefined ) ? defaultPic : games[i].attributes['homeTeam'].attributes['profilePicture'].url() ),
									team 		: games[i].attributes['homeTeam'].attributes['name'],
									score 		: games[i].attributes['score'].attributes['WG']
								},
								away 	: {
									picture 	: ( ( games[i].attributes['awayTeam'].attributes['profilePicture'] == undefined ) ? defaultPic : games[i].attributes['awayTeam'].attributes['profilePicture'].url() ),
									team 		: games[i].attributes['awayTeam'].attributes['name'],
									score 		: games[i].attributes['score'].attributes['VG']
								}
							}));
				}
			}
		},


		organizeGames: function(games) {
			var usedDates = [], usedLeagues = [];
			var scheduleTemplate = $('#league-schedule').html();
			var gameTemplate = $('#game-widget').html();
			// loop through games
			for ( var i = 0; i < games.length; i++) {
				// date doesn't exists
				if ( $.inArray(Date.parse(games[i].attributes['dateTimeOfGame']), usedDates) == -1 ) {
					// display new date
					$('[data-tab="league-schedule"]').append(_.template(scheduleTemplate, { absoluteDate: Date.parse(games[i].attributes['dateTimeOfGame']), date: parseDateIntoEnglish(games[i].attributes['dateTimeOfGame'].getDay(), games[i].attributes['dateTimeOfGame'].getMonth(), games[i].attributes['dateTimeOfGame'].getDate(), games[i].attributes['dateTimeOfGame'].getFullYear()) }));
					// used
					usedDates.push(Date.parse(games[i].attributes['dateTimeOfGame']));
				}

				$('[data-date="' + Date.parse(games[i].attributes['dateTimeOfGame']).toString() + '"]')
					.find('[data-games]')
						.append(_.template(gameTemplate, {
							leagueFlag 		: true,
							game 	: {
								id 			: games[i].id,
								isStarted 	: games[i].attributes['start'],
								isActive 	: games[i].attributes['active'],
								isFinal 	: games[i].attributes['gameFinal'],
								time 		: convertArmyTime(games[i].attributes['dateTimeOfGame'].getHours(), games[i].attributes['dateTimeOfGame'].getMinutes())
							},
							home 	: {
								picture 	: ( ( games[i].attributes['homeTeam'].attributes['profilePicture'] == undefined ) ? defaultPic : games[i].attributes['homeTeam'].attributes['profilePicture'].url() ),
								team 		: games[i].attributes['homeTeam'].attributes['name'],
								score 		: games[i].attributes['score'].attributes['WG']
							},
							away 	: {
								picture 	: ( ( games[i].attributes['awayTeam'].attributes['profilePicture'] == undefined ) ? defaultPic : games[i].attributes['awayTeam'].attributes['profilePicture'].url() ),
								team 		: games[i].attributes['awayTeam'].attributes['name'],
								score 		: games[i].attributes['score'].attributes['VG']
							}
						}));
			}
		},


		
		// accept
		acceptNotification: function(e) {
		
			// get data
			var request = $(e.currentTarget).closest('article').attr('data-request');
			var relation = $(e.currentTarget).closest('article').attr('data-relation');
			var type = $(e.currentTarget).closest('article').attr('data-type');
			
			// disable
			$(e.currentTarget)
				.attr( 'disabled' , true )
					.parent('.responses')
						.siblings('.responses')
							.children('button')
								.attr( 'disabled' , true );
							
			// type
			switch ( parseInt(type) ) {
				// teamLeagueRelation
				case 1:
				
					
				
				break;
				// gameActiveRoster
				case 2:
				
					// overlay and set
					$('.notification--overlay').addClass('in-view');
					$('#set-roster')
						.height( $(window).height() - 60 )
						.attr('data-relation', relation)
						.addClass('setting')
						.find('.loader')
							.removeClass('hidden')
								.end()
						.find('ul')
							.find('li')
								.remove();
						
					// active roster
					var activeRoster = $(e.currentTarget).closest('article').attr('data-active').split(',');
					setRoster = activeRoster;
					
					// team
					var TeamClass = Parse.Object.extend('Team');
					var team = new TeamClass();
					team.id = $(e.currentTarget).closest('article').attr('data-team');
					// search for roster
					var getRoster = new Parse.Query(Parse.Object.extend('userOnRoster'));
					getRoster.equalTo('team', team);
					getRoster.equalTo('status', true);
					getRoster.include('user');
					getRoster.find({
						// success
						success: function(roster) {
							// enable set roster
							$('#setting-roster').removeAttr('disabled');
							// remove loaders
							$('#set-roster')
								.find('.loader')
									.addClass('hidden');
							// if more than 0 players
							if ( roster.length > 0 ) {
								// loop
								for ( var r = 0; r < roster.length; r++ ) {
									// if players and goalies
									if ( $.inArray(roster[r].get('role').position, [ 'Head Coach' , 'Assistant Coach' , 'Trainer' ]) == -1 ) {
										// if player
										if ( $.inArray(roster[r].get('role').position, [ 'Goalie' ] ) == -1 ) {
											// if on active roster
											if ( $.inArray(roster[r].id, activeRoster) != -1 ) {
												// player
												$('ul.players').append('<li data-id="' + roster[r].id + '">' + roster[r].get('number') + ' ' + ( ( roster[r].get('ghostData') ) ? roster[r].get('ghostObject').name : roster[r].get('user').attributes['name'] ) +  '</li>');
											// if not on active roster
											} else {
												// player
												$('ul.players').append('<li class="inactive" data-id="' + roster[r].id + '">' + roster[r].get('number') + ' ' + ( ( roster[r].get('ghostData') ) ? roster[r].get('ghostObject').name : roster[r].get('user').attributes['name'] ) +  '</li>');
											}
										// if goalie
										} else {
											// if on active roster
											if ( $.inArray(roster[r].id, activeRoster) != -1 ) {
												// player
												$('ul.goalies').append('<li data-id="' + roster[r].id + '">' + roster[r].get('number') + ' ' + ( ( roster[r].get('ghostData') ) ? roster[r].get('ghostObject').name : roster[r].get('user').attributes['name'] ) +  '</li>');
											// if not on active roster
											} else {
												// player
												$('ul.goalies').append('<li class="inactive" data-id="' + roster[r].id + '">' + roster[r].get('number') + ' ' + ( ( roster[r].get('ghostData') ) ? roster[r].get('ghostObject').name : roster[r].get('user').attributes['name'] ) +  '</li>');
											}
										}
									}
								}
							// if no players	
							} else {
								// no players
								$('ul.players').append('<li>No players on this team</li>');
								// no goalies
								$('ul.goalies').append('<li>No goalies on this team</li>');
							}
						},
						// error
						error: function(err) {}
					})
									
				break;
			}
			
		},
		
		// setting roster
		settingRoster: function(e) {
			
			// if player
			if ( parseInt($(e.currentTarget).closest('ul').attr('data-type')) == 0 ) {
				// if inactive
				if ( $(e.currentTarget).hasClass('inactive') ) {
					// active
					$(e.currentTarget).removeClass('inactive');
					// push
					setRoster.push($(e.currentTarget).attr('data-id'));
				} else {
					// inactive
					$(e.currentTarget).addClass('inactive');
					// remove
					var ID = setRoster.map(function(e) { return e }).indexOf($(e.currentTarget).attr('data-id'));
					setRoster.splice(ID, 1);
				}
			// goalie
			} else if ( parseInt($(e.currentTarget).closest('ul').attr('data-type')) == 1 ) {
				// if inactive
				if ( $.inArray($(e.currentTarget).attr('data-id'), setRoster) == -1 ) {
					// push
					setRoster.push($(e.currentTarget).attr('data-id'));
					console.log($(e.currentTarget).attr('data-id'))
					// make active
					$(e.currentTarget)
						.removeClass('inactive')
						.siblings('li').each(function() {
							// inative
							$(this).addClass('inactive');
							// remove
							var ID = setRoster.map(function(e) { return e }).indexOf($(this).attr('data-id'));
							setRoster.splice(ID, 1);
						});
				}
			}
			
		},
		
		// set roster
		setRoster: function(e) {
			
			// overlay and set
			$(e.currentTarget).attr('disabled', true);
			$('.notification--overlay').removeClass('in-view');
			$('#set-roster').removeClass('setting');
			$('.set-roster').removeAttr('disabled');
			
			// relation
			var relation = $('#set-roster').attr('data-relation');
			
			// save relation
			var GameActiveRosterClass = Parse.Object.extend('gameActiveRoster');
			var ar = new GameActiveRosterClass();
			ar.id = relation;
			ar.set('players', setRoster);
			ar.save({
				// success
				success: function(active) {
					// update attribute
					$('#notifications--notifications .feed[data-relation="' + active.id + '"]').attr('data-active', active.get('players'));
				},
				// error
				error: function(err) {}
			});
			
		}



		createGame: function(e) {
			controlModal(true, _.template($('#create-official-game-view').html(), this.league), { leftButton : { title : 'Cancel' , action : 0 }, rightButton : { title : 'Create' , action : 'C21' }, heading : 'Create Game' });
			this.findGameParameters(this.league.o);
		},

		findGameParameters: function(league) {
			var self = this;
			var getTeamStandings = new Parse.Query(Parse.Object.extend('teamStatisticRecord'));
			getTeamStandings.equalTo('league', league);
			getTeamStandings.include('team');
			getTeamStandings.descending('TP,W,T,GF');
			getTeamStandings.limit(30);
			getTeamStandings.find({
				success: function(records) {
					// no teams
					if (!records.length) { self.gameSetupUnsuccessful();
					} else {
						possibleTeamsForMatch = [];
						// make teams available
						for ( var i = 0; i < records.length; i++ ) {
							possibleTeamsForMatch.push(records[i]);
							$('#creating-official-game [name="game-home-team"], #creating-official-game [name="game-away-team"]').append('<option data-directive value="' + records[i].get('team').id + '">' + records[i].get('team').attributes['name'] + ' ' + records[i].get('team').attributes['competitiveCategory'] + '</option>');
						}
					}
				},
				error: function(err) {}
			});
		},



		// fix

		createGame: function(e) {
			controlModal(true, _.template($('#create-game-view').html(), this.team), { leftButton : { title : 'Cancel' , action : 0 }, rightButton : { title : 'Create' , action : 'C20' }, heading : 'Create Game' });
			this.findGameParameters(Parse.User.current());
		},

		createUnofficialGame: function(e) {
			// temporarily disable submit button
			$(e.currentTarget).attr( 'disabled' , true );
			
			if ( wasOptionPicked($('[name="game-home-team"]').val()) && wasOptionPicked($('[name="game-away-team"]').val()) && wasOptionPicked($('[name="game-date"]').val()) ) {
			
				var officialCollaborators = [];

				for ( var i = 0; i < $('a[href="#/add-to-game"]').length; i++ ) {
					officialCollaborators.push($('#creating-game a[href="#/add-to-game"]:nth-child(' + ( i + 1 ) + ')')
							.find('[data-id]').text());
				}
				// teams
				var welcoming = new TeamClass();
				welcoming.id = $('[name="game-home-team"]').val();
				var visiting = new TeamClass();
				visiting.id = $('[name="game-away-team"]').val();
				// game
				var GameClass = Parse.Object.extend('Game');
				var game = new GameClass();
				var ACL = new Parse.ACL();
				ACL.setPublicReadAccess(true);
				ACL.setPublicWriteAccess(false);
				ACL.setWriteAccess(Parse.User.current(), true);
				game.set('active', false);
				game.set('arena', ((!$('[name="game-location"]').val().length) ? undefined : $('[name="game-location"]').val() ));
				game.set('awayTeam', visiting);
				game.set('createdBy', Parse.User.current());
				game.set('dateTimeOfGame', new Date(Date.parse($('[name="game-date"]').val())));
				game.set('gameFinal', false);
				game.set('homeTeam', welcoming);
				game.set('officialCollaborators', officialCollaborators);
				game.set('isOfficial', ( ( $('[name="game-type"]').val() == 'Exhibition Game' ) ? false : true ));
				game.set('league', undefined);
				game.set('searchArena', ((!$('[name="game-location"]').val().length) ? undefined : $('[name="game-location"]').val().toLowerCase() ));
				game.set('defaultFirstPeriodMinutes', '15');
				game.set('defaultSecondPeriodMinutes', '15');
				game.set('defaultThirdPeriodMinutes', '15');
				game.set('start', null);
				game.set('initialized', false);
				game.setACL(ACL);
				game.save({
					success: function(game) {
						// publish
						pubnub.publish({
							channel: game.id + '_time',
							message: {
								cTime			: new Date(),
								rTime 			: {
									minutes 	: null,
									seconds 	: null,
									period		: null
								},
								activity 		: 0,
								cActivity		: false 
							}
						});
						// set game statistic record
						var GameStatisticRecordClass = Parse.Object.extend('gameStatisticRecord');
						var record = new GameStatisticRecordClass();
						var ACL = new Parse.ACL();
						ACL.setPublicReadAccess(true);
						ACL.setPublicWriteAccess(false);
						record.set('WG', 0);
						record.set('VG', 0);
						record.set('WS', 0);
						record.set('VS', 0);
						record.set('WH', 0);
						record.set('VH', 0);
						record.set('WP', 0);
						record.set('VP', 0);
						record.set('WF', 0);
						record.set('VF', 0);
						record.set('WT', 0);
						record.set('VT', 0);
						record.set('game', game);
						record.setACL(ACL);
						record.save({
							success: function(gameRecord) {
								game.set('score', gameRecord);
								game.set('homeActiveRoster', null);
								game.set('awayActiveRoster', null);
								game.set('initialized', true);
								game.set('rid', []);
								game.save({
									success: function(gameReady) {
										window.location.href = '#/game/' + gameReady.id;
										controlModal(false);
									},
									error: function(err) { controlModal(false); }
								});
							},
							error: function(err) { controlModal(false); }
						});
					},
					error: function(game, error) { controlModal(false); alert(error.message) }
				});
			} else {
				alert('You need at least two teams, and a date to create a game');
				$(e.currentTarget).removeAttr('disabled');
			}
		},

		findGameParameters: function(user) {
			var self = this;
			var getTeamsOwnedByUser = new Parse.Query(Parse.Object.extend('Team'));
			getTeamsOwnedByUser.equalTo('createdBy', user);
			getTeamsOwnedByUser.find({
				success: function(teams) {
					// no teams
					if (!teams.length) { self.gameSetupUnsuccessful();
					} else {
						// make teams available
						for ( var i = 0; i < teams.length; i++ ) {
							if ( teams[i].id !== self.team.id )
								$('#creating-game [name="game-away-team"]').append('<option data-directive value="' + teams[i].id + '">' + teams[i].attributes['name'] + ' ' + teams[i].attributes['competitiveCategory'] + '</option>');
						}
					}
				}
			});
		},

		gameSetupUnsuccessful: function(e) {
			alert('You need to own at least two teams to create a game');
			controlModal(false);
		},


	
	/*  Objects/Classes
	------------------------------------ */
	
/*
	var statisticClass = Parse.Object.extend("Statistics", {
		defaults: {
			event: ''
		},
		initialize: function() {
			//console.log(true);
			//console.log(this.validate());
		    if (!this.get("event")) {
		    	return false;
		        this.set({"event": this.defaults.event});
		    }
	    }
	});



*/





		adjustMinutes: function(e) {
			var minute = $(e.currentTarget).val();
			// period
			if ( parseInt(this.game.time.currentPeriod) == 1 ) {
				if ( parseInt(minute) >= this.game.time.dfpm ) {
					this.updateLocalClock([this.game.time.dfpm, '00']);
				} else {
					// if less than 10 and greater than 0
					if ( parseInt(minute) < 10 && parseInt(minute) > 0 ) {
						this.updateLocalClock([parseInt(minute).toString(), this.game.time.currentSeconds]);
					} else {
						this.updateLocalClock([minute, this.game.time.currentSeconds]);
					}
				}
			} else if ( parseInt(this.game.time.currentPeriod) == 2 ) {
				if ( parseInt(minute) >= this.game.time.dspm ) {
					this.updateLocalClock([this.game.time.dspm, '00']);
				} else {
					// if less than 10 and greater than 0
					if ( parseInt(minute) < 10 && parseInt(minute) > 0 ) {
						this.updateLocalClock([parseInt(minute).toString(), this.game.time.currentSeconds]);
					} else {
						this.updateLocalClock([minute, this.game.time.currentSeconds]);
					}
				}
			} else if ( parseInt(this.game.time.currentPeriod) == 3 ) {
				if ( parseInt(minute) >= this.game.time.dtpm ) {
					this.updateLocalClock([this.game.time.dtpm, '00']);
				} else {
					// if less than 10 and greater than 0
					if ( parseInt(minute) < 10 && parseInt(minute) > 0 ) {
						this.updateLocalClock([parseInt(minute).toString(), this.game.time.currentSeconds]);
					} else {
						this.updateLocalClock([minute, this.game.time.currentSeconds]);
					}
				}
			}
			// publish changes
			this.publishGameStatus(!clock);
		},

		adjustSeconds: function(e) {
			var second = $(e.currentTarget).val();
			// period
			if ( parseInt(this.game.time.currentPeriod) == 1 ) {
				if ( parseInt(this.game.time.currentMinutes) >= this.game.time.dfpm && second != '00' ) {
					this.updateLocalClock([this.game.time.dfpm, '00']);
				} else {
					this.updateLocalClock([this.game.time.currentMinutes, second]);
				}
			} else if ( parseInt(this.game.time.currentPeriod) == 2 ) {
				if ( parseInt(this.game.time.currentMinutes) >= this.game.time.dspm && second != '00' ) {
					this.updateLocalClock([this.game.time.dspm, '00']);
				} else {
					this.updateLocalClock([this.game.time.currentMinutes, second]);
				}
			} else if ( parseInt(this.game.time.currentPeriod) == 3 ) {
				if ( parseInt(this.game.time.currentMinutes) >= this.game.time.dtpm && second != '00' ) {
					this.updateLocalClock([this.game.time.dtpm, '00']);
				} else {
					this.updateLocalClock([this.game.time.currentMinutes, second]);
				}
			}
			// publish changes
			this.publishGameStatus(!clock);
		},

		adjustTime: function(e) {
			// phasing
			this.timeAdjust = 0;

			this.stopClock();
			// collaborating
			this.controlCollaboratorFrame(true);
			// show options
			this.minuteAdjustOptions();

			$('[data-collaborator-header]').text('Set Time (Minutes)');
		},

		adjustPeriod: function(e) {
			this.stopClock();
			// collaborating
			this.controlCollaboratorFrame(true);
			// show options
			this.periodAdjustOptions();

			$('[data-collaborator-header]').text('Set Period');
		},

		controlPeriodAdjust: function(e) {
			e.preventDefault();
			var data = $(e.currentTarget).attr('data-period-adjust');

			if ( $.inArray(parseInt(data), [ 1 , 2 , 3 ]) != -1 ) {
				this.updateLocalPeriod(data);
				this.controlCollaboratorFrame(false);

				switch (parseInt(data)) {
					case 1: this.updateLocalClock([ this.game.time.dfpm , '00' ]); break;
					case 2: this.updateLocalClock([ this.game.time.dspm , '00' ]); break;
					case 3: this.updateLocalClock([ this.game.time.dtpm , '00' ]); break;
				}

			}
		},


// Search View
	var SearchView = Parse.View.extend({
		
		el: $('[data-app-main]'),

		view: 4,
		
		initialize: function() {
		
			// unbind previous events
			$('[data-app-main]').unbind();
			
			// binding this to functions that reference this
			_.bindAll(this, 'render');
			
			// render page
			this.render();

			bearing('SEARCH');

			$('[data-mobile-search]').addClass('search__input--mobile--visible');
			$('[data-app]').addClass('wrapper--search');

			//$();

			initInteractiveScorbit(false);
			
		},

		events: function() {
		
			// if iPhone
			return ( iphone || ipad ) ?
			
				{

					'touchstart [data-feed-entity]' : 'touchResult',
					'touchmove [data-feed-entity]' : 'moveResult',
					'click [data-feed-entity]' : 'reAdjustUI'

				}
				:
				{

				}

		},

		reAdjustUI: function(e) {
			$('[data-mobile-search]').removeClass('search__input--mobile--visible');
			$('[data-app]').removeClass('wrapper--search');
		},

		touchResult: function(e) {
			$(e.currentTarget)
				.addClass('entity-feed__link--tapped')
				.siblings()
					.removeClass('entity-feed__link--tapped');
		},

		moveResult: function(e) { $(e.currentTarget).removeClass('entity-feed__link--tapped'); },
		
		render: function() {
			// grabbing template and inserting into el
			var template = _.template( $('#search-template').html() );
			this.$el.html( template );
			// search
			if ( !( iphone || ipad ) ) this.search(document.URL.split('/').pop());
		},

		search: function(query) {
			this.searchForUsers(query);
			this.searchForTeams(query);
			this.searchForLeagues(query);
		},

		searchForUsers: function(query) {
			// by name
			var searchForUserByName = new Parse.Query(Parse.Object.extend('User'));
			searchForUserByName.startsWith('name', query);
			// by case-insensitive name
			var searchForUserByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('User'));
			searchForUserByNameCaseInsensitive.startsWith('searchName', query);
			// by username
			var searchForUserByUsername = new Parse.Query(Parse.Object.extend('User'));
			searchForUserByUsername.startsWith('username', query);
			// by case-insensitive username
			var searchForUserByUsernameCaseInsensitive = new Parse.Query(Parse.Object.extend('User'));
			searchForUserByUsernameCaseInsensitive.startsWith('searchUsername', query);
			// search for users
			var searchForUsers = Parse.Query.or(searchForUserByName, searchForUserByNameCaseInsensitive, searchForUserByUsername, searchForUserByUsernameCaseInsensitive);
			searchForUsers.limit(10);
			searchForUsers.find({
				success: function(users) {
					var results = [];
					// organize
					for ( var i = 0; i < users.length; i++ ) {
						var result = {
							primary: users[i].get('name'),
							secondary: users[i].get('username'),
							link: users[i].get('username'),
							avatar: ( ( users[i].get('profilePicture') == undefined ) ? defaultPic : users[i].get('profilePicture').url() )
						}
						// push
						results.push(result);
					}
					// no results
					if (!users.length) results.push({ primary: "No Results", secondary: "Try searching for something similar", link: "", avatar: defaultPic });
					// remove previous
					$('[data-results-users]')
						.find('[data-feed-entity]').remove();
					// display
					$('[data-results-users]').append(_.template($('#search-result-template').html(), {results:results}));
				},
				error: function(err) {}
			});
		},

		searchForTeams: function(query) {
			// by name
			var searchForTeamByName = new Parse.Query(Parse.Object.extend('Team'));
			searchForTeamByName.startsWith('name', query);
			// by case-insensitive name
			var searchForTeamByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
			searchForTeamByNameCaseInsensitive.startsWith('searchName', query);
			// by age competitive category
			var searchForTeamByAgeGroup = new Parse.Query(Parse.Object.extend('Team'));
			searchForTeamByAgeGroup.startsWith('competitiveCategory', query);
			// by case-insensitive competitive category
			var searchForTeamByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
			searchForTeamByAgeGroupCaseInsensitive.startsWith('competitiveCategory', query);
			// by creator by name
			var teamCreatorByName = new Parse.Query(Parse.User);
			teamCreatorByName.startsWith('name', query);
			var searchForTeamByCreatorByName = new Parse.Query(Parse.Object.extend('Team'));
			searchForTeamByCreatorByName.matchesQuery('createdBy', teamCreatorByName);
			// by creator by username
			var teamCreatorByUsername = new Parse.Query(Parse.User);
			teamCreatorByUsername.startsWith('username', query);
			var searchForTeamByCreatorByUsername = new Parse.Query(Parse.Object.extend('Team'));
			searchForTeamByCreatorByUsername.matchesQuery('createdBy', teamCreatorByUsername);
			// search for teams
			var searchForTeams = Parse.Query.or(searchForTeamByName, searchForTeamByNameCaseInsensitive, searchForTeamByAgeGroup, searchForTeamByAgeGroupCaseInsensitive, searchForTeamByCreatorByName, searchForTeamByCreatorByUsername);
			searchForTeams.include('createdBy');
			searchForTeams.limit(10);
			searchForTeams.find({
				success: function(teams) {
					var results = [];
					// organize
					for ( var i = 0; i < teams.length; i++ ) {
						var result = {
							primary: teams[i].get('name'),
							secondary: teams[i].get('competitiveCategory') + ' ' + teams[i].get('year'),
							link: 'team/' + teams[i].id,
							avatar: ( ( teams[i].get('profilePicture') == undefined ) ? defaultPic : teams[i].get('profilePicture').url() )
						}
						// push
						results.push(result);
					}
					// no results
					if (!teams.length) results.push({ primary: "No Results", secondary: "Try searching for something similar", link: "", avatar: defaultPic });
					// remove previous
					$('[data-results-teams]')
						.find('[data-feed-entity]').remove();
					// display
					$('[data-results-teams]').append(_.template($('#search-result-template').html(), {results:results}));
				},
				error: function(err) {}
			});	
		},

		searchForLeagues: function(query) {
			// by name
			var searchForLeagueByName = new Parse.Query(Parse.Object.extend('League'));
			searchForLeagueByName.startsWith('name', query);
			// by case-insensitive name
			var searchForLeagueByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
			searchForLeagueByNameCaseInsensitive.startsWith('searchName', query);
			// by competitive category
			var searchForLeagueByAgeGroup = new Parse.Query(Parse.Object.extend('League'));
			searchForLeagueByAgeGroup.startsWith('competitiveCategory', query);
			// by case-insensitive competitive category
			var searchForLeagueByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
			searchForLeagueByAgeGroupCaseInsensitive.startsWith('competitiveCategory', query);
			// by creator by name
			var leagueCreatorByName = new Parse.Query(Parse.User);
			leagueCreatorByName.startsWith('name', query);
			var searchForLeagueByCreatorByName = new Parse.Query(Parse.Object.extend('League'));
			searchForLeagueByCreatorByName.matchesQuery('createdBy', leagueCreatorByName);
			// by creator by username
			var leagueCreatorByUsername = new Parse.Query(Parse.User);
			leagueCreatorByUsername.startsWith('username', query);
			var searchForLeagueByCreatorByUsername = new Parse.Query(Parse.Object.extend('League'));
			searchForLeagueByCreatorByUsername.matchesQuery('createdBy', leagueCreatorByUsername);
			// search for leagues
			var searchForLeagues = Parse.Query.or(searchForLeagueByName, searchForLeagueByNameCaseInsensitive, searchForLeagueByAgeGroup, searchForLeagueByAgeGroupCaseInsensitive, searchForLeagueByCreatorByName, searchForLeagueByCreatorByUsername);
			searchForLeagues.include('createdBy');
			searchForLeagues.limit(10);
			searchForLeagues.find({
				success: function(leagues) {
					var results = [];
					// organize
					for ( var i = 0; i < leagues.length; i++ ) {
						var result = {
							primary: leagues[i].get('name'),
							secondary: leagues[i].get('competitiveCategory') + ' ' + leagues[i].get('year'),
							link: 'league/' + leagues[i].id,
							avatar: ( ( leagues[i].get('profilePicture') == undefined ) ? defaultPic : leagues[i].get('profilePicture').url() )
						}
						// push
						results.push(result);
					}
					// no results
					if (!leagues.length) results.push({ primary: "No Results", secondary: "Try searching for something similar", link: "", avatar: defaultPic });
					// remove previous
					$('[data-results-leagues]')
						.find('[data-feed-entity]').remove();
					// display
					$('[data-results-leagues]').append(_.template($('#search-result-template').html(), {results:results}));
				},
				error: function(err) {}
			});
		}

	});