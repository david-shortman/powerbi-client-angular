// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Component, Input, OnInit } from '@angular/core';
import { Embed, factories, service } from 'powerbi-client';

/**
 * Type for event handler function of embedded entity
 */
export type EventHandler = (
  event?: service.ICustomEvent<any>,
  embeddedEntity?: Embed
) => void | null;

/**
 * Base component to hold common properties for all the Power BI entities
 */
@Component({
  selector: 'powerbi-embed',
  template: '',
})
export class PowerBIEmbedComponent implements OnInit {
  // Input() specify the properties that will be passed from the parent
  // CSS class to be set on the embedding container (Optional)
  @Input() cssClassName?: string;

  // Provide a custom implementation of Power BI service (Optional)
  @Input() service?: service.Service;

  @Input()
  eventHandlers?: Map<string, EventHandler | null>;

  // Power BI service
  powerbi!: service.Service;

  ngOnInit(): void {
    // Initialize powerbi variable for child component
    if (this.service) {
      this.powerbi = this.service;
    } else {
      this.powerbi = new service.Service(factories.hpmFactory, factories.wpmpFactory, factories.routerFactory);
    }
  }
}
