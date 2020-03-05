const router = require('express').Router();
const HowTo = require('./how-to-model.js');
const auth = require('../data/auth-middleware.js');
const userAuth = require('../data/creator-middleware.js');

router.get('/', auth, (req, res) => {
  HowTo.find()
    .then(howToList => {
      if (howToList.length > 0) {
        res.status(200).json(howToList);
      } else {
        res.status(401).json({ message: 'no how-to guides exist' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: 'error getting info from database', error: err });
    });
});

router.get('/:id', auth, (req, res) => {
  const howtoId = req.params.id;
  HowTo.findById(howtoId)
    .then(found => {
      if (found.length > 0) {
        res.status(200).json(found);
      } else {
        res.status(400).json({ message: 'how to not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'error fetching from database' });
    });
});

router.post('/newhowto', auth, userAuth, (req, res) => {
  const newHowTo = req.body;

  if (newHowTo.title && newHowTo.steps && newHowTo.user_id) {
    HowTo.addHowTo(newHowTo)
      .then(added => {
        res.status(201).json({ new_how_to: added, message: 'how to created' });
      })
      .catch(err => {
        res
          .status(500)
          .json({ errorMessage: 'how to could not be added', error: err });
      });
  } else {
    res
      .status(400)
      .json({ message: 'Please provide at least a title, and steps' });
  }
});

//todo - delete how to
//needs userid in req.body

router.delete('/delete/:id', auth, userAuth, (req, res) => {
  const deleteId = req.params.id;
  HowTo.findById(deleteId)
    .then(exist => {
      if (exist) {
        HowTo.deleteHowTo(deleteId)
          .then(deleted => {
            res.status(200).json({ message: 'how to deleted successfully' });
          })
          .catch(err => {
            res
              .status(500)
              .json({ errorMessage: 'how to could not be deleted' });
          });
      } else {
        res.status(400).json({ message: 'how to guide does not exist' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: 'error deleting from database', error: err });
    });
});

//todo - edit a how to
//needs userid in request body

router.put('/edithowto/:id', auth, userAuth, (req, res) => {
  const howToId = req.params.id;
  const editedHowto = req.body;

  HowTo.findById(howToId)
    .then(found => {
      if (found) {
        HowTo.editHowTo(editedHowto, howToId)
          .then(edited => {
            res.status(201).json({ message: 'how to successfully updated' });
          })
          .catch(err => {
            res.status(500).json({ errorMessage: 'error updating how to' });
          });
      } else {
        res.status(400).json({ message: 'how to does not exist' });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'error fetching from database' });
    });
});

router.get('/userhowto/:id', auth, (req, res) => {
  const userId = req.params.id;

  HowTo.showUserHowTos(userId)
    .then(found => {
      if (found) {
        const guidesInfo = found.map(each => {
          return {
            title: each.title,
            steps: each.step,
            pic: each.ht_pic,
            likes: each.likes,

            avatar: each.user_avatar,
            username: each.username
          };
        });

        res.status(200).json({ foundGuides: guidesInfo, message: 'success' });
      } else {
        res
          .status(400)
          .json({ message: 'user may not exist of have any how to guides' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: 'error getting user how to from database' });
    });
});

module.exports = router;
