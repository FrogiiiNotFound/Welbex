// Добавьте этот скрипт в ваш проект
document.addEventListener('DOMContentLoaded', function () {
  const widgetItems = document.querySelectorAll('.widgets__item');
  const widgetSubtitle = document.querySelector('.js-widget-subtitle');
  const widgetDescription = document.querySelector('.js-widget-description');
  const possibilitiesTitle = document.querySelector('.js-possibilities-title');
  const possibilitiesItems = document.querySelector('.js-possibilities-items');
  const trialTitle = document.querySelector('.js-trial-title');
  const trialItems = document.querySelector('.js-trial-items');
  const trialButton = document.querySelector('.js-trial-button');

  const widgetsData = {
    'yandex-disk': {
      subtitle: 'Для вас разработали <span>готовые решения в виде виджетов</span>',
      description: '20 виджетов помогут автоматизировать ваш отдел.',
      possibilities: [
        'Загрузка файлов любого формата',
        'Отображение файлов прямо в сделке в виде примечания, а так же в панели справа',
        'Сортировка всех файлов по папкам',
      ],
      trial: {
        title: 'Попробуйте виджет Яндекс Диск бесплатно:',
        items: ['1 месяц бесплатно', 'Затем выберите тариф на 6, 9, 12 или 24 месяца'],
        buttonText: 'Попробовать бесплатно',
      },
    },
    'google-drive': {
      subtitle: 'Интеграция с <span>Google Drive</span> для совместной работы',
      description: 'Синхронизируйте документы и упростите командную работу.',
      possibilities: [
        'Автоматическая синхронизация с Google Диском',
        'Совместное редактирование документов в реальном времени',
        'Контроль версий и история изменений',
      ],
      trial: {
        title: 'Протестируйте интеграцию с Google Drive:',
        items: ['14 дней бесплатного использования', 'Поддержка всех форматов Google Документов'],
        buttonText: 'Начать тестирование',
      },
    },
    'lead-distribution': {
      subtitle: '<span>Распределение заявок</span> между менеджерами',
      description: 'Автоматизируйте процесс распределения входящих обращений.',
      possibilities: [
        'Распределение по очереди или по специализации',
        'Автоматическое назначение ответственного',
        'Уведомления о новых заявках',
      ],
      trial: {
        title: 'Опробуйте систему распределения заявок:',
        items: [
          'Настройте правила распределения за 10 минут',
          'Первые 100 заявок обрабатываются бесплатно',
        ],
        buttonText: 'Настроить распределение',
      },
    },
    'stage-time': {
      subtitle: 'Контроль <span>времени на этапах</span> сделки',
      description: 'Отслеживайте и оптимизируйте время обработки заявок.',
      possibilities: [
        'Автоматический расчет времени на каждом этапе',
        'Анализ bottlenecks в воронке продаж',
        'Уведомления о затянувшихся сделках',
      ],
      trial: {
        title: 'Проанализируйте вашу воронку продаж:',
        items: ['Бесплатный анализ 50 сделок', 'Рекомендации по оптимизации процессов'],
        buttonText: 'Проанализировать воронку',
      },
    },
    'visit-history': {
      subtitle: '<span>История посещений</span> сайта клиентами',
      description: 'Узнайте больше о поведении ваших потенциальных клиентов.',
      possibilities: [
        'Отслеживание активности на сайте',
        'Анализ интересов и потребностей',
        'Интеграция с карточками клиентов',
      ],
      trial: {
        title: 'Узнайте о ваших клиентах больше:',
        items: ['7 дней полного доступа к аналитике', 'Отчет по самым активным посетителям'],
        buttonText: 'Узнать больше',
      },
    },
    'deal-sync': {
      subtitle: '<span>Синхронизация сделок</span> между системами',
      description: 'Объедините данные из разных источников в единой системе.',
      possibilities: [
        'Автоматическая синхронизация статусов',
        'Импорт и экспорт данных в реальном времени',
        'Резервное копирование информации',
      ],
      trial: {
        title: 'Синхронизируйте ваши системы:',
        items: ['Настройка первого подключения бесплатно', 'Тестовый период - 30 дней'],
        buttonText: 'Начать синхронизацию',
      },
    },
    'asana-sync': {
      subtitle: 'Интеграция с <span>Asana</span> для управления проектами',
      description: 'Свяжите задачи Asana с вашими сделками и клиентами.',
      possibilities: [
        'Создание задач из карточек клиентов',
        'Отслеживание прогресса по проектам',
        'Уведомления о изменениях в задачах',
      ],
      trial: {
        title: 'Синхронизация с Asana доступна:',
        items: ['Подключение неограниченного числа проектов', 'Первые 2 недели - бесплатно'],
        buttonText: 'Подключить Asana',
      },
    },
    'telegram-notify': {
      subtitle: '<span>Уведомления в Telegram</span> о важных событиях',
      description: 'Получайте моментальные оповещения о ключевых действиях.',
      possibilities: [
        'Настройка персонализированных уведомлений',
        'Уведомления о новых заявках и сделках',
        'Оповещения о изменениях статусов',
      ],
      trial: {
        title: 'Настройте уведомления в Telegram:',
        items: ['Бесплатная настройка бота', 'Неограниченное количество уведомлений'],
        buttonText: 'Включить уведомления',
      },
    },
  };

  function updateWidgetContent(widgetId) {
    const data = widgetsData[widgetId];

    if (!data) return;

    widgetSubtitle.innerHTML = data.subtitle;
    widgetDescription.textContent = data.description;

    possibilitiesItems.innerHTML = '';
    data.possibilities.forEach((item) => {
      const possibilityItem = document.createElement('div');
      possibilityItem.className = 'widgets__possibilities-item';
      possibilityItem.innerHTML = `
        <div class="widgets__possibilities-item-icon">
          <img src="images/widgets/line.svg" alt="line" />
        </div>
        <p class="widgets__possibilities-item-text">${item}</p>
      `;
      possibilitiesItems.appendChild(possibilityItem);
    });

    trialTitle.textContent = data.trial.title;
    trialItems.innerHTML = '';
    data.trial.items.forEach((item) => {
      const trialItem = document.createElement('div');
      trialItem.className = 'widgets__trial-item';
      trialItem.innerHTML = `
        <div class="widgets__trial-item-icon">
          <img src="images/widgets/line.svg" alt="line" />
        </div>
        <p class="widgets__trial-item-text">${item}</p>
      `;
      trialItems.appendChild(trialItem);
    });

    trialButton.textContent = data.trial.buttonText;
  }

  widgetItems.forEach((item) => {
    item.addEventListener('click', function () {
      widgetItems.forEach((widget) => widget.classList.remove('item-active'));

      this.classList.add('item-active');

      const widgetId = this.getAttribute('data-widget');
      updateWidgetContent(widgetId);
    });
  });

  updateWidgetContent('yandex-disk');
});
