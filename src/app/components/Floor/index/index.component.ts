

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FloorService } from '../../../services/Floor.service';
import { Floor } from '../../../models/Floor';

@Component({
    selector: 'app-index-floor',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexFloorComponent implements OnInit {

    floors: Floor[] = [];

    constructor(
        private router: Router,
        private service: FloorService
) {}

    ngOnInit(): void {
        this.getFloors();
}

    getFloors(): void {
        this.service.getFloors().subscribe((res) => {
        this.floors = res;
    });
}

    deleteFloor(id: any): void {
        this.service.deleteFloor(id)
            .subscribe(() => {
                this.getFloors();
            });
    }
}