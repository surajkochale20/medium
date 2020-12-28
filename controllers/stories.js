const Story = require('../models/stories');

module.exports = {
    getStory: async (req, res,next) => {

        let storyDict;
        try {
            if (req.params.id) {
                storyDict = await Story.findById(req.params.id)
            } else {
                storyDict = await Story.find()
            }
            res.send({
                story: storyDict
            })
        } catch (e) {
            next(e);
        }
    },

    addStory: async (req, res) => {
        const storyDict = await Story.create(req.body)
        res.send({
            story: storyDict
        })
    },

    updateStory: async (req, res,next) => {
        const id = req.params.id;
        try {
            const dict = await Story.findByIdAndUpdate({
                _id: id
            }, req.body);
            const storyDict = await Story.findById({
                _id: id
            });
            res.send({
                story: storyDict
            })
        } catch (err) {
            next(err);
        }
        
        /*try {
            const story = await Story.findById(storyId);
            if(!story) {
            res.status(404).send({ sucess: false, message: 'Story does not exits.'});
            } else {
            console.log(story._id);
            console.log(req.user._id);
            if(story.author == req.user._id){
                const user = await Story.updateMany({_id: storyId }, props)
                res.send({ sucess: true, message: "updated."});
            } else {
                res.status(401).send({ sucess : false, message: "You are not authorized to edit this story."});
            }
            }

        } catch (err) {
            res.status(400).send({ sucess : false, message: "Something went wrong."});
        }*/
    },

    deleteStory: async (req, res, next) => {
        const storyId = req.params.id;
        try {
            const story = await Story.findById(storyId);
            if(!story) {
            res.status(404).send({ sucess: false, message: 'Story does not exits.'});
            } else {
            console.log(story._id);
            console.log(req.user._id);
            if(story.author == req.user._id){
                const storyDict = await Story.findByIdAndRemove({_id: storyId})
                res.status(200).send({ sucess: true, message: 'Stroy deleted successfully.'});
            } else {
                res.status(401).send({ sucess : false, message: "You are not authorized to edit this story."});
            }
            }
            
        } catch (e) {
            next(e);
        }
    },

    getStoryByPublicationId: async (req, res,next) => {

        let storyDict;
        try {
            if (req.params.id) {
                storyDict = await Story.find({publicationId: req.params.id})
            } else {
                res.send(400).send({sucess: false, message: 'Request is not proper.'});
            }
            res.send({ sucess:true, story: storyDict })
        } catch (e) {
            next(e);
        }
    },

    getByUserId : async (req, res,next) => {
        let storyDict;
        try {
            if (req.params.id) {
                storyDict = await Story.find({author: req.params.id})
            } else {
                res.send(400).send({sucess: false, message: 'Request is not proper.'});
            }
            res.send({ sucess:true, story: storyDict })
        } catch (e) {
            next(e);
        }
    },

    getAll: async (req, res,next) => {
        
        try {
            let storyDict = await Story.find({})
            res.send({ sucess:true, story: storyDict })
        } catch (e) {
            next(e);
        }
    }

}
