var Sequelize = require("sequelize");

/* 
* Extract DB Connection string if on deployed environment. Otherwise use default.
* If testing locally, make a POSTGRES DB with the same specifications.
* u/n: 'tunnelsup'
* pwd: 'SQL'
* port: 5432 (This is the default Postgres port)
* DB name: 'bookup_development'
*/
var connectionString = process.env.DATABASE_URL || 'postgres://tunnelsup:SQL@localhost:5432/bookup_development';
var orm = new Sequelize(connectionString);

/**
 * 'User' ORM object. Maintains id from Goodreads, username and profile pic URL.
 * Contains a separate id value for primary key.
 * 
 * @type {ORM Object}
 */
var User = orm.define('User', {
  goodreadsId: Sequelize.INTEGER,
  username: Sequelize.STRING,
  profile_img_url: Sequelize.STRING
});

var Bookmarks = orm.define('Bookmark', {
  
});

/**
 * 'Book' ORM object. Maintains title, author, genre and cover pic URL.
 *
 * @type {ORM Object}
 */
var Book = orm.define('Book', {
  title: Sequelize.STRING,
  author: Sequelize.STRING,
  genre: Sequelize.STRING,
  cover_img_url: Sequelize.STRING
});

/*
 * Initialize join table between users and their favorite books.
 */
User.belongsToMany(Book, {through: 'FavoriteBooks'});
Book.belongsToMany(User, {through: 'FavoriteBooks'});

/*
 * Initialize join table between users and their bookmarks.
 */
User.belongsToMany(User, {as: 'Bookmarks', through: "Bookmark"});

/*
 * Create tables if they don't already exist.
 */
User.sync();
Book.sync();
Bookmarks.sync();

exports.User = User;
exports.Book = Book;
