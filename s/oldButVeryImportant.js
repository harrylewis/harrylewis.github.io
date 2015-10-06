/*  Create
	------------------------------------ */
	
	// open modal
	$('a#create').on('click', function(e) {
	
		e.preventDefault();
		// if not iphone
		if ( !iphone ) {
			// form is height of window - header height
			$('div#slide-up-modal form').height( $(window).height() - $('header[role="modal"]').outerHeight() );
			// wait 100 ms
			setTimeout(function() {
				// modal active
				$('#slide-up-modal').addClass('modal-active');
			}, 100);
			// show create frame
			$('div#slide-up-modal ul')
				.children('div:not(.results)')
					.html('')
					.removeClass()
						.end()
				.children('div:first-child')
					.addClass('z');
			// clear results
			$('div.results').html('');				
			// reset create phase
			createPhase = 0;				
			// create
			var create = [ 'Game' , 'Team' , 'League' ];
			// display create options				
			for ( var i = 0; i < 3; i++ ) {
				// new li
				var li = document.createElement('li');
				// new li properties
				$(li)
					.addClass('next-field')
					.attr( 'data-value' , create[i] )
					.text(create[i]);
				// append new li
				$('div#slide-up-modal ul div.z').append(li);
			}
			// set header
			$('div#slide-up-modal header h2').text('Create');
			// get rid of scroll
			$('body').css( 'overflow' , 'hidden' );
		}
		
	});
	
	// close modal
	$('#cancel-create').on('click', function(e) {
		
		e.preventDefault();
		// reset create frame
		function resetCreateFrame() {
			// clear new game, team, and league object, and phase
			newGameObject = {};
			newTeamObject = {};
			newLeagueObject = {};
			createPhase = 0;
			// hide modal
			$('#slide-up-modal').removeClass('modal-active');
			// bring back scroll
			$('body').css( 'overflow' , 'scroll' );
			// deactive back button
			$('#back-create')
				.attr( 'disabled' , true );	
		}
		// if not iphone
		if ( !iphone )
			// reset
			resetCreateFrame();
		
	});
	
	// forward create
	$('form#create').on('click', '.next-field', function(e) {
		
		e.preventDefault();
		e.stopPropagation();
		// if not iphone
		if ( !iphone ) {
			// if current tag is button
			if ( e.currentTarget.tagName === 'BUTTON' )
				// disable
				$(e.currentTarget).attr( 'disabled' , 'true' );
			// grab data
			var data = $(e.currentTarget).attr('data-value') || $(e.currentTarget).closest('li').siblings('li').children('input').val();
			// objectifying lists
			var listOne = $('#slide-up-modal ul > div:nth-child(1)');
			var listTwo = $('#slide-up-modal ul > div:nth-child(2)');
			// next list animation
			function animateNext() {
				
				// current and next list
				var currentList;
				var nextList
				// determine which list is current and next
				if ( listOne.hasClass('z') ) {
					currentList = listOne;
					nextList = listTwo;
				} else {
					currentList = listTwo;
					nextList = listOne;
				}
				// animate current items out and move current div back in z-direction
				currentList.children('li').addClass('slide-option-out');
				currentList.removeClass('z');
				// after 5 ms animate next items in and move next div forward in z-direction
				setTimeout(function() {
					// slide options in
					nextList.children('li:not(.hidden)').removeClass('slide-option-in');
					nextList.addClass('z');
					// focus on input
					nextList.children('li:first-child').children('input').focus();
				}, 5);
					
			}
			// reset create frame
			function resetCreateFrame() {
				// clear new game, team, and league object, and phase
				newGameObject = {};
				newTeamObject = {};
				newLeagueObject = {};
				createPhase = 0;
				// hide modal
				$('#slide-up-modal').removeClass('modal-active');
				// bring back scroll
				$('body').css( 'overflow' , 'scroll' );
				// deactive back button
				$('#back-create')
					.attr( 'disabled' , true );	
			}
			// fill in form
			function populateForm( type , phase ) {
			
				// get correct list
				if ( listOne.hasClass('z') ) list = listTwo;
				else						 list = listOne;
				// clear list
				list.html('');
				// type
				switch ( type ) {
					// game
					case 0:
					
						// phase
						switch ( phase ) {
							case 0:
							
								// leagues of user
								var leaguesOfUser = new Parse.Query(Parse.Object.extend('League'));
								leaguesOfUser.equalTo( 'createdBy' , Parse.User.current() );
						////////// searching for leagues
								leaguesOfUser.find({
									// success
									success: function(leagues) {
										// clear possible leagues
										possibleLeagues = [];
										// if user has leagues
										if ( leagues.length > 0 ) {
											// possible leagues
											for ( var l = 0; l < leagues.length; l++ ) {
												possibleLeagues.push(leagues[l]);
											}
											// get teams of league
											var getTeamsOfLeague = new Parse.Query(Parse.Object.extend('teamInLeague'));
											getTeamsOfLeague.containedIn( 'league' , possibleLeagues );
											getTeamsOfLeague.equalTo( 'status' , true );
									////////// get teams
											getTeamsOfLeague.include('team');
											getTeamsOfLeague.include('league');
											getTeamsOfLeague.find({
												// success
												success: function(teams) {
													// loop through teams
													for ( var r = 0; r < teams.length; r++ ) {
														// push
														possibleTeams.push(teams[r]);
														console.log(teams[r]);
													}
													// clear possible teams
													possibleTeams = [];
													// real possible leagues
													realPossibleLeagues = [];
													// set count at 0
													var count = 0;
													// loop through possible leagues
													for ( var t = 0; t < possibleLeagues.length; t++ ) {
														// reset count
														count = 0;
														// loop through teams
														for ( var i = 0; i < teams.length; i++ ) {
															// if last loop
															if ( t == ( possibleLeagues.length - 1 ) )
																// push
																possibleTeams.push(teams[i]);
															// if league has amn active team
															if ( possibleLeagues[t].id === teams[i].get('league').id )
																// +1
																count++;
														}
														// if active teams in league
														if ( count > 0 )
															// add to real possible leagues
															realPossibleLeagues.push(possibleLeagues[t]);
														// if looping done
														if ( t == ( possibleLeagues.length - 1 ) ) {
															// if more than 0 in real possible leagues
															if ( realPossibleLeagues.length > 0 ) {
																// has leagues
																hasLeague = true;
																// append two li
																for ( var i = 0; i < 2; i++ ) {
																	// new li
																	var li = document.createElement('li');
																	// new li properties
																	$(li)
																		.addClass('next-field');
																	// append new li
																	list.append(li);
																}
																// adjust first li
																list
																	.children('li:first-child')
																		.addClass('slide-option-in')
																		.text('Exhibition')
																		.attr({ 'data-value' : 'Exhibition' });
																// adjust last li		
																list
																	.children('li:last-child')
																		.addClass('slide-option-in')
																		.text('Season')
																		.attr({ 'data-value' : 'Season' });
																// set header
																$('div#slide-up-modal header h2').text('Game Type');
																// animate transition
																animateNext();
																// increment phase by 0.5
																createPhase = 0.5;
															// if no leagues in real possible leagues	
															} else {
																// has leagues
																hasLeague = false;
																// update new game object
																newGameObject.league = null;
																// append two li
																for ( var i = 0; i < 1; i++ ) {
																	// new li
																	var li = document.createElement('li');
																	// new li properties
																	$(li)
																		.addClass('slide-option-in')
																		.html('<input type="text" placeholder="&#xf002; Search for home team" data-validation="search" />');
																	// append new li
																	list.append(li);
																}
																// append results div
																list
																	.append('<div class="results home-search"></div>')
																	.children('div.results')
																		.height( $(window).height() - $('div#slide-up-modal header').outerHeight() - $('div.results').siblings('li').outerHeight() );
																// add overflow after 5ms
																setTimeout(function() {
																	list.children('div.results').addClass('add-overflow');
																}, 500);
																// animate transition
																animateNext();
																// increment phase by 2
																createPhase = 2;
															}
														}
													}
												},
												// error
												error: function(error) {}
											});
										// if user has no league	
										} else {
											// has leagues
											hasLeague = false;
											// update new game object
											newGameObject.league = null;
											// append two li
											for ( var i = 0; i < 1; i++ ) {
												// new li
												var li = document.createElement('li');
												// new li properties
												$(li)
													.addClass('slide-option-in')
													.html('<input type="text" placeholder="&#xf002; Search for home team" data-validation="search" />');
												// append new li
												list.append(li);
											}
											// append results div
											list
												.append('<div class="results home-search"></div>')
												.children('div.results')
													.height( $(window).height() - $('div#slide-up-modal header').outerHeight() - $('div.results').siblings('li').outerHeight() );
											// add overflow after 5ms
											setTimeout(function() {
												list.children('div.results').addClass('add-overflow');
											}, 500);
											// set header
											$('div#slide-up-modal header h2').text('Home Team');
											// animate transition
											animateNext();
											// increment phase by 2
											createPhase = 2;
										}
										
									},
									// error
									error: function(error) {}
								});
								
							break;
							case set.game.seasOrExhi:
							
								// if exhibition
								if ( data == 'Exhibition' ) {
									// update new game object
									newGameObject.league = null;
									// append two li
									for ( var i = 0; i < 1; i++ ) {
										// new li
										var li = document.createElement('li');
										// new li properties
										$(li)
											.addClass('slide-option-in')
											.html('<input type="text" placeholder="&#xf002; Search for home team" data-validation="search" />');
										// append new li
										list.append(li);
									}
									// append results div
									list
										.append('<div class="results home-search"></div>')
										.children('div.results')
											.height( $(window).height() - $('div#slide-up-modal header').outerHeight() - $('div.results').siblings('li').outerHeight() );
									// add overflow after 5ms
									setTimeout(function() {
										list.children('div.results').addClass('add-overflow');
									}, 500);
									// animate transition
									animateNext();
									// increment phase by 2
									createPhase = 2;
								// if season	
								} else if ( data == 'Season' ) {
									// append two li
									for ( var i = 0; i < realPossibleLeagues.length; i++ ) {
										// new li
										var li = document.createElement('li');
										// new li properties
										$(li)
											.addClass('slide-option-in')
											.addClass('next-field')
											.attr( 'data-value' , realPossibleLeagues[i].id )
											.text(realPossibleLeagues[i].attributes['name'] + ' ' + realPossibleLeagues[i].attributes['competitiveCategory']);
										// append new li
										list.append(li);
									}	
									// animate
									animateNext();
									// increment createPhase by 0.5
									createPhase = 1;
								}
							
							break;
							case set.game.league:
							
								// update new game object
								newGameObject.league = data;
								// append two li
								for ( var i = 0; i < possibleTeams.length; i++ ) {
									// if team part of league
									if ( possibleTeams[i].attributes['league'].id === data ) {
										// new li
										var li = document.createElement('li');
										// new li properties
										$(li)
											.addClass('slide-option-in')
											.addClass('next-field')
											.attr({ 'data-value' : possibleTeams[i].attributes['team'].id , 'data-value-creator' : possibleTeams[i].attributes['team'].attributes['createdBy'].id })
											.text(possibleTeams[i].attributes['team'].attributes['name']);
										// append new li
										list.append(li);
									}
								}
								
								// animate
								animateNext();
								// increment phase
								createPhase++;
							
							break;
							case set.game.homeTeam:
							
								// if exhibition
								if ( newGameObject.league == null ) {
									// update new game object
									newGameObject.home.team = data;
									newGameObject.home.creator = $(e.currentTarget).attr('data-value-creator');
									// append two li
									for ( var i = 0; i < 1; i++ ) {
										// new li
										var li = document.createElement('li');
										// new li properties
										$(li)
											.addClass('slide-option-in')
											.html('<input type="text" placeholder="&#xf002; Search for away team" data-validation="search" />');
										// append new li
										list.append(li);
									}
									// remove overflow
									list
										.siblings('div')
											.children('div.results.home-search')
												.html('')
												.removeClass('add-overflow');
									// append results div
									list
										.append('<div class="results away-search"></div>')
										.children('div.results')
											.height( $(window).height() - $('div#slide-up-modal header').outerHeight() - $('div.results.away-search').siblings('li').outerHeight() );
									// add overflow after 5ms
									setTimeout(function() {
										list.children('div.results.away-search').addClass('add-overflow');
									}, 500);
								// if season
								} else {
									// update new game object
									newGameObject.home.team = data;
									newGameObject.home.creator = $(e.currentTarget).attr('data-value-creator');
									// append two li
									for ( var i = 0; i < possibleTeams.length; i++ ) {
										// if team part of league
										if ( possibleTeams[i].attributes['league'].id === newGameObject.league && possibleTeams[i].attributes['team'].id !== newGameObject.home.team ) {
											// new li
											var li = document.createElement('li');
											// new li properties
											$(li)
												.addClass('slide-option-in')
												.addClass('next-field')
												.attr({ 'data-value' : possibleTeams[i].attributes['team'].id , 'data-value-creator' : possibleTeams[i].attributes['team'].attributes['createdBy'].id })
												.text(possibleTeams[i].attributes['team'].attributes['name']);
											// append new li
											list.append(li);
										}
									}
								}
								
								// animate
								animateNext();
								// increment phase
								createPhase++;
							
							break;
							case set.game.awayTeam:
							
								// if exhibition
								if ( newGameObject.league == null ) {
									// update new game object
									newGameObject.away.team = data;
									newGameObject.away.creator = $(e.currentTarget).attr('data-value-creator');
									// append two li
									for ( var i = 0; i < 2; i++ ) {
										// new li
										var li = document.createElement('li');
										// new li properties
										list.append(li);
									}
									// adjust first li
									list
										.children('li:first-child')
											.addClass('slide-option-in')
											.html('<input type="text" placeholder="Location" />');
									// adjust last li		
									list
										.children('li:last-child')
											.addClass('slide-option-in')
											.addClass('no-pad')
											.html('<button class="next-field cf">Next <span>&#xe0dc;</span></button>');
									// remove overflow
									list
										.siblings('div')
											.children('div.results.away-search')
												.html('')
												.removeClass('add-overflow');
								// if season
								} else {
									// update new game object
									newGameObject.away.team = data;
									newGameObject.away.creator = $(e.currentTarget).attr('data-value-creator');
									// append two li
									for ( var i = 0; i < 2; i++ ) {
										// new li
										var li = document.createElement('li');
										// new li properties
										list.append(li);
									}
									// adjust first li
									list
										.children('li:first-child')
											.addClass('slide-option-in')
											.html('<input type="text" placeholder="Location" />');
									// adjust last li		
									list
										.children('li:last-child')
											.addClass('slide-option-in')
											.addClass('no-pad')
											.html('<button class="next-field cf">Next <span>&#xe0dc;</span></button>');
									// remove overflow
									list
										.siblings('div')
											.children('div.results.away-search')
												.html('')
												.removeClass('add-overflow');
								}
								
								// animate
								animateNext();
								// increment phase
								createPhase++;
							
							break;
							case set.game.location:
							
								// disable back button
								$('button#back-create').attr( 'disabled' , 'true' );
								// update new object
								newGameObject.location = ( data == '' || data == false ) ? undefined : data;
								// create new team
								var newGame = Parse.Object.extend('Game');
								var game = new newGame();
								// create league
								var newLeague = Parse.Object.extend('League');
								var league = new newLeague();
								league.id = newGameObject.league;
								// create new team
								var newTeam = Parse.Object.extend('Team');
								// home team
								var homeTeam = new newTeam();
								homeTeam.id = newGameObject.home.team;
								// away team
								var awayTeam = new newTeam();
								awayTeam.id = newGameObject.away.team;
								// create ACL permissions
								var ACL = new Parse.ACL();
								ACL.setPublicReadAccess(true);
								ACL.setPublicWriteAccess(false);
								ACL.setWriteAccess( Parse.User.current() , true );
								// set permissions and preliminary profile information
								game.set( 'active' , true );
								game.set( 'arena' , newGameObject.location );
								game.set( 'awayTeam' , awayTeam );
								game.set( 'createdBy' , Parse.User.current() );
								game.set( 'currentPeriod' , '1' );
								game.set( 'dateTimeOfGame' , newGameObject.time );
								game.set( 'gameFinal' , false );
								game.set( 'homeTeam' , homeTeam );
								game.set( 'isOfficial' , ( ( newGameObject.league == null || newGameObject.league == undefined ) ? false : true ) );
								game.set( 'league' , ( ( newGameObject.league == null || newGameObject.league == undefined ) ? undefined : league ) );
								game.set( 'minutes' , '15' );
								game.set( 'seconds' , '00' );
								game.set( 'searchArena' , ( ( newGameObject.location == null || newGameObject.location == undefined ) ? undefined : newGameObject.location.toLowerCase() ) );
								game.setACL( ACL );
						////////// creating new team
								game.save({
									// success
									success: function(newestGame) {
										// if official game
										if ( newestGame.get('isOfficial') ) {
											// new request object
											var request = Parse.Object.extend('Request');
											var firstRequest = new request();
											// set first request ACL
											var firstACL = new Parse.ACL();
											firstACL.setPublicReadAccess(false);
											firstACL.setPublicWriteAccess(false);
											firstACL.setReadAccess( Parse.User.current() , true );
											firstACL.setWriteAccess( Parse.User.current() , true );
											firstACL.setReadAccess( newGameObject.home.creator , true );
											firstACL.setWriteAccess( newGameObject.home.creator , true );
											// set request
											firstRequest.set( 'initiator' , Parse.User.current() );
											firstRequest.set( 'invitee' , {"__type":"Pointer","className":"User","objectId":""+ newGameObject.home.creator +""} );
											firstRequest.set( 'type'  , 'gameRoster' );
											firstRequest.set( 'rosterSpot' , null );
											firstRequest.set( 'leagueSpot' , null );
											firstRequest.set( 'gameSpot' , newestGame );
											firstRequest.set( 'responseReceived'  , false );
											firstRequest.setACL(firstACL);
									////////// send request		
											firstRequest.save(null, {
												// success
												success: function(requestNumberOne) {
													// new request object
													var request = Parse.Object.extend('Request');
													var secondRequest = new request();
													// set first request ACL
													var secondACL = new Parse.ACL();
													secondACL.setPublicReadAccess(false);
													secondACL.setPublicWriteAccess(false);
													secondACL.setReadAccess( Parse.User.current() , true );
													secondACL.setWriteAccess( Parse.User.current() , true );
													secondACL.setReadAccess( newGameObject.away.creator , true );
													secondACL.setWriteAccess( newGameObject.away.creator , true );
													// set request
													secondRequest.set( 'initiator' , Parse.User.current() );
													secondRequest.set( 'invitee' , {"__type":"Pointer","className":"User","objectId":""+ newGameObject.away.creator +""} );
													secondRequest.set( 'type'  , 'gameRoster' );
													secondRequest.set( 'rosterSpot' , null );
													secondRequest.set( 'leagueSpot' , null );
													secondRequest.set( 'gameSpot' , newestGame );
													secondRequest.set( 'responseReceived'  , false );
													secondRequest.setACL(secondACL);
											////////// send request
													secondRequest.save(null, {
														// success
														success: function(requestNumberTwo) {
															// reset
															resetCreateFrame();
															// reset phase
															createPhase = 0;
															// redirect to team home page
															window.location.href = '#/game/' + newestGame.id;
														},
														// error
														error: function(error) {}
													});	
												},
												// error
												error: function(error) {}
											});
										// if not official game
										} else {
											// reset
											resetCreateFrame();
											// reset phase
											createPhase = 0;
											// redirect to team home page
											window.location.href = '#/game/' + newestGame.id;
										}
									},
									// error
									error: function(error) {}
								});
							
							break;
						}
					
					break;
					// team
					case 1:
					
						// phase
						switch ( phase ) {
							case 0:
							
								// append two li
								for ( var i = 0; i < 2; i++ ) {
									// new li
									var li = document.createElement('li');
									// new li properties
									list.append(li);
								}
								// adjust first li
								list
									.children('li:first-child')
										.addClass('slide-option-in')
										.html('<input type="text" placeholder="Team Name" data-validation="required" />');
								// adjust last li		
								list
									.children('li:last-child')
										.addClass('slide-option-in')
										.addClass('hidden')
										.html('<button class="next-field cf" disabled="true">Next <span>&#xe0dc;</span></button>');
								// animate transition
								animateNext();
								// increment phase
								createPhase++;
										
							break;
							case set.team.name:
							
								// update new object
								newTeamObject.name = data;
								// append two li
								for ( var i = 0; i < 2; i++ ) {
									// new li
									var li = document.createElement('li');
									// new li properties
									list.append(li);
								}
								// adjust first li
								list
									.children('li:first-child')
										.addClass('slide-option-in')
										.html('<input type="text" placeholder="Age Group/Level" data-validation="required" />');
								// adjust last li		
								list
									.children('li:last-child')
										.addClass('slide-option-in')
										.addClass('hidden')
										.html('<button class="next-field" disabled="true">Next <span>&#xe0dc;</span></button>');
								// animate
								animateNext();
								// increment phase
								createPhase++;
								
							break;
							case set.team.ageLevel:
							
								// update new object
								newTeamObject.ageLevel = data;
								// append two li
								for ( var i = 0; i < 2; i++ ) {
									// new li
									var li = document.createElement('li');
									// new li properties
									list.append(li);
								}
								// adjust first li
								list
									.children('li:first-child')
										.addClass('slide-option-in')
										.html('<input type="text" placeholder="Season" data-validation="required" />');
								// adjust last li		
								list
									.children('li:last-child')
										.addClass('slide-option-in')
										.addClass('hidden')
										.html('<button class="next-field" disabled="true">Create <span>&#xe0dc;</span></button>');
								// animate
								animateNext();
								// increment phase
								createPhase++;
							
							break;
							case set.team.season:
								
								// disable back button
								$('button#back-create').attr( 'disabled' , 'true' );
								// update new object
								newTeamObject.season = data;
								// create new team
								var newTeam = Parse.Object.extend('Team');
								var team = new newTeam();
								// create ACL permissions
								var ACL = new Parse.ACL();
								ACL.setPublicReadAccess(true);
								ACL.setPublicWriteAccess(false);
								ACL.setWriteAccess( Parse.User.current() , true );
								// set permissions and preliminary profile information
								team.set( 'createdBy' , Parse.User.current() );
								team.set( 'name' , newTeamObject.name );
								team.set( 'competitiveCategory' , newTeamObject.ageLevel );
								team.set( 'year' , newTeamObject.season );
								team.set( 'searchName' , newTeamObject.name.toLowerCase() );
								team.set( 'searchCompetitiveCategory' , newTeamObject.ageLevel.toLowerCase() );
								team.set( 'active' , true )
								team.setACL( ACL );
						////////// creating new team
								team.save({
									// success
									success: function(newestTeam) {
										// reset
										resetCreateFrame();
										// reset phase
										createPhase = 0;
										// redirect to team home page
										window.location.href = '#/team/' + newestTeam.id;
									},
									// error
									error: function(error) {}
								});
							
							break;
						}
					
					break;
					// league
					case 2:
					
						// phase
						switch ( phase ) {
							case 0:
							
								// append two li
								for ( var i = 0; i < 2; i++ ) {
									// new li
									var li = document.createElement('li');
									// new li properties
									list.append(li);
								}
								// adjust first li
								list
									.children('li:first-child')
										.addClass('slide-option-in')
										.html('<input type="text" placeholder="League Name" data-validation="required" />');
								// adjust last li		
								list
									.children('li:last-child')
										.addClass('slide-option-in')
										.addClass('hidden')
										.html('<button class="next-field cf" disabled="true">Next <span>&#xe0dc;</span></button>');
								// animate transition
								animateNext();
								// increment phase
								createPhase++;
										
							break;
							case set.league.name:
							
								// update new object
								newLeagueObject.name = data;
								// append two li
								for ( var i = 0; i < 2; i++ ) {
									// new li
									var li = document.createElement('li');
									// new li properties
									list.append(li);
								}
								// adjust first li
								list
									.children('li:first-child')
										.addClass('slide-option-in')
										.html('<input type="text" placeholder="Age Group/Level" data-validation="required" />');
								// adjust last li		
								list
									.children('li:last-child')
										.addClass('slide-option-in')
										.addClass('hidden')
										.html('<button class="next-field" disabled="true">Next <span>&#xe0dc;</span></button>');
								// animate
								animateNext();
								// increment phase
								createPhase++;
								
							break;
							case set.league.ageLevel:
							
								// update new object
								newLeagueObject.ageLevel = data;
								// append two li
								for ( var i = 0; i < 2; i++ ) {
									// new li
									var li = document.createElement('li');
									// new li properties
									list.append(li);
								}
								// adjust first li
								list
									.children('li:first-child')
										.addClass('slide-option-in')
										.html('<input type="text" placeholder="Season" data-validation="required" />');
								// adjust last li		
								list
									.children('li:last-child')
										.addClass('slide-option-in')
										.addClass('hidden')
										.html('<button class="next-field" disabled="true">Create <span>&#xe0dc;</span></button>');
								// animate
								animateNext();
								// increment phase
								createPhase++;
							
							break;
							case set.league.season:
							
								// disable back button
								$('button#back-create').attr( 'disabled' , 'true' );
								// update new object
								newLeagueObject.season = data;
								// create new team
								var newLeague = Parse.Object.extend('League');
								var league = new newLeague();
								// create ACL permissions
								var ACL = new Parse.ACL();
								ACL.setPublicReadAccess(true);
								ACL.setPublicWriteAccess(false);
								ACL.setWriteAccess( Parse.User.current() , true );
								// set permissions and preliminary profile information
								league.set( 'createdBy' , Parse.User.current() );
								league.set( 'name' , newLeagueObject.name );
								league.set( 'competitiveCategory' , newLeagueObject.ageLevel );
								league.set( 'year' , newLeagueObject.season );
								league.set( 'searchName' , newLeagueObject.name.toLowerCase() );
								league.set( 'searchCompetitiveCategory' , newLeagueObject.ageLevel.toLowerCase() );
								league.set( 'active' , true )
								league.setACL( ACL );
						////////// creating new team
								league.save({
									// success
									success: function(newestLeague) {
										// reset
										resetCreateFrame();
										// reset phase
										createPhase = 0;
										// redirect to team home page
										window.location.href = '#/league/' + newestLeague.id;
									},
									// error
									error: function(error) {}
								});
							
							break;
						}
					
					break;
					// default
					default:
					break;
				
				}
			
			}
			// set heading
			function setHeadingAndBackButton( type , phase ) {
					
				// get header
				var header = $('div#slide-up-modal header h2');	
				// type
				switch ( type ) {
					// game
					case 0:
					
						// phase
						switch ( phase ) {
							case set.game.seasOrExhi:
								
								// if exhibition
								if ( data == 'Exhibition' )
									header.text('Home Team');
								// if season
								else
									header.text('League');
									
							break;
							case set.game.league:
								header.text('Home Team');
							break;
							case set.game.homeTeam:
								header.text('Away Team');
							break;
							case set.game.awayTeam:
								header.text('Location');
							break;
						}
					
					break;
					// team
					case 1:
					
						// phase
						switch ( phase ) {
							// name
							case 0:
								header.text('Team Name');
							break;
							// age group/level
							case set.team.name:
								header.text('Age Group/Level');
							break;
							case set.team.ageLevel:
								header.text('Season');
							break;
						}
					
					break;
					// league
					case 2:
					
						// phase
						switch ( phase ) {
							// name
							case 0:
								header.text('League Name');
							break;
							// age group/level
							case set.league.name:
								header.text('Age Group/Level');
							break;
							case set.league.ageLevel:
								header.text('Season');
							break;
						}
					
					break;
				}
					
			}
			
			// what do you want to create?
			if ( createPhase == 0 ) {
				// can now go backwards
				$('#back-create').removeAttr('disabled');
				// creating ...
				switch ( data ) {
					// creating a game
					case "Game":
					
						// set isCreating
						isCreating = 0;
						// get date
						var date = new Date();
						date = date.toString().split(' ')
						date = date[1] + ' ' + date[2] + ' ' + date[3] + ' ' + date[4];
						// new game
						newGameObject = {
							creator 		: Parse.User.current(),
							league			: undefined,
							home			: {
								team 		: undefined,
								creator 	: undefined
							},
							away			: {
								team 		: undefined,
								creator 	: undefined
							},
							time			: date,
							collaborators 	: [ Parse.User.current() ],
							location		: undefined
						}
						// set header
						setHeadingAndBackButton( isCreating , createPhase );
						// populate form
						populateForm( isCreating , createPhase );
						
					break;
					// creating a team
					case "Team":
					
						// set isCreating
						isCreating = 1;
						// new team
						newTeamObject = {
							creator 	: Parse.User.current(),
							name		: undefined,
							ageLevel	: undefined,
							season		: undefined
						}
						// set header
						setHeadingAndBackButton( isCreating , createPhase );
						// populate form
						populateForm( isCreating , createPhase );
						
					break;
					// creating a league
					case "League":
						
						// set isCreating
						isCreating = 2;
						// new league
						newLeagueObject = {
							creator 	: Parse.User.current(),
							name		: undefined,
							ageLevel	: undefined,
							season		: undefined
						}
						// set header
						setHeadingAndBackButton( isCreating , createPhase );
						// populate form
						populateForm( isCreating , createPhase , listTwo );
					
					break;
				}
			
			} else {
				
				// set header
				setHeadingAndBackButton( isCreating , createPhase );
				// populate form
				populateForm( isCreating , createPhase );
				
			}
			
		}
			
	});
	
	// backward create
	$('button#back-create').on('click', function(e) {
			
		e.preventDefault();
		e.stopPropagation();
		// if not iphone
		if ( !iphone ) {
			// objectifying lists
			var listOne = $('#slide-up-modal ul > div:nth-child(1)');
			var listTwo = $('#slide-up-modal ul > div:nth-child(2)');
			// create
			var create = [ 'Game' , 'Team' , 'League' ];
			// fill in form
			function repopulateForm( type , phase ) {
			
				// get correct list
				if ( listOne.hasClass('z') ) list = listTwo;
				else						 list = listOne;
				// clear list
				list.html('');
				// type
				switch ( type ) {
					// game
					case 0:
					
						// phase
						switch ( phase ) {
							case set.game.seasOrExhi:
							
								// disabled previous button
								$('button#back-create').attr( 'disabled' , 'true' );
								// reset frame
								for ( var i = 0; i < 3; i++ ) {
									// new li
									var li = document.createElement('li');
									// new li properties
									$(li)
										.attr( 'data-value' , create[i] )
										.addClass('slide-option-out')
										.addClass('next-field')
										.text(create[i]);
									// new li properties
									list.append(li);
								}
								
								// decrement phase
								createPhase = 0;
							
							break;
							case set.game.league:
							
								// append two li
								for ( var i = 0; i < 2; i++ ) {
									// new li
									var li = document.createElement('li');
									// new li properties
									$(li)
										.addClass('next-field');
									// append new li
									list.append(li);
								}
								// adjust first li
								list
									.children('li:first-child')
									.addClass('slide-option-out')
									.text('Exhibition')
									.attr({ 'data-value' : 'Exhibition' });
								// adjust last li		
								list
									.children('li:last-child')
									.addClass('slide-option-out')
									.text('Season')
									.attr({ 'data-value' : 'Season' });
									
								// decrement
								createPhase = 0.5;
							
							break;
							case set.game.homeTeam:
							
								// if has league
								if ( hasLeague ) {
									// if exhibition
									if ( newGameObject.league == null ) {
										// clear game object attributes
										newGameObject.league = undefined;
										// append two li
										for ( var i = 0; i < 2; i++ ) {
											// new li
											var li = document.createElement('li');
											// new li properties
											$(li)
												.addClass('next-field');
											// append new li
											list.append(li);
										}
										// adjust first li
										list
											.children('li:first-child')
											.addClass('slide-option-out')
											.text('Exhibition')
											.attr({ 'data-value' : 'Exhibition' });
										// adjust last li		
										list
											.children('li:last-child')
											.addClass('slide-option-out')
											.text('Season')
											.attr({ 'data-value' : 'Season' });
										
										// decrement phase
										createPhase = 0.5;
									// if season
									} else {
										// clear game object name
										newGameObject.league = undefined;
										// append two li
										for ( var i = 0; i < realPossibleLeagues.length; i++ ) {
											// new li
											var li = document.createElement('li');
											// new li properties
											$(li)
												.addClass('slide-option-out')
												.addClass('next-field')
												.attr( 'data-value' , realPossibleLeagues[i].id )
												.text(realPossibleLeagues[i].attributes['name'] + ' ' + realPossibleLeagues[i].attributes['competitiveCategory']);
											// append new li
											list.append(li);
										}
									
										// decrement phase
										createPhase--;
									}
								// if doesn't have league	
								} else {
									// clear game object name
									newGameObject.league = undefined;
									// disabled previous button
									$('button#back-create').attr( 'disabled' , 'true' );
									// reset frame
									for ( var i = 0; i < 3; i++ ) {
										// new li
										var li = document.createElement('li');
										// new li properties
										$(li)
											.attr( 'data-value' , create[i] )
											.addClass('slide-option-out')
											.addClass('next-field')
											.text(create[i]);
										// new li properties
										list.append(li);
									}
									
									// decrement phase
									createPhase = 0;
								}
							
							break;
							case set.game.awayTeam:
							
								// if exhibition
								if ( newGameObject.league == null ) {
									// update collaborator object
									newGameObject.home.team = undefined;
									newGameObject.home.creator = undefined;
									// append two li
									for ( var i = 0; i < 1; i++ ) {
										// new li
										var li = document.createElement('li');
										// new li properties
										$(li)
											.addClass('slide-option-out')
											.html('<input type="text" placeholder="&#xf002; Search for home team" data-validation="search" />');
										// append new li
										list.append(li);
									}
									// append results div
									list
										.append('<div class="results home-search"></div>')
										.children('div.results')
											.height( $(window).height() - $('div#slide-up-modal header').outerHeight() - $('div.results').siblings('li').outerHeight() );
									// add overflow after 5ms
									setTimeout(function() {
										list.children('div.results').addClass('add-overflow');
									}, 500);
									
									// decrement phase
									createPhase--;
								// if season	
								} else {
									// update collaborator object
									newGameObject.home.team = undefined;
									newGameObject.home.creator = undefined;
									// append two li
									for ( var i = 0; i < possibleTeams.length; i++ ) {
										// if team part of league
										if ( possibleTeams[i].attributes['league'].id === newGameObject.league ) {
											// new li
											var li = document.createElement('li');
											// new li properties
											$(li)
												.addClass('slide-option-out')
												.addClass('next-field')
												.attr({ 'data-value' : possibleTeams[i].attributes['team'].id , 'data-value-creator' : possibleTeams[i].attributes['team'].attributes['createdBy'].id })
												.text(possibleTeams[i].attributes['team'].attributes['name']);
											// append new li
											list.append(li);
										}
									}
									
									// decrement phase
									createPhase--;
								}
							
							break;
							case set.game.location:
							
								// if exhibition
								if ( newGameObject.league == null ) {
									// update new game object
									newGameObject.away.team = undefined;
									newGameObject.away.creator = undefined;
									// append two li
									for ( var i = 0; i < 1; i++ ) {
										// new li
										var li = document.createElement('li');
										// new li properties
										$(li)
											.addClass('slide-option-out')
											.html('<input type="text" placeholder="&#xf002; Search for away team" data-validation="search" />');
										// append new li
										list.append(li);
									}
									// remove overflow
									list
										.siblings('div')
											.children('div.results.home-search')
												.html('')
												.removeClass('add-overflow');
									// append results div
									list
										.append('<div class="results away-search"></div>')
										.children('div.results')
											.height( $(window).height() - $('div#slide-up-modal header').outerHeight() - $('div.results.away-search').siblings('li').outerHeight() );
									// add overflow after 5ms
									setTimeout(function() {
										list.children('div.results.away-search').addClass('add-overflow');
									}, 500);
									
									// decrement phase
									createPhase--;
								// if season	
								} else {
									// update new game object
									newGameObject.away.team = undefined;
									newGameObject.away.creator = undefined;
									// append two li
									for ( var i = 0; i < possibleTeams.length; i++ ) {
										// if team part of league
										if ( possibleTeams[i].attributes['league'].id === newGameObject.league && possibleTeams[i].attributes['team'].id !== newGameObject.home.team ) {
											// new li
											var li = document.createElement('li');
											// new li properties
											$(li)
												.addClass('slide-option-out')
												.addClass('next-field')
												.attr({ 'data-value' : possibleTeams[i].attributes['team'].id , 'data-value-creator' : possibleTeams[i].attributes['team'].attributes['createdBy'].id })
												.text(possibleTeams[i].attributes['team'].attributes['name']);
											// append new li
											list.append(li);
										}
									}
									
									// decrement phase
									createPhase--;
								}
							
							break;
						}
					
					break;
					// team
					case 1:
					
						// phase
						switch ( phase ) {
							case set.team.name:
							
								// disabled previous button
								$('button#back-create').attr( 'disabled' , 'true' );
								// clear team object name
								newTeamObject.name = undefined;
								// reset frame
								for ( var i = 0; i < 3; i++ ) {
									// new li
									var li = document.createElement('li');
									// new li properties
									$(li)
										.attr( 'data-value' , create[i] )
										.addClass('slide-option-out')
										.addClass('next-field')
										.text(create[i]);
									// new li properties
									list.append(li);
								}
								
								// decrement phase
								createPhase--;
							
							break;
							case set.team.ageLevel:
							
								// clear team object ageLevel
								newTeamObject.ageLevel = undefined;
								// append two li
								for ( var i = 0; i < 2; i++ ) {
									// new li
									var li = document.createElement('li');
									// new li properties
									list.append(li);
								}
								// adjust first li
								list
									.children('li:first-child')
										.addClass('slide-option-out')
										.html('<input type="text" placeholder="Team Name" data-validation="required" value="' + newTeamObject.name + '" />')
								// adjust last li		
								list
									.children('li:last-child')
										.addClass('slide-option-out')
										.addClass('hidden')
										.html('<button class="next-field">Next <span>&#xe0dc;</span></button>');
										
								// decrement phase
								createPhase--;
							
							break;
							case set.team.season:
							
								// clear team object season		
								newTeamObject.season = undefined;
								// append two li
								for ( var i = 0; i < 2; i++ ) {
									// new li
									var li = document.createElement('li');
									// new li properties
									list.append(li);
								}
								// adjust first li
								list
									.children('li:first-child')
										.addClass('slide-option-out')
										.html('<input type="text" placeholder="Age Group/Level" data-validation="required" value="' + newTeamObject.ageLevel + '" />')
								// adjust last li		
								list
									.children('li:last-child')
										.addClass('slide-option-out')
										.addClass('hidden')
										.html('<button class="next-field">Next <span>&#xe0dc;</span></button>');
										
								// decrement phase
								createPhase--;
							
							break;
						}
					
					break;
					// league
					case 2:
					
						// phase
						switch ( phase ) {
							case set.league.name:
							
								// disabled previous button
								$('button#back-create').attr( 'disabled' , 'true' );
								// clear team object name
								newLeagueObject.name = undefined;
								// reset frame
								for ( var i = 0; i < 3; i++ ) {
									// new li
									var li = document.createElement('li');
									// new li properties
									$(li)
										.attr( 'data-value' , create[i] )
										.addClass('slide-option-out')
										.addClass('next-field')
										.text(create[i]);
									// new li properties
									list.append(li);
								}
								
								// decrement phase
								createPhase--;
							
							break;
							case set.league.ageLevel:
							
								// clear team object ageLevel
								newLeagueObject.ageLevel = undefined;
								// append two li
								for ( var i = 0; i < 2; i++ ) {
									// new li
									var li = document.createElement('li');
									// new li properties
									list.append(li);
								}
								// adjust first li
								list
									.children('li:first-child')
										.addClass('slide-option-out')
										.html('<input type="text" placeholder="League Name" data-validation="required" value="' + newLeagueObject.name + '" />')
								// adjust last li		
								list
									.children('li:last-child')
										.addClass('slide-option-out')
										.addClass('hidden')
										.html('<button class="next-field">Next <span>&#xe0dc;</span></button>');
								
								// decrement phase
								createPhase--;
							
							break;
							case set.league.season:
							
								// clear team object season		
								newLeagueObject.season = undefined;
								// append two li
								for ( var i = 0; i < 2; i++ ) {
									// new li
									var li = document.createElement('li');
									// new li properties
									list.append(li);
								}
								// adjust first li
								list
									.children('li:first-child')
										.addClass('slide-option-out')
										.html('<input type="text" placeholder="Age Group/Level" data-validation="required" value="' + newLeagueObject.ageLevel + '" />')
								// adjust last li		
								list
									.children('li:last-child')
										.addClass('slide-option-out')
										.addClass('hidden')
										.html('<button class="next-field">Next <span>&#xe0dc;</span></button>');
								
								// decrement phase
								createPhase--;
							
							break;
						}
					
					break;
					// default
					default:
					break;
				}
				
			}
			// previous list animation
			function animatePrevious() {
				
				// current and next list
				var currentList;
				var previousList;
				// determine which list is current and next
				if ( listOne.hasClass('z') ) {
					currentList = listOne;
					previousList = listTwo;
				} else {
					currentList = listTwo;
					previousList = listOne;
				}
				// animate current items out and move current div back in z-direction
				currentList.children('li').addClass('slide-option-in');
				currentList.removeClass('z');
				currentList
					.find('button.next-field')
						.attr( 'disabled' , 'true' );
				// after 5 ms animate previous items in and move previous div forward in z-direction
				setTimeout(function() {
					// slide options in
					previousList.children('li').removeClass('slide-option-out');
					previousList.addClass('z');
					// focus on input
					previousList.children('li:first-child').children('input').focus();
				}, 5);
					
			}
			// set heading
			function setHeadingAndBackButton( type , phase ) {
					
				// get header
				var header = $('div#slide-up-modal header h2');	
				// type
				switch ( type ) {
					// game
					case 0:
					
						// phase
						switch ( phase ) {
							case set.game.seasOrExhi:
							
								header.text('Create');
							
							break;
							case set.game.league:
							
								header.text('Game Type');
							
							break;
							case set.game.homeTeam:
							
								// if has league
								if ( hasLeague ) {
									// if exhibition
									if ( newGameObject.league == null ) {
										header.text('Game Type');
									// if season
									} else {
										header.text('League');
									}
								// if doesn't have league	
								} else {
									header.text('Create');
								}
							
							break;
							case set.game.awayTeam:
							
								header.text('Home Team');
							
							break;
							case set.game.location:
							
								header.text('Away Team');
							
							break;
						}
					
					break;
					// team
					case 1:
					
						// phase
						switch ( phase ) {
							case set.team.name:
							
								header.text('Create');
							
							break;
							case set.team.ageLevel:
							
								header.text('Team Name');
							
							break;
							case set.team.season:
							
								header.text('Age Group/Level');
							
							break;
						}
					
					break;
					// league
					case 2:
					
						// phase
						switch ( phase ) {
							case set.league.name:
							
								header.text('Create');
							
							break;
							case set.league.ageLevel:
							
								header.text('League Name');
							
							break;
							case set.league.season:
							
								header.text('Age Group/Level');
							
							break;
						}
					
					break;
				}
					
			}
			
			if ( createPhase == 1 ) {
				
				// set heading
				setHeadingAndBackButton( isCreating , createPhase );
				// populate form
				repopulateForm( isCreating , createPhase );
				// animate
				animatePrevious();
	
			} else {
				
				// set heading
				setHeadingAndBackButton( isCreating , createPhase );
				// populate form
				repopulateForm( isCreating , createPhase );
				// animate
				animatePrevious();
				
			}
		
		}
		
	});
	
	// form validation
	$('form#create').on('keyup', 'input', function(e) {
		
		// get validation
		var validation = $(e.target).attr('data-validation');
		// get current value
		var textValue = $(e.target).val();
		// if search field
		if ( validation == 'search' ) {
			// if game
			if ( isCreating == 0 ) {
				// if home team or away team
				if ( createPhase == set.game.homeTeam ) {
				// if no value
					if ( textValue == '' || textValue == false ) {
						// search
						$('div.results.home-search').html('<p class="feed-message">Search for teams.</p>');
						// clear previous instance of search
						window.clearTimeout(searchInterval);
						return false;
					} else {
						$('div.results.home-search').html('<span class="feed-loader">&#xf10c;</span>');
					}
					// clear previous interval
					window.clearTimeout(searchInterval);	
					// set interval
					searchInterval = window.setTimeout(function() {
						// if value	
						if ( !( textValue == '' || textValue == false ) ) {
							// by name
							var searchForTeamByName = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByName.startsWith( 'name' , textValue );
							// by case-insensitive name
							var searchForTeamByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByNameCaseInsensitive.startsWith( 'searchName' , textValue );
							// by age group
							var searchForTeamByAgeGroup = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByAgeGroup.startsWith( 'ageGroup' , textValue );
							// by case-insensitive age group
							var searchForTeamByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByAgeGroupCaseInsensitive.startsWith( 'searchAgeGroup' , textValue );
							// by level
							var searchForTeamByLevel = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByLevel.startsWith( 'level' , textValue );
							// by case-insensitive level
							var searchForTeamByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByLevelCaseInsensitive.startsWith( 'searchLevel' , textValue );
							// by year
							var searchForTeamByYear = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByYear.startsWith( 'year' , textValue );
							// by hometown
							var searchForTeamByHometown = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByHometown.startsWith( 'hometown' , textValue );
							// by case-insensitive hometown
							var searchForTeamByHometownCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByHometownCaseInsensitive.startsWith( 'searchHometown' , textValue );
							// by creator by name
							var teamCreatorByName = new Parse.Query(Parse.User);
							teamCreatorByName.startsWith( 'name' , textValue );
							var searchForTeamByCreatorByName = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByCreatorByName.matchesQuery( 'createdBy' , teamCreatorByName );
							// by creator by case-insensitive name - overlaps with proceeding queries
							// by creator by username
							var teamCreatorByUsername = new Parse.Query(Parse.User);
							teamCreatorByUsername.startsWith( 'username' , textValue );
							var searchForTeamByCreatorByUsername = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByCreatorByUsername.matchesQuery( 'createdBy' , teamCreatorByUsername );
							// by creator by case-insensitive username - overlaps
							var searchForTeams = Parse.Query.or( searchForTeamByName , searchForTeamByNameCaseInsensitive , searchForTeamByAgeGroup , searchForTeamByAgeGroupCaseInsensitive , searchForTeamByLevel , searchForTeamByLevelCaseInsensitive , searchForTeamByYear , searchForTeamByHometown , searchForTeamByHometownCaseInsensitive , searchForTeamByCreatorByName , searchForTeamByCreatorByUsername );
					////////// get teams
							searchForTeams.include('createdBy');
							searchForTeams.find({
								// success
								success: function(teams) {
									// clear list
									$('div.results.home-search').html('');
									// !(if no teams)
									if ( teams.length > 0 ) {
										// loop through teams
										for ( var i = 0; i < teams.length; i++ ) {
											// if team already on other side
											if ( teams[i].id !== newGameObject.away.team ) {
												$('div.results.home-search').append('<li class="next-field" data-value="' + teams[i].id + '" data-value-creator="' + teams[i].get('createdBy').id + '"><h3>' + teams[i].get('name') + '</h3><p>Created by @' + teams[i].get('createdBy').attributes['username'] + '</p></li>');
											}
										}
									// if no teams
									} else {
										// no teams
										$('div.results.home-search').html('<p class="feed-message">No teams match your search.</p>');
									}
								},
								// error
								error: function(error) {}
							});
						}
						
					}, 750);
					
				// if home team or away team
				} else if ( createPhase == set.game.awayTeam ) {
				// if no value
					if ( textValue == '' || textValue == false ) {
						// search
						$('div.results.away-search').html('<p class="feed-message">Search for teams.</p>');
						// clear previous instance of search
						window.clearTimeout(searchInterval);
						return false;
					} else {
						$('div.results.away-search').html('<span class="feed-loader">&#xf10c;</span>');
					}
					// clear previous interval
					window.clearTimeout(searchInterval);
					// set interval
					searchInterval = window.setTimeout(function() {
						// if value
						if ( !( textValue == '' || textValue == false ) ) {
							// by name
							var searchForTeamByName = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByName.startsWith( 'name' , textValue );
							// by case-insensitive name
							var searchForTeamByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByNameCaseInsensitive.startsWith( 'searchName' , textValue );
							// by age group
							var searchForTeamByAgeGroup = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByAgeGroup.startsWith( 'ageGroup' , textValue );
							// by case-insensitive age group
							var searchForTeamByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByAgeGroupCaseInsensitive.startsWith( 'searchAgeGroup' , textValue );
							// by level
							var searchForTeamByLevel = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByLevel.startsWith( 'level' , textValue );
							// by case-insensitive level
							var searchForTeamByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByLevelCaseInsensitive.startsWith( 'searchLevel' , textValue );
							// by year
							var searchForTeamByYear = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByYear.startsWith( 'year' , textValue );
							// by hometown
							var searchForTeamByHometown = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByHometown.startsWith( 'hometown' , textValue );
							// by case-insensitive hometown
							var searchForTeamByHometownCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByHometownCaseInsensitive.startsWith( 'searchHometown' , textValue );
							// by creator by name
							var teamCreatorByName = new Parse.Query(Parse.User);
							teamCreatorByName.startsWith( 'name' , textValue );
							var searchForTeamByCreatorByName = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByCreatorByName.matchesQuery( 'createdBy' , teamCreatorByName );
							// by creator by case-insensitive name - overlaps with proceeding queries
							// by creator by username
							var teamCreatorByUsername = new Parse.Query(Parse.User);
							teamCreatorByUsername.startsWith( 'username' , textValue );
							var searchForTeamByCreatorByUsername = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByCreatorByUsername.matchesQuery( 'createdBy' , teamCreatorByUsername );
							// by creator by case-insensitive username - overlaps
							var searchForTeams = Parse.Query.or( searchForTeamByName , searchForTeamByNameCaseInsensitive , searchForTeamByAgeGroup , searchForTeamByAgeGroupCaseInsensitive , searchForTeamByLevel , searchForTeamByLevelCaseInsensitive , searchForTeamByYear , searchForTeamByHometown , searchForTeamByHometownCaseInsensitive , searchForTeamByCreatorByName , searchForTeamByCreatorByUsername );
					////////// get teams
							searchForTeams.include('createdBy');
							searchForTeams.find({
								// success
								success: function(teams) {
									// clear list
									$('div.results.away-search').html('');
									// !(if no teams)
									if ( teams.length > 0 ) {
										// loop through teams
										for ( var i = 0; i < teams.length; i++ ) {
											// if team already on other side
											if ( teams[i].id !== newGameObject.home.team ) {
												$('div.results.away-search').append('<li class="next-field" data-value="' + teams[i].id + '" data-value-creator="' + teams[i].get('createdBy').id + '"><h3>' + teams[i].get('name') + '</h3><p>Created by @' + teams[i].get('createdBy').attributes['username'] + '</p></li>');
											}
										}
									// if no teams
									} else {
										// no teams
										$('div.results.away-search').html('<p class="feed-message">No teams match your search.</p>');
									}			
								},
								// error
								error: function(error) {}
							});				
						}
						
					}, 750);
					
				}
				
			}
			
		}
		// validating
		switch ( validation ) {
			// required
			case 'required':
				
				// if no value
				if ( textValue == '' || textValue == false )
					$(e.target).closest('li')
						.siblings('li.hidden')
							.addClass('slide-option-in')
								.children('button.next-field')
									.attr( 'disabled' , 'true' );
				// if value
				else
					$(e.target).closest('li')
						.siblings('li.hidden')
							.removeClass('slide-option-in')
								.children('button.next-field')
									.removeAttr('disabled');
				
			break;
			// default
			default:
			break;
		}
		
	});
	
	$('form#create').on('click', '.num-of-collaborators', function(e) {
		
		// stop propagating
		e.stopPropagation();
		
		// prevent default action
		e.preventDefault();
		
		// hide next button
		$(e.currentTarget).closest('li').siblings('li').addClass('slide-option-in');
		
		// change icon
		$(e.currentTarget).html('&#xf00c;')
				
		// clear results
		$('div.results').html('');
		
		for ( var c = 0; c < newGameObject.collaborators.length; c++ ) {
			$('div.results')
				.append('<li class="data-value"><h3>' + newGameObject.collaborators[c].attributes['name'] + '</h3><p>@' + newGameObject.collaborators[c].attributes['username'] + '</p></li>')
		}
		
	});
	
	// prevent default on submit
	$('form#create').on('submit', function(e) {
		
		// prevent default action
		e.preventDefault();
		
	});
	
	// iphone create
	$('#mobile-create a').on('touchstart', function(e) {
		
		e.preventDefault();
		// set touchstart target
		touchstartTargetElement = document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
		
	}).on('touchend', function(e) {
	
		e.preventDefault();
		// set touchend target
		touchendTargetElement = document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
		// if touchstart === touchend
		if ( touchstartTargetElement === touchendTargetElement ) {
			// if iphone
			if ( iphone ) {
				// form is height of window - header height
				$('div#slide-up-modal form').height( $(window).height() - $('header[role="modal"]').outerHeight() );
				// wait 100 ms
				setTimeout(function() {
					// modal active
					$('#slide-up-modal').addClass('modal-active');
				}, 100);
				// show create frame
				$('div#slide-up-modal ul')
					.children('div:not(.results)')
						.html('')
						.removeClass()
							.end()
					.children('div:first-child')
						.addClass('z');
				// clear results
				$('div.results').html('');				
				// reset create phase
				createPhase = 0;				
				// create
				var create = [ 'Game' , 'Team' , 'League' ];
				// display create options				
				for ( var i = 0; i < 3; i++ ) {
					// new li
					var li = document.createElement('li');
					// new li properties
					$(li)
						.addClass('next-field')
						.attr( 'data-value' , create[i] )
						.text(create[i]);
					// append new li
					$('div#slide-up-modal ul div.z').append(li);
				}
				// set header
				$('div#slide-up-modal header h2').text('Create');
				// get rid of scroll
				$('body').css( 'overflow' , 'hidden' );
			}
		}
		
	});
	
	// forward iphone create
	$('form#create').on('touchstart', '.next-field', function(e) {
	
		e.preventDefault();
		e.stopPropagation();
		// set touchstart target
		touchstartTargetElement = document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
	
	}).on('touchmove', '.next-field', function(e) {
	
		e.preventDefault();
		e.stopPropagation();
		// touchstart target is undefined
		touchstartTargetElement = document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
		
	}).on('touchend', '.next-field', function(e) {
	
		e.preventDefault();
		e.stopPropagation();
		// set touchend target
		touchendTargetElement = document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
		// if touchstart === touchend
		if ( touchstartTargetElement === touchendTargetElement ) {
			// if iphone
			if ( iphone ) {
				// if current tag is button
				if ( e.currentTarget.tagName === 'BUTTON' )
					// disable
					$(e.currentTarget).attr( 'disabled' , 'true' );
				// grab data
				var data = $(e.currentTarget).attr('data-value') || $(e.currentTarget).closest('li').siblings('li').children('input').val();
				// objectifying lists
				var listOne = $('#slide-up-modal ul > div:nth-child(1)');
				var listTwo = $('#slide-up-modal ul > div:nth-child(2)');
				// next list animation
				function animateNext() {
					
					// current and next list
					var currentList;
					var nextList
					// determine which list is current and next
					if ( listOne.hasClass('z') ) {
						currentList = listOne;
						nextList = listTwo;
					} else {
						currentList = listTwo;
						nextList = listOne;
					}
					// animate current items out and move current div back in z-direction
					currentList.children('li').addClass('slide-option-out');
					currentList.removeClass('z');
					// after 5 ms animate next items in and move next div forward in z-direction
					setTimeout(function() {
						// slide options in
						nextList.children('li:not(.hidden)').removeClass('slide-option-in');
						nextList.addClass('z');
						// focus on input
						nextList.children('li:first-child').children('input').focus();
					}, 5);
						
				}
				// reset create frame
				function resetCreateFrame() {
					// clear new game, team, and league object, and phase
					newGameObject = {};
					newTeamObject = {};
					newLeagueObject = {};
					createPhase = 0;
					// hide modal
					$('#slide-up-modal').removeClass('modal-active');
					// bring back scroll
					$('body').css( 'overflow' , 'scroll' );
					// deactive back button
					$('#back-create')
						.attr( 'disabled' , true );	
				}
				// fill in form
				function populateForm( type , phase ) {
				
					// get correct list
					if ( listOne.hasClass('z') ) list = listTwo;
					else						 list = listOne;
					// clear list
					list.html('');
					// type
					switch ( type ) {
						// game
						case 0:
						
							// phase
							switch ( phase ) {
								case 0:
								
									// leagues of user
									var leaguesOfUser = new Parse.Query(Parse.Object.extend('League'));
									leaguesOfUser.equalTo( 'createdBy' , Parse.User.current() );
							////////// searching for leagues
									leaguesOfUser.find({
										// success
										success: function(leagues) {
											// clear possible leagues
											possibleLeagues = [];
											// if user has leagues
											if ( leagues.length > 0 ) {
												// possible leagues
												for ( var l = 0; l < leagues.length; l++ ) {
													possibleLeagues.push(leagues[l]);
												}
												// get teams of league
												var getTeamsOfLeague = new Parse.Query(Parse.Object.extend('teamInLeague'));
												getTeamsOfLeague.containedIn( 'league' , possibleLeagues );
												getTeamsOfLeague.equalTo( 'status' , true );
										////////// get teams
												getTeamsOfLeague.include('team');
												getTeamsOfLeague.include('league');
												getTeamsOfLeague.find({
													// success
													success: function(teams) {
														// loop through teams
														for ( var r = 0; r < teams.length; r++ ) {
															// push
															possibleTeams.push(teams[r]);
															console.log(teams[r]);
														}
														// clear possible teams
														possibleTeams = [];
														// real possible leagues
														realPossibleLeagues = [];
														// set count at 0
														var count = 0;
														// loop through possible leagues
														for ( var t = 0; t < possibleLeagues.length; t++ ) {
															// reset count
															count = 0;
															// loop through teams
															for ( var i = 0; i < teams.length; i++ ) {
																// if last loop
																if ( t == ( possibleLeagues.length - 1 ) )
																	// push
																	possibleTeams.push(teams[i]);
																// if league has amn active team
																if ( possibleLeagues[t].id === teams[i].get('league').id )
																	// +1
																	count++;
															}
															// if active teams in league
															if ( count > 0 )
																// add to real possible leagues
																realPossibleLeagues.push(possibleLeagues[t]);
															// if looping done
															if ( t == ( possibleLeagues.length - 1 ) ) {
																// if more than 0 in real possible leagues
																if ( realPossibleLeagues.length > 0 ) {
																	// has leagues
																	hasLeague = true;
																	// append two li
																	for ( var i = 0; i < 2; i++ ) {
																		// new li
																		var li = document.createElement('li');
																		// new li properties
																		$(li)
																			.addClass('next-field');
																		// append new li
																		list.append(li);
																	}
																	// adjust first li
																	list
																		.children('li:first-child')
																			.addClass('slide-option-in')
																			.text('Exhibition')
																			.attr({ 'data-value' : 'Exhibition' });
																	// adjust last li		
																	list
																		.children('li:last-child')
																			.addClass('slide-option-in')
																			.text('Season')
																			.attr({ 'data-value' : 'Season' });
																	// set header
																	$('div#slide-up-modal header h2').text('Game Type');
																	// animate transition
																	animateNext();
																	// increment phase by 0.5
																	createPhase = 0.5;
																// if no leagues in real possible leagues	
																} else {
																	// has leagues
																	hasLeague = false;
																	// update new game object
																	newGameObject.league = null;
																	// append two li
																	for ( var i = 0; i < 1; i++ ) {
																		// new li
																		var li = document.createElement('li');
																		// new li properties
																		$(li)
																			.addClass('slide-option-in')
																			.html('<input type="text" placeholder="&#xf002; Search for home team" data-validation="search" />');
																		// append new li
																		list.append(li);
																	}
																	// append results div
																	list
																		.append('<div class="results home-search"></div>')
																		.children('div.results')
																			.height( $(window).height() - $('div#slide-up-modal header').outerHeight() - $('div.results').siblings('li').outerHeight() );
																	// add overflow after 5ms
																	setTimeout(function() {
																		list.children('div.results').addClass('add-overflow');
																	}, 500);
																	// animate transition
																	animateNext();
																	// increment phase by 2
																	createPhase = 2;
																}
															}
														}
													},
													// error
													error: function(error) {}
												});
											// if user has no league	
											} else {
												// has leagues
												hasLeague = false;
												// update new game object
												newGameObject.league = null;
												// append two li
												for ( var i = 0; i < 1; i++ ) {
													// new li
													var li = document.createElement('li');
													// new li properties
													$(li)
														.addClass('slide-option-in')
														.html('<input type="text" placeholder="&#xf002; Search for home team" data-validation="search" />');
													// append new li
													list.append(li);
												}
												// append results div
												list
													.append('<div class="results home-search"></div>')
													.children('div.results')
														.height( $(window).height() - $('div#slide-up-modal header').outerHeight() - $('div.results').siblings('li').outerHeight() );
												// add overflow after 5ms
												setTimeout(function() {
													list.children('div.results').addClass('add-overflow');
												}, 500);
												// set header
												$('div#slide-up-modal header h2').text('Home Team');
												// animate transition
												animateNext();
												// increment phase by 2
												createPhase = 2;
											}
											
										},
										// error
										error: function(error) {}
									});
									
								break;
								case set.game.seasOrExhi:
								
									// if exhibition
									if ( data == 'Exhibition' ) {
										// update new game object
										newGameObject.league = null;
										// append two li
										for ( var i = 0; i < 1; i++ ) {
											// new li
											var li = document.createElement('li');
											// new li properties
											$(li)
												.addClass('slide-option-in')
												.html('<input type="text" placeholder="&#xf002; Search for home team" data-validation="search" />');
											// append new li
											list.append(li);
										}
										// append results div
										list
											.append('<div class="results home-search"></div>')
											.children('div.results')
												.height( $(window).height() - $('div#slide-up-modal header').outerHeight() - $('div.results').siblings('li').outerHeight() );
										// add overflow after 5ms
										setTimeout(function() {
											list.children('div.results').addClass('add-overflow');
										}, 500);
										// animate transition
										animateNext();
										// increment phase by 2
										createPhase = 2;
									// if season	
									} else if ( data == 'Season' ) {
										// append two li
										for ( var i = 0; i < realPossibleLeagues.length; i++ ) {
											// new li
											var li = document.createElement('li');
											// new li properties
											$(li)
												.addClass('slide-option-in')
												.addClass('next-field')
												.attr( 'data-value' , realPossibleLeagues[i].id )
												.text(realPossibleLeagues[i].attributes['name'] + ' ' + realPossibleLeagues[i].attributes['competitiveCategory']);
											// append new li
											list.append(li);
										}	
										// animate
										animateNext();
										// increment createPhase by 0.5
										createPhase = 1;
									}
								
								break;
								case set.game.league:
								
									// update new game object
									newGameObject.league = data;
									// append two li
									for ( var i = 0; i < possibleTeams.length; i++ ) {
										// if team part of league
										if ( possibleTeams[i].attributes['league'].id === data ) {
											// new li
											var li = document.createElement('li');
											// new li properties
											$(li)
												.addClass('slide-option-in')
												.addClass('next-field')
												.attr({ 'data-value' : possibleTeams[i].attributes['team'].id , 'data-value-creator' : possibleTeams[i].attributes['team'].attributes['createdBy'].id })
												.text(possibleTeams[i].attributes['team'].attributes['name']);
											// append new li
											list.append(li);
										}
									}
									
									// animate
									animateNext();
									// increment phase
									createPhase++;
								
								break;
								case set.game.homeTeam:
								
									// if exhibition
									if ( newGameObject.league == null ) {
										// update new game object
										newGameObject.home.team = data;
										newGameObject.home.creator = $(e.currentTarget).attr('data-value-creator');
										// append two li
										for ( var i = 0; i < 1; i++ ) {
											// new li
											var li = document.createElement('li');
											// new li properties
											$(li)
												.addClass('slide-option-in')
												.html('<input type="text" placeholder="&#xf002; Search for away team" data-validation="search" />');
											// append new li
											list.append(li);
										}
										// remove overflow
										list
											.siblings('div')
												.children('div.results.home-search')
													.html('')
													.removeClass('add-overflow');
										// append results div
										list
											.append('<div class="results away-search"></div>')
											.children('div.results')
												.height( $(window).height() - $('div#slide-up-modal header').outerHeight() - $('div.results.away-search').siblings('li').outerHeight() );
										// add overflow after 5ms
										setTimeout(function() {
											list.children('div.results.away-search').addClass('add-overflow');
										}, 500);
									// if season
									} else {
										// update new game object
										newGameObject.home.team = data;
										newGameObject.home.creator = $(e.currentTarget).attr('data-value-creator');
										// append two li
										for ( var i = 0; i < possibleTeams.length; i++ ) {
											// if team part of league
											if ( possibleTeams[i].attributes['league'].id === newGameObject.league && possibleTeams[i].attributes['team'].id !== newGameObject.home.team ) {
												// new li
												var li = document.createElement('li');
												// new li properties
												$(li)
													.addClass('slide-option-in')
													.addClass('next-field')
													.attr({ 'data-value' : possibleTeams[i].attributes['team'].id , 'data-value-creator' : possibleTeams[i].attributes['team'].attributes['createdBy'].id })
													.text(possibleTeams[i].attributes['team'].attributes['name']);
												// append new li
												list.append(li);
											}
										}
									}
									
									// animate
									animateNext();
									// increment phase
									createPhase++;
								
								break;
								case set.game.awayTeam:
								
									// if exhibition
									if ( newGameObject.league == null ) {
										// update new game object
										newGameObject.away.team = data;
										newGameObject.away.creator = $(e.currentTarget).attr('data-value-creator');
										// append two li
										for ( var i = 0; i < 2; i++ ) {
											// new li
											var li = document.createElement('li');
											// new li properties
											list.append(li);
										}
										// adjust first li
										list
											.children('li:first-child')
												.addClass('slide-option-in')
												.html('<input type="text" placeholder="Location" />');
										// adjust last li		
										list
											.children('li:last-child')
												.addClass('slide-option-in')
												.addClass('no-pad')
												.html('<button class="next-field cf">Next <span>&#xe0dc;</span></button>');
										// remove overflow
										list
											.siblings('div')
												.children('div.results.away-search')
													.html('')
													.removeClass('add-overflow');
									// if season
									} else {
										// update new game object
										newGameObject.away.team = data;
										newGameObject.away.creator = $(e.currentTarget).attr('data-value-creator');
										// append two li
										for ( var i = 0; i < 2; i++ ) {
											// new li
											var li = document.createElement('li');
											// new li properties
											list.append(li);
										}
										// adjust first li
										list
											.children('li:first-child')
												.addClass('slide-option-in')
												.html('<input type="text" placeholder="Location" />');
										// adjust last li		
										list
											.children('li:last-child')
												.addClass('slide-option-in')
												.addClass('no-pad')
												.html('<button class="next-field cf">Next <span>&#xe0dc;</span></button>');
										// remove overflow
										list
											.siblings('div')
												.children('div.results.away-search')
													.html('')
													.removeClass('add-overflow');
									}
									
									// animate
									animateNext();
									// increment phase
									createPhase++;
								
								break;
								case set.game.location:
								
									// disable back button
									$('button#back-create').attr( 'disabled' , 'true' );
									// update new object
									newGameObject.location = ( data == '' || data == false ) ? undefined : data;
									// create new team
									var newGame = Parse.Object.extend('Game');
									var game = new newGame();
									// create league
									var newLeague = Parse.Object.extend('League');
									var league = new newLeague();
									league.id = newGameObject.league;
									// create new team
									var newTeam = Parse.Object.extend('Team');
									// home team
									var homeTeam = new newTeam();
									homeTeam.id = newGameObject.home.team;
									// away team
									var awayTeam = new newTeam();
									awayTeam.id = newGameObject.away.team;
									// create ACL permissions
									var ACL = new Parse.ACL();
									ACL.setPublicReadAccess(true);
									ACL.setPublicWriteAccess(false);
									ACL.setWriteAccess( Parse.User.current() , true );
									// set permissions and preliminary profile information
									game.set( 'active' , true );
									game.set( 'arena' , newGameObject.location );
									game.set( 'awayTeam' , awayTeam );
									game.set( 'createdBy' , Parse.User.current() );
									game.set( 'currentPeriod' , '1' );
									game.set( 'dateTimeOfGame' , newGameObject.time );
									game.set( 'gameFinal' , false );
									game.set( 'homeTeam' , homeTeam );
									game.set( 'isOfficial' , ( ( newGameObject.league == null || newGameObject.league == undefined ) ? false : true ) );
									game.set( 'league' , ( ( newGameObject.league == null || newGameObject.league == undefined ) ? undefined : league ) );
									game.set( 'minutes' , '15' );
									game.set( 'seconds' , '00' );
									game.set( 'searchArena' , ( ( newGameObject.location == null || newGameObject.location == undefined ) ? undefined : newGameObject.location.toLowerCase() ) );
									game.setACL( ACL );
							////////// creating new team
									game.save({
										// success
										success: function(newestGame) {
											// if official game
											if ( newestGame.get('isOfficial') ) {
												// new request object
												var request = Parse.Object.extend('Request');
												var firstRequest = new request();
												// set first request ACL
												var firstACL = new Parse.ACL();
												firstACL.setPublicReadAccess(false);
												firstACL.setPublicWriteAccess(false);
												firstACL.setReadAccess( Parse.User.current() , true );
												firstACL.setWriteAccess( Parse.User.current() , true );
												firstACL.setReadAccess( newGameObject.home.creator , true );
												firstACL.setWriteAccess( newGameObject.home.creator , true );
												// set request
												firstRequest.set( 'initiator' , Parse.User.current() );
												firstRequest.set( 'invitee' , {"__type":"Pointer","className":"User","objectId":""+ newGameObject.home.creator +""} );
												firstRequest.set( 'type'  , 'gameRoster' );
												firstRequest.set( 'rosterSpot' , null );
												firstRequest.set( 'leagueSpot' , null );
												firstRequest.set( 'gameSpot' , newestGame );
												firstRequest.set( 'responseReceived'  , false );
												firstRequest.setACL(firstACL);
										////////// send request		
												firstRequest.save(null, {
													// success
													success: function(requestNumberOne) {
														// new request object
														var request = Parse.Object.extend('Request');
														var secondRequest = new request();
														// set first request ACL
														var secondACL = new Parse.ACL();
														secondACL.setPublicReadAccess(false);
														secondACL.setPublicWriteAccess(false);
														secondACL.setReadAccess( Parse.User.current() , true );
														secondACL.setWriteAccess( Parse.User.current() , true );
														secondACL.setReadAccess( newGameObject.away.creator , true );
														secondACL.setWriteAccess( newGameObject.away.creator , true );
														// set request
														secondRequest.set( 'initiator' , Parse.User.current() );
														secondRequest.set( 'invitee' , {"__type":"Pointer","className":"User","objectId":""+ newGameObject.away.creator +""} );
														secondRequest.set( 'type'  , 'gameRoster' );
														secondRequest.set( 'rosterSpot' , null );
														secondRequest.set( 'leagueSpot' , null );
														secondRequest.set( 'gameSpot' , newestGame );
														secondRequest.set( 'responseReceived'  , false );
														secondRequest.setACL(secondACL);
												////////// send request
														secondRequest.save(null, {
															// success
															success: function(requestNumberTwo) {
																// reset
																resetCreateFrame();
																// reset phase
																createPhase = 0;
																// redirect to team home page
																window.location.href = '#/game/' + newestGame.id;
															},
															// error
															error: function(error) {}
														});	
													},
													// error
													error: function(error) {}
												});
											// if not official game
											} else {
												// reset
												resetCreateFrame();
												// reset phase
												createPhase = 0;
												// redirect to team home page
												window.location.href = '#/game/' + newestGame.id;
											}
										},
										// error
										error: function(error) {}
									});
								
								break;
							}
						
						break;
						// team
						case 1:
						
							// phase
							switch ( phase ) {
								case 0:
								
									// append two li
									for ( var i = 0; i < 2; i++ ) {
										// new li
										var li = document.createElement('li');
										// new li properties
										list.append(li);
									}
									// adjust first li
									list
										.children('li:first-child')
											.addClass('slide-option-in')
											.html('<input type="text" placeholder="Team Name" data-validation="required" />');
									// adjust last li		
									list
										.children('li:last-child')
											.addClass('slide-option-in')
											.addClass('hidden')
											.html('<button class="next-field cf" disabled="true">Next <span>&#xe0dc;</span></button>');
									// animate transition
									animateNext();
									// increment phase
									createPhase++;
											
								break;
								case set.team.name:
								
									// update new object
									newTeamObject.name = data;
									// append two li
									for ( var i = 0; i < 2; i++ ) {
										// new li
										var li = document.createElement('li');
										// new li properties
										list.append(li);
									}
									// adjust first li
									list
										.children('li:first-child')
											.addClass('slide-option-in')
											.html('<input type="text" placeholder="Age Group/Level" data-validation="required" />');
									// adjust last li		
									list
										.children('li:last-child')
											.addClass('slide-option-in')
											.addClass('hidden')
											.html('<button class="next-field" disabled="true">Next <span>&#xe0dc;</span></button>');
									// animate
									animateNext();
									// increment phase
									createPhase++;
									
								break;
								case set.team.ageLevel:
								
									// update new object
									newTeamObject.ageLevel = data;
									// append two li
									for ( var i = 0; i < 2; i++ ) {
										// new li
										var li = document.createElement('li');
										// new li properties
										list.append(li);
									}
									// adjust first li
									list
										.children('li:first-child')
											.addClass('slide-option-in')
											.html('<input type="text" placeholder="Season" data-validation="required" />');
									// adjust last li		
									list
										.children('li:last-child')
											.addClass('slide-option-in')
											.addClass('hidden')
											.html('<button class="next-field" disabled="true">Create <span>&#xe0dc;</span></button>');
									// animate
									animateNext();
									// increment phase
									createPhase++;
								
								break;
								case set.team.season:
									
									// disable back button
									$('button#back-create').attr( 'disabled' , 'true' );
									// update new object
									newTeamObject.season = data;
									// create new team
									var newTeam = Parse.Object.extend('Team');
									var team = new newTeam();
									// create ACL permissions
									var ACL = new Parse.ACL();
									ACL.setPublicReadAccess(true);
									ACL.setPublicWriteAccess(false);
									ACL.setWriteAccess( Parse.User.current() , true );
									// set permissions and preliminary profile information
									team.set( 'createdBy' , Parse.User.current() );
									team.set( 'name' , newTeamObject.name );
									team.set( 'competitiveCategory' , newTeamObject.ageLevel );
									team.set( 'year' , newTeamObject.season );
									team.set( 'searchName' , newTeamObject.name.toLowerCase() );
									team.set( 'searchCompetitiveCategory' , newTeamObject.ageLevel.toLowerCase() );
									team.set( 'active' , true )
									team.setACL( ACL );
							////////// creating new team
									team.save({
										// success
										success: function(newestTeam) {
											// reset
											resetCreateFrame();
											// reset phase
											createPhase = 0;
											// redirect to team home page
											window.location.href = '#/team/' + newestTeam.id;
										},
										// error
										error: function(error) {}
									});
								
								break;
							}
						
						break;
						// league
						case 2:
						
							// phase
							switch ( phase ) {
								case 0:
								
									// append two li
									for ( var i = 0; i < 2; i++ ) {
										// new li
										var li = document.createElement('li');
										// new li properties
										list.append(li);
									}
									// adjust first li
									list
										.children('li:first-child')
											.addClass('slide-option-in')
											.html('<input type="text" placeholder="League Name" data-validation="required" />');
									// adjust last li		
									list
										.children('li:last-child')
											.addClass('slide-option-in')
											.addClass('hidden')
											.html('<button class="next-field cf" disabled="true">Next <span>&#xe0dc;</span></button>');
									// animate transition
									animateNext();
									// increment phase
									createPhase++;
											
								break;
								case set.league.name:
								
									// update new object
									newLeagueObject.name = data;
									// append two li
									for ( var i = 0; i < 2; i++ ) {
										// new li
										var li = document.createElement('li');
										// new li properties
										list.append(li);
									}
									// adjust first li
									list
										.children('li:first-child')
											.addClass('slide-option-in')
											.html('<input type="text" placeholder="Age Group/Level" data-validation="required" />');
									// adjust last li		
									list
										.children('li:last-child')
											.addClass('slide-option-in')
											.addClass('hidden')
											.html('<button class="next-field" disabled="true">Next <span>&#xe0dc;</span></button>');
									// animate
									animateNext();
									// increment phase
									createPhase++;
									
								break;
								case set.league.ageLevel:
								
									// update new object
									newLeagueObject.ageLevel = data;
									// append two li
									for ( var i = 0; i < 2; i++ ) {
										// new li
										var li = document.createElement('li');
										// new li properties
										list.append(li);
									}
									// adjust first li
									list
										.children('li:first-child')
											.addClass('slide-option-in')
											.html('<input type="text" placeholder="Season" data-validation="required" />');
									// adjust last li		
									list
										.children('li:last-child')
											.addClass('slide-option-in')
											.addClass('hidden')
											.html('<button class="next-field" disabled="true">Create <span>&#xe0dc;</span></button>');
									// animate
									animateNext();
									// increment phase
									createPhase++;
								
								break;
								case set.league.season:
								
									// disable back button
									$('button#back-create').attr( 'disabled' , 'true' );
									// update new object
									newLeagueObject.season = data;
									// create new team
									var newLeague = Parse.Object.extend('League');
									var league = new newLeague();
									// create ACL permissions
									var ACL = new Parse.ACL();
									ACL.setPublicReadAccess(true);
									ACL.setPublicWriteAccess(false);
									ACL.setWriteAccess( Parse.User.current() , true );
									// set permissions and preliminary profile information
									league.set( 'createdBy' , Parse.User.current() );
									league.set( 'name' , newLeagueObject.name );
									league.set( 'competitiveCategory' , newLeagueObject.ageLevel );
									league.set( 'year' , newLeagueObject.season );
									league.set( 'searchName' , newLeagueObject.name.toLowerCase() );
									league.set( 'searchCompetitiveCategory' , newLeagueObject.ageLevel.toLowerCase() );
									league.set( 'active' , true )
									league.setACL( ACL );
							////////// creating new team
									league.save({
										// success
										success: function(newestLeague) {
											// reset
											resetCreateFrame();
											// reset phase
											createPhase = 0;
											// redirect to team home page
											window.location.href = '#/league/' + newestLeague.id;
										},
										// error
										error: function(error) {}
									});
								
								break;
							}
						
						break;
						// default
						default:
						break;
					
					}
				
				}
				// set heading
				function setHeadingAndBackButton( type , phase ) {
						
					// get header
					var header = $('div#slide-up-modal header h2');	
					// type
					switch ( type ) {
						// game
						case 0:
						
							// phase
							switch ( phase ) {
								case set.game.seasOrExhi:
									
									// if exhibition
									if ( data == 'Exhibition' )
										header.text('Home Team');
									// if season
									else
										header.text('League');
										
								break;
								case set.game.league:
									header.text('Home Team');
								break;
								case set.game.homeTeam:
									header.text('Away Team');
								break;
								case set.game.awayTeam:
									header.text('Location');
								break;
							}
						
						break;
						// team
						case 1:
						
							// phase
							switch ( phase ) {
								// name
								case 0:
									header.text('Team Name');
								break;
								// age group/level
								case set.team.name:
									header.text('Age Group/Level');
								break;
								case set.team.ageLevel:
									header.text('Season');
								break;
							}
						
						break;
						// league
						case 2:
						
							// phase
							switch ( phase ) {
								// name
								case 0:
									header.text('League Name');
								break;
								// age group/level
								case set.league.name:
									header.text('Age Group/Level');
								break;
								case set.league.ageLevel:
									header.text('Season');
								break;
							}
						
						break;
					}
						
				}
				
				// what do you want to create?
				if ( createPhase == 0 ) {
					// can now go backwards
					$('#back-create').removeAttr('disabled');
					// creating ...
					switch ( data ) {
						// creating a game
						case "Game":
						
							// set isCreating
							isCreating = 0;
							// get date
							var date = new Date();
							date = date.toString().split(' ')
							date = date[1] + ' ' + date[2] + ' ' + date[3] + ' ' + date[4];
							// new game
							newGameObject = {
								creator 		: Parse.User.current(),
								league			: undefined,
								home			: {
									team 		: undefined,
									creator 	: undefined
								},
								away			: {
									team 		: undefined,
									creator 	: undefined
								},
								time			: date,
								collaborators 	: [ Parse.User.current() ],
								location		: undefined
							}
							// set header
							setHeadingAndBackButton( isCreating , createPhase );
							// populate form
							populateForm( isCreating , createPhase );
							
						break;
						// creating a team
						case "Team":
						
							// set isCreating
							isCreating = 1;
							// new team
							newTeamObject = {
								creator 	: Parse.User.current(),
								name		: undefined,
								ageLevel	: undefined,
								season		: undefined
							}
							// set header
							setHeadingAndBackButton( isCreating , createPhase );
							// populate form
							populateForm( isCreating , createPhase );
							
						break;
						// creating a league
						case "League":
							
							// set isCreating
							isCreating = 2;
							// new league
							newLeagueObject = {
								creator 	: Parse.User.current(),
								name		: undefined,
								ageLevel	: undefined,
								season		: undefined
							}
							// set header
							setHeadingAndBackButton( isCreating , createPhase );
							// populate form
							populateForm( isCreating , createPhase , listTwo );
						
						break;
					}
				
				} else {
					
					// set header
					setHeadingAndBackButton( isCreating , createPhase );
					// populate form
					populateForm( isCreating , createPhase );
					
				}
				
			}

		}
			
	});
	
	// backward iphone create
	$('button#back-create').on('touchstart', function(e) {
		
		e.preventDefault();
		// set touchstart target
		touchstartTargetElement = document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
		
	}).on('touchmove', function(e) {
		
		e.preventDefault();
		// touchstart target is undefined
		touchstartTargetElement = undefined;
		
	}).on('touchend', function(e) {
			
		e.preventDefault();
		e.stopPropagation();
		// set touchend target
		touchendTargetElement = document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
		// if touchend === touchstart
		if ( touchendTargetElement === touchstartTargetElement ) {
			// if iphone
			if ( iphone ) {
				// objectifying lists
				var listOne = $('#slide-up-modal ul > div:nth-child(1)');
				var listTwo = $('#slide-up-modal ul > div:nth-child(2)');
				// create
				var create = [ 'Game' , 'Team' , 'League' ];
				// fill in form
				function repopulateForm( type , phase ) {
				
					// get correct list
					if ( listOne.hasClass('z') ) list = listTwo;
					else						 list = listOne;
					// clear list
					list.html('');
					// type
					switch ( type ) {
						// game
						case 0:
						
							// phase
							switch ( phase ) {
								case set.game.seasOrExhi:
								
									// disabled previous button
									$('button#back-create').attr( 'disabled' , 'true' );
									// reset frame
									for ( var i = 0; i < 3; i++ ) {
										// new li
										var li = document.createElement('li');
										// new li properties
										$(li)
											.attr( 'data-value' , create[i] )
											.addClass('slide-option-out')
											.addClass('next-field')
											.text(create[i]);
										// new li properties
										list.append(li);
									}
									
									// decrement phase
									createPhase = 0;
								
								break;
								case set.game.league:
								
									// append two li
									for ( var i = 0; i < 2; i++ ) {
										// new li
										var li = document.createElement('li');
										// new li properties
										$(li)
											.addClass('next-field');
										// append new li
										list.append(li);
									}
									// adjust first li
									list
										.children('li:first-child')
										.addClass('slide-option-out')
										.text('Exhibition')
										.attr({ 'data-value' : 'Exhibition' });
									// adjust last li		
									list
										.children('li:last-child')
										.addClass('slide-option-out')
										.text('Season')
										.attr({ 'data-value' : 'Season' });
										
									// decrement
									createPhase = 0.5;
								
								break;
								case set.game.homeTeam:
								
									// if has league
									if ( hasLeague ) {
										// if exhibition
										if ( newGameObject.league == null ) {
											// clear game object attributes
											newGameObject.league = undefined;
											// append two li
											for ( var i = 0; i < 2; i++ ) {
												// new li
												var li = document.createElement('li');
												// new li properties
												$(li)
													.addClass('next-field');
												// append new li
												list.append(li);
											}
											// adjust first li
											list
												.children('li:first-child')
												.addClass('slide-option-out')
												.text('Exhibition')
												.attr({ 'data-value' : 'Exhibition' });
											// adjust last li		
											list
												.children('li:last-child')
												.addClass('slide-option-out')
												.text('Season')
												.attr({ 'data-value' : 'Season' });
											
											// decrement phase
											createPhase = 0.5;
										// if season
										} else {
											// clear game object name
											newGameObject.league = undefined;
											// append two li
											for ( var i = 0; i < realPossibleLeagues.length; i++ ) {
												// new li
												var li = document.createElement('li');
												// new li properties
												$(li)
													.addClass('slide-option-out')
													.addClass('next-field')
													.attr( 'data-value' , realPossibleLeagues[i].id )
													.text(realPossibleLeagues[i].attributes['name'] + ' ' + realPossibleLeagues[i].attributes['competitiveCategory']);
												// append new li
												list.append(li);
											}
										
											// decrement phase
											createPhase--;
										}
									// if doesn't have league	
									} else {
										// clear game object name
										newGameObject.league = undefined;
										// disabled previous button
										$('button#back-create').attr( 'disabled' , 'true' );
										// reset frame
										for ( var i = 0; i < 3; i++ ) {
											// new li
											var li = document.createElement('li');
											// new li properties
											$(li)
												.attr( 'data-value' , create[i] )
												.addClass('slide-option-out')
												.addClass('next-field')
												.text(create[i]);
											// new li properties
											list.append(li);
										}
										
										// decrement phase
										createPhase = 0;
									}
								
								break;
								case set.game.awayTeam:
								
									// if exhibition
									if ( newGameObject.league == null ) {
										// update collaborator object
										newGameObject.home.team = undefined;
										newGameObject.home.creator = undefined;
										// append two li
										for ( var i = 0; i < 1; i++ ) {
											// new li
											var li = document.createElement('li');
											// new li properties
											$(li)
												.addClass('slide-option-out')
												.html('<input type="text" placeholder="&#xf002; Search for home team" data-validation="search" />');
											// append new li
											list.append(li);
										}
										// append results div
										list
											.append('<div class="results home-search"></div>')
											.children('div.results')
												.height( $(window).height() - $('div#slide-up-modal header').outerHeight() - $('div.results').siblings('li').outerHeight() );
										// add overflow after 5ms
										setTimeout(function() {
											list.children('div.results').addClass('add-overflow');
										}, 500);
										
										// decrement phase
										createPhase--;
									// if season	
									} else {
										// update collaborator object
										newGameObject.home.team = undefined;
										newGameObject.home.creator = undefined;
										// append two li
										for ( var i = 0; i < possibleTeams.length; i++ ) {
											// if team part of league
											if ( possibleTeams[i].attributes['league'].id === newGameObject.league ) {
												// new li
												var li = document.createElement('li');
												// new li properties
												$(li)
													.addClass('slide-option-out')
													.addClass('next-field')
													.attr({ 'data-value' : possibleTeams[i].attributes['team'].id , 'data-value-creator' : possibleTeams[i].attributes['team'].attributes['createdBy'].id })
													.text(possibleTeams[i].attributes['team'].attributes['name']);
												// append new li
												list.append(li);
											}
										}
										
										// decrement phase
										createPhase--;
									}
								
								break;
								case set.game.location:
								
									// if exhibition
									if ( newGameObject.league == null ) {
										// update new game object
										newGameObject.away.team = undefined;
										newGameObject.away.creator = undefined;
										// append two li
										for ( var i = 0; i < 1; i++ ) {
											// new li
											var li = document.createElement('li');
											// new li properties
											$(li)
												.addClass('slide-option-out')
												.html('<input type="text" placeholder="&#xf002; Search for away team" data-validation="search" />');
											// append new li
											list.append(li);
										}
										// remove overflow
										list
											.siblings('div')
												.children('div.results.home-search')
													.html('')
													.removeClass('add-overflow');
										// append results div
										list
											.append('<div class="results away-search"></div>')
											.children('div.results')
												.height( $(window).height() - $('div#slide-up-modal header').outerHeight() - $('div.results.away-search').siblings('li').outerHeight() );
										// add overflow after 5ms
										setTimeout(function() {
											list.children('div.results.away-search').addClass('add-overflow');
										}, 500);
										
										// decrement phase
										createPhase--;
									// if season	
									} else {
										// update new game object
										newGameObject.away.team = undefined;
										newGameObject.away.creator = undefined;
										// append two li
										for ( var i = 0; i < possibleTeams.length; i++ ) {
											// if team part of league
											if ( possibleTeams[i].attributes['league'].id === newGameObject.league && possibleTeams[i].attributes['team'].id !== newGameObject.home.team ) {
												// new li
												var li = document.createElement('li');
												// new li properties
												$(li)
													.addClass('slide-option-out')
													.addClass('next-field')
													.attr({ 'data-value' : possibleTeams[i].attributes['team'].id , 'data-value-creator' : possibleTeams[i].attributes['team'].attributes['createdBy'].id })
													.text(possibleTeams[i].attributes['team'].attributes['name']);
												// append new li
												list.append(li);
											}
										}
										
										// decrement phase
										createPhase--;
									}
								
								break;
							}
						
						break;
						// team
						case 1:
						
							// phase
							switch ( phase ) {
								case set.team.name:
								
									// disabled previous button
									$('button#back-create').attr( 'disabled' , 'true' );
									// clear team object name
									newTeamObject.name = undefined;
									// reset frame
									for ( var i = 0; i < 3; i++ ) {
										// new li
										var li = document.createElement('li');
										// new li properties
										$(li)
											.attr( 'data-value' , create[i] )
											.addClass('slide-option-out')
											.addClass('next-field')
											.text(create[i]);
										// new li properties
										list.append(li);
									}
									
									// decrement phase
									createPhase--;
								
								break;
								case set.team.ageLevel:
								
									// clear team object ageLevel
									newTeamObject.ageLevel = undefined;
									// append two li
									for ( var i = 0; i < 2; i++ ) {
										// new li
										var li = document.createElement('li');
										// new li properties
										list.append(li);
									}
									// adjust first li
									list
										.children('li:first-child')
											.addClass('slide-option-out')
											.html('<input type="text" placeholder="Team Name" data-validation="required" value="' + newTeamObject.name + '" />')
									// adjust last li		
									list
										.children('li:last-child')
											.addClass('slide-option-out')
											.addClass('hidden')
											.html('<button class="next-field">Next <span>&#xe0dc;</span></button>');
											
									// decrement phase
									createPhase--;
								
								break;
								case set.team.season:
								
									// clear team object season		
									newTeamObject.season = undefined;
									// append two li
									for ( var i = 0; i < 2; i++ ) {
										// new li
										var li = document.createElement('li');
										// new li properties
										list.append(li);
									}
									// adjust first li
									list
										.children('li:first-child')
											.addClass('slide-option-out')
											.html('<input type="text" placeholder="Age Group/Level" data-validation="required" value="' + newTeamObject.ageLevel + '" />')
									// adjust last li		
									list
										.children('li:last-child')
											.addClass('slide-option-out')
											.addClass('hidden')
											.html('<button class="next-field">Next <span>&#xe0dc;</span></button>');
											
									// decrement phase
									createPhase--;
								
								break;
							}
						
						break;
						// league
						case 2:
						
							// phase
							switch ( phase ) {
								case set.league.name:
								
									// disabled previous button
									$('button#back-create').attr( 'disabled' , 'true' );
									// clear team object name
									newLeagueObject.name = undefined;
									// reset frame
									for ( var i = 0; i < 3; i++ ) {
										// new li
										var li = document.createElement('li');
										// new li properties
										$(li)
											.attr( 'data-value' , create[i] )
											.addClass('slide-option-out')
											.addClass('next-field')
											.text(create[i]);
										// new li properties
										list.append(li);
									}
									
									// decrement phase
									createPhase--;
								
								break;
								case set.league.ageLevel:
								
									// clear team object ageLevel
									newLeagueObject.ageLevel = undefined;
									// append two li
									for ( var i = 0; i < 2; i++ ) {
										// new li
										var li = document.createElement('li');
										// new li properties
										list.append(li);
									}
									// adjust first li
									list
										.children('li:first-child')
											.addClass('slide-option-out')
											.html('<input type="text" placeholder="League Name" data-validation="required" value="' + newLeagueObject.name + '" />')
									// adjust last li		
									list
										.children('li:last-child')
											.addClass('slide-option-out')
											.addClass('hidden')
											.html('<button class="next-field">Next <span>&#xe0dc;</span></button>');
									
									// decrement phase
									createPhase--;
								
								break;
								case set.league.season:
								
									// clear team object season		
									newLeagueObject.season = undefined;
									// append two li
									for ( var i = 0; i < 2; i++ ) {
										// new li
										var li = document.createElement('li');
										// new li properties
										list.append(li);
									}
									// adjust first li
									list
										.children('li:first-child')
											.addClass('slide-option-out')
											.html('<input type="text" placeholder="Age Group/Level" data-validation="required" value="' + newLeagueObject.ageLevel + '" />')
									// adjust last li		
									list
										.children('li:last-child')
											.addClass('slide-option-out')
											.addClass('hidden')
											.html('<button class="next-field">Next <span>&#xe0dc;</span></button>');
									
									// decrement phase
									createPhase--;
								
								break;
							}
						
						break;
						// default
						default:
						break;
					}
					
				}
				// previous list animation
				function animatePrevious() {
					
					// current and next list
					var currentList;
					var previousList;
					// determine which list is current and next
					if ( listOne.hasClass('z') ) {
						currentList = listOne;
						previousList = listTwo;
					} else {
						currentList = listTwo;
						previousList = listOne;
					}
					// animate current items out and move current div back in z-direction
					currentList.children('li').addClass('slide-option-in');
					currentList.removeClass('z');
					currentList
						.find('button.next-field')
							.attr( 'disabled' , 'true' );
					// after 5 ms animate previous items in and move previous div forward in z-direction
					setTimeout(function() {
						// slide options in
						previousList.children('li').removeClass('slide-option-out');
						previousList.addClass('z');
						// focus on input
						previousList.children('li:first-child').children('input').focus();
					}, 5);
						
				}
				// set heading
				function setHeadingAndBackButton( type , phase ) {
						
					// get header
					var header = $('div#slide-up-modal header h2');	
					// type
					switch ( type ) {
						// game
						case 0:
						
							// phase
							switch ( phase ) {
								case set.game.seasOrExhi:
								
									header.text('Create');
								
								break;
								case set.game.league:
								
									header.text('Game Type');
								
								break;
								case set.game.homeTeam:
								
									// if has league
									if ( hasLeague ) {
										// if exhibition
										if ( newGameObject.league == null ) {
											header.text('Game Type');
										// if season
										} else {
											header.text('League');
										}
									// if doesn't have league	
									} else {
										header.text('Create');
									}
								
								break;
								case set.game.awayTeam:
								
									header.text('Home Team');
								
								break;
								case set.game.location:
								
									header.text('Away Team');
								
								break;
							}
						
						break;
						// team
						case 1:
						
							// phase
							switch ( phase ) {
								case set.team.name:
								
									header.text('Create');
								
								break;
								case set.team.ageLevel:
								
									header.text('Team Name');
								
								break;
								case set.team.season:
								
									header.text('Age Group/Level');
								
								break;
							}
						
						break;
						// league
						case 2:
						
							// phase
							switch ( phase ) {
								case set.league.name:
								
									header.text('Create');
								
								break;
								case set.league.ageLevel:
								
									header.text('League Name');
								
								break;
								case set.league.season:
								
									header.text('Age Group/Level');
								
								break;
							}
						
						break;
					}
						
				}
				
				if ( createPhase == 1 ) {
					
					// set heading
					setHeadingAndBackButton( isCreating , createPhase );
					// populate form
					repopulateForm( isCreating , createPhase );
					// animate
					animatePrevious();
		
				} else {
					
					// set heading
					setHeadingAndBackButton( isCreating , createPhase );
					// populate form
					repopulateForm( isCreating , createPhase );
					// animate
					animatePrevious();
					
				}
			
			}
			
		}
		
	});
	
	// close iphone modal
	$('#cancel-create').on('touchstart', function(e) {
		
		e.preventDefault();
		// set touchstart target
		touchstartTargetElement = document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
		
	}).on('touchmove', function(e) {
	
		e.preventDefault();
		// set touchstart target undefined
		touchstartTargetElement = undefined;
	
	}).on('touchend', function(e) {
		
		e.preventDefault();
		// set touchend target
		touchendTargetElement = document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
		// reset create frame
		function resetCreateFrame() {
			// clear new game, team, and league object, and phase
			newGameObject = {};
			newTeamObject = {};
			newLeagueObject = {};
			createPhase = 0;
			// hide modal
			$('#slide-up-modal').removeClass('modal-active');
			// bring back scroll
			$('body').css( 'overflow' , 'scroll' );
			// deactive back button
			$('#back-create')
				.attr( 'disabled' , true );	
		}
		// if touchend === touchstart
		if ( touchendTargetElement === touchstartTargetElement )
			// if iphone
			if ( iphone )
				// reset
				resetCreateFrame();
		
	});
	
	// change touchstart target on touchmove
	$('body').on('touchmove', function(e) {
		touchstartTargetElement = document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
	});



	

	function createGame(target) {
		// temporarily disable submit button
		$(target.currentTarget).attr( 'disabled' , true );
		
		if ( wasOptionPicked($('[name="game-type"]').val()) && wasOptionPicked($('[name="game-home-team"]').val()) && wasOptionPicked($('[name="game-away-team"]').val()) && wasOptionPicked($('[name="game-date"]').val()) ) {
			var homeTeam;
			var awayTeam;
			for ( var i = 0; i < possibleTeamsForMatch.length; i++ ) {
				if ( $('[name="game-home-team"]').val() === possibleTeamsForMatch[i].attributes['team'].id ) homeTeam = possibleTeamsForMatch[i];
				if ( $('[name="game-away-team"]').val() === possibleTeamsForMatch[i].attributes['team'].id ) awayTeam = possibleTeamsForMatch[i];
			}
			// teams
			var welcoming = new TeamClass();
			welcoming.id = $('[name="game-home-team"]').val();
			var visiting = new TeamClass();
			visiting.id = $('[name="game-away-team"]').val();
			// league
			var league = new LeagueClass();
			if ( $('[name="game-type"]').val() == 'Exhibition Game' ) league = null
			else league.id = $('[name="game-season"]').val();
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
			game.set('isOfficial', ( ( $('[name="game-type"]').val() == 'Exhibition Game' ) ? false : true ));
			game.set('league', league);
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
							if ( $('[name="game-type"]').val() == 'Exhibition Game' ) {
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
							} else {
								// get team rosters
								var homeRoster = new Parse.Query(Parse.Object.extend('userOnRoster'));
								homeRoster.equalTo('team', welcoming);
								homeRoster.equalTo('status', true);
								var awayRoster = new Parse.Query(Parse.Object.extend('userOnRoster'));
								awayRoster.equalTo('team', visiting);
								awayRoster.equalTo('status', true);
								var getRosters = Parse.Query.or(homeRoster, awayRoster);
								getRosters.limit(200);
								getRosters.find({
									success: function(players) {
										// goalie flags
										var hg = false;
										var ag = false;
										var hgar = [];
										var agar = [];
										// loop
										for ( var p = 0; p < players.length; p++ ) {
											// if home team
											if ( players[p].get('team').id === welcoming.id ) {
												// if player
												if ( $.inArray(players[p].get('role').position, [ 'Head Coach' , 'Assistant Coach' , 'Trainer' ]) == -1 ) {
													// if goalie
													if ( players[p].get('role').position == 'Goalie' ) {
														// if goalie not already used
														if ( !hg ) {
															hgar.push(players[p].id);
															hg = true;
														}
													// if player	
													} else {
														hgar.push(players[p].id);
													}
												}
											} else if ( players[p].get('team').id === visiting.id ) {
												// if player
												if ( $.inArray(players[p].get('role').position, [ 'Head Coach' , 'Assistant Coach' , 'Trainer' ]) == -1 ) {
													// if goalie
													if ( players[p].get('role').position == 'Goalie' ) {
														// if goalie not already used
														if ( !ag ) {
															agar.push(players[p].id);
															ag = true;
														}
													// if player	
													} else {
														agar.push(players[p].id);
													}
												}
											}
										}
										// new active roster objects
										var GameActiveRosterClass = Parse.Object.extend('gameActiveRoster');
										var homeActiveRoster = new GameActiveRosterClass();
										var homeACL = new Parse.ACL();
										homeACL.setPublicReadAccess(true);
										homeACL.setPublicWriteAccess(false);
										homeACL.setWriteAccess(homeTeam.attributes['team'].attributes['createdBy'].id, true);
										homeActiveRoster.set('players', hgar);
										homeActiveRoster.set('game', game);
										homeActiveRoster.set('advantage', true);
										homeActiveRoster.setACL(homeACL);
										var awayActiveRoster = new GameActiveRosterClass();
										var awayACL = new Parse.ACL();
										awayACL.setPublicReadAccess(true);
										awayACL.setPublicWriteAccess(false);
										awayACL.setWriteAccess(awayTeam.attributes['team'].attributes['createdBy'].id, true);
										awayActiveRoster.set('players', agar);
										awayActiveRoster.set('game', game);
										awayActiveRoster.set('advantage', false);
										awayActiveRoster.setACL(awayACL);
										Parse.Object.saveAll([ homeActiveRoster , awayActiveRoster ], {
											success: function(activeRosters) {
												// rosters
												var hRoster;
												var aRoster;
												// loop
												for ( var ar = 0; ar < activeRosters.length; ar++ ) {
													// if home
													if ( activeRosters[ar].get('advantage') ) hRoster = activeRosters[ar];
													else aRoster = activeRosters[ar];
												}
												// new request
												var RequestClass = Parse.Object.extend('Request');
												var hr = new RequestClass();
												var ar = new RequestClass();
												// ACL
												var HRACL = new Parse.ACL();
												HRACL.setPublicReadAccess(false);
												HRACL.setPublicWriteAccess(false);
												HRACL.setReadAccess(Parse.User.current(), true);
												HRACL.setReadAccess(homeTeam.attributes['team'].attributes['createdBy'].id, true);
												HRACL.setWriteAccess(homeTeam.attributes['team'].attributes['createdBy'].id, true);
												var ARACL = new Parse.ACL();
												ARACL.setPublicReadAccess(false);
												ARACL.setPublicWriteAccess(false);
												ARACL.setReadAccess(Parse.User.current(), true);
												ARACL.setReadAccess(awayTeam.attributes['team'].attributes['createdBy'].id, true);
												ARACL.setWriteAccess(awayTeam.attributes['team'].attributes['createdBy'].id, true);
												// set request
												hr.set('initiator', Parse.User.current());
												hr.set('invitee', {"__type":"Pointer","className":"User","objectId":""+ homeTeam.attributes['team'].attributes['createdBy'].id +""});
												hr.set('type', 2);
												hr.set('response', null);
												hr.set('responseReceived', false);
												hr.set('setTeamLeagueRelation', null);
												hr.set('setUserTeamRelation', null);
												hr.set('setGameActiveRoster', hRoster);
												hr.setACL(HRACL);
												// set request
												ar.set('initiator', Parse.User.current());
												ar.set('invitee', {"__type":"Pointer","className":"User","objectId":""+ awayTeam.attributes['team'].attributes['createdBy'].id +""});
												ar.set('type', 2);
												ar.set('response', null);
												ar.set('responseReceived', false);
												ar.set('setTeamLeagueRelation', null);
												ar.set('setUserTeamRelation', null);
												ar.set('setGameActiveRoster', aRoster);
												ar.setACL(ARACL);
												// send request
												Parse.Object.saveAll([ hr , ar ], {
													success: function(request) {
														game.set('score', gameRecord);
														game.set('homeActiveRoster', hRoster);
														game.set('awayActiveRoster', aRoster);
														game.set('initialized', true);
														game.set('rid', [ request[0].id , request[1].id ]);
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
											error: function(err) { controlModal(false); }
										});
									},
									error: function(err) { controlModal(false); }
								});
							}
						},
						error: function(err) { controlModal(false); }
					});
				},
				error: function(game, error) { controlModal(false); alert(error.message) }
			});
		} else {
			alert('You need at least a game type, two teams, and a date to create a game');
			$(target.currentTarget).removeAttr('disabled');
		}
	}