# User Management System, Spring Boot, Vue JS, MySQL, Hibernate, Liquibase, JWT

The application structure is as follows.
- **server-user-management** - Service implemented using Spring boot. [More info](server-user-management/README.md)
- **client-user-management** - A NodeJs application implemented using Vue JS 3. This consumes services hosted by server side.  [More info](client-user-management/README.md)

#### 1) Build Server Side

```
$ cd server-user-management
$ gradlew bootJar
$ gradlew bootRun
```

#### 2) Build and run client side

```
$ cd client-side
$ npm run serve --port 4000
```

### Access server side using following URL

```
http://localhost:8080
```

### Access application using following URL

```
http://localhost:4000
```