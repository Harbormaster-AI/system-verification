

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../../../services/Room.service';
import { Room } from '../../../models/Room';

@Component({
    selector: 'app-index-room',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexRoomComponent implements OnInit {

    rooms: Room[] = [];

    constructor(
        private router: Router,
        private service: RoomService
) {}

    ngOnInit(): void {
        this.getRooms();
}

    getRooms(): void {
        this.service.getRooms().subscribe((res) => {
        this.rooms = res;
    });
}

    deleteRoom(id: any): void {
        this.service.deleteRoom(id)
            .subscribe(() => {
                this.getRooms();
            });
    }
}