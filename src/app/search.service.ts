import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { zip, BehaviorSubject, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

export interface SearchResult {
  id: number;
  url: string;
  title: string;
  body: string;
}

export interface SearchCorrection {
  active: boolean;
  query: string;
}

export interface SearchResponse {
  correction?: SearchCorrection;
  documents: SearchResult[];
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  query: BehaviorSubject<string> = new BehaviorSubject('');
  force: BehaviorSubject<boolean> = new BehaviorSubject(undefined);
  response: BehaviorSubject<SearchResponse> = new BehaviorSubject(undefined);

  private root = 'http://d38e14f9.ngrok.io/api/v1';

  constructor(private httpClient: HttpClient, private router: Router, private activeRoute: ActivatedRoute) {
    combineLatest(this.tf, this.idf, this.dis, this.ranker).subscribe(values => {
      this.sendSearch(this.query.value, this.force.value);
    });
    if(this.router.url.startsWith('/search')){
      let params = this.activeRoute.snapshot.queryParams
      if(params.tf != undefined) {
        this.tf.next(params.tf)
      }
      if(params.idf != undefined) {
        this.idf.next(params.idf)
      }
      if(params.dis != undefined) {
        this.dis.next(params.dis)
      }
      if(params.ranker != undefined) {
        this.ranker.next(params.ranker)
      }
      if(params.force != undefined) {
        this.force.next(params.force == '1');
      }
      if(params.query != undefined) {
        this.query.next(params.query);
        this.sendSearch(this.query.value, this.force.value);
      }
    }
    this.response.subscribe(response => {
      if(response == undefined) {
        this.router.navigateByUrl('/');
      } else {
        let url = '/search?query=' + encodeURIComponent(this.query.value)
                  + '&tf=' + encodeURIComponent(this.tf.value)
                  + '&idf=' + encodeURIComponent(this.idf.value)
                  + '&dis=' + encodeURIComponent(this.dis.value)
                  + '&ranker=' + encodeURIComponent(this.ranker.value);
        if(this.force.value != undefined) {
          url += '&force=' + encodeURIComponent(this.force.value ? '1' : '0');
        }
        this.router.navigateByUrl(url);
      }
    })
  }

  tf: BehaviorSubject</*'r' | 'l' | 'a'*/string> = new BehaviorSubject('r');
  idf: BehaviorSubject</*'n' | 'p'*/string> = new BehaviorSubject('n');
  dis: BehaviorSubject</*'m' | 'c'*/string> = new BehaviorSubject('m');
  ranker: BehaviorSubject</*'t' | 'b'*/string> = new BehaviorSubject('t');
  
  async resendWithForce(force: boolean): Promise<SearchResponse> {
    this.force.next(force);
    return this.sendSearch(this.query.value, force);
  }

  async search(query: string): Promise<SearchResponse> {
    this.force.next(undefined);
    this.query.next(query);
    return this.sendSearch(query, this.force.value)
  }

  private async sendSearch(query: string, force: boolean): Promise<SearchResponse> {
    if(query == '' || query == undefined) return {documents: []}
    this.isLoading.next(true);
    let url = this.root + '/search?query=' + encodeURIComponent(query)
    if(force != undefined) {
      url += '&force=' + (force ? '1' : '0');
    }
    url += '&tf_type=' + encodeURIComponent(this.tf.value);
    url += '&idf_type=' + encodeURIComponent(this.idf.value);
    url += '&dis_func=' + encodeURIComponent(this.dis.value);
    url += '&ranker=' + encodeURIComponent(this.ranker.value);
    const response = await this.httpClient.get<{succes: boolean, result: SearchResponse}>(url).toPromise()
    this.response.next(response.result);
    console.log(this.response.value);
    this.isLoading.next(false);
    return response.result;
  }
  

}
