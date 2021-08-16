# books-catalog-backend
Books catalog backend.

## Setup

1. Create .env file
```bash
cp .env.example .env
```
2. Update env variables based on your configuration

## DB setup

1. Start service and postgres db with docker-compose
```bash
docker-compose up -d
```
2. Run migrations to create required tables
```bash
docker-compose exec api yarn migrate
```
4. Run seed to add initial data
```bash
docker-compose exec api yarn seed
```

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
