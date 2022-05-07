# How to use this application

Clone this repository and open the project in your preferred code editor. Then open a bash and run:


## Installation

1. To install the dependencies:
```bash
npm install
```
2. To install react icons:
```bash
npm install react-icons --save
```


## Usage
1. To run your application server:
```bash
npm run dev
```
In order to run the commands above you need to have [Node.js and NPM](https://nodejs.org/es/download/) installed in your computer.



# Required resources

### Database
Before you run this application you have to create a database named "notes" in MySQL with the query:
```sql
CREATE DATABASE notes;
```
make sure the port of the MySQL server is 3306!



### Backend
To run the backend you have two options:
1. You can clone the backend [repository](https://github.com/luismilopez10/back-challenge_spring_react) and run the project.

or

2. You can download the [.jar](https://github.com/luismilopez10/back-challenge_spring_react/raw/master/target/back-challenge-0.0.1-SNAPSHOT.jar) and run in the command line as follows: 
```bash
java -Dserver.port=8081 -jar back-challenge-0.0.1-SNAPSHOT.jar
```