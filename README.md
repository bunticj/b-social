# b-social

### Project structure
Project consists of 3 main folders and docker-compose

api : REST API service and MySQL database

notifications: Kafka comment consumer which fires HTTP request to alert the new notification

telemetry: Kafka consumer all the messages and writes them to Elasticsearch

docker-compose: Orchestrator for all services

### Project run

In order to start all services, you have to set LOCAL_ADD variable,it represents your docker-machine ip:

```
LOCAL_ADD=192.168.99.100 docker-compose up -d
```

-API: ${LOCAL_ADD}:3000

-Kibana: ${LOCAL_ADD}:5601

-Elasticsearch: ${LOCAL_ADD}:9200



#### API Routes
Headers for all routes: 
```
req.headers: 
Content-Type : application/json
Authorization: Bearer tokenValue
*unprotected routes are : baseURL/register,  baseURL/login and baseURL/test
```

##### User related routes

```
Register user :
POST  baseURL/register 
req.body :{
    first_name : String,
    last_name : String,
    email : String,
    username: String,
    password : String,
    confirm_password :String
} 
```
Upon registering,user receives token, Kafka publishes a message about user 

```
Login user :
POST  baseURL/login 
req.body :{
    email : String,
    password : String
} 
```
```
Follow user :
POST baseURL/follow
req.body : {
    follow_id : Integer
}
```
```
Get all users :
GET baseURL/user
```
```
Get following users :
GET baseURL/follow
```

```
Get user notifications :
GET baseURL/user/:userId/message
```
Get unseen notifications


##### Post and Comments related routes

```
Add new post :
POST baseURL/post
req.body :{
    post_content: String
}  
```
After adding post, Kafka publishes a message

```
Add new comment on post :
POST baseURL/post/:postId/comment
req.params.postId : post_id Integer
req.body :{
    comment_content: String
}  
After commenting, Kafka publishes a messages, and call axios request to user messages internally to add new notification to the owner of the post
```

```
Get posts from user and those who user follows :
Pagination -> req.query.page : integer || default=1, req.query.size : integer || default=10
GET baseURL/post
```
```
Get single post
GET baseURL/post/:postId
```
```
Get all comments on single post
GET baseURL/post/:postId/comments
```
