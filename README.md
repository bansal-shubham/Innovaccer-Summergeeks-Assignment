# Entry Management Web Application
# Innovaccer SDE Intern Challenge

The fundamental rationale behind this endeavor was to make a product that can help a guest check into an office with no sort of, or rather, as minimal human intervention as possible.

The web application gives the user two options: Check In and Check Out.

Check In: The client is asked to enter his/her details as well as the Host's. Subsequently,a SMS and E-mail will be sent to the Host giving the details of the client.

Check Out: The client will be asked to enter their E-mail Id for verification after which the client will be checked out.

## Technology Stack

* **Database**: 
    - MongoDB
    
* **Back-end**: 
    - NodeJS
    - ExpressJS
    - Nodemailer(Mail service)
    - fast2sms(Message Service)
    
* **Front-end**: 
    - HTML
    - CSS
    - Bootstrap
    - EJS
    - Font-awesome
    
## Deployment

The website has been hosted on Heroku and can be easily accessed [here](https://serene-brushlands-34239.herokuapp.com/).

## Project Folder Structure:

![Folder Structure](https://i.imgur.com/e8E9MDr.png)

# Using Web App

* **Visitor is given the option to Check-in/Check-out at the Home Page.**

![Homepage](https://i.imgur.com/I7hDEPh.png)

* **On visiting the Check-in portal, the client is asked to fill in his/her details as well as the Host's. Also, the user will be prompted if the required fields are not filled.**

![Checkin page](https://i.imgur.com/8nk2Pqp.png)

* **On a successful check-in, the website will revert back to the homepage and a success message will pop up at the bottom right corner. After this, the Host will receive a mail and a SMS.**

![Checkin success](https://i.imgur.com/L6HRIEO.png)

* **Check-in error message if the client has already checked-in.**

![Checkout error](https://i.imgur.com/2y0UscH.png)

* **E-mail received at host's end after successful check-in.**

![Checkin Mail](https://i.imgur.com/jM25ngO.png)

* **SMS received on host's contact after successful check-in.**

![Checkin SMS](https://i.imgur.com/xDiOvFG.jpg)


* **Visitor Check-Out page**

![Checkout page](https://i.imgur.com/iJaaqve.png)

* **Mail received by client after check-out.**

![Checkout mail](https://i.imgur.com/oHl00ar.png)

* **Check-out success pop up.**

![Checkout success](https://i.imgur.com/2kTrr8n.png)

* **Check-out error message if the client has not checked in yet.**

![Checkout error](https://i.imgur.com/zf3UEVn.png)

### The Database

![Database](https://i.imgur.com/9dPFKRD.png)

### Installing and running the Web App locally

1. Install MongoDB and NodeJS.
2. Clone the repository using
```
git clone https://github.com/bansal-shubham/Innovaccer-Summergeeks-Assignment.git
```
3. Go to the project directory and install the dependencies using the code below.
```
cd Innovaccer-Summergeeks-Assignment
npm install
```
4. Create a ```.env``` file in the folder and enter your Email ID, Password and Database name there in the following manner
```
MONGO_URL=mongodb://localhost/"Enter database name"
EMAIL_ID= "Enter your Email ID"
EMAIL_PASS= "Enter your Password"
IP=localhost
PORT=3500
```
5. Finally, update your ```FAST2SMS API authorization key``` in the same ```.env``` file in for sending sms through fast2sms.
```
Add details for sending message's via 'Fast2sms' API for example

TXT_KEY="Enter SMS Authorization Key"
```
6. Run ```mongod``` in seperate terminal and ```node app.js``` in seperate terminal with the project.

7. Then go to localhost:3500 .

## Author

Name: **Shubham Bansal**

Email ID: 17ucs156@lnmiit.ac.in

