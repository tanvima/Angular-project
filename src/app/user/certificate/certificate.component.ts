import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {

  pdfSrc = "../../../assets/harshadSalsa.pdf";

  constructor(private activatedRoute: ActivatedRoute) { }

  courseid:any
  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe((p) => {
      this.courseid = p['courseId']
      
    
      
      })

  }

}
