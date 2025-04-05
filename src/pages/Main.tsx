import React from 'react';
import { Button } from '@/components/ui/button';
import CountdownTimer from '../components/CountdownTimer';
import RSVPForm from '../components/RSVPForm';
import { Heart, Clock, MapPin, Calendar, MessageSquare, Phone } from 'lucide-react';
import { ContactDialog } from '../components/ContactDialog';

const Main = () => {
  const weddingDate = new Date('2025-09-25T12:15:00');
  const colorPalette = [{
    color: '#F7C8A3',
    name: 'Персиковый'
  }, {
    color: '#D8A7A7',
    name: 'Пыльно-розовый'
  }, {
    color: '#C15B46',
    name: 'Терракотовый'
  }, {
    color: '#9FBACD',
    name: 'Серо-голубой'
  }, {
    color: '#7EB7A3',
    name: 'Мятный'
  }, {
    color: '#6A4E42',
    name: 'Коричневый'
  }];
  const faqItems = [{
    question: 'Нужно ли кричать "Горько!"?',
    answer: 'Нет, не нужно! Мы считаем, что поцелуи должны быть искренними, а не по заказу. 😊'
  }, {
    question: 'Стоит ли дарить цветы?',
    answer: 'Цветы недолговечны, и мы не сможем насладиться их красотой. Будем рады, если вместо букетов вы поддержите бюджет нашей семьи. Ваша помощь станет самым ценным подарком!'
  }, {
    question: 'Как добраться до места проведения торжества?',
    answer: 'Для гостей, которые не на своей машине, мы организуем трансфер после торжественной регистрации. Такси будет заказано и оплачено нами.'
  }, {
    question: 'Будет ли возможность оставить машину на парковке?',
    answer: 'Да, рядом с местом проведения будет парковка для гостей. Мы заранее закажем для вас пропуск, поэтому просто сообщите нам номер вашего автомобиля.'
  }, {
    question: 'Есть ли дресс-код?',
    answer: 'Мы будем рады, если вы выберете наряды в тонах нашей палитры: персиковый, пыльная роза, терракотовый, серо-голубой, мятный, коричневый. Это создаст гармоничную атмосферу праздника!'
  }, {
    question: 'Можно ли прийти в casual-наряде?',
    answer: 'Мы будем рады, если вы поддержите наш дресс-код, но главное — ваш комфорт и хорошее настроение!'
  }, {
    question: 'Что, если у меня есть аллергия или особые предпочтения в еде?',
    answer: 'Пожалуйста, сообщите нам об этом заранее в опросе ниже, чтобы мы могли учесть ваши пожелания при составлении меню.'
  }];
  const schedule = [{
    time: '12:15–13:00',
    title: 'Торжественная регистрация',
    description: 'Приглашаем вас стать свидетелями самого важного момента в нашей жизни — регистрации нашего брака! После церемонии будет время для поздравлений и теплых слов.'
  }, {
    time: '13:00–14:00',
    title: 'Отправляемся в Loft House',
    description: 'После регистрации мы приглашаем вас в уютный домик Loft House, где продолжится наш праздник. Не забудьте указать в опросе, нужен ли вам трансфер или вы поедете на своей машине.'
  }, {
    time: '15:00–20:00',
    title: 'Сердце нашего праздника',
    description: 'Самая теплая и душевная часть дня: тосты, объятия, смех и слезы счастья. Будем радоваться и праздновать вместе с вами!'
  }, {
    time: '20:00–21:00',
    title: 'Танцуют все!',
    description: 'Время расслабиться, зарядиться энергией и танцевать так, будто никто не смотрит!'
  }, {
    time: '21:00',
    title: 'И жили они долго и счастливо…',
    description: 'С легким сердцем и радостью в душе мы отправляемся домой, чтобы начать нашу новую главу. А вы — едете отдыхать, заряженные теплом и хорошим настроением. Спасибо, что были с нами!'
  }];
  return <div className="main-container bg-gradient-to-b from-white to-wedding-blue-gray/10">
      <section className="min-h-screen flex flex-col items-center justify-center py-16 px-4 relative overflow-hidden">
        <div className="floating-decoration top-20 left-[10%]">
          <Heart size={40} className="text-wedding-dusty-pink/50" />
        </div>
        <div className="floating-decoration top-40 right-[15%]">
          <Heart size={30} className="text-wedding-terracotta/50" />
        </div>
        
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <h1 className="font-hand text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-2 text-wedding-terracotta">
            Дарья и Дмитрий
          </h1>
          <p className="text-xl md:text-2xl font-serif mt-4 mb-8">приглашают вас на свою свадьбу</p>
          <div className="w-24 h-0.5 bg-wedding-dusty-pink/50 mx-auto my-8"></div>
          
          <div className="flex flex-col items-center justify-center mb-12">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 mr-2 text-wedding-terracotta" />
              <h2 className="text-xl font-medium">Четверг, 25 сентября 2025</h2>
            </div>
            <p className="text-lg text-gray-600">До нашего особенного дня осталось:</p>
          </div>
          
          <CountdownTimer targetDate={weddingDate} />
          
          <div className="mt-16">
            <a href="#story" className="inline-block">
              <Button variant="ghost" className="text-wedding-terracotta hover:text-wedding-terracotta/80 hover:bg-transparent">
                Узнать больше
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section id="story" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-10">Наша история</h2>
          
          <div className="bg-white bg-opacity-80 rounded-lg shadow-md p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="w-full md:w-1/3">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img 
                    src="/lovable-uploads/8aecc048-f792-4b35-b8f3-2513e1d15536.png" 
                    alt="Детские фотографии будущих супругов" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl md:text-2xl font-serif mb-4">Как все начиналось</h3>
                <p className="text-gray-700 leading-relaxed">
                  Наша история началась в 2019 году. Мы познакомились в интернете, и с первого сообщения стало понятно — это что-то особенное. Мы разговаривали часами, находя всё больше общих интересов и увлечений.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  За эти 6 лет вместе мы прошли через многое: первые свидания, совместные путешествия, общие мечты и планы. И сейчас мы готовы сделать следующий шаг в нашей истории.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4 font-medium">
                  Мы хотим разделить этот важный день с вами!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider">
        <Heart size={24} className="text-wedding-dusty-pink mx-2" />
      </div>

      <section id="locations" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-10">Места проведения</h2>
          
          <div className="space-y-8">
            <div className="bg-white bg-opacity-80 rounded-lg shadow-md p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <MapPin size={28} className="text-wedding-terracotta" />
                </div>
                <div>
                  <h3 className="text-xl font-serif mb-2">Торжественная регистрация</h3>
                  <p className="text-gray-700 mb-2 font-medium">Дворец бракосочетания №4</p>
                  <p className="text-gray-600">г. Москва, Бутырская улица, 17</p>
                  <a href="https://yandex.ru/maps/-/CHR~7DIg" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-sm text-wedding-terracotta hover:underline">
                    Посмотреть на карте
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-80 rounded-lg shadow-md p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <MapPin size={28} className="text-wedding-terracotta" />
                </div>
                <div>
                  <h3 className="text-xl font-serif mb-2">Праздничный банкет</h3>
                  <p className="text-gray-700 mb-2 font-medium">Loft House</p>
                  <p className="text-gray-600">г. Красногорск, улица Согласия, 13</p>
                  <p className="text-gray-500 text-sm mt-1 italic">
                    От улицы Согласия, 13 нужно пройти еще пару минут пешком до самого здания Loft House
                  </p>
                  <a href="https://yandex.ru/maps/-/CHVNe2zu" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-sm text-wedding-terracotta hover:underline">
                    Посмотреть на карте
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider">
        <Heart size={24} className="text-wedding-dusty-pink mx-2" />
      </div>

      <section id="schedule" className="py-16 px-4 bg-wedding-mint/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-10 flex justify-center items-center">
            <Calendar className="mr-3 text-wedding-terracotta" />
            <span>Расписание дня</span>
          </h2>
          
          <div className="relative pl-8 md:pl-12 space-y-10">
            <div className="timeline-line"></div>
            
            {schedule.map((item, index) => <div key={index} className="relative animate-slide-in" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="timeline-dot"></div>
                <div className="bg-white bg-opacity-90 rounded-lg shadow-md p-6 ml-6">
                  <h3 className="text-xl md:text-2xl font-serif text-wedding-terracotta mb-2">{item.time}</h3>
                  <h4 className="text-lg md:text-xl font-medium mb-3">{item.title}</h4>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      <div className="section-divider">
        <Heart size={24} className="text-wedding-dusty-pink mx-2" />
      </div>

      <section id="colors" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-10">Цветовая палитра праздника</h2>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
            {colorPalette.map((color, index) => (
              <div key={index} className="text-center flex flex-col items-center">
                <div className="relative inline-block w-20 h-20">
                  <svg 
                    viewBox="0 0 24 24" 
                    fill={color.color} 
                    stroke="rgba(0,0,0,0.1)" 
                    strokeWidth="0.5" 
                    className="w-full h-full palette-heart"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </div>
                <p className="mt-2 text-sm font-medium">{color.name}</p>
              </div>
            ))}
          </div>
          
          <p className="text-center mt-8 text-gray-600 max-w-lg mx-auto">
            Будем рады, если вы выберете наряды в этих тонах, чтобы создать гармоничную атмосферу праздника.
          </p>
        </div>
      </section>

      <div className="section-divider">
        <Heart size={24} className="text-wedding-dusty-pink mx-2" />
      </div>

      <section id="faq" className="py-16 px-4 bg-wedding-blue-gray/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-10 flex justify-center items-center">
            <MessageSquare className="mr-3 text-wedding-terracotta" />
            <span>Вопросы и ответы</span>
          </h2>
          
          <div className="bg-white bg-opacity-90 rounded-lg shadow-md p-6 md:p-8">
            <div className="space-y-2">
              {faqItems.map((item, index) => <div key={index} className="faq-item">
                  <h3 className="text-lg md:text-xl font-medium mb-2">{item.question}</h3>
                  <p className="text-gray-700">{item.answer}</p>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider">
        <Heart size={24} className="text-wedding-dusty-pink mx-2" />
      </div>

      <section id="rsvp" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-6">Подтвердите ваше присутствие</h2>
          
          <div className="bg-wedding-dusty-pink/10 border border-wedding-dusty-pink/30 rounded-lg p-6 mb-12 text-center">
            <p className="text-lg font-medium text-wedding-terracotta mb-2">
              Убедительно просим вас заполнить анкету до 25.06.2025!
            </p>
            <p className="text-gray-700">
              Так мы сможем учесть все вовремя и подготовиться к празднику с учетом всех ваших предпочтений. 
              Ваш ответ поможет нам лучше организовать мероприятие и сделать его комфортным для всех гостей.
            </p>
          </div>
          
          <div className="mb-16">
            <RSVPForm />
          </div>
        </div>
      </section>
      
      <div className="section-divider">
        <Heart size={24} className="text-wedding-dusty-pink mx-2" />
      </div>
      
      <section className="py-12 px-4 bg-wedding-peach/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif mb-4">Мы обещаем торт, танцы и море эмоций.</h2>
          <p className="text-xl md:text-2xl font-medium text-wedding-terracotta">
            А вы обещайте быть там — и наш день станет идеальным!
          </p>
        </div>
      </section>
      
      <div className="section-divider">
        <Heart size={24} className="text-wedding-dusty-pink mx-2" />
      </div>
      
      <section id="contacts" className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-8 flex justify-center items-center">
            <Phone className="mr-3 text-wedding-terracotta" />
            <span>Свяжитесь с нами</span>
          </h2>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
            <ContactDialog 
              type="whatsapp" 
              buttonText="Написать в WhatsApp" 
              dariaPhone="+79091633036" 
              dmitryPhone="+79067250565" 
            />
            <ContactDialog 
              type="telegram" 
              buttonText="Написать в Telegram" 
              dariaPhone="+79091633036" 
              dmitryPhone="+79067250565" 
            />
          </div>
          
          <p className="text-sm text-gray-500 mt-12">
            С любовью, Дарья и Дмитрий
          </p>
        </div>
      </section>
      
      <footer className="py-8 bg-wedding-terracotta text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="font-hand text-2xl mb-2">Дарья & Дмитрий</p>
          <p>25.09.2025</p>
        </div>
      </footer>
    </div>;
};
export default Main;
