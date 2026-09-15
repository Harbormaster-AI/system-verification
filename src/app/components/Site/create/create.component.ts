
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SiteService } from '../../../services/Site.service';
import { Site } from '../../../models/Site';
import { SubBaseComponent } from '../../Site/sub.base.component';

@Component({
    selector: 'app-create-site',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateSiteComponent extends SubBaseComponent implements OnInit {

    title = 'Add Site';

    siteForm: FormGroup;
    site: Site;

    constructor( http: HttpClient,
        private siteService: SiteService,
        private fb: FormBuilder,
        private router: Router
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

    
    addSite(name, address, timezone, latitude, longitude, Tenant, Buildings, Devices, Gateways): void {
        this.siteService
        .addSite(name, address, timezone, latitude, longitude, Tenant, Buildings, Devices, Gateways)
            .subscribe(() => {
                this.router.navigate(['/indexSite']);
            });
    }

    ngOnInit(): void {
    }
}