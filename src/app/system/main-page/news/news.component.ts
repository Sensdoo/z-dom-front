import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {News} from '../../../entities/news.entity';
import {Router} from '@angular/router';
import {ApiNewsService} from '../../../shared/services/api-services/api-news.service';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'sens-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  form: FormGroup
  allNews: Array<News> = [];
  role = 'user';
  message: string;
  type: string;

  constructor(
    private token: TokenStorageService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private newsService: ApiNewsService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.tokenStorage.getAuthorities().forEach(role => {
      if (role === 'ROLE_ADMIN') {
        this.role = 'admin';
      }
    });

    this.newsService.getAll().subscribe((listNews: Array<News>) => {
      this.allNews = listNews;
      this.allNews.sort((a, b) => b.id - a.id);

      if (this.allNews.length > 5) {
        this.allNews.splice(6, this.allNews.length - 1);
      }

      this.allNews.forEach(news => news.isEdit = false);
      console.log(listNews);
    }, error2 => console.log(error2));
  }

  // addNews() {
  //   this.router.navigate(['/main-page/edit-news']);
  // }

  addNews() {
    this.allNews.forEach(news => news.isBlocked = true);
    const newNews = new News(null, new Date(), '', '', this.token.getUsername());
    newNews.isEdit = true;
    this.form = this.fb.group({
      'header': [newNews.header, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      'text': [newNews.text, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]]
    });
    this.allNews.unshift(newNews);
  }

  editNews(oneNews: News) {
    if (oneNews.isEdit) {
      const data = this.form.value;
      oneNews.header = data.header;
      oneNews.text = data.text;
      oneNews.date = new Date();
      this.saveChanges(oneNews);
      oneNews.isEdit = false;
    } else {
      this.allNews.forEach(news => news.isBlocked = true);
      this.form = this.fb.group({
        'header': [oneNews.header, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        'text': [oneNews.text, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]]
      });
      oneNews.isEdit = true;
    }
  }

  deleteNews(id: number) {
    this.newsService.deleteNews(id).subscribe(response => {
      // console.log(response);
      this.allNews = this.allNews.filter(news => news.id !== id);
      this.showMessage('success', response.message);
    }, error2 => {
      this.showMessage('danger', error2.error.message);
      // window.location.reload();
    });
  }

  cancel() {
    window.location.reload();
  }

  private saveChanges(news: News) {
    console.log(news);
    this.allNews.forEach(n => n.isBlocked = false);
    if (news.id) {
      this.newsService.editNews(news).subscribe(response => {
        this.showMessage('success', 'Новость успешно отредактирована.');
      },error2 => {
        this.showMessage('danger', error2.error.message);
      });
    } else {
      this.newsService.addNews(news).subscribe(response => {
        this.showMessage('success', 'Новость успешно добавлена.');
        news.id = response.id;
      }, error2 => {
        this.showMessage('danger', error2.error.message);
      });
    }
  }

  private showMessage(type: string, message: string) {
    this.type = type;
    this.message = message;
    window.setTimeout(() => {
      this.message = '';
      this.type = '';
    }, 3500);
  }
}
