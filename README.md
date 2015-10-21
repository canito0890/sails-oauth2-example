# OAuth2 Server Example Api

The purpose of this example is to have an API protected by oauth2. But also doing it the most "sails-y" way. Or at least what I think is the sails way of doing it, contributions are appreciated.

## TODO

- Encrypt AccessToken.token and AuthCode.code.
- Test Endpoints
- Remove Dialog View and Expect only API calls.

## Credits

This example is from what I've learned mostly from:

 - [https://github.com/lucj/sails-oauth2-api](https://github.com/lucj/sails-oauth2-api)
 - [http://scottksmith.com/blog/2014/07/02/beer-locker-building-a-restful-api-with-node-oauth2-server/](http://scottksmith.com/blog/2014/07/02/beer-locker-building-a-restful-api-with-node-oauth2-server/)

## Dependencies

- Sails v0.11

### Bcrypt
- [bcrypt](https://www.npmjs.com/package/bcrypt)

### Passport
- [passport](http://passportjs.org/)
- [passport-http](https://github.com/jaredhanson/passport-http)
- [passport-http-bearer](https://github.com/jaredhanson/passport-http-bearer)
- [passport-oauth2-client-password](https://github.com/jaredhanson/passport-oauth2-client-password)

### OAuth2orize
- [oauth2orize](https://github.com/jaredhanson/oauth2orize/)

### Others
- [moment](https://github.com/moment/moment/)

## Missing

- Implement the [passport-oauth2-client-password](https://github.com/jaredhanson/passport-oauth2-client-password), the flow is completed with the passport basic strategy.

## Models

- Client
- AuthCode
- AccessToken
- User
- Product -> For api simulation
