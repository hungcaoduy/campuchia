Feature: System validate group name
    Part of the "Create Group" story

    As a group owner
    I want to see if my chosen name is valid
    #Only check if the name is taken or not

    Background:
        Given that the system already exist following groups:
            |   Morning Practice Football team   |
            |   Weekend Phuot team  |
            |   Weekend Bear team   |
    
    Scenario: User enter an existing group name
        When user enter an existing group name
        Then the error message shown
        And the groups list does not changed

Feature: User create group
    Part of the "Create Group" story

    As a user
    I want to create a group
    In order to invite others user to join

    Background:
        Given that I am already logged in
        And that the system already exist following groups:
            |   Morning Practice Football team   |
            |   Weekend Phuot team  |
            |   Weekend Bear team   |

    Scenario: User create his first group, with an available name

    Scenario: User create his second group, with an available name

    Scenario: User create a group with existing name
