const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/user');
const StoryController = require('../controllers/stories');


/**
 * @swagger
 * /api/story/add:
 *   post:
 *     description: To add story
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
 *               title:
 *                 type: string
 *                 required: true
 *                 example: "My First story"
 *               description:
 *                 type: string
 *                 example: "Description of story"
 *               content:
 *                 type: string
 *                 example: "Content of story"
 *               author:
 *                 type: string
 *                 required: true
 *                 example: "5fe5697e2451850453fe73e6"
 *               tags:
 *                 type: array
 *                 items:
 *                    type: string
 *               topics:
 *                 type: array
 *                 items:
 *                    type: string
 *     responses:
 *       200:
 *         description: Create and returns the story
 */
router.post('/add', auth, StoryController.addStory)

/**
 * @swagger
 * /api/story/getById/{id}:
 *   get:
 *     description: To get story using story id
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *              type: string
 *           description: Story id 
 *     responses:
 *       200:
 *         description: returns story
 */
router.get('/getById/:id', StoryController.getStory);



/**
 * @swagger
 * /api/story/update/{id}:
 *   put:
 *     description: To udate story
 *     parameters:
 *         - name: Authorization
 *           description: Authorization token (Bearer your_token)
 *           in: header
 *           required: true
 *         - name: id
 *           description: id of story
 *           in: path
 *           required: true
 *         - in: body
 *           name: body
 *           description: Request body
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My First story"
 *               description:
 *                 type: string
 *                 example: "Description of story"
 *               content:
 *                 type: string
 *                 example: "Content of story"
 *               tags:
 *                 type: array
 *                 items:
 *                    type: string
 *               topics:
 *                 type: array
 *                 items:
 *                    type: string
 *     responses:
 *       200:
 *         description: User data updated successfylly.
 */
router.put('/update/:id', auth, StoryController.updateStory);

/**
 * @swagger
 * /api/story/deleteStory/{id}:
 *   delete:
 *     description: To delete story 
 *     parameters:
 *         - name: Authorization
 *           description: Authorization token (Bearer your_token)
 *           in: header
 *           required: true
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *              type: string
 *           description: story id 
 *     responses:
 *       200:
 *         description: Delete story.
 */
router.delete('/deleteStory/:id', auth, StoryController.deleteStory);

/**
 * @swagger
 * /api/story/getByPublication/{id}:
 *   get:
 *     description: To get stories using publication id
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *              type: string
 *           description: publication id 
 *     responses:
 *       200:
 *         description: Returns story object
 */
router.get('/getByPublication/:id', StoryController.getStoryByPublicationId);

/** 
* @swagger
* /api/story/getByUser/{id}:
*   get:
*     description: To get stories
*     parameters:
*         - in: path
*           name: id
*           schema:
*              type: string
*           description: user id 
*     responses:
*       200:
*         description:  returns story object
*/
router.get('/getByUser/:id', StoryController.getByUserId);

/** 
* @swagger
* /api/story/getAll:
*   get:
*     description: To get stories
*     responses:
*       200:
*         description:  returns all stories.
*/
router.get('/getAll', StoryController.getAll);



module.exports = router;