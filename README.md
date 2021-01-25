# pact-example
This repo will be used to test the consumer-driven contract testing tool, [Pact](https://docs.pact.io/)

### Setup

```
nvm install

npm install --prefix consumer
npm install --prefix provider
```

### Run

Generate the contract pacts from the consumer:

```
npm run test --prefix consumer
```

Validate the contract from the provider using the generated pacts from the consumer:

```
npm run test --prefix consumer
```


