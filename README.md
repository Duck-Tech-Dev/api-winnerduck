# Raffle/Quiz/Survey Application for AI Students Club

## What do we want?

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

<br>

God help us.
