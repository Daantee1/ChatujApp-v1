const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyparser = require("body-parser");
const app = express();
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());
app.use(bodyparser.json());

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1780721",
  key: "4d788afbd3ea61da9e5d",
  secret: "1d78ddda8a55384ef2c2",
  cluster: "eu",
  useTLS: true
});



const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chatuj",
});

app.post('/api/messages', (req, res) => {
  const { user, message } = req.body;
  

  pusher.trigger('chat', 'data', { user, message });
  
  res.status(200).json({ success: true, message: 'Message sent successfully' });
});

app.get("/", (req, res) => {
  return res.json("Hello World");
});

app.post("/api/users/add", async (req, res) => {
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRound);
  let details = {
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
  };
  let sql = "INSERT INTO users SET ?";
  db.query(sql, details, (err) => {
    if (err) {
      res
        .status(500)
        .send({ status: false, message: "Database insertion error", error });
    } else {
      res.send({ status: true, message: "User added successfully" });
    }
  });
});

app.get("/api/users", async (req, res) => {
  let sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) {
      res
        .status(500)
        .send({ status: false, message: "Database selection error", error });
    } else {
      res.send({ status: true, message: "User list", result });
    }
  });
});

app.get("/api/users/:id", async (req, res) => {
  const userId = req.params.id;
  let sql = "SELECT * FROM users WHERE id=" + userId;
  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res
        .status(500)
        .send({ status: false, message: "Database selection error", error });
    } else {
      res.send({ status: true, message: "User details", result });
    }
  });
});
app.delete("/api/users/delete/:id", async (req, res) => {
  let sql = "DELETE FROM users WHERE id=?";
  db.query(sql, req.params.id, (err) => {
    if (err) {
      res
        .status(500)
        .send({ status: false, message: "Database deletion error", err });
    } else {
      res.send({ status: true, message: "User deleted successfully" });
    }
  });
});

app.get("/api/users/checkEmail/:email", async (req, res) => {
  const email = req.params.email;
  console.log(email);
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, email, (err, result) => {
    if (err) {
      res
        .status(500)
        .send({ status: false, message: "Database selection error", error });
    } else {
      if (result.length > 0) {
        res.send({ status: false, message: "Email already exists" });
      } else {
        res.send({ status: true, message: "Email is available" });
      }
    }
  });
});
app.get("/api/users/checkUsername/:username", async (req, res) => {
  const email = req.params.username;
  const sql = "SELECT * FROM users WHERE username= ?";
  db.query(sql, email, (err, result) => {
    if (err) {
      res
        .status(500)
        .send({ status: false, message: "Database selection error", error });
    } else {
      if (result.length > 0) {
        res.send({ status: false, message: "Username already exists" });
      } else {
        res.send({ status: true, message: "Username is available" });
      }
    }
  });
});

app.get("/api/users/login/:email/:password", async (req, res) => {
  const email = req.params.email;
  const password = req.params.password;
  const sql = "SELECT * FROM users WHERE email= ?";
  db.query(sql, [email], async (err, result) => {
    if (err) {
      res
        .status(500)
        .send({ status: false, message: "Database selection error", error });
    } else {
      if (result.length > 0) {
        const match = await bcrypt.compare(password, result[0].password);
        if (match) {
          res.send({ status: true, message: "Login successful", result });
        } else {
          res.send({ status: false, message: "Login failed" });
        }
      } else {
        res.send({ status: false, message: "Login failed" });
      }
    }
  });
});

app.put("/api/users/updatePassword/:id", async (req, res) => {
  const id = req.params.id;
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRound);
  let sql = "UPDATE users SET password = ? WHERE id = ?";
  db.query(sql, [hashedPassword, id], (err) => {
    if (err) {
      res
        .status(500)
        .send({ status: false, message: "Database update error", err });
    } else {
      res.send({ status: true, message: "Password updated successfully" });
    }
  });

})

app.get("/api/users/checkPassword/:id/:password", async (req, res) => {
  const id = req.params.id;
  const password = req.params.password;
  let sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, id, async (err, result) => {
    if (err) {
      res
        .status(500)
        .send({ status: false, message: "Database selection error", err });
    } else {
      if (result.length > 0) {
        const match = await bcrypt.compare(password, result[0].password);
        if (match) {
          res.send({ status: true, message: "Password matched" });
        } else {
          res.send({ status: false, message: "Password not matched" });
        }
      } else {
        res.send({ status: false, message: "Password not matched" });
      }
    }
  });
})

app.delete("/api/users/delete/:id", async (req, res) => {
  const id = req.params.id;
  let sql = "DELETE FROM users WHERE id=?";
  db.query(sql, id, (err) => {
    if (err) {
      res
        .status(500)
        .send({ status: false, message: "Database deletion error", err });
    } else {
      res.send({ status: true, message: "User deleted successfully" });
    }
  })
})

app.post("/api/profiles/add", async (req, res) => {
  let details = {
    gender: req.body.gender,
    age: req.body.age,
    province: req.body.province,
    hobbies: req.body.hobbies.join(","),
    userId: req.body.userId,
  };
  let sql = "INSERT INTO profiles SET ?";
  db.query(sql, details, (err) => {
    if (err) {
      res
        .status(500)
        .send({ status: false, message: "Database insertion error", err });
    } else {
      res.send({ status: true, message: "Profiles added successfully" });
    }
  });
});

app.get("/api/profiles/:userId", async (req, res) => {
  const userId = req.params.userId;
  let sql = "SELECT * FROM profiles WHERE userId = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      res
        .status(500)
        .send({ status: false, message: "Database selection error", err });
    } else {
      res.send({ status: true, message: "Profiles list", result });
    }
  });

});

app.put("/api/profiles/updateHobbies/:id", async (req, res) => {
  const id = req.params.id;
  const hobbies = req.body.hobbies;
  let sql = "UPDATE profiles SET hobbies = ? WHERE id = ?";
  db.query(sql, [hobbies, id], (err) => {
    if (err) {
      res
        .status(500)
        .send({ status: false, message: "Database update error", err });
    } else {
      res.send({ status: true, message: "Profiles updated successfully" });
    }
  
  })
})

app.delete("/api/profiles/delete/:id", async (req, res) => {
  const id = req.params.id;
  let sql = "DELETE FROM profiles WHERE userId=?";
  db.query(sql, id, (err) => {
    if (err) {
      res
        .status(500)
        .send({ status: false, message: "Database deletion error", err });
    } else {
      res.send({ status: true, message: "User deleted successfully" });
    }
  })
})

app.listen(8081, () => {
  console.log("Server is running on port 8081");
});

db.connect((err) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Database Connected Successful!");
  }
});
