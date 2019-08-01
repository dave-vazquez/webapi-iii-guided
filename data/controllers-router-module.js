/*
  separate into controllers file and routers file
*/

router.get('/', (req,res,next) => {
  console.log('first handler...');
  next();
}, (req,res,next) => {
  console.log('second handler...');
  next();
});

//controllers, store them in controller files
function handler1(req,res,next) {
  console.log('hanlder 1');
  next();
}
function handler1(req, res, next) {
  console.log('hanlder 2');
  next();
}

router.get('/', handler1, handler2);
router.get('/', handler1, handler2);
router.get('/', handler1, handler2);
router.get('/', handler1, handler2);
router.get('/', handler1, handler2);

const handlers = [handler1, handler2]
router.get('/', handlers);

/api/hubs/:id
