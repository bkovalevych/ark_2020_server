module.exports = (req, res) => {
    let collection = req.collection;
    let filter = Object.assign( {login: req.user.login}, req.query.filterParam);
    let options = Object.assign({}, req.query.options);

    collection.find(filter, options).then(result => {
        res.json(result)
    }).catch(err => {
        res.status(500).json(err)
    })
};