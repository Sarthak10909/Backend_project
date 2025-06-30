import mongoose, {Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema = new Schema(
    {
        videoFile:{                         //use cloudinary url
            type: String,
            required: true
        },
        thumbnail:{
            type: String,                    //use cloudinary url
            required: true
        },
        title:{
            type: String,                    
            required: true
        },
        description:{
            type: String,                    
            required: true
        },
        duration:{
            type: String,                    //use cloudinary url
            required: true
        },
        views:{
            types: Number,
            default: 0
        },
        isPublished:{
            type: Boolean,
            default: true
        },
        owner:{
            type: Schema.types.ObjectId,
            ref: "User"
        }
    }, {timestamps: true}
)

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema)