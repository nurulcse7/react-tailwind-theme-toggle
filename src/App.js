import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'system'
  );
  const element = document.documentElement;
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  // console.log(darkQuery, 'darkQuery')

  const options = [
    {
      icon: 'sunny',
      text: 'light',
    },
    {
      icon: 'moon',
      text: 'dark',
    },
    {
      icon: 'desktop-outline',
      text: 'system',
    },
  ];

  function onWindowMatch() {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && darkQuery.matches)
    ) {
      element.classList.add('dark');
    } else {
      element.classList.remove('dark');
    }
  }
  onWindowMatch();

  useEffect(() => {
    switch (theme) {
      case 'dark':
        element.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        break;

      case 'light':
        element.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        break;

      default:
        localStorage.removeItem('theme');
        onWindowMatch();
        break;
    }
  }, [theme]);

  darkQuery.addEventListener('change', (e) => {
    if (!('theme' in localStorage)) {
      if (e.matches) {
        element.classList.add('dark');
      } else {
        element.classList.remove('dark');
      }
    }
  });

  return (
    <div className='min-h-screen pt-8 dark:text-gray-100 dark:bg-slate-800 duration-100'>
      <div className='fixed top-5 right-10 duration-100 dark:bg-slate-700 bg-gray-100 rounded'>
        {options?.map((option) => (
          <button
            key={option.text}
            onClick={() => setTheme(option.text)}
            className={`w-8 h-8 leading-9 text-xl rounded-full m-1 ${
              theme === option.text && 'text-sky-600'
            } `}
          >
            <ion-icon name={option.icon}></ion-icon>
          </button>
        ))}
      </div>

      <div className='text-center text-5xl'>
        <h1>React Tailwind </h1>
      </div>

    </div>
  );
}

export default App;

// <ion-icon name='sunny'></ion-icon>
// <ion-icon name='moon'></ion-icon>
// <ion-icon name='desktop-outline'></ion-icon>
// 

