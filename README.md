# Ecommerce-API-app
This API is for a eccomerce app. This uses Node js with express as the framework of this api. The use of api such as Stripe is used for payments as well as cloudify for saving images. There are various functionalities for this api and it also implements CRUD methods. Such functionalities include:

1.)User authentication(login, registering, viewing profile and updating shipping)
2.)Products management(creation, deletion, update, getting all products, getting a singular product, filtering products and pagination of products. This uses CRUD methods)
3.)Category management(creation, deletion, update, getting all categories and getting a singular category. This uses CRUD methods)
4.)Brand management(creation, deletion, update, getting all brands and getting a singular brand. This uses CRUD methods)
5.)Color management(creation, deletion, update, getting all colors and getting a singular color. This uses CRUD methods)
6.)Reviews creation(creating review for the associated product)
7.)Order management(creation, analysis and reading orders)
8.)Coupon management(creation, update, delete, getting all coupons and getting a singular coupon. This uses CRUD methods and follows coupon functionality in daily uses)

All these functionality follows the typical eccomerce app so the api would have similar functionality. The api can be checked and used with via postman as the link will be given below, more documentation for how the api works and how to use it on postman will also be given in the postman documentation. In addition the api was deployed in render and thus the reason why a base url is given as related to the deployment location. 

Stripe is used in this case however the stripe CLI is needed in order to see the webhooks work to full potential. There is a link for developers in stripe to learn more about this. In addition the api keys for stripe is needed to run this project. Cloudify is also used and thus the api keys are also needed. Finally mongo database is also needed to be connected in order to use such code. 

This API can be used as a backend for a upcoming front end eccomerce build. All details regarding postman documentation and deployment url is given below.

Deployment url:

Postman api url:

