# Raffle/Quiz/Survey Application for AI Students Club

## What do we want?

We want to create an app that allows us to make raffles/draws among the participants to select a winner, and also have an environment to create mutiple answer/question type of quizzes where the participants will compete to get the highest score.

Main idea is to have a one app to collect every functionality that we can use in all kind of events, instead of using Google Forms, Survey Monkey, Kahoot etc.



## What could it consist of?

This is an open place to write down ideas.


#### 1 - Raffle/Draw

**What is needed:**

Mostly for on-time events, where we want to select a winner among the participants, estimated to take around 5-10 minutes.

- An easy-to-use interface to add participants, might be an auto-generated QR code that redirects to enter personal data.
- Open and transparent raffle/draw process to show the winner.

**Extra features:**

We might want to create an environment to make long-term raffles, where the participants can enter the raffle at the given time and the winner will be selected later.

We can add different ways to earn points that will increase the chances to win the raffle, like sharing, inviting, liking, etc.

**Ideas for Raffle System - 26.02.24**

Two user control flows, one for guests and one for users.

Guests are able to:
- Enter raffles using information requested by the raffle creator (name, student ID, e-mail etc.).
- See the current process, winner name, how many people entered

Raffle participants are authenticated using the information requested by the raffle creator + IP address tracking & local storage (cookies).

Users are able to:
- Create raffles for others to join and participate
	- Start time options:
        - Manual
        - Scheduled
            - End time
            - Duration
    - Requested information / form fields
        - Create questions and edit answer types, make it required or optional
    - Description of the winner prize, could be optional
- Start raffles and project in the conferece/event
    - ID and QR code to let people join
    - Participants list, user can remove participants
    - Turn on/off the entry
    - Select x number of winner ducks
- See information about previous raffles



**Guest Perspective**

Scans the QR code -> `winnerduck.com/raffle/[id]`
Goes to `winnerduck.com` and enters the raffle ID. Enter redirects to the raffle page.
Can see the title of the raffle, description, and the prize.
Fills the required information and joins the raffle.
Cannot see any information about the raffle after joining, only the winner name after the raffle ends.

**User Perspective**

Goes to the user panel: `winnerduck.com/panel`

Can see the list of raffles created, ready to be used.
Can start it and project it in the event: `winnerduck.com/panel/raffle/[id]`

Can see the list of previous raffles.
Can click any previous raffle to see the details.
Can download the information.

Can create a new raffle.
Can set the start time, end time, duration, and the requested information.



#### 2 - Quiz/Kahoot Alternative

This one is a bit more complex, since the users has to be connected to the app in real time.

... (to be continued)


#### 3 - Survey/Forms

Since we have come along this far, we might want to add a survey functionality to replace Google Forms as well as a bonus.



## What do we need?

- A fast and reliable database we could use in long-term
- Up and running server all the time
- Simple front-end for users
- Admin panel to manage the events
- A good UI/UX design both for the web and mobile



#### Database

For starters we could use Firebase since we already used it before and it's easy to use.


#### Server

We need to find a good server that can handle the traffic. The most crowded situation would be a quiz with up to 1000 participants at the same time.


#### User Front End

Since the app will be used in events, we cannot expect everyone to download the app. We can make a nice web interface that can be used in mobile devices as well.

For both users and admin panel, we could use Next JS.

Users should be able to:
- Enter the raffle
    - See the raffle process, if they won or not
- Enter the quiz
    - See how many participants are in the quiz
    - See how many questions are left
    - See the time left
    - See their score
    - See the highest/top 5 etc.
    - See the correct answers after the everyone answered
- Fill the survey
    - See the questions
    - Fill the answers

#### Admin Panel

Admins should be able to:
- Create raffles
    - See the participants
    - Turn on/off the entry
    - Select the winner
- Create quizzes (we can go completely Kahoot like)
    - Add questions
        - Single choice
        - Multiple choice
        - True/False
    - Set time limit
- Create surveys
    - Add questions
        - Single choice
        - Multiple choice
        - True/False
        - Text
            - ReGex validation
            - One liner/Paragraph
        - Slider (1-10)
    - See the answers and change
    - Turn on/off the survey for entry


#### UI/UX Design

God help us.
