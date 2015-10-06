
		
		// verifying pending name update
		checkingTeamName: function(e) {
		
			// get name value
			var tnv = $(e.currentTarget).val();
			// name empty
			if ( tnv == '' || tnv == false ) {
				// show error
				$(e.currentTarget)
					.siblings('.profile--message')
						.removeClass('error verifying')
						.addClass('display-message error')
						.text('Team Name Invalid');
				// disable update button		
				$('input[type="submit"]').attr('disabled' , true);
				// name not ready	
				teamNameSettingsReady = false;
			// name not empty	
			} else {
				// hide error
				$(e.currentTarget)
					.siblings('.profile--message')
						.removeClass('display-message');
				// re-enable update button		
				$('input[type="submit"]').removeAttr('disabled')
				// name ready
				teamNameSettingsReady = true;
			}
			
		},
		
		// updating age
		updateAge: function(e) {
		
			e.preventDefault();
		
			// data
			var data = $(e.currentTarget).attr('data-value');
			// updates are undefined
			updateTeam.level = undefined;
			// level buttons active
			$('button.team-level')
				.removeClass('inactive')
				.removeAttr('disabled');
				
			// if novice
			if ( $.inArray( data , [ 'Novice' ] ) != -1 ) {
			
				// if already picked
				if ( updateTeam.age != undefined && $.inArray(updateTeam.age, [ 'Novice' ] ) != -1 ) {
					updateTeam.age = undefined;
					updateTeam.level = undefined;
					// make all active
					$(e.currentTarget)
						.removeClass('inactive')
							.siblings('button')
								.removeClass('inactive');
					// enable next category
					$('button.team-level')
						.removeClass('inactive')
						.removeAttr('disabled');
				// if not already picked		
				} else {
					updateTeam.age = data;
					// make inactive
					$(e.currentTarget)
						.removeClass('inactive')
						.siblings('button')
							.addClass('inactive');
					// disable next category
					$('button.team-level').each(function() {
						if ( !( $(this).attr('data-value') == 'House League' ) && !( $(this).attr('data-value') == 'Select' ) )
							$(this)
								.addClass('inactive')
								.attr('disabled' , true);
					});
				}
			
			// if minor league	
			} else if ( $.inArray( data , [ 'Minor Atom' , 'Atom' , 'Minor Peewee' , 'Peewee' , 'Minor Bantam' , 'Bantam' , 'Minor Midget' , 'Midget' , 'Juvenile' ] ) != -1 ) {
				
				if ( updateTeam.age != undefined && $.inArray(updateTeam.age, [ 'Minor Atom' , 'Atom' , 'Minor Peewee' , 'Peewee' , 'Minor Bantam' , 'Bantam' , 'Minor Midget' , 'Midget' , 'Juvenile' ]) != -1 && updateTeam.age == data ) {
					updateTeam.age = undefined;
					updateTeam.level = undefined;
					// make all active
					$(e.currentTarget)
						.removeClass('inactive')
						.siblings('button')
							.removeClass('inactive');
					// enable next category
					$('button.team-level')
						.removeClass('inactive')
						.removeAttr('disabled');
				// if not already picked		
				} else {
					updateTeam.cAgeLevel = data;
					updateTeam.age = data;
					// make inactive
					$(e.currentTarget)
						.removeClass('inactive')
						.siblings('button')
							.addClass('inactive');
					// enable next category
					$('button.team-level')
						.removeClass('inactive')
						.removeAttr('disabled');
				}
				
			// if major league	
			} else if ( $.inArray( data , [ 'Major Junior' , 'Professional' , 'Senior' ] ) != -1 ) {
			
				if ( updateTeam.age != undefined && $.inArray(updateTeam.age, [ 'Major Junior' , 'Professional' , 'Senior' ]) != -1 && updateTeam.age == data ) {
					updateTeam.age = undefined;
					updateTeam.level = undefined;
					// make all active
					$(e.currentTarget)
						.removeClass('inactive')
						.siblings('button')
							.removeClass('inactive');
					// enable next category
					$('button.team-level')
						.removeClass('inactive')
						.removeAttr('disabled');
				// if not already picked		
				} else {
					updateTeam.age = data;
					// make inactive
					$(e.currentTarget)
						.removeClass('inactive')
						.siblings('button')
							.addClass('inactive');
					// enable next category
					$('button.team-level')
						.addClass('inactive')
						.attr('disabled' , true);
				}
			
			}
			
			console.log(updateTeam.age);
			
		},
		
		// update skill level
		updateSkillLevel: function(e) {
		
			e.preventDefault();
		
			// data and type
			var data = $(e.currentTarget).attr('data-value');
			
			// if current already picked
			if ( updateTeam.level != undefined && $.inArray(updateTeam.level, [ 'House League' , 'Select' , 'A' , 'AA' , 'AAA' ] ) != -1 && updateTeam.level == data ) {
				updateTeam.level = undefined;
				// make all active
				$(e.currentTarget)
					.removeClass('inactive')
					.siblings('button.team-level:not(button[disabled])')
						.removeClass('inactive');
			// if not already picked			
			} else {
				updateTeam.level = data;
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
			if ( updateTeam.season != undefined && updateTeam.season == data ) {
				updateTeam.season = undefined;
				// make all active
				$(e.currentTarget)
					.removeClass('inactive')
					.siblings('button.team-season')
						.removeClass('inactive');
			} else {
				updateTeam.season = data;
				// make inactive
				$(e.currentTarget)
					.removeClass('inactive')
					.siblings('button.team-season')
						.addClass('inactive');
			}
			
		},

		settings: function(e) {
			var self = this;
			$('.entity__options__button').removeClass('entity__options__button--is-active');
			// show view
			$('[data-tab]').each(function() {
				if ( $(this).attr('data-tab') == 'team-settings' ) $(this).addClass('entity__data__tab--in-view');
				else $(this).removeClass('entity__data__tab--in-view');
			});

			// if there is a current user cached
			if ( Parse.User.current().id === this.team.creator.id ) {
				// display profile data in fields
				$('#team-name').val(this.team.name);
				$('#team-hometown').val(this.team.hometown);
				$('.profile--last-updated').text('Last updated ' + getTimeDifference(self.team.updatedAt));
				// show age group and level
				if ( !( this.team.ageLevel == undefined ) ) {
					// length
					switch ( this.team.ageLevel.split(' ').length ) {
						// 1
						case 1:
						
							// if age group
							if ( $.inArray(self.team.ageLevel , [ 'House League' , 'Select' , 'A' , 'AA' , 'AAA' ] ) == -1 ) {
								$('#team-age-group button').each(function() {
									if ( !( $(this).attr('data-value') == self.team.ageLevel ) ) $(this).addClass('inactive');
								});
								// if novice
								if ( $.inArray(self.team.ageLevel, [ 'Novice' ] ) != -1 ) {
									$('#team-level button').each(function() {
										if ( ( $(this).attr('data-value') != 'House League' ) && ( $(this).attr('data-value') != 'Select' ) )
											$(this)
												.addClass('inactive')
												.attr('disabled' , true);
									});
								// if major junior, professional, or senior
								} else if ( $.inArray(self.team.ageLevel, [ 'Major Junior' , 'Professional' , 'Senior' ] ) != -1 ) {
									$('#team-level button')
										.addClass('inactive')
										.attr('disabled' , true);
								}
								updateTeam.age = self.team.ageLevel;
							// if level
							} else {
								$('#team-level button').each(function() {
									if ( !( $(this).attr('data-value') == self.team.ageLevel ) ) $(this).addClass('inactive');
								});
								updateTeam.level = self.team.ageLevel
							}
						
						break;
						// 2
						case 2:
						
							// if contains 'minor' or 'major'
							if ( $.inArray(self.team.ageLevel.split(' ')[0], [ 'Minor' , 'Major' ] ) != -1 ) {
								$('#team-age-group button').each(function() {
									if ( !( $(this).attr('data-value') == self.team.ageLevel ) ) $(this).addClass('inactive');
								});
								// if major
								if ( $.inArray(self.team.ageLevel.split(' ')[0], [ 'Major' ] ) != -1 ) {
									$('#team-level button')
										.addClass('inactive')
										.attr('disabled' , true);
								}
								updateTeam.age = self.team.ageLevel;
							// contains both categories
							} else {
								$('#team-age-group button').each(function() {
									if ( !( $(this).attr('data-value') == self.team.ageLevel.split(' ')[0] ) ) $(this).addClass('inactive');
								});
								$('#team-level button').each(function() {
									if ( !( $(this).attr('data-value') == self.team.ageLevel.split(' ')[1] ) ) $(this).addClass('inactive');
								});
								// if novice
								if ( $.inArray(self.team.ageLevel.split(' ')[0], [ 'Novice' ] ) != -1 ) {
									$('#team-level button.inactive').each(function() {
										if ( ( $(this).attr('data-value') != 'House League' ) && ( $(this).attr('data-value') != 'Select' ) )
											$(this).attr('disabled' , true);
									});
								}
								updateTeam.age = self.team.ageLevel.split(' ')[0];
								updateTeam.level = self.team.ageLevel.split(' ')[1];
							}
						
						break;
						// 3
						case 3:
							
							// if contains 'minor' or 'major'
							if ( $.inArray(self.team.ageLevel.split(' ')[0], [ 'Minor' , 'Major' ] ) != -1 ) {
								$('#team-age-group button').each(function() {
									if ( !( $(this).attr('data-value') == ( self.team.ageLevel.split(' ')[0] + ' ' + self.team.ageLevel.split(' ')[1] ) ) ) $(this).addClass('inactive');
								});
								$('#team-level button').each(function() {
									if ( !( $(this).attr('data-value') == self.team.ageLevel.split(' ')[2] ) ) $(this).addClass('inactive');
								});
								updateTeam.age = self.team.ageLevel.split(' ')[0] + ' ' + self.team.ageLevel.split(' ')[1];
								updateTeam.level = self.team.ageLevel.split(' ')[2];
							// contains both categories
							} else {
								$('#team-age-group button').each(function() {
									if ( !( $(this).attr('data-value') == self.team.ageLevel.split(' ')[0] ) ) $(this).addClass('inactive');
								});
								$('#team-level button').each(function() {
									if ( !( $(this).attr('data-value') == ( self.team.ageLevel.split(' ')[1] + ' ' + self.team.ageLevel.split(' ')[2] ) ) ) $(this).addClass('inactive');
								});
								// if novice
								if ( $.inArray(self.team.ageLevel.split(' ')[0], [ 'Novice' ] ) != -1 ) {
									$('#team-level button.inactive').each(function() {
										if ( ( $(this).attr('data-value') != 'House League' ) && ( $(this).attr('data-value') != 'Select' ) )
											$(this).attr('disabled' , true);
									});
								}
								updateTeam.age = self.team.ageLevel.split(' ')[0];
								updateTeam.level = self.team.ageLevel.split(' ')[1] + ' ' + self.team.ageLevel.split(' ')[2];
							}
						
						break;
						// 4
						case 4:
						
							$('#team-age-group button').each(function() {
								if ( !( $(this).attr('data-value') == ( self.team.ageLevel.split(' ')[0] + ' ' + self.team.ageLevel.split(' ')[1] ) ) ) $(this).addClass('inactive');
							});
							$('#team-level button').each(function() {
								if ( !( $(this).attr('data-value') == ( self.team.ageLevel.split(' ')[2] + ' ' + self.team.ageLevel.split(' ')[3] ) ) ) $(this).addClass('inactive');
							});
							updateTeam.age = self.team.ageLevel.split(' ')[0] + ' ' + self.team.ageLevel.split(' ')[1];
							updateTeam.level = self.team.ageLevel.split(' ')[2] + ' ' + self.team.ageLevel.split(' ')[3];
						
						break;
					}
				}
				// show season
				if ( !( self.team.year == undefined ) )
					$('#team-season button').each(function() {
						if ( !( $(this).attr('data-value') == self.team.year ) ) $(this).addClass('inactive');
					});
			}
		},