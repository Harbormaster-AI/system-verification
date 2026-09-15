

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiKeyService } from '../../../services/ApiKey.service';
import { ApiKey } from '../../../models/ApiKey';

@Component({
    selector: 'app-index-apiKey',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexApiKeyComponent implements OnInit {

    apiKeys: ApiKey[] = [];

    constructor(
        private router: Router,
        private service: ApiKeyService
) {}

    ngOnInit(): void {
        this.getApiKeys();
}

    getApiKeys(): void {
        this.service.getApiKeys().subscribe((res) => {
        this.apiKeys = res;
    });
}

    deleteApiKey(id: any): void {
        this.service.deleteApiKey(id)
            .subscribe(() => {
                this.getApiKeys();
            });
    }
}