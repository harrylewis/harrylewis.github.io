// validating the pending name update
		checkingName: function(e) {
			if (!$(e.currentTarget).val().length) {
				this.settingsMessage(e, false, 'Name Invalid');
				this.controlSettings(false);
				this.update.name = false;
			} else {
				this.settingsMessage(e, true);
				this.update.name = true;
				if (this.settingsReady()) this.controlSettings(true);
				// hide error
				$(e.currentTarget)
					.siblings('.profile--message')
						.removeClass('display-message');
			}
			
		},
		
		// validating the pending username update
		checkingUsername: function(e) {
			var self = this;
			// clear previous username check
			window.clearTimeout(checkUsername);
			// username empty
			if ( !$(e.currentTarget).val().length || /\s/g.test($(e.currentTarget).val()) ) {
				window.clearTimeout(checkUsername);
				this.settingsMessage(e, false, 'Username Invalid');
				this.controlSettings(false);
				this.update.username = false;
			// username not empty
			} else {
				// verifying ...
				this.settingsMessage(e, false, 'Verifying ...');
				$(e.currentTarget)
					.siblings('.profile--message')
						.removeClass('error verifying')
						.addClass('display-message verifying')
						.text('Verifying ...')
				this.controlSettings(false);
				// check username in database
				checkUsername = window.setTimeout(function() {
					var findUsername = new Parse.Query(Parse.User);
					findUsername.equalTo('username', $(e.currentTarget).val());
					findUsername.notEqualTo('objectId', this.user.id);
					findUsername.count({
						success: function(unavailable) {
							// not available
							if (unavailable) {
								self.settingsMessage(e, false, 'Username Unavailable');
								self.controlSettings(false);
								self.update.username = false;
								// show error
								$(e.currentTarget)
									.siblings('.profile--message')
										.removeClass('error verifying')
										.addClass('display-message error')
										.text('Username Unavailable');
							// available	
							} else {
								self.settingsMessage(e, true, 'Username Available');
								self.update.username = true;
								if (self.settingsReady()) self.controlSettings(true);
								// hide error
								$(e.currentTarget)
									.siblings('.profile--message')
										.removeClass('error verifying')
										.addClass('verifying')
										.text('Username Available')
							}
						},
						error: function(err) {}
					})
				// end of username database check	
				}, 500);
			}
			
		},
		
		// validating the pending email update
		checkingEmail: function(e) {
			if (!$(e.currentTarget).val().length) {
				this.settingsMessage(e, false, 'Email Invalid');
				this.controlSettings(false);
				this.update.email = false;
			// name not empty	
			} else {
				this.settingsMessage(e, true);
				this.update.email = true;
				if (this.settingsReady()) this.controlSettings(true);
			}
		},
		
		// save settings
		// saveSettings: function(e) {
		// 	var self = this;
		// 	e.preventDefault();
		// 	// if name, username, and email are ready
		// 	if ( this.update.name && this.update.username && this.update.email ) {
		// 		// saving...
		// 		$(e.currentTarget).find('input[type="submit"]')
		// 			.val('Saving...')
		// 			.attr('disabled' , true);
		// 		// get form values
		// 		var name		= $('#user-name').val();
		// 		var username 	= $('#user-username').val();
		// 		var email 		= $('#user-email').val();
		// 		var hometown 	= $('#user-hometown').val();
		// 		var dateOfBirth	= $('#user-date-of-birth').val();
		// 		// current user
		// 		currentUser = Parse.User.current();
		// 		// hometown
		// 		if (!hs.length) {
		// 			currentUser.unset('hometown');
		// 			currentUser.unset('searchHometown');
		// 		} else {
		// 			currentUser.set('hometown', hometown);
		// 			currentUser.set('searchHometown', hometown.toLowerCase());
		// 		}
		// 		// date of birth
		// 		if (!dateOfBirth.length) currentUser.unset('dateOfBirth');
		// 		else currentUser.set('dateOfBirth', dateOfBirth);
		// 		currentUser.set('name', name);
		// 		currentUser.set('username', username);
		// 		currentUser.set('email', email);
		// 		currentUser.set('searchName', name.toLowerCase());
		// 		currentUser.set('searchUsername', username.toLowerCase());
		// 		currentUser.save(null, {
		// 			success: function(user) {
		// 				self.user.name = user.get('name');
		// 				self.user.username = user.get('username');
		// 				self.user.email = user.get('email');
		// 				self.user.hometown = user.get('hometown');
		// 				self.user.dateOfBirth = user.get('dateOfBirth');
		// 				$('.profile--last-updated').text('Just now');
		// 				$('[data-text="user-name"]').text(self.user.name);
		// 				$('[data-text="user-identification"]').text(self.user.username);
		// 				$('[data-text="user-location"]').html((( self.user.hometown == undefined || self.user.hometown == null ) ? '' : '<span>&#xe24d;</span> ' + self.user.hometown));
		// 				$('[data-text="user-annum"]').html((( self.user.dateOfBirth == undefined || self.user.dateOfBirth == null ) ? '' : '<span>&#xe1dd;</span> ' + self.user.dateOfBirth));
		// 				// saved successfully
		// 				$(e.currentTarget)
		// 					.find('input[type="submit"]')
		// 						.val('Save Settings')
		// 						.removeAttr('disabled')
		// 							.end()
		// 					.find('input')
		// 						.blur();
		// 				// remove errors and validations
		// 				$(e.currentTarget)
		// 					.find('.profile--message')
		// 						.removeClass('display-message error verifying')
		// 						.text('');
		// 			},
		// 			error: function(err) {
		// 				$(e.currentTarget)
		// 					.find('input[type="submit"]')
		// 						.val('Save Settings')
		// 						.removeAttr('disabled')
		// 							.end()
		// 					.find('input')
		// 						.blur();
		// 			}
		// 		});	
		// 	}
		//}