/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const defaultSerializationOpts = {
    virtuals: true,
    versionKey: false,
    transform(doc: any, ret: any) {
        delete ret._id
    },
}
export default defaultSerializationOpts
