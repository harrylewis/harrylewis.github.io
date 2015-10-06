//
// scorbit.js - main app code
// created by Harry Lewis June 18, 2013
//

$(function() {

	/*  Initialize Parse with App ID and Javascript Key
	------------------------------------ */
		
	Parse.initialize("p9tyT8nPxsJG9BxJYwF7mF30m71S4tegMWWqsoeB", "Xj8pFmvpzeAj8UBCy0BogueusmgDTh0yDXqmvtYT");
	
	
	/*  Initialize PubNub with Publish Key and Subscribe Key
	------------------------------------ */

	var pubnub = PUBNUB.init({
		publish_key: 'pub-c-51a57ac6-2523-4e18-a1c1-a812e0d0da2e',
		subscribe_key: 'sub-c-e9c41c4c-021a-11e4-a929-02ee2ddab7fe'
	});

	// window.addEventListener("offline", function(e) { alert('offline') });
	// window.addEventListener("online", function(e) { alert('online') });
	

	/*  iPhone
	------------------------------------ */

	// iphone boolean
	var iphone = ( window.navigator.userAgent.match(/iPhone/i) ) ? true : false;
	var ipad = ( window.navigator.userAgent.match(/iPad/i) ) ? true : false;
	
	// if iphone
	if ( iphone ) {
		// check for homescreen app
		if ( window.navigator.standalone ) {}
		// detecting orientation change
		$(window).on('orientationchange', function(e) {
			// absolute value orientation
			var currentOrientation = Math.abs(e.target.orientation)
			// if landscape
			if ( currentOrientation == 90 ) {
				window.scrollTo(0,0);
			// portrait	
			} else if ( currentOrientation == 0 || currentOrientation == 180 ) {
				//if (gameMode)
				window.scrollTo(0,0);
			}
		});
	}
	
	/*  Functions
	------------------------------------ */

	function userIsCached() { return Parse.User.current(); }

	function setupApp(user, isEntering) {
		// change to home view
		if (isEntering) appView = new HomeView();

		$('[s-user]').attr('href', '#/' + Parse.User.current().get('username'));

		$('[s-create]').removeClass('global__button--fade');
		$('[s-app]').removeClass('container--out-of-app');
		$('[s-nav]').removeClass('nav--hidden');
		$('.container__fix').removeClass('container__fix--no-pad');
	}

	function setHeading(heading, back) {
		$('[s-heading]').text(heading);
		if (back)
			$('[s-back]')
				.removeClass('nav__button--hidden')
				.html('');
		else $('[s-back]').addClass('nav__button--hidden')
	}

	// on load check for a cached user
	if (userIsCached()) setupApp(Parse.User.current(), false);
	
	// check for local storage
	function localStorageCheck() {
		
		if ( window.localStorage !== undefined ) return true;
		else									 return false;
		
	}

	function abbreviate(phrase) {
		var brokenPhrase = phrase.split(' ');
		var abbreviation = '';

		for ( var i = 0; i < brokenPhrase.length; i++ ) {
			abbreviation += brokenPhrase[i].charAt(0).toUpperCase();
		}

		return abbreviation;
	}

	// time difference - updatedAt
	function getTimeDifference(ua) {
		// get current date, updated date, and subtract
		var lastUpdated;
		var currentDate = new Date();
		var updatedDate = ua;
		var dateDiffinS	= Math.floor(( currentDate - updatedDate ) / 1000);
		// updated just now
		if ( dateDiffinS == 0 )
			lastUpdated = 'Just now';
		// seconds ago (60 seconds in a minute)
		else if ( ( dateDiffinS / 60 ) < 1 )
			lastUpdated = dateDiffinS + ' seconds ago';
		// minutes ago (60 minutes in an hour) - 60
		else if ( ( dateDiffinS / 60 ) >= 1 && ( dateDiffinS / 60 ) < 60 )
			lastUpdated = Math.floor( dateDiffinS / 60 ) + ' minutes ago';
		// hours ago (24 hours in a day) - 3600
		else if ( ( dateDiffinS / 60 ) >= 60 && ( dateDiffinS / 60 ) < 1440 )
			lastUpdated = Math.floor( dateDiffinS / 3600 ) + ' hours ago';
		// days ago (7 days in a week) - 86400
		else if ( ( dateDiffinS / 60 ) >= 1440 && ( dateDiffinS / 60 ) < 10080 )
			lastUpdated = Math.floor( dateDiffinS / 86400 ) + 'days ago';
		// weeks ago (4 weeks in a month) - 604800
		else if ( ( dateDiffinS / 60 ) >= 10080 && ( dateDiffinS / 60 ) < 40320 )
			lastUpdated = Math.floor( dateDiffinS / 604800 ) + 'weeks ago';
		// months ago (12 months in a year) - 2419200
		else if ( ( dateDiffinS / 60 ) >= 40320 && ( dateDiffinS / 60 ) < 483840 )
			lastUpdated = Math.floor( dateDiffinS / 2419200 ) + 'months ago';
		// years ago - 29030400
		else if ( ( dateDiffinS / 60 ) >= 483840 )
			lastUpdated = Math.floor( dateDiffinS / 29030400 ) + 'years ago';
		return lastUpdated;
		
	}

	function setUser(username) { $('[data-user]').attr('href', '#/' + username); }

	function verifyFeedValidity(feed) {
		if ( feed.attributes['collaborator'] == undefined || feed.attributes['event'] == undefined || feed.attributes['game'] == undefined || feed.attributes['participantTeam'] == undefined || feed.attributes['oParticipantTeam'] == undefined || feed.attributes['period'] == undefined || feed.attributes['minutes'] == undefined || feed.attributes['seconds'] == undefined || feed.attributes['advantage'] == undefined )
			return false;
		return true;
	}

	function updateInteractiveClock(time) {
		$('[data-interactive-time]').text(time.join(':'));
	}

	function updateInteractivePeriod(period) {
		$('[data-interactive-period]').text(period);
	}

	function updateInteractiveScore(home, away) {
		$('[data-interactive-home-score]').text(home);
		$('[data-interactive-away-score]').text(away);
	}

	function updateInteractiveTeams(home, away) {
		$('[data-interactive-home-name]').text(home.split(' ')[0]);
		$('[data-interactive-home-mascot]').text(home.substr(home.indexOf(' ') + 1));
		$('[data-interactive-away-name]').text(away.split(' ')[0]);
		$('[data-interactive-away-mascot]').text(away.substr(away.indexOf(' ') + 1));
	}

	// function to get feeds and display them
	function displayFeeds(feeds, display) {
		if ( display && typeof(display) === 'function' ) display(feeds);
	}

	function noResults(e, directive) {
		$(e).html(_.template($('#no-results').html(),
			{
				alert 	: directive.alert,
				message : directive.message,
				action 	: {
					target 	: directive.action.target,
					message : directive.action.message
			}
		}));
		// make directive height of screen
		//directiveHeight('[data-directive]');
	}

	function parseDateIntoEnglish(day, month, date, year) {
		var pDay, pMonth;
		// day
		pDay 	= dates.day[day];
		pMonth	= dates.month[month];

		return pDay + ' ' + pMonth + ' ' + date + ', ' + year;
	}

	function convertArmyTime(hours, minutes) {
		return ( ( hours > 12 ) ? hours - 12 : hours ) + ':' + ( ( parseInt(minutes) < 10 ) ? '0' + minutes : minutes ) + ' ' + ( ( hours >= 12 ) ? 'PM' : 'AM' );
	}

	function elementFromPoint(e) {
		return document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
	}

	function setupTouch(view) {
		view.touchTimeout 	= undefined;
		view.touchstart 	= undefined;
		view.touchend 		= undefined;
		view.tap 			= undefined;
	}

	function openModal(header, template) {
		$('[s-app]').addClass('container--in-background');
		$('[s-app], [s-interactive]').addClass('container--in-background');
		$('[s-modal-primary]').addClass('container--modal--in-foreground');
		$('[s-modal-primary-header] ').html(header);
		$('[data-app-modal-primary]').html(template);
		$('[s-overlay]').addClass('overlay--in-foreground');
	}

	function openSecondModal(header) {
		$('[s-modal-secondary]').addClass('container--modal--in-foreground');
		$('[s-modal-secondary-header]').html(header);
		$('[s-app]').addClass('container--in-background');
		$('[s-overlay]').addClass('overlay--in-foreground');
	}

	function closeModal() {
		$('[s-app], [s-interactive]').removeClass('container--in-background');
		$('[s-modal-primary]').removeClass('container--modal--in-foreground');
		$('[s-overlay]').removeClass('overlay--in-foreground');
		$('[s-modal-primary] input').blur();
	}

	function closeSecondModal() {
		$('[s-app], [s-interactive]').removeClass('container--in-background');
		$('[s-modal-secondary]').removeClass('container--modal--in-foreground');
		$('[s-overlay]').removeClass('overlay--in-foreground');
		$('[s-modal-secondary] input').blur();
	}

	function entityIsReadyForCreation() {
		if ( $('#entity-type').val() != undefined && $('#entity-name').val().length > 0 && $('#entity-age').val() != undefined && $('#entity-level').val() != undefined && $('#entity-season').val() != undefined )
			return true;
		return false;
	}

	function playerIsReadyForCreation() {
		if ( $.inArray($('#player-position').val(), [ 'Head Coach' , 'Assistant Coach' , 'Trainer' ]) != -1 ) {
			if ( $('#player-position').val() != undefined && $('#player-name').val().length > 0 )
				return true;
			return false;
		} else {
			if ( $('#player-position').val() != undefined && $('#player-name').val().length > 0 && $('#player-number').val() != undefined )
				return true;
			return false;
		}
	}

	function officialGameIsReady() {
		if ( $('#game-home').val() != undefined && $('#game-away').val() != undefined && $('#game-home').val() != $('#game-away').val() && $('#game-date').val().length > 0 && $('#game-time').val().length > 0 )
			return true;
		return false;
	}

	function unofficialGameIsReady() {
		if ( $('#game-u-home').val() != undefined && $('#game-u-away').val() != undefined && ( $('#game-u-home').val() === appView.team.id || $('#game-u-away').val() === appView.team.id ) && $('#game-u-date').val().length > 0 && $('#game-u-time').val().length > 0 )
			return true;
		return false;
	}


	$('[s-modal-primary]').on('touchend', '[s-modal-primary-cancel]', function() {
		if ( touchstart === touchend ) closeModal();
	});

	$('[s-modal-secondary]').on('touchend', '[s-modal-secondary-cancel]', function() {
		if ( touchstart === touchend ) closeSecondModal();
	});

	$('[s-create]').on('touchend', function(e) {
		if ( touchstart === touchend )
			openModal(_.template($('#modal-header').html(), { header : 'Create' , entity : 'Team or League' , disabled : true }), _.template($('#create').html(), defaults));
	});

	$('[s-modal-primary]').on('change keyup', '[data-create]', function(e) {
		if (entityIsReadyForCreation())
			$('[s-modal-primary]').find('[s-modal-primary-confirm]').removeAttr('disabled');
		else
			$('[s-modal-primary]').find('[s-modal-primary-confirm]').attr('disabled', true);
	});

	$('[s-modal-primary]').on('change keyup', '[data-add]', function(e) {
		if (playerIsReadyForCreation())
			$('[s-modal-primary]').find('[s-modal-primary-confirm]').removeAttr('disabled');
		else
			$('[s-modal-primary]').find('[s-modal-primary-confirm]').attr('disabled', true);
	});

	$('[s-modal-primary]').on('change keyup', '[data-o-game]', function(e) {
		if (officialGameIsReady())
			$('[s-modal-primary]').find('[s-modal-primary-confirm]').removeAttr('disabled');
		else
			$('[s-modal-primary]').find('[s-modal-primary-confirm]').attr('disabled', true);
	});

	$('[s-modal-primary]').on('change keyup', '[data-u-game]', function(e) {
		if (unofficialGameIsReady())
			$('[s-modal-primary]').find('[s-modal-primary-confirm]').removeAttr('disabled');
		else
			$('[s-modal-primary]').find('[s-modal-primary-confirm]').attr('disabled', true);
	});

	$('[s-modal-primary]').on('change', '#game-u-home', function(e) {
		if ( $(e.currentTarget).val() != appView.team.id ) $('#game-u-away').val(appView.team.id);
	});

	$('[s-modal-primary]').on('change', '#game-u-away', function(e) {
		if ( $(e.currentTarget).val() != appView.team.id ) $('#game-u-home').val(appView.team.id);
	});

	$('[s-modal-primary]').on('change', '#league-invitation', function(e) {
		if ( $(e.currentTarget).val() != undefined )
			$('[s-modal-primary]').find('[s-modal-primary-confirm]').removeAttr('disabled');
		else
			$('[s-modal-primary]').find('[s-modal-primary-confirm]').attr('disabled', true);
	});

	var searchTimeout;

	$('[s-modal-primary]').on('keyup', '#invite-teams', function(e) {
		clearTimeout(searchTimeout);
		// value
		if ( $(e.currentTarget).val().length > 0 )
			findTeamsToInvite($(e.currentTarget).val());
	});

	$('[s-modal-primary]').on('touchend', '[data-invite-team]', function(e) {
		if ( touchstart === touchend ) {
			if ( $(e.currentTarget).find('a').attr('data-invited') == 'false' && $(e.currentTarget).find('a').attr('data-loading') == 'false' )
				inviteTeamToLeague(e, $(e.currentTarget).find('a').attr('data-team-id'), $(e.currentTarget).find('a').attr('data-creator'));
		}
	});

	$('[s-modal-primary]').on('change', '[data-set-roster-goalie]', function(e) {
		// playing
		if ( $(e.currentTarget).val() == 'true' ) {
			$('[data-set-roster-goalie]').each(function(r, o) {
				if ( $(e.currentTarget).attr('data-id') !== $(o).attr('data-id') ) {
					$(o).val('false');
				}
			});
		}
	});

	$('[s-modal-primary]').on('touchend', '[s-modal-primary-confirm]', function(e) {
		if ( touchstart === touchend ) {
			switch (appView.view) {
				case 0:

					if ( $('[data-form]').attr('data-form') == 'US' ) {
						appView.saveSettings($('#user-name').val(), $('#user-username').val(), $('#user-hometown').val(), $('#user-date').val());
						closeModal();
					} else if ( $('[data-form]').attr('data-form') == 'C' ) {
						if ( $('#entity-type').val() == 'Team' )
							createTeam(e, $('#entity-name').val(), $('#entity-age').val(), $('#entity-level').val(), $('#entity-season').val());
						else
							createLeague(e, $('#entity-name').val(), $('#entity-age').val(), $('#entity-level').val(), $('#entity-season').val());
					}
					else
						closeModal();
				break;
				case 1:

					if ( $('[data-form]').attr('data-form') == 'TS' ) {
						appView.saveSettings($('#team-name').val(), $('#team-age').val(), $('#team-level').val(), $('#team-season').val(), $('#team-hometown').val());
						closeModal();
					} else if ( $('[data-form]').attr('data-form') == 'C' ) {
						if ( $('#entity-type').val() == 'Team' )
							createTeam(e, $('#entity-name').val(), $('#entity-age').val(), $('#entity-level').val(), $('#entity-season').val());
						else
							createLeague(e, $('#entity-name').val(), $('#entity-age').val(), $('#entity-level').val(), $('#entity-season').val());
					} else if ( $('[data-form]').attr('data-form') == 'AT' ) {
						addPlayer(e, $('#player-name').val(), $('#player-position').val(), $('#player-number').val());
					} else if ( $('[data-form]').attr('data-form') == 'CUG' ) createUnofficialGame(e, $('#game-u-home').val(), $('#game-u-away').val(), $('#game-u-date').val(), $('#game-u-time').val(), $('#game-u-location').val());

					else
						closeModal();
				break;
				case 4:

					if ( $('[data-form]').attr('data-form') == 'NL' ) {
						responseToNotification($('#league-invitation').attr('data-id'), $('#league-invitation').val());
						closeModal();
					} else if ( $('[data-form]').attr('data-form') == 'NAR' ) {
						responseToNotification($('[data-set-roster-id]').attr('data-set-roster-id'), 'true');
						closeModal();
					} else if ( $('[data-form]').attr('data-form') == 'C' ) {
						if ( $('#entity-type').val() == 'Team' )
							createTeam(e, $('#entity-name').val(), $('#entity-age').val(), $('#entity-level').val(), $('#entity-season').val());
						else
							createLeague(e, $('#entity-name').val(), $('#entity-age').val(), $('#entity-level').val(), $('#entity-season').val());
					}
					else
						closeModal();

				break;
				case 3:
					if ( $('[data-form]').attr('data-form') == 'GS' ) {
						appView.saveSettings($('#game-first').val(), $('#game-second').val(), $('#game-third').val());
						closeModal();
					} else if ( $('[data-form]').attr('data-form') == 'C' ) {
						if ( $('#entity-type').val() == 'Team' )
							createTeam(e, $('#entity-name').val(), $('#entity-age').val(), $('#entity-level').val(), $('#entity-season').val());
						else
							createLeague(e, $('#entity-name').val(), $('#entity-age').val(), $('#entity-level').val(), $('#entity-season').val());
					}

					else
						closeModal();
				break;
				case 6:

					if ( $('[data-form]').attr('data-form') == 'LS' ) {
						appView.saveSettings($('#league-name').val(), $('#league-age').val(), $('#league-level').val(), $('#league-season').val(), $('#league-hometown').val());
						closeModal();
					} else if ( $('[data-form]').attr('data-form') == 'C' ) {
						if ( $('#entity-type').val() == 'Team' )
							createTeam(e, $('#entity-name').val(), $('#entity-age').val(), $('#entity-level').val(), $('#entity-season').val());
						else
							createLeague(e, $('#entity-name').val(), $('#entity-age').val(), $('#entity-level').val(), $('#entity-season').val());
					} else if ( $('[data-form]').attr('data-form') == 'COG' ) createOfficialGame(e, $('#game-home').val(), $('#game-away').val(), $('#game-date').val(), $('#game-time').val(), $('#game-location').val());
					else
						closeModal();
				break;
				default:

					if ( $('[data-form]').attr('data-form') == 'C' ) {
						if ( $('#entity-type').val() == 'Team' )
							createTeam(e, $('#entity-name').val(), $('#entity-age').val(), $('#entity-level').val(), $('#entity-season').val());
						else
							createLeague(e, $('#entity-name').val(), $('#entity-age').val(), $('#entity-level').val(), $('#entity-season').val());
					}
					else
						closeModal();

				break;
			}
		}
	});

	function initInteractiveScorbit(interactive) {
		if (interactive) {
			$('[s-app]').addClass('container--main--interactive');
			$('[s-interactive]').addClass('container--interactive--interactive');
		} else {
			$('[s-app]').removeClass('container--main--interactive');
			$('[s-interactive]').removeClass('container--interactive--interactive');
		}
	}

	function notFound() {
		// alert the error
		confirm('This page does not exist or is broken. You will be redirected to your home page.');
		// home
		appView = new HomeView();
	}

	function createTeam(e, name, age, level, season) {
		// validate
		if (entityIsReadyForCreation()) {
			// temporarily disable submit button
			$(e.currentTarget)
				.attr('disabled', true)
				.html('&#xf021;');
			// create new team
			var team = new TeamClass();
			var ACL = new Parse.ACL();
			ACL.setPublicReadAccess(true);
			ACL.setPublicWriteAccess(false);
			ACL.setWriteAccess(Parse.User.current(), true);
			// set permissions and preliminary profile information
			team.set('createdBy', Parse.User.current());
			team.set('name', name);
			team.set('ageGroup', age);
			team.set('level', level);
			team.set('competitiveCategory', age + ( ( level == undefined ) ? '' : ' ' + level ) );
			team.set('year', season);
			team.set('searchName', name.toLowerCase());
			team.set('searchCompetitiveCategory', age.toLowerCase() + ( ( level == undefined ) ? '' : ' ' + level.toLowerCase() ) );
			team.set('active', true);
			team.setACL(ACL);
			team.save({
				success: function(team) {
					window.location.href = '#/team/' + team.id;
					closeModal();
				},
				error: function(error) { closeModal(); }
			});
		} else alert('All fields are requried');
	}

	function createLeague(e, name, age, level, season) {
		// validate
		if (entityIsReadyForCreation()) {				
			// temporarily disable submit button
			$(e.currentTarget)
				.attr( 'disabled' , true )
				.html('&#xf021;');
			// create new league
			var league = new LeagueClass();
			var ACL = new Parse.ACL();
			ACL.setPublicReadAccess(true);
			ACL.setPublicWriteAccess(false);
			ACL.setWriteAccess(Parse.User.current(), true);
			// set permissions and preliminary profile information
			league.set('createdBy', Parse.User.current());
			league.set('name', name);
			league.set('ageGroup', age);
			league.set('level', level);
			league.set('competitiveCategory', age + ( ( level == undefined ) ? '' : ' ' + level ) );
			league.set('year', season);
			league.set('searchName', name.toLowerCase());
			league.set('searchCompetitiveCategory', age.toLowerCase() + ( ( level == undefined ) ? '' : ' ' + level.toLowerCase() ) );
			league.set('active', true);
			league.setACL(ACL);
			league.save({
				success: function(league) {
					window.location.href = '#/league/' + league.id;
					closeModal();
				},
				error: function(error) { closeModal(); }
			});
		} else alert('All fields are requried');
	}

	function addPlayer(e, name, position, number) {
		// validate
		if (playerIsReadyForCreation()) {
			// temporarily disable submit button
			$(e.currentTarget)
				.attr('disabled', true)
				.html('&#xf021;');
			// managing
			var managing = ( ( $.inArray(position, [ 'Head Coach' , 'Assistant Coach' , 'Trainer' ]) == -1 ) ? false : true );
			// new roster member
			var userOnRosterClass = Parse.Object.extend('userOnRoster');
			var nrm = new userOnRosterClass();
			// new team object
			var TeamClass = Parse.Object.extend('Team');
			var team = new TeamClass();
			team.id = appView.team.id;
			// set ACL
			var ACL = new Parse.ACL();
			ACL.setPublicReadAccess(true);
			ACL.setPublicWriteAccess(false);
			ACL.setReadAccess(Parse.User.current(), true);
			ACL.setWriteAccess(Parse.User.current(), true);
			// set new roster member information
			nrm.set('number', ((managing) ? null : parseInt(number)));
			nrm.set('role', { 'position' : position });
			nrm.set('status', true);
			nrm.set('ghostData', true);
			nrm.set('ghostObject', { 'name' : name });
			nrm.set('team', appView.team.o);
			nrm.set('user', null);
			nrm.set('responseReceived', null);
			nrm.setACL(ACL);
			nrm.save({
				success: function(newMember) {
					// push to roster numbers
					appView.team.numbers.push(parseInt(newMember.get('number')));
					console.log(appView.team.numbers);
					// search for leagues
					var getLeagues = new Parse.Query(Parse.Object.extend('teamInLeague'));
					getLeagues.equalTo('team', appView.team.o);
					getLeagues.equalTo('status' , true);
					getLeagues.include('league');
					getLeagues.find({
						success: function(leagues) {
							// records
							var playerRecords = [];

							// organize
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
								nr.set('team', appView.team.o);
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
								success: function(records) { closeModal(); },
								error: function(member, error) { closeModal(); }
							});
						},
						error: function(err) {}
					});
				},
				error: function(err) {}
			});
		} else alert('All fields are requried');
	}

	function createOfficialGame(e, home, away, date, time, location) {
		// validate
		if (officialGameIsReady()) {
			// temporarily disable submit button
			$(e.currentTarget)
				.attr('disabled', true)
				.html('&#xf021;');

			// get creators
			for ( var i = 0; i < appView.league.teams.length; i++ ) {
				if ( appView.league.teams[i].attributes['team'].id === home )
					homeCreator = appView.league.teams[i].attributes['team'].attributes['createdBy'].id;
				if ( appView.league.teams[i].attributes['team'].id === away )
					awayCreator = appView.league.teams[i].attributes['team'].attributes['createdBy'].id;
			}
			var date = new Date(Date.parse(date));
			date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, time.split(':')[0], time.split(':')[1], 0);
			
			// for ( var i = 0; i < possibleTeamsForMatch.length; i++ ) {
			// 	if ( $('[name="game-home-team"]').val() === possibleTeamsForMatch[i].attributes['team'].id ) homeTeam = possibleTeamsForMatch[i];
			// 	if ( $('[name="game-away-team"]').val() === possibleTeamsForMatch[i].attributes['team'].id ) awayTeam = possibleTeamsForMatch[i];
			// }
			// teams
			var welcoming = new TeamClass();
			welcoming.id = home;
			var visiting = new TeamClass();
			visiting.id = away;
			// league
			var league = new LeagueClass();
			league.id = appView.league.id;
			// game
			var GameClass = Parse.Object.extend('Game');
			var game = new GameClass();
			var ACL = new Parse.ACL();
			ACL.setPublicReadAccess(true);
			ACL.setPublicWriteAccess(false);
			ACL.setWriteAccess(Parse.User.current(), true);
			// set attribtues
			game.set('active', false);
			game.set('arena', ((!location.length) ? undefined : location ));
			game.set('awayTeam', visiting);
			game.set('createdBy', Parse.User.current());
			game.set('dateTimeOfGame', date);
			game.set('gameFinal', false);
			game.set('homeTeam', welcoming);
			game.set('officialCollaborators', []);
			game.set('isOfficial', true);
			game.set('league', league);
			game.set('searchArena', ((!location.length) ? undefined : location.toLowerCase() ));
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
							cActivity		: false,
							started 		: false
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
									homeACL.setWriteAccess(homeCreator, true);
									homeActiveRoster.set('players', hgar);
									homeActiveRoster.set('game', game);
									homeActiveRoster.set('advantage', true);
									homeActiveRoster.setACL(homeACL);
									var awayActiveRoster = new GameActiveRosterClass();
									var awayACL = new Parse.ACL();
									awayACL.setPublicReadAccess(true);
									awayACL.setPublicWriteAccess(false);
									awayACL.setWriteAccess(awayCreator, true);
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
											HRACL.setReadAccess(homeCreator, true);
											HRACL.setWriteAccess(homeCreator, true);
											var ARACL = new Parse.ACL();
											ARACL.setPublicReadAccess(false);
											ARACL.setPublicWriteAccess(false);
											ARACL.setReadAccess(Parse.User.current(), true);
											ARACL.setReadAccess(awayCreator, true);
											ARACL.setWriteAccess(awayCreator, true);
											// set request
											hr.set('initiator', Parse.User.current());
											hr.set('invitee', {"__type":"Pointer","className":"User","objectId":""+ homeCreator +""});
											hr.set('type', 2);
											hr.set('response', null);
											hr.set('responseReceived', false);
											hr.set('setTeamLeagueRelation', null);
											hr.set('setUserTeamRelation', null);
											hr.set('setGameActiveRoster', hRoster);
											hr.setACL(HRACL);
											// set request
											ar.set('initiator', Parse.User.current());
											ar.set('invitee', {"__type":"Pointer","className":"User","objectId":""+ awayCreator +""});
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
															closeModal();
														},
														error: function(err) { closeModal(); }
													});
												},
												error: function(err) { closeModal(); }
											});
										},
										error: function(err) { closeModal(); }
									});
								},
								error: function(err) { closeModal(); }
							});
						},
						error: function(err) { closeModal(); }
					});
				},
				error: function(game, error) { closeModal(); }
			});
		} else alert('You need at least two teams, and a date to create a game');
	}

	function createUnofficialGame(e, home, away, date, time, location) {
		// validate
		if (unofficialGameIsReady()) {
			// temporarily disable submit button
			$(e.currentTarget)
				.attr('disabled', true)
				.html('&#xf021;');

			var homeTeam;
			var awayTeam;
			var date = new Date(Date.parse(date));
			date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, time.split(':')[0], time.split(':')[1], 0);
			// teams
			var welcoming = new TeamClass();
			welcoming.id = home;
			var visiting = new TeamClass();
			visiting.id = away;
			// game
			var GameClass = Parse.Object.extend('Game');
			var game = new GameClass();
			var ACL = new Parse.ACL();
			ACL.setPublicReadAccess(true);
			ACL.setPublicWriteAccess(false);
			ACL.setWriteAccess(Parse.User.current(), true);
			// set attribtues
			game.set('active', false);
			game.set('arena', ((!location.length) ? undefined : location ));
			game.set('awayTeam', visiting);
			game.set('createdBy', Parse.User.current());
			game.set('dateTimeOfGame', date);
			game.set('gameFinal', false);
			game.set('homeTeam', welcoming);
			game.set('officialCollaborators', []);
			game.set('isOfficial', false);
			game.set('league', null);
			game.set('searchArena', ((!location.length) ? undefined : location.toLowerCase() ));
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
							cActivity		: false,
							started 		: false
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
									closeModal();
								},
								error: function(err) { closeModal(); }
							});
						},
						error: function(err) { closeModal(); }
					});
				},
				error: function(game, error) { closeModal(); }
			});
		} else alert('You need at least two teams, and a date to create a game');
	}

	function findTeamsToInvite(sv) {
		searchTimeout = window.setTimeout(function() {
			// by name
			var searchForTeamByName = new Parse.Query(Parse.Object.extend('Team'));
			searchForTeamByName.startsWith( 'name' , sv );
					
			// by case-insensitive name
			var searchForTeamByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
			searchForTeamByNameCaseInsensitive.startsWith( 'searchName' , sv );
					
			// by creator by case-insensitive username - overlaps
					
			var searchForTeams = Parse.Query.or( searchForTeamByName , searchForTeamByNameCaseInsensitive );
					
			// get teams
			searchForTeams.include('createdBy');
			searchForTeams.limit(100);
			searchForTeams.find({
				success: function(teams) {
					// records
					var teamRecords = [];
					// organize
					for ( var i = 0; i < teams.length; i++ ) {
						teamRecords.push({
							avatar 		: ( ( teams[i].get('profilePicture') == undefined ) ? defaultPic : teams[i].get('profilePicture').url() ),
							primary 	: teams[i].get('name') + ' ' + ( ( teams[i].get('ageGroup') == undefined ) ? '' : abbreviate(teams[i].get('ageGroup')) ) + ' ' + teams[i].get('level') + ' ' + teams[i].get('year'),
							secondary 	: 'Created by ' + teams[i].get('createdBy').attributes['username'],
							id 			: teams[i].id,
							creator 	: teams[i].get('createdBy').id,
							invited 	: ( ( $.inArray(teams[i].id, appView.league.teamIds) == -1 ) ? false : true )
						});
					}

					// display
					$('[data-app-modal-primary]').html(_.template($('#team-search-result-template').html(), { results : teamRecords }));
				},
				error: function(error) {}
			});
		}, 400);
	}

	function inviteTeamToLeague(e, id, creator) {
		// loading
		$(e.currentTarget)
			.find('a').attr('data-loading', true)
			.find('[data-invite-status]').html('&#xf021;');
		// new teamInLeague object
		var teamInLeagueClass = Parse.Object.extend('teamInLeague');
		var lm = new teamInLeagueClass();
		// league
		var LeagueClass = Parse.Object.extend('League');
		var league = new LeagueClass();
		league.id = appView.league.id;
		// new team object
		var TeamClass = Parse.Object.extend('Team');
		var team = new TeamClass();
		team.id = id;
		// set ACL
		var ACL = new Parse.ACL();
		ACL.setPublicReadAccess(true);
		ACL.setPublicWriteAccess(false);
		ACL.setReadAccess(Parse.User.current(), true);
		ACL.setWriteAccess(Parse.User.current(), true);
		ACL.setReadAccess(creator, true);
		ACL.setWriteAccess(creator, true);
		// set new league member information
		lm.set('league', league);
		lm.set('status', undefined);
		lm.set('team', team);
		lm.set('responseReceived', false);
		lm.setACL( ACL );
		lm.save({
			success: function(teamInLeague) {
				// new request
				var RequestClass = Parse.Object.extend('Request');
				var r = new RequestClass();
				// ACL
				var rACL = new Parse.ACL();
				rACL.setPublicReadAccess(false);
				rACL.setPublicWriteAccess(false);
				rACL.setReadAccess(Parse.User.current(), true);
				rACL.setWriteAccess(Parse.User.current(), true);
				rACL.setReadAccess(creator, true);
				rACL.setWriteAccess(creator, true);
				// set request
				r.set('initiator', Parse.User.current());
				r.set('invitee', {"__type":"Pointer","className":"User","objectId":""+ creator +""});
				r.set('type', 1);
				r.set('response', undefined);
				r.set('responseReceived', false);
				r.set('setTeamLeagueRelation', teamInLeague);
				r.set('setUserTeamRelation', null);
				r.set('setGameActiveRoster', null);
				r.setACL( rACL );
				// send request
				r.save(null, {
					success: function(request) {
						// already invited
						$(e.currentTarget)
							.find('a').attr('data-invited', true)
							.find('[data-invite-status]')
								.addClass('entity-feed__invited')
								.html('&#xe0b0;');
						// push
						appView.league.teamIds.push(id);
					},
					error: function(err) { closeModal(); }
				});
			},
			error: function(err) { closeModal(); }
		});
	}

	function responseToNotification(id, response) {
		// validate
		if ( response != undefined ) {
			// message
			$('[data-notification-id="' + id + '"]')
				.removeAttr('data-notification')
				.closest('[data-notification-container="' + id + '"]')
					.find('[data-notification-header]')
						.text('Confirming ...');
			// accept
			if ( response == 'true' ) {
				// notification
				var notification = $.grep(appView.notifications, function(e) { return e.id === id });

				// type
				switch (notification[0].attributes['type']) {
					case 1:
						// data
						var team 	= notification[0].attributes['setTeamLeagueRelation'].attributes['team'];
						var league 	= notification[0].attributes['setTeamLeagueRelation'].attributes['league'];
						// get teamInLeague object
						var teamInLeagueClass = Parse.Object.extend('teamInLeague');
						var leagueMember = new teamInLeagueClass();
						leagueMember.id = notification[0].attributes['setTeamLeagueRelation'].id;
						// set status
						leagueMember.set('status', true);
						leagueMember.set('responseReceived', true);
						leagueMember.save(null, {
							success: function(relation) {
								// create statistic record
								var TeamStatisticRecordClass = Parse.Object.extend('teamStatisticRecord');
								var record = new TeamStatisticRecordClass();
								// team
								var TeamClass = Parse.Object.extend('Team');
								var t = new TeamClass();
								t.id = team.id;
								// league
								var LeagueClass = Parse.Object.extend('League');
								var l = new LeagueClass();
								l.id = league.id;
								// ACL
								var ACL = new Parse.ACL();
								ACL.setPublicReadAccess(true);
								ACL.setPublicWriteAccess(false);
								// set attributes
								record.set('team', t);
								record.set('league', l);
								record.set('leagueMember', relation);
								record.set('GP', 0);
								record.set('W', 0);
								record.set('L', 0);
								record.set('T', 0);
								record.set('TP', 0);
								record.set('GF', 0);
								record.set('GA', 0);
								record.set('HW', 0);
								record.set('HL', 0);
								record.set('HT', 0);
								record.set('AW', 0);
								record.set('AL', 0);
								record.set('AT', 0);
								record.set('PIM', 0);
								record.setACL(ACL);	
								record.save(null, {
									success: function(newRecord) {
										// get all players on team
										var getPlayers = new Parse.Query(Parse.Object.extend('userOnRoster'));
										getPlayers.equalTo('team', t);
										getPlayers.equalTo('status', true);
										getPlayers.include('user');
										getPlayers.find({
											success: function(players) {
												// new records
												var teamPlayerRecords = [];
												// loop
												for ( var p = 0; p < players.length; p++ ) {
													// if player
													if ( $.inArray(players[p].get('role').position, [ 'Head Coach' , 'Assistant Coach' , 'Trainer' ]) == -1 ) {
														// create statistic record
														var UserStatisticRecordClass = Parse.Object.extend('userStatisticRecord');
														var record = new UserStatisticRecordClass();
														// user
														var u;
														if ( players[p].get('user') == null || players[p].get('user') == undefined ) {
															u = null;
														} else {
															var UserClass = Parse.User;
															u = new UserClass();
															u.id = players[p].get('user').id;
														}
														// ACL
														var ACL = new Parse.ACL();
														ACL.setPublicReadAccess(true);
														ACL.setPublicWriteAccess(false);
														// set attributes
														record.set('team', t);
														record.set('league', l);
														record.set('rosterMember', players[p]);
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
														record.set('goalie', ( ( players[p].get('role').position == 'Goalie' ) ? true : false ));
														record.setACL( ACL );
														// push
														teamPlayerRecords.push(record);
													}
												}
												// save
												Parse.Object.saveAll(teamPlayerRecords, {
													success: function(records) {
														// get notification object
														var RequestClass = Parse.Object.extend('Request');
														var cr = new RequestClass();
														cr.id = notification[0].id;
														// mark as read
														cr.set('response', true);
														cr.set('responseReceived', true);
														cr.save(null, {
															// success
															success: function(savedRequest) {
																// message
																$('[data-notification-id="' + id + '"]')
																	.closest('[data-notification-container="' + id + '"]')
																		.find('[data-notification-header]')
																			.text('Success');
															},
															error: function(error) {}
														});
													},
													error: function(err) {}
												});
											},
											error: function(err) {}
										});
									},
									error: function(err) {}
								});
							},
							error: function(error) {}
						});
					break;
					case 2:

						// set roster
						var setRoster = [];
						// loop
						$('[data-set-roster]').each(function(e, o) {
							if ( $(o).val() == 'true' ) setRoster.push($(o).attr('data-id'));
						});
						// save relation
						var GameActiveRosterClass = Parse.Object.extend('gameActiveRoster');
						var ar = new GameActiveRosterClass();
						ar.id = notification[0].attributes['setGameActiveRoster'].id;
						ar.set('players', setRoster);
						ar.save({
							success: function(active) {
								notification[0].attributes['setGameActiveRoster'].attributes['players'] = active.get('players');
								// message
								$('[data-notification-id="' + id + '"]')
									.attr('data-notification', true)
									.closest('[data-notification-container="' + id + '"]')
										.find('[data-notification-header]')
											.text('Roster Set');
							},
							// error
							error: function(err) {}
						});

					break;
				}
			// decline or set roster
			} else {
				// notification
				var notification = $.grep(appView.notifications, function(e) { return e.id === id });

				// type
				switch (notification[0].attributes['type']) {
					case 1:
						// data
						var team 	= notification[0].attributes['setTeamLeagueRelation'].attributes['team'];
						var league 	= notification[0].attributes['setTeamLeagueRelation'].attributes['league'];
						// get teamInLeague object
						var teamInLeagueClass = Parse.Object.extend('teamInLeague');
						var leagueMember = new teamInLeagueClass();
						leagueMember.id = notification[0].attributes['setTeamLeagueRelation'].id;
						leagueMember.set('status', false);
						leagueMember.set('responseReceived', true);
						leagueMember.save(null, {
							success: function(relation) {
								// get notification object
								var RequestClass = Parse.Object.extend('Request');
								var cr = new RequestClass();
								cr.id = notification[0].id;
								// mark as read
								cr.set('response', false);
								cr.set('responseReceived', true);
								cr.save(null, {
									// success
									success: function(savedRequest) {
										// message
										$('[data-notification-id="' + id + '"]')
											.closest('[data-notification-container="' + id + '"]')
												.find('[data-notification-header]')
													.text('Offer Declined');
									},
									error: function(error) {}
								});
							},
							error: function(error) {}
						});
					break;
					case 2:
					break;
				}

			}
		} else alert('Please respond to this request.');
	}
	
	
	
	/*  Global Variables
	------------------------------------ */
	
	var dates = {
		month 	: [ 'January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December' ],
		day		: [ 'Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' ]
	}
	var defaults = {
		age: [ 'Novice' , 'Minor Atom' , 'Atom' , 'Minor Peewee' , 'Peewee' , 'Minor Bantam' , 'Bantam' , 'Minor Midget' , 'Midget' , 'Juvenile' , 'Major Junior' , 'Professional' , 'Adult' ],
		level: [ 'House League' , 'Select' , 'A' , 'AA' , 'AAA' ],
		year: [ '2014-2015' , '2015' ],
		positions: [ 'Forward' , 'Right Wing' , 'Center' , 'Left Wing' , 'Defense' , 'Right Defense' , 'Left Defense' , 'Goalie' ,  'Head Coach' , 'Assistant Coach' , 'Trainer' ]
	}
	var userStatisticsShowing;
	var teamStatisticsShowing;
	var leagueStatisticsShowing;
	var setRoster;
	var possibleExhibitionTeams;
	var gameMode;
	var $loader = $('.loader');
	var defaultPic = 'images/default.png';
	var FollowerClass = Parse.Object.extend('Followers');
	var $body = $('body');
	var $wrapper = $('[data-app]');
	var $navigation = $('[data-app-nav]');
	var appView;
	var app = {
		back : undefined
	}
	var TeamClass = Parse.Object.extend('Team');
	var LeagueClass = Parse.Object.extend('League');
	var Relation = Parse.Object.extend('Relation');
	var touchstart = undefined;
	var touchend = undefined;
	
	
	/*  Views
	------------------------------------ */
	
	var LogInView = Parse.View.extend({
		
		el: $('[data-app-main]'),
		
		initialize: function() {
			// unbind previous events
			$('[data-app-main]').unbind();
			// binding this to functions that reference this
			_.bindAll(this, 'render');
			// render page
			this.render();

			// sign up flags
			this.signup = {
				name: 		null,
				username: 	null,
				email: 		null,
				password: 	null
			}

			// sign in flags
			this.signin = {
				username: 	null,
				password: 	null
			}

			// actions
			this.action = 0;
			this.active = false;

			setupTouch(this);

			initInteractiveScorbit(false);

			$('[s-create]').addClass('global__button--fade');
			$('[s-app]').addClass('container--out-of-app');
			$('[s-nav]').addClass('nav--hidden');
			$('.container__fix').addClass('container__fix--no-pad');

		},
		
		render: function() {

			// grabbing template and inserting into el
			var template = _.template( $('#login-view').html() );
			this.$el.html( template );
			
		},
		
		events: function() {
		
			// if iPhone
			return ( iphone || ipad ) ?
			
				{

					// new
					'touchstart [data-target-action]' : 'touchstartAction',
					'touchmove [data-target-action]' : 'touchmoveAction',
					'touchend [data-target-action]' : 'touchendAction',

					'touchstart [data-field]' : 'touchstartField',
					'touchmove [data-field]' : 'touchmoveField',
					'touchend [data-field]' : 'touchendField',

					'touchstart [data-target-switch-action]' : 'touchstartSwitchAction',
					'touchmove [data-target-switch-action]' : 'touchmoveSwitchAction',
					'touchend [data-target-switch-action]' : 'touchendSwitchAction',

					'touchstart [data-field="submit"]' : 'touchstartTakeAction',
					'touchmove [data-field="submit"]' : 'touchmoveTakeAction',
					'touchend [data-field="submit"]' : 'touchendTakeAction',

					'submit [data-action-form]' : 'takeAction',

					// keyup
					'keyup [data-field="su-name"]' : 'checkNameOnKeyup',
					'keyup [data-field="su-username"]' : 'checkUsernameOnKeyUp',
					'keyup [data-field="su-email"]' : 'checkEmailOnKeyUp',
					'keyup [data-field="su-password"]' : 'checkPasswordOnKeyUp',

					// focus
					'focus [data-field="si-username"]' : 'checkForUsername',
					'focus [data-field="si-password"]' : 'checkForPassword',

					// keyup
					'keyup [data-field="si-username"]' : 'checkForUsername',
					'keyup [data-field="si-password"]' : 'checkForPassword'
				
				}
				:
				{

					// keyup
					'keyup [data-field="su-name"]' : 'checkNameOnKeyup',
					'keyup [data-field="su-username"]' : 'checkUsernameOnKeyUp',
					'keyup [data-field="su-email"]' : 'checkEmailOnKeyUp',
					'keyup [data-field="su-password"]' : 'checkPasswordOnKeyUp',

					// focus
					'focus [data-field="si-username"]' : 'checkForUsername',
					'focus [data-field="si-password"]' : 'checkForPassword',

					// keyup
					'keyup [data-field="si-username"]' : 'checkForUsername',
					'keyup [data-field="si-password"]' : 'checkForPassword',

					// switch action
					'click [data-target-switch-action]' : 'switchAction',

					// take action
					'submit [data-action-form]' : 'takeAction'
					
				}
					
		},

		touchstartAction: function(e) {
			this.touchstart = this.touchend = document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
		},

		touchmoveAction: function(e) {
			e.preventDefault();
			this.touchend = undefined;
		},

		touchendAction: function(e) {
			e.preventDefault();
			if ( this.touchstart === this.touchend ) $('.actions').removeClass('actions--is-hidden');
			if ( parseInt($(e.currentTarget).attr('data-target-action')) == 0 ) {
				this.action = 1;
				this.switchAction(e);
			} else {
				this.action = 0;
				this.switchAction(e);
			}
		},

		touchstartField: function(e) {
			this.touchstart = this.touchend = document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
		},

		touchmoveField: function() {
			this.touchend = undefined;
		},

		touchendField: function(e) {
			if ( this.touchstart === this.touchend ) {
				e.preventDefault();
				$(e.currentTarget).focus();
			}
		},

		touchstartSwitchAction: function(e) {
			this.touchstart = this.touchend = document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
		},

		touchmoveSwitchAction: function(e) {
			e.preventDefault();
			this.touchend = undefined;
		},

		touchendSwitchAction: function(e) {
			e.preventDefault();
			if ( this.touchstart === this.touchend ) this.switchAction(e);
		},

		touchstartTakeAction: function(e) {
			this.touchstart = this.touchend = document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
		},

		touchmoveTakeAction: function(e) {
			e.preventDefault();
			this.touchend = undefined;
		},

		touchendTakeAction: function(e) {
			e.preventDefault();
			if ( this.touchstart === this.touchend ) this.takeAction(e);
		},

		checkNameOnKeyup: function(e) {
			if (!e.currentTarget.value.length) this.signup.name = false;
			else this.signup.name = true;
			// is form ready
			this.updateSubmissionStatus(this.isFormReady(this.action));
		},

		checkUsernameOnKeyUp: function(e) {
			if (!e.currentTarget.value.length) this.signup.username = false;
			else this.signup.username = true;
			// is form ready
			this.updateSubmissionStatus(this.isFormReady(this.action));
		},

		checkEmailOnKeyUp: function(e) {
			if (!e.currentTarget.value.length) this.signup.email = false;
			else this.signup.email = true;
			// is form ready
			this.updateSubmissionStatus(this.isFormReady(this.action));
		},

		checkPasswordOnKeyUp: function(e) {
			if ( e.currentTarget.value.length < 8 ) this.signup.password = false;
			else this.signup.password = true;
			// is form ready
			this.updateSubmissionStatus(this.isFormReady(this.action));
		},

		checkForUsername: function(e) {
			if ( e.currentTarget.value.length == 0 ) this.signin.username = false;
			else this.signin.username = true;
			// is form ready
			this.updateSubmissionStatus(this.isFormReady(this.action));
		},

		checkForPassword: function(e) {
			if ( e.currentTarget.value.length < 8 ) this.signin.password = false;
			else this.signin.password = true;
			// is form ready
			this.updateSubmissionStatus(this.isFormReady(this.action));
		},

		isFormReady: function(action) {
			// which form?
			if (!action) {
				if ( this.signup.name && this.signup.username && this.signup.email && this.signup.password ) return true;
			} else {
				if ( this.signin.username && this.signin.password ) return true;
			}
			return false;
		},

		updateSubmissionStatus: function(status) {
			if (status) $('[data-field="submit"]').removeAttr('disabled');
			else $('[data-field="submit"]').attr('disabled', true);
		},

		switchAction: function(e) {
			e.preventDefault();
			var self = this;
			// reset flags
			this.signup.name = this.signup.username = this.signup.email = this.signup.password = this.signin.username = this.signin.password = null;
			// clear all inputs
			$('.actions').find('.actions__input:not(.actions__input--submit)').val('');
			// disable submit and switch link
			$('.actions').find('.actions__input--submit')
				.attr('disabled', true)
				.val(( self.action == 0 ) ? 'Sign In' : 'Sign Up');
			// show correct switch target
			$(e.currentTarget).text(( self.action == 0 ) ? 'Sign up to access all the latest scores' : 'Already a member? Log in here' );
			// show correct form
			if (!this.action) {
				// sign in
				this.action = 1;
				$('.actions__form').children('.actions__field--input').each(function(i, o) {
					if ( parseInt(o.attributes['data-action-class'].value) == 0 ) $(o).addClass('actions__field--hidden');
					else if ( parseInt(o.attributes['data-action-class'].value) == 1 ) $(o).removeClass('actions__field--hidden');
				});
				// focus
				$('[data-field="si-username"]').focus();
			} else {
				// sign up
				this.action = 0;
				$('.actions__form').children('.actions__field--input').each(function(i, o) {
					if ( parseInt(o.attributes['data-action-class'].value) == 0 ) $(o).removeClass('actions__field--hidden');
					else if ( parseInt(o.attributes['data-action-class'].value) == 1 ) $(o).addClass('actions__field--hidden');
				});
				// focus
				$('[data-field="su-name"]').focus();
			}
		},

		takeAction: function(e) {
			$('input').blur();
			e.preventDefault();
			// which action?
			if (!this.action) {
				this.signUp(this.signup.name, this.signup.username, this.signup.email, this.signup.password, this.active, '[data-field="submit"]');
			} else {
				this.signIn(this.signin.username, this.signin.password, this.active, '[data-field="submit"]');
			}
		},
		
		signUp: function(ns, us, es, ps, active, target) {
			var self = this;
			// status is true
			if ( ns && us && es && ps && !active ) {
				// active
				this.active = true;
				// signing up
				$(target)
					.attr('disabled', true)
					.val('Signing Up ...');
				// user values
				var name 		= $('[data-field="su-name"]').val();
				var email 		= $('[data-field="su-email"]').val();
				var username 	= $('[data-field="su-username"]').val();
				var password 	= $('[data-field="su-password"]').val();
				var user 		= new Parse.User();
				var ACL 		= new Parse.ACL();
				ACL.setPublicReadAccess(true);
				ACL.setPublicWriteAccess(false);
				// create new user
				user.set('name', name);
				user.set('email', email);
				user.set('username', username);
				user.set('password', password);
				user.set('searchName', name.toLowerCase());
				user.set('searchUsername', username.toLowerCase());
				user.set('initiated', false);
				user.setACL(ACL);
				user.signUp(null, {
					success: function(user) { self.success(user); },
					error: function(user, error) { self.error(error); }
				});
			}
		},
		
		signIn: function(us, ps, active, target) {
			var self = this;
			// status is true
			if ( us && ps && !active ) {
				// active
				this.active = true;
				// signing in
				$('[data-field="submit"]')
					.attr('disabled', true)
					.val('Signing In ...');
				// user values
				var username = $('[data-field="si-username"]').val();
				var password = $('[data-field="si-password"]').val();
				// sign in user
				Parse.User.logIn(username, password, {
					success: function(user) { self.success(user); },
					error: function(user, error) { self.error(error); }
				});
			}
		},

		success: function(user) {
			this.active = false;
			// set up app
			setupApp(user, true);
		},

		error: function(error) {
			console.log(error);
			// enable form
			this.active = false;
			// determine error message
			switch (error.code) {
				case 125: this.displayError('Please type a valid Email'); break;
				case 202: this.displayError('This Username is already taken'); break;
				case 142:
					if ( parseInt(error.message) == 1203 ) this.displayError('Please type your Name');
					if ( parseInt(error.message) == 1204 ) this.displayError('Please type your Email');
					if ( parseInt(error.message) == 1205 ) this.displayError('Please type a valid Username');
				break;
				case 101: this.displayError('Username or Password is incorrect'); break;
			}
		},

		displayError: function(message) {
			// display error message
			$('[data-field="submit"]')
				.addClass('actions__input--error')
				.val(message);
			// enable after 1s
			setTimeout(function() {
				$('[data-field="submit"]')
					.removeClass('actions__input--error')
					.val(((!this.action) ? 'Sign Up' : 'Sign In' ))
					.removeAttr('disabled');
			}, 2000);
		}
		
	});
	
	// Home View
	var HomeView = Parse.View.extend({
		
		el: $('[data-app-main]'),
		
		initialize: function() {
			// unbind previous events
			$('[data-app-main]').unbind();
			// binding this to functions that reference this
			_.bindAll(this, 'render');
			// render page
			this.render();

			// current objects
			this.current = {
				teams: 		[],
				leagues: 	[]
			}
			
			// loading feeds
			this.on('load', this.loadData());


			initInteractiveScorbit(false);

			setHeading('Current Games', false);

		},
		
		render: function() {
		
			// grabbing template and inserting into el
			var template = _.template( $('#home-feed').html() );
			this.$el.html( template );
			
		},

		organizeRelations: function(entities) {
			// arrays
			var usableTeams = [], usableLeagues = [], usableGames = [];
			// organize
			for ( var i = 0; i < entities.length; i++ ) {
				switch (entities[i].attributes['type']) {
					case 0: usableTeams.push(entities[i].attributes['isFollowingTeam']); break;
					case 1: usableLeagues.push(entities[i].attributes['isFollowingLeague']); break;
					case 2: usableGames.push(entities[i].attributes['isFollowingGame'].id); break;
				}
			}
			// get games
			this.getGames(usableTeams, usableLeagues, usableGames);
		},

		getGames: function(teams, leagues, games) {
			var self = this;
			// teams - home
			var getGamesFromTeamsAsHomeTeam = new Parse.Query(Parse.Object.extend('Game'));
			getGamesFromTeamsAsHomeTeam.containedIn('homeTeam', teams);
			// teams - away
			var getGamesFromTeamsAsAwayTeam = new Parse.Query(Parse.Object.extend('Game'));
			getGamesFromTeamsAsAwayTeam.containedIn('awayTeam', teams);
			// leagues
			var getGamesFromLeagues = new Parse.Query(Parse.Object.extend('Game'));
			getGamesFromLeagues.containedIn('league', leagues);
			// games
			var getGamesFromGames = new Parse.Query(Parse.Object.extend('Game'));
			getGamesFromGames.containedIn('objectId', games);

			var getGames = new Parse.Query.or(getGamesFromTeamsAsHomeTeam, getGamesFromTeamsAsAwayTeam, getGamesFromLeagues, getGamesFromLeagues);
			getGames.equalTo('initialized', true);
			getGames.include('league');
			getGames.include('homeTeam');
			getGames.include('awayTeam');
			getGames.include('score');
			getGames.descending('dateTimeOfGame');
			getGames.find({
				success: function(games) {
					if (!games.length) {
						self.gamesLoaded(false);
					} else {
						self.gamesLoaded(true);
						if (iphone) self.displayGames(games);
						//else self.organizeGames(games);
					}
				},
				error: function(err) {}
			});
		},

		gamesLoaded: function(exists) {
			if (exists) {
				$('.loader').remove();
			} else {
				noResults($('[data-home]'), {
					alert 	: 'NO GAMES',
					message : 'Click the button below to find leagues and teams to follow. Keep up to date on all the scores.',
					action 	: {
						target 	: 'search',
						message : 'FIND GAMES'
					}
				});
			}
		},

		displayGames: function(games) {
			matches = [];

			for ( var i = 0; i < games.length; i++ ) {
				var gameDate = parseDateIntoEnglish(games[i].attributes['dateTimeOfGame'].getDay(), games[i].attributes['dateTimeOfGame'].getMonth(), games[i].attributes['dateTimeOfGame'].getDate(), games[i].attributes['dateTimeOfGame'].getFullYear());
				matches.push({
					date 		: gameDate.substr(gameDate.indexOf(' ') + 1),
					id 			: games[i].id,
					isStarted 	: games[i].attributes['start'],
					isActive 	: games[i].attributes['active'],
					isFinal 	: games[i].attributes['gameFinal'],
					time 		: convertArmyTime(games[i].attributes['dateTimeOfGame'].getHours(), games[i].attributes['dateTimeOfGame'].getMinutes()),
					home 	: {
						picture 	: ( ( games[i].attributes['homeTeam'].attributes['profilePicture'] == undefined ) ? defaultPic : games[i].attributes['homeTeam'].attributes['profilePicture'].url() ),
						team 		: games[i].attributes['homeTeam'].attributes['name'],
						score 		: games[i].attributes['score'].attributes['WG']
					},
					away 	: {
						picture 	: ( ( games[i].attributes['awayTeam'].attributes['profilePicture'] == undefined ) ? defaultPic : games[i].attributes['awayTeam'].attributes['profilePicture'].url() ),
						team 		: games[i].attributes['awayTeam'].attributes['name'],
						score 		: games[i].attributes['score'].attributes['VG']
					},
					league 	: {
						name 	: ( ( games[i].attributes['league'] == undefined ) ? '' : games[i].attributes['league'].attributes['name'] ),
						age 	: ( ( games[i].attributes['league'] == undefined ) ? '' : games[i].attributes['league'].attributes['competitiveCategory'] ),
						year 	: ( ( games[i].attributes['league'] == undefined ) ? '' : games[i].attributes['league'].attributes['year'] )
					}
				});
			}

			$('[data-home]').append(_.template($('#mobile-game-widget').html(), { matches : matches }));
		},
		
		loadData: function() {
			var self = this;
			// get followers
			var getInterests = new Parse.Query(Parse.Object.extend('Relation'));
			getInterests.equalTo('user', Parse.User.current());
			getInterests.find({
				success: function(entities) {
					// empty
					if (!entities.length) {
						noResults($('[data-home]'), {
							alert 	: 'NO GAMES',
							message : 'Click the button below to find leagues and teams to follow. Keep up to date on all the scores.',
							action 	: {
								target 	: 'search',
								message : 'FIND GAMES'
							}
						});
					// not empty
					} else { self.organizeRelations(entities); }
				},
				// error
				error: function(err) {}
			});
		
		},
		
		events: {

			'touchstart [data-game-widget]' : 'touchResult',
			'touchmove [data-game-widget]' : 'moveResult'
			
		},

		touchResult: function(e) {
			$(e.currentTarget)
				.addClass('game-widget__tapped')
				.siblings()
					.removeClass('game-widget__tapped');
		},

		moveResult: function(e) { $(e.currentTarget).removeClass('game-widget__tapped'); }
		
	});
	
	// Notifications View
	var NotificationsView = Parse.View.extend({
		
		el: $('[data-app-main]'),

		view: 4,

		notifications: [],
		
		initialize: function() {
			// unbind previous events
			$('[data-app-main]').unbind();
			// binding this to functions that reference this
			_.bindAll(this, 'render');
			// render page
			this.render();
			// no interactive aspect
			initInteractiveScorbit(false);

			setHeading('Notifications', true);
		},
		
		render: function() {
			var self = this;

			// handle pre render
			if (!( iphone || ipad )) this.$el.html('');
			// render blank page
			this.renderPage(this, $('#notifications-view').html());
			// get notifications
			var notifications = new Parse.Query(Parse.Object.extend('Request'));
			notifications.equalTo('responseReceived', false);
			notifications.equalTo('invitee', Parse.User.current());
			notifications.include('initiator');
			// league invitation
			notifications.include('setTeamLeagueRelation');
			notifications.include('setTeamLeagueRelation.team');
			notifications.include('setTeamLeagueRelation.league');
			notifications.include('setTeamLeagueRelation.league.createdBy');
			// game active roster
			notifications.include('setGameActiveRoster');
			notifications.include('setGameActiveRoster.game');
			notifications.include('setGameActiveRoster.game.homeTeam');
			notifications.include('setGameActiveRoster.game.awayTeam');
			notifications.descending('createdAt');
			notifications.find({
				success: function(requests) {
					// notifications
					var notifications = [];

					// organize
					for ( var i = 0; i < requests.length; i++ ) {
						notifications.push({
							id 				: requests[i].id,
							type 			: requests[i].get('type'),
							initiator 		: requests[i].get('initiator'),
							leagueInvite 	: requests[i].get('setTeamLeagueRelation'),
							gameRoster 		: requests[i].get('setGameActiveRoster'),
							created 		: getTimeDifference(requests[i].createdAt),
							gameDate 		: ( ( requests[i].get('type') == 2 ) ? parseDateIntoEnglish(requests[i].get('setGameActiveRoster').attributes['game'].attributes['dateTimeOfGame'].getDay(), requests[i].get('setGameActiveRoster').attributes['game'].attributes['dateTimeOfGame'].getMonth(), requests[i].get('setGameActiveRoster').attributes['game'].attributes['dateTimeOfGame'].getDate(), requests[i].get('setGameActiveRoster').attributes['game'].attributes['dateTimeOfGame'].getFullYear()) : undefined ),
							avatar 			: ( ( requests[i].get('type') == 1 ) ? ( ( requests[i].get('setTeamLeagueRelation').attributes['league'].attributes['profilePicture'] == undefined ) ? defaultPic : requests[i].get('setTeamLeagueRelation').attributes['league'].attributes['profilePicture'].url() ) : ( ( requests[i].get('type') == 2 ) ? ( ( requests[i].get('setGameActiveRoster').attributes['advantage'] ) ? ( ( requests[i].get('setGameActiveRoster').attributes['game'].attributes['homeTeam'].attributes['profilePicture'] == undefined ) ? defaultPic : requests[i].get('setGameActiveRoster').attributes['game'].attributes['homeTeam'].attributes['profilePicture'].url() ) : ( ( requests[i].get('setGameActiveRoster').attributes['game'].attributes['awayTeam'].attributes['profilePicture'] == undefined ) ? defaultPic : requests[i].get('setGameActiveRoster').attributes['game'].attributes['awayTeam'].attributes['profilePicture'].url() ) ) : defaultPic ) )//( ( requests[i].get('type') == 1 ) ? ( ( requests[i].get('setTeamLeagueRelation').attributes['league'].attributes['profilePicture'] == undefined ) ? defaultPic : requests[i].get('setTeamLeagueRelation').attributes['league'].attributes['profilePicture'].url() ) : ( ( requests[i].get('type') == 2 ) ? ( (requests[i].get('advantage')) ? ( ( requests[i].get('gameActiveRoster').attributes['game'].attributes['homeTeam'].attributes['profilePicture'] == undefined ) ? defaultPic : requests[i].get('gameActiveRoster').attributes['game'].attributes['homeTeam'].attributes['profilePicture'].url() ) : ( ( requests[i].get('gameActiveRoster').attributes['game'].attributes['awayTeam'].attributes['profilePicture'] == undefined ) ? defaultPic : requests[i].get('gameActiveRoster').attributes['game'].attributes['awayTeam'].attributes['profilePicture'].url() ) ) ) )
						});

						// push to view
						self.notifications.push(requests[i]);
					}

					// display
					$('[data-notifications]').html(_.template($('#notification').html(), { notifications : notifications }));
				},
				error: function(err) {}
			});
		},

		renderPage: function(data, template) { this.$el.html(_.template(template, data)); },
		
		events: function() {

			return ( iphone || ipad ) ? {
				
				'touchstart [data-touchstart]' : 'ts',
				'touchmove [data-touchmove]' : 'tm',
				'touchend [data-notification]' : 'respondToNotification'

			} : {}
			
		},

		ts: function(e) {
			// associate touchstart and touchend to the same element
			this.touchstart = this.touchend = elementFromPoint(e);
		},

		tm: function(e) {
			this.touchend = undefined;
		},

		respondToNotification: function(e) {
			if ( this.touhstart === this.touchend ) {
				// type of notification
				switch (parseInt($(e.currentTarget).attr('data-notification-type'))) {
					// team league relation
					case 1:
						openModal(_.template($('#modal-header').html(), { header : 'Respond' , entity : 'Notification' , disabled : true }), _.template($('#league-invite').html(), { id : $(e.currentTarget).attr('data-notification-id') }))
					break;
					// set roster
					case 2:
						// connecting
						$(e.currentTarget).closest('[data-notification-container="' + $(e.currentTarget).attr('data-notification-id') + '"]').find('[data-notification-header]').text('Connecting ...');
						// notification
						var notification = $.grep(this.notifications, function(r) { return r.id === $(e.currentTarget).attr('data-notification-id'); });
						// team
						var TeamClass = Parse.Object.extend('Team');
						var team = new TeamClass();
						team.id = ( ( notification[0].attributes['setGameActiveRoster'].attributes['advantage'] ) ? notification[0].attributes['setGameActiveRoster'].attributes['game'].attributes['homeTeam'].id : notification[0].attributes['setGameActiveRoster'].attributes['game'].attributes['awayTeam'].id );
						// get team roster
						var getTeam = new Parse.Query(Parse.Object.extend('userOnRoster'));
						getTeam.equalTo('team', team);
						getTeam.equalTo('status', true);
						getTeam.include('user');
						getTeam.limit(30);
						getTeam.find({
							success: function(players) {
								// records
								var playersOnActiveRoster = [];
								// organize
								for ( var i = 0; i < players.length; i++ ) {
									// not coach
									if ( $.inArray(players[i].get('role').position, [ 'Head Coach' , 'Assistant Coach' , 'Trainer' ]) == -1 ) {
										// goalie
										playersOnActiveRoster.push({
											id 			: players[i].id,
											name 		: ( (players[i].get('ghostData')) ? players[i].get('ghostObject').name : players[i].get('user').attributes['name'] ),
											playing 	: ( ( $.inArray(players[i].id, notification[0].attributes['setGameActiveRoster'].attributes['players']) != -1 ) ? true : false ),
											position 	: players[i].get('role').position
										});
									}
								}

								// display
								openModal(_.template($('#modal-header').html(), { header : 'Pick Active Roster' , entity : ( ( notification[0].attributes['setGameActiveRoster'].attributes['advantage'] ) ? notification[0].attributes['setGameActiveRoster'].attributes['game'].attributes['homeTeam'].attributes['name'] : notification[0].attributes['setGameActiveRoster'].attributes['game'].attributes['awayTeam'].attributes['name'] ) , disabled : false }), _.template($('#set-active-roster').html(), { roster : playersOnActiveRoster , id : notification[0].id }));
							},
							error: function(error) { closeModal(); }
						});
					break;
				}
			}
		}
		
	});
	
	// Profile View
	var ProfileView = Parse.View.extend({
		
		el: $('[data-app-main]'),

		view: 0,

		user: {
			id 			: undefined,
			o 			: undefined,
			name 		: undefined,
			username 	: undefined,
			hometown 	: undefined,
			dateOfBirth : undefined,
			avatar 		: undefined
		},
		
		initialize: function() {
			// unbind previous events
			$('[data-app-main]').unbind();
			// binding this to functions that reference this
			_.bindAll(this, 'render');
			// render page
			this.render();
			// ready for touch gestures
			setupTouch(this);
			// no interactive aspect
			initInteractiveScorbit(false);
		},
		
		render: function() {
			var self = this;

			// handle pre render
			if (!( iphone || ipad )) this.$el.html('');
			// get the first user result and retrieve data
			var userData = new Parse.Query(Parse.User);
			userData.equalTo('username', document.URL.split('/').pop());
			userData.first({
				success: function(user) {
					// this user could not be found
					if ( user == undefined ) return notFound();

					// store data in a local user object
					self.user.id 			= user.id;
					self.user.o 			= user;
					self.user.name 			= user.get('name');
					self.user.username 		= user.get('username');
					self.user.hometown 		= user.get('hometown');
					self.user.dateOfBirth 	= user.get('dateOfBirth');
					self.user.avatar 		= user.get('profilePicture');

					setHeading(self.user.name, true);

					// template the data
					self.renderPage(self.user, $('#profile-view').html());
					self.renderSub({ tidbit : [
						{ icon : '&#xf007;', primary : self.user.username, secondary : 'Username' },
						{ icon : '&#xe24d;', primary : self.user.hometown, secondary : 'Hometown' },
						{ icon : '&#xe1dd;', primary : self.user.dateOfBirth, secondary : 'Date of Birth' }
					] }, $('#tidbit').html(), $('[data-user-information]'), true);

					// get statistics
					self.getRecords(self.user.o);
				},
				error: function(err) {}
			});
		},

		renderPage: function(data, template) { this.$el.html(_.template(template, data)); },

		renderSub: function(data, template, target, append) {
			if (append)
				$(target).append(_.template(template, data));
			else
				$(target).html(_.template(template, data));
		},
		
		events: function() {

			return ( iphone || ipad ) ? {
				
				'touchstart [data-touchstart]' : 'ts',
				'touchmove [data-touchmove]' : 'tm',
				'touchend [data-touch-settings]' : 'openSettings'

			} : {}
			
		},

		openSettings: function(e) {
			this.tap = false;
			if ( this.touchstart === this.touchend ) openModal(_.template($('#modal-header').html(), { header : 'Account Settings' , entity : this.user.username , disabled : false }), _.template($('#user-settings').html(), this.user));
		},

		saveSettings: function(name, username, hometown, dateOfBirth) {
			var self = this;
			// current user
			var currentUser = Parse.User.current();
			// hometown
			if (!hometown.length) {
				currentUser.unset('hometown');
				currentUser.unset('searchHometown');
			} else {
				currentUser.set('hometown', hometown);
				currentUser.set('searchHometown', hometown.toLowerCase());
			}
			// date of birth
			if (!dateOfBirth.length) currentUser.unset('dateOfBirth');
			else currentUser.set('dateOfBirth', dateOfBirth);
			currentUser.set('name', name);
			currentUser.set('username', username);
			currentUser.set('searchName', name.toLowerCase());
			currentUser.set('searchUsername', username.toLowerCase());
			currentUser.save(null, {
				success: function(user) {
					if ( user.get('username') != undefined ) window.location.hash = "/" + user.get('username');
					self.render();
				},
				error: function(user, error) { self.settingsError(parseInt(error.code), parseInt(error.message)); }
			});
		},

		settingsError: function(code, message) {
			var error;
			// find error
			switch (code) {
				// no username
				case 200: error = 'You must have a username'; break;
				// username taken
				case 202: error = 'This username is already taken';	break;
				// invalid
				case 142:
					// invalid username
					if ( message == 1403 ) error = 'That is an invalid username';
					// no name
					else if ( message == 1404 ) error = 'You must have a name';
				break;
				// invalid
				case 141:
					// invalid username
					if ( message == 1403 ) error = 'That is an invalid username';
					// no name
					else if ( message == 1404 ) error = 'You must have a name';
				break;
			}

			alert(error);
		},

		ts: function(e) {
			var self = this;
			// associate touchstart and touchend to the same element
			this.touchstart = this.touchend = elementFromPoint(e);
			// timeout used so that swipe isn't taken as a tap
			this.touchTimeout = window.setTimeout(function() {
				self.tap = true;
			// 100 ms tap delay
			}, 100);
		},

		tm: function(e) {
			clearTimeout(this.touchTimeout);
			// only if moved out of target
			if ( this.touchstart !== elementFromPoint(e) )
				this.touchend = undefined;
			// disable scroll if tapped for least 100 ms
			if (this.tap) return false;
		},

		getRecords: function(user) {
			this.getPlayingRoles(user);
			this.getCoachingRoles(user);
			this.getTeamOwningRoles(user);
			this.getLeagueOwningRoles(user);
		},

		// fix

		getCoachingRoles: function(user) {
			var self = this;
			var getMemberRecord = new Parse.Query(Parse.Object.extend('userOnRoster'));
			getMemberRecord.equalTo('user', user);
			getMemberRecord.equalTo('status', true);
			getMemberRecord.include('team');
			getMemberRecord.find({
				success: function(records) {
					// coaching roles
					var coaching = [];
					
					// organize
					for ( var r = 0; r < records.length; r++ ) {
						// coach
						if ( $.inArray(records[r].get('role').position, [ 'Head Coach' , 'Trainer' , 'Assistant Coach' ]) != -1 ) {
							coaching.push({
								link: '#/team/' + records[r].get('team').id,
								picture: ( ( records[r].get('team').attributes['profilePicture'] == undefined ) ? defaultPic : records[r].get('team').attributes['profilePicture'].url() ),
								team: records[r].get('team').attributes['name'] + ' [' + records[r].get('team').attributes['competitiveCategory'] + ']',
								position: records[r].get('role').position
							});
						}
					}
					
					// display coaching
				//	self.displayRecordsOfUserAsTeamManagement(coaching);
				},
				error: function(err) {}
			});
		},

		// done

		getPlayingRoles: function(user) {
			var self = this;
			var getStatisticRecords = new Parse.Query(Parse.Object.extend('userStatisticRecord'));
			getStatisticRecords.equalTo('user', user);
			getStatisticRecords.include('team');
			getStatisticRecords.include('league');
			getStatisticRecords.descending('createdAt');
			getStatisticRecords.find({
				success: function(records) {
					// records
					var playerRecords = [], goaltendingRecords = [];
					
					// organize
					for ( var r = 0; r < records.length; r++ ) {
						if (records[r].get('goalie')) {
							goaltendingRecords.push({
								link: '#/team/' + records[r].get('team').id,
								picture: ( ( records[r].get('team').attributes['profilePicture'] == undefined ) ? defaultPic : records[r].get('team').attributes['profilePicture'].url() ),
								team: records[r].get('team').attributes['name'],
								league: records[r].get('league').attributes['name'] + ' ' + records[r].get('league').attributes['competitiveCategory'] + ' ' + records[r].get('league').attributes['year'],
								games: records[r].get('GP'),
								minutes: records[r].get('MIN'),
								shotsAgainst: records[r].get('SA'),
								goalsAgainst: records[r].get('GA'),
								savePercentage: ( ( records[r].get('SA') == 0 ) ? '-' : (records[r].get('GA')/records[r].get('SA')).toFixed(2) ),
								wins: records[r].get('W'),
								losses: records[r].get('L'),
								ties: records[r].get('T'),
								shutouts: records[r].get('SO')
							});
						} else {
							playerRecords.push({
								link: '#/team/' + records[r].get('team').id,
								picture: ( ( records[r].get('team').attributes['profilePicture'] == undefined ) ? defaultPic : records[r].get('team').attributes['profilePicture'].url() ),
								team: records[r].get('team').attributes['name'],
								league: records[r].get('league').attributes['name'] + ' ' + records[r].get('league').attributes['competitiveCategory'] + ' ' + records[r].get('league').attributes['year'],
								games: records[r].get('GP'),
								goals: records[r].get('G'),
								assists: records[r].get('A'),
								points: records[r].get('TP'),
								penalties: records[r].get('PIM'),
								hits: records[r].get('H'),
								shots: records[r].get('S'),
								shotPercentage: ( ( records[r].get('S') == 0 ) ? '-' : (records[r].get('G')/records[r].get('S')).toFixed(2) )
							});
						}
					}
					
					// display
					self.displayPlayerRecords(playerRecords);
					self.displayGoaltendingRecords(goaltendingRecords);
				},
				error: function(err) {}
			});
		},

		displayPlayerRecords: function(records) {
			// at least one records
			if ( records.length > 0 ) {
				$('[data-user-rt]').append(_.template($('#statistics-container').html(), { header : 'Player Statistics' , type : 'player' }));
				$('[data-statistics="player"]').html(_.template($('#user-player-statistics').html(), {scoring: records}));
			}
		},

		displayGoaltendingRecords: function(records) {
			// at least one records
			if ( records.length > 0 ) {
				$('[data-user-rt]').append(_.template($('#statistics-container').html(), { header : 'Goaltending Statistics' , type : 'goaltender' }));
				$('[data-statistics="goaltender"]').html(_.template($('#user-goalie-statistics').html(), {goalie: records}));
			}
		},

		getTeamOwningRoles: function(user) {
			var self = this;
			var getTeams = new Parse.Query(Parse.Object.extend('Team'));
			getTeams.equalTo('createdBy', user);
			getTeams.descending('updatedAt');
			getTeams.find({
				success: function(records) {
					// records
					var ownerRecords = [];
					
					// organize
					for ( var r = 0; r < records.length; r++ )
						ownerRecords.push({
							link: '#/team/' + records[r].id,
							picture: ( ( records[r].get('profilePicture') == undefined ) ? defaultPic : records[r].get('profilePicture').url() ),
							team: records[r].get('name') + ' ' + records[r].get('competitiveCategory'),
							position: 'Creator'
						});

					// display
					self.displayTeamOwningRecords(ownerRecords);
				},
				error: function(err) {}
			});
		},

		displayTeamOwningRecords: function(records) {
			// at least one records
			if ( records.length > 0 ) {
				$('[data-user-rt]').append(_.template($('#statistics-container').html(), { header : 'Teams Owned' , type : 'owning-teams' }));
				$('[data-statistics="owning-teams"]').html(_.template($('#team-affiliation').html(), {creators: records}));
			}
		},

		getLeagueOwningRoles: function(user) {
			var self = this;
			var getLeagues = new Parse.Query(Parse.Object.extend('League'));
			getLeagues.equalTo('createdBy', user);
			getLeagues.descending('updatedAt');
			getLeagues.find({
				success: function(records) {
					// records
					var ownerRecords = [];
					
					// organize
					for ( var r = 0; r < records.length; r++ )
						ownerRecords.push({
							link: '#/league/' + records[r].id,
							picture: ( ( records[r].get('profilePicture') == undefined ) ? defaultPic : records[r].get('profilePicture').url() ),
							team: records[r].get('name') + ' ' + records[r].get('competitiveCategory'),
							position: 'Creator'
						});

					// display
					self.displayLeagueOwningRecords(ownerRecords);
				},
				error: function(err) {}
			});
		},

		displayLeagueOwningRecords: function(records) {
			// at least one records
			if ( records.length > 0 ) {
				$('[data-user-rt]').append(_.template($('#statistics-container').html(), { header : 'Leagues Owned' , type : 'owning-leagues' }));
				$('[data-statistics="owning-leagues"]').html(_.template($('#team-affiliation').html(), {creators: records}));
			}
		}

	});
	
	// Team View
	var TeamView = Parse.View.extend({
		
		el: $('[data-app-main]'),

		view: 1,

		team: {
			id 			: undefined,
			o 			: undefined,
			name 		: undefined,
			creator 	: undefined,
			age 		: undefined,
			level 		: undefined,
			ageLevel 	: undefined,
			year 		: undefined,
			hometown 	: undefined,
			avatar 		: undefined,
			updatedAt 	: undefined,
			numbers 	: [],
			teams 		: [],
			defaults: 		{
				age: [ 'Novice' , 'Minor Atom' , 'Atom' , 'Minor Peewee' , 'Peewee' , 'Minor Bantam' , 'Bantam' , 'Minor Midget' , 'Midget' , 'Juvenile' , 'Major Junior' , 'Professional' , 'Adult' ],
				level: [ 'House League' , 'Select' , 'A' , 'AA' , 'AAA' ],
				year: [ '2014-2015' , '2015' ],
				positions: [ 'Forward' , 'Right Wing' , 'Center' , 'Left Wing' , 'Defense' , 'Right Defense' , 'Left Defense' , 'Goalie' ,  'Head Coach' , 'Assistant Coach' , 'Trainer' ]
			}
		},

		relation: {
			exists		: undefined,
			id 			: undefined,
			updating 	: false
		},
		
		initialize: function() {
			// unbind previous events
			$('[data-app-main]').unbind();
			// binding this to functions that reference this
			_.bindAll(this, 'render');
			// render page
			this.render();
			// ready for touch gestures
			setupTouch(this);
			// no interactive aspect
			initInteractiveScorbit(false);	
		},
		
		render: function() {
			var self = this;

			// clear view
			if (!( iphone || ipad )) this.$el.html('');
			// get team data
			var teamData = new Parse.Query(Parse.Object.extend('Team'));
			teamData.equalTo('objectId' , document.URL.split('/').pop());
			teamData.include('createdBy');
			teamData.first({
				success: function(team) {
					// this team could not be found
					if ( team == undefined ) return notFound();

					// store data in a local team object
					self.team.id 		= team.id;
					self.team.o 		= team;
					self.team.name 		= team.get('name');
					self.team.creator 	= team.get('createdBy');
					self.team.age 		= team.get('ageGroup');
					self.team.level 	= team.get('level');
					self.team.ageLevel 	= team.get('competitiveCategory');
					self.team.year 		= team.get('year');
					self.team.hometown 	= team.get('hometown');
					self.team.avatar 	= team.get('profilePicture')
					self.team.updatedAt = team.updatedAt;

					setHeading(self.team.name, true);

					// templating the data
					self.renderPage(self.team, $('#team-view').html());
					self.renderSub({ tidbit : [
						{ icon : '&#xf007;' , primary : self.team.creator.attributes['name'], secondary : 'Team Creator' },
						{ icon : '&#xe1d5;' , primary : self.team.ageLevel, secondary : 'Competitive Category' },
						{ icon : '&#xe1dd;' , primary : self.team.year, secondary : 'Season' },
						{ icon : '&#xe24d;' , primary : self.team.hometown, secondary : 'Hometown' }
					]}, $('#tidbit').html(), $('[data-team-information]'), true);

					// get statistics
					self.getRecords(self.team.o);
					// get relation or teams for game creation
					if ( self.team.creator.id !== Parse.User.current().id )
						self.getRelation(self.team.o);
					else
						self.getTeamsOwnedByUser(Parse.User.current());
				},
				error: function(err) {}
			});
		},

		renderPage: function(data, template) { this.$el.html(_.template(template, data)); },

		renderSub: function(data, template, target, append) {
			if (append)
				$(target).append(_.template(template, data));
			else
				$(target).html(_.template(template, data));
		},

		getTeamsOwnedByUser: function(user) {
			var self = this;
			var getTeamsOwnedByUser = new Parse.Query(Parse.Object.extend('Team'));
			getTeamsOwnedByUser.equalTo('createdBy', user);
			getTeamsOwnedByUser.find({
				success: function(teams) {
					if ( teams.length > 0 ) {
						for ( var i = 0; i < teams.length; i++ ) self.team.teams.push(teams[i]);

						// display change
						$('[data-schedule-game]').removeAttr('disabled');
					}
				}
			});
		},

		getRelation: function(team) {
			var self = this;
			var relation = new Parse.Query(Parse.Object.extend('Relation'));
			relation.equalTo('user', Parse.User.current());
			relation.equalTo('type', 0);
			relation.equalTo('isFollowingTeam', team);
			relation.first({
				success: function(existence) {
					if (existence) {
						self.relation.exists 	= true;
						self.relation.id 		= existence.id;
					} else
						self.relation.exists	= false;

					// display relation
					self.displayRelation(self.relation.exists);
				},
				error: function(err) {}
			});
		},

		displayRelation: function(related) {
			$('[data-team-follow]')
				.removeAttr('disabled')
				.addClass(( (related) ? 'entity__button__true' : '' ))
				.removeClass(( (related) ? '' : 'entity__button__true' ))
				.html(( (related) ? '&#xf005;<span class=" [ entity__button__description ] ">FOLLOWING</span>' : '&#xf006;<span class=" [ entity__button__description ] ">FOLLOW</span>' ));
		},

		getGames: function(team) {
			var self = this;
			// game - home
			var getHomeGames = new Parse.Query(Parse.Object.extend('Game'));
			getHomeGames.equalTo('homeTeam', team);
			// game - away
			var getAwayGames = new Parse.Query(Parse.Object.extend('Game'));
			getAwayGames.equalTo('awayTeam', team);
			// games
			var getGames = new Parse.Query.or(getHomeGames, getAwayGames);
			getGames.equalTo('initialized', true);
			getGames.include('league');
			getGames.include('homeTeam');
			getGames.include('awayTeam');
			getGames.include('score');
			getGames.limit(3);
			getGames.descending('dateTimeOfGame');
			getGames.find({
				success: function(games) {
					if (!games.length) {
						self.gamesLoaded(false);
					} else {
						self.gamesLoaded(true);
						if (iphone) self.displayGames(games);
					}
				},
				error: function(err) {}
			});
		},

		gamesLoaded: function(exists) {
			if (exists) {
				$('.loader').remove();
			} else {
				noResults($('[data-tab="team-schedule"]'), {
					alert 	: 'NO GAMES',
					message : 'Click the button below to find leagues and teams to follow. Keep up to date on all the scores.',
					action 	: {
						target 	: 'search',
						message : 'FIND GAMES'
					}
				});
			}
		},

		displayGames: function(games) {
			matches = [];

			for ( var i = 0; i < games.length; i++ ) {
				var gameDate = parseDateIntoEnglish(games[i].attributes['dateTimeOfGame'].getDay(), games[i].attributes['dateTimeOfGame'].getMonth(), games[i].attributes['dateTimeOfGame'].getDate(), games[i].attributes['dateTimeOfGame'].getFullYear());
				matches.push({
					date 		: gameDate.substr(gameDate.indexOf(' ') + 1),
					id 			: games[i].id,
					isStarted 	: games[i].attributes['start'],
					isActive 	: games[i].attributes['active'],
					isFinal 	: games[i].attributes['gameFinal'],
					time 		: convertArmyTime(games[i].attributes['dateTimeOfGame'].getHours(), games[i].attributes['dateTimeOfGame'].getMinutes()),
					home 	: {
						picture 	: ( ( games[i].attributes['homeTeam'].attributes['profilePicture'] == undefined ) ? defaultPic : games[i].attributes['homeTeam'].attributes['profilePicture'].url() ),
						team 		: games[i].attributes['homeTeam'].attributes['name'],
						score 		: games[i].attributes['score'].attributes['WG']
					},
					away 	: {
						picture 	: ( ( games[i].attributes['awayTeam'].attributes['profilePicture'] == undefined ) ? defaultPic : games[i].attributes['awayTeam'].attributes['profilePicture'].url() ),
						team 		: games[i].attributes['awayTeam'].attributes['name'],
						score 		: games[i].attributes['score'].attributes['VG']
					},
					league 	: {
						name 	: ( ( games[i].attributes['league'] == undefined ) ? '' : games[i].attributes['league'].attributes['name'] ),
						age 	: ( ( games[i].attributes['league'] == undefined ) ? '' : games[i].attributes['league'].attributes['competitiveCategory'] ),
						year 	: ( ( games[i].attributes['league'] == undefined ) ? '' : games[i].attributes['league'].attributes['year'] )
					}
				});
			}

			if ( games.length > 0 ) {
				$('[data-team-rt]').append(_.template($('#statistics-container').html(), { header : 'Schedule' , type : 'schedule' }));
				$('[data-statistics="schedule"]').html(_.template($('#mobile-game-widget').html(), { matches : matches }));
			}
		},

		events: function() {

			return ( iphone || ipad ) ? {

				'touchstart [data-touch]' 			: 'ts',
				'touchmove [data-touch]' 			: 'tm',
				'touchend [data-team-settings]' 	: 'openSettings',
				'touchend [data-schedule-game]' 	: 'touchendCreateGame',
				'touchend [data-team-follow]' 		: 'touchendUpdateRelation',
				'touchend [data-add-player]' 		: 'touchendAddPlayer'

			} : {}
			
		},

		ts: function(e) {
			var self = this;
			// associate touchstart and touchend to the same element
			this.touchstart = this.touchend = elementFromPoint(e);
			// timeout used so that swipe isn't taken as a tap
			this.touchTimeout = window.setTimeout(function() {
				self.tap = true;
			// 100 ms tap delay
			}, 100);
		},

		tm: function(e) {
			clearTimeout(this.touchTimeout);
			// only if moved out of target
			if ( this.touchstart !== elementFromPoint(e) )
				this.touchend = undefined;
			// disable scroll if tapped for least 100 ms
			if (this.tap) return false;
		},

		openSettings: function(e) {
			this.tap = false;
			if ( this.touchstart === this.touchend ) openModal(_.template($('#modal-header').html(), { header : 'Team Settings' , entity : this.team.name , disabled : false }), _.template($('#team-settings').html(), this.team));
		},

		touchendUpdateRelation: function(e) {
			this.tap = false;
			if ( this.touchstart === this.touchend ) this.updateRelation(e);
		},

		updateRelation: function(e) {
			var self = this;
			// not currently updating
			if (!this.relation.updating) {
				// updating
				this.relation.updating = !this.relation.updating;
				// loading
				$(e.currentTarget)
					.attr('disabled', true)
					.removeClass('entity__options__true')
					.html('&#xf021;<span class=" [ entity__button__description ] ">CONNECTING</span>');
				// following
				if (this.relation.exists) {
					// destroy relation
					var relation = new Relation();
					relation.id = this.relation.id;
					relation.destroy({
						success: function(destroyed) {
							self.relation.exists 	= false;
							self.relation.id 		= undefined;
							self.relation.updating 	= !self.relation.updating;
							self.displayRelation(self.relation.exists);
						},
						error: function(relation, error) {
							self.relation.updating 	= false;
							self.displayRelation(self.relation.exists);
						}
					});
				// not following
				} else {
					// create relation
					var relation = new Relation();
					var ACL = new Parse.ACL();
					// access
					ACL.setWriteAccess(Parse.User.current(), true);
					ACL.setPublicWriteAccess(false);
					ACL.setPublicReadAccess(true);
					// attributes
					relation.set('user', Parse.User.current());
					relation.set('isFollowingTeam', this.team.o);
					relation.set('isFollowingLeague', null);
					relation.set('isFollowingGame', null);
					relation.set('type', 0);
					relation.setACL(ACL);
					relation.save(null, {
						success: function(newRelation) {
							self.relation.exists 	= true;
							self.relation.id 		= newRelation.id;
							self.relation.updating 	= !self.relation.updating;
							self.displayRelation(self.relation.exists);
						},
						error: function(err) {
							self.relation.updating 	= false;
							self.displayRelation(self.relation.exists);
						}
					});
				}
			}
		},

		touchendAddPlayer: function(e) {
			this.tap = false;
			if ( this.touchstart === this.touchend ) openModal(_.template($('#modal-header').html(), { header : 'Add Players' , entity : this.team.name , disabled : true }), _.template($('#add-players').html(), this.team));
		},

		touchendCreateGame: function(e) {
			this.tap = false;
			if ( this.touchstart === this.touchend ) openModal(_.template($('#modal-header').html(), { header : 'Create Game' , entity : 'vs ' + this.team.name , disabled : true }), _.template($('#create-unofficial-game').html(), this.team));
		},

		saveSettings: function(name, age, level, season, hometown) {
			var self = this;
			// get team
			var team = new TeamClass();
			team.id = this.team.id;
			// hometown
			if ( hometown != undefined && !hometown.length) {
				team.unset('hometown');
				team.unset('searchHometown');
			} else {
				team.set('hometown', hometown);
				team.set('searchHometown', hometown.toLowerCase());
			}
			// set values
			team.set('ageGroup', age);
			team.set('level', level);
			team.set('year', season);
			team.set('competitiveCategory', age + ' ' + level);
			team.set('searchCompetitiveCategory', age.toLowerCase() + ' ' + level.toLowerCase());
			team.set('name', name);
			team.set('searchName', name.toLowerCase());	
			team.save(null, {
				success: function(team) { self.render(); },
				error: function(err) {}
			});
		},

		getRecords: function(team) {
			this.getGames(team);
			this.getSeasonRecords(team);
			this.getTeam(team);
		},

		getSeasonRecords: function(team) {
			var self = this;
			var getTeamStatistics = new Parse.Query(Parse.Object.extend('teamStatisticRecord'));
			getTeamStatistics.equalTo('team', team);
			getTeamStatistics.include('league');
			getTeamStatistics.find({
				success: function(records) {
					// records
					var seasonRecords = [];

					// organize
					for ( var r = 0; r < records.length; r++ )
						seasonRecords.push({
							league: {
								link: '#/league/' + records[r].get('league').id,
								picture: ( ( records[r].get('league').attributes['profilePicture'] == undefined ) ? defaultPic : records[r].get('league').attributes['profilePicture'].url() ),
								name: records[r].get('league').attributes['name'],
								specification: records[r].get('league').attributes['competitiveCategory'] + ' ' + records[r].get('league').attributes['year']
							},
							games: records[r].get('GP'),
							wins: records[r].get('W'),
							losses: records[r].get('L'),
							ties: records[r].get('T'),
							goalsForward: records[r].get('GF'),
							goalsAgainst: records[r].get('GA'),
							points: records[r].get('TP')
						});

					// display
					self.displaySeasonRecords(seasonRecords);
				},
				error: function(err) {}
			});
		},

		displaySeasonRecords: function(records) {
			// at least one records
			if ( records.length > 0 ) {
				$('[data-team-rt]').append(_.template($('#statistics-container').html(), { header : 'Season Records' , type : 'season' }));
				$('[data-statistics="season"]').html(_.template($('#team-league-statistics').html(), {standings: records}));
			}
		},

		getTeam: function(team) {
			var self = this;
			// get whole team
			var getTeam = new Parse.Query(Parse.Object.extend('userOnRoster'));
			getTeam.equalTo('team', team);
			getTeam.include('user');
			getTeam.find({
				success: function(records) {
					// management
					var coachingRecords = [];

					// organize
					for ( var r = 0; r < records.length; r++ ) {
						if ( $.inArray(records[r].get('role').position, [ 'Head Coach' , 'Trainer' , 'Assistant Coach' ]) != -1 )
							coachingRecords.push({
								ghost: records[r].get('ghostData'),
								link: ( (records[r].get('ghostData')) ? undefined : '#/' + records[r].get('user').attributes['username'] ),
								picture: ( (records[r].get('ghostData')) ? undefined : ( ( records[r].get('user').attributes['profilePicture'] == undefined ) ? defaultPic : records[r].get('user').attributes['profilePicture'].url() ) ),
								name: ( (records[r].get('ghostData')) ? records[r].get('ghostObject').name : records[r].get('user').attributes['name'] ),
								position: abbreviate(records[r].get('role').position)
							});
						else {
							// add numbers to current numbers
							self.team.numbers.push(records[r].get('number'));
						}
					}

					// rosters ready
					$('[data-add-player]').removeAttr('disabled');

					// display coaching
					self.displayCoaches(coachingRecords);

					// players and goalies
					var getPlayersAndGoalies = new Parse.Query(Parse.Object.extend('userOnRoster'));
					getPlayersAndGoalies.equalTo('team', team);
					getPlayersAndGoalies.include('user');
					getPlayersAndGoalies.find({
						success: function(records) {
							// records
							var rosterRecords = [];
							//var rosterRecordsIDs = [];

							// organize
							for ( var r = 0; r < records.length; r++ ) {
								if ( $.inArray(records[r].get('role').position, [ 'Head Coach' , 'Assistant Coach', 'Trainer' ]) == -1 ) {
									rosterRecords.push(records[r]);
									//rosterRecordsIDs.push(records[r].id);
								}
							}

							// records
							var playerRecords = [];
							var playerRecordsIDs = [];
							var goaltendingRecords = [];
							var goaltendingRecordsIDs = [];

							// organize statistic records
							for ( var i = 0; i < rosterRecords.length; i++ ) {
								// player
								if ( rosterRecords[i].attributes['role'].position != 'Goalie' ) {
									playerRecordsIDs.push(rosterRecords[i].id);
									playerRecords.push({
										hasStats 		: false,
										id 				: rosterRecords[i].id,
										ghost 			: rosterRecords[i].attributes['ghostData'],
										number 			: rosterRecords[i].attributes['number'],
										link 			: ( (rosterRecords[i].attributes['ghostData']) ? undefined : '#/' + rosterRecords[i].attributes['user'].attributes['username'] ),
										avatar 			: ( (rosterRecords[i].attributes['ghostData']) ? undefined : ( ( rosterRecords[i].attributes['user'].attributes['profilePicture'] == undefined ) ? defaultPic : rosterRecords[i].attributes['user'].attributes['profilePicture'].url() ) ),
										name 			: ( (rosterRecords[i].attributes['ghostData']) ? rosterRecords[i].attributes['ghostObject'].name : rosterRecords[i].attributes['user'].attributes['name'] ),
										position 		: abbreviate(rosterRecords[i].attributes['role'].position),
										games			: '-',
										goals			: '-',
										assists			: '-',
										points			: '-',
										penalties		: '-',
										hits			: '-',
										shots			: '-',
										shotPercentage 	: '-'
									});
								}
								// goalie
								if ( rosterRecords[i].attributes['role'].position == 'Goalie' ) {
									goaltendingRecordsIDs.push(rosterRecords[i].id);
									goaltendingRecords.push({
										hasStats 		: false,
										id 				: rosterRecords[i].id,
										ghost 			: rosterRecords[i].attributes['ghostData'],
										number 			: rosterRecords[i].attributes['number'],
										link 			: ( (rosterRecords[i].attributes['ghostData']) ? undefined : '#/' + rosterRecords[i].attributes['user'].attributes['username'] ),
										avatar 			: ( (rosterRecords[i].attributes['ghostData']) ? undefined : ( ( rosterRecords[i].attributes['user'].attributes['profilePicture'] == undefined ) ? defaultPic : rosterRecords[i].attributes['user'].attributes['profilePicture'].url() ) ),
										name 			: ( (rosterRecords[i].attributes['ghostData']) ? rosterRecords[i].attributes['ghostObject'].name : rosterRecords[i].attributes['user'].attributes['name'] ),
										position 		: abbreviate(rosterRecords[i].attributes['role'].position),
										games 			: '-',
										minutes 		: '-',
										shotsAgainst 	: '-',
										goalsAgainst 	: '-',
										savePercentage 	: '-',
										wins 			: '-',
										losses 			: '-',
										ties 			: '-',
										shutouts 		: '-'
									});
								}
							}

							// statistics
							var getRosterStatistics = new Parse.Query(Parse.Object.extend('userStatisticRecord'));
							getRosterStatistics.equalTo('team', team);
							getRosterStatistics.include('rosterMember');
							getRosterStatistics.include('rosterMember.user');
							getRosterStatistics.include('league');
							getRosterStatistics.descending('TP');
							getRosterStatistics.find({
								success: function(records) {
									// organize
									for ( var r = 0; r < records.length; r++ ) {
										// player
										if ( records[r].get('rosterMember').attributes['role'].position != 'Goalie' ) {
											
											// get correct row
											var player = $.grep(playerRecords, function(e) { return e.id === records[r].get('rosterMember').id });

											// already has stats
											if (player[0].hasStats) {
												// aggregate
												player[0].games 		+= records[r].get('GP');
												player[0].goals 		+= records[r].get('G');
												player[0].assists 		+= records[r].get('A');
												player[0].points 		+= records[r].get('TP');
												player[0].penalties 	+= records[r].get('PIM');
												player[0].hits 			+= records[r].get('H');
												player[0].shots 		+= records[r].get('S');
												player[0].shotPercentage = ( ( player[0].shots == 0 ) ? '-' : (player[0].goals/player[0].shots).toFixed(2) );
												// get index
												var indexed = playerRecords.map(function(e) { return e.id; }).indexOf(records[r].get('rosterMember').id);
												// replace
												playerRecordsIDs[indexed] = player[0];
											// doesn't have stats yet	
											} else {
												player[0].hasStats 			= true;
												player[0].games				= records[r].get('GP'),
												player[0].goals				= records[r].get('G'),
												player[0].assists			= records[r].get('A'),
												player[0].points			= records[r].get('TP'),
												player[0].penalties			= records[r].get('PIM'),
												player[0].hits				= records[r].get('H'),
												player[0].shots				= records[r].get('S'),
												player[0].shotPercentage 	= ( ( records[r].get('S') == 0 ) ? '-' : (records[r].get('G')/records[r].get('S')).toFixed(2) )
											}

										// goaltender	
										} else {

											// get correct row
											var goaltender = $.grep(goaltendingRecords, function(e) { return e.id === records[r].get('rosterMember').id });

											// already has stats
											if (goaltender[0].hasStats) {
												// aggregate
												goaltender[0].games 			+= records[r].get('GP');
												goaltender[0].minutes 			+= records[r].get('MIN');
												goaltender[0].shotsAgainst 		+= records[r].get('SA');
												goaltender[0].goalsAgainst 		+= records[r].get('GA');
												goaltender[0].savePercentage	 = ( ( goaltender[0].shotsAgainst == 0 ) ? '-' : (goaltender[0].goalsAgainst/goaltender[0].shotsAgainst).toFixed(2) );
												goaltender[0].wins 				+= records[r].get('W');
												goaltender[0].losses 			+= records[r].get('L');
												goaltender[0].ties 				+= records[r].get('T');
												goaltender[0].shutouts 			+= records[r].get('SO');
												// get index
												var indexed = goaltendingRecords.map(function(e) { return e.id; }).indexOf(records[r].get('rosterMember').id);
												// replace
												goaltendingRecords[indexed] = goaltender[0];
											// doesn't have stats yet	
											} else {
												goaltender[0].hasStats 			= true;
												goaltender[0].games 			= records[r].get('GP'),
												goaltender[0].minutes 			= records[r].get('MIN'),
												goaltender[0].shotsAgainst 		= records[r].get('SA'),
												goaltender[0].goalsAgainst 		= records[r].get('GA'),
												goaltender[0].savePercentage 	= ( ( records[r].get('SA') == 0 ) ? '-' : (records[r].get('GA')/records[r].get('SA')).toFixed(2) ),
												goaltender[0].wins 				= records[r].get('W'),
												goaltender[0].losses 			= records[r].get('L'),
												goaltender[0].ties 				= records[r].get('T'),
												goaltender[0].shutouts 			= records[r].get('SO')
											}

										}
									}

									// sort
									playerRecords.sort(function(a, b) { return b.points - a.points; });

									// display
									self.displayPlayers(playerRecords);
									self.displayGoaltenders(goaltendingRecords);
								},
								error: function(err) {}
							});

						},
						error: function(err) {}
					});
				},
				error: function(err) {}
			});
		},

		displayCoaches: function(records) {
			// at least one records
			if ( records.length > 0 ) {
				$('[data-team-rt]').append(_.template($('#statistics-container').html(), { header : 'Coaches' , type : 'coaches' }));
				$('[data-statistics="coaches"]').html(_.template($('#team-management').html(), {management: records}));
			}
		},

		displayPlayers: function(records) {
			// at least one records
			if ( records.length > 0 ) {
				$('[data-team-rt]').append(_.template($('#statistics-container').html(), { header : 'Players' , type : 'players' }));
				$('[data-statistics="players"]').html(_.template($('#team-player-statistics').html(), {players: records}));
			}
		},

		displayGoaltenders: function(records) {
			// at least one records
			if ( records.length > 0 ) {
				$('[data-team-rt]').append(_.template($('#statistics-container').html(), { header : 'Goaltenders' , type : 'goaltenders' }));
				$('[data-statistics="goaltenders"]').html(_.template($('#team-player-statistics').html(), {players: records}));
			}
		}
		
	});
	
	// League View
	var LeagueView = Parse.View.extend({
		
		el: $('[data-app-main]'),

		view: 6,

		league: {
			id 			: undefined,
			o 			: undefined,
			name 		: undefined,
			creator 	: undefined,
			age 		: undefined,
			level 		: undefined,
			ageLevel 	: undefined,
			year 		: undefined,
			hometown 	: undefined,
			avatar 		: undefined,
			updatedAt 	: undefined,
			teams 		: [],
			teamIds 	: [],
			defaults: 		{
				age: [ 'Novice' , 'Minor Atom' , 'Atom' , 'Minor Peewee' , 'Peewee' , 'Minor Bantam' , 'Bantam' , 'Minor Midget' , 'Midget' , 'Juvenile' , 'Major Junior' , 'Professional' , 'Adult' ],
				level: [ 'House League' , 'Select' , 'A' , 'AA' , 'AAA' ],
				year: [ '2014-2015' , '2015' ]
			}
		},

		relation: {
			exists 		: undefined,
			id 			: undefined,
			updating 	: false
		},
		
		initialize: function() {
			// unbind previous events
			$('[data-app-main]').unbind();
			// binding this to functions that reference this
			_.bindAll(this, 'render');
			// render page
			this.render();
			// ready for touch gestures
			setupTouch(this);
			// no interactive aspect
			initInteractiveScorbit(false);
		},
		
		render: function() {
			var self = this;

			// clear view
			if (!( iphone || ipad )) this.$el.html('');
			// get league data
			var leagueData = new Parse.Query(Parse.Object.extend('League'));
			leagueData.equalTo('objectId' , document.URL.split('/').pop());
			leagueData.include('createdBy');
			leagueData.first({
				success: function(league) {
					// this league could not be found
					if ( league == undefined ) return notFound();

					// store data in a local league object
					self.league.id 			= league.id;
					self.league.o 			= league;
					self.league.name 		= league.get('name');
					self.league.creator 	= league.get('createdBy');
					self.league.age 		= league.get('ageGroup');
					self.league.level 		= league.get('level');
					self.league.ageLevel 	= league.get('competitiveCategory');
					self.league.year 		= league.get('year');
					self.league.hometown 	= league.get('hometown');
					self.league.avatar 		= league.get('profilePicture')
					self.league.updatedAt 	= league.updatedAt;

					setHeading(self.league.name, true);

					// templating the data
					self.renderPage(self.league, $('#league-view').html());
					self.renderSub({ tidbit : [
						{ icon : '' , primary : self.league.creator.attributes['name'], secondary : 'League Creator' },
						{ icon : '' , primary : self.league.ageLevel, secondary : 'Competitive Category' },
						{ icon : '' , primary : self.league.year, secondary : 'Season' },
						{ icon : '&#xe24d;' , primary : self.league.hometown, secondary : 'Hometown' }
					]}, $('#tidbit').html(), $('[data-league-information]'), true);

					// get statistics
					self.getRecords(self.league.o);
					// get relation
					if ( self.league.creator.id !== Parse.User.current().id ) self.getRelation(self.league.o);
				},
				error: function(err) {}
			});
		},

		renderPage: function(data, template) { this.$el.html(_.template(template, data)); },

		renderSub: function(data, template, target, append) {
			if (append)
				$(target).append(_.template(template, data));
			else
				$(target).html(_.template(template, data));
		},

		getRelation: function(league) {
			var self = this;
			var relation = new Parse.Query(Parse.Object.extend('Relation'));
			relation.equalTo('user', Parse.User.current());
			relation.equalTo('type', 1);
			relation.equalTo('isFollowingLeague', league);
			relation.first({
				success: function(existence) {
					if (existence) {
						self.relation.exists 	= true;
						self.relation.id 		= existence.id;
					} else
						self.relation.exists	= false;

					// display relation
					self.displayRelation(self.relation.exists);
				},
				error: function(err) {}
			});
		},

		displayRelation: function(related) {
			$('[data-league-follow]')
				.removeAttr('disabled')
				.addClass(( (related) ? 'entity__button__true' : '' ))
				.removeClass(( (related) ? '' : 'entity__button__true' ))
				.html(( (related) ? '&#xf005;<span class=" [ entity__button__description ] ">FOLLOWING</span>' : '&#xf006;<span class=" [ entity__button__description ] ">FOLLOW</span>' ));
		},

		getGames: function(league) {
			var self = this;
			// game - home
			var getGames = new Parse.Query(Parse.Object.extend('Game'));
			getGames.equalTo('league', league);
			getGames.equalTo('initialized', true);
			getGames.include('league');
			getGames.include('homeTeam');
			getGames.include('awayTeam');
			getGames.include('score');
			getGames.descending('dateTimeOfGame');
			getGames.limit(3);
			getGames.find({
				success: function(games) {
					if (!games.length) {
						self.gamesLoaded(false);
					} else {
						self.gamesLoaded(true);
						if (iphone) self.displayGames(games);
					}
				},
				error: function(err) {}
			});
		},

		gamesLoaded: function(exists) {
			if (exists) {
				$('.loader').remove();
			} else {
				noResults($('[data-tab="league-schedule"]'), {
					alert 	: 'NO GAMES',
					message : 'Click the button below to find leagues and teams to follow. Keep up to date on all the scores.',
					action 	: {
						target 	: 'search',
						message : 'FIND GAMES'
					}
				});
			}
		},

		displayGames: function(games) {
			matches = [];

			for ( var i = 0; i < games.length; i++ ) {
				var gameDate = parseDateIntoEnglish(games[i].attributes['dateTimeOfGame'].getDay(), games[i].attributes['dateTimeOfGame'].getMonth(), games[i].attributes['dateTimeOfGame'].getDate(), games[i].attributes['dateTimeOfGame'].getFullYear());
				matches.push({
					date 		: gameDate.substr(gameDate.indexOf(' ') + 1),
					id 			: games[i].id,
					isStarted 	: games[i].attributes['start'],
					isActive 	: games[i].attributes['active'],
					isFinal 	: games[i].attributes['gameFinal'],
					time 		: convertArmyTime(games[i].attributes['dateTimeOfGame'].getHours(), games[i].attributes['dateTimeOfGame'].getMinutes()),
					home 	: {
						picture 	: ( ( games[i].attributes['homeTeam'].attributes['profilePicture'] == undefined ) ? defaultPic : games[i].attributes['homeTeam'].attributes['profilePicture'].url() ),
						team 		: games[i].attributes['homeTeam'].attributes['name'],
						score 		: games[i].attributes['score'].attributes['WG']
					},
					away 	: {
						picture 	: ( ( games[i].attributes['awayTeam'].attributes['profilePicture'] == undefined ) ? defaultPic : games[i].attributes['awayTeam'].attributes['profilePicture'].url() ),
						team 		: games[i].attributes['awayTeam'].attributes['name'],
						score 		: games[i].attributes['score'].attributes['VG']
					},
					league 	: {
						name 	: ( ( games[i].attributes['league'] == undefined ) ? '' : games[i].attributes['league'].attributes['name'] ),
						age 	: ( ( games[i].attributes['league'] == undefined ) ? '' : games[i].attributes['league'].attributes['competitiveCategory'] ),
						year 	: ( ( games[i].attributes['league'] == undefined ) ? '' : games[i].attributes['league'].attributes['year'] )
					}
				});
			}

			if ( games.length > 0 ) {
				$('[data-league-rt]').append(_.template($('#statistics-container').html(), { header : 'Schedule' , type : 'schedule' }));
				$('[data-statistics="schedule"]').html(_.template($('#mobile-game-widget').html(), { matches : matches }));
			}
		},

		events: function() {

			return ( iphone || ipad ) ? {

				'touchstart [data-touch]' : 'ts',
				'touchmove [data-touch]' : 'tm',
				'touchend [data-schedule-game]' : 'touchendCreateGame',
				'touchend [data-league-settings]' : 'openSettings',
				'touchend [data-league-follow]' : 'touchendUpdateRelation',
				'touchend [data-invite-team]' : 'touchendInviteTeam'

			} : {}
			
		},

		ts: function(e) {
			var self = this;
			// associate touchstart and touchend to the same element
			this.touchstart = this.touchend = elementFromPoint(e);
			// timeout used so that swipe isn't taken as a tap
			this.touchTimeout = window.setTimeout(function() {
				self.tap = true;
			// 100 ms tap delay
			}, 100);
		},

		tm: function(e) {
			clearTimeout(this.touchTimeout);
			// only if moved out of target
			if ( this.touchstart !== elementFromPoint(e) )
				this.touchend = undefined;
			// disable scroll if tapped for least 100 ms
			if (this.tap) return false;
		},

		touchendCreateGame: function(e) {
			this.tap = false;
			if ( this.touchstart === this.touchend ) openModal(_.template($('#modal-header').html(), { header : 'Create Game' , entity : this.league.name , disabled : true }), _.template($('#create-official-game').html(), this.league));
		},

		openSettings: function(e) {
			this.tap = false;
			if ( this.touchstart === this.touchend ) openModal(_.template($('#modal-header').html(), { header : 'Team Settings' , entity : this.league.name , disabled : false }), _.template($('#league-settings').html(), this.league));
		},

		touchendInviteTeam: function(e) {
			this.tap = false;
			if ( this.touchstart === this.touchend ) openModal(_.template($('#search-header').html(), { search : 'Search for teams' }), _.template('', this.league));
		},

		touchendUpdateRelation: function(e) {
			this.tap = false;
			if ( this.touchstart === this.touchend ) this.updateRelation(e);
		},

		updateRelation: function(e) {
			var self = this;
			// not currently updating
			if (!this.relation.updating) {
				// updating
				this.relation.updating = !this.relation.updating;
				// loading
				$(e.currentTarget)
					.attr('disabled', true)
					.removeClass('entity__options__true')
					.html('&#xf021;<span class=" [ entity__button__description ] ">CONNECTING</span>');
				// following
				if (this.relation.exists) {
					// destroy relation
					var relation = new Relation();
					relation.id = this.relation.id;
					relation.destroy({
						success: function(destroyed) {
							self.relation.exists 	= false;
							self.relation.id 		= undefined;
							self.relation.updating 	= !self.relation.updating;
							self.displayRelation(self.relation.exists);
						},
						error: function(relation, error) {
							self.relation.updating 	= false;
							self.displayRelation(self.relation.exists);
						}
					});
				// not following
				} else {
					// create relation
					var relation = new Relation();
					var ACL = new Parse.ACL();
					// access
					ACL.setWriteAccess(Parse.User.current(), true);
					ACL.setPublicWriteAccess(false);
					ACL.setPublicReadAccess(true);
					// attributes
					relation.set('user', Parse.User.current());
					relation.set('isFollowingTeam', null);
					relation.set('isFollowingLeague', this.league.o);
					relation.set('isFollowingGame', null);
					relation.set('type', 1);
					relation.setACL(ACL);
					relation.save(null, {
						success: function(newRelation) {
							self.relation.exists 	= true;
							self.relation.id 		= newRelation.id;
							self.relation.updating 	= !self.relation.updating;
							self.displayRelation(self.relation.exists);
						},
						error: function(err) {
							self.relation.updating 	= false;
							self.displayRelation(self.relation.exists);
						}
					});
				}
			}
		},

		saveSettings: function(name, age, level, season, hometown) {
			var self = this;
			// get league
			var league = new LeagueClass();
			league.id = this.league.id;
			// hometown
			if ( hometown != undefined && !hometown.length) {
				league.unset('hometown');
				league.unset('searchHometown');
			} else {
				league.set('hometown', hometown);
				league.set('searchHometown', hometown.toLowerCase());
			}
			// set values
			league.set('ageGroup', age);
			league.set('level', level);
			league.set('year', season);
			league.set('competitiveCategory', age + ' ' + level);
			league.set('searchCompetitiveCategory', age.toLowerCase() + ' ' + level.toLowerCase());
			league.set('name', name);
			league.set('searchName', name.toLowerCase());	
			league.save(null, {
				success: function(league) { self.render(); },
				error: function(league, error) {}
			});
		},

		getRecords: function(league) {
			this.getStandings(league);
			this.getScoringLeaders(league);
			this.getGoaltendingLeaders(league);
			this.getGames(league);
		},

		getStandings: function(league) {
			var self = this;
			var getStandings = new Parse.Query(Parse.Object.extend('teamStatisticRecord'));
			getStandings.equalTo('league', league);
			getStandings.include('team');
			getStandings.descending('TP,W,T,GF');
			getStandings.limit(30);
			getStandings.find({
				success: function(records) {
					// records
					var standingsRecords = [];
					// rank
					var rank = 1;

					// organize
					for ( var r = 0; r < records.length; r++ ) {
						standingsRecords.push({
							link: '#/team/' + records[r].get('team').id,
							rank: rank++,
							picture: ( ( records[r].get('team').attributes['profilePicture'] == undefined ) ? defaultPic : records[r].get('team').attributes['profilePicture'].url() ),
							name: records[r].get('team').attributes['name'],
							games: records[r].get('GP'),
							wins: records[r].get('W'),
							losses: records[r].get('L'),
							ties: records[r].get('T'),
							goalsForward: records[r].get('GF'),
							goalsAgainst: records[r].get('GA'),
							points: records[r].get('TP')
						});
						// push to team
						self.league.teams.push(records[r]);
						self.league.teamIds.push(records[r].get('team').id);
					}

					// display
					self.displayStandings(standingsRecords);

					// teams ready
					$('[data-invite-team]').removeAttr('disabled');
					$('[data-schedule-game]').removeAttr('disabled');
				},
				error: function(err) {}
			});
		},

		displayStandings: function(records) {
			// at least one records
			if ( records.length > 0 ) {
				$('[data-league-rt]').append(_.template($('#statistics-container').html(), { header : 'Standings' , type : 'standings' }));
				$('[data-statistics="standings"]').html(_.template($('#team-league-standings-statistics').html(), {standings: records}));
			}
		},

		getScoringLeaders: function(league) {
			var self = this;
			var getScoringLeaders = new Parse.Query(Parse.Object.extend('userStatisticRecord'));
			getScoringLeaders.equalTo('league', league);
			getScoringLeaders.include('rosterMember');
			getScoringLeaders.include('rosterMember.user');
			getScoringLeaders.include('rosterMember.team');
			getScoringLeaders.descending('TP,G,A,H');
			getScoringLeaders.limit(20);
			getScoringLeaders.find({
				success: function(records) {
					// records
					var leadersRecords = [];
					// rank
					var rank = 1;

					// organize
					for ( var r = 0; r < records.length; r++ ) {
						leadersRecords.push({
							ghost: records[r].attributes['rosterMember'].attributes['ghostData'],
							link: ( (records[r].attributes['rosterMember'].attributes['ghostData']) ? undefined : records[r].attributes['rosterMember'].attributes['user'].attributes['username'] ),
							rank: rank++,
							avatar: ( (records[r].attributes['rosterMember'].attributes['ghostData']) ? undefined : ( ( records[r].attributes['rosterMember'].attributes['user'].attributes['profilePicture'] == undefined ) ? undefined : records[r].attributes['rosterMember'].attributes['user'].attributes['profilePicture'].url() ) ),
							name: ( (records[r].attributes['rosterMember'].attributes['ghostData']) ? records[r].attributes['rosterMember'].attributes['ghostObject'].name : records[r].attributes['rosterMember'].attributes['user'].attributes['name'] ),
							position: abbreviate(records[r].attributes['rosterMember'].attributes['role'].position),
							games: records[r].get('GP'),
							goals: records[r].get('G'),
							assists: records[r].get('A'),
							points: records[r].get('TP'),
							penalties: records[r].get('PIM'),
							hits: records[r].get('H'),
							shots: records[r].get('S'),
							shotPercentage: ( ( records[r].get('S') == 0 ) ? '-' : (records[r].get('G')/records[r].get('S')).toFixed(2) ),
							team: records[r].attributes['rosterMember'].attributes['team'].attributes['name']
						});
					}

					// display
					self.displayScoringLeaders(leadersRecords);
				},
				error: function(err) {}
			});
		},

		displayScoringLeaders: function(records) {
			// at least one records
			if ( records.length > 0 ) {
				$('[data-league-rt]').append(_.template($('#statistics-container').html(), { header : 'Scoring Leaders' , type : 'scoring' }));
				$('[data-statistics="scoring"]').html(_.template($('#team-player-league-statistics').html(), {players: records}));
			}
		},

		getGoaltendingLeaders: function(league) {
			var self = this;
			var getGoaltendingLeaders = new Parse.Query(Parse.Object.extend('userStatisticRecord'));
			getGoaltendingLeaders.equalTo('league', league);
			getGoaltendingLeaders.equalTo('goalie', true);
			getGoaltendingLeaders.include('rosterMember');
			getGoaltendingLeaders.include('rosterMember.user');
			getGoaltendingLeaders.include('rosterMember.team');
			getGoaltendingLeaders.descending('W,MIN');
			getGoaltendingLeaders.limit(20);
			getGoaltendingLeaders.find({
				success: function(records) {
					// leaders
					var leadersRecords = [];
					// rank
					var rank = 1;

					// organize
					for ( var r = 0; r < records.length; r++ ) {
						leadersRecords.push({
							ghost: records[r].get('rosterMember').attributes['ghostData'],
							link: ( (records[r].get('rosterMember').attributes['ghostData']) ? undefined : '#/' + records[r].get('rosterMember').attributes['user'].attributes['username'] ),
							rank: rank++,
							avatar: ( (records[r].get('rosterMember').attributes['ghostData']) ? undefined : ( ( records[r].get('rosterMember').attributes['user'].attributes['profilePicture'] == undefined ) ? defaultPic : records[r].get('rosterMember').attributes['user'].attributes['profilePicture'].url() ) ),
							name: ( (records[r].get('rosterMember').attributes['ghostData']) ? records[r].get('rosterMember').attributes['ghostObject'].name : records[r].get('rosterMember').attributes['user'].attributes['name'] ),
							position: 'G',
							games: records[r].get('GP'),
							minutes: records[r].get('MIN'),
							shotsAgainst: records[r].get('SA'),
							savePercentage: ( ( records[r].get('SA') == 0 ) ? '-' : (records[r].get('GA')/records[r].get('SA')).toFixed(2) ),
							wins: records[r].get('W'),
							losses: records[r].get('L'),
							ties: records[r].get('T'),
							shutouts: records[r].get('SO'),
							team: records[r].get('rosterMember').attributes['team'].attributes['name']
						});
					}

					// display
					self.displayGoaltendingLeaders(leadersRecords);
				},
				error: function(err) {}
			});
		},

		displayGoaltendingLeaders: function(records) {
			// at least one records
			if ( records.length > 0 ) {
				$('[data-league-rt]').append(_.template($('#statistics-container').html(), { header : 'Goaltending Leaders' , type : 'goaltending' }));
				$('[data-statistics="goaltending"]').html(_.template($('#team-goaltender-league-statistics').html(), {players: records}));
			}
		}
		
	});
	
	// Game View
	var GameView = Parse.View.extend({
		
		el: $('[data-app-main]'),

		view: 3,

		game: {
			id 				: undefined,
			o 				: undefined,
			hasStarted 		: undefined,
			isActive 		: undefined,
			isFinal 		: undefined,
			isCUOfficial 	: undefined,
			requestId 		: [],
			gameRecord		: undefined,
			isOfficial 		: undefined,
			creator 		: undefined,
			location 		: undefined,
			league 			: undefined,
			date 			: undefined,
			time 			: undefined,
			home 			: {
				team 			: undefined,
				name 			: undefined,
				avatar 			: undefined,
				creator 		: undefined,
				fullRoster 		: [],
				activeRoster	: [],
				rosterRecords 	: [],
				teamRecordId	: undefined,
				teamRecord		: undefined,
				score 			: undefined
			},
			away 			: {
				team 			: undefined,
				name 			: undefined,
				avatar 			: undefined,
				creator 		: undefined,
				fullRoster 		: [],
				activeRoster	: [],
				rosterRecords 	: [],
				teamRecordId	: undefined,
				teamRecord 		: undefined,
				score 			: undefined
			},
			firstPeriodLength 	: undefined,
			secondPeriodLength	: undefined,
			thirdPeriodLength	: undefined,
			currentMinutes		: undefined,
			currentSeconds		: undefined,
			currentPeriod		: undefined
		},

		collaboration: function(game, x, y) {
			// event and location
			this.event 					= undefined;
			this.x 						= x;
			this.y 						= y;
			// game reference
			this.game 					= game.o;
			// home or away
			this.advantage	 			= undefined;
			// is game and collaborator official
			this.isGameOfficial 		= game.isOfficial;
			this.isOfficial 			= game.isCUOfficial;
			// who got the statistic
			this.participant			= {
				identification			: undefined,
				sri						: undefined,
				team					: undefined
			};
			// helping participants
			this.firstParticipant		= undefined;
			this.fpsri					= undefined;
			this.secondParticipant		= undefined;
			this.spsri					= undefined;
			// opposition
			this.oParticipant			= {
				identification			: undefined,
				sri						: undefined,
				team					: undefined
			};
			// league
			this.league 				= game.league;
			// time
			this.period 				= ( ( game.currentPeriod == undefined ) ? 1 : game.currentPeriod );
			this.minutes 				= game.currentMinutes;
			this.seconds 				= game.currentSeconds;
			// extra information
			this.other 					= {};
			// game record for aggregation
			this.gameRecord					= game.gameRecord;
			// team record for aggregation
			this.teamRecord					= [ game.home.teamRecordId , game.away.teamRecordId ];
		},
		
		initialize: function() {
		
			// unbind previous events
			$('[data-app-main]').unbind();
			
			// binding this to functions that reference this
			_.bindAll(this, 'render');

			// render page
			this.render();
			
			// clock off
			clock = false;

			// setup touch
			setupTouch(this);


			// necessary
			this.roster = false;
			this.statisticsInterval = 30;
			this.totalStatisticsCount = 0;
			this.clock = undefined;
			this.eventObject = undefined;
			this.phase = undefined;
			this.clockStatus = false;
			this.timeAdjust = 0;


			this.cOptions = {
				event 		: [ 'Shot' , 'Goal' , 'Hit' , 'Takeaway' , 'Penalty' , 'Faceoff' ],
				advantage 	: [ true , false ],
				player		: [ 'Forward' , 'Right Wing' , 'Center' , 'Left Wing' , 'Defense' , 'Right Defense' , 'Left Defense' , 'Goalie' ],
				shotType 	: [ 'Saved' , 'Blocked' , 'Missed' , 'Post' , 'Saved Penalty Shot' ],
				goalType 	: [ 'Event Strength' , 'Powerplay' , 'Penalty Kill' , 'Penalty Shot' ],
				penaltyType : [ 'Body Checking' , 'Boarding' , 'Bench Minor' , 'Cross Checking' , 'Check From Behind' , 'Charging' , 'Check To Head' , 'Hooking' , 'Holding' , 'Interference' , 'Roughing After Whistle' , 'Roughing' , 'Slashing' , 'Tripping' , 'Unsportsmanlike Conduct' , 'Agressor' , 'Broken Stick' , 'Butt End' , 'Dangerous Equipment' , 'Delay Of Game' , 'Elbowing' , 'Fighting' , 'First Off Bench' , 'Face Mask' , 'Fall On Puck' , 'Goalie Leaving Crease' , 'Head Butt' , 'Handling Puck' , 'High Sticking' , 'Illegal Equipment' , 'Ineligitimate Player' , 'Instigator' , 'Goalie Interference' , 'Kneeing' , 'Leaving Bench' , 'Removing Helmet' , 'Spearing' , 'Too Many Men' , 'Throwing Stick' ],
				penaltyDur 	: [ '2 Minutes' , '4 Minutes' , '5 Minutes' , '10 Minutes' ],
				penaltyCat  : [ 'Misconduct' , 'Game Misconduct' , 'Gross Misconduct' , 'Match' ]
			}
			// penalty duration
			var penaltyDuration = [ 'Minor (2 Minutes)' , 'Double Minor (2 + 2 Minutes)' , 'Major (5 Minutes)' , 'Misconduct (10 Minutes)' ];

			initInteractiveScorbit(true);

		},
		
		render: function() {
			// clear view
			if (!( iphone || ipad )) this.$el.html('');
			// this
			var self = this;
			// get game data
			var getGameData = new Parse.Query(Parse.Object.extend('Game'));
			getGameData.equalTo('objectId', document.URL.split('/').pop());
			getGameData.equalTo('initialized', true);
			getGameData.include('createdBy');
			getGameData.include('league');
			getGameData.include('homeTeam');
			getGameData.include('homeTeam.createdBy');
			getGameData.include('awayTeam');
			getGameData.include('awayTeam.createdBy');
			getGameData.include('score');
			getGameData.include('homeActiveRoster');
			getGameData.include('awayActiveRoster');
			getGameData.first({
				success: function(game) {
					// this game could not be found
					if ( game == undefined ) return notFound();

					// store data in a local user object
					self.game.id 					= game.id;
					self.game.o 					= game;
					self.game.hasStarted 			= game.get('start');
					self.game.isActive 				= game.get('active');
					self.game.isFinal 				= game.get('gameFinal');
					self.game.isCUOfficial 			= (( game.get('createdBy').id === Parse.User.current().id ) ? true : false );
					self.game.requestId 			= game.get('rid');
					self.game.gameRecord 			= game.get('score').id;
					self.game.isOfficial 			= game.get('isOfficial');
					self.game.creator 				= game.get('createdBy');
					self.game.location 				= game.get('arena');
					self.game.league 				= game.get('league');
					self.game.date 					= parseDateIntoEnglish(game.get('dateTimeOfGame').getDay(), game.get('dateTimeOfGame').getMonth(), game.get('dateTimeOfGame').getDate(), game.get('dateTimeOfGame').getFullYear());
					self.game.time 					= convertArmyTime(game.get('dateTimeOfGame').getHours(), game.get('dateTimeOfGame').getMinutes());
					self.game.home.team 			= game.get('homeTeam');
					self.game.home.name 			= game.get('homeTeam').attributes['name'];
					self.game.home.avatar 			= ( ( game.get('homeTeam').attributes['profilePicture'] == undefined ) ? defaultPic : game.get('homeTeam').attributes['profilePicture'].url());
					self.game.home.creator 			= game.get('homeTeam').attributes['createdBy'];
					self.game.home.fullRoster 		= [],
					self.game.home.activeRoster 	= ( ( game.get('homeActiveRoster') == undefined ) ? [] : game.get('homeActiveRoster').attributes['players'] );
					self.game.home.rosterRecords 	= [],
					self.game.home.teamRecordId		= undefined,
					self.game.home.teamRecord 		= undefined,
					self.game.home.score 			= game.get('score').attributes['WG'];
					self.game.away.team 			= game.get('awayTeam');
					self.game.away.name 			= game.get('awayTeam').attributes['name'];
					self.game.away.avatar 			= ( ( game.get('awayTeam').attributes['profilePicture'] == undefined ) ? defaultPic : game.get('awayTeam').attributes['profilePicture'].url());
					self.game.away.creator 			= game.get('awayTeam').attributes['createdBy'];
					self.game.away.fullRoster 		= [],
					self.game.away.activeRoster 	= ( ( game.get('awayActiveRoster') == undefined ) ? [] : game.get('awayActiveRoster').attributes['players'] );
					self.game.away.rosterRecords 	= [],
					self.game.away.teamRecordId		= undefined,
					self.game.away.teamRecord 		= undefined,
					self.game.away.score 			= game.get('score').attributes['VG'];
					self.game.firstPeriodLength 	= game.get('defaultFirstPeriodMinutes');
					self.game.secondPeriodLength 	= game.get('defaultSecondPeriodMinutes');
					self.game.thirdPeriodLength 	= game.get('defaultThirdPeriodMinutes');
					self.game.currentMinutes 		= undefined;
					self.game.currentSeconds 		= undefined;
					self.game.currentPeriod 		= undefined;
					self.rosters 					= false;

					setHeading(self.game.home.score + '-' + self.game.away.score, true);

					// update interactive score
					updateInteractiveScore(self.game.home.score, self.game.away.score);

					// update interactive teams
					updateInteractiveTeams(self.game.home.name, self.game.away.name);

					// template the data
					self.renderPage(self.game, $('#matchup-view').html());
					// official
					if (self.game.isOfficial) self.renderSub({ tidbit : [
						// &#xf00c;
						{ icon : '&#xe301;', primary : 'Scorbit Official' , secondary : 'Statistics Are Aggregated' }
					] }, $('#tidbit').html(), $('[data-matchup-information]'), true);

					self.renderSub({ tidbit : [
						{ icon : '&#xf007;', primary : self.game.creator.attributes['name'], secondary : 'Game Creator' },
						{ icon : '&#xe24d;', primary : self.game.location, secondary : 'Location' },
						{ icon : '&#xf091;', primary : ( ( self.game.league != undefined ) ? self.game.league.attributes['name'] : undefined ) , secondary : ( ( self.game.league != undefined ) ? self.game.league.attributes['competitiveCategory'] + ' ' + self.game.league.attributes['year'] : undefined ) },
						{ icon : '&#xe1dd;', primary : self.game.time , secondary : self.game.date }
					] }, $('#tidbit').html(), $('[data-matchup-information]'), true);

		 			// get statistics
					self.getRecords(self.game);

					// subscribe
					if (!( self.game.isFinal && !self.game.isActive)) self.subscribe(self.game.id);

					// would you like to activate game?
					if ( !self.game.hasStarted && self.game.isCUOfficial ) self.wouldYouLikeToActivateGame();

					// unofficial user
					if (!self.game.isCUOfficial) {
						$('[data-interactive-play], [data-interactive-adjust-timing]').addClass('interactive__button--unofficial');
						$('[data-interactive]').addClass('interactive--unofficial');
					}
				},
				error: function(err) {}
			});
		},

		renderPage: function(data, template) { this.$el.html(_.template(template, data)); },

		renderSub: function(data, template, target, append) {
			if (append)
				$(target).append(_.template(template, data));
			else
				$(target).html(_.template(template, data));
		},

		wouldYouLikeToActivateGame: function() {
			var self = this;
			// delay so user can see game
			setTimeout(function() {
				var response = confirm('This game is not yet active, would you like to activate it?');
				// action
				self.activateGame(response);
			}, 100);
		},

		activateGame: function(activate) {
			var self = this;

			// authorized
			if ( Parse.User.current().id === this.game.creator.id ) {
				if (activate) {
					// loading
					$('[data-matchup-activate]')
						.attr('disabled', true)
						.html('&#xe286;<span class=" [ entity__button__description ] ">ACTIVATING</span>');
					// game
					var GameClass = Parse.Object.extend('Game');
					var game = new GameClass();
					game.id = this.game.id;
					// ACL is final
					var finalACL = new Parse.ACL();
					finalACL.setPublicWriteAccess(false);
					finalACL.setPublicReadAccess(true);
					finalACL.setWriteAccess(Parse.User.current(), false);
					// update
					game.set('active', true);
					game.set('gameFinal', false);
					game.set('start', true);
					game.save(null, {
						success: function(game) {
							// loading
							$('[data-matchup-activate]')
								.removeAttr('disabled data-matchup-activate')
								.attr('data-matchup-finish', true)
								.html('&#xe286;<span class=" [ entity__button__description ] ">END GAME</span>');
							
							self.game.isActive 		= game.get('active');
							self.game.isFinal	 	= game.get('gameFinal');
							self.game.hasStarted	= true;
							
							// rosters are set permanently
							if ( self.game.isOfficial ) self.rostersSetPermanently();
							// update time
							self.updateGameTime([self.game.firstPeriodLength, '00'], 1);
							// publish
							self.publishGameStatus(false);
						},
						error: function() {
							$('[data-matchup-activate]')
								.removeAttr('disabled')
								.html('&#xe286;<span class=" [ entity__button__description ] ">ACTIVATE GAME</span>');
						}
					});
				}
			}
		},

		endGame: function(end) {
			var self = this;

			// authorized
			if ( Parse.User.current().id === this.game.creator.id ) {
				if (end) {
					// loading
					$('[data-matchup-finish]')
						.attr('disabled', true)
						.html('&#xf021;<span class=" [ entity__button__description ] ">ENDING</span>');
					// game
					var GameClass = Parse.Object.extend('Game');
					var game = new GameClass();
					game.id = this.game.id;
					// ACL is final
					var finalACL = new Parse.ACL();
					finalACL.setPublicWriteAccess(false);
					finalACL.setPublicReadAccess(true);
					finalACL.setWriteAccess(Parse.User.current(), false);
					// update
					game.set('active', false);
					game.set('gameFinal', true);
					game.save(null, {
						success: function(game) {
							self.game.isActive 		= game.get('active');
							self.game.isFinal 		= game.get('gameFinal');
							self.game.hasStarted	= true;

							// rosters are set permanently
							if ( self.game.isOfficial ) self.rostersSetPermanently();
							// publish
							self.publishGameStatus(false);
							// rerender
							self.render();
						},
						error: function() {
							$('[data-matchup-finish]')
								.removeAttr('disabled')
								.html('&#xe286;<span class=" [ entity__button__description ] ">END GAME</span>');
						}
					});
				}
			}
		},

		rostersSetPermanently: function() {
			// request
			var RequestClass = Parse.Object.extend('Request');
			// 1st
			var firstRequest = new RequestClass();
			firstRequest.id = this.game.requestId[0];
			firstRequest.set('response', true);
			firstRequest.set('responseReceived', true);
			// 2nd
			var secondRequest = new RequestClass();
			secondRequest.id = this.game.requestId[1];
			secondRequest.set('response', true);
			secondRequest.set('responseReceived', true);
			// save
			Parse.Object.saveAll([firstRequest, secondRequest]);
		},

		getRecords: function(game) {
			this.getTeamRecords(game.league);
			this.getTeamRosters(game);
			this.getStatistics(game);
		},

		subscribe: function(id) {
			this.subscribeToGameStatus(id);
			this.subscribeToLastGameStatus(id);
			this.subscribeToGameStatistics(id);
			this.subscribeToOfficialGameStatistics(id);
		},

		// get records and rosters need to be better handling of errors because if official game and stats are accumulated, need row ids to update values at the end of games.

		getTeamRecords: function(league) {
			var self = this;
			// league is defined - official game
			if ( league != undefined ) {
				// home record
				var homeRecord = new Parse.Query(Parse.Object.extend('teamStatisticRecord'));
				homeRecord.equalTo('team', this.game.home.team);
				homeRecord.equalTo('league', league);
				// away record
				var awayRecord = new Parse.Query(Parse.Object.extend('teamStatisticRecord'));
				awayRecord.equalTo('team', this.game.away.team);
				awayRecord.equalTo('league', league);
				// team records
				var teamRecords = Parse.Query.or(homeRecord, awayRecord);
				teamRecords.limit(2);
				teamRecords.find({
					success: function(records) {
						// organize
						for ( var i = 0; i < records.length; i++ ) {
							// home team
							if ( records[i].attributes['team'].id === self.game.home.team.id ) {
								self.game.home.teamRecordId = records[i].id;
								self.game.home.teamRecord 	= [ records[i].get('W') , records[i].get('L') , records[i].get('T') ];
							// away team
							} else {
								self.game.away.teamRecordId = records[i].id;
								self.game.away.teamRecord 	= [ records[i].get('W') , records[i].get('L') , records[i].get('T') ];
							}
						}

						// display records
						self.displayTeamRecords(self.game.home.teamRecord, self.game.away.teamRecord);
					},
					error: function(err) {}
				});
			}
		},

		displayTeamRecords: function(home, away) {
			$('[data-home-record]').text('(' + home.join('-') + ')');
			$('[data-away-record]').text('(' + away.join('-') + ')');
		},

		getTeamRosters: function(game) {
			var self = this;
			// home roster			
			var homeRoster = new Parse.Query(Parse.Object.extend('userOnRoster'));
			homeRoster.equalTo('team', game.home.team);
			homeRoster.equalTo('status', true);
			// away roster
			var awayRoster = new Parse.Query(Parse.Object.extend('userOnRoster'));
			awayRoster.equalTo('team', game.away.team);
			awayRoster.equalTo('status', true);	
			// team rosters
			var teamRosters = new Parse.Query.or(homeRoster, awayRoster);
			teamRosters.include('user');
			teamRosters.ascending('number');
			teamRosters.find({
				success: function(roster) {
					// organize players into full team rosters
					for ( var r = 0; r < roster.length; r++ ) {
						if ( roster[r].attributes['team'].id == game.home.team.id )
							self.game.home.fullRoster.push(roster[r]);
						else
							self.game.away.fullRoster.push(roster[r]);
					}

					// official game - get roster records for statistic accumulation
					if ( game.league != undefined ) {

						// home team record
						var homeTeamRosterRecord = new Parse.Query(Parse.Object.extend('userStatisticRecord'));
						homeTeamRosterRecord.equalTo('team', game.home.team);
						homeTeamRosterRecord.equalTo('league', game.league);
						// away team record
						var awayTeamRosterRecord = new Parse.Query(Parse.Object.extend('userStatisticRecord'));
						awayTeamRosterRecord.equalTo('team', game.away.team);
						awayTeamRosterRecord.equalTo('league', game.league);
						// get team statistic records
						var teamRosterRecords = Parse.Query.or(homeTeamRosterRecord, awayTeamRosterRecord);
						teamRosterRecords.find({
							success: function(records) {
								// roster records organized
								for ( var i = 0; i < records.length; i++ ) {
									if ( records[i].attributes['team'].id === game.home.team.id )
										self.game.home.rosterRecords.push(records[i]);
									else
										self.game.away.rosterRecords.push(records[i]);
								}

								// rosters ready
								self.rosters = true;
							},
							error: function(err) {}
						});

					// rosters ready	
					} else self.rosters = true;
				},
				error: function(error) {}
			});
		},

		getStatistics: function(game) {
			var self = this;
			var stats = [];
			// get statistics
			var getStatistics = new Parse.Query(Parse.Object.extend('Statistics'));
			getStatistics.equalTo('game', game.o);
			getStatistics.include('participant');
			getStatistics.include('participant.user');
			getStatistics.include('participantTeam');
			getStatistics.descending('createdAt');
			getStatistics.limit(this.statisticsInterval);
			getStatistics.skip(this.totalStatisticsCount);
			getStatistics.find({
				success: function(statistics) {
					// verify statistics
					for ( var i = 0; i < statistics.length; i++ ) 
						if (self.verifyStatistic(statistics[i])) stats.push(statistics[i]);
					self.organizeStatistics(stats, false);
				},
				error: function(error) {}
			});	
		},

		verifyStatistic: function(statistic) {
			if ( statistic.attributes['collaborator'] == undefined || statistic.attributes['event'] == undefined || statistic.attributes['game'] == undefined || statistic.attributes['participantTeam'] == undefined || statistic.attributes['oParticipantTeam'] == undefined || statistic.attributes['period'] == undefined || statistic.attributes['minutes'] == undefined || statistic.attributes['seconds'] == undefined || statistic.attributes['advantage'] == undefined )
				return false;
			return true;
		},

		organizeStatistics: function(statistics, before, realtime) {
			var stats = [];
			var markers = [];
			// organize
			for ( var i = 0; i < statistics.length; i++ ) {
				// statistic
				stats.push({
					cid 			: statistics[i].attributes['collaborator'].id,
					id 				: statistics[i].id,
					number 			: (function() {
						if ( statistics[i].attributes['participant'] == undefined )
							return statistics[i].attributes['participantTeam'].attributes['name'].charAt(0).toUpperCase();
						return statistics[i].attributes['participant'].attributes['number'];
					})(),
					identification 	: (function() {
						if ( statistics[i].attributes['participant'] == undefined ) {
							return statistics[i].attributes['participantTeam'].attributes['name'];
						} else if (statistics[i].attributes['participant'].attributes['ghostData']) {
							return statistics[i].attributes['participant'].attributes['ghostObject'].name;
						} else {
							return statistics[i].attributes['participant'].attributes['user'].attributes['name'];
						}
					})(),
					minutes 		: statistics[i].attributes['minutes'],
					seconds 		: statistics[i].attributes['seconds'],
					period 			: parseInt(statistics[i].attributes['period']),
					event 			: statistics[i].attributes['event'].charAt(0).toUpperCase(),
					isOfficial 		: statistics[i].attributes['isOfficial'],
					advantage 		: statistics[i].attributes['advantage']
				});

				// if goal, turnover, hit, shot
				if ( $.inArray(statistics[i].attributes['event'].charAt(0).toUpperCase(), [ 'G' , 'S' ]) != -1 ) {
					// statistic marker
					markers.push({
						id 			: statistics[i].id,
						event 		: statistics[i].attributes['event'].charAt(0).toUpperCase(),
						x 	 		: statistics[i].attributes['x'] * 100,
						y 	 		: statistics[i].attributes['y'] * 100,
						advantage 	: statistics[i].attributes['advantage']
					});
				}
			}

			// realtime
			if (realtime) this.publishGameStatistic([ stats[0] , markers[0] ]);
			// display statistics
			this.displayStatistics(stats, before);
			// display statistic markers
			this.displayStatisticMarkers(markers);
		},

		displayStatistics: function(statistics, before) {
			// no statistics sent
			if (!statistics.length) {
				// no statistics at all
				if (!this.totalStatisticsCount.length) {
					// display message no statistics
				}
			} else {
				// no previous statistics
				if (!this.totalStatisticsCount) {
					$('[data-matchup-live]').append(_.template($('#statistics-container').html(), { header : 'Live Feed' , type : 'feeds' }));
					$('[data-statistics="feeds"]').html(_.template($('#match-feed-template').html(), { statistics : statistics }));
				} else {
					// display statistics
					if (before) {
						$('[data-statistics="feeds"]').prepend(_.template($('#match-feed-template').html(), { statistics : statistics }));
					} else {
						$('[data-statistics="feeds"]').append(_.template($('#match-feed-template').html(), { statistics : statistics }));
						// show load more button
					}
				}
				// add to total
				this.totalStatisticsCount += statistics.length;
			}
		},

		displayStatisticMarkers: function(markers) { $('[data-interactive]').append(_.template($('#match-marker-template').html(), { markers : markers })); },

		calculateClockTimeBaseOnRelativeTime: function(updatedAt, minutes, seconds) {
			// new time
			var currentTime = new Date();
			// previous time
			var previousTime = Date.parse(updatedAt);
			// absolute time difference
			var absoluteTime = Math.floor( ( currentTime - previousTime ) / 1000 );
			// clock time
			var clockInSeconds = Math.floor( (parseInt(minutes) * 60) + parseInt(seconds) );
			// relative time difference
			var relativeTime = clockInSeconds - absoluteTime;

			return relativeTime;
		},

		subscribeToLastGameStatus: function(id) {
			var self = this;
			pubnub.history({
				channel: id + '_time',
				count: 1,
				callback: function(status) {
					// status object
					var so = status[0][0];

					// must be under 24 hours since game started
					if ( so != undefined ) {
						// active
						if ( self.game.isActive && !self.game.isFinal ) {
							// clock running
							if (so.cActivity) {
								var clockTime = self.calculateClockTimeBaseOnRelativeTime(so.cTime, so.rTime.minutes, so.rTime.seconds);
								// difference is negative - period finished
								if ( clockTime < 0 ) {
									self.updateGameTime(['00', '00'], parseInt(so.rTime.period))
									self.stopClock();
									self.clockStatus = false;
								// difference is positive - period not finished	
								} else {
									self.updateGameTime([(Math.floor(parseInt(clockTime/60))).toString(), (Math.floor(parseInt(clockTime%60))).toString()], parseInt(so.rTime.period));
									self.runClock();
									self.clockStatus = true;
								}

								//self.adjustTimeButtonMarker(!self.active);
							
							// clock is not running	
							} else {
								self.updateGameTime([( ( so.rTime.minutes == 0 || so.rTime.minutes == '00' ) ? '00' : (so.rTime.minutes).toString() ), so.rTime.seconds.toString()], parseInt(so.rTime.period));
								self.stopClock();
								self.clockStatus = false;
								//self.adjustTimeButtonMarker(!self.active);
							}
						}
					} else {
						//  game is over 24 hours from start but since still active, update clock time
						if ( self.game.creator.id === Parse.User.current().id ) {
							// beginning of 1st period
							self.updateGameTime([ self.game.firstPeriodLength , '00' ], 1);
							self.stopClock();
							self.clockStatus = false;
							// publish game status
							self.publishGameStatus(false);
						}
					}
				}
			});
		},

		subscribeToGameStatus: function(id) {
			var self = this;
			pubnub.subscribe({
				channel: id + '_time',
				message: function(status) {
					// not authorized
					if ( Parse.User.current().id !== self.game.creator.id ) {

						// just started
						if ( !self.game.hasStarted && status.started ) {
							self.render();
						}

						// update
						self.game.hasStarted 	= status.started;
						self.game.isActive 		= status.activity[0];
						self.game.isFinal 		= status.activity[1];

						// active
						if ( status.activity[0] && !status.activity[1] ) {

							// clock running
							if (status.cActivity) {
								var clockTime = self.calculateClockTimeBaseOnRelativeTime(status.cTime, status.rTime.minutes, status.rTime.seconds);
								// difference is negative - period finished
								if ( clockTime < 0 ) {
									self.updateGameTime(['00', '00'], parseInt(status.rTime.period));
									self.stopClock();
									self.clockStatus = false;
								// difference is positive - period not finished	
								} else {
									self.updateGameTime([(Math.floor(parseInt(clockTime/60))).toString(), (Math.floor(parseInt(clockTime%60))).toString()], parseInt(status.rTime.period));
									self.runClock();
									self.clockStatus = true;
								}
								
							// clock is not running	
							} else {
								self.updateGameTime([( ( status.rTime.minutes == 0 || status.rTime.minutes == '00' ) ? '00' : (status.rTime.minutes).toString() ), status.rTime.seconds.toString()], parseInt(status.rTime.period));
								self.stopClock();
								self.clockStatus = false;
							}
						
						// inactive	or final
						} else {
							self.stopClock();
							self.clockStatus = false;
						}
					}
				}
			});
		},

		subscribeToOfficialGameStatistics: function(id) {
			var self = this;
			pubnub.subscribe({
				channel: id + '_official',
				message: function(statistic) {
					if ( Parse.User.current().id !== statistic[1] ) self.updateScore(statistic[0]);
				}	
			});
		},

		subscribeToGameStatistics: function(id) {
			var self = this;
			pubnub.subscribe({
				channel: id,
				message: function(statistic) {
					// don't show statistics of collaborator
					if ( Parse.User.current().id !== statistic[0].cid ) {
						// display statistics
						self.displayStatistics([ statistic[0] ], true);
						// display statistic markers
						if ( statistic[1] != null ) self.displayStatisticMarkers([ statistic[1] ]);
					}
				}
			});
		},

		publishGameStatus: function(activity) {
			var self = this;
			pubnub.publish({
				channel: self.game.id + '_time',
				message: {
					cTime			: new Date(),
					rTime 			: {
						minutes 	: self.game.currentMinutes,
						seconds 	: self.game.currentSeconds,
						period		: self.game.currentPeriod
					},
					activity 		: [self.game.isActive, this.game.isFinal],
					cActivity		: activity,
					started 		: this.game.hasStarted
				}
			});
		},

		publishOfficialGameStatistic: function(statistic) {
			pubnub.publish({
				channel: this.game.id + '_official',
				message: statistic
			});
		},

		publishGameStatistic: function(statistics) {
			pubnub.publish({
				channel: this.game.id,
				message: statistics
			});
		},

		events: function() {
		
			return ( iphone || ipad ) ? // if iPhone
			
				{

					'touchstart [data-touch]' : 'ts',
					'touchmove [data-touch]' : 'tm',
					'touchend [data-matchup-activate]' : 'touchendActivateGame',
					'touchend [data-matchup-finish]' : 'touchendEndGame',
					'touchend [data-matchup-settings]' : 'touchendOpenSettings'
				
				}
				:
				{}
			
		},

		ts: function(e) {
			var self = this;
			// associate touchstart and touchend to the same element
			this.touchstart = this.touchend = elementFromPoint(e);
			// timeout used so that swipe isn't taken as a tap
			this.touchTimeout = window.setTimeout(function() {
				self.tap = true;
			// 100 ms tap delay
			}, 100);
		},

		tm: function(e) {
			clearTimeout(this.touchTimeout);
			// only if moved out of target
			if ( this.touchstart !== elementFromPoint(e) )
				this.touchend = undefined;
			// disable scroll if tapped for least 100 ms
			if (this.tap) return false;
		},

		touchendActivateGame: function(e) {
			this.tap = false;
			if ( this.touchstart === this.touchend ) this.activateGame(true);
		},

		touchendEndGame: function(e) {
			this.tap = false;

			var endGame;
			if ( this.touchstart === this.touchend ) endGame = confirm('This action is final, after the game is finished you will not be able to edit any feature of the game.');
			if (endGame) this.endGame(true);
		},

		touchendOpenSettings: function(e) {
			this.tap = false;
			if ( this.touchstart === this.touchend ) openModal(_.template($('#modal-header').html(), { header : 'Game Settings' , entity : '' , disabled : false }), _.template($('#game-settings').html(), this.game));
		},

		saveSettings: function(firstPeriod, secondPeriod, thirdPeriod) {
			var self = this;
			// authorized
			if ( Parse.User.current().id === this.game.creator.id ) {
				// game
				var GameClass = Parse.Object.extend('Game');
				var game = new GameClass();
				game.id = this.game.id;
				// update
				game.set('defaultFirstPeriodMinutes', firstPeriod);
				game.set('defaultSecondPeriodMinutes', secondPeriod);
				game.set('defaultThirdPeriodMinutes', thirdPeriod);
				game.save({
					success: function(game) {
						self.game.firstPeriodLength 	= game.get('defaultFirstPeriodMinutes');
						self.game.secondPeriodLength 	= game.get('defaultSecondPeriodMinutes');
						self.game.thirdPeriodLength 	= game.get('defaultThirdPeriodMinutes');
					},
					error: function(game, error) {}
				});	
			}
		},

		adjustTiming: function() {
			openModal($('#start-time-change').html());
			this.initTimeChange();
		},

		initTimeChange: function() {
			this.timeAdjust = 0;
			this.displayPeriodOptions();
		},

		showTimingOptions: function(options, attributes) {
			var opts = [];

			for ( var i = 0; i < options.length; i++ ) {
				opts.push({
					id 		: attributes[i],
					value 	: options[i]
				});
			}

			$('[data-app-modal-primary]').html(_.template($('#match-time-adjust-option-template').html(), { options : opts }));
		},

		displayPeriodOptions: function() {
			this.showTimingOptions([1, 2, 3], [1, 2, 3]);
		},

		displayMinutesOptions: function() {
			var minutes = [];
			var max;

			switch (parseInt(this.game.currentPeriod)) {
				case 1: max = this.game.firstPeriodLength; break;
				case 2: max = this.game.secondPeriodLength; break;
				case 3: max = this.game.thirdPeriodLength; break;
			}

			for ( var i = 0; i <= max; i++ ) {
				minutes.push(i);
			}

			this.showTimingOptions(minutes, minutes);

			// display next field
			$('[s-modal-primary-header] [s-modal-primary-cancel]').before(_.template($('#timing-data').html(), { type : 'minutes' , typeU : 'MINUTES' }));
		},

		displaySecondsOptions: function() {
			var seconds = [];

			for ( var i = 0; i <= 60; i++ ) {
				if ( i < 10 ) seconds.push('0' + i);
				else seconds.push(i);
			}

			this.showTimingOptions(seconds, seconds);

			// display next field
			$('[s-modal-primary-header] [s-modal-primary-cancel]').before(_.template($('#timing-data').html(), { type : 'seconds' , typeU : 'SECONDS' }));
		},

		controlTimingPhasing: function(e, data) {
			e.preventDefault();

			switch (this.timeAdjust) {
				case 0:
					this.game.currentPeriod = data;
					this.timeAdjust++;
					this.displayMinutesOptions();
					// display changes
					$('[data-c-period]').html(data);
				break;
				case 1:
					this.game.currentMinutes = data;
					this.timeAdjust++;
					this.displaySecondsOptions();
					// display changes
					$('[data-c-minutes]').html(data);
				break;
				case 2:
					this.game.currentSeconds = data;
					this.updateGameTime([this.game.currentMinutes, this.game.currentSeconds], this.game.currentPeriod);
					closeModal();
					this.publishGameStatus(false);
				break;
			}
		},

		stopClock: function(e) { clearTimeout(this.clock); },

		runClock: function(e) {
			var self = this;
			// get time
			var time = $('[data-matchup-clock]').text().split(':');
			// verify time structure
			if ( time.length == 2 && !isNaN(parseInt(time[0])) && !isNaN(parseInt(time[1])) ) {
				// 00:00
				if ( time[0] == '00' && time[1] == '00' ) {
					// authorized
					this.stopClock();
				// XX:00
				} else if ( time[1] == '00' ) {
					// XX:59
					time[1] = '59';
					// minute - 1
					if ( parseInt(time[0]) == 1 ) time[0] = '00';
					else time[0] = (parseInt(time[0]) - 1).toString();
					// update and loop
					this.updateClock(time);
					this.clock = window.setTimeout(function() { self.runClock(); }, 1000);
				// seconds - <= 10
				} else if ( parseInt(time[1]) <= 10 ) {
					// decrement with 0 pad
					time[1] = ('0' + ( parseInt(time[1]) - 1 )).toString();
					// update and loop
					this.updateClock(time);
					this.clocl = window.setTimeout(function() { self.runClock(); }, 1000);
				// XX:XX
				} else {
					// decrement
					time[1] = ( parseInt(time[1]) - 1 ).toString();
					// update and loop
					this.updateClock(time);
					this.clock = window.setTimeout(function() { self.runClock(); }, 1000);
				}
			}
		},

		updateGameTime: function(time, period) {
			this.updateClock(time);
			this.updatePeriod(period);
		},

		updateClock: function(time) {
			this.game.currentMinutes = time[0];
			this.game.currentSeconds = time[1];
			// display
			$('[data-matchup-clock]').text(time.join(':'));

			updateInteractiveClock(time);
		},

		updatePeriod: function(period) {
			// update
			this.game.currentPeriod = period.toString();
			var periodString;
			// display period
			switch (parseInt(period)) {
				case 1: periodString = '1ST PERIOD'; break;
				case 2: periodString = '2ND PERIOD'; break;
				case 3: periodString = '3RD PERIOD'; break;
			}

			// display
			$('[data-matchup-period]').text(periodString);

			updateInteractivePeriod(periodString);
		},

		updateScore: function(advantage) {
			if (advantage) this.game.home.score++;
			else this.game.away.score++;
			// display change
			$('[data-home-score]').html(this.game.home.score);
			$('[data-away-score]').html(this.game.away.score);

			updateInteractiveScore(this.game.home.score, this.game.away.score);
		},

		// collaboration

		getCoordsForCollaboration: function(e) {
			// only allow if rosters and statistics are ready
			if ( this.rosters && this.game.isActive && !this.game.isFinal ) {
				// relative multipliers (% of square length within each circle bounds)
				var xDimension = 0.151515151;
				var yDimension = 0.301204819;
				// relative boundaries
				var xFlatBoundary = 12;
				var yFlatBoundary = 12;
				// absolute coordinates
				var surfaceOffset = $('[data-interactive]').offset();
				var x = e.clientX - surfaceOffset.left;
				var y = e.clientY - surfaceOffset.top;
				// iphone or ipad
				if ( iphone || ipad ) {
					x = e.originalEvent.changedTouches[0].clientX - surfaceOffset.left;
					y = e.originalEvent.changedTouches[0].clientY - surfaceOffset.top;
				}
				// relative coordinates
				var X = ( x / $('[data-interactive]').width() );
				var Y = ( y / $('[data-interactive]').height() );
				// restricting x on the flat sides of the rink
				if 		( X < ( xFlatBoundary / $('[data-interactive]').width() ) ) X = xFlatBoundary / $('[data-interactive]').width();
				else if ( X > ( ( $('[data-interactive]').width() - xFlatBoundary ) / $('[data-interactive]').width() ) ) X = ( $('[data-interactive]').width() - xFlatBoundary ) / $('[data-interactive]').width();
				// restricting y on the flat sides of the rink
				if 		( Y < ( yFlatBoundary / $('[data-interactive]').height() ) ) Y = yFlatBoundary / $('[data-interactive]').height();
				else if ( Y > ( ( $('[data-interactive]').height() - yFlatBoundary ) / $('[data-interactive]').height() ) ) Y = ( $('[data-interactive]').height() - yFlatBoundary ) / $('[data-interactive]').height();		
				// restricting both coordinates based on the bounds of the rink curves
				if ( ( x > 0 && x < ( xDimension * $('[data-interactive]').width() ) ) && ( y > 0 && y < ( yDimension * $('[data-interactive]').height() ) ) ) { // top left curved bounds controller
					// manipulating x and y for calculating the radius
					var a = ( xDimension * $('[data-interactive]').width() ) - x;
					var b = ( yDimension * $('[data-interactive]').height() ) - y;
					var averageRadius = ( ( xDimension * $('[data-interactive]').width() ) + ( yDimension * $('[data-interactive]').height() ) ) / 2;
					var aCounter = (a * 0.001);
					var bCounter = (b * 0.001);
					// while the hypotenuse/radius created from a and b is greater
					// than the radius of the bounds of the curved controller's
					// radius, decrement a and b by the same constant until the
					// square root of their square sums is less than the radius
					// if the bounds of the curved controllers
					while ( Math.sqrt( Math.pow( a , 2 ) + Math.pow( b , 2 ) ) > ( averageRadius - Math.sqrt(128) ) ) {
						// decrementing a and b
						a -= aCounter;
						b -= bCounter;
					}
					// adjust dimensions
					X = ( ( ( xDimension * $('[data-interactive]').width() ) - a ) / $('[data-interactive]').width() );
					Y = ( ( ( yDimension * $('[data-interactive]').height() ) - b ) / $('[data-interactive]').height() );
				} else if ( ( x > 0 && x < ( xDimension * $('[data-interactive]').width() ) ) && ( y > ( $('[data-interactive]').height() - ( yDimension * $('[data-interactive]').height() ) ) && y < $('[data-interactive]').height() ) ) { // bottom left curved bounds controller
					// manipulating x and y for calculating the radius
					var a = ( xDimension * $('[data-interactive]').width() ) - x;
					var bNought = Math.abs( $('[data-interactive]').height() - ( yDimension * $('[data-interactive]').height() ) - y );
					var b = Math.abs( $('[data-interactive]').height() - ( yDimension * $('[data-interactive]').height() ) - y );
					var averageRadius = ( ( xDimension * $('[data-interactive]').width() ) + ( yDimension * $('[data-interactive]').height() ) ) / 2;
					var aCounter = (a * 0.001);
					var bCounter = (b * 0.001);
					// while the hypotenuse/radius created from a and b is greater
					// than the radius of the bounds of the curved controller's
					// radius, decrement a and b by the same constant until the
					// square root of their square sums is less than the radius
					// if the bounds of the curved controllers
					while ( Math.sqrt( Math.pow( a , 2 ) + Math.pow( b , 2 ) ) > ( averageRadius - Math.sqrt(128) ) ) {
						// decrementing a and b
						a -= aCounter;
						b -= bCounter;
					}
					// adjust dimensions
					X = ( ( ( xDimension * $('[data-interactive]').width() ) - a ) / $('[data-interactive]').width() );
					Y = ( ( y - ( bNought - b ) ) / $('[data-interactive]').height() );
				} else if ( ( x > ( $('[data-interactive]').width() - ( xDimension * $('[data-interactive]').width() ) ) && x < $('[data-interactive]').width() ) && ( y > ( $('[data-interactive]').height() - ( yDimension * $('canvas').height() ) ) && y < $('[data-interactive]').height() ) ) { // bottom left curved bounds controller
					// manipulating x and y for calculating the radius
					var aNought = Math.abs( $('[data-interactive]').width() - ( xDimension * $('[data-interactive]').width() ) - x );
					var a = Math.abs( $('[data-interactive]').width() - ( xDimension * $('[data-interactive]').width() ) - x );
					var bNought = Math.abs( $('[data-interactive]').height() - ( yDimension * $('[data-interactive]').height() ) - y );
					var b = Math.abs( $('[data-interactive]').height() - ( yDimension * $('[data-interactive]').height() ) - y );
					var averageRadius = ( ( xDimension * $('[data-interactive]').width() ) + ( yDimension * $('[data-interactive]').height() ) ) / 2;
					var aCounter = (a * 0.001);
					var bCounter = (b * 0.001);
					// while the hypotenuse/radius created from a and b is greater
					// than the radius of the bounds of the curved controller's
					// radius, decrement a and b by the same constant until the
					// square root of their square sums is less than the radius
					// if the bounds of the curved controllers
					while ( Math.sqrt( Math.pow( a , 2 ) + Math.pow( b , 2 ) ) > ( averageRadius - Math.sqrt(128) ) ) {
						// decrementing a and b
						a -= aCounter;
						b -= bCounter;
					}
					// adjust dimensions
					X = ( ( x - ( aNought - a ) ) / $('[data-interactive]').width() );
					Y = ( ( y - ( bNought - b ) ) / $('[data-interactive]').height() );
				} else if ( ( x > ( $('[data-interactive]').width() - ( xDimension * $('[data-interactive]').width() ) ) && x < $('[data-interactive]').width() ) && ( y > 0 && y < ( yDimension * $('[data-interactive]').height() ) ) ) { // top left curved bounds controller
					// manipulating x and y for calculating the radius
					var aNought = Math.abs( $('[data-interactive]').width() - ( xDimension * $('[data-interactive]').width() ) - x );
					var a = Math.abs( $('[data-interactive]').width() - ( xDimension * $('[data-interactive]').width() ) - x );
					var b = ( yDimension * $('[data-interactive]').height() ) - y;
					var averageRadius = ( ( xDimension * $('[data-interactive]').width() ) + ( yDimension * $('[data-interactive]').height() ) ) / 2;
					var aCounter = (a * 0.001);
					var bCounter = (b * 0.001);
					// while the hypotenuse/radius created from a and b is greater
					// than the radius of the bounds of the curved controller's
					// radius, decrement a and b by the same constant until the
					// square root of their square sums is less than the radius
					// if the bounds of the curved controllers
					while ( Math.sqrt( Math.pow( a , 2 ) + Math.pow( b , 2 ) ) > ( averageRadius - Math.sqrt(128) ) ) {
						// decrementing a and b
						a -= aCounter;
						b -= bCounter;
					}
					// adjust dimensions
					X = ( ( x - ( aNought - a ) ) / $('[data-interactive]').width() );
					Y = ( ( ( yDimension * $('[data-interactive]').height() ) - b ) / $('[data-interactive]').height() );
				}
				// format coordinates to 3 decimal places
				//this.X = X.toFixed(3);
				//this.Y = Y.toFixed(3);

				// collaborating
				openModal($('#start-collaboration').html());
				// init collaborator
				this.initCollaboration(this.game, X.toFixed(3), Y.toFixed(3));
			}
		},

		initCollaboration: function(game, x, y) {
			this.updatePhase(0);
			this.eventObject = new this.collaboration(game, x, y);
			this.eventOptions(false);
		},

		// set

		setEvent: function(data) {
			this.eventObject.event = data;
			// display changes
			$('[data-c-event]').html(data.charAt(0).toUpperCase());
		},

		setParticipantsAndAdvantage: function(team, opposition, advantage) {
			this.eventObject.participant.team = team;
			this.eventObject.oParticipant.team = opposition;
			this.eventObject.advantage = advantage;
			// display changes
			$('[data-c-team]').html(( (this.eventObject.advantage) ? abbreviate(this.game.home.name) : abbreviate(this.game.away.name) ));
		},

		setParticipant: function(data, records, value) {
			this.eventObject.participant.identification = ( ( data == 'TBD' ) ? undefined : data );

			for ( var i = 0; i < records.length; i++ ) {
				if ( data === records[i].attributes['rosterMember'].id )
					this.eventObject.participant.sri = records[i].id;
			}
			// display changes
			$('[data-c-player]').html(( ( data == 'TBD' ) ? 'TBD' :  value ));
		},

		setOpposingParticipant: function(goalie, advantage, records, data) {
			this.eventObject.oParticipant.identification = ( (goalie) ? this.getGoalie(!advantage) : ( ( data == 'TBD' ) ? undefined : data ) );

			for ( var i = 0; i < records.length; i++ ) {
				if ( this.eventObject.oParticipant.identification === records[i].attributes['rosterMember'].id )
					this.eventObject.oParticipant.sri = records[i].id;
			}
		},

		setType: function(data, value) {
			this.eventObject.other.type = ( ( data == 'TBD' ) ? null : data );
			// display changes
			$('[data-c-type]').html(( ( data == 'TBD' ) ? 'TBD' :  abbreviate(value) ));
		},

		setPenaltyDuration: function(data) {
			this.eventObject.other.duration = ( ( data == 'TBD' ) ? null : data );
			// display changes
			$('[data-c-duration]').html(( ( data == 'TBD' ) ? 'TBD' :  parseInt(data) ));
		},

		setPenaltyCategory: function(data, value) {
			this.eventObject.other.category = ( ( data == 'TBD' || data == 'N' ) ? null : data );
			// display changes
			$('[data-c-category]').html(( ( data == 'TBD' ) ? 'TBD' :  abbreviate(value) ));
		},

		setFirstParticipant: function(data, records, value) {
			this.eventObject.firstParticipant = ( ( data == 'TBD' || data == 'N' ) ? undefined : data );

			for ( var i = 0; i < records.length; i++ ) {
				if ( this.eventObject.firstParticipant === records[i].attributes['rosterMember'].id )
					this.eventObject.fpsri = records[i].id;
			}
			// display changes
			$('[data-c-assist-one]').html(( ( data == 'TBD' ) ? 'TBD' :  ( ( data == 'N' ) ? 'N' : value ) ));
		},

		setSecondParticipant: function(data, records, value) {
			this.eventObject.secondParticipant = ( ( data == 'TBD' || data == 'N' ) ? undefined : data );

			for ( var i = 0; i < records.length; i++ ) {
				if ( this.eventObject.secondParticipant === records[i].attributes['rosterMember'].id )
					this.eventObject.spsri = records[i].id;
			}
			// display changes
			$('[data-c-assist-two]').html(( ( data == 'TBD' ) ? 'TBD' :  ( ( data == 'N' ) ? 'N' : value ) ));
		},

		setMinutes: function(data) {
			this.eventObject.minutes = data;
			// display changes
			$('[data-c-time]').html(data + ':--');
		},

		setSeconds: function(data) {
			this.eventObject.seconds = data;
			// display changes
			$('[data-c-time]').html(this.eventObject.minutes + ':' + data);
		},

		getGoalie: function(advantage) {
			if (advantage) {
				for ( var i = 0; i < this.game.home.fullRoster.length; i++ ) {
					if ( $.inArray(this.game.home.fullRoster[i].id, this.game.home.activeRoster) != -1 ) {
						if ( this.game.home.fullRoster[i].attributes['role'].position == 'Goalie' )
							return this.game.home.fullRoster[i].id;
					}
				}
			} else {
				for ( var i = 0; i < this.game.away.fullRoster.length; i++ ) {
					if ( $.inArray(this.game.away.fullRoster[i].id, this.game.away.activeRoster) != -1 ) {
						if ( this.game.away.fullRoster[i].attributes['role'].position == 'Goalie' )
							return this.game.away.fullRoster[i].id;
					}
				}
			}
		},

		// display

		showOptions: function(options, attributes, tbd, none, half) {
			var opts = [];

			for ( var i = 0; i < options.length; i++ ) {
				var option = {
					id 		: attributes[i],
					value 	: options[i],
					half 	: half
				}

				opts.push(option);
			}

			$('[data-app-modal-primary]').html(_.template($('#match-collaborator-option-template').html(), { options : opts }));
		},

		eventOptions: function(condensed) {
			this.showOptions([ 'Shot' , 'Goal' , 'Hit' , 'Takeaway' , 'Penalty' , 'Faceoff' ], [ 'Shot' , 'Goal' , 'Hit' , 'Takeaway' , 'Penalty' , 'Faceoff' ], false, false, false);
		},

		displayTeamOptions: function() {
			this.showOptions([ this.game.home.team.attributes['name'] , this.game.away.team.attributes['name'] ], [ this.game.home.team.id , this.game.away.team.id ], false, false, true);
			// display next field
			$('[s-modal-primary-header] [s-modal-primary-cancel]').before(_.template($('#collaboration-data').html(), { type : 'team' , typeU : 'TEAM' }));
		},

		displayRosterOptions: function(advantage, noneAsOption, constraints, opposition, assistAttr, assistLabel) {
			var opts = [ 'To Be Determined' ], attrs = [ 'TBD' ];

			if (noneAsOption) {
				opts.push('None');
				attrs.push('N');
			}

			if (advantage) {
				for ( var i = 0; i < this.game.home.fullRoster.length; i++ ) {
					if ( $.inArray(this.game.home.fullRoster[i].id, this.game.home.activeRoster) != -1 ) {
						if ( $.inArray(this.game.home.fullRoster[i].id, constraints) == -1 ) {
							opts.push(this.game.home.fullRoster[i].attributes['number']);
							attrs.push(this.game.home.fullRoster[i].id);
						}
					}
				}
			} else {
				for ( var i = 0; i < this.game.away.fullRoster.length; i++ ) {
					if ( $.inArray(this.game.away.fullRoster[i].id, this.game.away.activeRoster) != -1 ) {
						if ( $.inArray(this.game.away.fullRoster[i].id, constraints) == -1 ) {
							opts.push(this.game.away.fullRoster[i].attributes['number']);
							attrs.push(this.game.away.fullRoster[i].id);
						}
					}
				}
			}

			this.showOptions(opts, attrs, false, false, false);
			// display next field
			if ( opposition == 'A' )
				$('[s-modal-primary-header] [s-modal-primary-cancel]').before(_.template($('#collaboration-data').html(), { type : assistAttr , typeU : assistLabel }));
			else
				$('[s-modal-primary-header] [s-modal-primary-cancel]').before(_.template($('#collaboration-data').html(), { type : ( (opposition) ? 'opposition' : 'player' ) , typeU : ( (opposition) ? 'OPPOSITION' : 'PLAYER' ) }));
		},

		displayShotTypeOptions: function() {
			this.showOptions([ 'To Be Determined' , 'Saved' , 'Blocked' , 'Missed' , 'Post' , 'Saved Penalty Shot' ], [ 'TBD' , 'Saved' , 'Blocked' , 'Missed' , 'Post' , 'Saved Penalty Shot' ], false, false, false);
			// display next field
			$('[s-modal-primary-header] [s-modal-primary-cancel]').before(_.template($('#collaboration-data').html(), { type : 'type' , typeU : 'TYPE' }));
		},

		displayGoalTypeOptions: function() {
			this.showOptions([ 'To Be Determined' , 'Event Strength' , 'Powerplay' , 'Penalty Kill' , 'Penalty Shot' ], [ 'TBD' , 'Event Strength' , 'Powerplay' , 'Penalty Kill' , 'Penalty Shot' ], false, false, false);
			// display next field
			$('[s-modal-primary-header] [s-modal-primary-cancel]').before(_.template($('#collaboration-data').html(), { type : 'type' , typeU : 'TYPE' }));
		},

		displayPenaltyDurationOptions: function() {
			this.showOptions([ 'To Be Determined' , '2 Minutes' , '4 Minutes' , '5 Minutes' , '10 Minutes' ], [ 'TBD' , '2 Minutes' , '4 Minutes' , '5 Minutes' , '10 Minutes' ], false, false, false);
			// display next field
			$('[s-modal-primary-header] [s-modal-primary-cancel]').before(_.template($('#collaboration-data').html(), { type : 'duration' , typeU : 'DURATION' }));
		},

		displayPenaltyTypeOptions: function() {
			this.showOptions([ 'To Be Determined' , 'Body Checking' , 'Boarding' , 'Bench Minor' , 'Cross Checking' , 'Check From Behind' , 'Charging' , 'Check To Head' , 'Hooking' , 'Holding' , 'Interference' , 'Roughing After Whistle' , 'Roughing' , 'Slashing' , 'Tripping' , 'Unsportsmanlike Conduct' , 'Agressor' , 'Broken Stick' , 'Butt End' , 'Dangerous Equipment' , 'Delay Of Game' , 'Elbowing' , 'Fighting' , 'First Off Bench' , 'Face Mask' , 'Fall On Puck' , 'Goalie Leaving Crease' , 'Head Butt' , 'Handling Puck' , 'High Sticking' , 'Illegal Equipment' , 'Ineligitimate Player' , 'Instigator' , 'Goalie Interference' , 'Kneeing' , 'Leaving Bench' , 'Removing Helmet' , 'Spearing' , 'Too Many Men' , 'Throwing Stick' ], [ 'TBD' , 'Body Checking' , 'Boarding' , 'Bench Minor' , 'Cross Checking' , 'Check From Behind' , 'Charging' , 'Check To Head' , 'Hooking' , 'Holding' , 'Interference' , 'Roughing After Whistle' , 'Roughing' , 'Slashing' , 'Tripping' , 'Unsportsmanlike Conduct' , 'Agressor' , 'Broken Stick' , 'Butt End' , 'Dangerous Equipment' , 'Delay Of Game' , 'Elbowing' , 'Fighting' , 'First Off Bench' , 'Face Mask' , 'Fall On Puck' , 'Goalie Leaving Crease' , 'Head Butt' , 'Handling Puck' , 'High Sticking' , 'Illegal Equipment' , 'Ineligitimate Player' , 'Instigator' , 'Goalie Interference' , 'Kneeing' , 'Leaving Bench' , 'Removing Helmet' , 'Spearing' , 'Too Many Men' , 'Throwing Stick'], false, false, false);
			// display next field
			$('[s-modal-primary-header] [s-modal-primary-cancel]').before(_.template($('#collaboration-data').html(), { type : 'type' , typeU : 'TYPE' }));
		},

		displayPenaltyCategoryOptions: function() {
			this.showOptions([ 'To Be Determined' , 'Misconduct' , 'Game Misconduct' , 'Gross Misconduct' , 'Match' ], [ 'TBD' , 'Misconduct' , 'Game Misconduct' , 'Gross Misconduct' , 'Match' ], false, false, false);
			// display next field
			$('[s-modal-primary-header] [s-modal-primary-cancel]').before(_.template($('#collaboration-data').html(), { type : 'category' , typeU : 'CATEGORY' }));
		},

		displayTimeOfGameOptions: function() {
			this.showOptions([ this.eventObject.minutes + ':' + this.eventObject.seconds , 'Change Time' ], [ this.eventObject.minutes + ':' + this.eventObject.seconds , 'Change Time' ], false, false, true);
			// display next field
			$('[s-modal-primary-header] [s-modal-primary-cancel]').before(_.template($('#collaboration-data').html(), { type : 'time' , typeU : 'TIME' }));
		},

		displayMinuteOptions: function() {
			var minutes = [];
			var max = 15;

			switch (this.game.time.currentPeriod) {
				case 1: max = this.game.time.dfpm; break;
				case 2: max = this.game.time.dspm; break;
				case 3: max = this.game.time.dtpm; break;
			}

			for ( var i = 0; i <= max; i++ ) minutes.push(i);
			
			this.showOptions(minutes, minutes, false, false, false);
			// display changes
			$('[data-c-time]').html('--:--');
		},

		displaySecondOptions: function() {
			var seconds = [];

			for ( var i = 0; i <= 60; i++ ) {
				if ( i < 10 ) seconds.push('0' + i);
				else seconds.push(i);
			}
			
			this.showOptions(seconds, seconds, false, false, false);
		},

		// phasing

		updatePhase: function(state) {
			switch (state) {
				case -1: this.phase = -1; break;
				case 0: this.phase = 0; break;
				case 1: this.phase++; break;
				case 2: this.phase--; break;
				default: this.phase = state; break;
			}
		},

		controlPhasing: function(e) {
			e.preventDefault();
			var data = $(e.currentTarget).attr('data-option');
			var value = $(e.currentTarget).text();

			switch (this.phase) {
				case 0:
					this.setEvent(data);
					this.displayTeamOptions();
					this.updatePhase(1);
				break;
				case 1:
					this.setParticipantsAndAdvantage(data, ( ( data === this.game.home.team.id ) ? this.game.away.team.id : this.game.home.team.id ), ( ( data === this.game.home.team.id ) ? true : false ));
					this.displayRosterOptions(this.eventObject.advantage);
					this.updatePhase(1);
				break;
				case 2:
					this.setParticipant(data, ((this.eventObject.advantage) ? this.game.home.rosterRecords : this.game.away.rosterRecords), value);
					// event
					switch (this.eventObject.event) {
						case 'Shot':
							this.setOpposingParticipant(true, this.eventObject.advantage, ((this.eventObject.advantage) ? this.game.away.rosterRecords : this.game.home.rosterRecords));
							this.displayShotTypeOptions();
							this.updatePhase(1);
						break;
						case 'Goal':
							this.setOpposingParticipant(true, this.eventObject.advantage, ((this.eventObject.advantage) ? this.game.away.rosterRecords : this.game.home.rosterRecords));
							this.displayGoalTypeOptions();
							this.updatePhase(1);
						break;
						case 'Hit':
							this.displayRosterOptions(!this.eventObject.advantage, false, [], true);
							this.updatePhase(1);
						break;
						case 'Takeaway':
							this.displayRosterOptions(!this.eventObject.advantage, false, [], true);
							this.updatePhase(1);
						break;
						case 'Penalty':
							this.displayPenaltyDurationOptions();
							this.updatePhase(1);
						break;
						case 'Faceoff':
							this.displayRosterOptions(!this.eventObject.advantage, false, [], true);
							this.updatePhase(1);
						break;
					}
				break;
				case 3:
					// event
					switch (this.eventObject.event) {
						case 'Shot':
							this.setType(data, value);
							closeModal();
							this.confirmCollaboration(this.eventObject);
						break;
						case 'Hit':
							this.setOpposingParticipant(false, undefined, (this.eventObject.advantage) ? this.game.away.rosterRecords : this.game.home.rosterRecords, data);
							closeModal();
							this.confirmCollaboration(this.eventObject);
						break;
						case 'Goal':
							this.setType(data, value);
							// finish
							if ( data == 'Penalty Shot' ) {
								this.displayTimeOfGameOptions();
								this.updatePhase(-1);
							} else {
								// finish
								this.displayRosterOptions(this.eventObject.advantage, true, [ this.eventObject.participant.identification ], 'A', 'assist-one', 'ASSIST 1');
								this.updatePhase(1);
							}
						break;
						case 'Takeaway':
							this.setOpposingParticipant(false, undefined, (this.eventObject.advantage) ? this.game.away.rosterRecords : this.game.home.rosterRecords, data);
							closeModal();
							this.confirmCollaboration(this.eventObject);
						break;
						case 'Penalty':
							this.setPenaltyDuration(data);
							this.displayPenaltyTypeOptions();
							this.updatePhase(1);
						break;
						case 'Faceoff':
							this.setOpposingParticipant(false, undefined, (this.eventObject.advantage) ? this.game.away.rosterRecords : this.game.home.rosterRecords, data);
							closeModal();
							this.confirmCollaboration(this.eventObject);
						break;
					}
				break;
				case 4:
					// event
					switch (this.eventObject.event) {
						case 'Goal':
							this.setFirstParticipant(data, ((this.eventObject.advantage) ? this.game.home.rosterRecords : this.game.away.rosterRecords ), value);

							if ( data == 'N' ) {
								this.displayTimeOfGameOptions();
								this.updatePhase(-1);
							} else {
								this.displayRosterOptions(this.eventObject.advantage, true, [ this.eventObject.participant.identification , this.eventObject.firstParticipant ], 'A', 'assist-two', 'ASSIST 2');
								this.updatePhase(1);
							}
						break;
						case 'Penalty':
							this.setType(data, value);
							this.displayPenaltyCategoryOptions();
							this.updatePhase(1);
						break;
					}
				
				break;
				case 5:
					// event
					switch (this.eventObject.event) {
						case 'Goal':
							this.setSecondParticipant(data, ( (this.eventObject.advantage) ? this.game.home.rosterRecords : this.game.away.rosterRecords ), value);
							this.displayTimeOfGameOptions();
							this.updatePhase(-1);
						break;
						case 'Penalty':
							this.setPenaltyCategory(data, value);
							this.displayTimeOfGameOptions();
							this.updatePhase(-1);
						break;
					}
				break;
				case -1:
					if ( data == 'Change Time' ) {
						this.displayMinuteOptions();
						this.updatePhase(-2);
					} else {
						this.confirmCollaboration(this.eventObject);
						this.updatePhase(0);

						$('[data-c]').remove();
						// display next field
						$('[s-modal-primary-header] [s-modal-primary-cancel]').before(_.template($('#collaboration-data').html(), { type : 'event' , typeU : 'EVENT' }));

						var minute = this.eventObject.minutes;
						var second = this.eventObject.seconds;

						if ( this.eventObject.event == 'Penalty' ) this.showOptions([ 'Extra Penalty' , 'Faceoff' ], [ 'Penalty' , 'Faceoff' ], false, false, false);
						else this.showOptions([ 'Faceoff' ], [ 'Faceoff' ], false, false, false);
						this.eventObject = new this.collaboration(this.game, this.eventObject.x, this.eventObject.y);
						// new object created with different
						this.eventObject.minutes = minute;
						this.eventObject.seconds = second;
					}
				break;
				case -2:
					this.setMinutes(data);
					this.displaySecondOptions();
					this.updatePhase(-3);
				break;
				case -3:
					this.setSeconds(data);
					this.confirmCollaboration(this.eventObject);
					this.updatePhase(0);
					
					$('[data-c]').remove();
					// display next field
					$('[s-modal-primary-header] [s-modal-primary-cancel]').before(_.template($('#collaboration-data').html(), { type : 'event' , typeU : 'EVENT' }));

					var minute = this.eventObject.minutes;
					var second = this.eventObject.seconds;

					if ( this.eventObject.event == 'Penalty' ) this.showOptions([ 'Extra Penalty' , 'Faceoff' ], [ 'Penalty' , 'Faceoff' ], false, false, false);
					else this.showOptions([ 'Faceoff' ], [ 'Faceoff' ], false, false, false);
					this.eventObject = new this.collaboration(this.game, this.eventObject.x, this.eventObject.y);
					// new object created with different
					this.eventObject.minutes = minute;
					this.eventObject.seconds = second;
				break;	
			}
		},

		confirmCollaboration: function(statistic) {
			var self = this;
			// new statistic
			var StatisticsClass = Parse.Object.extend('Statistics');
			var s = new StatisticsClass();
			// set ACL
			var ACL = new Parse.ACL();
			ACL.setWriteAccess(Parse.User.current(), true);
			ACL.setPublicReadAccess(true);
			ACL.setPublicWriteAccess(false);
			// set statistic attributes
			s.set('collaborator', Parse.User.current());
			s.set('event', statistic.event);
			s.set('game', statistic.game);
			s.set('isOfficial', statistic.isOfficial);
			s.set('league', statistic.league);
			s.set('minutes', statistic.minutes.toString());
			s.set('seconds', statistic.seconds.toString());
			s.set('period', statistic.period.toString());
			s.set('other', statistic.other);
			s.set('searchEvent', statistic.event.toLowerCase());
			s.set('advantage', ( (statistic.advantage) ? true : false ));
			s.set('x', statistic.x);
			s.set('y', statistic.y);
			s.set('participant', ( ( statistic.participant.identification == undefined ) ? undefined : {"__type":"Pointer","className":"userOnRoster","objectId":""+ statistic.participant.identification +""} ));
			s.set('participantTeam', {"__type":"Pointer","className":"Team","objectId":""+ statistic.participant.team +""});
			s.set('firstParticipant', ( ( statistic.firstParticipant == undefined ) ? undefined : {"__type":"Pointer","className":"userOnRoster","objectId":""+ statistic.firstParticipant +""} ));
			s.set('secondParticipant', ( ( statistic.secondParticipant == undefined ) ? undefined : {"__type":"Pointer","className":"userOnRoster","objectId":""+ statistic.secondParticipant +""} ));
			s.set('oParticipant', ( ( statistic.oParticipant.identification == undefined ) ? undefined : {"__type":"Pointer","className":"userOnRoster","objectId":""+ statistic.oParticipant.identification +""} ));
			s.set('oParticipantTeam', {"__type":"Pointer","className":"Team","objectId":""+ statistic.oParticipant.team +""});
			s.set('gameStatisticRecordID', statistic.gameRecord);
			s.set('teamStatisticRecordID', statistic.teamRecord);
			s.set('participantStatisticRecordID', statistic.participant.sri);
			s.set('oParticipantStatisticRecordID', statistic.oParticipant.sri);
			s.set('firstParticipantStatisticRecordID', statistic.fpsri);
			s.set('secondParticipantStatisticRecordID', statistic.spsri);
			s.setACL(ACL);	
			s.save({
				success: function(savedCollaboration) {
					// get
					var statisticQuery = new Parse.Query(Parse.Object.extend('Statistics'));
					statisticQuery.equalTo('game', self.game.o);
					statisticQuery.include('participant');
					statisticQuery.include('participant.user');
					statisticQuery.include('participantTeam');
					statisticQuery.descending('createdAt');
					statisticQuery.get(savedCollaboration.id, {
						success: function(statistic) {
							// not deleted
							if (self.verifyStatistic(statistic)) {
								// display to screen and publish
								self.organizeStatistics([ statistic ], true, true);
								// display marker
								if ( statistic.get('event') == 'Goal' || statistic.get('event') == 'Shot' ) {
									self.displayStatisticMarkers({
										id 			: statistic.id,
										x 	 		: statistic.get('x') * 100,
										y 	 		: statistic.get('y') * 100,
										advantage 	: statistic.get('advantage')
									});
								}
								// authorized
								if ( Parse.User.current().id === self.game.creator.id && statistic.get('isOfficial') ) {
									// goal
									if ( statistic.get('event') == 'Goal' ) {
										// updage score
										self.updateScore(statistic.get('advantage'));
										// publish official statistic
										self.publishOfficialGameStatistic([ statistic.get('advantage') , statistic.get('collaborator').id ]);
									}
								}
							}
						}
					});
				},
				error: function(statistic, error) {}
			});
		}
		
	});

	/*  Router
	------------------------------------ */
	
	var Router = Parse.Router.extend({
		
		routes: {
			''		 			: 'home',
			'logout'			: 'logout',
			'settings'		 	: 'settings',
			'game/:id' 			: 'game',
			'team/settings/:id' : 'teamSettings',
			'team/:id'			: 'team',
			'team/:id/add'		: 'addToTeam',
			'league/:id/invite' : 'inviteTeams',
			'league/:id'		: 'league',
			'logout'			: 'logout',
			'notifications'		: 'notifications',
			':username' 		: 'profile',
			'*actions' 			: 'notFound',
			'*actions.' 		: 'notFound',
		},
		
		// #
		home: function() {
			if ( Parse.User.current() ) { // cached user
			
				appView = new HomeView();
			
			} else { // user not cached
			
				appView = new LogInView();
			
			}
		},
		
		league: function(id) {
			if (Parse.User.current()) {
				appView = new LeagueView();
				//new LeagueView();
			} else {
				appView = new AccessDeniedView();
			}
		},
		
		logout: function() {
			// logout
			Parse.User.logOut();
			// stop history
			Parse.history.stop();

			appView = new LogInView();
		},
		
		team: function(id) {
			if (Parse.User.current()) appView = new TeamView();
			else appView = new LogInView();
		},
		
		// #/:username
		profile: function(username) {
			if (Parse.User.current()) appView = new ProfileView();
			else appView = new LogInView();
		},
		
		// #/game/:id
		game: function(id) {
			if (Parse.User.current()) appView = new GameView();
			else appView = new LogInView();
		},
		
		notifications: function() {
			if (Parse.User.current()) appView = new NotificationsView();
			else appView = new LogInView();
		}
	});
	
	
	/*  Start Scorbit
	------------------------------------ */
	
	new Router();
	Parse.history.start();


	/* Search
	------------------------------------ */


	var createTouchstart = undefined;
	var createTouchend = undefined;

	$(document).on('blur', 'input, textarea', function() {
	    setTimeout(function() {
	        window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
	    }, 0);
	});

	$('[data-mobile-search]').on('keyup', function(e) {
		if ( appView.view == 4 ) appView.search($(e.currentTarget).val());
	});

	$('[data-interactive]').on('touchend', function(e) {
		if ( touchstart === touchend ) {
			if ( appView.view == 3 ) appView.getCoordsForCollaboration(e);
		}
	});

	$('[data-interactive-play]').on('touchend', function(e) {
		if ( appView.view == 3 ) {
			if ( appView.game.creator.id === Parse.User.current().id ) {
				if (!appView.clockStatus) {
					appView.runClock();
					appView.publishGameStatus(true);
					$(e.currentTarget).html('');
				} else {
					appView.stopClock();
					appView.publishGameStatus(false);
					$(e.currentTarget).html('');
				}
				appView.clockStatus = !appView.clockStatus;
			}
		}
	});

	$('[data-interactive-adjust-timing]').on('touchend', function(e) {
		if ( appView.view == 3 ) {
			if ( appView.game.creator.id === Parse.User.current().id ) {				
				appView.stopClock();
				appView.publishGameStatus(false);
				$('[data-interactive-play]').html('');
				appView.clockStatus = !appView.clockStatus;
				appView.adjustTiming();
			}
		}
	});

	$('[data-app-modal-primary]').on('touchend', '[data-option]', function(e) {
		if ( touchstart === touchend ) {
			if ( appView.view == 3 ) appView.controlPhasing(e, $(e.currentTarget).val());
		}
	});

	$('[data-app-modal-primary]').on('touchend', '[data-timing-option]', function(e) {
		if ( touchstart === touchend ) {
			if ( appView.view == 3 ) appView.controlTimingPhasing(e, $(e.currentTarget).attr('data-timing-option'));
		}
	});

	$('.field__input').on('click', function(e) {
		e.preventDefault();
	});

	$('[s-back]').on('touchend', function(e) {
		if ( touchstart === touchend ) window.history.back();
	});

	$('[data-app-modal-secondary]').on('touchend', '[data-feed-entity]', function(e) {
		if ( touchstart === touchend ) closeSecondModal();
	});


	$('[s-search]').on('touchend', function(e) {
		if ( touchstart === touchend ) openSecondModal(_.template($('#searching-header').html(), { search : 'Search' }));
	});

	var filter = 0;
	var searchScorbit;
	var searchResults = {
		users 	: [],
		teams 	: [],
		leagues : []
	}

	$('[data-filter]').on('touchend', function(e) {
		if ( touchstart === touchend ) {
			$(e.currentTarget).addClass('nav__filter--active').siblings().removeClass('nav__filter--active');
			filter = parseInt($(e.currentTarget).attr('data-filter'));
			clearTimeout(searchScorbit);
			// value
			if ( $('#search-scorbit').val().length > 0 )
				searchingScorbit($('#search-scorbit').val(), filter);
		}
	});

	$('[s-modal-secondary]').on('keyup', '#search-scorbit', function(e) {
		clearTimeout(searchScorbit);
		// value
		if ( $(e.currentTarget).val().length > 0 )
			searchingScorbit($(e.currentTarget).val(), filter);
	});

	function searchingScorbit(query, filter) {
		searchScorbit = window.setTimeout(function() {
			// users
			if ( filter == 0 ) {
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
						$('[data-app-modal-secondary]')
							.find('[data-feed-entity]').remove();
						// display
						$('[data-app-modal-secondary]').append(_.template($('#search-result-template').html(), {results:results}));
					},
					error: function(err) {}
				});
			// teams
			} else if ( filter == 1 ) {
				// by name
				var searchForTeamByName = new Parse.Query(Parse.Object.extend('Team'));
				searchForTeamByName.startsWith('name', query);
				// by case-insensitive name
				var searchForTeamByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
				searchForTeamByNameCaseInsensitive.startsWith('searchName', query);
				// by creator by username
				var teamCreatorByUsername = new Parse.Query(Parse.User);
				teamCreatorByUsername.startsWith('username', query);
				var searchForTeamByCreatorByUsername = new Parse.Query(Parse.Object.extend('Team'));
				searchForTeamByCreatorByUsername.matchesQuery('createdBy', teamCreatorByUsername);
				// search for teams
				var searchForTeams = Parse.Query.or(searchForTeamByName, searchForTeamByNameCaseInsensitive, searchForTeamByCreatorByUsername);
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
						$('[data-app-modal-secondary]')
							.find('[data-feed-entity]').remove();
						// display
						$('[data-app-modal-secondary]').append(_.template($('#search-result-template').html(), {results:results}));
					},
					error: function(err) {}
				});
			// leagues
			} else if ( filter == 2 ) {
				// by name
				var searchForLeagueByName = new Parse.Query(Parse.Object.extend('League'));
				searchForLeagueByName.startsWith('name', query);
				// by case-insensitive name
				var searchForLeagueByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
				searchForLeagueByNameCaseInsensitive.startsWith('searchName', query);
				// by creator by username
				var leagueCreatorByUsername = new Parse.Query(Parse.User);
				leagueCreatorByUsername.startsWith('username', query);
				var searchForLeagueByCreatorByUsername = new Parse.Query(Parse.Object.extend('League'));
				searchForLeagueByCreatorByUsername.matchesQuery('createdBy', leagueCreatorByUsername);
				// search for leagues
				var searchForLeagues = Parse.Query.or(searchForLeagueByName, searchForLeagueByNameCaseInsensitive, searchForLeagueByCreatorByUsername);
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
						$('[data-app-modal-secondary]')
							.find('[data-feed-entity]').remove();
						// display
						$('[data-app-modal-secondary]').append(_.template($('#search-result-template').html(), {results:results}));
					},
					error: function(err) {}
				});
			}
		}, 400);
	}

	$('body').on('touchstart', '[data-t]', function(e) {
		touchstart = touchend = elementFromPoint(e);
	}).on('touchmove', '[data-t]', function(e) {
		touchend = undefined;
	});
			
});