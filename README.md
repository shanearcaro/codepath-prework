success: Connected
Pre-work - Memory Game

Memory Game is a Light & Sound Memory game to apply for CodePath's SITE Program.

Submitted by: Shane Arcaro

Time spent: 5 hours spent in total

Link to project: https://glitch.com/edit/#!/fuchsia-voracious-hollyhock
Required Functionality

The following required functionality is complete:

    [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
    [x] "Start" button toggles between "Start" and "Stop" when clicked.
    [x] Game buttons each light up and play a sound when clicked.
    [x] Computer plays back sequence of clues including sound and visual cue for each button
    [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess.
    [x] User wins the game after guessing a complete pattern
    [x] User loses the game after an incorrect guess

The following optional features are implemented:

    [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
    [x] Buttons use a pitch (frequency) other than the ones in the tutorial
    [x] More than 4 functional game buttons
    [x] Playback speeds up on each turn
    [x] Computer picks a different pattern each time the game is played
    [x] Player only loses after 3 mistakes (instead of on the first mistake)
    [x] Game button appearance change goes beyond color (e.g. add an image)
    [x] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
    [x] User has a limited amount of time to enter their guess on each turn

The following additional features are implemented:

    [ ] List anything else that you can get done to improve the app!

Video Walkthrough

Here's a walkthrough of implemented user stories:
Reflection Questions

    If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. I used https://www.w3schools.com/cssref/pr_background-image.asp for the background images of the button. Initially I was trying to set the background of the button using a img dom element as the buttons were being created. I ran into a problem where the images would not line up correctly or move the button from its intended position. Once I started using this method instead everything was working.

    What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) The main challenge I faced was placing the images on the buttons. At first I was trying to create the images dynamically with the buttons and just add the image as a child node. This messed up the positioning of everything however. To fix this I set the position of the buttons to absolute but that created more problems with the button location. My next solution was to create the buttons and images and after they were already added to the DOM change their position to absolute but this didn't work either. After spending a good hour on trying to fix this I looked up how to add background images to DOM elements and the W3schools link was one of the first results that explained everything. Their solution of using background-image in the CSS instead of setting the image in the Javascript worked perfectly.

    What questions about web development do you have after completing your submission? (recommended 100 - 300 words) Probably my biggest question would be about handling large scale applications. This is a very basic program that I spent less than 5 hours working on but it still took some time to develop and make all the changes. When working with a team of people on a large scale applicaiton it seems very easy for mistakes in code or miscommunication to stunt development. How is working together in a group handled and what are some of the major challenges that still might not have been fixed.

    If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) In a few more hours of working on this program I would make the program responsive. A website that works on desktop only isn't too much fun so I would try and make this available on phones and tablets too. For the most part I'm fine with how the Javascript looks for the program. I would also change the theme and layout to make the application a little nicer to view. I chose a gray and red color to match here but I've been liking how beige and grey have been looking recently. Experimenting with some color changes to make the overall program look nicer would be a good touch.
    
![Winning the Game](https://cdn.glitch.com/830b03cd-7c1f-4ca7-a549-cb1bc621eede%2FPeek%202021-03-16%2020-17.gif?v=1615940695855)
![3 Chance](https://cdn.glitch.com/830b03cd-7c1f-4ca7-a549-cb1bc621eede%2FPeek%202021-03-16%2020-19.gif?v=1615940709164)
![Timer](https://cdn.glitch.com/830b03cd-7c1f-4ca7-a549-cb1bc621eede%2FPeek%202021-03-16%2020-20.gif?v=1615940714467) 

License

Copyright [Shane Arcaro]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
