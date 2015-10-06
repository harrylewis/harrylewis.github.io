/*  New Stuff
	------------------------------------ */
	
	var navigation 	= $('header[role="side-navigation"] ul');
	var $overlay 	= $('div#overlay');
	var $searchCon	= $('div#search');
	var $searchBar	= $('.n--search')
	var $searchBtn	= $('a[href="search"]');
	var $searchWrap = $('.search--wrapper');
	var $filter		= $('.search--filter');
	var $searchCanc = $('.search--cancel');
	var $filterBtn	= $('.search--filtering');
	var $setFilter	= $('.search--set-filter');
	var $search		= $('.search--searching-scorbit');
	var $searchOLay = $('.search--overlay');
	var $searchPag	= $('#search .paginate');
	var $profileBtn	= $('.n--right a, .n--options');
	var $optionsBtn	= $('.n--options');
	var $signOutBtn = $('.sign-out');
	var searchingScorbit;
	var searchEmpty = true;
	
	var createBtn	= $('button.create');
	
	
	/*  Search
	------------------------------------ */
	
	// bring up search
	$('body').on('click', 'a[href="search"]', function(e) {
		e.preventDefault();
		$searchBar.addClass('searching');
		navigation
			.children('.n--left, .n--home, .n--right')
				.addClass('hidden');
		$searchCon.addClass('searching');
		$overlay.addClass('in-view');
		$filter
			.removeClass('filtering')
			.addClass('searching');
		$filterBtn.html('&#xf0ae;');
		$searchOLay.removeClass('filtering');
	});
	
	// cancel search on overlay click
	$overlay.on('click', function() {
		setTimeout(function() {
			$searchCon.removeClass('searching');
			$overlay.removeClass('in-view on-top');
			$filter.removeClass('filtering searching')
			$filterBtn.html('&#xf0ae;');
			$searchOLay.removeClass('filtering');
			$searchBar.removeClass('searching');
			navigation
				.children('.n--left, .n--home, .n--right')
					.removeClass('hidden');
			$('.mobile-navigation').removeClass('in-view');
		}, 100);
	});
	
	// cancel search on cancel button click
	$searchCanc.on('click', function() {
		setTimeout(function() {
			$searchCon.removeClass('searching');
			$overlay.removeClass('in-view');
			$filter.removeClass('filtering searching')
			$filterBtn.html('&#xf0ae;');
			$searchOLay.removeClass('filtering');
			$searchBar.removeClass('searching');
			navigation
				.children('.n--left, .n--home, .n--right')
					.removeClass('hidden');
		}, 100);
	});
	
	// filter
	$filterBtn.on('click', function(e) {
		if ( $('.search--filter').hasClass('filtering') ) $(this).html('&#xf0ae;');
		else $(this).html('&#xe1cd;');
		$('.search--filter').toggleClass('filtering');
		$searchOLay.toggleClass('filtering');
	});
	
	// set overlay when filtering
	$searchOLay.on('click', function() {
		$(this).removeClass('filtering');
		$filter.removeClass('filtering');
		$filterBtn.html('&#xf0ae;');
	});
	
	// remove filter overlay
	$searchWrap.on('click', '.query-result', function() {
		setTimeout(function() {
			$searchCon.removeClass('searching');
			$overlay.removeClass('in-view');
			$filter.removeClass('filtering searching')
			$filterBtn.html('&#xf0ae;');
			$searchOLay.removeClass('filtering');
			$searchBar.removeClass('searching');
			navigation
				.children('.n--left, .n--home, .n--right')
					.removeClass('hidden');
		}, 200);
	});
	
	// set filter
	$setFilter.on('click', function(e) {
		$(this)
			.attr('disabled', true)
			.siblings('.search--set-filter')
				.attr('disabled', true)
				.children('span')
					.html('')
					.removeClass('indicate-filter')
						.end()
							.end()
			.children('span')
				.html('&#xe1cd;')
				.addClass('indicate-filter');
		// timeout
		setTimeout(function() {
			// hide filter
			$filter.removeClass('filtering');
			$filterBtn.html('&#xf0ae;');
			$searchOLay.removeClass('filtering');
			// re-enable filters
			$setFilter.removeAttr('disabled');
			// focus on search bar
			$search.select();
			// filter
			searchFilter = parseInt($(e.currentTarget).attr('data-filter'));
			// current value
			var currentSearchValue = $search.val() || $('.mobile .search--searching-scorbit').val();
			// if no value
			if ( currentSearchValue == '' || currentSearchValue == false ) {
				// show directive
				$searchWrap
					.children('.query-result')
						.remove()
							.end()
					.children('.loader, .paginate, .number-of-results')
						.addClass('hidden')
							.end()
					.children('.directive-message')
						.removeClass('hidden');
				// clear previous search
				window.clearTimeout(searchingScorbit);
			// if value	
			} else {
				// loading ...
				$searchWrap
					.children('.loader')
						.removeClass('hidden')
							.end()
					.children('.directive-message, .paginate, .number-of-results')
						.addClass('hidden');
				// interval
				searchInterval = 30;
				searchSkip = 0;
				// clear previous search
				window.clearTimeout(searchingScorbit);
				// set interval
				searchingScorbit = window.setTimeout(function() {
				
					if ( !( currentSearchValue == '' || currentSearchValue == false ) ) {
					
						switch ( searchFilter ) {
		
							// people
							case searchFilters.people:
								
								// by name
								var searchForUserByName = new Parse.Query(Parse.Object.extend('User'));
								searchForUserByName.startsWith( 'name' , currentSearchValue );
								
								// by case-insensitive name
								var searchForUserByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('User'));
								searchForUserByNameCaseInsensitive.startsWith( 'searchName' , currentSearchValue );
								
								// by username
								var searchForUserByUsername = new Parse.Query(Parse.Object.extend('User'));
								searchForUserByUsername.startsWith( 'username' , currentSearchValue );
								
								// by case-insensitive username
								var searchForUserByUsernameCaseInsensitive = new Parse.Query(Parse.Object.extend('User'));
								searchForUserByUsernameCaseInsensitive.startsWith( 'searchUsername' , currentSearchValue );
								
								// by hometown
								var searchForUserByHometown = new Parse.Query(Parse.Object.extend('User'));
								searchForUserByHometown.startsWith( 'hometown' , currentSearchValue );
								
								// by case-insensitive hometown
								var searchForUserByHometownCaseInsensitive = new Parse.Query(Parse.Object.extend('User'));
								searchForUserByHometownCaseInsensitive.startsWith( 'searchHometown' , currentSearchValue );
								
								var searchForUsers = Parse.Query.or( searchForUserByName , searchForUserByNameCaseInsensitive , searchForUserByUsername , searchForUserByUsernameCaseInsensitive , searchForUserByHometown , searchForUserByHometownCaseInsensitive );
								
						////////// get users
								searchForUsers.limit(searchInterval);
								searchForUsers.find({
									// success
									success: function(users) {
										// remove previous
										$searchWrap.find('article.query-result').remove();
										// if there are results
										if ( users.length > 0 ) {
											// loop through results
											for ( var r = 0; r < users.length; r++ ) {
												$searchWrap.find('.loader')
													.before('<article class="query-result"><a href="#/' + users[r].get('username') + '" class="cf"><span class="avatar-container"><span class="avatar"><img src="' + ( ( users[r].get('profilePicture') == undefined || users[r].get('profilePicture') == null ) ? 'images/default.png' : users[r].get('profilePicture').url() ) + '" /></span></span><span class="identification-container"><h5>' + users[r].get('name') + '</h5><p>@' + users[r].get('username') + '</p></span></a></article>');
											}
											// if less than interval
											if ( users.length < searchInterval ) {
												$searchWrap
													.children('.loader, .paginate, .directive-message')
														.addClass('hidden')
															.end()
													.children('.number-of-results')
														.text('No More Results')
														.removeClass('hidden');
											// if greater than interval
											} else {
												$searchWrap
													.children('.loader, .number-of-results, .directive-message')
														.addClass('hidden')
															.end()
													.children('.paginate')
														.removeClass('hidden');
											}
										// if there are no results	
										} else {
											$searchWrap
												.children('.loader, .paginate, .directive-message')
													.addClass('hidden')
														.end()
												.children('.number-of-results')
													.text('No results for "' + currentSearchValue + '". All searches are case-sensitive.')
													.removeClass('hidden');
										}
									},
									// error
									error: function(error) {
										// error
									}
								});
								
								break;
							
							// teams	
							case searchFilters.teams:
								
								// by name
								var searchForTeamByName = new Parse.Query(Parse.Object.extend('Team'));
								searchForTeamByName.startsWith( 'name' , currentSearchValue );
								
								// by case-insensitive name
								var searchForTeamByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
								searchForTeamByNameCaseInsensitive.startsWith( 'searchName' , currentSearchValue );
								
								// by age group
								var searchForTeamByAgeGroup = new Parse.Query(Parse.Object.extend('Team'));
								searchForTeamByAgeGroup.startsWith( 'ageGroup' , currentSearchValue );
								
								// by case-insensitive age group
								var searchForTeamByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
								searchForTeamByAgeGroupCaseInsensitive.startsWith( 'searchAgeGroup' , currentSearchValue );
								
								// by level
								var searchForTeamByLevel = new Parse.Query(Parse.Object.extend('Team'));
								searchForTeamByLevel.startsWith( 'level' , currentSearchValue );
								
								// by case-insensitive level
								var searchForTeamByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
								searchForTeamByLevelCaseInsensitive.startsWith( 'searchLevel' , currentSearchValue );
								
								// by year
								var searchForTeamByYear = new Parse.Query(Parse.Object.extend('Team'));
								searchForTeamByYear.startsWith( 'year' , currentSearchValue );
								
								// by hometown
								var searchForTeamByHometown = new Parse.Query(Parse.Object.extend('Team'));
								searchForTeamByHometown.startsWith( 'hometown' , currentSearchValue );
								
								// by case-insensitive hometown
								var searchForTeamByHometownCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
								searchForTeamByHometownCaseInsensitive.startsWith( 'searchHometown' , currentSearchValue );
								
								// by creator by name
								var teamCreatorByName = new Parse.Query(Parse.User);
								teamCreatorByName.startsWith( 'name' , currentSearchValue );
								var searchForTeamByCreatorByName = new Parse.Query(Parse.Object.extend('Team'));
								searchForTeamByCreatorByName.matchesQuery( 'createdBy' , teamCreatorByName );
								
								// by creator by case-insensitive name - overlaps with proceeding queries
								
								// by creator by username
								var teamCreatorByUsername = new Parse.Query(Parse.User);
								teamCreatorByUsername.startsWith( 'username' , currentSearchValue );
								var searchForTeamByCreatorByUsername = new Parse.Query(Parse.Object.extend('Team'));
								searchForTeamByCreatorByUsername.matchesQuery( 'createdBy' , teamCreatorByUsername );
								
								// by creator by case-insensitive username - overlaps
								
								var searchForTeams = Parse.Query.or( searchForTeamByName , searchForTeamByNameCaseInsensitive , searchForTeamByAgeGroup , searchForTeamByAgeGroupCaseInsensitive , searchForTeamByLevel , searchForTeamByLevelCaseInsensitive , searchForTeamByYear , searchForTeamByHometown , searchForTeamByHometownCaseInsensitive , searchForTeamByCreatorByName , searchForTeamByCreatorByUsername );
								
						////////// get teams
								searchForTeams.include('createdBy');
								searchForTeams.limit(searchInterval);
								searchForTeams.find({
									// success
									success: function(teams) {
										// remove previous
										$searchWrap.find('article.query-result').remove();
										// if there are results
										if ( teams.length > 0 ) {
											// loop through results
											for ( var r = 0; r < teams.length; r++ ) {
												$searchWrap.find('.loader')
													.before('<article class="query-result"><a href="#/team/' + teams[r].id + '" class="cf"><span class="avatar-container"><span class="avatar"><img src="' + ( ( teams[r].get('profilePicture') == undefined || teams[r].get('profilePicture') == null ) ? 'images/default.png' : teams[r].get('profilePicture').url() ) + '" /></span></span><span class="identification-container"><h5>' + teams[r].get('name') + ' <span class="category">' + ( ( teams[r].get('competitiveCategory') == '' || teams[r].get('competitiveCategory') == undefined ) ? '' : teams[r].get('competitiveCategory') ) + '</span></h5><p>Team Created By @' + teams[r].get('createdBy').attributes['username'] + '</p></span></a></article>');
											}
											// if less than interval
											if ( teams.length < searchInterval ) {
												$searchWrap
													.children('.loader, .paginate, .directive-message')
														.addClass('hidden')
															.end()
													.children('.number-of-results')
														.text('No More Results')
														.removeClass('hidden');
											// if greater than interval
											} else {
												$searchWrap
													.children('.loader, .number-of-results, .directive-message')
														.addClass('hidden')
															.end()
													.children('.paginate')
														.removeClass('hidden');
											}
										// if there are no results	
										} else {
											$searchWrap
												.children('.loader, .paginate, .directive-message')
													.addClass('hidden')
														.end()
												.children('.number-of-results')
													.text('No results for "' + currentSearchValue + '". All searches are case-sensitive.')
													.removeClass('hidden');
										}
									},
									// error
									error: function(error) {
										// error
									}
								});	
								
								break;
		
							// leagues	
							case searchFilters.leagues:
								
								// by name
								var searchForLeagueByName = new Parse.Query(Parse.Object.extend('League'));
								searchForLeagueByName.startsWith( 'name' , currentSearchValue );
								
								// by case-insensitive name
								var searchForLeagueByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
								searchForLeagueByNameCaseInsensitive.startsWith( 'searchName' , currentSearchValue );
								
								// by age group
								var searchForLeagueByAgeGroup = new Parse.Query(Parse.Object.extend('League'));
								searchForLeagueByAgeGroup.startsWith( 'ageGroup' , currentSearchValue );
								
								// by case-insensitive age group
								var searchForLeagueByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
								searchForLeagueByAgeGroupCaseInsensitive.startsWith( 'searchAgeGroup' , currentSearchValue );
								
								// by level
								var searchForLeagueByLevel = new Parse.Query(Parse.Object.extend('League'));
								searchForLeagueByLevel.startsWith( 'level' , currentSearchValue );
								
								// by year
								var searchForLeagueByYear = new Parse.Query(Parse.Object.extend('League'));
								searchForLeagueByYear.startsWith( 'year' , currentSearchValue );
								
								// by case-insensitive level
								var searchForLeagueByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
								searchForLeagueByLevelCaseInsensitive.startsWith( 'searchLevel' , currentSearchValue );
								
								// by hometown
								var searchForLeagueByHometown = new Parse.Query(Parse.Object.extend('League'));
								searchForLeagueByHometown.startsWith( 'hometown' , currentSearchValue );
								
								// by case-insensitive hometown
								var searchForLeagueByHometownCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
								searchForLeagueByHometownCaseInsensitive.startsWith( 'searchHometown' , currentSearchValue );
								
								// by creator by name
								var leagueCreatorByName = new Parse.Query(Parse.User);
								leagueCreatorByName.startsWith( 'name' , currentSearchValue );
								var searchForLeagueByCreatorByName = new Parse.Query(Parse.Object.extend('League'));
								searchForLeagueByCreatorByName.matchesQuery( 'createdBy' , leagueCreatorByName );
								
								// by creator by case-insensitive name - overlaps with proceeding queries
								
								// by creator by username
								var leagueCreatorByUsername = new Parse.Query(Parse.User);
								leagueCreatorByUsername.startsWith( 'username' , currentSearchValue );
								var searchForLeagueByCreatorByUsername = new Parse.Query(Parse.Object.extend('League'));
								searchForLeagueByCreatorByUsername.matchesQuery( 'createdBy' , leagueCreatorByUsername );
								
								// by creator by case-insensitive username - overlaps
								
								var searchForLeagues = Parse.Query.or( searchForLeagueByName , searchForLeagueByNameCaseInsensitive , searchForLeagueByAgeGroup , searchForLeagueByAgeGroupCaseInsensitive , searchForLeagueByLevel , searchForLeagueByLevelCaseInsensitive , searchForLeagueByYear , searchForLeagueByHometown , searchForLeagueByHometownCaseInsensitive , searchForLeagueByCreatorByName , searchForLeagueByCreatorByUsername );
								
						////////// get teams
								searchForLeagues.include('createdBy');
								searchForLeagues.limit(searchInterval);
								searchForLeagues.find({
									// success
									success: function(leagues) {
										// remove previous
										$searchWrap.find('article.query-result').remove();
										// if there are results
										if ( leagues.length > 0 ) {
											// loop through results
											for ( var r = 0; r < leagues.length; r++ ) {
												$searchWrap.find('.loader')
													.before('<article class="query-result"><a href="#/league/' + leagues[r].id + '" class="cf"><span class="avatar-container"><span class="avatar"><img src="' + ( ( leagues[r].get('profilePicture') == undefined || leagues[r].get('profilePicture') == null ) ? 'images/default.png' : leagues[r].get('profilePicture').url() ) + '" /></span></span><span class="identification-container"><h5>' + leagues[r].get('name') + ' <span class="category">' + ( ( leagues[r].get('competitiveCategory') == '' || leagues[r].get('competitiveCategory') == undefined ) ? '' : leagues[r].get('competitiveCategory') ) + '</span></h5><p>League Created By @' + leagues[r].get('createdBy').attributes['username'] + '</p></span></a></article>');
											}
											// if less than interval
											if ( leagues.length < searchInterval ) {
												$searchWrap
													.children('.loader, .paginate, .directive-message')
														.addClass('hidden')
															.end()
													.children('.number-of-results')
														.text('No More Results')
														.removeClass('hidden');
											// if greater than interval
											} else {
												$searchWrap
													.children('.loader, .number-of-results, .directive-message')
														.addClass('hidden')
															.end()
													.children('.paginate')
														.removeClass('hidden');
											}
										// if there are no results	
										} else {
											$searchWrap
												.children('.loader, .paginate, .directive-message')
													.addClass('hidden')
														.end()
												.children('.number-of-results')
													.text('No results for "' + currentSearchValue + '". All searches are case-sensitive.')
													.removeClass('hidden');
										}
									},
									// error
									error: function(error) {
										// error
									}
								});	
								
							break;
							
						}
					
					}
					
				}, 50);
			}
		// wait 400 ms
		}, 400);		
	});
	
	// paginate
	$searchPag.on('click', function() {
		$(this)
			.text('Loading ...')
			.attr('disabled', true);
		// current search value
		var currentSearchValue = $search.val();
		searchSkip += searchInterval;
		// set interval
		searchingScorbit = window.setTimeout(function() {
		
			if ( !( currentSearchValue == '' || currentSearchValue == false ) ) {
			
				switch ( searchFilter ) {

					// people
					case searchFilters.people:
						
						// by name
						var searchForUserByName = new Parse.Query(Parse.Object.extend('User'));
						searchForUserByName.startsWith( 'name' , currentSearchValue );
						
						// by case-insensitive name
						var searchForUserByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('User'));
						searchForUserByNameCaseInsensitive.startsWith( 'searchName' , currentSearchValue );
						
						// by username
						var searchForUserByUsername = new Parse.Query(Parse.Object.extend('User'));
						searchForUserByUsername.startsWith( 'username' , currentSearchValue );
						
						// by case-insensitive username
						var searchForUserByUsernameCaseInsensitive = new Parse.Query(Parse.Object.extend('User'));
						searchForUserByUsernameCaseInsensitive.startsWith( 'searchUsername' , currentSearchValue );
						
						// by hometown
						var searchForUserByHometown = new Parse.Query(Parse.Object.extend('User'));
						searchForUserByHometown.startsWith( 'hometown' , currentSearchValue );
						
						// by case-insensitive hometown
						var searchForUserByHometownCaseInsensitive = new Parse.Query(Parse.Object.extend('User'));
						searchForUserByHometownCaseInsensitive.startsWith( 'searchHometown' , currentSearchValue );
						
						var searchForUsers = Parse.Query.or( searchForUserByName , searchForUserByNameCaseInsensitive , searchForUserByUsername , searchForUserByUsernameCaseInsensitive , searchForUserByHometown , searchForUserByHometownCaseInsensitive );
						
				////////// get users
						searchForUsers.limit(searchInterval);
						searchForUsers.skip(searchSkip);
						searchForUsers.find({
							// success
							success: function(users) {
								$searchPag.removeAttr('disabled');
								// if there are results
								if ( users.length > 0 ) {
									// loop through results
									for ( var r = 0; r < users.length; r++ ) {
										$searchWrap.find('.loader')
											.before('<article class="query-result"><a href="#/' + users[r].get('username') + '" class="cf"><span class="avatar-container"><span class="avatar"><img src="' + ( ( users[r].get('profilePicture') == undefined || users[r].get('profilePicture') == null ) ? 'images/default.png' : users[r].get('profilePicture').url() ) + '" /></span></span><span class="identification-container"><h5>' + users[r].get('name') + '</h5><p>@' + users[r].get('username') + '</p></span></a></article>');
									}
									// if less than interval
									if ( users.length < searchInterval ) {
										$searchWrap
											.children('.paginate')
												.text('Load More Results')
													.end()
											.children('.loader, .paginate, .directive-message')
												.addClass('hidden')
													.end()
											.children('.number-of-results')
												.text('No More Results')
												.removeClass('hidden');
									// if greater than interval
									} else {
										$searchWrap
											.children('.loader, .number-of-results, .directive-message')
												.addClass('hidden')
													.end()
											.children('.paginate')
												.text('Load More Results')
												.removeClass('hidden');
									}
								// if there are no results	
								} else {
									$searchWrap
										.children('.paginate')
											.text('Load More Results')
												.end()
										.children('.loader, .paginate, .directive-message')
											.addClass('hidden')
												.end()
										.children('.number-of-results')
											.text('No More Results')
											.removeClass('hidden');
								}
							},
							// error
							error: function(err) {}
						});
						
					break;
					
					// teams	
					case searchFilters.teams:
						
						// by name
						var searchForTeamByName = new Parse.Query(Parse.Object.extend('Team'));
						searchForTeamByName.startsWith( 'name' , currentSearchValue );
						
						// by case-insensitive name
						var searchForTeamByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
						searchForTeamByNameCaseInsensitive.startsWith( 'searchName' , currentSearchValue );
						
						// by age group
						var searchForTeamByAgeGroup = new Parse.Query(Parse.Object.extend('Team'));
						searchForTeamByAgeGroup.startsWith( 'ageGroup' , currentSearchValue );
						
						// by case-insensitive age group
						var searchForTeamByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
						searchForTeamByAgeGroupCaseInsensitive.startsWith( 'searchAgeGroup' , currentSearchValue );
						
						// by level
						var searchForTeamByLevel = new Parse.Query(Parse.Object.extend('Team'));
						searchForTeamByLevel.startsWith( 'level' , currentSearchValue );
						
						// by case-insensitive level
						var searchForTeamByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
						searchForTeamByLevelCaseInsensitive.startsWith( 'searchLevel' , currentSearchValue );
						
						// by year
						var searchForTeamByYear = new Parse.Query(Parse.Object.extend('Team'));
						searchForTeamByYear.startsWith( 'year' , currentSearchValue );
						
						// by hometown
						var searchForTeamByHometown = new Parse.Query(Parse.Object.extend('Team'));
						searchForTeamByHometown.startsWith( 'hometown' , currentSearchValue );
						
						// by case-insensitive hometown
						var searchForTeamByHometownCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
						searchForTeamByHometownCaseInsensitive.startsWith( 'searchHometown' , currentSearchValue );
						
						// by creator by name
						var teamCreatorByName = new Parse.Query(Parse.User);
						teamCreatorByName.startsWith( 'name' , currentSearchValue );
						var searchForTeamByCreatorByName = new Parse.Query(Parse.Object.extend('Team'));
						searchForTeamByCreatorByName.matchesQuery( 'createdBy' , teamCreatorByName );
						
						// by creator by case-insensitive name - overlaps with proceeding queries
						
						// by creator by username
						var teamCreatorByUsername = new Parse.Query(Parse.User);
						teamCreatorByUsername.startsWith( 'username' , currentSearchValue );
						var searchForTeamByCreatorByUsername = new Parse.Query(Parse.Object.extend('Team'));
						searchForTeamByCreatorByUsername.matchesQuery( 'createdBy' , teamCreatorByUsername );
						
						// by creator by case-insensitive username - overlaps
						
						var searchForTeams = Parse.Query.or( searchForTeamByName , searchForTeamByNameCaseInsensitive , searchForTeamByAgeGroup , searchForTeamByAgeGroupCaseInsensitive , searchForTeamByLevel , searchForTeamByLevelCaseInsensitive , searchForTeamByYear , searchForTeamByHometown , searchForTeamByHometownCaseInsensitive , searchForTeamByCreatorByName , searchForTeamByCreatorByUsername );
						
				////////// get teams
						searchForTeams.include('createdBy');
						searchForTeams.limit(searchInterval);
						searchForTeams.skip(searchSkip);
						searchForTeams.find({
							// success
							success: function(teams) {
								$searchPag.removeAttr('disabled');
								// remove previous
								$searchWrap.find('article.query-result').remove();
								// if there are results
								if ( teams.length > 0 ) {
									// loop through results
									for ( var r = 0; r < teams.length; r++ ) {
										$searchWrap.find('.loader')
											.before('<article class="query-result"><a href="#/team/' + teams[r].id + '" class="cf"><span class="avatar-container"><span class="avatar"><img src="' + ( ( teams[r].get('profilePicture') == undefined || teams[r].get('profilePicture') == null ) ? 'images/default.png' : teams[r].get('profilePicture').url() ) + '" /></span></span><span class="identification-container"><h5>' + teams[r].get('name') + ' <span class="category">' + ( ( teams[r].get('competitiveCategory') == '' || teams[r].get('competitiveCategory') == undefined ) ? '' : teams[r].get('competitiveCategory') ) + '</span></h5><p>Team Created By @' + teams[r].get('createdBy').attributes['username'] + '</p></span></a></article>');
									}
									// if less than interval
									if ( teams.length < searchInterval ) {
										$searchWrap
											.children('.paginate')
												.text('Load More Results')
													.end()
											.children('.loader, .paginate, .directive-message')
												.addClass('hidden')
													.end()
											.children('.number-of-results')
												.text('No More Results')
												.removeClass('hidden');
									// if greater than interval
									} else {
										$searchWrap
											.children('.loader, .number-of-results, .directive-message')
												.addClass('hidden')
													.end()
											.children('.paginate')
												.text('Load More Results')
												.removeClass('hidden');
									}
								// if there are no results	
								} else {
									$searchWrap
										.children('.paginate')
											.text('Load More Results')
												.end()
										.children('.loader, .paginate, .directive-message')
											.addClass('hidden')
												.end()
										.children('.number-of-results')
											.text('No More Results')
											.removeClass('hidden');
								}
							},
							// error
							error: function(error) {
								// error
							}
						});	
						
						break;

					// leagues	
					case searchFilters.leagues:
						
						// by name
						var searchForLeagueByName = new Parse.Query(Parse.Object.extend('League'));
						searchForLeagueByName.startsWith( 'name' , currentSearchValue );
						
						// by case-insensitive name
						var searchForLeagueByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
						searchForLeagueByNameCaseInsensitive.startsWith( 'searchName' , currentSearchValue );
						
						// by age group
						var searchForLeagueByAgeGroup = new Parse.Query(Parse.Object.extend('League'));
						searchForLeagueByAgeGroup.startsWith( 'ageGroup' , currentSearchValue );
						
						// by case-insensitive age group
						var searchForLeagueByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
						searchForLeagueByAgeGroupCaseInsensitive.startsWith( 'searchAgeGroup' , currentSearchValue );
						
						// by level
						var searchForLeagueByLevel = new Parse.Query(Parse.Object.extend('League'));
						searchForLeagueByLevel.startsWith( 'level' , currentSearchValue );
						
						// by year
						var searchForLeagueByYear = new Parse.Query(Parse.Object.extend('League'));
						searchForLeagueByYear.startsWith( 'year' , currentSearchValue );
						
						// by case-insensitive level
						var searchForLeagueByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
						searchForLeagueByLevelCaseInsensitive.startsWith( 'searchLevel' , currentSearchValue );
						
						// by hometown
						var searchForLeagueByHometown = new Parse.Query(Parse.Object.extend('League'));
						searchForLeagueByHometown.startsWith( 'hometown' , currentSearchValue );
						
						// by case-insensitive hometown
						var searchForLeagueByHometownCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
						searchForLeagueByHometownCaseInsensitive.startsWith( 'searchHometown' , currentSearchValue );
						
						// by creator by name
						var leagueCreatorByName = new Parse.Query(Parse.User);
						leagueCreatorByName.startsWith( 'name' , currentSearchValue );
						var searchForLeagueByCreatorByName = new Parse.Query(Parse.Object.extend('League'));
						searchForLeagueByCreatorByName.matchesQuery( 'createdBy' , leagueCreatorByName );
						
						// by creator by case-insensitive name - overlaps with proceeding queries
						
						// by creator by username
						var leagueCreatorByUsername = new Parse.Query(Parse.User);
						leagueCreatorByUsername.startsWith( 'username' , currentSearchValue );
						var searchForLeagueByCreatorByUsername = new Parse.Query(Parse.Object.extend('League'));
						searchForLeagueByCreatorByUsername.matchesQuery( 'createdBy' , leagueCreatorByUsername );
						
						// by creator by case-insensitive username - overlaps
						
						var searchForLeagues = Parse.Query.or( searchForLeagueByName , searchForLeagueByNameCaseInsensitive , searchForLeagueByAgeGroup , searchForLeagueByAgeGroupCaseInsensitive , searchForLeagueByLevel , searchForLeagueByLevelCaseInsensitive , searchForLeagueByYear , searchForLeagueByHometown , searchForLeagueByHometownCaseInsensitive , searchForLeagueByCreatorByName , searchForLeagueByCreatorByUsername );
						
				////////// get teams
						searchForLeagues.include('createdBy');
						searchForTeams.limit(searchInterval);
						searchForTeams.skip(searchSkip);
						searchForLeagues.find({
							// success
							success: function(leagues) {
								$searchPag.removeAttr('disabled');
								// remove previous
								$searchWrap.find('article.query-result').remove();
								// if there are results
								if ( leagues.length > 0 ) {
									// loop through results
									for ( var r = 0; r < leagues.length; r++ ) {
										$searchWrap.find('.loader')
											.before('<article class="query-result"><a href="#/team/' + leagues[r].id + '" class="cf"><span class="avatar-container"><span class="avatar"><img src="' + ( ( leagues[r].get('profilePicture') == undefined || leagues[r].get('profilePicture') == null ) ? 'images/default.png' : leagues[r].get('profilePicture').url() ) + '" /></span></span><span class="identification-container"><h5>' + leagues[r].get('name') + ' <span class="category">' + ( ( leagues[r].get('competitiveCategory') == '' || leagues[r].get('competitiveCategory') == undefined ) ? '' : leagues[r].get('competitiveCategory') ) + '</span></h5><p>League Created By @' + leagues[r].get('createdBy').attributes['username'] + '</p></span></a></article>');
									}
									// if less than interval
									if ( leagues.length < searchInterval ) {
										$searchWrap
											.children('.paginate')
												.text('Load More Results')
													.end()
											.children('.loader, .paginate, .directive-message')
												.addClass('hidden')
													.end()
											.children('.number-of-results')
												.text('No More Results')
												.removeClass('hidden');
									// if greater than interval
									} else {
										$searchWrap
											.children('.loader, .number-of-results, .directive-message')
												.addClass('hidden')
													.end()
											.children('.paginate')
												.text('Load More Results')
												.removeClass('hidden');
									}
								// if there are no results	
								} else {
									$searchWrap
										.children('.paginate')
											.text('Load More Results')
												.end()
										.children('.loader, .paginate, .directive-message')
											.addClass('hidden')
												.end()
										.children('.number-of-results')
											.text('No More Results')
											.removeClass('hidden');
								}
							},
							// error
							error: function(error) {
								// error
							}
						});	
						
						break;
					
					// games
					case searchFilters.games:
						
						// by arena
						var searchForGameByArena = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByArena.startsWith( 'arena' , searchValue );
						
						// by case-insensitive arena
						var searchForGameByArenaCaseInsensitive = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByArenaCaseInsensitive.startsWith( 'searchArena' , searchValue );
						
						// by creator by name
						var gameCreatorByName = new Parse.Query(Parse.User);
						gameCreatorByName.startsWith( 'name' , searchValue );
						var searchForGameByCreatorByName = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByCreatorByName.matchesQuery( 'createdBy' , gameCreatorByName );
						
						// by creator by case-insensitive name - overlaps with proceeding queries
						
						// by creator by username
						var gameCreatorByUsername = new Parse.Query(Parse.User);
						gameCreatorByUsername.startsWith( 'username' , searchValue );
						var searchForGameByCreatorByUsername = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByCreatorByUsername.matchesQuery( 'createdBy' , gameCreatorByUsername );
						
						// by creator by case-insensitive username
						var gameCreatorByUsernameCaseInsensitive = new Parse.Query(Parse.User);
						gameCreatorByUsernameCaseInsensitive.startsWith( 'searchUsername' , searchValue );
						var searchForGameByCreatorByUsernameCaseInsensitive = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByCreatorByUsernameCaseInsensitive.matchesQuery( 'createdBy' , gameCreatorByUsernameCaseInsensitive );
						
						// by home team by name
						var gameHomeTeamByName = new Parse.Query(Parse.Object.extend('Team'));
						gameHomeTeamByName.startsWith( 'name' , searchValue );
						var searchForGameByHomeTeamByName = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByHomeTeamByName.matchesQuery( 'homeTeam' , gameHomeTeamByName );
						
						// by home team by case-insensitive name
						var gameHomeTeamByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
						gameHomeTeamByNameCaseInsensitive.startsWith( 'searchName' , searchValue );
						var searchForGameByHomeTeamByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByHomeTeamByNameCaseInsensitive.matchesQuery( 'homeTeam' , gameHomeTeamByNameCaseInsensitive );
						
						// by away team by name
						var gameAwayTeamByName = new Parse.Query(Parse.Object.extend('Team'));
						gameAwayTeamByName.startsWith( 'name' , searchValue );
						var searchForGameByAwayTeamByName = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByAwayTeamByName.matchesQuery( 'awayTeam' , gameAwayTeamByName );
						
						// by away team by case-insensitive name
						var gameAwayTeamByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
						gameAwayTeamByNameCaseInsensitive.startsWith( 'searchName' , searchValue );
						var searchForGameByAwayTeamByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByAwayTeamByNameCaseInsensitive.matchesQuery( 'awayTeam' , gameAwayTeamByNameCaseInsensitive );
						
						// by home team by level
						var gameHomeTeamByLevel = new Parse.Query(Parse.Object.extend('Team'));
						gameHomeTeamByLevel.startsWith( 'level' , searchValue );
						var searchForGameByHomeTeamByLevel = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByHomeTeamByLevel.matchesQuery( 'homeTeam' , gameHomeTeamByLevel );
						
						// by home team by case-insensitive level
						var gameHomeTeamByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
						gameHomeTeamByLevelCaseInsensitive.startsWith( 'searchLevel' , searchValue );
						var searchForGameByHomeTeamByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByHomeTeamByLevelCaseInsensitive.matchesQuery( 'homeTeam' , gameHomeTeamByLevelCaseInsensitive );
						
						// by away team by level
						var gameAwayTeamByLevel = new Parse.Query(Parse.Object.extend('Team'));
						gameAwayTeamByLevel.startsWith( 'level' , searchValue );
						var searchForGameByAwayTeamByLevel = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByAwayTeamByLevel.matchesQuery( 'awayTeam' , gameAwayTeamByLevel );
						
						// by away team by case-insensitive level
						var gameAwayTeamByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
						gameAwayTeamByLevelCaseInsensitive.startsWith( 'searchLevel' , searchValue );
						var searchForGameByAwayTeamByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByAwayTeamByLevelCaseInsensitive.matchesQuery( 'awayTeam' , gameAwayTeamByLevelCaseInsensitive );
						
						// by home team by age group
						var gameHomeTeamByAgeGroup = new Parse.Query(Parse.Object.extend('Team'));
						gameHomeTeamByAgeGroup.startsWith( 'ageGroup' , searchValue );
						var searchForGameByHomeTeamByAgeGroup = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByHomeTeamByAgeGroup.matchesQuery( 'homeTeam' , gameHomeTeamByAgeGroup );
						
						// by home team by case-insensitive age group
						var gameHomeTeamByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
						gameHomeTeamByAgeGroupCaseInsensitive.startsWith( 'searchAgeGroup' , searchValue );
						var searchForGameByHomeTeamByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByHomeTeamByAgeGroupCaseInsensitive.matchesQuery( 'homeTeam' , gameHomeTeamByAgeGroupCaseInsensitive );
						
						// by away team by age group
						var gameAwayTeamByAgeGroup = new Parse.Query(Parse.Object.extend('Team'));
						gameAwayTeamByAgeGroup.startsWith( 'ageGroup' , searchValue );
						var searchForGameByAwayTeamByAgeGroup = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByAwayTeamByAgeGroup.matchesQuery( 'awayTeam' , gameAwayTeamByAgeGroup );
						
						// by away team by case-insensitive age group
						var gameAwayTeamByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
						gameAwayTeamByAgeGroupCaseInsensitive.startsWith( 'searchAgeGroup' , searchValue );
						var searchForGameByAwayTeamByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByAwayTeamByAgeGroupCaseInsensitive.matchesQuery( 'awayTeam' , gameAwayTeamByAgeGroupCaseInsensitive );
						
						// by home team by year
						var gameHomeTeamByYear = new Parse.Query(Parse.Object.extend('Team'));
						gameHomeTeamByYear.startsWith( 'year' , searchValue );
						var searchForGameByHomeTeamByYear = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByHomeTeamByYear.matchesQuery( 'homeTeam' , gameHomeTeamByYear );
						
						// by away team by year
						var gameAwayTeamByYear = new Parse.Query(Parse.Object.extend('Team'));
						gameAwayTeamByYear.startsWith( 'year' , searchValue );
						var searchForGameByAwayTeamByYear = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByAwayTeamByYear.matchesQuery( 'awayTeam' , gameAwayTeamByYear );
						
						// by league by name
						var gameLeagueByName = new Parse.Query(Parse.Object.extend('League'));
						gameLeagueByName.startsWith( 'name' , searchValue );
						var searchForGameByLeagueByName = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByLeagueByName.matchesQuery( 'league' , gameLeagueByName );
						
						// by league by case-insensitive name
						var gameLeagueByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
						gameLeagueByNameCaseInsensitive.startsWith( 'searchName' , searchValue );
						var searchForGameByLeagueByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByLeagueByNameCaseInsensitive.matchesQuery( 'league' , gameLeagueByNameCaseInsensitive );
						
						// by league by level
						var gameLeagueByLevel = new Parse.Query(Parse.Object.extend('League'));
						gameLeagueByLevel.startsWith( 'level' , searchValue );
						var searchForGameByLeagueByLevel = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByLeagueByLevel.matchesQuery( 'league' , gameLeagueByLevel );
						
						// by league by case-insensitive level
						var gameLeagueByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
						gameLeagueByLevelCaseInsensitive.startsWith( 'searchLevel' , searchValue );
						var searchForGameByLeagueByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByLeagueByLevelCaseInsensitive.matchesQuery( 'league' , gameLeagueByLevelCaseInsensitive );
						
						// by league by age group
						var gameLeagueByAgeGroup = new Parse.Query(Parse.Object.extend('League'));
						gameLeagueByAgeGroup.startsWith( 'ageGroup' , searchValue );
						var searchForGameByLeagueByAgeGroup = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByLeagueByAgeGroup.matchesQuery( 'league' , gameLeagueByAgeGroup );
						
						// by league by case-insensitive age group
						var gameLeagueByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
						gameLeagueByAgeGroupCaseInsensitive.startsWith( 'searchAgeGroup' , searchValue );
						var searchForGameByLeagueByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByLeagueByAgeGroupCaseInsensitive.matchesQuery( 'league' , gameLeagueByAgeGroupCaseInsensitive );
						
						// by league by year
						var gameLeagueByYear = new Parse.Query(Parse.Object.extend('League'));
						gameLeagueByYear.startsWith( 'year' , searchValue );
						var searchForGameByLeagueByYear = new Parse.Query(Parse.Object.extend('Game'));
						searchForGameByLeagueByYear.matchesQuery( 'league' , gameLeagueByYear );
						
						var searchForGames = Parse.Query.or( searchForGameByArena , searchForGameByArenaCaseInsensitive , searchForGameByCreatorByName , searchForGameByCreatorByUsername , searchForGameByCreatorByUsernameCaseInsensitive , searchForGameByHomeTeamByName , searchForGameByHomeTeamByNameCaseInsensitive , searchForGameByAwayTeamByName , searchForGameByAwayTeamByNameCaseInsensitive , searchForGameByHomeTeamByLevel , searchForGameByHomeTeamByLevelCaseInsensitive , searchForGameByAwayTeamByLevel , searchForGameByAwayTeamByLevelCaseInsensitive , searchForGameByHomeTeamByAgeGroup , searchForGameByHomeTeamByAgeGroupCaseInsensitive , searchForGameByAwayTeamByAgeGroup , searchForGameByAwayTeamByAgeGroupCaseInsensitive , searchForGameByHomeTeamByYear , searchForGameByAwayTeamByYear , searchForGameByLeagueByName , searchForGameByLeagueByNameCaseInsensitive , searchForGameByLeagueByLevel , searchForGameByLeagueByLevelCaseInsensitive , searchForGameByLeagueByAgeGroup , searchForGameByLeagueByAgeGroupCaseInsensitive , searchForGameByLeagueByYear );
						
				////////// get games
						searchForGames.include('createdBy');
						searchForGames.include('homeTeam');
						searchForGames.include('awayTeam');		
						searchForGames.find({
							// success
							success: function(games) {
								
								console.log(games);
								
								// overview of search
								searchOverview(searchValue);
								
							},
							// error
							error: function(error) {
								// error
							}
						});
						
						break;
						
					// statistics	
					case searchFilters.statistics:
						
						// by event
						var searchForStatisticByEvent = new Parse.Query(Parse.Object.extend('Statistics'));
						searchForStatisticByEvent.startsWith( 'event' , searchValue );
						
						// by case-insensitive event
						var searchForStatisticByEventCaseInsensitive = new Parse.Query(Parse.Object.extend('Statistics'));
						searchForStatisticByEventCaseInsensitive.startsWith( 'searchEvent' , searchValue );
						
						// by creator by name
						var statisticCreatorByName = new Parse.Query(Parse.User);
						statisticCreatorByName.startsWith( 'name' , searchValue );
						var searchForStatisticByCreatorByName = new Parse.Query(Parse.Object.extend('Statistics'));
						searchForStatisticByCreatorByName.matchesQuery( 'collaborator' , statisticCreatorByName );
						
						// by creator by case-insensitive name - overlaps with proceeding queries
						
						// by creator by username
						var statisticCreatorByUsername = new Parse.Query(Parse.User);
						statisticCreatorByUsername.startsWith( 'username' , searchValue );
						var searchForStatisticByCreatorByUsername = new Parse.Query(Parse.Object.extend('Statistics'));
						searchForStatisticByCreatorByUsername.matchesQuery( 'collaborator' , statisticCreatorByUsername );
						
						// by creator by case-insensitive username
						var statisticCreatorByUsernameCaseInsensitive = new Parse.Query(Parse.User);
						statisticCreatorByUsernameCaseInsensitive.startsWith( 'searchUsername' , searchValue );
						var searchForStatisticByCreatorByUsernameCaseInsensitive = new Parse.Query(Parse.Object.extend('Statistics'));
						searchForStatisticByCreatorByUsernameCaseInsensitive.matchesQuery( 'collaborator' , statisticCreatorByUsernameCaseInsensitive );
						
						// by game by arena
						var statisticGameByArena = new Parse.Query(Parse.Object.extend('Game'));
						statisticGameByArena.startsWith( 'arena' , searchValue );
						var searchForStatisticByGameByArena = new Parse.Query(Parse.Object.extend('Statistics'));
						searchForStatisticByGameByArena.matchesQuery( 'game' , statisticGameByArena );
						
						// by game by case insensitive arena
						var statisticGameByArenaCaseInsensitive = new Parse.Query(Parse.Object.extend('Game'));
						statisticGameByArenaCaseInsensitive.startsWith( 'searchArena' , searchValue );
						var searchForStatisticByGameByArenaCaseInsensitive = new Parse.Query(Parse.Object.extend('Statistics'));
						searchForStatisticByGameByArenaCaseInsensitive.matchesQuery( 'game' , statisticGameByArenaCaseInsensitive );
						
						// by user by name
						var statisticUserByName = new Parse.Query(Parse.User);
						statisticUserByName.startsWith( 'name' , searchValue );
						var searchForStatisticByUserByName = new Parse.Query(Parse.Object.extend('Statistics'));
						searchForStatisticByUserByName.matchesQuery( 'user' , statisticUserByName );
						
						// by user by case-insensitive name - overlaps with proceeding queries
						
						// by user by username
						var statisticUserByUsername = new Parse.Query(Parse.User);
						statisticUserByUsername.startsWith( 'username' , searchValue );
						var searchForStatisticByUserByUsername = new Parse.Query(Parse.Object.extend('Statistics'));
						searchForStatisticByUserByUsername.matchesQuery( 'user' , statisticUserByUsername );
						
						// by user by case-insensitive username
						var statisticUserByUsernameCaseInsensitive = new Parse.Query(Parse.User);
						statisticUserByUsernameCaseInsensitive.startsWith( 'searchUsername' , searchValue );
						var searchForStatisticByUserByUsernameCaseInsensitive = new Parse.Query(Parse.Object.extend('Statistics'));
						searchForStatisticByUserByUsernameCaseInsensitive.matchesQuery( 'user' , statisticUserByUsernameCaseInsensitive );
						
						// by team by name
						var statisticTeamByName = new Parse.Query(Parse.Object.extend('Team'));
						statisticTeamByName.startsWith( 'name' , searchValue );
						var searchForStatisticByTeamByName = new Parse.Query(Parse.Object.extend('Statistics'));
						searchForStatisticByTeamByName.matchesQuery( 'team' , statisticTeamByName );
						
						// by team by case-insensitive name
						var statisticTeamByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
						statisticTeamByNameCaseInsensitive.startsWith( 'searchName' , searchValue );
						var searchForStatisticByTeamByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Statistics'));
						searchForStatisticByTeamByNameCaseInsensitive.matchesQuery( 'team' , statisticTeamByNameCaseInsensitive );
						
						// by team by level
						var statisticTeamByLevel = new Parse.Query(Parse.Object.extend('Team'));
						statisticTeamByLevel.startsWith( 'level' , searchValue );
						var searchForStatisticByTeamByLevel = new Parse.Query(Parse.Object.extend('Statistics'));
						searchForStatisticByTeamByLevel.matchesQuery( 'team' , statisticTeamByLevel );
						
						// by team by case-insensitive level
						var statisticTeamByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
						statisticTeamByLevelCaseInsensitive.startsWith( 'searchLevel' , searchValue );
						var searchForStatisticByTeamByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('Statistics'));
						searchForStatisticByTeamByLevelCaseInsensitive.matchesQuery( 'team' , statisticTeamByLevelCaseInsensitive );
						
						// by team by age group
						var statisticTeamByAgeGroup = new Parse.Query(Parse.Object.extend('Team'));
						statisticTeamByAgeGroup.startsWith( 'ageGroup' , searchValue );
						var searchForStatisticByTeamByAgeGroup = new Parse.Query(Parse.Object.extend('Statistics'));
						searchForStatisticByTeamByAgeGroup.matchesQuery( 'team' , statisticTeamByAgeGroup );
						
						// by team by case-insensitive age group
						var statisticTeamByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
						statisticTeamByAgeGroupCaseInsensitive.startsWith( 'searchAgeGroup' , searchValue );
						var searchForStatisticByTeamByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('Statistics'));
						searchForStatisticByTeamByAgeGroupCaseInsensitive.matchesQuery( 'team' , statisticTeamByAgeGroupCaseInsensitive );
						
						// by team by year
						var statisticTeamByYear = new Parse.Query(Parse.Object.extend('Team'));
						statisticTeamByYear.startsWith( 'year' , searchValue );
						var searchForStatisticByTeamByYear = new Parse.Query(Parse.Object.extend('Statistics'));
						searchForStatisticByTeamByYear.matchesQuery( 'team' , statisticTeamByYear );
						
						// by league by name
						var statisticLeagueByName = new Parse.Query(Parse.Object.extend('League'));
						statisticLeagueByName.startsWith( 'name' , searchValue );
						var searchForStatisticByLeagueByName = new Parse.Query(Parse.Object.extend('Statistics'));
						searchForStatisticByLeagueByName.matchesQuery( 'league' , statisticLeagueByName );
						
						// by league by case-insensitive name
						var statisticLeagueByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
						statisticLeagueByNameCaseInsensitive.startsWith( 'searchName' , searchValue );
						var searchForStatisticByLeagueByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Statistics'));
						searchForStatisticByLeagueByNameCaseInsensitive.matchesQuery( 'league' , statisticLeagueByNameCaseInsensitive );
						
						// by league by level
						var statisticLeagueByLevel = new Parse.Query(Parse.Object.extend('League'));
						statisticLeagueByLevel.startsWith( 'level' , searchValue );
						var searchForStatisticByLeagueByLevel = new Parse.Query(Parse.Object.extend('Statistics'));
						searchForStatisticByLeagueByLevel.matchesQuery( 'league' , statisticLeagueByLevel );
						
						// by league by case-insensitive level
						var statisticLeagueByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
						statisticLeagueByLevelCaseInsensitive.startsWith( 'searchLevel' , searchValue );
						var searchForStatisticByLeagueByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('Statistics'));
						searchForStatisticByLeagueByLevelCaseInsensitive.matchesQuery( 'league' , statisticLeagueByLevelCaseInsensitive );
						
						// by league by age group
						var statisticLeagueByAgeGroup = new Parse.Query(Parse.Object.extend('League'));
						statisticLeagueByAgeGroup.startsWith( 'ageGroup' , searchValue );
						var searchForStatisticByLeagueByAgeGroup = new Parse.Query(Parse.Object.extend('Statistics'));
						searchForStatisticByLeagueByAgeGroup.matchesQuery( 'league' , statisticLeagueByAgeGroup );
						
						// by league by case-insensitive age group
						var statisticLeagueByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
						statisticLeagueByAgeGroupCaseInsensitive.startsWith( 'searchAgeGroup' , searchValue );
						var searchForStatisticByLeagueByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('Statistics'));
						searchForStatisticByLeagueByAgeGroupCaseInsensitive.matchesQuery( 'league' , statisticLeagueByAgeGroupCaseInsensitive );
						
						// by team by year
						var statisticLeagueByYear = new Parse.Query(Parse.Object.extend('League'));
						statisticLeagueByYear.startsWith( 'year' , searchValue );
						var searchForStatisticByLeagueByYear = new Parse.Query(Parse.Object.extend('Statistics'));
						searchForStatisticByLeagueByYear.matchesQuery( 'league' , statisticLeagueByYear );
						
						var searchForStatistics = Parse.Query.or( searchForStatisticByEvent , searchForStatisticByEventCaseInsensitive , searchForStatisticByCreatorByName , searchForStatisticByCreatorByUsername , searchForStatisticByCreatorByUsernameCaseInsensitive , searchForStatisticByGameByArena , searchForStatisticByGameByArenaCaseInsensitive , searchForStatisticByUserByName , searchForStatisticByUserByUsername , searchForStatisticByUserByUsernameCaseInsensitive , searchForStatisticByTeamByName , searchForStatisticByTeamByNameCaseInsensitive , searchForStatisticByTeamByLevel , searchForStatisticByTeamByLevelCaseInsensitive , searchForStatisticByTeamByAgeGroup , searchForStatisticByTeamByAgeGroupCaseInsensitive , searchForStatisticByTeamByYear , searchForStatisticByLeagueByName , searchForStatisticByLeagueByNameCaseInsensitive , searchForStatisticByLeagueByLevel , searchForStatisticByLeagueByLevelCaseInsensitive , searchForStatisticByLeagueByAgeGroup , searchForStatisticByLeagueByAgeGroupCaseInsensitive , searchForStatisticByLeagueByYear );
						
				////////// get statistics
						searchForStatistics.find({
							// success
							success: function(statistics) {
								
								console.log(statistics);
								
								// overview of search
								searchOverview(searchValue);
								
							},
							// error
							error: function(error) {
								// error
							}
						});	
						
						break;
						
					default:
						console.log('yo');
					
						break;
					
				}
			
			}
			
		}, 50);
	});
	
	// search
	$search.on('keyup', function(e) {
		// get current value
		var currentSearchValue = $(e.currentTarget).val();
		$filter.removeClass('filtering');
		$filterBtn.html('&#xf0ae;');
		// if no value
		if ( currentSearchValue == '' || currentSearchValue == false ) {
			// search empty
			searchEmpty = true;
			// show directive
			$searchWrap
				.find('.query-result')
					.remove()
						.end()
				.children('.loader, .paginate, .number-of-results')
					.removeClass('loading')
					.addClass('hidden')
						.end()
				.children('.directive-message')
					.removeClass('hidden');
			// clear previous search
			window.clearTimeout(searchingScorbit);
		// if value	
		} else {
			// if search is empty
			if ( searchEmpty ) {
				// search not empty
				searchEmpty = false;
				// loading
				if ( iphone )
					setTimeout(function() { $searchWrap.children('.loader').addClass('loading') }, 150);
				else
					$searchWrap.children('.loader').addClass('loading');
			}
			// loading ...
			$searchWrap
				.find('.query-result')
					.remove()
						.end()
				.children('.loader')
					.removeClass('hidden')
						.end()
				.children('.directive-message, .paginate, .number-of-results')
					.addClass('hidden');
			// clear previous search
			window.clearTimeout(searchingScorbit);
			// interval
			searchInterval = 30;
			searchSkip = 0;
			// set interval
			searchingScorbit = window.setTimeout(function() {
			
				if ( !( currentSearchValue == '' || currentSearchValue == false ) ) {
				
					switch ( searchFilter ) {
	
						// people
						case searchFilters.people:
							
							// by name
							var searchForUserByName = new Parse.Query(Parse.Object.extend('User'));
							searchForUserByName.startsWith( 'name' , currentSearchValue );
							
							// by case-insensitive name
							var searchForUserByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('User'));
							searchForUserByNameCaseInsensitive.startsWith( 'searchName' , currentSearchValue );
							
							// by username
							var searchForUserByUsername = new Parse.Query(Parse.Object.extend('User'));
							searchForUserByUsername.startsWith( 'username' , currentSearchValue );
							
							// by case-insensitive username
							var searchForUserByUsernameCaseInsensitive = new Parse.Query(Parse.Object.extend('User'));
							searchForUserByUsernameCaseInsensitive.startsWith( 'searchUsername' , currentSearchValue );
							
							// by hometown
							var searchForUserByHometown = new Parse.Query(Parse.Object.extend('User'));
							searchForUserByHometown.startsWith( 'hometown' , currentSearchValue );
							
							// by case-insensitive hometown
							var searchForUserByHometownCaseInsensitive = new Parse.Query(Parse.Object.extend('User'));
							searchForUserByHometownCaseInsensitive.startsWith( 'searchHometown' , currentSearchValue );
							
							var searchForUsers = Parse.Query.or( searchForUserByName , searchForUserByNameCaseInsensitive , searchForUserByUsername , searchForUserByUsernameCaseInsensitive , searchForUserByHometown , searchForUserByHometownCaseInsensitive );
							
					////////// get users
							searchForUsers.limit(searchInterval);
							searchForUsers.find({
								// success
								success: function(users) {
									// remove previous
									$searchWrap.find('article.query-result').remove();
									// if there are results
									if ( users.length > 0 ) {
										// loop through results
										for ( var r = 0; r < users.length; r++ ) {
											$searchWrap.find('.loader')
												.before('<article class="query-result"><a href="#/' + users[r].get('username') + '" class="cf"><span class="avatar-container"><span class="avatar"><img src="' + ( ( users[r].get('profilePicture') == undefined || users[r].get('profilePicture') == null ) ? 'images/default.png' : users[r].get('profilePicture').url() ) + '" /></span></span><span class="identification-container"><h5>' + users[r].get('name') + '</h5><p>@' + users[r].get('username') + '</p></span></a></article>');
										}
										// if less than interval
										if ( users.length < searchInterval ) {
											$searchWrap
												.children('.loader, .paginate, .directive-message')
													.addClass('hidden')
														.end()
												.children('.number-of-results')
													.text('No More Results')
													.removeClass('hidden');
										// if greater than interval
										} else {
											$searchWrap
												.children('.loader, .number-of-results, .directive-message')
													.addClass('hidden')
														.end()
												.children('.paginate')
													.removeClass('hidden');
										}
									// if there are no results	
									} else {
										$searchWrap
											.children('.loader, .paginate, .directive-message')
												.addClass('hidden')
													.end()
											.children('.number-of-results')
												.text('No results for "' + currentSearchValue + '". All searches are case-sensitive.')
												.removeClass('hidden');
									}
								},
								// error
								error: function(err) {}
							});
							
						break;
						
						// teams	
						case searchFilters.teams:
							
							// by name
							var searchForTeamByName = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByName.startsWith( 'name' , currentSearchValue );
							
							// by case-insensitive name
							var searchForTeamByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByNameCaseInsensitive.startsWith( 'searchName' , currentSearchValue );
							
							// by age group
							var searchForTeamByAgeGroup = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByAgeGroup.startsWith( 'ageGroup' , currentSearchValue );
							
							// by case-insensitive age group
							var searchForTeamByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByAgeGroupCaseInsensitive.startsWith( 'searchAgeGroup' , currentSearchValue );
							
							// by level
							var searchForTeamByLevel = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByLevel.startsWith( 'level' , currentSearchValue );
							
							// by case-insensitive level
							var searchForTeamByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByLevelCaseInsensitive.startsWith( 'searchLevel' , currentSearchValue );
							
							// by year
							var searchForTeamByYear = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByYear.startsWith( 'year' , currentSearchValue );
							
							// by hometown
							var searchForTeamByHometown = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByHometown.startsWith( 'hometown' , currentSearchValue );
							
							// by case-insensitive hometown
							var searchForTeamByHometownCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByHometownCaseInsensitive.startsWith( 'searchHometown' , currentSearchValue );
							
							// by creator by name
							var teamCreatorByName = new Parse.Query(Parse.User);
							teamCreatorByName.startsWith( 'name' , currentSearchValue );
							var searchForTeamByCreatorByName = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByCreatorByName.matchesQuery( 'createdBy' , teamCreatorByName );
							
							// by creator by case-insensitive name - overlaps with proceeding queries
							
							// by creator by username
							var teamCreatorByUsername = new Parse.Query(Parse.User);
							teamCreatorByUsername.startsWith( 'username' , currentSearchValue );
							var searchForTeamByCreatorByUsername = new Parse.Query(Parse.Object.extend('Team'));
							searchForTeamByCreatorByUsername.matchesQuery( 'createdBy' , teamCreatorByUsername );
							
							// by creator by case-insensitive username - overlaps
							
							var searchForTeams = Parse.Query.or( searchForTeamByName , searchForTeamByNameCaseInsensitive , searchForTeamByAgeGroup , searchForTeamByAgeGroupCaseInsensitive , searchForTeamByLevel , searchForTeamByLevelCaseInsensitive , searchForTeamByYear , searchForTeamByHometown , searchForTeamByHometownCaseInsensitive , searchForTeamByCreatorByName , searchForTeamByCreatorByUsername );
							
					////////// get teams
							searchForTeams.include('createdBy');
							searchForTeams.limit(searchInterval);
							searchForTeams.find({
								// success
								success: function(teams) {
									// remove previous
									$searchWrap.find('article.query-result').remove();
									// if there are results
									if ( teams.length > 0 ) {
										// loop through results
										for ( var r = 0; r < teams.length; r++ ) {
											$searchWrap.find('.loader')
												.before('<article class="query-result"><a href="#/team/' + teams[r].id + '" class="cf"><span class="avatar-container"><span class="avatar"><img src="' + ( ( teams[r].get('profilePicture') == undefined || teams[r].get('profilePicture') == null ) ? 'images/default.png' : teams[r].get('profilePicture').url() ) + '" /></span></span><span class="identification-container"><h5>' + teams[r].get('name') + ' <span class="category">' + ( ( teams[r].get('competitiveCategory') == '' || teams[r].get('competitiveCategory') == undefined ) ? '' : teams[r].get('competitiveCategory') ) + '</span></h5><p>Team Created By @' + teams[r].get('createdBy').attributes['username'] + '</p></span></a></article>');
										}
										// if less than interval
										if ( teams.length < searchInterval ) {
											$searchWrap
												.children('.loader, .paginate, .directive-message')
													.addClass('hidden')
														.end()
												.children('.number-of-results')
													.text('No More Results')
													.removeClass('hidden');
										// if greater than interval
										} else {
											$searchWrap
												.children('.loader, .number-of-results, .directive-message')
													.addClass('hidden')
														.end()
												.children('.paginate')
													.removeClass('hidden');
										}
									// if there are no results	
									} else {
										$searchWrap
											.children('.loader, .paginate, .directive-message')
												.addClass('hidden')
													.end()
											.children('.number-of-results')
												.text('No results for "' + currentSearchValue + '". All searches are case-sensitive.')
												.removeClass('hidden');
									}
								},
								// error
								error: function(error) {
									// error
								}
							});	
							
							break;
	
						// leagues	
						case searchFilters.leagues:
							
							// by name
							var searchForLeagueByName = new Parse.Query(Parse.Object.extend('League'));
							searchForLeagueByName.startsWith( 'name' , currentSearchValue );
							
							// by case-insensitive name
							var searchForLeagueByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
							searchForLeagueByNameCaseInsensitive.startsWith( 'searchName' , currentSearchValue );
							
							// by age group
							var searchForLeagueByAgeGroup = new Parse.Query(Parse.Object.extend('League'));
							searchForLeagueByAgeGroup.startsWith( 'ageGroup' , currentSearchValue );
							
							// by case-insensitive age group
							var searchForLeagueByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
							searchForLeagueByAgeGroupCaseInsensitive.startsWith( 'searchAgeGroup' , currentSearchValue );
							
							// by level
							var searchForLeagueByLevel = new Parse.Query(Parse.Object.extend('League'));
							searchForLeagueByLevel.startsWith( 'level' , currentSearchValue );
							
							// by year
							var searchForLeagueByYear = new Parse.Query(Parse.Object.extend('League'));
							searchForLeagueByYear.startsWith( 'year' , currentSearchValue );
							
							// by case-insensitive level
							var searchForLeagueByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
							searchForLeagueByLevelCaseInsensitive.startsWith( 'searchLevel' , currentSearchValue );
							
							// by hometown
							var searchForLeagueByHometown = new Parse.Query(Parse.Object.extend('League'));
							searchForLeagueByHometown.startsWith( 'hometown' , currentSearchValue );
							
							// by case-insensitive hometown
							var searchForLeagueByHometownCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
							searchForLeagueByHometownCaseInsensitive.startsWith( 'searchHometown' , currentSearchValue );
							
							// by creator by name
							var leagueCreatorByName = new Parse.Query(Parse.User);
							leagueCreatorByName.startsWith( 'name' , currentSearchValue );
							var searchForLeagueByCreatorByName = new Parse.Query(Parse.Object.extend('League'));
							searchForLeagueByCreatorByName.matchesQuery( 'createdBy' , leagueCreatorByName );
							
							// by creator by case-insensitive name - overlaps with proceeding queries
							
							// by creator by username
							var leagueCreatorByUsername = new Parse.Query(Parse.User);
							leagueCreatorByUsername.startsWith( 'username' , currentSearchValue );
							var searchForLeagueByCreatorByUsername = new Parse.Query(Parse.Object.extend('League'));
							searchForLeagueByCreatorByUsername.matchesQuery( 'createdBy' , leagueCreatorByUsername );
							
							// by creator by case-insensitive username - overlaps
							
							var searchForLeagues = Parse.Query.or( searchForLeagueByName , searchForLeagueByNameCaseInsensitive , searchForLeagueByAgeGroup , searchForLeagueByAgeGroupCaseInsensitive , searchForLeagueByLevel , searchForLeagueByLevelCaseInsensitive , searchForLeagueByYear , searchForLeagueByHometown , searchForLeagueByHometownCaseInsensitive , searchForLeagueByCreatorByName , searchForLeagueByCreatorByUsername );
							
					////////// get leagues
							searchForLeagues.include('createdBy');
							searchForLeagues.limit(searchInterval);
							searchForLeagues.find({
								// success
								success: function(leagues) {
									// remove previous
									$searchWrap.find('article.query-result').remove();
									// if there are results
									if ( leagues.length > 0 ) {
										// loop through results
										for ( var r = 0; r < leagues.length; r++ ) {
											$searchWrap.find('.loader')
												.before('<article class="query-result"><a href="#/league/' + leagues[r].id + '" class="cf"><span class="avatar-container"><span class="avatar"><img src="' + ( ( leagues[r].get('profilePicture') == undefined || leagues[r].get('profilePicture') == null ) ? 'images/default.png' : leagues[r].get('profilePicture').url() ) + '" /></span></span><span class="identification-container"><h5>' + leagues[r].get('name') + ' <span class="category">' + ( ( leagues[r].get('competitiveCategory') == '' || leagues[r].get('competitiveCategory') == undefined ) ? '' : leagues[r].get('competitiveCategory') ) + '</span></h5><p>League Created By @' + leagues[r].get('createdBy').attributes['username'] + '</p></span></a></article>');
										}
										// if less than interval
										if ( leagues.length < searchInterval ) {
											$searchWrap
												.children('.loader, .paginate, .directive-message')
													.addClass('hidden')
														.end()
												.children('.number-of-results')
													.text('No More Results')
													.removeClass('hidden');
										// if greater than interval
										} else {
											$searchWrap
												.children('.loader, .number-of-results, .directive-message')
													.addClass('hidden')
														.end()
												.children('.paginate')
													.removeClass('hidden');
										}
									// if there are no results	
									} else {
										$searchWrap
											.children('.loader, .paginate, .directive-message')
												.addClass('hidden')
													.end()
											.children('.number-of-results')
												.text('No results for "' + currentSearchValue + '". All searches are case-sensitive.')
												.removeClass('hidden');
									}
								},
								// error
								error: function(error) {
									// error
								}
							});	
							
							break;
						
						// games
						case searchFilters.games:
							
							// by arena
							var searchForGameByArena = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByArena.startsWith( 'arena' , searchValue );
							
							// by case-insensitive arena
							var searchForGameByArenaCaseInsensitive = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByArenaCaseInsensitive.startsWith( 'searchArena' , searchValue );
							
							// by creator by name
							var gameCreatorByName = new Parse.Query(Parse.User);
							gameCreatorByName.startsWith( 'name' , searchValue );
							var searchForGameByCreatorByName = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByCreatorByName.matchesQuery( 'createdBy' , gameCreatorByName );
							
							// by creator by case-insensitive name - overlaps with proceeding queries
							
							// by creator by username
							var gameCreatorByUsername = new Parse.Query(Parse.User);
							gameCreatorByUsername.startsWith( 'username' , searchValue );
							var searchForGameByCreatorByUsername = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByCreatorByUsername.matchesQuery( 'createdBy' , gameCreatorByUsername );
							
							// by creator by case-insensitive username
							var gameCreatorByUsernameCaseInsensitive = new Parse.Query(Parse.User);
							gameCreatorByUsernameCaseInsensitive.startsWith( 'searchUsername' , searchValue );
							var searchForGameByCreatorByUsernameCaseInsensitive = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByCreatorByUsernameCaseInsensitive.matchesQuery( 'createdBy' , gameCreatorByUsernameCaseInsensitive );
							
							// by home team by name
							var gameHomeTeamByName = new Parse.Query(Parse.Object.extend('Team'));
							gameHomeTeamByName.startsWith( 'name' , searchValue );
							var searchForGameByHomeTeamByName = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByHomeTeamByName.matchesQuery( 'homeTeam' , gameHomeTeamByName );
							
							// by home team by case-insensitive name
							var gameHomeTeamByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
							gameHomeTeamByNameCaseInsensitive.startsWith( 'searchName' , searchValue );
							var searchForGameByHomeTeamByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByHomeTeamByNameCaseInsensitive.matchesQuery( 'homeTeam' , gameHomeTeamByNameCaseInsensitive );
							
							// by away team by name
							var gameAwayTeamByName = new Parse.Query(Parse.Object.extend('Team'));
							gameAwayTeamByName.startsWith( 'name' , searchValue );
							var searchForGameByAwayTeamByName = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByAwayTeamByName.matchesQuery( 'awayTeam' , gameAwayTeamByName );
							
							// by away team by case-insensitive name
							var gameAwayTeamByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
							gameAwayTeamByNameCaseInsensitive.startsWith( 'searchName' , searchValue );
							var searchForGameByAwayTeamByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByAwayTeamByNameCaseInsensitive.matchesQuery( 'awayTeam' , gameAwayTeamByNameCaseInsensitive );
							
							// by home team by level
							var gameHomeTeamByLevel = new Parse.Query(Parse.Object.extend('Team'));
							gameHomeTeamByLevel.startsWith( 'level' , searchValue );
							var searchForGameByHomeTeamByLevel = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByHomeTeamByLevel.matchesQuery( 'homeTeam' , gameHomeTeamByLevel );
							
							// by home team by case-insensitive level
							var gameHomeTeamByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
							gameHomeTeamByLevelCaseInsensitive.startsWith( 'searchLevel' , searchValue );
							var searchForGameByHomeTeamByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByHomeTeamByLevelCaseInsensitive.matchesQuery( 'homeTeam' , gameHomeTeamByLevelCaseInsensitive );
							
							// by away team by level
							var gameAwayTeamByLevel = new Parse.Query(Parse.Object.extend('Team'));
							gameAwayTeamByLevel.startsWith( 'level' , searchValue );
							var searchForGameByAwayTeamByLevel = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByAwayTeamByLevel.matchesQuery( 'awayTeam' , gameAwayTeamByLevel );
							
							// by away team by case-insensitive level
							var gameAwayTeamByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
							gameAwayTeamByLevelCaseInsensitive.startsWith( 'searchLevel' , searchValue );
							var searchForGameByAwayTeamByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByAwayTeamByLevelCaseInsensitive.matchesQuery( 'awayTeam' , gameAwayTeamByLevelCaseInsensitive );
							
							// by home team by age group
							var gameHomeTeamByAgeGroup = new Parse.Query(Parse.Object.extend('Team'));
							gameHomeTeamByAgeGroup.startsWith( 'ageGroup' , searchValue );
							var searchForGameByHomeTeamByAgeGroup = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByHomeTeamByAgeGroup.matchesQuery( 'homeTeam' , gameHomeTeamByAgeGroup );
							
							// by home team by case-insensitive age group
							var gameHomeTeamByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
							gameHomeTeamByAgeGroupCaseInsensitive.startsWith( 'searchAgeGroup' , searchValue );
							var searchForGameByHomeTeamByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByHomeTeamByAgeGroupCaseInsensitive.matchesQuery( 'homeTeam' , gameHomeTeamByAgeGroupCaseInsensitive );
							
							// by away team by age group
							var gameAwayTeamByAgeGroup = new Parse.Query(Parse.Object.extend('Team'));
							gameAwayTeamByAgeGroup.startsWith( 'ageGroup' , searchValue );
							var searchForGameByAwayTeamByAgeGroup = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByAwayTeamByAgeGroup.matchesQuery( 'awayTeam' , gameAwayTeamByAgeGroup );
							
							// by away team by case-insensitive age group
							var gameAwayTeamByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
							gameAwayTeamByAgeGroupCaseInsensitive.startsWith( 'searchAgeGroup' , searchValue );
							var searchForGameByAwayTeamByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByAwayTeamByAgeGroupCaseInsensitive.matchesQuery( 'awayTeam' , gameAwayTeamByAgeGroupCaseInsensitive );
							
							// by home team by year
							var gameHomeTeamByYear = new Parse.Query(Parse.Object.extend('Team'));
							gameHomeTeamByYear.startsWith( 'year' , searchValue );
							var searchForGameByHomeTeamByYear = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByHomeTeamByYear.matchesQuery( 'homeTeam' , gameHomeTeamByYear );
							
							// by away team by year
							var gameAwayTeamByYear = new Parse.Query(Parse.Object.extend('Team'));
							gameAwayTeamByYear.startsWith( 'year' , searchValue );
							var searchForGameByAwayTeamByYear = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByAwayTeamByYear.matchesQuery( 'awayTeam' , gameAwayTeamByYear );
							
							// by league by name
							var gameLeagueByName = new Parse.Query(Parse.Object.extend('League'));
							gameLeagueByName.startsWith( 'name' , searchValue );
							var searchForGameByLeagueByName = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByLeagueByName.matchesQuery( 'league' , gameLeagueByName );
							
							// by league by case-insensitive name
							var gameLeagueByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
							gameLeagueByNameCaseInsensitive.startsWith( 'searchName' , searchValue );
							var searchForGameByLeagueByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByLeagueByNameCaseInsensitive.matchesQuery( 'league' , gameLeagueByNameCaseInsensitive );
							
							// by league by level
							var gameLeagueByLevel = new Parse.Query(Parse.Object.extend('League'));
							gameLeagueByLevel.startsWith( 'level' , searchValue );
							var searchForGameByLeagueByLevel = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByLeagueByLevel.matchesQuery( 'league' , gameLeagueByLevel );
							
							// by league by case-insensitive level
							var gameLeagueByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
							gameLeagueByLevelCaseInsensitive.startsWith( 'searchLevel' , searchValue );
							var searchForGameByLeagueByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByLeagueByLevelCaseInsensitive.matchesQuery( 'league' , gameLeagueByLevelCaseInsensitive );
							
							// by league by age group
							var gameLeagueByAgeGroup = new Parse.Query(Parse.Object.extend('League'));
							gameLeagueByAgeGroup.startsWith( 'ageGroup' , searchValue );
							var searchForGameByLeagueByAgeGroup = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByLeagueByAgeGroup.matchesQuery( 'league' , gameLeagueByAgeGroup );
							
							// by league by case-insensitive age group
							var gameLeagueByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
							gameLeagueByAgeGroupCaseInsensitive.startsWith( 'searchAgeGroup' , searchValue );
							var searchForGameByLeagueByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByLeagueByAgeGroupCaseInsensitive.matchesQuery( 'league' , gameLeagueByAgeGroupCaseInsensitive );
							
							// by league by year
							var gameLeagueByYear = new Parse.Query(Parse.Object.extend('League'));
							gameLeagueByYear.startsWith( 'year' , searchValue );
							var searchForGameByLeagueByYear = new Parse.Query(Parse.Object.extend('Game'));
							searchForGameByLeagueByYear.matchesQuery( 'league' , gameLeagueByYear );
							
							var searchForGames = Parse.Query.or( searchForGameByArena , searchForGameByArenaCaseInsensitive , searchForGameByCreatorByName , searchForGameByCreatorByUsername , searchForGameByCreatorByUsernameCaseInsensitive , searchForGameByHomeTeamByName , searchForGameByHomeTeamByNameCaseInsensitive , searchForGameByAwayTeamByName , searchForGameByAwayTeamByNameCaseInsensitive , searchForGameByHomeTeamByLevel , searchForGameByHomeTeamByLevelCaseInsensitive , searchForGameByAwayTeamByLevel , searchForGameByAwayTeamByLevelCaseInsensitive , searchForGameByHomeTeamByAgeGroup , searchForGameByHomeTeamByAgeGroupCaseInsensitive , searchForGameByAwayTeamByAgeGroup , searchForGameByAwayTeamByAgeGroupCaseInsensitive , searchForGameByHomeTeamByYear , searchForGameByAwayTeamByYear , searchForGameByLeagueByName , searchForGameByLeagueByNameCaseInsensitive , searchForGameByLeagueByLevel , searchForGameByLeagueByLevelCaseInsensitive , searchForGameByLeagueByAgeGroup , searchForGameByLeagueByAgeGroupCaseInsensitive , searchForGameByLeagueByYear );
							
					////////// get games
							searchForGames.include('createdBy');
							searchForGames.include('homeTeam');
							searchForGames.include('awayTeam');		
							searchForGames.find({
								// success
								success: function(games) {
									
									console.log(games);
									
									// overview of search
									searchOverview(searchValue);
									
								},
								// error
								error: function(error) {
									// error
								}
							});
							
							break;
							
						// statistics	
						case searchFilters.statistics:
							
							// by event
							var searchForStatisticByEvent = new Parse.Query(Parse.Object.extend('Statistics'));
							searchForStatisticByEvent.startsWith( 'event' , searchValue );
							
							// by case-insensitive event
							var searchForStatisticByEventCaseInsensitive = new Parse.Query(Parse.Object.extend('Statistics'));
							searchForStatisticByEventCaseInsensitive.startsWith( 'searchEvent' , searchValue );
							
							// by creator by name
							var statisticCreatorByName = new Parse.Query(Parse.User);
							statisticCreatorByName.startsWith( 'name' , searchValue );
							var searchForStatisticByCreatorByName = new Parse.Query(Parse.Object.extend('Statistics'));
							searchForStatisticByCreatorByName.matchesQuery( 'collaborator' , statisticCreatorByName );
							
							// by creator by case-insensitive name - overlaps with proceeding queries
							
							// by creator by username
							var statisticCreatorByUsername = new Parse.Query(Parse.User);
							statisticCreatorByUsername.startsWith( 'username' , searchValue );
							var searchForStatisticByCreatorByUsername = new Parse.Query(Parse.Object.extend('Statistics'));
							searchForStatisticByCreatorByUsername.matchesQuery( 'collaborator' , statisticCreatorByUsername );
							
							// by creator by case-insensitive username
							var statisticCreatorByUsernameCaseInsensitive = new Parse.Query(Parse.User);
							statisticCreatorByUsernameCaseInsensitive.startsWith( 'searchUsername' , searchValue );
							var searchForStatisticByCreatorByUsernameCaseInsensitive = new Parse.Query(Parse.Object.extend('Statistics'));
							searchForStatisticByCreatorByUsernameCaseInsensitive.matchesQuery( 'collaborator' , statisticCreatorByUsernameCaseInsensitive );
							
							// by game by arena
							var statisticGameByArena = new Parse.Query(Parse.Object.extend('Game'));
							statisticGameByArena.startsWith( 'arena' , searchValue );
							var searchForStatisticByGameByArena = new Parse.Query(Parse.Object.extend('Statistics'));
							searchForStatisticByGameByArena.matchesQuery( 'game' , statisticGameByArena );
							
							// by game by case insensitive arena
							var statisticGameByArenaCaseInsensitive = new Parse.Query(Parse.Object.extend('Game'));
							statisticGameByArenaCaseInsensitive.startsWith( 'searchArena' , searchValue );
							var searchForStatisticByGameByArenaCaseInsensitive = new Parse.Query(Parse.Object.extend('Statistics'));
							searchForStatisticByGameByArenaCaseInsensitive.matchesQuery( 'game' , statisticGameByArenaCaseInsensitive );
							
							// by user by name
							var statisticUserByName = new Parse.Query(Parse.User);
							statisticUserByName.startsWith( 'name' , searchValue );
							var searchForStatisticByUserByName = new Parse.Query(Parse.Object.extend('Statistics'));
							searchForStatisticByUserByName.matchesQuery( 'user' , statisticUserByName );
							
							// by user by case-insensitive name - overlaps with proceeding queries
							
							// by user by username
							var statisticUserByUsername = new Parse.Query(Parse.User);
							statisticUserByUsername.startsWith( 'username' , searchValue );
							var searchForStatisticByUserByUsername = new Parse.Query(Parse.Object.extend('Statistics'));
							searchForStatisticByUserByUsername.matchesQuery( 'user' , statisticUserByUsername );
							
							// by user by case-insensitive username
							var statisticUserByUsernameCaseInsensitive = new Parse.Query(Parse.User);
							statisticUserByUsernameCaseInsensitive.startsWith( 'searchUsername' , searchValue );
							var searchForStatisticByUserByUsernameCaseInsensitive = new Parse.Query(Parse.Object.extend('Statistics'));
							searchForStatisticByUserByUsernameCaseInsensitive.matchesQuery( 'user' , statisticUserByUsernameCaseInsensitive );
							
							// by team by name
							var statisticTeamByName = new Parse.Query(Parse.Object.extend('Team'));
							statisticTeamByName.startsWith( 'name' , searchValue );
							var searchForStatisticByTeamByName = new Parse.Query(Parse.Object.extend('Statistics'));
							searchForStatisticByTeamByName.matchesQuery( 'team' , statisticTeamByName );
							
							// by team by case-insensitive name
							var statisticTeamByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
							statisticTeamByNameCaseInsensitive.startsWith( 'searchName' , searchValue );
							var searchForStatisticByTeamByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Statistics'));
							searchForStatisticByTeamByNameCaseInsensitive.matchesQuery( 'team' , statisticTeamByNameCaseInsensitive );
							
							// by team by level
							var statisticTeamByLevel = new Parse.Query(Parse.Object.extend('Team'));
							statisticTeamByLevel.startsWith( 'level' , searchValue );
							var searchForStatisticByTeamByLevel = new Parse.Query(Parse.Object.extend('Statistics'));
							searchForStatisticByTeamByLevel.matchesQuery( 'team' , statisticTeamByLevel );
							
							// by team by case-insensitive level
							var statisticTeamByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
							statisticTeamByLevelCaseInsensitive.startsWith( 'searchLevel' , searchValue );
							var searchForStatisticByTeamByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('Statistics'));
							searchForStatisticByTeamByLevelCaseInsensitive.matchesQuery( 'team' , statisticTeamByLevelCaseInsensitive );
							
							// by team by age group
							var statisticTeamByAgeGroup = new Parse.Query(Parse.Object.extend('Team'));
							statisticTeamByAgeGroup.startsWith( 'ageGroup' , searchValue );
							var searchForStatisticByTeamByAgeGroup = new Parse.Query(Parse.Object.extend('Statistics'));
							searchForStatisticByTeamByAgeGroup.matchesQuery( 'team' , statisticTeamByAgeGroup );
							
							// by team by case-insensitive age group
							var statisticTeamByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('Team'));
							statisticTeamByAgeGroupCaseInsensitive.startsWith( 'searchAgeGroup' , searchValue );
							var searchForStatisticByTeamByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('Statistics'));
							searchForStatisticByTeamByAgeGroupCaseInsensitive.matchesQuery( 'team' , statisticTeamByAgeGroupCaseInsensitive );
							
							// by team by year
							var statisticTeamByYear = new Parse.Query(Parse.Object.extend('Team'));
							statisticTeamByYear.startsWith( 'year' , searchValue );
							var searchForStatisticByTeamByYear = new Parse.Query(Parse.Object.extend('Statistics'));
							searchForStatisticByTeamByYear.matchesQuery( 'team' , statisticTeamByYear );
							
							// by league by name
							var statisticLeagueByName = new Parse.Query(Parse.Object.extend('League'));
							statisticLeagueByName.startsWith( 'name' , searchValue );
							var searchForStatisticByLeagueByName = new Parse.Query(Parse.Object.extend('Statistics'));
							searchForStatisticByLeagueByName.matchesQuery( 'league' , statisticLeagueByName );
							
							// by league by case-insensitive name
							var statisticLeagueByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
							statisticLeagueByNameCaseInsensitive.startsWith( 'searchName' , searchValue );
							var searchForStatisticByLeagueByNameCaseInsensitive = new Parse.Query(Parse.Object.extend('Statistics'));
							searchForStatisticByLeagueByNameCaseInsensitive.matchesQuery( 'league' , statisticLeagueByNameCaseInsensitive );
							
							// by league by level
							var statisticLeagueByLevel = new Parse.Query(Parse.Object.extend('League'));
							statisticLeagueByLevel.startsWith( 'level' , searchValue );
							var searchForStatisticByLeagueByLevel = new Parse.Query(Parse.Object.extend('Statistics'));
							searchForStatisticByLeagueByLevel.matchesQuery( 'league' , statisticLeagueByLevel );
							
							// by league by case-insensitive level
							var statisticLeagueByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
							statisticLeagueByLevelCaseInsensitive.startsWith( 'searchLevel' , searchValue );
							var searchForStatisticByLeagueByLevelCaseInsensitive = new Parse.Query(Parse.Object.extend('Statistics'));
							searchForStatisticByLeagueByLevelCaseInsensitive.matchesQuery( 'league' , statisticLeagueByLevelCaseInsensitive );
							
							// by league by age group
							var statisticLeagueByAgeGroup = new Parse.Query(Parse.Object.extend('League'));
							statisticLeagueByAgeGroup.startsWith( 'ageGroup' , searchValue );
							var searchForStatisticByLeagueByAgeGroup = new Parse.Query(Parse.Object.extend('Statistics'));
							searchForStatisticByLeagueByAgeGroup.matchesQuery( 'league' , statisticLeagueByAgeGroup );
							
							// by league by case-insensitive age group
							var statisticLeagueByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('League'));
							statisticLeagueByAgeGroupCaseInsensitive.startsWith( 'searchAgeGroup' , searchValue );
							var searchForStatisticByLeagueByAgeGroupCaseInsensitive = new Parse.Query(Parse.Object.extend('Statistics'));
							searchForStatisticByLeagueByAgeGroupCaseInsensitive.matchesQuery( 'league' , statisticLeagueByAgeGroupCaseInsensitive );
							
							// by team by year
							var statisticLeagueByYear = new Parse.Query(Parse.Object.extend('League'));
							statisticLeagueByYear.startsWith( 'year' , searchValue );
							var searchForStatisticByLeagueByYear = new Parse.Query(Parse.Object.extend('Statistics'));
							searchForStatisticByLeagueByYear.matchesQuery( 'league' , statisticLeagueByYear );
							
							var searchForStatistics = Parse.Query.or( searchForStatisticByEvent , searchForStatisticByEventCaseInsensitive , searchForStatisticByCreatorByName , searchForStatisticByCreatorByUsername , searchForStatisticByCreatorByUsernameCaseInsensitive , searchForStatisticByGameByArena , searchForStatisticByGameByArenaCaseInsensitive , searchForStatisticByUserByName , searchForStatisticByUserByUsername , searchForStatisticByUserByUsernameCaseInsensitive , searchForStatisticByTeamByName , searchForStatisticByTeamByNameCaseInsensitive , searchForStatisticByTeamByLevel , searchForStatisticByTeamByLevelCaseInsensitive , searchForStatisticByTeamByAgeGroup , searchForStatisticByTeamByAgeGroupCaseInsensitive , searchForStatisticByTeamByYear , searchForStatisticByLeagueByName , searchForStatisticByLeagueByNameCaseInsensitive , searchForStatisticByLeagueByLevel , searchForStatisticByLeagueByLevelCaseInsensitive , searchForStatisticByLeagueByAgeGroup , searchForStatisticByLeagueByAgeGroupCaseInsensitive , searchForStatisticByLeagueByYear );
							
					////////// get statistics
							searchForStatistics.find({
								// success
								success: function(statistics) {
									
									console.log(statistics);
									
									// overview of search
									searchOverview(searchValue);
									
								},
								// error
								error: function(error) {
									// error
								}
							});	
							
							break;
							
						default:
							console.log('yo');
						
							break;
						
					}
				
				}
				
			}, 50);
		}
	});