
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FloorService } from '../../../services/Floor.service';
import { Floor } from '../../../models/Floor';
import { SubBaseComponent } from '../../Floor/sub.base.component';

@Component({
    selector: 'app-create-floor',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateFloorComponent extends SubBaseComponent implements OnInit {

    title = 'Add Floor';

    floorForm: FormGroup;
    floor: Floor;

    constructor( http: HttpClient,
        private floorService: FloorService,
        private fb: FormBuilder,
        private router: Router
) {
        super(http);
        this.floorForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  name: ['', Validators.required],
      level: ['', Validators.required],
      Building: ['', ],
      Rooms: ['', ]
        });
    }

    
    addFloor(name, level, Building, Rooms): void {
        this.floorService
        .addFloor(name, level, Building, Rooms)
            .subscribe(() => {
                this.router.navigate(['/indexFloor']);
            });
    }

    ngOnInit(): void {
    }
}