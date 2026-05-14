import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],

  template: `

  <div class="container">

    <h2 class="title">🔔 Notifications</h2>

    <!-- NEW QUIZ -->
    <div class="notify info">
      <div class="icon">🆕</div>

      <div>
        <h3>New Quiz Available</h3>
        <p>Angular Basics Quiz is now live.</p>
      </div>
    </div>

    <!-- RESULT -->
    <div class="notify success">
      <div class="icon">📢</div>

      <div>
        <h3>Result Published</h3>
        <p>Your DBMS Quiz result has been published.</p>
      </div>
    </div>

    <!-- DEADLINE -->
    <div class="notify warning">
      <div class="icon">⏰</div>

      <div>
        <h3>Deadline Reminder</h3>
        <p>Aptitude Test closes tomorrow at 11:59 PM.</p>
      </div>
    </div>

  </div>
  `,

  styles: [`

  .container{
    max-width:900px;
  }

  .title{
    margin-bottom:30px;
    color:#1e293b;
    font-size:32px;
  }

  .notify{
    display:flex;
    gap:20px;
    align-items:center;
    background:white;
    padding:22px;
    border-radius:14px;
    margin-bottom:20px;
    box-shadow:0 4px 15px rgba(0,0,0,0.08);
  }

  .icon{
    font-size:35px;
  }

  .notify h3{
    margin:0;
    font-size:20px;
    color:#111827;
  }

  .notify p{
    margin-top:8px;
    color:#6b7280;
  }

  .info{
    border-left:6px solid #3b82f6;
  }

  .success{
    border-left:6px solid #10b981;
  }

  .warning{
    border-left:6px solid #f59e0b;
  }

  `]
})
export class NotificationsComponent {

}