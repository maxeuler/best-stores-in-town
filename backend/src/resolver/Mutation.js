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
  async deleteStore(parent, args, ctx, info) {
    return ctx.db.mutation.deleteStore({ id: args.id }, info);
  },
};

module.exports = Mutation;
