# About
This project uses the Vonage Video API to create a virtual green screen and add transparency to rendered video.  For more information, check out the related Blog Post.

# Prerequisites

You will need:
 - Some experience with JavaScript and HTML5 Canvas.
 - Some previous experience with the Vonage Video API is preferred, but not essential.
 - A basic video application is included with this project, but falls outside the remit of this tutorial.
 - You can find further samples at github.com/opentok.
 - You will need a functioning camera and microphone to run the sample.
 - A Vonage Video API key, Session ID, and Token. You can create these in the dashboard or through the Video API Playground. You can access this through your online API account.

# Application Overview

The sample application comprises several components. A landing page (app.html) with a form that helps identify users and roles for use in the application. The main application page (liveroom.html) loads the Video JavaScript SDK and executes our JavaScript code. In this sample, the code is loaded in as ES6 modules.

# Run The Sample
You need to enter your API Key, Session ID, and Token into the config.json file provided, and then you can serve these files on your favourite web server. If you are using Node, you can run the following commands from the root of the cloned repository:

```
npm install 
npm run serve
```

Then, simply open your browser and navigate to http://127.0.0.1:3000. When you speak, the mic should pick up your voice and enable your video feed.
