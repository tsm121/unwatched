import { Component, OnInit } from '@angular/core'
import discover from './discover.service'

enum FooBar {
  FOO, BAR
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private movies: any
  constructor() {}

  async ngOnInit() {
    movies  = await discover.getDiscovery()
  }


}
                                    
