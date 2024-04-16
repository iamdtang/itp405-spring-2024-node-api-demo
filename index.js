const express = require("express");
const Sequelize = require("sequelize");

const app = express();
const sequelize = new Sequelize("sqlite:database.sqlite");

const Artist = sequelize.define(
  "artist",
  {
    id: {
      field: "ArtistId",
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      field: "Name",
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

const Album = sequelize.define(
  "album",
  {
    id: {
      field: "AlbumId",
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    title: {
      field: "Title",
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

Artist.hasMany(Album, {
  foreignKey: "ArtistId",
});

Album.belongsTo(Artist, {
  foreignKey: "ArtistId",
});

app.get("/api/albums", (request, response) => {
  Album.findAll().then((albums) => {
    response.json(albums);
  });
});

app.get("/api/albums/:id", (request, response) => {
  Album.findByPk(request.params.id, {
    include: [Artist],
  }).then((artist) => {
    response.json(artist);
  });
});

app.listen(8000);
