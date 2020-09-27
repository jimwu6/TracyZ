# tracyZ

Project for RamHacks 2020

# Functionality

TracyZ takes in real-time video footage from users' cameras and applies ML with Tensorflow's hand pose library to track the movement of the user's pointer finger in front of the camera. With this movement, the web app draws on top of PDF files and makes teaching with diagrams more natural and convenient. Users are able to cycle through pages of the PDF and make drawings as needed. To make the user experience more immersive, we have included features such as: speaking "go" to start drawing, and "stop" or clenching your fist to stop drawing.

# Tech Stack

The main hand tracking functionality is handled through the TensorFlow.js Hand Pose library. After identifying a user's hand in the view of the webcam, my group highlighted the key coordinates of the pointer finger and drew them with a red contrast colour on the screen. The x and y coordinates from the pointer finger were then used to draw on the HTML canvas of the PDF that the user previously uploaded. The PDF uploading and managing are handled with PDF.js, and the frontend of the web app with HTML, CSS, and React.js. Tensorflow's Speech Command Recognition was also used for users to start and stop the drawing action on the screen using vocal commands (alternatively, if a user clenches their fist, the TracyZ app stops drawing onto the screen).

# Check out:

[Our Devpost!](https://devpost.com/software/tracyz)

A screenshot from the web app:

![Screenshot](/src/image.png)

