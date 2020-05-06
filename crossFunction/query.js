module.exports = (req, res) => {
    let collection = req.collection;
    let filter = Object.assign( {idUser: req.user._id.toString()}, req.query.filterParam);

    let options = Object.assign({skip: 0, limit: 100}, req.query);
    options.skip = parseInt(options.skip);
    options.limit = parseInt(options.limit);

    collection.find(filter, null , options).then(result => {
        res.json(result)
    }).catch(err => {
        res.status(500).json(err)
    })
};