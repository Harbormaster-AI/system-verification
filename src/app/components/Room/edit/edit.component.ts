
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RoomService } from '../../../services/Room.service';
import { SubBaseComponent } from '../../Room/sub.base.component';


@Component({
    selector: 'app-edit-room',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditRoomComponent extends SubBaseComponent implements OnInit {

    title = 'Edit Room';

    roomForm: FormGroup;
    room: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: RoomService,
        private fb: FormBuilder
) {
        super(http);
        this.roomForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  name: ['', Validators.required],
      Floor: ['', ],
      Devices: ['', ],
      Gateways: ['', ]
        });
    }

    
    updateRoom(name, Floor, Devices, Gateways): void {
        this.route.params.subscribe((params) => {

                        this.service.updateRoom(name, Floor, Devices, Gateways, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexRoom']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getRoom(params['id']).subscribe(res => {
                this.room = res;
            });
        });
    }
}