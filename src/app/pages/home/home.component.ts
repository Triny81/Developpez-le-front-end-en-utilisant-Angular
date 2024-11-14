import { Component, OnInit } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Color, LegendPosition, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);

  protected yearsJO: number[] = [];
  protected pieDatas: any[] = [];
  protected view: [number, number] = [800, 800];

  // options
  protected gradient: boolean = false;
  protected showLegend: boolean = false;
  protected showLabels: boolean = true;
  protected isDoughnut: boolean = false;
  protected legendPosition: LegendPosition  = LegendPosition.Below;

  constructor(private olympicService: OlympicService) {
    Object.assign(this, this.pieDatas);
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.olympics$.subscribe(countries => {

      if (countries) {
        countries.forEach((country: any) => {

          if (country["participations"]) { 
            country["value"] = 0;

            country["participations"].forEach((participation: any) => {

              // recherche des années des JO
              const year = participation["year"];
              if (!this.yearsJO.includes(year)) {
                this.yearsJO.push(participation["year"]);
              }

              // médailles par pays
              country["value"] += participation["medalsCount"];
            });
          }

          // formatage des données pour ngx charts
          country["name"] = country["country"];
          
          this.pieDatas.push(country);
          this.pieDatas = [...this.pieDatas]
        });

        // console.log("countries", this.pieDatas);
      }
    });
    
    
 
  }


  onSelect(data: any): void { // rediriger l'utilisateur quand il clique sur un pays du diagramme
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
