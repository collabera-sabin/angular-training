import { Component, ChangeDetectorRef } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-error-list',
  templateUrl: './error-list.component.html',
  styleUrls: ['./error-list.component.scss']
})
export class ErrorListComponent {
  public errorList = new Map<String, String>();

  public static EID (len: number): String {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, x => x.toString(16).padStart(2, "0")).join('')
  }

  constructor(private apiService: APIService, private changeDetector: ChangeDetectorRef) {
    apiService.errorProvider$.subscribe((message) => {
      let id = ErrorListComponent.EID(32);
      this.errorList.set(id, message);
      setInterval(this.close.bind(this, id), 3000);
    })
  }

  public getErrorListEntries(): [String, String][] {
    return Array.from(this.errorList.entries());
  }

  public close(error:String) {
    this.errorList.delete(error);
    this.changeDetector.detectChanges();
  }
}
