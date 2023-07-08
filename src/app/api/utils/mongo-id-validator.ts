// MongoIdValidator

import mongoose from "mongoose";

export default function validMongoId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}
