

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DigitalTwinService } from '../../../services/DigitalTwin.service';
import { DigitalTwin } from '../../../models/DigitalTwin';

@Component({
    selector: 'app-index-digitalTwin',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexDigitalTwinComponent implements OnInit {

    digitalTwins: DigitalTwin[] = [];

    constructor(
        private router: Router,
        private service: DigitalTwinService
) {}

    ngOnInit(): void {
        this.getDigitalTwins();
}

    getDigitalTwins(): void {
        this.service.getDigitalTwins().subscribe((res) => {
        this.digitalTwins = res;
    });
}

    deleteDigitalTwin(id: any): void {
        this.service.deleteDigitalTwin(id)
            .subscribe(() => {
                this.getDigitalTwins();
            });
    }
}