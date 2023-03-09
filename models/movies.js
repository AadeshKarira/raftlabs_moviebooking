var mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    descriprtion: {
      type: String
    },
    price: {
      type: Number
    },
    rating: {
      type: Number
    }
  }
);

let movies = mongoose.model("movies", movieSchema);

insertOne = async (query) => {
    try{
        const create = await movies(query).save();
        return create;
    }catch (err) {
        return err
    }
}

find = async (query) => {
  try{
      const get = await movies.find(query);
      return get
  }catch (err) {
      return err
  }
}

findOne = async (query) => {
  try{
      const get = await movies.findOne(query);
      return get
  }catch (err) {
      return err
  }
}

with_theaters = async (query) => {
  try{
      const get = await movies.aggregate(
        [
          {
            '$match': query
          },
          {
            '$lookup': {
              'from': 'theaters', 
              'localField': '_id', 
              'foreignField': 'movie_ids', 
              'as': 'theaters'
            }
          }
        ]
      );
      return get
  }catch (err) {
      return err
  }
}


updateOne = async (match, query) => {
  try{
      const set = await  movies.updateOne(match, query)
      return set
  }catch (err) {
      return err
  }
}

deleteOne = async (query) => {
  try{
      const set = await  movies.deleteOne(query);
      return set
  }catch (err) {
      return err
  }
}



module.exports = {
  insertOne,
  find,
  updateOne,
  deleteOne,
  findOne,
  with_theaters
}