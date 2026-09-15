

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessagingEndpointService } from '../../../services/MessagingEndpoint.service';
import { MessagingEndpoint } from '../../../models/MessagingEndpoint';

@Component({
    selector: 'app-index-messagingEndpoint',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexMessagingEndpointComponent implements OnInit {

    messagingEndpoints: MessagingEndpoint[] = [];

    constructor(
        private router: Router,
        private service: MessagingEndpointService
) {}

    ngOnInit(): void {
        this.getMessagingEndpoints();
}

    getMessagingEndpoints(): void {
        this.service.getMessagingEndpoints().subscribe((res) => {
        this.messagingEndpoints = res;
    });
}

    deleteMessagingEndpoint(id: any): void {
        this.service.deleteMessagingEndpoint(id)
            .subscribe(() => {
                this.getMessagingEndpoints();
            });
    }
}