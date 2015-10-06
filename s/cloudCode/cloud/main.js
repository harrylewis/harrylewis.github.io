
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
/*
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello woakjshfsahjshafkhaskhjsafh");
	 Parse.Cloud.httpRequest({
	  url: 'http://www.parse.com/',
	  success: function(httpResponse) {
	    console.log(httpResponse.text);
	  },
	  error: function(httpResponse) {
	    console.error('Request failed with response code ' + httpResponse.status);
	  }
	});
});
*/
/*

Parse.Cloud.define('httpRequest', function(request, response) {
  Parse.Cloud.httpRequest({
    url: 'http://www.parse.com/',
    success: function(httpResponse) {
      console.log('afasf');
    },
    error: function(httpResponse) {
      console.error('Request failed with response code ' + httpResponse.status);
    }
  });
});
*/
Parse.Cloud.define("Hello", function(request, respone) {
	Parse.Cloud.useMasterKey();
	var team = Parse.Object.extend('Team');
	var thisTeam = new team();
	thisTeam.id = 'JCeV9GzUrf';
	thisTeam.set( 'name' , 'Edmonton Oilers' );
	thisTeam.save({
		success: function(teamer) {
			console.log(teamer);
		}
	});
});

// before save user
Parse.Cloud.beforeSave(Parse.User, function(request, response) {
	// already a user
	if (request.object.get('initiated')) {
		// username has spaces
		if ( request.object.get('username').indexOf(' ') >= 0 ) {
			response.error(1403);
			return false;
		}
		// no name
		if (!request.object.get('name').length) {
			response.error(1404);
			return false;
		}
		// if everything else succeeded
		if ( request.object.get('username').indexOf(' ') < 0 && request.object.get('name').length > 0 ) response.success();
	} else {
		// no name
		if (!request.object.get('name').length) {
			response.error(1203);
			return false;
		}
		// no email
		if (!request.object.get('email').length) {
			response.error(1204);
			return false;
		}
		// no name
		if ( request.object.get('username').indexOf(' ') >= 0 ) {
			response.error(1205);
			return false;
		}
		// if everything else succeeded
		if ( request.object.get('name').length > 0 && request.object.get('email').length > 0 ) {
			request.object.set('initiated', true);
			response.success();
		}
	}
});

// afterSave game
Parse.Cloud.afterSave("Game", function(request, repsonse) {
	
	// if final
	if ( request.object.get('gameFinal') && !(request.object.get('active')) ) {
	
		// if game is official and league is not undefined
		if ( request.object.get('isOfficial') && request.object.get('league') != undefined ) {
		
			// use master key
			Parse.Cloud.useMasterKey();
		
			// get game
			var GameClass = Parse.Object.extend('Game');
			var game = new GameClass();
			game.id = request.object.id;
			var getGame = new Parse.Query(Parse.Object.extend('Game'));
			getGame.equalTo('objectId', request.object.id);
			getGame.include('score');
			getGame.include('homeActiveRoster');
			getGame.include('awayActiveRoster');
			getGame.first({
				// success
				success: function(game) {
					// get team statistic records
					var getWelcomingTeamStatisticRecord = new Parse.Query(Parse.Object.extend('teamStatisticRecord'));
					getWelcomingTeamStatisticRecord.equalTo('team', game.get('homeTeam'));
					getWelcomingTeamStatisticRecord.equalTo('league', game.get('league'));
					var getVisitingTeamStatisticRecord = new Parse.Query(Parse.Object.extend('teamStatisticRecord'));
					getVisitingTeamStatisticRecord.equalTo('team', game.get('awayTeam'));
					getVisitingTeamStatisticRecord.equalTo('league', game.get('league'));
					var getTeamStatisticRecord = Parse.Query.or(getWelcomingTeamStatisticRecord, getVisitingTeamStatisticRecord);
					getTeamStatisticRecord.find({
						// success
						success: function(records) {
							// team records
							var teamRecords = [];
							// welcoming and visiting IDs
							var welcomingID;
							var visitingID;
							// loop
							for ( var r = 0; r < records.length; r++ ) {
								// if home
								if ( records[r].get('team').id === game.get('homeTeam').id )
									// set
									welcomingID = records[r].id
								// if away
								else
									// set
									visitingID = records[r].id;
							}
							// if home team won
							if ( game.get('score').attributes['WG'] > game.get('score').attributes['VG'] ) {
								// team record class
								var TeamStatisticRecordClass = Parse.Object.extend('teamStatisticRecord');
								// welcoming team
								var welcomingRecord = new TeamStatisticRecordClass();
								welcomingRecord.id = welcomingID;
								welcomingRecord.increment('GP');
								welcomingRecord.increment('W');
								welcomingRecord.increment('TP', 2);
								welcomingRecord.increment('HW');
								// visiting team
								var visitingRecord = new TeamStatisticRecordClass();
								visitingRecord.id = visitingID;
								visitingRecord.increment('GP');
								visitingRecord.increment('L');
								visitingRecord.increment('AL');
								// set team records
								teamRecords = [ welcomingRecord , visitingRecord ];
							// if away team won	
							} else if ( game.get('score').attributes['WG'] < game.get('score').attributes['VG'] ) {
								// team record class
								var TeamStatisticRecordClass = Parse.Object.extend('teamStatisticRecord');
								// welcoming team
								var welcomingRecord = new TeamStatisticRecordClass();
								welcomingRecord.id = welcomingID;
								welcomingRecord.increment('GP');
								welcomingRecord.increment('L');
								welcomingRecord.increment('HL');
								// visiting team
								var visitingRecord = new TeamStatisticRecordClass();
								visitingRecord.id = visitingID;
								visitingRecord.increment('GP');
								visitingRecord.increment('W');
								visitingRecord.increment('TP', 2);
								visitingRecord.increment('AW');
								// set team records
								teamRecords = [ welcomingRecord , visitingRecord ];
							// if draw
							} else if ( game.get('score').attributes['WG'] == game.get('score').attributes['VG'] ) {
								// team record class
								var TeamStatisticRecordClass = Parse.Object.extend('teamStatisticRecord');
								// welcoming team
								var welcomingRecord = new TeamStatisticRecordClass();
								welcomingRecord.id = welcomingID;
								welcomingRecord.increment('GP');
								welcomingRecord.increment('T');
								welcomingRecord.increment('TP');
								welcomingRecord.increment('HT');
								// visiting team
								var visitingRecord = new TeamStatisticRecordClass();
								visitingRecord.id = visitingID;
								visitingRecord.increment('GP');
								visitingRecord.increment('T');
								visitingRecord.increment('TP');
								visitingRecord.increment('AT');
								// set team records
								teamRecords = [ welcomingRecord , visitingRecord ];
							}
							// save all
							Parse.Object.saveAll(teamRecords);
						},
						// error
						error: function(err) {}
					});
					// get user statistic records
					var getWelcomingUserStatisticRecord = new Parse.Query(Parse.Object.extend('userStatisticRecord'));
					getWelcomingUserStatisticRecord.equalTo('team', game.get('homeTeam'));
					getWelcomingUserStatisticRecord.equalTo('league', game.get('league'));
					var getVisitingUserStatisticRecord = new Parse.Query(Parse.Object.extend('userStatisticRecord'));
					getVisitingUserStatisticRecord.equalTo('team', game.get('awayTeam'));
					getVisitingUserStatisticRecord.equalTo('league', game.get('league'));
					var getUserStatisticRecord = Parse.Query.or(getWelcomingUserStatisticRecord, getVisitingUserStatisticRecord);
					getUserStatisticRecord.include('rosterMember');
					getUserStatisticRecord.find({
						// success
						success: function(records) {
							// game active roster
							var gameActiveRoster = [];
							// loop
							for ( var r = 0; r < records.length; r++ ) {
								// if on home active roster
								if ( game.get('homeActiveRoster').attributes['players'].indexOf(records[r].attributes['rosterMember'].id) >= 0 ) {
									// user statistic record
									var UserStatisticRecordClass = Parse.Object.extend('userStatisticRecord');
									var userRecord = new UserStatisticRecordClass();
									userRecord.id = records[r].id;
									// if goalie
									if ( records[r].attributes['rosterMember'].attributes['role'].position == 'Goalie' ) {
										// minutes
										userRecord.increment('MIN', parseInt(game.get('defaultFirstPeriodMinutes')) + parseInt(game.get('defaultSecondPeriodMinutes')) + parseInt(game.get('defaultThirdPeriodMinutes')));
										// if home team won
										if ( game.get('score').attributes['WG'] > game.get('score').attributes['VG'] ) {
											// win
											userRecord.increment('W');
											// if shutout
											if ( game.get('score').attributes['VG'] == 0 ) {
												// shoutout
												userRecord.increment('SO');
											}
										// if away team won	
										} else if ( game.get('score').attributes['WG'] < game.get('score').attributes['VG'] ) {
											// loss
											userRecord.increment('L');
										// if tie
										} else if ( game.get('score').attributes['WG'] == game.get('score').attributes['VG'] ) {
											// tie
											userRecord.increment('T');
										}
									}
									// increment
									userRecord.increment('GP');
									// push
									gameActiveRoster.push(userRecord);
								// if on away active roster
								} else if ( game.get('awayActiveRoster').attributes['players'].indexOf(records[r].attributes['rosterMember'].id) >= 0 ) {
									// user statistic record
									var UserStatisticRecordClass = Parse.Object.extend('userStatisticRecord');
									var userRecord = new UserStatisticRecordClass();
									userRecord.id = records[r].id;
									// if goalie
									if ( records[r].attributes['rosterMember'].attributes['role'].position == 'Goalie' ) {
										// minutes
										userRecord.increment('MIN', parseInt(game.get('defaultFirstPeriodMinutes')) + parseInt(game.get('defaultSecondPeriodMinutes')) + parseInt(game.get('defaultThirdPeriodMinutes')));
										// if away team won
										if ( game.get('score').attributes['WG'] < game.get('score').attributes['VG'] ) {
											// win
											userRecord.increment('W');
											// if shutout
											if ( game.get('score').attributes['WG'] == 0 ) {
												// shoutout
												userRecord.increment('SO');
											}
										// if home team won	
										} else if ( game.get('score').attributes['WG'] > game.get('score').attributes['VG'] ) {
											// loss
											userRecord.increment('L');
										// if tie
										} else if ( game.get('score').attributes['WG'] == game.get('score').attributes['VG'] ) {
											// tie
											userRecord.increment('T');
										}
									}
									// increment
									userRecord.increment('GP');
									// push
									gameActiveRoster.push(userRecord);
								}
							}
							// save all
							Parse.Object.saveAll(gameActiveRoster);
						},
						// error
						error: function(err) {}
					});
				},
				// error
				error: function(err) {}
			});
			
		}
		
	}
	
});

// afterSave statistics
Parse.Cloud.afterSave("Statistics", function(request, response) {
	
	// verify statistic
	if (
		( request.object.get('collaborator') === undefined || request.object.get('collaborator') === null ) ||
		( request.object.get('event') === undefined || request.object.get('event') === null ) ||
		( request.object.get('game') === undefined || request.object.get('game') === null ) ||
		( request.object.get('advantage') === undefined || request.object.get('advantage') === null ) ||
		( request.object.get('isOfficial') === undefined || request.object.get('isOfficial') === null ) ||
		( request.object.get('minutes') === undefined || request.object.get('minutes') === null ) ||
		( request.object.get('seconds') === undefined || request.object.get('seconds') === null ) ||
		( request.object.get('period') === undefined || request.object.get('period') === null ) ||
		( request.object.get('participantTeam') === undefined || request.object.get('participantTeam') === null ) ||
		( request.object.get('oParticipantTeam') === undefined || request.object.get('oParticipantTeam') === null )
	) {
		
		// destroy collaboration		   
		request.object.destroy({
			// success
			success: function(destroyed) {
				// show error
				console.error('Collaboratoion ' + destroyed.id + ' destroyed.');
			},
			// error
			error: function(error) {}
		});
		
	} else {
		
		// master key
		Parse.Cloud.useMasterKey();
		// if request is official and has associated league
		if ( request.object.get('isOfficial') && ( request.object.get('league') != undefined && request.object.get('league') != null ) ) {
			// statistics to be saved
			var statisticsToBeSaved = [];
			// event type
			switch ( request.object.get('event') ) {
				// shot
				case 'Shot':
					
					// shot for player
					var shotForPlayer;
					// if player is not undefined
					if ( !( request.object.get('participant') == undefined || request.object.get('participant') == null ) ) {
						// if saved or saved penalty shot
						if ( request.object.get('other').type == 'Saved' || request.object.get('other').type == 'Saved Penalty Shot' ) {
							// if statistic record is defined
							if ( !( request.object.get('participantStatisticRecordID') == undefined || request.object.get('participantStatisticRecordID') == null ) ) {
								// get record
								var UserStatisticRecordClass = Parse.Object.extend('userStatisticRecord');
								shotForPlayer = new UserStatisticRecordClass();
								shotForPlayer.id = request.object.get('participantStatisticRecordID');
								// increment
								shotForPlayer.increment('S');
								// push
								statisticsToBeSaved.push(shotForPlayer);
							}
						}
					}
					
					// shot against goalie
					var shotAgainstGoalie;
					// if record is not undefined
					if ( !( request.object.get('oParticipant') == undefined || request.object.get('oParticipant') == null ) ) {
						// if saved or saved penalty shot
						if ( request.object.get('other').type == 'Saved' || request.object.get('other').type == 'Saved Penalty Shot' ) {
							// if statistic record is defined
							if ( !( request.object.get('oParticipantStatisticRecordID') == undefined || request.object.get('oParticipantStatisticRecordID') == null ) ) {
								// get record
								var UserStatisticRecordClass = Parse.Object.extend('userStatisticRecord');
								shotAgainstGoalie = new UserStatisticRecordClass();
								shotAgainstGoalie.id = request.object.get('oParticipantStatisticRecordID');
								// increment
								shotAgainstGoalie.increment('SA');
								shotAgainstGoalie.increment('SV');
								// push
								statisticsToBeSaved.push(shotAgainstGoalie);
							}
						}
					}
					
					// shot for game team
					var shotForTeam;
					// if record is not undefined
					if ( !( request.object.get('gameStatisticRecordID') == undefined || request.object.get('gameStatisticRecordID') == null ) ) {
						// if saved or saved penalty shot
						if ( request.object.get('other').type == 'Saved' || request.object.get('other').type == 'Saved Penalty Shot' ) {
							// if home shot
							if ( request.object.get('advantage') ) {
								// get record
								var GameStatisticRecordClass = Parse.Object.extend('gameStatisticRecord');
								shotForTeam = new GameStatisticRecordClass();
								shotForTeam.id = request.object.get('gameStatisticRecordID');
								// increment
								shotForTeam.increment('WS');
								// push
								statisticsToBeSaved.push(shotForTeam);
							// if away shot	
							} else {
								// get record
								var GameStatisticRecordClass = Parse.Object.extend('gameStatisticRecord');
								shotForTeam = new GameStatisticRecordClass();
								shotForTeam.id = request.object.get('gameStatisticRecordID');
								// increment
								shotForTeam.increment('VS');
								// push
								statisticsToBeSaved.push(shotForTeam);
							}
						}
					}
					
					// save all
					Parse.Object.saveAll(statisticsToBeSaved);
					
				break;
				// hit
				case 'Hit':
					
					// hit for player
					var hitForPlayer;
					// if player is not undefined
					if ( !( request.object.get('participant') == undefined || request.object.get('participant') == null ) ) {
						// if statistic record is defined
						if ( !( request.object.get('participantStatisticRecordID') == undefined || request.object.get('participantStatisticRecordID') == null ) ) {
							// get record
							var UserStatisticRecordClass = Parse.Object.extend('userStatisticRecord');
							hitForPlayer = new UserStatisticRecordClass();
							hitForPlayer.id = request.object.get('participantStatisticRecordID');
							// increment
							hitForPlayer.increment('H');
							// push
							statisticsToBeSaved.push(hitForPlayer);
						}
					}
					
					// hit for game team
					var hitForTeam;
					// if record is not undefined
					if ( !( request.object.get('gameStatisticRecordID') == undefined || request.object.get('gameStatisticRecordID') == null ) ) {
						// if home shot
						if ( request.object.get('advantage') ) {
							// get record
							var GameStatisticRecordClass = Parse.Object.extend('gameStatisticRecord');
							hitForTeam = new GameStatisticRecordClass();
							hitForTeam.id = request.object.get('gameStatisticRecordID');
							// increment
							hitForTeam.increment('WH');
							// push
							statisticsToBeSaved.push(hitForTeam);
						// if away shot	
						} else {
							// get record
							var GameStatisticRecordClass = Parse.Object.extend('gameStatisticRecord');
							hitForTeam = new GameStatisticRecordClass();
							hitForTeam.id = request.object.get('gameStatisticRecordID');
							// increment
							hitForTeam.increment('VH');
							// push
							statisticsToBeSaved.push(hitForTeam);
						}
					}
					
					// save all
					Parse.Object.saveAll(statisticsToBeSaved);
					
				break;
				// goal
				case 'Goal':
				
					// goal, shot, and point for player
					var goalShotAndPointForPlayer;
					// if player is not undefined
					if ( !( request.object.get('participant') == undefined || request.object.get('participant') == null ) ) {
						// if statistic record is defined
						if ( !( request.object.get('participantStatisticRecordID') == undefined || request.object.get('participantStatisticRecordID') == null ) ) {
							// get record
							var UserStatisticRecordClass = Parse.Object.extend('userStatisticRecord');
							goalShotAndPointForPlayer = new UserStatisticRecordClass();
							goalShotAndPointForPlayer.id = request.object.get('participantStatisticRecordID');
							// increment
							goalShotAndPointForPlayer.increment('G');
							goalShotAndPointForPlayer.increment('TP');
							goalShotAndPointForPlayer.increment('S');
							// push
							statisticsToBeSaved.push(goalShotAndPointForPlayer);
						}
					}
					
					// assist, and point for up to 1st player
					var assistAndPointForFirstPlayer;
					// if not a penalty shot
					if ( request.object.get('other').type != 'Penalty Shot' ) {
						// if player is not undefined
						if ( !( request.object.get('firstParticipant') == undefined || request.object.get('firstParticipant') == null ) ) {
							// if statistic record is defined
							if ( !( request.object.get('firstParticipantStatisticRecordID') == undefined || request.object.get('firstParticipantStatisticRecordID') == null ) ) {
								// get record
								var UserStatisticRecordClass = Parse.Object.extend('userStatisticRecord');
								assistAndPointForFirstPlayer = new UserStatisticRecordClass();
								assistAndPointForFirstPlayer.id = request.object.get('firstParticipantStatisticRecordID');
								// increment
								assistAndPointForFirstPlayer.increment('A');
								assistAndPointForFirstPlayer.increment('TP');
								// push
								statisticsToBeSaved.push(assistAndPointForFirstPlayer);
							}
						}
					}
					
					// assist, and point for up to 2nd player
					var assistAndPointForSecondPlayer;
					// if not a penalty shot
					if ( request.object.get('other').type != 'Penalty Shot' ) {
						// if player is not undefined
						if ( !( request.object.get('secondParticipant') == undefined || request.object.get('secondParticipant') == null ) ) {
							// if statistic record is defined
							if ( !( request.object.get('secondParticipantStatisticRecordID') == undefined || request.object.get('secondParticipantStatisticRecordID') == null ) ) {
								// get record
								var UserStatisticRecordClass = Parse.Object.extend('userStatisticRecord');
								assistAndPointForSecondPlayer = new UserStatisticRecordClass();
								assistAndPointForSecondPlayer.id = request.object.get('secondParticipantStatisticRecordID');
								// increment
								assistAndPointForSecondPlayer.increment('A');
								assistAndPointForSecondPlayer.increment('TP');
								// push
								statisticsToBeSaved.push(assistAndPointForSecondPlayer);
							}
						}
					}
					
					// goal against, and shot against for goalie
					var goalAndShotAgainstForGoalie;
					// if player is not undefined
					if ( !( request.object.get('oParticipant') == undefined || request.object.get('oParticipant') == null ) ) {
						// if statistic record is defined
						if ( !( request.object.get('oParticipantStatisticRecordID') == undefined || request.object.get('oParticipantStatisticRecordID') == null ) ) {
							// get record
							var UserStatisticRecordClass = Parse.Object.extend('userStatisticRecord');
							goalAndShotAgainstForGoalie = new UserStatisticRecordClass();
							goalAndShotAgainstForGoalie.id = request.object.get('oParticipantStatisticRecordID');
							// increment
							goalAndShotAgainstForGoalie.increment('GA');
							goalAndShotAgainstForGoalie.increment('SA');
							// push
							statisticsToBeSaved.push(goalAndShotAgainstForGoalie);
						}
					}
					
					// goal for team and against opposing team
					var goalForTeam;
					var goalAgainstOpposingTeam;
					// if home shot
					if ( request.object.get('advantage') ) {
						// get record
						var TeamStatisticRecordClass = Parse.Object.extend('teamStatisticRecord');
						goalForTeam = new TeamStatisticRecordClass();
						goalForTeam.id = request.object.get('teamStatisticRecordID')[0];
						goalAgainstOpposingTeam = new TeamStatisticRecordClass();
						goalAgainstOpposingTeam.id = request.object.get('teamStatisticRecordID')[1];
						// increment
						goalForTeam.increment('GF');
						goalAgainstOpposingTeam.increment('GA');
						// push
						statisticsToBeSaved.push(goalForTeam);
						statisticsToBeSaved.push(goalAgainstOpposingTeam);
					// if away shot	
					} else {
						// get record
						var TeamStatisticRecordClass = Parse.Object.extend('teamStatisticRecord');
						goalForTeam = new TeamStatisticRecordClass();
						goalForTeam.id = request.object.get('teamStatisticRecordID')[1];
						goalAgainstOpposingTeam = new TeamStatisticRecordClass();
						goalAgainstOpposingTeam.id = request.object.get('teamStatisticRecordID')[0];
						// increment
						goalForTeam.increment('GF');
						goalAgainstOpposingTeam.increment('GA');
						// push
						statisticsToBeSaved.push(goalForTeam);
						statisticsToBeSaved.push(goalAgainstOpposingTeam);
					}
					
					// goal, and shot for team in game
					var goalAndShotForTeamInGame;
					// if record is not undefined
					if ( !( request.object.get('gameStatisticRecordID') == undefined || request.object.get('gameStatisticRecordID') == null ) ) {
						// if home shot
						if ( request.object.get('advantage') ) {
							// get record
							var GameStatisticRecordClass = Parse.Object.extend('gameStatisticRecord');
							goalAndShotForTeamInGame = new GameStatisticRecordClass();
							goalAndShotForTeamInGame.id = request.object.get('gameStatisticRecordID');
							// increment
							goalAndShotForTeamInGame.increment('WG');
							goalAndShotForTeamInGame.increment('WS');
							// push
							statisticsToBeSaved.push(goalAndShotForTeamInGame);
						// if away shot	
						} else {
							// get record
							var GameStatisticRecordClass = Parse.Object.extend('gameStatisticRecord');
							goalAndShotForTeamInGame = new GameStatisticRecordClass();
							goalAndShotForTeamInGame.id = request.object.get('gameStatisticRecordID');
							// increment
							goalAndShotForTeamInGame.increment('VG');
							goalAndShotForTeamInGame.increment('VS');
							// push
							statisticsToBeSaved.push(goalAndShotForTeamInGame);
						}
					}
					
					// save all
					Parse.Object.saveAll(statisticsToBeSaved);
				
				break;
				// takeaway
				case 'Takeaway':
					
					// takeaway for player
					var takeawayForPlayer;
					// if player is not undefined
					if ( !( request.object.get('participant') == undefined || request.object.get('participant') == null ) ) {
						// if statistic record is defined
						if ( !( request.object.get('participantStatisticRecordID') == undefined || request.object.get('participantStatisticRecordID') == null ) ) {
							// get record
							var UserStatisticRecordClass = Parse.Object.extend('userStatisticRecord');
							takeawayForPlayer = new UserStatisticRecordClass();
							takeawayForPlayer.id = request.object.get('participantStatisticRecordID');
							// increment
							takeawayForPlayer.increment('TA');
							// push
							statisticsToBeSaved.push(takeawayForPlayer);
						}
					}
					
					// turnover for game team
					var turnoverForGameTeam;
					// if record is not undefined
					if ( !( request.object.get('gameStatisticRecordID') == undefined || request.object.get('gameStatisticRecordID') == null ) ) {
						// if home shot
						if ( request.object.get('advantage') ) {
							// get record
							var GameStatisticRecordClass = Parse.Object.extend('gameStatisticRecord');
							turnoverForGameTeam = new GameStatisticRecordClass();
							turnoverForGameTeam.id = request.object.get('gameStatisticRecordID');
							// increment
							turnoverForGameTeam.increment('VT');
							// push
							statisticsToBeSaved.push(turnoverForGameTeam);
						// if away shot	
						} else {
							// get record
							var GameStatisticRecordClass = Parse.Object.extend('gameStatisticRecord');
							turnoverForGameTeam = new GameStatisticRecordClass();
							turnoverForGameTeam.id = request.object.get('gameStatisticRecordID');
							// increment
							turnoverForGameTeam.increment('WT');
							// push
							statisticsToBeSaved.push(turnoverForGameTeam);
						}
					}
					
					// save all
					Parse.Object.saveAll(statisticsToBeSaved);
					
				break;
				// penalty
				case 'Penalty':
				
					// penalty for player
					var penaltyForPlayer;
					// if player is not undefined
					if ( !( request.object.get('participant') == undefined || request.object.get('participant') == null ) ) {
						// if statistic record is defined
						if ( !( request.object.get('participantStatisticRecordID') == undefined || request.object.get('participantStatisticRecordID') == null ) ) {
							// get record
							var UserStatisticRecordClass = Parse.Object.extend('userStatisticRecord');
							penaltyForPlayer = new UserStatisticRecordClass();
							penaltyForPlayer.id = request.object.get('participantStatisticRecordID');
							// increment
							penaltyForPlayer.increment('PIM');
							// push
							statisticsToBeSaved.push(penaltyForPlayer);
						}
					}
					
					// penalty for team
					var penaltyForTeam;
					// if home shot
					if ( request.object.get('advantage') ) {
						// get record
						var TeamStatisticRecordClass = Parse.Object.extend('teamStatisticRecord');
						penaltyForTeam = new TeamStatisticRecordClass();
						penaltyForTeam.id = request.object.get('teamStatisticRecordID')[0];
						// increment
						penaltyForTeam.increment('PIM');
						// push
						statisticsToBeSaved.push(penaltyForTeam);
					// if away shot	
					} else {
						// get record
						var TeamStatisticRecordClass = Parse.Object.extend('teamStatisticRecord');
						penaltyForTeam = new TeamStatisticRecordClass();
						penaltyForTeam.id = request.object.get('teamStatisticRecordID')[1];
						// increment
						penaltyForTeam.increment('PIM');
						// push
						statisticsToBeSaved.push(penaltyForTeam);
					}
					
					// penalty for game team
					var PenaltyForGameTeam;
					// if record is not undefined
					if ( !( request.object.get('gameStatisticRecordID') == undefined || request.object.get('gameStatisticRecordID') == null ) ) {
						// if home shot
						if ( request.object.get('advantage') ) {
							// get record
							var GameStatisticRecordClass = Parse.Object.extend('gameStatisticRecord');
							PenaltyForGameTeam = new GameStatisticRecordClass();
							PenaltyForGameTeam.id = request.object.get('gameStatisticRecordID');
							// increment
							PenaltyForGameTeam.increment('WP');
							// push
							statisticsToBeSaved.push(PenaltyForGameTeam);
						// if away shot	
						} else {
							// get record
							var GameStatisticRecordClass = Parse.Object.extend('gameStatisticRecord');
							PenaltyForGameTeam = new GameStatisticRecordClass();
							PenaltyForGameTeam.id = request.object.get('gameStatisticRecordID');
							// increment
							PenaltyForGameTeam.increment('VP');
							// push
							statisticsToBeSaved.push(PenaltyForGameTeam);
						}
					}
					
					// save all
					Parse.Object.saveAll(statisticsToBeSaved);
				
				break;
				// faceoff
				case 'Faceoff':
				
					// faceoff win for player
					var faceoffWinForPlayer;
					// if player is not undefined
					if ( !( request.object.get('participant') == undefined || request.object.get('participant') == null ) ) {
						// if statistic record is defined
						if ( !( request.object.get('participantStatisticRecordID') == undefined || request.object.get('participantStatisticRecordID') == null ) ) {
							// get record
							var UserStatisticRecordClass = Parse.Object.extend('userStatisticRecord');
							faceoffWinForPlayer = new UserStatisticRecordClass();
							faceoffWinForPlayer.id = request.object.get('participantStatisticRecordID');
							// increment
							faceoffWinForPlayer.increment('F');
							faceoffWinForPlayer.increment('FW');
							// push
							statisticsToBeSaved.push(faceoffWinForPlayer);
						}
					}
					
					// faceoff loss for player
					var faceoffLossForPlayer;
					// if record is not undefined
					if ( !( request.object.get('oParticipant') == undefined || request.object.get('oParticipant') == null ) ) {
						// if statistic record is defined
						if ( !( request.object.get('oParticipantStatisticRecordID') == undefined || request.object.get('oParticipantStatisticRecordID') == null ) ) {
							// get record
							var UserStatisticRecordClass = Parse.Object.extend('userStatisticRecord');
							faceoffLossForPlayer = new UserStatisticRecordClass();
							faceoffLossForPlayer.id = request.object.get('oParticipantStatisticRecordID');
							// increment
							faceoffLossForPlayer.increment('F');
							// push
							statisticsToBeSaved.push(faceoffLossForPlayer);
						}
					}
					
					// faceoff for game team
					var FaceoffForGameTeam;
					// if record is not undefined
					if ( !( request.object.get('gameStatisticRecordID') == undefined || request.object.get('gameStatisticRecordID') == null ) ) {
						// if home shot
						if ( request.object.get('advantage') ) {
							// get record
							var GameStatisticRecordClass = Parse.Object.extend('gameStatisticRecord');
							FaceoffForGameTeam = new GameStatisticRecordClass();
							FaceoffForGameTeam.id = request.object.get('gameStatisticRecordID');
							// increment
							FaceoffForGameTeam.increment('WF');
							// push
							statisticsToBeSaved.push(FaceoffForGameTeam);
						// if away shot	
						} else {
							// get record
							var GameStatisticRecordClass = Parse.Object.extend('gameStatisticRecord');
							FaceoffForGameTeam = new GameStatisticRecordClass();
							FaceoffForGameTeam.id = request.object.get('gameStatisticRecordID');
							// increment
							FaceoffForGameTeam.increment('VF');
							// push
							statisticsToBeSaved.push(FaceoffForGameTeam);
						}
					}
					
					// save all
					Parse.Object.saveAll(statisticsToBeSaved);
				
				break;
			}
		} else if ( request.object.get('isOfficial') ) {
			// statistics to be saved
			var statisticsToBeSaved = [];
			// event type
			switch ( request.object.get('event') ) {
				// shot
				case 'Shot':
					
					// shot for game team
					var shotForTeam;
					// if record is not undefined
					if ( !( request.object.get('gameStatisticRecordID') == undefined || request.object.get('gameStatisticRecordID') == null ) ) {
						// if saved or saved penalty shot
						if ( request.object.get('other').type == 'Saved' || request.object.get('other').type == 'Saved Penalty Shot' ) {
							// if home shot
							if ( request.object.get('advantage') ) {
								// get record
								var GameStatisticRecordClass = Parse.Object.extend('gameStatisticRecord');
								shotForTeam = new GameStatisticRecordClass();
								shotForTeam.id = request.object.get('gameStatisticRecordID');
								// increment
								shotForTeam.increment('WS');
								// push
								statisticsToBeSaved.push(shotForTeam);
							// if away shot	
							} else {
								// get record
								var GameStatisticRecordClass = Parse.Object.extend('gameStatisticRecord');
								shotForTeam = new GameStatisticRecordClass();
								shotForTeam.id = request.object.get('gameStatisticRecordID');
								// increment
								shotForTeam.increment('VS');
								// push
								statisticsToBeSaved.push(shotForTeam);
							}
						}
					}
					
					// save all
					Parse.Object.saveAll(statisticsToBeSaved);
					
				break;
				// hit
				case 'Hit':
					
					// hit for game team
					var hitForTeam;
					// if record is not undefined
					if ( !( request.object.get('gameStatisticRecordID') == undefined || request.object.get('gameStatisticRecordID') == null ) ) {
						// if home shot
						if ( request.object.get('advantage') ) {
							// get record
							var GameStatisticRecordClass = Parse.Object.extend('gameStatisticRecord');
							hitForTeam = new GameStatisticRecordClass();
							hitForTeam.id = request.object.get('gameStatisticRecordID');
							// increment
							hitForTeam.increment('WH');
							// push
							statisticsToBeSaved.push(hitForTeam);
						// if away shot	
						} else {
							// get record
							var GameStatisticRecordClass = Parse.Object.extend('gameStatisticRecord');
							hitForTeam = new GameStatisticRecordClass();
							hitForTeam.id = request.object.get('gameStatisticRecordID');
							// increment
							hitForTeam.increment('VH');
							// push
							statisticsToBeSaved.push(hitForTeam);
						}
					}
					
					// save all
					Parse.Object.saveAll(statisticsToBeSaved);
					
				break;
				// goal
				case 'Goal':
					
					// goal, and shot for team in game
					var goalAndShotForTeamInGame;
					// if record is not undefined
					if ( !( request.object.get('gameStatisticRecordID') == undefined || request.object.get('gameStatisticRecordID') == null ) ) {
						// if home shot
						if ( request.object.get('advantage') ) {
							// get record
							var GameStatisticRecordClass = Parse.Object.extend('gameStatisticRecord');
							goalAndShotForTeamInGame = new GameStatisticRecordClass();
							goalAndShotForTeamInGame.id = request.object.get('gameStatisticRecordID');
							// increment
							goalAndShotForTeamInGame.increment('WG');
							goalAndShotForTeamInGame.increment('WS');
							// push
							statisticsToBeSaved.push(goalAndShotForTeamInGame);
						// if away shot	
						} else {
							// get record
							var GameStatisticRecordClass = Parse.Object.extend('gameStatisticRecord');
							goalAndShotForTeamInGame = new GameStatisticRecordClass();
							goalAndShotForTeamInGame.id = request.object.get('gameStatisticRecordID');
							// increment
							goalAndShotForTeamInGame.increment('VG');
							goalAndShotForTeamInGame.increment('VS');
							// push
							statisticsToBeSaved.push(goalAndShotForTeamInGame);
						}
					}
					
					// save all
					Parse.Object.saveAll(statisticsToBeSaved);
				
				break;
				// takeaway
				case 'Takeaway':
					
					// turnover for game team
					var turnoverForGameTeam;
					// if record is not undefined
					if ( !( request.object.get('gameStatisticRecordID') == undefined || request.object.get('gameStatisticRecordID') == null ) ) {
						// if home shot
						if ( request.object.get('advantage') ) {
							// get record
							var GameStatisticRecordClass = Parse.Object.extend('gameStatisticRecord');
							turnoverForGameTeam = new GameStatisticRecordClass();
							turnoverForGameTeam.id = request.object.get('gameStatisticRecordID');
							// increment
							turnoverForGameTeam.increment('VT');
							// push
							statisticsToBeSaved.push(turnoverForGameTeam);
						// if away shot	
						} else {
							// get record
							var GameStatisticRecordClass = Parse.Object.extend('gameStatisticRecord');
							turnoverForGameTeam = new GameStatisticRecordClass();
							turnoverForGameTeam.id = request.object.get('gameStatisticRecordID');
							// increment
							turnoverForGameTeam.increment('WT');
							// push
							statisticsToBeSaved.push(turnoverForGameTeam);
						}
					}
					
					// save all
					Parse.Object.saveAll(statisticsToBeSaved);
					
				break;
				// penalty
				case 'Penalty':
					
					// penalty for game team
					var PenaltyForGameTeam;
					// if record is not undefined
					if ( !( request.object.get('gameStatisticRecordID') == undefined || request.object.get('gameStatisticRecordID') == null ) ) {
						// if home shot
						if ( request.object.get('advantage') ) {
							// get record
							var GameStatisticRecordClass = Parse.Object.extend('gameStatisticRecord');
							PenaltyForGameTeam = new GameStatisticRecordClass();
							PenaltyForGameTeam.id = request.object.get('gameStatisticRecordID');
							// increment
							PenaltyForGameTeam.increment('WP');
							// push
							statisticsToBeSaved.push(PenaltyForGameTeam);
						// if away shot	
						} else {
							// get record
							var GameStatisticRecordClass = Parse.Object.extend('gameStatisticRecord');
							PenaltyForGameTeam = new GameStatisticRecordClass();
							PenaltyForGameTeam.id = request.object.get('gameStatisticRecordID');
							// increment
							PenaltyForGameTeam.increment('VP');
							// push
							statisticsToBeSaved.push(PenaltyForGameTeam);
						}
					}
					
					// save all
					Parse.Object.saveAll(statisticsToBeSaved);
				
				break;
				// faceoff
				case 'Faceoff':
					
					// faceoff for game team
					var FaceoffForGameTeam;
					// if record is not undefined
					if ( !( request.object.get('gameStatisticRecordID') == undefined || request.object.get('gameStatisticRecordID') == null ) ) {
						// if home shot
						if ( request.object.get('advantage') ) {
							// get record
							var GameStatisticRecordClass = Parse.Object.extend('gameStatisticRecord');
							FaceoffForGameTeam = new GameStatisticRecordClass();
							FaceoffForGameTeam.id = request.object.get('gameStatisticRecordID');
							// increment
							FaceoffForGameTeam.increment('WF');
							// push
							statisticsToBeSaved.push(FaceoffForGameTeam);
						// if away shot	
						} else {
							// get record
							var GameStatisticRecordClass = Parse.Object.extend('gameStatisticRecord');
							FaceoffForGameTeam = new GameStatisticRecordClass();
							FaceoffForGameTeam.id = request.object.get('gameStatisticRecordID');
							// increment
							FaceoffForGameTeam.increment('VF');
							// push
							statisticsToBeSaved.push(FaceoffForGameTeam);
						}
					}
					
					// save all
					Parse.Object.saveAll(statisticsToBeSaved);
				
				break;
			}
		}
	}
	
});

//https://pubsub.pubnub.com/publish/pub-c-51a57ac6-2523-4e18-a1c1-a812e0d0da2e/sub-c-e9c41c4c-021a-11e4-a929-02ee2ddab7fe/0/lw6i5G6EqC/0/%22Hellooooooo!%22