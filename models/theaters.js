var mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const theaterSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    address: {
      type: String
    },
    location: {
      type: String
    },
    movie_ids: {
      type: [ObjectId]
    }
  }
);

let theater = mongoose.model("theater", theaterSchema);

insertOne = async (query) => {
    try{
        const create = await theater(query).save();
        return create;
    }catch (err) {
        return err
    }
}

find = async (query) => {
  try{
      const get = await theater.find(query);
      return get
  }catch (err) {
      return err
  }
}

findOne = async (query) => {
  try{
      const get = await theater.findOne(query);
      return get
  }catch (err) {
      return err
  }
}

with_movies = async (query) => {
  try{
      const get = await theater.aggregate([
        {
          '$match': query
        }, {
          '$lookup': {
            'from': 'movies', 
            'localField': 'movie_ids', 
            'foreignField': '_id', 
            'as': 'movies'
          }
        }
      ]);
      return get
  }catch (err) {
      return err
  }
}

updateOne = async (match, query) => {
  try{
      const set = await  theater.updateOne(match, query)
      return set
  }catch (err) {
      return err
  }
}

deleteOne = async (query) => {
  try{
      const set = await  theater.deleteOne(query);
      return set
  }catch (err) {
      return err
  }
}



module.exports = {
  insertOne,
  findOne,
  with_movies
}