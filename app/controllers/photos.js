const PhotoModel = require('../models/photo.js')
const AlbumModel = require('../models/album.js');

const Photos = class Photos {
  /**
   * @constructor
   * @param {Object} app - Express app instance.
   * @param {Object} connect - Mongoose connection.
   * @param {Function} authenticateToken - Middleware to verify JWT.
   */
  constructor(app, connect, authenticateToken) {
    this.app = app
    this.PhotoModel = connect.model('Photo', PhotoModel)
    this.AlbumModel = connect.model('Album', AlbumModel);
    this.authenticateToken = authenticateToken

    this.run()
  }

  /**
   * Create a new photo for a specific album.
   * POST /album/:albumId/photo
   */
  create() {
    this.app.post('/album/:albumId/photo', this.authenticateToken, (req, res) => {
      try {
        // Merge the albumId from params with the request body.
        const photoData = { ...req.body, album: req.params.albumId };
        const photo = new this.PhotoModel(photoData);
  
        photo.save()
          .then((savedPhoto) => {
            // Now update the album by finding it and pushing the new photo's ID.
            this.AlbumModel.findById(req.params.albumId)
              .then((album) => {
                if (!album) {
                  return res.status(404).json({ code: 404, message: 'Album not found' });
                }
                album.photos.push(savedPhoto._id);
                album.save()
                  .then((updatedAlbum) => {
                    res.status(200).json({ album: updatedAlbum, photo: savedPhoto });
                  })
                  .catch((err) => {
                    console.error(`[ERROR] album/update -> ${err}`);
                    res.status(500).json({ code: 500, message: 'Internal Server error' });
                  });
              })
              .catch((err) => {
                console.error(`[ERROR] album/find -> ${err}`);
                res.status(500).json({ code: 500, message: 'Internal Server error' });
              });
          })
          .catch((err) => {
            console.error(`[ERROR] photo/create -> ${err}`);
            res.status(500).json({
              code: 500,
              message: 'Internal Server error'
            });
          });
      } catch (err) {
        console.error(`[ERROR] photo/create -> ${err}`);
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  /**
   * Show a photo by its ID within an album.
   * GET /album/:albumId/photo/:id
   */
  showById() {
    this.app.get('/album/:albumId/photo/:id', this.authenticateToken, (req, res) => {
      try {
        this.PhotoModel.findOne({ _id: req.params.id, album: req.params.albumId })
          .then((photo) => res.status(200).json(photo || {}))
          .catch((err) => {
            console.error(`[ERROR] photo/:id -> ${err}`)
            res.status(500).json({
              code: 500,
              message: 'Internal Server error'
            })
          })
      } catch (err) {
        console.error(`[ERROR] photo/:id -> ${err}`)
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        })
      }
    })
  }

  /**
   * Update a photo by its ID within an album.
   * PUT /album/:albumId/photo/:id
   */
  updateById() {
    this.app.put('/album/:albumId/photo/:id', this.authenticateToken, (req, res) => {
      try {
        this.PhotoModel.findOneAndUpdate(
          { _id: req.params.id, album: req.params.albumId },
          req.body,
          { new: true }
        )
          .then((photo) => res.status(200).json(photo || {}))
          .catch((err) => {
            console.error(`[ERROR] photo/update/:id -> ${err}`)
            res.status(500).json({
              code: 500,
              message: 'Internal Server error'
            })
          })
      } catch (err) {
        console.error(`[ERROR] photo/update/:id -> ${err}`)
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        })
      }
    })
  }

  /**
   * Delete a photo by its ID within an album.
   * DELETE /album/:albumId/photo/:id
   */
  deleteById() {
    this.app.delete('/album/:albumId/photo/:id', this.authenticateToken, (req, res) => {
      try {
        this.PhotoModel.findOneAndDelete({ _id: req.params.id, album: req.params.albumId })
          .then((photo) => res.status(200).json(photo || {}))
          .catch((err) => {
            console.error(`[ERROR] photo/delete/:id -> ${err}`)
            res.status(500).json({
              code: 500,
              message: 'Internal Server error'
            })
          })
      } catch (err) {
        console.error(`[ERROR] photo/delete/:id -> ${err}`)
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        })
      }
    })
  }

  /**
   * Run: Initialize all photo endpoints.
   */
  run() {
    this.create()
    this.showById()
    this.updateById()
    this.deleteById()
  }
}

module.exports = Photos
