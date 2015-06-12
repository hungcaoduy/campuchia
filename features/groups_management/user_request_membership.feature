@membership
Feature: User request group membership
	Part of the Epic "Group management", story "User request group membership"

	As a user
	I want to request for group membership
	In order to join the group's activities

	Scenario: Request for group membership
		Given that user is already authenticated
		When the user view a group
		Then he can send request for membership

@membership
Feature: Group owner accept a membership request
	Part of the Epic "Group management", story "Group owner accept a membership request"
	
	As a group owner
	I want to view pending membership requests
	And accept them
	In order for others to join our group's activities

	Background:
		Given that user is already authenticated
		And he is the owner of the "@group"

	Scenario: Empty membership requests
		Given no pending requests
		When he view the "@group"
		Then he should not see any requests
		And no action available for pending request

	Scenario: Non empty membership requests
		Given pending requests
			| from	| descriptions	|
			|	Hung Cao Duy	|	bla bla bla	|
			|	Ronaldo Nguyen	|	blo blo blo	|
		When he view the "@group"
		Then he should view the requests
			| from	| descriptions	|
			|	Hung Cao Duy	|	bla bla bla	|
			|	Ronaldo Nguyen	|	blo blo blo	|
		And he accept each requests