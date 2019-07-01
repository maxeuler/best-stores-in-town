const bycrypt = require('bcryptjs');

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
  async signup(parent, args, ctx, info) {
    // 1. lowercase email
    args.email = args.email.toLowerCase();
    // 2. hash password
    const password = await bycrypt.hash(args.password, 10);
    // 3. create user
    const user = ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
        },
      },
      info
    );

    return user;
  },
};

module.exports = Mutation;
