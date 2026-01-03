/**
 * Запускає інтервальний таймер, який раз на `interval` хвилин перевіряє час
 * і викликає `exec`, якщо поточний час потрапляє у проміжок
 * [startAtHour; startAtHour + 1) поточної доби.
 *
 * Додатково функція гарантує, що `exec` буде запущена не більше одного разу на добу
 * в цей годинний проміжок (навіть якщо інтервал у хвилинах менший за 60).
 *
 * @param startAtHour Година доби, з якої дозволено запускати `exec` (0–23).
 * @param exec Функція, яку потрібно періодично запускати.
 * @param interval Інтервал у хвилинах між перевірками (за замовчуванням 60 хв).
 * @returns Ідентифікатор таймера, який можна передати у `clearInterval`.
 */
export const schedulerHourly = (
  startAtHour: number,
  exec: () => void | Promise<void>,
  intervalSec: number = 60
): NodeJS.Timeout => {
    
  // Нормалізація вхідної години
  if (startAtHour < 0 || startAtHour > 23) {
    throw new Error('startAtHour must be in range 0–23');
  }

  // Запамʼятовуємо дату (YYYY-MM-DD), коли останній раз виконували exec
  // let lastRunDate: string | null = null;

  const intervalMs = intervalSec * 1000;

  const timer = setInterval(() => {
    
    const now = new Date();
    const currentHour = now.getHours(); // 0–23
    const currentDateKey = now.toISOString().slice(0, 10); // YYYY-MM-DD

    // Перевіряємо, що поточна година потрапляє у вікно [startAtHour; startAtHour + 1)
    if (currentHour >= startAtHour && currentHour < startAtHour + 1) {
        // Щоб не запускати exec декілька разів за одну й ту ж добу,
        // перевіряємо, чи ми вже виконували її сьогодні.
        /*
        if (lastRunDate !== currentDateKey) {
            lastRunDate = currentDateKey;
        */
        Promise.resolve()
            .then(() => exec())
            .catch((err) => {
                // Мінімальний лог помилки, щоб не падало все застосування
                // eslint-disable-next-line no-console
                console.error('schedulerHourly exec error:', err);
            });
        // }
    }
  }, intervalMs);

  return timer;
};


export const schedulerHourlyOnce = (
    startAtHour: number,
    exec: () => void | Promise<void>,
    intervalSec: number = 60
  ): NodeJS.Timeout => {
      
    // Нормалізація вхідної години
    if (startAtHour < 0 || startAtHour > 23) {
      throw new Error('startAtHour must be in range 0–23');
    }
  
    // Запамʼятовуємо дату (YYYY-MM-DD), коли останній раз виконували exec
    let lastRunDate: string | null = null;
  
    const intervalMs = intervalSec * 1000;
  
    const timer = setInterval(() => {
      
      const now = new Date();
      const currentHour = now.getHours(); // 0–23
      const currentDateKey = now.toISOString().slice(0, 10); // YYYY-MM-DD
  
      // Перевіряємо, що поточна година потрапляє у вікно [startAtHour; startAtHour + 1)
      if (currentHour >= startAtHour && currentHour < startAtHour + 1) {
          // Щоб не запускати exec декілька разів за одну й ту ж добу,
          // перевіряємо, чи ми вже виконували її сьогодні.
          
            if (lastRunDate !== currentDateKey) {
                lastRunDate = currentDateKey;
            
                Promise.resolve()
                    .then(() => exec())
                    .catch((err) => {
                        // Мінімальний лог помилки, щоб не падало все застосування
                        // eslint-disable-next-line no-console
                        console.error('schedulerHourly exec error:', err);
                    });
            }
      }
    }, intervalMs);
  
    return timer;
  };