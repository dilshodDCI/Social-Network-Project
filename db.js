var spicedPg = require("spiced-pg");

var db = spicedPg(
    process.env.DATABASE_URL || "postgres:postgres:postgres@localhost:5432/sn"
);

exports.createUser = (first, last, email, password) => {
    return db.query(
        `INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id, first, last`,
        [first || null, last || null, email || null, password || null]
    );
};

exports.getUser = email => {
    return db.query(
        `SELECT users.id AS "userId", users.password
        FROM users
        WHERE users.email = $1`,
        [email]
    );
};

exports.getUserData = userId => {
    return db.query(
        `SELECT *
        FROM users
        WHERE id = $1`,
        [userId]
    );
};

exports.addImages = (userId, profilePicUrl) => {
    return db.query(
        `UPDATE users
        SET profilePicUrl = $2
        WHERE id = $1
        RETURNING *`,
        [userId, profilePicUrl]
    );
};

exports.updateBio = (userId, bio) => {
    return db.query(
        `UPDATE users
        SET bio = $2
        WHERE id=$1
        RETURNING *`,
        [userId, bio]
    );
};

exports.otherPersonProfiles = id => {
    return db.query(
        `SELECT first, last, email, profilepicurl, created_at, bio
        FROM users
        WHERE id = $1`,
        [id]
    );
};
