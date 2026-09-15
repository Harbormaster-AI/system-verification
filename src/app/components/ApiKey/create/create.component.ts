
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiKeyService } from '../../../services/ApiKey.service';
import { ApiKey } from '../../../models/ApiKey';
import { SubBaseComponent } from '../../ApiKey/sub.base.component';

@Component({
    selector: 'app-create-apiKey',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateApiKeyComponent extends SubBaseComponent implements OnInit {

    title = 'Add ApiKey';

    apiKeyForm: FormGroup;
    apiKey: ApiKey;

    constructor( http: HttpClient,
        private apiKeyService: ApiKeyService,
        private fb: FormBuilder,
        private router: Router
) {
        super(http);
        this.apiKeyForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  keyId: ['', Validators.required],
      hashedSecret: ['', Validators.required],
      createdAt: ['', Validators.required],
      lastUsedAt: ['', Validators.required],
      AccessPolicy: ['', ]
        });
    }

    
    addApiKey(keyId, hashedSecret, createdAt, lastUsedAt, AccessPolicy): void {
        this.apiKeyService
        .addApiKey(keyId, hashedSecret, createdAt, lastUsedAt, AccessPolicy)
            .subscribe(() => {
                this.router.navigate(['/indexApiKey']);
            });
    }

    ngOnInit(): void {
    }
}