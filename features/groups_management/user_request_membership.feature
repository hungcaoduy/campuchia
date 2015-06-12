@membership
Feature: User request group membership
	Part of the Epic "Group management", story "User request group membership"

	As a user
	I want to request for group membership
	In order to join the group's activities

	Scenario: Request for group membership
		Given that user is already authenticated
		When the user see a group
		Then he can send request for membership

Feature: Group owner accept a membership request
	Part of the Epic "Group management", story "Group owner accept a membership request"
	
	As a group owner
	I want to accept the membership request
	In order for others to join our group's activities

	Scenario: View membership request
		Given that user is already authenticated
		And he is the owner of the "@group"
		Then he can view his group's membership requests

	Scenario: Accept membership request
		Given that user is already authenticated
		And he is the owner of the "@group"
		Then he can accept his group's membership requests		