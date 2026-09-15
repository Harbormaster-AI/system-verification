
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '../../../services/Room.service';
import { Room } from '../../../models/Room';
import { SubBaseComponent } from '../../Room/sub.base.component';

@Component({
    selector: 'app-create-room',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateRoomComponent extends SubBaseComponent implements OnInit {

    title = 'Add Room';

    roomForm: FormGroup;
    room: Room;

    constructor( http: HttpClient,
        private roomService: RoomService,
        private fb: FormBuilder,
        private router: Router
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

    
    addRoom(name, Floor, Devices, Gateways): void {
        this.roomService
        .addRoom(name, Floor, Devices, Gateways)
            .subscribe(() => {
                this.router.navigate(['/indexRoom']);
            });
    }

    ngOnInit(): void {
    }
}