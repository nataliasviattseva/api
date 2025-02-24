const UserModel = require('../models/user.js')
const AlbumModel = require('../models/album.js')
const PhotoModel = require('../models/photo.js')

const Albums = class Albums {
  /**
   * @constructor
   * @param {Object} app
   * @param {Object} connect
   */
  constructor (app, connect, authenticateToken) {
    this.app = app
    this.AlbumModel = connect.model('Album', AlbumModel)
    this.authenticateToken = authenticateToken

    this.run()
  }

   /**
   * Create
   */
   create () {
    this.app.post('/album/', this.authenticateToken, (req, res) => {
      try {
        const albumModel = new this.AlbumModel(req.body);
  
        albumModel.save()
          .then((album) => {
            res.status(200).json(album || {});
          })
          .catch((err) => {  // Added err parameter here
            console.error(`[ERROR] album/create: ${err}`);
            res.status(500).json({
              code: 500,
              message: 'Internal Server Error'
            });
          });
      } catch (err) {
        console.error(`[ERROR] album/create -> ${err}`);
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }


/**
   * Show an album by its id.
*/
showById() {
  this.app.get('/album/:id', this.authenticateToken, (req, res) => {
    try {
      this.AlbumModel.findById(req.params.id)
        .then((album) => res.status(200).json(album || {}))
        .catch((err) => {
          console.error(`[ERROR] album/:id: ${err}`);
          res.status(500).json({ code: 500, message: 'Internal Server Error' });
        });
    } catch (err) {
      console.error(`[ERROR] album/:id: ${err}`);
      res.status(400).json({ code: 400, message: 'Bad request' });
    }
  });
}

/**
   * Update an album by its id.
*/
updateById() {
  this.app.put('/album/:id', this.authenticateToken, (req, res) => {
    try {
      this.AlbumModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((album) => res.status(200).json(album || {}))
        .catch((err) => {
          console.error(`[ERROR] album/update/:id: ${err}`);
          res.status(500).json({ code: 500, message: 'Internal Server Error' });
        });
    } catch (err) {
      console.error(`[ERROR] album/update/:id: ${err}`);
      res.status(400).json({ code: 400, message: 'Bad request' });
    }
  });
}

/**
   * Delete an album by its id.
   */
deleteById() {
  this.app.delete('/album/:id', this.authenticateToken, (req, res) => {
    try {
      this.AlbumModel.findByIdAndDelete(req.params.id)
        .then((album) => res.status(200).json(album || {}))
        .catch((err) => {
          console.error(`[ERROR] album/delete/:id: ${err}`);
          res.status(500).json({ code: 500, message: 'Internal Server Error' });
        });
    } catch (err) {
      console.error(`[ERROR] album/delete/:id: ${err}`);
      res.status(400).json({ code: 400, message: 'Bad request' });
    }
  });
}

  /**
   * Run
   */
  run () {
    this.create()
    this.showById()
    this.updateById();
    this.deleteById()
  }
}

module.exports = Albums
