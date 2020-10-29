QUIZCARD 

Made By: Brian Lego

QuizCard is a study aid that allows a community of users to improve their knowledge on a varitey of subjects.

~ This application is built using Ruby on Rails, Active Storage w/ AWS-s3 in the backend, and React & Redux on the frontend. ~

To get started installing the front-end of this application you must clone down this repo to your local machine and run a $ npm install to install all dependencies. In tandum to this repo you must also close down the back-end repo which can be found here (https://github.com/brianwlego/QuizCard_backend). After cloning down the backend repo be sure you are in the correct folder and run $ bundle install , $ rails db:create , $ rails db:migrate, and $ rails db:seed to ensure that the application is created correctly. Once all these steps are done you’re nearly there! Simply begin the rails server (rails s) and from the front end run (npm start) To run it locally you will need to run them on two seperate ports ie. 3000 & 3001 for example. 

This will open the application and you will prompted to signup/login (if you wish to implement CRUD capabilities) or you may click "Just Look Around" though you will not be able to record Quiz scores without quickly signing up or logging in.