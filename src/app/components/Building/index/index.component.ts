

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuildingService } from '../../../services/Building.service';
import { Building } from '../../../models/Building';

@Component({
    selector: 'app-index-building',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexBuildingComponent implements OnInit {

    buildings: Building[] = [];

    constructor(
        private router: Router,
        private service: BuildingService
) {}

    ngOnInit(): void {
        this.getBuildings();
}

    getBuildings(): void {
        this.service.getBuildings().subscribe((res) => {
        this.buildings = res;
    });
}

    deleteBuilding(id: any): void {
        this.service.deleteBuilding(id)
            .subscribe(() => {
                this.getBuildings();
            });
    }
}