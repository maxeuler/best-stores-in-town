const { forwardTo } = require('prisma-binding');

const Query = {
  stores: forwardTo('db'),
  store: forwardTo('db'),
  currentUser(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
  },
};

module.exports = Query;
