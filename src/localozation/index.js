import moment from 'moment'
import LocalizedStrings from 'react-localization'

let strings = new LocalizedStrings({
  uz: {
    status_name: {
      text_1: 'Koʻrildi',
      text_2: 'Kutish jarayonida',
      text_3: 'Rad etilgan',
      text_4: 'Tasdiqlangan',
    },
    role: {
      text_1: 'Tashkilot Admini',
      text_2: 'Moderator',
      text_3: 'Murojaatchi',
    },
    map_text: {
      text1: 'Tashkilotlar',
      text2: 'Qurilmalar',
      text3: 'Labaratoriyalar xizmatlari',
      text4: 'Murojaatlar',
    },
    message: 'Javob:',
    zayavka: 'Murojaat',
    header: {
      menu: {
        institutions: 'Tashkilotlar',
        servise: 'Xizmatlar',
        equipment: 'Qurilmalar',
        news: 'Yangiliklar',
        about: 'Biz haqimizda',
        contacts: "Bog'lanish",
        reference: 'Klassifikatorlar',
      },
      menu_right: {
        button_1: 'Roʻyxatdan oʻtish',
        button_2: 'Kirish',
      },
    },
    filter: {
      text: 'Filtr',
      search: 'Qidirmoq...',
      submit: 'Saralash',
      cancel: 'Tozalash',

      text_1: 'Idora',
      text_2: 'Mintaqa',
      text_3: 'Tashkilot turi',

      text_4: 'Ilm-fan sohasi',
      text_5: 'Tashkilotlar',
    },
    home: {
      slider_header: 'YANGILIKLAR',
      all: 'Barchasi',
      statisticts: {
        text_1: 'Tashkilotlar',
        text_2: 'Qurilmalar',
        text_3: 'Labaratoriyalar xizmatlari',
        text_4: 'Murojaatlar',
        amount: 'miqdori',
      },
      headers: {
        text_1: `Asosiy ko'rsatkichlar ${moment().format('YYYY')}`,
        text_2: 'Qurilmalar boyicha yetakchi tashkilotlar',
        text_3: 'Qurilmalar boyicha ilm-fan yo`nalishlari',
        text_4: 'Kelib tushgan arizalar bo`yicha tashkilotlar',
        text_5: 'Statistika',
        text_6: "So'nggi yangiliklar",
        text_7: 'Hududlar bo`yicha statistika',
        text_8: 'Foydali xavolalar',
      },
    },
    contacts: {
      title: 'Kontaktlar',
      span: 'O‘zbekiston Respublikasi Innovatsion rivojlanish vazirligi',
      text_left_1: 'Manzil',
      text_right_1:
        '100174, Toshkent sh., Olmazor tumani, koʻch. Universitetskaya, 7-uy',
      text_left_2: 'Telefon',
      text_left_3: 'Pochta',
    },
    about: {
      title: 'Biz haqimizda',
      text: (
        <div>
          <p>
            O&lsquo;zbekiston Respublikasi Innovatsion rivojlanish vazirligining
            faoliyati O&lsquo;zbekiston Respublikasi Prezidentining{' '}
            <b>2017-yil 30-noyabrdagi PQ-3416-son qarori</b> asosida
            O&lsquo;zbekiston Respublikasi Prezidentining PF-sonli qaroriga
            muvofiq tashkil etilgan.
          </p>{' '}
          <br />
          <p>
            <b>29-noyabr 2017-yil.</b> Vazirlik jamiyat va davlat hayotini har
            tomonlama rivojlantirish, intellektual salohiyatini oshirishga
            qaratilgan
          </p>
          <br />
          <p>
            O&lsquo;zbekiston Respublikasining innovatsion va ilmiy-texnikaviy
            taraqqiyoti sohasida yagona davlat siyosatini amalga oshiruvchi
            davlat organi hisoblanadi. va mamlakatning texnologik salohiyati.
            O&lsquo;zbekiston Respublikasining <b> 2019-yil 29-oktabrdagi</b>
            <b> O&lsquo;RQ-576-sonli</b> &ldquo;Fan va ilmiy faoliyat
            to&lsquo;g&lsquo;risida&rdquo;gi va{' '}
            <b>2020-yil 24-iyuldagi O&lsquo;RQ-630-son</b> &ldquo;Innovatsion
            faoliyat to&lsquo;g&lsquo;risida&rdquo;gi qonunlariga muvofiq,
            Innovatsion rivojlanish vazirligi fan sohasidagi vakolatli davlat
            organi; ilmiy va innovatsion faoliyat.
          </p>
          <br />
          <p>
            Mamlakatni ijtimoiy-iqtisodiy rivojlantirishda milliy
            ilmiy-innovatsion tizimning rolini oshirish, hududlarda innovatsion
            faoliyatni takomillashtirish, shuningdek Harakatlar strategiyasiga
            muvofiq beshta ustuvor yo&lsquo;nalish bo&lsquo;yicha belgilangan
            vazifalardan kelib chiqqan holda O&lsquo;zbekiston Respublikasini
            2017-2021-yillarda rivojlantirish, 2021-yil 1-aprel,
            O&lsquo;zbekiston Respublikasi Prezidentining
            &ldquo;Ilmiy-innovatsion faoliyatni rivojlantirish sohasida davlat
            boshqaruvi tizimini takomillashtirish
            to&lsquo;g&lsquo;risida&rdquo;gi <b>PF-6198-son</b> Farmoni qabul
            qilindi. , bu vazirlikning quyidagi asosiy vazifalarini belgilab
            berdi:
          </p>{' '}
          <br />
          <p>
            - mamlakatni innovatsion rivojlantirishning uzoq muddatli
            stsenariylari asosida fan yutuqlari va innovatsiyalar asosida
            ustuvor yo&lsquo;nalishlar va tarmoqlarni rivojlantirish
            strategiyasini ishlab chiqish;
          </p>
          <br />
          <p>
            &minus; hududlarning intellektual va texnologik salohiyatini
            oshirish; ilmiy va innovatsion faoliyatni rivojlantirish uchun
            zamonaviy infratuzilmani shakllantirish; &minus; ilmiy faoliyatning
            davlat dasturlarini shakllantirish, tasdiqlash va ularning
            bajarilishini nazorat qilish; &minus; ilmiy darajaga ega kadrlar
            tayyorlash tizimini muvofiqlashtirish;
          </p>
          <br />
          <p>
            &minus; yoshlarni ilmiy va innovatsion faoliyatga jalb etish va
            ularning tashabbuslarini har tomonlama qo&lsquo;llab-quvvatlashning
            samarali mexanizmlarini joriy etish; &minus; ilmiy va innovatsion
            loyihalarni amalga oshirishga investitsiyalarni keng jalb etish,
            xususiy sektor faolligini oshirish va venchur moliyalashtirishni
            rivojlantirish;
          </p>
          <br />
          <p>
            &minus; innovatsion ishlanmalar asosida amalga oshirilayotgan
            loyihalarning moliyaviy-iqtisodiy va texnik ekspertizasini
            o&lsquo;tkazish, intellektual mulk obyektlarini joriy etish uchun
            zarur shart-sharoitlarni ta&rsquo;minlash; - iqtisodiyot real
            sektori va sanoat tarmoqlarining ilmiy ishlanmalar va
            innovatsiyalarga bo&lsquo;lgan ehtiyojlarini aniqlash, shuningdek,
            tarmoq ilmiy tadqiqotlarini rivojlantirish asosida fan va ishlab
            chiqarish integratsiyasini kuchaytirish;
          </p>
          <br />
          <p>
            &minus; yangi ishlanmalarni tijoratlashtirish va ishlab chiqarishga
            joriy etish, startap loyihalarni amalga oshirish, intellektual mulk
            ishtirokida yangi tashkilotlarni shakllantirish va
            ratsionalizatorlik faoliyatini rivojlantirish uchun zarur
            shart-sharoitlarni yaratish; &minus; fan va innovatsiyalar sohasida
            xalqaro aloqalarni kengaytirish va mustahkamlash, innovatsiyalar va
            texnologiyalar transferi bo&lsquo;yicha chora-tadbirlarni amalga
            oshirish. Yuqoridagi vazifalarni amalga oshirish sohaviy
            ustuvorliklarni hisobga olgan holda Vazirlik tomonidan amalga
            oshiriladi.
          </p>
          <br />
          <p>
            &minus; yangi ishlanmalarni tijoratlashtirish va ishlab chiqarishga
            joriy etish, startap loyihalarni amalga oshirish, intellektual mulk
            ishtirokida yangi tashkilotlarni shakllantirish va
            ratsionalizatorlik faoliyatini rivojlantirish uchun zarur
            shart-sharoitlarni yaratish; &minus; fan va innovatsiyalar sohasida
            xalqaro aloqalarni kengaytirish va mustahkamlash, innovatsiyalar va
            texnologiyalar transferi bo&lsquo;yicha chora-tadbirlarni amalga
            oshirish. Yuqoridagi vazifalarni amalga oshirish sohaviy
            ustuvorliklarni hisobga olgan holda Vazirlik tomonidan amalga
            oshiriladi.
          </p>
          <br />
          <p>
            &minus; yangi ishlanmalarni tijoratlashtirish va ishlab chiqarishga
            joriy etish, startap loyihalarni amalga oshirish, intellektual mulk
            ishtirokida yangi tashkilotlarni shakllantirish va
            ratsionalizatorlik faoliyatini rivojlantirish uchun zarur
            shart-sharoitlarni yaratish; &minus; fan va innovatsiyalar sohasida
            xalqaro aloqalarni kengaytirish va mustahkamlash, innovatsiyalar va
            texnologiyalar transferi bo&lsquo;yicha chora-tadbirlarni amalga
            oshirish. Yuqoridagi vazifalarni amalga oshirish sohaviy
            ustuvorliklarni hisobga olgan holda Vazirlik tomonidan amalga
            oshiriladi.
          </p>
        </div>
      ),
    },
    login: {
      text_1: 'Tizimga kirish',
      text_2: 'Parol',
      text_3: 'Kirish',
      text_4: 'Yangi akkaunt yaratish?',
      text_5: 'Roʻyxatdan oʻtish',
      wrong_credentials: 'Login yoki parol xato kiritildi',
      oneid_error: 'Ошибка при авторизации OneID',
      user_auth: 'Foydalanuvchi',
      admin_auth: 'Administrator',
      oneid_button: 'Tizimga kirish uchun OneID tizimi orqali tizimga kirishingiz kerak',
    },
    more: 'Batafsil',
    institutionpage: {
      text_1: 'Rahbarlar',
      text_2: `Aloqa ma'lumotlarini`,
      text_3: 'Qisqa Tasvir',
      text_4: 'Ilmiy uskunalar',
      text_5: 'Manzil',
      text_6: 'Aloqa',
      text_7: 'Buyurtma xizmati',
      text_8: 'Pochta indeksi',
      text_9: 'Web-sayt',
      text_10: 'Adress',
      text_11: 'Faoliyat/maqsadlar',
      text_20: 'Vazifalar/funksiyalar',
      text_12: 'Fan sohasi',

      text_13: 'Xizmatlar',
      text_14: 'Labaratoriyalar',
      text_15: 'Yaratilgan yili',
    },
    servisepage: {
      text_1: 'Biriktirilgan fayllar',
      text_2: "Xizmatda qo'laniladigan ilmiy uskunalar",
    },
    zayavka_form: {
      text_1: 'Yangi',
      text_2: 'Tadqiqot nomi',
      text_3: 'Murojaatchi',
      text_4: 'Xizmat ko’rsatuvchi',
      text_5: 'Tadqiqotdan maqsad',
      text_6: 'Muddati',
      text_7: 'kun',
      text_8: 'Ilmiy unvon olish uchun',
      text_9: 'Tadqiqot periodik',
      text_10: 'Mahsus ko’rsatmalar va yo’riqnoma',
      text_11: 'Jo’natish',

      text_12: 'Murojaat',
      text_13: 'Murojaat bo’yicha javob',
      text_14: 'Javob matni',
      text_15: 'Javob sanasi',
      text_16: 'Tadqqiqot sanasi',
    },
    equipmentpage: {
      text_1: "Asosiy ma'lumotlar",
      text_2: 'Tavsif',
      text_3: 'Laboratoriya',
      text_4: 'Ilmiy jihozlar guruhi',
      text_5: 'Status',
      text_6: 'Uskuna holati',
      text_7: 'Noyob qurulma',

      text_8: "Sotib olish ma'lumotlari",
      text_9: 'Moliyaviy manba',
      text_10: 'Ishlab chiqarish yili',
      text_11: 'Sotib olingan yil',
      text_12: 'TNVED',
      text_13: 'Sotib olish uchun asos',
      text_14: 'Muddati tugagan yil',
      text_15: 'Ishlab chiqaruvchi mamlakat',
      text_16: 'Sotib olish mamlakati',
      text_17: 'Sotib olish qiymati',
      text_18: 'Sotib olish valyutasi',
      text_19: 'Sotuvchi kodi',
      count: 'Soni'
    },
    registration: {
      title: "Ro'yhatdan o'tish",
      oneid: "OneId orqali ro'yhatdan o'tish",
      name: "Ism",
      surname: "Familiya",
      patronymic: "Sharif",
      fio: "FISh",
      gender: "Jinsi",
      male: "Erkak",
      female: "Ayol",
      degree: "Ilmiy daraja",
      region: "Hudud",
      address: "Manzil",
      phonenumber: "Telefon raqam",
      email: "Email",
      zipcode: "Pochta indeksi",
      legal_status: "Yuridik shaxs",
      continue: "Davom etish",
      back: "Ortga qaytish",
      register: "Roʻyxatdan oʻtish",
      choose_org: "Tashkilot tanlash",
      email_error: "Elektron pochta noto'g'ri kiritilgan",
      zipcode_error: "Pochta indeksi 10 ming belgidan oshmasligi kerak",
      login: "Kirish",
      password: "Parol",
      confirm_password: "Parolni qayta kiriting",
      success_message: "Roʻyxatdan oʻtish uchun arizangiz Administratorga yuborildi. Tasdiqlangandan so'ng, pochta qutingizga ro'yxatdan o'tishni tasdiqlovchi bildirishnoma yuboriladi",
      register_warn: "Portalning barcha imkoniyatlaridan foydalanish uchun siz ro'yxatdan o'tishni yakunlashingiz kerak.",
      register_warn_call_to_action: "Maʼlumotlaringizni toʻldiring"
    },
    pagination: {
      prev_page: "Oldingi sahifa",
      next_page: "Keyingi sahifa",
      prev_5: "Oldingi 5 sahifa",
      next_5: "Keyingi 5 sahifa",
      prev_3: "Oldingi 3 sahifa",
      next_3: "Keyingi 3 sahifa",
      page_size: "Sahifadagi elementlar",
    }
  },
  ru: {
    status_name: {
      text_1: 'Просмотрено',
      text_2: 'Процесс ожидания',
      text_3: 'Отклоненный',
      text_4: 'Одобренный',
    },
    role: {
      text_1: 'Администратор организации',
      text_2: 'Модератор',
      text_3: 'Заявитель',
    },
    map_text: {
      text1: 'Количество организаций',
      text2: 'Количество оборудований',
      text3: 'Количество сервисов',
      text4: 'Количество заявок ',
    },
    message: 'Ответ:',
    zayavka: 'Мои заявки',
    header: {
      menu: {
        institutions: 'Учреждения',
        servise: 'Сервисы',
        equipment: 'Оборудование',
        news: 'Новости',
        about: 'О нас',
        contacts: 'Контакты',
        reference: 'Справочники',
      },
      menu_right: {
        button_1: 'Регистрация',
        button_2: 'Войти',
      },
    },
    filter: {
      text: 'Фильтр',
      search: 'Поиск...',
      submit: 'Применить',
      cancel: 'Очистить',
      text_1: 'Ведомство',
      text_2: 'Регион',
      text_3: 'Тип организации',
      text_4: 'Область науки',
      text_5: 'Организации',
    },
    home: {
      slider_header: 'НОВОСТИ',
      all: 'Все',
      statisticts: {
        text_1: 'Учреждений',
        text_2: 'Лаборатории',
        text_3: 'Услуги',
        text_4: 'Заявки',
        amount: 'кол-во',
      },
      headers: {
        text_1: `Главные цифры ${moment().format('YYYY')} года`,
        text_2: 'Топ направлений науки по количеству лабораторий',
        text_3: 'Топ направлений учреждений по кол-во оборудования',
        text_4: 'Топ направлений науки по кол-ву лабораторий',
        text_5: 'Статистика',
        text_6: 'Последние новости',
        text_7: 'Статистика по регионам',
        text_8: 'Полезные ссылки',
      },
    },
    about: {
      title: 'О нас',
      text: `Деятельность Министерства Инновационного развития Республики Узбекистан организована на основании Постановления Президента №ПП-3416 от 30 ноября 2017 г. в соответствии с Указом Президента Республики Узбекистан №УП-5264 от 29 ноября 2017 г. Министерство является органом государственного управления, осуществляющим единую государственную политику в сфере инновационного и научно-технического развития Республики Узбекистан, направленную на всестороннее развитие общественной и государственной жизни, повышение интеллектуального и технологического потенциала страны. В соответствии с Законами Республики Узбекистан "О науке и научной деятельности" №ЗРУ-576 от 29 октября 2019 г. и "Об инновационной деятельности" №ЗРУ-630 от 24 июля 2020 г. Министерство инновационного развития является уполномоченным государственным органом в сфере науки, научной и инновационной деятельности. В целях повышения роли национальной научной и инновационной системы в социально-экономическом развитии страны, совершенствования инновационной деятельности в регионах, а также исходя из задач, определенных в соответствии со Стратегией действий по пяти приоритетным направлениям развития Республики Узбекистан в 2017-2021 гг., 1 апреля 2021 г., был принят Указ Президента Республики Узбекистан №УП-6198 «О совершенствовании системы государственного управления в сфере развития научной и инновационной деятельности», который определил следующие основные задачи Министерства: − разработка стратегий развития приоритетных сфер и отраслей на основе научных достижений и инноваций, основанных на долгосрочных сценариях инновационного развития страны; − повышение интеллектуального и технологического потенциала регионов, формирование современной инфраструктуры развития научной и инновационной деятельности; − формирование, утверждение государственных программ по научной деятельности и контроль за их выполнением; − координация системы подготовки кадров с ученой степенью; − внедрение эффективных механизмов привлечения молодежи к научной и инновационной деятельности и всестороннюю поддержку их инициатив; − широкое привлечение инвестиций в реализацию научных и инновационных проектов, повышение активности частного сектора и развитие венчурного финансирования; − проведение финансовой, экономической и технической экспертизы проектов, реализуемых на основе инновационных разработок, обеспечение необходимых условий для внедрения объектов интеллектуальной собственности; − выявление потребностей реального сектора экономики и производственных отраслей в научных разработках и инновациях, а также усиление интеграции науки и производства на основе развития отраслевых научных исследований; − создание необходимых условий для коммерциализации и внедрения в производство новых разработок, реализации стартап-проектов, формирования новых организаций с участием интеллектуальной собственности и развития рационализаторской деятельности; − расширение и укрепление международных связей в области науки и инноваций, реализация мер по трансферу инноваций и технологий. Реализация вышеуказанных задач осуществляется Министерством с учетом отраслевых приоритетов.`,
    },
    contacts: {
      title: 'Контакты',
      span: 'Министерство Инновационного развития Республики Узбекистан',
      text_left_1: 'Адрес',
      text_right_1:
        '100174, г. Ташкент, Алмазарский р-н, ул. Университетская, дом 7',
      text_left_2: 'Телефон',
      text_left_3: 'Почта',
    },
    login: {
      text_1: 'Логин',
      text_2: 'Пароль',
      text_3: 'Вход',
      text_4: 'Создать новый аккаунт?',
      text_5: 'Регистрация',
      wrong_credentials: 'Пароль или логин неверный',
      oneid_error: 'Ошибка при авторизации OneID',
      user_auth: 'Пользователь',
      admin_auth: 'Администратор',
      oneid_button: 'Для входа необходимо авторизоваться через систему OneID',
    },
    more: 'Подробнее',
    institutionpage: {
      text_1: 'Руководитель',
      text_2: 'Контактные данные',
      text_3: 'Краткое описание',
      text_4: 'Научное оборудование',
      text_5: 'Адрес',
      text_6: 'Связаться',
      text_7: 'Заказать услугу',
      text_8: 'Индекс',
      text_9: 'Веб сайт',
      text_10: 'Адрес',
      text_11: 'Цели и задачи',
      text_20: 'Задачи и функции',
      text_12: 'Направление',
      text_13: 'Услуги и сервисы',
      text_14: 'Лаборатории',
      text_15: 'Год создания',
    },

    servisepage: {
      text_1: 'Прикрепленные файлы',
      text_2: 'Научное оборудование, используемое в службе',
    },
    zayavka_form: {
      text_1: 'новый',
      text_2: 'Название исследования',
      text_3: 'Заявитель',
      text_4: 'Поставщик услуг',
      text_5: 'Цель исследования',
      text_6: 'Продолжительность',
      text_7: 'дней ',
      text_8: 'Чтобы получить ученую степень',
      text_9: 'Исследования периодические',
      text_10: 'Специальные инструкции и указания',
      text_11: 'Отправить',

      text_12: 'Заявка',
      text_13: 'Ответить на запрос',
      text_14: 'Текст ответа',
      text_15: 'Дата ответа',

      text_16: 'Дата исследования',
    },

    equipmentpage: {
      text_1: 'Основная информация',
      text_2: 'Описание',
      text_3: 'Лаборатория',
      text_4: 'Группа научного оборудования',
      text_5: 'Статус',
      text_6: 'Состояние оборудования ',
      text_7: 'Уникальная установка',

      text_8: 'Информация о покупке',
      text_9: 'Финансовый источник',
      text_10: 'Год выпуска',
      text_11: 'Год покупки',
      text_12: 'ТНВЭД',
      text_13: 'Основание для покупки',
      text_14: 'Истекший год',
      text_15: 'Страна происхождения',
      text_16: 'Страна покупки',
      text_17: 'Стоимость покупки',
      text_18: 'Валюта покупки',
      text_19: 'Код продавца',
      count: 'Количество'
    },
    registration: {
      title: 'Регистрация',
      oneid: 'Зарегистрироваться через ',
      name: 'Имя',
      surname: 'Фамилия',
      patronymic: 'Отчество',
      fio: "ФИО",
      gender: 'Пол',
      male: 'Мужчина',
      female: 'Женщина',
      degree: 'Ученая степень',
      region: 'Регион',
      address: 'Адрес',
      phonenumber: 'Номер телефона',
      email: 'Email',
      zipcode: 'Почтовый индекс',
      legal_status: 'Юридическое лицо',
      continue: 'Продолжить',
      back: 'Назад',
      register: 'Зарегистрироваться',
      choose_org: 'Выберите организацию',
      email_error: 'Почта введена неверно',
      zipcode_error: 'Почтовый индекс не должен превышать 10 тыс символов',
      login: 'Логин',
      password: 'Пароль',
      confirm_password: 'Повторите пароль',
      success_message: 'Ваша заявка на регистрацию отправлена на модерацию Администратору. После подтверждения, на ваш почтовый ящик будет отправлена уведомление о подтверждении регистрации',
      register_warn: 'Чтобы получить доступ ко всем функциям портала, вы должны завершить регистрацию, ',
      register_warn_call_to_action: 'заполнив ваши данные'
    },
    pagination: {
      prev_page: 'Предыдущая страница',
      next_page: 'Следущая страница',
      prev_5: 'Предыдущие 5 страниц',
      next_5: 'Следущие 5 страниц',
      prev_3: 'Предыдущие 3 страницы',
      next_3: 'Следущие 3 страницы',
      page_size: 'Элементов на странице',
    }
  },
})

export { strings }
