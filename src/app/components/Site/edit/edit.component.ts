
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SiteService } from '../../../services/Site.service';
import { SubBaseComponent } from '../../Site/sub.base.component';


@Component({
    selector: 'app-edit-site',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditSiteComponent extends SubBaseComponent implements OnInit {

    title = 'Edit Site';

    siteForm: FormGroup;
    site: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: SiteService,
        private fb: FormBuilder
) {
        super(http);
        this.siteForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  name: ['', Validators.required],
      address: ['', Validators.required],
      timezone: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      Tenant: ['', ],
      Buildings: ['', ],
      Devices: ['', ],
      Gateways: ['', ]
        });
    }

    
    updateSite(name, address, timezone, latitude, longitude, Tenant, Buildings, Devices, Gateways): void {
        this.route.params.subscribe((params) => {

                        this.service.updateSite(name, address, timezone, latitude, longitude, Tenant, Buildings, Devices, Gateways, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexSite']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getSite(params['id']).subscribe(res => {
                this.site = res;
            });
        });
    }
}