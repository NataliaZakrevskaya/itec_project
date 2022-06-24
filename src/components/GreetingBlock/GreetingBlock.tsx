import React from 'react';
import style from './GreetingBlock.module.scss';
import commonStyle from '../../styles/common/Container.module.scss';
import shopPhoto from '../../Images/shopPhoto.svg';

const GreetingBlock = () => {
  return (
    <div className={ style.greetingBlock }>
      <div className={ commonStyle.container }>
        <div className={style.greetingBlockContainer}>
          <div>
            <h2>Здравствуйте, счастливый хозяин любимого питомца!</h2>
            <p>Меня зовут Ирина, 2 года назад моя бесконечная любовь к животным трансформировалась в магазин «Территория
              ZOO».
              Место, главная цель которого — забота о полноценной жизни питомцев, здоровой, долгой, радостной и
              гармоничной. Наш долг — создавать лучшее предложение для ваших домашних любимцев.</p>
            <div>
              <h6>За 7 минут соберем заказ</h6>
              <p>Выбирайте товары на сайте, забирайте в удобное время в нашем магазине. .Уже через 30 минут собранный и
                упакованный заказ будет ждать вас.</p>
            </div>
            <div>
              <h6>Поможем с выбором товаров</h6>
              <p>Задавайте вопросы профессионалам, получайте консультации по кормлению и содержанию питомца.</p>
            </div>
            <div>
              <h6>Поставим товар на заказ!</h6>
              <p>Мы работаем с лучшими поставщиками сертифитированного товара для животных. Если нужного Вам товара не
                будет в наличии мы в кратчайшие сроки договоримся о его поставке и сообщим Вам.</p>
            </div>
          </div>
          <div>
            <img src={ shopPhoto } alt="shopPhoto"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreetingBlock;