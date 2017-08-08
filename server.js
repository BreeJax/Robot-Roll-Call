const express = require("express")
const pgp = require("pg-promise")()
const mustacheExpress = require("mustache-express")
const userDirectory = require("./data")

const app = express()
app.engine("mustache", mustacheExpress())

const database = pgp({ database: "workingRobots" })

const query = 'Select * FROM "robots"'

database.any(query).then(data => {
  console.log(data)
})

// dummy code...
//
// database
//   .one('UPDATE "todos" SET completed = $1, when_completed =$2 WHERE id = $3',
//       [true, new Date(), 4])
//
// database
//     .none('INSERT INTO "todos" (description, completed) VALUES($1, $2) RETURNING is',)
//     .then(data => {
//       console.log('our insert re');
//       })
// CREATE TABLE robots ("id" SERIAL PRIMARY KEY, "username" VARCHAR(100) NOT NULL, "imagery" VARCHAR( 300) NOT NULL, "email" VARCHAR(200) NULL,"university" VARCHAR(100) NULL, "street-number" VARCHAR(50) NULL, "address" VARCHAR(100) NULL,
// "city" VARCHAR(100) NULL, "state" VARCHAR(100) NULL, "job" VARCHAR(100) NULL, "company" VARCHAR(100) NULL, "postal_code" INTEGER NULL, "year_built" INTEGER NULL, "next_service_date" DATE NULL, "is_active" BOOLEAN NOT NULL);

app.set("views", "./templates")

app.set("view engine", "mustache")

app.use(express.static("public"))

app.get("/info/:id", (request, responce) => {
  const requestId = parseInt(request.params.id)
  const foundUser = userDirectory.users.find(user => user.id === requestId)
  responce.render("info", foundUser)
})

app.get("/", (request, responce) => {
  responce.render("home", userDirectory)
})

app.listen(3000, () => {
  console.log("machine is running now")
})
