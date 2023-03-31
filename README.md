# EchoRider

EchoRider is a framework backed using typescript and vuejs

## requeriments

| requeriments | version  |
| ------------ | -------- |
| nodejs       | ^14.16.x |

## usage

### firts app using EchoRider

```typescript
import EchoRider from "EchoRider";
import Router from "Router";
// interfaces to handler router
import Request from "EchoRider/http/request";
import Response from "EchoRider/http/response";

const app = new EchoRider();
const router = new Router();

// add router
router.get("/", [
  (request: Request, response: Response) => {
    response.send("hello world!");
  },
]);

app.useRouter(Router);

// default port used is 3000
app.listen();
```

### middlewares

! important

`useMiddlewareAll()` this function add middleware in all routes of the class

```typescript
import Router from "router";

const router = new Router();

router.get("/", [
  (request: Request, response: Response) => {
    response.send("hello world!");
  },
]);

router.useMiddlewareAll(
  (request: Resquest, response: Response, next: NextFunction) => {
    console.log("middleware works!");
    next();
  }
);

app.useRouter(Router);

// default port used is 3000
app.listen();
```
