@users
Feature: User view list of others users
    Part of "Users Listing" Epic

    As a user
    I want to find others users
    In order to view their profile and look for friends

    Background
        Given that the system already exist following users:
            |   Full Name       |   Email               |   Groups joined   |   Id  |
            |   Duy Hung Cao    |   hungcdqt@gmail.com  |   001, 002        |   001 |
            |   Ronaldo Nguyen  |   ronaldo@gmail.com   |   003             |   002 |

    Scenario: Search term is empty
        When search term is empty
        Then all users will be listed


    Scenario Outline: Search by Name
        When user search by "<term>"
        Then matched "<users>" will be listed
    Examples:
        | term  |   users       |
        |   Duy |   001         |
        |   uy  |   001, 002    |