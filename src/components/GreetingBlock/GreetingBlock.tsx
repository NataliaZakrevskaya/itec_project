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
            <h2 className={style.greetingBlockTitle}>Здравствуйте, счастливый хозяин любимого питомца!</h2>
            <div className={style.greetingBlockTextWrapper}>
              <p className={style.greetingBlockText}>Меня зовут Ирина, 2 года назад моя бесконечная любовь к животным трансформировалась в магазин «Территория
                ZOO».
                Место, главная цель которого — забота о полноценной жизни питомцев, здоровой, долгой, радостной и
                гармоничной. Наш долг — создавать лучшее предложение для ваших домашних любимцев.</p>
            </div>
            <div className={style.greetingBlockWrapper}>
                <div>
                  <div className={style.greetingBlockWrapperTitle}>За 7 минут соберем заказ</div>
                  <p className={style.greetingBlockText}>Выбирайте товары на сайте, забирайте в удобное время в нашем магазине. .Уже через 30 минут собранный и
                    упакованный заказ будет ждать вас.</p>
                </div>
            </div>
            <div className={style.greetingBlockWrapper}>
              <div>
                <div className={style.greetingBlockWrapperTitle}>Поможем с выбором товаров</div>
                <p className={style.greetingBlockText}>Задавайте вопросы профессионалам, получайте консультации по кормлению и содержанию питомца.</p>
              </div>
            </div>
            <div className={style.greetingBlockWrapper}>
              <div>
                <div className={style.greetingBlockWrapperTitle}>Поставим товар на заказ!</div>
                <p className={style.greetingBlockText}>Мы работаем с лучшими поставщиками сертифитированного товара для животных. Если нужного Вам товара не
                  будет в наличии мы в кратчайшие сроки договоримся о его поставке и сообщим Вам.</p>

              </div>
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