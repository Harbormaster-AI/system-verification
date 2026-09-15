

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimCardService } from '../../../services/SimCard.service';
import { SimCard } from '../../../models/SimCard';

@Component({
    selector: 'app-index-simCard',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexSimCardComponent implements OnInit {

    simCards: SimCard[] = [];

    constructor(
        private router: Router,
        private service: SimCardService
) {}

    ngOnInit(): void {
        this.getSimCards();
}

    getSimCards(): void {
        this.service.getSimCards().subscribe((res) => {
        this.simCards = res;
    });
}

    deleteSimCard(id: any): void {
        this.service.deleteSimCard(id)
            .subscribe(() => {
                this.getSimCards();
            });
    }
}