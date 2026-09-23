Yep bro. **This is the final master prompt.** I’ve consolidated everything you’ve told me across the whole redesign, including the things you specifically said **must be removed**, the things that must **actually function**, and the things that should be moved rather than duplicated.

Paste this into Figma Make **after the hard reset**:

```text
THE3EYE — FINAL MASTER PRODUCT PROMPT
COMPLETE UX/UI + INTERACTION + NAVIGATION REFINEMENT

IMPORTANT:

This is the FINAL refinement pass for The3eye.

Do not keep asking for my opinion after every change.
Do not continuously add new UI.
Do not redesign things simply for the sake of redesigning them.

Use your own product-design judgement.

The objective is to take the existing The3eye experience and make it feel like a real, polished, production-ready mobile navigation application.

The result must feel:

REAL
NATIVE
PREMIUM
FAST
CLEAN
SEXY
PROFESSIONAL
EASY TO USE
ORIGINAL

It must NOT look AI-generated.

Use mature navigation products such as Google Maps, Waze, Apple Maps and Mappls as UX inspiration only.

DO NOT copy their:
- branding
- logos
- proprietary icons
- assets
- illustrations
- exact layouts
- distinctive visual treatments
- wording

Create an original The3eye design language.

==================================================
01 — ABSOLUTE DESIGN RULE
==================================================

DO NOT ADD UI UNLESS IT HAS A PURPOSE.

If something is unnecessary:
REMOVE IT.

If two controls perform related functions:
COMBINE THEM.

If something belongs in Settings:
MOVE IT TO SETTINGS.

If something is difficult to reach:
REPOSITION IT.

If something looks decorative:
REMOVE IT.

If a button looks interactive:
MAKE IT ACTUALLY WORK.

The final product should feel like there is nothing unnecessary left.

==================================================
02 — THE3EYE VISUAL IDENTITY
==================================================

Use The3eye's own identity.

Primary brand colour:

SIGNAL GREEN

Use green intentionally, not everywhere.

Semantic alert colours:

Traffic checking / enforcement → RED
Speed camera → BLUE
Accident → PURPLE
Road hazard → ORANGE
Roadwork → YELLOW
Flooding → CYAN / BLUE
Road closed → DARK / NEUTRAL
Traffic → appropriate traffic state colour

These colours must remain consistent across:

- map markers
- reports
- alerts
- route intelligence
- confirmations
- settings

Create four polished themes:

LIGHT
NIGHT DRIVE
MIDNIGHT BLUE
HIGH CONTRAST

Dark themes must be deliberately designed, not simple colour inversions.

==================================================
03 — TYPOGRAPHY
==================================================

Use professional native-mobile typography.

No futuristic AI typography.
No gaming typography.
No excessive weights.
No excessive letter spacing.

Use excellent:

- hierarchy
- line height
- spacing
- numerical clarity
- optical sizing

Navigation information must be readable instantly.

Examples:

52 km/h
70 km/h
10:59 PM
24 min
14.2 km
420 m

must be extremely legible.

==================================================
04 — ICON SYSTEM
==================================================

Create ONE coherent The3eye icon family.

Every icon must look like it belongs to the same product.

Use consistent:

- stroke weight
- geometry
- corner treatment
- proportions
- optical size

DO NOT use:

- emoji
- random SVGs
- mismatched icon families
- cartoon icons
- generic AI icons
- random filled/outlined combinations

Create original vector icons for:

Search
Menu
Map
Profile
Settings
Recenter
Compass
Layers
Report
Traffic checking
Speed camera
Accident
Road hazard
Roadwork
Flooding
Road closed
Traffic
Microphone
Voice
Route
Destination
Home
Work
Saved places
Vehicle
Car
Scooter
Motorcycle
Bicycle
Premium
Privacy
Security
Notifications
Haptic
Visual alerts
Voice alerts
Toll roads
History
Back
Close
Confirm
Cancel
Start journey
End journey

Icons should be simple, sexy and professional.

==================================================
05 — MAP IS THE PRODUCT
==================================================

The map is the most important visual surface in The3eye.

Redesign the map itself, not merely the UI on top of it.

It must feel like a professionally designed navigation map.

Use realistic visual hierarchy for:

- highways
- major roads
- secondary roads
- local roads
- junctions
- ramps
- buildings
- parks
- water
- neighbourhoods
- road names
- city names
- meaningful POIs

Keep labels restrained.

Do not make the map:
- empty
- fake
- overly colourful
- overly detailed
- covered in labels
- full of giant building rectangles

The map should remain beautiful and readable in:

Light
Night Drive
Midnight Blue
High Contrast

==================================================
06 — MAP MARKERS
==================================================

Create dedicated original The3eye map markers.

NEVER use emoji.

NEVER use generic coloured circles.

NEVER use generic pins.

Required:

Traffic checking
Speed camera
Accident
Road hazard
Roadwork
Flooding
Road closed
Traffic

Markers must support:

Normal
Selected
High confidence
Medium confidence
Low confidence
Stale
Clustered
Route-relevant

Use proper vector icons inside markers.

Markers must remain recognizable at small sizes.

When many reports are close together:

CLUSTER THEM.

Do not cover the map with dozens of markers.

==================================================
07 — VEHICLE SYSTEM
==================================================

The user MUST be able to choose their navigation vehicle.

Create:

CAR
SCOOTER
MOTORCYCLE
BICYCLE

Allow additional vehicle types later.

Each must have an original The3eye vector navigation icon.

DO NOT use emoji vehicles.

The selected vehicle becomes the user's navigation marker.

If the user chooses:

Car → car navigation marker
Scooter → scooter navigation marker
Motorcycle → motorcycle navigation marker
Bicycle → bicycle navigation marker

The selection must persist.

Create:

Profile → Vehicles

where the user can:

Add vehicle
Edit vehicle
Select default vehicle
Delete vehicle

Vehicle selection must also be available during route setup where appropriate.

==================================================
08 — FIRST LAUNCH
==================================================

Keep the existing first-launch experience if it is already working correctly.

Do not unnecessarily redesign working authentication.

Authentication options:

Google
Apple
Samsung
Email

Guest / Explore without account where supported.

Use legitimate official authentication branding where required.

Do not fabricate logos.

==================================================
09 — PERMISSIONS
==================================================

The application needs proper permission flows for:

LOCATION
CAMERA
MICROPHONE

Location:
- nearby reports
- navigation
- route intelligence
- report location

Camera:
- private report evidence

Microphone:
- voice commands
- voice reporting
- voice navigation

Explain each permission clearly.

Support states:

Granted
Not granted
Not now
Denied
GPS unavailable
GPS inaccurate
Location services disabled
Camera unavailable
Microphone unavailable

Do not repeatedly ask for permissions that were already handled.

==================================================
10 — HOME MAP
==================================================

The Home map must be extremely clean.

REMOVE COMPLETELY:

"The3eye • 7 nearby"

Remove the entire permanent nearby/status pill.

Do not show:

7 nearby
X nearby
live report count

permanently at the top.

It is unnecessary visual noise.

The The3eye logo/branding does NOT need to sit inside a floating pill on the map.

The app's identity should come from the overall product design, app icon, typography and visual language.

==================================================
11 — HOME SEARCH
==================================================

There must be EXACTLY ONE destination search entry point.

The current search bar at the top-left is difficult to reach.

Move it to a more thumb-accessible position in the lower portion of the screen.

Place it ABOVE the bottom navigation / lower interaction area.

Use:

Where to?

with:

Search icon
Microphone icon

It should be:

- easy to reach with one hand
- compact
- elegant
- unobtrusive
- easy to expand

When tapped:

open the full search experience.

Include:

Recent destinations
Home
Work
Saved places
Search results

DO NOT add another search button elsewhere.

==================================================
12 — BOTTOM NAVIGATION
==================================================

Use ONLY:

MAP
SEARCH
PROFILE

Remove the extra Search tab/button currently positioned between Map and Profile.

There should NOT be:

Map
Search
Activity
Profile

Activity/history belongs inside:

Profile → Driving History

==================================================
13 — TOP RIGHT MENU
==================================================

The current three icons in the top-right are unnecessary and do not work.

REMOVE ALL THREE.

Replace them with ONE clean menu icon.

Prefer a simple original three-line menu icon.

When tapped:

open the main application menu/settings.

The user should be able to access the relevant controls from this single entry point.

Do not create three separate permanent icons.

==================================================
14 — SETTINGS ARCHITECTURE
==================================================

Move the settings currently scattered inside Profile into the dedicated top-right menu/settings architecture where appropriate.

Do NOT duplicate the same settings in multiple places.

The settings system should be organized into logical sections.

Include:

ALERTS

Alert categories
Alert distance
Voice alerts
Visual alerts
Haptic feedback
Route mode only

DRIVING

Drive mode
City
Highway
Mixed
Avoid toll roads
Vehicle

VOICE & AUDIO

Voice behaviour
Language
Voice selection
Volume
Voice alerts

MAP

Map appearance
Map layers
Theme

PRIVACY & SECURITY

Data sharing
Location history
Anonymous mode
Delete account

ACCOUNT

Account
Connected sign-in
Subscription
Log out

==================================================
15 — ALERT CATEGORIES
==================================================

Create one clean Alert Categories page.

Categories:

Traffic checking
Speed camera
Accident
Road hazard
Roadwork
Flooding
Road closed
Traffic

Each has:

Original icon
Name
Toggle

These toggles MUST WORK.

If the user disables a category:

that category should no longer behave as a primary alert in the prototype.

==================================================
16 — ALERT DISTANCE
==================================================

The alert-distance control MUST ACTUALLY WORK.

Options:

100 m
300 m
500 m
1 km
2 km

Use a proper slider or segmented control.

When the user changes it:

- selected value updates
- visual control updates
- setting persists during the session
- alert examples reflect the selected value

Do NOT make a decorative non-functional slider.

==================================================
17 — VOICE & AUDIO
==================================================

This was missing and MUST be implemented properly.

Create ONE dedicated:

VOICE & AUDIO

section.

Users must be able to configure HOW The3eye speaks to them.

VOICE BEHAVIOUR:

Normal
Less chatty
Chatty / More detailed
Alerts only
Off

Make these selectable.

The selected option must visibly remain selected.

VOICE LANGUAGE:

Provide multiple supported languages appropriate for an India-focused application.

Examples:

English
Hindi
Kannada
Tamil
Telugu
Malayalam
Marathi
Bengali

Create a clean language selector.

VOICE SELECTION:

Allow the user to choose between available voice options.

Show:

Voice name
Language
Voice style where appropriate
Play / Preview button

The user must be able to hear/preview a voice in the prototype.

VOICE VOLUME:

Provide a sensible volume control.

VOICE ALERTS:

ON / OFF

VISUAL ALERTS:

ON / OFF

HAPTIC FEEDBACK:

ON / OFF

Do not scatter these options across the app.

Keep all voice/audio configuration in ONE coherent place.

==================================================
18 — MICROPHONE
==================================================

Include a microphone icon in appropriate search/voice contexts.

The microphone should allow commands such as:

Take me home
Navigate to work
Report police ahead
Report a pothole
Camera ahead
Accident ahead
Avoid toll roads

The prototype should respond visibly to the voice interaction.

Do not permanently display a giant microphone button on the map.

==================================================
19 — DRIVE MODE
==================================================

Allow:

City
Highway
Mixed

The selected option must update visibly.

==================================================
20 — AVOID TOLL ROADS
==================================================

Include:

Avoid toll roads

with ON / OFF.

When enabled:

route selection should prioritize toll-free alternatives where available.

Show this preference in:

Driving settings
Route preferences
Route overview

==================================================
21 — SEARCH / DESTINATION FLOW
==================================================

User flow:

Search
→ Select destination
→ Route preview
→ Route options
→ Start journey

Search must feel fast and native.

==================================================
22 — ROUTE PREVIEW
==================================================

This is where the live route alert information belongs.

DO NOT show the permanent:

Traffic checking
420 m

card on the Home map.

Move route-specific live intelligence into the route-selection/route-preview experience.

When a destination is selected:

show:

Starting point
Destination
Route
ETA
Time
Distance
Relevant live alerts
Alternative routes
Tolls

Example:

Home → Cyber City

26 min
14.2 km

Live route alerts:

Traffic checking
420 m

Speed camera
1.2 km

Roadwork
4.8 km

Only show alerts relevant to the selected route.

This information should NOT permanently clutter the Home map.

==================================================
23 — ROUTE OPTIONS
==================================================

Include useful route options such as:

Avoid toll roads
Avoid highways where appropriate
Avoid ferries

Keep these options clean.

Do not overload the screen.

==================================================
24 — START JOURNEY
==================================================

Route preview MUST contain an obvious:

START JOURNEY

button.

It must work.

When tapped:

Route Preview
→ Active Navigation

==================================================
25 — ACTIVE NAVIGATION — MAJOR SIMPLIFICATION
==================================================

Once the journey starts:

REMOVE VISUAL CLUTTER.

The navigation screen should be extremely simple.

Priority:

1. Next manoeuvre
2. Map
3. Current vehicle
4. Important route alert
5. Speed
6. ETA
7. Remaining time
8. Remaining distance
9. Secondary controls

Nothing else should compete with these.

==================================================
26 — REMOVE "AHEAD"
==================================================

Completely remove the separate:

AHEAD

section containing:

420 m
1.2 km
4.8 km

This is unnecessary.

Live alerts should appear:

- on the map
- as relevant alert notifications
- within route intelligence when appropriate

Do NOT create a permanent list of upcoming alerts.

==================================================
27 — REMOVE LARGE "REPORT SOMETHING"
==================================================

Remove the large:

+ Report something

button from the bottom.

Replace it with ONE small, elegant report icon.

Place it in the bottom-right area.

It must be:

- thumb reachable
- recognizable
- compact
- original
- consistent with The3eye's icon family

Do not copy Waze's icon.

==================================================
28 — SPEEDOMETER
==================================================

Move the speedometer from the top/centre area to the BOTTOM LEFT of the active navigation screen.

It should sit naturally above or integrated with the bottom driving information area.

Show:

CURRENT SPEED
ROAD SPEED LIMIT

Example:

52 km/h
70 km/h

The road speed limit and current speed must appear next to each other in a compact, elegant component.

If current speed exceeds the road speed limit:

the CURRENT SPEED should turn RED.

Example:

82 km/h
70 km/h

82 km/h becomes red.

If within the limit:

use normal/neutral styling.

Do not make the speedometer look like:

- a racing game
- a giant gauge
- a dashboard
- a glowing circular meter

Keep it compact and professional.

==================================================
29 — "MOSTLY CLEAR"
==================================================

Keep:

Mostly clear

if it is useful.

Place it directly above or alongside the lower driving information area.

It should visually belong to the same lower navigation system.

Do NOT create another giant card.

==================================================
30 — BOTTOM DRIVING BAR
==================================================

Redesign the entire bottom navigation information area.

The current design has too much UI and unnecessary division.

Create ONE sleek, unified driving bar.

Inspired by the simplicity of mature navigation applications, but ORIGINAL to The3eye.

It should contain:

ETA
Remaining time
Remaining distance

Example:

10:59 PM · 24 min · 14.2 km

Do NOT use a large divider between these values.

Do NOT put each value into separate cards.

Do NOT create unnecessary borders.

Everything should feel like ONE cohesive component.

The speedometer should sit immediately above or integrate naturally with this component.

"Mostly clear" should also sit naturally in this lower information region.

==================================================
31 — ACTIVE NAVIGATION CONTROLS
==================================================

Do NOT show many floating buttons.

Keep only genuinely necessary controls.

The primary map remains visible.

Secondary controls go into ONE:

•••

menu.

The ••• menu contains:

Route overview
Alternative routes
Avoid toll roads
Map layers
Alert settings
Voice & audio
Report something
End journey

==================================================
32 — END JOURNEY
==================================================

Do NOT place a large Exit Route button at the top centre.

It is hard to reach and visually disruptive.

End Journey lives inside:

••• → End journey

When selected:

show the existing confirmation bottom sheet.

KEEP THIS INTERACTION.

Example:

End this journey?

You have 20 min remaining to Cyber City, Gurugram.

End journey
Keep driving

Both buttons must work.

Keep driving:

dismisses the sheet
returns to active navigation

End journey:

ends navigation
transitions to journey completion

Make the destructive action clearly identifiable.

Do not make accidental ending easy.

==================================================
33 — JOURNEY COMPLETION
==================================================

After ending/reaching the destination:

show the existing:

YOU ARRIVED

experience.

Show:

Destination
Time
Distance

Example:

You arrived.

Cyber City, Gurugram

26 min
14.2 km

Keep this interaction because it already works well.

When the user taps:

DONE

return to the appropriate main map/profile state.

==================================================
34 — JOURNEY HISTORY
==================================================

Profile → Driving History

Show previous journeys.

Include:

Date
Starting point
Destination
Time
Distance

Selecting a journey opens the journey detail.

==================================================
35 — JOURNEY PATH / REPLAY
==================================================

Create a journey-detail map showing:

Starting point
Travelled path
Destination

The user should clearly see:

where they started
the path they travelled
where they finished

Use a clean historical route line.

Do NOT make it look like active navigation.

==================================================
36 — REPORT INTERACTIONS
==================================================

When a user selects:

Still there

the confirmation must update.

The popup must NOT remain sitting on screen after the action has completed.

After selection:

- update confirmation state
- show brief feedback if needed
- dismiss/update the popup
- return the user to the map

Likewise:

Not there

must:

- update the report state
- show confirmation
- dismiss/update the popup

Do not leave dead UI behind.

==================================================
37 — POPUP BEHAVIOUR
==================================================

All popups and sheets must be state-aware.

When a user selects an option:

the old popup should disappear or transform appropriately.

If the user selects another report:

previous report state closes.

If the user completes an action:

the completed popup closes.

Do not leave multiple layers of old UI on screen.

One interaction should produce one predictable result.

==================================================
38 — HOME REPORT POPUP
==================================================

The persistent traffic-checking popup on Home should NOT remain permanently visible.

Do NOT show:

Traffic checking
420 m
Still there
Not there

as a permanent Home overlay.

Only show report information when:

- the user selects a report
- it is relevant to the current route
- an important live alert needs to be surfaced

Otherwise:

MAP ONLY.

==================================================
39 — MAP CONTROLS
==================================================

Keep map controls minimal.

Recommended:

Recenter
Compass / orientation
Map layers

Do not show three/four/five unrelated floating buttons.

Map controls should share the same The3eye icon family.

==================================================
40 — PROFILE
==================================================

Profile should contain:

Profile
Trust score
Reports
Confirmations
Accuracy

My reports
Driving history
Saved places
Vehicles

Alert preferences
Voice & audio
Driving preferences
Privacy & security

The3eye Pro
Subscription

Do not duplicate the entire settings system unnecessarily if it is accessible from the main menu.

==================================================
41 — PRIVACY & SECURITY
==================================================

Include:

Data sharing
Location history
Anonymous mode
Delete account

Make each state functional in the prototype.

Private report evidence must remain private.

==================================================
42 — THE3EYE PRO
==================================================

Premium must be comprehensive.

Name:

THE3EYE PRO

Headline:

Drive smarter. Stay focused.

Core information remains free.

Premium improves the driving experience.

PRO FEATURES:

1. AD-FREE EXPERIENCE

No advertisements during navigation or critical driving interactions.

2. ADVANCED VOICE ALERTS

More control over spoken alerts.

3. CUSTOM ALERT DISTANCES

Different warning distances for different categories.

Example:

Traffic checking
500 m

Camera
1 km

Accident
300 m

Hazard
500 m

Roadwork
1 km

4. PERSONALIZED ALERT PROFILES

Create profiles such as:

City
Highway
Commute
Long Drive
Custom

Each can have different:

alert categories
distances
voice behaviour
notification behaviour

5. ADVANCED ROUTE INTELLIGENCE

Detailed route alert analysis
Alert density
Route issue summary
Alternative route comparison
Route-specific intelligence

6. ADVANCED MAP LAYERS

Additional useful map layers where available.

7. DRIVING STATISTICS

Trips
Distance
Driving time
Average speed
Reports
Alerts encountered
Driving trends

8. MULTIPLE VEHICLES

Multiple saved vehicle profiles.

9. ADVANCED MAP PERSONALIZATION

Map appearance
Marker density
Alert visibility
Vehicle appearance
Map layers

10. ADVANCED ALERT CONTROLS

Per-category:

Always alert
Route only
Silent
Custom distance

11. VOICE PERSONALIZATION

Additional voice options
Language options
Speaking style
Alert verbosity

12. PREMIUM THEMES / PERSONALIZATION

Additional visual customization where appropriate.

Do NOT paywall essential community information.

==================================================
43 — PREMIUM SCREEN
==================================================

Premium must look premium without looking tacky.

NO:

giant gold gradients
crowns everywhere
fake luxury
glowing cards
3D coins
excessive neon

Use The3eye's existing design language.

Create:

The3eye Pro

Free vs Pro comparison

Monthly
Yearly

Savings where applicable

Upgrade

Restore purchase
Manage subscription

==================================================
44 — FREE VS PRO
==================================================

FREE:

Live community reports
Map
Basic alerts
Basic reporting
Basic navigation
Basic voice
Basic route information
Community confirmations

PRO:

Everything in Free

Ad-free
Advanced voice alerts
Custom alert distances
Personalized alert profiles
Advanced route intelligence
Advanced map layers
Driving statistics
Multiple vehicles
Advanced map personalization
Advanced alert controls
Voice personalization

==================================================
45 — SUBSCRIPTION
==================================================

Create:

Subscription

Free / Pro state

If Pro:

The3eye Pro
Active
Billing period
Renewal date

Manage subscription
Restore purchase
Cancel subscription

==================================================
46 — SEARCH / VOICE
==================================================

There should be ONE search system.

Search bar:

Where to?

Microphone

When expanded:

Recent
Home
Work
Saved places
Search results

Do not duplicate search elsewhere.

==================================================
47 — NO UNNECESSARY LOGO USE
==================================================

The3eye logo must NOT appear everywhere.

Use the logo where it has branding value:

First launch
Authentication
App identity
Profile if appropriate
Premium if appropriate

Do NOT place the logo permanently on every map surface.

The map itself should communicate the product's identity.

==================================================
48 — NO UNNECESSARY FLOATING UI
==================================================

REMOVE:

The3eye + nearby pill
extra search button
three useless top-right icons
large Report Something button
permanent Ahead list
permanent traffic-checking popup
duplicate voice buttons
duplicate settings buttons
duplicate map controls
unnecessary activity tab
unnecessary permanent theme buttons
unnecessary permanent language controls

Do not replace removed elements with new unnecessary controls.

==================================================
49 — RESPONSIVENESS
==================================================

The prototype must be responsive.

Controls must adapt to:

different screen sizes
small phones
large phones
safe areas
notches
dynamic island
home indicators

Important controls must remain reachable.

==================================================
50 — INTERACTION STATE
==================================================

Every important control must work.

TEST:

Login
Onboarding
Permissions
Map
Search
Microphone
Destination selection
Route preview
Route options
Avoid toll roads
Start journey
Vehicle selection
Active navigation
Speedometer state
Speed-limit warning
Report icon
Report submission
Still there
Not there
Popup dismissal
••• menu
End journey
Keep driving
Journey completion
Done
Driving history
Journey path
Profile
Settings
Alert categories
Alert distance
Voice behaviour
Voice language
Voice selection
Voice preview
Voice volume
Themes
Privacy settings
Premium
Subscription

No fake buttons.

==================================================
51 — SPEED LIMIT BEHAVIOUR
==================================================

Make the speed-limit component stateful.

Example:

Current speed: 58 km/h
Road limit: 60 km/h

Normal state.

If:

Current speed: 72 km/h
Road limit: 60 km/h

Current speed changes to RED.

If speed returns below the limit:

return to normal styling.

The speed-limit icon should clearly communicate:

current speed
road speed limit

without taking too much space.

==================================================
52 — ALERT DISTANCE BEHAVIOUR
==================================================

Make alert distance stateful.

If:

500 m

is selected:

show 500 m.

If:

1 km

is selected:

show 1 km.

If:

2 km

is selected:

show 2 km.

The UI must visibly respond.

==================================================
53 — VOICE BEHAVIOUR STATE
==================================================

If:

Normal

is selected:

show Normal.

If:

Less chatty

is selected:

show Less chatty.

If:

Chatty / More detailed

is selected:

show that.

If:

Alerts only

is selected:

show that.

If:

Off

is selected:

show Off.

The selected state must persist during the prototype session.

==================================================
54 — VEHICLE STATE
==================================================

If the user chooses:

Car

the navigation marker becomes the The3eye car.

If:

Scooter

the marker becomes the The3eye scooter.

If:

Motorcycle

the marker becomes the The3eye motorcycle.

If:

Bicycle

the marker becomes the The3eye bicycle.

The selected vehicle should remain selected.

==================================================
55 — POPUP STATE
==================================================

After:

Still there
Not there
End journey
Keep driving
Start journey
Done

the UI must transition to the appropriate next state.

Never leave a completed popup hanging around.

==================================================
56 — NAVIGATION SCREEN FINAL LAYOUT
==================================================

The final active navigation screen should roughly communicate:

TOP:

Next manoeuvre
Distance
Road name

CENTER:

Beautiful map
Route
Vehicle
Important alert markers

BOTTOM:

Speedometer + road limit

Mostly clear / route status

ONE sleek driving information bar:

10:59 PM · 24 min · 14.2 km

Small report icon at bottom-right.

One ••• secondary menu.

That is enough.

DO NOT add more.

==================================================
57 — BOTTOM NAVIGATION BAR
==================================================

Outside active navigation:

MAP
SEARCH
PROFILE

During active navigation:

Prioritize navigation.

Do not let normal application navigation tabs dominate the driving interface.

==================================================
58 — SAFETY
==================================================

During driving:

minimize interaction
minimize visual noise
avoid unnecessary animation
avoid large forms
avoid intrusive Premium prompts

Voice and haptic feedback should reduce screen interaction.

The application must never encourage unsafe interaction while driving.

==================================================
59 — MOTION
==================================================

Use subtle native-feeling motion for:

bottom sheets
route transitions
marker selection
report confirmation
navigation start
journey completion
theme changes

No flashy animation.

No excessive bounce.

No artificial glow.

==================================================
60 — FINAL QUALITY AUDIT
==================================================

Before finishing, inspect the entire product as a senior product designer.

Look specifically for:

Too many buttons
Duplicate controls
Dead buttons
Wrong hierarchy
Hard-to-reach controls
Unnecessary popups
Unnecessary cards
Unnecessary dividers
Inconsistent icons
Inconsistent colours
Bad typography
Fake map styling
Fake vehicle icons
Unnecessary branding
Poor spacing
Poor safe-area handling
Missing states
Broken transitions

FIX ALL OF THEM.

==================================================
61 — FINAL USER FLOW
==================================================

The ideal complete experience is:

OPEN APP
↓
LOGIN / GUEST
↓
PERSONALIZATION
↓
LOCATION / CAMERA / MICROPHONE PERMISSIONS
↓
CLEAN HOME MAP
↓
THUMB-REACHABLE "WHERE TO?" SEARCH
↓
DESTINATION
↓
ROUTE PREVIEW
↓
START JOURNEY
↓
CLEAN ACTIVE NAVIGATION
↓
LIVE ROUTE ALERTS WHEN RELEVANT
↓
REPORT VIA SMALL ICON
↓
SPEED + SPEED LIMIT
↓
ETA + TIME + DISTANCE
↓
••• FOR SECONDARY OPTIONS
↓
END JOURNEY
↓
CONFIRMATION
↓
YOU ARRIVED
↓
DONE
↓
MAP

==================================================
62 — FINAL PRINCIPLE
==================================================

STOP ADDING.

START REFINING.

The best version of The3eye is NOT the one with the most controls.

It is the one where the user can find everything they need without seeing everything at once.

The map should breathe.

The navigation should breathe.

The typography should breathe.

The controls should feel intentional.

The icons should feel like one family.

The vehicle should feel like part of The3eye.

The voice system should feel complete.

The route preview should feel trustworthy.

The active journey should feel effortless.

The settings should be organized.

The Premium product should feel valuable.

Every interaction should work.

Every popup should respond and disappear appropriately.

Every important setting should persist.

Every screen should feel like it belongs to the same application.

DO NOT ASK THE USER TO APPROVE OBVIOUS UX FIXES.

USE YOUR OWN DESIGN JUDGEMENT.

If something is clearly bad:
FIX IT.

If something is unnecessary:
REMOVE IT.

If something is missing:
ADD IT ONLY IF IT SERVES THE PRODUCT.

If something is duplicated:
CONSOLIDATE IT.

If something looks AI-generated:
REDESIGN IT.

If something is not functional:
MAKE IT FUNCTIONAL.

FINAL STANDARD:

The3eye should look like a real, premium navigation product that could genuinely ship on modern Android and iOS.

Original.
Clean.
Sexy.
Professional.
Glanceable.
Functional.

THE3EYE.
```

**This is the version I would lock.** The key change from all the earlier prompts is that this one explicitly tells Make **what NOT to touch/add**, so it doesn't keep solving every problem by throwing another button onto the screen.
