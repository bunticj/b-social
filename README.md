# b-social

### Project structure
Project consists of 3 main folders and docker-compose

api : REST API service and MySQL database

notifications: Kafka comment consumer which fires HTTP request to alert the new notification

telemetry: Kafka consumer for all messages, and writes them to Elasticsearch

docker-compose: Orchestrator for all services

### Project run
```
docker-compose up -d
```
After all services start, services are available on:

-API: 192.168.99.100:3000

-Kibana: 192.168.99.100:5601

-Elasticsearch: 192.168.99.100:9200

*It's possible that instead of '192.168.99.100' services will be available on '0.0.0.0'


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



##### Post and Comments related routes

```
Add new post :
POST baseURL/post
req.body :{
    post_content: String
}  
```

```
Add new comment on post :
POST baseURL/post/:postId/comment
req.params.postId : post_id value
req.body :{
    comment_content: String
}  
*Upon commenting, Kafka receives a messages, and sends request to user messages internally
```

```
Get all users post and post from following users :
Pagination -> req.query.page : integer || default=1, req.query.size : integer || default=10
GET baseURL/post
```
```
Get single post
GET baseURL/post/:postId
```
```
Get all comments post 
GET baseURL/post/:postId/comments
```
