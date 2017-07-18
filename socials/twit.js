let twiter = require('twitter'),
    tw  = new twiter({
        consumer_key: 'xaYhOMtnvgYlSDTY7bwa4FjtZ',
        consumer_secret: 'IJXXsWkX2TarVs7o686d6SvZ66PoNlRtyskkY1DnKgbptHWGVt',
        access_token_key: '',
        access_token_secret: ''
    });


exports.getTwits = function(hash, callback){
    tw.get('search/tweets', {q: hash, count:10}, function(error, tweets, response) {
        if(error) throw error;

        let data = [];
        for(let t in tweets.statuses){
            data.push({
                name : tweets.statuses[t].user.screen_name,
                text : tweets.statuses[t].text
            });
        }        
        if(callback) callback(data);
    });
}


