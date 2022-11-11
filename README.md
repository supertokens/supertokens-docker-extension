![stars](https://img.shields.io/github/stars/supertokens/supertokens-docker-extension)
![forks](https://img.shields.io/github/forks/supertokens/supertokens-docker-extension)
![issues](https://img.shields.io/github/issues/supertokens/supertokens-docker-extension)
![Visitor count](https://shields-io-visitor-counter.herokuapp.com/badge?page=supertokens.supertokens-docker-extension)
![Twitter](https://img.shields.io/twitter/follow/supertokensio?style=social)


# Supertokens Extension for Docker 


SuperTokens is an open source user authentication solution. It is an open core alternative to proprietary login providers like Auth0 or AWS Cognito.


## Pre-requisite:

- [Docker Desktop 4.8 or later](https://docs.docker.com/desktop/)

## Building the Extension

Clone the repository and change directory to run the following command:


```
 make build-extension
```

As a result, the above command will provide you with ```supertokens/supertokens-docker-extension:latest``` Extension image.


## Running the Supertokens Docker Extension

```
 docker extension install supertokens/supertokens-docker-extension:latest
```


<img width="824" alt="image" src="https://user-images.githubusercontent.com/313480/201277777-3eb72141-6b16-451e-b6aa-5a123a189947.png">


