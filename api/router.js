const express = require('express');
const query = require('../crossFunction/query');

const definer = require('../crossFunction/userDefiner')


module.exports = (management, paramSetCollection) => {
    const setCollection = (req, res, next) => {
        paramSetCollection(req, res, next)
    }
    const addOperation =(req, res) => {
        management.addOperation(req, res);
    }
    const getById = (req, res, next) => {
        management.getById(req, res, next);
    }
    const changeOperation = (req, res) => {
        management.changeOperation(req, res);
    }
    const deleteOperation = (req, res) => {
        management.deleteOperation(req, res);
    }

    let router = express.Router();
    router.route('/')
        .get(
            definer,
            setCollection,
            query)
        .post(
            definer,
            setCollection,
            addOperation
        );

    router.route('/:id')
        .get(
            definer,
            setCollection,
            getById,
            (req, res) => {
                res.json(req.findObject)
            })
        .put(
            definer,
            setCollection,
            getById,
            changeOperation
        )
        .delete(
            definer,
            setCollection,
            deleteOperation
        );
    return router;
};