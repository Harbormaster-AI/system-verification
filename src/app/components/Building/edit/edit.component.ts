
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BuildingService } from '../../../services/Building.service';
import { SubBaseComponent } from '../../Building/sub.base.component';


@Component({
    selector: 'app-edit-building',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditBuildingComponent extends SubBaseComponent implements OnInit {

    title = 'Edit Building';

    buildingForm: FormGroup;
    building: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: BuildingService,
        private fb: FormBuilder
) {
        super(http);
        this.buildingForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  name: ['', Validators.required],
      Site: ['', ],
      Floors: ['', ]
        });
    }

    
    updateBuilding(name, Site, Floors): void {
        this.route.params.subscribe((params) => {

                        this.service.updateBuilding(name, Site, Floors, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexBuilding']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getBuilding(params['id']).subscribe(res => {
                this.building = res;
            });
        });
    }
}