@authenticate
Feature: Register
	Part of "Authenticate" epic

	As a user
	I want to register
	In order to join the social network's activities

	Background:
	Given that user has not registered
	And the system exist following users:
        |   Full Name       |   Email               |   Id  |
        |   Duy Hung Cao    |   hungcdqt@gmail.com  |   001 |
        |   Ronaldo Nguyen  |   ronaldo@gmail.com   |   002 |


	Scenario Outline: User register successfully
	When user provide valid information:
	Then the system create a new account
	Examples:
		|	Full Name	|	Email					|
		|	Tuan Anh	|	tuananh@gmail.com		|
		|	Cong Phuong	|	congphuong@gmail.com	|

	Scenario: User register with taken email
	When user provide an email that has been taken
	Then the system inform the error
	And no account created

	Scenario: User register with an invalid email
	When user provide an invalid email
	Then the system inform the "invalid email" error
	And no account created

	#validator?