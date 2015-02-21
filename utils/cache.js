var cache = {}
    , isExpired = function (key) {
        'use strict';

        var currentTime = new Date()
            , expired;

        if(cache[key].expires === Infinity){
            expired = false;
        } else {
            expired = !!(currentTime.getTime() >= cache[key].expires.getTime() || cache[key].expires === 0);
        }

        if(expired){
            //clear this item from cache
            delete cache[key];
        }

        return expired;
    }

    , getFromCache = function (key) {
        'use strict';

        if(typeof cache[key] !== 'undefined' && !isExpired(key)){
            cache[key].uses++;

            return cache[key].data;
        } else {
            return null;
        }
    }

    , cacheEntries = function () {
        'use strict';

        var obj = {};

        Object.keys(cache).forEach(function(item){
            obj[item] = {expires: cache[item].expires, uses: cache[item].uses};
        });

        return obj;
    }

    , clearCache = function (pruneThreshold) {
        'use strict';
        var now = new Date().getTime();

        if(typeof pruneThreshold !== 'undefined'){
            Object.keys(cache).forEach(function(item){
                 if(pruneThreshold === 0 && cache[item].expires.getTime() <= now){
                    delete cache[item];
                } else if(pruneThreshold > 0 && cache[item].uses <= pruneThreshold && cache[item].expires !== Infinity){
                    delete cache[item];
                }
            });
        }else{
            cache = {};
        }
    }

    , pruneCache = function (threshold) {
        'use strict';

        return clearCache(threshold);
    }

    , removeFromCache = function (key) {
        'use strict';

        if(typeof key === 'undefined'){
            throw new Error('key must be passed in');
        }

        if(typeof cache[key] !== 'undefined'){
            return delete cache[key];
        }else {
            return false;
        }
    }

    , addToCache = function (key, object, expires) {
        'use strict';

        cache[key] = {
            data: object
            , expires: 0
            , uses: 0
        };

        //permenant cache option... pass in 0 as the expires period
        if(expires === Infinity){
            cache[key].expires = Infinity;
        } else {
             cache[key].expires = new Date(new Date().getTime() + expires);
        }
    };

module.exports = {
    get: getFromCache
    , clear: clearCache
    , remove: removeFromCache
    , entries: cacheEntries
    , add: addToCache
    , prune: pruneCache
};
