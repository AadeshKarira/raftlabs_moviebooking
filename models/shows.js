var mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    description: {
      type: String
    },
    rating: {
      type: Number
    },
    price: {
      type: Number
    },
    location: {
      type: String
    },
    address: {
      type: String
    }
  }
);

let shows = mongoose.model("shows", showSchema);

insertOne = async (query) => {
    try{
        const create = await shows(query).save();
        return create;
    }catch (err) {
        return err
    }
}

find = async (query) => {
  try{
      const get = await shows.find(query);
      return get
  }catch (err) {
      return err
  }
}

updateOne = async (match, query) => {
  try{
      const set = await  shows.updateOne(match, query)
      return set
  }catch (err) {
      return err
  }
}

deleteOne = async (query) => {
  try{
      const set = await  shows.deleteOne(query);
      return set
  }catch (err) {
      return err
  }
}



module.exports = {
  insertOne,
  find,
  updateOne,
  deleteOne
}