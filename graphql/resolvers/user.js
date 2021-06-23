const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { AuthenticationError } = require('apollo-server-express');

const { User } = require('../../database/models');

module.exports={
    Mutation:{
        async register(root, args, context){
            const { name,email,password } = args.input;
            console.log(args.input.name);
            return User.create({ name, email, password: await bcrypt.hash(password, 10) });
            
        },

        async login(root, { input }, context) {
            const { email, password } = input;
            const user = await User.findOne({ where: { email } });

            console.log(user.password);
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ id: user.id }, 'mySecret',{expiresIn:'1d'});
                return { ...user.toJSON(), token };
              }
              console.log(user.password);
              console.log(password);
              console.log("token: "+token);
              throw new AuthenticationError('Invalid credentials');

            // if (!user) {
            //     throw new Error('User not found');
            // }

            // const valid = await bcrypt.compare(password, user.password);

            // if (!valid) {
            //     throw new AuthenticationError('Invalid credentials');
            // }

            // return jwt.sign({id:user.id, email:user.email},
            //     process.env.JWT_SECRET, 
            //     {expiresIn: '1d'});

            
          },
    },
};