# Ecommerce-API-app
This API is for a eccomerce app. This is can be a backend for a eccomerce website, however the front end is not developed. This uses Node js with express as the framework of this api. The use of api such as Stripe is used for payments as well as cloudify for saving images. There are various functionalities for this api and it also implements CRUD methods. Such functionalities include:

# 1.) User authentication
* User authentication has login features where users can login with a correct email and password<br />
* User authentication has registering features where users can register with a email, password and username.
  * If a email exist then such account will not be registered.
  * Passwords are automatically hashed for privacy and security
* User authentication has a feature where users can view profile and the profile will include every single detail about the user including their orders.
* User authentication has a feature where users can update their specific shipping address for future orders
<br />

# 2.) Products management
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

# 3.)Category management
* Admins can create categories with specific fields and a file which will be uploaded to cloudify.
  * Only jpg, png and jpeg files are allowed as these files dictate a image
  * Only a singular image is allowed
* Admins can delete categories
* Admins can update a certain categories as well
* All users can get all categories
* All users can get a singular category to view as well as products associated 
* Category management follows CRUD methods as mentioned above.
<br />

# 4.)Brand management
* Admins can create brand with specific fields and a file which will be uploaded to cloudify.
  * Only jpg, png and jpeg files are allowed as these files dictate a image
  * Only a singular image is allowed
* Admins can delete brands
* Admins can update a certain brand as well
* All users can get all brands
* All users can get a singular brands to view as well as products associated 
* Category management follows CRUD methods as mentioned above.
<br />

# 5.)Color management
* Admins can create brand with specific fields
* Admins can delete colors
* Admins can update a certain colors as well
* All users can get all colors
* All users can get a singular colors to view 
* Color management follows CRUD methods as mentioned above.
<br />

# 6.)Reviews creation
* All users can create a review for a singular product
* Reviews cant be given to the same product twice by the same user
<br />

# 7.)Order management
* All users can create an order via the products they are going to buy
  * After an order is created a stripe payment will be given
  * Upon completion the order will update its status
* Admins can analyse orders of the month
  * They can analyse orders via minimum order made
  * They can analyse orders via maximum order made
  * They can analyse orders via total sales made
  * They can analyse orders via average orders made
* Admins can view all orders
<br />

# 8.)Coupon management
* Admins can create coupons with specific fields
* Admins can delete a coupon
* Admins can update a certain coupon as well
* All users can get all coupons
* All users can get a singular coupon to view
* Coupon management follows CRUD methods as mentioned above.
* Coupons are made following the real world functionality of coupons
<br />

# Functionalities

All these functionality follows the typical eccomerce app so the api would have similar functionality. The api can be checked and used with via postman as the link will be given below, more documentation for how the api works and how to use it on postman will also be given in the postman documentation. In addition the api was deployed in render and thus the reason why a base url is given as related to the deployment location. <br />

Stripe is used in this case however the stripe CLI is needed in order to see the webhooks work to full potential. There is a link for developers in stripe to learn more about this. In addition the api keys for stripe is needed to run this project. Cloudify is also used and thus the api keys are also needed. Finally mongo database is also needed to be connected in order to use such code. <br />

# Postman and deployment

This API can be used as a backend for a upcoming front end eccomerce build. All details regarding postman documentation and deployment url is given below.<br />

Deployment url:<br />

Postman api url:<br />

