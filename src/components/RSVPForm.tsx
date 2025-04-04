import React, { useState, useRef, useEffect } from 'react';
import { toast } from "sonner";

interface FormData {
  attendance: string;
  name: string;
  phone: string;
  menu: string;
  alcohol: string;
  allergies: boolean;
  allergiesText: string;
  transport: string;
  carNumber: string;
  questions: boolean;
  questionsText: string;
}

const initialFormData: FormData = {
  attendance: '',
  name: '',
  phone: '',
  menu: '',
  alcohol: '',
  allergies: false,
  allergiesText: '',
  transport: '',
  carNumber: '',
  questions: false,
  questionsText: ''
};

const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [step, setStep] = useState(1);
  const [phoneError, setPhoneError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showRegret, setShowRegret] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const rsvpSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    rsvpSectionRef.current = document.getElementById('rsvp') as HTMLDivElement;
  }, []);

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+7\d{10}$/;
    return phoneRegex.test(phone);
  };

  const needsPhone = 
    formData.attendance === 'both' || 
    formData.attendance === 'ceremony' || 
    formData.attendance === 'banquet';
  
  const isNextButtonDisabled = () => {
    if (step === 1) {
      if (formData.attendance === '') return true;
      if (formData.attendance === 'unable') return formData.name === '';
      if (needsPhone) {
        return formData.name === '' || formData.phone === '' || !!phoneError;
      }
    }
    return false;
  };

  const isStep2Complete = () => {
    return formData.menu !== '' && 
           formData.alcohol !== '' && 
           (formData.allergies === false || (formData.allergies === true && formData.allergiesText !== '')) &&
           formData.transport !== '' &&
           (formData.transport !== 'own' || (formData.transport === 'own' && formData.carNumber !== '')) &&
           (formData.questions === false || (formData.questions === true && formData.questionsText !== ''));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      let formattedPhone = value;
      if (value && !value.startsWith('+7')) {
        formattedPhone = '+7' + value.replace(/^\+7/, '');
      }

      setFormData({ ...formData, [name]: formattedPhone });
      
      if (formattedPhone && !validatePhone(formattedPhone)) {
        setPhoneError('Телефон должен быть в формате +7XXXXXXXXXX (10 цифр после +7)');
      } else {
        setPhoneError('');
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'allergies') {
      setFormData({ ...formData, allergies: value === 'true' });
    } else if (name === 'questions') {
      setFormData({ ...formData, questions: value === 'true' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const sendToTelegram = async () => {
    try {
      const botToken = '7559369686:AAEbdTOTWRpgbEWKkb7UXILEVpEgt28zwHc';
      const chatId = '469762787';
      
      let attendanceText = '';
      switch (formData.attendance) {
        case 'both':
          attendanceText = 'Буду и на церемонии в ЗАГСе, и на банкете';
          break;
        case 'ceremony':
          attendanceText = 'Буду только на торжественной церемонии в ЗАГСе';
          break;
        case 'banquet':
          attendanceText = 'Буду только на банкете';
          break;
        case 'unable':
          attendanceText = 'Не смогу присутствовать';
          break;
      }
      
      let message = `Получен ответ на анкету!\n\nИмя: ${formData.name}\n`;
      
      if (formData.phone) {
        message += `Телефон: ${formData.phone}\n`;
      }
      
      message += `Присутствие: ${attendanceText}\n`;
      
      if (formData.attendance !== 'unable') {
        if (formData.menu) message += `Меню: ${formData.menu}\n`;
        if (formData.alcohol) message += `Алкоголь: ${formData.alcohol}\n`;
        if (formData.allergies) message += `Аллергия: Да\nДетали: ${formData.allergiesText}\n`;
        if (formData.transport) {
          message += `Транспорт: ${formData.transport}\n`;
          if (formData.transport === 'own' && formData.carNumber) {
            message += `Номер автомобиля: ${formData.carNumber}\n`;
          }
        }
        if (formData.questions) message += `Вопросы/пожелания: ${formData.questionsText}\n`;
      }
      
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      });
      
      const result = await response.json();
      
      if (!result.ok) {
        throw new Error('Failed to send message to Telegram');
      }
      
      return true;
      
    } catch (error) {
      console.error('Error sending to Telegram:', error);
      toast.error("Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.");
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.attendance === 'unable') {
      const success = await sendToTelegram();
      if (success) {
        setShowRegret(true);
        if (rsvpSectionRef.current) {
          rsvpSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      if (step === 1) {
        setStep(2);
      } 
      else if (step === 2) {
        const success = await sendToTelegram();
        if (success) {
          setShowSuccess(true);
          if (rsvpSectionRef.current) {
            rsvpSectionRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setStep(1);
    setShowSuccess(false);
    setShowRegret(false);
    if (rsvpSectionRef.current) {
      rsvpSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (showSuccess) {
    return (
      <div className="rsvp-card animate-fade-in" ref={formRef}>
        <h3 className="text-2xl font-serif text-center mb-4">Ура! Мы получили ваш ответ!</h3>
        <p className="text-center mb-6">
          Спасибо, что нашли время поделиться с нами важной информацией. Мы ценим ваше внимание и искренне рады, что вы — часть нашей истории!
        </p>
        <div className="flex justify-center">
          <button 
            onClick={resetForm} 
            className="px-6 py-2 bg-wedding-dusty-pink hover:bg-wedding-terracotta text-white rounded-md transition-colors"
          >
            Заполнить снова
          </button>
        </div>
        <p className="text-sm text-center mt-4 text-gray-500">
          Вы можете заполнить информацию сами за другого гостя, с которым придете.
        </p>
      </div>
    );
  }

  if (showRegret) {
    return (
      <div className="rsvp-card animate-fade-in" ref={formRef}>
        <h3 className="text-2xl font-serif text-center mb-4">Спасибо за ваш ответ!</h3>
        <p className="text-center mb-6">
          Мы получили ваше сообщение и благодарим вас за то, что нашли время откликнуться. Нам очень жаль, что вы не сможете быть с нами, но мы ценим вашу искренность и будем рады видеть вас в другой раз. 
          <br />Вы остаетесь частью нашей истории!
        </p>
        <div className="flex justify-center">
          <button 
            onClick={resetForm} 
            className="px-6 py-2 bg-wedding-dusty-pink hover:bg-wedding-terracotta text-white rounded-md transition-colors"
          >
            Заполнить снова
          </button>
        </div>
        <p className="text-sm text-center mt-4 text-gray-500">
          Вы можете заполнить информацию сами за другого гостя, с которым придете.
        </p>
      </div>
    );
  }

  return (
    <div className="rsvp-card" id="rsvp-form" ref={formRef}>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="animate-fade-in">
            <h3 className="text-xl font-serif mb-6">Собираетесь ли вы быть на нашем празднике?</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="attendance-both" 
                  name="attendance" 
                  value="both" 
                  className="form-radio" 
                  checked={formData.attendance === 'both'} 
                  onChange={handleRadioChange} 
                />
                <label htmlFor="attendance-both" className="ml-2">Буду и на церемонии в ЗАГСе, и на банкете</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="attendance-ceremony" 
                  name="attendance" 
                  value="ceremony" 
                  className="form-radio" 
                  checked={formData.attendance === 'ceremony'} 
                  onChange={handleRadioChange} 
                />
                <label htmlFor="attendance-ceremony" className="ml-2">Буду только на торжественной церемонии в ЗАГСе</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="attendance-banquet" 
                  name="attendance" 
                  value="banquet" 
                  className="form-radio" 
                  checked={formData.attendance === 'banquet'} 
                  onChange={handleRadioChange} 
                />
                <label htmlFor="attendance-banquet" className="ml-2">Буду только на банкете</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="attendance-unable" 
                  name="attendance" 
                  value="unable" 
                  className="form-radio" 
                  checked={formData.attendance === 'unable'} 
                  onChange={handleRadioChange} 
                />
                <label htmlFor="attendance-unable" className="ml-2">Не смогу присутствовать</label>
              </div>
            </div>
            
            {formData.attendance && (
              <div className="space-y-4 mt-6 animate-fade-in">
                <div>
                  <label htmlFor="name" className="block mb-1">Имя и Фамилия</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    className="form-input-text" 
                    required 
                  />
                </div>
                
                {needsPhone && (
                  <div>
                    <label htmlFor="phone" className="block mb-1">Телефон</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      className={`form-input-text ${phoneError ? 'border-red-500' : ''}`}
                      placeholder="+7XXXXXXXXXX" 
                      required 
                    />
                    {phoneError && (
                      <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                    )}
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-6 flex justify-end">
              <button 
                type="submit" 
                disabled={isNextButtonDisabled()} 
                className={`px-6 py-2 rounded-md transition-colors ${
                  isNextButtonDisabled() 
                  ? 'bg-gray-400 text-white hover:bg-gray-500 opacity-50 cursor-not-allowed' 
                  : formData.attendance === 'unable' 
                    ? 'bg-gray-500 text-white hover:bg-gray-600' 
                    : 'bg-wedding-terracotta text-white hover:bg-wedding-terracotta/80'
                }`}
              >
                {formData.attendance === 'unable' ? 'С сожалением отказаться' : 'Продолжить'}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <div className="step-indicator">
              <div className="step"></div>
              <div className="step active"></div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Пожалуйста, выберите предпочтительный вариант:</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="menu-meat" 
                      name="menu" 
                      value="Мясное меню" 
                      className="form-radio" 
                      checked={formData.menu === 'Мясное меню'} 
                      onChange={handleRadioChange} 
                    />
                    <label htmlFor="menu-meat" className="ml-2">Мясное меню</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="menu-fish" 
                      name="menu" 
                      value="Рыбное меню" 
                      className="form-radio" 
                      checked={formData.menu === 'Рыбное меню'} 
                      onChange={handleRadioChange} 
                    />
                    <label htmlFor="menu-fish" className="ml-2">Рыбное меню</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="menu-veg" 
                      name="menu" 
                      value="Вегетарианское меню" 
                      className="form-radio" 
                      checked={formData.menu === 'Вегетарианское меню'} 
                      onChange={handleRadioChange} 
                    />
                    <label htmlFor="menu-veg" className="ml-2">Вегетарианское меню</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="menu-any" 
                      name="menu" 
                      value="Буду есть всё, что дадут" 
                      className="form-radio" 
                      checked={formData.menu === 'Буду есть всё, что дадут'} 
                      onChange={handleRadioChange} 
                    />
                    <label htmlFor="menu-any" className="ml-2">Буду есть всё, что дадут</label>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Какой алкоголь вы предпочитаете?</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="alcohol-red" 
                      name="alcohol" 
                      value="Красное вино" 
                      className="form-radio" 
                      checked={formData.alcohol === 'Красное вино'} 
                      onChange={handleRadioChange} 
                    />
                    <label htmlFor="alcohol-red" className="ml-2">Красное вино</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="alcohol-white" 
                      name="alcohol" 
                      value="Белое вино" 
                      className="form-radio" 
                      checked={formData.alcohol === 'Белое вино'} 
                      onChange={handleRadioChange} 
                    />
                    <label htmlFor="alcohol-white" className="ml-2">Белое вино</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="alcohol-champagne" 
                      name="alcohol" 
                      value="Шампанское" 
                      className="form-radio" 
                      checked={formData.alcohol === 'Шампанское'} 
                      onChange={handleRadioChange} 
                    />
                    <label htmlFor="alcohol-champagne" className="ml-2">Шампанское</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="alcohol-none" 
                      name="alcohol" 
                      value="Не пью алкоголь" 
                      className="form-radio" 
                      checked={formData.alcohol === 'Не пью алкоголь'} 
                      onChange={handleRadioChange} 
                    />
                    <label htmlFor="alcohol-none" className="ml-2">Не пь�� алкоголь</label>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Есть ли у вас аллергии?</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="allergies-yes" 
                      name="allergies" 
                      value="true" 
                      className="form-radio" 
                      checked={formData.allergies === true} 
                      onChange={handleRadioChange} 
                    />
                    <label htmlFor="allergies-yes" className="ml-2">Да</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="allergies-no" 
                      name="allergies" 
                      value="false" 
                      className="form-radio" 
                      checked={formData.allergies === false} 
                      onChange={handleRadioChange} 
                    />
                    <label htmlFor="allergies-no" className="ml-2">Нет</label>
                  </div>
                </div>
                
                {formData.allergies && (
                  <div className="mt-2 animate-fade-in">
                    <label htmlFor="allergiesText" className="block mb-1">Напишите, на что именно у вас аллергия:</label>
                    <textarea 
                      id="allergiesText" 
                      name="allergiesText" 
                      value={formData.allergiesText} 
                      onChange={handleInputChange} 
                      className="form-input-text" 
                      rows={2} 
                    />
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-medium mb-2">Как вы планируете добираться до места проведения торжества?</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="transport-transfer" 
                      name="transport" 
                      value="transfer" 
                      className="form-radio" 
                      checked={formData.transport === 'transfer'} 
                      onChange={handleRadioChange} 
                    />
                    <label htmlFor="transport-transfer" className="ml-2">Нужен трансфер (мы организуем такси)</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="transport-own" 
                      name="transport" 
                      value="own" 
                      className="form-radio" 
                      checked={formData.transport === 'own'} 
                      onChange={handleRadioChange} 
                    />
                    <label htmlFor="transport-own" className="ml-2">На своей машине</label>
                  </div>
                </div>
                
                {formData.transport === 'own' && (
                  <div className="mt-2 animate-fade-in">
                    <label htmlFor="carNumber" className="block mb-1">
                      Введите номер вашего авто в формате А123НН797:
                    </label>
                    <input 
                      type="text" 
                      id="carNumber" 
                      name="carNumber" 
                      value={formData.carNumber} 
                      onChange={handleInputChange} 
                      className="form-input-text" 
                    />
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-medium mb-2">Есть ли у вас вопросы или пожелания, которые мы не учли?</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="questions-yes" 
                      name="questions" 
                      value="true" 
                      className="form-radio" 
                      checked={formData.questions === true} 
                      onChange={handleRadioChange} 
                    />
                    <label htmlFor="questions-yes" className="ml-2">Да</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="questions-no" 
                      name="questions" 
                      value="false" 
                      className="form-radio" 
                      checked={formData.questions === false} 
                      onChange={handleRadioChange} 
                    />
                    <label htmlFor="questions-no" className="ml-2">Нет</label>
                  </div>
                </div>
                
                {formData.questions && (
                  <div className="mt-2 animate-fade-in">
                    <label htmlFor="questionsText" className="block mb-1">Напишите, что еще мы не учли:</label>
                    <textarea 
                      id="questionsText" 
                      name="questionsText" 
                      value={formData.questionsText} 
                      onChange={handleInputChange} 
                      className="form-input-text" 
                      rows={2} 
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button 
                type="button" 
                onClick={goBack} 
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                Назад
              </button>
              <button 
                type="submit" 
                className={`px-6 py-2 rounded-md transition-colors ${
                  isStep2Complete() 
                  ? 'bg-wedding-terracotta text-white hover:bg-wedding-terracotta/80' 
                  : 'bg-wedding-dusty-pink text-white hover:bg-wedding-dusty-pink/80'
                }`}
              >
                Присоединиться к празднику
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default RSVPForm;
