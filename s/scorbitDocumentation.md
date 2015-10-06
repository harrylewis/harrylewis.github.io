# Scorbit Documentation

## Table Of Contents
1. Table Of Contents
2. Scorbit
	1. Goals
	2. Ecosystem
	3. Rules
	4. Application Flow
	5. Scorbit Official
2. Backend
	1. Overview
	2. Parse
	3. Database
3. Front End
	1. Rendering and Templating
	2. Styling
	3. MVC
	4. Dependencies
	5. File Structure
4. The Future

### Scorbit
#### Goals
Scorbit was created and idealized out of a necessity for a way to track and aggregate hockey statistics, in a way reliable and effective ways. There have been methods and processes available to do this but they are often expensive and are on a per license basis to major institutions and leagues. Our goal was to create a system that was easy to use and accessible to anyone, anywhere, and at any time in real-time. Scorbit allows its users to track statistics of a game, and league, or individual players and coaches, follow these ongoing transactions, in real-time, and most importantly for free. While the focus right now is on the sport of hockey, our aim is to implement this solution for many other sports to become a leading platform for sports in the world. It is our hope that we can turn Scorbit into a scalable API that developers can build on top to grow the company and it's data. The characteristics we base this endeavour on are open-source (as it relates to an API), accessible, and real-time.

#### Ecosystem
The Scorbit ecosystem is comprised of all the entities that would be found at a hockey match, and in that was is intuitive. Leagues are considered the highest order of all the entities, allowing teams to be grouped together and allow for the aggregation of statistics itself. Leagues are a collection of teams that compete against each other within a given time frame. Teams are comprised of players, goalies, and coaches. Players, goalies, and coaches, are only designated those titles when assigned to a team. Without these designations, users are purely people/bystanders within the ecosystem. Teams can be comprised of 'ghost' entities or 'real' entities. 'Ghost' entities imply that the record of that entity in the team has no association to any user and therefore only exists within the context of the team is claims affiliation with. In contrast, 'real' entities imply that the record of that entity in the team has an association to a user in Scorbit and that record exists in the context of the team and user is it affiliated with. The driving entity behind all of these nodes are 'statistics'. Statistics are what allow the aggregation and tracking of players, teams, and leagues. A statistic may or may not contribute to an accumulation of statistics. The rules of this will be described later.

#### Rules
While this is a complex system, we have managed to simplify the rules of the ecosystem as much as possible in order to create and intuitive experience for the users of Scorbit. All rules stated here are declared as of Scorbit version *0.0.0-alpha.1*

- Any user may create a team provided:
	- It has a name at the very least.
- Only the creator of the team will have the rights to write over team attributes.
- Any user may create a league provided:
	- It has a name at the very least.
- Only the creator of the league will have the rights to write over league attributes.
- Any user may create a game between two teams under the following scenarios:
	1. The user owns at least two teams, regardless of whether they hold relations with a league.
	2. The user owns a league, which has authorized rights to use two or more teams.
- All games must be created provided:
	- There are only two teams involved.
- Only the creator of the game will have the rights to write over game attributes.
- The creator of a team may add team personnel to the team in the following ways:
	1. Creating a ghost entity provided:
	- It has a name, which can be any string of characters.
	- It has a position (Head Coach, Forward, etc.).
	- It has a number only if it a player.
	- No authorization is exchanged in this process.
	2. Inviting a real user to the team provided:
	- They are not already on the team as a Head Coach, Forward, etc.
	- They are given a position (Head Coach, Forward, etc.).
	- They have a number only if invited as a player.
	- The user is added to the list of team participants provided that authorization is given from the invited party to use that user under the circumstances of position (and number if applicable) as assigned by the team creator.
- Once these entities are added to a team, if they are players, a record is created for that player on that team for each league that the team is active in whether it is a real entity or a ghost entity.
- The creator of a league can add league personnel to the league in the following ways:
	1. Inviting a team to the league. As long as the invited party (team creator) authorizes the usage of his/her team in the context of that league, the league creator may use that team in a collection of games against other teams associated with the league. Once a team joins a league, a new record is created for that team participating in the league, and a record is created for every player on the team in the context of that league.
- Anyone can collaborate and contribute statistics towards a game.
These statistics will be designated as either Scorbit Official or Scorbit Unofficial (described below), and through a filtering process will either contribute to aggregated statistics or will not, and will just appear within the context of that game.

#### Application Flow
- **Landing Page** When a person goes to Scorbit[www.scorbit.com], they will arrive at a landing page with the option to sign up or sign in. After one of the following, users are directed to their home page where they can then sign out.
- **Top Bar Navigation** The navigation bar on the web is located on the top of the screen and is fixed to the top at all times. From left to right the options are, 'search' which allows a user to search through all the entities in Scorbit, 'notifications' which allows a user to see their notifications, 'create' which allows a user to create entities, 'home' which allows a user to navigate to the home page, and 'profile' which allows a user to navigate to their own profile or sign out.
- **Home Page** The home page is where a logged in user will go to see the posts made by users the logged in user is following. From there, the logged in user can click on the posts and will be redirected to a game. On the web, the home page will also include a tab to see the logged in user's teams and leagues he/she created.
- **Profile Page** A user can navigate to a profile page, whether it belongs to the logged in user or not. On this page, one can find the information of the user that the profile page belongs to. This includes their name, username, hometown*, date of birth*, posts made by the user, followers, following, and the statistics associated with the user. These statistics include teams or leagues that the user in question owns, and teams they are a part of as either a coach or player with the appropriate aggregated statistics. If the user of the profile page is the current logged in user a settings button will appear which allows the user to update his/her settings. If the profile belongs to a user that is not the logged in user, a 'follow/unfollow' button will appear so that the logged in user has the opportunity to keep up to date with the user's posts by either 'following/unfollowing' that user.
- **Team Page** A user can navigate to a team page, whether the team was created by the logged in user or not. On this page, one can find information of the team. This includes the team's creator, name, competitive category*, hometown*, season playing*, games associated with the team, and the statistics associated with the team. These statistics include the roster that makes up the team and their accumulative statistics, the coaching staff, and their team record by league. If the logged in user is the creator of the team, a settings button will appear which allows the user to update the team settings.
- **League Page** A user can navigate to a league page, whether the league was created by the logged in user or not. On this page, one can find information of the league. This includes the league's creator, name, competitive category*, hometown*, season playing*, games associated with the league, and the statistics associated with the league. These statistics include the league standings by team, the scoring leaders of the league, and the goalie leaders of the league. If the logged in user is the creator of the league, a settings button will appear which allows the user to update the league settings.
- **Notifications Page** The notifications page is where a logged in user can go to view any notifications that have been sent to that user. There are three different types of notifications including an invitation to join a team as a coach or player, an invitation from a league to a team a user owns to authorize the use of the team in that league, and a notification to set the active roster for a game that has yet to start (once the game starts, the notifications are deleted).
- **Create Page** Any user can go to the create page to create a team, league, or game as long as they meet the requirements stated above.
- **Game Page** A user can navigate to a game page, whether that game was created by the logged in user or not. On this page, one can find information about the game. This includes the game's creator, location*, league*, date/time, teams involved, score, the on-ice tracker, the active roster, and a running list of feeds related to the game. If the logged in user is the creator of the league, a settings button will appear which allows the user to update the game settings. Any user can come into any game and collaborate on the game. These statistics are deemed as either Scorbit Official or Unofficial (this will be explained next).

#### Scorbit Official
In an system like one that Scorbit has created, there comes into question the idea of information validity. Since anyone can come into a game and score a game, how does user differentiate from what is true about the game and what is not. We have cleared this up in a number of ways. Anyone in Scorbit can create teams and leagues, however one must be authorized to use at least two teams in order to create a game. There are two types of games that can happen, 'Exhibition' and 'Season'. An exhibition game happens between two teams however it is a one-time event, therefore because there is no league attached to the event, the statistics will not be aggregated towards any place. All that will be created is a list of feeds, which people can follow. This game is considered Scorbit Unofficial, because it does not contribute towards any entity statistics. However, it is our expectation that people will still want to know who is collaborating the right information, which is why statistics within this type of game are given the destination of Scorbit Official or Scorbit Unofficial. All collaborations made by the creator of the game are considered Scorbit Official and are given a marker to indicate this. The other type of game that can be created is a 'Season' game. This means that there is a league attached to the game, and this is part of a collection of games. The key here is that this game is part of a group or collection of games and therefore, the statistics have some value when aggregated. This game by definition is considered Scorbit Official and is given a marker to designate this. Similarly to and exhibition game, any statistics made by the game creator are given an indicator that they are Scorbit Official, while all others are considered Scorbit Unofficial. Only Scorbit Official statistics will contribute to an aggregation of statistics.

### Backend
#### Overview
The backend is supported by Parse[www.parse.com] (backend service developed and maintained by Facebook) and is communicated with using JavaScript.

#### Parse
As mentioned, Parse is a backend service created by Facebook. It was created in an attempt to simplify and quicken the process of instantiating and maintaing a backend/database. It provides a database, which is based on NoSQL/documents, and returns JSON-encoded objects. Parse provides different pricing plans, which allow certain levels of traffic and data usage. We are currently using the ******* plan. Each Application on Parse uses a unique key, which must be provided in the project in order to access its functionality. Classes can be easily created and each class contains key-value pairs. There are some preset classes including a User class, which provides access to username keys to introduce user-uniqueness. In addition every object in Parse is created with 4 preset keys. They are 'objectId', which is a unique alphanumeric set of characters used to differentiate itself with every object no only within its parent class but against every object in the application's database, 'createdAt', and 'updatedAt', and 'ACL' (Access Control Levels), which allows the developers to specify user rights to object.

#### Database
The database structure and setup is defined clearly in a separate document.

### Front End
 Rendering 
	2. Styling
	3. Templating
	4. MVC
	5. Dependencies
	6. File Structure
#### Rendering and Templating
Each page in Scorbit is rendered through the Underscore JS templating framework. There is one HTML file named 'index.html' which contains all the templates, which are injected into a container div once it has been cleared to render different pages.

#### Styling
Styling all pages is done with CSS, with complex animations done with CSS3 animation key frames. Right now, Scorbit has only been optimized for the latest version of Safari on a Mac and iPhone 4s.

#### MVC
We have implemented a model view controller architecture for the application using the popular Backbone JS, which is easily integrated with Parse which forks a version of Backbone, and underscore. All pages are handled by a separate view and routing is handled with a global router.

#### Dependencies
Scorbit is dependent on a few important technologies including jQuery, Parse's framework, Underscore JS, and Backbone JS.

#### File Structure
Scorbit's file structure is composed right now of a single HTML file called 'index.html' (currently 976 lines, 44 kb), a CSS folder which contains the styling file called 'scorbit.css' (currently 10087 lines, 215 kb), a JS folder which contains the main file 'scorbit.js' (currently 19797 lines, 736 kb), 'backbone.js', 'underscore.js', Parse JS framework, a fonts folder, and an images folder, which contains a few images such as the landing page background and the default avatar.

### Future
This is the minimum viable product of Scorbit, and as such there will be ongoing improvement. Some of the things we would like to implement are:
1. Move from CSS to SCSS for better control of size, ease-of-use, reusability, and modularity. This will also include implementing a BEM version of CSS class naming. Most styles will be placed on classes only as this provides a uniform level of specificity between all elements. Using BEM allows us to define a definite style, which will allow more collaboration between a team.
2. Clean up the main JavaScript file. This includes making things more modular, removing any unnecessary parts so that it is DRY, and in general reducing the size of the file for performance. All database queries will be assessed for their importance and some will be removed to improve performance and prevent hitting the burst limit set by Parse.
3. Create a more native experience on the iPhone. This will include implementing a better container structure, which will allow for a less 'hacky' over scroll implementation, implementing a pull to refresh feature, and handling touch better.
4. Possibly dividing the current views/pages into even more pages and views to create a better user experience.
5. We want this to be available to everyone so an important part will be optimizing the application for more devices/web browsers, as it currently only supports two.
6. Open up an API that developers can develop on top of, and allow people to grab a widget to place on their own sites.
7. Better data security.

There are more specific things we want to improve on but these are the most essential things at the moment.