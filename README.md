# Ecommerce MERN Stack
This the website for an ecommerce website. This project was made with redux, react js and tailwind css as the frontend and for the backend nodejs, expressjs and mongod was used. The features of the application is as stated below:

# 1.) Users
* User have an authentication system that has the login features where users can login with a correct email and password<br />
* User have an authentication system that has registering features where users can register with a email, password and username.
  * If a email exist then such account will not be registered.
  * Passwords are automatically hashed for privacy and security
* User have a feature where users can view profile and the profile will include every single detail about the user including their orders.
* User have a feature where users can add their shipping address for orders
* Users can also do payments for products via stripe webhooks
<br />

# 2.) Admins
* Admins have their own authentication system that has the login features where admins can login with a correct email and password<br />
* Admins can perform CRUD functionality towards products, categories, brands as well as colors.
* Admins can view all customers who have purchased items and set the processing status
* Admins have their own dashboard to view the total purchased items per day as well as other extra features
* Normal users cant access admin dashboard and admins have their own features as mentioned above
<br />

# 3.) Products management
* Admins can create products with specific fields and a file which will be uploaded to cloudify.
  * Only jpg, png and jpeg files are allowed as these files dictate a image
  * Multiple images are allowed
* Admins can delete products
* Admins can update a certain product as well
* All users can get all products
* All users can get a singular product to view
* All users can filter products by color, brand, category and price.
* All users can also view pagination of products
* Product management follows CRUD methods as mentioned above.
<br />

# 4.)Category management
* Admins can create categories with specific fields and a file which will be uploaded to cloudify.
  * Only jpg, png and jpeg files are allowed as these files dictate a image
  * Only a singular image is allowed
* Admins can delete categories
* Admins can update a certain categories as well
* All users can get all categories
* All users can get a singular category to view as well as products associated 
* Category management follows CRUD methods as mentioned above.
<br />

# 5.)Brand management
* Admins can create brand with specific fields and a file which will be uploaded to cloudify.
  * Only jpg, png and jpeg files are allowed as these files dictate a image
  * Only a singular image is allowed
* Admins can delete brands
* Admins can update a certain brand as well
* All users can get all brands
* All users can get a singular brands to view as well as products associated 
* Category management follows CRUD methods as mentioned above.
<br />

# 6.)Color management
* Admins can create brand with specific fields
* Admins can delete colors
* Admins can update a certain colors as well
* All users can get all colors
* All users can get a singular colors to view 
* Color management follows CRUD methods as mentioned above.
<br />

# 7.)Reviews creation
* All users can create a review for a singular product
* Reviews cant be given to the same product twice by the same user
<br />

# 8.)Order management
* All users can create an order via the products they are going to buy
  * After an order is created a stripe payment will be given
  * Upon completion the order will update its status
  * The stock will change if order is valid
* Admins can analyse orders of the month
  * They can analyse orders via minimum order made
  * They can analyse orders via maximum order made
  * They can analyse orders via total sales made
  * They can analyse orders via average orders made
* Admins can view all orders
<br />

# 9.)Coupon management
* Admins can create coupons with specific fields
* Admins can delete a coupon
* Admins can update a certain coupon as well
* All users can get all coupons
* All users can get a singular coupon to view
* Coupon management follows CRUD methods as mentioned above.
* Coupons are made following the real world functionality of coupons
<br />

# Functionalities

All these functionality as above was created with the use of an eccomerce api at the backend(which was created by me as well) and for the frontend react was used to handle forms and display. Redux was used as a form of state managment to ensure that everything returned from the api is stored as a state

# Netlify and deployment

This website is deployed online and can be viewed<br />

Netlify url: https://woodencloud.netlify.app/ <br />




