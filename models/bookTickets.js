var mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookTicketsSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId
    },
    theater_id: {
      type: ObjectId
    },
    movie_id: {
      type: ObjectId
    },
    price_paid: {
      type: Number
    },
    date: {
      type: Date
    }
  }
);

let bookTickets = mongoose.model("bookTickets", bookTicketsSchema);

insertOne = async (query) => {
    try{
        const create = await bookTickets(query).save();
        return create;
    }catch (err) {
        return err
    }
}

find = async (query) => {
  try{
      const get = await bookTickets.find(query);
      return get
  }catch (err) {
      return err
  }
}

findOne = async (query) => {
  try{
      const get = await bookTickets.findOne(query);
      return get
  }catch (err) {
      return err
  }
}



updateOne = async (match, query) => {
  try{
      const set = await  bookTickets.updateOne(match, query)
      return set
  }catch (err) {
      return err
  }
}

deleteOne = async (query) => {
  try{
      const set = await  bookTickets.deleteOne(query);
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
  findOne
}