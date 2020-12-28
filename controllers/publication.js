
const Publication = require('../models/publication');
const mongoose = require('mongoose');

module.exports = {
    /**
     * Creates new ducumnet in Publication model
     */
    create : async (req, res, next) => {
      const props = req.body;
      try {
        const publication = await Publication.create(props);
        res.send({sucess:true, data:publication });
      } catch (e) {
        next(e)
      }
    },
    
    // Updates a publication document
    update: async (req, res, next) => {
      const publicationId = req.body.id;
      const data = req.body;
      try {
        const publication = await Publication.findById(publicationId);
        if(!publication) {
          res.status(404).send({ sucess: false, message: 'Publication does not exits.'});
        } else {
          console.log(publication._id);
          console.log(req.user._id);
           if(publication.editor == req.user._id){
             await Publication.updateOne({ _id: publicationId }, data);
             const updatedData = await Publication.findById({ _id: publicationId });
             res.send(updatedData)
           } else {
             res.status(401).send({ sucess : false, message: "Only and editor can update publication infomation"});
           }
        }
        
      } catch(e) {
        next(e);
      }
    },

    /**
     * To Delete publication .
     * @param {publicationId} id of publication.
     */
    deleteById: async (req, res, next) => {
      const publicationId = req.params.id;
      try {
        const publication = await Publication.findById(publicationId);
        if(!publication) {
          res.status(404).send({ sucess: false, message: 'Publication does not exits.'});
        } else {
          if(publication.editor == req.user._id){
            await Publication.findByIdAndRemove({ _id: publicationId });
            res.status(200).send({ sucess: true, message:"Publication removed sucessfully"})
          } else {
            res.status(401).send({ sucess : false, message: "Only and editor can delete publication infomation"});
          }
        }
        
      } catch (e) {
        res.status(401).send({ sucess : false, message: "Data is not proper."});
      }
    },
   
    /**
    * To get publication by publication id.
    * @param {id} id of publication.
    */
    getById: async (req, res, next) => {
      const publicationId = req.params.id;
      if(publicationId){
            try {
              const publication = await Publication.findById(req.params.id);
              if(!publication) {
                res.status(404).send({ sucess: false, message: 'Publication does not exits.'});
              } else {
                res.send({ publication })
              }
            } catch(e){
              res.status(400).send({ sucess: false, message:"Invalid id."})  
            }
      }
      else{
            res.status(400).send({ sucess: false, message:"Request is not proper."})
      }
    },

    /**
     * Returns all publcition documents
     */
    getAll: async (req, res, next) => {
        try {
            const publication = await Publication.find({})
            if(!publication) {
              res.status(404).send({ sucess: false, message: "No data found"});
              return;
            }
            res.send({sucess:true, data: publication})
        }
        catch(e){
            next(e);
        }
    },
    /**
     * To fetch user specific publications
     */
    getByUser: async (req, res, next) => {
        if(req.params.id){
            try {
              const publication = await Publication.find({editor: req.params.id})
              res.send({ sucess: true, publication })
            } catch(e){
              res.status(400).send({ sucess: false, message: "Data is not proper."})
            }
        }
        else{
            res.status(400).send({ sucess:false, message :"Missing parameter"})
        }
    },
    
    /**
     * To Add and updated  writers in a publication
     */
    updatWriterList: async (req, res, next) => {
        const { publicationId, writer } = req.body;
        try {
            await Publication.updateOne({ _id: publicationId }, {
              $push: { writer: writer }
            })
            const publication = await Publication.findOne({ _id: publicationId });
            res.status(200).send({ sucess:true, message: "Writer added to publication"});
          } catch (e) {
            next(e);
          }
    },
   /**
    * To remove a writer from a publication
    */
    removeWriter: async (req, res, next) => {
        const{ publicationId, writer} = req.body;
        try {
          await Publication.updateOne({ _id: publicationId }, { $pull: { writer: writer } });
          const publicationDict = await Publication.findOne({ _id: publicationId });
          res.status(200).send({ sucess:true, message: "Writer removed from publication"});
        } catch (e) {
          next(e);
        }
    },
    
    /** 
     * Adds category into publication
     */
    addCategory: async (req, res, next) => {
        const { categoryName, publicationId } = req.body;
        try {
            await Publication.updateOne({ _id: publicationId }, { $push: { category: categoryName }})
            const publicationDict = await Publication.findOne({ _id: publicationId });
            res.status(200).send(publicationDict);
          } catch (e) {
            next(e);
          }
    },
   /**
    * Removes category from publication
    */
    removeCategory: async (req, res, next) => {
        const{ publicationId, categoryName} = req.body;
        try {
          await Publication.updateOne({ _id: publicationId },{ $pull: { category: categoryName } });
          const pub = await Publication.findOne({ _id: publicationId });
          res.status(200).send(pub);
        } catch (e) {
          next(e);
        }
    }
  
}
    


 
  