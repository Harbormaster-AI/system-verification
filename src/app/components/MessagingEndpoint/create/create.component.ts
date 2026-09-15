
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagingEndpointService } from '../../../services/MessagingEndpoint.service';
import { MessagingEndpoint } from '../../../models/MessagingEndpoint';
import { SubBaseComponent } from '../../MessagingEndpoint/sub.base.component';

@Component({
    selector: 'app-create-messagingEndpoint',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateMessagingEndpointComponent extends SubBaseComponent implements OnInit {

    title = 'Add MessagingEndpoint';

    messagingEndpointForm: FormGroup;
    messagingEndpoint: MessagingEndpoint;

    constructor( http: HttpClient,
        private messagingEndpointService: MessagingEndpointService,
        private fb: FormBuilder,
        private router: Router
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

    
    addMessagingEndpoint(host, port, secure, Tenant, Streams, Protocol): void {
        this.messagingEndpointService
        .addMessagingEndpoint(host, port, secure, Tenant, Streams, Protocol)
            .subscribe(() => {
                this.router.navigate(['/indexMessagingEndpoint']);
            });
    }

    ngOnInit(): void {
    }
}