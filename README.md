# Socialbook

Please check out the site at [Socialbook](http://www.socialbook.tech)

Socialbook is a Facebook clone that seeks to replicate some commonly used features and design decisions as closely as possible. Socialbook enables users to interact with others in their social network by adding and removing friends, posting, writing on their friends walls, commenting on their posts and friends posts, and keeping track of other interactions via their newsfeed.

## Technology

### Frontend
  + React
  + Redux
  + AJAX
  + CSS
  + Sass/SCSS
  + Heroku (web hosting)
  + Node/NPM

### Backend
  + Amazon Web Services (S3)
  + PostgreSQL
  + Ruby on Rails
  + ActiveRecord

## Features
A gif will be present below each description showing each feature in action.

1. Custom Authentication
2. Creating/Deleting a Post
3. Uploading Image
4. Adding/Deleting a Friend
5. Newsfeed

### Custom Authentication
<!-- Explanation on top -->
<!-- ![Socialbook Login](docs/auth.gif) -->
Most users when using a social media platform expects the company to maintain a high level of optional privacy and security. In order to make sure the security portion meets customer standards, BCrypt gem was used. The gems makes sure what gets saved is a hash version of the password instead of the password itself.

Error handling was implemented in order to convey to the user what he/she is missing. The process happens once a person clicks on Login/Create Account button. If a validation fails, the backend will send up errors where we store within the Errors slice of state under it's appropriate key (session for this case). Depending on the type of error, we can allocate them in the right location.

<!--
Authentication is an important feature for any social media site. In order to maintain security, the use of Bcrypt gem on the backend was implemented which job is to create a session token which is used to login and logout a user. Error handling is another key feature which tells a user what he/she may be missing due to model validation in regards to forms. Both can be seen for Login/Signup where errors are fired when a user doesn't fill in the required fields. This cycle fire from the backend and retains in the error slice of state under appropriate key such as session in this case.   -->

<img src="docs/auth.gif" width="600">


### Creating/Deleting Posts
<!-- ![Socialbook Login](docs/posting.gif) -->
A user is able to create a post on his/her own wall and their friends wall. The delete function is only available to post created by the signed in user. The post are added/removed once an action fires. The action would lead to the store to be updated which forces the component to update as well. This occurs since the amount of post in the current state is less than the next state.

<img src="docs/posting.gif" width="600">

### Uploading image

A user is able to update their profile image. The process is similar to Facebook where a user selects an image and it produces a preview before the user saves their image. If he/she were to cancel the image, it would disappear from the local state and they'll need to pick an image again.

<img src="docs/photo.gif" width="600">


### Adding/Deleting Friends

The interaction between two users start from the backend. Where upon requesting to add a user, a friendship is initialized through the Friends model. The user who initiates the request is considered a friender while the requested is the friendee. By default once the instance has been initialized it'll have a default "Pending" until a friendee accepts the requested friendship.

```Ruby
create_table "friends", force: :cascade do |t|
  t.integer "friender_id", null: false
  t.string "status", default: "Pending", null: false
  t.datetime "created_at", null: false
  t.datetime "updated_at", null: false
  t.integer "friendee_id"
  t.index ["friendee_id"], name: "index_friends_on_friendee_id"
  t.index ["friender_id"], name: "index_friends_on_friender_id"
end
```

There were multiple ways a "friend" connection could have been established, another being creating a pending model and a friendship model. I believe a better approach was maintaining a single table model and using methods to proceed how a person interacts with the initialized instance (whether it's to cancel a request or change "Pending" to "Accepted").

<img src="docs/friendship.gif" width="600">

### Newsfeed
The Newsfeed is one of Facebook key feature. A NewsFeed is where a logged in user gets to see what their friends have posted and are able to make a post (which appears on their profile wall as well).

``` Ruby
def newsfeed
  @friends ||= self.in_friends.where("friends.status = 'Accepted'").includes(:posts) + self.out_friends.where("friends.status = 'Accepted'").includes(:posts)
  @something = self.profile_posts

  @posts = []

  @friends.each { |friend| @posts += friend.posts }
  @newsfeed = @posts + @something

  @newsfeed.sort! { |a, b|  b.created_at <=> a.created_at }
end
```

Since the interaction between a "friend" can either be the initiator (in_friends) or the receiver (out_friends), we need to get all friend that has the current user in the model on both ends and with a "Accepted" status which means they are friends.

<img src="docs/newsfeed.gif" width="600">


## Design Decisions
#### Why React?

React is a library that was created by the Facebook team back in 2013 which has taken front and center in the last year. Question is, why React was implemented over it's well known competitor Angular. Besides the point that Facebook uses it itself, React has a lot of good reasons why one would pick it. First is its size. Being a small library and not a framework like Angular, it makes it faster for a user visiting a website to download the required files quicker. Another advantage is how quick React runs due to its use of a virtual DOM that updates depending on changes occurring in comparison to using views (Angular). Although it is quicker, there are specific scenarios where Angular 2 can be considered faster.

## Features in Development
- Fix drop down regarding pending Users
- Friends add state not updating and delete button
- Implement Comment to Posts
- Editing Posts and Comments
- Improved Newsfeed algorithm
- Search for Users
- Suggested Friends
