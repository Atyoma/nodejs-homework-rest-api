## GoIT Node.js Course Template Homework

Виконайте форк цього репозиторію для виконання домашніх завдань (2-6)
Форк створить репозиторій на вашому http://github.com

Додайте ментора до колаборації

Для кожної домашньої роботи створюйте свою гілку.

- hw02
- hw03
- hw04
- hw05
- hw06

Кожна нова гілка для др повинна робитися з master

Після того, як ви закінчили виконувати домашнє завдання у своїй гілці, необхідно зробити пулл-реквест (PR). Потім додати ментора для рев'ю коду. Тільки після того, як ментор заапрувить PR, ви можете виконати мердж гілки з домашнім завданням у майстер.

Уважно читайте коментарі ментора. Виправте зауваження та зробіть коміт у гілці з домашнім завданням. Зміни підтягнуться у PR автоматично після того, як ви відправите коміт з виправленнями на github
Після виправлення знову додайте ментора на рев'ю коду.

- При здачі домашньої роботи є посилання на PR
- JS-код чистий та зрозумілий, для форматування використовується Prettier

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

SENGRID_CODE

<!-- echo "export SENDGRID_API_KEY='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'" > sendgrid.env
echo "sendgrid.env" >> .gitignore
source ./sendgrid.env -->

npm install --save @sendgrid/mail

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
javascript
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
to: 'test@example.com', // Change to your recipient
from: 'test@example.com', // Change to your verified sender
subject: 'Sending with SendGrid is Fun',
text: 'and easy to do anywhere, even with Node.js',
html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
.send(msg)
.then(() => {
console.log('Email sent')
})
.catch((error) => {
console.error(error)
})
