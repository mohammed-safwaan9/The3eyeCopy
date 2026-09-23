THE3EYE — FINAL PRODUCTION FIX
================================

IMPORTANT:
THIS IS A FINAL REFINEMENT AND BUG-FIX PASS ON THE EXISTING THE3EYE APPLICATION.

DO NOT REBUILD THE APPLICATION.
DO NOT CREATE A NEW APP.
DO NOT CREATE ALTERNATIVE SCREENS.
DO NOT CREATE DEMO SCREENS.
DO NOT CREATE AN ICON-LIBRARY SCREEN FOR USERS.
DO NOT CREATE NEW FEATURES UNLESS THEY ARE EXPLICITLY REQUESTED BELOW.

MODIFY THE EXISTING USER-FACING APPLICATION DIRECTLY.

The goal is to make the current The3eye application feel like ONE polished, premium, production-ready navigation product.

============================================================
PRIORITY ORDER — DO THESE IN THIS ORDER
============================================================

1. FIX BROKEN FUNCTIONALITY.
2. RESTORE MISSING FUNCTIONALITY.
3. ESTABLISH ONE GLOBAL VISUAL SYSTEM.
4. APPLY THAT SYSTEM TO EVERY EXISTING SCREEN.
5. INTEGRATE THE ICONS INTO THE ACTUAL APP.
6. TEST THE ACTUAL USER FLOWS.
7. ONLY THEN CONSIDER THE TASK COMPLETE.

DO NOT declare completion because assets were created.
DO NOT declare completion because a design board was created.
DO NOT declare completion because one screen looks good.

THE REAL APPLICATION MUST BE FIXED.

============================================================
1. MASTER VISUAL REFERENCE — THE3EYE PRO SCREEN
============================================================

The current The3eye Pro / Premium screen is the strongest visual screen in the existing application.

USE THAT SCREEN AS THE GLOBAL VISUAL SOURCE OF TRUTH.

Do NOT copy it literally.

Instead, propagate its visual design language throughout the entire application.

The rest of the app must feel like it was designed by the SAME DESIGN TEAM using the SAME DESIGN SYSTEM.

Apply the Premium screen's:

- background treatment
- navy surface treatment
- typography
- typography hierarchy
- text contrast
- colour balance
- Signal Green treatment
- cool blue-grey secondary text
- border treatment
- spacing rhythm
- corner-radius logic
- button treatment
- card treatment
- icon treatment
- visual density

to:

- Home
- Search
- Route Preview
- Active Navigation
- Report
- Profile
- Settings
- Vehicles
- Journey History
- Journey Completion
- Premium
- all sheets
- all menus
- all cards
- all controls

The screens can have different layouts because their purposes are different.

BUT THEY MUST LOOK LIKE THE SAME PRODUCT.

============================================================
2. ONE UNIVERSAL FONT — ABSOLUTELY NO EXCEPTIONS
============================================================

THIS IS A GLOBAL RULE.

THE ENTIRE APPLICATION MUST USE ONE SINGLE FONT FAMILY.

Use the EXACT SAME FONT FAMILY already used by the current The3eye Pro/Premium screen.

Do not substitute another font on any screen.

Do not use a different font for navigation.

Do not use a different font for search.

Do not use a different font for route preview.

Do not use a different font for Profile.

Do not use a different font for settings.

Do not use a different font for map controls.

Do not use a different font for cards or buttons.

ONE FONT FAMILY.
ONE TYPE SYSTEM.
ONE TYPOGRAPHIC LANGUAGE.

The user must not notice a change of typeface when moving between screens.

Use one coherent hierarchy for:

- Display
- Large headings
- Screen headings
- Section headings
- Body
- Secondary text
- Captions
- Navigation values
- Alert values
- Buttons
- Tabs
- Labels

The Premium screen is the typography reference.

============================================================
3. GLOBAL DARK COLOUR SYSTEM
============================================================

The dark application must use the same colour language as The3eye Pro.

PRIMARY BACKGROUND:

Deep blue-black / near-black with a subtle navy undertone.

Do NOT use generic pure black as the primary application background.

SURFACES:

Dark navy, slightly lighter than the background.

Use for:
- cards
- sheets
- panels
- controls
- navigation surfaces

TEXT:

Primary:
soft white

Secondary:
muted blue-grey

Tertiary:
subtle darker blue-grey

BORDERS:

Subtle cool blue-grey.

Do not use bright borders everywhere.

SHADOWS:

Minimal and controlled.

Do not create heavy floating-card shadows.

============================================================
4. GLOBAL SEMANTIC COLOURS
============================================================

Signal Green:
- primary action
- confirmation
- active/selected positive states
- The3eye brand

Enforcement Red:
- Traffic Checking
- enforcement
- critical warnings

Camera Blue:
- Speed Camera

Hazard Orange:
- Hazards

Purple:
- Accidents

Yellow:
- Roadwork

Dark/Neutral:
- Road Closure

IMPORTANT:

Do NOT make everything neon.

Do NOT make every icon green.

Do NOT make every screen colourful.

Use colour to communicate meaning and state.

============================================================
5. ONE GLOBAL ICON SYSTEM
============================================================

The previously created icon library is ONLY a source/design reference.

DO NOT CREATE A USER-FACING ICON LIBRARY SCREEN.

Do NOT leave the current inconsistent icons throughout the application.

REPLACE THE CURRENT INCONSISTENT ICONS DIRECTLY INSIDE THE EXISTING APP.

Every repeated action must use the SAME icon design.

Use one official original The3eye icon family for:

- Menu
- Speaker
- Search
- Microphone
- Compass
- Re-center
- Report
- Layers
- Settings
- Close
- Back
- End Journey
- Share
- Pause
- Resume
- Vehicle icons
- Road-report icons
- Search-category icons

Same:
- geometry
- stroke/weight
- proportions
- corner treatment
- optical size
- interaction states

DO NOT MIX:
- emojis
- random AI icons
- Material Icons
- SF Symbols
- Google Maps icons
- Waze icons
- random SVG icon styles

Create/use original The3eye iconography.

MOST IMPORTANT:

DO NOT JUST CREATE THE ICONS.

ACTUALLY REPLACE THE OLD ICONS IN THE REAL APPLICATION.

============================================================
6. UNIVERSAL MAP CONTROLS
============================================================

The three-line menu belongs to MAP / NAVIGATION experiences only.

Do NOT place it on every screen.

On map/navigation experiences:

LEFT:
Three-line menu

RIGHT:
Speaker / voice

MAP:
Compass
Re-center

These must be real interactive controls.

============================================================
7. RE-CENTER — MANDATORY
============================================================

The Re-center control must exist in the actual map.

When the user pans or moves away from their current location:

SHOW RE-CENTER.

When tapped:

- return to current location
- restore correct map tracking
- preserve current route/navigation state

It must actually work.

Do not merely show the icon.

Do not put Re-center only in the design library.

It must be integrated into:

- Home map
- Active Navigation
- relevant map views

============================================================
8. COMPASS — MANDATORY
============================================================

The compass/orientation control must exist in the actual map.

Keep it compact and elegant.

It must be a real map control.

Use the official The3eye icon.

Do not make it decorative.

============================================================
9. SPEAKER — QUIET, LESS-CHATTY BEHAVIOUR
============================================================

The current speaker control behaves too much like Google Maps.

Change the voice behaviour.

The3eye should use a concise navigation style closer to a low-noise, Waze-like experience.

DEFAULT:

Short useful instructions.

Examples:

“Turn right in 150 metres.”

“Camera ahead.”

“Traffic checking reported 500 metres ahead.”

DO NOT:

- ramble
- explain obvious things
- use conversational filler
- repeat unnecessary information
- give long conversational responses
- turn navigation into a talking assistant

============================================================
10. VOICE BEHAVIOUR SETTINGS — MUST EXIST
============================================================

The actual application must contain:

VOICE BEHAVIOUR

- Normal
- Less chatty
- More detailed
- Alerts only
- Off

These are NOT visual-only controls.

The selected option must persist and actually change navigation voice behaviour.

DEFAULT should already be concise.

LESS CHATTY should be even more selective.

MORE DETAILED can provide additional useful context.

ALERTS ONLY should only speak important alerts.

OFF should produce no voice navigation.

============================================================
11. MICROPHONE — MUST ACTUALLY WORK
============================================================

The microphone in Search must be functional.

Tap microphone:

1. Request microphone permission if needed.
2. Enter listening state.
3. Clearly show that the app is listening.
4. Capture speech.
5. Convert speech into search text.
6. Display the recognized text.
7. Allow the user to select the destination.

Do NOT just animate the microphone.

Do NOT leave a decorative microphone control.

It must be a real interaction.

============================================================
12. REPORT BUG — CRITICAL
============================================================

THE CURRENT APP BREAKS WHEN ADDING A REPORT.

FIX THIS BEFORE ANYTHING ELSE.

The Add Report flow must:

- open correctly
- show categories
- allow category selection
- preserve current location
- capture timestamp
- allow private photo evidence
- submit
- show successful submission
- return safely to the correct context

Test every category:

- Traffic checking
- Speed Camera
- Accident
- Road Hazard
- Roadwork
- Flooding
- Road Closed
- Traffic

NO:
- crash
- blank screen
- broken navigation
- frozen state
- invalid route
- lost navigation context

============================================================
13. REPORT INTERFACE
============================================================

Keep report submission extremely simple.

Use one-tap category selection where possible.

Private photo evidence is verification evidence and must NOT become public report media.

After submission:
show a clear success state.

============================================================
14. HOME MAP
============================================================

The map remains the dominant element.

KEEP:
- map
- destination search
- semantic report markers
- relevant map controls

REMOVE:
- permanent nearby count/status clutter
- permanent traffic-checking card
- oversized Report Something button
- duplicate Search button
- permanent Ahead section

The map should feel spacious.

============================================================
15. HOME SEARCH
============================================================

Use a premium navigation search field.

Keep:

Search icon
Where to?
Microphone

Make it thumb-friendly.

Use the universal font and icon system.

============================================================
16. SEARCH SCREEN
============================================================

Preserve the existing useful structure.

Keep:

- Search
- microphone
- Explore Nearby
- Saved Places
- Recent

Saved:
- Home
- Work
- Recent

Explore categories:

- Fuel
- Food
- Parking
- Groceries
- Coffee
- Shopping
- Pharmacy
- EV Charge
- Hospital
- Hotel
- Park
- Crisis

Use the SAME icon family and the SAME global font.

============================================================
17. ROUTE PREVIEW
============================================================

The current route preview needs visual refinement.

Keep the existing functionality:

- destination
- route
- ETA
- distance
- route alternatives
- live route alerts
- vehicle selector
- Start Journey

Visually migrate the screen to the Premium design system.

Use:
- deep blue-black background
- dark navy surfaces
- Premium typography
- blue-grey secondary text
- Signal Green actions
- semantic alert colours
- universal icon family

The route remains visually dominant.

============================================================
18. ROUTE PREVIEW — REMOVE UNWANTED TIME
============================================================

DO NOT display unnecessary clock-style arrival/current-time information.

REMOVE displays such as:

03:25 pm arrival

when they represent the unwanted time treatment.

Use:

24 min · 14.2 km

instead.

============================================================
19. ROUTE ALERTS
============================================================

Preserve route alerts.

Example:

Traffic checking
420 m

Speed camera
1.2 km

Roadwork
4.8 km

Use the proper semantic icons and colours.

Keep the cards compact and elegant.

============================================================
20. VEHICLE SYSTEM
============================================================

The application must contain proper vehicle selection.

Vehicles:

- Car
- Scooter
- Motorcycle
- Bicycle

Create/use original premium VECTOR vehicle designs.

NO:
- emoji
- generic grey placeholders
- unrelated symbols

Vehicle colours:

- Black
- White
- Silver
- Grey
- Blue
- Red
- Green
- Yellow

Selected vehicle and colour must persist.

Example:

Blue Car selected
→ Blue Car becomes the actual navigation marker.

Use the same selected vehicle representation in:

- Vehicle Selector
- Route Preview
- Active Navigation
- Profile → Vehicles
- Journey History where appropriate

============================================================
21. ACTIVE NAVIGATION — VISUAL MIGRATION
============================================================

The current active navigation screen still looks like an older design.

VISUALLY MIGRATE IT TO THE PREMIUM DESIGN SYSTEM.

Do not redesign the navigation architecture.

MAP = PRIMARY.

TOP:

LEFT:
Three-line menu

CENTRE:
Next manoeuvre
Road name
Distance

RIGHT:
Speaker

MAP:
Route
Selected vehicle
Relevant report markers
Compass
Re-center when map has moved

============================================================
22. ACTIVE NAVIGATION — REMOVE CLUTTER
============================================================

REMOVE:

- current clock/time
- permanent Ahead section
- 420m / 1.2km / 4.8km stacked future-alert list
- giant Report Something button
- duplicate Search control
- unnecessary cards

KEEP:

- manoeuvre
- road name
- manoeuvre distance
- route
- vehicle marker
- important live alerts
- speedometer
- speed limit
- ETA
- distance
- route status
- menu
- speaker
- compass
- Re-center
- small Report control

============================================================
23. ACTIVE NAVIGATION — TYPOGRAPHY
============================================================

The navigation screen must use the EXACT SAME FONT as Premium.

For example:

Turn right
Golf Course Road
150 m

must use the same typeface and typographic language as:

Drive smarter.
Stay focused.

on Premium.

Do not use a separate navigation font.

============================================================
24. ACTIVE NAVIGATION — COLOUR
============================================================

Use the Premium colour language.

Background:
deep blue-black

Surfaces:
dark navy

Primary text:
soft white

Secondary:
muted blue-grey

Positive/selected:
Signal Green

Warnings:
semantic colours

The navigation screen must no longer look like a generic dark-grey application.

============================================================
25. SPEEDOMETER
============================================================

Keep the speedometer.

Position it in the lower map area / bottom-left.

Show:

CURRENT SPEED
SPEED LIMIT

next to each other in a compact treatment.

If speed exceeds the limit, the speed value may become Enforcement Red.

Use Premium typography.

============================================================
26. BOTTOM DRIVING BAR
============================================================

Create ONE clean driving information area.

Prioritize:

24 min · 14.2 km

and:

Mostly clear

Do NOT display current clock/time.

Do NOT create multiple giant information cards.

Do NOT use unnecessary dividers.

Use the same Premium typography and surface language.

============================================================
27. REPORT CONTROL DURING NAVIGATION
============================================================

Use a small elegant Report icon/control.

Do not use an oversized report button.

It must be accessible without dominating the map.

============================================================
28. END JOURNEY
============================================================

The End Journey experience must be convenient.

Use the approved:

X-in-circle

End Journey control.

Do NOT place a permanent giant End Journey button over the map.

Do NOT place it awkwardly at the top centre.

Make it quickly reachable through the existing navigation controls/menu.

When activated:

SHOW:

End this journey?

You have 20 min remaining to Cyber City, Gurugram.

[ End journey ]
[ Keep driving ]

FUNCTION:

End journey
→ stop active navigation
→ show You Arrived

Keep driving
→ close confirmation
→ return to active navigation

Both must function.

============================================================
29. JOURNEY COMPLETION
============================================================

Preserve:

You arrived

Show:
- duration
- distance
- completion state

Done returns appropriately.

============================================================
30. JOURNEY HISTORY
============================================================

Preserve journey history.

Show:

- starting point
- travelled path
- destination

Use the global The3eye font, colour and icon system.

============================================================
31. PROFILE
============================================================

Keep the existing Profile information architecture.

Do NOT redesign it unnecessarily.

Apply the Premium visual system:

- same font
- same background
- same navy surfaces
- same text treatment
- same Signal Green
- same icon family
- same spacing
- same borders

============================================================
32. SETTINGS
============================================================

Use centralized settings.

Sections:

Alerts
Driving
Voice & Audio
Map
Privacy & Security
Account

Voice & Audio MUST visibly contain:

- Normal
- Less chatty
- More detailed
- Alerts only
- Off
- Voice selection
- Voice preview
- Volume
- Voice alerts
- Visual alerts
- Haptic feedback
- Route mode only

============================================================
33. THREE-LINE MENU SCOPE
============================================================

The three-line menu is a MAP / NAVIGATION control.

Do NOT put it unnecessarily on:

- Profile
- Premium
- Search
- unrelated settings screens

Those screens may use their own back navigation as appropriate.

============================================================
34. PREMIUM
============================================================

The current Premium screen is the MASTER VISUAL REFERENCE.

Preserve its strongest visual qualities.

Keep:

The3eye Pro

Drive smarter.
Stay focused.

Keep:

PAID PREMIUM

and:

EARN PRO THROUGH VERIFIED CONTRIBUTIONS

Do not redesign Premium into a different style.

============================================================
35. EARN PRO
============================================================

Users can obtain Pro in two legitimate ways:

1. Pay for Premium.
2. Earn Premium through verified, authentic contributions.

Only high-quality verified reports count.

Use factors such as:

- authenticity
- moderation approval
- GPS consistency
- timestamp consistency
- independent confirmation
- accuracy
- rejected reports
- duplicates
- suspicious behaviour
- contributor reliability

Do NOT reward raw report spam.

Keep the threshold configurable.

============================================================
36. ADS
============================================================

Ads may exist in appropriate non-critical areas.

Never let ads:

- block navigation
- cover critical alerts
- interfere with navigation controls
- distract active drivers

Premium can remain ad-free during driving.

============================================================
37. LIGHT THEME
============================================================

Create a deliberate light counterpart of the same design system.

Use the same:

- font
- typography hierarchy
- icon family
- semantic colours
- spacing
- components
- interaction states

Do not simply invert the dark theme.

============================================================
38. DESIGN SYSTEM CONSISTENCY
============================================================

ALL repeated components must belong to the same system:

- buttons
- cards
- sheets
- search bars
- tabs
- chips
- toggles
- controls
- alert cards
- vehicle cards
- map controls
- settings rows

Same:

- corner-radius logic
- padding
- typography
- icon sizing
- borders
- shadows
- state behaviour

============================================================
39. DO NOT COPY OTHER APPS
============================================================

You may use established navigation UX principles as inspiration.

DO NOT copy:

- Google Maps branding
- Waze branding
- Apple Maps branding
- Mappls branding
- their proprietary icons
- their exact screen layouts
- their exact visual identity
- their assets
- their wording

The result must remain ORIGINAL THE3EYE.

============================================================
40. FINAL FUNCTIONAL QA — ACTUALLY TEST IT
============================================================

Before finishing, test the REAL APPLICATION.

REPORT:

[ ] Add Report opens
[ ] No crash
[ ] Every category works
[ ] Location remains correct
[ ] Private evidence works
[ ] Submission works
[ ] Success state works
[ ] Return flow works

MICROPHONE:

[ ] Microphone works
[ ] Permission works
[ ] Listening state works
[ ] Speech becomes search text
[ ] Destination can be selected

VOICE:

[ ] Speaker works
[ ] Normal works
[ ] Less chatty works
[ ] More detailed works
[ ] Alerts only works
[ ] Off works
[ ] Selected setting persists
[ ] Voice is concise by default

MAP:

[ ] Menu works
[ ] Speaker works
[ ] Compass works
[ ] Re-center exists
[ ] Re-center works
[ ] Report works

ROUTE:

[ ] Start Journey works
[ ] Vehicle selection works
[ ] Vehicle persists
[ ] Route alerts work

NAVIGATION:

[ ] No clock
[ ] No permanent Ahead section
[ ] No giant Report button
[ ] No duplicate Search
[ ] Speedometer works
[ ] Speed limit works
[ ] Live alerts work
[ ] Menu works
[ ] Speaker works
[ ] Re-center works
[ ] Compass works
[ ] End Journey works

END JOURNEY:

[ ] X-in-circle exists
[ ] Easy to access
[ ] Confirmation works
[ ] End journey works
[ ] Keep driving works
[ ] You Arrived works

============================================================
41. FINAL VISUAL QA
============================================================

Compare ALL actual screens against the Premium screen.

Check:

[ ] ONE FONT EVERYWHERE
[ ] SAME TYPOGRAPHIC LANGUAGE
[ ] SAME DEEP BLUE-BLACK BACKGROUND LANGUAGE
[ ] SAME NAVY SURFACES
[ ] SAME BLUE-GREY SECONDARY TEXT
[ ] SAME SIGNAL GREEN
[ ] SAME BORDER LANGUAGE
[ ] SAME SPACING SYSTEM
[ ] SAME ICON FAMILY
[ ] SAME COMPONENT LANGUAGE

Home must look like The3eye.

Search must look like The3eye.

Route must look like The3eye.

Navigation must look like The3eye.

Profile must look like The3eye.

Settings must look like The3eye.

Premium must look like The3eye.

NO SCREEN SHOULD LOOK LIKE IT CAME FROM A DIFFERENT APP.

============================================================
42. FINAL NON-NEGOTIABLE RULE
============================================================

DO NOT JUST CREATE ASSETS.

DO NOT JUST CREATE ICONS.

DO NOT CREATE ANOTHER ICON LIBRARY SCREEN.

DO NOT ONLY CHANGE ONE SCREEN.

DO NOT CLAIM COMPLETION AFTER A VISUAL MOCKUP.

ACTUALLY MODIFY THE EXISTING USER-FACING APPLICATION.

FIX THE REPORT BUG.

MAKE THE MICROPHONE FUNCTION.

MAKE THE VOICE SETTINGS EXIST AND WORK.

MAKE THE SPEAKER CONCISE.

ADD WORKING RE-CENTER.

ADD WORKING COMPASS.

MAKE END JOURNEY EASY AND FUNCTIONAL.

REMOVE THE UNWANTED TIME.

KEEP AVOID TOLLS REMOVED.

MAKE THE VEHICLES PROPERLY COLOURED.

USE ONE UNIVERSAL FONT.

USE ONE UNIVERSAL COLOUR SYSTEM.

USE ONE UNIVERSAL ICON SYSTEM.

MAKE EVERY SCREEN VISUALLY BELONG TO THE PREMIUM DESIGN LANGUAGE.

THE CURRENT PREMIUM SCREEN IS THE VISUAL NORTH STAR.

THE FINAL APPLICATION MUST FEEL LIKE ONE COHESIVE, POLISHED, ORIGINAL THE3EYE PRODUCT.

DO NOT FINISH UNTIL THE ACTUAL USER-FACING APPLICATION REFLECTS THESE CHANGES.