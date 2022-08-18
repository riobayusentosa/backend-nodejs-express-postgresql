const {Router} = require('express');

const {getUsers,register,login,protected,logout} = require('../controller/auth');
const {validationmiddleware} = require('../middlewares/validation-middlewares');
const {registerValidation,loginValidation} = require('../validators/auth');
const {userAuth} = require('../middlewares/auth-middleware');
const router = Router();

router.get('/get-users',getUsers);
router.get('/protected', userAuth,protected);
router.post('/register', registerValidation,validationmiddleware,register);
router.post('/login',loginValidation, validationmiddleware,login);
router.get('/logout', userAuth, logout);

module.exports = router;