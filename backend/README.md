# books-catalog-backend
Books catalog backend.

## Setup

1. Create .env file
```bash
cp .env.example .env
```
2. Update env variables based on your configuration

## Usage
1. Start service and postgres db with docker-compose
```bash
docker-compose up -d
```
2. View api logs
```bash
docker-compose logs -f api
```
## Tests

1. To run tests
```bash
yarn test
```
2. To get coverage report
```bash
yarn test:coverage
```
