import { Injectable, Renderer2 } from '@angular/core';

@Injectable()
export class DarkmodeService {

  constructor(
    
  ) { }

  setDarkMode() {
    if(this.loadDarkMode() == null) {
      localStorage.setItem('dark_mode', 'true');
    }
  }

  loadDarkMode() {
    const darkmode = localStorage.getItem('dark_mode');
    return darkmode;
  }

  switchDarkMode() {
    const darkmode = this.loadDarkMode();
    const body = document.getElementsByTagName('body')[0];

    if(darkmode == 'true') {
      body.classList.remove('dark-bg');
      body.classList.add('default-bg');
      localStorage.setItem('dark_mode', 'false');
    }
    else if(darkmode == 'false') {
      body.classList.remove('default-bg');
      body.classList.add('dark-bg');
      localStorage.setItem('dark_mode', 'true');
    }
  }
}
