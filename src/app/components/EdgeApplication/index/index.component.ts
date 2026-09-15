

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EdgeApplicationService } from '../../../services/EdgeApplication.service';
import { EdgeApplication } from '../../../models/EdgeApplication';

@Component({
    selector: 'app-index-edgeApplication',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexEdgeApplicationComponent implements OnInit {

    edgeApplications: EdgeApplication[] = [];

    constructor(
        private router: Router,
        private service: EdgeApplicationService
) {}

    ngOnInit(): void {
        this.getEdgeApplications();
}

    getEdgeApplications(): void {
        this.service.getEdgeApplications().subscribe((res) => {
        this.edgeApplications = res;
    });
}

    deleteEdgeApplication(id: any): void {
        this.service.deleteEdgeApplication(id)
            .subscribe(() => {
                this.getEdgeApplications();
            });
    }
}