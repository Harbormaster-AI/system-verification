

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GatewayService } from '../../../services/Gateway.service';
import { Gateway } from '../../../models/Gateway';

@Component({
    selector: 'app-index-gateway',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexGatewayComponent implements OnInit {

    gateways: Gateway[] = [];

    constructor(
        private router: Router,
        private service: GatewayService
) {}

    ngOnInit(): void {
        this.getGateways();
}

    getGateways(): void {
        this.service.getGateways().subscribe((res) => {
        this.gateways = res;
    });
}

    deleteGateway(id: any): void {
        this.service.deleteGateway(id)
            .subscribe(() => {
                this.getGateways();
            });
    }
}