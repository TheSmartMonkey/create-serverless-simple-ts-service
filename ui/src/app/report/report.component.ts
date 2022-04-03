import { Report } from './../../../dist/reports-service-sdk/model/report';
import { ReportsAPIService } from './../../../dist/reports-service-sdk/api/reportsAPI.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  reports: Report[] = [];

  nameControl = new FormControl('', [Validators.required]);
  creationForm = new FormGroup({
    name: this.nameControl,
  });
  inProgress = false;

  constructor(private reportApi: ReportsAPIService) { }

  ngOnInit() {
    this.listReports();
  }

  async createReport() {
    if (this.creationForm.valid) {
      this.inProgress = true;
      try {
        await this.reportApi.reportsPost(this.creationForm!.value).toPromise();
      } finally {
        await this.listReports();
        this.inProgress = false;
      }
    }
  }

  async listReports() {
    const response = await this.reportApi.reportsGet().toPromise();
    this.reports = response.data.map(element => element);
  }

  async deleteReport(report: any) {
    try {
      await this.reportApi.reportsReportIdDelete(report.id).toPromise();
    } finally {
      await this.listReports();
    }
  }

}
