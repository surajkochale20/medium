const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/user');
const auth = require('../middlewares/auth');


/**
 * @swagger
 * /api/user:
 *   post:
 *     description: To register/create user
 *     parameters:
 *      - name: firstName 
 *        description: First Name
 *        in: formData
 *        required: true
 *        type: string
 *      - name: lastName
 *        description: Last Name
 *        in: formData
 *        required: true
 *        type: string
 *      - name: email
 *        description: Email id
 *        in: formData
 *        required: true
 *        type: string
 *      - name: password
 *        description: Password
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: newly created user 
 */
router.post('/', UsersController.register);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     description: Login user
 *     parameters:
 *      - name: email
 *        description: Email id 
 *        in: formData
 *        required: true
 *        type: string
 *      - name: password
 *        description: Password
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: User login successfully.
 */
router.post('/login', UsersController.login);

/**
 * @swagger
 * /api/user:
 *   put:
 *     description: To update user data
 *     parameters:
 *      - name: firstName 
 *        description: First Name
 *        in: formData
 *        type: string
 *      - name: lastName
 *        description: Last Name
 *        in: formData
 *        type: string
 *      - name: aboutme
 *        description: About me 
 *        in: formData
 *        type: string
 *      - name: Authorization
 *        description: Authorization token (Bearer your_token)
 *        in: header
 *        required: true
 *     responses:
 *       200:
 *         description: user updated successfully
 */
router.put('/', auth, UsersController.update);

/**
 * @swagger
 * /api/user:
 *   delete:
 *     description: To delete user
 *     parameters:
 *      - name: Authorization
 *        description: Authorization token (Bearer your_token)
 *        in: header
 *        required: true
 *     responses:
 *       200:
 *         description: Your deleted successfully
 */
router.delete('/',auth, UsersController.remove);

/**
 * @swagger
 * /api/user/follow:
 *   post:
 *     description: To follow user
 *     parameters:
 *         - name: Authorization
 *           description: Authorization token (Bearer your_token)
 *           in: header
 *           required: true
 *         - in: body
 *           name: body
 *           description: Request body
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               followUser:
 *                 type: object
 *                 properties:
 *                   id:
 *                      type: string
 *                   name:
 *                      type: string  
 *     responses:
 *       200:
 *         description: 
 */
router.post('/follow',auth, UsersController.followUser);


/**
 * @swagger
 * /api/user/unfollowUser:
 *   put:
 *     description: To unfollow user
 *     parameters:
 *         - name: Authorization
 *           description: Authorization tokeb (Bearer your_token)
 *           in: header
 *           required: true
 *         - in: body
 *           name: body
 *           description: Request body
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               unfollowUser:
 *                 type: object
 *                 properties:
 *                   id:
 *                      type: string
 *                   name:
 *                      type: string  
 *     responses:
 *       200:
 *         description: 
 */
router.put('/unfollowUser',auth, UsersController.unfollowUser);


/**
 * @swagger
 * /api/user/following:
 *   get:
 *     description: Get users following list
 *     parameters:
 *         - name: Authorization
 *           description: Authorization token (Bearer your_token)
 *           in: header
 *           required: true
 *     responses:
 *       200:
 *         description: List of users you are following
 */
router.get('/following', auth, UsersController.following);

/**
 * @swagger
 * /api/user/upload:
 *   post:
 *     description: To upload image 
 *     parameters:
 *      - name: Authorization
 *        description: Authorization token (Bearer your_token)
 *        in: header
 *        required: true
 *      - name: id
 *        description: userid, storyid or publicationid
 *        in: formData
 *        type: string
 *      - name: type
 *        description: Where to add image , in story, publication or user data
 *        in: formData
 *        required: true
 *        type: string
 *        example: "publication or story or profile"
 *      - name: file
 *        description: Image to upload
 *        in: formData
 *        required: true
 *        type: file
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 */
router.post('/upload',auth, UsersController.uploadSinglefile, UsersController.uploadFile);

/**
 * @swagger
 * /api/user/image/{filename}:
 *   get:
 *     description: Get image file
 *     parameters:
 *      - name: filename
 *        description: Image file name
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Returns image data
 */
router.get('/image/:filename', UsersController.displayimage);


/**
 * @swagger
 * /api/user/files/{filename}:
 *   delete:
 *     description: To delete image files
 *     parameters:
 *      - name: filename
 *        description: Image file name
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Image deleted
 */
router.delete('/files/:filename', UsersController.deleteFile);

module.exports = router;