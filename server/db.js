const Sequelize = require('sequelize');
const { UUID, UUIDV4, STRING } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_db');

const Chef = conn.define('chef',{
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

const Recipe = conn.define('recipe',{
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

Recipe.belongsTo(Chef);
Chef.hasMany(Recipe);

const sync = async (force = false)=> {
  try {
    await conn.sync({force});
    console.log('DB succesfully connected!');
  } catch (e){
    console.log('Error connecting to the database');
    throw e;
  }
};

// const seed = async() => {

// }

// not sure how to 'seed'. Apparently it's whats preventing this from being deployed in Heroku..


module.exports = {
  sync,
  Recipe,
  Chef
};
