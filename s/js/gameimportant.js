updateLocalScore: function(advantage) {
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




		
		// follow game
		relationalMechanism: function(e) {
			
			// Check if user is following this game.
			// If following, get rid, and destory else
			// start new relation
			
			// temporarily disabled
			$(e.currentTarget)
				.attr('disabled' , true);
				
			// if already following
			if ( gameDataObject.alreadyFollowingGame ) {
			
				// get relation			
				var FollowClass = Parse.Object.extend('Followers');
				var relation = new FollowClass();
				relation.id = gameDataObject.rid;
			
				// destroy relation
				relation.destroy({
					// success
					success: function(relationDestroyed) {
											
						// display changes
						$(e.currentTarget)
							.removeAttr('disabled')
							.removeClass('following-game')
							.attr('data-tooltip' , 'Follow');
													
						// update relation
						gameDataObject.alreadyFollowingGame = false;
						gameDataObject.rid = undefined;
												
					},
					// error
					error: function(err) {}
			 	});
			
			// if not following game
			} else {
			
				// new relation
				var FollowClass = Parse.Object.extend('Followers');
				var relation = new FollowClass();
					
				// set ACL permissions
				var ACL = new Parse.ACL();
				ACL.setWriteAccess(Parse.User.current() , true);
				ACL.setReadAccess(Parse.User.current() , true);
				ACL.setPublicReadAccess(true);
				ACL.setPublicWriteAccess(false);
					
				// set relation data
				relation.set('followerId' , Parse.User.current());
				relation.set('followingId' , null);
				relation.set('gameId' , {"__type":"Pointer","className":"Game","objectId":""+ gameDataObject.ID +""});
				relation.set('type' , 'game');
				relation.setACL(ACL);
					
				// save relation
				relation.save(null, {
					// success
					success: function(savedRelation) {
					
						// display changes
						$(e.currentTarget)
							.removeAttr('disabled')
							.addClass('following-game')
							.attr('data-tooltip' , 'Following');
								
						// update relation
						gameDataObject.alreadyFollowingGame = true;
						gameDataObject.rid = savedRelation.id;
							
					},
					// error
					error: function(err) {}
				});
		
			}
		
		},


		
		// toggle statistics
		toggleStatistics: function() {
			if (this.game.isStarted) {
				// statisitics
				switch(this.toggle) {
					case statistics.score:

						// increment
						this.toggle++;
						
						// show hits
						$('[class$="visual-statistic"]').each(function() {
							if ( $(this).attr('data-type') == 'Hit' ) $(this).show();
							else $(this).hide();
						});
							
						// show head-to-head
						$('[data-welcoming-score]').text(this.game.home.hits);
						$('[data-visiting-score]').text(this.game.away.hits);
						
						// show change
						$('[data-toggle]').html('&#xe29f; HITS');
				
					break;
					case statistics.hits:

						// increment
						this.toggle++;
						
						// show shots
						$('[class$="visual-statistic"]').each(function() {
							if ( $(this).attr('data-type') == 'Shot' || $(this).attr('data-type') == 'Goal' ) $(this).show();
							else $(this).hide();
						});
						
						// show head-to-head
						$('[data-welcoming-score]').text(this.game.home.shots);
						$('[data-visiting-score]').text(this.game.away.shots);
						
						// show change
						$('[data-toggle]').html('&#xe29f; SHOTS');
						
					break;
					case statistics.shots:

						// increment
						this.toggle++;
						
						// hide everything
						$('[class$="visual-statistic"]').hide();
					
						// show head-to-head
						$('[data-welcoming-score]').text(this.game.home.penaltiesim);
						$('[data-visiting-score]').text(this.game.away.penaltiesim);
						
						// show change
						$('[data-toggle]').html('&#xe29f; PENALTIES');
						
					break;
					case statistics.penaltiesim:

						// increment
						this.toggle++;
						
						// show shots
						$('[class$="visual-statistic"]').each(function() {
							if ( $(this).attr('data-type') == 'Takeaway' ) $(this).show();
							else $(this).hide();
						});
								
						// show head-to-head
						$('[data-welcoming-score]').text(this.game.home.turnovers);
						$('[data-visiting-score]').text(this.game.away.turnovers);
						
						// show change
						$('[data-toggle]').html('&#xe29f; TURNOVERS');
						
					break;
					case statistics.turnovers:

						// increment
						this.toggle++;

						// hide everything
						$('[class$="visual-statistic"]').hide();
					
						// show head-to-head
						$('[data-welcoming-score]').text(this.game.home.faceoffs);
						$('[data-visiting-score]').text(this.game.away.faceoffs);
						
						// show change
						$('[data-toggle]').html('&#xe29f; FACEOFFS');
						
					break;
					// faceoffs
					case statistics.faceoffs:

						// reset toggle
						this.toggle = statistics.score;
					
						// show score
						$('[class$="visual-statistic"]').each(function() {
							if ( $(this).attr('data-type') == 'Goal' ) $(this).show();
							else $(this).hide();
						});
								
						// show head-to-head
						$('[data-welcoming-score]').text(this.game.home.score);
						$('[data-visiting-score]').text(this.game.away.score);
						
						// show change
						$('[data-toggle]').html('&#xe29f; SCORE');
						
					break;
				}
			}
		},

		animateScore: function(el, side) {
			$(el)
				.text(((side) ? this.game.home.score : this.game.away.score ))
				.addClass('match__score__tally__figure--animate')
				.on('webkitAnimationEnd', function() { $(el).removeClass('match__score__tally__figure--animate'); });
		},

		updateOnScreenLocalScore: function(advantage) {
			if (advantage) $('[data-welcoming-score]').text(this.game.home.score);
			else $('[data-visiting-score]').text(this.game.away.score);
		},

			<!--

				<div class=" [ match ] ">
					<header class=" cf [ match__scoreboard ] ">
						<% if (iphone) { %>
							<div class=" cf [ match__score ] ">
								<span class=" [ match__score__tally ] ">
									<span class=" [ match__score__tally__fix ] ">
										<span class=" [ match__vertical-center ] ">
											<h3 class=" [ match__score__tally__figure ] " data-welcoming-score>
												<% if (isStarted) { %>
													<%= home.score %>
												<% } else { %>
													-
												<% } %>
											</h3>
										</span>
									</span>
								</span>
								<span class=" [ match__score__time ] ">
									<span class=" [ match__score__tally__fix ] ">
										<span class=" [ match__vertical-center ] ">
											<div class=" [ match__score__time__box <% if ( !isStarted || ( !isActive && !isFinal ) ) { %><%= 'match__score__time__box--inactive' %><% } else { if ( isActive && !isFinal ) { %><%= 'match__score__time__box--active' %><% } else { %><%= 'match__score__time__box--final' %><%} } %> ] " data-time-box>
												<span class=" [ match__score__time__fix ] ">
													<span class=" [ match__vertical-center match__vertical-center--time ] ">
														<p class=" [ match__score__time__box__time ] " data-match-time>
															<% if (!isStarted || ( !isActive && !isFinal ) ) { %>
																VERSUS
															<% } else { %>
																<% if ( isActive && !isFinal ) { %>
																	-- --
																<% } else { %>
																	FINAL
																<% } %>
															<% } %>
														</p>
														<div class=" [ match__score__time__box__period ] ">
															<i class=" [ match__period match__period--is-hidden ] " data-match-period="1">&#xf111;</i>
															<i class=" [ match__period match__period--is-hidden ] " data-match-period="2">&#xf111;</i>
															<i class=" [ match__period match__period--is-hidden ] " data-match-period="3">&#xf111;</i>
														</div>
													</span>
												</span>
											</div>
										</span>
									</span>
								</span>
								<span class=" [ match__score__tally ] ">
									<span class=" [ match__score__tally__fix ] ">
										<span class=" [ match__vertical-center ] ">
											<h3 class=" [ match__score__tally__figure ] " data-visiting-score>
												<% if (isStarted) { %>
													<%= away.score %>
												<% } else { %>
													-
												<% } %>
											</h3>
										</span>
									</span>
								</span>
							</div>
						<% } %>
						<div class=" cf [ match__team match__team--welcoming ] ">
							<span class=" [ match__team__avatar match__team__avatar--welcoming ] ">
								<% if (mobile) { %>
									<span class=" [ match__team__avatar__overlay ] "></span>
								<% } %>
								<img src="<% if ( home.team.attributes['profilePicture'] == undefined ) { %><%= 'images/default.png' %><% } else { %><%= home.team.attributes['profilePicture'].url() %><% } %>" class=" [ match__avatar ] " data-picture-welcoming-team /> 
							</span>
							<span class=" [ match__team__identification ] ">
								<span class=" [ match__vertical-center ] ">
									<p class=" [ match__team__creator ] ">Team Created By <%= home.creator.attributes['username'] %></p>
									<h3 class=" [ match__team__name ] " data-text="welcoming-team-name"><a href="#/team/<%= home.team.id %>"><%= home.team.attributes['name'] %></a></h3>
								</span>
							</span>
						</div>
						<% if (!iphone) { %>
							<div class=" cf [ match__score ] ">
								<span class=" [ match__score__tally ] ">
									<span class=" [ match__score__tally__fix ] ">
										<span class=" [ match__vertical-center ] ">
											<h3 class=" [ match__score__tally__figure ] " data-welcoming-score>
												<% if (isStarted) { %>
													<%= home.score %>
												<% } %>
											</h3>
										</span>
									</span>
								</span>
								<span class=" [ match__score__time ] ">
									<span class=" [ match__score__tally__fix ] ">
										<span class=" [ match__vertical-center ] ">
											<div class=" [ match__score__time__box <% if ( !isStarted || ( !isActive && !isFinal ) ) { %><%= 'match__score__time__box--inactive' %><% } else { if ( isActive && !isFinal ) { %><%= 'match__score__time__box--active' %><% } else { %><%= 'match__score__time__box--final' %><%} } %> ] " data-time-box>
												<span class=" [ match__score__time__fix ] ">
													<span class=" [ match__vertical-center match__vertical-center--time ] ">
														<p class=" [ match__score__time__box__time ] " data-match-time>
															<% if (!isStarted || ( !isActive && !isFinal ) ) { %>
																VERSUS
															<% } else { %>
																<% if ( isActive && !isFinal ) { %>
																	-- --
																<% } else { %>
																	FINAL
																<% } %>
															<% } %>
														</p>
														<div class=" [ match__score__time__box__period ] ">
															<i class=" [ match__period match__period--is-hidden ] " data-match-period="1">&#xf111;</i>
															<i class=" [ match__period match__period--is-hidden ] " data-match-period="2">&#xf111;</i>
															<i class=" [ match__period match__period--is-hidden ] " data-match-period="3">&#xf111;</i>
														</div>
													</span>
												</span>
											</div>
										</span>
									</span>
								</span>
								<span class=" [ match__score__tally ] ">
									<span class=" [ match__score__tally__fix ] ">
										<span class=" [ match__vertical-center ] ">
											<h3 class=" [ match__score__tally__figure ] " data-visiting-score>
												<% if (isStarted) { %>
													<%= away.score %>
												<% } %>
											</h3>
										</span>
									</span>
								</span>
							</div>
						<% } %>
						<div class=" [ match__team match__team--visiting ] ">
							<span class=" [ match__team__avatar match__team__avatar--visiting ] ">
								<% if (mobile) { %>
									<span class=" [ match__team__avatar__overlay ] "></span>
								<% } %>
								<img src="<% if ( away.team.attributes['profilePicture'] == undefined ) { %><%= 'images/default.png' %><% } else { %><%= away.team.attributes['profilePicture'].url() %><% } %>" class=" [ match__avatar ] " data-picture-visiting-team />
							</span>
							<span class=" [ match__team__identification ] ">
								<span class=" [ match__vertical-center ] ">
									<p class=" [ match__team__creator match__team__creator--visiting ] ">Team Created By <%= away.creator.attributes['username'] %></p>
									<h3 class=" [ match__team__name match__team__name--visiting ] " data-text="welcoming-team-name"><a href="#/team/<%= away.team.id %>"><%= away.team.attributes['name'] %></a></h3>
								</span>
							</span>
						</div>
					</header>
					<% if ( Parse.User.current().id === creator.id && !mobile ) { %>
						<div class=" cf [ match__adjust ] " data-adjust>
							<span class=" [ match__adjust__field ] ">
								<label class=" [ match__adjust__field__label ] ">PERIOD</label>
								<select name="game-adjust-period" class=" [ adjust__choice ] ">
									<option data-directive disabled>Change Period</option>
									<option data-option>1</option>
									<option data-option>2</option>
									<option data-option>3</option>
								</select>
							</span>
							<span class=" [ match__adjust__field ] ">
								<label class=" [ match__adjust__field__label ] ">TIME</label>
								<select name="game-adjust-minute" class=" [ adjust__choice adjust__choice--time ] ">
									<option data-directive disabled>Change Minute</option>
									<% for ( var i = 0; i < 21; i++ ) { %>
										<% if ( i < 10 ) { %>
											<option data-option>0<%= i %></option>
										<% } else { %>
											<option data-option><%= i %></option>
										<% } %>
									<% } %>
								</select>
								<select name="game-adjust-second" class=" [ adjust__choice adjust__chioce--time ] ">
									<option data-directive disabled>Change Second</option>
									<% for ( var i = 0; i < 60; i++ ) { %>
										<% if ( i < 10 ) { %>
											<option data-option>0<%= i %></option>
										<% } else { %>
											<option data-option><%= i %></option>
										<% } %>
									<% } %>
								</select>
							</span>
						</div>
					<% } %>
					<div class=" cf [ match__information ] ">
						<% if (iphone) { %>
							<button class=" [ match__superfluous ] " data-game-information>
								<i class=" [ match__icon match__icon--information ] ">&#xf0ae;</i>
								<span class=" [ match__superfluous--description ] ">
									<span class=" [ match__vertical-center ] ">
										<p class=" [ match__superfluous--primary ] ">More Information</p>
									</span>
								</span>
							</button>
						<% } %>
						<% if (isOfficial) { %>
							<a class=" [ match__superfluous <% if (iphone) { %><%= 'match__superfluous--is-hidden' %> <% } %> ] ">
								<i class=" [ match__icon match__icon--information match__icon--blue ] ">&#xe26a;</i>
								<span class=" [ match__superfluous--description ] ">
									<span class=" [ match__vertical-center ] ">
										<p class=" [ match__superfluous--primary ] ">Scorbit Official</p>
									</span>
								</span>
							</a>
						<% } %>
						<% if ( isOfficial && league != undefined ) { %>
							<a href="#/league/<%= league.id %>" class=" [ match__superfluous <% if (iphone) { %><%= 'match__superfluous--is-hidden' %> <% } %> ] ">
								<i class=" [ match__icon match__icon--information ] ">&#xf091;</i>
								<span class=" [ match__superfluous--description ] ">
									<span class=" [ match__vertical-center ] ">
										<p class=" [ match__superfluous--primary ] "><%= league.attributes['name'] %></p>
										<p class=" [ match__superfluous--secondary ] "><%= league.attributes['competitiveCategory'] %></p>
									</span>
								</span>
							</a>
						<% } %>
						<a href="#/<%= creator.attributes['username'] %>" class=" [ match__superfluous <% if (iphone) { %><%= 'match__superfluous--is-hidden' %> <% } %> ] ">
							<i class=" [ match__icon match__icon--information ] ">&#xf007;</i>
							<span class=" [ match__superfluous--description ] ">
								<span class=" [ match__vertical-center ] ">
									<p class=" [ match__superfluous--primary ] "><%= creator.attributes['name'] %></p>
									<p class=" [ match__superfluous--secondary ] ">Game Creator</p>
								</span>
							</span>
						</a>
						<a class=" [ match__superfluous <% if (iphone) { %><%= 'match__superfluous--is-hidden' %> <% } %> ] ">
							<i class=" [ match__icon match__icon--information ] ">&#xe1dd;</i>
							<span class=" [ match__superfluous--description ] ">
								<span class=" [ match__vertical-center ] ">
									<p class=" [ match__superfluous--primary ] ">
										<% for ( var i = 0; i < time.defaults.day.length; i++ ) { %>
											<% if ( time.ofGame.getDay() == i ) { %>
												<%= time.defaults.day[i] %>
											<% } %>
										<% } %>
										<% if ( parseInt(time.ofGame.getHours()) < 12 ) { %>
											<%= time.ofGame.getHours() + ':' + time.ofGame.getMinutes() + ' AM' %>
										<% } else { %>
											<%= ( time.ofGame.getHours() - 12 ) + ':' + time.ofGame.getMinutes() + ' PM' %>
										<% } %>
									</p>
									<p class=" [ match__superfluous--secondary ] ">
										<% for ( var i = 0; i < time.defaults.month.length; i++ ) { %>
											<% if ( time.ofGame.getMonth() == i ) { %>
												<%= time.defaults.month[i] %>
											<% } %>
										<% } %>
										<%= ' ' + time.ofGame.getDay() + ', ' + time.ofGame.getFullYear() %>
									</p>
								</span>
							</span>
						</a>
						<% if ( location != undefined ) { %>
							<a class=" [ match__superfluous <% if (iphone) { %><%= 'match__superfluous--is-hidden' %> <% } %> ] ">
								<i class=" [ match__icon match__icon--information ] ">&#xe24d;</i>
								<span class=" [ match__superfluous--description ] ">
									<span class=" [ match__vertical-center ] ">
										<p class=" [ match__superfluous--primary ] "><%= location %></p>
										<p class=" [ match__superfluous--secondary ] ">Location</p>
									</span>
								</span>
							</a>
						<% } %>
						<% if (!mobile) { %>
							<div class=" [ match__controls <% if (!isStarted) { %><%= 'match__control--is-hidden' %><% } %> ] ">
								<div class=" [ match__controls__relative ] ">
									<% if ( Parse.User.current().id === creator.id ) { %>
										<button class=" [ match__control <% if ( !( isActive && !isFinal ) ) { %><%= 'match__control--is-hidden' %><% } %> ] " data-time-control>&#xf04b;</button>
									<% } %>
									<button class=" [ match__control <% if (!isStarted) { %><%= 'match__control--is-hidden' %><% } %> ] " data-toggle>&#xe29f; SCORE</button>
								</div>
							</div>
						<% } %>
					</div>
					<footer class=" cf [ match__options <% if ( !( !isStarted && Parse.User.current().id === creator.id ) || isStarted ) { %><%= 'match__options--is-hidden' %><% } %> ] ">
						<button class=" [ match__options__button <% if ( ( Parse.User.current().id !== creator.id && !mobile ) || ( !isActive && isFinal && !mobile ) || ( mobile && isActive && !isFinal && Parse.User.current().id === creator.id ) ) { %><%= 'match__options__button--third' %><% } %> <% if ( ( mobile && Parse.User.current().id !== creator.id ) || ( mobile && !isActive && isFinal ) ) { %><%= 'match__options__button--half' %><% } %> <% if (!isStarted) { %><%= 'match__options__button--is-hidden' %><% } %> <% if (mobile) { %><%= 'match__options__button--is-active' %><% } %> ] " data-target-tab="match-activity"><span class=" [ match__options__button__icon ] ">&#xe053;</span>ACTIVITY</button>
						<% if (!mobile) { %>
							<button class=" [ match__options__button <% if ( Parse.User.current().id !== creator.id || ( !isActive && isFinal ) ) { %><%= 'match__options__button--third' %><% } %> <% if (!isStarted) { %><%= 'match__options__button--is-hidden' %><% } %> <% if (isStarted) { %><%= 'match__options__button--is-active' %><% } %> ] " data-target-tab="match-tracker"><span class=" [ match__options__button__icon ] ">&#xf08d;</span>TRACKER</button>
						<% } %>
						<button class=" [ match__options__button <% if ( !isStarted || ( isActive && !isFinal && mobile && Parse.User.current() == creator.id ) || ( mobile && Parse.User.current().id !== creator.id ) || ( mobile && Parse.User.current().id === creator.id && !isActive && isFinal ) ) { %><%= 'match__options__button--half' %><% } %> <% if ( ( isStarted && Parse.User.current().id !== creator.id && !mobile ) || ( !isActive && isFinal && !mobile ) || ( isActive && !isFinal && Parse.User.current().id === creator.id && mobile ) ) { %><%= 'match__options__button--third' %><% } %> ] " data-target-tab="match-roster"><span class=" [ match__options__button__icon ] ">&#xe28b;</span>ROSTER</button>
						<% if ( Parse.User.current().id === creator.id && ( !( !isActive && isFinal ) ) ) { %>
							<button class=" [ match__options__button <% if ( isStarted && !( !isActive && isFinal ) && Parse.User.current().id === creator.id && mobile ) { %><%= 'match__options__button--third' %><% } %> <% if (!isStarted) { %><%= 'match__options__button--half match__options__button--is-active' %><% } %> ] " data-target-tab="match-settings"><span class=" [ match__options__button__icon ] ">&#xe03f;</span>SETTINGS</button>
						<% } %>
					</footer>
				</div>

				<div class=" [ match__data ] ">
					<% if ( Parse.User.current().id === creator.id && ( !( !isActive && isFinal ) ) ) { %>
						<div class=" [ match__data__tab <% if (!isStarted) { %><%= 'match__data__tab--in-view' %><% } %> ] " data-tab="match-settings">
							<% if (!isStarted) { %>
								<header class=" [ create__header create__header--transparent ] ">
									<h3 class=" [ directive__header ] ">This game hasn't started</h3>
									<p class=" [ directive__message ] ">In order to start this game, change the game activity below and press save to update the changes. Changing a game's activity to 'Final' cannot be undone.</p>
								</header>
							<% } %>
							<form data-settings>
								<ul>
									<li class=" cf [ create__field ] " data-settings-activity>
										<label class=" [ create__label ] ">Activity</label>
										<select name="game-activity" class=" [ create__choice ] ">
											<option data-directive disabled>Change Activity</option>
											<option data-option <% if ( isStarted && ( isActive && !isFinal ) ) { %> <%= 'selected' %><% } %>>Active</option>
											<option data-option <% if ( !isStarted && ( !isActive && !isFinal ) ) { %> <%= 'selected' %><% } %>>Inactive</option>
											<option data-option <% if ( isStarted && ( !isActive && isFinal ) ) { %> <%= 'selected' %><% } %>>Final</option>
										</select>
									</li>
									<li class=" cf [ create__field ] " data-settings-fpm>
										<label class=" [ create__label ] ">First Period Length (Minutes)</label>
										<select name="game-dfpm" class=" [ create__choice ] ">
											<option data-directive selected disabled>Select Maximum</option>
											<% for ( var i = 1; i < 21; i++ ) { %>
												<% if ( time.dfpm == i ) { %>
													<option data-option selected><%= i %></option>
												<% } else { %>
													<option data-option><%= i %></option>
												<% } %>
											<% } %>
										</select>
									</li>
									<li class=" cf [ create__field ] " data-settings-fpm>
										<label class=" [ create__label ] ">Second Period Length (Minutes)</label>
										<select name="game-dspm" class=" [ create__choice ] ">
											<option data-directive selected disabled>Select Maximum</option>
											<% for ( var i = 1; i < 21; i++ ) { %>
												<% if ( time.dspm == i ) { %>
													<option data-option selected><%= i %></option>
												<% } else { %>
													<option data-option><%= i %></option>
												<% } %>
											<% } %>
										</select>
									</li>
									<li class=" cf [ create__field ] " data-settings-fpm>
										<label class=" [ create__label ] ">Third Period Length (Minutes)</label>
										<select name="game-dtpm" class=" [ create__choice ] ">
											<option data-directive selected disabled>Select Maximum</option>
											<% for ( var i = 1; i < 21; i++ ) { %>
												<% if ( time.dtpm == i ) { %>
													<option data-option selected><%= i %></option>
												<% } else { %>
													<option data-option><%= i %></option>
												<% } %>
											<% } %>
										</select>
									</li>
									<li class=" [ create__field create__field--submit ] " data-object-type="-1">
										<input type="submit" class=" [ create__input create__input--submit ] " data-field="submit" value="Save" />
									</li>
								</ul>
							</form>
						</div>
					<% } %>
					<div class=" [ match__data__tab match__data__tab--no-borders match__data__tab--activity <% if ( isStarted && mobile ) { %><%= 'match__data__tab--in-view' %><% } %> ] " data-tab="match-activity">
						<button class="paginate-up directive--is-hidden " data-paginate-up>0 New Feeds</button>
						<header class=" [ create__header create__header--margin create__header--is-hidden ] ">
							<h3 class=" [ directive__header ] ">No Feeds</h3>
							<p class=" [ directive__message ] ">Once anyone collaborates on this game, those feeds will show up here.</p>
						</header>
						<span class="loader"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
						<button class="paginate directive--is-hidden " data-paginate-down>Load More Feeds</button>
						<span class="number-of-results directive--is-hidden " data-results>No More Feeds</span>
					</div>
					<div class=" cf [ match__data__tab match__data__tab--roster <% if ( !isStarted && Parse.User.current().id !== creator.id ) { %><%= 'match__data__tab--in-view' %><% } %> ] " data-tab="match-roster">
						<header class=" [ grouping__header ] ">Game Roster</header>
						<span class=" [ match__roster ] " data-roster-welcoming>
							<a class=" cf [ match__roster__member__header ] ">
								<span class=" [ match__roster__member--number ] ">#</span>
								<span class=" [ match__roster__member--name ] ">Name</span>
								<span class=" [ match__roster__member--position ] ">Po.</span>
							</a>
							<span class="loader"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
						</span>
						<span class=" [ match__roster ] " data-roster-visiting>
							<a class=" cf [ match__roster__member__header ] ">
								<span class=" [ match__roster__member--position match__roster__member--position--left ] ">Po.</span>
								<span class=" [ match__roster__member--name match__roster__member--name--right ] ">Name</span>
								<span class=" [ match__roster__member--number match__roster__member--number--right ] ">#</span>
							</a>
							<span class="loader"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
						</span>
					</div>
					<div class=" cf [ match__data__tab match__data__tab--tracker <% if ( isStarted && !mobile ) { %><%= 'match__data__tab--in-view' %><% } %> ] " data-tab="match-tracker">
						<% if (mobile) { %>
							<header class=" cf [ match__tracker__scoreboard ] ">
								<span class=" [ match__tracker__scoreboard--welcoming ] ">
									<h3 class=" [ match__tracker__scoreboard__team ] "><%= home.team.attributes['name'] %></h3>
								</span>
								<span class=" cf [ match__tracker__scoreboard--score ] ">
									<p class=" [ match__tracker__scoreboard--tally ] " data-welcoming-score-tracker>
										<% if (isStarted) { %>
											<%= home.score %>
										<% } else { %>
											-
										<% } %>
									</p>
									<p class=" [ match__tracker__scoreboard--tally ] " data-visiting-score-tracker>
										<% if (isStarted) { %>
											<%= away.score %>
										<% } else { %>
											-
										<% } %>
									</p>
								</span>
								<span class=" [ match__tracker__scoreboard--visiting ] ">
									<h3 class=" [ match__tracker__scoreboard__team match__tracker__scoreboard__team--right ] "><%= away.team.attributes['name'] %></h3>
								</span>
							</header>
						<% } %>
						<div class=" [ match__tracker ] ">
							<div id="canvas" class=" [ match__surface ] " data-tracker></div>
						</div>
						<% if (mobile) { %>
							<footer class=" [ match__tracker__time ] ">
								<div class=" [ match__score__time__box match__score__time__box--tracker <% if ( !isStarted || ( !isActive && !isFinal ) ) { %><%= 'match__score__time__box--inactive' %><% } else { if ( isActive && !isFinal ) { %><%= 'match__score__time__box--active' %><% } else { %><%= 'match__score__time__box--final' %><%} } %> ] " data-time-box>
											<p class=" [ match__score__time__box__time match__score__time__box__time--tracker ] " data-match-time-tracker>
												<% if (!isStarted || ( !isActive && !isFinal ) ) { %>
													VERSUS
												<% } else { %>
													<% if ( isActive && !isFinal ) { %>
														-- --
													<% } else { %>
														FINAL
													<% } %>
												<% } %>
											</p>
											<div class=" [ match__score__time__box__period ] ">
												<i class=" [ match__period match__period--tracker match__period--is-hidden ] " data-match-period="1">&#xf111;</i>
												<i class=" [ match__period match__period--tracker match__period--is-hidden ] " data-match-period="2">&#xf111;</i>
												<i class=" [ match__period match__period--tracker match__period--is-hidden ] " data-match-period="3">&#xf111;</i>
											</div>
								</div>
								<% if ( creator.id === Parse.User.current().id ) { %>
									<button class=" [ match__score__time__control--tracker ] " data-time-control-tracker>&#xf04b;</button>
								<% } %>
							</footer>
						<% } %>
						<div id="collaborative" class=" [ match__collaborate ] ">
							<div class=" [ match__collaborate__reset ] ">
								<header class=" cf [ match__collaborate__header ] ">
									<button class=" [ match__collaborate__header__button ] " disabled data-collaborate-back>&#xe0e0;</button>
									<h3 class=" [ match__collaborate__attribute ] " data-collaborate-header>Event</h3>
									<button class=" [ match__collaborate__header__button ] " data-collaborate-cancel>&#xf00d;</button>
								</header>
								<div class=" cf [ match__collaborate__options ] " data-collaborator-options>
								</div>
							</div>
						</div>
					</div>
				</div>-->

				// phase
			switch (phase) {
				case 1: heading = 'Event'; break;
				case 2:
					// if faceoff
					if ( collaboratorObject.event == 'Faceoff' ) heading = 'Winning Team';
					else heading = 'Team';
				break;
				case 3:
					// if faceoff
					if ( collaboratorObject.event == 'Faceoff' ) heading = 'Winning Player';
					else heading = 'Player';
				break;
				case 4:
				
					// event
					switch (collaboratorObject.event) {
						case 'Goal': heading = 'Type'; break;
						case 'Penalty': heading = 'Duration'; break;
					}
				
				break;
				case 5:
				
					// event
					switch (collaboratorObject.event) {
						case 'Goal': heading = 'First Assist'; break;
						case 'Penalty': heading = 'Type'; break;
					}
				
				break;
				case -1:
				
					// event
					switch (collaboratorObject.event) {
						case 'Shot': heading = 'Type'; break;
						case 'Goal':
							// straight from penalty shot
							if ( collaboratorObject.other.type == 'Penalty Shot' ) {
								heading = 'Type';
							} else {
								// first assist set
								if ( !( collaboratorObject.firstParticipant == undefined ) || !( collaboratorObject.secondParticipant == undefined ) ) {
									heading = 'Second Assist';
								} else {
									heading = 'First Assist';
								}
							}
						break;
						case 'Hit': heading = 'Opposing Player'; break;
						case 'Takeaway': heading = 'Opposing Player'; break;
						case 'Penalty': heading = 'Category'; break;
						case 'Faceoff': heading = 'Losing Player'; break;
					}
				
				break;
			}