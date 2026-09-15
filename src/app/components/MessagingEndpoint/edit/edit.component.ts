
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MessagingEndpointService } from '../../../services/MessagingEndpoint.service';
import { SubBaseComponent } from '../../MessagingEndpoint/sub.base.component';


@Component({
    selector: 'app-edit-messagingEndpoint',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditMessagingEndpointComponent extends SubBaseComponent implements OnInit {

    title = 'Edit MessagingEndpoint';

    messagingEndpointForm: FormGroup;
    messagingEndpoint: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: MessagingEndpointService,
        private fb: FormBuilder
) {
        super(http);
        this.messagingEndpointForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  host: ['', Validators.required],
      port: ['', Validators.required],
      secure: ['', Validators.required],
      Tenant: ['', ],
      Streams: ['', ],
      Protocol: ['', ]
        });
    }

    
    updateMessagingEndpoint(host, port, secure, Tenant, Streams, Protocol): void {
        this.route.params.subscribe((params) => {

                        this.service.updateMessagingEndpoint(host, port, secure, Tenant, Streams, Protocol, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexMessagingEndpoint']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getMessagingEndpoint(params['id']).subscribe(res => {
                this.messagingEndpoint = res;
            });
        });
    }
}