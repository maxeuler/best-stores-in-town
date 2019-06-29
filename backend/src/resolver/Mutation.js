const Mutation = {
  me() {
    return 'Max';
  },
  async createStore(parent, args, ctx, info) {
    const store = await ctx.db.mutation.createStore(
      { data: { ...args } },
      info
    );
    return store;
  },
};

module.exports = Mutation;
