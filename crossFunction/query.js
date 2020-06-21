function prepareSort(val) {
    let result = {};
    if (typeof val !== typeof []) {
        val = [val]
    }
    val.map(sortVal => {
        let delim = sortVal.indexOf('(');
        let new_val = parseInt(sortVal.slice(delim + 1, sortVal.length - 1))
        let key = sortVal.slice(0, delim);
        result[key] = new_val;
    })
    return result;
}

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

            let new_key = arrVal.slice(0, pos);
            if (obj[key][new_key]) {
                if (typeof obj[key][new_key] !== typeof []) {
                    obj[key][new_key] = [obj[key][new_key]]
                }
                obj[key][new_key].push(arrVal.slice(pos + 1, arrVal.length - 1));
            } else {
                obj[key][new_key] = arrVal.slice(pos + 1, arrVal.length - 1)
            }

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

// let a= prepareFilter({$aggregate: ['$group(idFarm)', '$group(id)']})
// console.log(a);

module.exports = (req, res) => {
    let collection = req.collection;
    let options = Object.assign({skip: 0, limit: 500, sort: null}, req.query);
    delete req.query['skip'];
    delete req.query['limit'];
    delete req.query['sort'];
    if (options.sort !== null) {

        options.sort = prepareSort(options.sort);
    }
     else {
         delete options.sort;
    }
    let filter = req.user? Object.assign( {idUser: req.user._id.toString()}, prepareFilter(req.query)): prepareFilter(req.query);

    options.skip = parseInt(options.skip.toString());
    options.limit = parseInt(options.limit.toString());
    collection.find(filter, null , options).then(result => {
        //res.header("Access-Control-Allow-Credentials", true)
        //res.header("Access-Control-Allow-Origin", "https://bee-hive-bit-server.herokuapp.com")
        res.json(result)
    }).catch(err => {
        res.status(500).json(err)
    })
};
