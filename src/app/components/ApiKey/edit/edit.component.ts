
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ApiKeyService } from '../../../services/ApiKey.service';
import { SubBaseComponent } from '../../ApiKey/sub.base.component';


@Component({
    selector: 'app-edit-apiKey',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditApiKeyComponent extends SubBaseComponent implements OnInit {

    title = 'Edit ApiKey';

    apiKeyForm: FormGroup;
    apiKey: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: ApiKeyService,
        private fb: FormBuilder
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

    
    updateApiKey(keyId, hashedSecret, createdAt, lastUsedAt, AccessPolicy): void {
        this.route.params.subscribe((params) => {

                        this.service.updateApiKey(keyId, hashedSecret, createdAt, lastUsedAt, AccessPolicy, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexApiKey']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getApiKey(params['id']).subscribe(res => {
                this.apiKey = res;
            });
        });
    }
}