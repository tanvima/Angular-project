import { Component, OnInit } from '@angular/core';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  no_of_active_students = 0;
  no_of_courses = 0;
  no_of_categories = 0;
  categories: any;
  enrollment:any[]=[];
  avgrating: any[]=[];
  interaction: any[]=[];
  likes: any[]=[];
  courses:any
  coursename:any[]=[]
  no_of_complete_course=0;
  coursePerCategory:any[]=[]
  categoryname:any[]=[]
  popularCourse!:any
  popularCourseName:any[]=[]
  popularCourseRating:any[]=[]

  constructor(private as: AdminService) { }

  ngOnInit(): void {
  

    this.as.getCategoryList().subscribe((data:any) => {
      if (data != undefined && data != null) {
        this.categories = data;

        this.no_of_categories = this.categories.length;
        this.categories.forEach((element:any) => {
          this.coursePerCategory.push(element.courses.length)
          this.categoryname.push(element.categoryName)
        })
      }
    })

    this.as.getCourseList().subscribe((data:any)=>{
      this.courses=data;
      this.no_of_courses = this.courses.length;
      this.courses.forEach((cat: any, index: number) => {
        this.coursename[index]=cat.courseName;
        this.enrollment.push(cat.enrollment.length);
        this.avgrating[index] = cat.rating;
        
        this.interaction[index] = cat.feedback;
        this.likes[index] = cat.like.length;
      })

    })

    console.log("Enroll",this.enrollment)
  }
//Course per category
  doughnutChartLabels: Label[] = this.categoryname;
  doughnutChartData: MultiDataSet = [
    this.coursePerCategory
  ];
  doughnutChartType: ChartType = 'doughnut';

  //Student enrollment
  enrollBarOptions:ChartOptions={
    responsive:true
  };
  enrollBarLabels:Label[]=this.coursename;
  enrollBar:ChartType='bar';
  enrollBarLegend=true;
  enrollBarChartPlugins=[];
  enrollBarChartData:ChartDataSets[]=[{data:this.enrollment,label:'Student enrollment'}];
  coursePerCatOptions:ChartOptions={
    responsive:true
  };
  enrollBarColor:Color[] = [
    {
      borderColor: 'grey',
      backgroundColor: '#c8a951',
    },
  ];
//Likes of courses
lineChartData: ChartDataSets[] = [
  { data: this.popularCourseRating, label: 'Likes of courses' },
];

lineChartLabels: Label[] =this.coursename

lineChartOptions = {
  responsive: true,
};

lineChartColors: Color[] = [
  {
    borderColor: 'grey',
    backgroundColor: '#f9e076',
  },
];
lineChartLegend = true;
lineChartPlugins = [];
lineChartType = 'line';


 //Student enrollment
 ratingBarOptions:ChartOptions={
  responsive:true
};
ratingBarLabels:Label[]=this.coursename;
ratingBar:ChartType='bar';
ratingLegend=true;
ratingBarChartPlugins=[];
ratingBarChartData:ChartDataSets[]=[{data:this.enrollment,label:'Average rating of course'}];
ratingOptions:ChartOptions={
  responsive:true
};
ratingColor:Color[] = [
  {
    borderColor: 'grey',
    backgroundColor: '#fdefb2',
  },
];


}
