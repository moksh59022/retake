const express = require("express");

const app = express();

const port = 3000;

app.use(express.json());

const users = [
    { email: "alice@gmail.com", password: "alice123" },
    { email: "bob@gmail.com", password: "bob123" },
    { email: "charlie@gmail.com", password: "charlie123" },
];

app.get("/", (req, res) => {
    res.send("hello");
});

app.delete("/delete-user", (req, res) => {
    const { email } = req.body;
    const userIndex = users.findIndex((user) => user.email === email);

    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        return res.json({ success: true, message: "User deleted successfully" });
    } else {
        return res.status(404).json({ success: false, message: "User not found" });
    }
});

app.put("/update/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const userIndex = users.findIndex((user) => user.email === email);

        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...req.body };
            return res.status(200).json({ success: true, message: "User updated successfully" });
        } else {
            return res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


