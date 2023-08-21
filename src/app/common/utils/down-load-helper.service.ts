import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownLoadHelperService {

  downLoadFile(data: Blob, fileName: string) {
    const link = document.createElement('a');
    const blob = new Blob([data]);
    link.style.display = 'none';
    link.href = URL.createObjectURL(blob);
    link.setAttribute(
      'download',
      `${fileName}`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }
}
