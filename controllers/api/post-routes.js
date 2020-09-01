const router = require('express').Router();
const { User, Post} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
      order: [['created_at', 'DESC']],
      attributes: [
        'id',
        'content',
        'created_at',
      ],
      include: [
        {
          model: User,
          attributes: ['first']
        }
      ]
     })
     .then((dbPostData) => res.json(dbPostData))
          .catch((err) => {
              console.log(err);
              res.status(500).json(err);
          });
  });
  
  router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'content',
        'created_at',
      ],
      include: [
        {
          model: User,
          attributes: ['first']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// POST /api/posts
router.post('/', withAuth, (req, res) => {
    Post.create({
        content: req.body.content,
        user_id: req.session.user_id
    })
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => {
            console.log("err", err);
            res.status(500).json(err);
        });
});

// PUT /api/posts/1
router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/posts/1
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;