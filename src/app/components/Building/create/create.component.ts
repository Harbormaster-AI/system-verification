
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuildingService } from '../../../services/Building.service';
import { Building } from '../../../models/Building';
import { SubBaseComponent } from '../../Building/sub.base.component';

@Component({
    selector: 'app-create-building',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateBuildingComponent extends SubBaseComponent implements OnInit {

    title = 'Add Building';

    buildingForm: FormGroup;
    building: Building;

    constructor( http: HttpClient,
        private buildingService: BuildingService,
        private fb: FormBuilder,
        private router: Router
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

    
    addBuilding(name, Site, Floors): void {
        this.buildingService
        .addBuilding(name, Site, Floors)
            .subscribe(() => {
                this.router.navigate(['/indexBuilding']);
            });
    }

    ngOnInit(): void {
    }
}