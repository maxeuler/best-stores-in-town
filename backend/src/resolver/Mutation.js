const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
        },
      },
      info
    );
    // 4. generate jwt
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 5. set cookie with jwt
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    // 6. send user back
    return user;
  },
  async signin(parent, args, ctx, info) {
    const { email, password } = args;
    // 1. find user
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No user found for ${email}`);
    }
    // 2. check password
    const isPasswordValid = await bycrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Password is invalid! 🚫');
    }
    // 3. generate jwt
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. set cookie with jwt
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    // 5. send user back
    return user;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'See you later! 👋🏼' };
  },
};

module.exports = Mutation;
