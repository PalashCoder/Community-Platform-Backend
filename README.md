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

URL
Create:- POST /v1/role
Get All:- GET /v1/role

### User

URL
Sign Up:- POST /v1/auth/signup
Sign in:- POST /v1/auth/signin
Get Me:= GET /v1/auth/me

### Community

URL
Create:- POST /v1/community
Get All:- GET /v1/community
Get All Members:- GET /v1/community/:id/members
Get My Owned Community:- GET /v1/community/me/owner
Get My Joined Community:- GET /v1/community/me/member
Member
URL
Add Member:- POST /v1/member
Remove Member:- DELETE /v1/member/:id
