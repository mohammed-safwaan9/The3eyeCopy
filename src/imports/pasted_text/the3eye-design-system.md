THE3EYE — FINAL PRODUCT POLISH, UNIVERSAL DESIGN SYSTEM AND FUNCTIONALITY FIX

Use the current THE3EYE PRO subscription screen as the UNIVERSAL visual reference for the entire application.

I want the entire application to look like it was designed as one product from the beginning around the exact visual language of the current THE3EYE PRO screen.

The Premium screen's deep blue-black background, typography, colours, navy surfaces, green accents, muted blue-grey text, borders, spacing and overall atmosphere are now the permanent THE3EYE design system.

Do not make Premium visually different from the rest of the application. Instead, make the entire application use the same visual DNA as Premium.

IMPORTANT: Preserve existing functionality unless explicitly changed below.

Do not remove existing features.

Do not rebuild the map.

Do not replace the map.

Do not change the map provider.

Do not change the navigation architecture.

Do not randomly redesign functionality.

Do not simplify existing flows.

Do not create a separate icon library instead of using the icons in the actual application.

The current map is working. Treat the map implementation as LOCKED.

1. UNIVERSAL THE3EYE VISUAL SYSTEM

Apply the current THE3EYE PRO visual language to every screen and component.

Use the same deep blue-black background throughout the entire application.

Use dark navy and blue-black surfaces for cards, panels, sheets, controls and navigation bars.

Use soft white for primary text.

Use muted blue-grey for secondary text and supporting information.

Use THE3EYE Signal Green as the primary interactive accent.

Use the existing cool blue as the secondary accent.

Keep semantic colours consistent:

Traffic checking = enforcement red

Speed camera = camera blue

Accident = purple

Road hazard = amber/orange

Roadwork = yellow

Flooding = muted blue

Road closed = dark/black treatment

Pothole = appropriate hazard treatment

Traffic signal = appropriate signal colour

Do not introduce random colours.

Keep the palette restrained, premium and cohesive.

2. TYPOGRAPHY

Use the exact typography STYLE and hierarchy from the current THE3EYE PRO screen throughout the entire application.

Large headings should have the same strong, bold, confident appearance as:

Drive smarter.

Stay focused.

Important titles and buttons should use strong semibold typography.

Supporting text should use clean regular typography.

Metadata should use muted blue-grey.

Use the same font family consistently throughout every screen.

Do not allow individual screens to revert to the previous generic typography.

The typography should feel like one unified THE3EYE product.

3. BACKGROUNDS AND CARDS

Use the Premium screen's deep blue-black atmosphere everywhere.

Cards should use dark navy surfaces.

Use subtle borders.

Use restrained corner radii.

Use minimal shadows.

Avoid bright white cards.

Avoid generic grey backgrounds.

Avoid excessive glassmorphism.

Avoid giant glowing gradients.

Avoid tacky gold Premium styling.

The product should feel premium because of its design quality, not because every element is glowing.

4. BUTTONS AND CONTROLS

Primary actions should use THE3EYE Signal Green.

Secondary actions should use dark navy surfaces with subtle borders.

Destructive actions should use restrained red.

Selected states should use the appropriate green or blue accent.

Disabled states must remain clearly distinguishable.

Controls must be touch-friendly and easy to understand.

5. USE MY EXISTING FIGMA-CREATED THE3EYE ICONS

I already created original The3eye icons in Figma.

Use those existing The3eye icons throughout the ACTUAL APPLICATION.

Do not replace them with emoji.

Do not replace them with random generic icon libraries.

Do not use Google Maps icons.

Do not use Waze icons.

Do not use Apple Maps icons.

Do not use unrelated stock icons.

Use my existing The3eye icon family consistently for:

Traffic checking

Speed camera

Accident

Road hazard

Pothole

Traffic signal

Broken traffic signal

Roadwork

Flooding

Road closed

Traffic

Debris

Vehicle breakdown

Wrong-way driver

Lane blocked

Construction

Waterlogging

Poor visibility

Streetlight outage

Search

Microphone

Speaker

Menu

Re-center

Profile

Settings

Vehicles

Fuel

Food

Parking

Hospitals

EV charging

Other application actions

Keep consistent icon size, stroke weight, proportions and visual treatment.

The icons should look like one original The3eye system.

6. MAIN HOME PAGE

The map must remain the dominant element of the home page.

Keep the worldwide map capability.

Initially center the map around the user's current location.

The map implementation is LOCKED.

Do not rebuild it.

Do not replace it.

Do not remove it.

Do not allow the map to cover the application UI.

The home page should include:

Three-line menu control

Working speaker/voice control

Working re-center control

Where to? destination search

Working microphone for voice search

Current location / vehicle marker

Relevant live report markers

Compact report control

Clean bottom navigation

Do not bring back a large "+ Report something" button.

Do not add a permanent "7 nearby" or "X nearby" status pill.

Do not add a permanent list of nearby alerts.

Do not clutter the map.

Relevant live alerts should become prominent when useful.

7. MAIN SCREEN SPEAKER

The speaker control on the MAIN MAP SCREEN must be functional.

Do not make it a decorative icon.

Tapping it must actually toggle the application's voice state.

Voice enabled means voice announcements are enabled.

Voice muted means voice announcements are muted.

The icon must visibly change between enabled and muted states.

The selected state must persist when entering active navigation.

The main-screen speaker and active-navigation speaker must use the same underlying voice state.

8. VOICE BEHAVIOUR

The3eye voice should be concise, direct and driving-focused.

Do not make it behave like Google Maps with long conversational instructions.

Examples:

Turn left in 400 metres.

Traffic checking reported 500 metres ahead.

Camera ahead.

Accident ahead.

Pothole ahead.

Road hazard ahead.

Roadwork ahead.

No unnecessary greetings.

No filler.

No long explanations.

No repetitive conversational speech.

9. MAIN SEARCH

The Where to? search entry should support destination search and voice search.

Keep the microphone functional.

Search should provide useful categories such as:

Saved

Recent

Home

Work

Fuel

Food

Parking

Groceries

Coffee

Shopping

Pharmacies

EV charging

Hospitals

Hotels

Parks

Crisis/emergency

Do not create duplicate search controls.

10. REPORT CATEGORIES

Expand the existing report categories.

Keep:

Traffic checking

Speed camera

Accident

Road hazard

Roadwork

Flooding

Road closed

Traffic

Add:

Pothole

Traffic signal

Broken traffic signal

Debris / object on road

Vehicle breakdown

Wrong-way driver

Lane blocked

Construction

Waterlogging

Poor visibility

Streetlight outage

Other

Use my existing The3eye icons.

Keep the most common categories immediately accessible.

Put less common categories into a More section if necessary.

Do not overwhelm the user.

Reporting should remain fast and easy.

11. REPORT FLOW

Keep the richer report flow that existed previously.

Do not reduce it to only:

Category → Photo → Note → Submit

The flow should include:

Choose report category

Confirm location

Show GPS accuracy

Allow location correction if needed

Contextual questions based on the selected category

Private photo evidence where appropriate

Optional note

Submit

Do not ask irrelevant questions.

For example, speed camera reports should have camera-specific information.

Traffic-checking reports should have relevant enforcement/checking information.

Accident and hazard reports should have relevant contextual information.

GPS location and timestamp should remain automatic.

Photos must remain private and only be used to verify the report.

12. REPORT DURING ACTIVE NAVIGATION

This is CRITICAL.

Reporting during active navigation must behave as a temporary layer over the current journey.

Flow:

Active Navigation → Report → Category → Relevant details → Private photo if applicable → Submit → Report submitted → Back to navigation

After submission, return to the EXACT SAME ACTIVE NAVIGATION SESSION.

Do not cancel the journey.

Do not reset the route.

Do not restart navigation.

Do not lose:

Destination

Route

Navigation progress

ETA

Remaining time

Remaining distance

Vehicle

Vehicle colour

Route/path colour

Live alerts

Current position

If the user presses Back or Cancel at any point, return to the exact same active navigation session.

13. REPORT SUBMITTED

Keep the current polished Report submitted screen.

It can show:

Report submitted

Thanks — you helped nearby drivers.

Drivers nearby

Confidence

Trust points

Report expiry

Back to navigation

Back to navigation must restore the exact same active journey.

14. ROUTE PREVIEW

Keep the current route preview functionality.

It should show:

Starting point

Destination

Full route

ETA

Distance

Alternative routes where available

Live alerts on the route

Vehicle selection

Vehicle colour selection

START JOURNEY

Route preferences must include:

Avoid highways

Avoid toll roads

Avoid ferries

Do NOT remove Avoid toll roads.

Do not add unnecessary route preferences beyond useful driving choices.

15. VEHICLE SELECTOR

Keep:

Car

Scooter

Moto

Bicycle

Use the original The3eye vector vehicle icons.

Do not use emoji vehicles.

Allow vehicle colour selection.

Colours should include:

Black

White

Silver

Grey

Blue

Red

Green

Yellow

16. VEHICLE COLOUR FUNCTIONALITY

The selected vehicle colour must ACTUALLY WORK.

When the user selects a vehicle colour:

The vehicle icon/marker changes to that colour.

The selected colour persists into Route Preview.

The selected colour persists into Active Navigation.

The selected colour persists in Profile → Vehicles.

The navigation route/path must also change to the corresponding selected vehicle colour, as it did in the previous working version.

Do not leave the route permanently blue if the selected vehicle colour is different.

Changing the colour must immediately produce a visible change.

17. ACTIVE NAVIGATION

Keep the existing navigation functionality.

The active navigation screen must contain:

Next manoeuvre

Road name/direction

Distance to manoeuvre

Map

Visible navigation route/path

Selected vehicle marker

Live route alerts

Three-line menu

Speaker control

Re-center control

Speedometer

Speed limit

ETA

Remaining time

Remaining distance

Compact report control

Do not add the current clock.

Do not add a permanent Ahead list.

Do not add a huge Report something button.

Keep the bottom driving information sleek and compact.

18. ROUTE PATH

The navigation route/path must remain clearly visible.

It must be visible at normal map zoom.

It must remain synchronized with the active journey.

It must remain above the map but below important UI controls.

It must not disappear when the map is moved or zoomed.

19. RE-CENTER

The Re-center control MUST EXIST and MUST WORK.

It must be visible on the active navigation map.

When the user pans the map away from their current navigation position, Re-center should allow the user to return to the current navigation position.

Tapping it must actually recenter the map.

It must not be hidden inside an unrelated screen.

20. NAVIGATION MENU

The three-line menu must remain accessible during navigation.

It should contain useful navigation actions including End Journey.

21. END JOURNEY

End Journey must be accessible conveniently from the existing navigation menu.

Do not place a giant Exit Navigation button over the map.

Selecting End Journey should show the existing confirmation:

End this journey?

You have 20 min remaining to Cyber City, Gurugram.

Buttons:

End journey

Keep driving

Keep driving must close the confirmation and return to the exact same active navigation state.

End journey must properly terminate navigation and open the existing journey completion experience.

22. JOURNEY COMPLETION

Keep the existing You arrived experience.

Show useful journey information such as:

Journey completed

Time

Distance

Destination

Done

Done should return to the appropriate post-journey screen.

23. JOURNEY HISTORY

Keep the journey history/overview functionality.

A journey should be able to show:

Starting point

Travelled path

Destination

Useful journey information

Keep this visually consistent with the universal THE3EYE design system.

24. ACTIVE NAVIGATION CONTROLS

Universal navigation controls should be:

Left side: three-line menu

Right side: speaker/voice control

Map: Re-center

These controls should remain consistent before, during and after navigation where appropriate.

25. SPEEDOMETER

Keep the speedometer.

Show current speed and road speed limit together.

If the user exceeds the speed limit, the speed display should clearly indicate the over-limit state.

Keep it compact and easy to read.

26. BOTTOM DRIVING BAR

Use one sleek driving information bar.

Show useful information such as:

24 min · 14.2 km

Do not add unnecessary dividers.

Keep it visually similar in spirit to modern navigation apps while remaining an original The3eye design.

27. LIVE ALERTS

Live alerts should use semantic colours and the existing The3eye icons.

Examples:

Traffic checking

Speed camera

Accident

Road hazard

Roadwork

Pothole

Traffic signal

Use confidence and confirmation information where appropriate.

Example:

Traffic check

6 confirmations · 420 m

High confidence

Do not permanently cover the map with an alert card unless the alert is relevant.

28. SETTINGS

Use the universal visual system in Settings.

Organize settings into clear areas such as:

Alerts

Driving

Voice & Audio

Map

Privacy & Security

Vehicles

Account

Subscription / Pro

Do not scatter duplicate settings throughout the app.

29. VOICE & AUDIO SETTINGS

Keep the existing voice settings.

Voice behaviour:

Normal

Less chatty

More detailed

Alerts only

Off

Language:

English

Hindi

Kannada

Tamil

Telugu

Malayalam

Marathi

Bengali

Keep architecture expandable for additional languages.

Keep voice selection and preview where already implemented.

Keep volume.

Keep:

Voice alerts

Visual alerts

Haptic feedback

Route mode only

All of these should use the universal THE3EYE design system.

30. PROFILE

Restyle Profile using the Premium visual language.

Use the existing The3eye icons.

Keep vehicles, trust/reputation, subscription, settings and other existing functionality.

31. PREMIUM

The current THE3EYE PRO screen is the visual north star.

Do not redesign it into another style.

Preserve its:

Deep blue-black background

Strong typography

Signal Green

Cool blue

Muted blue-grey

Navy cards

Subtle borders

Strong hierarchy

Premium but restrained atmosphere

Apply this same visual language to every other screen.

32. EARN PRO

Keep Earn Pro.

Users can earn Pro through authentic, verified, high-quality community contributions.

Do not reward raw report quantity.

Quality, accuracy, independent confirmations and reliability should matter.

Keep the existing progress/in-progress/qualified/earned states.

33. ADS

Keep advertising non-interruptive.

Ads must never interfere with:

Active navigation

Critical alerts

Driving controls

Voice alerts

Reporting

Premium removes ads from the driving experience.

34. MAP SAFETY / BUILD SAFETY

The current map works.

THE MAP IMPLEMENTATION IS LOCKED.

Do not:

Rebuild the map

Replace the map

Remove the map

Change the map provider

Refactor the map unnecessarily

Move the map above the UI

Allow the map to cover controls

Make UI appear only when zooming out

The map remains the map layer.

Application controls remain above it.

The normal mobile viewport must show the full interface correctly.

35. VISUAL CONSISTENCY

When any two random screens are shown next to each other, they must immediately look like they belong to the same THE3EYE product.

Use one:

Background system

Typography system

Colour system

Card system

Button system

Icon system

Spacing system

Interaction language

The Premium screen is the reference for all of them.

36. DO NOT OVERDESIGN

Do not add UI simply because there is empty space.

Do not add unnecessary cards.

Do not add unnecessary badges.

Do not add giant floating buttons.

Do not add duplicate controls.

Keep the product clean, fast and easy to understand.

37. BUILD SAFETY

Make changes incrementally.

Do not perform a destructive rewrite.

Do not delete working components just to recreate them.

Do not change unrelated functionality.

If a visual change causes a working feature to break, fix the regression before continuing.

If a change causes the map to disappear, immediately undo that change and preserve the working map.

38. FINAL QA

Before declaring this complete, test all of these exact flows:

Main Map → Speaker → voice state changes.

Main Map → Speaker muted → Active Navigation → voice remains muted.

Main Map → Speaker enabled → Active Navigation → voice works.

Main Map → Microphone → voice search works.

Main Map → Re-center → map returns to current location.

Vehicle Selector → select vehicle colour → vehicle changes colour.

Vehicle Selector → select vehicle colour → route/path changes colour.

Vehicle Selector → select vehicle colour → Active Navigation preserves colour.

Route Preview → Avoid highways.

Route Preview → Avoid toll roads.

Route Preview → Avoid ferries.

Route Preview → Start Journey.

Active Navigation → route/path is visible.

Active Navigation → Pan map → Re-center → map returns to current position.

Active Navigation → Speaker → voice state changes.

Active Navigation → Three-line menu → End Journey.

End Journey → Keep driving → exact same navigation session.

End Journey → End journey → journey completes correctly.

Active Navigation → Report → Complete report → Report submitted → Back to navigation → exact same journey.

Active Navigation → Report → Back/Cancel → exact same journey.

Search → Microphone → destination search works.

Profile → Vehicles → change vehicle colour → selection persists.

Settings → Voice & Audio → settings work.

Premium → existing Premium functionality works.

Normal mobile viewport → map visible.

Normal mobile viewport → route visible.

Normal mobile viewport → Re-center visible.

Normal mobile viewport → speaker visible.

Normal mobile viewport → menu visible.

Normal mobile viewport → report control visible.

Nothing is hidden behind the map.

Nothing only appears when the map is zoomed out.

No existing working feature has been removed.

FINAL REQUIREMENT:

The result must be a polished, cohesive THE3EYE application using the current THE3EYE PRO subscription screen as the universal visual foundation, while preserving the existing functionality and map.

Do not interpret this prompt as permission to rebuild the application.

Improve and restore what already exists.

Add only the explicitly requested functionality.

Preserve everything else.