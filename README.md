## Clone the project

```
git clone https://github.com/PalashCoder/Community-Platform-Backend.git backend
cd backend
```

### Then install the dependencies:-

```
npm i
```

### Start the project:-

```
npm start
```

## OR

```
cd src
nodemon server.js
```

## Make Sure You Have Some Software Installed in your system:-

<ul>
<li>NodeJS</li>
<li>Node Package Manager</li>
<li>PostgreSQL</li>
<li>Postman (for testing APIs)</li>
</ul>

## API endpoints:-

### Role

URL</br>
Create:- POST /v1/role </br>
Get All:- GET /v1/role</br></br>

### User

URL</br>
Sign Up:- POST /v1/auth/signup</br>
Sign in:- POST /v1/auth/signin</br>
Get Me:= GET /v1/auth/me</br></br>

### Community

URL
Create:- POST /v1/community</br>
Get All:- GET /v1/community</br>
Get All Members:- GET /v1/community/:id/members</br>
Get My Owned Community:- GET /v1/community/me/owner</br>
Get My Joined Community:- GET /v1/community/me/member</br></br>

### Member</br>
URL</br>
Add Member:- POST /v1/member</br>
Remove Member:- DELETE /v1/member/:id
