# Run

```bash
yarn start
```

or

```bash
docker-compose build
docker-compose up
```

# Routes

| Method | Path | Request | Response | Need Authorize |
| --- | --- | --- | --- | --- |
| GET | / | `null` | `Routes` | No |
| GET | /todo | `null` | `Todo[]` | Yes |
| POST | /todo | `Todo` | `Todo.id` | Yes |
| DELETE | /todo/:id | `null` | `null` | Yes |
| POST | /login | `User` | | No |
| POST | /singup | `User` | | No |

# Status

| Method | Path | 200 | 204 | 401 | 500 |
| --- | --- | --- | --- | --- | --- |
| GET | / | Get index | | | |
| GET | /todo | Authorized | | Not authorized | Database error |
| POST | /todo | Authorized | | Not authorized | Database error |
| DELETE | /todo | | Authorized | Not authorized | Database error |
| POST | /login | Get authorize | | Wrong credential | Wrong request |
| POST | /singup | Get authorize | | Wrong password | Wrong request |

# Types

```typescript
type User = {
  id?: number,
  user: string,
  pass: string
}

type Todo = {
  id?: number,
  name: string
}

type Routes = {
  [key: string]: string[]
}

type Authorize = {}
```