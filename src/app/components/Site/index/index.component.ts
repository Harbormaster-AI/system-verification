

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SiteService } from '../../../services/Site.service';
import { Site } from '../../../models/Site';

@Component({
    selector: 'app-index-site',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexSiteComponent implements OnInit {

    sites: Site[] = [];

    constructor(
        private router: Router,
        private service: SiteService
) {}

    ngOnInit(): void {
        this.getSites();
}

    getSites(): void {
        this.service.getSites().subscribe((res) => {
        this.sites = res;
    });
}

    deleteSite(id: any): void {
        this.service.deleteSite(id)
            .subscribe(() => {
                this.getSites();
            });
    }
}