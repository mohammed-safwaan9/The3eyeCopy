THE3EYE — FINAL IMPLEMENTATION FIX
====================================

IMPORTANT:

EDIT THE EXISTING USER-FACING APPLICATION DIRECTLY.

DO NOT CREATE A NEW SCREEN.
DO NOT CREATE A NEW DESIGN.
DO NOT CREATE AN ICON LIBRARY SCREEN.
DO NOT GENERATE A SEPARATE MOCKUP.
DO NOT JUST CREATE ASSETS.

The current Home screen is STILL visually inconsistent with the The3eye Pro screen.

The The3eye Pro screen is the GLOBAL VISUAL SOURCE OF TRUTH.

Your job is to actually migrate the CURRENT APPLICATION to that design system.

==================================================
1. USE THE EXISTING PREMIUM SCREEN AS THE MASTER
==================================================

Take the CURRENT The3eye Pro screen and use it as the visual reference for the entire application.

The following MUST match its visual language:

- background
- surface colours
- typography
- font family
- font weights
- secondary text
- borders
- spacing
- corner radius
- button styling
- icon styling
- colour intensity
- visual hierarchy

Do NOT make every screen identical.

Make every screen feel like the SAME PRODUCT.

==================================================
2. ONE FONT — NO EXCEPTIONS
==================================================

The current app still has different-looking typography between screens.

FIX THIS GLOBALLY.

Use ONE font family throughout the application.

Use the SAME font family as the current Premium screen.

This applies to:

- Home
- Search
- Route
- Navigation
- Profile
- Settings
- Premium
- Reports
- Vehicles
- Journey completion
- buttons
- tabs
- cards
- map controls
- bottom bars

NO SECOND FONT.
NO SUBSTITUTE FONT.
NO SCREEN-SPECIFIC FONT.

The typography should feel identical in character throughout the application.

==================================================
3. HOME SCREEN — CURRENT SCREEN NEEDS VISUAL REFINEMENT
==================================================

The current Home screen is too flat and generic.

Do NOT change its basic structure.

Refine:

- deep navy background
- navy surfaces
- soft white text
- muted blue-grey secondary text
- Signal Green accents
- subtle cool borders
- consistent spacing
- consistent corner radii
- consistent icon weight

The map should remain the primary visual element.

Do NOT cover the map with unnecessary cards.

==================================================
4. HOME MAP CONTROLS
==================================================

The actual map should contain:

LEFT:
Three-line menu

RIGHT:
Speaker

MAP CONTROLS:
Compass
Re-center

These must be ACTUAL INTERACTIVE CONTROLS.

Do not display the three-line menu on unrelated screens.

Do not create duplicates.

--------------------------------------------------
RE-CENTER
--------------------------------------------------

The Re-center control is REQUIRED.

When the user pans/moves the map away from their current position:

SHOW RE-CENTER.

Tap Re-center:

→ return to user's current location
→ restore map tracking
→ preserve current state

Use the official The3eye Re-center icon.

--------------------------------------------------
COMPASS
--------------------------------------------------

The compass must be a real map control.

Keep it small and elegant.

It should visually match the Premium design system.

==================================================
5. SEARCH BAR
==================================================

The current "Where to?" search bar should feel like a premium navigation control, not a random dark rectangle.

Use:

- same background family as Premium surfaces
- same typography
- same border treatment
- same icon family
- subtle elevation
- proper touch target

Keep:

Search icon
"Where to?"
Microphone

The microphone must actually work.

==================================================
6. MICROPHONE — ACTUAL FUNCTION
==================================================

When the user taps the microphone:

- request microphone permission if necessary
- enter listening state
- visibly indicate listening
- capture speech
- convert speech to search text
- show recognized text
- allow the user to select a destination

Do NOT simply animate the microphone.

==================================================
7. ICON SYSTEM
==================================================

THE CURRENT APPLICATION STILL CONTAINS DIFFERENT ICON STYLES.

FIX THIS GLOBALLY.

The icon library is NOT a user-facing screen.

Use ONE official The3eye icon family directly throughout the ACTUAL APPLICATION.

Replace the inconsistent current icons.

Same:

- geometry
- stroke weight
- optical sizing
- corner treatment
- proportions
- interaction states

Apply it directly to:

- menu
- speaker
- search
- microphone
- compass
- re-center
- report
- settings
- layers
- close
- back
- end journey
- vehicles
- report categories
- search categories

==================================================
8. ICON COLOUR
==================================================

Do not make all icons grey.

Do not make all icons neon.

Use colour intentionally.

Traffic checking → red
Camera → blue
Hazard → orange
Accident → purple
Roadwork → yellow
Road closure → dark/neutral

System icons can remain primarily monochrome with Signal Green active states where appropriate.

==================================================
9. COLOURED VEHICLES
==================================================

The actual application must contain proper coloured vehicle graphics.

Vehicles:

- Car
- Scooter
- Motorcycle
- Bicycle

These must be original vector designs.

NO:
- emoji
- grey placeholders
- generic symbols

Vehicle colours:

Black
White
Silver
Grey
Blue
Red
Green
Yellow

Selected vehicle colour must persist.

Example:

Blue Car selected
→ Blue Car appears as the real navigation marker.

==================================================
10. ACTIVE NAVIGATION
==================================================

The navigation screen MUST use the SAME visual system as Premium.

Do not leave it in the current generic dark-grey style.

Use:

- Premium background
- Premium navy surfaces
- Premium typography
- Premium secondary text
- Premium green accents
- same icon family

KEEP:

- manoeuvre
- road name
- distance
- route
- vehicle marker
- live alerts
- speed
- speed limit
- ETA
- distance
- route status
- menu
- speaker
- compass
- re-center
- report

REMOVE:

- current time
- permanent Ahead list
- stacked future alert cards
- giant report button
- duplicate search

==================================================
11. NAVIGATION HEADER
==================================================

LEFT:
Three-line menu

CENTRE:
Turn instruction
Road name
Distance

RIGHT:
Speaker

The typography must use the SAME FONT as Premium.

Do not use the current inconsistent font styling.

==================================================
12. SPEAKER BEHAVIOUR
==================================================

The speaker must behave as a quiet navigation assistant.

Do NOT copy Google Maps conversational behaviour.

Default:

concise instructions
short alerts
no filler
no repeated explanations
no unnecessary commentary

Examples:

"Turn right in 150 metres."

"Camera ahead."

"Traffic checking reported 500 metres ahead."

Preserve:

Normal
Less chatty
More detailed
Alerts only
Off

The selected setting must persist and actually affect voice output.

==================================================
13. VOICE SETTINGS — MUST BE VISIBLE
==================================================

The current app is still missing the actual voice-behaviour choices.

Add to the REAL Voice & Audio settings screen:

VOICE BEHAVIOUR

Normal
Less chatty
More detailed
Alerts only
Off

Also preserve:

Voice
Voice preview
Volume
Voice alerts
Visual alerts
Haptic feedback
Route mode only

==================================================
14. SPEED
==================================================

Keep the speedometer.

Show:

Current speed
Speed limit

Use Premium typography.

Keep it compact.

Speed may become red when exceeding the speed limit.

==================================================
15. BOTTOM NAVIGATION INFORMATION
==================================================

Use ONE elegant driving-information area.

Show:

24 min · 14.2 km

and:

Mostly clear

DO NOT SHOW THE CURRENT CLOCK/TIME.

Do not create multiple giant cards.

==================================================
16. REPORT CONTROL
==================================================

Use a small elegant Report icon.

Do not use a huge Report button covering the map.

The report interaction must work.

==================================================
17. REPORT BUG — FIX BEFORE ANY VISUAL FINISHING
==================================================

The application currently BREAKS when adding a report.

This is a blocking bug.

Fix it before considering the work complete.

Test:

Traffic checking
Speed camera
Accident
Road hazard
Roadwork
Flooding
Road closed
Traffic

The flow must:

- open
- select category
- preserve location
- allow private evidence
- submit
- show success
- return safely to the previous/current context

NO CRASH.
NO BLANK SCREEN.
NO BROKEN STATE.

==================================================
18. END JOURNEY
==================================================

End Journey must be convenient.

Use:

X-in-circle

inside the existing navigation control flow/menu.

Do NOT place it permanently over the map.

Do NOT bury it behind unnecessary screens.

Tap:

End journey

SHOW:

End this journey?

You have 20 min remaining to Cyber City, Gurugram.

[ End journey ]

[ Keep driving ]

End journey:
→ stop navigation
→ You Arrived

Keep driving:
→ dismiss
→ return to navigation

Both buttons must work.

==================================================
19. REMOVE UNWANTED TIME
==================================================

Do not show:

10:59 PM
02:13 PM
03:25 PM arrival

or any other current clock display in the navigation UI where it has been removed.

==================================================
20. DO NOT RE-ADD AVOID TOLLS
==================================================

"Avoid tolls" remains REMOVED.

Do not add it back anywhere.

==================================================
21. SEARCH + DESTINATIONS
==================================================

Keep:

Saved
Home
Work
Recent

Categories:

Fuel
Food
Parking
Groceries
Coffee
Shopping
Pharmacy
EV Charge
Hospital
Hotel
Park
Crisis

Use the same icon family and global typography.

==================================================
22. PROFILE
==================================================

Keep the existing Profile information architecture.

Migrate its visual styling to the Premium design system.

Do not redesign the structure unnecessarily.

==================================================
23. PREMIUM
==================================================

The current Premium screen is the strongest screen.

DO NOT DESTROY ITS CURRENT DESIGN.

Preserve it.

Use it as the visual source of truth for every other screen.

Keep:

Paid Pro

and:

Earn Pro through verified contributions.

==================================================
24. LIGHT THEME
==================================================

Light theme must use the same universal design system.

Same:

- font
- icon family
- semantic colours
- component styling
- spacing
- hierarchy

==================================================
25. FINAL "NO MORE EXCUSES" QA
==================================================

Before saying the task is complete, inspect the ACTUAL RUNNING APP.

Do not inspect only an icon library.

Do not inspect only a design board.

Verify:

GLOBAL

[ ] Every screen uses the SAME font
[ ] Every screen uses the Premium visual language
[ ] Backgrounds match the Premium colour family
[ ] Surfaces match
[ ] Text hierarchy matches
[ ] Icons match
[ ] Borders match
[ ] Spacing matches

HOME

[ ] Three-line menu on map
[ ] Speaker on map
[ ] Compass exists
[ ] Re-center exists
[ ] Re-center works
[ ] Search looks premium
[ ] Microphone works
[ ] Report control works

SEARCH

[ ] Same font
[ ] Same colours
[ ] Same icon system
[ ] Categories work
[ ] Microphone works

ROUTE

[ ] Same visual language
[ ] Same font
[ ] No unwanted clock-style arrival time
[ ] Route alerts work
[ ] Vehicle selector works

NAVIGATION

[ ] Same font as Premium
[ ] Same colour system as Premium
[ ] No current clock
[ ] No Ahead section
[ ] No giant Report button
[ ] Menu works
[ ] Speaker works
[ ] Speaker is concise
[ ] Less chatty option exists and works
[ ] Compass exists
[ ] Re-center exists and works
[ ] Speedometer works
[ ] Speed limit works
[ ] Bottom bar is clean
[ ] Coloured vehicle marker exists
[ ] End Journey is easy
[ ] End Journey works

REPORT

[ ] Add report does not crash
[ ] Every category works
[ ] Submission works
[ ] Return flow works

VEHICLES

[ ] Car exists
[ ] Scooter exists
[ ] Motorcycle exists
[ ] Bicycle exists
[ ] Vehicles are coloured
[ ] Selected vehicle persists
[ ] Navigation marker matches selected vehicle

==================================================
FINAL COMMAND
==================================================

DO NOT CREATE MORE ASSETS.

DO NOT CREATE MORE SCREENS.

DO NOT CREATE AN ICON LIBRARY FOR THE USER.

FIX THE ACTUAL APP.

MIGRATE THE ENTIRE ACTUAL APP TO THE PREMIUM SCREEN'S VISUAL SYSTEM.

ONE FONT.
ONE COLOUR SYSTEM.
ONE ICON SYSTEM.
ONE COMPONENT SYSTEM.

The current Home, Route and Navigation screens must no longer look like separate designs.

They must look like different screens OF THE SAME THE3EYE APP.

DO NOT FINISH UNTIL THE ACTUAL USER-FACING APP PASSES THE CHECKLIST ABOVE.