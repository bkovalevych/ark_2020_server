function prepareValue(obj, val, key) {
    if (typeof val !== typeof []) {
        val = [val]
    }
    val.map(arrVal => {
        if(!obj[key]) {
            obj[key] = {}
        }
        if (arrVal.startsWith('$')) {

            let pos = arrVal.indexOf('(');
            let new_key = arrVal.slice(0, pos)
            obj[key][new_key] = arrVal.slice(pos + 1, arrVal.length - 1)
        } else {
            if (!obj[key]['$in']) {
                obj[key]['$in'] = []
            }
            obj[key]['$in'].push(arrVal)
        }
    })
}
function prepareFilter(filterQuery) {
    let filter = {}
    Object.keys(filterQuery).map(key => {prepareValue(filter, filterQuery[key], key)})
    return filter;
}

module.exports = (req, res) => {
    let collection = req.collection;
    let options = Object.assign({skip: 0, limit: 100}, req.query);
    delete req.query['skip']
    delete req.query['limit']
    let filter = Object.assign( {idUser: req.user._id.toString()}, prepareFilter(req.query));

    options.skip = parseInt(options.skip.toString());
    options.limit = parseInt(options.limit.toString());

    collection.find(filter, null , options).then(result => {
        res.json(result)
    }).catch(err => {
        res.status(500).json(err)
    })
};
