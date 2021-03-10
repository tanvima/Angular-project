import {Video} from '../interface/video';

export interface Course {
    courseId:number,
    courseName:string,
    courseDesc:string,
    courseLogo:string,
    coursePrice:number,
    videos:Array<Video>,
    rating:number,
    noOfVideo:number
}
