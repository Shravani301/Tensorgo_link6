# Tensorgo_link6

Description:
You are tasked with creating a SaaS plan with “Basic”, “Standard” and “Plus” where users can browse
and make purchases using the Stripe payment gateway.
The description of the plans is as follows,

● Basic (Free for 14 Days): Limited to 1 user

● Standard: INR 4999 Per Year, Per User, up to 5 users

● Plus: INR 3999 Per Year, Per User above 10 users

Manage organization and user creation and limit the user creation and activation as per the plan
purchased.
This assignment will test your skills in building both the frontend and backend components while
integrating Stripe for secure payment processing.

Requirements:

Backend:

Develop a backend microservice using Node JS that handles the following functionality:

● SaaS Plan Management: Allow the Super Admin to add, edit, and delete SaaS plans.

● User Management: Super Admin for the SaaS Provider to create and manage the plan. For the
SaaS users create two roles 1. Admin and 2. User and implement user registration by admin and
login functionality.

● Stripe integration: Integrate the Stripe API to handle secure payment processing. Implement
functionality to charge customers for their orders.

Frontend:

Build a user-friendly web interface using a frontend framework in React to allow users to:

● Browse the Plans: Display a list of plans with details, including features and prices.

● Cart management: Provide a shopping cart where users can order or cancel, view the cart's
content, and proceed to checkout.

● User authentication: Implement user registration and login forms.

● Checkout: Create a seamless checkout process where users enter their shipping and payment
details.

● Order history: Show users their order history and plan details of the purchased plan.

● Super Admin: Provide a dashboard to monitor the organization and their plan and usage.

● Admin: Create and manage users according to the plan limitation.

● User: Login and landing page.

Stripe Integration:

Integrate the Stripe API for payment processing. This includes:

● Setting up a Stripe account for testing purposes (Stripe provides test card details for this).

● Implementing Stripe's client-side integration for securely collecting payment information.

● Handling webhook events to confirm successful payments and update order statuses in your
database.

Additional Features (Optional):
For bonus points, you can add extra features such as order confirmation emails or coupon codes.

#saas platform for subscriptions
Getting Started with Create React App
This project was bootstrapped with Create React App.

Available Scripts
In the project directory, you can run:

npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

npm test
Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information.

npm run eject
Note: this is a one-way operation. Once you eject, you can't go back!

If you aren't satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

Learn More
You can learn more in the Create React App documentation.

To learn React, check out the React documentation.

Code Splitting
This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

Analyzing the Bundle Size
This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

Making a Progressive Web App
This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

Advanced Configuration
This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

Deployment
This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

npm run build fails to minify
This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


steps:
download project from github by using this link
Open Vscode open file menu click on open folder in that select downloaded file.
click on Terminal menu open new Terminal for running code and installations.
one for fronted , one for backend.
You can run fronted code by using npm start
you can run backend code by using node src/server.js
After opening project you need to install mongodb, npm, express js, bcrypt,node js and any more by using npm i package_name
After installing all the packages provide mongodb key for stroing and accessing data and store in .env file.

 It is a Saas platform based on subscriptions integration with stripe payment .
 If you want to develop any full stack project you need to go through first backend once the funalities done you can create fronted easily.
 For testing this project you need node.js, express, mongodb, Vscode editor
 If you want to use MongoDB atlas then you need to provide MONGODB path or key in .env file.
 By building backend you can test every funatility by using postman tool.
 Postman Tool is an app in that we can test our backend by providing HTTP methods and url.
