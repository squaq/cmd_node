let git = require('octonode'),
    client = git.client(),
    gitsearch = client.search();


exports.getGitcontent = function(callback){
    gitsearch.repos({
      q: 'Football',
      sort: 'created',
      order: 'asc'
    },function(err, data) {
        if(err) throw err;
        let _data = [];
        for(let o in data.items){
            _data.push({
                name: data.items[o].name,
                full_name: data.items[o].full_name,
                description: data.items[o].description
            });
        }
        if(callback) callback( _data );
    })
}