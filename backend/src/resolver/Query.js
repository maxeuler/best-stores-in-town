const { forwardTo } = require('prisma-binding');

const Query = {
  me() {
    return 'Maxi';
  },
  stores: forwardTo('db'),
  store: forwardTo('db'),
};

module.exports = Query;
