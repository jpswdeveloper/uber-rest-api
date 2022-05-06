const mongoose = require('mongoose')
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
exports.Category = mongoose.model('Category', categorySchema)
// export default  mongoose.model("Category", categorySchema);
categorySchema.virtual('id').get(function () {
    return this._id.toHexString()
})
categorySchema.set('toJSON', {
    virtuals: true
})