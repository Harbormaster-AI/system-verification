
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FloorService } from '../../../services/Floor.service';
import { SubBaseComponent } from '../../Floor/sub.base.component';


@Component({
    selector: 'app-edit-floor',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditFloorComponent extends SubBaseComponent implements OnInit {

    title = 'Edit Floor';

    floorForm: FormGroup;
    floor: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: FloorService,
        private fb: FormBuilder
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

    
    updateFloor(name, level, Building, Rooms): void {
        this.route.params.subscribe((params) => {

                        this.service.updateFloor(name, level, Building, Rooms, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexFloor']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getFloor(params['id']).subscribe(res => {
                this.floor = res;
            });
        });
    }
}