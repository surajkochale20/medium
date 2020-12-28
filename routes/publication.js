const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middlewares/auth');

const PublicationController = require('../controllers/publication'); 


 /**
 * @swagger
 * /api/publication/create:
 *   post:
 *     description: To add new publication
 *     parameters:
 *         - name: Authorization
 *           description: Authorization token (Bearer your_token)
 *           in: header
 *           required: true
 *         - in: body
 *           name: body
 *           description: Request json
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 example: "My First publication"
 *               tagline:
 *                 type: string
 *                 example: "Tag line for my publication"
 *               description:
 *                 type: string
 *                 example: "Description of publication"
 *               editor:
 *                 type: string
 *                 required: true
 *                 example: "5fe5697e2451850453fe73e6"
 *               tags:
 *                 type: array
 *                 items:
 *                    type: string
 *               category:
 *                 type: array
 *                 items:
 *                    type: string
 *     responses:
 *       200:
 *         description: Publication created
 */
router.post('/create', auth, PublicationController.create)

 /**
 * @swagger
 * /api/publication/get/{id}:
 *   get:
 *     description: Fetch a single publication using id
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *              type: string
 *           description: Publication id 
 *     responses:
 *       200:
 *         description: Publication
 */
 router.get('/get/:id', PublicationController.getById)

 /**
 * @swagger
 * /api/publication//getByUser/{id}:
 *   get:
 *     description: Fetch user publication using user/editor id
 *     parameters:
 *         - in: path
 *           name: id
 *           schema:
 *              type: string
 *           description: user id 
 *     responses:
 *       200:
 *         description: 
 *
 */
 router.get('/getByUser/:id', PublicationController.getByUser)
 
 /**
 * @swagger
 * /api/publication/getAll:
 *   get:
 *     description: Fetch All publications
 *     responses:
 *       200:
 *         description: Publcation list
 */
 router.get('/getAll', PublicationController.getAll)
 

 /**
 * @swagger
 * /api/publication/update:
 *   put:
 *     description: Update publication
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
 *                 required: true
 *                 example: "5fe5a43c5d3d0910c3ab504f"
 *               name:
 *                 type: string
 *                 example: "My First publication"
 *               tagline:
 *                 type: string
 *                 example: "Tag line for my publication"
 *               description:
 *                 type: string
 *                 example: "TDescription of publication"
 *               tags:
 *                 type: array
 *                 items:
 *                    type: string
 *               category:
 *                 type: array
 *                 items:
 *                    type: string
 *     responses:
 *       200:
 *         description: Publiation updated.
 *
 */
 router.put('/update', auth, PublicationController.update)

 /**
 * @swagger
 * /api/publication/delete/{id}:
 *   delete:
 *     description: Delete publication using user/editor id
 *     parameters:
 *         - name: Authorization
 *           description: Authorization token (Bearer your_token)
 *           in: header
 *           required: true
 *         - in: path
 *           name: id
 *           schema:
 *              type: string
 *           description: Publication Id
 *     responses:
 *       200:
 *         description: 
 *
 */
 router.delete('/delete/:id', auth, PublicationController.deleteById);
 
 /**
 * @swagger
 * /api/publication/writer:
 *   put:
 *     description: Service to add writer in publication
 *     parameters:
 *         - name: Authorization
 *           description: Authorization token (Bearer your_token)
 *           in: header
 *           required: true
 *         - in: body
 *           name: body
 *           description: User to follow
 *           schema:
 *             type: object
 *             properties:
 *               publicationId:
 *                 type: string
 *                 required: true
 *                 example: "5fe5a43c5d3d0910c3ab504f"
 *               writer:
 *                 type: string
 *     responses:
 *       200:
 *         description: 
 *
 */
 router.put('/writer',auth, PublicationController.updatWriterList)

 /**
 * @swagger
 * /api/publication/writer:
 *   delete:
 *     description: Service to remove writer from publication
 *     parameters:
 *         - name: Authorization
 *           description: Authorization token (Bearer your_token)
 *           in: header
 *           required: true
 *         - in: body
 *           name: body
 *           description: User to follow
 *           schema:
 *             type: object
 *             properties:
 *               publicationId:
 *                 type: string
 *                 required: true
 *                 example: "5fe5a43c5d3d0910c3ab504f"
 *               writer:
 *                 type: string
 *     responses:
 *       200:
 *         description: 
 *
 */
 router.delete('/writer', auth, PublicationController.removeWriter)

 /**
 * @swagger
 * /api/publication/category:
 *   put:
 *     description: Add category in publication 
 *     parameters:
 *         - name: Authorization
 *           description: Authorization token (Bearer your_token)
 *           in: header
 *           required: true
 *         - in: body
 *           name: body
 *           description: User to follow
 *           schema:
 *             type: object
 *             properties:
 *               publicationId:
 *                 type: string
 *                 required: true
 *                 example: "5fe5a43c5d3d0910c3ab504f"
 *               categoryName:
 *                 type: string
 *     responses:
 *       200:
 *         description
 *
 */
 router.put('/category',auth, PublicationController.addCategory);

 /**
 * @swagger
 * /api/publication/category:
 *   delete:
 *     description: Remove category in publication 
 *     parameters:
 *         - name: Authorization
 *           description: Authorization token (Bearer your_token)
 *           in: header
 *           required: true
 *         - in: body
 *           name: body
 *           description: User to follow
 *           schema:
 *             type: object
 *             properties:
 *               publicationId:
 *                 type: string
 *                 required: true
 *                 example: "5fe5a43c5d3d0910c3ab504f"
 *               categoryName:
 *                 type: string
 *     responses:
 *       200:
 *         description: 
 *
 */
 router.delete('/category',auth, PublicationController.removeCategory)


 
module.exports = router;  

