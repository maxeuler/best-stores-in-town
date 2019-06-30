const Mutation = {
  me() {
    return 'Max';
  },
  async createStore(parent, args, ctx, info) {
    const store = await ctx.db.mutation.createStore(
      {
        data: {
          tags: { set: args.tags },
          name: args.name,
          description: args.description,
          image: args.image,
          largeImage: args.largeImage,
        },
      },
      info
    );
    return store;
  },
  async deleteStore(parent, args, ctx, info) {
    return ctx.db.mutation.deleteStore({ id: args.id }, info);
  },
};

module.exports = Mutation;
