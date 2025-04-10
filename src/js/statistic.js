import { supabase } from '../supabaseClient';
import { v4 as uuidv4 } from 'uuid';

// Получение/создание уникального ID
export function getUserId() {
    let userId = localStorage.getItem('openDayUserId')
    if (!userId) {
      userId = uuidv4()
      localStorage.setItem('openDayUserId', userId)
      // Отправим в Supabase запись о новом пользователе
      trackVisit(userId, 'visit') // step = main — заход на посадочную
    }
    return userId
  }
  
  // Отправка данных о действиях на главной
  async function trackVisit(userId, main) {
    console.log('Отправка данных в Supabase:', userId, main) // Добавь эту строку
    
    const { data, error } = await supabase
      .from('college-open-day')
      .insert([{ id: userId, main }])
    
    if (error) {
      console.error('Ошибка при сохранении:', error)
    } else {
      console.log('Сохранено:', data)
    }
  }
  
  // Вызов при загрузке страницы
  // getUserId()
  

  //Начал играть в виселицу
  async function trackVisitHang(userId, hangman) {
    console.log('Отправка данных в Supabase:', userId, hangman) // Добавь эту строку
    
    const { data, error } = await supabase
      .from('college-open-day')
      .insert([{ id: userId, hangman }])
    
    if (error) {
      console.error('Ошибка при сохранении:', error)
    } else {
      console.log('Сохранено:', data)
    }
  }
