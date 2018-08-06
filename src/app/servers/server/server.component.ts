import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverId = 0;
  paramsSubscription: Subscription;

  constructor(private readonly serversService: ServersService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.serverId = Number(this.route.snapshot.params['id']);
    this.server = this.serversService.getServer(this.serverId);
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.serverId = Number(params['id']);
        this.server = this.serversService.getServer(this.serverId);
      }
    );
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }
}
